---
title: How to Write Feedback
sidebar_position: 3
effectiveDate: 2025-12-16
owners:
  - EC Ops Team
  - Reviewer Lead
---

# How to Write Effective Feedback

Great feedback helps submitters improve and maintains project quality. Learn how to write feedback that's clear, actionable, and constructive.

## Principles of Good Feedback

### 1. Be Specific
❌ "The intent isn't clear enough"  
✅ "The intent should specify whether the AI should search for news articles or academic papers"

### 2. Be Actionable
❌ "Bad response needs work"  
✅ "The bad response should demonstrate instruction retention failure by having the AI forget the initial constraint about staying under 100 words"

### 3. Be Constructive
❌ "This is completely wrong"  
✅ "The system prompt doesn't enable web search. Try adding: 'You have access to web_search tool for finding current information'"

### 4. Reference Guidelines
❌ "This doesn't follow the rules"  
✅ "Per the [Failure Modes guide](/reference/failure-modes/instruction-retention), instruction retention failures should show the AI forgetting a specific constraint"

## Feedback Templates

### For Intent Issues

```
The intent needs clarification on [specific aspect]. 
Consider: [specific suggestion or example]
Reference: [link to relevant guideline if applicable]
```

### For System Prompt Issues

```
The system prompt is missing [specific element] needed to [accomplish what].
Suggestion: [concrete example of what to add]
```

### For Response Quality Issues

```
The [good/bad] response doesn't clearly demonstrate [expected behavior/failure].
Expected: [what should be shown]
Current: [what is currently shown]
```

## Tone and Style

### Do ✅
- Use neutral, professional language
- Acknowledge what works well
- Frame as opportunities for improvement
- Assume good intent from submitter

### Don't ❌
- Use harsh or dismissive language
- Focus only on negatives
- Be vague or unclear
- Make assumptions about submitter's effort or ability

## Example Feedback (Good)

<details>
<summary>Full Example: Rejecting a Submission</summary>

**Overall Assessment:** Reject with revision opportunity

**Positive Notes:**
- The intent scope is appropriate and the user prompt is well-formed
- System prompt structure follows the template correctly

**Issues to Address:**

1. **Bad Response Failure Mode (Critical)**: The bad response doesn't clearly demonstrate a specific failure mode. Currently it just provides a short answer, but it's unclear if this is instruction retention, task continuation, or another failure. Please explicitly show one failure mode, such as the AI forgetting the requirement to "provide sources for all claims."

2. **Good Response Completeness (Major)**: The good response is missing source citations even though the system prompt requires them. Add at least 2-3 inline citations to demonstrate proper adherence to instructions.

3. **Minor Grammar (Minor)**: Small typo in the user prompt: "searchs" should be "searches"

**Next Steps:** Please revise the bad response to clearly show instruction retention failure, add citations to the good response, and fix the typo. Happy to review again once updated!

</details>

## Feedback Checklist

Before submitting your review, verify:

- [ ] I've identified specific issues with examples
- [ ] I've provided actionable suggestions for fixes
- [ ] I've linked to relevant guidelines where helpful
- [ ] My tone is constructive and professional
- [ ] I've noted positive aspects when present
- [ ] The submitter will understand what to change

---

:::tip Remember
Your feedback is a teaching opportunity. The goal is to help submitters improve, not just to catch errors.
:::

:::note TODO
**Content to Add:**
- Real examples of good and bad feedback
- Common feedback phrases to avoid
- Template library for frequent issues
- Feedback effectiveness metrics
:::
