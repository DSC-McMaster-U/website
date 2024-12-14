import { type SchemaTypeDefinition } from 'sanity'
import { eventSchema } from './event'
import { newsletterSchema } from './newsletter'
import { sponsorSchema } from './sponsor'
import { teamSchema } from './team'
import { aboutSchema } from './about'
import { generalInfoSchema } from './generalInfo'


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [aboutSchema, eventSchema, newsletterSchema, sponsorSchema, teamSchema, generalInfoSchema],
}
