import { LearningPath } from '../types';

export const LEARNING_PATHS: LearningPath[] = [
  {
    id: 'lp-product-management',
    slug: 'product-management-essentials',
    titleFa: 'مسیر یادگیری مدیریت محصول (Product Management)',
    titleEn: 'Product Management Essentials',
    description: 'اگر تازه وارد دنیای محصول شده‌اید یا می‌خواهید با مفاهیم اصلی از ایده تا بازار آشنا شوید، این مسیر ۱۰ گام اصطلاحات کلیدی را به ترتیب منطقی آموزش می‌دهد.',
    targetAudience: 'مدیران محصول تازه کار، طراحان محصول، کارآفرینان و توسعه‌دهندگانی که می‌خواهند نگرش محصولی پیدا کنند.',
    difficulty: 'beginner',
    startHereTermSlug: 'prd',
    categorySlug: 'product',
    estimatedMinutes: 20,
    steps: [
      {
        stepNumber: 1,
        termSlug: 'prd',
        whyLearnThis: 'پایه و نقطه آغاز ساخت هر ویژگی یا محصول جدید، داشتن یک سند شفاف نیازمندی‌هاست.',
        keyTakeaway: 'بدون PRD، شفافیت در تیم فنی و طراحان وجود نخواهد داشت.'
      },
      {
        stepNumber: 2,
        termSlug: 'persona',
        whyLearnThis: 'قبل از طراحی باید دقیقاً بدانید محصول برای چه کسی ساخته می‌شود.',
        keyTakeaway: 'پرسونا تصویر روشن کاربر هدف شماست.'
      },
      {
        stepNumber: 3,
        termSlug: 'user-story',
        whyLearnThis: 'نیازمندی‌های بزرگ PRD باید به تکه‌های کوچک قابل برنامه‌نویسی خرد شوند.',
        keyTakeaway: 'بیان خواسته کاربر در قالب داستان‌های کوتاه کاربری.'
      },
      {
        stepNumber: 4,
        termSlug: 'acceptance-criteria',
        whyLearnThis: 'برای اینکه بفهمید چه زمانی یک داستان کاربری واقعاً تمام شده است.',
        keyTakeaway: 'معیارهای دقیق پذیرش ویژگی توسط تیم QA و مدیر محصول.'
      },
      {
        stepNumber: 5,
        termSlug: 'mvp',
        whyLearnThis: 'آزمایش سریع فرضیات با حداقل هزینه قبل از صرف سرمایه بزرگ.',
        keyTakeaway: 'ساده‌ترین نسخه‌ای که ارزش اصلی را به کاربر منتقل می‌کند.'
      },
      {
        stepNumber: 6,
        termSlug: 'backlog',
        whyLearnThis: 'مدیریت و اولویت‌بندی تمام کارهایی که باید انجام شوند.',
        keyTakeaway: 'انبار کارهای در صف انتظار برای اسپرینت‌های آینده.'
      },
      {
        stepNumber: 7,
        termSlug: 'roadmap',
        whyLearnThis: 'ارائه چشم‌انداز ۶ ماهه تا ۱ ساله به ذینفعان و مدیران ارشد.',
        keyTakeaway: 'نقشه راه نشان‌دهنده جهت حرکت استراتژیک محصول است.'
      },
      {
        stepNumber: 8,
        termSlug: 'pmf',
        whyLearnThis: 'رسیدن به نقطه‌ای که بازار واقعاً خواهان محصول شماست.',
        keyTakeaway: 'نقطه عطف اساسی قبل از شروع تبلیغات و رشد سریع.'
      },
      {
        stepNumber: 9,
        termSlug: 'ab-testing',
        whyLearnThis: 'تصمیم‌گیری بر اساس رفتار واقعی کاربران به‌جای حدس و سلیقه.',
        keyTakeaway: 'مقایسه دو نسخه برای انتخاب پربازده‌ترین حالت.'
      },
      {
        stepNumber: 10,
        termSlug: 'kpi',
        whyLearnThis: 'سنجش عددی موفقیت ویژگی‌های منتشر شده.',
        keyTakeaway: 'شاخص‌های کلیدی عملکرد برای ارزیابی خروجی.'
      }
    ]
  },
  {
    id: 'lp-digital-marketing',
    slug: 'digital-marketing-metrics',
    titleFa: 'مسیر یادگیری شاخص‌های بازاریابی دیجیتال',
    titleEn: 'Digital Marketing & Growth Metrics',
    description: 'در این مسیر با زبان اعداد و شاخص‌های سودآوری در بازاریابی آنلاین، جذب کاربر و تحلیل کمپین‌ها آشنا می‌شوید.',
    targetAudience: 'بازاریابان دیجیتال، کارشناسان رشد (Growth Packers) و صاحبان کسب‌وکارهای آنلاین.',
    difficulty: 'beginner',
    startHereTermSlug: 'conversion-rate',
    categorySlug: 'marketing',
    estimatedMinutes: 15,
    steps: [
      {
        stepNumber: 1,
        termSlug: 'marketing-funnel',
        whyLearnThis: 'فهم مراحل سفر کاربر از آشنایی تا خرید.',
        keyTakeaway: 'قیف بازاریابی نقشه کلید تبدیل غریبه به مشتری است.'
      },
      {
        stepNumber: 2,
        termSlug: 'lead',
        whyLearnThis: 'جذب افرادی که علاقه اولیه‌شان را نشان داده‌اند.',
        keyTakeaway: 'لیدها سرنخ‌های ارزشمند فروش هستند.'
      },
      {
        stepNumber: 3,
        termSlug: 'ctr',
        whyLearnThis: 'سنجش نرخ جذابیت تبلیغات و عناوین.',
        keyTakeaway: 'نسبت کلیک به نمایش بنر یا لینک.'
      },
      {
        stepNumber: 4,
        termSlug: 'conversion-rate',
        whyLearnThis: 'اندازه‌گیری درصد موفقیت در ترغیب کاربر به خرید.',
        keyTakeaway: 'کلیدی‌ترین شاخص بهینه‌سازی فروشگاه یا لندینگ.'
      },
      {
        stepNumber: 5,
        termSlug: 'cpc',
        whyLearnThis: 'محاسبه هزینه هر کلیک در تبلیغات خریدارمحور.',
        keyTakeaway: 'پایه قیمت‌گذاری تبلیغات گوگل ادز.'
      },
      {
        stepNumber: 6,
        termSlug: 'cac',
        whyLearnThis: 'محاسبه تمام هزینه‌هایی که برای جلب یک مشتری خریدار شده است.',
        keyTakeaway: 'هزینه جذب باید از ارزش طول عمر مشتری کمتر باشد.'
      },
      {
        stepNumber: 7,
        termSlug: 'ltv',
        whyLearnThis: 'محاسبه ارزش کل پولی که مشتری در طول زمان می‌آورد.',
        keyTakeaway: 'نسبت LTV به CAC باید حداقل ۳ باشد.'
      },
      {
        stepNumber: 8,
        termSlug: 'churn-rate',
        whyLearnThis: 'پایش و کاهش ریزش مشتریان قبلی.',
        keyTakeaway: 'ریزش کمتر یعنی رشد پایدارتر.'
      }
    ]
  },
  {
    id: 'lp-startup-finance',
    slug: 'startup-funding-and-finance',
    titleFa: 'مسیر جذب سرمایه و مالی استارتاپ‌ها',
    titleEn: 'Startup Funding & Financial Literacy',
    description: 'اگر قصد راه‌اندازی استارتاپ، صحبت با سرمایه‌گذار و مدیریت بودجه شرکت نوپا را دارید، این مفاهیم را باید مانند موم در دست داشته باشید.',
    targetAudience: 'بنیان‌گذاران استارتاپ، مدیران ارشد مالی و سرمایه‌گذاران فرشته.',
    difficulty: 'intermediate',
    startHereTermSlug: 'runway',
    categorySlug: 'finance',
    estimatedMinutes: 18,
    steps: [
      {
        stepNumber: 1,
        termSlug: 'bootstrapping',
        whyLearnThis: 'شروع کار با سرمایه شخصی بدون وابستگی به سرمایه‌گذار.',
        keyTakeaway: 'حفظ ۱۰۰٪ سهام با رشد تدریجی.'
      },
      {
        stepNumber: 2,
        termSlug: 'burn-rate',
        whyLearnThis: 'کنترل میزان خروج پول ماهانه از حساب شرکت.',
        keyTakeaway: 'نرخ سوزاندن سرمایه تعیین‌کننده طول عمر شرکت است.'
      },
      {
        stepNumber: 3,
        termSlug: 'runway',
        whyLearnThis: 'محاسبه دقیق تعداد ماه‌های باقی‌مانده تا تمام شدن پول.',
        keyTakeaway: 'قبل از رسیدن ران‌وی به زیر ۶ ماه باید جذب سرمایه را شروع کرد.'
      },
      {
        stepNumber: 4,
        termSlug: 'mrr',
        whyLearnThis: 'سنجش درآمدهای ماهانه تکرارشونده.',
        keyTakeaway: 'مهم‌ترین متریک سلامت شرکت‌های اشتراکی.'
      },
      {
        stepNumber: 5,
        termSlug: 'pitch-deck',
        whyLearnThis: 'آماده‌سازی اسلایدهای جذاب برای ارائه به سرمایه‌گذاران.',
        keyTakeaway: 'سند اصلی معرف شرکت در اولین جلسه.'
      },
      {
        stepNumber: 6,
        termSlug: 'vc',
        whyLearnThis: 'شناخت صندوق‌های سرمایه‌گذاری خطرپذیر.',
        keyTakeaway: 'تامین‌کنندگان اصلی سرمایه‌های کلان رشد.'
      },
      {
        stepNumber: 7,
        termSlug: 'term-sheet',
        whyLearnThis: 'بررسی پیش‌نویس توافقنامه و شرایط سرمایه‌گذاری.',
        keyTakeaway: 'تعیین ارزش‌گذاری، سهم و صندلی هیئت مدیره.'
      },
      {
        stepNumber: 8,
        termSlug: 'cap-table',
        whyLearnThis: 'ثبت و مدیریت سهم سهام‌داران و بنیان‌گذاران.',
        keyTakeaway: 'جدول دقیق درصد مالکیت افراد پس از جذب سرمایه.'
      }
    ]
  },
  {
    id: 'lp-generative-ai',
    slug: 'generative-ai-and-llms',
    titleFa: 'مسیر هوش مصنوعی مولد و مدل‌های زبانی',
    titleEn: 'Generative AI & LLM Engineering',
    description: 'مفاهیم پایه تا پیشرفته تکنولوژی‌های جدید هوش مصنوعی مانند LLMها، پرامپت‌نویسی و معماری RAG.',
    targetAudience: 'برنامه‌نویسان، توسعه‌دهندگان AI و علاقمندان به فناوری‌های نوظهور.',
    difficulty: 'intermediate',
    startHereTermSlug: 'llm',
    categorySlug: 'ai',
    estimatedMinutes: 15,
    steps: [
      {
        stepNumber: 1,
        termSlug: 'generative-ai',
        whyLearnThis: 'فهم چیستی هوش مصنوعی مولد محتوا.',
        keyTakeaway: 'هوش مصنوعی که متن، تصویر، کد و صدا خلق می‌کند.'
      },
      {
        stepNumber: 2,
        termSlug: 'llm',
        whyLearnThis: 'شناخت مدل‌های زبانی بزرگ که قدرت تفکر متنی دارند.',
        keyTakeaway: 'موتور اصلی چت‌بات‌های پیشرفته مانند Gemini.'
      },
      {
        stepNumber: 3,
        termSlug: 'token',
        whyLearnThis: 'واحد پردازش و محاسبه هزینه مدل‌های هوش مصنوعی.',
        keyTakeaway: 'تکه‌های کوچک متنی که مدل می‌خواند و تولید می‌کند.'
      },
      {
        stepNumber: 4,
        termSlug: 'prompt-engineering',
        whyLearnThis: 'طراحی دقیق دستورات برای گرفتن پاسخ‌های ایده‌آل.',
        keyTakeaway: 'هنر درست صحبت کردن و گرفتن خروجی بدون خطا.'
      },
      {
        stepNumber: 5,
        termSlug: 'rag',
        whyLearnThis: 'اتصال هوش مصنوعی به فایل‌ها و دیتابیس محرمانه سازمان.',
        keyTakeaway: 'پاسخگویی دقیق بدون توهم بر اساس منابع اختصاصی.'
      },
      {
        stepNumber: 6,
        termSlug: 'vector-database',
        whyLearnThis: 'پایگاه داده برداری برای ذخیره و جستجوی مفهومی متون.',
        keyTakeaway: 'زیرساخت اصلی جستجوی معنایی و سیستم‌های RAG.'
      },
      {
        stepNumber: 7,
        termSlug: 'ai-agent',
        whyLearnThis: 'عامل‌های خودمختار که کارهای چندمرحله‌ای انجام می‌دهند.',
        keyTakeaway: 'نسل جدید ابزارهای هوشمند مستقل.'
      }
    ]
  }
];
