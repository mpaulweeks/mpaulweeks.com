import { ProjectInfo } from "./projects";

export type Category = {
  label: string;
  projects: ProjectInfo[];
}

const priorityBins = ["wip", "defunct"];
const scales = [{
  key: "large",
  name: "Featured Projects",
}, {
  key: "small",
  name: "All Projects",
}, {
  key: "wip",
  name: "Work in Progress",
}, {
  key: "defunct",
  name: "No Longer Maintained",
}];

export function binProjectsByScale(projects: ProjectInfo[]): Category[] {
  const cMap: Record<string, ProjectInfo[]> = {};
  projects.forEach(p => {
    const scale = priorityBins.includes(p.status) ? p.status : p.scale;
    cMap[scale] = (cMap[scale] || []).concat(p);
  });
  return scales.map(scale => ({
    label: scale.name,
    projects: cMap[scale.key] || [],
  }));
}
