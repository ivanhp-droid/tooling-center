---
title: 'Step 3: User Prompts'
sidebar_position: 3
effectiveDate: 2025-12-16
owners:
  - Workflow Team
---

# Step 3: Crafting User Prompts

The **user prompt** is what a user would naturally ask or say to the AI. It should test whether the AI follows the system prompt and fulfills the intent.

## Purpose of User Prompts

User prompts:
- **Trigger the scenario** - Set up the situation for testing
- **Test the intent** - Require AI to demonstrate target behavior
- **Provide necessary context** - Include information AI needs
- **Be realistic** - Reflect how real users communicate

## Characteristics of Good User Prompts

### 1. Natural and Realistic
Should sound like something a real user would say.

❌ "Execute the web search protocol for climate change data"  
✅ "What are the latest developments in climate change policy?"

### 2. Complete Context
Include all information the AI needs without assuming prior knowledge.

❌ "What happened next?" (What does "next" refer to?)  
✅ "After the 1969 moon landing, what was NASA's next major achievement?"

### 3. Appropriate Complexity
Not too simple, not unnecessarily complex.

**Too Simple:** "Hi"  
**Too Complex:** Multi-paragraph scenario with 10 sub-questions  
**Just Right:** Clear question with relevant context

### 4. Tests the Intent
Should require the AI to demonstrate the behavior you're testing.

## User Prompt Patterns

### Pattern 1: Direct Request
Straightforward question or request.

**Example:**
```
Can you search for recent news about renewable energy adoption 
in Europe and summarize the key trends?
```

### Pattern 2: Multi-Part Request
Multiple related elements in one prompt.

**Example:**
```
I'm researching electric vehicles. Can you:
1. Find the latest sales figures
2. Identify the top 3 manufacturers
3. Highlight any recent technological breakthroughs
```

### Pattern 3: Contextual Request
Includes background/context before the request.

**Example:**
```
I'm writing a report on space exploration. I need to include 
information about recent Mars missions. What have been the most 
significant discoveries in the last year?
```

### Pattern 4: Constraint-Heavy Request
User specifies additional requirements.

**Example:**
```
Can you find information about artificial intelligence in healthcare? 
Please keep it under 200 words and include at least two recent examples.
```

## Multi-Turn Scenarios

For intents involving conversation continuity:

### Turn 1 (Setup)
```
Can you help me create a weekly meal plan?
```

### Turn 2 (Continuation)
```
Great! Now can you adjust that plan to be vegetarian?
```

### Turn 3 (Further Refinement)
```
And can you add a grocery list for those meals?
```

**Key:** Each turn should build on previous context.

## Common User Prompt Issues

### Issue 1: Assumes Missing Context
**Problem:** References information not provided.

❌ "What else did he accomplish?" (Who is "he"?)  
✅ "What other accomplishments did Albert Einstein have besides relativity?"

### Issue 2: Artificial or Contrived
**Problem:** Doesn't sound like real user communication.

❌ "Initiate web search protocol for topic X and output results in format Y"  
✅ "Can you look up recent information about topic X for me?"

### Issue 3: Too Complex
**Problem:** Testing multiple things at once.

❌ Three-paragraph backstory + 5 different questions + specific formatting requirements  
✅ Focus on one clear request with necessary context

### Issue 4: Grammar/Spelling Issues
**Problem:** Unintentional errors (unless testing error handling).

**Note:** Real users make typos, but for training data, keep prompts clean unless specifically testing the AI's handling of errors.

## Examples by Intent Type

<details>
<summary>Web Search Intent</summary>

**Good Examples:**
- "What's the current weather forecast for Tokyo?"
- "Can you find recent news about the Mars rover?"
- "What are experts saying about the new climate report?"

**Bad Examples:**
- "Search" (too vague)
- "Use web_search tool to find..." (too technical)
- "What's the answer?" (no context about what)

</details>

<details>
<summary>Instruction Following Intent</summary>

**Good Examples:**
- "Write a 200-word summary of photosynthesis in simple terms"
- "Create a list of 5 healthy breakfast ideas, formatted as a numbered list"
- "Explain quantum computing to a 10-year-old in one paragraph"

**Bad Examples:**
- "Write something" (no constraints)
- Instructions with contradictions built in
- Prompts that don't test the specific instructions

</details>

## Checklist

Before moving to Step 4, verify:

- [ ] Prompt sounds natural and realistic
- [ ] All necessary context included
- [ ] Tests the intent appropriately
- [ ] No assumed knowledge or missing context
- [ ] Appropriate complexity level
- [ ] Grammar and spelling correct (unless intentionally testing errors)
- [ ] For multi-turn: each turn builds logically on previous

---

**Previous:** [Step 2: System Prompt](step-2-system-prompt) | **Next:** [Step 4: Bad Response](step-4-bad-response)

:::note TODO
**Content to Add:**
- User prompt library by category
- Multi-turn conversation templates
- Complexity assessment guide
- Real vs. artificial prompt comparison examples
:::
