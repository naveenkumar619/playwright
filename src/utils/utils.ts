import { Page } from "@playwright/test"; 
import { getBaseUrl } from "../../config";
import dotenv from 'dotenv';
dotenv.config();

import constant from "./constant";

const defaultUsername = process.env?.USEREMAIL
const defaultPassword = process.env?.PASSWORD
export const timeout = 10 * 100 * 100;

async function login(
    page: Page,
    username?: string,
    password?: string,
): Promise<void> {
    await page.goto(constant.loginUrl);
    await page.getByPlaceholder('Email').click();
    await page.getByPlaceholder('Email').fill(username || defaultUsername||'');
    await page.getByPlaceholder('Email').press('Tab');
    await page.getByPlaceholder('Password').fill(password || defaultPassword||'');
    await Promise.all([
        page.waitForURL(constant.homeUrl),
        await page.getByRole('button', { name: 'Log in' }).click()
    ]);
}
export{login as dologin}
export const getURL = (url: string) => {
    return `${getBaseUrl()}${url}`;

}

export const config = { timeout };


export default login;

export const delay = ms => new Promise(resolve => setTimeout(resolve, ms));


