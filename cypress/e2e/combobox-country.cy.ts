describe('Country Combobox', () => {
  it('should type and search for a country', () => {
    cy.loginAsNewUser().then(user => {
      cy.visit('/home')
      const combo = cy.findByRole('combobox', {name: /country/i})
      combo.type('argen')
      cy.findByText(/argentina/i)
    })
  })

  it('should click a country and navigate to country[id]', () => {
    cy.loginAsNewUser().then(user => {
      cy.visit('/home')
      const combo = cy.findByRole('combobox', {name: /country/i})
      combo.type('argent')
      cy.findByText(/argentina/i).click()
      cy.findByRole('heading', {
        name: /national trade data/i,
      })
    })
  })
})
