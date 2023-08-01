describe('Home Navigation ', () => {
  it('should navigate to the sign in page for user without session', () => {
    cy.visit('/home')
    cy.findByText(/oec/i)
    const link = cy.findByRole('link', {name: /oec data/i})
    link.findByText(/data/i)
    cy.findByText(/log in/i)
    cy.findByRole('link', {
      name: /create an account/i,
    })
  })

  it('should display user email', () => {
    cy.loginAsNewUser().then(user => {
      cy.visit('/home')
      cy.findByTestId('user-display').should(
        'have.text',
        `Hello, ${user.email}`,
      )
    })
  })

  it('should render combobox for authenticated user', () => {
    cy.loginAsNewUser().then(user => {
      cy.visit('/home')
      cy.findByRole('combobox', {name: /country/i})
    })
  })
})

describe('Country Navigation ', () => {
  it('should redirect to home when no country name', () => {
    cy.loginAsNewUser().then(user => {
      cy.visit('/country/saarg?')
      cy.findByText(/log out/i)
      cy.findByText(/Find trade data in outer space/i)
    })
  })
})
