import {test, expect} from '@playwright/test'
import {NavigationPage} from '../page-objects/navigationPage'
import { FormLayoutsPage } from '../page-objects/formLayoutsPage'

test.beforeEach(async ({page})=>{
        await page.goto('http://localhost:4200/')
})

test('Navigate to form page', async({page}) => {
    const navigateTo = new NavigationPage(page)
    await navigateTo.formLayoutsPage()
    await navigateTo.datePickerPage()
    await navigateTo.smartTablePage()
    await navigateTo.toastrPage()
    await navigateTo.toolTipPage()
})

test('Parametrized methods', async({page}) => {
    const navigateTo = new NavigationPage(page)
    const onFormLayoutsPage = new FormLayoutsPage(page)
    await navigateTo.formLayoutsPage()
    await onFormLayoutsPage.submitUsingTheGridFormatWithCredentialsAndSelectOption("test@test.com", "123", "Option 1")
})

test('Inline From Options', async({page}) => {
    const navigateTo = new NavigationPage(page)
    const onFormLayoutsPage = new FormLayoutsPage(page)

    await navigateTo.formLayoutsPage()
    await onFormLayoutsPage.submitInlineFormWithCredentialsAndCheckBox("Ale", 'something@xml.com', true)
})