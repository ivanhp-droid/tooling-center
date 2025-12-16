import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
      </div>
    </header>
  );
}

function RoleCard({title, description, to, icon}: {title: string, description: string, to: string, icon: string}) {
    return (
        <div className="col col--4 margin-bottom--lg">
            <div className="card padding--md shadow--md h-100">
                <div className="card__header">
                    <h3>{icon} {title}</h3>
                </div>
                <div className="card__body">
                    <p>{description}</p>
                </div>
                <div className="card__footer">
                    <Link
                        className="button button--secondary button--block"
                        to={to}>
                        Go to {title}
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Project Guidelines">
      <HomepageHeader />
      <main>
        <div className="container margin-vert--xl">
            <Heading as="h2" className="text--center margin-bottom--lg">Select Your Role</Heading>
            <div className="row">
                <RoleCard 
                    title="Submitter" 
                    description="Create high-quality data. Checklists and common mistakes."
                    to="/roles/submitter/overview"
                    icon="✍️"
                />
                <RoleCard 
                    title="Reviewer" 
                    description="Evaluate submissions. Rubrics and feedback guidelines."
                    to="/roles/reviewer/overview"
                    icon="🔍"
                />
                <RoleCard 
                    title="Adjudicator" 
                    description="Resolve conflicts. Tie-breaking principles."
                    to="/roles/adjudicator/overview"
                    icon="⚖️"
                />
            </div>
            
            <div className="row margin-top--lg">
                 <div className="col col--6 col--offset-3">
                    <div className="card shadow--sm">
                        <div className="card__header">
                             <h3>🔒 Internal Team</h3>
                        </div>
                        <div className="card__body">
                            <p>For Snorkel + Mistral team members.</p>
                            <Link to="/internal/overview">Go to Internal Docs</Link> 
                            <small className="display-block margin-top--sm text--secondary">(Requires INTERNAL_DOCS=true)</small>
                        </div>
                    </div>
                 </div>
            </div>

            <hr className="margin-vert--xl" />

            <div className="row">
                <div className="col col--8 col--offset-2">
                    <Heading as="h3">📅 What Changed Recently</Heading>
                    <p>Check the <Link to="/reference/changelog">Changelog</Link> for the latest updates.</p>
                    <ul>
                        <li>Initial site launch (Dec 16, 2025)</li>
                    </ul>
                </div>
            </div>
        </div>
      </main>
    </Layout>
  );
}
