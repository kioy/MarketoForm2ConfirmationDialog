# MarketoForm2ConfirmationDialog
You can use this script to embedded confirmation dialog into your Marketo form before submitting data to Marketo.

# Usage
1. Download mkto_form_cdialog.js and upload it to `Somewhere in Your Site`.
2. Insert the following code(6 lines) into `<head></head>` section in your Landing Pages. Please edit `<Somewhere In Your Site>` part.

    `<link type="text/css" rel="stylesheet" href="//ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/themes/black-tie/jquery-ui.css" />`

    `<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>`

    `<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js"></script>`

    `<script type="text/javascript" src="<Somewhere In Your Site>/mkto_form_cdialog.js"></script>`

    `<meta name="mktoForm2CDialog:NULL_Fill_Field_API_Names" content="">`

    `<meta name="mktoForm2CDialog:Mail_Confirm" content="false">`


3. (Option 1) If you want to fill text/text area fields with 'NULL' (Marketo's special character to clear field), you can specify the SOAP API field name in the content of mktoForm2CDialog:NULL_Fill_Field_API_Names meta value. e.g.

    `<meta name="mktoForm2CDialog:NULL_Fill_Field_API_Names" content="FirstName, Country">`

    In this case, if a user doesn't input any character in FirstName and Country field in a form, they will be cleared by 'NULL'(=empty) automatically. Marketo form doesn't clear these fields by default.

4. (Option 2) If you want to add "Confirm Email Address" fields under the "Email Address" field in your Marketo form, you can add it without creating custom field in Marketo. e.g.

    `<meta name="mktoForm2CDialog:Mail_Confirm" content="true">`


This js can be used for both external landing pages and Marketo landing pages. If you use this in the Marketo LP, you can add the above code via Edit Page Meta Tags under the Landing Page Actions in the editing LP mode.


# Required
    jquery.min.js
    jquery-ui.min.js
    (tested with 1.11.4)

    jquery-ui.css
    you can select other css from http://jqueryui.com/themeroller/

# License
This source is licensed under an MIT License, see the LICENSE file for full details. If you use this code, it would be great to hear from you.


