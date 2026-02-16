import React, { useState, useCallback } from 'react';
import { X, Calendar, CheckCircle2 } from 'lucide-react';
import { EducationLevel } from '../types';

const OPEN_DAY_DATES = [
  { id: '1', label: '25 марта 2026, 18:00 (онлайн)' },
  { id: '2', label: '15 апреля 2026, 14:00 (очно)' },
  { id: '3', label: '20 мая 2026, 18:00 (онлайн)' },
];

const DIRECTION_OPTIONS = Object.values(EducationLevel);

const BASE_EDUCATION_OPTIONS = [
  { value: '', label: 'Не выбрано' },
  { value: 'basic', label: 'Основное общее образование (9 классов)' },
  { value: 'secondary', label: 'Среднее общее образование (11 классов)' },
];

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, '');
  const d = (digits[0] === '8' || digits[0] === '7' ? digits.slice(1) : digits).slice(0, 10);
  if (d.length === 0) return '';
  let s = '+7';
  if (d.length > 0) s += ' (' + d.slice(0, 3);
  if (d.length >= 3) s += ') ' + d.slice(3, 6);
  if (d.length >= 6) s += '-' + d.slice(6, 8);
  if (d.length >= 8) s += '-' + d.slice(8, 10);
  return s;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface OpenDayModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const OpenDayModal: React.FC<OpenDayModalProps> = ({ isOpen, onClose }) => {
  const [dateId, setDateId] = useState(OPEN_DAY_DATES[0].id);
  const [directions, setDirections] = useState<string[]>([]);
  const [baseEducation, setBaseEducation] = useState('');
  const [fio, setFio] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [emailError, setEmailError] = useState('');

  const hasContact = phone.replace(/\D/g, '').length >= 10 || emailRegex.test(email);
  const isValid = fio.trim() && hasContact && consent && emailError === '';

  const toggleDirection = (d: string) => {
    setDirections((prev) => (prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]));
  };

  const handleEmailBlur = () => {
    if (email && !emailRegex.test(email)) setEmailError('Введите корректный адрес эл. почты');
    else setEmailError('');
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhone(e.target.value));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailRegex.test(email) && email) setEmailError('Введите корректный адрес эл. почты');
    if (!isValid) return;
    setSubmitted(true);
  };

  const handleClose = useCallback(() => {
    onClose();
    setTimeout(() => {
      setDateId(OPEN_DAY_DATES[0].id);
      setDirections([]);
      setBaseEducation('');
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={handleClose} role="dialog" aria-modal="true" aria-labelledby="open-day-title">
      <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="p-8 relative">
          <button type="button" onClick={handleClose} className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:bg-slate-100" aria-label="Закрыть">
            <X size={22} />
          </button>

          {!submitted ? (
            <>
              <h2 id="open-day-title" className="text-2xl font-black text-slate-900 pr-10 mb-2 flex items-center gap-2">
                <Calendar className="text-[#738CBF]" size={28} />
                День открытых дверей
              </h2>
              <p className="text-slate-500 text-sm font-medium mb-6">Заполните форму — мы пришлём подтверждение на почту с адресом и информацией «Как до нас добраться».</p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Дата</label>
                  <div className="space-y-2">
                    {OPEN_DAY_DATES.map((d) => (
                      <label key={d.id} className="flex items-center gap-3 cursor-pointer">
                        <input type="radio" name="date" checked={dateId === d.id} onChange={() => setDateId(d.id)} className="text-[#738CBF]" />
                        <span className="font-medium text-slate-800">{d.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Направление обучения (можно несколько)</label>
                  <div className="flex flex-wrap gap-2">
                    {DIRECTION_OPTIONS.map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => toggleDirection(d)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${directions.includes(d) ? 'bg-[#738CBF] text-white border-[#738CBF]' : 'bg-slate-50 border-slate-200 text-slate-600'}`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="open-day-base" className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Базовое образование</label>
                  <select
                    id="open-day-base"
                    value={baseEducation}
                    onChange={(e) => setBaseEducation(e.target.value)}
                    className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:border-[#738CBF] focus:ring-2 focus:ring-[#738CBF]/20 outline-none font-medium text-slate-900"
                  >
                    {BASE_EDUCATION_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="open-day-fio" className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">ФИО</label>
                  <input id="open-day-fio" type="text" value={fio} onChange={(e) => setFio(e.target.value)} placeholder="Иванов Иван Иванович" required className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:border-[#738CBF] focus:ring-2 focus:ring-[#738CBF]/20 outline-none font-medium" />
                </div>

                <div>
                  <label htmlFor="open-day-email" className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Эл. почта</label>
                  <input id="open-day-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} onBlur={handleEmailBlur} placeholder="example@mail.ru" className={`w-full px-5 py-4 rounded-2xl border outline-none font-medium ${emailError ? 'border-red-300 focus:border-red-500' : 'border-slate-200 focus:border-[#738CBF] focus:ring-2 focus:ring-[#738CBF]/20'}`} />
                  {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
                </div>

                <div>
                  <label htmlFor="open-day-phone" className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Телефон</label>
                  <input id="open-day-phone" type="tel" value={phone} onChange={handlePhoneChange} placeholder="+7 (___) ___-__-__" className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:border-[#738CBF] focus:ring-2 focus:ring-[#738CBF]/20 outline-none font-medium" />
                </div>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1 w-5 h-5 rounded border-slate-300 text-[#738CBF]" />
                  <span className="text-sm text-slate-600 font-medium">Я соглашаюсь на <a href="#" className="text-[#738CBF] underline">обработку ПД</a> и с <a href="#" className="text-[#738CBF] underline">политикой конфиденциальности</a></span>
                </label>

                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={handleClose} className="flex-1 py-4 rounded-2xl font-bold border-2 border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors">
                    Отмена
                  </button>
                  <button type="submit" disabled={!isValid} className="flex-1 bg-[#738CBF] hover:bg-[#5A71A1] disabled:bg-slate-300 disabled:cursor-not-allowed text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all">
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
              <h3 className="text-2xl font-black text-slate-900 mb-3">Вы записаны на день открытых дверей</h3>
              <p className="text-slate-600 font-medium leading-relaxed mb-2">
                На вашу эл. почту отправлено письмо с подтверждением записи, адресом СЗУ и информацией «Как до нас добраться».
              </p>
              <p className="text-slate-500 text-sm mb-8">Санкт-Петербург, ул. Кавалергардская, д. 7, лит. А</p>
              <button type="button" onClick={handleClose} className="bg-[#738CBF] text-white font-bold px-8 py-3 rounded-full hover:bg-[#5A71A1] transition-colors">
                Закрыть
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OpenDayModal;
