$(document).ready(function() {
	console.log("signupCommon");
	$("#signupButton").click(function(event) {
		event.preventDefault();
		callForUserSignUp('userSignupForm',moduleId);
	});
	$("#resendEmail").click(function(event) {
		event.preventDefault();
		callForEmailResend($("#userSignupForm #email").val(),moduleId,'false');
	});
	$("#email").blur(function() {
//		event.preventDefault();
		callEmailCheck('userSignupForm',moduleId);
	});
	$("#notVerify").click(function(){
//		event.preventDefault();
		callForEmailResend($("#userSignupForm #email").val(),moduleId,'false');
	});
	$("#referralCode").blur(function() {
		if($("#referralCode").val()!=''){
			callReferralCodeCounselorCheck('userSignupForm',moduleId);
		}

	});

	$("#sendOTP").click(function(event) {
		event.preventDefault();
		callForOTP('userSignupForm',moduleId, 1, 'S', moduleId+'-SIGNUP', '0');
	});

	$("#resendOTP").click(function(event) {
		event.preventDefault();
		callForOTP('userSignupForm',moduleId, 2, 'S', moduleId+'-SIGNUP', '0');
	});

	$("#verifyOTP").click(function(event) {
		event.preventDefault();
		callForOTP('userSignupForm',moduleId, 3, 'S', moduleId+'-SIGNUP', '0');
	});

});

//moduleId.concat.('-SIGNUP')

//otpType = 1 = SEND-OTP
//otpType = 2 = RESEND-OTP
//otpType = 3 = VERIFY-OTP

function callForOTPOld(formId, moduleId, otpType, messageChannel) {
	hideMessage('');
	hideMessageRequestDemoPage('serverError','');
	if(!validateRequestForOTPOld(formId, moduleId, otpType, messageChannel)){
		return false;
	}
	$("#signup").prop("disabled", true);
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForSignup('signup/otp-process'),
		data : JSON.stringify(getRequestForOTPOld(formId, moduleId, otpType, messageChannel)),
		dataType : 'json',
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				showMessageRequestDemoPage(false, data['message'], 'serverError','');
				return false;
			}
			if(otpType==1){
				if(data['statusCode']=='OTP001'){
					showMessageRequestDemoPage(false, data['message'], 'serverError','');
					$('#heading-id').addClass('hide')
					$('.fixed-height-desktop').removeClass('hide-step');
					$('.opt-step').addClass('hide')
				}else if(data['statusCode']=='OTP012'){
					showMessageRequestDemoPage(false, data['message'], 'serverError','');
					return false;
				}else{
					$('.otp-field-wrapper').slideDown();
					$('#userphone').prop('disabled', true);
					$('#sendOTP').hide()
					$('#changeNumber').show()
				}
			}else if(otpType==2){

			}else if(otpType==3){
				if(data['statusCode']=='MIDPAGE001'){
					url = CONTEXT_PATH+UNIQUEUUID+"/student/signup/student-registration/"+SCHOOL_UUID;
					goAhead(url, '');
					return false;
				}else if(data['statusCode']=='TECMID001'){
					url = CONTEXT_PATH+UNIQUEUUID+"/teacher/signup/teacher-registration/"+SCHOOL_UUID;
					goAhead(url, '');
					return false;
				}
				else{
					$('#heading-id').addClass('hide')
					$('.fixed-height-desktop').removeClass('hide-step');
					$('.opt-step').addClass('hide')
				}



			}
			showMessageRequestDemoPage(true, data['message'], 'serverError','');
			return true;
		}
	});
}

function changeMobileNumber(){
	$("#otpCode").val("");
	$("#userphone").val("");
	$('.otp-field-wrapper').slideUp();
	$('.fixed-height-desktop').addClass('hide-step');
	$('.opt-step').removeClass('hide')
	$('#userphone').prop('disabled', false);
	$('#sendOTP').show()
	$('#changeNumber').hide()
}
function validateRequestForOTPOld(formId, moduleId, otpType, messageChannel){
	var flag=true;
	hideMessageRequestDemoPage('serverError','');
	hideMessageRequestDemoPage('mobileNumberError','mobileNumber');
	hideMessageRequestDemoPage('otpCodeError','otpCode');

	if (!validateFormAscii(formId)) {
		showMessageRequestDemoPage(false, 'Please use the English Keyboard while providing information','serverError','');
		return false
	}
	if (M.isMobile($("#"+formId+" #mobileNumber").val()) == null) {
		$("#"+formId+" #mobileNumber").css('color', '#a9a9a9');
		showMessageRequestDemoPage(true, 'Mobile number is either empty or invalid', 'mobileNumberError','mobileNumber');
		flag=false
	}
	if(otpType==3){
		if ($("#"+formId+" #otpCode").val().length !=6 ) {
			$("#"+formId+" #otpCode").css('color', '#a9a9a9');
			showMessageRequestDemoPage(true, 'Please enter valid OTP', 'otpCodeError','otpCode');
			flag=false
		}
	}
	return flag;
}

