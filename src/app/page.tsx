import styles from './page.module.css'
import { Projects } from '@/data/projects'
import { ProjectLink } from '@/component/projectLink'
import { ProjectGroup } from '@/component/projectGroup'

export default function Home() {
  return (
    <main className={styles.main}>
      <ProjectGroup>
        {Projects.filter(p => !p.hidden).map(p => (
          <ProjectLink key={p.name} info={p} />
        ))}
      </ProjectGroup>
    </main>
  )
}
