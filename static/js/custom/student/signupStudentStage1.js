$(document).ready(function() {
	$(".customClassForNextStudent").unbind('click').bind('click', function() {
		saveSignupStudent();
	});	
});
function saveSignupStudent(){
	if(signupPage==1){
		callForSignupUserDetails('signupStage1');
	}else if(signupPage==2){
		callForSignupStudentDetails('signupStage2');
	}else if(signupPage==3){
		callForSignUpParents('signupStage3');
	}else if(signupPage==4){
		callForSignupStudentAddressDetails('signupStage4');
	}else if(signupPage==5){
		if(signupSubPage1==1){
			if($("#standardId5").val()=='0' || $("#standardId5").val()==null){
				showMessage(false,'Please select grade');
				return false
			}
//			var creditCountTotal = calculatePageCreditCount(4);
//			if( creditCountTotal<=0 || creditCountTotal >6){
//				showMessage(false,'Please select credit recovery courses worth 0.5-6 units of academic credit');
//				return false
//			}
			showTwo();
			signupSubPage1=2;
		}else if(signupSubPage1==2){
			//ADD VALIDATION FOR AT LEAST 0.5 OR DEPEND ON REQUIREMENT
			if($("#standardId5").val()=='0' || $("#standardId5").val()==null){
				showMessage(false,'Please select grade');
				return false
			}
			if($("#standardId5").val()<4){
				var creditCountTotal = calculatePageCreditCount(4);
				if(creditCountTotal <6){
					showMessage(false,'Please select courses atleast worth 6 units of academic credit.');
					return false
				}
				showPaymentMode();
				signupSubPage1=4;
				
			}else{
				if(!elligibleForAPCourse){
					var creditCountTotal = calculatePageCreditCount(4);
					if(creditCountTotal < 6){
						showMessage(false,'Please select courses atleast worth 6 units of academic credit.');
						return false
					}
					showPaymentMode();
					signupSubPage1=4;
				}else{
					showThree();
					signupSubPage1=3;
				}
			}
		}else if(signupSubPage1==3){
			//ADD VALIDATION FOR AT LEAST 0.5 OR DEPEND ON REQUIREMENT
			if($("#standardId5").val()=='0' || $("#standardId5").val()==null){
				showMessage(false,'Please select grade');
				return false
			}
			showPaymentMode();
	    	signupSubPage1=4;
		}else if(signupSubPage1==4){
			updatePaymentMode();
			callForSignupCourseDetails('signupStage6');
		}
		console.log('signupSubPage1 next '+signupSubPage1);
		setTimeout(function(){
			tabActiveStatus(5);
		}, 100);
		$('#signupSubPage1').val(signupSubPage1);
	}else if(signupPage==6){
		getStudentSignupDetailInReviewStage('signupStage6');
		$('#Preview').show();
		
	}else if(signupPage==7){
		//getRequestForStudentPayment('signupStage6');
	}
	
}

function validateRequestForSignupUser(formId){
	
	/*if (!validateFormAscii(formId)) {
		showMessage(false, 'Please use the English Keyboard while providing information');
		return false
	}
	*/
	if($("#"+formId+" #currentPassword").val()!=$("#"+formId+" #currentPassword").val()) {
		showMessage(false, 'Current password is not valid');
		return false
	}
	
	if (!validPassword($("#"+formId+" #newPassword").val())) {
		showMessage(false, 'Either new password is empty or invalid');
		return false
	}
	
	if($("#"+formId+" #password").val()!=$("#"+formId+" #confirmPassword").val()) {
		showMessage(false, 'Password and Confirm Password do not match');
		return false
	}
	return true;
}

function callForSignupUserDetails(formId) {
	hideMessage('');
	if(!validateRequestForSignupUser(formId)){
		tabActiveStatus(1);
		return false;
	}
	$("#nextStep").prop("disabled", true);
	$.ajax({
		type : "POST",
		url : getURLForHTML('student','signup/stage-1'),
		data : getRequestForUser(formId),
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
            			tabActiveStatus(1);
        			}
        		} else {
        			$('#signupStage2Content').html(htmlContent)
        			showMessage(false, 'User password updated successfully.');
        			tabActiveStatus(2);
        		}
        		$("#nextStep").prop("disabled", false);
        		return false;
			}
		},
		error : function(e) {
			//showMessage(true, e.responseText);
			$("#nextStep").prop("disabled", false);
			tabActiveStatus(1);
		}
	});
}

function getRequestForUser(formId){	
	$(".disabledFields").each(function(){
		$(this).removeAttr('disabled');
	});
	var request = $('#'+formId).serialize();
	$(".disabledFields").each(function(){
		$(this).attr('disabled','disabled');
	});
	return request;
}