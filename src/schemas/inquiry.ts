import { z } from 'zod';

export const inquirySchema = z.object({
  fullName: z
    .string()
    .min(3, 'Full name must be at least 3 characters')
    .max(100, 'Full name cannot exceed 100 characters')
    .trim(),
  phoneNumber: z
    .string()
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number cannot exceed 15 digits')
    .regex(/^[0-9+-\s]+$/, 'Invalid phone number format'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email address')
    .toLowerCase()
    .trim(),
  destination: z
    .string()
    .min(2, 'Destination must be at least 2 characters')
    .max(100, 'Destination name too long')
    .trim(),
  travelMonth: z
    .string()
    .min(1, 'Travel month is required'),
  travelers: z
    .number()
    .int('Number of travelers must be an integer')
    .positive('Number of travelers must be at least 1')
    .min(1, 'Number of travelers must be at least 1')
    .max(100, 'For groups larger than 100, please contact us directly'),
  budgetRange: z
    .string()
    .min(1, 'Budget range is required'),
  message: z
    .string()
    .max(500, 'Message cannot exceed 500 characters')
    .optional()
    .or(z.literal('')),
});

export type InquiryInput = z.infer<typeof inquirySchema>;
