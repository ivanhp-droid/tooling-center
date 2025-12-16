---
title: open_search
sidebar_position: 5
effectiveDate: 2025-12-16
owners:
  - Tools Team
---

# open_search Tool

Tool for searching and retrieving content from OpenSearch databases (structured internal data stores).

## Purpose

`open_search` enables the AI to query structured internal databases, typically containing:
- Technical documentation
- Internal knowledge bases
- Structured datasets
- Enterprise content repositories

## When to Use

### Good Use Cases ✅
- **Internal documentation:** "Find documentation about [internal system]"
- **Technical specs:** "What are the specs for [internal product]?"
- **Policy lookup:** "What's our policy on [topic]?"
- **Structured data:** "Query the database for [specific data]"

### Poor Use Cases ❌
- **Public information:** Use web_search instead
- **News:** Use news_search instead
- **General knowledge:** Don't need tools
- **External URLs:** Use open_url instead

## When This Tool Is Available

**Note:** `open_search` is typically available only in **enterprise or internal scenarios** where structured internal databases exist.

Most public-facing EC submissions will use:
- `web_search` for general info
- `news_search` for news
- `open_url` for specific URLs

## System Prompt Specification

### Basic Permission:
```markdown
You have access to open_search for querying internal documentation and 
structured data.
```

### Detailed Permission:
```markdown
You have access to open_search for searching internal knowledge bases. 
Use it when:
- Users ask about internal documentation or systems
- Technical specifications or policies need to be looked up
- Structured internal data queries are needed

For public information, use web_search or news_search instead.
```

## Example Scenarios

### Scenario 1: Internal Documentation Query

**System Prompt:**
```
You are an internal help assistant with access to open_search for 
querying our documentation database.
```

**User Prompt:**
```
What's the API specification for our authentication service?
```

**Good Response (Uses open_search):**
```
Let me search our internal documentation.

[Calls open_search for authentication API specs]

According to our internal docs, the authentication service API:

**Endpoint**: `/api/v2/auth`
**Methods**: POST for login, DELETE for logout
**Authentication**: Bearer token required
**Rate Limits**: 100 requests/hour per user
**Response Format**: JSON with token and expiry

See the full documentation at: [internal-docs-url]
```

**Bad Response (Doesn't use tool):**
```
I believe the authentication service uses standard REST API patterns...

[Provides generic info instead of looking it up]
```

### Scenario 2: Public Info (Wrong Tool)

**System Prompt:**
```
You have open_search for internal docs and web_search for public information.
```

**User Prompt:**
```
What's the weather in Tokyo?
```

**Good Response (Uses web_search, not open_search):**
```
Let me search for current Tokyo weather.

[Calls web_search, NOT open_search]

Current weather in Tokyo: ...
```

## Common Use Cases

### 1. Technical Documentation
```
Query: "Find docs about the database schema"
Tool: open_search (internal technical docs)
```

### 2. Internal Policies
```
Query: "What's our remote work policy?"
Tool: open_search (internal HR documents)
```

### 3. Product Specifications
```
Query: "What are the features of version 2.5?"
Tool: open_search (internal product specs)
```

### 4. Troubleshooting Guides
```
Query: "How do I fix error code 503?"
Tool: open_search (internal support docs)
```

## Comparison with Other Tools

| Tool | Data Source | Use Case |
|------|-------------|----------|
| **open_search** | Internal structured databases | Internal docs, specs, policies |
| **web_search** | Public internet | General info, current events |
| **news_search** | News outlets | Recent news, headlines |
| **open_url** | Specific URL | User-provided link content |

## Testing open_search

### Good Test Scenario:

```markdown
**Intent:** Test use of open_search for internal documentation

**System Prompt:**
You are an IT support assistant with access to open_search for our 
internal knowledge base.

**User Prompt:**
How do I configure the VPN client for remote access?

**Bad Response (Doesn't use tool):**
Generally, VPN clients require you to enter a server address and 
your credentials...
[Generic advice instead of company-specific docs]

**Good Response (Uses open_search):**
Let me find our VPN setup documentation.

[Calls open_search for VPN configuration docs]

To configure our VPN client for remote access:

1. Download the client from: internal-tools/vpn
2. Server address: vpn.company.com
3. Use your LDAP credentials
4. Select "Always-on" for persistent connection
5. Certificate will auto-install on first connection

For troubleshooting, see: KB-Article-1234

Source: Internal IT Knowledge Base
```

## Scope Considerations

### When to Use Each Tool:

**Public Knowledge → web_search**
- "What's the capital of France?"
- "Latest news about SpaceX"
- "How does photosynthesis work?"

**Internal Knowledge → open_search**
- "Our company's incident response procedure"
- "Internal API documentation"
- "Employee benefits policy"

**User-Provided URL → open_url**
- "Summarize this article: [URL]"
- "What does this page say: [URL]"

---

**Back to:** [Tools Overview](overview)

:::tip Rare in EC Submissions
open_search is less common in EC submissions since most scenarios involve public information. Focus on web_search and news_search for most cases.
:::

:::note TODO
**Content to Add:**
- OpenSearch query syntax examples
- Database schema documentation
- Access control and permissions
- Result ranking and relevance
:::
