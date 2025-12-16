import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  ecSidebar: [
    {
      type: 'category',
      label: 'By Role',
      items: [
        {
            type: 'category',
            label: 'Submitter',
            items: [
                'roles/submitter/overview',
                'roles/submitter/checklist',
                'roles/submitter/common-mistakes',
            ]
        },
        {
            type: 'category',
            label: 'Reviewer',
            items: [
                'roles/reviewer/overview',
                'roles/reviewer/rubric-and-checklist',
                'roles/reviewer/how-to-write-feedback',
                'roles/reviewer/common-edge-cases',
            ]
        },
        {
            type: 'category',
            label: 'Adjudicator',
            items: [
                'roles/adjudicator/overview',
                'roles/adjudicator/tie-breaking-principles',
                'roles/adjudicator/common-edge-cases',
            ]
        },
      ],
    },
    {
      type: 'category',
      label: 'Reference',
      items: [
        {
            type: 'category',
            label: 'Workflow',
            items: [
                'reference/workflow/step-1-intent',
                'reference/workflow/step-2-system-prompt',
                'reference/workflow/step-3-user-prompts',
                'reference/workflow/step-4-bad-response',
                'reference/workflow/step-5-good-response',
                'reference/workflow/step-6-review-checklist',
            ]
        },
        {
            type: 'category',
            label: 'Failure Modes',
            items: [
                'reference/failure-modes/overview',
                'reference/failure-modes/instruction-retention',
                'reference/failure-modes/course-correction',
                'reference/failure-modes/task-continuation',
            ]
        },
        {
            type: 'category',
            label: 'System Prompts',
            items: [
                'reference/system-prompts/rules-and-patterns',
                'reference/system-prompts/templates',
            ]
        },
        {
            type: 'category',
            label: 'Tools',
            items: [
                'reference/tools/overview',
                'reference/tools/web-search',
                'reference/tools/news-search',
                'reference/tools/open-url',
                'reference/tools/open-search',
                'reference/tools/common-bugs-and-glitches',
            ]
        },
        'reference/faq-glossary',
        'reference/changelog',
      ],
    },
  ],
};

export default sidebars;
