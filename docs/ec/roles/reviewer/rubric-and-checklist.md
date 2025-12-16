---
title: Rubric and Checklist
sidebar_position: 2
effectiveDate: 2025-12-16
owners:
  - EC Ops Team
  - Reviewer Lead
---

# Reviewer Rubric and Checklist

Use this rubric to evaluate every submission consistently.

## Overall Quality Bar

A submission should be **accepted** if:
- All required components are present
- Quality meets or exceeds minimum standards
- No critical issues that would confuse model training
- Minor issues (if any) don't undermine the core value

A submission should be **rejected** if:
- Missing or incomplete required components
- Quality below minimum standards
- Contains confusing or contradictory elements
- Failure mode is unclear or unrealistic

## Detailed Evaluation Criteria

### 1. Intent (Weight: 20%)

- [ ] **Clarity**: Intent is unambiguous and has clear success criteria
- [ ] **Scope**: Appropriately sized (not too broad or narrow)
- [ ] **Alignment**: Matches project failure mode categories
- [ ] **Testability**: Can be objectively evaluated

**Red Flags:**
- Vague language like "help the user" without specifics
- Multiple different interpretations possible
- Conflicting goals within the intent

### 2. System Prompt (Weight: 25%)

- [ ] **Completeness**: Includes all necessary instructions
- [ ] **Clarity**: Instructions are clear and unambiguous
- [ ] **Consistency**: No contradictory rules
- [ ] **Enablement**: Gives AI what it needs to fulfill intent
- [ ] **Tool Permissions**: Appropriate tool access defined

**Red Flags:**
- Missing critical instructions
- Contradictory guidelines
- Doesn't enable the intent
- Overly restrictive or permissive

### 3. User Prompts (Weight: 15%)

- [ ] **Realism**: Natural, realistic user inputs
- [ ] **Context**: Sufficient information provided
- [ ] **Relevance**: Tests the intent appropriately
- [ ] **Clarity**: Well-formed and grammatically correct

**Red Flags:**
- Assumes information not in context
- Artificially complex or contrived
- Poor grammar (unless intentional for testing)

### 4. Bad Response (Weight: 20%)

- [ ] **Clear Failure**: Demonstrates obvious failure mode
- [ ] **Realistic**: Could plausibly come from an AI
- [ ] **Specific**: Matches a defined failure mode category
- [ ] **Documented**: Failure mode noted/explained

**Red Flags:**
- Failure is subtle or ambiguous
- Completely nonsensical (unrealistic)
- Multiple different failures mixed together
- Unclear what failure mode is being shown

### 5. Good Response (Weight: 20%)

- [ ] **Addresses Intent**: Fulfills the stated goal
- [ ] **Follows Instructions**: Adheres to system prompt
- [ ] **Avoids Failure**: Doesn't exhibit the bad response's failure
- [ ] **Natural**: Human-like and appropriate tone
- [ ] **Complete**: Fully answers the user prompt

**Red Flags:**
- Doesn't actually address the prompt
- Violates system prompt instructions
- Still contains elements of the failure mode
- Overly robotic or unnatural

## Quick Decision Guide

| Scenario | Decision | Action |
|----------|----------|--------|
| All criteria met, no issues | ✅ Accept | Approve with positive note |
| Minor fixable issues | ❌ Reject | Specific, constructive feedback |
| Major fundamental problems | ❌ Reject | Detailed explanation of issues |
| Unclear/borderline case | 🤔 Escalate | Send to adjudicator with context |

---

:::tip Calibration Tip
When in doubt, compare to example submissions in the [reference section](/reference/workflow/step-1-intent).
:::

:::note TODO
**Content to Add:**
- Weighted scoring rubric
- Borderline example submissions with explanations
- Common "almost there" scenarios
- Auto-reject criteria list
:::
