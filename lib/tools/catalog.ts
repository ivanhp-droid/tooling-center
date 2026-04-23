import type { ToolDefinition } from '@/lib/tools/types';
import { toolsExecutors } from '@/lib/execution/toolsExecutors';

const TOOL_CATEGORY_USER = 'User Management';
const TOOL_CATEGORY_PROJECTS = 'Projects';
const TOOL_CATEGORY_TASKS = 'Tasks';

export const toolCatalog: ToolDefinition[] = [
  {
    id: 'add-user-tags',
    name: 'Add User Tags',
    description: 'Bulk add a tag to users (one user/tag per row).',
    category: TOOL_CATEGORY_USER,
    riskLevel: 'medium',
    requiresApiKey: true,
    requiresCsv: true,
    csvSchema: {
      allowUnknownColumns: false,
      unknownColumnsSeverity: 'warning',
      keyColumns: ['user_id', 'tag'],
      notes: [
        'One row represents one user + one tag to add.',
        'Duplicate rows will be flagged as warnings and may be skipped during execution.'
      ],
      templateCsv: {
        filename: 'add-user-tags.template.csv',
        content: ['user_id,tag,reason,source', 'usr_123,vip,Customer escalation,support', 'usr_456,beta,Early access,ops'].join(
          '\n'
        )
      },
      columns: [
        {
          key: 'user_id',
          label: 'User ID',
          required: true,
          type: 'string',
          description: 'Internal user identifier.',
          example: 'usr_123',
          pattern: '^usr_[a-zA-Z0-9]+$'
        },
        {
          key: 'tag',
          label: 'Tag',
          required: true,
          type: 'string',
          description: 'Single tag to add.',
          example: 'vip',
          pattern: '^[a-z0-9_\\-]+$'
        },
        {
          key: 'reason',
          label: 'Reason',
          required: false,
          type: 'string',
          description: 'Optional audit reason for the tag change.',
          example: 'Customer escalation'
        },
        {
          key: 'source',
          label: 'Source',
          required: false,
          type: 'string',
          description: 'Optional source system/team for tracking.',
          example: 'support'
        }
      ]
    },
    additionalFields: [
      {
        key: 'mode',
        label: 'Mode',
        type: 'select',
        required: true,
        options: [
          { label: 'Add tag (no changes if already present)', value: 'merge' },
          { label: 'Overwrite tags to only this tag', value: 'overwrite' }
        ],
        defaultValue: 'merge',
        helpText: 'Overwrite is riskier; it replaces existing tags with the provided tag.'
      },
      {
        key: 'dryRun',
        label: 'Dry run',
        type: 'checkbox',
        helpText: 'Simulate without performing updates.',
        defaultValue: true
      }
    ],
    helpText: {
      overview:
        'Adds a tag to each specified user. Useful for segmentation, feature access, or operational flags. Each CSV row is one user + one tag.',
      csvTips: ['Ensure `user_id` values include the `usr_` prefix.', 'Use lowercase tags like `vip` or `beta`.'],
      reversibility: 'Generally reversible by removing the tag, but bulk tag changes can be hard to audit.'
    },
    confirmation: {
      mode: 'standard',
      warningText: 'This will apply tags in bulk. Double-check your CSV before running.'
    },
    output: {
      columns: [
        { key: 'user_id', label: 'User ID' },
        { key: 'tag', label: 'Tag' },
        { key: 'action', label: 'Action' },
        { key: 'message', label: 'Message' }
      ]
    },
    execute: toolsExecutors.addUserTags
  },
  {
    id: 'assign-user-to-project',
    name: 'Assign User to Project',
    description: 'Bulk add users to projects with an optional role.',
    category: TOOL_CATEGORY_PROJECTS,
    riskLevel: 'high',
    requiresApiKey: true,
    requiresCsv: true,
    csvSchema: {
      allowUnknownColumns: false,
      unknownColumnsSeverity: 'warning',
      keyColumns: ['user_id', 'project_id'],
      notes: [
        'If `role` is blank in the CSV, the default role input will be used.',
        'Duplicate assignments will be flagged as warnings and may be skipped.'
      ],
      templateCsv: {
        filename: 'assign-user-to-project.template.csv',
        content: ['user_id,project_id,role,note', 'usr_123,prj_456,viewer,On-call rotation', 'usr_789,prj_456,,Backfill access'].join(
          '\n'
        )
      },
      columns: [
        {
          key: 'user_id',
          label: 'User ID',
          required: true,
          type: 'string',
          description: 'Internal user identifier.',
          example: 'usr_123',
          pattern: '^usr_[a-zA-Z0-9]+$'
        },
        {
          key: 'project_id',
          label: 'Project ID',
          required: true,
          type: 'string',
          description: 'Internal project identifier.',
          example: 'prj_456',
          pattern: '^prj_[a-zA-Z0-9]+$'
        },
        {
          key: 'role',
          label: 'Role',
          required: false,
          type: 'string',
          description: 'Optional role to assign; blank uses default role input.',
          example: 'viewer',
          allowedValues: ['viewer', 'editor', 'admin']
        },
        {
          key: 'note',
          label: 'Note',
          required: false,
          type: 'string',
          description: 'Optional note for audit context.',
          example: 'On-call rotation'
        }
      ]
    },
    additionalFields: [
      {
        key: 'default_role',
        label: 'Default role (used when CSV role is blank)',
        type: 'select',
        required: true,
        options: [
          { label: 'Viewer', value: 'viewer' },
          { label: 'Editor', value: 'editor' },
          { label: 'Admin', value: 'admin' }
        ],
        defaultValue: 'viewer'
      },
      {
        key: 'notify_user',
        label: 'Notify user',
        type: 'checkbox',
        helpText: 'Simulate sending a notification after assignment.',
        defaultValue: false
      }
    ],
    helpText: {
      overview: 'Adds users to projects. This can grant access, so review carefully.',
      csvTips: ['Ensure IDs are correct; wrong project IDs can grant unintended access.', 'Role values must be one of viewer/editor/admin.']
    },
    confirmation: {
      mode: 'standard',
      warningText: 'This will grant project access in bulk.'
    },
    output: {
      columns: [
        { key: 'user_id', label: 'User ID' },
        { key: 'project_id', label: 'Project ID' },
        { key: 'role', label: 'Role' },
        { key: 'action', label: 'Action' },
        { key: 'message', label: 'Message' }
      ]
    },
    execute: toolsExecutors.assignUserToProject
  },
  {
    id: 'remove-tags-from-users',
    name: 'Remove Tags from Users',
    description: 'Remove one or more project-specific tags from users using email, project name, and tag values.',
    category: TOOL_CATEGORY_USER,
    riskLevel: 'high',
    requiresApiKey: true,
    requiresCsv: true,
    csvSchema: {
      allowUnknownColumns: false,
      unknownColumnsSeverity: 'warning',
      keyColumns: ['email', 'project_name'],
      keyColumnsIncludeDynamicPrefixes: true,
      dynamicColumnPrefixes: ['tag'],
      requireAtLeastOneDynamicColumn: true,
      requireAtLeastOneValueInDynamicColumnsPerRow: true,
      notes: [
        'Provide email and project_name on every row.',
        'Add one or more tag columns (for example: tag, tag_1, tag_2, tag_to_remove).',
        'Tags are removed only when both tag value and project name match existing user tags.',
        'Empty tag cells are ignored.'
      ],
      templateCsv: {
        filename: 'remove-tags-from-users.template.csv',
        content: [
          'email,project_name,tag_1,tag_2,tag_3',
          'user@example.com,Project Swordfish,reviewer,priority-submitters,bpo-fermatix',
          'another.user@example.com,Project Swordfish,needs-training,,'
        ].join('\n')
      },
      columns: [
        {
          key: 'email',
          label: 'Email',
          required: true,
          type: 'string',
          description: 'User email address. It will be normalized to lowercase during execution.',
          example: 'user@example.com',
          pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$'
        },
        {
          key: 'project_name',
          label: 'Project name',
          required: true,
          type: 'string',
          description: 'Project name that the tag is associated with.',
          example: 'Project Swordfish'
        }
      ]
    },
    additionalFields: [
      {
        key: 'env',
        label: 'Environment',
        type: 'select',
        required: true,
        options: [
          { label: 'staging', value: 'staging' },
          { label: 'prod', value: 'prod' }
        ],
        defaultValue: 'staging',
        helpText: 'Use staging first whenever possible. Production removes real user tags.'
      },
      {
        key: 'dryRun',
        label: 'Dry run',
        type: 'checkbox',
        helpText: 'Preview what would be removed without deleting anything.',
        defaultValue: true
      }
    ],
    helpText: {
      overview:
        'This tool removes tags from users. A tag is removed only when both the tag value and project name match. The CSV can include multiple tag columns, and empty tag cells are ignored.',
      csvTips: [
        'Accepted dynamic columns are any headers that start with `tag`.',
        'Rows without `email`, `project_name`, or any non-empty tag value are blocked before run.',
        'Use staging first whenever possible.',
        'Production runs require confirmation.'
      ],
      reversibility: 'Tag removals can impact access, routing, segmentation, and reporting. Re-applying tags later may not fully restore behavior.'
    },
    confirmation: {
      mode: 'strong',
      strongRequiresCheckbox: true,
      strongRequiresTyped: 'CONFIRM',
      warningText:
        'This action removes user tags and may affect project access, routing, segmentation, or reporting. Use staging first whenever possible. Production runs require confirmation.'
    },
    output: {
      columns: [
        { key: 'email', label: 'Email' },
        { key: 'project_name', label: 'Project Name' },
        { key: 'tag', label: 'Tag' },
        { key: 'status', label: 'Status' },
        { key: 'message', label: 'Message' },
        { key: 'environment', label: 'Environment' }
      ]
    },
    execute: toolsExecutors.removeTagsFromUsers
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
      allowUnknownColumns: false,
      unknownColumnsSeverity: 'warning',
      keyColumns: ['user_id', 'project_id'],
      notes: [
        'This operation revokes access and may not be reversible depending on downstream systems.',
        'A removal reason is recommended for audit.'
      ],
      templateCsv: {
        filename: 'remove-user-from-project.template.csv',
        content: ['user_id,project_id,removal_reason', 'usr_123,prj_456,Contract ended', 'usr_789,prj_999,Incorrect assignment'].join(
          '\n'
        )
      },
      columns: [
        {
          key: 'user_id',
          label: 'User ID',
          required: true,
          type: 'string',
          description: 'Internal user identifier.',
          example: 'usr_123',
          pattern: '^usr_[a-zA-Z0-9]+$'
        },
        {
          key: 'project_id',
          label: 'Project ID',
          required: true,
          type: 'string',
          description: 'Internal project identifier.',
          example: 'prj_456',
          pattern: '^prj_[a-zA-Z0-9]+$'
        },
        {
          key: 'removal_reason',
          label: 'Removal reason',
          required: false,
          type: 'string',
          description: 'Optional reason for audit trail.',
          example: 'No longer on team'
        }
      ]
    },
    additionalFields: [
      {
        key: 'confirmation_note',
        label: 'Confirmation note',
        type: 'text',
        required: true,
        helpText: 'Short note explaining why you are removing access (stored in history).',
        placeholder: 'e.g. Offboarding - ticket INC-123'
      },
      {
        key: 'dry_run',
        label: 'Dry run',
        type: 'checkbox',
        helpText: 'Simulate without performing removals.',
        defaultValue: true
      }
    ],
    helpText: {
      overview: 'Removes users from projects and revokes access.',
      csvTips: ['Double-check project IDs; removals can disrupt active work.', 'Include `removal_reason` when possible.'],
      reversibility: 'May be reversible by re-assigning the user, but access revocation can have side effects.'
    },
    confirmation: {
      mode: 'strong',
      strongRequiresCheckbox: true,
      strongRequiresTyped: 'CONFIRM',
      warningText: 'This will revoke access in bulk. This may be disruptive and is sometimes not fully reversible.'
    },
    output: {
      columns: [
        { key: 'user_id', label: 'User ID' },
        { key: 'project_id', label: 'Project ID' },
        { key: 'action', label: 'Action' },
        { key: 'message', label: 'Message' }
      ]
    },
    execute: toolsExecutors.removeUserFromProject
  },
  {
    id: 'task-priority-tagging',
    name: 'Task Priority Tagging',
    description: 'Bulk apply a priority tag to tasks.',
    category: TOOL_CATEGORY_TASKS,
    riskLevel: 'medium',
    requiresApiKey: true,
    requiresCsv: true,
    csvSchema: {
      allowUnknownColumns: false,
      unknownColumnsSeverity: 'warning',
      keyColumns: ['task_id'],
      notes: ['Priority tags must be one of P0, P1, P2, P3.', 'Duplicate task_ids will be flagged as warnings.'],
      templateCsv: {
        filename: 'task-priority-tagging.template.csv',
        content: ['task_id,priority_tag,reason,requested_by', 'tsk_123,P1,Customer impact,alice', 'tsk_999,P3,Backlog grooming,bob'].join(
          '\n'
        )
      },
      columns: [
        {
          key: 'task_id',
          label: 'Task ID',
          required: true,
          type: 'string',
          description: 'Internal task identifier.',
          example: 'tsk_123',
          pattern: '^tsk_[a-zA-Z0-9]+$'
        },
        {
          key: 'priority_tag',
          label: 'Priority tag',
          required: true,
          type: 'string',
          description: 'Priority label to apply.',
          example: 'P1',
          allowedValues: ['P0', 'P1', 'P2', 'P3']
        },
        { key: 'reason', label: 'Reason', required: false, type: 'string', description: 'Optional audit reason.' },
        {
          key: 'requested_by',
          label: 'Requested by',
          required: false,
          type: 'string',
          description: 'Optional requester for audit.',
          example: 'alice'
        }
      ]
    },
    additionalFields: [
      {
        key: 'apply_mode',
        label: 'Apply mode',
        type: 'select',
        required: true,
        options: [
          { label: 'Add tag (idempotent)', value: 'add' },
          { label: 'Replace existing priority tag', value: 'replace' }
        ],
        defaultValue: 'add',
        helpText: 'Replace may remove/overwrite an existing priority tag.'
      }
    ],
    helpText: {
      overview: 'Applies a priority tag to tasks for triage and reporting.',
      csvTips: ['Use allowed values only: P0, P1, P2, P3.', 'Ensure `task_id` includes the `tsk_` prefix.']
    },
    confirmation: { mode: 'standard', warningText: 'This will change task metadata in bulk.' },
    output: {
      columns: [
        { key: 'task_id', label: 'Task ID' },
        { key: 'priority_tag', label: 'Priority' },
        { key: 'action', label: 'Action' },
        { key: 'message', label: 'Message' }
      ]
    },
    execute: toolsExecutors.taskPriorityTagging
  },
  {
    id: 'update-task-state',
    name: 'Update Task State',
    description: 'Bulk transition tasks to a new state.',
    category: TOOL_CATEGORY_TASKS,
    riskLevel: 'high',
    requiresApiKey: true,
    requiresCsv: true,
    csvSchema: {
      allowUnknownColumns: false,
      unknownColumnsSeverity: 'warning',
      keyColumns: ['task_id'],
      notes: [
        'State values must be one of: todo, in_progress, blocked, done, canceled.',
        'Providing previous_state can help catch accidental transitions.'
      ],
      templateCsv: {
        filename: 'update-task-state.template.csv',
        content: ['task_id,new_state,previous_state,reason', 'tsk_123,in_progress,todo,Picked up by on-call', 'tsk_999,done,in_progress,Verified fix'].join(
          '\n'
        )
      },
      columns: [
        {
          key: 'task_id',
          label: 'Task ID',
          required: true,
          type: 'string',
          description: 'Internal task identifier.',
          example: 'tsk_123',
          pattern: '^tsk_[a-zA-Z0-9]+$'
        },
        {
          key: 'new_state',
          label: 'New state',
          required: true,
          type: 'string',
          description: 'Target state to transition to.',
          example: 'in_progress',
          allowedValues: ['todo', 'in_progress', 'blocked', 'done', 'canceled']
        },
        {
          key: 'previous_state',
          label: 'Previous state',
          required: false,
          type: 'string',
          description: 'Optional expected current state (used for validation).',
          allowedValues: ['todo', 'in_progress', 'blocked', 'done', 'canceled']
        },
        {
          key: 'reason',
          label: 'Reason',
          required: false,
          type: 'string',
          description: 'Optional reason for audit.'
        }
      ]
    },
    additionalFields: [
      {
        key: 'transition_note',
        label: 'Transition note',
        type: 'textarea',
        required: false,
        helpText: 'Optional note appended to each transition for audit.',
        placeholder: 'Reason for the change...'
      },
      {
        key: 'dry_run',
        label: 'Dry run',
        type: 'checkbox',
        defaultValue: true,
        helpText: 'Simulate transitions without applying changes.'
      }
    ],
    helpText: {
      overview: 'Moves tasks between workflow states. Incorrect transitions can break reporting and automation.',
      csvTips: ['Use allowed states only.', 'If you include previous_state, mismatches will be treated as failures/skips.'],
      reversibility: 'Sometimes reversible by transitioning back, but may trigger downstream automation.'
    },
    confirmation: {
      mode: 'strong',
      strongRequiresCheckbox: true,
      strongRequiresTyped: 'CONFIRM',
      warningText: 'This performs bulk workflow transitions and may trigger automation.'
    },
    output: {
      columns: [
        { key: 'task_id', label: 'Task ID' },
        { key: 'new_state', label: 'New state' },
        { key: 'action', label: 'Action' },
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

