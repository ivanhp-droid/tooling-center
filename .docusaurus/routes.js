import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/',
    component: ComponentCreator('/', 'e5f'),
    exact: true
  },
  {
    path: '/',
    component: ComponentCreator('/', '62c'),
    routes: [
      {
        path: '/',
        component: ComponentCreator('/', 'bb7'),
        routes: [
          {
            path: '/',
            component: ComponentCreator('/', '694'),
            routes: [
              {
                path: '/intro',
                component: ComponentCreator('/intro', '5e0'),
                exact: true,
                sidebar: "ecSidebar"
              },
              {
                path: '/reference/changelog',
                component: ComponentCreator('/reference/changelog', '1b2'),
                exact: true,
                sidebar: "ecSidebar"
              },
              {
                path: '/reference/failure-modes/course-correction',
                component: ComponentCreator('/reference/failure-modes/course-correction', 'fcd'),
                exact: true,
                sidebar: "ecSidebar"
              },
              {
                path: '/reference/failure-modes/instruction-retention',
                component: ComponentCreator('/reference/failure-modes/instruction-retention', 'a8d'),
                exact: true,
                sidebar: "ecSidebar"
              },
              {
                path: '/reference/failure-modes/overview',
                component: ComponentCreator('/reference/failure-modes/overview', '21c'),
                exact: true,
                sidebar: "ecSidebar"
              },
              {
                path: '/reference/failure-modes/task-continuation',
                component: ComponentCreator('/reference/failure-modes/task-continuation', '2ba'),
                exact: true,
                sidebar: "ecSidebar"
              },
              {
                path: '/reference/faq-glossary',
                component: ComponentCreator('/reference/faq-glossary', '074'),
                exact: true,
                sidebar: "ecSidebar"
              },
              {
                path: '/reference/system-prompts/rules-and-patterns',
                component: ComponentCreator('/reference/system-prompts/rules-and-patterns', '4cf'),
                exact: true,
                sidebar: "ecSidebar"
              },
              {
                path: '/reference/system-prompts/templates',
                component: ComponentCreator('/reference/system-prompts/templates', 'c6c'),
                exact: true,
                sidebar: "ecSidebar"
              },
              {
                path: '/reference/tools/common-bugs-and-glitches',
                component: ComponentCreator('/reference/tools/common-bugs-and-glitches', '02c'),
                exact: true,
                sidebar: "ecSidebar"
              },
              {
                path: '/reference/tools/news-search',
                component: ComponentCreator('/reference/tools/news-search', 'd75'),
                exact: true,
                sidebar: "ecSidebar"
              },
              {
                path: '/reference/tools/open-search',
                component: ComponentCreator('/reference/tools/open-search', '500'),
                exact: true,
                sidebar: "ecSidebar"
              },
              {
                path: '/reference/tools/open-url',
                component: ComponentCreator('/reference/tools/open-url', 'ad2'),
                exact: true,
                sidebar: "ecSidebar"
              },
              {
                path: '/reference/tools/overview',
                component: ComponentCreator('/reference/tools/overview', '2f3'),
                exact: true,
                sidebar: "ecSidebar"
              },
              {
                path: '/reference/tools/web-search',
                component: ComponentCreator('/reference/tools/web-search', 'db4'),
                exact: true,
                sidebar: "ecSidebar"
              },
              {
                path: '/reference/workflow/step-1-intent',
                component: ComponentCreator('/reference/workflow/step-1-intent', '58f'),
                exact: true,
                sidebar: "ecSidebar"
              },
              {
                path: '/reference/workflow/step-2-system-prompt',
                component: ComponentCreator('/reference/workflow/step-2-system-prompt', '947'),
                exact: true,
                sidebar: "ecSidebar"
              },
              {
                path: '/reference/workflow/step-3-user-prompts',
                component: ComponentCreator('/reference/workflow/step-3-user-prompts', 'ab3'),
                exact: true,
                sidebar: "ecSidebar"
              },
              {
                path: '/reference/workflow/step-4-bad-response',
                component: ComponentCreator('/reference/workflow/step-4-bad-response', '5c8'),
                exact: true,
                sidebar: "ecSidebar"
              },
              {
                path: '/reference/workflow/step-5-good-response',
                component: ComponentCreator('/reference/workflow/step-5-good-response', '6b9'),
                exact: true,
                sidebar: "ecSidebar"
              },
              {
                path: '/reference/workflow/step-6-review-checklist',
                component: ComponentCreator('/reference/workflow/step-6-review-checklist', '4d1'),
                exact: true,
                sidebar: "ecSidebar"
              },
              {
                path: '/roles/adjudicator/common-edge-cases',
                component: ComponentCreator('/roles/adjudicator/common-edge-cases', '84d'),
                exact: true,
                sidebar: "ecSidebar"
              },
              {
                path: '/roles/adjudicator/overview',
                component: ComponentCreator('/roles/adjudicator/overview', '0ad'),
                exact: true,
                sidebar: "ecSidebar"
              },
              {
                path: '/roles/adjudicator/tie-breaking-principles',
                component: ComponentCreator('/roles/adjudicator/tie-breaking-principles', '189'),
                exact: true,
                sidebar: "ecSidebar"
              },
              {
                path: '/roles/reviewer/common-edge-cases',
                component: ComponentCreator('/roles/reviewer/common-edge-cases', '98f'),
                exact: true,
                sidebar: "ecSidebar"
              },
              {
                path: '/roles/reviewer/how-to-write-feedback',
                component: ComponentCreator('/roles/reviewer/how-to-write-feedback', '17c'),
                exact: true,
                sidebar: "ecSidebar"
              },
              {
                path: '/roles/reviewer/overview',
                component: ComponentCreator('/roles/reviewer/overview', '173'),
                exact: true,
                sidebar: "ecSidebar"
              },
              {
                path: '/roles/reviewer/rubric-and-checklist',
                component: ComponentCreator('/roles/reviewer/rubric-and-checklist', '6f7'),
                exact: true,
                sidebar: "ecSidebar"
              },
              {
                path: '/roles/submitter/checklist',
                component: ComponentCreator('/roles/submitter/checklist', 'e0e'),
                exact: true,
                sidebar: "ecSidebar"
              },
              {
                path: '/roles/submitter/common-mistakes',
                component: ComponentCreator('/roles/submitter/common-mistakes', 'eb2'),
                exact: true,
                sidebar: "ecSidebar"
              },
              {
                path: '/roles/submitter/overview',
                component: ComponentCreator('/roles/submitter/overview', 'cf9'),
                exact: true,
                sidebar: "ecSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
