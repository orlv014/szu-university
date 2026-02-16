import React from 'react';
import { ChevronRight } from 'lucide-react';

export type BreadcrumbItem = { label: string; href?: string };

const Breadcrumbs: React.FC<{ items: BreadcrumbItem[] }> = ({ items }) => {
  if (!items.length) return null;
  return (
    <nav className="border-b border-slate-100 bg-white/50" aria-label="Хлебные крошки">
      <div className="container mx-auto px-6 py-3">
        <ol className="flex flex-wrap items-center gap-2 text-sm font-medium text-slate-500">
          {items.map((item, i) => (
            <li key={i} className="flex items-center gap-2">
              {i > 0 && <ChevronRight size={14} className="text-slate-300" />}
              {item.href ? (
                <a href={item.href} className="hover:text-[#738CBF] transition-colors">
                  {item.label}
                </a>
              ) : (
                <span className="text-slate-800 font-semibold">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumbs;
