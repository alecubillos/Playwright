import { Page, Locator } from "@playwright/test";

export class FormLayoutsPage {
    private readonly page: Page
    elements = {
        getForm: (formName: string) => this.page.locator('nb-card', {hasText: `${formName}`})
    }

    constructor (page: Page){
        this.page= page
    }

    async submitUsingTheGridFormatWithCredentialsAndSelectOption(email: string, password: string, optionText: string){
        const ustingTheGridForm: Locator = this.elements.getForm('Using the Grid')
        await ustingTheGridForm.getByRole('textbox', {name:'Email'}).fill(email)
        await ustingTheGridForm.getByRole('textbox', {name:'Password'}).fill(password)
        await ustingTheGridForm.getByRole('radio', {name: optionText}).check({force:true})
        await ustingTheGridForm.getByRole('button').click()
    }

    async submitInlineFormWithCredentialsAndCheckBox(name: string, email: string, rememberMe: boolean){
        const inLineForm: Locator = this.elements.getForm('Inline form')
        await inLineForm.getByRole('textbox', {name:'Jane Doe'}).fill(name)
        await inLineForm.getByRole('textbox', {name:"Email"}).fill(email)
        if(rememberMe){
            await inLineForm.getByRole('checkbox').check({force:true})
        }
        await inLineForm.getByRole('button').click()
    }
}