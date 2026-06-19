import { type SchemaTypeDefinition } from 'sanity'
import { destinationType } from './destinationType'
import { packageType } from './packageType'
import { testimonialType } from './testimonialType'
import { blogType } from './blogType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [destinationType, packageType, testimonialType, blogType],
}
