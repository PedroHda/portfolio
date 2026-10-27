"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { githubOwner } from "@/data/projects";
import { createApkLoader } from "@/services/github-apks";
import type { ApkFile, ApkState } from "@/types/apk";
import type { ProjectDefinition } from "@/types/project";

const load = createApkLoader();
const loading: ApkState = { status: "loading" };
type DownloadsContext = {
  states: Record<string, ApkState>;
  refresh: (project: ProjectDefinition) => Promise<ApkFile | null>;
};
const context = createContext<DownloadsContext | null>(null);

export function ApkDownloadsProvider({ projects, children }: { projects: ProjectDefinition[]; children: ReactNode }) {
  const [states, setStates] = useState<Record<string, ApkState>>({});
  const refresh = useCallback(async (project: ProjectDefinition) => {
    if (!project.apkSource) return null;
    setStates((current) => ({ ...current, [project.repository]: { ...current[project.repository], status: "loading" } }));
    try {
      const file = await load(githubOwner, project.repository, project.apkSource, true);
      setStates((current) => ({ ...current, [project.repository]: { status: file ? "ready" : "missing", file: file ?? undefined } }));
      return file;
    } catch (error) {
      setStates((current) => ({ ...current, [project.repository]: { ...current[project.repository], status: "error" } }));
      throw error;
    }
  }, []);

  useEffect(() => {
    let active = true;
    for (const project of projects) {
      if (!project.apkSource) continue;
      void load(githubOwner, project.repository, project.apkSource).then((file) => {
        if (active) setStates((current) => ({ ...current, [project.repository]: { status: file ? "ready" : "missing", file: file ?? undefined } }));
      }).catch(() => {
        if (active) setStates((current) => ({ ...current, [project.repository]: { status: "error" } }));
      });
    }
    return () => { active = false; };
  }, [projects]);

  const value = useMemo(() => ({ states, refresh }), [states, refresh]);
  return <context.Provider value={value}>{children}</context.Provider>;
}

export function useApkDownloads() {
  const value = useContext(context);
  if (!value) throw new Error("APK downloads require ApkDownloadsProvider");
  return value;
}

export function useProjectApk(project: ProjectDefinition) {
  const { states, refresh } = useApkDownloads();
  return { state: states[project.repository] ?? loading, refresh: () => refresh(project) };
}
