import {test, expect} from '@playwright/test'

// Pre-conditions for each describe will be different, can have many describes in a spec file
test.describe('Localhost Suite', ()=> {

    test.beforeEach(async ({page})=>{
    //check commands if they return a promise to add the await word   
        await page.goto('http://localhost:4200/')
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
    })

    // page is a fixture that is the main blank page
    test('locator syntax rules', async ({page})=> {
        //by Tag Name
        page.locator('input').first().click()

        //locator doesn't return a promise
        page.locator('#inputEmail1').click()
        // by Class
        page.locator('.shape-rectangle')
        //by attribute
        page.locator('[placeholder="Email"]')
        //by class value - full value
        page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')
        //combine selectors - without space between tag and attribute
        page.locator('input[placeholder="Email"]')
        //by partial text match
        page.locator(':text("Using")')
        //by exact text match
        page.locator(':text-is("Using the Grid"')

    })
    
    test('Navigate to Datepicker', async ({page})=> {
        //by role to check what the user sees...so if an input has a text the user should be able to read
        await page.getByRole('textbox', {name: "Email"}).first().click()
        //Label that has some text
        await page.getByLabel('Email').first().click()
        //place holder
        await page.getByPlaceholder('Jane Doe').click()
        //any static text displayed on the page
        await page.getByText('Using the Grid').click()
        
        await page.getByTitle('IoT Dashboard').click()

        await page.getByTestId('SignIn')

})
    test('Locating child elements', async ({page})=> {
        //this is taking the nb-radio element that is child of nb-card with text Option 1
        await page.locator('nb-card nb-radio :text-is("Option 1")').click()
        //does the same thing as the one above, just the above is more compact
        await page.locator('nb-card').locator('nb.radio').locator(':text-is("Option 1")').click()
        //get By Role works using more user-facing specifc reference
        await page.locator('nb-card').getByRole('button', {name:"Sign in"}).first().click()
        //the least-preferable is the one below, is very dependent on the DOM tree
        await page.locator('nb-card').nth(3)
    })
    test('Locating parent elements', async ({page})=> {
        await page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: "Email"}).first().click()
        await page.locator('nb-card', {has: page.locator('#inputEmail1')}).getByRole('textbox', {name: "Email"}).first().click()
        //filter is a playwright specific function that can be used to achieve the same
        //1. When having a user-facing element getByRole
        //2. First we want to filter by one type, then being able to combine with other filters until getting a unique element
        await page.locator('nb-card').filter({hasText: "Basic form"}).getByRole('textbox', {name: "Email"}).first().click()
        await page.locator('nb-card').filter({has: page.locator('.status-danger')}).getByRole('textbox', {name: "Email"}).first().click()
        await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText: "Sign in"})
            .getByRole('textbox', {name: "Email"}).first().click()

        //when going one level up---from child to parent
        //(..) goes one level up in the DOM
        await page.locator(':text-is("Using the Grid').locator('..')
    })
    test('Reuse locators', async ({page})=> {
        const basicForm = page.locator('nb-card').filter({hasText: "Basic form"})
        const emailField = basicForm.getByRole('textbox', {name: "Email"})
        await emailField.fill('test@test.com')
        await basicForm.getByRole('textbox', {name: "Password"}).first().fill('supersecret')
        await basicForm.getByRole('button').click()
        await expect(emailField).toHaveValue('test@test.com')
    })
    test('Grabbing Text from elements', async ({page})=> {
        const basicForm = page.locator('nb-card').filter({hasText: "Basic form"})
        // Gets the text from the button and saves it in the var buttonText
        const buttonText = await basicForm.locator('button').textContent()
        // Checks the text of the element equals
        expect(buttonText).toEqual('Submit')

        //Grab text from 3 (all) radio buttons - this saves the text in an array
        const allRadioBtnLabels = await page.locator('nb-radio').allTextContents()
        // Validates from all radio buttons, at least one contains Option 1 label6
        expect(allRadioBtnLabels).toContain('Option 1')

        //find value of input
        const emailField = basicForm.getByRole('textbox', {name: "Email"})
        await emailField.fill("something@bla.com")
        const emailValue = await emailField.inputValue() // this text is not part of the DOM, but is inside an input
        expect(emailValue).toEqual('something@bla.com')

        const placeholder = await emailField.getAttribute('placeholder')
        expect(placeholder).toEqual('Email')
    })
    //Assertions
    test('Assertions', async ({page})=> {
        const basicFormButton = page.locator('nb-card').filter({hasText: "Basic form"}).locator('button')

        // General Assertions
        const value = 5
        expect(value).toEqual(5)
        const text = await basicFormButton.textContent()
        expect(text).toEqual('Submit')

        //Locator assertion - wait up to 5 secs by default
        await expect(basicFormButton).toHaveText('Submit')

        //Soft Assertion - test will continue even if assertion fails
        //Using soft assertion is not a good practice
        await expect.soft(basicFormButton).toHaveText('Submit')
        await basicFormButton.click()
    })
   })
// try not to use after hooks, they provide flakyness
// XPATH shouldn't be used with Playwright
