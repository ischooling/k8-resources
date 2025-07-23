function showBankDetails(accountType){
	if(accountType == 'BANK_ACCOUNT'){
		$('#teacherBankAccountDetails').show();
		$('#teacherPayPalAccountDetails').hide();
	}else if(accountType == 'PAYPAL'){
		$('#teacherBankAccountDetails').hide();
		$('#teacherPayPalAccountDetails').show();
	}
}
function callForSignupTeacherAccountAndContact(formId) {
	hideMessage('');
	if(!validateRequestForSignupTeacherAccountAndContact(formId)){
		tabActiveStatus(6);
		return false;
	}
	$("#nextStep").prop("disabled", true);
	$.ajax({
		type : "POST",
		url : getURLForHTML('teacher','signup/stage-6'),
		data : encodeURI("request="+JSON.stringify(getRequestForTeacherAccountAndContact(formId))),
		dataType : 'html',
		cache : false,
		async:false,
		timeout : 600000,
		success : function(htmlContent) {
			if(htmlContent!=""){
            	var stringMessage = [];
            	stringMessage = htmlContent.split("|");
        		if(stringMessage[0] == "FAILED" || stringMessage[0] == "EXCEPTION"){
        			showMessage(true, stringMessage[1]);
        			tabActiveStatus(6);
        		} else {
        			$('#signupStage6Content').html(htmlContent)
        			showMessage(false, 'Teacher Payment Details updated successfully.');
        			$('#teacherAgreementModal').modal('show');
//        			console.log('teacher'+teacher);
//        			callTeacherAgreementModal();
//        			setTimeout(function(){
//        				goAhead(CONTEXT_PATH+"dashboard/teacher", '');
//					}, 3000);
        		}
        		$("#nextStep").prop("disabled", false);
        		return false;
			}
		},
		error : function(e) {
		//	showMessage(true, e.responseText);
			$("#nextStep").prop("disabled", false);
			tabActiveStatus(6);
		}
	});
}
function validateRequestForSignupTeacherAccountAndContact(formId) {
	
	var accountType = "BANK_ACCOUNT";
	if($('#'+formId+ ' #accountTypePayPal').is(":checked")){
		accountType = "PAYPAL";
	}
	
	if(accountType == 'BANK_ACCOUNT'){
		if($('#'+formId+ ' #accountPersonName').val()=='' || $('#'+formId+ ' #accountPersonName').val()==undefined){
			showMessage(true, 'Account Holder Name is required');
			return false;
		}
		if($('#'+formId+ ' #bankName').val()=='' || $('#'+formId+ ' #bankName').val()==undefined){
			showMessage(true, 'Bank Name is required');
			return false;
		}
		if($('#'+formId+ ' #bankBranchName').val()=='' || $('#'+formId+ ' #bankBranchName').val()==undefined){
			showMessage(true, 'Bank Branch Name is required');
			return false;
		}
		if($('#'+formId+ ' #bankBranchAddress').val()=='' || $('#'+formId+ ' #bankBranchAddress').val()==undefined){
			showMessage(true, 'Bank Branch Address is required');
			return false;
		}
		if($('#'+formId+ ' #accountNumber').val()=='' || $('#'+formId+ ' #accountNumber').val()==undefined){
			showMessage(true, 'Account Number is required');
			return false;
		}
		//if($('#'+formId+ ' #routeNumber').val()!='' && $('#'+formId+ ' #routeNumber').val().length<9){
			//showMessage(true, 'Routing Number should be atleast 9 digit');
			//return false;
		//}
		/*if($('#'+formId+ ' #swiftCode').val()!='' &&  ($('#'+formId+ ' #swiftCode').val().length>8 && $('#'+formId+ ' #swiftCode').val().length>11)){
			showMessage(true, 'Swift code should be between 8 to 11 digits');
			return false;
		}*/
		//if($('#'+formId+ ' #swiftCode').val()!='' && ( $('#'+formId+ ' #swiftCode').val().length<8 || $('#'+formId+ ' #swiftCode').val().length>11)){
			//showMessage(true, 'Swift code should be between 8 to 11 digits');
			//disabledBankDeatils(false);
			//return false;
		//}
	}else if(accountType == 'PAYPAL'){
		if (!validateEmail($("#"+formId+" #payPalEmail").val())) {
			showMessage(true, 'PayPal Email ID is invalid');
			return false;
		}
		if (($("#"+formId+" #payPalIsdCode").val()=='' || $("#"+formId+" #payPalIsdCode").val()==null) && $("#"+formId+" #payPalMobile").val()=='' ){
			
		}else{
			if ($("#"+formId+" #payPalIsdCode").val()=='' || $("#"+formId+" #payPalIsdCode").val()==null) {
				showMessage(false, 'Please choose PayPal ISD Code');
				return false
			}
			if ($("#"+formId+" #payPalMobile").val()=="" || ($("#"+formId+" #payPalMobile").val().length<4 || $("#"+formId+" #payPalMobile").val().length>15) ){
				showMessage(true, 'PayPal Mobile Number is required');
				return false
			}
		}
//		if ($("#"+formId+" #payPalAccountHolderName").val()=="") {
//			showMessage(true, 'PayPal account holder Name is required');
//			return false
//		}
	}else{
		showMessage(true, 'Invalid request!');
		return false;
	}
	
	return true;
}
function getRequestForTeacherAccountAndContact(formId){
	var request = {};
	var authentication = {};
	var requestData = {};
	var teacherPaymentInfoDTO = {};
	
	var accountType = "BANK_ACCOUNT";
	if($('#'+formId+ ' #accountTypePayPal').is(":checked")){
		accountType = "PAYPAL";
	}
	teacherPaymentInfoDTO['paymentMode'] = $("#"+formId+" #paymentMode").val();
	teacherPaymentInfoDTO['accountType'] = accountType;
//	if(accountType == 'BANK_ACCOUNT'){
		teacherPaymentInfoDTO['accountPersonName'] = $("#"+formId+" #accountPersonName").val();
		teacherPaymentInfoDTO['bankName'] = $("#"+formId+" #bankName").val();
		teacherPaymentInfoDTO['bankBranchName'] = $("#"+formId+" #bankBranchName").val();
		teacherPaymentInfoDTO['bankBranchAddress'] = escapeCharacters($("#"+formId+" #bankBranchAddress").val());
		teacherPaymentInfoDTO['accountNumber'] = $("#"+formId+" #accountNumber").val();
		teacherPaymentInfoDTO['routeNumber'] = $("#"+formId+" #routeNumber").val();
		teacherPaymentInfoDTO['swiftCode'] = $("#"+formId+" #swiftCode").val();
//	}else if(accountType == 'PAYPAL'){
		teacherPaymentInfoDTO['payPalEmail'] = $("#"+formId+" #payPalEmail").val();
		teacherPaymentInfoDTO['payPalIsdCode'] = $("#"+formId+" #payPalIsdCode").val();
		teacherPaymentInfoDTO['payPalMobile'] = $("#"+formId+" #payPalMobile").val();
		teacherPaymentInfoDTO['payPalAccountHolderName'] = $("#"+formId+" #payPalAccountHolderName").val();
//	}
	
	requestData['teacherPaymentInfoDTO'] = teacherPaymentInfoDTO;
	authentication['hash'] = getHash();authentication['schoolId'] = SCHOOL_ID;authentication['schoolUUID'] = SCHOOL_UUID;
	authentication['userType'] = 'TEACHER';
	authentication['userId'] = $("#"+formId+" #userId").val();
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	return request;
}

