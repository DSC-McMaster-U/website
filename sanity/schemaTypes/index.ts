import { type SchemaTypeDefinition } from 'sanity'
import { eventSchema } from './event'
import { newsletterSchema } from './newsletter'
import { sponsorSchema } from './sponsor'
import { teamSchema } from './team'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [eventSchema, newsletterSchema, sponsorSchema, teamSchema],
}
