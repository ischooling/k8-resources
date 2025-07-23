$(document).ready(function() {
	$(".customClassForNextTeacher").unbind('click').bind('click', function() {
		saveSignupTeacher();
	});
});
function saveSignupTeacher(){
	if(signupPage==1){
		callForSignupUserDetails('signupStage1');
	}else if(signupPage==2){
		callForSignupTeacherBasicDetails('signupStage2');
	}else if(signupPage==3){
		if(firstReset==11 || firstReset==12){
			callForSignupTeacherUpdateProfile('signupStage3');
		}	
	}else if(signupPage==4){
		callForSignupTeacherReviewAndApproval('signupStage4');
	}else if(signupPage==5){
		if(firstReset==14){
			submitQuestionsAnswers('signupStage5');
		}else{
			callForSignupTeacherInterviewSlotSubmit('signupStage5');
		}
	}else if(signupPage==6){
		callForSignupTeacherAccountAndContact('signupStage6');
	}
}
function validateRequestForSignupUser(formId){
	if($("#"+formId+" #currentPassword").val()!=$("#"+formId+" #currentPassword").val()){
		showMessage(false, 'Current password is not valid');
		return false
	}
	
	if (!validPassword($("#"+formId+" #newPassword").val())) {
		showMessage(false, 'Either new password is empty or invalid');
		return false
	}
	
	if($("#"+formId+" #password").val()!=$("#"+formId+" #confirmPassword").val()){
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
		url : getURLForHTML('teacher','signup/stage-1'),
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