import { type SchemaTypeDefinition } from 'sanity'
import { destinationType } from './destinationType'
import { packageType } from './packageType'
import { testimonialType } from './testimonialType'
import { blogType } from './blogType'
import { inquiryType } from './inquiryType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [destinationType, packageType, testimonialType, blogType, inquiryType],
}
