import React, { useState, useMemo } from 'react';
import { FileText, Search, ExternalLink, ChevronRight, BookOpen, Calendar, Wallet, GraduationCap, MapPin, RotateCcw } from 'lucide-react';
import OpenDayModal from '../components/OpenDayModal';
import PrepCourseModal from '../components/PrepCourseModal';
import { useApplyModal } from '../context/ApplyModalContext';
import { PROGRAMS_DATA } from '../constants';
import { EducationLevel, StudyFormat } from '../types';

const ADMISSION_YEAR = 2026;
const RULES_PDF_URL = 'https://szu.ru/wp-content/uploads/2024/02/pravila-priema-2024.pdf';
const SZU_ABITUR_URL = 'https://szu.ru/abitur/';
const SZU_ABITUR_LINKS = [
  { label: 'Бакалавриат, специалитет', href: 'https://szu.ru/abitur/bachelor' },
  { label: 'Магистратура', href: 'https://szu.ru/abitur/magistr' },
  { label: 'Аспирантура', href: 'https://szu.ru/abitur/aspirant' },
  { label: 'СПО', href: 'https://szu.ru/abitur/spo_kvalif' },
  { label: 'Вступительные испытания', href: 'https://szu.ru/abitur/bachelor/#abitur_vikonPriemExam' },
] as const;

const PREP_COURSES = [
  { id: 'arh', name: 'Архитектура', disciplines: 'Композиция, академический рисунок, черчение', schedule: 'Сентябрь — май, 2 раза в неделю', cost: '40 000 ₽', programId: 'dpo-podg-arh' },
  { id: 'diz', name: 'Дизайн', disciplines: 'Графика, основы UI/UX, визуальные коммуникации', schedule: 'Сентябрь — май, 2 раза в неделю', cost: '35 000 ₽', programId: 'dpo-podg-diz' },
  { id: 'rezh', name: 'Режиссура', disciplines: 'Сценарное мастерство, монтаж, работа в кадре', schedule: 'Октябрь — апрель, 2 раза в неделю', cost: '45 000 ₽', programId: 'dpo-podg-rezh' },
  { id: 'rest', name: 'Реставрация', disciplines: 'Реставрация ДПИ и живописи, основы сохранения наследия', schedule: 'Сентябрь — май, 2 раза в неделю', cost: '40 000 ₽', programId: null },
  { id: 'ris', name: 'Рисунок, живопись и композиция', disciplines: 'Академический рисунок, живопись, композиция', schedule: 'Сентябрь — май, 2 раза в неделю', cost: '25 000 ₽', programId: 'dpo-podg-ris' },
];

const HOW_TO_APPLY_STEPS = [
  { num: 1, title: 'Выберите программу и форму обучения', desc: 'Ознакомьтесь с каталогом программ, определите направление и формат: очно, очно-заочно или заочно.' },
  { num: 2, title: 'Подайте документы в приёмную комиссию', desc: 'Паспорт, документ об образовании, фотографии. Адрес: ул. Кавалергардская, 7. Пн–Пт 10:00–18:00.' },
  { num: 3, title: 'Пройдите вступительные испытания или предоставьте ЕГЭ', desc: 'По выбранному направлению — ЕГЭ или внутренние экзамены. Творческие направления — дополнительные испытания.' },
  { num: 4, title: 'Заключите договор и внесите оплату', desc: 'После зачисления — подписание договора, рассрочка на 10 месяцев без переплат.' },
];

