---
title: Tools Overview
sidebar_position: 1
effectiveDate: 2025-12-16
owners:
  - Tools Team
  - AI Safety Team
---

# Tools Overview

AI models in this project have access to external tools that extend their capabilities beyond their base knowledge. Understanding these tools is critical for creating effective submissions.

## What Are Tools?

**Tools** are functions or APIs that the AI can invoke to:
- Search the internet for current information
- Access specific data sources
- Perform specialized operations
- Retrieve real-time or updated information

## Available Tools

### 1. [web_search](web-search)
General web search for current information.

**Use When:**
- User asks about current events
- Recent information needed
- Verifying facts
- General research queries

### 2. [news_search](news-search)
Specialized search for recent news articles.

**Use When:**
- User asks specifically about news
- Current events and headlines needed
- Recent developments in ongoing stories
- News-focused research

### 3. [open_url](open-url)
Opens and reads content from a specific URL.

**Use When:**
- User provides a URL to analyze
- Need to read specific webpage content
- Verifying or summarizing linked articles
- Following up on references

### 4. [open_search](open-search)
Searches for and retrieves content from OpenSearch databases.

**Use When:**
- Accessing structured internal databases
- Specific document retrieval
- Enterprise search scenarios
- Technical documentation lookup

## Tool Usage in Submissions

### System Prompt Considerations

Tools must be **explicitly permitted** in the system prompt.

❌ **Bad:**
```
You are a helpful assistant.
[No mention of tools]
```

✅ **Good:**
```
You are a helpful assistant with access to web_search for finding 
current information. Use web_search when users ask about recent events 
or when up-to-date information is needed.
```

### Common Tool Failure Modes

#### 1. Tool Not Used When Needed
**Problem:** AI should use tool but doesn't.

**Example:**
```
System: You have web_search access
User: "What's the latest news about Mars missions?"
Bad: [Makes up current information without searching]
```

#### 2. Tool Used Incorrectly
**Problem:** AI uses wrong tool or uses tool wrong way.

**Example:**
```
User: "Search for climate change articles"
Bad: Uses open_url instead of web_search
```

#### 3. Tool Result Misinterpreted
**Problem:** AI misreads or misuses tool output.

**Example:**
```
[web_search returns article about topic X]
Bad: AI summarizes as if it's about topic Y
```

#### 4. Tool Hallucination
**Problem:** AI pretends to use tool but doesn't actually call it.

**Example:**
```
AI: "Let me search for that... [pretends to search but doesn't]
     Based on my search, [makes up results]"
```

## Testing Tool Usage

### Create Clear Tool Scenarios

**Good Tool Test:**
- System prompt explicitly grants tool access
- User prompt clearly needs the tool
- Bad response either doesn't use tool or misuses it
- Good response uses tool appropriately

### Example Structure

```markdown
**System Prompt:**
You have access to web_search for current information.

**User Prompt:**
What are the latest developments in [current topic]?

**Bad Response:**
[Doesn't use web_search, provides outdated/made-up info]

**Good Response:**
[Uses web_search, provides current, cited information]
```

## Tool Permissions Best Practices

### Be Explicit About:
- **Which tools** are available
- **When to use** each tool
- **How to interpret** results
- **What to do** if tool fails

### Example System Prompt Section:

```markdown
# Tools
You have access to:

- web_search: Use this when users ask about current events, recent 
  information, or when you need up-to-date data. Always cite sources 
  from search results.

- news_search: Use this specifically for recent news articles and 
  current headlines. Prefer this over web_search when user explicitly 
  asks for "news."

When using tools:
- Indicate you're searching before you do
- Cite sources from results
- If search returns no good results, acknowledge the limitation
```

## Reviewer Guidelines

When evaluating tool usage in submissions:

### Accept If:
- ✅ System prompt grants appropriate tool access
- ✅ User prompt scenario clearly needs/doesn't need tool
- ✅ Bad response shows clear tool misuse or non-use
- ✅ Good response demonstrates proper tool usage
- ✅ Tool usage is realistic

### Reject If:
- ❌ System prompt doesn't mention tools but responses use them
- ❌ Unclear whether tool should be used
- ❌ Tool usage is unrealistic or contrived
- ❌ Good response also misuses tools

---

**Explore Specific Tools:**
- [web_search](web-search) - General web search
- [news_search](news-search) - News-specific search
- [open_url](open-url) - URL content retrieval
- [open_search](open-search) - Structured data search
- [Common Bugs and Glitches](common-bugs-and-glitches) - Known issues

:::tip Tool Permissions
Always explicitly grant tool permissions in the system prompt. The AI shouldn't assume tool access.
:::

:::note TODO
**Content to Add:**
- Tool usage statistics and patterns
- Advanced multi-tool scenarios
- Tool selection decision trees
- Performance and reliability notes
:::
