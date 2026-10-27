import type { ApkFile, ApkSource, ApkState, ApkVariant } from "../types/apk";

type Release = {
  draft: boolean;
  prerelease: boolean;
  tag_name: string;
  published_at: string;
  assets: {
    name: string;
    size: number;
    state: string;
    updated_at: string;
    browser_download_url: string;
  }[];
};

type Tree = {
  truncated: boolean;
  tree: { path: string; type: string; mode: string; size?: number }[];
};

type Commit = { sha: string; commit: { committer: { date: string } } };

export function apkVersion(name: string): string | undefined {
  // Accept nome-1.10.0.apk, nome-v1.10.0.apk and existing release tags.
  return name.replace(/\.apk$/i, "").match(
    /(?:^|[^\d])v?(\d+\.\d+(?:\.\d+){0,2}(?:-(?:alpha|beta|rc|preview|dev|canary)[\da-z.-]*)?)(?=$|[^\d])/i,
  )?.[1];
}

export function compareVersions(left: string, right: string): number {
  const [leftCore, ...leftSuffix] = left.toLowerCase().split("-");
  const [rightCore, ...rightSuffix] = right.toLowerCase().split("-");
  const a = leftCore.split(".").map(Number);
  const b = rightCore.split(".").map(Number);
  for (let index = 0; index < Math.max(a.length, b.length); index++) {
    const delta = (a[index] ?? 0) - (b[index] ?? 0);
    if (delta) return delta;
  }
  const preA = leftSuffix.join("-");
  const preB = rightSuffix.join("-");
  if (!preA || !preB) return Number(!preA) - Number(!preB);
  const partsA = preA.split(".");
  const partsB = preB.split(".");
  for (let index = 0; index < Math.max(partsA.length, partsB.length); index++) {
    const x = partsA[index];
    const y = partsB[index];
    if (x === undefined || y === undefined) return Number(x !== undefined) - Number(y !== undefined);
    if (x === y) continue;
    const numericX = /^\d+$/.test(x);
    const numericY = /^\d+$/.test(y);
    if (numericX && numericY) return Number(x) - Number(y);
    if (numericX !== numericY) return numericX ? -1 : 1;
    return x.localeCompare(y);
  }
  return 0;
}

function variantOf(name: string): ApkVariant | undefined {
  if (/teste|(?:^|[-_.])test(?:[-_.]|$)/i.test(name)) return "test";
  if (/(?:^|[-_.])demo(?:[-_.]|$)/i.test(name)) return "demo";
}

function matchesVariant(variant: ApkVariant | undefined, source: ApkSource): boolean {
  return !source.variant || (variant ?? "standard") === source.variant;
}

export function selectLatestApk(files: ApkFile[], source: ApkSource = {}): ApkFile | null {
  return files.filter((file) => matchesVariant(file.variant, source)).sort((a, b) => {
    // A new version wins even if an older file was uploaded again more recently.
    if (a.version && b.version) {
      const delta = compareVersions(b.version, a.version);
      if (delta) return delta;
    } else if (a.version || b.version) {
      return a.version ? -1 : 1;
    }
    if (source.preferredVariant) {
      const delta = Number(b.variant === source.preferredVariant) - Number(a.variant === source.preferredVariant);
      if (delta) return delta;
    }
    return Date.parse(b.publishedAt) - Date.parse(a.publishedAt)
      || Number(b.source === "release") - Number(a.source === "release")
      || a.filename.localeCompare(b.filename);
  })[0] ?? null;
}

export function initialApkStates(
  projects: { repository: string; apkSource?: ApkSource }[],
  published: Record<string, ApkFile | null>,
): Record<string, ApkState> {
  return Object.fromEntries(projects.filter((project) => project.apkSource).map((project) => {
    const known = published[project.repository];
    if (known === undefined) return [project.repository, { status: "loading" }];
    if (known && project.apkSource?.releaseAsset && known.filename !== project.apkSource.releaseAsset) {
      return [project.repository, { status: "loading" }];
    }
    const file = selectLatestApk(known ? [known] : [], project.apkSource);
    return [project.repository, { status: file ? "ready" : known ? "loading" : "missing", file: file ?? undefined }];
  }));
}

export function apkLookupFailed(previous?: ApkState): ApkState {
  // A metadata lookup failure does not invalidate an already verified download.
  return previous?.file ? { status: "ready", file: previous.file } : { status: "error" };
}

