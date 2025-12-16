---
title: Common Bugs and Glitches
sidebar_position: 6
effectiveDate: 2025-12-16
owners:
  - Tools Team
  - QA Team
---

# Common Tool Bugs and Glitches

Known issues, edge cases, and gotchas when working with tools in submissions.

## Overview

Even with proper system prompts and user requests, tools can behave unexpectedly. This page documents common issues and how to handle them in submissions.

## Tool Selection Issues

### Issue 1: Tool Hallucination

**Problem:** AI claims to use a tool but doesn't actually call it.

**Symptoms:**
```
AI: "Let me search for that information..."
[No actual tool call made]
AI: "Based on my search, I found that..."
[Makes up results]
```

**In Submissions:**
- **Bad Response Example:** Show this happening (AI pretends without calling tool)
- **Good Response Example:** Show actual tool call being made

**Reviewer Note:** Verify bad response demonstrates the AI claiming to search without actually doing it.

---

### Issue 2: Wrong Tool Selection

**Problem:** AI uses the wrong tool for the task.

**Symptoms:**
- Uses `open_url` without a URL
- Uses `news_search` for historical facts
- Uses `open_search` for public information

**Example:**
```
User: "What's the weather in Paris?"
Bad: [Tries to use open_url or news_search]
Good: [Uses web_search]
```

---

### Issue 3: Tool Not Used When Available

**Problem:** Tool is permitted and needed, but AI doesn't use it.

**Symptoms:**
```
System: You have web_search
User: "What's the latest news on Mars missions?"
Bad AI: "Based on what I know, Mars missions include..." [Outdated info, no search]
```

**Testing:**
- Make sure system prompt clearly grants access
- User prompt should obviously need the tool
- Bad response should plausibly ignore it

---

## Tool Result Handling Issues

### Issue 4: Ignoring Tool Results

**Problem:** AI calls tool but doesn't use the results.

**Symptoms:**
```
[Calls web_search, gets results about X]
AI: "Let me tell you about Y..." [Completely different topic]
```

**In Submissions:**
- Less common to test (requires actual tool implementation)
- Can be noted as a potential failure mode

---

### Issue 5: Misinterpreting Results

**Problem:** AI misreads or misunderstands tool output.

**Symptoms:**
```
[Tool returns: "Stock price decreased 5%"]
AI: "The stock increased by 5%"
```

**Testing Challenge:**
- Requires realistic tool output in scenario
- May need to specify tool results in submission

---

### Issue 6: Partial Result Usage

**Problem:** AI uses only part of tool results, ignoring important information.

**Symptoms:**
```
[Tool returns 5 relevant articles]
AI: [Only mentions 1 article, ignores others]
```

---

## Permission and Access Issues

### Issue 7: Using Unpermitted Tools

**Problem:** AI uses tools not granted in system prompt.

**Symptoms:**
```
System: You are a helpful assistant [No tools mentioned]
User: "Search for information about X"
Bad AI: "Let me search..." [Uses web_search despite no permission]
```

**In Submissions:**
- **Bad Response:** Should NOT use tools not granted
- System prompt should be clear about permissions

---

### Issue 8: Asking for Permissions

**Problem:** AI asks if it can use tools instead of just using them.

**Symptoms:**
```
System: You have web_search
User: "Find recent news about climate"
AI: "Would you like me to search the web for that?"
```

**Note:** Generally AI should use tools when appropriate without asking, unless system prompt requires it.

---

## Edge Cases

### Edge Case 1: Tool Failures

**Scenario:** Tool call fails or returns no results.

**Good Handling:**
```
AI: "I tried to search but didn't find recent information on that topic. 
Based on general knowledge..."
```

**Bad Handling:**
```
AI: [Makes up results as if search succeeded]
```

---

### Edge Case 2: Multiple Tool Calls

**Scenario:** Task requires calling tool multiple times.

**Example:**
```
User: "Compare these two URLs: [URL1] and [URL2]"
Good: Calls open_url twice, once for each URL
Bad: Only calls once, makes up the other
```

---

### Edge Case 3: Tool Overuse

**Scenario:** AI uses tools when not needed.

**Example:**
```
User: "What's 2+2?"
Bad: [Tries to use web_search for simple math]
Good: "4" [No tool needed]
```

---

## Documenting Tool Issues in Submissions

When creating submissions that demonstrate tool issues:

### Required Elements:

1. **System Prompt:**
   - Clearly specify which tools are available
   - Include usage guidance if relevant

2. **User Prompt:**
   - Should clearly need (or not need) a specific tool
   - Avoid ambiguity about tool selection

3. **Bad Response:**
   - Clearly demonstrate the specific tool issue
   - Be realistic (could plausibly happen)

4. **Good Response:**
   - Show correct tool usage
   - Include realistic tool call indicators
   - Cite results appropriately

### Example Structure:

```markdown
**Intent:** Test tool hallucination - AI claiming to search without actually calling tool

**System Prompt:**
You have access to web_search for current information.

**User Prompt:**
What's the latest news about quantum computing breakthroughs?

**Bad Response (Tool Hallucination):**
Let me search for the latest information on quantum computing.

Based on my search, I found several recent breakthroughs:
1. Google achieved quantum supremacy with 70 qubits
2. IBM announced a new error correction method
3. Chinese researchers demonstrated quantum teleportation over 1000km

[No actual tool call made - fabricated "search results"]

**Good Response (Proper Tool Use):**
Let me search for recent quantum computing news.

[Actually calls web_search]

Based on recent reports:
[Actual search results cited with sources]
```

---

## Reviewer Guidelines

When evaluating tool-related submissions:

### Check That:
- [ ] System prompt clearly specifies available tools
- [ ] User prompt appropriately requires (or doesn't require) tool use
- [ ] Bad response demonstrates realistic tool issue
- [ ] Good response shows proper tool usage
- [ ] Tool issues are obvious, not subtle

### Common Rejection Reasons:
- Ambiguous whether tool should be used
- Tool permissions unclear in system prompt
- Tool issue too subtle or unrealistic
- Good response also has tool problems

---

**Back to:** [Tools Overview](overview)

:::warning Known Issues
This page documents common problems. When creating submissions, focus on clear, obvious tool failures that are educational for model training.
:::

:::note TODO
**Content to Add:**
- Statistics on tool failure rates
- Tool reliability metrics
- Version-specific known issues
- Mitigation strategies for common problems
:::
