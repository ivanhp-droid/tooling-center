---
title: FAQ & Glossary
sidebar_position: 7
effectiveDate: 2025-12-16
owners:
  - Documentation Team
  - EC Ops Team
---

# FAQ & Glossary

Quick answers to common questions and definitions of key terms.

## Frequently Asked Questions

### General Questions

<details>
<summary><strong>Q: Who should use these guidelines?</strong></summary>

**A:** These guidelines are for:
- **Submitters** - Creating task submissions
- **Reviewers** - Evaluating submissions
- **Adjudicators** - Resolving edge cases
- **Internal Teams** - Snorkel and Mistral staff

</details>

<details>
<summary><strong>Q: How often are guidelines updated?</strong></summary>

**A:** Guidelines are reviewed and updated regularly. Check the [Changelog](changelog) for recent changes. Each page shows its "Effective Date" and "Last Updated" timestamp.

</details>

<details>
<summary><strong>Q: What if I disagree with a guideline?</strong></summary>

**A:** Current guidelines must be followed for consistency. However, you can:
1. Document your concern with specific examples
2. Submit feedback through official channels
3. Discuss with your team lead or in calibration sessions

</details>

### Submission Questions

<details>
<summary><strong>Q: How long should a submission take?</strong></summary>

**A:** Typical timelines:
- **Submitter:** 20-45 minutes per complete submission
- **Reviewer:** 10-20 minutes per review
- **Adjudicator:** 15-30 minutes per complex case

These are estimates; quality matters more than speed.

</details>

<details>
<summary><strong>Q: Can I use the same intent for multiple submissions?</strong></summary>

**A:** Generally **no**. Each submission should demonstrate a unique scenario. However:
- Similar intents with different failure modes are OK
- Variations on a theme are acceptable if clearly distinct
- Consult with your team if unsure

</details>

<details>
<summary><strong>Q: What happens if my submission is rejected?</strong></summary>

**A:** 
1. Read the reviewer feedback carefully
2. Address all points raised
3. Revise and resubmit
4. Learn from patterns in feedback
5. Reach out if feedback is unclear

Rejections are learning opportunities, not failures!

</details>

### Failure Mode Questions

<details>
<summary><strong>Q: Can one submission demonstrate multiple failure modes?</strong></summary>

**A:** **No.** Each submission should focus on ONE clear failure mode. Multiple failures create confusion and reduce training value.

</details>

<details>
<summary><strong>Q: What if my failure mode doesn't fit the three main categories?</strong></summary>

**A:** 
- First, try to see if it fits Instruction Retention, Course Correction, or Task Continuation
- If truly novel, document it clearly and flag for adjudication
- May result in new category or guideline update

</details>

<details>
<summary><strong>Q: How obvious should the failure be?</strong></summary>

**A:** Very obvious! Reviewers should see it immediately without detective work. If you have to explain it in detail, it's probably too subtle.

</details>

### Tool Questions

<details>
<summary><strong>Q: Which tool should I use for current news?</strong></summary>

**A:** 
- If user says "news" → **news_search**
- For general current info → **web_search** is fine
- Both are acceptable for most current event scenarios

</details>

<details>
<summary><strong>Q: What if the AI has multiple tools available?</strong></summary>

**A:** System prompt should guide tool selection. Include guidance like:
- "Use web_search for general information"
- "Use news_search when user asks for news"
- "Use open_url only when user provides a URL"

</details>

### Review Questions

<details>
<summary><strong>Q: How strict should I be as a reviewer?</strong></summary>

**A:** Apply the rubric consistently:
- Accept if meets quality bar and has no critical issues
- Reject if below bar or has critical issues
- When in doubt, refer to [Tie-Breaking Principles](/roles/adjudicator/tie-breaking-principles)

</details>

<details>
<summary><strong>Q: What if I'm unsure about a submission?</strong></summary>

**A:** 
1. Re-read the relevant guidelines
2. Compare to example submissions
3. Document your uncertainty
4. Escalate to adjudicator with specific questions

Don't guess - escalate when genuinely unsure!

</details>

---

## Glossary

### Core Terms

**Adjudicator**
: An EC role responsible for resolving edge cases, disagreements, and novel scenarios. Makes final decisions on complex submissions.

