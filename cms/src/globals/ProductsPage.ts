import type { GlobalConfig } from 'payload'
import { anyone } from '../access'
import { editorAccess, hideUnlessCategory } from '../access/permissions'
import { link, seo } from '../fields'

/** /products index copy. Mirrors web/src/content/products.ts (ProductsIndex). */
export const ProductsPage: GlobalConfig = {
  slug: 'products-page',
  label: 'Products page',
  access: { read: anyone, update: editorAccess('products') },
  admin: { group: 'Pages', hidden: hideUnlessCategory('products') },
  fields: [
    { name: 'h1', type: 'text' },
    { name: 'lede', type: 'textarea' },
    { name: 'cta', type: 'group', fields: [{ name: 'h2', type: 'text' }, { name: 'lede', type: 'textarea' }, link('button')] },
    seo,
  ],
}
