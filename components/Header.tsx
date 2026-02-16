
import React, { useState, useEffect } from 'react';
import { Menu, X, User, Eye, ChevronDown } from 'lucide-react';
import { useApplyModal } from '../context/ApplyModalContext';
import Logo from './Logo';

const Header: React.FC<{ forceOpaque?: boolean; currentRoute?: string }> = ({ forceOpaque = false, currentRoute = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const openApplyModal = useApplyModal();
  const showSolid = isScrolled || forceOpaque;
  const route = currentRoute || (typeof window !== 'undefined' ? window.location.hash || '#/' : '#/');
  const isActive = (path: string) => path === route || (path === '#/programs' && route.startsWith('#/program/'));

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        showSolid ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between gap-6">
        {/* Логотип СЗУ — по клику на главную */}
        <div
          className="flex items-center shrink-0 group cursor-pointer transition-transform hover:scale-105"
          onClick={() => { window.location.hash = '#/'; window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        >
          <Logo
            light={!showSolid}
            className={showSolid ? '' : ''}
            height={38}
          />
        </div>

        {/* Desktop Navigation - Simplified */}
        <nav className={`hidden lg:flex items-center gap-10 font-medium text-sm uppercase tracking-wider ${showSolid ? 'text-slate-600' : 'text-slate-600 md:text-white/90'}`}>
          <a href="#/programs" className={`hover:text-[#738CBF] transition-colors pb-1 border-b-2 border-transparent ${isActive('#/programs') ? 'text-[#738CBF] font-bold border-[#738CBF]' : ''}`}>Программы</a>
          <a href="#/abiturientu" className={`hover:text-[#738CBF] transition-colors pb-1 border-b-2 border-transparent ${isActive('#/abiturientu') ? 'text-[#738CBF] font-bold border-[#738CBF]' : ''}`}>Абитуриенту</a>
          <div className="relative group">
            <button className={`flex items-center gap-1 hover:text-[#738CBF] transition-colors uppercase tracking-wider pb-1 border-b-2 border-transparent ${isActive('#/about') ? 'text-[#738CBF] font-bold border-[#738CBF]' : ''}`}>
              Об университете
              <ChevronDown size={16} className="opacity-70" />
            </button>
            <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="bg-white rounded-2xl shadow-xl border border-slate-100 py-2 min-w-[260px]">
                <a href="#/about" className={`block px-5 py-3 hover:bg-[#738CBF]/10 hover:text-[#738CBF] transition-colors text-left font-medium uppercase tracking-wider text-xs ${isActive('#/about') ? 'text-[#738CBF] bg-[#738CBF]/5' : 'text-slate-700'}`}>Об университете</a>
                <a href="https://szu.ru/teachers" target="_blank" rel="noopener noreferrer" className="block px-5 py-3 text-slate-700 hover:bg-[#738CBF]/10 hover:text-[#738CBF] transition-colors text-left font-medium uppercase tracking-wider text-xs">Преподаватели</a>
                <a href="https://szu.ru/sveden/common/" target="_blank" rel="noopener noreferrer" className="block px-5 py-3 text-slate-700 hover:bg-[#738CBF]/10 hover:text-[#738CBF] transition-colors text-left font-medium uppercase tracking-wider text-xs">Сведения об образовательной организации</a>
              </div>
            </div>
          </div>
          <a href="#/contacts" className={`hover:text-[#738CBF] transition-colors pb-1 border-b-2 border-transparent ${isActive('#/contacts') ? 'text-[#738CBF] font-bold border-[#738CBF]' : ''}`}>Контакты</a>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-5">
          <div className="hidden sm:flex items-center gap-4">
            <button title="Версия для слабовидящих" className={`p-2.5 rounded-full border transition-all ${showSolid ? 'border-slate-200 text-slate-600' : 'border-white/30 text-white/80'} hover:bg-[#738CBF] hover:text-white hover:border-[#738CBF]`}>
              <Eye size={18} />
            </button>
            <a href="http://92.255.101.238/moodle/login/index.php" target="_blank" rel="noopener noreferrer" title="Вход в личный кабинет" aria-label="Вход в личный кабинет" className={`p-2.5 rounded-full border transition-all ${showSolid ? 'border-slate-200 text-slate-600' : 'border-white/30 text-white/80'} hover:bg-[#738CBF] hover:text-white hover:border-[#738CBF]`}>
              <User size={18} />
            </a>
          </div>
          <button 
            className="hidden md:flex items-center gap-2 bg-[#738CBF] hover:bg-[#5A71A1] text-white px-8 py-3.5 rounded-full font-bold text-sm tracking-wide transition-all shadow-xl shadow-[#738CBF]/20 active:scale-95"
            onClick={openApplyModal}
          >
            Хочу поступить
          </button>
          
          {/* Mobile Menu Toggle */}
          <button className={`lg:hidden p-2 ${showSolid ? 'text-slate-900' : 'text-slate-900 md:text-white'}`} onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-2xl border-t border-slate-100 p-8 flex flex-col gap-6 animate-in slide-in-from-top duration-500">
          <a href="#/programs" className={`text-xl font-bold uppercase tracking-wider ${isActive('#/programs') ? 'text-[#738CBF]' : 'text-slate-800'}`} onClick={() => setIsOpen(false)}>Программы</a>
          <a href="#/abiturientu" className={`text-xl font-bold uppercase tracking-wider ${isActive('#/abiturientu') ? 'text-[#738CBF]' : 'text-slate-800'}`} onClick={() => setIsOpen(false)}>Абитуриенту</a>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-black uppercase tracking-wider text-slate-400 pt-2">Об университете</span>
            <a href="#/about" className={`text-lg font-bold pl-2 uppercase tracking-wider ${isActive('#/about') ? 'text-[#738CBF]' : 'text-slate-800'}`} onClick={() => setIsOpen(false)}>Об университете</a>
            <a href="https://szu.ru/teachers" target="_blank" rel="noopener noreferrer" className="text-lg font-bold text-slate-800 pl-2 uppercase tracking-wider" onClick={() => setIsOpen(false)}>Преподаватели</a>
            <a href="https://szu.ru/sveden/common/" target="_blank" rel="noopener noreferrer" className="text-lg font-bold text-slate-800 pl-2 uppercase tracking-wider" onClick={() => setIsOpen(false)}>Сведения об образовательной организации</a>
          </div>
          <a href="#/contacts" className={`text-xl font-bold uppercase tracking-wider ${isActive('#/contacts') ? 'text-[#738CBF]' : 'text-slate-800'}`} onClick={() => setIsOpen(false)}>Контакты</a>
          <hr className="my-2 border-slate-100" />
          <div className="flex flex-col gap-4">
             <a href="http://92.255.101.238/moodle/login/index.php" target="_blank" rel="noopener noreferrer" className="w-full bg-slate-50 text-[#738CBF] py-4 rounded-2xl font-bold text-center block" onClick={() => setIsOpen(false)}>Личный кабинет</a>
             <button className="w-full bg-[#738CBF] text-white py-4 rounded-2xl font-bold" onClick={() => { setIsOpen(false); openApplyModal(); }}>Хочу поступить</button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
