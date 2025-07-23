function callForSignupCourseDetails(formId,callFrom) {
	var flag=false;
	hideModalMessage('');
	hideMessage('');
	if(!validateRequestForSignupCourse(formId)){
		flag=false;
		return flag;
	}
	customLoaderSignup(true);
	$.ajax({
		type : "POST",
		url : getURLForHTML('student','signup/stage-10'),
		data : encodeURI("request="+JSON.stringify(getRequestForStudentCourse(formId,callFrom))),
		dataType : 'html',
		async : false,
		global : false,
		success : function(htmlContent) {
			customLoaderSignup(false);
			if(htmlContent!=""){
            	var stringMessage = [];
            	stringMessage = htmlContent.split("|");
        		if(stringMessage[0] == "FAILED" || stringMessage[0] == "EXCEPTION" || stringMessage[0] == "SESSIONOUT"){
        			if(stringMessage[0] == "SESSIONOUT"){
        				redirectLoginPage();
        			}else {
        				showModalMessage(0, stringMessage[1]);
        			}
        			flag=false;
        		} else {
        			$('#signupStage10Content').html(htmlContent)
        			//showMessage(1, 'Course updated successfully.');
        			setTimeout(function(){
        				hideMessage('');
        			}, 3000);
        			hideModalMessage();
        			flag=true;
        		}
			}
		},
		error : function(e) {
			customLoaderSignup(false);
			showMessage(0, TECHNICAL_GLITCH);
		}
	});
	return flag;
}

function validateRequestForSignupCourse(formId){
	if(!validateCharacters($("#additionalInfo").val())){
		showMessage(0, 'Please use the English Keyboard while providing information');
		return false
	}
	if (!validateFormAscii(formId)) {
		showMessage(0, 'Please use the English Keyboard while providing information');
		return false;
	}
	if($("#checkTerms").is(':checked') == false){
		showMessage(0, 'Please agree to terms and conditions');
		return false;
	}
	return true;
}

function getRequestForStudentCourse(formId,callFrom){
	var request = {};
	var authentication = {};
	var requestData = {};
	var courseDetailsDTO={};
	courseDetailsDTO['standardId'] = $("#signupStage9 #standardId").val();
	courseDetailsDTO['themeType'] = 'theme2';
	courseDetailsDTO['enrollmentType'] = $("#enrollmentType").val();
	courseDetailsDTO['selectedSubjects'] = $("#selectedSubjects").val();
	courseDetailsDTO['payMode'] = $("#signupStage9 #payMode").val();
	courseDetailsDTO['callFrom'] = callFrom;
	if($("#regPaymentType").val()==''){
		courseDetailsDTO['scholarshipCode'] = $("#scholarshipCode").val();
	}else{
		courseDetailsDTO['scholarshipCode'] = '';
	}
	courseDetailsDTO['creditCountRegular'] = $("#creditCountRegular").val();

	courseDetailsDTO['parentSubjectIdRegural'] = $("#parentSubjectIdRegural").val();

	requestData['courseDetailsDTO']=courseDetailsDTO;

	authentication['hash'] = getHash();
	authentication['userType'] = 'STUDENT';
	authentication['userId'] = $("#"+formId+" #userId").val();
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	console.log('request '+request);
	return request;
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
	} else if ($('#payMode').val() == 'registration') {
		$("#pay-five").trigger('click');
	}
}

function displayScholorshipDetails(radioId){
	if(radioId=='dtl-one'){
		$('#annual-course-fee-details').show()
		$('#installment3-course-fee-details').hide()
		$('#installment6-course-fee-details').hide()
		$('#installment9-course-fee-details').hide()
	}else if(radioId=='dtl-two'){
		$('#annual-course-fee-details').hide()
		$('#installment3-course-fee-details').show()
		$('#installment6-course-fee-details').hide()
		$('#installment9-course-fee-details').hide()
	}else if(radioId=='dtl-three'){
		$('#annual-course-fee-details').hide()
		$('#installment3-course-fee-details').hide()
		$('#installment6-course-fee-details').show()
		$('#installment9-course-fee-details').hide()
	}else if(radioId=='dtl-four'){
		$('#annual-course-fee-details').hide()
		$('#installment3-course-fee-details').hide()
		$('#installment6-course-fee-details').hide()
		$('#installment9-course-fee-details').show()
	}
}

function showPaymentTermCondMode(){
	hideModalMessage();
	$('#callPaymentStudentModal').modal('show');
}

function applyScholarship(formId, appliedScholarshipCode,callFrom ){
	hideModalMessage('');
	if(!$('input[name=payModeCheckboxes]').is(':checked')){
		showModalMessage(0, 'Please select payment option');
		return false;
	}

	if (!validateCharacters($('#scholarshipCodeInside').val())) {
		showModalMessage(0, 'Please use the English Keyboard while providing information');
		return false
	}


	if($('#scholarshipCodeInside').val()=='' || $('#scholarshipCodeInside').val()==' '){
		showModalMessage(0, "Enter a valid Scholarship code.");
		return false;
	}
	var flag=false
	customLoaderSignup(true);
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLFor('student','signup/apply-scholarship'),
		data : JSON.stringify(getRequestForStudentScholarship(formId, appliedScholarshipCode,callFrom)),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		async : false,
		global : false,
		success : function(data) {
			customLoaderSignup(false);
			if (data['status'] == '0' || data['status'] == '2') {
				showModalMessage(0, data['message']);
			}else{
				if(appliedScholarshipCode==2){
					$('#'+formId+' #scholarshipCodeInside').val('');
					$('#'+formId+' #scholarshipCode').val('');
				}
				getAllCourseDetails('signupStage9', appliedScholarshipCode,'N',true,'2');
			}
			flag=true
		},
		error : function(e) {
			customLoaderSignup(false);
			showMessage(0, TECHNICAL_GLITCH);
		}
	});
	return flag;
}

