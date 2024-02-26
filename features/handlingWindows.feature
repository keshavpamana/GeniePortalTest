@Frames
Feature: Handling Frames in Genie Portal

  @FacebookFrame
  Scenario: Verify the switch windows buttons in Genie Page
    Given user is in Genie webpage
    When user click on facebook button
    Then Verify user is in facebook page and navigate to facebook Login Page
    When user enter email into the Email Address field
    And user enter a password
    And user click on fb Login button
    Then verify user is navigate to Post to Facebook page
    And user enter text Say something about this..
    When user switch to parent Window
    Then user clicks on LoginOrRegister
    When user enter Username as "genieadmin"
    When user enter Password as "Dallas!@#$"
    When user click on SignIn button
