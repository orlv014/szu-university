
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Breadcrumbs, { BreadcrumbItem } from './components/Breadcrumbs';
import Hero from './components/Hero';
import WhyUs from './components/WhyUs';
import ProgramCatalog from './components/ProgramCatalog';
import Footer from './components/Footer';
import ApplyModal from './components/ApplyModal';
import ReviewsSection from './components/ReviewsSection';
import FAQSection from './components/FAQSection';
import AbiturientuPage from './pages/AbiturientuPage';
import AboutPage from './pages/AboutPage';
import ProgramDetailPage from './pages/ProgramDetailPage';
import LicenseAccreditationPage from './pages/LicenseAccreditationPage';
import { ApplyModalContext, useApplyModal } from './context/ApplyModalContext';
import { Sparkles, Calendar, BookOpen, UserCircle, MapPin, ArrowRight, GraduationCap, Phone, Mail, Building2, FileText } from 'lucide-react';
import { PROGRAMS_DATA } from './constants';
import { EducationLevel } from './types';

type LevelCard = { title: string; duration: string; Icon: React.ComponentType<{ size?: number; strokeWidth?: number }>; desc: string; level: EducationLevel };

const EducationLevelsSection: React.FC<{ onLevelClick: (level: EducationLevel) => void }> = ({ onLevelClick }) => {
  const levels: LevelCard[] = [
    { title: 'СПО (Колледж)', duration: '2–3 года', Icon: BookOpen, desc: 'Первый шаг к профессии', level: EducationLevel.SPO },
    { title: 'Бакалавриат', duration: '4 года', Icon: Sparkles, desc: 'Классическое высшее', level: EducationLevel.BACHELOR },
    { title: 'Специалитет', duration: '5–6 лет', Icon: UserCircle, desc: 'Углубленная практика', level: EducationLevel.SPECIALIST },
    { title: 'Магистратура', duration: '2 года', Icon: Sparkles, desc: 'Карьерный рост', level: EducationLevel.MASTER },
    { title: 'Аспирантура', duration: '3–4 года', Icon: GraduationCap, desc: 'Научная карьера', level: EducationLevel.POSTGRADUATE },
    { title: 'Доп. образование', duration: 'от 2 мес', Icon: Calendar, desc: 'Развитие компетенций', level: EducationLevel.DPO },
  ];

  const handleCardClick = (level: EducationLevel) => {
    onLevelClick(level);
    document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-20 md:py-24 bg-slate-950 text-white overflow-hidden relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-[#738CBF] to-transparent"></div>
      
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-6xl font-black mb-12 md:mb-16 text-center tracking-tight">Уровни образования</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {levels.map((lvl, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleCardClick(lvl.level)}
              className="group p-6 md:p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-[#738CBF]/10 hover:border-[#738CBF]/30 transition-all flex flex-col items-center text-center space-y-4 hover:-translate-y-2 duration-500 w-full"
            >
              <div className="p-4 bg-white/5 rounded-2xl text-[#738CBF] transition-all duration-500 group-hover:scale-110 group-hover:bg-[#738CBF] group-hover:text-white">
                <lvl.Icon size={28} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-black tracking-tight">{lvl.title}</h3>
              <p className="text-slate-400 text-sm font-medium leading-relaxed">{lvl.desc}</p>
              <div className="text-[#738CBF] font-black text-[10px] uppercase tracking-[0.2em]">{lvl.duration}</div>
              <span className="text-white/40 group-hover:text-[#738CBF] font-black text-[10px] uppercase tracking-widest pt-2 flex items-center gap-2">
                Смотреть
                <ArrowRight size={12} />
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

const PrepCourses: React.FC = () => {
  const openApplyModal = useApplyModal();
  const courses = [
    { title: 'Архитектура', desc: 'Композиция, академический рисунок. Подготовительный курс для вступительных экзаменов.', price: '40 000 ₽' },
    { title: 'Дизайн', desc: 'Графика, основы UI/UX и визуальных коммуникаций.', price: '40 000 ₽' },
    { title: 'Режиссура', desc: 'Сценарное мастерство, монтаж и работа в кадре.', price: '40 000 ₽' },
    { title: 'Реставрация', desc: 'Реставрация ДПИ и живописи. Основы сохранения наследия.', price: '40 000 ₽' },
  ];

  return (
    <section className="py-20 md:py-24 bg-[#F0F4F8]">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto space-y-12 md:space-y-14">
          <div className="text-center space-y-3">
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight">Подготовительные курсы</h2>
            <p className="text-lg md:text-xl text-slate-500 font-light max-w-2xl mx-auto italic">Поступи в университет мечты с уверенностью. Программы довузовской подготовки.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {courses.map((c, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.08)] border border-slate-100 flex flex-col justify-between group hover:shadow-xl transition-all duration-500">
                <div className="space-y-4">
                  <div className="flex justify-between items-start gap-4">
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">{c.title}</h3>
                    <div className="text-[#738CBF] font-black text-xl tracking-tighter shrink-0">{c.price}</div>
                  </div>
                  <p className="text-slate-500 text-base font-medium italic leading-relaxed">{c.desc}</p>
                  <div className="flex items-center gap-3 text-slate-400 text-xs font-black uppercase tracking-widest pt-2">
                    <Calendar size={16} className="text-[#738CBF]" />
                    Очная форма / Онлайн
                  </div>
                </div>
                <button
                  onClick={openApplyModal}
                  className="mt-6 w-full bg-slate-50 group-hover:bg-[#738CBF] group-hover:text-white py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] transition-all"
                >
                  Записаться на курс
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const CTABlock: React.FC = () => {
  const openApplyModal = useApplyModal();
  return (
    <section className="py-24 bg-[#738CBF] text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.06\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-80" />
      <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
        <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
          Готовы поступить в СЗУ?
        </h2>
        <p className="text-xl text-white/90 font-medium mb-10">
          Оставьте заявку — приёмная комиссия перезвонит и подберёт программу под ваши цели.
        </p>
        <button
          onClick={openApplyModal}
          className="bg-white text-[#738CBF] hover:bg-slate-100 px-12 py-5 rounded-full font-black text-lg uppercase tracking-widest shadow-xl active:scale-95 transition-all"
        >
          Подать заявку
        </button>
      </div>
    </section>
  );
};

function getBreadcrumbs(route: string): BreadcrumbItem[] {
  const main = { label: 'Главная', href: '#/' };
  if (!route || route === '#/') return [main];
  if (route === '#/programs') return [main, { label: 'Программы' }];
  if (route === '#/abiturientu') return [main, { label: 'Абитуриенту' }];
  if (route === '#/studentu') return [main, { label: 'Студенту' }];
  if (route === '#/about') return [main, { label: 'Об университете' }];
  if (route === '#/contacts') return [main, { label: 'Контакты' }];
  if (route === '#/license') return [main, { label: 'Лицензия и аккредитация' }];
  if (route.startsWith('#/program/')) {
    const id = route.replace('#/program/', '');
    const program = PROGRAMS_DATA.find((p) => p.id === id);
    const programName = program ? program.name : 'Программа';
    return [main, { label: 'Программы', href: '#/programs' }, { label: programName }];
  }
  return [main];
}

const App: React.FC = () => {
  const [route, setRoute] = useState(window.location.hash || '#/');
  const [catalogLevelFromSection, setCatalogLevelFromSection] = useState<EducationLevel | null>(null);
  const [applyModalOpen, setApplyModalOpen] = useState(false);

  useEffect(() => {
    const handleHashChange = () => setRoute(window.location.hash || '#/');
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [route]);

  useEffect(() => {
    const titles: Record<string, string> = {
      '#/': 'Северо-Западный университет | СЗУ — программы, поступление',
      '#/programs': 'Программы обучения — Северо-Западный университет',
      '#/abiturientu': 'Абитуриенту — Северо-Западный университет',
      '#/about': 'Об университете — Северо-Западный университет',
      '#/contacts': 'Контакты — Северо-Западный университет',
      '#/license': 'Лицензия и аккредитация — Северо-Западный университет',
    };
    let title = titles[route];
    if (route.startsWith('#/program/')) {
      const program = PROGRAMS_DATA.find((p) => p.id === route.replace('#/program/', ''));
      title = program ? `${program.name} — Северо-Западный университет` : titles['#/programs'];
    }
    if (title) document.title = title;
  }, [route]);

  const renderPage = () => {
    if (route.startsWith('#/program/')) {
      const id = route.replace('#/program/', '');
      return <ProgramDetailPage programId={id} />;
    }

    switch(route) {
      case '#/programs':
        return <ProgramCatalog />;
      case '#/abiturientu':
        return <AbiturientuPage />;
      case '#/about':
        return <AboutPage />;
      case '#/license':
        return <LicenseAccreditationPage />;
      case '#/contacts':
        return (
          <div className="pt-48 container mx-auto px-6 pb-32">
            <h1 className="text-6xl md:text-8xl font-black text-slate-900 mb-20 tracking-tight italic">Контакты</h1>
            <p className="text-slate-600 text-lg max-w-2xl mb-10">Санкт-Петербург, ул. Кавалергардская, д. 7, лит. А, 2-й этаж</p>
            <div className="flex flex-wrap gap-4 mb-16">
              <a href="https://szu.ru/mail-us" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#738CBF] hover:bg-[#5A71A1] text-white px-8 py-4 rounded-2xl font-bold text-sm transition-all shadow-lg shadow-[#738CBF]/20">
                Напишите нам
              </a>
              <span className="text-slate-500 text-sm self-center">Форма обращений</span>
            </div>
            <div className="grid md:grid-cols-3 gap-8 mb-20">
              <div className="p-8 bg-white shadow-sm border border-slate-100 rounded-[2rem]">
                <Building2 className="text-[#738CBF] mb-6" size={32} />
                <div className="font-black text-slate-900 uppercase tracking-widest text-xs mb-4">Приёмная комиссия</div>
                <p className="text-slate-600 text-sm mb-3">206 каб.</p>
                <a href="mailto:priem@szu.ru" className="flex items-center gap-2 text-slate-700 font-medium hover:text-[#738CBF] mb-1"><Mail size={16} /> priem@szu.ru</a>
                <a href="tel:+78125005172" className="flex items-center gap-2 text-slate-700 font-medium hover:text-[#738CBF]"><Phone size={16} /> 8 (812) 500-51-72</a>
                <p className="text-slate-500 text-sm mt-4">Пн–Пт 10:00–19:00, обед 14:00–15:00</p>
              </div>
              <div className="p-8 bg-white shadow-sm border border-slate-100 rounded-[2rem]">
                <Building2 className="text-[#738CBF] mb-6" size={32} />
                <div className="font-black text-slate-900 uppercase tracking-widest text-xs mb-4">Учебно-методический отдел</div>
                <p className="text-slate-600 text-sm mb-3">207 каб.</p>
                <a href="mailto:umo@szu.ru" className="flex items-center gap-2 text-slate-700 font-medium hover:text-[#738CBF] mb-1"><Mail size={16} /> umo@szu.ru</a>
                <a href="tel:+78125006063" className="flex items-center gap-2 text-slate-700 font-medium hover:text-[#738CBF]"><Phone size={16} /> 8 (812) 500-60-63</a>
                <p className="text-slate-500 text-sm mt-4">Пн–Пт 10:00–19:00, обед 14:00–15:00</p>
              </div>
              <div className="p-8 bg-white shadow-sm border border-slate-100 rounded-[2rem]">
                <Building2 className="text-[#738CBF] mb-6" size={32} />
                <div className="font-black text-slate-900 uppercase tracking-widest text-xs mb-4">Бухгалтерия</div>
                <p className="text-slate-600 text-sm mb-3">209 каб.</p>
                <a href="mailto:buh@szu.ru" className="flex items-center gap-2 text-slate-700 font-medium hover:text-[#738CBF] mb-1"><Mail size={16} /> buh@szu.ru</a>
                <a href="tel:+78125006064" className="flex items-center gap-2 text-slate-700 font-medium hover:text-[#738CBF]"><Phone size={16} /> 8 (812) 500-60-64</a>
                <p className="text-slate-500 text-sm mt-4">Пн–Пт 10:00–19:00, обед 14:00–15:00</p>
              </div>
            </div>
            <div className="p-8 md:p-10 bg-slate-50 rounded-[2rem] border border-slate-100">
              <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3"><FileText className="text-[#738CBF]" size={28} /> Реквизиты для перечислений</h2>
              <p className="text-slate-600 text-sm mb-2"><strong>Получатель:</strong> АНО ВО «СЗУ»</p>
              <p className="text-slate-600 text-sm mb-2"><strong>Юридический адрес:</strong> 191015, Санкт-Петербург, ул. Кавалергардская, д. 7, лит. А, этаж 2, помещ. 8-Н, часть пом. №16</p>
              <p className="text-slate-600 text-sm mb-2"><strong>ОГРН:</strong> 1257800070879</p>
              <p className="text-slate-600 text-sm mb-2"><strong>ИНН:</strong> 7842230826 &emsp; <strong>КПП:</strong> 784201001</p>
              <p className="text-slate-600 text-sm mb-2"><strong>Счёт:</strong> 40703810928692000003</p>
              <p className="text-slate-600 text-sm mb-2"><strong>Банк:</strong> Филиал «Центральный» Банка ВТБ (ПАО)</p>
              <p className="text-slate-600 text-sm"><strong>Кор. счёт:</strong> 30101810145250000411 &emsp; <strong>БИК:</strong> 044525411</p>
            </div>
            <p className="text-slate-500 text-sm mt-8">Лицензия № Л035-00115-77/00617221 от 21.02.2023 · Аккредитация № А007-00115-78/01201018 от 16.03.2023</p>
          </div>
        );
      default:
        return (
          <>
            <Hero />
            <WhyUs />
            <EducationLevelsSection onLevelClick={(level) => setCatalogLevelFromSection(level)} />
            <ProgramCatalog
              initialFilterLevel={catalogLevelFromSection}
              onInitialFilterApplied={() => setCatalogLevelFromSection(null)}
            />
            <PrepCourses />
            <CTABlock />
            <ReviewsSection />
            <FAQSection />
          </>
        );
    }
  };

  return (
    <ApplyModalContext.Provider value={{ openApplyModal: () => setApplyModalOpen(true) }}>
      <div className="min-h-screen flex flex-col scroll-smooth">
        <Header forceOpaque={route !== '#/'} currentRoute={route} />
        <main className="flex-1">
          {route !== '#/' && (
            <div className="pt-20">
              <Breadcrumbs items={getBreadcrumbs(route)} />
            </div>
          )}
          {renderPage()}
        </main>
        <Footer />
        <ApplyModal isOpen={applyModalOpen} onClose={() => setApplyModalOpen(false)} />
      </div>
    </ApplyModalContext.Provider>
  );
};

export default App;
