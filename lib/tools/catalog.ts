import type { ToolDefinition } from '@/lib/tools/types';
import { toolsExecutors } from '@/lib/execution/toolsExecutors';

const TOOL_CATEGORY_USER = 'User Management';
const TOOL_CATEGORY_PROJECTS = 'Projects';
const TOOL_CATEGORY_TASKS = 'Tasks';

export const toolCatalog: ToolDefinition[] = [
  {
    id: 'add-user-tags',
    name: 'Add User Tags',
    description: 'Bulk add one or more tags to users.',
    category: TOOL_CATEGORY_USER,
    riskLevel: 'medium',
    requiresApiKey: true,
    requiresCsv: true,
    csvSchema: {
      columns: [
        { key: 'userId', label: 'User ID', required: true, type: 'string', example: 'usr_123' },
        { key: 'tags', label: 'Tags (pipe-separated)', required: true, type: 'string', example: 'vip|beta' }
      ]
    },
    additionalFields: [
      {
        key: 'dryRun',
        label: 'Dry run (no changes)',
        type: 'checkbox',
        helpText: 'Simulate without performing updates.',
        defaultValue: true
      }
    ],
    output: {
      columns: [
        { key: 'userId', label: 'User ID' },
        { key: 'tagsAdded', label: 'Tags Added' },
        { key: 'message', label: 'Message' }
      ]
    },
    execute: toolsExecutors.addUserTags
  },
  {
    id: 'assign-user-to-project',
    name: 'Assign User to Project',
    description: 'Bulk assign users to projects.',
    category: TOOL_CATEGORY_PROJECTS,
    riskLevel: 'high',
    requiresApiKey: true,
    requiresCsv: true,
    csvSchema: {
      columns: [
        { key: 'userId', label: 'User ID', required: true, type: 'string', example: 'usr_123' },
        { key: 'projectId', label: 'Project ID', required: true, type: 'string', example: 'prj_456' },
        { key: 'role', label: 'Role', required: false, type: 'string', example: 'viewer' }
      ]
    },
    additionalFields: [
      {
        key: 'notifyUser',
        label: 'Notify user',
        type: 'checkbox',
        helpText: 'Send a notification after assignment.',
        defaultValue: false
      }
    ],
    output: {
      columns: [
        { key: 'userId', label: 'User ID' },
        { key: 'projectId', label: 'Project ID' },
        { key: 'role', label: 'Role' },
        { key: 'message', label: 'Message' }
      ]
    },
    execute: toolsExecutors.assignUserToProject
  },
  {
    id: 'remove-user-from-project',
    name: 'Remove User from Project',
    description: 'Bulk remove users from projects.',
    category: TOOL_CATEGORY_PROJECTS,
    riskLevel: 'high',
    requiresApiKey: true,
    requiresCsv: true,
    csvSchema: {
      columns: [
        { key: 'userId', label: 'User ID', required: true, type: 'string', example: 'usr_123' },
        { key: 'projectId', label: 'Project ID', required: true, type: 'string', example: 'prj_456' },
        { key: 'reason', label: 'Reason', required: false, type: 'string', example: 'No longer on team' }
      ]
    },
    additionalFields: [
      {
        key: 'dryRun',
        label: 'Dry run (no changes)',
        type: 'checkbox',
        defaultValue: true
      }
    ],
    output: {
      columns: [
        { key: 'userId', label: 'User ID' },
        { key: 'projectId', label: 'Project ID' },
        { key: 'message', label: 'Message' }
      ]
    },
    execute: toolsExecutors.removeUserFromProject
  },
  {
    id: 'task-priority-tagging',
    name: 'Task Priority Tagging',
    description: 'Bulk set or tag task priority values.',
    category: TOOL_CATEGORY_TASKS,
    riskLevel: 'medium',
    requiresApiKey: true,
    requiresCsv: true,
    csvSchema: {
      columns: [
        { key: 'taskId', label: 'Task ID', required: true, type: 'string', example: 'tsk_123' },
        { key: 'priority', label: 'Priority', required: true, type: 'string', example: 'P1' }
      ]
    },
    additionalFields: [
      {
        key: 'mode',
        label: 'Mode',
        type: 'select',
        required: true,
        options: [
          { label: 'Set priority', value: 'set' },
          { label: 'Add tag only', value: 'tag' }
        ],
        defaultValue: 'set'
      }
    ],
    output: {
      columns: [
        { key: 'taskId', label: 'Task ID' },
        { key: 'priority', label: 'Priority' },
        { key: 'message', label: 'Message' }
      ]
    },
    execute: toolsExecutors.taskPriorityTagging
  },
  {
    id: 'update-task-state',
    name: 'Update Task State',
    description: 'Bulk move tasks between states (e.g. Todo → In Progress).',
    category: TOOL_CATEGORY_TASKS,
    riskLevel: 'high',
    requiresApiKey: true,
    requiresCsv: true,
    csvSchema: {
      columns: [
        { key: 'taskId', label: 'Task ID', required: true, type: 'string', example: 'tsk_123' },
        { key: 'state', label: 'Target State', required: true, type: 'string', example: 'in_progress' }
      ]
    },
    additionalFields: [
      {
        key: 'comment',
        label: 'Comment',
        type: 'textarea',
        required: false,
        helpText: 'Optional audit note to attach to each task update.',
        placeholder: 'Reason for the state change...'
      }
    ],
    output: {
      columns: [
        { key: 'taskId', label: 'Task ID' },
        { key: 'state', label: 'State' },
        { key: 'message', label: 'Message' }
      ]
    },
    execute: toolsExecutors.updateTaskState
  }
];

export function getToolById(id: string): ToolDefinition | undefined {
  return toolCatalog.find((t) => t.id === id);
}

export function getToolCategories(): string[] {
  return Array.from(new Set(toolCatalog.map((t) => t.category))).sort((a, b) => a.localeCompare(b));
}

