
function onlineLoginButton(formId, contolltype){
//	if("examLogin"==contolltype){
		callForLoginScholarshipExamination(formId,contolltype);
//	}
}
function callForOnlineExamStart(formId,examStartLink){
	if ($("#chkvalGuidelines").is(":checked")) {
		$('#examCounterModel').modal('show');
			setTimeout(function(){
				//console.log("hi open link", examStartLink);
				window.location.href = examStartLink;
				//window.open(examStartLink, 'winname',"directories=0,titlebar=0,toolbar=0,location=0,status=0,menubar=0,scrollbars=no,resizable=no,width=600,height=650");
			}, 5500);
			return false;
	}
}
function validateLoginScholarshipExamination(formId,contolltype){
	$("#"+formId+" #ragistrationNo").removeClass('bdr-red');
	$("#"+formId+" #captcha").removeClass('bdr-red');
	if ($("#"+formId+" #ragistrationNo").val()==null || $("#"+formId+" #ragistrationNo").val()=="") {
		showMessageScholarship(0, 'Registration Number is required.','serverError');
		$("#"+formId+" #ragistrationNo").addClass('bdr-red');
		return false
	}
//	if ($("#"+formId+" #dob").val()==null || $("#"+formId+" #dob").val()=="") {
//		showMessage(true, 'Date of Birth is required.');
//		return false
//	}
	if (!validateCaptcha($("#"+formId+" #captcha").val())) {
		showMessageScholarship(0, 'Either captcha is empty or invalid','serverError');
		$("#"+formId+" #captcha").addClass('bdr-red');
		return false
	}
	return true;
}

function callForLoginScholarshipExamination(formId,contolltype) {
	hideMessageScholarship('serverError');
	if(!validateLoginScholarshipExamination(formId,contolltype)){
		return false;
	}
	var UUID =$("#"+formId+" #UUID").val();
	var registrationNo = $("#"+formId+" #ragistrationNo").val();
	//var dob = $("#"+formId+" #dob").val();
	var dob = "";
	var captcha = $("#"+formId+" #captcha").val();
	
	$.ajax({
		type : "POST",
		url : getURLForHTML('sbsb','status-details'),
		data : {UUID:UUID, registrationNo:registrationNo, dob:dob, captcha:captcha},
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
        				showMessageScholarship(0, stringMessage[1],'serverError');
        			}
        		} else {
//        			showMessageScholarship(1, 'Login for online Exam successfully.','serverError');
        			$("#guidlinesModal").modal('show');
        			$('#guidlinesTermModal').html(htmlContent)
        		}
        		return false;
			}
		},
		error : function(e) {
			return false;
		}
	});
}
$(document).on("click","#chkvalGuidelines", function(){
	if($("#chkvalGuidelines").is(":checked")){
		$("#guidlinesModal #onlineExamStart").removeAttr("disabled");
	}else{
		$("#guidlinesModal #onlineExamStart").attr("disabled", true);
	}
});

function validateTermsForInterview(formId,fieldId, fielderrorId,moduleId){
	flag=true;
	if($("#"+formId+" #termsAndConditions").is(':checked')){
		$('#termsAndConditions').closest('.term-and-condition').removeClass('highlight-field');
		hideMessageRequestDemoPage('termsAndConditionsError','termsAndConditions');
	}else{
		$('#termsAndConditions').closest('.term-and-condition').addClass('highlight-field');
		showMessageRequestDemoPage(true, 'Please agree to the terms & conditions','termsAndConditionsError','termsAndConditions');
		flag=false;
	}
	validateRequestForActiveInterviewButton(formId,moduleId);
	return flag;
}

function validateRequestForActiveInterviewButton(formId,moduleId){
	var flag =validateRequestForInterview(formId,moduleId);
		if(flag){
			$('#bookMeetingslot').addClass('active');
		}else{
			$('#bookMeetingslot').removeClass('active');
		}
}

function validateRequestForInterview(formId,moduleId){
	flag=true;
		if ($("#"+formId+" #chooseDate").val()==null || $("#"+formId+" #chooseDate").val()=='') {
			flag=false;
			return flag;
		}
		if($("input[name='slotTime']:checked").val()==undefined){
			flag=false;
			return flag;
		}
		if($("#"+formId+" #termsAndConditions").is(':checked')==false){
			flag=false;
			return flag;
		}
	return flag;
}


