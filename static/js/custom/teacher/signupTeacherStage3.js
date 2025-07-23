$(document).ready(function() {
	$('#declConfirmation').click(function(){
		if($('#declConfirmation').is(':checked')){
			$('#declConfirmation').val('Y');
		}else{
			$('#declConfirmation').val('N');
		}
	});
	
});

function vedioInstruction() {
	$('#vedioInstruction').modal('show');
	$('#vediotoolbar').tooltip('hide');
}
function validateRequestForSignupTeacherUpdateProfile(formId){
	
	if (!validateFormAscii(formId)) {
		showMessage(false, 'Please use the English Keyboard while providing information');
		return false
	}
	
	if ($("#"+formId+" #highestQualificationId").val()==0 || $("#"+formId+" #highestQualificationId").val()==null) {
		showMessage(true, 'Select highest level of education');
		return false
	}
	if (AREA_OF_SPECIALIZATION=="") {
		showMessage(true, 'Please select Area of Specialization');
		return false
	}
	if(parseInt($("#countAreaOfspecialization").text())>=6){
		showMessage(true, 'You cannot select more than 5 courses.');
		return false
	}
	if ($("#"+formId+" #fileupload1Span").html()=='' || $("#"+formId+" #fileupload1Span").html()=='Click here to upload certificates') {
		showMessage(true, 'Upload document for certificates');
		return false
	}
	if (($("#"+formId+" #totalExperianceFromYYYY").val()==0  && $("#"+formId+" #totalExperianceFromMM").val()==0) || $("#"+formId+" #totalExperianceFromMM").val()==null) {
		showMessage(true, 'Select Total Teaching Experience in months');
		return false
	}
	
	if ($("#"+formId+" #lastOrganizationName").val()==0 || $("#"+formId+" #lastOrganizationName").val()==null) {
		showMessage(true, 'Enter Last/Current Organization Name');
		return false
	}
	if ($("#"+formId+" #lastJobTitle").val()=="") {
		showMessage(true, 'Enter Last/Current job title');
		return false
	}
//	if ($("#"+formId+" #currentlyWorkingHere").val()=="") {
//		showMessage(true, 'Are you woking here);
//		return false
//	}
	if ($("#"+formId+" #lastJobFromYYYY").val()==0 || $("#"+formId+" #lastJobFromYYYY").val()==null) {
		showMessage(true, 'Select joining year of last job');
		return false
	}
	if ($("#"+formId+" #lastJobFromMM").val()==0 || $("#"+formId+" #lastJobFromMM").val()==null) {
		showMessage(true, 'Select joining month of last job');
		return false
	}
	
	if(!$('#currentlyWorking').is(':checked')){
		if ($("#"+formId+" #lastJobToYYYY").val()==0 || $("#"+formId+" #lastJobToYYYY").val()==null) {
			showMessage(true, 'Select leaving year of last job');
			return false
		}
		if ($("#"+formId+" #lastJobToMM").val()==0 || $("#"+formId+" #lastJobToMM").val()==null) {
			showMessage(true, 'Select leaving month of last job');
			return false
		}
		var lastJobFromYear=new Date($("#"+formId+" #lastJobFromYYYY").val()+'-'+$("#"+formId+" #lastJobFromMM").val()+'-'+01).getTime();
		var lastJobToYear=new Date($("#"+formId+" #lastJobToYYYY").val()+'-'+$("#"+formId+" #lastJobToMM").val()+'-'+01).getTime();
		if(lastJobFromYear>=lastJobToYear){
			showMessage(true, 'Your joining year cannot be less than your leaving year');
			return false
		}
	}
	if ($("#"+formId+" #lastJobDesc").val()=="") {
		showMessage(true, 'Enter Last/Current job description');
		return false
	}
	
	if (GRADES_TAUGHT =="" ) {
		showMessage(true, 'Select taught grade');
		return false
	 }	
	if (SUBJECTS_TAUGHT =="" ) {
		showMessage(true, 'Select taught course');
		return false
	 }	
	if (PREFERRED_GRADES =="" ) {
		showMessage(true, 'Select preferred grade');
		return false
	 }	
	if (PREFERRED_SUBJECTS =="" ) {
		showMessage(true, 'Select preferred course');
		return false
	 }	
	
	if ($("#"+formId+" #fileupload2Span").html()=='' || $("#"+formId+" #fileupload2Span").html()=='Click here to upload experience') {
		showMessage(true, 'Upload document for experience');
		return false
	}
	if ($("#"+formId+" #fileupload3Span").html()=='' || $("#"+formId+" #fileupload3Span").html()=='Click here to upload CV') {
		showMessage(true, 'Upload document for CV');
		return false
	}
	if ($("#"+formId+" #fileupload3Span").html()=='' || $("#"+formId+" #fileupload3Span").html()=='Click here to upload CV') {
		showMessage(true, 'Upload document for CV');
		return false
	}
	
	if ($("#"+formId+" #demoVedioLink").val()==0 || $("#"+formId+" #demoVedioLink").val()==null) {
		showMessage(true, 'Please provide a link of your demo video');
		return false
	}
	
	if(!$('#declConfirmation').is(':checked')){
		showMessage(true, 'Please accept the declaration');
		return false
	}
	
	return true;
}

