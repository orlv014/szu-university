import React, { useEffect, useState } from 'react';
import { Clock, DollarSign, Star, FileText, CheckCircle2, Target, Sparkles, ListChecks, Briefcase, Building2, GraduationCap, Monitor, ChevronRight, ChevronLeft, FolderOpen, Laptop, ExternalLink, Users } from 'lucide-react';
import { useApplyModal } from '../context/ApplyModalContext';
import { PROGRAMS_DATA } from '../constants';
import { getProgramPageContent } from '../programPageContent';
import { StudyFormat } from '../types';

const RULES_PDF_URL = 'https://szu.ru/wp-content/uploads/2024/02/pravila-priema-2024.pdf';
const SZU_ABITUR_URL = 'https://szu.ru/abitur/';
const SZU_ABITUR_VI_URL = 'https://szu.ru/abitur/bachelor/#abitur_vikonPriemExam';

// По данным СЗУ: https://szu.ru/cost-of-education «Чтобы стать студентом»
const HOW_TO_APPLY_STEPS = [
  'Выбрать направление и профиль подготовки',
  'Определить специальность по вашему ЕГЭ или вступительным испытаниям',
  'Ознакомиться с правилами приёма',
  'Подать документы в приёмную комиссию (ул. Кавалергардская, 7, Пн–Пт 10:00–18:00)',
  'Пройти вступительные испытания или предоставить результаты ЕГЭ',
  'Предоставить оригиналы документов об образовании и заключить договор',
];

const REQUIRED_DOCUMENTS = [
  'Паспорт гражданина РФ',
  'Документ об образовании (аттестат о среднем общем образовании или диплом)',
  'Фотографии 3×4 см',
  'При поступлении по результатам ЕГЭ — свидетельство о сдаче ЕГЭ',
  'На направления с творческими испытаниями (архитектура, дизайн, реставрация, актёрское искусство, режиссура, живопись) — прохождение творческих/профессиональных испытаний по правилам приёма СЗУ',
];

const HOW_LEARNING_WORKS_BY_FORM = {
  ochno: [
    'Занятия в аудиториях университета по расписанию (ул. Кавалергардская, 7)',
    'Обратная связь от преподавателей и куратора на занятиях',
    'Практика и проекты в рамках учебного плана',
    'Доступ к материалам и личному кабинету',
  ],
  ochnoZaochnoZaochno: [
    'Лекции и консультации по расписанию, самостоятельная работа',
    'Личный кабинет и доступ к учебным материалам в любое время',
    'Обратная связь от преподавателей и куратора',
    'Возможность совмещать учёбу с работой',
  ],
};

const SKILLS_PER_SLIDE = 4;

