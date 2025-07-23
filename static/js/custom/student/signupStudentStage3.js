$(document).ready(function() {
	$(".divpralternatISDcode").removeClass("is-empty");
	$("#signupParent").submit(function(event) {
		event.preventDefault();
		//callForstudentParentSignUp();
	});
});
$('#signupStage3 #email').blur(function(){
	emailCheck($('#signupStage3 #email').val(), 'STUDENT');
});

function callForSignUpParents(formId) {
	hideMessage('');
	if(!validateRequestForSignupParent(formId)){
		tabActiveStatus(3);
		signupPage=3;
		$("#nextStep").prop("disabled", false);
		return false;
	}
	if(!$('#skipParent').is(':checked')){
		var parentEmail = $('#'+formId+' #parentEmail').val();
		var userId=$('#'+formId+' #userId').val();
		var studentId = $('#'+formId+' #studentId').val();
		var status=emailCheckForParent(parentEmail, 'STUDENT', userId, studentId);
		if(status==true){
			
		}else if(status==false){
			return false;
		}else{
			$('#studentAlreadyExistEmail').html(status);
			$('#studentEmailForParent').val('');
			$('#studentNameOfExisting').val('');
			$('#existingStudentDetails').hide();
			$('#parentExistModal').modal({backdrop: 'static', keyboard: false})
			window.setTimeout(function(){
				tabActiveStatus(3);
				signupPage=3;
			},1000)
			return false;
		}
	}
	$("#nextStep").prop("disabled", true);
	$.ajax({
		type : "POST",
		url : getURLForHTML('student','signup/stage-3'),
		data : encodeURI("request="+JSON.stringify(getRequestForSignupParent(formId))),
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
        			$('#signupStage3 #parentEmail').attr('disabled',true);
        			$('#signupStage3 #skipParent').attr('disabled',true);
        			showMessage(false, 'Parent record updated successfully.');
        			tabActiveStatus(4);
        		}
        		$("#nextStep").prop("disabled", false);
        		return false;
			}
			return false;
		},
		error : function(e) {
		//	showMessage(true, e.responseText);
			$("#nextStep").prop("disabled", false);
			tabActiveStatus(3);
		}
	});
}
function validateRequestForSignupParent(formId){
	
	if (!validateFormAscii(formId)) {
		console.log("call non ascii ");
		showMessage(false, 'Please use the English Keyboard while providing information');
		return false
	}
	
	if ($("#"+formId+" #relationship").val()==0 || $("#"+formId+" #relationship").val()==null) {
		showMessage(true, 'Relation with student is required');
		return false
	}
	if ($("#"+formId+" #relationship").val()=='Other') {
		if($("#"+formId+" #otherName").val()==""){
			showMessage(true, 'Please specify Other relation is required');
			return false
		}
		
	}
	if ($("#"+formId+" #firstName").val()=="") {
		showMessage(true, 'First name is required.');
		return false
	}
	if ($("#"+formId+" #lastName").val()=="") {
		showMessage(true, 'Last name is required.');
		return false
	}
	if ($("#"+formId+" #gender").val()==0  || $("#"+formId+" #gender").val()==null) {
		showMessage(true, 'Gender is required.');
		return false
	}
	if ($("#"+formId+" #responsibleConfirm").val()==0  || $("#"+formId+" #responsibleConfirm").val()==null) {
		showMessage(true, 'Please select is parent responsible.');
		return false
	}
	if(!$('#skipParent').is(':checked')){
		if ($("#"+formId+" #parentEmail").val()=="") {
			showMessage(true, 'Email Address is required.');
			return false
		}
		
	}
//	if ($("#"+formId+" #countryCodeParent").val()==null) {
//		showMessage(true, 'ISD code is required');
//		return false
//	}
//	if ($("#"+formId+" #contactNumber").val()=="") {
//		showMessage(true, 'Phone No is required.');
//		return false
//	}
//	
//	if ($("#"+formId+" #contactNumberAlternate").val()!="" ){
//		if ($("#"+formId+" #countryCodeAlternateParent").val()=="" ){
//			showMessage(true, 'Alternate ISD Code is required.');
//			return false
//		}else if ($("#"+formId+" #countryCodeAlternateParent").val()==null ){
//			showMessage(true, 'Alternate ISD Code is required.');
//			return false
//		}
//	}
	
	
//	if (!validateEmail($("#"+formId+" #confirmEmail").val())) {
//		$("#"+formId+" #confirmEmail").css('color', '#a9a9a9');
//		showMessage(false, 'Either confirm email is empty or invalid');
//		return false
//	}
//	if($("#"+formId+" #email").val()!=$("#"+formId+" #confirmEmail").val()){
//		$("#"+formId+" #email").css('color', '#a9a9a9');
//		$("#"+formId+" #confirmEmail").css('color', '#a9a9a9');
//		showMessage(false, 'Email and confirm email are not same');
//		return false
//	}
//	if (!validPassword($("#"+formId+" #password").val())) {
//		$("#"+formId+" #password").css('color', '#a9a9a9');
//		showMessage(false, 'Either password is empty or invalid');
//		return false
//	}
//	if (!validPassword($("#"+formId+" #confirmPassword").val())) {
//		$("#"+formId+" #confirmPassword").css('color', '#a9a9a9');
//		showMessage(false, 'Either confirm password is empty or invalid');
//		return false
//	}
//	if($("#"+formId+" #password").val()!=$("#"+formId+" #confirmPassword").val()){
//		$("#"+formId+" #password").css('color', '#a9a9a9');
//		$("#"+formId+" #confirmPassword").css('color', '#a9a9a9');
//		showMessage(false, 'Password and Confirm Password do not match');
//		return false
//	}
//	if (!validateCaptcha($("#"+formId+" #captcha").val())) {
//		$("#"+formId+" #captcha").css('color', '#a9a9a9');
//		showMessage(false, 'Either captcha is empty or invalid');
//		return false
//	}
//	
//	if($("#"+formId+" #checkTerms").prop("checked") == false){
//		showMessage(false, 'Please read terms and conditions');
//		return false
//	}
	return true;
}
function getRequestForSignupParent(formId){
	var request = {};
	var authentication = {};
	var requestData = {};
	var signupParentDTO = {};
	signupParentDTO['relationship'] = $("#"+formId+" #relationship").val();
	var relations = $("#"+formId+"  #relationship option:selected").text();
	if(relations == 'Other'){
		signupParentDTO['otherRelationName'] = $("#"+formId+" #otherName").val();
	}else{
		signupParentDTO['otherRelationName'] ='';
	}
	signupParentDTO['firstName'] = $("#"+formId+" #firstName").val();
	signupParentDTO['middleName'] = $("#"+formId+" #middleName").val();
	signupParentDTO['lastName'] = $("#"+formId+" #lastName").val();
	if ($("#"+formId+" #skipParent").is(":checked"))
	{
		signupParentDTO['skipParent'] = "Y";
	}else{
		signupParentDTO['skipParent'] = "N";
	}
	
	signupParentDTO['email'] = $("#"+formId+" #parentEmail").val();
	signupParentDTO['countryCode'] = $.trim($("#"+formId+" #countryCodeParent option:selected").text().split(" ")[0].replace("+",""));
	signupParentDTO['contactNumber'] = $("#"+formId+" #contactNumber").val();
	signupParentDTO['countryCodeAlternate'] = $.trim($("#"+formId+" #countryCodeAlternateParent option:selected").text().split(" ")[0].replace("+",""));
	signupParentDTO['contactNumberAlternate'] = $("#"+formId+" #contactNumberAlternate").val();
	signupParentDTO['gender'] = $("#"+formId+" #gender").val();
	signupParentDTO['responsibleConfirm'] = $("#"+formId+" #responsibleConfirm").val();
	requestData['signupParentDTO'] = signupParentDTO;
	authentication['hash'] = getHash();authentication['schoolId'] = SCHOOL_ID;authentication['schoolUUID'] = SCHOOL_UUID;
	authentication['userType'] = 'STUDENT';
	authentication['userId'] = $("#"+formId+" #userId").val();
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	return request;
}
function emailCheckForParent(parentEmail, module, userId, studentId) {
	var result="";
	hideMessage('');
	if (!validateEmail(parentEmail)) {
		showMessage(false, 'Parent email is either empty or invalid');
		return false
	}
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForCommon('is-user-available-for-parent'),
		data : JSON.stringify(getCallRequestForEmailCheckForParent(parentEmail, module, userId, studentId)),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		async:false,
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				result = data['extra'];
			}else if (data['status'] == '3') {
				showMessage(true, data['message']);
				result = false;
			}else{
				result=true;
			}
		},
		error : function(e) {
		//	showMessage(true, e.responseText);
			console.log("ERROR : ", e);
		}
	});
	return result;
}
function getCallRequestForEmailCheckForParent(parentEmail, module, userId, studentId){
	var request = {};
	var authentication = {};
	var requestData = {};
	requestData['requestKey'] = 'EMAIL-AVAILABLE';
	requestData['requestValue'] = parentEmail;
	requestData['requestExtra'] = userId;
	requestData['requestExtra1'] = studentId;
	authentication['hash'] = getHash();authentication['schoolId'] = SCHOOL_ID;authentication['schoolUUID'] = SCHOOL_UUID;
	authentication['userType'] = module;
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	return request;
}
function mapParentAndAlreadyExistStudent(formId){
	if (!validateEmail($("#"+formId+" #parentEmail").val())) {
		showModalMessage(true, 'Parent email is empty or invalid');
		return false
	}
	if (!validateEmail($("#"+formId+" #studentEmailForParent").val())) {
		showModalMessage(true, 'Existing student email is empty or invalid');
		return false
	}
	$.ajax({
		type : "POST",
		url : getURLFor('student','signup/stage-3-mapping-parent-student'),
		data : JSON.stringify(getRequestForSignupParentMapping(formId)),
		dataType : 'json',
		contentType : "application/json",
		cache : false,
		timeout : 600000,
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				showModalMessage(true, data['message']);
			}else{
				showModalMessage(false, data['message']);
				$('#existingVerifyBtn').hide();
				$('#existingStudentDetails').show();
				$('#studentNameOfExisting').val(data['extra']);
				$('#studentEmailForParent').prop('disabled', true);
				populateParentData(formId, data['signupParentDTO'])
			}
			return false;
		},
		error : function(e) {
			//showMessage(true, e.responseText);
			return false;
		}
	});
	return false;
}
function getRequestForSignupParentMapping(formId){
	var request = {};
	var authentication = {};
	var requestData = {};
	var signupParentStudentMappingDTO = {};
	signupParentStudentMappingDTO['parentEmail'] = $("#"+formId+" #parentEmail").val();
	signupParentStudentMappingDTO['studentEmail'] = $("#"+formId+" #studentEmailForParent").val();
	signupParentStudentMappingDTO['studentId'] = $("#"+formId+" #studentId").val();
	requestData['signupParentStudentMappingDTO'] = signupParentStudentMappingDTO;
	authentication['hash'] = getHash();authentication['schoolId'] = SCHOOL_ID;authentication['schoolUUID'] = SCHOOL_UUID;
	authentication['userType'] = 'STUDENT';
	authentication['userId'] = $("#"+formId+" #userId").val();
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	return request;
}
function proceedWithExistingMappings(formId){
	if(!$("#"+formId+" #checkTerms").prop("checked")){
		showModalMessage(true, 'Please click terms and conditions');
		return false
	}
	$('#parentExistModal').modal('hide');
	//saveSignupStudent();
}
function populateParentData(formId, signupParentDTO){
	$('#'+formId+' #relationship').val(signupParentDTO.relationship);
	$('#'+formId+' #otherName').val(signupParentDTO.otherRelationName);
	$('#'+formId+' #firstName').val(signupParentDTO.firstName);
	$('#'+formId+' #middleName').val(signupParentDTO.middleName);
	$('#'+formId+' #lastName').val(signupParentDTO.lastName);
	$('#'+formId+' #gender').val(signupParentDTO.gender);
	$('#'+formId+' #responsibleConfirm').val(signupParentDTO.responsibleConfirm);
	$('#'+formId+' #skipParent').val(signupParentDTO.skipParent);
//	$('#'+formId+' #parentEmail').val(signupParentDTO.email);
	$('#'+formId+' #countryCodeParent').val('+'+signupParentDTO.countryCode);
	$('#'+formId+' #contactNumber').val(signupParentDTO.contactNumber);
	if(signupParentDTO.countryCodeAlternate != ''){
		$('#'+formId+' #countryCodeAlternateParent').val('+'+signupParentDTO.countryCodeAlternate);
	}
	if(signupParentDTO.contactNumberAlternate != ''){
		$('#'+formId+' #contactNumberAlternate').val(signupParentDTO.contactNumberAlternate);
	}
//	$('#'+formId+' #guardianConfirmation').val(signupParentDTO.guardianConfirmation);
	disabledParentData(formId, true);
}
function disabledParentData(formId, flag){
	$('#'+formId+' #relationship').prop('disabled', flag);
	$('#'+formId+' #otherName').prop('disabled', flag);
	$('#'+formId+' #firstName').prop('disabled', flag);
	$('#'+formId+' #middleName').prop('disabled', flag);
	$('#'+formId+' #lastName').prop('disabled', flag);
	$('#'+formId+' #gender').prop('disabled', flag);
	$('#'+formId+' #responsibleConfirm').prop('disabled', flag);
	$('#'+formId+' #skipParent').prop('disabled', flag);
	$('#'+formId+' #parentEmail').prop('disabled', flag);
	$('#'+formId+' #countryCodeParent').prop('disabled', flag);
	$('#'+formId+' #contactNumber').prop('disabled', flag);
//	$('#'+formId+' #countryCodeAlternateParent').prop('disabled', flag);
//	$('#'+formId+' #contactNumberAlternate').prop('disabled', flag);
	$('#'+formId+' #guardianConfirmation').prop('disabled', flag);
}
$(document).on("change","#relationship",function() {
	var relationship = $(this).val();
	var gender=''
	if(relationship=='Mother'){
		gender = 'FEMALE'
	}else if(relationship=='Father'){
		gender = 'MALE';
	}
	$('#signupStage3 #gender').val(gender)
});