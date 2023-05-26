import Image from 'next/image'
import styles from './page.module.css'
import { Projects } from '@/data/projects'
import { ProjectLink } from '@/comp/ProjectLink'

export default function Home() {
  return (
    <main className={styles.main}>
      Hello world
      {Projects.map(p => (
        <ProjectLink key={p.name} info={p} />
      ))}
    </main>
  )
}
