class createNewListAssertions {
  checkListIsVisible() {
    cy.get("ol[data-testid='lists'] > li").should("have.length", "4");
    cy.get("[data-testid='lists'] > li").last().should("be.visible");
    return this;
  }
}

export default createNewListAssertions;
