import { connectDb } from '../config/db.js'
import Setting from '../models/Setting.js'
import Page from '../models/Page.js'
import Banner from '../models/Banner.js'

const SITE = 'https://aventcompany.shop'

const settings = [
  { key: 'phone', value: '+7 (900) 000-00-00' },
  { key: 'email', value: 'info@avent-shop.ru' },
  { key: 'address', value: 'г. Москва, ул. Примерная, д. 1' },
  { key: 'work_time', value: 'Пн–Пт: 9:00 – 18:00' },
]

const pages = [
  { key: 'services', label: 'Услуги', visible: true },
  { key: 'brands', label: 'Бренды', visible: true },
  { key: 'contacts', label: 'Контакты', visible: true },
  { key: 'delivery', label: 'Доставка', visible: true },
  { key: 'privacy', label: 'Политика конфиденциальности', visible: true },
  { key: 'terms', label: 'Условия использования', visible: true },
]

const banners = [
  {
    title: 'Климат-контроль нового поколения',
    subtitle: 'Интеллектуальные системы кондиционирования для дома и офиса',
    image: {
      mobile: `${SITE}/img/banner-1.svg`,
      tablet: `${SITE}/img/banner-1.svg`,
      desktop: `${SITE}/img/banner-1.svg`,
    },
    link: '/products',
    visible: true,
    order: 0,
  },
  {
    title: 'Прецизионный комфорт каждый день',
    subtitle: 'Лучшие бренды климатической техники — Daikin, Mitsubishi, LG',
    image: {
      mobile: `${SITE}/img/banner-2.svg`,
      tablet: `${SITE}/img/banner-2.svg`,
      desktop: `${SITE}/img/banner-2.svg`,
    },
    link: '/brands',
    visible: true,
    order: 1,
  },
  {
    title: 'Монтаж под ключ',
    subtitle: 'Профессиональная установка с гарантией 3 года',
    image: {
      mobile: `${SITE}/img/banner-3.svg`,
      tablet: `${SITE}/img/banner-3.svg`,
      desktop: `${SITE}/img/banner-3.svg`,
    },
    link: '/services',
    visible: false,
    order: 2,
  },
]

await connectDb()

await Setting.deleteMany({})
await Setting.insertMany(settings)
console.log('✅ Settings seeded')

await Page.deleteMany({})
await Page.insertMany(pages)
console.log('✅ Pages seeded')

await Banner.deleteMany({})
await Banner.insertMany(banners)
console.log('✅ Banners seeded')

process.exit(0)
