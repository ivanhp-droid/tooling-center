---
title: Common Edge Cases
sidebar_position: 3
effectiveDate: 2025-12-16
owners:
  - EC Ops Team
  - Adjudication Lead
---

# Common Adjudicator Edge Cases

Real-world examples of complex cases and how to handle them.

## Category 1: Interpretation Disputes

### Edge Case: Guideline Ambiguity

**Situation:** Reviewer and submitter interpret a guideline differently, both interpretations seem reasonable.

**Resolution Approach:**
1. Identify which interpretation better serves training goals
2. Make a ruling for this case
3. Document the clarification
4. Flag guideline for update

**Example:**
- Guideline says "clear failure mode"
- Reviewer says failure must be in first sentence
- Submitter says failure can be anywhere if it's obvious
- **Decision:** Failure must be clear but doesn't require specific placement; document this clarification

### Edge Case: Guidelines Don't Cover This

**Situation:** Submission uses an approach not mentioned in guidelines—not prohibited, just not documented.

**Resolution Approach:**
1. Evaluate on core principles (training value, clarity, consistency)
2. If valuable and not harmful → Accept
3. Document as precedent
4. Recommend guideline addition

## Category 2: Quality Disagreements

### Edge Case: "Good Enough" Debate

**Situation:** Reviewers disagree on whether quality meets the bar.

**Resolution Approach:**
1. Apply rubric objectively
2. Check critical elements are present
3. If meets minimum bar → Accept
4. If multiple weaknesses compound → Reject

**Ruling Framework:**
- Single minor issue + otherwise strong → Accept
- Multiple minor issues → Reject
- Any critical issue → Reject

### Edge Case: Exceptional but Flawed

**Situation:** Submission excels in most areas but has one notable flaw.

**Resolution Approach:**
1. Is the flaw in a critical area (intent, failure mode clarity)?
   - Yes → Reject with feedback
   - No → Consider accepting with note
2. Can the flaw be easily fixed? Consider revision opportunity

## Category 3: Creative Approaches

### Edge Case: Novel Failure Mode

**Situation:** Submitter demonstrates a failure mode not in the standard categories.

**Resolution Approach:**
1. Is it a real, observable AI failure?
2. Is it clear and teachable?
3. Could it fit an existing category with clarification?

**Decision Matrix:**
- Real + Clear + Novel → Accept + flag for category consideration
- Real + Unclear → Reject, ask for clarity
- Not realistic → Reject

### Edge Case: Experimental Format

**Situation:** Submission uses a non-standard structure but includes all required elements.

**Resolution Approach:**
1. Are all critical elements present?
2. Is it as clear as standard format?
3. Does it add value or just difference?

**Default:** If equally effective → Accept. If reduces clarity → Reject.

## Category 4: Context and Intent

### Edge Case: Lost Context

**Situation:** User prompts or responses reference previous conversation context that isn't shown.

**Resolution Approach:**
1. Is missing context critical to understanding?
   - Yes → Reject, request complete context
   - No → Accept with note
2. Can a reviewer understand the scenario without it?

**Rule of Thumb:** A fresh reviewer should understand everything without external information.

### Edge Case: Implicit vs. Explicit

**Situation:** Intent or failure mode is implied but not explicitly stated.

**Resolution Approach:**
- If 95% of reviewers would catch it → Accept
- If requires careful reading or inference → Reject for explicitness

**Example:**
- Implicit: System prompt says "be concise" and bad response is 500 words → Clear enough
- Implicit: Bad response has subtle logical error → Too implicit, reject

## Category 5: Appeals and Resubmissions

### Edge Case: Minimal Changes on Resubmission

**Situation:** Submitter makes tiny changes after rejection and resubmits.

**Resolution Approach:**
1. Did they address the feedback?
   - Fully → Re-evaluate fairly
   - Partially → Reject with specific remaining issues
   - Not at all → Reject + note about feedback adherence
2. Don't penalize for small changes if they fix the issue

### Edge Case: Disagreement with Rejection

**Situation:** Submitter appeals, claiming reviewer misunderstood.

**Resolution Approach:**
1. Re-read submission objectively
2. Was reviewer's assessment accurate?
3. Was feedback clear and correct?

**Possible Outcomes:**
- Reviewer was right → Uphold, explain why
- Reviewer missed something → Overturn, clarify for future
- Legitimate gray area → Use tie-breaking principles

## Category 6: Systemic Issues

### Edge Case: Pattern of Issues from Submitter

**Situation:** Same submitter repeatedly makes similar mistakes.

**Resolution Approach:**
- Judge **this submission** on its own merits
- Note pattern separately for ops team
- Don't punish current submission for past issues
- Consider additional training/feedback for submitter

### Edge Case: Changing Standards

**Situation:** Guidelines or precedents have evolved; submission would have passed before.

**Resolution Approach:**
- Apply **current** standards
- Be explicit about what changed
- Provide clear guidance on current expectations
- Consider grandfather clause only if explicitly stated

## When to Escalate Further

Even adjudicators sometimes need to escalate:

**Escalate to Ops Team when:**
- Guidelines are fundamentally unclear or contradictory
- Decision would set major new precedent
- Systemic issue affecting multiple submissions
- Proposed guideline change needed

---

:::tip Learn from Every Case
Each edge case you resolve adds to the collective knowledge. Document them well!
:::

:::note TODO
**Content to Add:**
- Actual anonymized case studies
- Decision statistics by category
- Precedent database/searchable archive
- Common appeal outcomes
:::
