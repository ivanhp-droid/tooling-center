---
title: QA Process
sidebar_position: 3
effectiveDate: 2025-12-16
owners:
  - QA Lead
  - Operations Team
---

# Quality Assurance Process

Internal QA workflows, audit procedures, and quality gates for the EC program.

:::caution Internal Only
These QA procedures are for internal operations teams only.
:::

## QA Philosophy

**Quality First:** We prioritize training data quality over quantity. Every submission that enters the training pipeline must meet our standards.

### Core Principles:
1. **Catch Early** - Quality checks at multiple stages
2. **Continuous Monitoring** - Ongoing quality assessment
3. **Rapid Feedback** - Quick turnaround on issues
4. **Data-Driven** - Metrics guide decisions
5. **Continuous Improvement** - Learn and adapt

## QA Workflow

### Stage 1: Submission Creation
**Owner:** Submitter

**Quality Gates:**
- Self-review checklist completion
- Automated format validation
- Basic completeness check

**QA Actions:**
- None (self-service)

---

### Stage 2: Initial Review
**Owner:** Reviewer

**Quality Gates:**
- Rubric-based evaluation
- Completeness verification
- Failure mode validation
- Good/bad contrast check

**QA Actions:**
- Spot-check 10% of reviews
- Track reviewer consistency
- Flag outlier decisions

---

### Stage 3: Adjudication (if needed)
**Owner:** Adjudicator

**Quality Gates:**
- Final quality decision
- Precedent documentation
- Clear reasoning required

**QA Actions:**
- Review 100% of novel precedents
- Track adjudication consistency
- Audit precedent documentation

---

### Stage 4: Training Pipeline
**Owner:** Data Science Team

**Quality Gates:**
- Final data validation
- Format standardization
- Deduplication check
- Diversity sampling

**QA Actions:**
- Automated quality scoring
- Manual audit of random sample
- Flag low-quality batches
- Monitor training metrics

## Sampling Strategy

### Random Sampling

**10% Random Sample:**
- Applied to all accepted submissions
- Audited by QA team
- Used for calibration and metrics

**Stratified Sampling:**
- Sample across:
  - Different submitters
  - Different failure modes
  - Different time periods
  - Edge cases vs. standard cases

### Targeted Sampling

**New EC Work:**
- First 20 submissions: 100% audit
- Next 50 submissions: 50% audit
- After calibration: 10% audit

**Borderline Decisions:**
- 50% audit of submissions near accept/reject boundary
- Used for reviewer calibration

**Escalated Cases:**
- 100% review of adjudicated submissions
- Document for training purposes

## Quality Metrics

### Primary Metrics

**Acceptance Rate:**
- Target: 60-75% of submissions accepted
- Too high: Standards may be slipping
- Too low: Training may be insufficient

**Reviewer Agreement:**
- Inter-rater reliability score
- Target: >0.80 Cohen's Kappa
- Measure: Multiple reviewers on same submissions

**Audit Pass Rate:**
- % of accepted submissions that pass QA audit
- Target: >95%
- If lower: Review processes need adjustment

**Time Metrics:**
- Submission time: 20-45 minutes
- Review time: 10-20 minutes
- Adjudication time: 15-30 minutes
- Flag outliers for process issues

### Secondary Metrics

**Failure Mode Distribution:**
- Track which failure modes are being tested
- Ensure balanced coverage
- Target: 40% instruction retention, 30% course correction, 30% task continuation

**Rejection Reasons:**
- Track why submissions are rejected
- Identify training opportunities
- Update guidelines if patterns emerge

**Revision Success Rate:**
- % of rejected submissions that pass after revision
- Target: >70%
- Indicates feedback quality

## Audit Procedures

### Random Audit Process

**Weekly Audits:**

1. **Sample Selection** (Monday)
   - Pull 10% random sample from previous week
   - Stratify by submitter and failure mode
   - Include edge cases

2. **Audit Execution** (Tuesday-Wednesday)
   - QA team reviews each submission
   - Score against rubric
   - Document issues found
   - Flag systematic problems

