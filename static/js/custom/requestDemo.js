$(document).ready(function () {
});
function validateRequestForRequestDemo(formId, moduleId) {
	hideMessageRequestDemoPage('usernameError', 'username');
	hideMessageRequestDemoPage('emailError', 'email');
	hideMessageRequestDemoPage('isdCodeMobileNoError', 'isdCodeMobileNo');
	hideMessageRequestDemoPage('isdCodeMobileNoError', 'userphone');
	hideMessageRequestDemoPage('isdCodeWhatsupNoError', 'isdCodeWhatsupNo');
	hideMessageRequestDemoPage('isdCodeWhatsupNoError', 'wtspNumber');

	hideMessageRequestDemoPage('relationTypeError', 'relationType');
	hideMessageRequestDemoPage('titleError', 'title');
	hideMessageRequestDemoPage('parentNameError', 'parentName');
	hideMessageRequestDemoPage('occupationError', 'occupation');
	hideMessageRequestDemoPage('dobError', 'dob');
	//	hideMessageRequestDemoPage('descriptionError');

	hideMessageRequestDemoPage('freeSlotListError', 'viewFreeSlot');
	//	hideMessageRequestDemoPage('countryTimezoneIdError','countryTimezoneId');
	hideMessageRequestDemoPage('chooseDateError', 'chooseDate');
	hideMessageRequestDemoPage('chooseDateError', 'newDateslected');
	hideMessageRequestDemoPage('termsAndConditionsError', 'termsAndConditions');
	hideMessageRequestDemoPage('stateIdError', 'stateId');
	hideMessageRequestDemoPage('cityIdError', 'cityId');
	hideMessageRequestDemoPage('gradeError', 'grade');
	var flag = true;
	//	if (!validateFormAscii(formId)) {
	//		showMessageRequestDemoPage(false, 'Please use the English Keyboard while providing information');
	//		flag=false;
	//	}
	if ('BOOKMEETING_NEW' == moduleId) {
		if ($("#" + formId + " #username").val() == '' || $("#" + formId + " #username").val() == null) {
			showMessageRequestDemoPage(true, 'Name is required', 'usernameError', 'username');
			flag = false;
		}

		if ($("#" + formId + " #grade").val() == '' || $("#" + formId + " #grade").val() == null) {
			showMessageRequestDemoPage(true, 'Grade is required', 'gradeError', 'grade');
			flag = false;
		}

		if (!validateEmail($("#" + formId + " #email").val())) {
			showMessageRequestDemoPage(false, 'Email is either empty or invalid', 'emailError', 'email');
			flag = false;
		}

		if ($("#" + formId + " #isdCodeMobileNo").val() == '' || $("#" + formId + " #isdCodeMobileNo").val() == null) {
			showMessageRequestDemoPage(true, 'ISD Code is required', 'isdCodeMobileNoError', 'isdCodeMobileNo');
			flag = false;
		}

		if ($("#" + formId + " #userphone").val() == '' || $("#" + formId + " #userphone").val() == null) {
			showMessageRequestDemoPage(true, 'Phone Number is required', 'isdCodeMobileNoError', 'userphone');
			flag = false;
		} else if ($("#" + formId + " #otpVerifiedstatus").val() == 'true') {

		} else {
			showMessageRequestDemoPage(true, 'Phone no. is not verified', 'isdCodeMobileNoError', 'userphone');
			flag = false;
		}

		if ($("#" + formId + " #stateId").val() == 0 || $("#" + formId + " #stateId").val() == null) {
			showMessageRequestDemoPage(true, 'State is required', 'stateIdError', 'stateId');
			flag = false;
		}
		if ($("#" + formId + " #cityId").val() == 0 || $("#" + formId + " #cityId").val() == null) {
			showMessageRequestDemoPage(true, 'City is required', 'cityIdError', 'cityId');
			flag = false;
		}
		if ($("#" + formId + " #chooseDate").length && ($("#" + formId + " #chooseDate").val() == null || $("#" + formId + " #chooseDate").val() == '')) {
			showMessageRequestDemoPage(true, 'Please select a date', 'chooseDateError', 'chooseDate');
			flag = false;
		}
		if ($("#" + formId + " #newDateslected").length && ($("#" + formId + " #newDateslected").val() == null || $("#" + formId + " #newDateslected").val() == '')) {
			showMessageRequestDemoPage(true, 'Please select a date', 'chooseDateError', 'newDateslected');
			flag = false;
		}
		if ($("input[name='slotTime']:checked").val() == undefined) {
			showMessageRequestDemoPage(true, 'Please select any one Slot.', 'freeSlotListError', 'viewFreeSlot');
			flag = false;
		}
	} else {
		if ($("#" + formId + " #username").val() == '' || $("#" + formId + " #username").val() == null) {
			showMessageRequestDemoPage(true, 'Name is required', 'usernameError', 'username');
			flag = false;
		}

		if (!validateEmail($("#" + formId + " #email").val())) {
			showMessageRequestDemoPage(false, 'Email is either empty or invalid', 'emailError', 'email');
			flag = false;
		}
		if ('BOOKMEETING' == moduleId) {
			if ($("#" + formId + " #relationType").val() == '' || $("#" + formId + " #relationType").val() == null) {
				showMessageRequestDemoPage(true, 'Relation Type is required', 'relationTypeError', 'relationType');
				flag = false;
			}
			if ($("#" + formId + " #title").val() == '' || $("#" + formId + " #title").val() == null) {
				showMessageRequestDemoPage(true, 'Title is required', 'titleError', 'title');
				flag = false;
			}
			if ($("#" + formId + " #parentName").val() == '' || $("#" + formId + " #parentName").val() == null) {
				showMessageRequestDemoPage(true, 'Father/Mother Name is required', 'parentNameError', 'parentName');
				flag = false;
			}
			if ($("#" + formId + " #occupation").val() == '' || $("#" + formId + " #occupation").val() == null) {
				showMessageRequestDemoPage(true, 'Occupation is required', 'occupationError', 'occupation');
				flag = false;
			}
			if ($("#" + formId + " #gender").val() == '' || $("#" + formId + " #gender").val() == null) {
				showMessageRequestDemoPage(true, 'Gender is required', 'genderError', 'gender');
				flag = false;
			}
			if ($("#" + formId + " #dob").val() == '' || $("#" + formId + " #dob").val() == null) {
				showMessageRequestDemoPage(true, 'Date of Birth is required', 'dobError', 'dob');
				flag = false;
			}
			if ($("#" + formId + " #stateId").val() == 0 || $("#" + formId + " #stateId").val() == null) {
				showMessageRequestDemoPage(true, 'State is required', 'stateIdError', 'stateId');
				flag = false;
			}
			if ($("#" + formId + " #cityId").val() == 0 || $("#" + formId + " #cityId").val() == null) {
				showMessageRequestDemoPage(true, 'City is required', 'cityIdError', 'cityId');
				flag = false;
			}
		}
		if ($("#" + formId + " #grade").val() == '' || $("#" + formId + " #grade").val() == null) {
			showMessageRequestDemoPage(true, 'Grade is required', 'gradeError', 'grade');
			flag = false;
		}
		if ('BOOKMEETING' != moduleId) {
			if ($("#" + formId + " #isdCodeWhatsupNo").val() == '' || $("#" + formId + " #isdCodeWhatsupNo").val() == null) {
				showMessageRequestDemoPage(true, 'ISD Code for whatsApp is required', 'isdCodeWhatsupNoError', 'isdCodeWhatsupNo');
				flag = false;
			}
		}
		if ($("#" + formId + " #wtspNumber").val() == '' || $("#" + formId + " #wtspNumber").val() == null) {
			showMessageRequestDemoPage(true, 'WhatsApp Number is required', 'isdCodeWhatsupNoError', 'wtspNumber');
			flag = false;
		}
		if ('BOOKMEETING' != moduleId) {
			if (($("#" + formId + " #isdCodeWhatsupNo").val() == '' || $("#" + formId + " #isdCodeWhatsupNo").val() == null) && ($("#" + formId + " #wtspNumber").val() == '' || $("#" + formId + " #wtspNumber").val() == null)) {
				showMessageRequestDemoPage(true, 'ISD Code and WhatsApp No. are required', 'isdCodeWhatsupNoError', 'wtspNumber');
				flag = false;
			}
		}
		if ('BOOKMEETING' != moduleId) {
			if ($("#" + formId + " #isdCodeMobileNo").val() == '' || $("#" + formId + " #isdCodeMobileNo").val() == null) {
				showMessageRequestDemoPage(true, 'ISD Code is required', 'isdCodeMobileNoError', 'isdCodeMobileNo');
				flag = false;
			}
		}
		if ('BOOKMEETING' == moduleId) {
			//if ($("#"+formId+" #userphone").val()=='' || $("#"+formId+" #userphone").val()==null || !ValidateNo($("#"+formId+" #userphone").val())) {
			if ($("#" + formId + " #userphone").val() == '' || $("#" + formId + " #userphone").val() == null) {
				showMessageRequestDemoPage(true, 'Phone Number is required', 'isdCodeMobileNoError', 'userphone');
				flag = false;
			} else if ($("#" + formId + " #otpVerifiedstatus").val() == 'true') {

			} else {
				showMessageRequestDemoPage(true, 'Phone no. is not verified', 'isdCodeMobileNoError', 'userphone');
				flag = false;
			}
		} else {
			if ($("#" + formId + " #userphone").val() == '' || $("#" + formId + " #userphone").val() == null) {
				showMessageRequestDemoPage(true, 'Phone Number is required', 'isdCodeMobileNoError', 'userphone');
				flag = false;
			}
		}

		if ('BOOKMEETING' != moduleId) {
			if (($("#" + formId + " #isdCodeMobileNo").val() == '' || $("#" + formId + " #isdCodeMobileNo").val() == null) && ($("#" + formId + " #userphone").val() == '' || $("#" + formId + " #userphone").val() == null)) {
				showMessageRequestDemoPage(true, 'ISD Code and Phone No. are required', 'isdCodeMobileNoError', 'isdCodeMobileNo');
				flag = false;
			}
		}

		//	if ($("#"+formId+" #description").val()=='' || $("#"+formId+" #description").val()==null) {
		//		showMessageRequestDemoPage(true, 'Description is required', 'descriptionError');
		//		flag=false;
		//	}
		//	if ($("#"+formId+" #countryTimezoneId").val()==null || $("#"+formId+" #countryTimezoneId").val()==0) {
		//		showMessageRequestDemoPage(true, 'Please select a Time Zone', 'countryTimezoneIdError','countryTimezoneId');
		//		flag=false;
		//	}

		if ($("#" + formId + " #chooseDate").length && ($("#" + formId + " #chooseDate").val() == null || $("#" + formId + " #chooseDate").val() == '')) {
			showMessageRequestDemoPage(true, 'Please select a Month', 'chooseDateError', 'chooseDate');
			flag = false;
		}
		if ($("#" + formId + " #newDateslected").length && ($("#" + formId + " #newDateslected").val() == null || $("#" + formId + " #newDateslected").val() == '')) {
			showMessageRequestDemoPage(true, 'Please select a Month', 'chooseDateError', 'newDateslected');
			flag = false;
		}
		if ($("input[name='slotTime']:checked").val() == undefined) {
			showMessageRequestDemoPage(true, 'Please select any one Slot.', 'freeSlotListError', 'viewFreeSlot');
			flag = false;
		}
		//	if('BOOKMEETING'==moduleId){
		//		if ($("#"+formId+" #otpVerifiedstatus").val()) {
		//			
		//		}else{
		//			showMessageRequestDemoPage(true, 'Phone no is not verified', 'isdCodeMobileNoError','userphone');
		//			flag=false;
		//		}
		//	}
		if ('BOOKMEETING' == moduleId) {
			if ($("#" + formId + " #termsAndConditions").is(':checked')) {

			} else {
				$('#termsAndConditions').closest('.term-and-condition').addClass('highlight-field');
				showMessageRequestDemoPage(true, 'Please agree to the terms & conditions', 'termsAndConditionsError', 'termsAndConditions');
				flag = false
			}
		}
	}

	return flag;
}

