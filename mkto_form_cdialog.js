/**
 * marketo_form_cdialog.js
 *
 * Mail bug reports and suggestion to : Yukio Y <unknot304 AT gmail.com>
 * 
 * Requires: jquery-ui.js
 */


$(function(){
	var confirmDialog;
	var dialogContents;
	var xform;
	
	dialogContents = '\
		<div id="mktoConfirmDialog" title="入力内容の確認">\
		<div>\
			<table id="confirmationContents">\
			</table>\
		</div>\
		</div>';
	
	MktoForms2.whenReady(function (form) {
		xform = form;		
		
	    // Callback for Submit 
	    xform.onSubmit(function(){
	    	
	    	// creates dialog without open	
	    	$("body").append(dialogContents);	
	    	confirmDialog = $("#mktoConfirmDialog").dialog({
	    		autoOpen: false,
	    		modal: true,
	    		closeOnEscape: false,
	    		width: "auto",
	    		hight: "auto",
	    		buttons: {
	    			"送信": function(){
	    				xform.submitable(true);
	    				xform.submit();
	    				$(this).dialog("close");
	    			},
	    			"戻る": function(){
	    				$(this).dialog("close")
	    			}
	    		},
	    		open: function(){
	    			xform.submitable(false);
	    			$('.ui-dialog-titlebar-close').hide();
	    			$("#mktoConfirmDialog").append('<p>上記内容をご確認いただき、送信ください。</p>');
	    		},
	    		close: function(event){
	    			// remove table all contents
	    			// $("#confirmationContents").find("tr:gt(-1)").remove();
	    			$(this).dialog("destroy");
	    			$(event.target).remove();
	    			xform.submitable(true);		
	    		}
	    	});


	    	// get form columns and displaying selected items.
			var lastLabelforCheckBox = ""; // This is used for radio/checkbox field to remove the same label (offsetLabel).
			var $inputs = xform.getFormElem().find(':input');
			$inputs.each(function() {
				var displayLabel;
				var itemLabels;
				var offsetLabel;
				var displayValue;
				var fieldName = this.name;
				var fieldType = this.type;
				var fieldLabels = $(this).parent();
				var fieldValue = $(this).val();
				
				// append Label and Value according to types
				switch(fieldType) {
				case 'email': 
					// displayLabel = fieldLabels[0].textContent;
					displayLabel = fieldLabels.text();
					displayValue = fieldValue;
					break;
				case 'checkbox': 
				case 'radio': 
					// displayLabel = fieldLabels[0].textContent;
					displayLabel = fieldLabels.text();
					//contains concatinated item labels (i.e. ABCD)
					itemLabels = fieldLabels.offsetParent().text();
	
					// if the checkbox has only one item, we displayed YES or No.
					if ("" == displayLabel) {
						displayLabel = fieldLabels.parent().text();
						if ($(this).prop('checked')) {
							displayValue = 'はい';
						} else {
							displayValue = 'いいえ';
						}
					} else {
						// if the checkbox has multiple items, we displayed checked one only with item's label.
						if ($(this).prop('checked')) {
							displayValue = $(this).next().text();
							displayLabel = itemLabels.replace(new RegExp(displayLabel,"g"),'');
							// check if this is the same label or not, if the label is the same, display empty strings to avoid duplication.
							// skip the same label to display
							if (lastLabelforCheckBox == displayLabel) {
								displayLabel = "";
							} else {
								lastLabelforCheckBox = displayLabel;						
							}
						} else {
							return true;
						}
					}
					break;
				case 'select-one': 
					// displayLabel = fieldLabels[0].textContent;
					displayLabel = fieldLabels.children().eq(0).text();
					displayValue = $('option:selected', this).text();
					break;
				case 'range': 
					// 50
					displayLabel = fieldLabels.text();
					// Label50
					itemLabels = fieldLabels.offsetParent().text();
					// Label
					displayLabel = itemLabels.replace(new RegExp(displayLabel,"g"),'');
					displayValue = fieldValue;					
					break;
				case 'hidden': 
				case 'submit': 
					return true;
					break;
				// The following types are processed as text field, it can be default case.
				// case 'text': 
				// case 'date': 
				// case 'textarea': 
				// case 'url':
				// case 'tel':
				// case 'number':
				default:
					// displayLabel = fieldLabels[0].textContent;
					displayLabel = fieldLabels.text();
					displayValue = fieldValue;
					break;
				}
				
				// if displayValue is not specified, we print value as 'not specified'.
				if (!displayValue) {
					displayValue = '未指定';
				}				
				// remove '*'
				if (displayLabel) {
					displayLabel = displayLabel.replace(/\*/g,'');
				}
				if (displayValue) {
					// textarea might have new line.
					displayValue = displayValue.replace(/[\n\r]/g,'<br/>');
				}
				
				$("#confirmationContents").append('<tr><th align="right" valign="top">'+displayLabel+'</th><td align="left">'+displayValue+'</td></tr>');					
			});
	    	confirmDialog.dialog("open");
	    	confirmDialog.dialog("moveToTop");
	    });
	});
});
