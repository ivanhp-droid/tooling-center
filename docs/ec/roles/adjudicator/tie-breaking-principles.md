---
title: Tie-Breaking Principles
sidebar_position: 2
effectiveDate: 2025-12-16
owners:
  - EC Ops Team
  - Adjudication Lead
---

# Tie-Breaking Principles

When faced with borderline cases or disagreements, use these principles to make consistent, defensible decisions.

## The Decision Hierarchy

When evaluating edge cases, apply these principles in order:

### 1. Training Value (Highest Priority)
**Question:** Will this submission improve model training?

- If yes → Lean toward acceptance
- If no/unclear → Lean toward rejection
- Consider: Is the signal clear enough to teach the model?

**Example:**
- Subtle failure mode that's hard to detect → Low training value → Reject
- Clear failure with obvious contrast → High training value → Accept

### 2. Guideline Alignment
**Question:** Does this align with documented guidelines?

- If explicitly allowed → Accept
- If explicitly prohibited → Reject
- If unclear → Move to next principle

**Example:**
- Novel but guideline-compliant approach → Accept
- Creative but violates stated requirements → Reject

### 3. Consistency with Precedent
**Question:** How have we handled similar cases?

- If consistent precedent exists → Follow it
- If conflicting precedents → Re-evaluate and set new standard
- If no precedent → Set one and document

**Example:**
- Previous similar creative approaches accepted → Accept this one
- Past decisions rejected this pattern → Reject unless circumstances differ

### 4. Intent Over Form
**Question:** Does it accomplish the core purpose?

- If purpose is clearly achieved → Accept despite non-standard form
- If purpose is not met → Reject even if form is correct

**Example:**
- Non-standard template but all elements present and clear → Accept
- Perfect template but unclear failure mode → Reject

### 5. Clarity and Simplicity
**Question:** Is it unambiguous and straightforward?

- When all else is equal, favor **simpler** and **clearer**
- Complexity should add value, not confusion

**Example:**
- Two acceptable approaches: choose the clearer one
- Complex scenario without added value → Ask for simplification

## Specific Tie-Breaking Scenarios

### Scenario A: Borderline Quality
**50/50 case - barely meets vs. barely misses the bar**

**Default:** If critical elements are present → **Accept**  
**Rationale:** Small improvements can be made in iteration; blocking potentially useful data is costly

**Exception:** If multiple borderline areas → Reject and ask for overall quality improvement

### Scenario B: Novel Approach
**Creative submission that doesn't match examples**

**Default:** If it achieves intent and isn't prohibited → **Accept**  
**Rationale:** Innovation can be valuable; don't penalize creativity

**Exception:** If novelty introduces ambiguity → Reject or ask for clarification

### Scenario C: Reviewer Disagreement
**One reviewer accepts, one rejects**

**Process:**
1. Review both perspectives thoroughly
2. Identify the core disagreement
3. Apply decision hierarchy above
4. Document reasoning for future reference

**Default:** Side with the reviewer who provides more specific, guideline-based reasoning

### Scenario D: Submitter Appeal
**Submitter contests rejection**

**Process:**
1. Review original submission and rejection feedback
2. Review submitter's appeal reasoning
3. Evaluate if reviewer missed something or misapplied guidelines

**Default:** Support reviewer unless clear error in judgment or guideline application

**Common Valid Appeals:**
- Reviewer missed a key element that was present
- Guideline was misinterpreted by reviewer
- Precedent exists that supports acceptance

**Common Invalid Appeals:**
- "I worked hard on this" (not relevant to quality)
- "Other submitters do this" (without evidence)
- Disagreement with the guidelines themselves

## Documentation Requirements

When making an adjudication decision:

### Always Document:
1. **The specific question/disagreement**
2. **Your decision and rationale**
3. **Which principles applied**
4. **Whether this sets a precedent**

### Template:

```markdown
**Case:** [Brief description]
**Question:** [Specific point of contention]
**Decision:** Accept / Reject
**Rationale:** [Explanation using principles above]
**Precedent:** Sets new precedent / Follows existing / Case-specific
**Guidance for Future:** [Any clarification for similar cases]
```

---

:::tip Golden Rule
When truly stuck, ask: "What decision serves the project's goal of high-quality training data?" Then make the call.
:::

:::note TODO
**Content to Add:**
- Real adjudication case studies
- Decision tree flowchart
- Common disagreement patterns
- Appeals process details
:::
