import type { RiskLevel } from '@/lib/tools/types';

export function riskLabel(level: RiskLevel) {
  if (level === 'high') return 'High risk';
  if (level === 'medium') return 'Medium risk';
  return 'Low risk';
}

export function riskBadgeTone(level: RiskLevel): 'danger' | 'warning' | 'neutral' {
  if (level === 'high') return 'danger';
  if (level === 'medium') return 'warning';
  return 'neutral';
}
