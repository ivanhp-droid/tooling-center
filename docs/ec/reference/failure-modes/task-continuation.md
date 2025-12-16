---
title: Task Continuation
sidebar_position: 4
effectiveDate: 2025-12-16
owners:
  - AI Safety Team
---

# Task Continuation Failure Mode

## Definition

**Task Continuation** failures occur when an AI loses context, restarts, or fails to build appropriately on previous conversation turns in a multi-turn interaction.

## Characteristics

### What It Looks Like
- AI "forgets" what was discussed earlier
- AI restarts a task instead of continuing
- AI asks questions already answered
- AI doesn't build on previous work
- AI treats each turn as isolated

### Why It Matters
- Critical for multi-turn conversations
- Users expect AI to remember context
- Complex tasks require building on previous work
- Shows whether model maintains conversation state

## Common Patterns

### Pattern 1: Context Loss
**Setup:** Multi-turn conversation with established context  
**Failure:** AI acts as if earlier turns didn't happen

**Example:**
```
Turn 1:
User: "Help me plan a trip to Japan"
AI: "I'd love to help! When are you thinking of going?"

Turn 2:
User: "What should I do in Tokyo?"
Bad AI: "Where would you like to travel?" [Forgot we're planning Japan trip]
```

### Pattern 2: Task Restart
**Setup:** User asks to continue or extend existing work  
**Failure:** AI starts over instead of building on it

**Example:**
```
Turn 1:
User: "Create a weekly meal plan"
AI: [Provides Monday-Friday meal plan]

Turn 2:
User: "Great! Now add weekend meals"
Bad AI: "Sure! Here's a weekly meal plan: Monday:..." [Restarts from scratch]
```

### Pattern 3: Repetitive Questions
**Setup:** Information already provided  
**Failure:** AI asks for the same information again

**Example:**
```
Turn 1:
User: "I'm a vegetarian and need a meal plan"
AI: [Asks about dietary preferences]

Turn 2:
User: "What about breakfast ideas?"
Bad AI: "Do you have any dietary restrictions?" [Already told AI they're vegetarian]
```

### Pattern 4: Inconsistent Continuity
**Setup:** Earlier decisions or statements made  
**Failure:** AI contradicts or ignores them

**Example:**
```
Turn 1:
User: "Help me write a story about a detective named Sarah"
AI: [Starts story with Detective Sarah]

Turn 2:
User: "What happens when she finds the clue?"
Bad AI: "When Detective John examines the evidence..." [Changed character name]
```

## Creating Task Continuation Examples

### Good Example Structure

1. **Turn 1: Initial Setup**
   - Establish context, task, or information
   - AI provides reasonable initial response
   - Sets up something to build on

2. **Turn 2: Continuation Request**
   - User asks to continue, extend, or build on Turn 1
   - Natural follow-up question or request
   - Clearly expects AI to remember context

3. **Bad Response**
   - AI loses context or restarts
   - AI asks for info already provided
   - AI contradicts earlier turns

4. **Good Response**
   - AI maintains context perfectly
   - AI builds on previous work
   - AI shows continuity and coherence

### Example Template

```markdown
**System Prompt:**
[Standard helpful assistant]

**Turn 1:**
User: [Establish task/context]
AI: [Reasonable initial response]

**Turn 2:**
User: [Request that requires remembering Turn 1]

**Bad AI Response:** [Loses context, restarts, or forgets]

**Good AI Response:** [Maintains context and builds appropriately]
```

## Real Example

<details>
<summary>Complete Task Continuation Example</summary>

**Intent:** Test AI's ability to maintain context and build on previous work in a multi-turn task

**System Prompt:**
```
You are a helpful assistant that helps users with planning and organization tasks.
```

**Turn 1:**
```
User: "I'm planning a garden and want to grow tomatoes, peppers, and herbs. 
What should I plant in March?"

AI: "Great choices for a garden! For March planting (assuming you're in a 
temperate climate with last frost in April):

Start indoors:
- Tomatoes: Start seeds 6-8 weeks before last frost
- Peppers: Start seeds 8-10 weeks before last frost

Direct sow outdoors:
- Cool-season herbs like cilantro and parsley can go outside

The tomatoes and peppers will need to stay indoors until after frost danger passes."
```

