import type { ToolDefinition } from '@/lib/tools/types';
import { ToolCard } from '@/components/tools/ToolCard';

export function ToolCatalog(props: { tools: ToolDefinition[] }) {
  const { tools } = props;
  return (
    <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
      {tools.map((tool) => (
        <ToolCard key={tool.id} tool={tool} />
      ))}
    </div>
  );
}

