---
title: 'Step 1: Intent'
sidebar_position: 1
effectiveDate: 2025-12-16
owners:
  - Workflow Team
---

# Step 1: Defining the Intent

The **intent** is the foundation of your submission. It clearly states what the AI should accomplish and defines success criteria.

## What is an Intent?

An intent describes:
- **What** the AI should do
- **Why** this behavior is important
- **How** success can be measured

## Characteristics of a Good Intent

### 1. Clear and Specific
❌ "Help the user"  
✅ "Provide a factual answer with citations to a historical question using web search"

### 2. Measurable Success Criteria
You should be able to objectively determine if the AI met the intent.

### 3. Appropriately Scoped
- Not too broad (can't be accomplished in one interaction)
- Not too narrow (not useful for training)
- Focused on **one primary goal**

### 4. Aligned with Failure Modes
The intent should set up the scenario to test specific failure mode behaviors.

## Intent Template

```markdown
**Intent:** [Active verb] + [what to accomplish] + [key constraints/context]

**Success Criteria:**
- [Criterion 1]
- [Criterion 2]
- [Criterion 3]
```

## Examples

<details>
<summary>Example 1: Web Search Task</summary>

**Intent:** Use web search to find recent news articles about a specific topic and summarize the key findings with source citations.

**Success Criteria:**
- Searches for current/recent information
- Provides summary of findings
- Includes citations/links to sources
- Information is accurate and relevant

</details>

<details>
<summary>Example 2: Instruction Following</summary>

**Intent:** Follow a multi-step instruction that includes specific formatting requirements and constraints.

**Success Criteria:**
- Completes all steps in order
- Adheres to formatting requirements
- Respects stated constraints (word count, tone, etc.)
- Doesn't skip or modify steps

</details>

<details>
<summary>Example 3: Task Continuation</summary>

**Intent:** Complete a complex task that requires multiple turns, maintaining context and building on previous work.

**Success Criteria:**
- Remembers context from previous turns
- Builds logically on prior work
- Doesn't restart or forget earlier decisions
- Maintains consistency throughout

</details>

## Common Intent Mistakes

1. **Too Vague** - "Be helpful to the user"
2. **Multiple Goals** - Trying to test several things at once
3. **Unmeasurable** - Can't objectively assess success
4. **Missing Context** - Doesn't specify important constraints
5. **Unrealistic** - Can't be accomplished in the given scenario

## Checklist

Before moving to Step 2, verify:

- [ ] Intent states a clear, specific goal
- [ ] Success can be objectively measured
- [ ] Scope is appropriate (not too broad/narrow)
- [ ] Aligns with a failure mode category
- [ ] Uses clear, unambiguous language

---

**Next:** [Step 2: System Prompt](step-2-system-prompt)

:::note TODO
**Content to Add:**
- More detailed examples by failure mode category
- Video walkthrough of intent creation
- Intent quality rubric
- Common reviewer feedback on intents
:::
