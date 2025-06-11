import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
dotenv.config();

export const genAI = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });
