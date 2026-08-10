import { Category } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: 'cat-jobs',
    slug: 'jobs',
    titleFa: 'موقعیت‌های شغلی',
    titleEn: 'Job Titles',
    description: 'عنوان‌های شغلی مدرن، نقش‌ها، مسئولیت‌ها و سطوح کاری افراد در سازمان‌ها',
    iconName: 'UserCheck',
    color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20'
  },
  {
    id: 'cat-business',
    slug: 'business',
    titleFa: 'کسب‌وکار',
    titleEn: 'Business',
    description: 'اصطلاحات عمومی تجارت، مدل‌های درآمدی و مفاهیم بنیادی دنیای کسب‌وکار',
    iconName: 'Briefcase',
    color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
  },
  {
    id: 'cat-management',
    slug: 'management',
    titleFa: 'مدیریت',
    titleEn: 'Management',
    description: 'راهبری سازمان، شاخص‌های کلیدی عملکرد، استراتژی و رهبری تیم‌ها',
    iconName: 'Users',
    color: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20'
  },
  {
    id: 'cat-startup',
    slug: 'startup',
    titleFa: 'استارتاپ',
    titleEn: 'Startup',
    description: 'مفاهیم دنیای کارآفرینی، رشد سریع، جذب سرمایه، اعتبارسنجی و شتاب‌دهی',
    iconName: 'Rocket',
    color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
  },
  {
    id: 'cat-product',
    slug: 'product',
    titleFa: 'محصول',
    titleEn: 'Product',
    description: 'توسعه محصول، نقشه راه، بک‌لاگ، متدولوژی‌های چابک و مدیریت ویژگی‌ها',
    iconName: 'Layers',
    color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20'
  },
  {
    id: 'cat-technology',
    slug: 'technology',
    titleFa: 'فناوری و برنامه‌نویسی',
    titleEn: 'Technology & Dev',
    description: 'زیرساخت‌های دیجیتال، نرم‌افزار، معماری سیستم‌ها، رایانش ابری و ابزارها',
    iconName: 'Cpu',
    color: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20',
    subcategories: [
      { id: 'sub-programming', titleFa: 'برنامه‌نویسی', titleEn: 'Programming' },
      { id: 'sub-cloud', titleFa: 'رایانش ابری', titleEn: 'Cloud' },
      { id: 'sub-devops', titleFa: 'دواپس و زیرساخت', titleEn: 'DevOps' },
      { id: 'sub-cybersecurity', titleFa: 'امنیت سایبری', titleEn: 'Cybersecurity' }
    ]
  },
  {
    id: 'cat-marketing',
    slug: 'marketing',
    titleFa: 'بازاریابی',
    titleEn: 'Marketing',
    description: 'جذب مخاطب، قیف فروش، بازاریابی دیجیتال، کمپین‌ها و رفتار مشتری',
    iconName: 'TrendingUp',
    color: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
    subcategories: [
      { id: 'sub-digital-marketing', titleFa: 'بازاریابی دیجیتال', titleEn: 'Digital Marketing' },
      { id: 'sub-content-marketing', titleFa: 'بازاریابی محتوایی', titleEn: 'Content Marketing' },
      { id: 'sub-performance-marketing', titleFa: 'بازاریابی عملکردی', titleEn: 'Performance Marketing' }
    ]
  },
  {
    id: 'cat-sales',
    slug: 'sales',
    titleFa: 'فروش',
    titleEn: 'Sales',
    description: 'فرآیندهای فروش، لیدها، مذاکره، ارزش دوره حیات مشتری و بستن قرارداد',
    iconName: 'DollarSign',
    color: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20'
  },
  {
    id: 'cat-design',
    slug: 'design',
    titleFa: 'طراحی و UI/UX',
    titleEn: 'Design & UI/UX',
    description: 'تجربه کاربر، رابط کاربری، تحقیقات کاربر، سیستم طراحی و پروتوتایپ',
    iconName: 'Palette',
    color: 'bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20',
    subcategories: [
      { id: 'sub-ui', titleFa: 'رابط کاربری (UI)', titleEn: 'UI' },
      { id: 'sub-ux', titleFa: 'تجربه کاربری (UX)', titleEn: 'UX' },
      { id: 'sub-design-system', titleFa: 'سیستم‌های طراحی', titleEn: 'Design Systems' }
    ]
  },
  {
    id: 'cat-finance',
    slug: 'finance',
    titleFa: 'مالی و اقتصاد',
    titleEn: 'Finance & Economics',
    description: 'صورت‌های مالی، نرخ بازگشت سرمایه، حسابداری، بودجه‌بندی و ارزش‌گذاری',
    iconName: 'PieChart',
    color: 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20'
  },
  {
    id: 'cat-hr',
    slug: 'hr',
    titleFa: 'منابع انسانی',
    titleEn: 'Human Resources',
    description: 'آنبوردینگ، فرهنگ سازمانی، جذب و استخدام، نگهداری نیرو و ارزیابی',
    iconName: 'HeartHandshake',
    color: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20'
  },
  {
    id: 'cat-ai',
    slug: 'ai',
    titleFa: 'هوش مصنوعی و داده',
    titleEn: 'AI & Data',
    description: 'هوش مصنوعی مولد، یادگیری ماشین، مهندسی پرامپت، تحلیل داده و اتوماسیون',
    iconName: 'Sparkles',
    color: 'bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20'
  },
  {
    id: 'cat-project',
    slug: 'project-management',
    titleFa: 'مدیریت پروژه',
    titleEn: 'Project Management',
    description: 'اسپرینت، اسکرام، متدولوژی چابک، مدیریت ذینفعان و زمان‌بندی',
    iconName: 'Clock',
    color: 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20'
  },
  {
    id: 'cat-seo',
    slug: 'seo',
    titleFa: 'سئو و برندسازی',
    titleEn: 'SEO & Branding',
    description: 'بهینه‌سازی موتورهای جستجو، هویت بصری، تبلیغات و آگاهی از برند',
    iconName: 'Search',
    color: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20'
  },
  {
    id: 'cat-operations',
    slug: 'operations',
    titleFa: 'عملیات و حقوقی',
    titleEn: 'Operations & Legal',
    description: 'فرآیندهای پشتیبانی، زنجیره تامین، قوانین کاری، قراردادها و ارتباطات سازمانی',
    iconName: 'ShieldCheck',
    color: 'bg-stone-500/10 text-stone-600 dark:text-stone-400 border-stone-500/20'
  }
];

