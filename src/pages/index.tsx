import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  
  return (
    <Layout
      title="Welcome"
      description="Supernaut EC Guidelines - Your single source of truth for project guidelines">
      <main>
        <div className="container" style={{padding: '4rem 0'}}>
          <div style={{textAlign: 'center', marginBottom: '3rem'}}>
            <h1 style={{fontSize: '3rem', marginBottom: '1rem'}}>
              {siteConfig.title}
            </h1>
            <p style={{fontSize: '1.5rem', color: 'var(--ifm-color-secondary)'}}>
              {siteConfig.tagline}
            </p>
          </div>

          <div style={{marginBottom: '4rem'}}>
            <h2 style={{textAlign: 'center', marginBottom: '2rem'}}>
              Select Your Role
            </h2>
            <div className="role-grid">
              <Link to="/roles/submitter/overview" className="role-card" style={{textDecoration: 'none'}}>
                <h3>🎯 I'm a Submitter</h3>
                <p>Learn how to create high-quality submissions that meet project standards</p>
                <div style={{marginTop: 'auto'}}>
                  <span style={{color: 'var(--ifm-color-primary)', fontWeight: 'bold'}}>
                    Get Started →
                  </span>
                </div>
              </Link>

              <Link to="/roles/reviewer/overview" className="role-card" style={{textDecoration: 'none'}}>
                <h3>🔍 I'm a Reviewer</h3>
                <p>Master the art of providing constructive, consistent feedback</p>
                <div style={{marginTop: 'auto'}}>
                  <span style={{color: 'var(--ifm-color-primary)', fontWeight: 'bold'}}>
                    Get Started →
                  </span>
                </div>
              </Link>

              <Link to="/roles/adjudicator/overview" className="role-card" style={{textDecoration: 'none'}}>
                <h3>⚖️ I'm an Adjudicator</h3>
                <p>Navigate complex cases with clear principles and edge case guidance</p>
                <div style={{marginTop: 'auto'}}>
                  <span style={{color: 'var(--ifm-color-primary)', fontWeight: 'bold'}}>
                    Get Started →
                  </span>
                </div>
              </Link>

              {process.env.INTERNAL_DOCS === 'true' && (
                <Link to="/internal/overview" className="role-card" style={{textDecoration: 'none', borderColor: 'var(--ifm-color-warning)'}}>
                  <h3>🔐 Internal Team</h3>
                  <p>Access internal calibration notes, QA processes, and metrics</p>
                  <div style={{marginTop: 'auto'}}>
                    <span style={{color: 'var(--ifm-color-warning)', fontWeight: 'bold'}}>
                      Go to Internal →
                    </span>
                  </div>
                </Link>
              )}
            </div>
          </div>

          <div style={{
            background: 'var(--ifm-background-surface-color)',
            padding: '2rem',
            borderRadius: '8px',
            marginBottom: '3rem'
          }}>
            <h3 style={{marginBottom: '1rem'}}>📋 Quick Links</h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem'
            }}>
              <Link to="/reference/workflow/step-1-intent" style={{textDecoration: 'none'}}>
                → Workflow Guide
              </Link>
              <Link to="/reference/failure-modes/overview" style={{textDecoration: 'none'}}>
                → Failure Modes
              </Link>
              <Link to="/reference/tools/overview" style={{textDecoration: 'none'}}>
                → Tool Reference
              </Link>
              <Link to="/reference/faq-glossary" style={{textDecoration: 'none'}}>
                → FAQ & Glossary
              </Link>
            </div>
          </div>

          <div style={{
            background: 'var(--ifm-color-primary-lightest)',
            padding: '1.5rem',
            borderRadius: '8px',
            borderLeft: '4px solid var(--ifm-color-primary)'
          }}>
            <h4 style={{marginTop: 0}}>📝 What Changed Recently?</h4>
            <p style={{marginBottom: '0.5rem'}}>
              Check out the <Link to="/reference/changelog" style={{fontWeight: 'bold'}}>Changelog</Link> to see the latest updates, clarifications, and additions to the guidelines.
            </p>
          </div>
        </div>
      </main>
    </Layout>
  );
}
