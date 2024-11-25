import { defineField, defineType } from "sanity";

export const memberSchema = defineType({
  name: 'member',
  title: 'Member',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'The name of the member',
      validation: (Rule) => Rule.required().error('Member name is required'),
    }),
    defineField({
      name: 'position',
      title: 'Position',
      type: 'string',
      description: 'The position of the member in the GDSC',
      validation: (Rule) => Rule.required().error('Member position is required'),
    }),
    defineField({
      name: 'hoverContent',
      title: 'Hover Content',
      type: 'text',
      description: 'Content to appear when mouse hovers on member card',
    }),
    defineField({
      name: 'picture',
      title: 'Member Picture',
      type: 'image',
      options: {
        hotspot: true, // Allows cropping for better focus
      },
      description: 'The image that appears for the member card',
    }),
  ],
})