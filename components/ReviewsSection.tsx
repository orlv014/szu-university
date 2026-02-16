import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const REVIEWS = [
  {
    id: 1,
    name: 'Александр Иванов',
    program: 'Бизнес-информатика, 4 курс',
    text: 'СЗУ помог мне совмещать работу в IT и получение высшего образования. Гибкий график — это спасение. Преподаватели дают актуальный материал, много практических кейсов от реальных компаний.',
  },
  {
    id: 2,
    name: 'Мария Козлова',
    program: 'Дизайн, магистратура',
    text: 'Поступала после другого вуза — перезачли дисциплины без лишней волокиты. Учёба в центре Петербурга, рядом с музеями и галереями, очень вдохновляет. Куратор всегда на связи, с любым вопросом можно обратиться.',
  },
  {
    id: 3,
    name: 'Дмитрий Петров',
    program: 'Юриспруденция, 3 курс',
    text: 'Учился на заочном, работал полный день. Рассрочка оплаты без переплат — платил помесячно. Диплом государственного образца, уже проходил практику в юридическом отделе — документ приняли без вопросов.',
  },
  {
    id: 4,
    name: 'Елена Смирнова',
    program: 'Психология, бакалавриат',
    text: 'Выбрала СЗУ из-за сильного практического блока и преподавателей-психологов из клиник и НКО. Программа современная, много про работу с людьми и этику. Готовлюсь к поступлению в магистратуру.',
  },
  {
    id: 5,
    name: 'Анна Волкова',
    program: 'Архитектура, 2 курс',
    text: 'Мечтала об архитектуре, но не могла учиться очно из-за семьи. В СЗУ нашла очно-заочный формат: ключевые занятия по выходным, остальное в своём темпе. Качество образования не уступает государственным вузам.',
  },
  {
    id: 6,
    name: 'Игорь Новиков',
    program: 'Реставрация архитектуры',
    text: 'Пришёл из колледжа, продолжил в бакалавриате. Преподают реставраторы с реальными объектами в Петербурге. Практика на памятниках — бесценный опыт. Рекомендую тем, кто хочет работать с наследием.',
  },
  {
    id: 7,
    name: 'Ольга Федорова',
    program: 'Менеджмент, выпуск 2024',
    text: 'Получила диплом и через месяц вышла на позицию в культурном проекте. В учёбе помогли кейсы от партнёров вуза и помощь карьерного центра. СЗУ даёт не только корочку, но и реальные навыки под рынок.',
  },
];

const ReviewsSection: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 2);
    const cardWidth = el.clientWidth * 0.9 + 32;
    const newIndex = Math.round(el.scrollLeft / cardWidth);
    setIndex(Math.min(newIndex, REVIEWS.length - 1));
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateScrollState);
    window.addEventListener('resize', updateScrollState);
    return () => {
      el.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, []);

  const scroll = (dir: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const step = el.clientWidth * 0.9;
    el.scrollBy({ left: dir === 'left' ? -step : step, behavior: 'smooth' });
  };

  return (
    <section className="py-24 bg-[#F8FAFC]">
      <div className="container mx-auto px-6 max-w-[1400px]">
        <div className="flex items-end justify-between gap-6 mb-12 flex-wrap">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-slate-100 text-[10px] font-black uppercase tracking-widest text-[#738CBF] mb-4 shadow-sm">
              <Quote size={12} />
              Отзывы
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight">
              Отзывы студентов
            </h2>
            <p className="text-lg text-slate-500 font-medium mt-3 max-w-xl">
              Что говорят те, кто уже учится или закончил СЗУ.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className="w-12 h-12 rounded-full border-2 border-slate-200 text-slate-400 flex items-center justify-center hover:border-[#738CBF] hover:text-[#738CBF] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              aria-label="Предыдущий отзыв"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              type="button"
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className="w-12 h-12 rounded-full border-2 border-slate-200 text-slate-400 flex items-center justify-center hover:border-[#738CBF] hover:text-[#738CBF] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              aria-label="Следующий отзыв"
            >
              <ChevronRight size={22} />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-8 overflow-x-auto overflow-y-hidden pb-4 scroll-smooth scroll-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {REVIEWS.map((review) => (
            <article
              key={review.id}
              className="flex-shrink-0 w-[85vw] sm:w-[70vw] md:w-[45vw] lg:w-[380px] bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-[#738CBF]/10 flex items-center justify-center shrink-0">
                  <Quote size={20} className="text-[#738CBF]" />
                </div>
                <div>
                  <p className="font-black text-slate-900">{review.name}</p>
                  <p className="text-sm text-[#738CBF] font-bold uppercase tracking-wider">{review.program}</p>
                </div>
              </div>
              <p className="text-slate-600 font-medium leading-relaxed italic">{review.text}</p>
            </article>
          ))}
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {REVIEWS.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                const el = scrollRef.current;
                if (!el) return;
                const cardWidth = el.clientWidth * 0.85 + 32;
                el.scrollTo({ left: cardWidth * i, behavior: 'smooth' });
              }}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${index === i ? 'bg-[#738CBF] scale-110' : 'bg-slate-200 hover:bg-slate-300'}`}
              aria-label={`Отзыв ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