function validateRequestForSbInterviewSlot(formId,moduleId){
	hideMessageRequestDemoPage('chooseDateError','chooseDate');
	hideMessageRequestDemoPage('freeSlotListError','viewFreeSlot');
	hideMessageRequestDemoPage('termsAndConditionsError','termsAndConditions');
	var flag=true;
	if ($("#"+formId+" #chooseDate").val()==null || $("#"+formId+" #chooseDate").val()=='') {
		showMessageRequestDemoPage(true, 'Please select a Month', 'chooseDateError','chooseDate');
		flag=false;
	}
	if($("input[name='slotTime']:checked").val()==undefined){
		showMessageRequestDemoPage(true, 'Please select any one Slot.', 'freeSlotListError','viewFreeSlot');
		flag=false;
	}
	if($("#"+formId+" #termsAndConditions").is(':checked')){
		
	}else{
		$('#termsAndConditions').closest('.term-and-condition').addClass('highlight-field');
		showMessageRequestDemoPage(true, 'Please agree to the terms & conditions','termsAndConditionsError','termsAndConditions');
		flag= false
	}
	return flag;
}
function callForSbInterviewSlotForm(formId) {
	hideMessageRequestDemoPage('bookMeetingslotError','');
	if(!validateRequestForSbInterviewSlot(formId)){
		return false;
	}
	$.ajax({
		type : "POST",
		url : getURLForHTML('sbsb','save-scholarShip-interview-slot'),
		contentType : "application/json",
		data : JSON.stringify(getRequestForSbInterviewSlot(formId)),
		dataType : 'html',
		cache : false,
		timeout : 600000,
		success : function(htmlContent) {
			if(htmlContent!=""){
            	var stringMessage = [];
            	stringMessage = htmlContent.split("|");
        		if(stringMessage[0] == "FAILED" || stringMessage[0] == "EXCEPTION" || stringMessage[0] == "SESSIONOUT" ){
        			showMessageRequestDemoPage(true,  stringMessage[1], 'bookMeetingslotError','');
        		} else {
        			$('.meeting-form, .datepicker').hide()
        			$('.texture-bg').addClass('full-screen');
        			$('.thankyou-wrapper').show().promise().done(function(){
        				setTimeout(function(){window.location.replace(stringMessage[2]);}, 5000);
        			});
        		}
        		return false;
			}
			return false;
		},
		error : function(e) {
			$("#sendRequest").prop("disabled", false);
		}
	});
}
function getRequestForSbInterviewSlot(formId){
	var request = {};
	var authentication = {};
	var requestData = {};
	var sbInterviewSlotDTO = {};
	
	sbInterviewSlotDTO['scholarshipUuid'] = $("#scholarShipUUID").val();
	sbInterviewSlotDTO['meetingId'] =$("input[name='slotTime']:checked").attr('slotIdAttr');
	sbInterviewSlotDTO['meetingDate'] = $("input[name='slotTime']:checked").attr('slotMeetDate');
	sbInterviewSlotDTO['timezone'] = $('#countryTimezoneId option:selected').attr('custom_timezone_id');
	sbInterviewSlotDTO['meetingType'] = "SBSBINTERVIEWSLOT";
	sbInterviewSlotDTO['userRole'] = $("#userRole").val();
	
	requestData['sbInterviewSlotDTO'] = sbInterviewSlotDTO;
	authentication['hash'] = getHash();authentication['schoolId'] = SCHOOL_ID;authentication['schoolUUID'] = SCHOOL_UUID;
	authentication['userType'] = 'COMMON';
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	return request;
}

function interviewAcceptRescheduleCommon(interviewId, interviewerId, userId, controlType, interviewStatus,moduleId ){
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForHTML('sbsb','interview-accept'),
		data : JSON.stringify(getRequestForinterviewAcceptCommon(interviewId, interviewerId, userId, controlType, interviewStatus)),
		dataType : 'html',
		success : function(htmlContent) {
			var stringMessage = [];
        	stringMessage = htmlContent.split("|");
    		if(stringMessage[0] == "FAILED" || stringMessage[0] == "EXCEPTION" || stringMessage[0] == "SESSIONOUT" ){
    			showMessage(false, stringMessage[1]);
    		} else {
				showMessage(false, stringMessage[1]);
				setTimeout(function (){callDashboardPageSchool(moduleId,'student-interview-pool');},1000);
			}
			return false;
		},
		error : function(e) {
			//showMessage(true, e.responseText);
		}
	});
}

