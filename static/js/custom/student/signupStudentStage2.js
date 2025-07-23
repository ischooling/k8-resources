function validateRequestForSignupStudent(formId){
	
	/*if (!validateFormAscii(formId)) {
		showMessage(false, 'Please use the English Keyboard while providing information');
		return false
	}*/
	
	if($('#'+formId+' #dob').val()!=""){
		var studentDOB = $('#'+formId+' #dob').val().split("-");
		var age = M.countAgeNew(studentDOB[0], studentDOB[1], studentDOB[2]);
		//console.log('age a '+age);
		if(age<12.927800723458905){
			if ($("#"+formId+" #checkAge").is(':checked')){
				
			}else{
				showMessage(true, 'Please confirm that your age is less than 13 years by selecting the checkbox');
				$('#'+formId+' #ageOfThirteen').show();
				$(".divStdDob").removeClass("is-empty");
				return false
			}
		}else{
			$('#'+formId+' #checkAge').prop("checked",false);
		}	
	}else{
		showMessage(true, 'Please choose your Date of Birth.');
		$(".divStdDob").removeClass("is-empty");
		return false
	}
	
	if ($("#"+formId+" #countryId").val()==0 || $("#"+formId+" #countryId").val()==null) {
		showMessage(true, 'Country is required');
		return false
	}
	if ($("#"+formId+" #stateId").val()==0 || $("#"+formId+" #stateId").val()==null) {
		showMessage(true, 'State is required');
		return false
	}
	if ($("#"+formId+" #cityId").val()==0 || $("#"+formId+" #cityId").val()==null) {
		showMessage(true, 'City is required');
		return false
	}
	if ($("#"+formId+" #studyCenter").val()==0  || $("#"+formId+" #studyCenter").val()==null) {
		showMessage(true, 'Learning centre is required');
		return false
	}
	if ($("#"+formId+" #gender").val()==0  || $("#"+formId+" #gender").val()==null) {
		showMessage(true, 'Gender is required');
		return false
	}
	if ($("#"+formId+" #firstName").val()=="") {
		showMessage(true, 'First Name is required');
		return false
	}
	if ($("#"+formId+" #lastName").val()=="") {
		showMessage(true, 'Last Name is required');
		return false
	}
	if ($("#"+formId+" #communicationEmail").val()=="") {
		showMessage(true, 'Email Address is required');
		return false
	}
//	if ($("#"+formId+" #countryCodeStudent").val()==null) {
//		showMessage(true, 'ISD code is required');
//		return false
//	}
//	if ($("#"+formId+" #contactNumber").val()=="") {
//		showMessage(true, 'Phone No is required');
//		return false
//	}
//	if ($("#"+formId+" #contactNumberAlternate").val()!="" ){
//		if ($("#"+formId+" #countryCodeAlternate").val()=="" ){
//			showMessage(true, 'Alternate ISD Code is required.');
//			return false
//		}else if ($("#"+formId+" #countryCodeAlternate").val()==null ){
//			showMessage(true, 'Alternate ISD Code is required.');
//			return false
//		}
//	}
	
	return true;
}

function callForSignupStudentDetails(formId) {
	hideMessage('');
	if(!validateRequestForSignupStudent(formId)){
		tabActiveStatus(2);
		return false;
	}
	if(!calculateAge('signupStage2')){
		tabActiveStatus(2);
		return false;
	}
	$("#nextStep").prop("disabled", true);
	$.ajax({
		type : "POST",
		url : getURLForHTML('student','signup/stage-2'),
		data : encodeURI("request="+JSON.stringify(getRequestForStudent(formId))),
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
            			tabActiveStatus(2);
        			}
        		} else {
        			$('#signupStage3Content').html(htmlContent)
        			showMessage(false, 'Student record updated successfully.');
        			tabActiveStatus(3);
        		}
        		$("#nextStep").prop("disabled", false);
        			return false;
			}
		},
		error : function(e) {
	/*		showMessage(true, e.responseText);*/
			$("#nextStep").prop("disabled", false);
			tabActiveStatus(2);
		}
	});
}

function getRequestForStudent(formId){
	var request = {};
	var authentication = {};
	var requestData = {};
	var signupStudentDTO = {};
	signupStudentDTO['dob'] = $("#"+formId+" #dob").val();
	if($("#"+formId+" #checkAge").is(':checked')){
		signupStudentDTO['belowAge'] = "1";
	}else{
		signupStudentDTO['belowAge']="0";
	}
	signupStudentDTO['countryId'] = $("#"+formId+" #countryId").val();
	signupStudentDTO['stateId'] = $("#"+formId+" #stateId").val();
	signupStudentDTO['cityId'] = $("#"+formId+" #cityId").val();
	signupStudentDTO['studyCenter'] = $("#"+formId+" #studyCenter").val();
	signupStudentDTO['firstName'] = $("#"+formId+" #firstName").val();
	signupStudentDTO['middleName'] = $("#"+formId+" #middleName").val();
	signupStudentDTO['lastName'] = $("#"+formId+" #lastName").val();
	signupStudentDTO['communicationEmail'] = $("#"+formId+" #communicationEmail").val();
	signupStudentDTO['countryCode'] = $.trim($("#"+formId+" #countryCodeStudent option:selected").text().split(" ")[0].replace("+",""));
	signupStudentDTO['contactNumber'] = $("#"+formId+" #contactNumber").val();
	signupStudentDTO['countryCodeAlternate'] = $.trim($("#"+formId+" #countryCodeAlternate option:selected").text().split(" ")[0].replace("+",""));
	signupStudentDTO['contactNumberAlternate'] = $("#"+formId+" #contactNumberAlternate").val();
	signupStudentDTO['gender'] = $("#"+formId+" #gender").val();

	requestData['signupStudentDTO'] = signupStudentDTO;
	authentication['hash'] = getHash();authentication['schoolId'] = SCHOOL_ID;authentication['schoolUUID'] = SCHOOL_UUID;
	authentication['userType'] = 'STUDENT';
	authentication['userId'] = $("#"+formId+" #userId").val();
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	return request;
}

function validateRequestForMasterStudyCenter(formId) {
	if($('#'+formId+ ' #studyCenter').val()=='' || $('#'+formId+ ' #studyCenter').val()<=0){
		return false;
	}
	return true;
}

function calculateAge(formId){
	$('#'+formId+' #dob').removeClass('is-Empty');
	var studentDOB = $('#'+formId+' #dob').val().split("-");
	var age = M.countAgeNew(studentDOB[0], studentDOB[1], studentDOB[2]);
	//console.log('age '+age);
	if(age>=10.927798115677321 && age<=98.98807333666286){
		if(age<12.927800723458905){
			$('#'+formId+' #ageOfThirteen').show();
			$('#'+formId+' #checkAge').removeAttr('disabled');
		}else{
			$('#'+formId+' #ageOfThirteen').hide();
//			$('#'+formId+' #checkAge').prop("disabled",true);
		}
		return true;
	}else{
		showMessage(true, 'Date of Birth range should be between 11 to 99');
		$(".divStdDob").removeClass("is-empty");
		tabActiveStatus(2);
		return false;
	}
}