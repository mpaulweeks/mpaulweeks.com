import { ProjectInfo } from "@/data/projects";
import styles from './projectLink.module.css';

export function ProjectLink(props: {
  info: ProjectInfo;
}) {
  const { info } = props;
  const imgSrc = info.image ?? 'preview/placeholder.png';
  return (
    <div className={styles.ProjectLink}>
      <a href={info.url}>
        <img className={styles.ProjectPreview} src={imgSrc} alt="" />
        <div className={styles.ProjectName}>
          {info.name}
        </div>
      </a>
      <div className={styles.ProjectDescription}>
        {info.description.split('\n').map((line, li) => (
          <div key={[info.name, li].join('-')} dangerouslySetInnerHTML={{ __html: line,}} />
        ))}
      </div>
      <div className={styles.ProjectDate}>
        {info.date_pretty}
      </div>
    </div>
  );
}