function callForSignupTeacherUpdateProfile(formId) {
	hideMessage('');
	if(!validateRequestForSignupTeacherUpdateProfile(formId)){
		tabActiveStatus(3);
		return false;
	}
	$("#nextStep").prop("disabled", true);
	$.ajax({
		type : "POST",
		url : getURLForHTML('teacher','signup/stage-3'),
		data :encodeURI("request="+JSON.stringify(getRequestForTeacherUpdateProfile(formId))),
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
            				tabActiveStatus(3);
            			}
        		} else {
        			$('#areaOfSpecializationModalId').modal('hide');
        			$('#signupStage4Content').html(htmlContent)
        			showMessage(false, 'Teacher profile updated successfully.');
        			tabActiveStatus(4);
        		}
        		$("#nextStep").prop("disabled", false);
        			return false;
			}
		},
		error : function(e) {
			//showMessage(true, e.responseText);
			$("#nextStep").prop("disabled", false);
			tabActiveStatus(3);
		}
	});
}
function getRequestForTeacherUpdateProfile(formId){
	console.log("stage3 save")
	var request = {};
	var authentication = {};
	var requestData = {};
	var teacherUpdateProfileDTO = {};
	teacherUpdateProfileDTO['highestQualificationId'] = $("#"+formId+" #highestQualificationId").val();
	teacherUpdateProfileDTO['areaOfSpecialization'] = AREA_OF_SPECIALIZATION;
	teacherUpdateProfileDTO['totalExperianceFromYYYY'] = $("#"+formId+" #totalExperianceFromYYYY").val();
	teacherUpdateProfileDTO['totalExperianceFromMM'] = $("#"+formId+" #totalExperianceFromMM").val();
	teacherUpdateProfileDTO['lastOrganizationName'] = escapeCharacters($("#"+formId+" #lastOrganizationName").val());
	teacherUpdateProfileDTO['lastJobTitle'] = escapeCharacters($("#"+formId+" #lastJobTitle").val());
	teacherUpdateProfileDTO['currentlyWorking'] = $("#"+formId+" #currentlyWorking").val();
	teacherUpdateProfileDTO['lastJobFromYYYY'] = $("#"+formId+" #lastJobFromYYYY").val();
	teacherUpdateProfileDTO['lastJobFromMM'] = $("#"+formId+" #lastJobFromMM").val();
	
	teacherUpdateProfileDTO['lastJobToYYYY'] = $("#"+formId+" #lastJobToYYYY").val();
	teacherUpdateProfileDTO['lastJobToMM'] = $("#"+formId+" #lastJobToMM").val();
	
	teacherUpdateProfileDTO['lastJobDesc'] = escapeCharacters($("#"+formId+" #lastJobDesc").val());
	teacherUpdateProfileDTO['pastTaughtGradeId'] = GRADES_TAUGHT;
	teacherUpdateProfileDTO['pastTaughtSubjectId'] = SUBJECTS_TAUGHT;
	teacherUpdateProfileDTO['preferredGradeId'] = PREFERRED_GRADES;
	teacherUpdateProfileDTO['preferredSubjectId'] = PREFERRED_SUBJECTS;
	teacherUpdateProfileDTO['declConfirmation'] = $("#"+formId+" #declConfirmation").val();
	teacherUpdateProfileDTO['demoVedioLink'] = escapeCharacters($("#"+formId+" #demoVedioLink").val());
	
	
	requestData['teacherUpdateProfileDTO'] = teacherUpdateProfileDTO;
	authentication['hash'] = getHash();authentication['schoolId'] = SCHOOL_ID;authentication['schoolUUID'] = SCHOOL_UUID;
	authentication['userType'] = 'TEACHER';
	authentication['userId'] = $("#"+formId+" #userId").val();
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	return request;
}
function getFromMonths(formId, value, elementId) {
	hideMessage('');
	if($('#lastJobFromYYYY').val()==""){
		$("#lastJobFromMM").val(0);
		$("#lastJobFromMM").prop("disabled", true);
		return false;
	}
	var lastJobFromYear=$('#'+formId+' #lastJobFromYYYY').val();
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForCommon('masters'),
		data : JSON.stringify(getRequestForMaster(formId, 'LAST-JOB-FROM-MONTHS', lastJobFromYear)),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				showMessage(true, data['message']);
			} else {
				buildDropdown(data['mastersData']['lastJobFromMonths'], $('#lastJobFromMM'), 'Select Month');
			}
			$("#lastJobFromMM").prop("disabled", false);
		},
		error : function(e) {
			//showMessage(true, e.responseText);
			$("#lastJobFromMM").prop("disabled", false);
		}
	});
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForCommon('masters'),
		data : JSON.stringify(getRequestForMaster(formId, 'LAST-JOB-TO-YEARS', lastJobFromYear)),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				showMessage(true, data['message']);
			} else {
				buildDropdown(data['mastersData']['lastJobToYears'], $('#lastJobToYYYY'), 'Select Years');
			}
			$("#lastJobFromMM").prop("disabled", false);
		},
		error : function(e) {
		//	showMessage(true, e.responseText);
			$("#lastJobFromMM").prop("disabled", false);
		}
	});
}
function getToMonths(formId, value, elementId) {
	hideMessage('');
	if($('#lastJobToYYYY').val()==""){
		$("#lastJobToMM").val(0);
		$("#lastJobToMM").prop("disabled", true);
		return false;
	}
	var lastJobToYear=$('#lastJobToYYYY').val();
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForCommon('masters'),
		data : JSON.stringify(getRequestForMaster(formId, 'LAST-JOB-TO-MONTHS', lastJobToYear)),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				showMessage(true, data['message']);
			} else {
				buildDropdown(data['mastersData']['lastJobToMonths'], $('#lastJobToMM'), 'Select Month');
			}
			$("#lastJobToMM").prop("disabled", false);
		},
		error : function(e) {
			//showMessage(true, e.responseText);
			$("#lastJobToMM").prop("disabled", false);
		}
	});
}

