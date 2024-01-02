import { render, screen } from '@testing-library/svelte'
import { describe, it, expect, beforeEach } from 'vitest'
import Login from '$pages/(auth)/login/+page.svelte'
import Contact from '$/components/Contact.svelte'

// TODO: Convert imported name automatically to string
const forms: [typeof Login, string][] = [
    [Login, 'Login'],
    [Contact, 'Contact']
]

const inputTypes = ':is(input[type="text"], input[type="password"], textarea)'

for (const form of forms) {
    describe(`${form[1]} Form`, () => {
        beforeEach(() => {
            render(form[0])
        })

        if (form[1] === 'Login') {
            it('Logout text should not be displayed', () => {
                // TODO: Save common texts in a single place
                const text = screen.queryByText('You are already logged in')

                // TODO: Test login page with both logged in and out
                expect(text).toBeFalsy()
            })
        }

        it('Should have a title', () => {
            const header = screen.queryByText(form[1])

            expect(header).not.toBeFalsy()
            expect(header).toBeInTheDocument()
        })

        it('Should have empty inputs', () => {
            const inputs = document.querySelectorAll(inputTypes)

            for (const input of inputs) {
                expect(input).not.toBeFalsy()
                expect(input).toBeInTheDocument()
                expect(input).toHaveValue('')
            }
        })
    })
}
