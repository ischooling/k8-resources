function validateRequestForSignupTeacherBasicDetails(formId){

	if (!validateFormAscii(formId)) {
		showMessage(false, 'Please use the English Keyboard while providing information');
		return false
	}


	if($('#'+formId+' #dob').val()!=""){
		var studentDOB = $('#'+formId+' #dob').val().split("-");
		var age = M.countAgeNew(studentDOB[0], studentDOB[1], studentDOB[2]);
		/*console.log('age a '+age);*/
		if(age<=17.93070676512557){
			if ($("#"+formId+" #checkAge").is(':checked')){

			}else{
				showMessage(true, 'Age should be greater then or equal to 18 years');
				return false
			}
		}
	}else{
		showMessage(true, 'Please choose your Date of Birth.');
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
	if ($("#"+formId+" #firstName").val()=="") {
		showMessage(true, 'First Name is required');
		return false
	}
	if ($("#"+formId+" #lastName").val()=="") {
		showMessage(true, 'Last Name is required');
		return false
	}
	if ($("#"+formId+" #gender").val()==0  || $("#"+formId+" #gender").val()==null) {
		showMessage(true, 'Gender is required');
		return false
	}
	if ($("#"+formId+" #communicationEmail").val()=="") {
		showMessage(true, 'Email Address is required');
		return false
	}
	if ($("#"+formId+" #countryCode").val()=="") {
		showMessage(true, 'ISD code is required');
		return false
	}
	if (M.isMobile($("#"+formId+" #contactNumber").val()) == null) {
		showMessage(0, 'Please enter correct mobile number');
		return false
	}
	if ($("#"+formId+" #maritalStatus").val()==0  || $("#"+formId+" #maritalStatus").val()==null) {
		showMessage(true, 'Marital status is required');
		return false
	}
	if ($("#"+formId+" #teacherAddressLine1").val()=="") {
		showMessage(true, 'Address line1 is required');
		return false
	}
	if ($("#"+formId+" #teacherAddressLine2").val()=="") {
		showMessage(true, 'Address line2 is required');
		return false
	}
	if ($("#"+formId+" #teacherZipcode").val()=="") {
		showMessage(true, 'Pin code is required');
		return false
	}
	return true;
}

function callForSignupTeacherBasicDetails(formId) {
	hideMessage('');
	if(!validateRequestForSignupTeacherBasicDetails(formId)){
		tabActiveStatus(2);
		return false;
	}
	if(!calculateAge(formId)){
		tabActiveStatus(2);
		return false;
	}
	$("#nextStep").prop("disabled", true);
	$.ajax({
		type : "POST",
		url : getURLForHTML('teacher','signup/stage-2'),
		data : encodeURI("request="+JSON.stringify(getRequestForTeacherBasicDetails(formId))),
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
        			tabActiveStatus(2);
        			}
        		} else {
        			$('#signupStage3Content').html(htmlContent)
        			setTimeout(function() {
        				showMessage(false, 'Basic information updated successfully.');
        			 }, 500);
        			tabActiveStatus(3);
        		}
        		$("#nextStep").prop("disabled", false);
        			return false;
			}
		},
		error : function(e) {
			//showMessage(true, e.responseText);
			$("#nextStep").prop("disabled", false);
			tabActiveStatus(2);
		}
	});
}
function getRequestForTeacherBasicDetails(formId){
	var request = {};
	var authentication = {};
	var requestData = {};
	var signupTeacherDTO = {};
	console.log('inside teacher');
	signupTeacherDTO['dob'] = $("#"+formId+" #dob").val();
	signupTeacherDTO['countryId'] = $("#"+formId+" #countryId").val();
	signupTeacherDTO['stateId'] = $("#"+formId+" #stateId").val();
	signupTeacherDTO['cityId'] = $("#"+formId+" #cityId").val();
	signupTeacherDTO['gender'] = $("#"+formId+" #gender").val();
	signupTeacherDTO['firstName'] = $("#"+formId+" #firstName").val();
	signupTeacherDTO['middleName'] = $("#"+formId+" #middleName").val();
	signupTeacherDTO['lastName'] = $("#"+formId+" #lastName").val();
	signupTeacherDTO['communicationEmail'] = $("#"+formId+" #communicationEmail").val();
	/*signupTeacherDTO['countryCode'] = $("#"+formId+" #countryCode").val();*/
	signupTeacherDTO['countryCode'] = $.trim($("#"+formId+" #countryCode option:selected").text().split(" ")[0].replace("+",""));

	signupTeacherDTO['contactNumber'] = $("#"+formId+" #contactNumber").val();
	signupTeacherDTO['maritalStatus'] = $("#"+formId+" #maritalStatus").val();
	signupTeacherDTO['addressLine1'] = escapeCharacters($("#"+formId+" #teacherAddressLine1").val());
	signupTeacherDTO['addressLine2'] = escapeCharacters($("#"+formId+" #teacherAddressLine2").val());
	signupTeacherDTO['zipcode'] = $("#"+formId+" #teacherZipcode").val();

	requestData['signupTeacherDTO'] = signupTeacherDTO;
	authentication['hash'] = getHash();authentication['schoolId'] = SCHOOL_ID;authentication['schoolUUID'] = SCHOOL_UUID;
	authentication['userType'] = 'TEACHER';
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
	var studentDOB = $('#'+formId+' #dob').val().split("-");
	var age = M.countAgeNew(studentDOB[0], studentDOB[1], studentDOB[2]);
	if(age<=17.93070676512557 || age>98.98807333666286){
		showMessage(true, 'Date of Birth range should be between 18 to 99');
	$(".divTeacherDob").removeClass("is-empty");
		return false;
	}
	return true;
}