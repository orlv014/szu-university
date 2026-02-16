import React from 'react';
import { FileText, ShieldCheck, CheckCircle2, ExternalLink } from 'lucide-react';

const LICENSE_PDF = '/Лицензия.pdf';
const ACCREDITATION_PDF = '/Аккредитация.pdf';

const REGISTER_LICENSES = 'https://islod.obrnadzor.gov.ru/';
const REGISTER_ACCREDITATION = 'https://isga.obrnadzor.gov.ru/';

const LicenseAccreditationPage: React.FC = () => {
  return (
    <div className="pt-10 pb-32 container mx-auto px-6 max-w-5xl">
      <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight mb-6">
        Лицензия и аккредитация
      </h1>
      <p className="text-xl text-slate-600 font-medium mb-16 max-w-2xl">
        СЗУ имеет все необходимые документы для ведения образовательной деятельности и выдачи дипломов государственного образца.
      </p>

      <div className="grid md:grid-cols-2 gap-8 mb-20">
        <div className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm hover:shadow-lg transition-shadow">
          <div className="w-14 h-14 rounded-2xl bg-[#738CBF]/10 flex items-center justify-center mb-6">
            <FileText className="text-[#738CBF]" size={28} />
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-6">Лицензия</h2>
          <dl className="space-y-4 text-slate-700">
            <div><dt className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-1">Номер</dt><dd className="font-semibold">№ Л035-00115-77/00617221</dd></div>
            <div><dt className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-1">Дата выдачи</dt><dd className="font-semibold">21 марта 2023 г.</dd></div>
            <div><dt className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-1">Действует</dt><dd className="font-semibold">Бессрочно</dd></div>
            <div><dt className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-1">Кем выдана</dt><dd className="font-semibold text-sm">Федеральная служба по надзору в сфере образования и науки</dd></div>
          </dl>
          <a href={LICENSE_PDF} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 bg-[#738CBF] hover:bg-[#5A71A1] text-white px-6 py-3.5 rounded-2xl font-bold text-sm transition-colors">
            Скачать лицензию (PDF)
            <ExternalLink size={16} />
          </a>
        </div>

        <div className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm hover:shadow-lg transition-shadow">
          <div className="w-14 h-14 rounded-2xl bg-[#738CBF]/10 flex items-center justify-center mb-6">
            <ShieldCheck className="text-[#738CBF]" size={28} />
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-6">Аккредитация</h2>
          <dl className="space-y-4 text-slate-700">
            <div><dt className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-1">Номер</dt><dd className="font-semibold">№ А007-00115-78/01201018</dd></div>
            <div><dt className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-1">Дата выдачи</dt><dd className="font-semibold">16 марта 2023 г.</dd></div>
            <div><dt className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-1">Действует до</dt><dd className="font-semibold">16 марта 2028 г.</dd></div>
            <div><dt className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-1">Кем выдана</dt><dd className="font-semibold text-sm">Федеральная служба по надзору в сфере образования и науки</dd></div>
          </dl>
          <a href={ACCREDITATION_PDF} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 bg-[#738CBF] hover:bg-[#5A71A1] text-white px-6 py-3.5 rounded-2xl font-bold text-sm transition-colors">
            Скачать свидетельство (PDF)
            <ExternalLink size={16} />
          </a>
        </div>
      </div>

      <section className="mb-16">
        <h2 className="text-3xl font-black text-slate-900 mb-8">Что означает государственная аккредитация?</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="flex gap-4">
            <CheckCircle2 className="text-[#738CBF] shrink-0 mt-1" size={24} />
            <div>
              <h3 className="font-bold text-slate-900 mb-2">Диплом государственного образца</h3>
              <p className="text-slate-600 text-sm">Выпускники получают диплом, признаваемый на всей территории РФ.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <CheckCircle2 className="text-[#738CBF] shrink-0 mt-1" size={24} />
            <div>
              <h3 className="font-bold text-slate-900 mb-2">Международное признание</h3>
              <p className="text-slate-600 text-sm">Диплом может быть признан в странах, подписавших Лиссабонскую конвенцию.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <CheckCircle2 className="text-[#738CBF] shrink-0 mt-1" size={24} />
            <div>
              <h3 className="font-bold text-slate-900 mb-2">Продолжение образования</h3>
              <p className="text-slate-600 text-sm">Возможность поступления в магистратуру и аспирантуру любого вуза РФ.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <CheckCircle2 className="text-[#738CBF] shrink-0 mt-1" size={24} />
            <div>
              <h3 className="font-bold text-slate-900 mb-2">Качество образования</h3>
              <p className="text-slate-600 text-sm">Соответствие образовательных программ федеральным государственным стандартам.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 rounded-[2rem] border border-slate-100 p-8 md:p-10">
        <h2 className="text-2xl font-black text-slate-900 mb-4">Проверка в государственных реестрах</h2>
        <p className="text-slate-600 mb-6">Вы можете самостоятельно проверить наличие лицензии и аккредитации в официальных реестрах:</p>
        <div className="flex flex-wrap gap-4">
          <a href={REGISTER_LICENSES} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-white border border-slate-200 hover:border-[#738CBF] hover:text-[#738CBF] px-6 py-3 rounded-2xl font-bold text-sm transition-colors shadow-sm">
            Реестр лицензий Рособрнадзора
            <ExternalLink size={16} />
          </a>
          <a href={REGISTER_ACCREDITATION} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-white border border-slate-200 hover:border-[#738CBF] hover:text-[#738CBF] px-6 py-3 rounded-2xl font-bold text-sm transition-colors shadow-sm">
            Реестр аккредитаций
            <ExternalLink size={16} />
          </a>
        </div>
      </section>
    </div>
  );
};

export default LicenseAccreditationPage;