function getRequestForOTPOld(formId, moduleId, otpType, messageChannel){
	var RequestOTP = {};
	var authentication = {};
	var RequestOTPData = {};
	RequestOTPData['messageChannel'] = messageChannel;
	RequestOTPData['location'] = $("#"+formId+" #location").val();
	RequestOTPData['otpType'] = otpType;
	RequestOTPData['isdCode'] = $("#"+formId+" #isdCode").val();
	RequestOTPData['mobileNumber'] = $("#"+formId+" #mobileNumber").val();
	RequestOTPData['otpCode'] = $("#"+formId+" #otpCode").val();
	RequestOTPData['signupType'] = 'Online';
	RequestOTPData['schoolUUID'] = SCHOOL_UUID;
	if(window.location.href.search(/isDemoUser/i)>0){
		RequestOTPData['isDemoUser'] = 'true';
	}
	RequestOTP['requestOTPData'] = RequestOTPData;
	authentication['hash'] = getHash();authentication['schoolId'] = SCHOOL_ID;authentication['schoolUUID'] = SCHOOL_UUID;
	authentication['userType'] = moduleId;
	RequestOTP['authentication'] = authentication;
	RequestOTP['requestData'] = RequestOTPData;
	return RequestOTP;
}


function callForUserSignUp(formId, moduleId) {
//	hideMessage('');
	hideMessageRequestDemoPage('serverError','');
	if(!validateRequestForSignup(formId, moduleId)){
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
				showMessageRequestDemoPage(true, data['message'], 'serverError','');
				showHideDiv(false,'signupShortForm');
				showHideDiv(true,'accountConfirmation');
				if(data['statusCode']=='0041' || data['statusCode']=='0038'){
					refreshCaptcha('captchaImage');
				}
			} else {
				var url='';
				var uuid='';
				if($('#uuid').val()!=''){
					uuid='/'+$('#uuid').val();
				}
				UNIQUEUUID = data['uniqueId'];
				if(moduleId=='STUDENT'){
					if(uuid!=''){
						url = CONTEXT_PATH+UNIQUEUUID+"/student/signup/student-registration-by-scholarship/"+SCHOOL_UUID+uuid
					}else{
						url = CONTEXT_PATH+UNIQUEUUID+"/student/signup/student-registration/"+SCHOOL_UUID+uuid
					}
				}else if(moduleId=='TEACHER'){
					url = CONTEXT_PATH+UNIQUEUUID+"/teacher/signup/teacher-registration/"+SCHOOL_UUID;
				}

				goAhead(url, '');
				//showHideDiv(true,'signupShortForm');
				//showHideDiv(false,'accountConfirmation');
				//$('#useremail').html($("#"+formId+" #email").val());

			}
			$("#signup").prop("disabled", false);
			return false;
		},
		error : function(e) {
			//showMessage(true, e.responseText);
			console.log("ERROR : ", e);
			$("#signup").prop("disabled", false);
		}
	});
}

