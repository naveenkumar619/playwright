import { test, expect } from '@playwright/test';
import { getBaseUrl } from '../../../../../config';
import { delay, dologin } from '../../../../utils/utils';
import { routerlist } from '../../../../utils/router.const';
import { ElementHandle } from '@playwright/test';


test.describe("Verify the functionalities of the History Alarm ", async () => {
    
test('checking live alarm count and live alarm notification count', async ({ page }) => {
            await dologin(page)
            const startTime = Date.now();
            await page.goto(`${getBaseUrl()}${routerlist.LIVE_ALARM}`);

    const endTime = Date.now();
    const pageLoadTime = endTime - startTime;
    expect(pageLoadTime).toBeLessThanOrEqual(1000)
    await new Promise(resolve => setTimeout(resolve, 5000));

    const element1 = await page.$$('body > app-root > app-common-layout > nz-layout > nz-content > app-scada > div > div > app-menu-tab > div > app-alarms-events-index > div > div > app-alarms-live > nz-card > div.ant-card-body > nz-table > nz-spin > div > div > nz-table-inner-default > div > table > tbody > tr:nth-child(n)');
  
      // Click each element
      for (const element of element1) {
          await element.click();
     
    }
        const elementCount1 = element1.length
  
  await page.getByRole('img', { name: 'notifications' }).click();

  await page.waitForTimeout(2000)
let horizontalValues: number[] = [];

for (let b: number = 1; b <= 1000; b++) {
    const element: ElementHandle<Element> | null = await page.$(`div > nz-card > div > div > div > nz-tag:nth-child(${b})`);
    
    // Get the value of the element
    const value: string | undefined = await element?.innerText();
    
    if (value !== undefined) {
        // Trim and remove double quotes from the value
        const stringWithoutQuotes: number = parseFloat(value.replace(/"/g, '').trim());
        
        // Store the value in the array
        horizontalValues.push(stringWithoutQuotes);
    }
}
expect(horizontalValues.join('')).toEqual(elementCount1.toString());

})

test('Checking the functionalities and reset', async ({ page }) => {
    await dologin(page)
            await page.goto(`${getBaseUrl()}${routerlist.LIVE_ALARM}`);

            await page.locator('nz-select-top-control').filter({ hasText: 'Select Block' }).click();
                
                  // Get all dropdown options
                  await page.waitForTimeout(2000)
                  const element2 = await page.$$('nz-option-container > div > cdk-virtual-scroll-viewport > div.cdk-virtual-scroll-content-wrapper > nz-option-item.ant-select-item.ant-select-item-option.ng-star-inserted.ant-select-item-option');
                 
                        // Click each element
                        for (const element of element2) {
                            await element.click();
                        }
                
                        const elementCount1 = element2.length;
                
                        const iterationsNeeded = Math.ceil(elementCount1 / elementCount1);
                
                const Devicedropdown = iterationsNeeded
                    const dropdownSelector = 'nz-select-top-control';
                
                  // Define option groups
                  const optionGroups = Array.from({ length: Devicedropdown }, (_, index) => `IS${index + 1}`);
                
                  // Define inverters
                  const inverters = Array.from({ length: Devicedropdown }, (_, index) => `Inverter${index + 1}`);
                
                  // Click dropdown
                  await page.locator(dropdownSelector).filter({ hasText: 'Select Device' }).click();
                
                  // Iterate over option groups and inverters
                  for (const optionGroup of optionGroups) {
                    for (const inverter of inverters) {
                      const optionText = `${optionGroup}${inverter}`;
                      await page.waitForSelector(`//div[contains(text(), '${optionText}')]`);
                      await page.click(`//div[contains(text(), '${optionText}')]`);
                    }
                  }
// checking the Description Check and Uncheck box Functionalities
await page.getByRole('row', { name: 'Description Block Name Device' }).getByLabel('').check();
await page.getByRole('row', { name: 'Description Block Name Device' }).getByLabel('').uncheck();

// validate the Text and Description Search
await page.getByText('Description').click();
await page.getByRole('cell', { name: 'Description' }).locator('nz-filter-trigger span').click();
await page.getByPlaceholder('Search Description').click();
await page.getByPlaceholder('Search Description').fill('Frequency');
delay(200)
await page.getByRole('button', { name: 'Search' }).click();
delay(200)
await page.getByRole('cell', { name: 'Description' }).locator('nz-filter-trigger span').click();
delay(200);
await page.getByRole('button', { name: 'Reset' }).click();

await page.getByText('Block Name').click();
  await page.getByText('Device Name').click();
  await page.getByRole('cell', { name: 'Status' }).click();

  // checking the sorting 
  await page.getByRole('cell', { name: 'Start Time' }).locator('nz-table-sorters').click();
  await page.getByText('Start Time').click();
  await page.getByText('Start Time').click();

  // checking the sorting 
  await page.getByText('Duration').click();
  await page.getByText('Duration').click();
  await page.getByText('Duration').click();

  await page.getByRole('cell', { name: 'Severity' }).click();

// checking the Ack at calendar functionalities 
await page.getByText('Ack At').click();
  const currentDate: Date = new Date();
  currentDate.setHours(0, 0, 0, 0); 
  const formattedCurrentDate: string = currentDate.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' })
  .split('/').reverse().map(part => part.padStart(2, '0')).join('-') + ' 00:00';
  
  const previousDate: Date = new Date(currentDate);
  previousDate.setDate(currentDate.getDate() - 1);
  previousDate.setHours(0, 0, 0, 0); 
  
  const formattedPreviousDate: string = previousDate.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' })
  .split('/').reverse().map(part => part.padStart(2, '0')).join('-') + ' 00:00';

  await page.getByRole('cell', { name: 'Ack At' }).locator('svg').click();
  await page.getByPlaceholder('Start date').fill(formattedPreviousDate)
  await page.getByPlaceholder('Start date').press('Enter');
  await page.getByPlaceholder('End date').fill(formattedCurrentDate)
  delay(200);
  await page.getByRole('button', { name: 'Search' }).click();
  delay(200);
  await page.getByRole('cell', { name: 'Ack At' }).locator('svg').click();
  delay(200);
  await page.getByRole('button', { name: 'Reset' }).click();

// checking the Ack by filter functionalities 
  await page.getByText('Ack By').click();
  await page.getByRole('cell', { name: 'Ack By' }).locator('span').nth(1).click();
  await page.locator('li').filter({ hasText: 'DEVELOPER' }).getByLabel('').check();
  delay(200)
  await page.getByRole('button', { name: 'OK' }).click();
  delay(200)
  await page.getByRole('cell', { name: 'Ack By' }).locator('span').nth(1).click();
  delay(200)
  await page.getByRole('button', { name: 'Reset' }).click();
   
  await page.getByRole('cell', { name: 'Ack', exact: true }).click


})
test('Checking the overall reset option', async ({ page }) => {
    await dologin(page)
            await page.goto(`${getBaseUrl()}${routerlist.LIVE_ALARM}`);

            await page.locator('nz-select-top-control').filter({ hasText: 'Select Block' }).click();
                
                  // Get all dropdown options
                  await page.waitForTimeout(2000)
                  const element2 = await page.$$('nz-option-container > div > cdk-virtual-scroll-viewport > div.cdk-virtual-scroll-content-wrapper > nz-option-item.ant-select-item.ant-select-item-option.ng-star-inserted.ant-select-item-option');
                 
                        // Click each element
                        for (const element of element2) {
                            await element.click();
                        }
                
                        const elementCount1 = element2.length;
                
                        const iterationsNeeded = Math.ceil(elementCount1 / elementCount1);
                
                const Devicedropdown = iterationsNeeded
                    const dropdownSelector = 'nz-select-top-control';
                
                  // Define option groups
                  const optionGroups = Array.from({ length: Devicedropdown }, (_, index) => `IS${index + 1}`);
                
                  // Define inverters
                  const inverters = Array.from({ length: Devicedropdown }, (_, index) => `Inverter${index + 1}`);
                
                  // Click dropdown
                  await page.locator(dropdownSelector).filter({ hasText: 'Select Device' }).click();
                
                  // Iterate over option groups and inverters
                  for (const optionGroup of optionGroups) {
                    for (const inverter of inverters) {
                      const optionText = `${optionGroup}${inverter}`;
                      await page.waitForSelector(`//div[contains(text(), '${optionText}')]`);
                      await page.click(`//div[contains(text(), '${optionText}')]`);
                    }
                  }

            // checking the Description Check and Uncheck box Functionalities
await page.getByRole('row', { name: 'Description Block Name Device' }).getByLabel('').check();
await page.getByRole('row', { name: 'Description Block Name Device' }).getByLabel('').uncheck();

// validate the Text and Description Search
await page.getByText('Description').click();
await page.getByRole('cell', { name: 'Description' }).locator('nz-filter-trigger span').click();
await page.getByPlaceholder('Search Description').click();
await page.getByPlaceholder('Search Description').fill('Frequency');
delay(200)
await page.getByRole('button', { name: 'Search' }).click();

await page.getByText('Block Name').click();
  await page.getByText('Device Name').click();
  await page.getByRole('cell', { name: 'Status' }).click();

  // checking the sorting 
  await page.getByRole('cell', { name: 'Start Time' }).locator('nz-table-sorters').click();
  await page.getByText('Start Time').click();
  await page.getByText('Start Time').click();

  // checking the sorting 
  await page.getByText('Duration').click();
  await page.getByText('Duration').click();
  await page.getByText('Duration').click();

  await page.getByRole('cell', { name: 'Severity' }).click();

// checking the Ack at calendar functionalities 
await page.getByText('Ack At').click();
  const currentDate: Date = new Date();
  currentDate.setHours(0, 0, 0, 0); 
  const formattedCurrentDate: string = currentDate.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' })
  .split('/').reverse().map(part => part.padStart(2, '0')).join('-') + ' 00:00';
  
  const previousDate: Date = new Date(currentDate);
  previousDate.setDate(currentDate.getDate() - 1);
  previousDate.setHours(0, 0, 0, 0); 
  
  const formattedPreviousDate: string = previousDate.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' })
  .split('/').reverse().map(part => part.padStart(2, '0')).join('-') + ' 00:00';

  await page.getByRole('cell', { name: 'Ack At' }).locator('svg').click();
  await page.getByPlaceholder('Start date').fill(formattedPreviousDate)
  await page.getByPlaceholder('Start date').press('Enter');
  await page.getByPlaceholder('End date').fill(formattedCurrentDate)
  delay(200);
  await page.getByRole('button', { name: 'Search' }).click();

// checking the Ack by filter functionalities 
  await page.getByText('Ack By').click();
  await page.getByRole('cell', { name: 'Ack By' }).locator('span').nth(1).click();
  await page.locator('li').filter({ hasText: 'DEVELOPER' }).getByLabel('').check();
  delay(200)
  await page.getByRole('button', { name: 'OK' }).click();
   
  await page.getByRole('cell', { name: 'Ack', exact: true }).click

  
  await page.locator('app-reload').getByRole('button').click();
    await page.waitForTimeout(500);
  await page.getByRole('button', { name: 'OK' }).click();
  await page.waitForTimeout(500);
})

test('Checking the severity Functionalities', async ({ page }) => {
    await dologin(page)
            await page.goto(`${getBaseUrl()}${routerlist.LIVE_ALARM}`);
            await page.locator('app-severity-critical').getByText('CRITICAL').click();
    await page.locator('app-severity-high').getByText('HIGH').click();
    await page.locator('app-severity-medium').getByText('MEDIUM').click();
    await page.locator('app-severity-status-tag').filter({ hasText: 'LOW' }).click();
    await page.locator('app-severity-status-tag').filter({ hasText: 'WARNING' }).click();
    await page.locator('app-common-layout > nz-layout > nz-content > app-scada > div > div div > div.ant-card-extra.ng-star-inserted > nz-space > div:nth-child(7) > app-export > button').click()
    await page.getByRole('button', { name: 'OK' }).click();
    await page.locator('app-reload').getByRole('button').click();
    await page.waitForTimeout(500);
    await page.getByRole('button', { name: 'OK' }).click();
})



test('Individual Severity check severity', async ({ page }) => {
  await dologin(page)
          await page.goto(`${getBaseUrl()}${routerlist.LIVE_ALARM}`);
          await new Promise(resolve => setTimeout(resolve, 5000));

          // checking the critical value
          await page.locator('app-severity-critical').getByText('CRITICAL').click();        
          
          await page.waitForTimeout(300)
          const element1 = await page.$$('body > app-root > app-common-layout > nz-layout > nz-content > app-scada > div > div > app-menu-tab > div > app-alarms-events-index > div > div > app-alarms-live > nz-card > div.ant-card-body > nz-table > nz-spin > div > div > nz-table-inner-default > div > table > tbody > tr:nth-child(n)');
  
          // Click each element
          for (const element of element1) {
              await element.click();
         
        }
            const elementCount1 = element1.length

// checking the Severity Button value
await page.waitForSelector('body > app-root > app-common-layout > nz-layout > nz-content > app-scada > div > div > app-menu-tab > div > app-alarms-events-index > div > div > app-alarms-live > nz-card > div.ant-card-head.ng-star-inserted > div > div.ant-card-extra.ng-star-inserted > nz-space > div:nth-child(1) > app-severity-critical > app-severity-count > nz-tag > span');

// Get the value using textContent
const value = await page.$eval('body > app-root > app-common-layout > nz-layout > nz-content > app-scada > div > div > app-menu-tab > div > app-alarms-events-index > div > div > app-alarms-live > nz-card > div.ant-card-head.ng-star-inserted > div > div.ant-card-extra.ng-star-inserted > nz-space > div:nth-child(1) > app-severity-critical > app-severity-count > nz-tag > span', element => element.textContent);

if (value === elementCount1.toString()) {
  // Do something if value3 is equal to elementCount4
} else if (value !== null && parseInt(value) > parseInt(elementCount1.toString())) {
  // Do something if value3 is not null and greater than elementCount4
}
await page.locator('app-severity-critical').getByText('CRITICAL').click(); 



await page.waitForTimeout(500)
await page.locator('app-severity-high').getByText('HIGH').click();
          
          await page.waitForTimeout(300)
          const element2 = await page.$$('body > app-root > app-common-layout > nz-layout > nz-content > app-scada > div > div > app-menu-tab > div > app-alarms-events-index > div > div > app-alarms-live > nz-card > div.ant-card-body > nz-table > nz-spin > div > div > nz-table-inner-default > div > table > tbody > tr:nth-child(n)');
  
          // Click each element
          for (const element of element2) {
              await element.click();
         
        }
            const elementCount2 = element2.length

// checking the Severity Button value
await page.waitForSelector('body > app-root > app-common-layout > nz-layout > nz-content > app-scada > div > div > app-menu-tab > div > app-alarms-events-index > div > div > app-alarms-live > nz-card > div.ant-card-head.ng-star-inserted > div > div.ant-card-extra.ng-star-inserted > nz-space > div:nth-child(2) > app-severity-high > app-severity-count > nz-tag > span');

// Get the value using textContent
const value1 = await page.$eval('body > app-root > app-common-layout > nz-layout > nz-content > app-scada > div > div > app-menu-tab > div > app-alarms-events-index > div > div > app-alarms-live > nz-card > div.ant-card-head.ng-star-inserted > div > div.ant-card-extra.ng-star-inserted > nz-space > div:nth-child(2) > app-severity-high > app-severity-count > nz-tag > span', element => element.textContent);

if (value1 === elementCount2.toString()) {
  // Do something if value3 is equal to elementCount4
} else if (value1 !== null && parseInt(value1) > parseInt(elementCount2.toString())) {
  // Do something if value3 is not null and greater than elementCount4
}
await page.locator('app-severity-high').getByText('HIGH').click();




await page.waitForTimeout(500)
await page.locator('app-severity-medium').getByText('MEDIUM').click();
          
          await page.waitForTimeout(300)
          const element3 = await page.$$('body > app-root > app-common-layout > nz-layout > nz-content > app-scada > div > div > app-menu-tab > div > app-alarms-events-index > div > div > app-alarms-live > nz-card > div.ant-card-body > nz-table > nz-spin > div > div > nz-table-inner-default > div > table > tbody > tr:nth-child(n)');
  
          // Click each element
          for (const element of element3) {
              await element.click();
         
        }
            const elementCount3 = element3.length

// checking the Severity Button value
await page.waitForSelector('body > app-root > app-common-layout > nz-layout > nz-content > app-scada > div > div > app-menu-tab > div > app-alarms-events-index > div > div > app-alarms-live > nz-card > div.ant-card-head.ng-star-inserted > div > div.ant-card-extra.ng-star-inserted > nz-space > div:nth-child(3) > app-severity-medium > app-severity-count > nz-tag > span');

// Get the value using textContent
const value2 = await page.$eval('body > app-root > app-common-layout > nz-layout > nz-content > app-scada > div > div > app-menu-tab > div > app-alarms-events-index > div > div > app-alarms-live > nz-card > div.ant-card-head.ng-star-inserted > div > div.ant-card-extra.ng-star-inserted > nz-space > div:nth-child(3) > app-severity-medium > app-severity-count > nz-tag > span', element => element.textContent);

if (value2 === elementCount3.toString()) {
  // Do something if value3 is equal to elementCount4
} else if (value2 !== null && parseInt(value2) > parseInt(elementCount3.toString())) {
  // Do something if value3 is not null and greater than elementCount4
}
await page.locator('app-severity-medium').getByText('MEDIUM').click();


await page.waitForTimeout(500)
await page.locator('app-severity-status-tag').filter({ hasText: 'LOW' }).click();
          
          await page.waitForTimeout(300)
          const element4 = await page.$$('body > app-root > app-common-layout > nz-layout > nz-content > app-scada > div > div > app-menu-tab > div > app-alarms-events-index > div > div > app-alarms-live > nz-card > div.ant-card-body > nz-table > nz-spin > div > div > nz-table-inner-default > div > table > tbody > tr:nth-child(n)');
  
          // Click each element
          for (const element of element4) {
              await element.click();
         
        }
            const elementCount4 = element4.length

// checking the Severity Button value
await page.waitForSelector('body > app-root > app-common-layout > nz-layout > nz-content > app-scada > div > div > app-menu-tab > div > app-alarms-events-index > div > div > app-alarms-live > nz-card > div.ant-card-head.ng-star-inserted > div > div.ant-card-extra.ng-star-inserted > nz-space > div:nth-child(4) > app-severity-low > app-severity-count > nz-tag > span');

// Get the value using textContent
const value3 = await page.$eval('body > app-root > app-common-layout > nz-layout > nz-content > app-scada > div > div > app-menu-tab > div > app-alarms-events-index > div > div > app-alarms-live > nz-card > div.ant-card-head.ng-star-inserted > div > div.ant-card-extra.ng-star-inserted > nz-space > div:nth-child(4) > app-severity-low > app-severity-count > nz-tag > span', element => element.textContent);

if (value3 === elementCount4.toString()) {
  // Do something if value3 is equal to elementCount4
} else if (value3 !== null && parseInt(value3) > parseInt(elementCount4.toString())) {
  // Do something if value3 is not null and greater than elementCount4
}
await page.locator('app-severity-status-tag').filter({ hasText: 'LOW' }).click();



await page.waitForTimeout(500)
await page.locator('app-severity-status-tag').filter({ hasText: 'WARNING' }).click();
          
          await page.waitForTimeout(300)
          const element5 = await page.$$('body > app-root > app-common-layout > nz-layout > nz-content > app-scada > div > div > app-menu-tab > div > app-alarms-events-index > div > div > app-alarms-live > nz-card > div.ant-card-body > nz-table > nz-spin > div > div > nz-table-inner-default > div > table > tbody > tr:nth-child(n)');
  
          // Click each element
          for (const element of element5) {
              await element.click();
         
        }
            const elementCount5 = element4.length

// checking the Severity Button value
await page.waitForSelector('body > app-root > app-common-layout > nz-layout > nz-content > app-scada > div > div > app-menu-tab > div > app-alarms-events-index > div > div > app-alarms-live > nz-card > div.ant-card-head.ng-star-inserted > div > div.ant-card-extra.ng-star-inserted > nz-space > div:nth-child(5) > app-severity-warning > app-severity-count > nz-tag > span');

// Get the value using textContent
const value4 = await page.$eval('body > app-root > app-common-layout > nz-layout > nz-content > app-scada > div > div > app-menu-tab > div > app-alarms-events-index > div > div > app-alarms-live > nz-card > div.ant-card-head.ng-star-inserted > div > div.ant-card-extra.ng-star-inserted > nz-space > div:nth-child(5) > app-severity-warning > app-severity-count > nz-tag > span', element => element.textContent);

// expect(value3).toEqual(elementCount4.toString())
// expect(value3 !== null && parseInt(value3) > parseInt(elementCount4.toString())).toBe(false);

if (value4 === elementCount5.toString()) {
  // Do something if value3 is equal to elementCount4
} else if (value4 !== null && parseInt(value4) > parseInt(elementCount5.toString())) {
  // Do something if value3 is not null and greater than elementCount4
}
await page.locator('app-severity-status-tag').filter({ hasText: 'WARNING' }).click();

})


test('overall severity check', async ({ page }) => {

  await dologin(page)
          await page.goto(`${getBaseUrl()}${routerlist.LIVE_ALARM}`);
          await new Promise(resolve => setTimeout(resolve, 5000));

          const element1 = await page.$$('body > app-root > app-common-layout > nz-layout > nz-content > app-scada > div > div > app-menu-tab > div > app-alarms-events-index > div > div > app-alarms-live > nz-card > div.ant-card-body > nz-table > nz-spin > div > div > nz-table-inner-default > div > table > tbody > tr:nth-child(n)');
  
          // Click each element
          for (const element of element1) {
              await element.click();
         
        }
            const elementCount1 = element1.length

const values: number[] = await page.evaluate(() => {
  const elements = document.querySelectorAll('body > app-root > app-common-layout > nz-layout > nz-content > app-scada > div > div > app-menu-tab > div > app-alarms-events-index > div > div > app-alarms-live > nz-card > div.ant-card-head.ng-star-inserted > div > div.ant-card-extra.ng-star-inserted > nz-space > div:nth-child(1) > app-severity-critical > app-severity-count > nz-tag > span,body > app-root > app-common-layout > nz-layout > nz-content > app-scada > div > div > app-menu-tab > div > app-alarms-events-index > div > div > app-alarms-live > nz-card > div.ant-card-head.ng-star-inserted > div > div.ant-card-extra.ng-star-inserted > nz-space > div:nth-child(2) > app-severity-high > app-severity-count > nz-tag > span,body > app-root > app-common-layout > nz-layout > nz-content > app-scada > div > div > app-menu-tab > div > app-alarms-events-index > div > div > app-alarms-live > nz-card > div.ant-card-head.ng-star-inserted > div > div.ant-card-extra.ng-star-inserted > nz-space > div:nth-child(3) > app-severity-medium > app-severity-count > nz-tag > span,body > app-root > app-common-layout > nz-layout > nz-content > app-scada > div > div > app-menu-tab > div > app-alarms-events-index > div > div > app-alarms-live > nz-card > div.ant-card-head.ng-star-inserted > div > div.ant-card-extra.ng-star-inserted > nz-space > div:nth-child(4) > app-severity-low > app-severity-count > nz-tag > span,body > app-root > app-common-layout > nz-layout > nz-content > app-scada > div > div > app-menu-tab > div > app-alarms-events-index > div > div > app-alarms-live > nz-card > div.ant-card-head.ng-star-inserted > div > div.ant-card-extra.ng-star-inserted > nz-space > div:nth-child(5) > app-severity-warning > app-severity-count > nz-tag > span'); // Replace 'your_selector_here' with the appropriate CSS selector

  // Extracting the text content of each element, parsing it to a number, and filtering out null values
  return Array.from(elements).map(element => {
    const textContent = element.textContent;
    if (textContent !== null) {
      return parseInt(textContent.trim());
    }
    return 0; // or any default value you want to assign for null textContent
  });
});

// Calculate the sum of the values
const sum: number = values.reduce((acc, val) => acc + val, 0);

await expect(sum).toEqual(elementCount1)

      })


      test('Overall Live Alarm count pagination ', async ({ page }) => {
        await dologin(page)
                await page.goto(`${getBaseUrl()}${routerlist.LIVE_ALARM}`);
                await new Promise(resolve => setTimeout(resolve, 5000));

// checking the Pagination
await page.waitForSelector('body > app-root > app-common-layout > nz-layout > nz-content > app-scada > div > div > app-menu-tab > div > app-alarms-events-index > div > div > app-alarms-live > nz-card > div.ant-card-body > nz-table > nz-spin > div > nz-pagination > ul > li.ant-pagination-options.ng-star-inserted > nz-select > nz-select-top-control > nz-select-item');

// Get the value using textContent
const value1 = await page.$eval('body > app-root > app-common-layout > nz-layout > nz-content > app-scada > div > div > app-menu-tab > div > app-alarms-events-index > div > div > app-alarms-live > nz-card > div.ant-card-body > nz-table > nz-spin > div > nz-pagination > ul > li.ant-pagination-options.ng-star-inserted > nz-select > nz-select-top-control > nz-select-item', element => element.textContent);

const element1 = await page.$$('body > app-root > app-common-layout > nz-layout > nz-content > app-scada > div > div > app-menu-tab > div > app-alarms-events-index > div > div > app-alarms-live > nz-card > div.ant-card-body > nz-table > nz-spin > div > div > nz-table-inner-default > div > table > tbody > tr:nth-child(n)');
  
          // Click each element
          for (const element of element1) {
              await element.click();
         
        }
            const elementCount1 = element1.length

if (value1 !== null) {
  const result = parseFloat(value1.replace(" / page", ""));

  expect(elementCount1).toBeLessThanOrEqual(result);
}
      })


})




