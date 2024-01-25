import {
  Before,
  Then,
  Given,
  When,
  After,
} from "cypress-cucumber-preprocessor/steps";
import sharedActions from "../../../pageObjects/shared/actions.cy";
import SharedDataUtils from "../../../pageObjects/shared/dataUtils";
import updateListNameActions from "../../../pageObjects/updateListName/actions.cy";
import sharedAssertions from "../../../pageObjects/shared/assertions.cy";

let sharedAction = new sharedActions();
let sharedAssertion = new sharedAssertions();
let dataUtils = new SharedDataUtils();
let updateListNameAction = new updateListNameActions();

let boardName = dataUtils.boardName();

Before(() => {
  sharedAction.visitUrl("https://trello.com/login").loginToTrello();
  // Create Board
  dataUtils.createNewBoard(boardName).as("boardResponse");
});

Given("The user navigate to the board", () => {
  cy.wait("@login");
  cy.get("@boardResponse").then((response) => {
    sharedAction.visitUrl(response.body.url);
  });
});

When("Click on the List name", () => {
  updateListNameAction.clickOnListName();
});

When("Type the new name", () => {
  sharedAction.typeListName("QA Testing{enter}");
});

Then("The List name is updated correctly", () => {
  sharedAssertion.checkListNameHasCorrectText("QA Testing");
});

After(() => {
  cy.get("@boardResponse").then((response) => {
    //Delete Board
    dataUtils.deleteCreatedBoard(response.body.id);
    sharedAction.reloadPage();
    sharedAction.backToHomePage();
  });
});
