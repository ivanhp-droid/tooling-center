---
title: Metrics and Health
sidebar_position: 4
effectiveDate: 2025-12-16
owners:
  - Data Science Team
  - Program Management
---

# Project Metrics and Health

Key performance indicators, health dashboards, and data quality metrics for monitoring project success.

:::caution Internal Only
These metrics and dashboards are for internal monitoring and decision-making.
:::

## Overview

This page documents the metrics we track to ensure project health, data quality, and program success.

## Key Performance Indicators (KPIs)

### Data Quality KPIs

**Primary KPIs:**

1. **Acceptance Rate**
   - **Definition:** % of submissions accepted by reviewers
   - **Target:** 60-75%
   - **Current:** [To be tracked]
   - **Why it matters:** Indicates training effectiveness and guideline clarity

2. **Audit Pass Rate**
   - **Definition:** % of accepted submissions that pass QA audit
   - **Target:** >95%
   - **Current:** [To be tracked]
   - **Why it matters:** Validates reviewer judgment and final quality

3. **Inter-Rater Reliability (IRR)**
   - **Definition:** Agreement between multiple reviewers (Cohen's Kappa)
   - **Target:** >0.80
   - **Current:** [To be tracked]
   - **Why it matters:** Ensures consistent application of guidelines

4. **Revision Success Rate**
   - **Definition:** % of rejected submissions accepted after revision
   - **Target:** >70%
   - **Current:** [To be tracked]
   - **Why it matters:** Indicates feedback quality and EC learning

**Secondary KPIs:**

5. **Average Quality Score**
   - **Definition:** Mean quality rating across all accepted submissions
   - **Target:** >4.0/5.0
   - **Current:** [To be tracked]

6. **Failure Mode Coverage**
   - **Definition:** Distribution of submissions across failure mode categories
   - **Target:** Balanced across categories
   - **Current:** [To be tracked]

### Productivity KPIs

7. **Submissions Per Week**
   - **Definition:** Total submissions per EC per week
   - **Target:** 15-25 (submitters)
   - **Current:** [To be tracked]

8. **Reviews Per Week**
   - **Definition:** Total reviews per EC per week
   - **Target:** 40-60 (reviewers)
   - **Current:** [To be tracked]

9. **Time Per Task**
   - **Submission:** 20-45 minutes
   - **Review:** 10-20 minutes
   - **Adjudication:** 15-30 minutes
   - **Current:** [To be tracked]

### Training Pipeline KPIs

10. **Training Data Quality Score**
    - **Definition:** Automated quality assessment of data entering training
    - **Target:** >4.5/5.0
    - **Current:** [To be tracked]

11. **Data Diversity**
    - **Definition:** Distribution across topics, failure modes, complexity
    - **Target:** Shannon entropy >X
    - **Current:** [To be tracked]

12. **Duplicate Rate**
    - **Definition:** % of submissions that are too similar to existing ones
    - **Target:** <5%
    - **Current:** [To be tracked]

## Health Dashboard

### Overall Project Health

**Status Indicators:**

🟢 **Healthy** - All KPIs in target range  
🟡 **Warning** - 1-2 KPIs below target  
🔴 **Critical** - 3+ KPIs below target or critical issue

**Current Status:** [To be tracked]

### Component Health

| Component | Status | Key Metric | Notes |
|-----------|--------|------------|-------|
| Submission Quality | [Status] | Acceptance Rate: X% | [Notes] |
| Review Quality | [Status] | IRR: X.XX | [Notes] |
| EC Performance | [Status] | Productivity: X/week | [Notes] |
| Training Pipeline | [Status] | Quality Score: X.X/5 | [Notes] |

## Detailed Metrics

### Submission Metrics

**Quality Distribution:**
```
5 stars (Excellent): X%
4 stars (Good): X%
3 stars (Acceptable): X%
2 stars (Poor): X%
1 star (Very Poor): X%
```

**Rejection Reasons:**
```
1. Unclear intent: X%
2. Subtle failure mode: X%
3. Unrealistic: X%
4. Poor good/bad contrast: X%
5. Other: X%
```

**Failure Mode Distribution:**
```
Instruction Retention: X%
Course Correction: X%
Task Continuation: X%
Other: X%
```

### Reviewer Metrics

**Consistency Scores by Reviewer:**
- Reviewer A: X% agreement
- Reviewer B: X% agreement
- Reviewer C: X% agreement
- [...]

**Average Review Time:**
- Fast (<10 min): X%
- Normal (10-20 min): X%
- Slow (>20 min): X%

**Feedback Quality:**
- Excellent: X%
- Good: X%
- Needs Improvement: X%

### EC Performance

**Submitters:**
- Top performers (>90% acceptance): X ECs
- Average performers (60-90% acceptance): X ECs
- Needs training (<60% acceptance): X ECs

**Reviewers:**
- High consistency (>85% agreement): X ECs
- Average consistency (75-85%): X ECs
- Needs calibration (<75%): X ECs

### Pipeline Metrics

**Weekly Throughput:**
```
Week 1: X submissions accepted
Week 2: X submissions accepted
Week 3: X submissions accepted
Week 4: X submissions accepted
```

**Quality Over Time:**
```
[Graph showing quality score trend]
```

**Volume by Failure Mode:**
```
[Graph showing volume by category over time]
```

## Alerting and Thresholds

### Automatic Alerts

**Red Alerts (Immediate Action):**
- Acceptance rate <50% or >85%
- Audit pass rate <90%
- IRR <0.70
- Critical quality issues in training data

**Yellow Alerts (Monitor Closely):**
- Acceptance rate 50-60% or 75-85%
- Audit pass rate 90-95%
- IRR 0.70-0.80
- Single EC showing pattern of issues

**Info Alerts:**
- Unusual volume changes (>20% week-over-week)
- Failure mode imbalance (>60% in one category)
- Processing time outliers

### Alert Response

**Red Alert Response:**
1. Immediate investigation
2. Pause affected work if needed
3. Root cause analysis
4. Corrective action plan
5. Resume with monitoring

**Yellow Alert Response:**
1. Review within 24 hours
2. Determine if trending toward red
3. Proactive intervention if needed
4. Document observations

## Reporting

### Daily Reports

**Automated Daily Digest:**
- Submissions received: X
- Submissions accepted: X
- Submissions rejected: X
- Reviews completed: X
- Adjudications: X
- Key alerts: [List]

### Weekly Reports

**Weekly Summary:**
- KPI dashboard
- Health status
- Top performers
- Issues identified
- Actions taken
- Next week focus

### Monthly Reports

**Monthly Executive Summary:**
- Program overview
- Trend analysis
- Quality deep dive
- Resource utilization
- Recommendations
- Quarterly outlook

## Data Analysis

### Quality Trends

**Month-over-Month:**
- Quality score trends
- Acceptance rate trends
- Review consistency trends
- Productivity trends

**Cohort Analysis:**
- New EC performance over time
- Training effectiveness
- Calibration impact

### Predictive Analytics

**Leading Indicators:**
- Early warning signs of quality issues
- EC performance prediction
- Volume forecasting
- Bottleneck identification

## Continuous Improvement

### Metric-Driven Actions

**When acceptance rate is too low (<60%):**
- Review guidelines for clarity
- Additional training sessions
- More examples needed
- Calibration focus

**When acceptance rate is too high (>85%):**
- Review if standards are slipping
- Increase QA audit rate
- Recalibration to gold standard
- Reviewer training

**When IRR is low (<0.80):**
- Immediate calibration session
- Guideline clarification needed
- More example cases
- Individual reviewer feedback

### Quarterly Goals

**Q1 2026:**
- [ ] Achieve 70% acceptance rate
- [ ] Reach 0.85 IRR
- [ ] 95%+ audit pass rate
- [ ] <15% variance in productivity

**Q2 2026:**
- [ ] Maintain Q1 metrics
- [ ] Improve avg quality to 4.2/5.0
- [ ] Reduce avg review time to 12 min
- [ ] Increase throughput by 20%

---

## Tools and Dashboards

### Internal Dashboards

**Quality Dashboard:**
- Real-time KPI tracking
- Trend visualizations
- Alert system
- Drill-down capabilities

**EC Performance Dashboard:**
- Individual metrics
- Team comparisons
- Improvement tracking
- Recognition highlights

**Pipeline Dashboard:**
- Training data flow
- Quality gates status
- Bottleneck identification
- Volume forecasting

### Access

**Dashboard Access Levels:**
- **Program Managers:** Full access to all dashboards
- **Team Leads:** Team-specific metrics
- **QA Team:** Quality and audit dashboards
- **Data Science:** Pipeline and training metrics

---

:::tip Data-Driven Decisions
Use metrics to guide decisions, but remember: not everything that matters can be measured, and not everything measured matters.
:::

:::note TODO
**Content to Add:**
- Live dashboard links
- Historical baseline data
- Statistical significance testing
- Predictive models and forecasts
- Automated anomaly detection
:::