function getRequestForStudentScholarship(formId, appliedScholarshipCode,callFrom){
	var request = {};
	var authentication = {};
	var requestData = {};
	requestData['requestKey']='APPLY-SCHOLARSHIP';
	requestData['requestValue']=$("#"+formId+" #scholarshipCodeInside").val().trim();
	requestData['appliedScholarshipCode']=appliedScholarshipCode;
	requestData['requestExtra']=$("#"+formId+" #payMode").val();
	requestData['requestExtra1']=callFrom;
	requestData['requestExtra2']='Signup for Full-Time/Flex Program';
	authentication['hash'] = getHash();authentication['schoolId'] = SCHOOL_ID;authentication['schoolUUID'] = SCHOOL_UUID;
	authentication['userType'] = 'STUDENT';
	authentication['userId'] = $("#"+formId+" #userId").val();
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	return request;
}

function getAllCourseDetails(formId, appliedScholarshipCode,isGradeChange, needToShowModal,callFrom){
	$("#"+formId+" #scholarshipCode").val($('#'+formId+' #scholarshipCodeInside').val());
	var standardId=$("#"+formId+" #standardId").val();
	$('#standardName').html($('#standardId option:selected').text());
	hideMessage('');
	hideModalMessage('');
	additionalInfo=$('#additionalInfo').val();
	if($('#additionalInfo').val()=='undefined'){
		additionalInfo='';
	}
	$("#appliedScholarshipCode").val(appliedScholarshipCode)
	var postData=encodeURI("request="+JSON.stringify(getRequestForStudentCourseDetailsInfo(formId,callFrom, appliedScholarshipCode)));
	console.log('postData '+postData);
	if (!validateCharacters(postData)) {
		if(needToShowModal){
			showModalMessage(0, 'Please use the English Keyboard while providing information');
		}else{
			showMessage(0, 'Please use the English Keyboard while providing information');
		}
		return false
	}
	var flag=false
	customLoaderSignup(true);
	$.ajax({
		type : "POST",
		url : getURLForHTML('student','signup/stage-9'),
		data :postData,
		dataType : 'html',
		async : false,
		global : false,
		success : function(htmlContent) {
			customLoaderSignup(false);
			if(htmlContent!=""){
            	var stringMessage = [];
            	stringMessage = htmlContent.split("|");
        		if(stringMessage[0] == "FAILED" || stringMessage[0] == "EXCEPTION" || stringMessage[0] =="SESSIONOUT"){
        			if(stringMessage.length==3 && stringMessage[2]=='true'){
        			}
        			if(stringMessage[0] == "SESSIONOUT"){
        				redirectLoginPage();
        			}
        		} else {
        			$('#signupStage9Content').html(htmlContent)
        			//showMessage(1, 'Course updated successfully.');
        			flag=true
        		}
			}
		},
		error : function(e) {
			customLoaderSignup(false);
			showMessage(0, TECHNICAL_GLITCH);
		}
	});
	return flag;
}
function getRequestForStudentCourseDetailsInfo(formId,callFrom, appliedScholarshipCode) {

	var studentCourseDetailsInfoDTO = {};
	studentCourseDetailsInfoDTO['themeType'] = 'theme2';
	studentCourseDetailsInfoDTO['standardId'] = $("#standardId").val();
	studentCourseDetailsInfoDTO['callFrom'] = callFrom;
	if($("#enrollmentType").val()==undefined){
		studentCourseDetailsInfoDTO['enrollmentType'] = 'REGISTRATION_FRESH';
	}else{
		studentCourseDetailsInfoDTO['enrollmentType'] = $("#enrollmentType").val()
	}
	if($("#courseEnrollmentType").val()==undefined){
		studentCourseDetailsInfoDTO['courseEnrollmentType'] = 'REGISTRATION_FRESH';
	}else{
		studentCourseDetailsInfoDTO['courseEnrollmentType'] = $("#courseEnrollmentType").val();
	}
	if($("#selectedSubjects").val()==undefined){
		studentCourseDetailsInfoDTO['selectedFullTimeCoursesIds'] =  '';
	}else{
		studentCourseDetailsInfoDTO['selectedFullTimeCoursesIds'] =  $("#selectedSubjects").val()
	}
	if($("#signupStage9 #payMode").val()==undefined){
		studentCourseDetailsInfoDTO['payMode'] = 'annually';
	}else{
		studentCourseDetailsInfoDTO['payMode'] = $("#signupStage9 #payMode").val();
	}
	if($("#scholarshipCode").val()==undefined){
		studentCourseDetailsInfoDTO['scholarshipCode'] = '';
		studentCourseDetailsInfoDTO['appliedScholarshipCode'] = '';
	}else{
		studentCourseDetailsInfoDTO['scholarshipCode'] = $("#scholarshipCode").val();
		studentCourseDetailsInfoDTO['appliedScholarshipCode'] = appliedScholarshipCode;
	}
	console.log('Course Details '+studentCourseDetailsInfoDTO);
	return studentCourseDetailsInfoDTO;
}