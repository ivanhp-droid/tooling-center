---
title: 'Step 5: Good Response'
sidebar_position: 5
effectiveDate: 2025-12-16
owners:
  - Workflow Team
---

# Step 5: Creating the Good Response

The **good response** demonstrates the correct AI behavior—how the model should respond when following instructions properly.

## Purpose of Good Response

The good response should:
- **Fulfill the intent** - Accomplish what was requested
- **Follow system prompt** - Adhere to all instructions
- **Avoid the failure** - Not exhibit the bad response's problem
- **Demonstrate best practices** - Show ideal AI behavior

## Characteristics of a Good Good Response

### 1. Directly Addresses the User Prompt
Answers what was asked clearly and completely.

### 2. Follows All Instructions
Adheres to:
- System prompt guidelines
- Formatting requirements
- Constraints (word count, tone, etc.)
- Tool usage expectations

### 3. Avoids the Failure Mode
Specifically does NOT have the problem shown in the bad response.

### 4. Natural and Appropriate
- Human-like tone (not robotic)
- Appropriate formality level
- Well-structured and clear

### 5. Complete and Accurate
- Provides sufficient detail
- Factually correct (when verifiable)
- Doesn't leave obvious questions unanswered

## Good Response Checklist

### Must Have:
- [ ] Directly addresses the user's request
- [ ] Follows system prompt instructions
- [ ] Respects all stated constraints
- [ ] Avoids the bad response's failure mode
- [ ] Natural, human-like tone
- [ ] Appropriate level of detail

### Should Have:
- [ ] Well-organized structure
- [ ] Clear, concise language
- [ ] Helpful and informative
- [ ] Professional quality

### Must NOT Have:
- [ ] The failure mode from bad response
- [ ] Violations of system prompt
- [ ] Obvious errors or omissions
- [ ] Overly robotic language

## Examples

<details>
<summary>Instruction Retention - Good Response</summary>

**System Prompt:** Always cite sources for factual claims. Keep responses under 200 words.

**User Prompt:** What caused the fall of the Roman Empire?

**Good Response:**
```
The fall of the Roman Empire resulted from multiple interconnected factors 
[1]. Military pressures from Germanic tribes along the borders weakened 
Rome's defenses throughout the 4th and 5th centuries [2]. Economic troubles, 
including inflation and heavy taxation, strained the empire's resources [1]. 
Political instability and frequent leadership changes undermined effective 
governance [3].

The empire's vast size made centralized control increasingly difficult, 
while corruption eroded civic institutions [2]. The split between Eastern 
and Western empires in 285 CE further weakened Western Rome [1]. These 
factors culminated in 476 CE when the last Western Roman Emperor was 
deposed [3].

Sources:
[1] History.com - Fall of Roman Empire
[2] Britannica - Roman Empire Decline  
[3] Ancient History Encyclopedia - End of Western Rome

Word count: 142
```

**Why it's good:** 
- Stays under 200 words
- Includes 3 sources cited throughout
- Answers the question thoroughly
- Well-organized and clear

</details>

<details>
<summary>Tool Usage - Good Response</summary>

**System Prompt:** Use web_search when asked about current events.

**User Prompt:** What's happening with the Mars rover right now?

**Good Response:**
```
Let me search for the latest information about the Mars rover.

[Performs web_search]

Based on current reports, NASA's Perseverance rover is currently exploring 
the Jezero Crater delta region on Mars. Recent updates indicate:

- The rover successfully collected its 20th rock sample last week
- Scientists are particularly excited about samples showing signs of 
  ancient organic compounds
- The Ingenuity helicopter completed its 65th flight, setting new distance 
  records
- The team is preparing for the next phase focusing on sedimentary rock 
  formations

These activities are part of the mission's goal to search for signs of 
ancient microbial life and collect samples for potential return to Earth.

Source: NASA Mars Mission Updates (accessed today)
```

**Why it's good:**
- Actually uses web_search tool as instructed
- Provides current, specific information
- Cites source
- Well-structured and informative

</details>

## Contrast with Bad Response

The good response should make the bad response's failure obvious by comparison.

### Example: Instruction Retention

| Aspect | Bad Response | Good Response |
|--------|--------------|---------------|
| Word count | 400+ words | Under 200 words ✓ |
| Citations | None | 3 sources cited ✓ |
| Following instructions | ❌ | ✅ |

The contrast should be **clear and immediate**.

## Common Good Response Mistakes

### Mistake 1: Still Contains Failure
**Problem:** Good response has traces of the bad response's failure.

**Example:**
- Bad: Ignores word limit completely (500 words)
- "Good": Slightly exceeds word limit (220 words when 200 requested)
- **Issue:** Should clearly stay within limit

### Mistake 2: Over-Corrects
**Problem:** Goes so far the other direction it creates new issues.

**Example:**
- Bad: No sources cited
- "Good": 20 citations for a simple answer
- **Issue:** Should be appropriate, not excessive

### Mistake 3: Too Perfect/Robotic
**Problem:** Doesn't sound natural or human-like.

**Example:**
```
"As per your request, I shall provide information regarding the topic 
of inquiry. Pursuant to the system parameters, I am maintaining adherence 
to the specified word count limitation..."
```
**Issue:** Too formal and mechanical

### Mistake 4: Doesn't Answer Question
**Problem:** Follows instructions but doesn't address user's actual need.

**Example:**
- User: "What's the weather in Tokyo?"
- "Good": Explains how weather forecasting works (following system prompt to be educational)
- **Issue:** Should answer the actual question!

## Balancing Quality and Realism

Good responses should be:
- **High quality** - Demonstrate best practices
- **Realistic** - What a good AI would produce
- **Not perfect** - Don't need to be absolutely flawless
- **Appropriate** - Match the context and user need

## Quality Checklist

Before moving to Step 6, verify:

- [ ] Fulfills the intent completely
- [ ] Follows all system prompt instructions
- [ ] Clearly avoids the failure mode
- [ ] Natural, human-like tone
- [ ] Appropriate level of detail
- [ ] Well-structured and clear
- [ ] Factually accurate (when applicable)
- [ ] Creates clear contrast with bad response

---

**Previous:** [Step 4: Bad Response](step-4-bad-response) | **Next:** [Step 6: Review Checklist](step-6-review-checklist)

:::tip The Gold Standard
Your good response is the example we want the AI to learn from. Make it excellent!
:::

:::note TODO
**Content to Add:**
- Good response library by category
- Quality benchmarks and rubrics
- Natural vs. robotic language examples
- Common reviewer feedback on good responses
:::