function getRequestForinterviewAcceptCommon(interviewId, interviewerId, userId, controlType, interviewStatus){
	var request = {};
	var authentication = {};
	var requestData = {};
	var sbInterviewSlotDTO = {};
	sbInterviewSlotDTO["interviewId"] = interviewId;
	sbInterviewSlotDTO["interviewerId"] = interviewerId;
	sbInterviewSlotDTO["controlType"] = controlType;
	sbInterviewSlotDTO["interviewStatus"] = interviewStatus;
	requestData['sbInterviewSlotDTO']=sbInterviewSlotDTO;
	
	authentication['userType'] = 'COMMON';
	authentication['userId'] = userId;
	authentication['hash'] = getHash();authentication['schoolId'] = SCHOOL_ID;authentication['schoolUUID'] = SCHOOL_UUID;
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	return request;
}


function assignInterviewCommon(interviewId, interviewerId, moduleId, controlType, interviewStatus, meetingId){
	$.ajax({
		type : "GET",
		url : getURLForHTML('sbsb','interview-assign'),
		data : {interviewId:interviewId,moduleId:moduleId,meetingId:meetingId},
		dataType : 'html',
		success : function(htmlContent) {
			if (htmlContent != "") {
				var stringMessage = [];
				stringMessage = htmlContent.split("|");
				if (stringMessage[0] == "FAILED"
						|| stringMessage[0] == "EXCEPTION"
						|| stringMessage[0] == "SESSIONOUT") {
					showMessage(true, stringMessage[1]);
				} else {
        			$('#showDataInterviewContent').html(htmlContent)
        			$("#showDataInterview").modal('show');
				}
				return false;
			}
			return false;
		}
	});
}



function changeStatusInterviewer(interviewId, interviewerId, moduleId, controlType, interviewStatus){
	$.ajax({
		type : "POST",
		url : getURLForHTML('sbsb','change-interviewer-status'),
		data : {interviewerId:interviewerId,moduleId:moduleId, interviewStatus:interviewStatus},
		dataType : 'html',
		success : function(htmlContent) {
			if (htmlContent != "") {
				var stringMessage = [];
				stringMessage = htmlContent.split("|");
				if (stringMessage[0] == "FAILED"
						|| stringMessage[0] == "EXCEPTION"
						|| stringMessage[0] == "SESSIONOUT") {
					showMessage(true, stringMessage[1]);
				} else {
					if(controlType==1)
					showMessage(true, "Interviewer Inactivated Successfully");
					if(controlType==0)
					showMessage(true, "Interviewer Activated Successfully");	
        			setTimeout(function(){callDashboardPageSchool(moduleId,'interviewer-list');},1000);
        			
				}
				return false;
			}
			return false;
		}
	});
}

function assignInterviewer(interviewId, interviewerId,moduleId){
	$.ajax({
		type : "POST",
		url : getURLForHTML('sbsb','assign-interviewer'),
		data : {interviewId:interviewId,interviewerId:interviewerId},
		dataType : 'html',
		success : function(htmlContent) {
			if (htmlContent != "") {
				var stringMessage = [];
				stringMessage = htmlContent.split("|");
				if (stringMessage[0] == "FAILED"
						|| stringMessage[0] == "EXCEPTION"
						|| stringMessage[0] == "SESSIONOUT") {
					showMessage(true, stringMessage[1]);
				} else {
					callDashboardPageSchool(moduleId,'student-interview-pool');
					$("#showDataInterview").modal('hide');
					
				}
				return false;
			}
			return false;
		}
		
	});
}


function changeInterviewerStatus( interviewerId,interviewerUserId, moduleId){
	$.ajax({
		type : "POST",
		url : getURLForHTML('sbsb','interviewer-status-change'),
		data : {interviewerId:interviewerId,interviewerUserId:interviewerUserId},
		dataType : 'html',
		success : function(htmlContent) {
			if (htmlContent != "") {
				var stringMessage = [];
				stringMessage = htmlContent.split("|");
				if (stringMessage[0] == "FAILED"
						|| stringMessage[0] == "EXCEPTION"
						|| stringMessage[0] == "SESSIONOUT") {
					showMessage(true, stringMessage[1]);
				} else {
					$("#interviewerStatus").modal('hide');
					$("#showDataInterview").modal('hide');
					showMessage(true, "Interviewer Assigned Successfully");
					callDashboardPageSchool('103','student-interview-accepted');
					
				}
				return false;
			}
			return false;
		}
		
	});
}