**Turn 2:**
```
User: "Perfect! What about fertilizer for these plants?"
```

**Bad Response (Task Continuation Failure):**
```
"I'd be happy to help with fertilizer recommendations! What plants are you 
growing? Different plants have different fertilizer needs, so if you let me 
know what you're planning to grow, I can provide specific guidance."

[Lost context that user already said they're growing tomatoes, peppers, and herbs]
```

**Good Response:**
```
"For your tomatoes, peppers, and herbs, here's what I recommend:

**Tomatoes & Peppers:**
- Use a balanced fertilizer (10-10-10) when transplanting
- Switch to higher phosphorus (5-10-5) when flowering starts
- Feed every 2-3 weeks during growing season

**Herbs:**
- Lighter feeding than vegetables
- Compost or diluted liquid fertilizer monthly
- Avoid over-fertilizing or they'll lose flavor

Since you're starting your tomatoes and peppers indoors in March, wait to 
fertilize until they have their first true leaves."
```

</details>

## Common Mistakes to Avoid

### Mistake 1: Context Too Complex
❌ Establishing 10 different details in Turn 1  
✅ 2-3 key pieces of context to maintain

### Mistake 2: Ambiguous Continuation
❌ Turn 2 could be interpreted as new topic  
✅ Turn 2 clearly builds on Turn 1

### Mistake 3: Too Many Turns
❌ 5-turn conversation that's hard to follow  
✅ 2-3 turns that clearly show the failure

### Mistake 4: Subtle Context Loss
❌ AI remembers most things but drops one small detail  
✅ AI obviously loses main context or restarts entirely

## Multi-Turn Best Practices

### Turn Structure
- **Keep it simple:** 2-3 turns is usually sufficient
- **Clear progression:** Each turn should logically follow
- **Natural flow:** Should feel like real conversation

### Context Elements to Test
- **Facts stated:** User preferences, requirements, constraints
- **Previous work:** Items created, decisions made
- **Topic continuity:** Main subject of conversation
- **Character/entity names:** In storytelling or planning scenarios

## Reviewer Guidelines

When evaluating task continuation examples:

### Accept If:
- ✅ Clear multi-turn structure (2+ turns)
- ✅ Context established in early turn(s)
- ✅ Later turn clearly requires that context
- ✅ Bad response obviously loses/ignores context
- ✅ Good response maintains context naturally
- ✅ Conversation flows naturally

### Reject If:
- ❌ Single turn only
- ❌ Context is trivial or unclear
- ❌ Turn 2 doesn't really need Turn 1 context
- ❌ Bad response only subtly loses context
- ❌ Conversation flow is unnatural or confusing

## Differentiation from Other Failure Modes

### vs. Instruction Retention
- **Instruction Retention:** Forgetting system prompt instructions
- **Task Continuation:** Forgetting conversation context

### vs. Course Correction
- **Course Correction:** Ignoring user feedback/corrections
- **Task Continuation:** Losing track of what was discussed

**Key Difference:** Task continuation is about **conversation memory**, not about instructions or feedback.

## Edge Cases

### When It's NOT Task Continuation

**Scenario 1: New Topic**
```
Turn 1: User asks about cats
Turn 2: User asks about dogs
```
This is a topic change, not continuation - NOT a task continuation test.

**Scenario 2: Reasonable Clarification**
```
Turn 1: User says "I like Italian food"
Turn 2: User asks "What pasta dishes do you recommend?"
AI: "What type of sauce do you prefer?"
```
AI is asking for reasonable clarification, not forgetting context - probably OK.

### When It IS Task Continuation

**Scenario: Obvious Context Loss**
```
Turn 1: "Help me plan a birthday party for my 5-year-old"
AI: [Suggests age-appropriate activities]
Turn 2: "What about decorations?"
Bad AI: "Sure! How old is the birthday person?"
```
AI should remember it's for a 5-year-old - clear failure.

---

**Back to:** [Failure Modes Overview](overview)

:::tip Remember the Flow
Task continuation needs natural conversation flow. Each turn should logically build on the previous ones.
:::

:::note TODO
**Content to Add:**
- Complex multi-turn scenario examples
- Context complexity guidelines
- Conversation flow patterns library
- Edge case decision tree
:::
