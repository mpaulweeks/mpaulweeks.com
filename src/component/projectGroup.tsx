import { PropsWithChildren } from "react";
import styles from './projectGroup.module.css';

export function ProjectGroup(props: {
  groupLabel?: string;
} & PropsWithChildren) {
  // todo use groupLabel
  return (
    <div className={styles.ProjectGroup}>
      {props.children}
    </div>
  )
}
