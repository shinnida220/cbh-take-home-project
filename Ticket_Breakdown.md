# Ticket Breakdown

We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**

Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".

You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

### Ticket 1: Add a new field (Custom ID) to Agent Table

- **Description**:
  Add a new field to the Agent table in the database to allow Facilities to save custom ids for Agents they work with.

- **Acceptance Criteria**:
  A new field 'customId' is added to the Agent table.
  The new field 'customId' is included in the API response for the getShiftsByFacility function.
  The new field 'customId' is nullable and has a maximum length of 50 characters.

- **Effort Estimate**:
  2.5 hours

- **Implementation Details**:
  I will modify the Agent table schema in the database to add the new customId field.
  I will then update the agent model and agent controller to include the new field in the response.
  Finally I will update the API documentation to reflect the new customId field

### Ticket 2: Update the Shifts table to use Custom Agent IDs

- **Description**:
  The Shifts table is to updated to use the customId field from the Agents table when generating reports.

- **Acceptance Criteria**:
  When generating reports, the customId field is used in place of the internal database id.
  The internal database id is still stored in the Shifts table, but not used in reports generation.

- **Effort Estimate**:
  3.5 hours

- **Implementation Details**:
  I will modify the Shifts table schema in the database to store both the customId and internal id fields.
  I will update the `getShiftsByFacility` function to retrieve the customId field instead of the internal id.
  I will update the `generateReport` function to use the customId field when generating the report.

### Ticket 3: Add Custom Agent ID Input Field to Facility UI

Description:
Add a new input field to the Facility UI to allow Facilities to enter custom ids for Agents they work with.

Acceptance Criteria:

A new input field is added to the Facility UI for entering custom ids
The input field has a maximum length of 50 characters
When custom ids are entered, they are saved to the Agent table's customId field
Effort Estimate:
4 hours

Implementation Details:

Add a new input field to the Facility UI for entering custom ids
Update the Facility controller to retrieve and save the customId field when it is entered
Ticket 4: Update Report PDF to include Custom Agent IDs
Description:
Update the generateReport function to include the customId field in the report PDF.

Acceptance Criteria:

The report PDF includes the customId field for each Agent worked in the given quarter
Effort Estimate:
2 hours

Implementation Details:

Modify the generateReport function to include the customId field in the report PDF
Ticket 5: Update API Documentation
Description:
Update the API documentation to reflect the new customId field for Agents.

Acceptance Criteria:

The API documentation includes the new customId field in the response for getShiftsByFacility function
Effort Estimate:
1 hour

Implementation Details:

Update the API documentation to include the new customId field in the response for getShiftsByFacility function
