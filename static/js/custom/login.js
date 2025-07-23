$(document).ready(function() {
	
	$("#loginButton").click(function(event) {
		event.preventDefault();
		callUserLogin('loginForm', moduleId, 'FRESH');
	});
	$("#forgotSubmit").click(function(){
		callForEmailForgot('forgetForm', moduleId);
	});
	
	$("#resetPassword").click(function(){
		callForResetPassword('changeForm', moduleId);
	});
	$("#notVerify").click(function(){
		callForEmailResend($("#loginForm #email").val().trim(), moduleId,'false');
	});
	
});

function validateElement(formId,fieldId, fielderrorId){
	flag=true;
	if(fieldId=='email'){
		if (!validateEmail($("#" + formId + " #email").val().trim())) {
			showMessageRequestDemoPage(true, 'Email is either empty or invalid', 'emailError','email');
			flag=false
		}else{
			hideMessageRequestDemoPage('emailError','email');
		}
	}else if(fieldId=='password'){
		if ($("#"+formId+" #password").val().trim()=='' || $("#"+formId+" #password").val().trim()==null) {	
			showMessageRequestDemoPage(true, 'Either password is empty or invalid', 'passwordError','password');
			flag=false
		}else{
			hideMessageRequestDemoPage('passwordError','password');
		}
	}else if(fieldId=='captcha'){
		if (!validateCaptcha($("#" + formId + " #captcha").val().trim())) {
			showMessageRequestDemoPage(true, 'Either captcha is empty or invalid', 'captchaError','captcha');
			flag=false
		}else{
			hideMessageRequestDemoPage( 'captchaError','captcha');
		}	
	}
	return flag;
}


function validateRequestForLogin(formId) {
	var flag=true;
	hideMessageRequestDemoPage('serverError','');
	hideMessageRequestDemoPage('emailError','email');
	hideMessageRequestDemoPage('passwordError','password');
	hideMessageRequestDemoPage( 'captchaError','captcha');
//	if (!validateFormAscii(formId)) {
//		showMessage(false, 'Please use the English Keyboard while providing information');
//		return false
//	}
	if (!validateEmail($("#" + formId + " #email").val().trim())) {
		showMessageRequestDemoPage(true, 'Email is either empty or invalid', 'emailError','email');
		flag=false
	}
	if ($("#"+formId+" #password").val().trim()=='' || $("#"+formId+" #password").val().trim()==null) {	
		showMessageRequestDemoPage(true, 'Either password is empty or invalid', 'passwordError','password');
		flag=false
	}
	if (!validateCaptcha($("#" + formId + " #captcha").val().trim())) {
		showMessageRequestDemoPage(true, 'Either captcha is empty or invalid', 'captchaError','captcha');
		flag=false
	}
	return flag;
}

function getRequestForLogin(formId, moduleId, loginType) {
	var request = {};
	var authentication = {};
	var requestData = {};
	var loginDTO = {};
	loginDTO['themeType'] = 'theme2'
	loginDTO['userName'] = $("#" + formId + " #email").val().trim();
	loginDTO['password'] = $("#" + formId + " #password").val().trim();
	loginDTO['captcha'] = $("#" + formId + " #captcha").val().trim();
	if($("#" + formId + " #location").length>0){
		loginDTO['location'] = $("#" + formId + " #location").val().trim();
	}
	loginDTO['mobileNumber'] = '';
	loginDTO['loginType'] = loginType;
	
	requestData['loginDTO'] = loginDTO;
	authentication['hash'] = getHash();authentication['schoolId'] = SCHOOL_ID;authentication['schoolUUID'] = SCHOOL_UUID;
	authentication['userType'] = moduleId;
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	return request;
}

function callUserLogin(formId, moduleId,loginType) {
	hideMessageRequestDemoPage('serverError','');
	if (!validateRequestForLogin(formId)) {
		return false;
	}
	$("#"+formId+" #login").prop("disabled", true);
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForCommon('login'),
		data : JSON.stringify(getRequestForLogin(formId, moduleId, loginType)),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		success : function(data) {
			localStorage.setItem('welcome',false);
			if (data['status'] == '0' || data['status'] == '2') {
				refreshCaptcha('captchaImage');
				if(data['statusCode'] == '0043') {
					$('#allReadyEmail #emailNotVerify').show();
					$('#allReadyEmail #emailVerify').hide();
					$('#allReadyEmail #userDeclined').hide();
					$('#allReadyEmail').modal('toggle');
				}else if(data['statusCode'] == '02') {
					$('#allReadyEmail #emailNotVerify').hide();
					$('#allReadyEmail #emailVerify').hide();
					$('#allReadyEmail #userDeclined').show();
					$('#allReadyEmail').modal('toggle');
				}else{
					showMessageRequestDemoPage(true, data['message'], 'serverError','');
				}
				customLoader(false)
			} else {
				customLoader(true);
				UNIQUEUUID=data['responseLoginDTO']['uniqueId']
				var redirectUrl = data['responseLoginDTO']['redirectUrl'];
				console.log('redirectUrl :: '+redirectUrl)
				if(redirectUrl.startsWith('http')){
					showMessage(false, data['message']);
					if(loginType=='FRESH'){
						goAhead(redirectUrl, data['responseLoginDTO']['userLoginHash']);
					}else if(loginType=='CONTINUE'){
						customLoader(false)
						$('#sessionOutPermission').modal('hide')
					}
				}else{
					showMessage(false, redirectUrl);
				}
			}
			$("#"+formId+" #login").prop("disabled", false);
			return false;
		},
		error : function(e) {
			$("#"+formId+" #login").prop("disabled", false);
		}
	});
}

function cms() {
	$.ajax({
		type : "GET",
		contentType : "application/json",
		url : APP_BASE_URL+'maintain-session',
		dataType : 'html',
		global : false,
		success : function(htmlContent) {
			console.log('htmlContent '+htmlContent)
			if(htmlContent!=""){
            	var stringMessage = [];
            	stringMessage = htmlContent.split("|");
            	if(stringMessage[0] == "FAILED" || stringMessage[0] == "EXCEPTION" || stringMessage[0] == "SESSIONOUT" ){
            		if(stringMessage[0] == "SESSIONOUT"){
	            		redirectLoginPage()
					}else{
						console.log('cms:'+stringMessage[1])
					}
        		}
			}
		},
		error : function(e) {
			console.log(e.responseText)
		}
	});
}