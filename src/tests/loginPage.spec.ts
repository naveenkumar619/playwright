import { test, expect } from '@playwright/test';
import login, { delay } from "../utils/utils"
import constant from "../utils/constant"
import { routerlist } from '../utils/router.const';
import { getBaseUrl } from '../../config';

test.describe("Log In/Log Out", () => {

    test("Should login with correct credentials and navigate to home page", async ({ page }) => {

        // Verify taking screenshot entire Login Page before Login the Application 
        await page.screenshot({ path: "screenshots/screenshots3.png" });

        // Click and check the notication alert 
        //await page.getByText('Help & Support').click({delay:3000});

        // Login the Page 
        await login(page);

        // Navigation to the Home Page 
        await page.waitForURL(constant.homeUrl);

        // Verify taking screenshot entire Home-Page
        await page.screenshot({ path: "screenshots/screenshots1.png" });

        // Verify the Title of the Page
        await expect(page).toHaveTitle("Armax View");

        // Checks if the element's text content matches the expected text
        
        //expect(page.url()).toContain("loginUrl/auth/login`")
        

        // Taking and Verify the Screenshot of the "Login Button"
        //await page.getByRole('button', { name: 'Log in' }).screenshot({ path: "screenshot4.png" });

       // Verify the Navigation Page
        await page.goBack();
        await page.goForward();
        await page.close();

    });

    test("it should not Login if the both field empty", async ({ page }) => {

        await page.goto(`${getBaseUrl()}${routerlist.LOGIN}`);
        await expect(page.getByText('User Name')).toBeVisible();
        await page.waitForTimeout(1000)
        await expect(page.getByText('Password', { exact: true })).toBeVisible();
        await page.waitForTimeout(1000)
        await page.getByRole('button', { name: 'Log in' }).click();
        await page.waitForTimeout(1000)
        await expect(page.locator('form')).toContainText('Please input your email!');
        await page.waitForTimeout(1000)
        await expect(page.locator('form')).toContainText('Please input your password!');

});

    test("it should not Login without the Password", async ({ page }) => {
        await page.goto(`${getBaseUrl()}${routerlist.LOGIN}`);
        const defaultUsername1 = process.env?.USEREMAIL
        await page.getByPlaceholder('Email').click();
        await page.getByPlaceholder('Email').fill(`${defaultUsername1}`);
        await page.getByRole('button', { name: 'Log in' }).click();
        await expect(page.getByRole('alert')).toContainText('Please input your password!');

    })
    test("it should not Login without the User name", async ({ page }) => {
        await page.goto(`${getBaseUrl()}${routerlist.LOGIN}`);

       
        const defaultPassword1 = process.env?.PASSWORD
        await page.getByPlaceholder('Password').fill(`${defaultPassword1}`);
        await page.getByRole('button', { name: 'Log in' }).click();
        await expect(page.getByRole('alert')).toContainText('Please input your email!');
        
    })
    test("Should pass the Invalid Password ", async ({ page }) => {
        await page.goto(`${getBaseUrl()}${routerlist.LOGIN}`);
  await page.getByPlaceholder('Email').click();
  const defaultUsername1 = process.env?.USEREMAIL
  await page.getByPlaceholder('Email').fill(`${defaultUsername1}`);
  await page.getByPlaceholder('Password').click();
  const defaultPassword1 = process.env?.PASSWORD?.substring(0, 4);
  await page.getByPlaceholder('Password').fill(`${defaultPassword1}`);
  await page.getByRole('button', { name: 'Log in' }).click();

  await expect(page.locator('nz-notification')).toContainText('Invalid Crendential: You have 2 more chance for login');

    })

    test("Should pass the Invalid Email ", async ({ page }) => {
    await page.goto(`${getBaseUrl()}${routerlist.LOGIN}`);
  await page.getByPlaceholder('Email').click();
  const defaultUsername1 = process.env?.USEREMAIL?.substring(0, 4);
  await page.getByPlaceholder('Email').fill(`${defaultUsername1}`);
  await page.getByPlaceholder('Password').click();
  const defaultPassword1 = process.env?.PASSWORD
  await page.getByPlaceholder('Password').fill(`${defaultPassword1}`);
  await page.getByRole('button', { name: 'Log in' }).click();

  await expect(page.locator('nz-notification')).toContainText('Invalid Email');
    })
    test("it Should check the Text,Forgot Password and Logo", async ({ page }) => {
    await page.goto(`${getBaseUrl()}${routerlist.LOGIN}`);
     await page.locator('app-public-layout').click();
  await page.locator('#clientlogo').click();
  await page.locator('#commonorganization').click();
  await expect(page.getByRole('heading')).toContainText('Log in');
  await expect(page.locator('form')).toContainText('User Name');
  await expect(page.locator('form')).toContainText('Password');
  await page.locator('.login-icons').first().click();
  await page.locator('div:nth-child(2) > .login-icons').click();
  await page.locator('div:nth-child(3) > .login-icons').click();
  await page.locator('div:nth-child(4) > .login-icons').click();
  await page.locator('div:nth-child(5) > .login-icons').click();
  await page.locator('div:nth-child(6) > .login-icons').click();
  await page.getByText('Forgot Password').click();
  await expect(page.locator('nz-notification')).toContainText('Forgot Password Please contact your administrator to update password');
    })
	
	
	test("it should check the Loading time for Login Page", async ({ page }) => {
        await page.goto(`${getBaseUrl()}${routerlist.LOGIN}`);
        const startTime = Date.now();
        await login(page);
    const endTime = Date.now();
    const pageLoadTime = endTime - startTime;
    expect(pageLoadTime).toBeLessThanOrEqual(1000)

    })
});

