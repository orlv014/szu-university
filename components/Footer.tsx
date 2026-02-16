
import React from 'react';
import { Send, Youtube, Phone, Mail, MapPin, ExternalLink } from 'lucide-react';

const VkIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4 8.57 4 8.096c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.678.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.643 1.254-1.744 2.15-4.406 2.15-4.406.119-.254.322-.491.763-.491h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.05.17.49-.085.744-.576.744z"/>
  </svg>
);
import { useApplyModal } from '../context/ApplyModalContext';
import Logo from './Logo';

const Footer: React.FC = () => {
  const openApplyModal = useApplyModal();
  return (
    <footer className="bg-slate-950 text-slate-400 pt-32 pb-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-24">
          <div className="space-y-8">
            <div className="flex items-center shrink-0">
              <Logo light height={40} />
            </div>
            <p className="text-sm leading-relaxed font-medium">
              28 лет успеха в сфере высшего и дополнительного профессионального образования. Лицензированные программы и государственный диплом.
            </p>
            <div className="flex gap-5">
              <a href="https://vk.com/szu_ru" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#738CBF] hover:border-[#738CBF] transition-all transform hover:-translate-y-1" aria-label="ВКонтакте">
                <VkIcon size={20} />
              </a>
              <a href="https://youtube.com/@szu_ru" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#738CBF] hover:border-[#738CBF] transition-all transform hover:-translate-y-1" aria-label="YouTube">
                <Youtube size={20} />
              </a>
              <a href="https://t.me/szu_ru" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#738CBF] hover:border-[#738CBF] transition-all transform hover:-translate-y-1" aria-label="Telegram">
                <Send size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-black uppercase tracking-[0.2em] mb-10 text-xs">Навигация</h4>
            <ul className="space-y-5">
              {[
                { label: 'Абитуриенту', href: '#/abiturientu' },
                { label: 'Программы', href: '#/programs' },
                { label: 'О университете', href: '#/about' },
                { label: 'Преподаватели', href: 'https://szu.ru/teachers', external: true },
              ].map((item) => (
                <li key={item.label}>
                  <a href={item.href} {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="hover:text-[#738CBF] transition-colors flex items-center gap-3 font-medium text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#738CBF]"></span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black uppercase tracking-[0.2em] mb-10 text-xs">Документы</h4>
            <ul className="space-y-5">
              {[
                { label: 'Лицензия и аккредитация', href: '#/license' },
                { label: 'Устав АНО ВО «СЗУ»', href: 'https://szu.ru/abitur/files/aia/ustav_ANO_SZU.pdf', external: true },
                { label: 'Положение о платных услугах', href: 'https://szu.ru/abitur/files/zie/Pologhenie_ob_okazanii_platnyx_obrazovatelynyx_uslug_090125.pdf', external: true },
                { label: 'Политика конфиденциальности', href: '#' },
                { label: 'Сведения об организации', href: 'https://szu.ru/sveden/common/', external: true },
              ].map((item) => (
                <li key={item.label}>
                  <a href={item.href} {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="hover:text-[#738CBF] transition-colors flex items-center justify-between group font-medium text-sm">
                    {item.label}
                    <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#738CBF]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-8">
            <h4 className="text-white font-black uppercase tracking-[0.2em] mb-10 text-xs">Контакты</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <MapPin size={22} className="text-[#738CBF] shrink-0" />
                <span className="text-sm font-medium leading-relaxed">СПб, ул. Кавалергардская,<br/>д.7, лит. А</span>
              </li>
              <li className="flex items-center gap-4">
                <Phone size={22} className="text-[#738CBF] shrink-0" />
                <a href="tel:+78125005172" className="text-sm font-black hover:text-[#738CBF] transition-colors">8 (812) 500-51-72</a>
              </li>
              <li className="flex items-center gap-4">
                <Mail size={22} className="text-[#738CBF] shrink-0" />
                <a href="mailto:priem@szu.ru" className="text-sm font-black hover:text-[#738CBF] transition-colors">priem@szu.ru</a>
              </li>
            </ul>
            <button
              onClick={openApplyModal}
              className="w-full bg-[#738CBF] hover:bg-[#5A71A1] text-white py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all shadow-xl shadow-[#738CBF]/10"
            >
              Обратный звонок
            </button>
            <a
              href="https://szu.ru/mail-us"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] border border-white/20 text-white/90 hover:bg-white/10 hover:text-white transition-all"
            >
              Напишите нам
            </a>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">
          <p>© 1997–2026 Северо-Западный университет. Все права защищены.</p>
        </div>
      </div>
      
      {/* Mobile Sticky CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-5 bg-white/95 backdrop-blur-md border-t border-slate-200 z-[60]">
        <button
          onClick={openApplyModal}
          className="w-full bg-[#738CBF] text-white py-5 rounded-2xl font-black shadow-2xl shadow-[#738CBF]/30 uppercase tracking-[0.2em] text-[10px] active:scale-95"
        >
          Подать заявку на 2026
        </button>
      </div>
    </footer>
  );
};

export default Footer;
