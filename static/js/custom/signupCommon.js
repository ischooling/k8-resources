$(document).ready(function() {
	console.log("signupCommon");
	$("#signupButton").click(function(event) {
		event.preventDefault();
		callForUserSignUp('userSignupForm',moduleId);
	});
	$("#resendEmail").click(function(event) {
		event.preventDefault();
		callForEmailResend($("#userSignupForm #email").val().trim(),moduleId,'false');
	});
	$("#email").blur(function() {
//		event.preventDefault();
		callEmailCheck('userSignupForm',moduleId);
	});
	$("#notVerify").click(function(){
//		event.preventDefault();
		callForEmailResend($("#userSignupForm #email").val().trim(),moduleId,'false');
	});
	$("#referralCode").blur(function() {
		if($("#referralCode").val().trim()!=''){
			callReferralCodeCounselorCheck('userSignupForm',moduleId);
		}
		
	});
	
});

function callForUserSignUp(formId, moduleId) {
	hideMessage('');
	if(!validateRequestForSignup(formId,moduleId)){
		//refreshCaptcha('captchaImage');
		return false;
	}
	$("#signup").prop("disabled", true);
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForSignup('signup/stage-1'),
		data : JSON.stringify(getRequestForSignup(formId, moduleId)),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				if(data['statusCode'] == '0001'){
					$('#allReadyEmail #emailNotVerify').hide();
					$('#allReadyEmail #emailVerify').show();
					$('#allReadyEmail').modal('toggle');
				}
				showMessage(true, data['message']);
				showHideDiv(false,'signupShortForm');
				showHideDiv(true,'accountConfirmation');
				if(data['statusCode']=='0041' || data['statusCode']=='0038'){
					refreshCaptcha('captchaImage');
				}
			} else {
				//showMessage(false, data['message']);
				showHideDiv(true,'signupShortForm');
				showHideDiv(false,'accountConfirmation');
				$('#emailId').html($("#"+formId+" #email").val().trim());
			}
			$("#signup").prop("disabled", false);
			return false;
		},
		error : function(e) {
			$("#signup").prop("disabled", false);
		}
	});
}

function validateRequestForSignup(formId, moduleId){
	
	if (!validateFormAscii(formId)) {
		showMessage(false, 'Please use the English Keyboard while providing information');
		return false
	}
	
	if (!validateEmail($("#"+formId+" #email").val().trim())) {
		$("#"+formId+" #email").css('color', '#a9a9a9');
		if("STUDENT" == moduleId){
			showMessage(false, 'Student email is either empty or invalid');
		}else {
			showMessage(false,'Email is either empty or invalid');
		}
		return false
	}
	if (!validateEmail($("#"+formId+" #confirmEmail").val().trim())) {
		$("#"+formId+" #confirmEmail").css('color', '#a9a9a9');
		if("STUDENT" == moduleId){
			showMessage(false, 'Either confirm student email is empty or invalid');
		}else{
			showMessage(false, 'Either confirm email is empty or invalid');
		}
		return false
	}
	if($("#"+formId+" #email").val().trim()!=$("#"+formId+" #confirmEmail").val().trim()){
		$("#"+formId+" #email").css('color', '#a9a9a9');
		$("#"+formId+" #confirmEmail").css('color', '#a9a9a9');
		if("STUDENT" == moduleId){
			showMessage(false, 'Student email and confirm student email are not same');
		}else{
			showMessage(false, 'Email and confirm email are not same');
		}
		return false
	}
	if (!validPassword($("#"+formId+" #password").val().trim())) {
		$("#"+formId+" #password").css('color', '#a9a9a9');
		showMessage(false, 'Either password is empty or invalid');
		return false
	}
	if (!validPassword($("#"+formId+" #confirmPassword").val().trim())) {
		$("#"+formId+" #confirmPassword").css('color', '#a9a9a9');
		showMessage(false, 'Either confirm password is empty or invalid');
		return false
	}
	if($("#"+formId+" #password").val().trim()!=$("#"+formId+" #confirmPassword").val().trim()){
		$("#"+formId+" #password").css('color', '#a9a9a9');
		$("#"+formId+" #confirmPassword").css('color', '#a9a9a9');
		showMessage(false, 'Password and Confirm Password do not match');
		return false
	}
	var pass=$("#"+formId+" #password").val().trim();
	if (!(/[a-zA-Z]/.test(pass) && pass.length>=8 && pass.length<=20)) {
		showMessage(false, 'Password must be of 8 or more characters with at least one letter.');
		return false
	}
	
	if (!validateCaptcha($("#"+formId+" #captcha").val().trim())) {
		$("#"+formId+" #captcha").css('color', '#a9a9a9');
		showMessage(false, 'Either captcha is empty or invalid');
		return false
	}
	
	if($("#"+formId+" #checkTerms").is(':checked')){
		
	}else{
		showMessage(false, 'Please read terms and conditions');
		return false
	}
	return true;
}

