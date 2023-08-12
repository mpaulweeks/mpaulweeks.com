import styles from './projectGroup.module.css';
import { Category } from "@/data/utils";
import { ProjectLink } from "./projectLink";

export function ProjectGroup(props: {
  data: Category;
}) {
  return (
    <main className={styles.ProjectGroup}>
      <h2 className={styles.ProjectGroupTitle}>
        {props.data.label}
      </h2>
      <section className={styles.ProjectGroupList}>
        {props.data.projects.map(p => (
          <ProjectLink key={p.name} info={p} />
          ))}
      </section>
    </main>
  );
}
