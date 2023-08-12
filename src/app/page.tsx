import { Portfolio } from '@/component/portfolio'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <Portfolio />
    </main>
  )
}
