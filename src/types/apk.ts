export type ApkVariant = "test" | "demo";

export type ApkSource = {
  variant?: "standard" | ApkVariant;
  preferredVariant?: ApkVariant;
  directDownloadHref?: string;
  releaseAsset?: string;
};

export type ApkFile = {
  href: string;
  filename: string;
  version?: string;
  sizeBytes: number;
  variant?: ApkVariant;
  prerelease: boolean;
  publishedAt: string;
  source: "release" | "repository";
};

export type ApkState = {
  status: "loading" | "ready" | "missing" | "error";
  file?: ApkFile;
};
