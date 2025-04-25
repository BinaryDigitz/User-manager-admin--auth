import { config } from "dotenv";

config({ path: `.env.${process.NODE_ENV || 'development'}.local`})

export const {
    PORT,
    NODE_ENV,
    JWT_SECRET,
    MONGODB_URI
} = process.env