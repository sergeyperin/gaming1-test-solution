Feature: Interview

    This is where you will find and define test scenarios

    # This feature file contains the steps definitions of several exercises you'll need to do

    # Each test in an exercises. In the first exercises you'll only need to complete existing tests
    # and in the last ones, you'll have to write full test cases.

    # All documentation you'll need can be found in the README.md file, so take your time to read it.
    # To run the tests use the command "yarn e2e"

    # Do this test as it was a professional project: Be careful about the naming of your variables and functions,
    # your code structure, ...

    # Do not directly clone the project, create a fork on your own account (don't forget to make it public)

    # After the test starts, you have two hours and half to complete the test.
    # At the end of the test, either you send the following files to your project to Dominique Pino (dominique.pino@gaming1.com):
    # interview.feature, pageModel.ts interview.ts (and any other files you would have created). If ts files are not accepted byt
    # mail change their extension into "txt".
    # Or you can fork the project and send the link of your repository (don't forget to make it public)
    # Don't forget to remove your credentials from the configuration.ts file

    # Task 1: Add a test case for twitter
    Scenario Outline: Open <website>
        # This test has no Given step, which means there is no prerequisites
        # for the test to be able to perform the main actions
        When the user navigates to <website>
        Then <website> should be displayed

        Examples:
            | website  |
            | google   |
            | facebook |
            | twitter  |

    # The next two tests will target the website of your choice (github is recommended).
    # You can put the credentials used for your test in the configuration.ts file.
    # When you send the files back, don't send the configuration.ts, only specify the url of the used website
    # Hint : Use something else than a check on the URL

    # Task 2: Implement the following test
    Scenario: "Public Pet - Open login form"
        Given the user opened my website
        When the user opens the login form
        Then the login form should be displayed

    # Task 3: Write and implement a test to check a successful login
    Scenario: Public Pet - User can log in successfully
        Given the user opened my website
        When the user opens the login form
        And the user fills the login form
        Then the user is being logged in

