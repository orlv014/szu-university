
import React, { useState, useMemo, useEffect } from 'react';
import { Search, Filter, ArrowRight, Clock, Wallet, Star, Layers, Info, RotateCcw, ChevronDown } from 'lucide-react';
import { PROGRAMS_DATA } from '../constants';
import { EducationLevel, StudyFormat } from '../types';

const INITIAL_VISIBLE = 12;
const LOAD_MORE_STEP = 12;

interface ProgramCatalogProps {
  initialFilterLevel?: EducationLevel | null;
  onInitialFilterApplied?: () => void;
}

const ProgramCatalog: React.FC<ProgramCatalogProps> = ({ initialFilterLevel, onInitialFilterApplied }) => {
  const [filterLevel, setFilterLevel] = useState<EducationLevel | 'All'>('All');
  const [filterFormat, setFilterFormat] = useState<StudyFormat | 'All'>('All');
  const [maxPrice, setMaxPrice] = useState<number>(300000);
  const [minScore, setMinScore] = useState<number>(0);
  const [maxDuration, setMaxDuration] = useState<number>(6);
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

  const filteredPrograms = useMemo(() => {
    return PROGRAMS_DATA.filter(p => {
      const matchLevel = filterLevel === 'All' || p.level === filterLevel;
      const matchFormat = filterFormat === 'All' || p.format.includes(filterFormat);
      const matchPrice = p.price <= maxPrice;
      const matchScore = p.passingScore >= minScore;
      const matchDuration = p.durationValue <= maxDuration;
      const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.code.toLowerCase().includes(searchQuery.toLowerCase());
      return matchLevel && matchFormat && matchPrice && matchScore && matchDuration && matchSearch;
    });
  }, [filterLevel, filterFormat, maxPrice, minScore, maxDuration, searchQuery]);

  const programsToShow = useMemo(() => filteredPrograms.slice(0, visibleCount), [filteredPrograms, visibleCount]);
  const hasMore = visibleCount < filteredPrograms.length;
  const remainingCount = filteredPrograms.length - visibleCount;

  useEffect(() => {
    setVisibleCount(INITIAL_VISIBLE);
  }, [filterLevel, filterFormat, maxPrice, minScore, maxDuration, searchQuery]);

  const resetFilters = () => {
    setFilterLevel('All');
    setFilterFormat('All');
    setMaxPrice(300000);
    setMinScore(0);
    setMaxDuration(6);
    setSearchQuery('');
  };

  useEffect(() => {
    if (initialFilterLevel != null) {
      setFilterLevel(initialFilterLevel);
      onInitialFilterApplied?.();
    }
  }, [initialFilterLevel]);

  return (
    <section id="programs" className="pt-10 pb-24 bg-[#F8FAFC]">
      <div className="container mx-auto px-6 max-w-[1400px]">
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-slate-100 text-[10px] font-black uppercase tracking-widest text-[#738CBF] mb-5 shadow-sm">
            <Filter size={12} />
            Каталог направлений
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-[#0F172A] tracking-tighter mb-4">
            Программы обучения
          </h2>
          <p className="text-xl text-slate-500 font-medium max-w-2xl">
            Найдите своё призвание среди {PROGRAMS_DATA.length} актуальных направлений 2026 года.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* SIDEBAR FILTERS — независимая прокрутка от карточек */}
          <aside className="w-full lg:w-80 shrink-0 lg:sticky lg:top-32 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto lg:overflow-x-hidden [overscroll-behavior:contain] pr-1 -mr-1">
            <div className="bg-white/70 backdrop-blur-xl rounded-[2.5rem] p-8 border border-white shadow-xl shadow-slate-200/50 min-h-0">
              <div className="flex items-center justify-between mb-10 border-b border-slate-100 pb-4">
                <span className="text-sm font-black text-[#0F172A] uppercase tracking-widest">Фильтры</span>
                <button 
                  onClick={resetFilters}
                  className="p-2 text-[#738CBF] hover:bg-[#738CBF]/10 rounded-full transition-colors"
                  title="Сбросить все"
                >
                  <RotateCcw size={16} />
                </button>
              </div>

              {/* Price Filter */}
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-400">
                  <span className="flex items-center gap-2"><Wallet size={14} /> Стоимость до</span>
                  <span className="text-[#738CBF]">{maxPrice.toLocaleString()} ₽</span>
                </div>
                <input 
                  type="range" min="40000" max="300000" step="5000" 
                  value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#738CBF]"
                />
              </div>

              {/* Passing Score Filter */}
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-400">
                  <span className="flex items-center gap-2"><Star size={14} /> Мин. балл</span>
                  <span className="text-[#738CBF]">{minScore}</span>
                </div>
                <input 
                  type="range" min="0" max="300" step="5" 
                  value={minScore} onChange={(e) => setMinScore(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#738CBF]"
                />
              </div>

              {/* Duration Filter */}
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-400">
                  <span className="flex items-center gap-2"><Clock size={14} /> Срок до</span>
                  <span className="text-[#738CBF]">{maxDuration} лет</span>
                </div>
                <input 
                  type="range" min="1" max="6" step="1" 
                  value={maxDuration} onChange={(e) => setMaxDuration(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#738CBF]"
                />
              </div>

              {/* Format Filter */}
              <div className="space-y-4 mb-8">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                  <Layers size={14} /> Формат обучения
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {['All', ...Object.values(StudyFormat)].map(f => (
                    <button
                      key={f}
                      onClick={() => setFilterFormat(f as any)}
                      className={`text-left px-4 py-3 rounded-xl text-xs font-bold transition-all border ${filterFormat === f ? 'bg-[#0F172A] text-white border-[#0F172A]' : 'bg-white text-slate-600 border-slate-100 hover:border-[#738CBF]/50'}`}
                    >
                      {f === 'All' ? 'Любой формат' : f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Level Filter */}
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                  <Info size={14} /> Уровень образования
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {['All', ...Object.values(EducationLevel)].map(lvl => (
                    <button
                      key={lvl}
                      onClick={() => setFilterLevel(lvl as any)}
                      className={`text-left px-4 py-3 rounded-xl text-xs font-bold transition-all border ${filterLevel === lvl ? 'bg-[#0F172A] text-white border-[#0F172A]' : 'bg-white text-slate-600 border-slate-100 hover:border-[#738CBF]/50'}`}
                    >
                      {lvl === 'All' ? 'Все уровни' : lvl}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* MAIN RESULTS AREA */}
          <div className="flex-1 space-y-10">
            {/* SEARCH BOX */}
            <div className="relative group">
              <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-slate-300 transition-colors group-focus-within:text-[#738CBF]" size={24} />
              <input 
                type="text" 
                placeholder="Поиск по названию, коду или специализации..." 
                className="w-full pl-20 pr-10 py-6 rounded-[2.5rem] bg-white border border-slate-100 focus:outline-none focus:ring-4 focus:ring-[#738CBF]/10 font-bold transition-all text-xl shadow-xl shadow-slate-200/50 placeholder:text-slate-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* CARDS GRID */}
            <div className="grid md:grid-cols-1 xl:grid-cols-2 gap-5">
              {programsToShow.map((program) => (
                <div 
                  key={program.id} 
                  className="group relative flex flex-col bg-white border border-slate-200/90 rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.08)] hover:shadow-xl hover:-translate-y-1 hover:border-slate-200 transition-all cursor-pointer overflow-hidden p-5"
                  onClick={() => window.location.hash = `#/program/${program.id}`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex flex-wrap gap-1.5">
                      <span className="px-3 py-1 bg-[#F1F5F9] text-[#738CBF] rounded-lg text-[9px] font-black uppercase tracking-widest group-hover:bg-[#738CBF] group-hover:text-white transition-colors">
                        {program.level}
                      </span>
                      {program.tags?.map((tag) => (
                        <span key={tag} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-[9px] font-black uppercase tracking-widest border border-slate-200">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                      <Star size={12} className="text-amber-400" />
                      {program.passingScore > 0 ? program.passingScore : '-'} балл
                    </div>
                  </div>

                  <div className="space-y-2 mb-4 flex-grow">
                    <div className="text-[9px] font-black text-slate-300 tracking-widest uppercase">{program.code}</div>
                    <h3 className="text-lg font-black text-[#0F172A] group-hover:text-[#738CBF] transition-colors leading-[1.15] tracking-tighter">
                      {program.name}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium italic leading-snug">
                      {program.specialization}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {program.format.map(f => (
                      <span key={f} className="bg-slate-50 px-2.5 py-1 rounded-md text-[8px] font-black text-slate-400 uppercase tracking-widest border border-slate-100 group-hover:bg-white transition-colors">
                        {f}
                      </span>
                    ))}
                    <span className="bg-slate-50 px-2.5 py-1 rounded-md text-[8px] font-black text-[#738CBF] uppercase tracking-widest border border-[#738CBF]/10">
                      {program.duration}
                    </span>
                  </div>

                  <div className="mt-auto pt-4 border-t border-slate-100/50 flex items-center justify-between">
                    <div className="space-y-0.5">
                      <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest">Стоимость обучения</p>
                      <p className="text-lg font-black text-[#0F172A] tracking-tighter">
                        {program.price.toLocaleString()} ₽ 
                      </p>
                    </div>
                    <button className="w-11 h-11 bg-[#0F172A] text-white rounded-full flex items-center justify-center transition-all group-hover:bg-[#738CBF] group-hover:scale-105 shadow-lg">
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {hasMore && filteredPrograms.length > 0 && (
              <div className="flex flex-col items-center gap-3 pt-4">
                <p className="text-sm text-slate-500 font-medium">
                  Показано {programsToShow.length} из {filteredPrograms.length}
                </p>
                <button
                  type="button"
                  onClick={() => setVisibleCount(prev => prev + LOAD_MORE_STEP)}
                  className="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-700 hover:bg-[#738CBF] hover:text-white hover:border-[#738CBF] px-8 py-4 rounded-2xl font-bold text-sm uppercase tracking-widest transition-all shadow-[0_4px_20px_-4px_rgba(0,0,0,0.08)]"
                >
                  Показать ещё {Math.min(LOAD_MORE_STEP, remainingCount)}
                  <ChevronDown size={18} />
                </button>
              </div>
            )}

            {filteredPrograms.length === 0 && (
              <div className="text-center py-40 bg-white/40 backdrop-blur-xl rounded-[4rem] border-2 border-dashed border-slate-200">
                <Info size={48} className="mx-auto text-slate-200 mb-6" />
                <p className="text-slate-400 font-black italic text-xl">Ничего не найдено</p>
                <button 
                  onClick={resetFilters}
                  className="mt-6 bg-[#0F172A] text-white px-10 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:bg-[#738CBF] transition-all"
                >
                  Сбросить всё
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgramCatalog;
