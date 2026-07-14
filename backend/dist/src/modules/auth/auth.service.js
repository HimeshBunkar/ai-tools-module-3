import { prisma } from '../../lib/prisma.js';
import bcrypt from 'bcryptjs';
import { generateVerificationToken, hashToken } from '../../lib/tokens.js';
import { sendVerificationLinkEmail, sendPasswordResetEmail } from '../../lib/mailer.js';
export class AuthService {
    async signup(data) {
        const email = data.email.trim().toLowerCase();
        const existingUser = await prisma.user.findFirst({
            where: { email: { equals: email, mode: 'insensitive' } }
        });
        if (existingUser) {
            throw new Error('Email is already in use.');
        }
        const hashedPassword = await bcrypt.hash(data.password, 12);
        const user = await prisma.user.create({
            data: {
                email,
                name: data.name || email,
                password: hashedPassword,
                emailVerified: null,
            },
        });
        const rawToken = generateVerificationToken();
        const hashedToken = hashToken(rawToken);
        const identifier = `verify:${email}`;
        const expires = new Date(Date.now() + 60 * 60 * 1000);
        await prisma.$transaction([
            prisma.verificationToken.deleteMany({ where: { identifier } }),
            prisma.verificationToken.create({
                data: { identifier, token: hashedToken, expires },
            }),
        ]);
        await sendVerificationLinkEmail(email, rawToken);
        return user;
    }
    async login(data) {
        const email = data.email.trim().toLowerCase();
        const user = await prisma.user.findFirst({
            where: { email: { equals: email, mode: 'insensitive' } }
        });
        if (!user || !user.password) {
            throw new Error('Invalid email or password.');
        }
        const isValid = await bcrypt.compare(data.password, user.password);
        if (!isValid) {
            throw new Error('Invalid email or password.');
        }
        if (!user.emailVerified) {
            throw new Error('Please verify your email before logging in.');
        }
        return user;
    }
    async verifyEmail(data) {
        const email = data.email.trim().toLowerCase();
        const identifier = `verify:${email}`;
        const hashedToken = hashToken(data.token);
        const verificationToken = await prisma.verificationToken.findUnique({
            where: { identifier_token: { identifier, token: hashedToken } },
        });
        if (!verificationToken) {
            throw new Error('Invalid verification link. It may have already been used.');
        }
        if (new Date() > verificationToken.expires) {
            await prisma.verificationToken.delete({
                where: { identifier_token: { identifier, token: hashedToken } },
            });
            throw new Error('This verification link has expired. Please request a new one.');
        }
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            throw new Error('User not found.');
        }
        await prisma.$transaction([
            prisma.user.update({
                where: { email },
                data: { emailVerified: new Date() },
            }),
            prisma.verificationToken.delete({
                where: { identifier_token: { identifier, token: hashedToken } },
            }),
        ]);
        return user;
    }
    async resendVerification(data) {
        const email = data.email.trim().toLowerCase();
        const user = await prisma.user.findFirst({
            where: { email: { equals: email, mode: 'insensitive' } }
        });
        if (!user) {
            return { message: 'If an account exists, a verification email has been sent.' };
        }
        if (user.emailVerified) {
            throw new Error('Email is already verified.');
        }
        const rawToken = generateVerificationToken();
        const hashedToken = hashToken(rawToken);
        const identifier = `verify:${email}`;
        const expires = new Date(Date.now() + 60 * 60 * 1000);
        await prisma.$transaction([
            prisma.verificationToken.deleteMany({ where: { identifier } }),
            prisma.verificationToken.create({
                data: { identifier, token: hashedToken, expires },
            }),
        ]);
        await sendVerificationLinkEmail(email, rawToken);
        return { message: 'Verification email resent.' };
    }
    async forgotPassword(data) {
        const email = data.email.trim().toLowerCase();
        const user = await prisma.user.findFirst({
            where: { email: { equals: email, mode: 'insensitive' } }
        });
        if (!user) {
            return { message: 'If an account exists, a reset email has been sent.' };
        }
        const rawToken = generateVerificationToken();
        const hashedToken = hashToken(rawToken);
        const identifier = `reset:${email}`;
        const expires = new Date(Date.now() + 60 * 60 * 1000);
        await prisma.$transaction([
            prisma.verificationToken.deleteMany({ where: { identifier } }),
            prisma.verificationToken.create({
                data: { identifier, token: hashedToken, expires },
            }),
        ]);
        await sendPasswordResetEmail(email, rawToken);
        return { message: 'Password reset email sent.' };
    }
    async resetPassword(data) {
        const email = data.email.trim().toLowerCase();
        const identifier = `reset:${email}`;
        const hashedToken = hashToken(data.token);
        const verificationToken = await prisma.verificationToken.findUnique({
            where: { identifier_token: { identifier, token: hashedToken } },
        });
        if (!verificationToken) {
            throw new Error('Invalid or expired reset link.');
        }
        if (new Date() > verificationToken.expires) {
            await prisma.verificationToken.delete({
                where: { identifier_token: { identifier, token: hashedToken } },
            });
            throw new Error('This reset link has expired. Please request a new one.');
        }
        const hashedPassword = await bcrypt.hash(data.newPassword, 12);
        await prisma.$transaction([
            prisma.user.update({
                where: { email },
                data: { password: hashedPassword },
            }),
            prisma.verificationToken.delete({
                where: { identifier_token: { identifier, token: hashedToken } },
            }),
        ]);
    }
    async deleteAccount(userId) {
        await prisma.user.delete({
            where: { id: userId }
        });
    }
    async getMe(userId) {
        const dbUser = await prisma.user.findUnique({
            where: { id: userId },
            select: { id: true, name: true, email: true, image: true, emailVerified: true }
        });
        if (!dbUser)
            throw new Error('User not found.');
        return dbUser;
    }
}
