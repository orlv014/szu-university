import React, { useState, useCallback } from 'react';
import { X, CheckCircle2 } from 'lucide-react';

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (digits.length === 0) return '';
  const rest = digits[0] === '8' || digits[0] === '7' ? digits.slice(1) : digits;
  return '+7' + (rest.length ? ` (${rest.slice(0, 3)}${rest.length > 3 ? ') ' + rest.slice(3, 6) : ''}${rest.length > 6 ? '-' + rest.slice(6, 8) : ''}${rest.length > 8 ? '-' + rest.slice(8, 10) : ''}` : '');
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface PrepCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseName: string;
}

const PrepCourseModal: React.FC<PrepCourseModalProps> = ({ isOpen, onClose, courseName }) => {
  const [fio, setFio] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [emailError, setEmailError] = useState('');

  const hasContact = phone.replace(/\D/g, '').length >= 10 || emailRegex.test(email);
  const isValid = hasContact && consent && emailError === '';

  const handleEmailBlur = () => {
    if (email && !emailRegex.test(email)) setEmailError('Введите корректный адрес эл. почты');
    else setEmailError('');
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => setPhone(formatPhone(e.target.value));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && !emailRegex.test(email)) setEmailError('Введите корректный адрес эл. почты');
    if (!isValid) return;
    setSubmitted(true);
  };

  const handleClose = useCallback(() => {
    onClose();
    setTimeout(() => {
      setFio('');
      setEmail('');
      setPhone('');
      setConsent(false);
      setSubmitted(false);
      setEmailError('');
    }, 300);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={handleClose} role="dialog" aria-modal="true">
      <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="p-8 relative">
          <button type="button" onClick={handleClose} className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:bg-slate-100" aria-label="Закрыть">
            <X size={22} />
          </button>

          {!submitted ? (
            <>
              <h2 className="text-2xl font-black text-slate-900 pr-10 mb-2">Запись на подготовительный курс</h2>
              <div className="mb-6 p-4 bg-[#738CBF]/10 rounded-xl border border-[#738CBF]/20">
                <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">Направление</p>
                <p className="font-bold text-slate-900">{courseName}</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="prep-fio" className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">ФИО</label>
                  <input id="prep-fio" type="text" value={fio} onChange={(e) => setFio(e.target.value)} placeholder="Иванов Иван Иванович" className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:border-[#738CBF] focus:ring-2 focus:ring-[#738CBF]/20 outline-none font-medium" />
                </div>
                <div>
                  <label htmlFor="prep-email" className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Эл. почта</label>
                  <input id="prep-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} onBlur={handleEmailBlur} placeholder="example@mail.ru" className={`w-full px-5 py-4 rounded-2xl border outline-none font-medium ${emailError ? 'border-red-300' : 'border-slate-200 focus:border-[#738CBF] focus:ring-2 focus:ring-[#738CBF]/20'}`} />
                  {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
                </div>
                <div>
                  <label htmlFor="prep-phone" className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Телефон</label>
                  <input id="prep-phone" type="tel" value={phone} onChange={handlePhoneChange} placeholder="+7 (___) ___-__-__" className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:border-[#738CBF] focus:ring-2 focus:ring-[#738CBF]/20 outline-none font-medium" />
                </div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1 w-5 h-5 rounded border-slate-300 text-[#738CBF]" />
                  <span className="text-sm text-slate-600 font-medium">Я соглашаюсь на <a href="#" className="text-[#738CBF] underline">обработку ПД</a> и с <a href="#" className="text-[#738CBF] underline">политикой конфиденциальности</a></span>
                </label>
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={handleClose} className="flex-1 py-4 rounded-2xl font-bold border-2 border-slate-200 text-slate-600 hover:bg-slate-50">
                    Отмена
                  </button>
                  <button type="submit" disabled={!isValid} className="flex-1 bg-[#738CBF] hover:bg-[#5A71A1] disabled:bg-slate-300 disabled:cursor-not-allowed text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs">
                    Записаться
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="py-8 text-center">
              <div className="w-16 h-16 rounded-full bg-[#738CBF]/10 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="text-[#738CBF]" size={36} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-3">Заявка отправлена</h3>
              <p className="text-slate-600 font-medium leading-relaxed mb-8">На вашу эл. почту отправлено письмо с информацией о записи на курс.</p>
              <button type="button" onClick={handleClose} className="bg-[#738CBF] text-white font-bold px-8 py-3 rounded-full hover:bg-[#5A71A1]">
                Закрыть
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PrepCourseModal;
