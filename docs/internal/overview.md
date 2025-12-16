---
title: Internal Overview
sidebar_position: 1
effectiveDate: 2025-12-16
owners:
  - Snorkel Ops
  - Mistral Team
---

# Internal Documentation Overview

:::caution Internal Only
This documentation is for Snorkel and Mistral internal teams only. It contains operational details, calibration notes, and internal processes not intended for External Contributors.
:::

## Purpose

This internal section provides:
- **Calibration Guidelines** - Standards for training and aligning teams
- **QA Processes** - Quality assurance workflows and checkpoints
- **Metrics & Health** - Project performance indicators and monitoring
- **Release Notes** - Internal version tracking and deployment notes

## Audience

**Snorkel Team:**
- Project managers
- Operations coordinators
- Quality assurance leads
- Data scientists

**Mistral Team:**
- ML engineers
- Model trainers
- Research scientists
- Technical leads

## Section Overview

### [Calibration Notes](calibration-notes)
Guidelines for EC onboarding, training sessions, and maintaining consistency across submitters, reviewers, and adjudicators.

### [QA Process](qa-process)
Internal quality assurance workflows, sampling strategies, audit procedures, and escalation paths.

### [Metrics and Health](metrics-and-health)
Key performance indicators, project health dashboards, data quality metrics, and reporting.

### [Release Notes](release-notes)
Internal version history, deployment schedules, feature rollouts, and technical changes.

## Access Control

:::info Gating Mechanism
This section is controlled by the `INTERNAL_DOCS` environment variable:
- `INTERNAL_DOCS=true` - Internal docs visible
- Not set or `false` - Internal docs hidden from navigation

**Note:** This is a placeholder mechanism. Production deployment should implement proper authentication and authorization.
:::

## How to Use This Section

### For Project Managers
- Review [QA Process](qa-process) for quality workflows
- Monitor [Metrics and Health](metrics-and-health) for project status
- Reference [Calibration Notes](calibration-notes) for team training

### For Data Scientists
- Use [Metrics and Health](metrics-and-health) for data quality analysis
- Check [Calibration Notes](calibration-notes) for labeling standards
- Review [Release Notes](release-notes) for model training impacts

### For Operations Teams
- Follow [QA Process](qa-process) for audit procedures
- Use [Calibration Notes](calibration-notes) for EC management
- Track [Release Notes](release-notes) for deployment coordination

## Integration with EC Docs

This internal documentation **complements** the EC-facing documentation. When working with ECs:

- **Reference EC Docs** for guidelines ECs should follow
- **Use Internal Docs** for operational procedures and metrics
- **Maintain Separation** between what ECs see and internal processes

## Quick Links

**EC Documentation:**
- [Submitter Guide](/roles/submitter/overview)
- [Reviewer Guide](/roles/reviewer/overview)
- [Adjudicator Guide](/roles/adjudicator/overview)
- [Reference Docs](/reference/workflow/step-1-intent)

**Internal Operations:**
- [Calibration Notes](calibration-notes)
- [QA Process](qa-process)
- [Metrics Dashboard](metrics-and-health)
- [Release History](release-notes)

---

:::note TODO
**Content to Add:**
- Team contact directory
- Escalation matrix
- Runbook for common issues
- Integration with internal tools and dashboards
:::
