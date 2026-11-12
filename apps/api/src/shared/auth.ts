import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db";
import * as schema from "../db/schema"
import { sendEmail } from "./mailer";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
        schema: {
            user: schema.user,
            session: schema.session,
            account: schema.account,
            verification: schema.verification
        },
    }),
    trustedOrigins: [process.env.FRONTEND_URL!],
    user: {
        additionalFields: {
            bio: { type: "string", required: false },
            profession: { type: "string", required: false },
            timezone: { type: "string", required: false, defaultValue: "Asia/Jakarta" }
        }
    },
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,
        minPasswordLength: 8,
        maxPasswordLength: 128
    },

    emailVerification: {
        sendOnSignUp: true,
        autoSignInAfterVerification: true,
        sendVerificationEmail: async({ user, url }) => {
            console.log(`link verifikasi user ${url}`);

            void sendEmail({
                to: user.email,
                subject: "Verifikasi Akun Sprinboard Anda",
                html: `
                <div style="font-family: sans-serif; max-width: 500px; margin: auto;">
                    <h2>Halo, ${user.name}!</h2>
                    <p>Terima kasih telah mendaftar di SprintBoard. Silakan klik tombol di bawah ini untuk memverifikasi alamat email Anda:</p>
                    <p style="margin: 24px 0;">
                    <a href="${url}" style="background: #2563eb; color: white; padding: 12px 20px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                        Verifikasi Email Saya
                    </a>
                    </p>
                    <p style="font-size: 12px; color: #666;">Link ini akan kedaluwarsa secara otomatis. Jika Anda tidak merasa mendaftar, abaikan email ini.</p>
                </div>
          `
            })
        }
    },


    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }
    }
})