$(document).ready(function() {
	
	
});
function callForSignupStudentAddressDetails(formId) {
	hideMessage('');
	if(!validateRequestForSignupStudentAddress(formId)){
		return false;
	}
	$("#nextStep").prop("disabled", true);
	$.ajax({
		type : "POST",
		url : getURLForHTML('student','signup/stage-4'),
		data : encodeURI("request="+JSON.stringify(getRequestForStudentAddress(formId))),
		dataType : 'html',
		cache : false,
		timeout : 600000,
		success : function(htmlContent) {
			if(htmlContent!=""){
            	var stringMessage = [];
            	stringMessage = htmlContent.split("|");
        		if(stringMessage[0] == "FAILED" || stringMessage[0] == "EXCEPTION" || stringMessage[0] == "SESSIONOUT"){
        			if(stringMessage[0] == "SESSIONOUT"){
        				redirectLoginPage();
        			}else{
        				showMessage(true, stringMessage[1]);
        				tabActiveStatus(4);
        			}
        		} else {
        			$('#signupStage5Content').html(htmlContent)
        			showMessage(false, 'Address updated successfully.');
        			tabActiveStatus(5);
        		}
        		$("#nextStep").prop("disabled", false);
        		return false;
			}
		},
		error : function(e) {
			//showMessage(true, e.responseText);
			$("#nextStep").prop("disabled", false);
			tabActiveStatus(4);
		}
	});
}
function getRequestForStudentAddress(formId){
	var request = {};
	var authentication = {};
	var requestData = {};
	var signupAddressDTO = {};
	var residentialAddress={};
	var mailingAddress={};
	
	residentialAddress['address1'] = escapeCharacters($("#"+formId+" #residentialAddressAddress1").val());
	residentialAddress['address2'] = escapeCharacters($("#"+formId+" #residentialAddressAddress2").val());
	residentialAddress['pincode'] = $("#"+formId+" #residentialAddressPincode").val();
	mailingAddress['address1'] = escapeCharacters($("#"+formId+" #mailingAddressAddress1").val());
	mailingAddress['address2'] = escapeCharacters($("#"+formId+" #mailingAddressAddress2").val());
	mailingAddress['pincode'] = $("#"+formId+" #mailingAddressPincode").val();
	signupAddressDTO['sameAddress'] = $("#"+formId+" #sameAddress").val();
	
	signupAddressDTO['residentialAddress']=residentialAddress;
	signupAddressDTO['mailingAddress']=mailingAddress;
	requestData['signupAddressDTO']=signupAddressDTO;
	
	authentication['hash'] = getHash();
	authentication['schoolId'] = SCHOOL_ID;
	authentication['schoolUUID'] = SCHOOL_UUID;
	authentication['userType'] = 'STUDENT';
	authentication['userId'] = $("#"+formId+" #userId").val();
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	return request;
}
function validateRequestForSignupStudentAddress(formId){
	
	if (!validateFormAscii(formId)) {
		showMessage(false, 'Please use the English Keyboard while providing information');
		return false
	}
	
	if ($("#"+formId+" #residentialAddressAddress1").val()=="") {
		showMessage(true, 'Residential address Line 1 is required');
		tabActiveStatus(4);
		$("#nextStep").prop("disabled", false);
		return false
	}
//	if ($("#"+formId+" #residentialAddressAddress2").val()=="") {
//		showMessage(true, 'Residential address2 is required');
//		tabActiveStatus(4);
//		$("#nextStep").prop("disabled", false);
//		return false
//	}
	if ($("#"+formId+" #residentialAddressPincode").val()=="") {
		showMessage(true, 'Residential Zip Code is required');
		tabActiveStatus(4);
		$("#nextStep").prop("disabled", false);
		return false
	}
	if(!$("#"+formId+" #sameAddress").is(':checked')){
		if ($("#"+formId+" #mailingAddressAddress1").val()=="") {
			showMessage(true, 'Mailing Address Line 1 is required');
			tabActiveStatus(4);
			$("#nextStep").prop("disabled", false);
			return false
		}
//		if ($("#"+formId+" #mailingAddressAddress2").val()=="") {
//			showMessage(true, 'Mailing Address1 is required');
//			tabActiveStatus(4);
//			$("#nextStep").prop("disabled", false);
//			return false
//		}
		if ($("#"+formId+" #mailingAddressPincode").val()=="") {
			showMessage(true, 'Mailing Zip Code is required');
			tabActiveStatus(4);
			$("#nextStep").prop("disabled", false);
			return false
		}
	}
	
	return true;
}
