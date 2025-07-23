$(document).ready(function () {
});
function validateRequestForRequestDemo(formId) {

	//	if (!validateFormAscii(formId)) {
	//		showMessage(false, 'Please use the English Keyboard while providing information');
	//		return false
	//	}

	if ($("#" + formId + " #username").val().trim() == '' || $("#" + formId + " #username").val().trim() == null) {
		showMessage(true, 'Name is required');
		return false
	}
	if (!validateEmail($("#" + formId + " #email").val().trim())) {
		showMessage(false, 'Email is either empty or invalid');
		return false
	}
	if ($("#" + formId + " #isdCodeMobileNo").val().trim() == '' || $("#" + formId + " #isdCodeMobileNo").val().trim() == null) {
		showMessage(true, 'ISD Code is required');
		return false
	}
	if ($("#" + formId + " #userphone").val().trim() == '' || $("#" + formId + " #userphone").val().trim() == null) {
		showMessage(true, 'Phone Number is required');
		return false
	}
	if ($("#" + formId + " #wtspNumber").val().trim() != '' && $("#" + formId + " #isdCodeWhatsupNo").val().trim() == '') {
		showMessage(true, 'ISD Code for whats app number is required');
		return false
	}
	//	if ($("#"+formId+" #description").val().trim()=='' || $("#"+formId+" #description").val().trim()==null) {
	//		showMessage(true, 'Description is required');
	//		return false
	//	}
	if ($("#" + formId + " #countryTimezoneId").val().trim() == null || $("#" + formId + " #countryTimezoneId").val().trim() == 0) {
		showMessage(true, 'Please select a Time Zone');
		return false
	}
	//		if ($("#countryTimezoneIdSearch").val().trim()==null || $("#countryTimezoneIdSearch").val().trim()=='') {
	//			showMessage(true, 'Please select a Time Zone');
	//			return false;
	//		}
	if ($("#" + formId + " #chooseDate").val().trim() == null || $("#" + formId + " #chooseDate").val().trim() == '') {
		showMessage(true, 'Please select a Month');
		return false
	}
	if ($("input[name='slotTime']:checked").val().trim() == undefined) {
		showMessage(true, 'Please select any one Slot.');
		return false;
	}
	return true;
}


function callForRequestDemoForm(formId, moduleId) {
	hideMessage('');
	if (!validateRequestForRequestDemo(formId)) {
		return false;
	}
	var me = $(this);
	if (me.data('requestRunning')) {
		console.log('request blocked')
		return false;
	}
	me.data('requestRunning', true);
	$("#inquiry").prop("disabled", true);
	$.ajax({
		type: "POST",
		url: getURLForHTML('common', 'reqeust-demo-content'),
		contentType: "application/json",
		data: JSON.stringify(getRequestForRequestDemo(formId, moduleId)),
		dataType: 'json',
		success: function (data) {
			if (data.status == "FAILED") {
				$(".callBackSubmit").prop("disabled", false);
				$(".reqeustDemo").prop("disabled", false);
			} else {
				$("#sendRequest").prop("disabled", true);
				if ($('#campaingnType').val().trim() == 'Request-demo') {
					goAhead(CONTEXT_PATH + "common/request-demo-thank-you", "");
				} else if ($('#campaingnType').val().trim() == 'Book-a-demo') {
					goAhead(CONTEXT_PATH + "common/book-a-demo-thank-you", "");
				} else {
					goAhead(CONTEXT_PATH + "common/book-meeting-thank-you", "");
				}
			}
			return false;
		},
		complete: function () {
			window.setTimeout(function () { me.data('requestRunning', false); }, 10000)
		},
		error: function (e) {
			$("#sendRequest").prop("disabled", false);
		}
	});
}
function getRequestForRequestDemo(formId, moduleId) {
	var request = {};
	var authentication = {};
	var requestData = {};
	var requestDemoDTO = {};
	requestDemoDTO['encryptedRequestDemoId'] = $("#" + formId + " #encryptedRequestDemoId").val().trim();
	requestDemoDTO['name'] = $("#" + formId + " #username").val().trim();
	requestDemoDTO['email'] = $("#" + formId + " #email").val().trim();
	requestDemoDTO['isdCode'] = $("#" + formId + " #isdCodeMobileNo").val().trim();
	requestDemoDTO['contactNumber'] = $("#" + formId + " #userphone").val().trim();
	requestDemoDTO['isdCodeWtsp'] = $("#" + formId + " #isdCodeWhatsupNo").val().trim();
	requestDemoDTO['wtspNumber'] = $("#" + formId + " #wtspNumber").val().trim();
	requestDemoDTO['contactDescription'] = escapeCharacters($("#" + formId + " #description").val().trim());
	requestDemoDTO['location'] = $("#" + formId + " #location").val().trim();
	requestDemoDTO['campaignName'] = $("#" + formId + " #campaingnType").val().trim();

	requestDemoDTO['countryTimezoneId'] = $('#countryTimezoneId option:selected').attr('custom_timezone_id');
	requestDemoDTO['timeZone'] = $("#" + formId + " #countryTimezoneId").val().trim();
	requestDemoDTO['studentTimeZone'] = $("#" + formId + " #countryTimezoneId option:selected").text().trim();

	requestDemoDTO['meetingDate'] = $("input[name='slotTime']:checked").attr('slotDateAttr');
	requestDemoDTO['meetingSlotId'] = $("input[name='slotTime']:checked").attr('slotidattr');
	requestDemoDTO['meetingSlotTime'] = $("input[name='slotTime']:checked").val().trim();
	requestDemoDTO['moduleName'] = moduleId;

	requestData['requestDemoDTO'] = requestDemoDTO;
	authentication['hash'] = getHash(); authentication['schoolId'] = SCHOOL_ID; authentication['schoolUUID'] = SCHOOL_UUID;
	authentication['userType'] = moduleId;
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	return request;
}

function callRequestDemoFreeSlots(formId, actionUrl) {
	//	hideMessage('');
	$.ajax({
		type: "POST",
		contentType: "application/json",
		url: getURLForHTML('common', 'get-request-demo-free-slots?' + actionUrl),
		dataType: 'html',
		cache: false,
		timeout: 600000,
		success: function (htmlContent) {
			if (htmlContent != "") {
				var stringMessage = [];
				stringMessage = htmlContent.split("|");
				if (stringMessage[0] == "FAILED" || stringMessage[0] == "EXCEPTION" || stringMessage[0] == "SESSIONOUT") {
					showMessage(true, stringMessage[1]);
				} else {
					$('#freeSlotList').html(htmlContent);
				}
				return false;
			}
			return false;
		},
		error: function (e) {
			showMessage(true, e.responseText);
		}
	});
}

function emptyDateAndSlots() {
	$('#chooseDate').val("");
	$('#freeSlotList').html("");
}