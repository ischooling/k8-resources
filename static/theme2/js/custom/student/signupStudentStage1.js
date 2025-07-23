$(document).ready(function() {
});

function callScholarshipDetails(formId) {
	var flag=false
	hideMessage('');
	if($('#registrationNumber').val()){
		$.ajax({
			type : "POST",
			url : getURLForHTML('student','signup/scholarship-registration-verification'),
			data : encodeURI("request="+JSON.stringify(getRequestForScholarshipDetails(formId))),
			dataType : 'html',
			async : false,
			global : false,
			success : function(htmlContent) {
				if(htmlContent!=""){
					var stringMessage = [];
					stringMessage = htmlContent.split("|");
					if(stringMessage[0] == "FAILED" || stringMessage[0] == "EXCEPTION" || stringMessage[0] == "SESSIONOUT"){
						if(stringMessage[0] == "SESSIONOUT"){
							redirectLoginPage();
						}else{
							showMessage(0, stringMessage[1]);
						}
						flag=false
					} else {
						$('#scholarship-content').html(htmlContent)
						showMessage(1, 'Scholarship updated successfully.', '', true);
						flag=true
					}
				}
			}
		});
	}
	return flag;
}

function getRequestForScholarshipDetails(formId){
	var request = {};
	var authentication = {};
	var requestData = {};
	requestData['requestKey'] = 'SBSB-SCHOLARSHIP-CHECK';
	requestData['requestValue'] = $("#"+formId+" #registrationNumber").val();;
	authentication['hash'] = getHash();authentication['schoolId'] = SCHOOL_ID;authentication['schoolUUID'] = SCHOOL_UUID;
	authentication['userType'] = 'STUDENT';
	authentication['userId'] = $("#"+formId+" #userId").val();
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	return request;
}

function validateRequestForSignupStudent(formId){
	/*if (!validateFormAscii(formId)) {
		showMessage(0, 'Please use the English Keyboard while providing information');
		return false
	}*/

	if($('#registrationNumberSelectionYes').is(':checked')){
		if($('#registrationNumber').val().trim()==''){
			showMessage(0, 'Scholarship Code is required');
			return false
		}
	}
	if ($("#"+formId+" #firstName").val()=="") {
		showMessage(0, 'First Name is required');
		return false
	}
	if ($("#"+formId+" #lastName").val()=="") {
		showMessage(0, 'Last Name is required');
		return false
	}
	if ($("#"+formId+" #applyStandardId").val()==0  || $("#"+formId+" #applyStandardId").val()=='') {
		showMessage(0, 'Please select grade');
		return false
	}
	if($('#'+formId+' #dob').val()!=""){
		var studentDOB = $('#'+formId+' #dob').val().split("-");
		var age = M.countAgeNew(studentDOB[0], studentDOB[1], studentDOB[2]);
		//console.log('age a '+age);
		if(age<12.927800723458905){
//			if ($("#"+formId+" #checkAge").is(':checked')){
//
//			}else{
//				showMessage(1, 'Please confirm that your age is less than 13 years by selecting the checkbox');
//				$('#'+formId+' #ageOfThirteen').show();
//				return false
//			}
		}else{
			$('#'+formId+' #checkAge').prop("checked",false);
		}
	}else{
		showMessage(0, 'Please choose your Date of Birth.');
		return false
	}
	if ($("#"+formId+" #gender").val()==0  || $("#"+formId+" #gender").val()=='') {
		showMessage(0, 'Gender is required');
		return false
	}
	if ($("#"+formId+" #countryId").val()==0 || $("#"+formId+" #countryId").val()=='') {
		showMessage(0, 'Country is required');
		return false
	}
	if ($("#"+formId+" #stateId").val()==0 || $("#"+formId+" #stateId").val()=='') {
		showMessage(0, 'State is required');
		return false
	}
	if ($("#"+formId+" #cityId").val()==0 || $("#"+formId+" #cityId").val()=='') {
		showMessage(0, 'City is required');
		return false
	}

	if ($("#"+formId+" #communicationEmail").val()=="") {
		showMessage(0, 'Email Address is required');
		return false
	}
//	if ($("#"+formId+" #countryCodeStudent").val()==null) {
//		showMessage(1, 'ISD code is required');
//		return false
//	}
	if($("#isAborad").val()=='Y'){
		if (M.isNRIMobile($("#"+formId+" #contactNumber").val()) == null) {
			showMessage(0, 'Please enter correct mobile number');
			return false
		}
	}else{
		if (M.isMobile($("#"+formId+" #contactNumber").val()) == null) {
			showMessage(0, 'Please enter correct mobile number');
			return false
		}
	}
	return true;
}

