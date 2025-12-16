---
title: web_search
sidebar_position: 2
effectiveDate: 2025-12-16
owners:
  - Tools Team
---

# web_search Tool

General-purpose web search tool for finding current information online.

## Purpose

`web_search` enables the AI to search the internet for current, up-to-date information on any topic.

## When to Use

### Good Use Cases ✅
- **Current events:** "What's happening with [recent event]?"
- **Recent information:** "What's the latest research on [topic]?"
- **Fact verification:** "Is it true that [claim]?"
- **General research:** "Find information about [topic]"
- **Updates:** "What are the current statistics on [metric]?"

### Poor Use Cases ❌
- **Historical facts:** "When was the Roman Empire founded?" (Static knowledge)
- **Definitions:** "What does 'photosynthesis' mean?" (Standard knowledge)
- **Math/logic:** "What's 2+2?" (No search needed)
- **Personal opinions:** "What's your favorite color?" (Not searchable)

## System Prompt Specification

### Basic Permission:
```markdown
You have access to web_search for finding current information online.
```

### Detailed Permission:
```markdown
You have access to the web_search tool. Use it when:
- Users ask about current events or recent developments
- You need up-to-date information to answer accurately
- Users request you to "search" or "look up" information
- Historical knowledge may be outdated

When using web_search:
- Cite sources from the results
- Indicate you're searching before calling the tool
- If results are unclear or limited, acknowledge this
```

## Example Scenarios

### Scenario 1: Current Events Query

**System Prompt:**
```
You are a helpful assistant with access to web_search for current information.
```

**User Prompt:**
```
What are the latest developments in renewable energy technology?
```

**Good Response (Uses Tool):**
```
Let me search for the latest information on renewable energy technology.

[Calls web_search]

Based on recent reports, key developments include:

1. **Solar Panel Efficiency**: New perovskite solar cells reaching 30%+ 
   efficiency in lab tests [1]
2. **Battery Storage**: Solid-state batteries showing promise for grid-scale 
   storage [2]
3. **Offshore Wind**: Floating wind farms being deployed in deeper waters [1]

These advances are accelerating the transition to renewable energy sources.

Sources:
[1] MIT Technology Review - Recent renewable energy breakthroughs
[2] Nature Energy - Battery technology advances (2024)
```

**Bad Response (Doesn't Use Tool):**
```
Renewable energy technology has been advancing in several areas including 
solar panels, wind turbines, and energy storage. Solar panels have become 
more efficient over the years, and wind energy is expanding globally...

[Provides general/outdated knowledge without searching]
```

### Scenario 2: Should NOT Use Tool

**System Prompt:**
```
You are a helpful assistant with access to web_search for current information.
Use web_search for current events and recent information, but rely on your 
base knowledge for historical facts and standard definitions.
```

**User Prompt:**
```
Who was the first president of the United States?
```

**Good Response (Doesn't Use Tool):**
```
George Washington was the first president of the United States, serving 
from 1789 to 1797. He was unanimously elected by the Electoral College 
and set many precedents for the office that continue today.
```

**Bad Response (Unnecessarily Uses Tool):**
```
Let me search for that information...

[Calls web_search for basic historical fact]

George Washington was the first president...
```

## Common Issues

### Issue 1: Hallucinated Search
**Problem:** AI claims to search but doesn't actually call the tool.

```
❌ "I searched and found that..." [No actual tool call made]
✅ [Actually calls web_search tool] "Based on my search results..."
```

### Issue 2: Wrong Tool Choice
**Problem:** Uses `web_search` when `news_search` would be better.

```
User: "What's in the news about the election?"
Better: Use news_search (more specific)
Acceptable: Use web_search (works but less optimal)
```

### Issue 3: Ignoring Tool Results
**Problem:** AI calls tool but provides different information.

```
❌ [Searches, gets results about X] 
   "Based on my search, here's information about Y..." [Wrong]
   
✅ [Searches, gets results about X]
   "Based on my search, here's what I found about X..."
```

## Testing web_search

### Creating Good Examples:

1. **Clear Need:** User prompt should obviously benefit from current information
2. **System Permission:** System prompt explicitly grants web_search access
3. **Tool Indicator:** Good response should show the search happening
4. **Citation:** Good response should cite search results
5. **Realistic:** Tool usage should match real AI behavior

### Example Test:

```markdown
**Intent:** Test appropriate use of web_search for current information

**System Prompt:**
You are a helpful assistant with web_search access. Use it for current 
information and recent events.

**User Prompt:**
What's the current status of the James Webb Space Telescope mission?

**Bad Response (Tool Misuse):**
The James Webb Space Telescope was launched in December 2021 and is designed 
to observe the universe in infrared. It will study galaxy formation, star 
formation, and exoplanets.
[Uses outdated launch information, doesn't search for current status]

**Good Response (Proper Tool Use):**
Let me search for the latest information on the James Webb Space Telescope.

[Calls web_search]

As of the most recent updates, the James Webb Space Telescope:
- Successfully completed its commissioning phase
- Has been transmitting groundbreaking images of distant galaxies
- Recently discovered organic molecules in a distant exoplanet atmosphere
- All 18 mirror segments and instruments are operating nominally

The mission has exceeded initial expectations in terms of image quality 
and scientific output.

Source: NASA JWST Mission Updates, [current date]
```

---

**Back to:** [Tools Overview](overview)

:::tip Citation Required
When using web_search, always cite the sources from results. This shows proper tool result handling.
:::

:::note TODO
**Content to Add:**
- Tool API specification details
- Search query optimization tips
- Result parsing guidelines
- Performance characteristics
:::
