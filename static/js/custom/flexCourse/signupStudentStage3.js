$(document).ready(function() {
	$("#signupParent").submit(function(event) {
		event.preventDefault();
		//callForstudentParentSignUp();
	});
});


function callForSignUpEducation(formId) {
	hideMessage('');
	if(!validateRequestForSignupEducation(formId)){
		tabActiveStatus(3);
		signupPage=3;
		$("#nextStep").prop("disabled", false);
		return false;
	}
	
	$("#nextStep").prop("disabled", true);
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForHTML('student/flexcourse','signup/stage-3'),
		data : JSON.stringify(getRequestForSignupEducation(formId)),
		dataType : 'html',
		cache : false,
		timeout : 600000,
		success : function(htmlContent) {
			if(htmlContent!=""){
            	var stringMessage = [];
            	stringMessage = htmlContent.split("|");
        		if(stringMessage[0] == "FAILED" || stringMessage[0] == "EXCEPTION" || stringMessage[0] == "SESSIONOUT" ){
        			if(stringMessage[0] == "SESSIONOUT"){
        				redirectLoginPage();
        			}else{
        				showMessage(true, stringMessage[1]);
        				tabActiveStatus(3);
        			}
        		} else {
        			$('#signupStage4Content').html(htmlContent);
        			showMessage(false, 'Qualification details updated successfully.');
        			tabActiveStatus(4);
        		}
        		$("#nextStep").prop("disabled", false);
        		return false;
			}
			return false;
		},
		error : function(e) {
			$("#nextStep").prop("disabled", false);
			tabActiveStatus(3);
		}
	});
}
function validateRequestForSignupEducation(formId){
	
	if (!validateFormAscii(formId)) {
		console.log("call non ascii ");
		showMessage(false, 'Please use the English Keyboard while providing information');
		return false
	}
	if ($("#"+formId+" #highestQualification").val()=="" || $("#"+formId+" #highestQualification").val()=="0") {
		showMessage(true, 'Highest Educational Qualification is required.');
		return false
	}
	if ($("#"+formId+" #nameOfSchool").val()=="") {
		showMessage(true, 'Name of School is required.');
		return false
	}
	if ($("#"+formId+" #studyCourses").val()=="") {
		showMessage(true, 'Study/Courses is required.');
		return false
	}
	if ($("#"+formId+" #finalMarksGpa").val()=="") {
		showMessage(true, 'Final Marks is required.');
		return false
	}
	
	if ($("#"+formId+" #finalMarksGpa").val()!="") {
		if(parseInt($("#"+formId+" #finalMarksGpa").val())>100){
			showMessage(true, 'Please fill Final Marks Out of 100.');
			return false
		}
	}
	
	if ($("#"+formId+" #graduationMonth").val()=="") {
		showMessage(true, 'Graduation Month is required.');
		return false
	}
	if ($("#"+formId+" #graduationYear").val()=="") {
		showMessage(true, 'Graduation Year is required.');
		return false
	}
	
	return true;
}
function getRequestForSignupEducation(formId){
	var request = {};
	var authentication = {};
	var requestData = {};
	var signupEducationQualificationDTO = {};
	signupEducationQualificationDTO['studentId'] = $("#"+formId+" #studentId").val();
	signupEducationQualificationDTO['highestQualification'] = $("#"+formId+" #highestQualification").val();
	signupEducationQualificationDTO['nameOfSchool'] = $("#"+formId+" #nameOfSchool").val();
	signupEducationQualificationDTO['studyCourses'] = $("#"+formId+" #studyCourses").val();
	signupEducationQualificationDTO['finalMarksGpa'] = $("#"+formId+" #finalMarksGpa").val();
	signupEducationQualificationDTO['graduationMonth'] = $("#"+formId+" #graduationMonth").val();
	signupEducationQualificationDTO['graduationYear'] = $("#"+formId+" #graduationYear").val();
	requestData['signupEducationQualificationDTO'] = signupEducationQualificationDTO;
	authentication['hash'] = getHash();authentication['schoolId'] = SCHOOL_ID;authentication['schoolUUID'] = SCHOOL_UUID;
	authentication['userType'] = 'STUDENT';
	authentication['userId'] = $("#"+formId+" #userId").val();
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	return request;
}
