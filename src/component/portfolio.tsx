import { Projects } from '@/data/projects'
import { ProjectGroup } from '@/component/projectGroup'
import styles from './portfolio.module.css'
import { binProjectsByScale } from '@/data/utils';

export function Portfolio() {
  const sorted = Projects
    .filter(p => !p.hidden)
    .sort((a,b) => a.date > b.date ? -1 : 1);
  const categories = binProjectsByScale(sorted)
    .filter(cat => cat.projects.length > 0);
  return (
    <main className={styles.Portfolio}>
      <section>
        <img
          className={styles.PortfolioLogo}
          src="favicon.png"
        />
      </section>
      <section className={styles.PortfolioTitle}>
        m. paul weeks
      </section>

      <section className={styles.PortfolioLinkContainer}>
        <div className={styles.PortfolioLink}><a href="mailto:mpaulweeks@gmail.com">email</a></div>
        <div className={styles.PortfolioLink}><a href="https://twitter.com/mpaulweeks">twitter</a></div>
        <div className={styles.PortfolioLink}><a href="https://github.com/mpaulweeks">github</a></div>
        <div className={styles.PortfolioLink}><a href="https://blog.mpaulweeks.com">blog</a></div>
      </section>

      <section>
        {categories.map(cat => (
          <ProjectGroup key={cat.label} data={cat} />
        ))}
      </section>
    </main>
  );
}
