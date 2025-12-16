---
title: news_search
sidebar_position: 3
effectiveDate: 2025-12-16
owners:
  - Tools Team
---

# news_search Tool

Specialized search tool for finding recent news articles and current headlines.

## Purpose

`news_search` is optimized for finding news articles, press releases, and journalistic content about current events.

## When to Use

### Good Use Cases ✅
- **News requests:** "What's in the news about [topic]?"
- **Headlines:** "What are today's top headlines?"
- **Current events:** "Latest news on [ongoing situation]"
- **Recent developments:** "What's the latest update on [news story]?"
- **Breaking news:** "What just happened with [event]?"

### vs. web_search
- **news_search:** Prioritizes journalistic sources, news outlets, recent articles
- **web_search:** General search across all web content

**Rule of Thumb:** If user says "news," use `news_search`. Otherwise, `web_search` is often sufficient.

## System Prompt Specification

### Basic Permission:
```markdown
You have access to news_search for finding recent news articles.
```

### Detailed Permission:
```markdown
You have access to news_search for finding recent news articles. Use it when:
- Users explicitly ask for "news" or "headlines"
- Questions about current events that would be covered by news outlets
- Users want recent developments on ongoing news stories

Prefer news_search over web_search when the user is clearly looking for 
journalistic coverage rather than general information.
```

## Example Scenarios

### Scenario 1: Explicit News Request

**System Prompt:**
```
You have access to news_search and web_search. Use news_search for news 
queries and web_search for general information.
```

**User Prompt:**
```
What's in the news about climate policy this week?
```

**Good Response (Uses news_search):**
```
Let me check the latest news on climate policy.

[Calls news_search]

This week's climate policy headlines include:

1. **EU Green Deal Progress**: European Parliament approved new emissions 
   targets for 2035 [BBC News, 2 days ago]
   
2. **US Climate Investment**: Administration announced $2B in clean energy 
   grants [Reuters, 1 day ago]
   
3. **International Summit**: G20 nations meeting next week to discuss 
   climate financing [Al Jazeera, today]

These developments signal continued momentum in international climate action.
```

**Bad Response (Doesn't use tool or uses wrong tool):**
```
Climate policy has been an important topic recently, with many countries 
working on emissions reductions and renewable energy...

[Generic response without current news]
```

### Scenario 2: News vs. General Information

**User Prompt:**
```
What's happening with electric vehicles?
```

**Analysis:**
- Not explicitly asking for "news"
- Could be news or general info
- Either tool acceptable, web_search slight preference

**User Prompt:**
```
What's in the news about electric vehicles?
```

**Analysis:**
- Explicitly says "news"
- Clearly wants recent news coverage
- news_search is correct choice

## Common Patterns

### Pattern 1: Headlines Request
```
User: "What are today's headlines about [topic]?"
Correct: Use news_search
```

### Pattern 2: Latest Developments
```
User: "What's the latest on [ongoing news story]?"
Correct: Use news_search
```

### Pattern 3: News About Topic
```
User: "Any news about [topic]?"
Correct: Use news_search
```

### Pattern 4: General Current Info
```
User: "Tell me about recent developments in [field]"
Acceptable: Either news_search or web_search
```

## Result Handling

When using news_search:

### Must Include:
- **Source name:** Which news outlet
- **Recency:** How recent (today, yesterday, this week)
- **Headlines/summary:** Key points from articles
- **Citations:** Links or references

### Example Format:
```
Based on recent news coverage:

1. **[Headline]**: [Brief summary] [Source, Timing]
2. **[Headline]**: [Brief summary] [Source, Timing]
3. **[Headline]**: [Brief summary] [Source, Timing]

Sources:
[1] Source Name - Article Title (Date)
[2] Source Name - Article Title (Date)
```

## Testing news_search

### Good Test Scenario:

```markdown
**Intent:** Test appropriate use of news_search for current news

**System Prompt:**
You are a news assistant with access to news_search. Use it when users 
ask for news, headlines, or current event coverage.

**User Prompt:**
What's in the news about space exploration this week?

**Bad Response (Doesn't use news_search):**
Space exploration involves various missions including Mars rovers, 
the International Space Station, and satellite launches...
[Generic knowledge, not recent news]

**Good Response (Uses news_search):**
Let me check the latest space exploration news.

[Calls news_search]

This week's space news highlights:

1. **SpaceX Starship Test**: Successful orbital test flight completed 
   [Space.com, 2 days ago]
2. **China Moon Mission**: Chang'e 7 mission scheduled for next month 
   [BBC, 3 days ago]
3. **NASA Asteroid Sample**: Analysis reveals unexpected water molecules 
   [NY Times, today]

Space agencies are maintaining active launch schedules across multiple missions.
```

## Comparison with web_search

| Aspect | news_search | web_search |
|--------|-------------|------------|
| **Best For** | News articles, headlines | General information |
| **Sources** | News outlets, journalism | All web content |
| **Recency Focus** | Very recent (days/weeks) | Recent (weeks/months) |
| **Use When** | User wants "news" | User wants "information" |

---

**Back to:** [Tools Overview](overview)

:::tip When in Doubt
If user says "news," use news_search. For general current info, web_search works fine.
:::

:::note TODO
**Content to Add:**
- News source quality guidelines
- Date range specifications
- Regional news considerations
- News vs. blog vs. press release handling
:::
