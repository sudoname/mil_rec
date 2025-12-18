import { z } from 'zod';

export const applicationSchema = z.object({
  // Personal Info
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  middleName: z.string().optional(),
  phone: z.string().regex(/^0\d{10}$/, 'Phone must be 11 digits starting with 0'),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER']),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),

  // Lagos Indigene Info
  lga: z.string().min(1, 'LGA is required'),
  placeOfOrigin: z.string().min(2, 'Place of origin is required'),
  homeAddress: z.string().min(10, 'Home address is required'),
  currentAddress: z.string().min(10, 'Current address is required'),

  // Education
  qualification: z.string().min(1, 'Qualification is required'),
  numberOfPasses: z.number().min(0).optional(),
  numberOfSittings: z.number().min(1).max(3).optional(),
  yearOfExam: z.string().optional(),

  // Branch Interest (array of strings)
  branches: z.array(z.string()).min(1, 'Select at least one branch'),

  // Skills (array of strings)
  skills: z.array(z.string()).optional(),

  // Consent
  consent: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the terms',
  }),
});

export const contactMessageSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  contact: z.string().min(10, 'Contact must be at least 10 characters'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type ApplicationFormData = z.infer<typeof applicationSchema>;
export type ContactMessageFormData = z.infer<typeof contactMessageSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
