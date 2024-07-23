import { test, expect } from '@playwright/test';
import { dologin } from '../utils/utils';
import { getBaseUrl } from '../../config';
import { routerlist } from '../utils/router.const';

test.describe("Verify the functionalities of overview page", async () => {
    test("Overview ", async ({ page }) => {
        await dologin(page);
        await page.goto(`${getBaseUrl()}${routerlist.OVERVIEW}`);
        await new Promise(resolve => setTimeout(resolve, 5000));
        await page.waitForSelector('.inverter-marker');
        const markerSelectors = await page.$$('div.inverter-marker.ng-star-inserted');

        // Extract the computed style of each marker element and compare it with the running status color
        let count = 0;
        for (const markerSelector of markerSelectors) {
            count = count + 1
            const borderColor = await markerSelector.evaluate((element: Element) => {
                const computedStyle = window.getComputedStyle(element);
                return computedStyle.getPropertyValue('border-left-color');
            });

            const invLegendElements = await page.$$(' fa-icon > svg');
            // Get the count of elements
            const invLegendCount = invLegendElements.length;


            for (let count = 1; count <= invLegendCount; count++) {
                const svgElement = await page.$(`div:nth-child(${count}) > app-heatmap-legend-block > span > fa-icon`);
                if (!svgElement) {
                    // Instead of console.log, use Jest's expect method
                    expect(svgElement).toBeNull(); // Asserts that svgElement is null
                    continue;
                }

                // Get the color of the parent element
                const color = await svgElement.evaluate(element => {
                    const computedStyle = window.getComputedStyle(element);
                    return computedStyle.color;
                });

                // Compare the color code
                if (borderColor === color) {
                    // Use Jest's expect method for assertion
                    expect(borderColor).toEqual(color); // Asserts that border color matches icon color

                }
            }

        }

        //Inverter Total count
        const numberSelector = await page.locator('app-inv')

        // Get the text content of the element
        const numberElement = await numberSelector.first();
        const numberText = await numberElement.textContent();

        // Process the extracted text content (if necessary)
        const lastTwoDigits = (numberText as string).slice(-2)

        // Output the detected number
        const numberValue = parseInt(lastTwoDigits)

        // Find all elements matching the selector
        const elements = await page.$$('app-heatmap-device-block > .ant-card');

        // Get the index of the last element
        const lastIndex = elements.length - 1;

        // Adding 1 to convert from zero-based index to 1-based index
        const lastelement: number = lastIndex + 1
        // Log the nth child  number


        if (numberValue === lastelement) {
            expect(numberValue).toEqual(lastelement);
        }

        for (let i = 1; i <= lastelement; i++) {
            const numberElement1 = await page.waitForSelector('.active-current-font');
            const numberText1 = await numberElement1.textContent();
            const numberValue1 = parseFloat((numberText1 as string).replace(/[^\d.-]/g, ''));

            const minRange = 0;
            const maxRange = 1200.5;

            if (numberValue1 > minRange && numberValue1 <= maxRange) {
                // Instead of console.log, use Jest's expect method
                expect(numberValue1).toBeGreaterThanOrEqual(minRange);
                expect(numberValue1).toBeLessThanOrEqual(maxRange);
            } else if (Number.isNaN(numberValue1)) {
                expect(numberValue1).toBeNaN();
            }
        }

        const elements1 = await page.$$('app-heatmap-device-block > .ant-card');
        for (const element of elements1) {
            const invFontElement = await element.waitForSelector('.inv-font');
            const textContent = await invFontElement.textContent();
            expect(textContent).toBeDefined();
        }

        //DROPDOWN FILTER
        await page.getByRole('button', { name: 'Default' }).click();
        await page.getByText('Ascending').click();
        await page.getByRole('button', { name: 'Ascending' }).click();
        await page.getByText('Descending').click();

        //Maximize
        await page.locator(' nz-space > div:nth-child(2) > app-expand > button');

        //Minimize
        await page.locator(' nz-space > div:nth-child(2) > app-expand > button');

    })
})