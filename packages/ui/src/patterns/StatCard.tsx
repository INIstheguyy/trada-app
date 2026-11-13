import type { HTMLAttributes, ReactNode } from 'react';
import { Surface } from '../primitives/Surface';

type StatCardProps = HTMLAttributes<HTMLElement> & {
  icon?: ReactNode;
  label: string;
  note?: ReactNode;
  value: ReactNode;
};

export function StatCard({ className = '', icon, label, note, value, ...props }: StatCardProps) {
  return (
    <Surface className={`sd-stat-card ${className}`} {...props}>
      <div className="sd-stat-card__header">
        <p className="sd-stat-card__label">{label}</p>
        {icon}
      </div>
      <strong className="sd-stat-card__value">{value}</strong>
      {note && <p className="sd-stat-card__note">{note}</p>}
    </Surface>
  );
}