3. **Results Analysis** (Thursday)
   - Calculate agreement rates
   - Identify patterns
   - Determine if action needed

4. **Feedback and Action** (Friday)
   - Share findings with team
   - Individual feedback where needed
   - Update training materials
   - Adjust processes if needed

### Deep Dive Audits

**Monthly Deep Dives:**

Focus on one area each month:
- Month 1: Submission quality (intents, prompts)
- Month 2: Response quality (good vs. bad)
- Month 3: Review quality (feedback, decisions)
- Month 4: Adjudication quality (consistency, documentation)

**Process:**
1. Select 50-100 examples
2. Detailed analysis
3. Identify best practices and issues
4. Create calibration materials
5. Update guidelines if needed

## Issue Escalation

### Severity Levels

**Level 1: Individual Issue**
- Single submission with quality concern
- **Action:** Individual feedback to EC
- **Timeline:** Within 1 day

**Level 2: Pattern**
- Multiple submissions from same EC with same issue
- **Action:** Targeted training, temporary oversight
- **Timeline:** Within 2 days

**Level 3: Systemic**
- Multiple ECs showing same issue
- **Action:** Calibration session, guideline update
- **Timeline:** Within 1 week

**Level 4: Critical**
- Quality issues in training pipeline
- **Action:** Pause affected submissions, immediate review
- **Timeline:** Immediate (same day)

### Escalation Path

```
EC → Team Lead → QA Lead → Program Manager → Technical Lead
```

**When to Escalate:**
- Quality metrics fall below thresholds
- Systematic issues identified
- Guideline conflicts discovered
- Novel scenarios requiring precedent
- Critical quality failures

## Quality Gates

### Must Pass Before Acceptance:

1. **Completeness:** All required fields filled
2. **Clarity:** Intent and failure mode are clear
3. **Realism:** Prompts and responses are realistic
4. **Contrast:** Good/bad difference is obvious
5. **Consistency:** Aligns with guidelines
6. **Value:** Would benefit model training

### Auto-Reject Criteria:

- Missing required components
- Nonsensical or gibberish content
- Multiple failure modes mixed
- Unrealistic AI behavior
- Contradicts system prompt
- Too subtle failure mode
- Plagiarized or duplicate content

## Continuous Improvement

### Weekly Review

**Team Meeting:**
- Review quality metrics
- Discuss challenging cases
- Share best practices
- Identify improvement opportunities

### Monthly Assessment

**Program Health Check:**
- Comprehensive metrics review
- Calibration effectiveness
- Process efficiency
- EC satisfaction
- Training pipeline quality

### Quarterly Planning

**Strategic Review:**
- Long-term quality trends
- Guideline effectiveness
- Process optimizations
- Resource allocation
- Goal setting for next quarter

## QA Tools and Automation

### Automated Checks

**Pre-Submission:**
- Format validation
- Word count verification
- Required field checks
- Basic duplicate detection

**Post-Submission:**
- Consistency scoring
- Similarity detection
- Outlier flagging
- Metric tracking

### Manual Review Tools

**Audit Dashboard:**
- Sample selection interface
- Side-by-side comparison
- Scoring rubrics
- Comment/feedback entry

**Metrics Dashboard:**
- Real-time quality metrics
- Trend visualization
- EC performance tracking
- Alert system

---

## QA Team Responsibilities

### QA Lead
- Overall quality strategy
- Metric monitoring and reporting
- Escalation management
- Team coordination

### QA Analysts
- Conduct audits
- Provide feedback
- Track metrics
- Create calibration materials

### Operations Team
- Process execution
- Tool management
- Coordination with ECs
- Issue resolution

---

:::tip Quality Culture
Quality is everyone's responsibility. Encourage ECs to self-audit, ask questions, and continuously improve.
:::

:::note TODO
**Content to Add:**
- Detailed rubrics for QA audits
- Automated quality scoring algorithms
- Integration with data pipeline tools
- Historical quality trends analysis
:::