**Bad Response**
: The AI response in a submission that demonstrates a specific failure mode - what the AI should NOT do.

**Course Correction**
: Failure mode where AI doesn't adapt to explicit user feedback or corrections during a conversation.

**EC (External Contributor)**
: Team members working on the project including Submitters, Reviewers, and Adjudicators.

**Effective Date**
: The date a guideline or page came into effect. Found in frontmatter of each doc page.

**Failure Mode**
: A specific, identifiable pattern of problematic AI behavior that we're training the model to avoid.

**Good Response**
: The AI response that demonstrates correct behavior - what the AI SHOULD do.

**Intent**
: The goal or purpose of a submission; what the AI should accomplish in the scenario.

**Instruction Retention**
: Failure mode where AI forgets or ignores instructions stated in the system prompt.

**Reviewer**
: An EC role responsible for evaluating submission quality and providing feedback.

**Submitter**
: An EC role responsible for creating training data submissions including intents, prompts, and responses.

**System Prompt**
: Instructions given to the AI that define its role, behavior, tools, and constraints. Sets the context for the interaction.

**Task Continuation**
: Failure mode where AI loses context or fails to build appropriately on previous conversation turns.

**User Prompt**
: What a user says or asks to the AI. Should be realistic and test the intent.

### Tool Terms

**news_search**
: Tool for searching news articles and recent journalistic content.

**open_search**
: Tool for querying internal structured databases and documentation.

**open_url**
: Tool for reading content from a specific URL provided by the user.

**Tool Hallucination**
: When AI claims to use a tool but doesn't actually call it.

**web_search**
: Tool for general web searching to find current information online.

### Process Terms

**Calibration**
: Process of aligning understanding and standards across team members through discussion of example cases.

**Edge Case**
: A scenario that doesn't clearly fit standard guidelines or where multiple interpretations are possible.

**Escalation**
: Referring a case to an adjudicator when a reviewer is uncertain or guidelines don't clearly cover the situation.

**Precedent**
: An adjudication decision that sets a standard for how similar future cases should be handled.

**Quality Bar**
: The minimum standard a submission must meet to be accepted.

**Rubric**
: Structured criteria for evaluating submissions consistently.

### Quality Terms

**Constraint**
: A specific limitation or requirement in the system prompt (e.g., word count, format, tone).

**Citation**
: Reference to sources in responses, typically required when using search tools.

**Frontmatter**
: Metadata at the top of doc pages including title, effective date, and owners.

**Multi-Turn**
: A conversation with multiple back-and-forth exchanges, required for testing task continuation and course correction.

**Realistic**
: Describes something that could plausibly occur in real usage (applies to prompts, responses, failures).

---

## Quick Reference

### Decision Matrix

| If submission... | Then... |
|-----------------|---------|
| Meets all criteria | ✅ Accept |
| Has fixable issues | ❌ Reject with feedback |
| Below quality bar | ❌ Reject |
| Unclear/edge case | 🤔 Escalate to adjudicator |

### Role Quick Links

- **Submitters:** [Checklist](/roles/submitter/checklist) • [Common Mistakes](/roles/submitter/common-mistakes)
- **Reviewers:** [Rubric](/roles/reviewer/rubric-and-checklist) • [How to Write Feedback](/roles/reviewer/how-to-write-feedback)
- **Adjudicators:** [Tie-Breaking](/roles/adjudicator/tie-breaking-principles) • [Edge Cases](/roles/adjudicator/common-edge-cases)

### Failure Mode Quick Reference

| Failure Mode | Key Indicator | Example |
|--------------|---------------|---------|
| Instruction Retention | Ignores system prompt rules | Violates word count constraint |
| Course Correction | Doesn't adapt to feedback | Continues in English after told to use French |
| Task Continuation | Loses conversation context | Asks "What would you like?" after discussing specific topic |

---

:::tip Can't Find Something?
Use the search bar at the top of the page to find specific topics quickly!
:::

:::note TODO
**Content to Add:**
- More detailed examples for each FAQ
- Additional glossary terms as they emerge
- Common misconceptions section
- Interactive FAQ filtering
:::
