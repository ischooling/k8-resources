function validateRequestForRequestDemo(formId, folderName) {
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
	if ($("#" + formId + " #isdCodeMobileNo").length) {
		if ($("#" + formId + " #isdCodeMobileNo").val().trim() == '') {
			showMessage(true, 'ISD code is required');
			return false
		}
	}
	if ($("#" + formId + " #contactNumber").length) {
		if ($("#" + formId + " #contactNumber").val().trim() == '') {
			showMessage(true, 'Contact number is required');
			return false
		}
	}
	if (folderName == 'learning-resources-for-schools' || folderName == 'best-online-high-school-in-philippines') {
		if ($("#" + formId + " #countryTimezoneId").length) {
			if ($("#" + formId + " #countryTimezoneId").val().trim() == '' || $("#" + formId + " #countryTimezoneId").val().trim() == '0') {
				showMessage(true, 'Please select a timezone');
				return false
			}
		}
		if ($("#" + formId + " #countryId").length) {
			if ($("#" + formId + " #countryId").val().trim() == '' || $("#" + formId + " #countryId").val().trim() == '0') {
				showMessage(true, 'Please select a country');
				return false
			}
		}
		if ($("#" + formId + " #schoolName").val().trim() == '') {
			showMessage(true, 'School name is required');
			return false
		}
	}
	if (folderName != 'learning-resources-for-schools' && folderName != 'best-online-high-school-in-philippines') {
		if ($("#" + formId + " #grade").length) {
			if ($("#" + formId + " #grade").val().trim() == '0' || $("#" + formId + " #grade").val().trim() == null) {
				showMessage(true, 'Grade is required');
				return false
			}
		}
	}
	/*if ($("#"+formId+" #contactDescription").val().trim()=='' || $("#"+formId+" #contactDescription").val().trim()==null) {
		showMessage(true, 'Description is required');
		return false
	}*/
	return true;
}

function callForRequestDemoForm(formId, moduleId, folderName) {
	hideMessage('');
	if (!validateRequestForRequestDemo(formId, folderName)) {
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
				var url = '';
				if (ENVIRONMENT == 'uat') {
					url = 'http://164.52.198.42:8080/k8school/common/ppc-request-thank-you';
				} else if (ENVIRONMENT == 'uat2') {
					url = 'http://164.52.198.42:9090/k8school/common/ppc-request-thank-you';
				} else if (ENVIRONMENT == 'dev') {
					url = 'http://localhost:8080/k8school/common/ppc-request-thank-you';
				} else if (ENVIRONMENT == 'staging') {
					url = 'http://164.52.198.42:8070/k8school/common/ppc-request-thank-you';
				} else {
					url = 'https://www.k8school.com/' + folderName + '/thank-you.html';
				}
				goAhead(url, '');
			}
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
	if ($("#" + formId + " #encryptedRequestDemoId").length) {
		requestDemoDTO['encryptedRequestDemoId'] = $("#" + formId + " #encryptedRequestDemoId").val().trim();
	}
	if ($("#" + formId + " #location").length) {
		requestDemoDTO['location'] = $("#" + formId + " #location").val().trim();
	}
	if ($("#" + formId + " #campaingnType").length) {
		requestDemoDTO['campaignName'] = $("#" + formId + " #campaingnType").val().trim();
	}
	if ($("#" + formId + " #username").length) {
		requestDemoDTO['name'] = $("#" + formId + " #username").val().trim();
	} else if ($("#" + formId + " #name").length) {
		requestDemoDTO['name'] = $("#" + formId + " #name").val().trim();
	}

	if ($("#" + formId + " #email").length) {
		requestDemoDTO['email'] = $("#" + formId + " #email").val().trim();
	}
	if ($("#" + formId + " #isdCodeMobileNo").length) {
		requestDemoDTO['isdCode'] = $("#" + formId + " #isdCodeMobileNo").val().trim();
	}
	if ($("#" + formId + " #contactNumber").length) {
		requestDemoDTO['contactNumber'] = $("#" + formId + " #contactNumber").val().trim();
	}
	if ($("#" + formId + " #isdCodeWhatsupNo").length) {
		requestDemoDTO['isdCodeWtsp'] = $("#" + formId + " #isdCodeWhatsupNo").val().trim();
	}
	if ($("#" + formId + " #wtspNumber").length) {
		requestDemoDTO['wtspNumber'] = $("#" + formId + " #wtspNumber").val().trim();
	}
	if ($("#" + formId + " #countryTimezoneId").length) {
		requestDemoDTO['countryTimezoneId'] = $('#' + formId + ' #countryTimezoneId option:selected').attr('custom_timezone_id');
		requestDemoDTO['timeZone'] = $('#' + formId + ' #countryTimezoneId option:selected').text();
	}
	if ($("#" + formId + " #countryId").length) {
		requestDemoDTO['countryId'] = $('#' + formId + ' #countryId option:selected').val().trim();
		requestDemoDTO['countryName'] = $('#' + formId + ' #countryId option:selected').text();
	}
	if ($("#" + formId + " #schoolName").length) {
		requestDemoDTO['schoolName'] = $("#" + formId + " #schoolName").val().trim();
	}
	if ($("#" + formId + " #grade").length) {
		requestDemoDTO['grade'] = $("#" + formId + " #grade").val();
	}
	if ($("#" + formId + " #description").length) {
		requestDemoDTO['contactDescription'] = escapeCharacters($("#" + formId + " #description").val().trim());
	}
	if ($("#" + formId + " #slotTime").length) {
		requestDemoDTO['meetingDate'] = $("input[name='slotTime']:checked").attr('slotDateAttr');
		requestDemoDTO['meetingSlotId'] = $("input[name='slotTime']:checked").attr('slotidattr');
		requestDemoDTO['meetingSlotTime'] = $("input[name='slotTime']:checked").val().trim();
	}
	requestData['requestDemoDTO'] = requestDemoDTO;
	authentication['hash'] = getHash();
	authentication['schoolId'] = SCHOOL_ID;
	authentication['schoolUUID'] = SCHOOL_UUID;
	authentication['userType'] = moduleId;
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	return request;
}