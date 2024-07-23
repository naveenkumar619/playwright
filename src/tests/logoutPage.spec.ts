import { test, expect } from '@playwright/test';
import login from "../utils/utils"
import constant from '../utils/constant';


test.describe("Verify the functionalities of Logout Page", async () => {

    test("Should Navigate to Login Page ", async ({ page }) => {
        await login(page);
        await page.waitForURL(constant.homeUrl);
        expect(page.url()).toMatch(/scada/i);

        // Verify taking screenshot entire Page Before Logout the Application
        await page.screenshot({ path: "screenshots/screenshots2.png" });


        //Logout the Application 
        await page.locator('nz-avatar').first().hover();
        await page.locator('nz-header svg').nth(2).click();
        await page.getByText('Log out').click()

        // Verify taking screenshot entire Page after Logout the Application
        await page.screenshot({ path: "screenshots/screenshots.png" });

        // Checks if the element's text content matches the expected text
        expect(page.url()).toContain("http://192.168.7.241/#/auth/login");

        // Verify the Navigation Page
        await page.goBack();
        await page.goForward();
        await page.close();

        

        
    });
});