function validateElement(formId, fieldId, fielderrorId, moduleId) {
	flag = true;
	if (fieldId == 'username') {
		if ($("#" + formId + " #username").val() == '' || $("#" + formId + " #username").val() == null) {
			showMessageRequestDemoPage(true, 'Name is required', 'usernameError', 'username');
			flag = false;
		} else {
			hideMessageRequestDemoPage('usernameError', 'username');
		}
	} else if (fieldId == 'email') {
		if (!validateEmail($("#" + formId + " #email").val())) {
			showMessageRequestDemoPage(false, 'Email is either empty or invalid', 'emailError', 'email');
			flag = false;
		} else {
			hideMessageRequestDemoPage('emailError', 'email');
		}
	} else if (fieldId == 'grade') {
		if ($("#" + formId + " #grade").val() == '' || $("#" + formId + " #grade").val() == null) {
			showMessageRequestDemoPage(true, 'Grade is required', 'gradeError', 'grade');
			flag = false;
		} else {
			hideMessageRequestDemoPage('gradeError', 'grade');
		}
	} else if (fieldId == 'isdCodeWhatsupNo') {
		if ($("#" + formId + " #isdCodeWhatsupNo").val() == '' || $("#" + formId + " #isdCodeWhatsupNo").val() == null) {
			showMessageRequestDemoPage(true, 'ISD Code for whatsApp is required', 'isdCodeWhatsupNoError', 'isdCodeWhatsupNo');
			flag = false;
		} else {
			hideMessageRequestDemoPage('isdCodeWhatsupNoError', 'isdCodeWhatsupNo');
		}
	} else if (fieldId == 'wtspNumber') {
		if ($("#" + formId + " #wtspNumber").val() == '' || $("#" + formId + " #wtspNumber").val() == null) {
			showMessageRequestDemoPage(true, 'Phone Number is required', 'isdCodeWhatsupNoError', 'wtspNumber');
			flag = false;
		} else {
			hideMessageRequestDemoPage('isdCodeWhatsupNoError', 'wtspNumber');
		}
	} else if (fieldId == 'isdCodeMobileNo') {
		if ($("#" + formId + " #isdCodeMobileNo").val() == '' || $("#" + formId + " #isdCodeMobileNo").val() == null) {
			showMessageRequestDemoPage(true, 'ISD Code is required', 'isdCodeMobileNoError', 'isdCodeMobileNo');
			flag = false;
		} else {
			hideMessageRequestDemoPage('isdCodeMobileNoError', 'isdCodeMobileNo');
		}
	} else if (fieldId == 'userphone') {
		if (fieldId == 'userphone' && moduleId != 'COUNSLLOR') {
			if ($("#" + formId + " #userphone").val() == '' || $("#" + formId + " #userphone").val() == null) {
				showMessageRequestDemoPage(true, 'Phone Number is required', 'isdCodeMobileNoError', 'userphone');
				flag = false;
			} else {
				hideMessageRequestDemoPage('isdCodeMobileNoError', 'userphone');
			}
		} else {
			if ($("#" + formId + " #userphone").val() == '' || $("#" + formId + " #userphone").val() == null || !ValidateNo($("#" + formId + " #userphone").val())) {
				showMessageRequestDemoPage(true, 'Phone Number is required', 'isdCodeMobileNoError', 'userphone');
				flag = false;
			} else {
				hideMessageRequestDemoPage('isdCodeMobileNoError', 'userphone');
			}
		}
	} else if (fieldId == 'grade') {
		if ($("#" + formId + " #grade").val() == '' || $("#" + formId + " #grade").val() == null) {
			showMessageRequestDemoPage(true, 'Grade is required', 'gradeError', 'grade');
			flag = false;
		} else {
			hideMessageRequestDemoPage('gradeError', 'grade');
		}
	} else if (fieldId == 'relationType') {
		if ($("#" + formId + " #relationType").val() == '' || $("#" + formId + " #relationType").val() == null) {
			showMessageRequestDemoPage(true, 'Relation Type is required', 'relationTypeError', 'relationType');
			$("#title").prop("disabled", false);
			$("#" + formId + " #title").val('');
			showMessageRequestDemoPage(true, 'Title is required', 'titleError', 'title');
			flag = false;
		} else {
			if ($("#" + formId + " #relationType").val() == 'Mother') {
				$("#" + formId + " #title").val('Ms.');
				hideMessageRequestDemoPage('titleError', 'title');
				$("#title").prop("disabled", true);
				$("#title").addClass("no-drop");
			} else if ($("#" + formId + " #relationType").val() == 'Father') {
				$("#" + formId + " #title").val('Mr.');
				hideMessageRequestDemoPage('titleError', 'title');
				$("#title").prop("disabled", true);
				$("#title").addClass("no-drop");
			} else {
				$("#" + formId + " #title").val("");
				hideMessageRequestDemoPage('titleError', 'title');
				$("#title").prop("disabled", false);
				$("#title").removeClass("no-drop");
			}
			hideMessageRequestDemoPage('relationTypeError', 'relationType');
		}
	} else if (fieldId == 'title') {
		if ($("#" + formId + " #title").val() == '' || $("#" + formId + " #title").val() == null) {
			showMessageRequestDemoPage(true, 'Title is required', 'titleError', 'title');
			flag = false;
		} else {
			hideMessageRequestDemoPage('titleError', 'title');
		}
	} else if (fieldId == 'parentName') {
		if ($("#" + formId + " #parentName").val() == '' || $("#" + formId + " #parentName").val() == null) {
			showMessageRequestDemoPage(true, 'Father/Mother Name is required', 'parentNameError', 'parentName');
			flag = false;
		} else {
			hideMessageRequestDemoPage('parentNameError', 'parentName');
		}
	} else if (fieldId == 'occupation') {
		if ($("#" + formId + " #occupation").val() == '' || $("#" + formId + " #occupation").val() == null) {
			showMessageRequestDemoPage(true, 'Occupation is required', 'occupationError', 'occupation');
			flag = false;
		} else {
			hideMessageRequestDemoPage('occupationError', 'occupation');
		}
	} else if (fieldId == 'gender') {
		if ($("#" + formId + " #gender").val() == '' || $("#" + formId + " #gender").val() == null) {
			showMessageRequestDemoPage(true, 'Gender is required', 'genderError', 'gender');
			flag = false;
		} else {
			hideMessageRequestDemoPage('genderError', 'gender');
		}
	} else if (fieldId == 'dob') {
		if ($("#" + formId + " #dob").val() == '' || $("#" + formId + " #dob").val() == null) {
			showMessageRequestDemoPage(true, 'Date of Birth is required', 'dobError', 'dob');
			flag = false;
		} else {
			hideMessageRequestDemoPage('dobError', 'dob');
		}
	} else if (fieldId == 'stateId') {
		if ($("#" + formId + " #stateId").val() == 0 || $("#" + formId + " #stateId").val() == null) {
			showMessageRequestDemoPage(true, 'State is required', 'stateIdError', 'stateId');
			flag = false;
		} else {
			hideMessageRequestDemoPage('stateIdError', 'stateId');
		}
	} else if (fieldId == 'cityId') {
		if ($("#" + formId + " #cityId").val() == 0 || $("#" + formId + " #cityId").val() == null) {
			showMessageRequestDemoPage(true, 'City is required', 'cityIdError', 'cityId');
			flag = false;
		} else {
			hideMessageRequestDemoPage('cityIdError', 'cityId');
		}
	} else if ($("#" + formId + " #termsAndConditions").is(':checked')) {
		$('#termsAndConditions').closest('.term-and-condition').removeClass('highlight-field');
		hideMessageRequestDemoPage('termsAndConditionsError', 'termsAndConditions');
	} else {
		$('#termsAndConditions').closest('.term-and-condition').addClass('highlight-field');
		showMessageRequestDemoPage(true, 'Please agree to the terms & conditions', 'termsAndConditionsError', 'termsAndConditions');
		flag = false;
	}
	validateRequestForActiveConfirm(formId, moduleId);
	return flag;
}
function validateTerms(formId, fieldId, fielderrorId, moduleId) {
	flag = true;
	if ($("#" + formId + " #termsAndConditions").is(':checked')) {
		$('#termsAndConditions').closest('.term-and-condition').removeClass('highlight-field');
		hideMessageRequestDemoPage('termsAndConditionsError', 'termsAndConditions');
	} else {
		$('#termsAndConditions').closest('.term-and-condition').addClass('highlight-field');
		showMessageRequestDemoPage(true, 'Please agree to the terms & conditions', 'termsAndConditionsError', 'termsAndConditions');
		flag = false;
	}
	validateRequestForActiveConfirm(formId, moduleId);
	return flag;
}

