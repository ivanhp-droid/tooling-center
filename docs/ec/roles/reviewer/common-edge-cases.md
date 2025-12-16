---
title: Common Edge Cases
sidebar_position: 4
effectiveDate: 2025-12-16
owners:
  - EC Ops Team
  - Reviewer Lead
---

# Common Reviewer Edge Cases

Navigate tricky situations with confidence. This guide covers the most common edge cases reviewers encounter and how to handle them.

## 1. "Almost There" Submissions

**Scenario:** Submission is 90% good but has 1-2 minor fixable issues.

**Guidance:**
- If issues are truly minor (typos, small formatting): **Consider accepting** with a note
- If issues affect quality or clarity: **Reject with specific feedback**
- Ask yourself: "Would this confuse model training?" If yes, reject.

**Example:**
- Small typo in user prompt → Likely accept
- Missing a required citation in good response → Reject for revision

## 2. Creative but Off-Template Submissions

**Scenario:** Submitter used a creative approach that doesn't match standard templates but might be valid.

**Guidance:**
- Evaluate if it still meets the **intent and quality bar**
- Don't reject solely for being different from examples
- If unsure whether creative approach is acceptable → **Escalate to adjudicator**

**Example:**
- Non-standard system prompt structure but all elements present → Evaluate on merit
- Completely novel failure mode demonstration → Escalate for adjudication

## 3. Subtle Failure Modes

**Scenario:** The bad response's failure is subtle or requires careful reading to detect.

**Guidance:**
- Failure modes should be **obvious**, not requiring detective work
- If you have to re-read multiple times to find the failure → **Reject**
- Submitter should add clearer contrast or explanatory note

**Example:**
- Bad response violates a constraint buried in system prompt → Ask for more obvious failure
- Failure only visible if you count exact words → Too subtle, reject

## 4. Multiple Potential Failures in Bad Response

**Scenario:** Bad response demonstrates 2-3 different failure modes simultaneously.

**Guidance:**
- **Best practice:** One clear failure mode per submission
- Multiple failures can confuse training
- Ask submitter to isolate **one specific failure**

**Example:**
- Bad response both forgets instructions AND provides wrong information → Reject, ask to pick one

## 5. Disagreement with Guidelines

**Scenario:** Submission follows your interpretation but conflicts with a guideline detail.

**Guidance:**
- **Guidelines take precedence** over personal interpretation
- Refer to specific guideline sections in feedback
- If guideline is unclear → Note this when escalating

## 6. Unclear Whether Failure Is Realistic

**Scenario:** You're not sure if the bad response represents a real AI failure or is artificially constructed.

**Guidance:**
- Ask: "Could a language model plausibly produce this?"
- Nonsensical gibberish → Not realistic, reject
- Plausible but wrong reasoning → Realistic, likely accept
- If truly unsure → **Escalate with your reasoning**

## 7. Good and Bad Responses Very Similar

**Scenario:** You have to look closely to see the difference between good and bad responses.

**Guidance:**
- The contrast should be **immediately apparent**
- If difference is too subtle → **Reject** and ask for clearer distinction
- Provide specific suggestion for how to make contrast clearer

## 8. Borderline Quality

**Scenario:** Submission meets minimum bar but isn't great; you're unsure if it's "good enough."

**Guidance:**
- Use the rubric weights to guide decision
- If all critical elements are present and correct → Likely accept
- If multiple "barely acceptable" areas → Consider rejecting for overall quality
- Document your reasoning for consistency

## When to Escalate to Adjudicator

Escalate when:
- You've spent significant time and still can't decide
- Guidelines don't clearly cover the scenario
- Creative/novel approach might be valuable but you're uncertain
- Multiple reviewers might reasonably disagree

**Escalation Template:**
```
Context: [Brief description of submission]
Issue: [What makes this an edge case]
My Analysis: [Your thoughts and concerns]
Question: [Specific question for adjudicator]
```

---

:::tip Build Your Judgment
These cases get easier with experience. When in doubt, err on the side of quality and document your reasoning.
:::

:::note TODO
**Content to Add:**
- Actual borderline submission examples
- Adjudicator decisions on past edge cases
- Statistics on most common escalations
- Decision tree flowchart
:::
