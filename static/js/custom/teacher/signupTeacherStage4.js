$(document).ready(function() {
	getTeacherSignupDetailInReviewStage();
});
function previewFillSectionTeacher1(){
	//Student details
	var phonecode = "";
	var cCode = $('#signupStage2 #countryCode option:selected').text();
	if(cCode!='' && cCode !='undefine') {
		var cCode1 = cCode.split(" ");
		if(cCode1.length>0){
			phonecode = cCode1[0];
		}else{
			phonecode = "";
		}
	}
	
	$('#editStage2FirstName').text($("#signupStage2 #firstName").val());
	$('#editStage2MiddleName').text($('#signupStage2 #middleName').val());
	$('#editStage2LastName').text($('#signupStage2 #lastName').val());
	$('#editStage2Country').text($('#signupStage2 #countryId option:selected').text());
	$('#editStage2State').text($('#signupStage2 #stateId option:selected').text());
	$('#editStage2City').text($('#signupStage2 #cityId option:selected').text());
	$('#editStage2Gender').text($('#signupStage2 #gender option:selected').text());
	$('#editStage2Dob').text($('#signupStage2 #dob').val());
	$('#editStage2Email').text($('#signupStage2 #communicationEmail').val());
	$('#editStage2Phoneno').text(phonecode + " "+$('#signupStage2 #contactNumber').val() );
	$('#editStage2MaritalStatus').text($('#signupStage2 #maritalStatus option:selected').text());
	
	$('#editStage2teacherAddressLine1').text(toTitleCase($('#signupStage2 #teacherAddressLine1').val()));
	$('#editStage2teacherAddressLine2').text(toTitleCase($("#signupStage2 #teacherAddressLine2").val()));
	$('#editStage2teacherZipcode').text($('#signupStage2 #teacherZipcode').val());
}
function previewFillSectionTeacher2(){
	$('#editStage3highestQualificationId').text($("#signupStage3 #highestQualificationId  option:selected").text());
	var subjectname='';
	var str='';
	$(".areaOfSpecialization").each(function() {
		if ($(this).hasClass("greenDiv")) {
			subjectname += $(this).find("p").html()+',  ';
		}
	});
	subjectname = subjectname.substring(0, subjectname.length-3);
	$('#editStage3subjectSpecializationId').html(subjectname);

	var gradename='';
	$(".preferredGradeId").each(function() {
		if ($(this).hasClass("greenDiv")) {
			gradename += $(this).find("p").html()+',  ';
		}
	});
	gradename = gradename.substring(0, gradename.length-3);
	$('#editStage3preferredGradeId').html(gradename);
	
	var preferredSubjectName='';
	$(".preferredSubjectId").each(function() {
		if ($(this).hasClass("greenDiv")) {
			preferredSubjectName += $(this).find("p").html()+',  ';
		}
	});
	preferredSubjectName = preferredSubjectName.substring(0, preferredSubjectName.length-3);
	$('#editStage3preferredSubjectId').html(preferredSubjectName);
	
	
	var taughtGradeName='';
	$(".pastTaughtGradeId").each(function() {
		if ($(this).hasClass("greenDiv")) {
			taughtGradeName += $(this).find("p").html()+',  ';
		}
	});
	taughtGradeName = taughtGradeName.substring(0, taughtGradeName.length-3);
	$('#editStage3pastTaughtGradeId').html(taughtGradeName);
	
	var taughtSubjectName='';
	$(".pastTaughtSubjectId").each(function() {
		if ($(this).hasClass("greenDiv")) {
			taughtSubjectName += $(this).find("p").html()+',  ';
		}
	});
	taughtSubjectName = taughtSubjectName.substring(0, taughtSubjectName.length-3);
	$('#editStage3pastTaughtSubjectId').html(taughtSubjectName);

	$('#editStage3teacherSupportingDocumentCertificate').text($('#signupStage3 #fileupload1Span').html());
	$('#editStage3lastOrganizationName').text(toTitleCase($('#signupStage3 #lastOrganizationName').val()));
	$('#editStage3lastJobTitle').text(toTitleCase($('#signupStage3 #lastJobTitle').val()));
	if($('#signupStage3 #currentlyWorking').is(':checked')){
		$('#editStage3currentlyWorkingHere').text('Yes');
	}else{
		$('#editStage3currentlyWorkingHere').text('No');
	}
	$('#edittotalExperianceFromYYYY').text($('#signupStage3 #totalExperianceFromYYYY option:selected').text());
	$('#edittotalExperianceFromMM').text($('#signupStage3 #totalExperianceFromMM option:selected').text());
	
	$('#editStage3lastJobFromYYYY').text($('#signupStage3 #lastJobFromYYYY option:selected').text());
	$('#editStage3lastJobFromMM').text($('#signupStage3 #lastJobFromMM option:selected').text());
	if($('#signupStage3 #lastJobToYYYY  option:selected').text()!='' || $('#signupStage3 #lastJobToYYYY  option:selected').text()!='Select Years'){
		$('#editStage3lastJobToYYYY').text($('#signupStage3 #lastJobToYYYY  option:selected').text());
		$('#editStage3lastJobToMM').text($('#signupStage3 #lastJobToMM option:selected').text());
	}else{
		$('#editStage3lastJobToYYYY').text('Present');
	}
	if($('#editStage3currentlyWorkingHere').text()=='Yes'){
		$('#editStage3lastJobToYYYY').text('Present');
	}
	
	$('#editStage3lastJobDesc').text(toTitleCase($('#signupStage3 #lastJobDesc').val()));
	$('#editStage3teacherSupportingDocumentExperiance').text($("#signupStage3 #fileupload2Span").html());
	$('#editStage3teacherSupportingDocumentCV').text($('#signupStage3 #fileupload3Span').html());
	if($('#signupStage3 #editStage3optionsCheckboxes').is(':checked')){
		$('#editStage3optionsCheckboxes').text('Y');
	}else{
		$('#editStage3optionsCheckboxes').text('N');
	}
	$('#editStage3teacherDemoVedioLink').html('<a href="'+$('#signupStage3 #demoVedioLink').val()+'" target="blank">View</a>');
}


