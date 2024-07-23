import { test, expect } from '@playwright/test';
import { delay } from '../../../utils/utils'
import { dologin } from '../../../utils/utils';
import { getBaseUrl } from '../../../../config';
import { routerlist } from '../../../utils/router.const'; 
import { Banner_variables } from '../../../utils/constant';


test.describe("Verify the functionalities and Value of Header component for Today", async () => {

test('test', async ({ page }) => {
            await dologin(page)
            const startTime = Date.now();
            await page.goto(`${getBaseUrl()}${routerlist.SCADA_URL}`);

    const endTime = Date.now();
    const pageLoadTime = endTime - startTime;
    expect(pageLoadTime).toBeLessThanOrEqual(1000)

            await page.getByRole('img', { name: 'logo' }).click();
            const currentDate = new Date();
           const day = currentDate.getDate().toString().padStart(2, '0');
           const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); 
           const year = currentDate.getFullYear();

const formattedDate = `${day}-${month}-${year}`;
 
// Set the options for formatting
const options: Intl.DateTimeFormatOptions = {
  timeZone: 'Asia/Kolkata', 
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false, 
};

// Format the date as a custom timestamp string in UTC+5:30 (Chennai) in 24-hour format
const timestamp: string = currentDate.toLocaleString('en-US', options);

             await page.getByRole('img', { name: 'logo' }).click();
             await page.getByText(Banner_variables.Plant_text).click();
             await page.getByText(timestamp)
             await page.locator('body > app-root > app-common-layout > nz-layout > app-header > nz-header > div > div.ant-col.ant-col-xs-12.ant-col-sm-12.ant-col-md-16.ant-col-lg-8.ant-col-xxl-8 > div > ul > li:nth-child(2) > nz-space > div:nth-child(2) > span').filter({ hasText: (formattedDate) }).click();

            //  Check the notification Icon
  await page.getByRole('img', { name: 'notifications' }).click();
            // selecting the Profile
  await page.locator('nz-avatar').first().click();
  await delay(300)

  await page.locator('nz-header').getByRole('img').nth(2).click();
  await page.locator('img:nth-child(4)').click();
  await page.locator('.overflow-button').first().click();

             // checking the Value limitaion of Active Power
             const element1 = await page.locator('nz-card').filter({ hasText: /Active Power[\d.]+MW/ }).first();
              // Extract the text from the element
             const powerText1: string = await element1.innerText();
             // Extract the numerical value from the text (assuming it's at the end)
             const powerValue1: number = Number(powerText1.match(/[\d.-]+/) ?? NaN);
             // Validate that the Peak Power value is between 0 and 1000

             // Check if powerValue is NaN
            if (isNaN(powerValue1)) {
            expect(powerValue1).toBeNaN();
            } else {
            expect(powerValue1).toBeGreaterThanOrEqual(0);
            expect(powerValue1).toBeLessThanOrEqual(1000);
            }

             const element = await page.locator('nz-card').filter({ hasText: /Peak Power[\d.-]+MW/ }).first();
              // Extract the text from the element
             const powerText: string = await element.innerText();
             // Extract the numerical value from the text (assuming it's at the end)
             const powerValue: number = Number(powerText.match(/[\d.-]+/) ?? NaN);
             // Validate that the Peak Power value is between 0 and 1000
             // Check if powerValue is NaN
            if (isNaN(powerValue)) {
            expect(powerValue).toBeNaN();
            } else {
            expect(powerValue).toBeGreaterThanOrEqual(0);
            expect(powerValue).toBeLessThanOrEqual(1000);
            }

             

            //  Verifying the POA Img 
             await page.locator('app-poa').getByRole('img').click();
            //  checking the Value limitaion of Peak Power
            await page.waitForSelector('text=POA -'); // Wait for POA - to appear
            await page.click('text=POA -');
            // Get the text content of the element containing POA -
            const poaElement = await page.waitForSelector('text=POA -');
            const poaText = await poaElement.innerText();
            // Extract the numerical value from the text (assuming it's at the end)
            const Value = parseInt(poaText.split('-')[1].trim());
            // Validate that the POA - value is between 0 and 1200
            expect(Value).toBeGreaterThanOrEqual(0)
            expect(Value).toBeLessThanOrEqual(1200);
            await page.locator('app-poa').getByText('W/m²').click();

            await page.locator('app-ghi').getByRole('img').click();
              await page.getByText('GHI -').click();
             await page.waitForSelector('text=GHI -');
             await page.click('text=GHI -');
             const ghiElement = await page.waitForSelector('text=GHI -');
             const ghiText = await ghiElement.innerText();
             const ghiValue = parseInt(ghiText.split('-')[1].trim());
             // Validate that the GHI - value is between 0 and 1200
             expect(ghiValue).toBeGreaterThanOrEqual(0);
             expect(ghiValue).toBeLessThanOrEqual(1200);
             await page.locator('app-ghi').getByText('W/m²').click();


             await page.locator('app-at').getByRole('img').click();
             await page.getByText('AT -').click();
             await page.waitForSelector('text=AT -');
             await page.click('text=AT -');
             const atElement = await page.waitForSelector('text=AT -');
             const atText = await atElement.innerText();
             const atValue = parseInt(atText.split('-')[1].trim());
             // Validate that the AT - value is between 0 and 70
             expect(atValue).toBeGreaterThanOrEqual(0);
             expect(atValue).toBeLessThanOrEqual(70);
             await page.locator('app-at').getByText('°C').click();
             

             await page.locator('app-mt').getByRole('img').click();
             await page.getByText('MT -').click();
             await page.waitForSelector('text=MT -');
             await page.click('text=MT -');
             const mtElement = await page.waitForSelector('text=MT -');
             const mtText = await mtElement.innerText();
             const mtValue = parseInt(mtText.split('-')[1].trim());
             // Validate that the MT - value is between 0 and 70
             expect(mtValue).toBeGreaterThanOrEqual(0);
             expect(mtValue).toBeLessThanOrEqual(70);
             await page.locator('app-mt').getByText('°C').click();

             await page.locator('app-rh').getByRole('img').click();
             await page.getByText('RH -').click();
             await page.waitForSelector('text=RH -');
             await page.click('text=RH -');
             const rhElement = await page.waitForSelector('text=RH -');
             const rhText = await rhElement.innerText();
             const rhValue = parseInt(rhText.split('-')[1].trim());
             // Validate that the RH - value is between 0 and 100
             expect(rhValue).toBeGreaterThanOrEqual(0);
             expect(rhValue).toBeLessThanOrEqual(100);
             await page.locator('app-rh').getByText('%').click();


             await page.locator('app-ws').getByRole('img').click();
             await page.getByText('WS -').click();
             await page.waitForSelector('text=WS -');
             await page.click('text=WS -');
             const wsElement = await page.waitForSelector('text=WS -');
             const wsText = await wsElement.innerText();
             const wsValue = parseInt(wsText.split('-')[1].trim());
             // Validate that the WS - value is between 0 and 80
             expect(wsValue).toBeGreaterThanOrEqual(0);
             expect(wsValue).toBeLessThanOrEqual(80);
             await page.getByText('m/s').click();

            // Validating the ST Time format with the range
          await page.getByText('ST -').click();
          await page.waitForSelector('text=ST -');
          await page.click('text=ST -');
          const stElement = await page.waitForSelector('text=ST -');
          const stText = await stElement.innerText();
          const timeComponents = stText.split('-')[1].trim().split(':').map(Number);
          const hours = timeComponents[0];
          const minutes = timeComponents[1];
          const seconds = timeComponents[2];
          // Validate the time format and range
          const isValidTime = hours >= 0 && hours < 24 && minutes >= 0 && minutes <= 59 && seconds >= 0 && seconds <= 59;
      
          if (isValidTime) {
              // Ensure that each component is zero-padded to maintain the format
              const formattedTime = timeComponents.map(component => component.toString().padStart(2, '0')).join(':');
              expect(formattedTime).toMatch(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/); // Expect assertion for time format
          }

           // Validating the ST Time format with the range
          await page.getByText('ET -').click();
          await page.waitForSelector('text=ET -');
          await page.click('text=ET -');
          const etElement = await page.waitForSelector('text=ET -');
          const etText = await etElement.innerText();
          const timeComponents1 = etText.split('-')[1].trim().split(':').map(Number);
          const hours1 = timeComponents1[0];
          const minutes1 = timeComponents1[1];
          const seconds1 = timeComponents1[2];
          // Validate the time format and range
          const isValidTime1 = hours1 >= 0 && hours1 < 24 && minutes1 >= 0 && minutes1 <= 59 && seconds1 >= 0 && seconds1 <= 59;
      
          if (isValidTime1) {
              // Ensure that each component is zero-padded to maintain the format
              const formattedTime1 = timeComponents.map(component => component.toString().padStart(2, '0')).join(':');
              expect(formattedTime1).toMatch(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/); // Expect assertion for time format
          }


          const numberElement = await page.waitForSelector('body > app-root > app-common-layout > nz-layout > nz-content > app-scada > div > app-scada-banner > div > div > div:nth-child(8) > nz-card > div > div:nth-child(1) > div:nth-child(1) > div.value');
          // Get the text content of the element
          const numberText = await numberElement.textContent();
          // Convert the text content to a float number
          const numberValue = parseFloat((numberText as string).replace(/[^\d.-]/g, '')); 
          const minRange = 0.00; 
          const maxRange = 30000.00; 
          if (isNaN(numberValue)) {
             expect(numberValue).toBeNaN();
                          } else {
                          expect(numberValue).toBeGreaterThanOrEqual(minRange);
                          expect(numberValue).toBeLessThanOrEqual(maxRange);
                          }
 
          //  Import Value checking 
          const numberElement2 = await page.waitForSelector('body > app-root > app-common-layout > nz-layout > nz-content > app-scada > div > app-scada-banner > div > div > div:nth-child(8) > nz-card > div > div:nth-child(1) > div:nth-child(2) > div.value');
          // Get the text content of the element
          const numberText2 = await numberElement2.textContent();
          // Convert the text content to a float number
          const numberValue2 = parseFloat((numberText2 as string).replace(/[^\d.-]/g, '')); 
          const minRange2 = 0.00; 
          const maxRange2 = 30000.00;
          if (isNaN(numberValue2)) {
             expect(numberValue2).toBeNaN();
                          } else {
                          expect(numberValue2).toBeGreaterThanOrEqual(minRange2);
                          expect(numberValue2).toBeLessThanOrEqual(maxRange2);
                          }
  
          //  PR Value checking 
          const numberElement3 = await page.waitForSelector('body > app-root > app-common-layout > nz-layout > nz-content > app-scada > div > app-scada-banner > div > div > div:nth-child(8) > nz-card > div > div:nth-child(1) > div:nth-child(3) > div.value');
          // Get the text content of the element
          const numberText3 = await numberElement3.textContent();
          // Convert the text content to a float number
          const numberValue3 = parseFloat((numberText3 as string).replace(/[^\d.-]/g, '')); 
          const minRange3 = 0.00; 
          const maxRange3 = 100.00; 
          if (isNaN(numberValue3)) {
             expect(numberValue3).toBeNaN();
                          } else {
                          expect(numberValue3).toBeGreaterThanOrEqual(minRange3);
                          expect(numberValue3).toBeLessThanOrEqual(maxRange3);
                          }
                          
                          
          //  PA Value checking 
          const numberElement4 = await page.waitForSelector('body > app-root > app-common-layout > nz-layout > nz-content > app-scada > div > app-scada-banner > div > div > div:nth-child(8) > nz-card > div > div:nth-child(1) > div:nth-child(4) > div.value');
          // Get the text content of the element
          const numberText4 = await numberElement4.textContent();
          // Convert the text content to a float number
          const numberValue4 = parseFloat((numberText4 as string).replace(/[^\d.-]/g, ''));
          const minRange4 = 0.00; 
          const maxRange4 = 100.00; 
          if (isNaN(numberValue4)) {
             expect(numberValue4).toBeNaN();
                          } else {
                          expect(numberValue4).toBeGreaterThanOrEqual(minRange4);
                          expect(numberValue4).toBeLessThanOrEqual(maxRange4);
                          }

            // T.GHI Value checking 
            const numberElement1 = await page.waitForSelector('body > app-root > app-common-layout > nz-layout > nz-content > app-scada > div > app-scada-banner > div > div > div:nth-child(8) > nz-card > div > div:nth-child(2) > div:nth-child(1) > div.value');
            // Get the text content of the element
            const numberText1 = await numberElement1.textContent();
            // Convert the text content to a float number
            const numberValue1 = parseFloat((numberText1 as string).replace(/[^\d.-]/g, ''));
            const minRange1 = 0.00; 
            const maxRange1 = 12.00;
            if (isNaN(numberValue1)) {
               expect(numberValue1).toBeNaN();
                            } else {
                            expect(numberValue1).toBeGreaterThanOrEqual(minRange1);
                            expect(numberValue1).toBeLessThanOrEqual(maxRange1);
                            }

             // T.POA Value checking 
            const numberElement5 = await page.waitForSelector('body > app-root > app-common-layout > nz-layout > nz-content > app-scada > div > app-scada-banner > div > div > div:nth-child(8) > nz-card > div > div:nth-child(2) > div:nth-child(2) > div.value');
            // Get the text content of the element
            const numberText5 = await numberElement5.textContent();
            // Convert the text content to a float number
            const numberValue5 = parseFloat((numberText5 as string).replace(/[^\d.-]/g, '')); 
            const minRange5 = 0.00; 
            const maxRange5 = 12.00; 
            if (isNaN(numberValue5)) {
               expect(numberValue5).toBeNaN();
                            } else {
                            expect(numberValue5).toBeGreaterThanOrEqual(minRange5);
                            expect(numberValue5).toBeLessThanOrEqual(maxRange5);
                            }

            // CUF Value checking 
            const numberElement6 = await page.waitForSelector('body > app-root > app-common-layout > nz-layout > nz-content > app-scada > div > app-scada-banner > div > div > div:nth-child(8) > nz-card > div > div:nth-child(2) > div:nth-child(3) > div.value');
            // Get the text content of the element
            const numberText6 = await numberElement6.textContent();
            // Convert the text content to a float number
            const numberValue6 = parseFloat((numberText6 as string).replace(/[^\d.-]/g, '')); 
            const minRange6 = 0.00; 
            const maxRange6 = 100.00; 
            if (isNaN(numberValue6)) {
               expect(numberValue6).toBeNaN();
                            } else {
                            expect(numberValue6).toBeGreaterThanOrEqual(minRange6);
                            expect(numberValue6).toBeLessThanOrEqual(maxRange6);
                            }

              // PLC Value checking 
              const numberElement7 = await page.waitForSelector('body > app-root > app-common-layout > nz-layout > nz-content > app-scada > div > app-scada-banner > div > div > div:nth-child(6) > div > div:nth-child(1) > app-plc > app-count-tag > nz-card > div > span.tag-container.ng-star-inserted');
              // Get the text content of the element
              const numberText7 = await numberElement7.textContent();
              // Convert the text content to a float number
              const numberValue7 = parseFloat((numberText7 as string).replace(/[^\d.-]/g, '')); 
              const minRange7 = 0.00;
              const maxRange7 = 1000.00; 
              if (isNaN(numberValue7)) {
                 expect(numberValue7).toBeNaN();
                              } else {
                              expect(numberValue7).toBeGreaterThanOrEqual(minRange7);
                              expect(numberValue7).toBeLessThanOrEqual(maxRange7);
                              }

              // INV Value checking 
              const numberElement8 = await page.waitForSelector('body > app-root > app-common-layout > nz-layout > nz-content > app-scada > div > app-scada-banner > div > div > div:nth-child(6) > div > div:nth-child(2) > app-inv > app-count-tag > nz-card > div > span.tag-container.ng-star-inserted');
              // Get the text content of the element
              const numberText8 = await numberElement8.textContent();
              // Convert the text content to a float number
              const numberValue8 = parseFloat((numberText8 as string).replace(/[^\d.-]/g, '')); 
              const minRange8 = 0.00;
              const maxRange8 = 1000.00; 
              if (isNaN(numberValue8)) {
                 expect(numberValue8).toBeNaN();
                              } else {
                              expect(numberValue8).toBeGreaterThanOrEqual(minRange8);
                              expect(numberValue8).toBeLessThanOrEqual(maxRange8);
                              }

             // checking the Active Power Color Code 
  const Activepower =page.locator("body > app-root > app-common-layout > nz-layout > nz-content > app-scada > div > app-scada-banner > div > div > div:nth-child(1) > app-active-power > app-card-header-big > nz-card")
  const color2 = await Activepower.evaluate((e) => {
    return window.getComputedStyle(e).getPropertyValue("background-image")
    })
  const Activepower1 = page.locator(".card-banner-color.bg-dark-green")
             const color1 = await Activepower1.evaluate((e) => {
             return window.getComputedStyle(e).getPropertyValue("background-image")
             })
             expect(color2).toEqual(color1)

            // Checking the PeakPower Color Code 
            const Peakpower = page.locator("body > app-root > app-common-layout > nz-layout > nz-content > app-scada > div > app-scada-banner > div > div > div:nth-child(2) > app-peak-power > app-card-header-big > nz-card");
const color3 = await Peakpower.evaluate((e) => {
    return window.getComputedStyle(e).getPropertyValue("background-image");
});

const Peakpower2 = page.locator(".card-banner-color.bg-orange");
const color4 = await Peakpower2.evaluate((e) => {
    return window.getComputedStyle(e).getPropertyValue("background-image");
});

expect(color3).toEqual(color4)

            
            // checking the PLC Orange color code 
            const plcColorcode  = page.locator("body > app-root > app-common-layout > nz-layout > nz-content > app-scada > div > app-scada-banner > div > div > div:nth-child(6) > div > div:nth-child(1) > app-plc > app-count-tag > nz-card > div > span.tag-container.ng-star-inserted > nz-tag:nth-child(1)")
            const color5 = await plcColorcode.evaluate((e) => {
            return window.getComputedStyle(e).getPropertyValue("background-color")
            })
            expect(color5).toBe("rgb(255, 169, 64)")

            // checking the PLC Green color code 
            const plcColorcode1  = page.locator("body > app-root > app-common-layout > nz-layout > nz-content > app-scada > div > app-scada-banner > div > div > div:nth-child(6) > div > div:nth-child(1) > app-plc > app-count-tag > nz-card > div > span.tag-container.ng-star-inserted > nz-tag:nth-child(3)")
            const color6 = await plcColorcode1.evaluate((e) => {
            return window.getComputedStyle(e).getPropertyValue("background-color")
            })
            expect(color6).toBe("rgb(115, 209, 61)")


            // checking the INV Orange color code 
            const invColorcode  = page.locator("body > app-root > app-common-layout > nz-layout > nz-content > app-scada > div > app-scada-banner > div > div > div:nth-child(6) > div > div:nth-child(2) > app-inv > app-count-tag > nz-card > div > span.tag-container.ng-star-inserted > nz-tag:nth-child(1)")
            const color7 = await invColorcode.evaluate((e) => {
            return window.getComputedStyle(e).getPropertyValue("background-color")
            })
            expect(color7).toBe("rgb(255, 169, 64)")

            // checking the INV Green color code 
            const invColorcode1  = page.locator("body > app-root > app-common-layout > nz-layout > nz-content > app-scada > div > app-scada-banner > div > div > div:nth-child(6) > div > div:nth-child(2) > app-inv > app-count-tag > nz-card > div > span.tag-container.ng-star-inserted > nz-tag:nth-child(3)")
            const color8 = await invColorcode1.evaluate((e) => {
            return window.getComputedStyle(e).getPropertyValue("background-color")
            })
            expect(color8).toBe("rgb(115, 209, 61)")

    })
  })

  test.describe("Verify the Value of KPI for Yesterday", async () => {

    // await login(page);
    test('test', async ({ page }) => {
        await dologin(page)
        await page.goto(`${getBaseUrl()}${routerlist.SCADA_URL}`);

        await page.getByText('Yesterday').click();

                    //  Export value checking 
                    const numberElement = await page.waitForSelector('body > app-root > app-common-layout > nz-layout > nz-content > app-scada > div > app-scada-banner > div > div > div:nth-child(8) > nz-card > div > div:nth-child(1) > div:nth-child(1) > div.value');
                    // Get the text content of the element
                    const numberText = await numberElement.textContent();
                    // Convert the text content to a float number
                    const numberValue = parseFloat((numberText as string).replace(/[^\d.-]/g, '')); 
                    const minRange = 0.00; 
                    const maxRange = 30000.00; 
                    if (isNaN(numberValue)) {
                       expect(numberValue).toBeNaN();
                                    } else {
                                    expect(numberValue).toBeGreaterThanOrEqual(minRange);
                                    expect(numberValue).toBeLessThanOrEqual(maxRange);
                                    }
           
                    //  Import Value checking 
                    const numberElement2 = await page.waitForSelector('body > app-root > app-common-layout > nz-layout > nz-content > app-scada > div > app-scada-banner > div > div > div:nth-child(8) > nz-card > div > div:nth-child(1) > div:nth-child(2) > div.value');
                    // Get the text content of the element
                    const numberText2 = await numberElement2.textContent();
                    // Convert the text content to a float number
                    const numberValue2 = parseFloat((numberText2 as string).replace(/[^\d.-]/g, '')); 
                    const minRange2 = 0.00; 
                    const maxRange2 = 30000.00;
                    if (isNaN(numberValue2)) {
                       expect(numberValue2).toBeNaN();
                                    } else {
                                    expect(numberValue2).toBeGreaterThanOrEqual(minRange2);
                                    expect(numberValue2).toBeLessThanOrEqual(maxRange2);
                                    }
            
                    //  PR Value checking 
                    const numberElement3 = await page.waitForSelector('body > app-root > app-common-layout > nz-layout > nz-content > app-scada > div > app-scada-banner > div > div > div:nth-child(8) > nz-card > div > div:nth-child(1) > div:nth-child(3) > div.value');
                    // Get the text content of the element
                    const numberText3 = await numberElement3.textContent();
                    // Convert the text content to a float number
                    const numberValue3 = parseFloat((numberText3 as string).replace(/[^\d.-]/g, '')); 
                    const minRange3 = 0.00; 
                    const maxRange3 = 100.00; 
                    if (isNaN(numberValue3)) {
                       expect(numberValue3).toBeNaN();
                                    } else {
                                    expect(numberValue3).toBeGreaterThanOrEqual(minRange3);
                                    expect(numberValue3).toBeLessThanOrEqual(maxRange3);
                                    }
                                    
                                    
                    //  PA Value checking 
                    const numberElement4 = await page.waitForSelector('body > app-root > app-common-layout > nz-layout > nz-content > app-scada > div > app-scada-banner > div > div > div:nth-child(8) > nz-card > div > div:nth-child(1) > div:nth-child(4) > div.value');
                    // Get the text content of the element
                    const numberText4 = await numberElement4.textContent();
                    // Convert the text content to a float number
                    const numberValue4 = parseFloat((numberText4 as string).replace(/[^\d.-]/g, ''));
                    const minRange4 = 0.00; 
                    const maxRange4 = 100.00; 
                    if (isNaN(numberValue4)) {
                       expect(numberValue4).toBeNaN();
                                    } else {
                                    expect(numberValue4).toBeGreaterThanOrEqual(minRange4);
                                    expect(numberValue4).toBeLessThanOrEqual(maxRange4);
                                    }
        
                      // T.GHI Value checking 
                      const numberElement1 = await page.waitForSelector('body > app-root > app-common-layout > nz-layout > nz-content > app-scada > div > app-scada-banner > div > div > div:nth-child(8) > nz-card > div > div:nth-child(2) > div:nth-child(1) > div.value');
                      // Get the text content of the element
                      const numberText1 = await numberElement1.textContent();
                      // Convert the text content to a float number
                      const numberValue1 = parseFloat((numberText1 as string).replace(/[^\d.-]/g, ''));
                      const minRange1 = 0.00; 
                      const maxRange1 = 12.00;
                      if (isNaN(numberValue1)) {
                         expect(numberValue1).toBeNaN();
                                      } else {
                                      expect(numberValue1).toBeGreaterThanOrEqual(minRange1);
                                      expect(numberValue1).toBeLessThanOrEqual(maxRange1);
                                      }
        
                       // T.POA Value checking 
                      const numberElement5 = await page.waitForSelector('body > app-root > app-common-layout > nz-layout > nz-content > app-scada > div > app-scada-banner > div > div > div:nth-child(8) > nz-card > div > div:nth-child(2) > div:nth-child(2) > div.value');
                      // Get the text content of the element
                      const numberText5 = await numberElement5.textContent();
                      // Convert the text content to a float number
                      const numberValue5 = parseFloat((numberText5 as string).replace(/[^\d.-]/g, '')); 
                      const minRange5 = 0.00; 
                      const maxRange5 = 12.00; 
                      if (isNaN(numberValue5)) {
                         expect(numberValue5).toBeNaN();
                                      } else {
                                      expect(numberValue5).toBeGreaterThanOrEqual(minRange5);
                                      expect(numberValue5).toBeLessThanOrEqual(maxRange5);
                                      }
        
                      // CUF Value checking 
                      const numberElement6 = await page.waitForSelector('body > app-root > app-common-layout > nz-layout > nz-content > app-scada > div > app-scada-banner > div > div > div:nth-child(8) > nz-card > div > div:nth-child(2) > div:nth-child(3) > div.value');
                      // Get the text content of the element
                      const numberText6 = await numberElement6.textContent();
                      // Convert the text content to a float number
                      const numberValue6 = parseFloat((numberText6 as string).replace(/[^\d.-]/g, '')); 
                      const minRange6 = 0.00; 
                      const maxRange6 = 100.00; 
                      if (isNaN(numberValue6)) {
                         expect(numberValue6).toBeNaN();
                                      } else {
                                      expect(numberValue6).toBeGreaterThanOrEqual(minRange6);
                                      expect(numberValue6).toBeLessThanOrEqual(maxRange6);
                                      }

    })
  })


  test.describe("Verify the Value of KPI for Monthly", async () => {

    // await login(page);
    test('test', async ({ page }) => {
        await dologin(page)
        await page.goto(`${getBaseUrl()}${routerlist.SCADA_URL}`);
  await page.getByText('Monthly').click();

                    //  Export value checking 
                    const numberElement = await page.waitForSelector('body > app-root > app-common-layout > nz-layout > nz-content > app-scada > div > app-scada-banner > div > div > div:nth-child(8) > nz-card > div > div:nth-child(1) > div:nth-child(1) > div.value');
                    // Get the text content of the element
                    const numberText = await numberElement.textContent();
                    // Convert the text content to a float number
                    const numberValue = parseFloat((numberText as string).replace(/[^\d.-]/g, '')); 
                    const minRange = 0.00; 
                    const maxRange = 30000.00; 
                    if (isNaN(numberValue)) {
                       expect(numberValue).toBeNaN();
                                    } else {
                                    expect(numberValue).toBeGreaterThanOrEqual(minRange);
                                    expect(numberValue).toBeLessThanOrEqual(maxRange);
                                    }
           
                    //  Import Value checking 
                    const numberElement2 = await page.waitForSelector('body > app-root > app-common-layout > nz-layout > nz-content > app-scada > div > app-scada-banner > div > div > div:nth-child(8) > nz-card > div > div:nth-child(1) > div:nth-child(2) > div.value');
                    // Get the text content of the element
                    const numberText2 = await numberElement2.textContent();
                    // Convert the text content to a float number
                    const numberValue2 = parseFloat((numberText2 as string).replace(/[^\d.-]/g, '')); 
                    const minRange2 = 0.00; 
                    const maxRange2 = 30000.00;
                    if (isNaN(numberValue2)) {
                       expect(numberValue2).toBeNaN();
                                    } else {
                                    expect(numberValue2).toBeGreaterThanOrEqual(minRange2);
                                    expect(numberValue2).toBeLessThanOrEqual(maxRange2);
                                    }
            
                    //  PR Value checking 
                    const numberElement3 = await page.waitForSelector('body > app-root > app-common-layout > nz-layout > nz-content > app-scada > div > app-scada-banner > div > div > div:nth-child(8) > nz-card > div > div:nth-child(1) > div:nth-child(3) > div.value');
                    // Get the text content of the element
                    const numberText3 = await numberElement3.textContent();
                    // Convert the text content to a float number
                    const numberValue3 = parseFloat((numberText3 as string).replace(/[^\d.-]/g, '')); 
                    const minRange3 = 0.00; 
                    const maxRange3 = 100.00; 
                    if (isNaN(numberValue3)) {
                       expect(numberValue3).toBeNaN();
                                    } else {
                                    expect(numberValue3).toBeGreaterThanOrEqual(minRange3);
                                    expect(numberValue3).toBeLessThanOrEqual(maxRange3);
                                    }
                                    
                                    
                    //  PA Value checking 
                    const numberElement4 = await page.waitForSelector('body > app-root > app-common-layout > nz-layout > nz-content > app-scada > div > app-scada-banner > div > div > div:nth-child(8) > nz-card > div > div:nth-child(1) > div:nth-child(4) > div.value');
                    // Get the text content of the element
                    const numberText4 = await numberElement4.textContent();
                    // Convert the text content to a float number
                    const numberValue4 = parseFloat((numberText4 as string).replace(/[^\d.-]/g, ''));
                    const minRange4 = 0.00; 
                    const maxRange4 = 100.00; 
                    if (isNaN(numberValue4)) {
                       expect(numberValue4).toBeNaN();
                                    } else {
                                    expect(numberValue4).toBeGreaterThanOrEqual(minRange4);
                                    expect(numberValue4).toBeLessThanOrEqual(maxRange4);
                                    }
        
                      // T.GHI Value checking 
                      const numberElement1 = await page.waitForSelector('body > app-root > app-common-layout > nz-layout > nz-content > app-scada > div > app-scada-banner > div > div > div:nth-child(8) > nz-card > div > div:nth-child(2) > div:nth-child(1) > div.value');
                      // Get the text content of the element
                      const numberText1 = await numberElement1.textContent();
                      // Convert the text content to a float number
                      const numberValue1 = parseFloat((numberText1 as string).replace(/[^\d.-]/g, ''));
                      const minRange1 = 0.00; 
                      const maxRange1 = 12.00;
                      if (isNaN(numberValue1)) {
                         expect(numberValue1).toBeNaN();
                                      } else {
                                      expect(numberValue1).toBeGreaterThanOrEqual(minRange1);
                                      expect(numberValue1).toBeLessThanOrEqual(maxRange1);
                                      }
        
                       // T.POA Value checking 
                      const numberElement5 = await page.waitForSelector('body > app-root > app-common-layout > nz-layout > nz-content > app-scada > div > app-scada-banner > div > div > div:nth-child(8) > nz-card > div > div:nth-child(2) > div:nth-child(2) > div.value');
                      // Get the text content of the element
                      const numberText5 = await numberElement5.textContent();
                      // Convert the text content to a float number
                      const numberValue5 = parseFloat((numberText5 as string).replace(/[^\d.-]/g, '')); 
                      const minRange5 = 0.00; 
                      const maxRange5 = 12.00; 
                      if (isNaN(numberValue5)) {
                         expect(numberValue5).toBeNaN();
                                      } else {
                                      expect(numberValue5).toBeGreaterThanOrEqual(minRange5);
                                      expect(numberValue5).toBeLessThanOrEqual(maxRange5);
                                      }
        
                      // CUF Value checking 
                      const numberElement6 = await page.waitForSelector('body > app-root > app-common-layout > nz-layout > nz-content > app-scada > div > app-scada-banner > div > div > div:nth-child(8) > nz-card > div > div:nth-child(2) > div:nth-child(3) > div.value');
                      // Get the text content of the element
                      const numberText6 = await numberElement6.textContent();
                      // Convert the text content to a float number
                      const numberValue6 = parseFloat((numberText6 as string).replace(/[^\d.-]/g, '')); 
                      const minRange6 = 0.00; 
                      const maxRange6 = 100.00; 
                      if (isNaN(numberValue6)) {
                         expect(numberValue6).toBeNaN();
                                      } else {
                                      expect(numberValue6).toBeGreaterThanOrEqual(minRange6);
                                      expect(numberValue6).toBeLessThanOrEqual(maxRange6);
                                      }
    })
  })

  test.describe("Verify the Value of KPI for Yearly", async () => {

    // await login(page);
    test('test', async ({ page }) => {
        await dologin(page)
        await page.goto(`${getBaseUrl()}${routerlist.SCADA_URL}`);
  await page.getByText('Yearly').click();

                    //  Export value checking 
                    const numberElement = await page.waitForSelector('body > app-root > app-common-layout > nz-layout > nz-content > app-scada > div > app-scada-banner > div > div > div:nth-child(8) > nz-card > div > div:nth-child(1) > div:nth-child(1) > div.value');
                    // Get the text content of the element
                    const numberText = await numberElement.textContent();
                    // Convert the text content to a float number
                    const numberValue = parseFloat((numberText as string).replace(/[^\d.-]/g, '')); 
                    const minRange = 0.00; 
                    const maxRange = 30000.00; 
                    if (isNaN(numberValue)) {
                       expect(numberValue).toBeNaN();
                                    } else {
                                    expect(numberValue).toBeGreaterThanOrEqual(minRange);
                                    expect(numberValue).toBeLessThanOrEqual(maxRange);
                                    }
           
                    //  Import Value checking 
                    const numberElement2 = await page.waitForSelector('body > app-root > app-common-layout > nz-layout > nz-content > app-scada > div > app-scada-banner > div > div > div:nth-child(8) > nz-card > div > div:nth-child(1) > div:nth-child(2) > div.value');
                    // Get the text content of the element
                    const numberText2 = await numberElement2.textContent();
                    // Convert the text content to a float number
                    const numberValue2 = parseFloat((numberText2 as string).replace(/[^\d.-]/g, '')); 
                    const minRange2 = 0.00; 
                    const maxRange2 = 30000.00;
                    if (isNaN(numberValue2)) {
                       expect(numberValue2).toBeNaN();
                                    } else {
                                    expect(numberValue2).toBeGreaterThanOrEqual(minRange2);
                                    expect(numberValue2).toBeLessThanOrEqual(maxRange2);
                                    }
            
                    //  PR Value checking 
                    const numberElement3 = await page.waitForSelector('body > app-root > app-common-layout > nz-layout > nz-content > app-scada > div > app-scada-banner > div > div > div:nth-child(8) > nz-card > div > div:nth-child(1) > div:nth-child(3) > div.value');
                    // Get the text content of the element
                    const numberText3 = await numberElement3.textContent();
                    // Convert the text content to a float number
                    const numberValue3 = parseFloat((numberText3 as string).replace(/[^\d.-]/g, '')); 
                    const minRange3 = 0.00; 
                    const maxRange3 = 100.00; 
                    if (isNaN(numberValue3)) {
                       expect(numberValue3).toBeNaN();
                                    } else {
                                    expect(numberValue3).toBeGreaterThanOrEqual(minRange3);
                                    expect(numberValue3).toBeLessThanOrEqual(maxRange3);
                                    }
                                    
                                    
                    //  PA Value checking 
                    const numberElement4 = await page.waitForSelector('body > app-root > app-common-layout > nz-layout > nz-content > app-scada > div > app-scada-banner > div > div > div:nth-child(8) > nz-card > div > div:nth-child(1) > div:nth-child(4) > div.value');
                    // Get the text content of the element
                    const numberText4 = await numberElement4.textContent();
                    // Convert the text content to a float number
                    const numberValue4 = parseFloat((numberText4 as string).replace(/[^\d.-]/g, ''));
                    const minRange4 = 0.00; 
                    const maxRange4 = 100.00; 
                    if (isNaN(numberValue4)) {
                       expect(numberValue4).toBeNaN();
                                    } else {
                                    expect(numberValue4).toBeGreaterThanOrEqual(minRange4);
                                    expect(numberValue4).toBeLessThanOrEqual(maxRange4);
                                    }
        
                      // T.GHI Value checking 
                      const numberElement1 = await page.waitForSelector('body > app-root > app-common-layout > nz-layout > nz-content > app-scada > div > app-scada-banner > div > div > div:nth-child(8) > nz-card > div > div:nth-child(2) > div:nth-child(1) > div.value');
                      // Get the text content of the element
                      const numberText1 = await numberElement1.textContent();
                      // Convert the text content to a float number
                      const numberValue1 = parseFloat((numberText1 as string).replace(/[^\d.-]/g, ''));
                      const minRange1 = 0.00; 
                      const maxRange1 = 12.00;
                      if (isNaN(numberValue1)) {
                         expect(numberValue1).toBeNaN();
                                      } else {
                                      expect(numberValue1).toBeGreaterThanOrEqual(minRange1);
                                      expect(numberValue1).toBeLessThanOrEqual(maxRange1);
                                      }
        
                       // T.POA Value checking 
                      const numberElement5 = await page.waitForSelector('body > app-root > app-common-layout > nz-layout > nz-content > app-scada > div > app-scada-banner > div > div > div:nth-child(8) > nz-card > div > div:nth-child(2) > div:nth-child(2) > div.value');
                      // Get the text content of the element
                      const numberText5 = await numberElement5.textContent();
                      // Convert the text content to a float number
                      const numberValue5 = parseFloat((numberText5 as string).replace(/[^\d.-]/g, '')); 
                      const minRange5 = 0.00; 
                      const maxRange5 = 12.00; 
                      if (isNaN(numberValue5)) {
                         expect(numberValue5).toBeNaN();
                                      } else {
                                      expect(numberValue5).toBeGreaterThanOrEqual(minRange5);
                                      expect(numberValue5).toBeLessThanOrEqual(maxRange5);
                                      }
        
                      // CUF Value checking 
                      const numberElement6 = await page.waitForSelector('body > app-root > app-common-layout > nz-layout > nz-content > app-scada > div > app-scada-banner > div > div > div:nth-child(8) > nz-card > div > div:nth-child(2) > div:nth-child(3) > div.value');
                      // Get the text content of the element
                      const numberText6 = await numberElement6.textContent();
                      // Convert the text content to a float number
                      const numberValue6 = parseFloat((numberText6 as string).replace(/[^\d.-]/g, '')); 
                      const minRange6 = 0.00; 
                      const maxRange6 = 100.00; 
                      if (isNaN(numberValue6)) {
                         expect(numberValue6).toBeNaN();
                                      } else {
                                      expect(numberValue6).toBeGreaterThanOrEqual(minRange6);
                                      expect(numberValue6).toBeLessThanOrEqual(maxRange6);
                                      }
    })
   })