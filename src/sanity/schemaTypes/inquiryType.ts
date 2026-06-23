import { defineType, defineField } from 'sanity'

export const inquiryType = defineType({
  name: 'inquiry',
  title: 'Inquiries',
  type: 'document',
  fields: [
    defineField({
      name: 'fullName',
      title: 'Full Name',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'phoneNumber',
      title: 'Phone Number',
      type: 'string',
    }),
    defineField({
      name: 'destination',
      title: 'Destination',
      type: 'string',
    }),
    defineField({
      name: 'travelDate',
      title: 'Travel Date',
      type: 'string',
    }),
    defineField({
      name: 'travelers',
      title: 'Travelers',
      type: 'number',
    }),
    defineField({
      name: 'budgetRange',
      title: 'Budget Range',
      type: 'string',
    }),
    defineField({
      name: 'message',
      title: 'Message',
      type: 'text',
    }),
    defineField({
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
    }),
  ],
})