function validateRequestForSignup(formId, moduleId){
	var flag=true;
	hideMessageRequestDemoPage('serverError','');
	hideMessageRequestDemoPage('emailError','email');
	hideMessageRequestDemoPage('confirmEmailError','confirmEmail');
	hideMessageRequestDemoPage('passwordError','password');
	hideMessageRequestDemoPage('confirmPasswordError','confirmPassword');
	hideMessageRequestDemoPage('captchaError','captcha');
	hideMessageRequestDemoPage('mobileNoError','mobileNo');
	//hideMessageRequestDemoPage('checkTermsError','checkTerms');
	hideMessageRequestDemoPage('checkTerms2Error','checkTerms2');

	if (!validateFormAscii(formId)) {
		showMessageRequestDemoPage(false, 'Please use the English Keyboard while providing information','serverError','');
		return false
	}
	if (!validateEmail($("#"+formId+" #email").val())) {
		$("#"+formId+" #email").css('color', '#a9a9a9');
		showMessageRequestDemoPage(true, 'Email is either empty or invalid', 'emailError','email');
		flag=false
	}
	if (!validateEmail($("#"+formId+" #confirmEmail").val())) {
		$("#"+formId+" #confirmEmail").css('color', '#a9a9a9');
		showMessageRequestDemoPage(true, 'Confirm email is either empty or invalid', 'confirmEmailError','confirmEmail');
		flag=false
	}else  if($("#"+formId+" #email").val()!=$("#"+formId+" #confirmEmail").val()){
		$("#"+formId+" #email").css('color', '#a9a9a9');
		$("#"+formId+" #confirmEmail").css('color', '#a9a9a9');
		showMessageRequestDemoPage(true, 'Email and confirm email are not same', 'confirmEmailError','confirmEmail');
		flag=false
	}
	if ($("#"+formId+" #password").val()=='' || $("#"+formId+" #password").val()==null) {
		$("#"+formId+" #password").css('color', '#a9a9a9');
		showMessageRequestDemoPage(true, 'Either password is empty or invalid', 'passwordError','password');
		flag=false
	}
	if ($("#"+formId+" #confirmPassword").val()=='' || $("#"+formId+" #confirmPassword").val()==null) {
		$("#"+formId+" #confirmPassword").css('color', '#a9a9a9');
		showMessageRequestDemoPage(true, 'Either confirm password is empty or invalid', 'confirmPasswordError','confirmPassword');
		flag=false
	}else  if($("#"+formId+" #password").val()!=$("#"+formId+" #confirmPassword").val()){
		$("#"+formId+" #password").css('color', '#a9a9a9');
		$("#"+formId+" #confirmPassword").css('color', '#a9a9a9');
		showMessageRequestDemoPage(true, 'Password and Confirm Password do not match', 'confirmPasswordError','confirmPassword');
		flag=false
	}
	if (!validateCaptcha($("#"+formId+" #captcha").val())) {
		$("#"+formId+" #captcha").css('color', '#a9a9a9');
		showMessageRequestDemoPage(true, 'Either captcha is empty or invalid', 'captchaError','captcha');
		flag=false
	}
//	if ($("#"+formId+" #mobileNo").val()=='' || $("#"+formId+" #mobileNo").val()==null) {
//		$("#"+formId+" #mobileNo").css('color', '#a9a9a9');
//		showMessageRequestDemoPage(true, 'Mobile No. is empty or invalid', 'mobileNoError','mobileNo');
//		flag=false
//	}
	var pass=$("#"+formId+" #password").val();
	if (!(/[a-zA-Z]/.test(pass) && pass.length>=8 && pass.length<=20)) {
		showMessageRequestDemoPage(false, 'Password must be of 8 or more characters with at least one letter.','serverError','');
		return false
	}
//	if($("#"+formId+" #checkTerms").is(':checked')){
//
//	}else{
//		showMessageRequestDemoPage(true, 'Please read terms and conditions', 'checkTermsError','checkTerms');
//		flag=false
//	}
	if("STUDENT" == moduleId){
		if($("#"+formId+" #checkTerms2").is(':checked')){

		}else{
			showMessageRequestDemoPage(true, 'Please read the declaration', 'checkTerms2Error','checkTerms2');
			flag=false
		}
	}
	return flag;
}