const ProgramDetailPage: React.FC<{ programId: string }> = ({ programId }) => {
  const program = PROGRAMS_DATA.find((p) => p.id === programId);
  const openApplyModal = useApplyModal();
  const [skillsSlide, setSkillsSlide] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [programId]);

  if (!program) {
    return (
      <div className="pt-48 pb-32 text-center container mx-auto px-6">
        <h1 className="text-4xl font-black mb-10">Программа не найдена</h1>
        <button onClick={() => (window.location.hash = '#/programs')} className="bg-[#738CBF] text-white px-8 py-3 rounded-full">
          Вернуться в каталог
        </button>
      </div>
    );
  }

  const content = getProgramPageContent(program);

  return (
    <div className="pt-4 pb-32 bg-[#F8FAFC]">
      {/* Hero — как на главной: тёмный фон, акцент, чёткая иерархия */}
      <div className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 bg-[linear-gradient(160deg,transparent_0%,#738CBF/8%_50%,transparent_100%)] pointer-events-none" aria-hidden />
        <div className="absolute top-0 right-0 w-[min(70vw,480px)] h-[min(70vw,480px)] rounded-full bg-[#738CBF]/15 blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" aria-hidden />
        <div className="absolute bottom-0 left-0 w-[min(50vw,320px)] h-[min(50vw,320px)] rounded-full bg-[#738CBF]/[0.08] blur-[80px] translate-y-1/2 -translate-x-1/4 pointer-events-none" aria-hidden />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#738CBF]/40 to-transparent" aria-hidden />

        <div className="container relative mx-auto px-6 max-w-[1200px] py-12 md:py-16">
          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="px-4 py-2 bg-[#738CBF] text-white rounded-full text-[10px] font-bold uppercase tracking-widest">
                {program.level}
              </span>
              <span className="text-slate-400 font-semibold text-sm">{program.code}</span>
              <span className="text-slate-500">·</span>
              <span className="text-slate-400 text-sm font-medium">Гос. лицензия и аккредитация</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.12] mb-4">
              {program.name}
            </h1>
            <p className="text-lg md:text-xl text-slate-300 font-medium mb-12 max-w-2xl">
              {program.specialization}
            </p>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
              {[
                { icon: Monitor, label: 'Формат', value: program.format.length ? program.format.join(', ') : '—' },
                { icon: Clock, label: 'Срок', value: program.duration },
                { icon: DollarSign, label: 'В год', value: `${program.price.toLocaleString()} ₽` },
                { icon: GraduationCap, label: 'Документ', value: 'Гос. диплом' },
              ].map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="flex items-center gap-4 p-5 rounded-2xl bg-white/[0.07] border border-white/10 hover:bg-white/[0.1] transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#738CBF]/25 flex items-center justify-center shrink-0">
                    <Icon size={22} className="text-[#a5b8e8]" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{label}</div>
                    <div className="text-sm font-bold text-white truncate">{value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-5">
              <button
                onClick={openApplyModal}
                className="w-full sm:w-auto bg-[#738CBF] hover:bg-[#5e76a8] text-white px-10 py-5 rounded-full font-black text-base uppercase tracking-widest shadow-2xl shadow-[#738CBF]/30 hover:shadow-[#738CBF]/40 transition-all active:scale-[0.98]"
              >
                Записаться на программу
              </button>
              <p className="text-slate-400 text-sm font-medium">
                Рассрочка 0% · Кавалергардская, 7 · 8 (812) 500-51-72
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <div className="container mx-auto px-6 max-w-[1200px]">
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-10">
              {/* О программе — с бейджем как на главной */}
              <section className="bg-white rounded-[2.5rem] border border-slate-200/80 p-8 md:p-10 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)]">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#738CBF]/10 rounded-full border border-[#738CBF]/20 text-[10px] font-bold uppercase tracking-widest text-[#738CBF] mb-6">
                  Программа
                </div>
                <h2 className="text-2xl font-black text-slate-900 mb-5">О программе</h2>
              <div className="prose prose-slate max-w-none text-slate-600 font-medium leading-relaxed text-[15px] space-y-4">
                {content.descriptionParagraphs?.length ? (
                  content.descriptionParagraphs.map((p, i) => <p key={i} className="mb-0">{p}</p>)
                ) : (
                  <p className="mb-0">{program.description}</p>
                )}
              </div>
            </section>

            {/* Стоимость — тёмный блок в стиле главной CTA */}
            <section className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 p-8 md:p-10 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.25)] ring-1 ring-white/10">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.04\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-80" aria-hidden />
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#738CBF]/20 blur-3xl pointer-events-none" aria-hidden />
              <div className="relative z-10">
                <div className="text-[10px] font-bold text-[#a5b8e8] uppercase tracking-widest mb-2">Стоимость</div>
                <h2 className="text-2xl font-black text-white mb-4">Стоимость и рассрочка</h2>
                <p className="text-slate-200 font-medium text-[15px] mb-5">
                  <strong className="text-white">{program.price.toLocaleString()} ₽</strong> в год · 1-й семестр от {Math.round(program.price / 2).toLocaleString()} ₽. Рассрочка на 10 мес. без переплат — от <strong className="text-[#a5b8e8]">{Math.round(program.price / 10).toLocaleString()} ₽/мес.</strong>
                </p>
                <button onClick={openApplyModal} className="bg-[#738CBF] hover:bg-[#5e76a8] text-white px-8 py-4 rounded-full font-bold text-sm uppercase tracking-widest transition-all active:scale-[0.98] shadow-lg shadow-[#738CBF]/30">
                  Узнать стоимость
                </button>
              </div>
            </section>

            {/* Кому подойдёт + Почему СЗУ */}
            <section className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-[2.5rem] border border-slate-200/80 p-7 md:p-8 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)]">
                <div className="w-12 h-12 rounded-2xl bg-[#738CBF]/10 flex items-center justify-center mb-4">
                  <Target size={24} className="text-[#738CBF]" />
                </div>
                <h2 className="text-xl font-black text-slate-900 mb-4">Кому подойдёт</h2>
                <ul className="space-y-3">
                  {content.targetAudience.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-700 text-[15px] font-medium">
                      <CheckCircle2 size={18} className="text-[#738CBF] shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-[2.5rem] border border-slate-200/80 p-7 md:p-8 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)]">
                <div className="w-12 h-12 rounded-2xl bg-[#738CBF]/10 flex items-center justify-center mb-4">
                  <Sparkles size={24} className="text-[#738CBF]" />
                </div>
                <h2 className="text-xl font-black text-slate-900 mb-4">Почему СЗУ</h2>
                <ul className="space-y-3">
                  {content.whySzu.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-700 text-[15px] font-medium">
                      <span className="w-7 h-7 rounded-xl bg-[#738CBF]/15 text-[#738CBF] flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Преподаватели */}
            <section className="bg-white rounded-[2.5rem] border border-slate-200/80 p-7 md:p-8 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)]">
              <div className="w-12 h-12 rounded-2xl bg-[#738CBF]/10 flex items-center justify-center mb-4">
                <Users size={24} className="text-[#738CBF]" />
              </div>
              <h2 className="text-xl font-black text-slate-900 mb-3">Преподаватели</h2>
              <p className="text-slate-700 text-[15px] font-medium mb-4">Занятия ведут преподаватели кафедры — практики и профессора. Полный состав по факультетам и кафедрам — в разделе «Преподаватели».</p>
              <a href="https://szu.ru/teachers" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[#738CBF] font-bold hover:underline text-sm">
                Преподаватели
                <ExternalLink size={14} />
              </a>
            </section>

            {/* Особенности — теги */}
            <section className="bg-white rounded-[2.5rem] border border-slate-200/80 p-7 md:p-8 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)]">
              <div className="w-12 h-12 rounded-2xl bg-[#738CBF]/10 flex items-center justify-center mb-4">
                <ListChecks size={24} className="text-[#738CBF]" />
              </div>
              <h2 className="text-xl font-black text-slate-900 mb-4">Особенности программы</h2>
              <div className="flex flex-wrap gap-3">
                {content.features.map((item, i) => (
                  <span key={i} className="px-4 py-2.5 bg-[#738CBF]/5 text-slate-700 rounded-xl text-[15px] font-medium border border-[#738CBF]/15">
                    {item}
                  </span>
                ))}
              </div>
            </section>

            {/* Что вы будете изучать — карусель */}
            <section className="bg-white rounded-[2.5rem] border border-slate-200/80 p-7 md:p-9 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)]">
              <div className="w-12 h-12 rounded-2xl bg-[#738CBF]/10 flex items-center justify-center mb-5">
                <Briefcase size={24} className="text-[#738CBF]" />
              </div>
              <h2 className="text-xl font-black text-slate-900 mb-5">Что вы будете изучать</h2>
              <div className="relative">
                <div className="overflow-hidden">
                  {(() => {
                    const start = skillsSlide * SKILLS_PER_SLIDE;
                    const chunk = content.skills.slice(start, start + SKILLS_PER_SLIDE);
                    return (
                      <div className="grid sm:grid-cols-2 gap-4">
                        {chunk.map((skill, i) => (
                          <div key={start + i} className="flex items-center gap-4 p-4 bg-slate-50/80 rounded-2xl border border-slate-100">
                            <CheckCircle2 size={20} className="text-[#738CBF] shrink-0" />
                            <span className="text-slate-700 font-medium text-[15px]">{skill}</span>
                          </div>
                        ))}
                      </div>
                    );
                  })()}
                </div>
                {Math.ceil(content.skills.length / SKILLS_PER_SLIDE) > 1 && (
                  <div className="flex items-center justify-between mt-5">
                    <button
                      type="button"
                      onClick={() => setSkillsSlide(s => Math.max(0, s - 1))}
                      disabled={skillsSlide === 0}
                      className="p-2.5 rounded-xl bg-slate-100 text-slate-600 hover:bg-[#738CBF] hover:text-white disabled:opacity-40 disabled:pointer-events-none transition-all"
                    >
                      <ChevronLeft size={22} />
                    </button>
                    <div className="flex gap-2">
                      {Array.from({ length: Math.ceil(content.skills.length / SKILLS_PER_SLIDE) }).map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setSkillsSlide(i)}
                          className={`w-3 h-3 rounded-full transition-all ${i === skillsSlide ? 'bg-[#738CBF] scale-110' : 'bg-slate-300 hover:bg-slate-400'}`}
                          aria-label={`Слайд ${i + 1}`}
                        />
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => setSkillsSlide(s => Math.min(Math.ceil(content.skills.length / SKILLS_PER_SLIDE) - 1, s + 1))}
                      disabled={skillsSlide >= Math.ceil(content.skills.length / SKILLS_PER_SLIDE) - 1}
                      className="p-2.5 rounded-xl bg-slate-100 text-slate-600 hover:bg-[#738CBF] hover:text-white disabled:opacity-40 disabled:pointer-events-none transition-all"
                    >
                      <ChevronRight size={22} />
                    </button>
                  </div>
                )}
              </div>
            </section>

            {/* Практика + Карьера */}
            <section className="bg-white rounded-[2.5rem] border border-slate-200/80 p-7 md:p-9 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)]">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#738CBF]/10 flex items-center justify-center mb-4">
                    <Building2 size={24} className="text-[#738CBF]" />
                  </div>
                  <h2 className="text-xl font-black text-slate-900 mb-3">Практика</h2>
                  <p className="text-slate-600 text-[15px] font-medium leading-relaxed">{content.practice}</p>
                </div>
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#738CBF]/10 flex items-center justify-center mb-4">
                    <Briefcase size={24} className="text-[#738CBF]" />
                  </div>
                  <h2 className="text-xl font-black text-slate-900 mb-3">Карьера</h2>
                  <div className="flex flex-wrap gap-2">
                    {content.careers.map((role, i) => (
                      <span key={i} className="px-4 py-2 bg-[#738CBF]/5 border border-[#738CBF]/15 text-slate-800 rounded-xl font-semibold text-sm">
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Вступительные + Как поступить */}
            <section className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-7 md:p-8 rounded-[2.5rem] border border-slate-200/80 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)]">
                <div className="w-12 h-12 rounded-2xl bg-[#738CBF]/10 flex items-center justify-center mb-4">
                  <FileText size={24} className="text-[#738CBF]" />
                </div>
                <h2 className="text-xl font-black text-slate-900 mb-3">Вступительные испытания</h2>
                <p className="text-slate-700 text-[15px] font-medium bg-slate-50 p-5 rounded-2xl border border-slate-100">{program.exams}</p>
                {program.passingScore > 0 && (
                  <p className="flex items-center gap-2 text-amber-600 font-bold text-sm mt-4">
                    <Star fill="currentColor" size={16} />
                    Проходной балл: {program.passingScore}
                  </p>
                )}
                <a href={SZU_ABITUR_VI_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[#738CBF] font-bold text-sm mt-4 hover:underline">
                  Перечень вступительных испытаний
                  <ExternalLink size={14} />
                </a>
              </div>
              <div className="bg-white p-7 md:p-8 rounded-[2.5rem] border border-slate-200/80 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)]">
                <div className="text-[10px] font-bold text-[#738CBF] uppercase tracking-widest mb-2">Поступление</div>
                <h2 className="text-xl font-black text-slate-900 mb-4">Как поступить</h2>
                <div className="space-y-3">
                  {HOW_TO_APPLY_STEPS.map((step, i) => (
                    <div key={i} className="flex gap-4 p-4 rounded-2xl bg-slate-50/80 border border-slate-100">
                      <span className="w-9 h-9 rounded-xl bg-[#738CBF] text-white flex items-center justify-center text-sm font-bold shrink-0">{i + 1}</span>
                      <p className="text-slate-700 text-[15px] font-medium pt-0.5">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Как проходит обучение */}
            <section className="bg-white rounded-[2.5rem] border border-slate-200/80 p-7 md:p-9 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)]">
              <h2 className="text-xl font-black text-slate-900 mb-6">Как проходит обучение</h2>
              <div className="grid md:grid-cols-2 gap-10 items-center">
                <ul className="space-y-4">
                  {(() => {
                    const onlyFullTime = program.format.length === 1 && program.format[0] === StudyFormat.FULL_TIME;
                    const items = onlyFullTime ? HOW_LEARNING_WORKS_BY_FORM.ochno : HOW_LEARNING_WORKS_BY_FORM.ochnoZaochnoZaochno;
                    return items.map((item, i) => (
                      <li key={i} className="flex items-start gap-4 text-slate-700 text-[15px] font-medium">
                        <CheckCircle2 size={20} className="text-[#738CBF] shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ));
                  })()}
                </ul>
                <div className="flex justify-center">
                  <div className="w-44 h-44 rounded-[2rem] bg-[#738CBF]/10 flex items-center justify-center border-2 border-[#738CBF]/20">
                    <Laptop size={72} className="text-[#738CBF]" />
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Сайдбар */}
          <aside className="space-y-8">
            <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] sticky top-28 space-y-6 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.3)] ring-1 ring-white/10">
              <div className="text-[10px] font-bold text-[#a5b8e8] uppercase tracking-widest">Стоимость</div>
              <div className="text-3xl font-extrabold">{program.price.toLocaleString()} ₽<span className="text-lg font-semibold text-slate-400">/год</span></div>
              <p className="text-slate-300 text-sm font-medium">Рассрочка на 10 месяцев без переплат — от {Math.round(program.price / 10).toLocaleString()} ₽/мес.</p>
              <ul className="space-y-2.5">
                {['Гос. диплом', 'Рассрочка 0%', 'Лицензия и аккредитация', 'Приёмная: Кавалергардская, 7'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-slate-300 font-medium text-sm">
                    <CheckCircle2 size={18} className="text-emerald-400 shrink-0" /> {item}
                  </li>
                ))}
              </ul>
              <button
                onClick={openApplyModal}
                className="w-full bg-[#738CBF] hover:bg-[#5e76a8] py-5 rounded-full font-black uppercase tracking-widest text-sm shadow-xl shadow-[#738CBF]/30 transition-all active:scale-[0.98]"
              >
                Подать заявку на поступление
              </button>
              <a
                href={RULES_PDF_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center text-xs text-slate-400 hover:text-white transition-colors underline underline-offset-2"
              >
                Правила приёма (PDF)
              </a>
              <a
                href={SZU_ABITUR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 text-xs text-slate-400 hover:text-[#a5b8e8] transition-colors mt-2"
              >
                Подробнее о приёме
                <ExternalLink size={12} />
              </a>
            </div>
          </aside>
        </div>
        </div>

        {/* Документы — акцентный блок */}
        <section className="container mx-auto px-6 max-w-[1200px] mt-12 py-10 md:py-12 rounded-[2.5rem] bg-[#738CBF]/[0.08] border-2 border-[#738CBF]/20">
          <div className="max-w-3xl flex flex-col sm:flex-row sm:items-start gap-8">
            <div className="w-20 h-20 rounded-2xl bg-[#738CBF]/20 flex items-center justify-center shrink-0">
              <FolderOpen size={40} className="text-[#738CBF]" />
            </div>
            <div className="flex-1">
              <div className="text-[10px] font-bold text-[#738CBF] uppercase tracking-widest mb-2">Поступление</div>
              <h2 className="text-2xl font-black text-slate-900 mb-5">Какие документы нужны для поступления</h2>
              <ul className="space-y-3 mb-6">
                {REQUIRED_DOCUMENTS.map((doc, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-700 text-[15px] font-medium">
                    <CheckCircle2 size={18} className="text-[#738CBF] shrink-0 mt-0.5" />
                    {doc}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap items-center gap-4">
                <a href={RULES_PDF_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[#738CBF] font-bold text-[15px] hover:underline">
                  Скачать правила приёма (PDF)
                  <ChevronRight size={18} />
                </a>
                <a href={SZU_ABITUR_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-slate-600 font-medium text-[15px] hover:text-[#738CBF] hover:underline">
                  Официальная информация о приёме (сроки, ВИ, списки)
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Нижний CTA — в стиле главной страницы (синий блок) */}
        <section className="relative mt-12 py-16 overflow-hidden bg-[#738CBF] text-white text-center">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.06\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-80" aria-hidden />
          <div className="container mx-auto px-6 max-w-[1200px] relative z-10">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">Остались вопросы по поступлению?</h2>
            <p className="text-white/90 font-medium mb-10 max-w-xl mx-auto text-lg">
              Оставьте заявку — специалист приёмной комиссии СЗУ перезвонит в рабочее время (Пн–Пт 10:00–18:00) и ответит на вопросы о программе и документах.
            </p>
            <button
              onClick={openApplyModal}
              className="bg-white text-[#738CBF] hover:bg-slate-100 px-12 py-5 rounded-full font-black text-base uppercase tracking-widest shadow-xl active:scale-95 transition-all"
            >
              Заказать обратный звонок
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProgramDetailPage;
