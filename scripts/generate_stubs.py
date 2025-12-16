import os

stubs = {
    # Submitter
    "docs/ec/roles/submitter/overview.md": ("Submitter Overview", "Overview of the Submitter role responsibilities and expectations."),
    "docs/ec/roles/submitter/checklist.md": ("Submitter Checklist", "Daily checklist for quality submissions."),
    "docs/ec/roles/submitter/common-mistakes.md": ("Common Mistakes (Submitter)", "Frequent errors to avoid."),

    # Reviewer
    "docs/ec/roles/reviewer/overview.md": ("Reviewer Overview", "Overview of the Reviewer role."),
    "docs/ec/roles/reviewer/rubric-and-checklist.md": ("Rubric & Checklist", "Detailed rubric for evaluating submissions."),
    "docs/ec/roles/reviewer/how-to-write-feedback.md": ("Writing Feedback", "Guidelines for constructive feedback."),
    "docs/ec/roles/reviewer/common-edge-cases.md": ("Reviewer Edge Cases", "Handling tricky review scenarios."),

    # Adjudicator
    "docs/ec/roles/adjudicator/overview.md": ("Adjudicator Overview", "Overview of the Adjudicator role."),
    "docs/ec/roles/adjudicator/tie-breaking-principles.md": ("Tie-Breaking Principles", "How to resolve conflicts between reviewers."),
    "docs/ec/roles/adjudicator/common-edge-cases.md": ("Adjudicator Edge Cases", "Complex adjudication scenarios."),

    # Reference - Workflow
    "docs/ec/reference/workflow/step-1-intent.md": ("Step 1: Intent", "Understanding user intent."),
    "docs/ec/reference/workflow/step-2-system-prompt.md": ("Step 2: System Prompt", "Applying system instructions."),
    "docs/ec/reference/workflow/step-3-user-prompts.md": ("Step 3: User Prompts", "Analyzing user prompts."),
    "docs/ec/reference/workflow/step-4-bad-response.md": ("Step 4: Bad Response", "Identifying bad responses."),
    "docs/ec/reference/workflow/step-5-good-response.md": ("Step 5: Good Response", "Crafting good responses."),
    "docs/ec/reference/workflow/step-6-review-checklist.md": ("Step 6: Review Checklist", "Final review pass."),

    # Reference - Failure Modes
    "docs/ec/reference/failure-modes/overview.md": ("Failure Modes Overview", "Catalog of common AI failure modes."),
    "docs/ec/reference/failure-modes/instruction-retention.md": ("Instruction Retention", "Failures in following instructions."),
    "docs/ec/reference/failure-modes/course-correction.md": ("Course Correction", "Failures in adjusting to feedback."),
    "docs/ec/reference/failure-modes/task-continuation.md": ("Task Continuation", "Failures in multi-turn tasks."),

    # Reference - System Prompts
    "docs/ec/reference/system-prompts/rules-and-patterns.md": ("Rules & Patterns", "System prompt design rules."),
    "docs/ec/reference/system-prompts/templates.md": ("Templates", "Standard system prompt templates."),

    # Reference - Tools
    "docs/ec/reference/tools/overview.md": ("Tools Overview", "Available tools for the model."),
    "docs/ec/reference/tools/web-search.md": ("Web Search", "Using the search tool."),
    "docs/ec/reference/tools/news-search.md": ("News Search", "Using the news search tool."),
    "docs/ec/reference/tools/open-url.md": ("Open URL", "Opening URLs."),
    "docs/ec/reference/tools/open-search.md": ("Open Search", "Advanced search capabilities."),
    "docs/ec/reference/tools/common-bugs-and-glitches.md": ("Common Bugs", "Known tool issues."),

    # Reference - Misc
    "docs/ec/reference/faq-glossary.md": ("FAQ & Glossary", "Common terms and questions."),
    "docs/ec/reference/changelog.md": ("Changelog", "Record of updates to guidelines."),

    # Internal
    "docs/internal/overview.md": ("Internal Overview", "Overview for internal team members."),
    "docs/internal/calibration-notes.md": ("Calibration Notes", "Notes on model calibration."),
    "docs/internal/qa-process.md": ("QA Process", "Internal QA procedures."),
    "docs/internal/metrics-and-health.md": ("Metrics & Health", "Project health metrics."),
    "docs/internal/release-notes.md": ("Release Notes", "Internal release notes."),
}

template = """---
title: "{title}"
description: "{desc}"
effectiveDate: 2025-12-16
owners: []
---

# {title}

{desc}

:::info Status
This page is a placeholder. Content needs to be added.
:::

## Checklist

- [ ] Draft content
- [ ] Review with team
- [ ] Publish

## TODO

- Flesh out this section
- Add examples
"""

os.makedirs("scripts", exist_ok=True)

for path, (title, desc) in stubs.items():
    # Ensure directory exists
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w") as f:
        f.write(template.format(title=title, desc=desc))
    print(f"Created {path}")
