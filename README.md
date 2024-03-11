
# Submit a Form to Google Sheets | Demo

This repository provides a demonstration of creating an HTML form that stores submitted data in Google Sheets using plain JavaScript (ES6), Google Apps Script, Fetch, and FormData.

## Instructions

### 1. Create a new Google Sheet

- Start a new spreadsheet in Google Sheets with the Blank template.
- Rename the sheet to "Email Subscribers" or any preferred name.
- Add the following headers into the first row:
  - A: timestamp
  - B: email

### 2. Create a Google Apps Script

- Click on Tools > Script Editor… to open a new tab.
- Rename it to "Submit Form to Google Sheets".
- Delete the function `myFunction() {}` block within the `Code.gs` tab.
- Paste the provided script and save:

```javascript
var sheetName = 'Sheet1'
var scriptProp = PropertiesService.getScriptProperties()

function intialSetup () {
  var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  scriptProp.setProperty('key', activeSpreadsheet.getId())
}

function doPost (e) {
  var lock = LockService.getScriptLock()
  lock.tryLock(10000)

  try {
    var doc = SpreadsheetApp.openById(scriptProp.getProperty('key'))
    var sheet = doc.getSheetByName(sheetName)

    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]
    var nextRow = sheet.getLastRow() + 1

    var newRow = headers.map(function(header) {
      return header === 'timestamp' ? new Date() : e.parameter[header]
    })

    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow])

    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success', 'row': nextRow }))
      .setMimeType(ContentService.MimeType.JSON)
  }

  catch (e) {
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': e }))
      .setMimeType(ContentService.MimeType.JSON)
  }

  finally {
    lock.releaseLock()
  }
}
```

### 3. Run the setup function

- Go to Run > Run Function > `initialSetup` to run this function.
- In the Authorization Required dialog, review and allow permissions.

### 4. Add a new project trigger

- Click on Edit > Current project’s triggers.
- Select `doPost` in the dropdowns and set events fields to "From spreadsheet" and "On form submit".
- Click Save.

### 5. Publish the project as a web app

- Click on Publish > Deploy as web app….
- Set Project Version to New and specify a version.
- Execute the app as yourself and allow access to anyone.
- Click Deploy and copy the Current web app URL from the dialog.

### 6. Input your web app URL

- Open the `index.html` file.
- Replace `<SCRIPT URL>` with your script URL in line 12.

```html
<form name="submit-to-google-sheet">
  <input name="email" type="email" placeholder="Email" required>
  <button type="submit">Send</button>
</form>

<script>
  const scriptURL = 'your-script-url'
  const form = document.forms['submit-to-google-sheet']

  form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
      .then(response => console.log('Success!', response))
      .catch(error => console.error('Error!', error.message))
  })
</script>
```

write also another way
```html
<form name="submit-to-google-sheet">
  <input name="email" type="email" placeholder="Email" required>
  <button type="submit">Send</button>
</form>

<script>
  const scriptURL = 'your-script-url'
  const form = document.forms['submit-to-google-sheet']
  const msg=document.getElementById("id_name")

  form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
      .then(response => {
        msg.innerHTML="Submit Succesfully !"

        setTimeout(function(){
          msg.innerHTML=""
        },5000)
      })
      .catch(error => console.error('Error!', error.message))
  })
</script>
```

### 7. Adding additional form data

- To capture additional data, create new columns with titles matching the `name` values from your form inputs.

```html
<form name="submit-to-google-sheet">
  <input name="email" type="email" placeholder="Email" required>
  <input name="firstName" type="text" placeholder="First Name">
  <input name="lastName" type="text" placeholder="Last Name">
  <button type="submit">Send</button>
</form>
```
sheet link - https://docs.google.com/spreadsheets/d/19gqc77p1oq8cbFWTl1R6SzqmM-yz28sMhPeMKEy8rTA/edit?usp=sharing
### 8. Related Polyfills

- Some features may not be fully supported by browsers, consider using polyfills for better support.

```html
<script src="https://wzrd.in/standalone/formdata-polyfill"></script>
<script src="https://wzrd.in/standalone/promise-polyfill@latest"></script>
<script src="https://wzrd.in/standalone/whatwg-fetch@latest"></script>

<script>
  const scriptURL = 'your-script-url'
  const form = document.forms['submit-to-google-sheet']
  ...
</script>
```



Reference GitHub Link- (https://github.com/jamiewilson/form-to-google-sheets)

video Reference Link- https://youtu.be/a8Om25FbaJA?si=M3LMpWZF4bSShZ5p

## Feedback and Contributions

- Please create a new issue for feedback, requests, or issues.
- Pull requests are welcome, but please discuss major changes beforehand.
 
