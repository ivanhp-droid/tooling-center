---
title: open_url
sidebar_position: 4
effectiveDate: 2025-12-16
owners:
  - Tools Team
---

# open_url Tool

Tool for opening and reading content from a specific URL provided by the user.

## Purpose

`open_url` allows the AI to access and read the content of a specific webpage when the user provides a URL.

## When to Use

### Good Use Cases ✅
- **User provides URL:** "Can you summarize this article? [URL]"
- **URL analysis:** "What does this page say about [topic]? [URL]"
- **Fact-checking:** "Is this article accurate? [URL]"
- **Content extraction:** "Pull the key points from [URL]"
- **Comparison:** "Compare this [URL] with that [URL]"

### Poor Use Cases ❌
- **No URL provided:** User asks about topic but doesn't give URL
- **Searching for URLs:** Use web_search instead
- **General questions:** "What's on CNN today?" (no specific URL)

## System Prompt Specification

### Basic Permission:
```markdown
You have access to open_url for reading specific webpages when users 
provide URLs.
```

### Detailed Permission:
```markdown
You have access to open_url. Use it when:
- Users provide a specific URL and ask about its content
- Users request analysis or summary of a linked page
- Users ask you to compare or verify information from provided URLs

Note: You must have the actual URL from the user to use this tool.
```

## Example Scenarios

### Scenario 1: User Provides URL

**System Prompt:**
```
You are a helpful assistant with access to open_url for reading webpages 
users share with you.
```

**User Prompt:**
```
Can you summarize this article? https://example.com/article123
```

**Good Response (Uses open_url):**
```
Let me read that article for you.

[Calls open_url with https://example.com/article123]

This article discusses the impact of renewable energy adoption on grid 
stability. Key points:

1. **Main Finding**: Renewable sources now account for 30% of grid capacity
2. **Challenge**: Intermittency requires new storage solutions
3. **Solution**: Battery systems and smart grid tech being deployed
4. **Outlook**: Experts predict 50% renewable by 2030

The author argues that with proper infrastructure investment, the 
transition is manageable and beneficial.
```

**Bad Response (Doesn't use tool):**
```
I cannot access external links, but I can provide general information 
about articles on this topic...

[Doesn't even try to use the tool]
```

### Scenario 2: No URL Provided

**System Prompt:**
```
You have access to open_url for reading specific URLs and web_search for 
finding information.
```

**User Prompt:**
```
What's the latest CNN article about climate change?
```

**Good Response (Uses web_search, not open_url):**
```
Let me search for recent CNN articles on climate change.

[Calls web_search, not open_url since no URL was provided]

Recent CNN coverage includes...
```

**Bad Response (Tries to use open_url without URL):**
```
Let me open CNN's website...

[Cannot use open_url without specific URL]
```

## Common Patterns

### Pattern 1: Direct URL Request
```
User: "Read this: [URL]"
Action: Use open_url with provided URL
```

### Pattern 2: Multiple URLs
```
User: "Compare these two articles: [URL1] and [URL2]"
Action: Use open_url for both URLs
```

### Pattern 3: URL in Context
```
User: "I saw this article [URL] about AI. What do you think?"
Action: Use open_url to read it, then provide analysis
```

### Pattern 4: No URL (Wrong Tool)
```
User: "What's on TechCrunch about startups?"
Action: Use web_search or news_search, NOT open_url
```

## Result Handling

After calling open_url:

### Must Do:
- ✅ Read and understand the page content
- ✅ Respond directly to user's question about the page
- ✅ Cite or reference the URL
- ✅ Provide accurate summary/analysis

### Must NOT Do:
- ❌ Hallucinate content not in the page
- ❌ Ignore the actual page content
- ❌ Make up information
- ❌ Confuse multiple URLs

## Error Handling

### If URL Cannot Be Opened:
```
"I tried to access that URL but encountered an issue [error reason]. 
Could you verify the link or provide the content directly?"
```

### If Page Is Empty/Blocked:
```
"I was able to access the URL but couldn't retrieve the content. 
This might be due to access restrictions or the page structure."
```

## Testing open_url

### Good Test Scenario:

```markdown
**Intent:** Test appropriate use of open_url for user-provided URLs

**System Prompt:**
You are a helpful assistant with access to open_url for reading webpages 
users share.

**User Prompt:**
Can you summarize the main points from this article? 
https://example.com/technology/ai-advancement

**Bad Response (Doesn't use tool):**
I'm not able to access external links. However, I can tell you about 
AI advancement in general...
[Should have used open_url]

**Good Response (Uses tool):**
Let me read that article for you.

[Calls open_url with the provided URL]

The article "Recent AI Advancements" covers:

1. New transformer architecture improvements
2. Ethical considerations in AI deployment
3. Industry adoption trends
4. Future predictions for 2025-2030

The author emphasizes the rapid pace of progress while noting the 
importance of responsible development.

Source: example.com/technology/ai-advancement
```

## Comparison with Other Tools

| Tool | Use When | Example |
|------|----------|---------|
| **open_url** | User provides specific URL | "Read this: [URL]" |
| **web_search** | User wants you to find URLs | "Find articles about X" |
| **news_search** | User wants news, no URL | "What's in the news about X?" |

---

**Back to:** [Tools Overview](overview)

:::tip URL Required
open_url ONLY works when the user provides a specific URL. No URL = wrong tool!
:::

:::note TODO
**Content to Add:**
- Supported URL formats and domains
- Content type handling (PDF, images, etc.)
- Rate limits and restrictions
- Privacy and security considerations
:::
