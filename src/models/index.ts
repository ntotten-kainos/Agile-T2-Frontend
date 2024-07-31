import axios from "axios";

declare module 'express-session' {
    interface Session {
        token: string;
    }
}

const SERVER_URL = process.env.API_URL || 'http://localhost:8080/';

export const requestInstance = axios.create({
    baseURL: SERVER_URL,
    timeout: 20000,
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
})
