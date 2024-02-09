Feature: Handling CSV File data and validate the data

  Scenario: Validate the Username table data
    Given User is on Onboarding with username page
    Then User verify the Username table data
    #   | Username  | Identifier | First name | Last name |
    #   | booker12  |       9012 | Rachel     | Booker    |
    #   | grey07    |       2070 | Laura      | Grey      |
    #   | johnson81 |       4081 | Craig      | Johnson   |
    #   | jenkins46 |       9346 | Mary       | Jenkins   |
    #   | smith79   |       5079 | Jamie      | Smith     |
