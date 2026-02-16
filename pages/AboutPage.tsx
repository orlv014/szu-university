import React from 'react';
import { ArrowRight, Building2, Users, FileText, MapPin, Phone, Mail, Clock } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950 text-white pt-24 pb-16 md:pt-28 md:pb-20">
        <div className="absolute inset-0 bg-[linear-gradient(160deg,transparent_0%,#738CBF/8%_50%,transparent_100%)] pointer-events-none" aria-hidden />
        <div className="absolute top-0 right-0 w-[min(60vw,400px)] h-[min(60vw,400px)] rounded-full bg-[#738CBF]/15 blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none" aria-hidden />
        <div className="container relative mx-auto px-6 max-w-[1200px]">
          <p className="text-[#a5b8e8] text-sm font-bold uppercase tracking-widest mb-4">Об университете</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] mb-5">
            Наследие <span className="text-[#738CBF]">и прогресс</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 font-medium max-w-2xl">
            Северо-Западный университет — более 27 лет высшего и дополнительного профессионального образования в Санкт-Петербурге.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-6 max-w-[1200px] -mt-6 relative z-10 pb-24">
        {/* Основные сведения — по данным szu.ru/sveden/common/ */}
        <section className="bg-white rounded-[2rem] border border-slate-200/80 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)] p-8 md:p-10 mb-10">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <h2 className="text-2xl font-black text-slate-900">Основные сведения</h2>
            <a href="https://szu.ru/sveden/common/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[#738CBF] font-bold text-sm hover:underline">
              Полная версия
              <ArrowRight size={16} />
            </a>
          </div>
          <dl className="space-y-5 text-slate-700">
            <div>
              <dt className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Полное наименование</dt>
              <dd className="font-medium">Автономная некоммерческая организация высшего образования «Северо-Западный университет»</dd>
            </div>
            <div>
              <dt className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Наименование на английском языке</dt>
              <dd className="font-medium">Autonomous non-profit organization of higher education "North-West University"</dd>
            </div>
            <div>
              <dt className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Сокращённое наименование</dt>
              <dd className="font-medium">АНО ВО «СЗУ»</dd>
            </div>
            <div>
              <dt className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Дата создания образовательной организации</dt>
              <dd className="font-medium">20 ноября 1997 г.</dd>
            </div>
          </dl>
          <p className="mt-6 text-slate-600 text-[15px] leading-relaxed">
            Северо-Западный университет более двадцати семи лет осуществляет обучение дипломированных бакалавров, специалистов и магистров более чем по двадцати семи направлениям, подготовку аспирантов, курсы повышения квалификации специалистов. Деятельность ведётся на основании <strong className="text-slate-800">государственной лицензии</strong> № Л035-00115-77/00617221 от 21.03.2023 г. и <strong className="text-slate-800">свидетельства о государственной аккредитации</strong> № А007-00115-78/01201018 от 16.03.2023 г.
          </p>
          <p className="mt-4 text-slate-600 text-[15px] leading-relaxed">
            АНО ВО «СЗУ» готовит специалистов по программам бакалавриата (архитектура, строительство, дизайн, реставрация, история искусств, культурология, менеджмент, педагогическое образование, психология, экономика, юриспруденция, государственное и муниципальное управление), специалитета (актёрское искусство, режиссура кино и телевидения), магистратуры (архитектура, строительство, экономика, дизайн, реставрация), аспирантуры (психологические науки, экономика), а также по программам дополнительного образования детей и взрослых и дополнительного профессионального образования.
          </p>
          <p className="mt-4 text-slate-600 text-[15px] leading-relaxed">
            Профессорско-преподавательский состав полностью отвечает требованиям: на кафедрах трудятся доктора и кандидаты наук, а также специалисты-практики.
          </p>
        </section>

        {/* Миссия */}
        <section className="mb-10" aria-labelledby="mission-heading">
          <div className="relative rounded-[2rem] overflow-hidden bg-slate-900 text-white p-10 md:p-14">
            <div className="absolute inset-0 bg-[linear-gradient(135deg,#738CBF_0%,transparent_50%,#0F172A_100%)] opacity-90" aria-hidden />
            <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#738CBF]/20 blur-[100px] -translate-y-1/2 translate-x-1/2" aria-hidden />
            <div className="relative z-10 max-w-3xl">
              <p id="mission-heading" className="text-[10px] font-black uppercase tracking-[0.25em] text-[#a5b8e8] mb-4">Миссия</p>
              <p className="text-2xl md:text-3xl font-bold leading-snug tracking-tight">
                Сделать качественное высшее образование доступным для каждого — независимо от графика и местоположения.
              </p>
              <p className="mt-5 text-slate-300 text-[15px] leading-relaxed">
                Мы объединяем традиции академического образования и гибкие форматы обучения, чтобы специалисты могли получать востребованные профессии и развиваться без отрыва от работы и семьи.
              </p>
            </div>
          </div>
        </section>

        {/* Учредитель */}
        <section className="bg-white rounded-[2rem] border border-slate-200/80 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)] p-8 md:p-10 mb-10">
          <h2 className="text-xl font-black text-slate-900 mb-4">Учредитель образовательной организации</h2>
          <p className="font-medium text-slate-800 mb-1">Фонд «Фонд развития социально-правовых технологий»</p>
          <p className="text-slate-600 text-[15px]">Генеральный директор — Борзов Александр Александрович</p>
          <p className="mt-2 text-slate-600 text-[15px]">192102, г. Санкт-Петербург, ул. Салова, д. 36, лит. А, помещ. 5-н, офис 35</p>
          <p className="text-slate-600 text-[15px]">Тел.: (812) 500-60-62 · petroconsulting@icloud.com</p>
        </section>

        {/* Адрес, режим, контакты — один блок */}
        <section className="bg-white rounded-[2rem] border border-slate-200/80 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)] overflow-hidden mb-10">
          <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100">
            <div className="p-6 md:p-8">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#738CBF]/10 flex items-center justify-center shrink-0">
                  <MapPin size={20} className="text-[#738CBF]" />
                </div>
                <h3 className="font-black text-slate-900 text-lg">Адрес</h3>
              </div>
              <p className="text-slate-600 text-[15px] leading-relaxed">
                191015, Санкт-Петербург, ул. Кавалергардская, д. 7, лит. А, этаж 2, помещ. 8-Н
              </p>
            </div>
            <div className="p-6 md:p-8">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#738CBF]/10 flex items-center justify-center shrink-0">
                  <Clock size={20} className="text-[#738CBF]" />
                </div>
                <h3 className="font-black text-slate-900 text-lg">Режим работы</h3>
              </div>
              <p className="text-slate-600 text-[15px] leading-relaxed">
                <span className="text-slate-800 font-medium">АУП:</span> пн–пт 10:00–19:00, перерыв 14:00–15:00
              </p>
              <p className="text-slate-600 text-[15px] leading-relaxed mt-1">
                <span className="text-slate-800 font-medium">ППС:</span> пн–сб по расписанию
              </p>
            </div>
            <div className="p-6 md:p-8">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#738CBF]/10 flex items-center justify-center shrink-0">
                  <Phone size={20} className="text-[#738CBF]" />
                </div>
                <h3 className="font-black text-slate-900 text-lg">Контакты</h3>
              </div>
              <p className="text-slate-600 text-[15px] leading-relaxed">
                <a href="tel:+78125006062" className="text-[#738CBF] font-medium hover:underline">8 (812) 500-60-62</a> — приёмная ректора<br />
                <a href="tel:+78125006069" className="text-[#738CBF] font-medium hover:underline">8 (812) 500-60-69</a> — приёмная комиссия
              </p>
              <p className="mt-2 text-slate-600 text-[15px]">
                <a href="mailto:vuz-info@szu.ru" className="text-[#738CBF] font-medium hover:underline">vuz-info@szu.ru</a>
              </p>
            </div>
          </div>
        </section>

        {/* Ключевые цифры — компактно, без дубля адреса */}
        <section className="flex flex-wrap gap-4 mb-12">
          <div className="flex items-baseline gap-3 px-6 py-4 rounded-2xl bg-[#738CBF]/5 border border-[#738CBF]/10">
            <span className="text-3xl font-black text-[#738CBF] tabular-nums">1997</span>
            <span className="text-slate-600 font-medium text-sm">год создания</span>
          </div>
          <div className="flex items-baseline gap-3 px-6 py-4 rounded-2xl bg-[#738CBF]/5 border border-[#738CBF]/10">
            <span className="text-3xl font-black text-[#738CBF] tabular-nums">27+</span>
            <span className="text-slate-600 font-medium text-sm">направлений подготовки</span>
          </div>
        </section>

        {/* Преподаватели и Документы */}
        <section className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white rounded-[2rem] border border-slate-200/80 p-8 shadow-sm hover:border-[#738CBF]/15 transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-[#738CBF]/10 flex items-center justify-center shrink-0">
                <Users size={24} className="text-[#738CBF]" />
              </div>
              <h2 className="text-xl font-black text-slate-900">Преподаватели</h2>
            </div>
            <p className="text-slate-600 font-medium text-[15px] mb-4">
              Состав кафедр и руководства университета.
            </p>
            <a href="https://szu.ru/teachers" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[#738CBF] font-bold hover:underline text-sm">
              Преподаватели
              <ArrowRight size={16} />
            </a>
          </div>
          <div className="bg-white rounded-[2rem] border border-slate-200/80 p-8 shadow-sm hover:border-[#738CBF]/15 transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-[#738CBF]/10 flex items-center justify-center shrink-0">
                <FileText size={24} className="text-[#738CBF]" />
              </div>
              <h2 className="text-xl font-black text-slate-900">Документы</h2>
            </div>
            <p className="text-slate-600 font-medium text-[15px] mb-4">
              Устав, положение о платных услугах, сведения об организации.
            </p>
            <div className="flex flex-wrap gap-2">
              <a href="https://szu.ru/abitur/files/aia/ustav_ANO_SZU.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-[#738CBF]/10 text-slate-700 hover:text-[#738CBF] font-bold text-sm transition-colors">
                Устав (PDF)
                <ArrowRight size={14} />
              </a>
              <a href="https://szu.ru/abitur/files/zie/Pologhenie_ob_okazanii_platnyx_obrazovatelynyx_uslug_090125.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-[#738CBF]/10 text-slate-700 hover:text-[#738CBF] font-bold text-sm transition-colors">
                Платные услуги (PDF)
                <ArrowRight size={14} />
              </a>
              <a href="https://szu.ru/sveden/common/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-[#738CBF]/10 text-slate-700 hover:text-[#738CBF] font-bold text-sm transition-colors">
                Сведения об организации
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </section>

        {/* Декоративный блок вместо внешнего изображения */}
        <section className="rounded-[2rem] overflow-hidden border border-slate-200/80 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)] bg-gradient-to-br from-slate-100 to-[#738CBF]/10 aspect-[21/9] min-h-[180px] flex items-center justify-center">
          <div className="flex flex-col items-center gap-3 text-slate-500">
            <Building2 size={48} className="text-[#738CBF]/60" aria-hidden />
            <span className="text-sm font-medium">Северо-Западный университет</span>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
