
import React from 'react';
import { ArrowRight, Zap, CheckCircle2, GraduationCap, CalendarDays } from 'lucide-react';
import { useApplyModal } from '../context/ApplyModalContext';

const Hero: React.FC = () => {
  const openApplyModal = useApplyModal();
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden bg-slate-950">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80&w=2000" 
          alt="Campus" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-950/70 to-transparent"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div className="space-y-10 lg:space-y-12 max-w-3xl">
          <div className="inline-flex items-center gap-2.5 bg-[#738CBF]/20 text-[#738CBF] border border-[#738CBF]/30 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest animate-pulse">
            <Zap size={14} />
            Приёмная кампания 2026 открыта
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black text-white leading-[1.1] tracking-tight">
            Северо-Западный <br/><span className="text-[#738CBF]">университет</span>
          </h1>
          
          <p className="text-lg md:text-2xl text-slate-300 font-light leading-relaxed">
            Госдиплом под твой график: <span className="text-white font-semibold underline decoration-[#738CBF] decoration-4 underline-offset-[8px]">28 лет</span> опыта, 54 направления, стоимость от 46 000 ₽/год.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
            <div className="flex items-center gap-3 text-slate-200 bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-sm hover:bg-white/10 transition-colors cursor-pointer">
              <CheckCircle2 className="text-[#738CBF]" size={20} />
              <span className="text-sm font-semibold tracking-wide">Госдиплом</span>
            </div>
            <div className="flex items-center gap-3 text-slate-200 bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-sm hover:bg-white/10 transition-colors cursor-pointer">
              <CheckCircle2 className="text-[#738CBF]" size={20} />
              <span className="text-sm font-semibold tracking-wide">Рассрочка 0%</span>
            </div>
            {/* Clickable License Block — открывает PDF лицензии (файл в public/Лицензия.pdf) */}
            <div 
              className="flex items-center gap-3 text-slate-200 bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-sm hover:bg-[#738CBF]/20 hover:border-[#738CBF]/40 transition-all cursor-pointer group"
              onClick={() => window.open('/Лицензия.pdf', '_blank')}
            >
              <CheckCircle2 className="text-[#738CBF] group-hover:scale-110 transition-transform" size={20} />
              <span className="text-sm font-semibold tracking-wide">Лицензия</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 pt-4 px-1 sm:px-0">
            <button 
              className="w-full sm:w-auto bg-[#738CBF] hover:bg-[#5A71A1] text-white px-10 py-5 rounded-full font-bold text-lg transition-all flex items-center justify-center gap-3 shadow-2xl shadow-[#738CBF]/40 hover:scale-105 active:scale-95"
              onClick={() => document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Подобрать программу
              <ArrowRight size={22} />
            </button>
            <button 
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border border-white/20 px-10 py-5 rounded-full font-bold text-lg transition-all backdrop-blur-md active:scale-95"
              onClick={openApplyModal}
            >
              Хочу поступить
            </button>
          </div>
        </div>

        {/* Float Card Mockup */}
        <div className="hidden lg:block relative">
           <div className="bg-white/10 border border-white/20 p-10 rounded-[2.5rem] backdrop-blur-2xl space-y-8 max-w-md mx-auto relative z-10 shadow-3xl">
              <div className="flex items-center justify-end gap-4">
                <div className="text-right">
                  <div className="text-[10px] text-slate-400 uppercase tracking-[0.2em] font-black">Основан в</div>
                  <div className="text-3xl font-black text-white">1997 году</div>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-[#738CBF] flex items-center justify-center text-white shadow-xl shadow-[#738CBF]/30 shrink-0">
                  <GraduationCap size={28} />
                </div>
              </div>
              
              {/* Day of Open Doors info block */}
              <div className="p-5 bg-[#738CBF]/10 rounded-2xl border border-[#738CBF]/20 flex items-center gap-4">
                <div className="bg-[#738CBF] p-2.5 rounded-xl text-white">
                  <CalendarDays size={20} />
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">День открытых дверей</div>
                  <div className="text-white font-bold text-sm">25 марта, 18:00 (Онлайн)</div>
                </div>
              </div>

              <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
                <p className="text-sm text-slate-300 italic leading-relaxed">"СЗУ помог мне совмещать работу в IT и получение высшего образования. Гибкий график — это спасение!"</p>
                <div className="mt-5 flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-slate-500 border-2 border-[#738CBF] overflow-hidden">
                     <img src="https://picsum.photos/100" alt="Student" />
                   </div>
                   <div>
                     <div className="text-xs font-black text-white">Александр И.</div>
                     <div className="text-[10px] text-slate-400 font-bold uppercase">4 курс, IT-Менеджмент</div>
                   </div>
                </div>
              </div>
           </div>
           {/* Decorative elements */}
           <div className="absolute -top-16 -right-16 w-64 h-64 bg-[#738CBF]/30 rounded-full blur-[120px]"></div>
           <div className="absolute -bottom-16 -left-16 w-80 h-80 bg-blue-600/10 rounded-full blur-[120px]"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