const AbiturientuPage: React.FC = () => {
  const [openDayModalOpen, setOpenDayModalOpen] = useState(false);
  const [prepModalOpen, setPrepModalOpen] = useState(false);
  const [prepCourseName, setPrepCourseName] = useState('');
  const openApplyModal = useApplyModal();

  const [filterLevel, setFilterLevel] = useState<EducationLevel | 'All'>('All');
  const [filterFormat, setFilterFormat] = useState<StudyFormat | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const costRows = useMemo(() => {
    const rows: { program: string; code: string; level: string; format: string; costPerSemester: number; passingScore: number }[] = [];
    PROGRAMS_DATA.forEach((p) => {
      if (p.level === EducationLevel.DPO || p.level === EducationLevel.POSTGRADUATE) return;
      const semesterCost = Math.round(p.price / 2);
      if (p.format.length) {
        p.format.forEach((f) => {
          rows.push({ program: p.name, code: p.code, level: p.level, format: f, costPerSemester: semesterCost, passingScore: p.passingScore });
        });
      } else {
        rows.push({ program: p.name, code: p.code, level: p.level, format: p.format[0] || '—', costPerSemester: semesterCost, passingScore: p.passingScore });
      }
    });
    return rows;
  }, []);

  const filteredCostRows = useMemo(() => {
    return costRows.filter((r) => {
      const matchLevel = filterLevel === 'All' || r.level === filterLevel;
      const matchFormat = filterFormat === 'All' || r.format === filterFormat;
      const matchSearch = r.program.toLowerCase().includes(searchQuery.toLowerCase()) || r.code.toLowerCase().includes(searchQuery.toLowerCase());
      return matchLevel && matchFormat && matchSearch;
    });
  }, [costRows, filterLevel, filterFormat, searchQuery]);

  const openPrepModal = (name: string) => {
    setPrepCourseName(name);
    setPrepModalOpen(true);
  };

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950 text-white pt-24 pb-20 md:pt-28 md:pb-24">
        <div className="absolute inset-0 bg-[linear-gradient(160deg,transparent_0%,#738CBF/8%_50%,transparent_100%)] pointer-events-none" aria-hidden />
        <div className="absolute top-0 right-0 w-[min(70vw,480px)] h-[min(70vw,480px)] rounded-full bg-[#738CBF]/15 blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" aria-hidden />
        <div className="absolute bottom-0 left-0 w-[min(50vw,320px)] h-[min(50vw,320px)] rounded-full bg-[#738CBF]/[0.08] blur-[80px] translate-y-1/2 -translate-x-1/4 pointer-events-none" aria-hidden />
        <div className="container relative mx-auto px-6 max-w-[1200px]">
          <div className="max-w-3xl">
            <p className="text-[#a5b8e8] text-sm font-bold uppercase tracking-widest mb-4">Приёмная кампания {ADMISSION_YEAR}</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] mb-5">
              Абитуриенту
            </h1>
            <p className="text-lg md:text-xl text-slate-300 font-medium mb-10">
              Всё о поступлении в СЗУ: правила, документы, стоимость и подготовительные курсы.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setOpenDayModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 bg-[#738CBF] hover:bg-[#5e76a8] text-white px-8 py-4 rounded-full font-black text-sm uppercase tracking-widest shadow-xl shadow-[#738CBF]/30 transition-all active:scale-[0.98]"
              >
                День открытых дверей
                <Calendar size={18} />
              </button>
              <button
                onClick={openApplyModal}
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-4 rounded-full font-bold text-sm transition-all"
              >
                Оставить заявку
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Навигация по разделам */}
      <nav className="sticky top-20 z-10 border-b border-slate-200 bg-white/95 backdrop-blur-md shadow-sm" aria-label="Разделы страницы">
        <div className="container mx-auto px-6 max-w-[1200px]">
          <div className="flex gap-1 overflow-x-auto py-3 scroll-hide">
            {[
              { id: 'how-to-apply', label: 'Как поступить' },
              { id: 'documents', label: 'Документы' },
              { id: 'cost', label: 'Стоимость' },
              { id: 'prep-courses', label: 'Подг. курсы' },
              { id: 'contact', label: 'Контакты' },
            ].map(({ id, label }) => (
              <button
                key={id}
                type="button"
                onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                className="shrink-0 px-4 py-2 rounded-xl text-sm font-bold text-slate-600 hover:bg-[#738CBF]/10 hover:text-[#738CBF] transition-colors cursor-pointer"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Как поступить */}
      <section id="how-to-apply" className="py-16 md:py-24 bg-[#F8FAFC] scroll-mt-28">
        <div className="container mx-auto px-6 max-w-[1200px]">
          <div className="mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#738CBF]/10 rounded-full border border-[#738CBF]/20 text-[10px] font-black uppercase tracking-widest text-[#738CBF] mb-4">
              Поступление
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-3">Как поступить</h2>
            <p className="text-slate-600 font-medium max-w-2xl">Четыре шага от выбора программы до зачисления.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {HOW_TO_APPLY_STEPS.map((s) => (
              <div
                key={s.num}
                className="group flex gap-6 p-6 md:p-8 bg-white rounded-[2rem] border border-slate-200/80 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)] hover:shadow-xl hover:border-slate-200 transition-all"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#738CBF] text-white flex items-center justify-center font-black text-xl shrink-0 group-hover:scale-105 transition-transform">
                  {s.num}
                </div>
                <div className="min-w-0">
                  <h3 className="text-xl font-black text-slate-900 mb-2">{s.title}</h3>
                  <p className="text-slate-600 text-[15px] font-medium leading-relaxed">{s.desc}</p>
                  {s.num === 1 && (
                    <a href="#/programs" className="inline-flex items-center gap-2 mt-3 text-[#738CBF] font-bold text-sm hover:underline">
                      Перейти в каталог программ
                      <ChevronRight size={16} />
                    </a>
                  )}
                  {s.num === 3 && (
                    <div className="mt-4 space-y-2">
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Вступительные испытания по уровням:</p>
                      <div className="flex flex-wrap gap-2">
                        {[
                          { label: 'Бакалавриат, специалитет', href: 'https://szu.ru/abitur/bachelor/#abitur_vikonPriemExam' },
                          { label: 'Магистратура', href: 'https://szu.ru/abitur/magistr' },
                          { label: 'Аспирантура', href: 'https://szu.ru/abitur/aspirant' },
                          { label: 'СПО (колледж)', href: 'https://szu.ru/abitur/spo_kvalif' },
                        ].map(({ label, href }) => (
                          <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-[#738CBF]/10 text-slate-700 hover:text-[#738CBF] font-bold text-sm transition-colors">
                            {label}
                            <ExternalLink size={12} />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                  {s.num === 4 && (
                    <div className="mt-4 space-y-2">
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Документы:</p>
                      <div className="flex flex-wrap gap-2">
                        <a href="https://szu.ru/abitur/files/riw/Prikaz_dogovor_090125.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-[#738CBF]/10 text-slate-700 hover:text-[#738CBF] font-bold text-sm transition-colors">
                          Формы договоров об образовании (PDF)
                          <ExternalLink size={12} />
                        </a>
                        <a href="https://szu.ru/abitur/files/zie/Pologhenie_ob_okazanii_platnyx_obrazovatelynyx_uslug_090125.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-[#738CBF]/10 text-slate-700 hover:text-[#738CBF] font-bold text-sm transition-colors">
                          Положение о платных услугах (PDF)
                          <ExternalLink size={12} />
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <button
              onClick={openApplyModal}
              className="inline-flex items-center gap-2 bg-[#738CBF] hover:bg-[#5e76a8] text-white px-8 py-4 rounded-full font-bold text-sm transition-colors"
            >
              Подать заявку на поступление
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* Правила и документы */}
      <section id="documents" className="py-16 md:py-24 bg-white scroll-mt-28">
        <div className="container mx-auto px-6 max-w-[1200px]">
          <div className="mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4">
              <FileText size={12} />
              Документы
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-3">Правила и документы</h2>
            <p className="text-slate-600 font-medium max-w-2xl">Официальная информация для абитуриентов в соответствии с законодательством РФ.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Правила приёма */}
            <div className="flex flex-col p-8 rounded-[2rem] bg-slate-50 border border-slate-100 hover:border-[#738CBF]/20 transition-colors">
              <div className="w-14 h-14 rounded-2xl bg-[#738CBF]/10 flex items-center justify-center mb-6">
                <FileText size={28} className="text-[#738CBF]" />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-2">Правила приёма {ADMISSION_YEAR}</h3>
              <p className="text-slate-600 font-medium mb-6 flex-grow">Ознакомьтесь с правилами приёма в СЗУ на текущий год набора.</p>
              <div className="flex flex-wrap gap-3">
                <a href={RULES_PDF_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#738CBF] hover:bg-[#5e76a8] text-white px-6 py-3 rounded-xl font-bold text-sm transition-colors">
                  Открыть
                  <ExternalLink size={16} />
                </a>
                <a href={RULES_PDF_URL} download className="inline-flex items-center gap-2 border-2 border-slate-200 hover:border-[#738CBF] text-slate-700 hover:text-[#738CBF] px-6 py-3 rounded-xl font-bold text-sm transition-colors">
                  Скачать PDF
                </a>
              </div>
            </div>
            {/* Официальная информация */}
            <div className="flex flex-col p-8 rounded-[2rem] bg-slate-50 border border-slate-100 hover:border-[#738CBF]/20 transition-colors">
              <div className="w-14 h-14 rounded-2xl bg-[#738CBF]/10 flex items-center justify-center mb-6">
                <GraduationCap size={28} className="text-[#738CBF]" />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-2">Раздел для абитуриентов</h3>
              <p className="text-slate-600 font-medium mb-4 text-[15px]">
                План приёма, сроки, вступительные испытания, конкурсные списки и приказы о зачислении размещаются в разделе для абитуриентов (Приказ Минобрнауки России от 27.11.2024 № 821).
              </p>
              <a
                href={SZU_ABITUR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#738CBF] font-bold text-sm hover:underline mb-6"
              >
                Перейти в раздел
                <ExternalLink size={16} />
              </a>
              <div className="flex flex-wrap gap-2 mt-auto">
                {SZU_ABITUR_LINKS.map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 hover:border-[#738CBF] hover:text-[#738CBF] text-sm font-medium transition-colors"
                  >
                    {label}
                    <ExternalLink size={12} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Стоимость обучения */}
      <section id="cost" className="py-16 md:py-24 bg-[#F8FAFC] scroll-mt-28">
        <div className="container mx-auto px-6 max-w-[1200px]">
          <div className="mb-10">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-slate-200 text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4">
              <Wallet size={12} />
              Стоимость
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-3">Стоимость и проходной балл</h2>
            <p className="text-slate-600 font-medium max-w-2xl">По каждой программе с учётом формы обучения. Стоимость за 1 семестр; проходной балл — по результатам прошлого набора.</p>
          </div>

          {/* Панель фильтров */}
          <div className="mb-8 p-6 md:p-8 rounded-2xl bg-white border border-slate-200/80 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.06)]">
            <div className="flex flex-col gap-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Фильтры</span>
                {(filterLevel !== 'All' || filterFormat !== 'All' || searchQuery) && (
                  <button
                    type="button"
                    onClick={() => { setFilterLevel('All'); setFilterFormat('All'); setSearchQuery(''); }}
                    className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-[#738CBF] transition-colors"
                  >
                    <RotateCcw size={14} />
                    Сбросить
                  </button>
                )}
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Уровень образования</label>
                  <div className="flex flex-wrap gap-2">
                    {['All', ...Object.values(EducationLevel)].filter((l) => l !== EducationLevel.DPO && l !== EducationLevel.POSTGRADUATE).map((l) => (
                      <button
                        key={l}
                        type="button"
                        onClick={() => setFilterLevel(l as EducationLevel)}
                        className={`px-4 py-2.5 rounded-full text-sm font-bold transition-all ${filterLevel === l ? 'bg-[#738CBF] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-800'}`}
                      >
                        {l === 'All' ? 'Все уровни' : l}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Формат обучения</label>
                  <div className="flex flex-wrap gap-2">
                    {['All', ...Object.values(StudyFormat)].map((f) => (
                      <button
                        key={f}
                        type="button"
                        onClick={() => setFilterFormat(f as StudyFormat)}
                        className={`px-4 py-2.5 rounded-full text-sm font-bold transition-all ${filterFormat === f ? 'bg-[#738CBF] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-800'}`}
                      >
                        {f === 'All' ? 'Все форматы' : f}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="md:col-span-2 lg:col-span-1">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Поиск</label>
                  <div className="relative">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="Название или код программы..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-[#738CBF] focus:ring-2 focus:ring-[#738CBF]/15 outline-none text-sm font-medium transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)]">
            <table className="w-full text-left min-w-[640px]">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80">
                  <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-widest">Программа / Код</th>
                  <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-widest">Уровень</th>
                  <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-widest">Форма</th>
                  <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-widest">Стоимость за семестр</th>
                  <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-widest">Проходной балл</th>
                </tr>
              </thead>
              <tbody>
                {filteredCostRows.map((r, i) => (
                  <tr key={i} className="border-b border-slate-100 last:border-0 hover:bg-[#738CBF]/5 transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-bold text-slate-900">{r.program}</span>
                      <span className="block text-xs text-slate-400 mt-0.5">{r.code}</span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-600">{r.level}</td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-600">{r.format}</td>
                    <td className="px-6 py-4 font-black text-slate-900">{r.costPerSemester.toLocaleString()} ₽</td>
                    <td className="px-6 py-4 font-bold text-[#738CBF]">{r.passingScore > 0 ? r.passingScore : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredCostRows.length === 0 && (
            <p className="text-center py-12 text-slate-500 font-medium bg-white rounded-2xl border border-slate-100">По выбранным фильтрам программ не найдено.</p>
          )}
        </div>
      </section>

      {/* Подготовительные курсы — карточки */}
      <section id="prep-courses" className="py-16 md:py-24 bg-white scroll-mt-28">
        <div className="container mx-auto px-6 max-w-[1200px]">
          <div className="mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#738CBF]/10 rounded-full border border-[#738CBF]/20 text-[10px] font-black uppercase tracking-widest text-[#738CBF] mb-4">
              <BookOpen size={12} />
              Подготовка
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-3">Подготовительные курсы</h2>
            <p className="text-slate-600 font-medium max-w-2xl">
              Подготовка к творческим и профильным вступительным испытаниям. Занятия ведут преподаватели СЗУ. По окончании — сертификат.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PREP_COURSES.map((c) => (
              <div
                key={c.id}
                className="group flex flex-col p-6 rounded-[2rem] border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:border-[#738CBF]/30 hover:shadow-xl hover:shadow-slate-200/50 transition-all"
              >
                <h3 className="text-xl font-black text-slate-900 mb-2 group-hover:text-[#738CBF] transition-colors">{c.name}</h3>
                <p className="text-slate-600 text-sm font-medium mb-4 flex-grow">{c.disciplines}</p>
                <div className="flex items-center gap-2 text-slate-500 text-xs font-medium mb-2">
                  <Calendar size={14} className="text-[#738CBF] shrink-0" />
                  {c.schedule}
                </div>
                <div className="flex items-center justify-between gap-4 mt-auto pt-4 border-t border-slate-100">
                  <span className="font-black text-[#738CBF] text-lg">{c.cost}</span>
                  <div className="flex gap-2">
                    {c.programId && (
                      <a
                        href={`#/program/${c.programId}`}
                        className="inline-flex items-center gap-1 text-[#738CBF] font-bold text-sm hover:underline"
                      >
                        Подробнее
                        <ChevronRight size={14} />
                      </a>
                    )}
                    <button
                      onClick={() => openPrepModal(c.name)}
                      className="bg-[#738CBF] hover:bg-[#5e76a8] text-white px-4 py-2.5 rounded-xl font-bold text-sm transition-colors"
                    >
                      Записаться
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="relative py-20 md:py-24 overflow-hidden bg-[#738CBF] text-white scroll-mt-28">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.06\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-80" aria-hidden />
        <div className="container mx-auto px-6 max-w-[1200px] relative z-10 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">Остались вопросы по поступлению?</h2>
            <p className="text-white/90 font-medium mb-8 text-lg">
              Оставьте заявку — специалист приёмной комиссии перезвонит в рабочее время (Пн–Пт 10:00–18:00) и ответит на ваши вопросы.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={openApplyModal}
                className="inline-flex items-center justify-center gap-2 bg-white text-[#738CBF] hover:bg-slate-100 px-10 py-5 rounded-full font-black text-base uppercase tracking-widest shadow-xl transition-all active:scale-95"
              >
                Оставить заявку
                <ChevronRight size={20} />
              </button>
              <a
                href="https://yandex.ru/maps/?text=Санкт-Петербург Кавалергардская 7"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white/90 hover:text-white font-medium"
              >
                <MapPin size={20} />
                Кавалергардская, 7 · 8 (812) 500-51-72
              </a>
            </div>
          </div>
        </div>
      </section>

      <OpenDayModal isOpen={openDayModalOpen} onClose={() => setOpenDayModalOpen(false)} />
      <PrepCourseModal isOpen={prepModalOpen} onClose={() => setPrepModalOpen(false)} courseName={prepCourseName} />
    </>
  );
};

export default AbiturientuPage;