function getTeacherSignupDetailInReviewStage() {
	previewFillSectionTeacher1();
	previewFillSectionTeacher2();
	
}
function callForSignupTeacherReviewAndApproval(formId) {
	$('#submitReviewForTeacherDetailsModal').modal('show');
	tabActiveStatus(3);
	signupPage=4;
}
function getRequestForPendingApproval(){
	var request = {};
	var authentication = {};
	var requestData = {};
	requestData['requestKey'] = 'SEND_MAIL_FOR_PENDING_APPROVAL';
	requestData['requestValue'] = '1';
	authentication['hash'] = getHash();authentication['schoolId'] = SCHOOL_ID;authentication['schoolUUID'] = SCHOOL_UUID;
	authentication['userType'] = 'TEACHER';
	authentication['userId'] = $("#userId").val();
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	return request;
}
function submitSignupTeacherReviewAndApproval(){
	$('#submitReviewForTeacherDetailsModal').modal('hide');
	$('#inReviewForTeacherDetailsModal').modal('show');
	$('#inReviewForTeacherDetailsModal').modal({backdrop: 'static', keyboard: false})
	tabActiveStatus(4);
	hideMessage('');
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLFor('teacher','signup/sendMailForPendingApproval'),
		data : JSON.stringify(getRequestForPendingApproval()),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				showMessage(true, stringMessage[1]);
				tabActiveStatus(3);
			}else{
				showMessage(false, 'Request has been sent successfully for approval');
    			tabActiveStatus(4);
			}
		},
		error : function(e) {
			//showMessage(true, e.responseText);
			$("#nextStep").prop("disabled", false);
			tabActiveStatus(3);
		}
	});
}