function validateElement(formId,fieldId, fielderrorId, moduleId){
	flag=true;
	if(fieldId=='email'){
		if (!validateEmail($("#" + formId + " #email").val())) {
			showMessageRequestDemoPage(true, 'Email is either empty or invalid', 'emailError','email');
			flag=false
		}else{
			hideMessageRequestDemoPage('emailError','email');
		}
	} else if(fieldId=='confirmEmail'){
		if (!validateEmail($("#" + formId + " #confirmEmail").val())) {
			showMessageRequestDemoPage(true, 'Confirm email is either empty or invalid', 'confirmEmailError','confirmEmail');
			flag=false
		}else{
			hideMessageRequestDemoPage('confirmEmailError','confirmEmail');
		}
		if($("#"+formId+" #email").val()!=$("#"+formId+" #confirmEmail").val()){
			$("#"+formId+" #email").css('color', '#a9a9a9');
			$("#"+formId+" #confirmEmail").css('color', '#a9a9a9');
			showMessageRequestDemoPage(true, 'Email and confirm email are not same', 'confirmEmailError','confirmEmail');
			flag=false
		}else {
			hideMessageRequestDemoPage('confirmEmailError','confirmEmail');
		}
	}else if(fieldId=='password'){
		if ($("#"+formId+" #password").val()=='' || $("#"+formId+" #password").val()==null) {
			showMessageRequestDemoPage(true, 'Either password is empty or invalid', 'passwordError','password');
			flag=false
		}else{
			hideMessageRequestDemoPage('passwordError','password');
		}
	}else if(fieldId=='confirmPassword'){
		if ($("#"+formId+" #confirmPassword").val()=='' || $("#"+formId+" #confirmPassword").val()==null) {
			showMessageRequestDemoPage(true, 'Either password is empty or invalid', 'confirmPasswordError','confirmPassword');
			flag=false
		}else{
			hideMessageRequestDemoPage( 'confirmPasswordError','confirmPassword');
		}
		if($("#"+formId+" #password").val()!=$("#"+formId+" #confirmPassword").val()){
			$("#"+formId+" #password").css('color', '#a9a9a9');
			$("#"+formId+" #confirmPassword").css('color', '#a9a9a9');
			showMessageRequestDemoPage(true, 'Password and Confirm Password do not match', 'confirmPasswordError','confirmPassword');
			flag=false
		}else{
			hideMessageRequestDemoPage( 'confirmPasswordError','confirmPassword');
		}
	}else if(fieldId=='captcha'){
		if (!validateCaptcha($("#" + formId + " #captcha").val())) {
			showMessageRequestDemoPage(true, 'Either captcha is empty or invalid', 'captchaError','captcha');
			flag=false
		}else{
			hideMessageRequestDemoPage( 'captchaError','captcha');
		}
	}else if(fieldId=='mobileNo'){
		if ($("#"+formId+" #mobileNo").val()=='' || $("#"+formId+" #mobileNo").val()==null) {
			showMessageRequestDemoPage(true, 'Mobile No. is empty or invalid', 'mobileNoError','mobileNo');
			flag=false
		}else{
			hideMessageRequestDemoPage( 'mobileNoError','mobileNo');
		}
//	}else if(fieldId=='checkTerms'){
//		if($("#"+formId+" #checkTerms").is(':checked')){
//			hideMessageRequestDemoPage( 'checkTermsError','checkTerms');
//		}else{
//			showMessageRequestDemoPage(true, 'Please read terms and conditions', 'checkTermsError','checkTerms');
//			flag=false
//		}
	}else if(fieldId=='checkTerms2'){
		if($("#"+formId+" #checkTerms2").is(':checked')){
			hideMessageRequestDemoPage( 'checkTerms2Error','checkTerms2');
		}else{
			showMessageRequestDemoPage(true, 'Please read the declaration', 'checkTerms2Error','checkTerms2');
			flag=false
		}
	}
	return flag;
}

function getRequestForSignup(formId, moduleId){
	var request = {};
	var authentication = {};
	var requestData = {};
	var signupDTO = {};
	signupDTO['uuid'] = $('#uuid').val();
	signupDTO['email'] = $("#"+formId+" #email").val();
	signupDTO['confirmEmail'] = $("#"+formId+" #confirmEmail").val();
	signupDTO['password'] = $("#"+formId+" #password").val();
	signupDTO['confirmPassword'] = $("#"+formId+" #confirmPassword").val();
	signupDTO['captcha'] = $("#"+formId+" #captcha").val();
	signupDTO['referralCode'] = $("#"+formId+" #referralCode").val();
	signupDTO['reserveASeat'] = $("#"+formId+" #reserveASeat").val();
	signupDTO['location'] = $("#"+formId+" #location").val();
	signupDTO['signupMode'] = $("#"+formId+" #signupMode").val().trim();
	signupDTO['isa'] = $("#"+formId+" #isa").val().trim();
	signupDTO['shift'] = $("#"+formId+" #shift").val();
	signupDTO['courseProviderId'] = $("#"+formId+" #courseProviderId").val();
	signupDTO['signupType'] = 'Online';
	signupDTO['userType'] = moduleId;
	signupDTO['isdCode'] = $("#"+formId+" #isdCode").val();
	signupDTO['mobileNumber'] = $("#"+formId+" #userphone").val();
	signupDTO['schoolUUID'] = SCHOOL_UUID;
	if(window.location.href.search(/isDemoUser/i)>0){
		signupDTO['isDemoUser'] = 'true';
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
	if ($("#referralCode").val()=='') {
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
				showMessageRequestDemoPage(true, 'This referral code is not available, please try again.', 'serverError','');
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
	requestData['requestValue'] = $("#referralCode").val();
	authentication['hash'] = getHash();authentication['schoolId'] = SCHOOL_ID;authentication['schoolUUID'] = SCHOOL_UUID;
	authentication['userType'] = moduleId;
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	return request;
}