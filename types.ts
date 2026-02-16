
export enum EducationLevel {
  SPO = 'СПО (Колледж)',
  BACHELOR = 'Бакалавриат',
  SPECIALIST = 'Специалитет',
  MASTER = 'Магистратура',
  POSTGRADUATE = 'Аспирантура',
  DPO = 'Доп. образование'
}

export enum StudyFormat {
  FULL_TIME = 'Очная',
  PART_TIME = 'Очно-заочная',
  REMOTE = 'Заочная',
  ONLINE = 'Онлайн'
}

export interface Program {
  id: string;
  code: string;
  level: EducationLevel;
  name: string;
  specialization: string;
  duration: string;
  durationValue: number; // For filtering
  price: number;
  format: StudyFormat[];
  exams: string;
  passingScore: number;
  description: string;
  /** Доп. теги для карточки (напр. "Подготовительные курсы") */
  tags?: string[];
}

export interface Advantage {
  title: string;
  shortDesc: string;
  fullDesc: string;
  icon: string;
  color?: string;
}

/** Расширенный контент для страницы программы (шаблон из ТЗ) */
export interface ProgramPageContent {
  descriptionParagraphs?: string[]; // 1–2 абзаца, если нужно дополнить program.description
  targetAudience: string[]; // 3–5 буллетов «Кому подойдёт»
  whySzu: string[]; // 3–4 тезиса «Почему именно эта программа в СЗУ»
  features: string[]; // 3–6 тезисов «Отличительные особенности»
  skills: string[]; // 6–10 навыков языком рынка труда
  practice: string; // «Практика и проекты» — текст
  careers: string[]; // 4–8 должностей «Кем вы сможете работать»
}
