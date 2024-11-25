import { defineField, defineType } from "sanity";

export const memberSchema = defineType({
  name: 'team',
  title: 'Team',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Team Name',
      type: 'string',
      validation: (Rule) => Rule.required().error('Team name is required'),
    }),
    defineField({
      name: 'sectionId',
      title: 'Section ID',
      type: 'string',
      description: 'A unique ID for the section (used for navigation)',
      validation: (Rule) => Rule.required().error('Section ID is required'),
    }),
    defineField({
      name: 'members',
      title: 'Members',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'member' } }],
      description: 'Members (uses Member schema) of team',
    }),
  ],
})