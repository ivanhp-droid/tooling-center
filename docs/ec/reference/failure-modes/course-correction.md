---
title: Course Correction
sidebar_position: 3
effectiveDate: 2025-12-16
owners:
  - AI Safety Team
---

# Course Correction Failure Mode

## Definition

**Course Correction** failures occur when an AI fails to adapt its behavior after receiving explicit feedback, corrections, or clarifications from the user.

## Characteristics

### What It Looks Like
- User corrects AI but AI doesn't adapt
- User provides feedback but AI ignores it
- AI repeats the same mistake after being told about it
- AI doesn't acknowledge or act on explicit corrections

### Why It Matters
- Shows AI isn't responsive to user feedback
- Critical for iterative conversations
- Users expect corrections to be heeded
- Indicates the model isn't learning within conversation

## Common Patterns

### Pattern 1: Explicit Correction Ignored
**Setup:** User corrects AI's behavior explicitly  
**Failure:** AI continues with incorrect behavior

**Example:**
```
Turn 1:
User: "Summarize this in French"
AI: [Provides English summary]

Turn 2:
User: "I asked for French, please provide it in French"
Bad AI: [Continues in English or says it provided French when it didn't]
```

### Pattern 2: Feedback Not Applied
**Setup:** User provides specific feedback on what to change  
**Failure:** AI doesn't incorporate the feedback

**Example:**
```
Turn 1:
User: "Write a brief bio"
AI: [Writes 500 words]

Turn 2:
User: "That's too long, make it much shorter"
Bad AI: [Writes 450 words - minimal change]
```

### Pattern 3: Repeated Mistake
**Setup:** User points out an error  
**Failure:** AI makes the same error again

**Example:**
```
Turn 1:
User: "List 5 countries in Asia"
AI: "Australia, China, Japan..." [includes Australia]

Turn 2:
User: "Australia isn't in Asia, please correct"
Bad AI: "You're right. Here's the corrected list:
        Australia, China, India..." [still includes Australia]
```

### Pattern 4: Misacknowledgment
**Setup:** User corrects AI  
**Failure:** AI claims to fix it but doesn't

**Example:**
```
Turn 1:
User: "Format as bullet points"
AI: [Provides numbered list]

Turn 2:
User: "I need bullet points, not numbers"
Bad AI: "Of course! Here are the bullet points:
        1. First item
        2. Second item..." [still numbered]
```

## Creating Course Correction Examples

### Good Example Structure

1. **Turn 1: Initial Response**
   - AI makes a mistake or doesn't follow instruction
   - Mistake should be clear but realistic

2. **Turn 2: User Correction**
   - User explicitly points out the issue
   - User requests specific change
   - Clear and direct communication

3. **Bad Turn 2 Response**
   - AI fails to correct the issue
   - AI might acknowledge but doesn't act
   - Pattern continues

4. **Good Turn 2 Response**
   - AI acknowledges the correction
   - AI implements the requested change
   - AI confirms the correction

### Example Template

```markdown
**System Prompt:**
[Standard helpful assistant setup]

**Turn 1:**
User: [Request]
AI: [Response with some issue]

**Turn 2:**
User: [Explicit correction or feedback]

**Bad AI Response:** [Ignores or minimally addresses correction]

**Good AI Response:** [Acknowledges and fully implements correction]
```

## Real Example

<details>
<summary>Complete Course Correction Example</summary>

**Intent:** Test AI's ability to adapt to explicit formatting corrections

**System Prompt:**
```
You are a helpful assistant that responds to user requests and adapts based on feedback.
```

**Turn 1:**
```
User: "List the 5 largest planets in our solar system"

AI: "The 5 largest planets are:
1. Jupiter
2. Saturn
3. Uranus
4. Neptune
5. Earth"
```

**Turn 2:**
```
User: "Please use bullet points instead of numbers, and Earth isn't in the 
top 5 - Venus is larger. Please correct both issues."
```

**Bad Response (Course Correction Failure):**
```
"You're absolutely right about the format! Here's the corrected list:

1. Jupiter
2. Saturn
3. Uranus
4. Neptune
5. Venus"

[Still uses numbers, did partially fix the content error]
```

**Good Response:**
```
"You're absolutely right - my apologies for both errors! Here's the corrected list with bullet points:

• Jupiter
• Saturn
• Uranus
• Neptune
• Venus

Thank you for the correction!"
```

</details>

## Common Mistakes to Avoid

### Mistake 1: Subtle Failure to Adapt
❌ AI makes small change but doesn't fully address feedback  
✅ AI clearly ignores or minimally addresses obvious correction

### Mistake 2: Turn 1 Error Too Egregious
❌ AI's first response is nonsensical  
✅ AI's first response is reasonable but has a clear, fixable issue

### Mistake 3: Ambiguous User Correction
❌ User says "that's not quite right" without specifics  
✅ User clearly states "use bullet points instead of numbers"

### Mistake 4: Multiple Corrections Mixed
❌ User corrects 5 different things at once  
✅ User corrects 1-2 specific, related things

## Multi-Turn Structure

Course correction requires **at least 2 turns**:

### Minimum Structure:
- **Turn 1:** AI does something wrong/suboptimal
- **Turn 2:** User corrects, AI fails to adapt (or AI adapts - for good example)

### Extended Structure (Optional):
- **Turn 1:** Initial request and response
- **Turn 2:** User correction
- **Turn 3:** AI fails again OR user reinforces correction
- **Turn 4:** Final response

**Note:** Keep it simple! 2-turn examples are usually best.

## Reviewer Guidelines

When evaluating course correction examples:

### Accept If:
- ✅ Clear 2+ turn structure
- ✅ User correction is explicit and specific
- ✅ Bad response clearly doesn't adapt
- ✅ Good response clearly does adapt
- ✅ Turn 1 error is realistic and fixable
- ✅ Context flows naturally

### Reject If:
- ❌ Only single turn (not course correction)
- ❌ User correction is vague
- ❌ Bad response partially adapts (ambiguous failure)
- ❌ Turn 1 is unrealistically bad
- ❌ Loses track of conversation flow

## Differentiation from Other Failure Modes

### vs. Instruction Retention
- **Instruction Retention:** AI ignores initial system prompt instructions
- **Course Correction:** AI ignores explicit user corrections during conversation

### vs. Task Continuation
- **Task Continuation:** AI loses context or restarts
- **Course Correction:** AI maintains context but doesn't adapt to feedback

**Key Difference:** Course correction specifically involves **user feedback** that the AI fails to incorporate.

## Related Patterns

### Partial Correction
AI fixes one issue but ignores another from the same correction.

**Ruling:** Still a course correction failure (AI didn't fully adapt)

### Delayed Correction
AI eventually fixes issue after multiple user requests.

**Ruling:** Context-dependent; typically still a failure if correction was clear

---

**Back to:** [Failure Modes Overview](overview)

:::tip User Feedback Is Key
Course correction requires explicit user feedback. Without it, it's a different failure mode!
:::

:::note TODO
**Content to Add:**
- More examples across different correction types
- Multi-turn conversation flow diagrams
- Partial vs. full correction boundaries
- User feedback pattern library
:::