export async function discoverLatestApk(
  owner: string,
  repository: string,
  source: ApkSource = {},
  fetcher: typeof fetch = fetch,
): Promise<ApkFile | null> {
  const root = `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repository)}`;
  const headers = { Accept: "application/vnd.github+json" };

  async function request(url: string) {
    const response = await fetcher(url, {
      headers, cache: "no-store", signal: AbortSignal.timeout(15_000),
    });
    if (!response.ok) throw new Error(`GitHub APK lookup failed (${response.status})`);
    return response;
  }

  function releaseAssets(release: Release): ApkFile[] {
    const files: ApkFile[] = [];
    if (release.draft) return files;
    for (const asset of release.assets) {
      if (!/\.apk$/i.test(asset.name) || asset.state !== "uploaded") continue;
      const download = new URL(asset.browser_download_url);
      if (download.origin !== "https://github.com"
        || !download.pathname.startsWith(`/${owner}/${repository}/releases/download/`)) continue;
      const version = apkVersion(asset.name) ?? apkVersion(release.tag_name);
      files.push({
        href: download.href, filename: asset.name, version, sizeBytes: asset.size,
        variant: variantOf(asset.name), prerelease: release.prerelease || Boolean(version?.includes("-")),
        publishedAt: asset.updated_at > release.published_at ? asset.updated_at : release.published_at,
        source: "release",
      });
    }
    return files;
  }

  async function releaseFiles(): Promise<ApkFile[]> {
    const files: ApkFile[] = [];
    let url: string | undefined = `${root}/releases?per_page=100`;
    while (url) {
      const response = await request(url);
      const releases: Release[] = await response.json();
      for (const release of releases) {
        files.push(...releaseAssets(release));
      }
      const next = response.headers.get("link")?.match(/<([^>]+)>;\s*rel="next"/)?.[1];
      // Follow only pagination for this repository's release endpoint.
      url = next?.startsWith(`${root}/releases?`) ? next : undefined;
    }
    return files;
  }

  async function repositoryFiles(): Promise<ApkFile[]> {
    const response = await fetcher(`${root}/git/trees/HEAD?recursive=1`, {
      headers, cache: "no-store", signal: AbortSignal.timeout(15_000),
    });
    if (response.status === 409) return []; // Empty repository.
    if (!response.ok) throw new Error(`GitHub APK tree lookup failed (${response.status})`);
    const tree: Tree = await response.json();
    if (tree.truncated) throw new Error("GitHub returned an incomplete APK tree");
    const entries = tree.tree.filter((entry) => entry.type === "blob"
      && /^100(?:644|755)$/.test(entry.mode) && /\.apk$/i.test(entry.path)
      && matchesVariant(variantOf(entry.path.split("/").at(-1)!), source));

    // Only compare history for the highest version (or every unversioned APK).
    const versions = entries.map((entry) => apkVersion(entry.path.split("/").at(-1)!)).filter((v) => v !== undefined);
    const highest = versions.sort((a, b) => compareVersions(b, a))[0];
    const candidates = entries.filter((entry) => {
      const version = apkVersion(entry.path.split("/").at(-1)!);
      return !highest || Boolean(version && compareVersions(version, highest) === 0);
    });
    return Promise.all(candidates.map(async (entry) => {
      const filename = entry.path.split("/").at(-1)!;
      const history = await request(`${root}/commits?path=${encodeURIComponent(entry.path)}&sha=HEAD&per_page=1`);
      const commits: Commit[] = await history.json();
      const commit = commits[0];
      if (!commit || !/^[\da-f]{40}$/i.test(commit.sha)) throw new Error("Missing APK commit");
      const version = apkVersion(filename);
      return {
        href: `https://raw.githubusercontent.com/${encodeURIComponent(owner)}/${encodeURIComponent(repository)}/${commit.sha}/${entry.path.split("/").map(encodeURIComponent).join("/")}`,
        filename, version, sizeBytes: entry.size ?? 0,
        variant: variantOf(filename), prerelease: Boolean(version?.includes("-")),
        publishedAt: commit.commit.committer.date, source: "repository" as const,
      };
    }));
  }

  // Match metadata to the same release used by the stable download redirect.
  if (source.releaseAsset) {
    const response = await fetcher(`${root}/releases/latest`, {
      headers, cache: "no-store", signal: AbortSignal.timeout(15_000),
    });
    if (response.status === 404) return null;
    if (!response.ok) throw new Error(`GitHub latest APK lookup failed (${response.status})`);
    const release: Release = await response.json();
    if (release.prerelease) return null;
    return selectLatestApk(releaseAssets(release).filter((file) => file.filename === source.releaseAsset), source);
  }

  // Both must succeed: a partial lookup could silently select an older APK.
  const [releases, files] = await Promise.all([releaseFiles(), repositoryFiles()]);
  return selectLatestApk([...releases, ...files], source);
}

export function createApkLoader(resolve = discoverLatestApk) {
  const cache = new Map<string, { promise: Promise<ApkFile | null>; expires: number; pending: boolean }>();
  return function load(owner: string, repository: string, source: ApkSource, fresh = false) {
    const key = JSON.stringify([owner, repository, source]);
    const previous = cache.get(key);
    if (previous && (previous.pending || (!fresh && previous.expires > Date.now()))) return previous.promise;
    const entry = { promise: Promise.resolve(null) as Promise<ApkFile | null>, expires: 0, pending: true };
    entry.promise = resolve(owner, repository, source).then((file) => {
      entry.pending = false;
      entry.expires = Date.now() + 5 * 60_000;
      return file;
    }, (error: unknown) => {
      cache.delete(key);
      throw error;
    });
    cache.set(key, entry);
    return entry.promise;
  };
}
