import { type SchemaTypeDefinition } from 'sanity'
import { eventSchema } from './event'
import { newsletterSchema } from './newsletter'
import { sponsorSchema } from './sponsor'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [eventSchema, newsletterSchema, sponsorSchema],
}
