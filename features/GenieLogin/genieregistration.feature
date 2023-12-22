@GenieRegistationForm
Feature: Genie Caregiver Registration form

  @emailInputField
  Scenario: Verify the Email input field
    Given user is in Genie webpage
    When user is clicks on Login Register button
    And user click on Register a new Account
    Then verify the  is in Genie Caregiver Registration form page
    Then verify email label is displayed
    When user clicks on email input field and enter no data 
    Then user able to see a email error message displayed as "This field is required"
    When user enter invalid email value
      | abcdxyzy@ |
    Then verify the email error message is "Please enter a valid email address of the format aaa@bbb.ccc"
    Then verify the email input field highlighted with red color
    When user enter already created mail into the email input field
      | cloudray@gmail.com |
    Then verify displayed error message "Email is already in use! Please choose another one"
    When user enter minimum length email into email input field
    Then user is able to see a email error message3 as "Your email is required to be at least 5 characters."
    When user enter maximum length email into email input field
    Then user is able to see a email error message4 as "Your email cannot be longer than 100 characters."
    When user enter valid email vlaue
      | abcdxyz@gmail.com |
    Then verify the email input field highlighted with green color

  @passwordInputField
  Scenario: Verify the Password input field
    When user enter empty password and click on Confirm Password
    Then verify the displayed error message like "Your password is required."
    When user enter 50 above longer password into the password field
    Then verify the displayed error message2 like "Your password cannot be longer than 50 characters."
    When user enter least character password into the password field
    Then verify the displayed error message3 as "Your password is required to be at least 4 characters."
    When user enter weak password
      | keshava |
    Then verify displayed password strengthBar
    When user enter strong password
      | keshav_123 |
    Then user verify displayed password strengthBar
    When user enter maximum characters into the Confirm Password field
    Then verify the confirm password field error as "Your confirmation password cannot be longer than 50 characters."
    When user enter minimum characters into the Confirm Password field
    Then verify the confirm password field error as "Your confirmation password is required to be at least 4 characters."
    When user enter wrong confirm password into the Confirm Password field
      | 123456 |
    Then verify displayed error message is "The password and its confirmation do not match!"
    
    When user enter correct matched password into the Confirm Password field
      | keshav_123 |

  @phoneNumberInputField
  Scenario: Verify the Phone number input field
    When user enter 20 digits above number into the phone number field
    Then phone number field error message displayed as "This field cannot be longer than 20 characters."
    Then Then phone number field error message2 displayed as "Acceptable Phone Number Format is XXX-XXX-XXXX where X is a Numeric Digit. The dashes at 4th and 8th positions are both optional."
    When user enter invalid phone number into the Phone Number field
      | 879908646 |
    Then user is able to see a message like "Acceptable Phone Number Format is XXX-XXX-XXXX where X is a Numeric Digit. The dashes at 4th and 8th positions are both optional."
    When user enter valid phone number into the Phone number input field
      | 9492001460 |

  @Firstname @Lastname
  Scenario: Verify the Firstname and Lastname fields
    When user click on firstname field and enter no data
    Then user is able to see a message "This field is required."
    Then user also able to see lastname field error as "This field is required."
    When user enter above Hundred characters into the input field
    Then user is able to see a error message is "This field cannot be longer than 100 characters."
    When user enter  multiple data into the firstname field
      | !@#$%^  |
      |  123456 |
      | abcdxyz |
    When user  click on Lastname field
    When user enter above Hundred characters into the lastname input field
    When user enter valid data into the Lastname field
      | !@#$%^  |
      |  123456 |
      | abcdxyz |

  @calendarField
  Scenario: Verify the calendar field
    When user click on calendar icon
    When user click on "Today" button
    Then verify calendar field have today date
    When user click on calendar icon and click "Clear" button
    When user click on close "Close" button
    Then user select a future date as "28"

  @Profession @Specialty
  Scenario: Verify the Profession and Specialty dropdowns
    Given user is able to see a Profession dropdown selected default value is Select Profession
    When user click on Profession dropdown
    Then user able to see below options
    When user select a "Allied Health Professional" option in Profession dropdown
    Then user is able to see Select Specialty button dropdown and click on it
    When user selects list of options
      | Pharmacy           |
      | Physical therapy   |
      | MRI Technology     |
      | Medical Technology |
      | CT technology      |
    When user select another option
      | Dental hygiene |
    Then user able to see a error message as "You can't select more than 5 specialties"
    When user remove one option from Specialty dropdown
      | CT technology |
    When user select a option2 "CNA" option in Profession dropdown
    When user select Speacialty and select options
      | CNA |
      | TTT |
    When user select a option3 "Physician" option in Profession dropdown
    When user click on specialty and click on search engine and enter "pediatrics"
    Then user select a given search option
      | Pediatrics |

  @PreferredRecruiter @StatesLicensed @DestinationStates
  Scenario: Verify the PreferredRecruiter and StatesLicensed and DestinationStates button dropdowns
    Given user select a States Licensed button dropdown
    When user selects below Licensed States
      | Alabama    |
      | California |
      | Delaware   |
    Then user remove last selected option
      | Delaware |
    When user select search engine and enter as "Rhode Island"
    Then user selects particular option
      | Rhode Island |
    And user selects a Compact License check box
    Given user select a Destination States button dropdown
    When user selects below Destination States
      | Delaware   |
      | Alabama    |
      | California |
    Then user remove last selected Destination option
      | California |
    When user select search engine and enter as "Florida" value
    Then user selects the given particular option
      | Florida |
    Given user select the Preferred Recruiter dropdown
    Then user not select any options from Preferred Recruiter dropdown
    Then user able to see Preferred Recruiter field highlighted with red color
    When user select options from Preferred Recruiter dropdown
    Then user able to see Preferred Recruiter field highlighted with green color

  @uploadResume
  Scenario: Verify the Resume input field
    When user click on the Resume input field
    When click on the Upload Resume button
    And upload the resume format type as Microsoft Word Document
