import dotenv from 'dotenv';
dotenv.config();

export function getBaseUrl(): string {
    return `${process.env?.SCHEMA}://${process.env?.SUBDOMAIN}`;
}