function callForSignupTeacherAgreement(userId,agreementLogId, controlType) {
	hideMessage('');
	if(!validateRequestForSignupTeacherAgreement()){
		tabActiveStatus(6);
		return false;
	}
	$.ajax({
		type : "POST",
		url : getURLForHTML('teacher','/signup/save-Teacher-Declaration'),
		data : "userId="+userId+"&agreementLogId="+agreementLogId+"&controlType="+controlType,
		dataType : 'html',
		cache : false,
		async:false,
		//timeout : 600000,
			success : function(htmlContent) {
				if(htmlContent!=""){
	            	var stringMessage = [];
	            	stringMessage = htmlContent.split("|");
	            	if(stringMessage[0] == "FAILED" || stringMessage[0] == "EXCEPTION" || stringMessage[0] == "SESSIONOUT" ){
	            		showMessage(true, stringMessage[1]);
	        		}else{
	        			showMessage(true, stringMessage[1]);
	        			setTimeout(function(){
	        				goAhead(CONTEXT_PATH+UNIQUEUUID+"/"+"dashboard/teacher/"+SCHOOL_UUID, '');
						}, 1000);
	        		}
	    			return false;
				}
		},
		error : function(e) {
		//	showMessage(true, e.responseText);
			$("#nextStep").prop("disabled", false);
			tabActiveStatus(1);
		}
	});
	function validateRequestForSignupTeacherAgreement() {
		if(!$('#agreementDeclarationConfirm').is(':checked')){
			showMessage(true, 'Please accept the declaration');
			return false
		}
		return true;
	}
}
