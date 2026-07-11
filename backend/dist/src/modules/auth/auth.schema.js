import { z } from 'zod';
export const signupSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    name: z.string().optional(),
});
export const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
});
export const verifyEmailSchema = z.object({
    email: z.string().email('Invalid email address'),
    token: z.string().min(1, 'Token is required'),
});
export const emailOnlySchema = z.object({
    email: z.string().email('Invalid email address'),
});
export const resetPasswordSchema = z.object({
    email: z.string().email('Invalid email address'),
    token: z.string().min(1, 'Token is required'),
    newPassword: z.string().min(6, 'Password must be at least 6 characters'),
});
