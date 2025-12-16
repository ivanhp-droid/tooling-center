---
title: 'Step 2: System Prompt'
sidebar_position: 2
effectiveDate: 2025-12-16
owners:
  - Workflow Team
---

# Step 2: Crafting the System Prompt

The **system prompt** provides instructions and context that enable the AI to fulfill the intent. It's the AI's "operating manual" for this task.

## Purpose of System Prompt

The system prompt:
- **Defines the AI's role** (persona, expertise level)
- **Sets behavioral guidelines** (tone, format, constraints)
- **Grants tool permissions** (web search, etc.)
- **Provides context** (background info, rules)

## Essential Components

### 1. Role/Persona Definition
Who is the AI in this scenario?

**Example:**
```
You are a helpful research assistant with expertise in finding and 
summarizing current information.
```

### 2. Behavioral Instructions
How should the AI behave?

**Example:**
```
When responding:
- Use clear, concise language
- Cite sources for all factual claims
- If uncertain, acknowledge limitations
- Stay focused on the user's question
```

### 3. Tool Permissions (if applicable)
What tools can the AI use?

**Example:**
```
You have access to the following tools:
- web_search: For finding current information online
- news_search: For finding recent news articles

Use these tools when the user asks about current events or recent information.
```

### 4. Constraints and Requirements
What are the boundaries?

**Example:**
```
Constraints:
- Keep responses under 300 words
- Always provide at least 2 sources
- Use a professional, neutral tone
```

## System Prompt Best Practices

### Do ✅
- **Be specific and clear** - Avoid ambiguous instructions
- **Enable the intent** - Include everything needed to succeed
- **Use consistent structure** - Follow established templates
- **Test edge cases** - Consider what could go wrong

### Don't ❌
- **Contradict yourself** - No conflicting rules
- **Over-constrain** - Don't make task impossible
- **Under-specify** - Include necessary details
- **Assume knowledge** - Be explicit about what AI should do

## Template Structure

```markdown
# Role
You are [role/persona with relevant expertise].

# Guidelines
When responding to users:
- [Guideline 1]
- [Guideline 2]
- [Guideline 3]

# Tools
You have access to:
- [tool_name]: [when/how to use]

# Constraints
- [Constraint 1]
- [Constraint 2]

# Format
[Any specific formatting requirements]
```

## Examples by Intent Type

<details>
<summary>Web Search Intent</summary>

```markdown
# Role
You are a research assistant helping users find current, accurate information.

# Guidelines
- Always search for recent information when asked about current events
- Provide source citations for all factual claims
- Summarize findings clearly and concisely
- If search results are unclear, acknowledge uncertainty

# Tools
You have access to web_search for finding current information online.

# Constraints
- Responses should be 200-300 words
- Include at least 2 source citations
- Use objective, factual language
```

</details>

<details>
<summary>Instruction Following Intent</summary>

```markdown
# Role
You are a helpful assistant designed to follow instructions precisely.

# Guidelines
- Read all instructions carefully before beginning
- Complete each step in the order given
- Adhere to all formatting and constraint requirements
- Do not skip steps or make assumptions

# Constraints
- Follow the exact format specified by the user
- Respect all word count or length requirements
- Maintain the requested tone throughout
```

</details>

## Common System Prompt Issues

### Issue 1: Doesn't Enable Intent
**Problem:** System prompt doesn't give AI what it needs to fulfill intent.

**Example:**
- Intent: Search the web for news
- System Prompt: "You are helpful"
- **Missing:** Web search tool permission!

### Issue 2: Contradictory Instructions
**Problem:** Rules that conflict with each other.

**Example:**
- "Be extremely detailed and thorough"
- "Keep responses under 100 words"
- **Conflict:** Can't be both!

### Issue 3: Vague Guidelines
**Problem:** Instructions that are unclear or subjective.

**Example:**
❌ "Be reasonably concise"  
✅ "Keep responses between 150-250 words"

## Checklist

Before moving to Step 3, verify:

- [ ] System prompt defines role/persona
- [ ] All necessary guidelines included
- [ ] Tool permissions specified if needed
- [ ] Constraints are clear and measurable
- [ ] No contradictory instructions
- [ ] Enables the intent defined in Step 1

---

**Previous:** [Step 1: Intent](step-1-intent) | **Next:** [Step 3: User Prompts](step-3-user-prompts)

:::note TODO
**Content to Add:**
- Library of tested system prompt templates
- Common tool configurations
- Persona examples library
- System prompt testing guidelines
:::
