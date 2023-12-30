import { render, screen } from '@testing-library/svelte'
import { describe, it, expect, beforeEach } from 'vitest'
// import Login from '$pages/(auth)/login/+page.svelte'
import Contact from '$/components/Contact.svelte'

describe('Contact Form', () => {
    beforeEach(() => {
        render(Contact)
    })

    it('Should be displayed', () => {
        const header = screen.queryByText('Contact')

        expect(header).not.toBeFalsy()
        expect(header).toBeInTheDocument()
    })

    it('Should have empty inputs', () => {
        const inputs = document.querySelectorAll(':is(input[type="text"], textarea)')

        for (const input of inputs) {
            expect(input).not.toBeFalsy()
            expect(input).toBeInTheDocument()
            expect(input).toHaveValue('')
        }
    })
})
