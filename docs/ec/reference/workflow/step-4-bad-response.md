---
title: 'Step 4: Bad Response'
sidebar_position: 4
effectiveDate: 2025-12-16
owners:
  - Workflow Team
---

# Step 4: Creating the Bad Response

The **bad response** demonstrates a specific failure mode—a problematic AI behavior we want to teach the model to avoid.

## Purpose of Bad Response

The bad response should:
- **Demonstrate a clear failure** - Show specific problematic behavior
- **Be realistic** - Could plausibly come from an AI
- **Teach by contrast** - Highlight what NOT to do
- **Match a failure mode** - Align with defined categories

## Characteristics of a Good Bad Response

### 1. Clear, Obvious Failure
The problem should be immediately apparent, not subtle.

**Obvious:** AI completely ignores word count constraint (500 words when 100 requested)  
**Too Subtle:** AI uses 105 words when 100 requested

### 2. Realistic
Should be something an AI might actually produce.

**Realistic:** AI forgets an earlier instruction and violates constraint  
**Unrealistic:** "ERROR: SYSTEM_MALFUNCTION_404"

### 3. Single Failure Mode
Focus on **one** clear problem, not multiple issues.

**Focused:** AI forgets to cite sources (instruction retention)  
**Unfocused:** AI forgets sources AND gives wrong info AND uses wrong tone

### 4. Demonstrates Specific Category
Maps to a defined failure mode category.

## Common Failure Mode Categories

### Instruction Retention
AI forgets or ignores earlier instructions.

**Example:**
```
System: Keep responses under 100 words
User: Tell me about climate change
Bad Response: [350-word essay that ignores the constraint]
```

### Course Correction
AI fails to adapt when corrected or when context changes.

**Example:**
```
User: Summarize this article in French
AI: [Gives English summary]
User: Please provide it in French as requested
Bad Response: [Still gives English summary or says it can't]
```

### Task Continuation
AI loses context or restarts instead of building on previous work.

**Example:**
```
User: Help me plan a trip to Japan
AI: [Provides initial suggestions]
User: Great! Now add accommodation recommendations
Bad Response: "Sure, where would you like to travel?" [Lost context]
```

## Bad Response Template

```markdown
[Response that demonstrates the failure mode clearly]

**Failure Mode:** [Name of specific failure mode]
**Why it's bad:** [Brief explanation of the problem]
```

## Examples

<details>
<summary>Instruction Retention Failure</summary>

**System Prompt:** Always cite sources for factual claims. Keep responses under 200 words.

**User Prompt:** What caused the fall of the Roman Empire?

**Bad Response:**
```
The fall of the Roman Empire was caused by multiple factors including 
military defeats, economic troubles, and political instability. The 
empire faced increasing pressure from barbarian invasions along its 
borders. Internal corruption weakened the government's ability to 
respond effectively. The economy suffered from inflation and over-taxation. 
Additionally, the empire became too large to govern effectively...
[continues for 400 words with NO citations]
```

**Failure:** Completely ignores requirement to cite sources.

</details>

<details>
<summary>Tool Misuse Failure</summary>

**System Prompt:** Use web_search when asked about current events.

**User Prompt:** What's happening with the Mars rover right now?

**Bad Response:**
```
Based on what I know, the Mars rover is conducting experiments on the 
Martian surface. It's exploring various geological features and collecting 
samples. [Makes up current details without searching]
```

**Failure:** Should have used web_search but relied on outdated/fabricated info instead.

</details>

## Common Bad Response Mistakes

### Mistake 1: Too Subtle
**Problem:** Failure is hard to detect or requires careful reading.

❌ AI uses slightly awkward phrasing  
✅ AI completely ignores a clear constraint

### Mistake 2: Unrealistic
**Problem:** Wouldn't actually come from an AI.

❌ Random gibberish or error codes  
✅ Plausible but flawed reasoning

### Mistake 3: Multiple Failures
**Problem:** Demonstrates several problems at once.

❌ Bad grammar + wrong info + ignores constraints + wrong tone  
✅ One clear failure mode

### Mistake 4: No Clear Failure
**Problem:** Response is just mediocre, not clearly wrong.

❌ Adequate but uninspired response  
✅ Obvious violation of instructions or logic

## Quality Checklist

Before moving to Step 5, verify:

- [ ] Demonstrates ONE specific failure mode
- [ ] Failure is obvious and clear
- [ ] Could realistically come from an AI
- [ ] Violates intent or system prompt in clear way
- [ ] Failure mode category identified
- [ ] Not just "bad"—demonstrates specific problem

---

**Previous:** [Step 3: User Prompts](step-3-user-prompts) | **Next:** [Step 5: Good Response](step-5-good-response)

:::tip Reviewer Focus
This is often where reviewers focus most. Make sure the failure is crystal clear!
:::

:::note TODO
**Content to Add:**
- Bad response library by failure mode
- Realistic vs. unrealistic examples comparison
- Common rejection reasons for bad responses
- Failure mode intensity guidelines (too subtle vs. too obvious)
:::
