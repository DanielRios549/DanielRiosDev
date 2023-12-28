import 'vitest-dom/extend-expect'
import { render, screen } from '@testing-library/svelte'
import { describe, test, expect } from 'vitest'
// import Login from '$pages/(auth)/login/+page.svelte'
import Contact from '$/components/Contact.svelte'

describe('Input Values', () => {
    test('Contact inputs should be empty', () => {
        render(Contact)
        expect(screen.getAllByText('Contact')).toBeInTheDocument()
    })
})
