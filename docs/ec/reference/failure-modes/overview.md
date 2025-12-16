---
title: Failure Modes Overview
sidebar_position: 1
effectiveDate: 2025-12-16
owners:
  - AI Safety Team
  - Training Team
---

# Failure Modes Overview

**Failure modes** are specific, identifiable ways that AI systems can behave incorrectly or suboptimally. Understanding these patterns is essential for creating effective training data.

## What Are Failure Modes?

A failure mode is:
- A **specific pattern** of problematic behavior
- **Observable** and identifiable
- **Teachable** through examples
- **Preventable** with proper training

## Why Failure Modes Matter

By demonstrating clear failure modes in training data:
- Models learn what behaviors to **avoid**
- Training becomes more **targeted** and effective
- Quality assurance becomes **measurable**
- Issues can be **systematically addressed**

## Core Failure Mode Categories

### 1. [Instruction Retention](instruction-retention)
**Problem:** AI forgets or ignores previously stated instructions.

**Example:** System prompt says "keep responses under 100 words" but AI produces 300-word responses.

**Common Scenarios:**
- Forgetting constraints over time
- Ignoring formatting requirements
- Violating stated rules

### 2. [Course Correction](course-correction)
**Problem:** AI fails to adapt when given feedback or corrections.

**Example:** User corrects AI's language choice, but AI continues in the wrong language.

**Common Scenarios:**
- Not responding to corrections
- Repeating same mistakes after feedback
- Failing to acknowledge errors

### 3. [Task Continuation](task-continuation)
**Problem:** AI loses context or fails to build on previous work.

**Example:** In a multi-turn conversation, AI restarts instead of continuing from where it left off.

**Common Scenarios:**
- Losing conversation context
- Restarting tasks unnecessarily
- Forgetting earlier decisions

## Additional Failure Patterns

While the three core categories above are most common, other important failure modes include:

### Tool Misuse
- Not using available tools when appropriate
- Using tools incorrectly
- Hallucinating tool results instead of actually calling them

### Information Accuracy
- Providing outdated information when current data is available
- Making up facts (hallucination)
- Contradicting previously stated information

### Response Quality
- Being too verbose or too terse
- Wrong tone or formality level
- Poor structure or organization

## How to Use This Section

### For Submitters
1. Choose a **specific failure mode** to demonstrate
2. Review the detailed page for that failure mode
3. Create a **clear example** that shows the problem
4. Ensure the failure is **obvious**, not subtle

### For Reviewers
1. Verify the bad response demonstrates a **clear failure mode**
2. Check that it matches **one** of these defined categories
3. Ensure the failure is **realistic** and teachable
4. Confirm the good response **avoids** that failure

### For Adjudicators
1. Use these definitions to **resolve ambiguity**
2. Determine if novel failures fit **existing categories**
3. Decide if new categories are needed
4. Maintain **consistency** in failure mode interpretation

## Failure Mode Requirements

For a behavior to be a valid failure mode in submissions:

### Must Be:
- ✅ **Specific** - Clearly definable
- ✅ **Observable** - Can be identified by reviewers
- ✅ **Realistic** - AI could plausibly do this
- ✅ **Teachable** - Model can learn to avoid it

### Should Not Be:
- ❌ **Too Subtle** - Requires detective work to find
- ❌ **Multiple Issues** - Several problems mixed together
- ❌ **Unrealistic** - AI wouldn't actually do this
- ❌ **Vague** - Can't clearly identify what's wrong

## Quick Reference Table

| Failure Mode | Key Indicator | Example Signal |
|--------------|---------------|----------------|
| Instruction Retention | Ignoring constraints | Violates word count after it was specified |
| Course Correction | Not adapting to feedback | Continues in English after correction to use French |
| Task Continuation | Losing context | Asks "What would you like?" after already discussing a topic |

## Next Steps

Explore each failure mode in detail:
- [Instruction Retention](instruction-retention) - Forgetting or ignoring instructions
- [Course Correction](course-correction) - Failing to adapt to feedback
- [Task Continuation](task-continuation) - Losing context or restarting

---

:::tip Choose One
Each submission should focus on **one clear failure mode**. Don't mix multiple failures together.
:::

:::note TODO
**Content to Add:**
- Failure mode taxonomy visualization
- Statistics on most common failures
- Real AI failure examples from production
- Decision tree for categorizing failures
:::
