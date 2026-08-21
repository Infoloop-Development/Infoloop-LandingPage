import type { GlobalConfig } from 'payload'
import { anyone, authenticated } from '../access'
import { link } from '../fields'

/** /products index copy. Mirrors web/src/content/products.ts (ProductsIndex). */
export const ProductsPage: GlobalConfig = {
  slug: 'products-page',
  label: 'Products page',
  access: { read: anyone, update: authenticated },
  admin: { group: 'Pages' },
  fields: [
    { name: 'h1', type: 'text' },
    { name: 'lede', type: 'textarea' },
    { name: 'cta', type: 'group', fields: [{ name: 'h2', type: 'text' }, { name: 'lede', type: 'textarea' }, link('button')] },
    { name: 'seo', type: 'group', fields: [{ name: 'title', type: 'text', maxLength: 60 }, { name: 'description', type: 'textarea', maxLength: 158 }] },
  ],
}
