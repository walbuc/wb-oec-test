import {expect} from 'chai'

describe('Year Combobox', () => {
  it('should have a default year', () => {
    cy.loginAsNewUser().then(user => {
      cy.visit('/country/saarg?name=Argentina')
      const combo = cy.findByRole('combobox', {name: /select a year/i})
      combo.should('have.value', '2018')
    })
  })

  it('should type and search for a year', () => {
    cy.loginAsNewUser().then(user => {
      cy.visit('/country/saarg?name=Argentina')
      const combo = cy.findByRole('combobox', {name: /select a year/i})
      combo.clear()
      combo.type('2020')
      // we display 2020 and a tag next to it with same value
      cy.findByTestId('year-display').should('have.text', '20202020')
    })
  })

  it('should click a country and update path', () => {
    cy.loginAsNewUser().then(user => {
      cy.visit('/country/saarg?name=Argentina')
      const combo = cy.findByRole('combobox', {name: /select a year/i})
      combo.clear()
      combo.type('2015')
      const li = cy.findByTestId('year-display').should('have.text', '20152015')
      li.click()
      cy.url().should(
        'eq',
        `${Cypress.config().baseUrl}/country/saarg?name=Argentina&year=2015`,
      )
    })
  })
})
