<div align="center">

# نون ویکی — Noun Wiki

**دانشنامه اصطلاحات دنیای کار، کسب‌وکار، فناوری و مدیریت**

A Persian workplace & business knowledge base with 140+ terms, fuzzy search, comparisons, learning paths, and knowledge clusters.

</div>

---

## امکانات / Features

- **۱۴۰+ اصطلاح** در دسته‌بندی‌های شغلی، کسب‌وکار، مدیریت، محصول، فناوری، بازاریابی، فروش، مالی، منابع انسانی و هوش مصنوعی
- **جستجوی هوشمند**: تطبیق فازی فارسی، پیشنهاد «منظورت این بود؟» و تشخیص قصد جستجو (اصطلاح / مقایسه / مسیر یادگیری / دسته)
- **جدول مقایسه اصطلاحات** (مثلاً KPI vs OKR)، **مسیرهای یادگیری** گام‌به‌گام و **خوشه‌های دانش**
- **نشان‌شده‌ها** و **اخیراً دیده‌شده** (ذخیره محلی در localStorage)
- رابط کاملاً **راست‌به‌چپ** با پشتیبانی هم‌زمان انگلیسی، حالت تاریک/روشن
- صفحه **پایش سلامت محتوا** برای اعتبارسنجی پیوندهای دانشنامه

## اجرای محلی / Run locally

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run lint     # typecheck (tsc --noEmit)
npm run build    # production build → dist/
```

## استقرار / Deployment

پروژه یک SPA کاملاً ایستا است (hash-based routing) و روی هر هاست استاتیک اجرا می‌شود.
در مخزن یک [workflow گیت‌هاب اکشن](.github/workflows/deploy.yml) برای انتشار خودکار روی **GitHub Pages** با دامنه `wiki.nounproject.ir` قرار دارد.

## ساختار / Project structure

```
src/
├── components/    کامپوننت‌های UI (Header, SearchModal, TermCard, ...)
├── pages/         صفحات (Home, Terms, TermDetail, Compare, LearningPath, Cluster, ...)
├── data/
│   ├── terms/     محتوای اصطلاحات بر اساس دسته
│   ├── categoriesData.ts
│   ├── comparisonsData.ts
│   ├── learningPathsData.ts
│   └── clustersData.ts
├── repositories/  termRepository (جستجو، رتبه‌بندی، اعتبارسنجی)
├── services/      سرویس پیشنهاد اصطلاح
├── hooks/         useRouter, useFavorites, useTheme, useRecentlyViewed
└── utils/         عادی‌سازی فارسی و اعتبارسنجی محتوا
```

## ملاحظات فنی

- **فونت**: IRANYekanX به‌صورت محلی (با CDN پشتیبان) در `public/fonts`
- **مسیریابی**: hash-based (`#/term/...`) برای سازگاری با هاست استاتیک
- **دیتا**: فهرست اصطلاحات به‌صورت ماژولار و deduplicated بر اساس `slug` در `src/data/terms/index.ts`

## مجوز / License

Copyright © Noun Wiki. All rights reserved.