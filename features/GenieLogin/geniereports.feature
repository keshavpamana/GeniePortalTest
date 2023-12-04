@Login/RegisterGeniePortal
Feature: Login Functionalities

  @GenieCredentials
  Scenario: Verify login with genie login credentials
    Given user is on Genie home page
    Then user clicks on LoginOrRegister
    When user enter Username as "genieadmin"
    When user enter Password as "Dallas!@#$"
    Then user click on SignIn button

  @GenieReports
  Scenario:Verify the Genie Reports like Submissions and Compliance
  When user click on "Submissions"
  When user clicks on "Compliance"
