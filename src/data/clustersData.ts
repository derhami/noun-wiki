import { KnowledgeCluster } from '../types';

export const KNOWLEDGE_CLUSTERS: KnowledgeCluster[] = [
  {
    id: 'cluster-product-management',
    slug: 'product-management-cluster',
    titleFa: 'خوشه دانش: مدیریت و تفکر محصولی',
    titleEn: 'Product Management & Lifecycle',
    description: 'تمام آنچه برای درک فرایند ساخت محصول، نیازمندی‌ها، متدولوژی‌های چابک و سنجش موفقیت نیاز دارید.',
    iconName: 'Boxes',
    coreTerms: ['prd', 'mvp', 'roadmap', 'user-story', 'acceptance-criteria', 'persona', 'backlog', 'sprint', 'scrum', 'kpi', 'okr', 'a-b-testing', 'pmf'],
    relatedJobs: ['product-manager', 'product-owner', 'scrum-master'],
    learningPathSlug: 'product-management-essentials',
    featuredComparisons: ['kpi-vs-okr']
  },
  {
    id: 'cluster-growth-marketing',
    slug: 'growth-marketing-cluster',
    titleFa: 'خوشه دانش: دیجیتال مارکتینگ و رشد',
    titleEn: 'Digital Marketing & Growth Engineering',
    description: 'مجموعه مفاهیم جذب مخاطب، بهینه‌سازی قیف فروش، بازاریابی محتوایی و شاخص‌های کلیدی درآمدی.',
    iconName: 'TrendingUp',
    coreTerms: ['conversion-rate', 'cac', 'ltv', 'ctr', 'cpc', 'marketing-funnel', 'lead', 'churn-rate', 'seo', 'inbound-marketing'],
    relatedJobs: ['digital-marketing-manager', 'growth-hacker', 'seo-specialist'],
    learningPathSlug: 'digital-marketing-metrics',
    featuredComparisons: ['cac-vs-cpa', 'b2b-vs-b2c']
  },
  {
    id: 'cluster-startup-finance',
    slug: 'startup-finance-cluster',
    titleFa: 'خوشه دانش: سرمایه‌گذاری و مالی استارتاپ',
    titleEn: 'Startup Venture & Finance',
    description: 'اصطلاحات مربوط به جذب سرمایه، ارزش‌گذاری استارتاپ، سلامت مالی و صورت‌های سود و زیان.',
    iconName: 'Coins',
    coreTerms: ['burn-rate', 'runway', 'mrr', 'arr', 'vc', 'pitch-deck', 'term-sheet', 'cap-table', 'bootstrapping', 'ebitda'],
    relatedJobs: ['ceo', 'cfo', 'venture-capitalist'],
    learningPathSlug: 'startup-funding-and-finance',
    featuredComparisons: ['mrr-vs-arr']
  },
  {
    id: 'cluster-ai-engineering',
    slug: 'ai-engineering-cluster',
    titleFa: 'خوشه دانش: هوش مصنوعی و مهندسی داده',
    titleEn: 'AI & Data Engineering',
    description: 'اصطلاحات تخصصی مدل‌های زبانی بزرگ، پردازش زبان طبیعی، معماری‌های مبتنی بر RAG و یادگیری ماشین.',
    iconName: 'Brain',
    coreTerms: ['llm', 'generative-ai', 'rag', 'fine-tuning', 'prompt-engineering', 'vector-database', 'token', 'ai-agent'],
    relatedJobs: ['ai-engineer', 'prompt-engineer', 'data-scientist'],
    learningPathSlug: 'generative-ai-and-llms',
    featuredComparisons: ['rag-vs-fine-tuning']
  },
  {
    id: 'cluster-software-architecture',
    slug: 'software-architecture-cluster',
    titleFa: 'خوشه دانش: توسعه نرم‌افزار و زیرساخت',
    titleEn: 'Software Architecture & DevOps',
    description: 'معماری سامانه‌های نرم‌افزاری، سرویس‌های ابری، ارتباطات API و روش‌های استقرار مداوم.',
    iconName: 'Code2',
    coreTerms: ['api', 'sdk', 'microservices', 'cicd', 'docker', 'kubernetes', 'refactoring', 'tech-debt'],
    relatedJobs: ['cto', 'software-engineer', 'devops-engineer'],
    featuredComparisons: ['api-vs-sdk']
  }
];
