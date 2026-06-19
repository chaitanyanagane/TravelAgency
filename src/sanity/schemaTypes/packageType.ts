import { defineField, defineType } from 'sanity'

export const packageType = defineType({
  name: 'package',
  title: 'Travel Package',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'destination',
      title: 'Destination',
      type: 'reference',
      to: [{ type: 'destination' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'duration',
      title: 'Duration (Display)',
      type: 'string',
      description: 'Example: "5 Days / 4 Nights"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'durationDays',
      title: 'Duration (Days)',
      type: 'number',
      description: 'Used for filtering/sorting. Example: 5',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'price',
      title: 'Starting Price (INR)',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      initialValue: 5.0,
      validation: (Rule) => Rule.min(1.0).max(5.0),
    }),
    defineField({
      name: 'tourType',
      title: 'Tour Type',
      type: 'string',
      options: {
        list: [
          { title: 'Family', value: 'Family' },
          { title: 'Honeymoon', value: 'Honeymoon' },
          { title: 'Adventure', value: 'Adventure' },
          { title: 'Weekend Getaway', value: 'Weekend Getaway' },
          { title: 'Nature', value: 'Nature' },
          { title: 'Pilgrimage', value: 'Pilgrimage' },
          { title: 'Customized', value: 'Customized' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'galleryImages',
      title: 'Gallery Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'overview',
      title: 'Tour Overview',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'itinerary',
      title: 'Day-wise Itinerary',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'itineraryItem',
          title: 'Itinerary Day',
          fields: [
            { name: 'day', title: 'Day Number', type: 'number', validation: Rule => Rule.required() },
            { name: 'title', title: 'Day Title', type: 'string', validation: Rule => Rule.required() },
            { name: 'description', title: 'Activity Description', type: 'text', validation: Rule => Rule.required() },
          ],
        },
      ],
    }),
    defineField({
      name: 'inclusions',
      title: 'Inclusions',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'exclusions',
      title: 'Exclusions',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'pricing',
      title: 'Pricing Tiers (Optional)',
      type: 'object',
      fields: [
        { name: 'couple', title: 'Couple Price', type: 'number' },
        { name: 'family', title: 'Family Price', type: 'number' },
        { name: 'group', title: 'Group Price', type: 'number' },
      ],
    }),
    defineField({
      name: 'featuredPackage',
      title: 'Featured Package',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})
