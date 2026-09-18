import { motion } from 'framer-motion';
import type { EventCategory } from '../types/event';

type FilterCategory = EventCategory | 'all';

interface CategoryTabsProps {
  active: FilterCategory;
  onChange: (cat: FilterCategory) => void;
  counts?: Partial<Record<FilterCategory, number>>;
}

const TABS: { id: FilterCategory; label: string }[] = [
  { id: 'all', label: 'All Events' },
  { id: 'technical', label: 'Technical' },
  { id: 'non_technical', label: 'Non-Technical' },
  { id: 'cultural', label: 'Cultural' },
];

export default function CategoryTabs({ active, onChange, counts }: CategoryTabsProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {TABS.map((tab) => {
        const isActive = active === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className="relative px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 overflow-hidden"
            style={
              isActive
                ? {
                    background: 'linear-gradient(135deg, #7C3AED, #2563EB)',
                    color: '#fff',
                    boxShadow: '0 0 20px rgba(124,58,237,0.4)',
                  }
                : {
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'rgba(255,255,255,0.5)',
                  }
            }
            onMouseEnter={(e) => {
              if (!isActive) {
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(124,58,237,0.4)';
                (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.8)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.1)';
                (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.5)';
              }
            }}
          >
            {isActive && (
              <motion.span
                layoutId="tab-bg"
                className="absolute inset-0 rounded-full"
                style={{ background: 'linear-gradient(135deg, #7C3AED, #2563EB)' }}
                transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              {tab.label}
              {counts && counts[tab.id] !== undefined && (
                <span
                  className="text-xs rounded-full px-1.5 py-0.5 font-bold min-w-[20px] text-center"
                  style={{
                    background: isActive ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.08)',
                  }}
                >
                  {counts[tab.id]}
                </span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}
