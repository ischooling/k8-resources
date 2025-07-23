$(document).ready(function () {
	$("#inquiryOther").hide();
	$("#inquiry").click(function () {
		callForInquiryForm('inquiryForm', 'COMMON', 'SMS');
	});
	$("select#countryId").on("change", function () {
		callStates('inquiryForm', this.value, 'countryId');
		$('.divState').removeClass("is-empty");
		$('.divStdIsdCode').removeClass("is-empty");
		$('#isdcode option:selected').text($('#countryId option:selected').attr('dailcode'));
	});
	$("select#stateId").on("change", function () {
		callCities('inquiryForm', this.value, 'stateId');
		$('.divCity').removeClass("is-empty");
	});
	$("select#inquiryId").on("change", function () {
		var inquiryType = $('#inquiryId option:selected').val().trim();
		if (inquiryType == 'OTHER') {
			$("#inquiryOther").show();
		} else {
			$("#inquiryOther").hide();
		}
	});
});
function validateRequestForInquiryDetails(formId) {
	if (!validateFormAscii(formId)) {
		showMessage(false, 'Please use the English Keyboard while providing information');
		return false
	}
	if ($("#" + formId + " #countryId").val().trim() == 0 || $("#" + formId + " #countryId").val().trim() == null) {
		showMessage(true, 'Country is required');
		return false
	}
	if ($("#" + formId + " #stateId").val().trim() == 0 || $("#" + formId + " #stateId").val().trim() == null) {
		showMessage(true, 'State is required');
		return false
	}
	if ($("#" + formId + " #cityId").val().trim() == 0 || $("#" + formId + " #cityId").val().trim() == null) {
		showMessage(true, 'City is required');
		return false
	}
	if ($("#" + formId + " #username").val().trim() == '' || $("#" + formId + " #username").val().trim() == null) {
		showMessage(true, 'Name is required');
		return false
	}
	if (!validateEmail($("#" + formId + " #email").val().trim())) {
		showMessage(false, 'Email is either empty or invalid');
		return false
	}
	if ($("#" + formId + " #userphone").val().trim() == '' || $("#" + formId + " #userphone").val().trim() == null) {
		showMessage(true, 'Phone Number is required');
		return false
	}
	if ($("#" + formId + " #description").val().trim() == '' || $("#" + formId + " #description").val().trim() == null) {
		showMessage(true, 'Description is required');
		return false
	}
	if ($("#" + formId + " #inquiryId option:selected").val().trim() == 0 || $("#" + formId + " #inquiryId option:selected").val().trim() == null) {
		showMessage(true, 'Please Select your Type');
		return false
	}
	if ($("#" + formId + " #inquiryId option:selected").val().trim() == 'OTHER') {
		if ($("#" + formId + " #otherType").val().trim() == '') {
			showMessage(true, 'Please enter other');
			return false
		}
	}
	//	if (!validateCaptcha($("#" + formId + " #captcha").val().trim())) {
	//		showMessage(false, 'Either captcha is empty or invalid');
	//		return false
	//	}
	return true;
}

function callForInquiryForm(formId, moduleId, folderName) {
	hideMessage('');
	if (!validateRequestForInquiryDetails(formId)) {
		return false;
	}
	$("#inquiry").prop("disabled", true);
	$.ajax({
		type: "POST",
		url: getURLForHTML('common', 'inquiry-content'),
		contentType: "application/json",
		data: JSON.stringify(getRequestForInquiry(formId, moduleId, folderName)),
		dataType: 'json',
		cache: false,
		timeout: 600000,
		success: function (data) {
			if (data.status == "FAILED") {
				showMessageRequestDemoPage(true, data.message, 'serverError', '');
			} else {
				//showMessage(true, stringMessage[1]);
				$("#inquiry").prop("disabled", false);
				//        			$('#inquirySection').hide();
				//        			$('#inquiryResponseSection').show();
				var url = CONTEXT_PATH + 'common/inquiry-thankyou';
				goAhead(url, '');
			}
			$("#inquiry").prop("disabled", false);
			return false;
		},
		error: function (e) {
			//showMessage(true, e.responseText);
			$("#inquiry").prop("disabled", false);
		}
	});
}
function getRequestForInquiry(formId, moduleId, folderName) {
	var request = {};
	var authentication = {};
	var requestData = {};
	var contactUsDTO = {};
	contactUsDTO['countryId'] = $("#" + formId + " #countryId").val().trim();
	contactUsDTO['stateId'] = $("#" + formId + " #stateId").val().trim();
	contactUsDTO['cityId'] = $("#" + formId + " #cityId").val().trim();
	contactUsDTO['name'] = $("#" + formId + " #username").val().trim();
	contactUsDTO['email'] = $("#" + formId + " #email").val().trim();
	contactUsDTO['isdCode'] = $('#inquiryForm #isdcode :selected').text().split(" ")[0];
	contactUsDTO['contactNumber'] = $("#" + formId + " #userphone").val().trim();
	contactUsDTO['contactDescription'] = escapeCharacters($("#" + formId + " #description").val().trim());
	contactUsDTO['inquiryType'] = $("#" + formId + " #inquiryId").val().trim();
	contactUsDTO['inquiryOther'] = $("#" + formId + " #otherType").val().trim();
	//	contactUsDTO['captcha'] = $("#" + formId + " #captcha").val().trim();
	contactUsDTO['location'] = $("#" + formId + " #location").val().trim();
	contactUsDTO['captchaByPass'] = "F";
	contactUsDTO['utmSource'] = getCookie('us');
	contactUsDTO['utmMedium'] = getCookie('um');
	contactUsDTO['utmDescription'] = getCookie('uc');
	contactUsDTO['originalUrl'] = getCookie('cu');
	contactUsDTO['gclid'] = getCookie('gclid');
	contactUsDTO['utmCampaign'] = getCookie('ucam');
	contactUsDTO['utmTerm'] = getCookie('ut');
	contactUsDTO['campaignName'] = folderName;
	requestData['contactUsDTO'] = contactUsDTO;
	authentication['hash'] = getHash(); authentication['schoolId'] = SCHOOL_ID; authentication['schoolUUID'] = SCHOOL_UUID;
	authentication['userType'] = moduleId;
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	return request;
}