import type { ToolDefinition } from '@/lib/tools/types';
import { ToolCard } from '@/components/tools/ToolCard';
import { EmptyState } from '@/components/common/EmptyState';

export function ToolCatalog(props: { tools: ToolDefinition[] }) {
  const { tools } = props;
  if (tools.length === 0) {
    return (
      <EmptyState
        title="No tools match your search"
        description="Try a different keyword, or clear the search field to see the full catalog again."
      />
    );
  }
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {tools.map((tool) => (
        <ToolCard key={tool.id} tool={tool} />
      ))}
    </div>
  );
}
