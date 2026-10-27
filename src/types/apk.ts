export type ApkVariant = "test" | "demo";

export type ApkSource = {
  preferredVariant?: ApkVariant;
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
