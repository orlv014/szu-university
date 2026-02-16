
import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import { ADVANTAGES } from '../constants';

const LICENSE_PDF = '/Лицензия.pdf';
const ACCREDITATION_PDF = '/Аккредитация.pdf';

const DocumentModal: React.FC<{ isOpen: boolean; onClose: () => void; title: string; type: 'license' | 'accreditation' }> = ({ isOpen, onClose, title, type }) => {
  if (!isOpen) return null;

  const pdfUrl = type === 'license' ? LICENSE_PDF : ACCREDITATION_PDF;

  const content = type === 'license' ? (
    <div className="flex flex-col h-full min-h-0">
      <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-50 flex-1 min-h-[78vh]">
        <iframe src={`${pdfUrl}#view=FitH`} title="Лицензия" className="w-full h-full min-h-[78vh]" />
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4 mt-4 shrink-0">
        <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[#738CBF] font-bold hover:underline">
          <Icons.ExternalLink size={18} />
          Открыть PDF в новой вкладке (удобнее для чтения)
        </a>
        <div className="flex gap-4 text-sm">
          <span className="p-3 bg-slate-50 rounded-xl"><span className="text-slate-400 font-bold">Статус:</span> Действующая</span>
          <span className="p-3 bg-slate-50 rounded-xl"><span className="text-slate-400 font-bold">Рег. №</span> Л035-00115</span>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex flex-col h-full min-h-0">
      <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-50 flex-1 min-h-[78vh]">
        <iframe src={`${pdfUrl}#view=FitH`} title="Свидетельство об аккредитации" className="w-full h-full min-h-[78vh]" />
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4 mt-4 shrink-0">
        <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[#738CBF] font-bold hover:underline">
          <Icons.ExternalLink size={18} />
          Открыть PDF в новой вкладке (удобнее для чтения)
        </a>
        <div className="flex gap-4 text-sm">
          <span className="p-3 bg-slate-50 rounded-xl"><span className="text-slate-400 font-bold">Рег. №</span> А007-00115</span>
          <span className="p-3 bg-slate-50 rounded-xl"><span className="text-slate-400 font-bold">Дата:</span> 16.03.2023</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4">
      <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-md" onClick={onClose} aria-hidden />
      <div className="relative bg-white rounded-2xl shadow-2xl w-[95vw] max-w-6xl h-[90vh] max-h-[90vh] flex flex-col overflow-hidden border border-slate-200 animate-in zoom-in duration-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 shrink-0">
          <h2 className="text-xl font-black text-[#0F172A]">{title}</h2>
          <button onClick={onClose} className="p-2.5 hover:bg-slate-100 rounded-full transition-all" aria-label="Закрыть">
            <Icons.X size={24} />
          </button>
        </div>
        <div className="p-4 sm:p-6 overflow-hidden min-h-0 flex-1 flex flex-col">
          {content}
        </div>
      </div>
    </div>
  );
};

const AdvantageCard: React.FC<{ advantage: typeof ADVANTAGES[0]; index: number }> = ({ advantage, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [modalType, setModalType] = useState<'license' | 'accreditation' | null>(null);
  const IconComponent = (Icons as any)[advantage.icon];

  const handleDocumentClick = (e: React.MouseEvent, type: 'license' | 'accreditation') => {
    e.stopPropagation();
    setModalType(type);
  };

  return (
    <div 
      className={`relative p-10 flex flex-col cursor-pointer transition-all duration-700 bg-white border border-slate-200/80 rounded-[3rem] group min-h-[380px] shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)] hover:shadow-2xl hover:-translate-y-2 hover:border-slate-200 ${isExpanded ? 'shadow-2xl ring-2 ring-[#738CBF]/20 border-[#738CBF]/20' : ''}`}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="absolute top-10 right-10 text-slate-100 group-hover:text-[#738CBF]/10 font-black text-6xl transition-colors pointer-events-none">
        {String(index + 1).padStart(2, '0')}
      </div>
      
      <div className="relative z-10 flex-grow">
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-10 transition-all duration-500 shadow-xl ${isExpanded ? 'bg-[#738CBF] text-white scale-110' : 'bg-white text-[#738CBF]'}`}>
          {IconComponent && <IconComponent size={30} strokeWidth={1.5} />}
        </div>
        
        <h3 className="text-2xl font-black text-[#0F172A] mb-6 leading-[1.1] tracking-tight">
          {advantage.title}
        </h3>
        
        <p className="text-slate-500 text-base font-medium leading-relaxed mb-8">
          {advantage.title === 'Лицензия и аккредитация' ? (
            <>
              <span className="text-[#738CBF] font-black hover:underline cursor-pointer" onClick={(e) => handleDocumentClick(e, 'license')}>Лицензия</span> и <span className="text-[#738CBF] font-black hover:underline cursor-pointer" onClick={(e) => handleDocumentClick(e, 'accreditation')}>аккредитация</span> Минобрнауки РФ.
            </>
          ) : advantage.shortDesc}
        </p>

        {isExpanded && (
          <div className="animate-in fade-in slide-in-from-top-6 duration-500 mb-10 border-t border-slate-100 pt-8">
            <p className="text-slate-600 font-medium leading-relaxed text-sm">
              {advantage.fullDesc}
            </p>
            {advantage.title === 'Лицензия и аккредитация' && (
              <p className="mt-4">
                <a href="#/license" className="text-[#738CBF] font-bold hover:underline inline-flex items-center gap-2">
                  Подробная страница: документы, реестры, что означает аккредитация
                  <Icons.ArrowRight size={14} />
                </a>
              </p>
            )}
            {advantage.title === 'Преподаватели-практики' && (
              <p className="mt-4">
                <a href="https://szu.ru/teachers" target="_blank" rel="noopener noreferrer" className="text-[#738CBF] font-bold hover:underline inline-flex items-center gap-2">
                  Полный список преподавателей и руководства
                  <Icons.ExternalLink size={14} />
                </a>
              </p>
            )}
          </div>
        )}
      </div>

      <div className="mt-auto flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-[#738CBF]">
        <div className={`w-6 h-6 rounded-full border border-[#738CBF]/30 flex items-center justify-center transition-all ${isExpanded ? 'bg-[#738CBF] text-white' : ''}`}>
          <Icons.ChevronDown size={14} className={`transition-transform duration-500 ${isExpanded ? 'rotate-180' : ''}`} />
        </div>
        {isExpanded ? 'Свернуть' : 'Подробнее'}
      </div>

      <DocumentModal 
        isOpen={modalType !== null} 
        onClose={() => setModalType(null)} 
        title={modalType === 'license' ? 'Лицензия университета' : 'Свидетельство об аккредитации'}
        type={modalType || 'license'}
      />
    </div>
  );
};

const WhyUs: React.FC = () => {
  return (
    <section className="py-32 bg-[#FBFDFF] relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-slate-100 text-[10px] font-black uppercase tracking-widest text-[#738CBF] mb-6 shadow-sm">
            <Icons.Star size={12} />
            Преимущества СЗУ
          </div>
          <h2 className="text-5xl lg:text-7xl font-black text-[#0F172A] mb-8 tracking-tighter leading-tight">Ваше будущее <br/><span className="text-[#738CBF]">в надежных руках</span></h2>
          <p className="text-xl text-slate-500 font-medium">Почему абитуриенты и профессионалы выбирают СЗУ на протяжении 28 лет.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ADVANTAGES.map((adv, idx) => (
            <AdvantageCard key={idx} advantage={adv} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
