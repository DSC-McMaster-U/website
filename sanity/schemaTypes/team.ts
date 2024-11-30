import { defineField, defineType } from "sanity";

export const teamSchema = defineType({
  name: "team",
  title: "Team",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Team Name",
      type: "string",
      validation: (Rule) => Rule.required().error("Team name is required"),
    }),
    defineField({
      name: "sectionId",
      title: "Section ID",
      type: "string",
      description: "A unique ID for the section (used for navigation)",
      validation: (Rule) => Rule.required().error("Section ID is required"),
    }),
    defineField({
      name: "members",
      title: "Members",
      type: "array",
      of: [
        {
          name: "member",
          type: "object",
          fields: [
            defineField({
              name: "name",
              title: "Name",
              type: "string",
              validation: (Rule) => Rule.required().error("Member name is required"),
            }),
            defineField({
              name: "position",
              title: "Position",
              type: "string",
              validation: (Rule) => Rule.required().error("Position is required"),
            }),
            defineField({
              name: "hoverContent",
              title: "Hover Content",
              type: "string",
              description: "Content shown on hover of member card",
            }),
            defineField({
              name: "picture",
              title: "Picture",
              type: "image",
              description: "Profile picture of the member",
              options: {
                hotspot: true, // Enable image cropping
              },
            }),
          ],
        },
      ],
    }),
  ],
});
