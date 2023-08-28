import { Projects } from '@/data/projects'
import { ProjectGroup } from '@/component/projectGroup'
import styles from './portfolio.module.css'
import { binProjectsByScale } from '@/data/utils';
import { ExternalLinks } from '@/data/external';

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
          alt=""
        />
      </section>
      <section className={styles.PortfolioTitle}>
        m. paul weeks
      </section>

      <section className={styles.PortfolioLinks}>
        {ExternalLinks.map(link => (
          <div key={link.label}>
            <a href={link.url}>{link.label}</a>
          </div>
        ))}
      </section>

      <section>
        {categories.map(cat => (
          <ProjectGroup key={cat.label} data={cat} />
        ))}
      </section>
    </main>
  );
}