function selectTaughtGrade(src, flag, type) {
	if (flag) {
		if (!$(src).hasClass("greenDiv")) {
			if (type == 0) {
				if (middleSchoolTaughtGradeCount == 0 && highSchoolTaughtGradeCount == 0) {
					$(src).addClass("greenDiv");
					elementrySchoolTaughtGradeCount++;
				}else{
					showMessage(true, 'Please select grades from either Kindergarten & Primary School or Middle School');
					return false
				}
			} else if (type == 1) {
				if (elementrySchoolTaughtGradeCount==0 && highSchoolTaughtGradeCount == 0) {
					$(src).addClass("greenDiv");
					middleSchoolTaughtGradeCount++;
				} else {
					showMessage(true, 'Please select grades from either Kindergarten & Primary School or Middle School');
					return false
				}
			} else {
				if (elementrySchoolTaughtGradeCount==0 && middleSchoolTaughtGradeCount == 0) {
					$(src).addClass("greenDiv");
					highSchoolTaughtGradeCount++;
				} else {
					showMessage(true, 'Please select grades from either Kindergarten & Primary School or Middle School');
					return false
				}
			}
		} else {
			$(src).removeClass("greenDiv");
			if (type == 0) {
				if(elementrySchoolTaughtGradeCount>0){
					elementrySchoolTaughtGradeCount--;
				}
			} else if (type == 1) {
				if(middleSchoolTaughtGradeCount>0){
					middleSchoolTaughtGradeCount--;
				}
			} else {
				if(highSchoolTaughtGradeCount>0){
					highSchoolTaughtGradeCount--;
				}
			}
		}
	}
}

function selectGrade(src, flag, type) {
	if (flag) {
		if (!$(src).hasClass("greenDiv")) {
			if (type == 0) {
				if (middleSchoolGradeCount == 0 && highSchoolGradeCount == 0) {
					$(src).addClass("greenDiv");
					elementrySchoolGradeCount++;
				}else{
					showMessage(true, 'Please select grades from either Kindergarten & Primary School or Middle School');
					return false
				}
			} else if (type == 1) {
				if (elementrySchoolGradeCount==0 && highSchoolGradeCount == 0) {
					$(src).addClass("greenDiv");
					middleSchoolGradeCount++;
				} else {
					showMessage(true, 'Please select grades from either Kindergarten & Primary School or Middle School');
					return false
				}
			} else {
				if (elementrySchoolGradeCount==0 && middleSchoolGradeCount == 0) {
					$(src).addClass("greenDiv");
					highSchoolGradeCount++;
				} else {
					showMessage(true, 'Please select grades from either Kindergarten & Primary School or Middle School');
					return false
				}
			}
		} else {
			$(src).removeClass("greenDiv");
			if (type == 0) {
				if(elementrySchoolGradeCount>0){
					elementrySchoolGradeCount--;
				}
			} else if (type == 1) {
				if(middleSchoolGradeCount>0){
					middleSchoolGradeCount--;
				}
			} else {
				if(highSchoolGradeCount>0){
					highSchoolGradeCount--;
				}
			}
		}
	}
}