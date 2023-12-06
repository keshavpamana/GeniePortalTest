@GenieRegistationForm
Feature: Testing the Genie Caregiver Registration form

  @emailInputField
  Scenario: Verify the Email input field
    Given user is on Genie Caregiver Registration form
    Then verify email label
    When user clicks on email input field
    When user enter invalid email value
      | cloudray@ |
    Then verify the email error message is "Your email is invalid."
    Then verify the email input field highlighted with red color
    When user enter already created mail into the email input field
      | cloudray@gmail.com |
    Then verify displayed error message "Email is already in use! Please choose another one"
    When user enter valid email vlaue
      | chenna@gmail.com |
    Then verify the email input field highlighted with green color

  @passwordInputField
  Scenario: Verify the Password input field
    When user enter empty password and click on Confirm Password
    Then verify the displayed error message like "Your password is required."
    When user enter weak password
      | keshava |
    Then verify displayed password strengthBar
    When user enter strong password
      | keshav_123 |
    Then user verify displayed password strengthBar
    When user enter wrong confirm password into the Confirm Password field
      | 123456 |
    Then verify displayed error message is "The password and its confirmation do not match!"
    When user enter correct matched password into the Confirm Password field
      | keshav_123 |

  @phoneNumberInputField
  Scenario: Verify the Phone number input field
    When user enter invalid phone number into the Phone Number field
      | 879908646 |
    Then user is able to see a message like "This PhoneNumber is Existed.Please Contact Admin."
    When user enter valid phone number into the Phone number input field
      | 9492001460 |

  @Firstname @Lastname
  Scenario: Verify the Firstname and Lastname fields
    When user click on firstname field and enter no data
    Then user is able to see a message "This field is required."
    When user enter above Hundred characters into the input field
    Then user is able to see a error message is "This field cannot be longer than 100 characters."
    When user enter  multiple data into the firstname field
      | !@#$%^ |
      | 123456 |
      | chenna |
    When user  click on Lastname field
    When user enter valid data into the Lastname field
      | !@#$%^ |
      | 123456 |
      | pamana |

  @calendarField
  Scenario: Verify the calendar field
    When user click on calendar icon
    When user click on "Today" button
    Then verify calendar field have today date
    When user click on calendar icon
    When user click on "Clear" button
    When user click on "Close" button
    When user click on calendar icon
    Then user select a future date as "11"
