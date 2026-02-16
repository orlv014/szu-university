import React, { useState, useCallback } from 'react';
import { X, CheckCircle2 } from 'lucide-react';

interface ApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ApplyModal: React.FC<ApplyModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);

  const hasContact = phone.trim() !== '' || email.trim() !== '';
  const isValid = hasContact && consent;

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setTouched({ name: true, phone: true, email: true, consent: true });
      if (!isValid) return;
      setSubmitted(true);
    },
    [isValid]
  );

  const handleClose = useCallback(() => {
    onClose();
    setTimeout(() => {
      setName('');
      setPhone('');
      setEmail('');
      setConsent(false);
      setTouched({});
      setSubmitted(false);
    }, 300);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="apply-modal-title"
    >
      <div
        className="bg-white rounded-[2rem] shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8 relative">
          <button
            type="button"
            onClick={handleClose}
            className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
            aria-label="Закрыть"
          >
            <X size={22} />
          </button>

          {!submitted ? (
            <>
              <h2 id="apply-modal-title" className="text-2xl font-black text-slate-900 tracking-tight pr-10 mb-2">
                Оставить заявку
              </h2>
              <p className="text-slate-500 text-sm font-medium mb-8">
                Оставьте контакты — мы перезвоним и ответим на вопросы о поступлении.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="apply-name" className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">
                    Имя
                  </label>
                  <input
                    id="apply-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Как к вам обращаться?"
                    className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:border-[#738CBF] focus:ring-2 focus:ring-[#738CBF]/20 outline-none transition-all font-medium text-slate-900 placeholder:text-slate-300"
                  />
                </div>

                <div>
                  <label htmlFor="apply-phone" className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">
                    Телефон
                  </label>
                  <input
                    id="apply-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+7 (___) ___-__-__"
                    className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:border-[#738CBF] focus:ring-2 focus:ring-[#738CBF]/20 outline-none transition-all font-medium text-slate-900 placeholder:text-slate-300"
                  />
                </div>

                <div>
                  <label htmlFor="apply-email" className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">
                    Эл. почта
                  </label>
                  <input
                    id="apply-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@mail.ru"
                    className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:border-[#738CBF] focus:ring-2 focus:ring-[#738CBF]/20 outline-none transition-all font-medium text-slate-900 placeholder:text-slate-300"
                  />
                </div>

                {touched.consent && !hasContact && (
                  <p className="text-red-500 text-sm font-medium">
                    Укажите номер телефона или адрес эл. почты.
                  </p>
                )}

                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-1 w-5 h-5 rounded border-slate-300 text-[#738CBF] focus:ring-[#738CBF]"
                  />
                  <span className="text-sm text-slate-600 font-medium leading-snug">
                    Я соглашаюсь на{' '}
                    <a href="#" className="text-[#738CBF] underline hover:no-underline">
                      обработку персональных данных
                    </a>{' '}
                    и с{' '}
                    <a href="#" className="text-[#738CBF] underline hover:no-underline">
                      политикой конфиденциальности
                    </a>
                  </span>
                </label>

                {touched.consent && !consent && (
                  <p className="text-red-500 text-sm font-medium">
                    Необходимо согласие на обработку ПД.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={!isValid}
                  className="w-full bg-[#738CBF] hover:bg-[#5A71A1] disabled:bg-slate-300 disabled:cursor-not-allowed text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-xl shadow-[#738CBF]/20 active:scale-[0.98]"
                >
                  Оставить заявку
                </button>
              </form>
            </>
          ) : (
            <div className="py-8 text-center">
              <div className="w-16 h-16 rounded-full bg-[#738CBF]/10 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="text-[#738CBF]" size={36} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-3">
                Заявка отправлена
              </h3>
              <p className="text-slate-600 font-medium leading-relaxed mb-8">
                Спасибо! Мы свяжемся с вами в ближайшее время по указанному телефону или почте.
              </p>
              <button
                type="button"
                onClick={handleClose}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-8 py-3 rounded-full transition-colors"
              >
                Закрыть
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplyModal;
