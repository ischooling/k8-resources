$(document).ready(function() {
	$("#signupParent").submit(function(event) {
		event.preventDefault();
	});
});
$('#signupStage2 #parentEmailId').blur(function(){
	emailCheck($('#signupStage2 #parentEmailId').val(), 'STUDENT');
});


function callForSignUpParents(formId) {
	var flag=false;
	hideMessage('');
	// if (M.isEmail($("#"+formId+" #parentEmailId").val())!=null) {
	// 	var parentEmail = $('#'+formId+' #parentEmailId').val();
	// 	var userId=$('#userId').val();
	// 	var studentId = $('#'+formId+' #studentId').val();
	// 	var status=emailCheckForParent(parentEmail, 'STUDENT', userId, studentId);
	// 	if(status){
	// 	}else if(status==false){
	// 		showMessage(0, 'This email address is already registered with K8 School');
	// 		return false;
	// 	}else{
	// 		showMessage(0, 'This email address is already registered with K8 School');
	// 		return false;
	// 	}
	// }

//	if ($("#motherEmailId").val()!='') {
//		var parentEmail = $('#'+formId+' #motherEmailId').val();
//		var userId=$('#userId').val();
//		var studentId = $('#'+formId+' #studentId').val();
//		var status=emailCheckForParent(parentEmail, 'STUDENT', userId, studentId);
//		if(status){
//		}else if(status==false){
//			return false;
//		}else{
//		}
//	}

	if(!validateRequestForSignupParent(formId)){
		return false;
	}
	customLoaderSignup(true);
	$.ajax({
		type : "POST",
		url : getURLForHTML('student','signup/stage-3'),
		data : encodeURI("request="+JSON.stringify(getRequestForSignupParent(formId))),
		dataType : 'html',
		async : false,
		global : false,
		success : function(htmlContent) {
			customLoaderSignup(false);
			if(htmlContent!=""){
            	var stringMessage = [];
            	stringMessage = htmlContent.split("|");
        		if(stringMessage[0] == "FAILED" || stringMessage[0] == "EXCEPTION" || stringMessage[0] == "SESSIONOUT" ){
        			if(stringMessage[0] == "SESSIONOUT"){
        				redirectLoginPage();
        			}else{
        				showMessage(0, stringMessage[1]);
        			}
        		} else {
        			$('#signupStage3Content').html(htmlContent);
        			// if ($("#parentEmailId").val()!="") {
				// 	$("#"+formId+" #parentEmailId").attr('disabled', false);
        			// }
    		        showMessage(1, 'Parent record updated successfully.', '', true);
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

function validateRequestForSignupParent(formId){

	if (!validateFormAscii(formId)) {
		console.log("call non ascii ");
		showMessage(0, 'Please use the English Keyboard while providing information');
		return false
	}

	if ($("#"+formId+" #parentFirstName").val()=="") {
		showMessage(0, 'First name is required.');
		return false
	}
	// if ($("#"+formId+" #parentlastName").val()=="") {
	// 	showMessage(0, 'Last name is required.');
	// 	return false
	// }
	if ($("#"+formId+" #parentGender").val()==0  || $("#"+formId+" #parentGender").val()==null) {
		showMessage(0, 'Gender is required.');
		return false
	}
	if ($("#"+formId+" #relation").val()==0 || $("#"+formId+" #relation").val()==null) {
		showMessage(0, 'Relation with student is required');
		return false
	}
	if ($("#"+formId+" #relation").val()=='Other') {
		if($("#"+formId+" #otherName").val()==""){
			showMessage(0, 'Relation is required');
			return false
		}
	}

	// if (M.isEmail($("#"+formId+" #parentEmailId").val())==null) {
	// 	showMessage(0, 'Parent email is either empty or invalid');
	// 	return false;
	// }

	// if ($("#"+formId+" #motherEmailId").val()!="") {
	// 	if (M.isEmail($("#"+formId+" #motherEmailId").val())==null) {
	// 		showMessage(0, 'Alternate email is either empty or invalid');
	// 		return false;
	// 	}
	// }

	// if($("#isAborad").val()=='Y'){
	// 	if (M.isNRIMobile($("#"+formId+" #parentPhoneNumber").val()) == null) {
	// 		showMessage(0, 'Please enter correct mobile number');
	// 		return false
	// 	}
	// 	if ($("#"+formId+" #motherPhoneNumber").val()!="" && $("#"+formId+" #motherPhoneNumber").val()!=undefined){
	// 		if (M.isNRIMobile($("#"+formId+" #motherPhoneNumber").val()) == null) {
	// 			showMessage(0, 'Please enter correct alternate mobile number');
	// 			return false
	// 		}
	// 	}
	// }else{
	// 	if (M.isMobile($("#"+formId+" #parentPhoneNumber").val()) == null) {
	// 		showMessage(0, 'Please enter correct mobile number');
	// 		return false
	// 	}
	// 	if ($("#"+formId+" #motherPhoneNumber").val()!="" && $("#"+formId+" #motherPhoneNumber").val()!=undefined){
	// 		if (M.isMobile($("#"+formId+" #motherPhoneNumber").val()) == null) {
	// 			showMessage(0, 'Please enter correct alternate mobile number');
	// 			return false
	// 		}
	// 	}
	// }
//	if ($("#"+formId+" #responsibleConfirm").val()==0  || $("#"+formId+" #responsibleConfirm").val()==null) {
//		showMessage(0, 'Please select is parent responsible.');
//		return false
//	}

//	if ($("#"+formId+" #countryCodeParent").val()==null) {
//		showMessage(0, 'ISD code is required');
//		return false
//	}


//	if ($("#"+formId+" #contactNumberAlternate").val()!="" ){
//		if ($("#"+formId+" #countryCodeAlternateParent").val()=="" ){
//			showMessage(0, 'Alternate ISD Code is required.');
//			return false
//		}else if ($("#"+formId+" #countryCodeAlternateParent").val()==null ){
//			showMessage(0, 'Alternate ISD Code is required.');
//			return false
//		}
//	}
	return true;
}
function getRequestForSignupParent(formId){
	var request = {};
	var authentication = {};
	var requestData = {};
	var signupParentDTO = {};
	signupParentDTO['themeType'] = 'theme2';
	signupParentDTO['relationship'] = $("#"+formId+" #relation").val();
	var relations = $("#"+formId+" #relation").val();//$("#"+formId+"  #relation option:selected").text();
	if(relations == 'Other'){
		signupParentDTO['otherRelationName'] = $("#"+formId+" #otherName").val();
	}else{
		signupParentDTO['otherRelationName'] ='';
	}
	signupParentDTO['firstName'] = $("#"+formId+" #parentFirstName").val();
	signupParentDTO['middleName'] = $("#"+formId+" #parentMiddletName").val();
	signupParentDTO['lastName'] = $("#"+formId+" #parentlastName").val();
	signupParentDTO['email'] = $("#"+formId+" #parentEmailId").val();
	signupParentDTO['motherEmailId'] = $("#"+formId+" #motherEmailId").val();
	signupParentDTO['skipParent'] = "Y";

	// //Father contact
	// signupParentDTO['countryCode'] = '91';//$("#"+formId+" .iti__active").last().attr("data-dial-code");//$.trim($("#"+formId+" #countryCodeParent option:selected").text().split(" ")[0].replace("+",""));
	// if($("#"+formId+" .iti__active").last().attr("data-dial-code")==undefined){
	// 	signupParentDTO['countryCode'] = $("#"+formId+" #parentCountryIsd").val();
	// }
	// signupParentDTO['contactNumber'] = $("#"+formId+" #parentPhoneNumber").val();
	// signupParentDTO['countryIsdCode2'] = $("#"+formId+" #parentPhoneNumber").parent().find('ul li.iti__active').last().attr("data-country-code");//$("#"+formId+" .iti__active").last().attr("data-country-code");
	// if($("#"+formId+" #parentPhoneNumber").parent().find('ul li.iti__active').last().attr("data-country-code")==undefined){
	// 	signupParentDTO['countryIsdCode2'] = $("#"+formId+" #parentCountryIsdCnt").val();
	// }

	// //Mother Contact
	// if($("#"+formId+" #motherPhoneNumber").val()!=''){
	// 	signupParentDTO['countryCodeAlternate'] = $("#"+formId+" #motherPhoneNumber").parent().find('ul li.iti__active').last().attr("data-dial-code");//$.trim($("#"+formId+" #countryCodeParent option:selected").text().split(" ")[0].replace("+",""));
	// }else{
	// 	signupParentDTO['countryCodeAlternate'] = '91';
	// }

	// if($("#"+formId+" #motherPhoneNumber").parent().find('ul li.iti__active').last().attr("data-dial-code")==undefined){
	// 	signupParentDTO['countryCodeAlternate'] = $("#"+formId+" #motherCountryIsd").val();
	// }
	// signupParentDTO['motherPhoneNumber'] = $("#"+formId+" #motherPhoneNumber").val();
	// signupParentDTO['countryIsdCode'] = $("#"+formId+" #motherPhoneNumber").parent().find('ul li.iti__active').last().attr("data-country-code");
	// if($("#"+formId+" #motherPhoneNumber").parent().find('ul li.iti__active').last().attr("data-country-code")==undefined){
	// 	signupParentDTO['countryIsdCode'] = $("#"+formId+" #motherCountryIsdCnt").val();
	// }

	//signupParentDTO['countryCodeAlternate'] = $.trim($("#"+formId+" #countryCodeAlternateParent option:selected").text().split(" ")[0].replace("+",""));
	//signupParentDTO['contactNumberAlternate'] = $("#"+formId+" #contactNumberAlternate").val();
	signupParentDTO['gender'] = $("#"+formId+" #parentGender").val();
//	if ($("#"+formId+" .wishSameParent").is(":checked")){
	//signupParentDTO['responsibleConfirm'] = "Yes";
//	}else{
		signupParentDTO['responsibleConfirm'] = "No";
//	}

	requestData['signupParentDTO'] = signupParentDTO;
	authentication['hash'] = getHash();authentication['schoolId'] = SCHOOL_ID;authentication['schoolUUID'] = SCHOOL_UUID;
	authentication['userType'] = 'STUDENT';
	authentication['userId'] = $("#userId").val();
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	return request;
}
function emailCheckForParent(parentEmail, module, userId, studentId) {
	var result = false;
	hideMessage('');
	if (!validateEmail(parentEmail)) {
		showMessage(0, 'Parent email is either empty or invalid');
		return false;
	}
	customLoaderSignup(true);
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForCommon('is-user-available-for-parent'),
		data : JSON.stringify(getCallRequestForEmailCheckForParent(parentEmail, module, userId, studentId)),
		dataType : 'json',
		async:false,
		global : false,
		success : function(data) {
			customLoaderSignup(false);
			if (data['status'] == '0' || data['status'] == '2') {
				result = data['extra'];
			}else if (data['status'] == '3') {
				showMessage(0, data['message']);
			}else{
				result=true;
			}
		},
		error : function(e) {
			customLoaderSignup(false);
			showMessage(0, TECHNICAL_GLITCH);
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


function emailCheckForParentUser(parentEmail, module, userId, studentId) {
	var result="";
	hideMessage('');
	if (!validateEmail(parentEmail)) {
		showMessage(0, 'Parent email is either empty or invalid');
		return false;
	}
	customLoaderSignup(true);
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForCommon('is-user-available-for-parent'),
		data : JSON.stringify(getCallRequestForEmailCheckForParentUser(parentEmail, module, userId, studentId)),
		dataType : 'json',
		async:false,
		global : false,
		success : function(data) {
			customLoaderSignup(false);
			console.log("data=> "+JSON.stringify(data));
			if (data['status'] == '0' || data['status'] == '2') {
				if(data['extra1']=='Y'){
					result = true;
				}else{
					result = data['extra'];
				}
			}else if (data['status'] == '3') {
				showMessage(0, data['message']);
				result = false;
			}else{
				result=true;
			}
		},
		error : function(e) {
			customLoaderSignup(false);
			showMessage(0, TECHNICAL_GLITCH);
		}
	});
	return result;
}

function getCallRequestForEmailCheckForParentUser(parentEmail, module, userId, studentId){
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

	if (!validateEmail($("#"+formId+" #parentEmailId").val())) {
		showMessage(0, 'Parent email is empty or invalid');
		return false
	}

	if (!validateEmail($("#"+formId+" #verifyMailId").val())) {
		showMessage(0, 'Existing student email is empty or invalid');
		return false
	}
	var flag = false;
	customLoaderSignup(true);
	$.ajax({
		type : "POST",
		url : getURLFor('student','signup/stage-3-mapping-parent-student'),
		data : JSON.stringify(getRequestForSignupParentMapping(formId)),
		dataType : 'json',
		contentType : "application/json",
		async : false,
		global : false,
		success : function(data) {
			customLoaderSignup(false);
			if (data['status'] == '0' || data['status'] == '2') {
				showMessage(0, data['message']);
			}else{
				showMessage(1, data['message']);
				$('#verifyStudentName').val(data['extra']);
				$('#verifyMailId').attr("disabled",true);
				$('#parentEmailVerifyStatus').val(1);
				$('#parentEmailId').attr("disabled",false);
				$('.switch-input').attr("disabled",false);
				if(data['extra1']=='Y'){
					$('.switch-input').prop("checked",true);
					$('.switch-input').attr("disabled",true);
				}
				populateParentData(formId, data['signupParentDTO'])
				flag=true;
			}
			return false;
		},
		error : function(e) {
			customLoaderSignup(false);
			showMessage(0, TECHNICAL_GLITCH);
		}
	});
	return flag;
}

function getRequestForSignupParentMapping(formId){
	var request = {};
	var authentication = {};
	var requestData = {};
	var signupParentStudentMappingDTO = {};
	signupParentStudentMappingDTO['parentEmail'] = $("#"+formId+" #parentEmailId").val();
	signupParentStudentMappingDTO['studentEmail'] = $("#"+formId+" #verifyMailId").val();
	signupParentStudentMappingDTO['studentId'] = $("#"+formId+" #studentId").val();
	requestData['signupParentStudentMappingDTO'] = signupParentStudentMappingDTO;
	authentication['hash'] = getHash();
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
	$('#'+formId+' #relation').val(signupParentDTO.relationship).trigger('change');
	$('#'+formId+' #otherName').val(signupParentDTO.otherRelationName);
	$('#'+formId+' #parentFirstName').val(signupParentDTO.firstName);
	$('#'+formId+' #parentMiddletName').val(signupParentDTO.middleName);
	$('#'+formId+' #parentlastName').val(signupParentDTO.lastName);
	$('#'+formId+' #parentGender').val(signupParentDTO.gender).trigger('change');
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
	$('#'+formId+' #relation').prop('disabled', flag);
	$('#'+formId+' #otherName').prop('disabled', flag);
	$('#'+formId+' #parentFirstName').prop('disabled', flag);
	$('#'+formId+' #parentMiddletName').prop('disabled', flag);
	$('#'+formId+' #parentlastName').prop('disabled', flag);
	$('#'+formId+' #parentGender').prop('disabled', flag);
	$('#'+formId+' #responsibleConfirm').prop('disabled', flag);
	$('#'+formId+' #skipParent').prop('disabled', flag);
	$('#'+formId+' #parentEmail').prop('disabled', flag);
	$('#'+formId+' #countryCodeParent').prop('disabled', flag);
	$('#'+formId+' #contactNumber').prop('disabled', flag);
//	$('#'+formId+' #countryCodeAlternateParent').prop('disabled', flag);
//	$('#'+formId+' #contactNumberAlternate').prop('disabled', flag);
	$('#'+formId+' #guardianConfirmation').prop('disabled', flag);
}