function getRequestForSignup(formId, moduleId){
	var request = {};
	var authentication = {};
	var requestData = {};
	var signupDTO = {};
	var url=window.location.href;
	var isDemoUser=url.split('?isDemoUser')[1];
	signupDTO['location'] = $("#"+formId+" #location").val().trim();
	signupDTO['signupMode'] = $("#"+formId+" #signupMode").val().trim();
	signupDTO['email'] = $("#"+formId+" #email").val().trim();
	signupDTO['confirmEmail'] = $("#"+formId+" #confirmEmail").val().trim();
	signupDTO['password'] = escapeCharacters($("#"+formId+" #password").val().trim());
	signupDTO['confirmPassword'] = escapeCharacters($("#"+formId+" #confirmPassword").val().trim());
	signupDTO['captcha'] = $("#"+formId+" #captcha").val().trim();
	signupDTO['referralCode'] = $("#"+formId+" #referralCode").val();
	signupDTO['shift'] = $("#"+formId+" #shift").val();
	signupDTO['courseProviderId'] = $("#"+formId+" #courseProviderId").val();
	signupDTO['signupType'] = 'Online';
	signupDTO['userType'] = moduleId;
	signupDTO['schoolId'] = SCHOOL_ID;
	signupDTO['schoolUUID'] = SCHOOL_UUID;
	if(isDemoUser!='' && isDemoUser!=undefined){
		isDemoUser=isDemoUser.split('=')[1];
		signupDTO['isDemoUser'] = isDemoUser;
	}
	requestData['signupDTO'] = signupDTO;
	authentication['hash'] = getHash();authentication['schoolId'] = SCHOOL_ID;authentication['schoolUUID'] = SCHOOL_UUID;
	authentication['userType'] = moduleId;
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	return request;
}


function callReferralCodeCounselorCheck(formId, moduleId) {
	hideMessage('');
	if ($("#referralCode").val().trim()=='') {
  		showMessage(false, 'Referral Code empty or invalid');
  		return false
  	}
	
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForCommon('verify-referral'),
		data : JSON.stringify(getRequestForReferralCodeCheck(formId,moduleId)),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		success : function(data) {
			console.log("data referral=>", JSON.stringify(data));
			if (data['status'] == '0' || data['status'] == '2') {
				showMessage(true, 'This referral code is not available, please try again.');
			}
			return false;
		},
		error : function(e) {
			//showMessage(true, e.responseText);
			console.log("ERROR : ", e);
		}
	});
}

function getRequestForReferralCodeCheck(formId, moduleId){
	var request = {};
	var authentication = {};
	var requestData = {};
	requestData['requestKey'] = 'REFERRAL-AVAILABLE';
	requestData['requestValue'] = $("#referralCode").val().trim();
	authentication['hash'] = getHash();authentication['schoolId'] = SCHOOL_ID;authentication['schoolUUID'] = SCHOOL_UUID;
	authentication['userType'] = moduleId;
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	return request;
}