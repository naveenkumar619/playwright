import { test, expect } from '@playwright/test';
import { dologin } from '../utils/utils';
import { getBaseUrl } from '../../config';
import { routerlist } from '../utils/router.const';

test.describe("Verify the functionalities of wms Table page", async () => {
    test("WMS ", async ({ page }) => {
        await dologin(page);
        await page.goto(`${getBaseUrl()}${routerlist.WMS}`);

        await page.locator('app-scada-banner > img').click();

        //PARAMETER
        await page.getByRole('cell', { name: 'Parameter' }).click();

        //UNIT
        await page.getByRole('cell', { name: 'Unit' }).click();

        // Find the container element using the provided selector
        const container = await page.waitForSelector('#wmstable > nz-spin > div > div > nz-table-inner-scroll > div > table > thead > tr');

        // Find all th elements within the container
        const thElements = await container.$$('th.wms-table-heading.ant-table-cell.ng-star-inserted');

        // Loop through each th element and perform actions
        for (const thElement of thElements) {
            // You can perform actions on each th element here
            const textContent = await thElement.textContent();

            // Using Jest expect function to test if textContent is a string
            expect(typeof textContent).toBe('string');

        }
        //Median 
        await page.getByRole('cell', { name: 'Median' }).click();

        //Average
        await page.getByRole('cell', { name: 'Average' }).click();

        //Graph
        await page.getByRole('button', { name: 'Table' }).click();

        //dropdown
        await page.locator('nz-select-arrow svg').click();
        const dropdownContainer = await page.waitForSelector('#cdk-overlay-0 > nz-option-container');

        // Get all the options inside the dropdown list
        const options = await dropdownContainer.$$('nz-option');

        // Loop through each option and interact with it
        for (let i = 0; i < options.length; i++) {
            const option = options[i];
            // Click on the option to select it (or perform any other action)
            await option.click();
        }

        //Export 
        await page.locator('app-export').getByRole('button').click();
        await page.getByRole('button', { name: 'OK' }).click();

        //Table
        await page.getByRole('button', { name: 'Graph' }).click();

    })
})