function validateRequestForActiveConfirm(formId, moduleId) {
	var flag = validateRequestStatus(formId, moduleId);
	if (flag) {
		$('#sendRequest').addClass('active');
	} else {
		$('#sendRequest').removeClass('active');
	}
}
function validateRequestStatus(formId, moduleId) {
	flag = true;
	if ($("#" + formId + " #username").val() == '' || $("#" + formId + " #username").val() == null) {
		flag = false;
		return flag;
	}
	if (!validateEmail($("#" + formId + " #email").val())) {
		flag = false;
		return flag;
	}
	if ($("#" + formId + " #grade").val() == '' || $("#" + formId + " #grade").val() == null) {
		flag = false;
		return flag;
	}
	if ($("#" + formId + " #isdCodeWhatsupNo").val() == '' || $("#" + formId + " #isdCodeWhatsupNo").val() == null) {
		flag = false;
		return flag;
	}
	if ($("#" + formId + " #wtspNumber").val() == '' || $("#" + formId + " #wtspNumber").val() == null) {
		flag = false;
		return flag;
	}
	if (($("#" + formId + " #isdCodeWhatsupNo").val() == '' || $("#" + formId + " #isdCodeWhatsupNo").val() == null) && ($("#" + formId + " #wtspNumber").val() == '' || $("#" + formId + " #wtspNumber").val() == null)) {
		flag = false;
		return flag;
	}
	if ($("#" + formId + " #isdCodeMobileNo").val() == '' || $("#" + formId + " #isdCodeMobileNo").val() == null) {
		flag = false;
		return flag;
	}
	if ($("#" + formId + " #userphone").val() == '' || $("#" + formId + " #userphone").val() == null) {
		flag = false;
		return flag;
	}

	if (($("#" + formId + " #isdCodeMobileNo").val() == '' || $("#" + formId + " #isdCodeMobileNo").val() == null) && ($("#" + formId + " #userphone").val() == '' || $("#" + formId + " #userphone").val() == null)) {
		flag = false;
		return flag;
	}
	if ('BOOKMEETING' == moduleId) {
		if ($("#" + formId + " #relationType").val() == '' || $("#" + formId + " #relationType").val() == null) {
			flag = false;
			return flag;
		}
		if ($("#" + formId + " #title").val() == '' || $("#" + formId + " #title").val() == null) {
			flag = false;
			return flag;
		}
		if ($("#" + formId + " #parentName").val() == '' || $("#" + formId + " #parentName").val() == null) {
			flag = false;
			return flag;
		}
		if ($("#" + formId + " #occupation").val() == '' || $("#" + formId + " #occupation").val() == null) {
			flag = false;
			return flag;
		}
		if ($("#" + formId + " #gender").val() == '' || $("#" + formId + " #gender").val() == null) {
			flag = false;
			return flag;
		}
		if ($("#" + formId + " #dob").val() == '' || $("#" + formId + " #dob").val() == null) {
			flag = false;
			return flag;
		}
		if ($("#" + formId + " #stateId").val() == 0 || $("#" + formId + " #stateId").val() == null) {
			flag = false;
			return flag;
		}
		if ($("#" + formId + " #cityId").val() == 0 || $("#" + formId + " #cityId").val() == null) {
			flag = false;
			return flag;
		}
		if ($("#" + formId + " #otpVerifiedstatus").val() == 'false') {
			flag = false;
			return flag;
		}
		if ($("#" + formId + " #termsAndConditions").is(':checked') == false) {
			flag = false;
			return flag;
		}
	}
	return flag;
}

