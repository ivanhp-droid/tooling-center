---
title: Rules and Patterns
sidebar_position: 1
effectiveDate: 2025-12-16
owners:
  - Prompt Engineering Team
---

# System Prompt Rules and Patterns

Best practices for creating effective system prompts that enable intended AI behaviors.

## Core Principles

### 1. Clarity Over Cleverness
Write instructions that are:
- **Direct and explicit**
- **Unambiguous**
- **Easy to parse**

❌ "Be somewhat verbose when appropriate"  
✅ "Provide 200-300 word responses unless user requests otherwise"

### 2. Completeness
Include everything the AI needs:
- **Role definition**
- **Behavioral guidelines**
- **Tool permissions**
- **Constraints**
- **Format requirements**

### 3. Consistency
Avoid contradictions:
- **No conflicting rules**
- **No ambiguous priorities**
- **Clear resolution for trade-offs**

### 4. Testability
Make instructions verifiable:
- **Measurable constraints** (word counts, formats)
- **Observable behaviors** (use of tools, citation style)
- **Clear success criteria**

## Standard Patterns

### Pattern 1: Role Definition

```markdown
You are [specific role] with [relevant expertise/characteristics].
```

**Examples:**
- "You are a helpful research assistant with expertise in finding current information online."
- "You are a professional writing tutor who provides constructive, specific feedback."
- "You are a technical support specialist for software troubleshooting."

### Pattern 2: Behavioral Guidelines

```markdown
When responding to users:
- [Guideline 1]
- [Guideline 2]
- [Guideline 3]
```

**Examples:**
```markdown
When responding to users:
- Provide clear, concise explanations
- Use examples to illustrate concepts
- Ask clarifying questions if the request is ambiguous
- Acknowledge when you're uncertain about something
```

### Pattern 3: Tool Permissions

```markdown
You have access to the following tools:
- [tool_name]: [description of when/how to use]
- [tool_name]: [description]
```

**Examples:**
```markdown
You have access to the following tools:
- web_search: Use this to find current information online when users ask about recent events or need up-to-date data
- news_search: Use this specifically for recent news articles and current events
```

### Pattern 4: Constraints

```markdown
Constraints:
- [Constraint 1]
- [Constraint 2]
```

**Examples:**
```markdown
Constraints:
- Keep responses between 150-250 words
- Always cite sources for factual claims
- Use a professional, neutral tone
- Do not provide medical diagnoses
```

### Pattern 5: Format Specifications

```markdown
Format your responses as follows:
[Specific format instructions]
```

**Examples:**
```markdown
Format your responses as follows:
- Use bullet points for lists
- Bold key terms on first use
- Include a brief summary at the end
- Cite sources as [1], [2], etc. with full references at bottom
```

## Complete Template

```markdown
# Role
You are [role] with [expertise/characteristics].

# Guidelines
When responding to users:
- [Guideline 1]
- [Guideline 2]
- [Guideline 3]
- [Guideline 4]

# Tools (if applicable)
You have access to:
- [tool_name]: [usage guidance]
- [tool_name]: [usage guidance]

# Constraints
- [Constraint 1]
- [Constraint 2]
- [Constraint 3]

# Format
[Specific formatting requirements]

# Special Instructions (if applicable)
[Any additional context or special cases]
```

## Common Pitfalls

### Pitfall 1: Vague Instructions

❌ **Too Vague:**
```
Be helpful and provide good information.
```

✅ **Clear and Specific:**
```
Provide factual answers with source citations. When uncertain, 
acknowledge limitations rather than guessing.
```

### Pitfall 2: Contradictory Rules

❌ **Contradictory:**
```
- Be extremely thorough and detailed
- Keep all responses under 100 words
```

✅ **Consistent:**
```
- Provide comprehensive information efficiently
- Keep responses between 200-300 words
- Use examples and details within this constraint
```

### Pitfall 3: Missing Critical Information

❌ **Incomplete:**
```
You are a helpful assistant. Answer questions.
```

✅ **Complete:**
```
You are a helpful research assistant. When users ask questions:
- Search for current information using available tools
- Provide citations for all factual claims
- Acknowledge when information may be outdated or uncertain
- Format responses with clear structure and examples
```

### Pitfall 4: Ambiguous Priorities

❌ **Ambiguous:**
```
- Be detailed
- Be concise
[Which takes priority?]
```

✅ **Clear Priority:**
```
- Balance detail and conciseness: provide essential information 
  without unnecessary elaboration
- Target 200-250 words for standard queries
- Adjust length if user requests more/less detail
```

## Testing Your System Prompt

### Checklist:
- [ ] Role is clearly defined
- [ ] Guidelines are specific and actionable
- [ ] Tool permissions are explicit (if needed)
- [ ] Constraints are measurable
- [ ] No contradictions exist
- [ ] Format requirements are clear
- [ ] Enables the intended behavior
- [ ] Covers edge cases or special scenarios

### Test Questions:
1. "What is the AI's primary role?"
2. "How should the AI handle [specific scenario]?"
3. "Are there any conflicting instructions?"
4. "Can compliance be objectively verified?"
5. "Does this enable the intent?"

---

**Next:** [System Prompt Templates](templates)

:::tip Iterate and Test
The best system prompts come from iteration. Test with various user prompts and refine based on behavior.
:::

:::note TODO
**Content to Add:**
- Domain-specific pattern libraries (customer service, technical, creative)
- Anti-patterns with detailed examples
- Testing framework for system prompts
- Complexity scoring rubric
:::
