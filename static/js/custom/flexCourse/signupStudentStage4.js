$(document).ready(function() {
	restrictKeyEnter('scholarshipCodeInside');
});
function showGuideLines(){
	/*var standard =$("#standardId5").val();
	console.log("standard"+standard);
	if(standard==1 || standard==2 ||standard==3 ){
		$('#guide-like-heading-high-1').hide();
		$('#guide-like-content-high-1').hide();
		$('#guide-like-heading-middle').show();
		$('#guide-like-content-middle').show();
	}else{
		$('#guide-like-heading-high-1').show();
		$('#guide-like-content-high-1').show();
		$('#guide-like-heading-middle').hide();
		$('#guide-like-content-middle').hide();
	}*/
	
	$('#guidelinesNew').modal('show');
	
}
//applyScholarship('signupStage4', 1 )

function applyScholarship(formId, appliedScholarshipCode ){
	hideMessage('');
	if(!$('input[name=payModeCheckboxes]').is(':checked')){
		showMessage(true, "Please select payment option");
		return false;
	}
	
	if (!validateCharacters($('#scholarshipCodeInside').val())) {
		showMessage(false, 'Please use the English Keyboard while providing information');
		return false
	}
	
	
	if($('#scholarshipCodeInside').val()=='' || $('#scholarshipCodeInside').val()==' '){
		showMessage(true, "Enter a valid Scholarship code.");
		return false;
	}
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForHTML('student/flexcourse','signup/course-details-with-scholarship'),
		data : JSON.stringify(getRequestForStudentCourseDetailsInfo(formId, appliedScholarshipCode)),
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
	    				tabActiveStatus(4);
	    			}
	    		} else {
	    			$('#signupStage4Content').html(htmlContent);
	    			if(appliedScholarshipCode==1){
    					showMessage(true, 'Scholarship has been applied successfully');
    				}else if(appliedScholarshipCode==2){
    					showMessage(true, 'Scholarship has been removed successfully');
    				}
	    			tabActiveStatus(4);
	    		}
			}
    		$("#nextStep").prop("disabled", false);
    		return false;
		},
		error : function(e) {
			$("#nextStep").prop("disabled", false);
			tabActiveStatus(4);
		}
	});
}
function getRequestForStudentCourseDetailsInfo(formId, appliedScholarshipCode) {

	var studentCourseDetailsInfoDTO = {};
	studentCourseDetailsInfoDTO['payMode'] = $("#payMode").val();
	studentCourseDetailsInfoDTO['scholarshipCode'] = $("#scholarshipCodeInside").val();;
	studentCourseDetailsInfoDTO['additionalInfo'] = escapeCharacters($("#additionalInfo").val());
	studentCourseDetailsInfoDTO['appliedScholarshipCode'] = appliedScholarshipCode;
	
	console.log('Course Details '+studentCourseDetailsInfoDTO);
	return studentCourseDetailsInfoDTO;
}

function getRequestForStudentCourseDetails(standardId){
	return "";
}

function callForSignupCourseDetails(formId) {
	hideMessage('');
//	if(!getSelectedCourse('signupStage4','0')){
//		return false;
//	}
	/*if(!$('input[name=payModeCheckboxes]').is(':checked')){
		showMessage(true, "Please select payment option");
		return false;
	}*/
	if(!validateRequestForSignupCourse(formId)){
		return false;
	}
	$("#nextStep").prop("disabled", true);
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForHTML('student/flexcourse','signup/stage-4'),
		data : JSON.stringify(getRequestForStudentCourse(formId)),
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
        			}else {
        				showMessage(true, stringMessage[1]);
        				tabActiveStatus(4);
        			}
        		} else {
        			$('#signupStage5Content').html(htmlContent)
        			getStudentSignupDetailInReviewStage();
        			showMessage(false, 'Course Fee saved successfully.');
        			tabActiveStatus(5);
        		}
        		$("#nextStep").prop("disabled", false);
        		return false;
			}
		},
		error : function(e) {
			$("#nextStep").prop("disabled", false);
			tabActiveStatus(4);
		}
	});
}

function getRequestForStudentCourse(formId){
	var request = {};
	var authentication = {};
	var requestData = {};
	var courseDetailsDTO={};
	
	courseDetailsDTO['payMode'] = $("#payMode").val();
	courseDetailsDTO['scholarshipCode'] =  $("#scholarshipCodeInside").val();
	courseDetailsDTO['additionalInfo'] = escapeCharacters($("#additionalInfo").val());
	requestData['courseDetailsDTO']=courseDetailsDTO;
	authentication['hash'] = getHash();authentication['schoolId'] = SCHOOL_ID;authentication['schoolUUID'] = SCHOOL_UUID;
	authentication['userType'] = 'STUDENT';
	authentication['userId'] = $("#"+formId+" #userId").val();
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	console.log('request '+request);
	return request;
}

function validateRequestForSignupCourse(formId){
	if(!validateCharacters($("#additionalInfo").val()))
		{
		showMessage(false, 'Please use the English Keyboard while providing information');
		return false
		}
	
	if (!validateFormAscii(formId)) {
		showMessage(false, 'Please use the English Keyboard while providing information');
		return false;
	}
	
	
	return true;
}

function displayScholorshipDetails(radioId){
	var data = $("#"+radioId+" #originalStage5Data").text().split('|')
	if(data[1].trim()=='1'){
		$('#annual-course-fee-details').show()
		$('#installment3-course-fee-details').hide()
		$('#installment6-course-fee-details').hide()
		$('#installment9-course-fee-details').hide()
	}else if(data[1].trim()=='3'){
		$('#annual-course-fee-details').hide()
		$('#installment3-course-fee-details').show()
		$('#installment6-course-fee-details').hide()
		$('#installment9-course-fee-details').hide()
	}else if(data[1].trim()=='6'){
		$('#annual-course-fee-details').hide()
		$('#installment3-course-fee-details').hide()
		$('#installment6-course-fee-details').show()
		$('#installment9-course-fee-details').hide()
	}else if(data[1].trim()=='9'){
		$('#annual-course-fee-details').hide()
		$('#installment3-course-fee-details').hide()
		$('#installment6-course-fee-details').hide()
		$('#installment9-course-fee-details').show()
	}
}
function selectPaymentmentMethod(){
	if ($('#payMode').val() == 'annually') {
		$("#pay-one").trigger('click');
	} else if ($('#payMode').val() == 'threeMonthly') {
		$("#pay-two").trigger('click');
	} else if ($('#payMode').val() == 'sixMonthInstall') {
		$("#pay-three").trigger('click');
	} else if ($('#payMode').val() == 'nineMonthInstall') {
		$("#pay-four").trigger('click');
	}
}
function showPaymentTermCondMode(){
	if($("#regPaymentType").val()=='booking'){
		$('#payTabModal').modal('hide');
		$('#payTabBookingModal').modal('show');
	}else{
		$('#payTabBookingModal').modal('hide');
		$('#payTabModal').modal('show');
	}
}