function callForSignupStudentDetails(formId) {
	var flag=false
	hideMessage('');
	if(!validateRequestForSignupStudent(formId)){
		return false;
	}
	if(!calculateAge(formId)){
		return false;
	}
	customLoaderSignup(true);
	$.ajax({
		type : "POST",
		url : getURLForHTML('student','signup/stage-2'),
		data : encodeURI("request="+JSON.stringify(getRequestForStudent(formId))),
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
					}else{
						showMessage(0, stringMessage[1]);
					}
				} else {
					$('#signupStage2Content').html(htmlContent)
					showMessage(1, 'Student record updated successfully.', '', true);
					flag=true
					// if($('#registrationNumber').val()!=''){
					// 	$('#registrationNumberSelectionYes').prop('checked', true);
					// 	$('#registrationNumberSelectionYes').prop('disbled', true);
					// 	$('#registrationNumberSelectionNo').prop('disbled', true);
					// 	$('.registration-no-wrapper').show();
					// 	$('#registrationNumber').prop('disabled', true);
					// }else{
					// 	$('#registrationNumberSelectionNo').prop('checked', true);
					// 	$('#registrationNumberSelectionYes').prop('disbled', false);
					// 	$('#registrationNumberSelectionNo').prop('disbled', false);
					// 	$('.registration-no-wrapper').hide();
					// 	$('#registrationNumber').prop('disabled', false);
					// }
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

function getRequestForStudent(formId){
	var request = {};
	var authentication = {};
	var requestData = {};
	var signupStudentDTO = {};
	signupStudentDTO['themeType'] = 'theme2';
//	if($('#registrationNumberSelectionYes').is(':checked')){
//		signupStudentDTO['registrationNumberSelection'] = 'Y';
//		signupStudentDTO['registrationNumber'] = $("#registrationNumber").val();
//	}else{
//		signupStudentDTO['registrationNumberSelection'] = 'N';
//		signupStudentDTO['registrationNumber'] = '';
//	}

	signupStudentDTO['firstName'] = $("#"+formId+" #firstName").val();
	signupStudentDTO['firstName'] = $("#"+formId+" #firstName").val();
	signupStudentDTO['middleName'] = $("#"+formId+" #middleName").val();
	signupStudentDTO['lastName'] = $("#"+formId+" #lastName").val();
	signupStudentDTO['dob'] = $("#"+formId+" #dob").val();
	signupStudentDTO['gender'] = $("#"+formId+" #gender").val();
	signupStudentDTO['countryId'] = $("#"+formId+" #countryId").val();
	signupStudentDTO['stateId'] = $("#"+formId+" #stateId").val();
	signupStudentDTO['cityId'] = $("#"+formId+" #cityId").val();
	signupStudentDTO['standardId'] = $("#"+formId+" #applyStandardId").val();

	signupStudentDTO['communicationEmail'] = $("#"+formId+" #communicationEmail").val();
	signupStudentDTO['countryCode'] = $("#"+formId+" .iti__active").last().attr("data-dial-code");//$.trim($("#"+formId+" #countryCodeStudent option:selected").text().split(" ")[0].replace("+",""));
	if($("#"+formId+" .iti__active").attr("data-dial-code")==undefined){
		signupStudentDTO['countryCode'] = $("#"+formId+" #countryIsd").val();
	}
	signupStudentDTO['contactNumber'] = $("#"+formId+" #contactNumber").val();
	signupStudentDTO['countryIsdCode'] = $("#"+formId+" .iti__active").last().attr("data-country-code");
	if($("#"+formId+" .iti__active").attr("data-country-code")==undefined){
		signupStudentDTO['countryIsdCode'] = $("#"+formId+" #countryIsdCnt").val();
	}
	signupStudentDTO['studyCenter'] = SCHOOL_ID;
	requestData['signupStudentDTO'] = signupStudentDTO;
	authentication['hash'] = getHash();authentication['schoolId'] = SCHOOL_ID;authentication['schoolUUID'] = SCHOOL_UUID;
	authentication['userType'] = 'STUDENT';
	authentication['userId'] = $("#"+formId+" #userId").val();
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	return request;
}


function calculateAge(formId){
	return true;
//	$('#'+formId+' #dob').removeClass('is-Empty');
//	var studentDOB = $('#'+formId+' #dob').val().split("-");
//	var age = M.countAgeNew(studentDOB[0], studentDOB[1], studentDOB[2]);
//	//console.log('age '+age);
//	if(age>=10.927798115677321 && age<=98.98807333666286){
//		if(age<12.927800723458905){
//			$('#'+formId+' #ageOfThirteen').show();
//			$('#'+formId+' #checkAge').removeAttr('disabled');
//		}else{
//			$('#'+formId+' #ageOfThirteen').hide();
////			$('#'+formId+' #checkAge').prop("disabled",true);
//		}
//		return true;
//	}else{
//		//showMessage(0, 'Date of Birth range should be between 11 to 99');
//		return true;
//	}
}
function displaySection(sectionNumber){
	hideMessage('');
	$('#formSteps div').steps('setStep', sectionNumber);
}

function updateDateOfBirth(formId){
	var currentYear=new Date().getFullYear();
	var yearDifference=0;
	// if($('#applyStandardId').val()==17){
	// 	yearDifference=2;
	// }else if($('#applyStandardId').val()==11){
	// 	yearDifference=4;
	// }else if($('#applyStandardId').val()==12){
	// 	yearDifference=5;
	// }else if($('#applyStandardId').val()==13){
	// 	yearDifference=6;
	// }else if($('#applyStandardId').val()==14){
	// 	yearDifference=7;
	// }else if($('#applyStandardId').val()==15){
	// 	yearDifference=8;
	// }else if($('#applyStandardId').val()==16){
	// 	yearDifference=9;
	// }else if($('#applyStandardId').val()==1){
	// 	yearDifference=10;
	// }else if($('#applyStandardId').val()==2){
	// 	yearDifference=11;
	// }else if($('#applyStandardId').val()==3){
	// 	yearDifference=12;
	// }
	// if(yearDifference==0){
	// 	$("#"+formId+" #dob").attr('disabled', true)
	// 	showMessage(0, 'Please choose your appropriate grade.','serverError');
	// }else{
	// 	$("#"+formId+" #dob").attr('disabled', false)
	// }
	var yearStart=currentYear-20;
	var yearEnd=currentYear-2;

	var startDate = new Date(yearStart,3,2);
	var endDate = new Date(yearEnd,3,1);
	// $("#"+formId+" #dob").val('')
	$("#"+formId+" #dob").datepicker('remove')
	$("#"+formId+" #dob").datepicker({
       	autoclose: true,
       	format: 'dd-mm-yyyy',
       	startDate:startDate,
       	endDate:endDate
    }).on('changeDate', function() {
    	validateDOB('signupStage1', true);
    	$("#"+formId+" #dob").valid();
    	$('#messageDiv1').html('')
    	$('#messageDiv').hide();
    });
}

function validateDOB(formId, needToDisplayError){
	var flag=true
	$("#"+formId+" #dob").removeClass('bdr-red');
	if ($("#"+formId+" #dob").val().trim()=='') {
		if(flag){
			if(needToDisplayError){
				//$('#sendOTPFirst').removeClass('active-btn')
				showMessage(0, 'Student\'s Date of Birth is required.','serverError');
			}
		}
		$("#"+formId+" #dob").addClass('bdr-red');
		flag=false
	}
	//isAllFieldsValid(formId)
	return flag;
}