function callForRequestDemoForm(formId, moduleId) {
	hideMessage('');
	$("#sendRequest").prop("disabled", true);
	if (!validateRequestForRequestDemo(formId, moduleId)) {
		$("#sendRequest").prop("disabled", false);
		return false;
	}
	var me = $(this);
	if (me.data('requestRunning')) {
		console.log('request blocked')
		return false;
	}
	me.data('requestRunning', true);
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
				if ($('#campaingnType').val() == 'Request-demo') {
					goAhead(CONTEXT_PATH + "common/request-demo-thank-you", "");
				} else if ($('#campaingnType').val() == 'Book-a-demo') {
					goAhead(CONTEXT_PATH + "common/book-a-demo-thank-you", "");
				} else if ($('#campaingnType').val() == 'meet-a-counselor') {
					goAhead(CONTEXT_PATH + "common/meet-a-counselor-thank-you", "");
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
	requestDemoDTO['encryptedRequestDemoId'] = $("#" + formId + " #encryptedRequestDemoId").val();
	requestDemoDTO['name'] = $("#" + formId + " #username").val();
	requestDemoDTO['email'] = $("#" + formId + " #email").val();
	requestDemoDTO['isdCode'] = $("#" + formId + " #isdCodeMobileNo").val();
	requestDemoDTO['contactNumber'] = $("#" + formId + " #userphone").val();
	requestDemoDTO['isdCodeWtsp'] = $("#" + formId + " #isdCodeWhatsupNo").val();
	requestDemoDTO['wtspNumber'] = $("#" + formId + " #wtspNumber").val();
	requestDemoDTO['contactDescription'] = escapeCharacters($("#" + formId + " #description").val());
	requestDemoDTO['location'] = $("#" + formId + " #location").val();
	requestDemoDTO['grade'] = $("#" + formId + " #grade").val();
	requestDemoDTO['cityId'] = $("#" + formId + " #cityId").val();
	requestDemoDTO['stateId'] = $("#" + formId + " #stateId").val();
	requestDemoDTO['otpVerifiedStatus'] = $("#" + formId + " #otpVerifiedstatus").val();
	requestDemoDTO['stateId'] = $("#" + formId + " #stateId").val();
	//	requestDemoDTO['countryTimezoneId'] = $('#countryTimezoneId option:selected').attr('custom_timezone_id');
	requestDemoDTO['countryTimezoneId'] = '186';
	requestDemoDTO['timeZone'] = 'Asia/Kolkata';    	//$("#" + formId + " #countryTimezoneId").val().trim();
	requestDemoDTO['studentTimeZone'] = 'India/Kolkata'   // $("#" + formId + " #countryTimezoneId option:selected").text().trim();

	requestDemoDTO['relationType'] = $("#" + formId + " #relationType").val();
	requestDemoDTO['title'] = $("#" + formId + " #title").val();
	requestDemoDTO['parentName'] = $("#" + formId + " #parentName").val();
	requestDemoDTO['occupation'] = $("#" + formId + " #occupation").val();
	requestDemoDTO['dob'] = $("#" + formId + " #dob").val();
	requestDemoDTO['gender'] = $("#" + formId + " #gender").val();

	requestDemoDTO['meetingDate'] = $("input[name='slotTime']:checked").attr('slotDateAttr');
	requestDemoDTO['meetingSlotId'] = $("input[name='slotTime']:checked").attr('slotidattr');
	requestDemoDTO['meetingSlotTime'] = $("input[name='slotTime']:checked").val();
	requestDemoDTO['campaignName'] = $("#" + formId + " #campaingnType").val();
	requestDemoDTO['moduleName'] = moduleId;

	requestDemoDTO['utmSource'] = getCookie('us');
	requestDemoDTO['utmMedium'] = getCookie('um');
	requestDemoDTO['utmDescription'] = getCookie('uc');
	requestDemoDTO['originalUrl'] = getCookie('cu');
	requestDemoDTO['gclid'] = getCookie('gclid');
	requestDemoDTO['utmCampaign'] = getCookie('ucam');
	requestDemoDTO['utmTerm'] = getCookie('ut');

	requestData['requestDemoDTO'] = requestDemoDTO;
	authentication['hash'] = getHash();
	authentication['userType'] = 'COMMON';
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
					if ("Please select a Time Zone" == stringMessage[1]) {
						showMessageRequestDemoPage(true, stringMessage[1], 'countryTimezoneIdError', 'countryTimezoneId');
					} else {
						showMessage(true, stringMessage[1]);
					}
					$('#freeSlotList').html('');
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

function validateRequestDemo(formId, status, type, resStatus) {
	hideMessageRequestDemoPage('chooseDateError', 'chooseDate');
	hideMessageRequestDemoPage('chooseDateError', 'newDateslected');
	//	hideMessageRequestDemoPage('countryTimezoneIdError','countryTimezoneId');
	hideMessageRequestDemoPage('freeSlotListError', 'viewFreeSlot');
	var meetingDate = $('#' + formId + ' #chooseDate').val();
	if ($("#" + formId + " #chooseDate").length) {
		meetingDate = $('#' + formId + ' #chooseDate').val();
	} else if ($("#" + formId + " #newDateslected").length) {
		meetingDate = $('#' + formId + ' #newDateslected').val();
	}
	if ("scholarShip" == type) {
		$('#' + formId + ' #termsAndConditions').prop('checked', false);
	}
	//console.log("meetingDate: "+meetingDate);
	if ("admin" == type || "scholarShip" == type) {
		if (meetingDate == '' || meetingDate == undefined) {
			$('#freeSlotList').html("");
			$('#slotcount').html("");
			if ($("#" + formId + " #chooseDate").length) {
				showMessageRequestDemoPage(true, "Please select a date", 'chooseDateError', 'chooseDate');
			} else if ($("#" + formId + " #newDateslected").length) {
				showMessageRequestDemoPage(true, "Please select a date", 'chooseDateError', 'newDateslected');
			}
			return false;
		}
	} else {
		if (meetingDate == '' || meetingDate == undefined) {
			$('#freeSlotList').html("");
			$('#slotcount').html("");
			if ($("#" + formId + " #chooseDate").length) {
				showMessageRequestDemoPage(true, "Please select a date", 'chooseDateError', 'chooseDate');
			} else if ($("#" + formId + " #newDateslected").length) {
				showMessageRequestDemoPage(true, "Please select a date", 'chooseDateError', 'newDateslected');
			}
			return false;
		}
	}
	var countryTimezoneId = $('#' + formId + ' #countryTimezoneId').val();
	if (countryTimezoneId != null && countryTimezoneId != 0) {
		freeslotsList(formId, status, type, resStatus)
		$('#bookMeetingslot').removeClass('active');
	} else {
		$('#freeSlotList').html("");
		$('#slotcount').html("");
		showMessageRequestDemoPage(true, "Please select a Time Zone", 'countryTimezoneIdError', 'countryTimezoneId');
		return false;
	}
}

function freeslotsList(formId, status, type, resStatus) {
	var meetingDate = $('#' + formId + ' #chooseDate').val();
	if ($("#" + formId + " #chooseDate").length) {
		meetingDate = $('#' + formId + ' #chooseDate').val();
	} else if ($("#" + formId + " #newDateslected").length) {
		meetingDate = $('#' + formId + ' #newDateslected').val();
	}
	var countryTimezoneId = 'Asia/Kolkata';
	var requestType = "";
	var lat = "";
	var lon = "";
	if (status) {
		if ($('#location').val() != '') {
			var locations = JSON.parse($('#location').val())
			lat = locations.lat;
			lon = locations.lon;
		}
	}
	if (type == 'admin') {
		requestType = 'REQUESTDEMO';
		book = 'Y'
	} else if (type == 'counselor') {
		requestType = 'COUNSELORMEET';
		book = 'N'
	} else if (type == "scholarShip") {
		requestType = 'SBSBINTERVIEWSLOT';
		book = 'Y'
	}
	callRequestDemoFreeSlots("#" + formId, "date=" + meetingDate + "&countryTimezoneId=" + countryTimezoneId + "&lat=" + lat + "&lon=" + lon + "&requestType=" + requestType + "&book=" + book + "&resStatus=" + resStatus);
}

function backToChoose() {
	$('.meeting-form, .dropdown-menu, .first-step-title').show();
	$('.confirm-meeting-form').hide();
}

function saveMeetingSlot(formId, type) {
	var flag = true;
	hideMessageRequestDemoPage('chooseDateError', 'chooseDate');
	hideMessageRequestDemoPage('chooseDateError', 'newDateslected');
	//	hideMessageRequestDemoPage('countryTimezoneIdError','countryTimezoneId');
	hideMessageRequestDemoPage('freeSlotListError', 'viewFreeSlot');
	if ("admin" == type) {
		if ($("#" + formId + " #chooseDate").length && ($("#chooseDate").val() == null || $("#chooseDate").val() == '')) {
			showMessageRequestDemoPage(true, 'Please select a date', 'chooseDateError', 'chooseDate');
			flag = false;
		}
		if ($("#" + formId + " #newDateslected").length && ($("#newDateslected").val() == null || $("#newDateslected").val() == '')) {
			showMessageRequestDemoPage(true, 'Please select a date', 'chooseDateError', 'newDateslected');
			flag = false;
		}
	} else {
		if ($("#" + formId + " #chooseDate").length && ($("#chooseDate").val() == null || $("#chooseDate").val() == '')) {
			showMessageRequestDemoPage(true, 'Please select a Month', 'chooseDateError', 'chooseDate');
			flag = false;
		}
		if ($("#" + formId + " #newDateslected").length && ($("#newDateslected").val() == null || $("#newDateslected").val() == '')) {
			showMessageRequestDemoPage(true, 'Please select a date', 'chooseDateError', 'newDateslected');
			flag = false;
		}
	}
	//	if ($("#countryTimezoneId").val()==null || $("#countryTimezoneId").val()==0) {
	//		showMessageRequestDemoPage(true, 'Please select a Time Zone', 'countryTimezoneIdError','countryTimezoneId');
	//		flag=false;
	//	}
	$('#viewFreeSlot').removeClass('pt-37');
	if ($("input[name='slotTime']:checked").val() == undefined) {
		$('#viewFreeSlot').addClass('pt-37');
		showMessageRequestDemoPage(true, 'Please select any one Slot.', 'freeSlotListError', 'viewFreeSlot');
		flag = false;
	}
	if (flag) {
		var hideTime = $("input[name='slotTime']:checked").attr('slotDateAttr') + ' (' + $("input[name='slotTime']:checked").val() + ')';
		$('#hideTime').html(hideTime);
		var hideTime = "Your preferred slot is: " + $("input[name='slotTime']:checked").attr('slotDateAttr') + ' (' + $("input[name='slotTime']:checked").val() + ')';
		$('#hideTime1').html(hideTime);
		$('.meeting-form, .dropdown-menu, .first-step-title').hide();
		$('.confirm-meeting-form').show();
		$('#isdCodeMobileNo').val("+91").trigger('change');
		$('#isdCodeWhatsupNo').val("+91").trigger('change');
		if ($("#userphone").val() != '') {
			var PhoneNumLength = $('#userphone').val().length;
			if (PhoneNumLength > 9 && PhoneNumLength < 11) {
				if ($("#" + formId + " #otpVerifiedstatus").val() == 'true') {
					$('.change-number').addClass('hide-btn');
					$('.otp-field-wrapper').css("display", "none");
					$('#userphone').attr('disabled', true);
					$('#sendOtp').addClass('hide');
					$('#verifiedNumber').removeClass('hide')
					$('#otpMessage').addClass('verified');
				} else {
					$('.send-otp').removeClass('disable-btn');
				}
			}
		}
		//$("#sendRequest").prop("disabled", true);
	}
	return flag;
}

function calendar_width() {
	var blue_bg_width = $('.blue-bg').outerWidth();
	$('.dropdown-menu').css({ width: `calc(${blue_bg_width}px - 30px)` });
	$('.datepicker td, .table-condensed').css({ 'width': '100%' });
}