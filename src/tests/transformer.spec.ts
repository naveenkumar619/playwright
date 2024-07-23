import { test, expect } from '@playwright/test';
import { dologin } from '../utils/utils';
import { getBaseUrl } from '../../config';
import { routerlist } from '../utils/router.const';

test.describe("Verify the functionalities of Heatmap  Tansformer", async () => {
    test("Transformer Status", async ({ page }) => {
        await dologin(page);
        await page.goto(`${getBaseUrl()}${routerlist.TRANSFORMER}`);
        await new Promise(resolve => setTimeout(resolve, 5000));

        // Find all elements matching the provided HTML structure
        const element1 = await page.$$(' app-heatmap-device-block > nz-card');
        // Visible each element
        for (const element of element1) {
            await element.isVisible();
        }

        // Get all inverter marker elements
        const markerSelectors = await page.$$('div.inverter-marker.ng-star-inserted');

        // Iterate over each marker element
        for (const markerSelector of markerSelectors) {
            // Get the computed style of the marker's border color
            const borderColor = await markerSelector.evaluate((element: Element) => {
                const computedStyle = window.getComputedStyle(element);
                return computedStyle.getPropertyValue('border-left-color');
            });

            // Get all legend icon elements
            const invLegendElements = await page.$$('app-heatmap-legend-block span fa-icon svg');

            // Iterate over each legend icon
            let borderColorFound = false;
            for (const legendElement of invLegendElements) {
                // Get the computed style of the legend icon's color
                const legendColor = await legendElement.evaluate((element: Element) => {
                    const computedStyle = window.getComputedStyle(element);
                    return computedStyle.color;
                });

                // Compare the marker's border color with the legend icon's color
                if (borderColor === legendColor) {
                    borderColorFound = true;
                    break;
                }
            }

            // Validate that the marker's border color matches one of the legend colors
            expect(borderColorFound).toBeTruthy();
        }
        // Locate all elements matching the common locator app-heatmap-device-block > nz-card
        const cards = await page.$$('app-heatmap-device-block > nz-card');

        // Loop through each nz-card element
        for (const card of cards) {
            // Find the .inv-font element within the current nz-card
            const invFontElement = await card.$('div.inv-font');

            // Get the text content of the .inv-font element
            const invFontText = await invFontElement?.textContent();

            // Validate that invFontText is not undefined
            expect(invFontText).toBeDefined();

        }
        // Select all elements matching the CSS selector
        const elements = await page.$$('app-heatmap-device-block > nz-card');

        // Iterate over each element
        for (const element of elements) {

            // Get the specific inner element
            const valueElement = await element.$('div.active-current-font.ng-star-inserted');
            const valuetext = await valueElement?.textContent();

            // Ensure valuetext is not null or undefined
            if (valuetext !== null && valuetext !== undefined) {

                // Validation: Ensure the text does not contain a hyphen
                expect(valuetext).not.toContain('-');

                // Validation: Ensure the text ends with "MWh"
                expect(valuetext.endsWith('°C')).toBeTruthy();
            }
        }
        //DROPDOWN FILTER
        await page.getByRole('button', { name: 'Default' }).click();
        await page.getByText('Ascending').click();
        await page.getByRole('button', { name: 'Ascending' }).click();
        await page.getByText('Descending').click();


    })
    test("Transformer OTI Test", async ({ page }) => {
        await dologin(page);
        await page.goto(`${getBaseUrl()}${routerlist.TRANSFORMER}`);

        //select OTI
        await page.locator('nz-select-arrow svg').click();
        await page.getByText('OTI').click();
        await new Promise(resolve => setTimeout(resolve, 5000));

        // Find all elements matching the provided HTML structure
        const element1 = await page.$$(' app-heatmap-device-block > nz-card');
        // Visible each element
        for (const element of element1) {
            await element.isVisible();
        }

        // Get all inverter marker elements
        const markerSelectors = await page.$$('div.inverter-marker.ng-star-inserted');

        // Iterate over each marker element
        for (const markerSelector of markerSelectors) {
            // Get the computed style of the marker's border color
            const borderColor = await markerSelector.evaluate((element: Element) => {
                const computedStyle = window.getComputedStyle(element);
                return computedStyle.getPropertyValue('border-left-color');
            });

            // Get all legend icon elements
            const invLegendElements = await page.$$('app-heatmap-legend-block span fa-icon svg');

            // Iterate over each legend icon
            let borderColorFound = false;
            for (const legendElement of invLegendElements) {
                // Get the computed style of the legend icon's color
                const legendColor = await legendElement.evaluate((element: Element) => {
                    const computedStyle = window.getComputedStyle(element);
                    return computedStyle.color;
                });

                // Compare the marker's border color with the legend icon's color
                if (borderColor === legendColor) {
                    borderColorFound = true;
                    break;
                }
            }

            // Validate that the marker's border color matches one of the legend colors
            expect(borderColorFound).toBeTruthy();
        }
        // Locate all elements matching the common locator app-heatmap-device-block > nz-card
        const cards = await page.$$('app-heatmap-device-block > nz-card');

        // Loop through each nz-card element
        for (const card of cards) {
            // Find the .inv-font element within the current nz-card
            const invFontElement = await card.$('div.inv-font');

            // Get the text content of the .inv-font element
            const invFontText = await invFontElement?.textContent();

            // Validate that invFontText is not undefined
            expect(invFontText).toBeDefined();

        }
        // Select all elements matching the CSS selector
        const elements = await page.$$('app-heatmap-device-block > nz-card');

        // Iterate over each element
        for (const element of elements) {

            // Get the specific inner element
            const valueElement = await element.$('div.active-current-font.ng-star-inserted');
            const valuetext = await valueElement?.textContent();

            // Ensure valuetext is not null or undefined
            if (valuetext !== null && valuetext !== undefined) {

                // Validation: Ensure the text does not contain a hyphen
                expect(valuetext).not.toContain('-');

                // Validation: Ensure the text ends with "MWh"
                expect(valuetext.endsWith('°C')).toBeTruthy();
            }
        }
        //DROPDOWN FILTER
        await page.getByRole('button', { name: 'Default' }).click();
        await page.getByText('Ascending').click();
        await page.getByRole('button', { name: 'Ascending' }).click();
        await page.getByText('Descending').click();


    })
    test("Transformer LV1 WTI", async ({ page }) => {
        await dologin(page)
        await page.goto(`${getBaseUrl()}${routerlist.TRANSFORMER}`);
        await new Promise(resolve => setTimeout(resolve, 5000));

        //select LV1 WIT
        await page.locator('nz-select-arrow svg').click();
        await page.getByText('LV1 WTI').click();
        await new Promise(resolve => setTimeout(resolve, 5000));

        // Find all elements matching the provided HTML structure
        const element1 = await page.$$(' app-heatmap-device-block > nz-card');
        // Visible each element
        for (const element of element1) {
            await element.isVisible();
        }

        // Get all inverter marker elements
        const markerSelectors = await page.$$('div.inverter-marker.ng-star-inserted');

        // Iterate over each marker element
        for (const markerSelector of markerSelectors) {
            // Get the computed style of the marker's border color
            const borderColor = await markerSelector.evaluate((element: Element) => {
                const computedStyle = window.getComputedStyle(element);
                return computedStyle.getPropertyValue('border-left-color');
            });

            // Get all legend icon elements
            const invLegendElements = await page.$$('app-heatmap-legend-block span fa-icon svg');

            // Iterate over each legend icon
            let borderColorFound = false;
            for (const legendElement of invLegendElements) {
                // Get the computed style of the legend icon's color
                const legendColor = await legendElement.evaluate((element: Element) => {
                    const computedStyle = window.getComputedStyle(element);
                    return computedStyle.color;
                });

                // Compare the marker's border color with the legend icon's color
                if (borderColor === legendColor) {
                    borderColorFound = true;
                    break;
                }
            }

            // Validate that the marker's border color matches one of the legend colors
            expect(borderColorFound).toBeTruthy();
        }
        // Locate all elements matching the common locator app-heatmap-device-block > nz-card
        const cards = await page.$$('app-heatmap-device-block > nz-card');

        // Loop through each nz-card element
        for (const card of cards) {
            // Find the .inv-font element within the current nz-card
            const invFontElement = await card.$('div.inv-font');

            // Get the text content of the .inv-font element
            const invFontText = await invFontElement?.textContent();

            // Validate that invFontText is not undefined
            expect(invFontText).toBeDefined();

        }
        // Select all elements matching the CSS selector
        const elements = await page.$$('app-heatmap-device-block > nz-card');

        // Iterate over each element
        for (const element of elements) {

            // Get the specific inner element
            const valueElement = await element.$('div.active-current-font.ng-star-inserted');
            const valuetext = await valueElement?.textContent();

            // Ensure valuetext is not null or undefined
            if (valuetext !== null && valuetext !== undefined) {

                // Validation: Ensure the text does not contain a hyphen
                expect(valuetext).not.toContain('-');

                // Validation: Ensure the text ends with "MWh"
                expect(valuetext.endsWith('°C')).toBeTruthy();
            }
        }
        //DROPDOWN FILTER
        await page.getByRole('button', { name: 'Default' }).click();
        await page.getByText('Ascending').click();
        await page.getByRole('button', { name: 'Ascending' }).click();
        await page.getByText('Descending').click();


    })
    test("Transformer LV2 WTI", async ({ page }) => {
        await dologin(page)
        await page.goto(`${getBaseUrl()}${routerlist.TRANSFORMER}`);
        await new Promise(resolve => setTimeout(resolve, 5000));

        //select LV2 WIT
        await page.locator('nz-select-arrow svg').click();
        await page.getByText('LV2 WTI').click();
        await new Promise(resolve => setTimeout(resolve, 5000));

        // Find all elements matching the provided HTML structure
        const element1 = await page.$$(' app-heatmap-device-block > nz-card');
        // Visible each element
        for (const element of element1) {
            await element.isVisible();
        }

        // Get all inverter marker elements
        const markerSelectors = await page.$$('div.inverter-marker.ng-star-inserted');

        // Iterate over each marker element
        for (const markerSelector of markerSelectors) {
            // Get the computed style of the marker's border color
            const borderColor = await markerSelector.evaluate((element: Element) => {
                const computedStyle = window.getComputedStyle(element);
                return computedStyle.getPropertyValue('border-left-color');
            });

            // Get all legend icon elements
            const invLegendElements = await page.$$('app-heatmap-legend-block span fa-icon svg');

            // Iterate over each legend icon
            let borderColorFound = false;
            for (const legendElement of invLegendElements) {
                // Get the computed style of the legend icon's color
                const legendColor = await legendElement.evaluate((element: Element) => {
                    const computedStyle = window.getComputedStyle(element);
                    return computedStyle.color;
                });

                // Compare the marker's border color with the legend icon's color
                if (borderColor === legendColor) {
                    borderColorFound = true;
                    break;
                }
            }

            // Validate that the marker's border color matches one of the legend colors
            expect(borderColorFound).toBeTruthy();
        }
        // Locate all elements matching the common locator app-heatmap-device-block > nz-card
        const cards = await page.$$('app-heatmap-device-block > nz-card');

        // Loop through each nz-card element
        for (const card of cards) {
            // Find the .inv-font element within the current nz-card
            const invFontElement = await card.$('div.inv-font');

            // Get the text content of the .inv-font element
            const invFontText = await invFontElement?.textContent();

            // Validate that invFontText is not undefined
            expect(invFontText).toBeDefined();

        }
        // Select all elements matching the CSS selector
        const elements = await page.$$('app-heatmap-device-block > nz-card');

        // Iterate over each element
        for (const element of elements) {

            // Get the specific inner element
            const valueElement = await element.$('div.active-current-font.ng-star-inserted');
            const valuetext = await valueElement?.textContent();

            // Ensure valuetext is not null or undefined
            if (valuetext !== null && valuetext !== undefined) {

                // Validation: Ensure the text does not contain a hyphen
                expect(valuetext).not.toContain('-');

                // Validation: Ensure the text ends with "MWh"
                expect(valuetext.endsWith('°C')).toBeTruthy();
            }
        }
        //DROPDOWN FILTER
        await page.getByRole('button', { name: 'Default' }).click();
        await page.getByText('Ascending').click();
        await page.getByRole('button', { name: 'Ascending' }).click();
        await page.getByText('Descending').click();


    })
    test("Transformer LV3 WTI", async ({ page }) => {
        await dologin(page)
        await page.goto(`${getBaseUrl()}${routerlist.TRANSFORMER}`);
        await new Promise(resolve => setTimeout(resolve, 5000));

        //select LV3 WIT
        await page.locator('nz-select-arrow svg').click();
        await page.getByText('LV3 WTI').click();
        await new Promise(resolve => setTimeout(resolve, 5000));

        // Find all elements matching the provided HTML structure
        const element1 = await page.$$(' app-heatmap-device-block > nz-card');
        // Visible each element
        for (const element of element1) {
            await element.isVisible();
        }

        // Get all inverter marker elements
        const markerSelectors = await page.$$('div.inverter-marker.ng-star-inserted');

        // Iterate over each marker element
        for (const markerSelector of markerSelectors) {
            // Get the computed style of the marker's border color
            const borderColor = await markerSelector.evaluate((element: Element) => {
                const computedStyle = window.getComputedStyle(element);
                return computedStyle.getPropertyValue('border-left-color');
            });

            // Get all legend icon elements
            const invLegendElements = await page.$$('app-heatmap-legend-block span fa-icon svg');

            // Iterate over each legend icon
            let borderColorFound = false;
            for (const legendElement of invLegendElements) {
                // Get the computed style of the legend icon's color
                const legendColor = await legendElement.evaluate((element: Element) => {
                    const computedStyle = window.getComputedStyle(element);
                    return computedStyle.color;
                });

                // Compare the marker's border color with the legend icon's color
                if (borderColor === legendColor) {
                    borderColorFound = true;
                    break;
                }
            }

            // Validate that the marker's border color matches one of the legend colors
            expect(borderColorFound).toBeTruthy();
        }
        // Locate all elements matching the common locator app-heatmap-device-block > nz-card
        const cards = await page.$$('app-heatmap-device-block > nz-card');

        // Loop through each nz-card element
        for (const card of cards) {
            // Find the .inv-font element within the current nz-card
            const invFontElement = await card.$('div.inv-font');

            // Get the text content of the .inv-font element
            const invFontText = await invFontElement?.textContent();

            // Validate that invFontText is not undefined
            expect(invFontText).toBeDefined();

        }
        // Select all elements matching the CSS selector
        const elements = await page.$$('app-heatmap-device-block > nz-card');

        // Iterate over each element
        for (const element of elements) {

            // Get the specific inner element
            const valueElement = await element.$('div.active-current-font.ng-star-inserted');
            const valuetext = await valueElement?.textContent();

            // Ensure valuetext is not null or undefined
            if (valuetext !== null && valuetext !== undefined) {

                // Validation: Ensure the text does not contain a hyphen
                expect(valuetext).not.toContain('-');

                // Validation: Ensure the text ends with "MWh"
                expect(valuetext.endsWith('°C')).toBeTruthy();
            }
        }
        //DROPDOWN FILTER
        await page.getByRole('button', { name: 'Default' }).click();
        await page.getByText('Ascending').click();
        await page.getByRole('button', { name: 'Ascending' }).click();
        await page.getByText('Descending').click();


    })
    test("Transformer LV4 WTI", async ({ page }) => {
        await dologin(page)
        await page.goto(`${getBaseUrl()}${routerlist.TRANSFORMER}`);
        await new Promise(resolve => setTimeout(resolve, 5000));

        //select LV4 WIT
        await page.locator('nz-select-arrow svg').click();
        await page.getByText('LV4 WTI').click();
        await new Promise(resolve => setTimeout(resolve, 5000));

        // Find all elements matching the provided HTML structure
        const element1 = await page.$$(' app-heatmap-device-block > nz-card');
        // Visible each element
        for (const element of element1) {
            await element.isVisible();
        }

        // Get all inverter marker elements
        const markerSelectors = await page.$$('div.inverter-marker.ng-star-inserted');

        // Iterate over each marker element
        for (const markerSelector of markerSelectors) {
            // Get the computed style of the marker's border color
            const borderColor = await markerSelector.evaluate((element: Element) => {
                const computedStyle = window.getComputedStyle(element);
                return computedStyle.getPropertyValue('border-left-color');
            });

            // Get all legend icon elements
            const invLegendElements = await page.$$('app-heatmap-legend-block span fa-icon svg');

            // Iterate over each legend icon
            let borderColorFound = false;
            for (const legendElement of invLegendElements) {
                // Get the computed style of the legend icon's color
                const legendColor = await legendElement.evaluate((element: Element) => {
                    const computedStyle = window.getComputedStyle(element);
                    return computedStyle.color;
                });

                // Compare the marker's border color with the legend icon's color
                if (borderColor === legendColor) {
                    borderColorFound = true;
                    break;
                }
            }

            // Validate that the marker's border color matches one of the legend colors
            expect(borderColorFound).toBeTruthy();
        }
        // Locate all elements matching the common locator app-heatmap-device-block > nz-card
        const cards = await page.$$('app-heatmap-device-block > nz-card');

        // Loop through each nz-card element
        for (const card of cards) {
            // Find the .inv-font element within the current nz-card
            const invFontElement = await card.$('div.inv-font');

            // Get the text content of the .inv-font element
            const invFontText = await invFontElement?.textContent();

            // Validate that invFontText is not undefined
            expect(invFontText).toBeDefined();

        }
        // Select all elements matching the CSS selector
        const elements = await page.$$('app-heatmap-device-block > nz-card');

        // Iterate over each element
        for (const element of elements) {

            // Get the specific inner element
            const valueElement = await element.$('div.active-current-font.ng-star-inserted');
            const valuetext = await valueElement?.textContent();

            // Ensure valuetext is not null or undefined
            if (valuetext !== null && valuetext !== undefined) {

                // Validation: Ensure the text does not contain a hyphen
                expect(valuetext).not.toContain('-');

                // Validation: Ensure the text ends with "MWh"
                expect(valuetext.endsWith('°C')).toBeTruthy();
            }
        }
        //DROPDOWN FILTER
        await page.getByRole('button', { name: 'Default' }).click();
        await page.getByText('Ascending').click();
        await page.getByRole('button', { name: 'Ascending' }).click();
        await page.getByText('Descending').click();


    })

})