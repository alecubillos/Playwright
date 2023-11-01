import {test, expect} from '@playwright/test'

//Doc Awaitability
//Check text that shows up after 15 secs

test.beforeEach(async ({page})=> {
    page.goto('http://uitestingplayground.com/ajax')
    await page.getByText('Button Triggering AJAX Request').click()
})
test('Auto-Waiting', async ({page})=> {
    const successButton = page.locator('.bg-success')
    // bu default Playwright waits for 30 seconds to click on it
    //await successButton.click()
    const text = await successButton.textContent()
    expect(text).toEqual('Data loaded with AJAX get request.')
})
test('Auto-Attached element', async ({page})=> {
    const successButton = page.locator('.bg-success')
    //await successButton.waitFor({state: "attached"})

    // allTextContents doesn't have auto-waiting implemented
    // const text = await successButton.allTextContents()
    // expect(text).toEqual('Data loaded with AJAX get request.')

    //Fails if using this one, toHaveText waits for 5 secs
    //await expect(successButton).toHaveText('Data loaded with AJAX get request.')

    //timeout for toHaveText can be customized
    await expect(successButton).toHaveText('Data loaded with AJAX get request.', {timeout:20000})

})
test('Wait for Element', async ({page})=> {
    const successButton = page.locator('.bg-success')

    // wait for element
    await page.waitForSelector('.bg-success')
    const text = await successButton.allTextContents()
    expect(text).toContain('Data loaded with AJAX get request.')
})

// Response from API
test('Wait API Response', async ({page})=> {
    const successButton = page.locator('.bg-success')

    await page.waitForResponse('http://uitestingplayground.com/ajaxdata')
    const text = await successButton.allTextContents()
    expect(text).toContain('Data loaded with AJAX get request.')
})

//Wait for Network calls to be completed - NOT RECOMMENDED approach
//Some APIs might be too slow, and not relevant for the scenario in test
test('Wait All Network Calls', async ({page})=> {
    const successButton = page.locator('.bg-success')
    await page.waitForLoadState('networkidle')
    const text = await successButton.allTextContents()
    expect(text).toContain('Data loaded with AJAX get request.')
    //Note: try waitForTimeout, waitForURL, waitForEvent

})

test('Timeouts', async ({page})=> {
    const successButton = page.locator('.bg-success')
    await successButton.click()
})

