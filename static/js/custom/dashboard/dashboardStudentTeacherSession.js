$(document).ready(function() {
	
});

function meetingSlotModal(){
	
	console.log("hello meetingSlotModal");
	callLocationAndSelectTimeZone('teacherMeetingSlotsForm');
	$("#standardDiv").show();
	$("#course").show();
	$('#teacherMeetingSlotsModal').modal('show');
	$('#listSlotsResponse').html('');
	$('#listSlots').show();
	$('.meetingGetSlotSave').show();
	$('.meetingSave').hide();
	$('#back').hide();
	$("#meetingCategory2").prop("checked", true);
	$("#inActDate").val('');
	$("#timeHrsFrom").val(0);
	$("#timeHrsTo").val(0);
	$("#timeMinFrom").val(0);
	$("#timeMinTo").val(0);
	$("#weekCount").val(1);
	$(".arrowBtn").show();
	$('#nextVisitMonth').show();
	$('#calendarWeek').show();
	var newdate = new Date();
	//newdate.setDate(newdate.getDate() - 1); // minus the date
	var nd = newdate.getFullYear()+"-"+(newdate.getMonth()+1)+"-"+newdate.getDate();//new Date(newdate);
	calendarDateMeeting('calendarWeek',nd, 'Week');
	$("#monthYear").html('1 Week(s) Selected');
	$("#monthYear").show();
}

function meetingSlotModalBack(){
	$('#teacherMeetingSlotsModal').modal('show');
	$('#listSlotsResponse').html('');
	$('#listSlots').show();
	$('.meetingGetSlotSave').show();
	$('.meetingSave').hide();
	$('#back').hide();
}





function meetingResultModal(meetingId, userId,meetingresult){
	$('#updateMeetingResultModal').modal('show');
	$('#updateMeetingResultForm #userId').val(userId);
	$('#updateMeetingResultForm #meetingId').val(meetingId);
//	$('#updateMeetingResultForm #meetingResult option:selected').val(meetingresult);
	if(meetingresult=='N/A'){
		if($('#updateMeetingResultForm #meetingResult option:selected').val().trim()==''){
			
		}else{
			$('#updateMeetingResultForm #meetingResult').val($('#updateMeetingResultForm #meetingResult option:selected').text());
		}
	}else{
		$('#updateMeetingResultForm #meetingResult').val(meetingresult);
	}
}
function bookingSlotModal(){
	$("#course").show();
	$('#studentBookingSlotsModal').modal('show');
}

function meetingUrlModalTeacher(meetingId,userId,meetingUrl,mailSendStatus,urlRemarks){
	if(meetingUrl=='N/A'){
		meetingUrl=''
	}
	if(mailSendStatus=='N/A'){
		mailSendStatus='N'
	}
	if(urlRemarks=='N/A'){
		urlRemarks=''
	}
	$('#meetingUrlForm #meetingUrl').attr('disabled', false);
	$('#meetingUrlForm #remarks').attr('disabled', false);
	$('#meetingUrlForm #saveMeetingUrl').show();
	$('#meetingUrlForm #note').show();
	
	$('#meetingUrlModal').modal('show');
	$('#meetingUrlForm #meetingId').val(meetingId);
	$('#meetingUrlForm #userId').val(userId);
	$('#meetingUrlForm #meetingUrl').val(meetingUrl);
	$('#meetingUrlForm #mailSendStatus').val(mailSendStatus);
	$('#meetingUrlForm #remarks').val(urlRemarks);
	if(mailSendStatus=='Y' || meetingUrl !=''){
		$('#meetingUrlForm #meetingUrl').attr('disabled', true);
		$('#meetingUrlForm #remarks').attr('disabled', true);
		$('#meetingUrlForm #saveMeetingUrl').hide();
		$('#meetingUrlForm #note').hide();
	}
}

function meetingUrlModalAdmin(meetingId,userId,meetingUrl,mailSendStatus, urlRemarks){
	$('#meetingUrlForm #meetingUrl').attr('disabled', false);
	$('#meetingUrlForm #remarks').attr('disabled', false);
	$('#meetingUrlForm #saveMeetingUrl').show();
	$('#meetingUrlForm #note').hide();
	
	$('#meetingUrlModal').modal('show');
	$('#meetingUrlForm #meetingId').val(meetingId).trim();
	$('#meetingUrlForm #userId').val(userId).trim();
	$('#meetingUrlForm #meetingUrl').val(meetingUrl).trim();
	$('#meetingUrlForm #remarks').val(urlRemarks).trim();
	$('#meetingUrlForm #mailSendStatus').val(mailSendStatus).trim();
	if(mailSendStatus=='Y'){
		$('#meetingUrlForm #meetingUrl').attr('disabled', true);
		$('#meetingUrlForm #remarks').attr('disabled', true);
		$('#meetingUrlForm #saveMeetingUrl').hide();
		$('#meetingUrlForm #note').hide();
	}
}

function sendMailModel(meetingId,userId,meetingUrl,mailSendStatus){
	if(meetingUrl=='' || meetingUrl==undefined){
		showMessage(true, 'Add Meeting Link before Sending Mail');
		return false;
	}
//	else if(mailSendStatus=='Y'){
//		showMessage(true, 'Mail Already Send');
//		return false;
//	}
	else {
		$('#sendMailModal').modal('show');
		$('#sendMailForm #meetingId').val(meetingId);
		$('#sendMailForm #userId').val(userId);
	}
}

function publishRecording(meetingId,userId, meetingStrId, publishId){
	$('#publishRecordModal').modal('show');
	$('#publishRecordForm #meetingId').val(meetingId);
	$('#publishRecordForm #userId').val(userId);
	$('#publishRecordForm #meetingStrId').val(meetingStrId);
	$('#publishRecordForm #publishId').html(publishId==1?'Publish':'Unpublish');
	$('#publishRecordForm #publishHeadId').html(publishId==1?'Publish':'Unpublish');
}

function revokeMeeting(meetingId,userId, meetingStrId, publishId){
	$('#revokeModal').modal('show');
	$('#revokeForm #meetingId').val(meetingId);
	$('#revokeForm #userId').val(userId);
	$('#revokeForm #meetingStrId').val(meetingStrId);
}

function validateStudentSlots(formId){
	var countryTimezone="";
	var subjectId="";
	var teacherId="";
	var providerId="";
	var standardId="";
	if($('#countryTimezoneId option:selected').val().trim()!=null && $('#countryTimezoneId option:selected').val().trim()!='0'){
		countryTimezone = $('#countryTimezoneId option:selected').val();
	}else{
		$('#studentfreeSlotList').html("");
		showMessage(true, 'Please select a Time Zone');
		return false
	}
	if($('#subjectId').val()==0 || $('#subjectId').val()==undefined){
		showMessage(true, 'Course is required');
		return false;
	}else{
		subjectId=$('#'+formId+' #subjectId').val();
		teacherId=	$('#'+formId+' #subjectId option:selected').attr('data-teacherId');
		providerId=$('#'+formId+' #subjectId option:selected').attr('data-providerId');
		standardId=$('#'+formId+' #subjectId option:selected').attr('data-standardId');
	}
	callStudentFreeSlots('#studentBookingSlotsForm',"subjectId="+subjectId+"&teacherId="+teacherId+"&timeZone="+countryTimezone+"&providerId="+providerId+"&standardId="+standardId);
}

function callStudentFreeSlots(formId, actionUrl) {
//	hideMessage('');
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForHTML('dashboard','get-student-free-slots?'+actionUrl),
		dataType : 'html',
		cache : false,
		timeout : 600000,
		success : function(htmlContent) {
			if(htmlContent!=""){
            	var stringMessage = [];
            	stringMessage = htmlContent.split("|");
        		if(stringMessage[0] == "FAILED" || stringMessage[0] == "EXCEPTION" || stringMessage[0] == "SESSIONOUT" ){
        			showMessage(true, stringMessage[1]);
        		} else {
        			$('#studentfreeSlotList').html(htmlContent);
        		}
        		return false;
			}
			return false;
		},
		error : function(e) {
			showMessage(true, e.responseText);
		}
	});
}

function validateRequestForStudentBookSessionSlots(formId,moduleId){
	if($('#countryTimezoneId').val()==0 || $('#countryTimezoneId').val()==undefined){
		showMessage(true, 'Time-Zone is required');
		return false;
	}
	if($('#subjectId').val()==0 || $('#subjectId').val()==undefined){
		showMessage(true, 'Course is required');
		return false;
	}
	if($("input[name='slotTime']:checked").val()==undefined){
		showMessage(true, 'Please select any one Slot.');
		return false;
	}
	return true;
}
function callForStudentBookSessionSlots(formId, moduleId,roleModuleId) {
	hideMessage('');
	if(!validateRequestForStudentBookSessionSlots(formId)){
		return false;
	}
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForHTML('dashboard','student-book-session-slots-submit'),
		data : JSON.stringify(getRequestForStudentBookSessionSlots(formId, moduleId)),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				showMessage(true, data['message']);
			} else {
				showMessage(false, data['message']);
				$('#studentBookingSlotsModal').modal('toggle');
				$('#'+formId)[0].reset();
				setTimeout(function(){ callSchoolInneraction('subjectsession',data['responseData'].subjectId,'',roleModuleId); }, 1000);
			}
			return false;
		},
		error : function(e) {
			return false;
		}
	});
}
function getRequestForStudentBookSessionSlots(formId, moduleId){
	var request = {};
	var authentication = {};
	var requestData = {};
	var meetingSlotDTO = {};
	
	meetingSlotDTO['meetingPersoneId'] = $("#userId").val();
	meetingSlotDTO['meetingId'] =$("input[name='slotTime']:checked").attr('slotIdAttr');
	meetingSlotDTO['meetingDate'] = $("input[name='slotTime']:checked").attr('slotMeetDate');
	meetingSlotDTO['startTime'] = $("input[name='slotTime']:checked").attr('slotstTime');
	meetingSlotDTO['endTime'] = $("input[name='slotTime']:checked").attr('slotedTime');
	meetingSlotDTO['timezone'] = $('#countryTimezoneId option:selected').attr('custom_timezone_id');
	meetingSlotDTO['timeZoneCheck'] = $('#countryTimezoneId').val().trim();
	meetingSlotDTO['meetingType'] = "STUDENT_DOUBT_SESSION";
	meetingSlotDTO['subjectId'] = $("#subjectId").val().trim();
	meetingSlotDTO['standardId'] = $('#'+formId+' #subjectId option:selected').attr('data-standardId');
	meetingSlotDTO['studentStandardId'] = $('#'+formId+' #subjectId option:selected').attr('data-studentStandardId');
	meetingSlotDTO['studentSessionId'] = $('#'+formId+' #subjectId option:selected').attr('data-studentSessionId');
	meetingSlotDTO['providerId'] = $('#'+formId+' #subjectId option:selected').attr('data-providerId');
	
	meetingSlotDTO['planId'] = $('#'+formId+' #subjectId option:selected').attr('data-planid');
	
	requestData['meetingSlotDTO'] = meetingSlotDTO;
	authentication['hash'] = getHash();authentication['schoolId'] = SCHOOL_ID;authentication['schoolUUID'] = SCHOOL_UUID;
	authentication['userType'] = moduleId;
	authentication['userId'] = $("#userId").val().trim();
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	return request;
}

function weekCount(year, month_number) {
    // month_number is in the range 1..12
    var firstOfMonth = new Date(year, month_number-1, 1);
    var lastOfMonth = new Date(2020, month_number, 0);
    var used = firstOfMonth.getDay() + lastOfMonth.getDate();
    return Math.ceil( used / 7);
}

function callSubjectByGradeAndTeacherId(formId, standardId, batchId, toElementId, teacherId) {
	console.log('callSubjectByGradeAndTeacherId theme1');
	hideMessage('');
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForCommon('masters'),
		data : JSON.stringify(getRequestForMaster(formId, 'SUBJECT-LIST-BY-GRADE-TEACHER-ID', standardId, teacherId, batchId)),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		async: false,
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				showMessage(true, data['message']);
			} else {
				console.log("Response Data  "+data)
				buildDropdown(data['mastersData']['subject'], $("#"+formId+" #"+toElementId), 'Select course');
			}
		},
		error : function(e) {
			console.log(e);
		//	showMessage(true, e.responseText);
			//$("#"+formId+" #pastTaughtSubjectId").prop("disabled", false);
		}
	});
}

function validateRequestForSubmitMeetingForStudentSessionSlots(formId,moduleId,controllType){
//	if(controllType=='ADD'){
//		if($('#standardId').val().trim()==0 || $('#standardId').val().trim()==undefined){
//			showMessage(true, 'Grade is required');
//			return false;
//		}
//		if($('#subjectId').val().trim()==0 || $('#subjectId').val().trim()==undefined){
//			showMessage(true, 'Course is required');
//			return false;
//		}
//		if($('#countryTimezoneId').val().trim()==0 || $('#countryTimezoneId').val().trim()==undefined){
//			showMessage(true, 'Time-Zone is required');
//			return false;
//		}
//		if($('#weekPickerId').val().trim()==0 || $('#weekPickerId').val().trim()==undefined){
//			showMessage(true, 'Meeting week is required');
//			return false;
//		}
//		if($('#meetingDate').val().trim()=='' || $('#meetingDate').val().trim()==undefined){
//			showMessage(true, 'Meeting Date is required');
//			return false;
//		}
//		if($('#startTime').val().trim()=='' || $('#startTime').val().trim()==undefined){
//			showMessage(true, 'Start Time is required');
//			return false;
//		}
//		if($('#timeInterval').val().trim()==0 || $('#timeInterval').val().trim()==undefined){
//			showMessage(true, 'Time Interval is required');
//			return false;
//		}
////		var selDate=$('#meetingDate').val().split('-');
////	    var selTime = $('#startTime').val().split(':');
////	    var selectedDate = new Date(selDate[2],selDate[0]-1,selDate[1], selTime[0],selTime[1]);
////	    var currentDate=new Date();
////	    //var currentDate = new Date(curDate.getFullYear(), curDate.getMonth(), curDate.getDate())
////	    console.log('selectedDate=>'+selectedDate.getTime()+' currentDate=>'+currentDate.getTime())
////	    if(selectedDate.getTime()<=currentDate.getTime()){
////	    	showMessage(true, 'Please create future meeting slots'); 
////	    	return false;
////	    }
//	}else
		if(controllType=='UPDATE'){
		if($('#meetingResult').val().trim()=='' || $('#meetingResult').val().trim()==undefined){
			showMessage(true, 'Session Status is required');
			return false;
		}
	}else if(controllType=='ADDURL'){
		if($('#meetingUrl').val().trim()=='' || $('#meetingUrl').val().trim()==undefined){
			showMessage(true, 'Session Link is required');
			return false;
		}
	}
	return true;
}
function validateRequestForRequestDemoMeetingSlots(formId,moduleId){
	if($('#weekCount').val()=='' || $('#weekCount').val()==undefined){
		showMessage(true, 'Session Type is required');
		return false;
	}
	if($('#countryTimezoneId').val()==0 || $('#countryTimezoneId').val()==undefined){
		showMessage(true, 'Country Timezone is required');
		return false;
	}
	if($('#dateCategory').val()=='' || $('#dateCategory').val()==undefined){
		showMessage(true, 'Session Type  is required');
		return false;
	}
	if($('#meetingDateFrom').val()=='' || $('#meetingDateFrom').val()==undefined){
		showMessage(true, 'Session Date From is required');
		return false;
	}
	if($('#meetingDateTo').val()=='' || $('#meetingDateTo').val()==undefined){
		showMessage(true, 'Session Date to is required');
		return false;
	}
	if(new Date($('#meetingDateFrom').val()) > new Date($('#meetingDateTo').val()))
	{//compare end <=, not >=
		showMessage(true, 'From date is less than To date');
		return false;
	}
	if($('#timeHrsFrom').val()=='' || $('#timeHrsFrom').val()==undefined){
		showMessage(true, 'Session time is required');
		return false;
	}
	if($('#timeMinFrom').val()=='' || $('#timeMinFrom').val()==undefined){
		showMessage(true, 'Session time is required');
		return false;
	}
	if($('#timeHrsTo').val()=='' || $('#timeHrsTo').val()==undefined){
		showMessage(true, 'Session time is required');
		return false;
	}
	if($('#timeMinTo').val()=='' || $('#timeMinTo').val()==undefined){
		showMessage(true, 'Session time is required');
		return false;
	}
	if($('#timeInterval').val()==0 || $('#timeInterval').val()==undefined){
		showMessage(true, 'Time Interval is required');
		return false;
	}

return true;
}
function getRequestForRequestDemoMeetingSlots(formId, requestType){
	var request = {};
	var authentication = {};
	var requestData = {};
	var meetingSlotDTO = {};

	meetingSlotDTO['weekCount'] = $("#"+formId+" #weekCount").val().trim();
	meetingSlotDTO['inActDate'] = $("#"+formId+" #inActDate").val().trim();
	meetingSlotDTO['timezone'] = $("#"+formId+" #countryTimezoneId option:selected").attr('custom_timezone_id');
	meetingSlotDTO['timeZoneCheck'] = $("#"+formId+" #countryTimezoneId option:selected").val().trim();
	meetingSlotDTO['dateCategory'] = $("#"+formId+" #dateCategory").val().trim();
	meetingSlotDTO['startDate'] = $("#"+formId+" #meetingDateFrom").val().trim();
	meetingSlotDTO['endDate'] = $("#"+formId+" #meetingDateTo").val().trim();
	meetingSlotDTO['timeHrsFrom'] = $("#"+formId+" #timeHrsFrom").val().trim();
	meetingSlotDTO['timeMinFrom'] = $("#"+formId+" #timeMinFrom").val().trim();
	meetingSlotDTO['timeHrsTo'] = $("#"+formId+" #timeHrsTo").val().trim();
	meetingSlotDTO['timeMinTo'] = $("#"+formId+" #timeMinTo").val().trim();
	meetingSlotDTO['timeInterval'] = $("#"+formId+" #timeInterval").val().trim();
	meetingSlotDTO['userId'] = $("#"+formId+" #userId").val().trim();
	meetingSlotDTO['meetingType'] = requestType;

	requestData['meetingSlotDTO'] = meetingSlotDTO;
	authentication['hash'] = getHash();authentication['schoolId'] = SCHOOL_ID;authentication['schoolUUID'] = SCHOOL_UUID;
	authentication['userType'] = 'SCHOOL';
	authentication['userId'] = $("#"+formId+" #userId").val().trim();
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	return request;
	}
function calendarRequestMeetingSlots(formId, moduleId, controlType, replaceId, requestType) {

	hideMessage('');
	if(!validateRequestForRequestDemoMeetingSlots(formId, moduleId)){
		return false;
	}

	$.ajax({
		type : "POST",
		url : getURLForHTML('dashboard','meeting-dates-slots'),
		data : encodeURI( "request="+ JSON.stringify(getRequestForRequestDemoMeetingSlots(formId, requestType))),
		dataType : 'html',
		cache : false,
		async: false,
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
	    			}
	    		} else {
	    			$('#listSlots').hide();
	    			$('.meetingGetSlotSave').hide();
	    			$('.meetingSave').show();
	    			$('#back').show();
	    			$('#'+replaceId).html(htmlContent)
	    		}
	    		return false;
			}
		},
		error : function(e) {
			//showMessage(true, e.responseText);
			return false;
		}
	});
	}

function submitMeetingForStudentSessionSlots(formId,moduleId,controllType,roleModuleId, requestType) {
	hideMessage('');
	if(!validateRequestForSubmitMeetingForStudentSessionSlots(formId,moduleId,controllType)){
		return true;
	}
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLFor('dashboard','meetingslots-new-submit'),
		data : JSON.stringify(getRequestForSubmitMeetingForStudentSessionSlots(formId, moduleId,controllType, requestType)),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				showMessage(true, data['message']);
			} else {
				showMessage(false, data['message']);
				if(requestType=='COUNSELORMEET'){
					if("ADD"==controllType){
						showMessage(false, data['message']);
						$('#teacherMeetingSlotsModal').modal('toggle');
						$('#'+formId)[0].reset();
						setTimeout(function(){ callDashboardPageSchool(roleModuleId, 'counselor-meet-slot','','?moduleId='+roleModuleId+'&requestType='+requestType); }, 1000);
					}else if("EDIT"==controllType){
						showMessage(false, data['message']);
						$('#'+formId)[0].reset();
						setTimeout(function(){ callDashboardPageSchool(roleModuleId, 'counselor-meet-slot','','?moduleId='+roleModuleId+'&requestType='+requestType); }, 1000);
					}
					$('body').removeClass('modal-open');
				}else if(requestType=='REQUESTDEMO'){
					if("ADD"==controllType){
						showMessage(false, data['message']);
						$('#teacherMeetingSlotsModal').modal('toggle');
						$('#'+formId)[0].reset();
						setTimeout(function(){ callDashboardPageSchool(roleModuleId, 'student-meet-slot','','?moduleId='+roleModuleId+'&requestType='+requestType); }, 1000);
					}else if("EDIT"==controllType){
						showMessage(false, data['message']);
						$('#'+formId)[0].reset();
						setTimeout(function(){ callDashboardPageSchool(roleModuleId, 'student-meet-slot','','?moduleId='+roleModuleId+'&requestType='+requestType); }, 1000);
					}
					$('body').removeClass('modal-open');
				}else if(requestType=='SBSBINTERVIEWSLOT'){
					if("ADD"==controllType){
						showMessage(false, data['message']);
						$('#teacherMeetingSlotsModal').modal('toggle');
						$('#'+formId)[0].reset();
						setTimeout(function(){ callDashboardPageSchool(roleModuleId, 'interview-slot-creation','','?moduleId='+roleModuleId+'&requestType='+requestType); }, 1000);
					}else if("EDIT"==controllType){
						showMessage(false, data['message']);
						$('#'+formId)[0].reset();
						setTimeout(function(){ callDashboardPageSchool(roleModuleId, 'interview-slot-creation','','?moduleId='+roleModuleId+'&requestType='+requestType); }, 1000);
					}			
				}else{
					if(controllType=='ADD'){
						$('#teacherMeetingSlotsModal').modal('toggle');
						$('#'+formId)[0].reset();
						setTimeout(function(){ callDashboardPageSchool(roleModuleId,'create-manage-sessions',''); }, 1000);
					}
					else if(controllType=='UPDATE'){
						$('#updateMeetingResultModal').modal('toggle');
						$('#'+formId)[0].reset();
						if(moduleId=='SCHOOL'){
							setTimeout(function(){ callDashboardPageSchool(roleModuleId,'student-teacher-sessions'); }, 1000);
						}else {
							setTimeout(function(){ callDashboardPageSchool(roleModuleId,'create-manage-sessions',''); }, 1000);
						}
					}else if(controllType=='ADDURL'){
						$('#meetingUrlModal').modal('toggle');
						$('#'+formId)[0].reset();
						if(moduleId=='SCHOOL'){
							setTimeout(function(){ callDashboardPageSchool(roleModuleId,'student-teacher-sessions'); }, 1000);
						}else {
							setTimeout(function(){ callDashboardPageSchool(roleModuleId,'create-manage-sessions',''); }, 1000);
						}
					}else if(controllType=='SENDMAIL'){
						$('#sendMailModal').modal('toggle');
						$('#'+formId)[0].reset();
						if(moduleId=='SCHOOL'){
							setTimeout(function(){ callDashboardPageSchool(roleModuleId,'student-teacher-sessions'); }, 1000);
						}else {
							setTimeout(function(){ callDashboardPageSchool(roleModuleId,'create-manage-sessions',''); }, 1000);
						}
					}else if(controllType=='PUBLISH_RECORD'){
						$('#publishRecordModal').modal('toggle');
						$('#'+formId)[0].reset();
						if(moduleId=='SCHOOL'){
							setTimeout(function(){ callDashboardPageSchool(roleModuleId,'student-teacher-sessions'); }, 1000);
						}else {
							setTimeout(function(){ callDashboardPageTeacher(roleModuleId,'create-manage-sessions',''); }, 1000);
						}
					}else if(controllType=='REVOKE'){
						$('#revokeModal').modal('toggle');
						$('#'+formId)[0].reset();
						if(moduleId=='SCHOOL'){
							setTimeout(function(){ callDashboardPageSchool(roleModuleId,'student-teacher-sessions'); }, 1000);
						}else {
							setTimeout(function(){ callDashboardPageTeacher(roleModuleId,'create-manage-sessions',''); }, 1000);
						}
					}
				}
			}
			return false;
		}
	});
}
function getRequestForRequestDemoMeetingSlots(formId, requestType){
	var request = {};
	var authentication = {};
	var requestData = {};
	var meetingSlotDTO = {};

	meetingSlotDTO['weekCount'] = $("#"+formId+" #weekCount").val();
	meetingSlotDTO['inActDate'] = $("#"+formId+" #inActDate").val();
	meetingSlotDTO['timezone'] = $("#"+formId+" #timezone").val();
	meetingSlotDTO['timeZoneCheck'] = $("#"+formId+" #countryTimezoneId").val();
	meetingSlotDTO['dateCategory'] = $("#"+formId+" #dateCategory").val();
	meetingSlotDTO['startDate'] = $("#"+formId+" #meetingDateFrom").val();
	meetingSlotDTO['endDate'] = $("#"+formId+" #meetingDateTo").val();
	meetingSlotDTO['timeHrsFrom'] = $("#"+formId+" #timeHrsFrom").val();
	meetingSlotDTO['timeMinFrom'] = $("#"+formId+" #timeMinFrom").val();
	meetingSlotDTO['timeHrsTo'] = $("#"+formId+" #timeHrsTo").val();
	meetingSlotDTO['timeMinTo'] = $("#"+formId+" #timeMinTo").val();
	if("SBSBINTERVIEWSLOT"==requestType){
		meetingSlotDTO['bufferTime'] = $("#"+formId+" #buferTime option:selected").val();
		meetingSlotDTO['meetingLinkActive'] = $("#"+formId+" #meetingLinkActive option:selected").val();
		meetingSlotDTO['timeInterval'] = $("#"+formId+" #timeInterval option:selected").val();
	}else{
		meetingSlotDTO['timeInterval'] = $("#"+formId+" #timeInterval").val();
	}
	meetingSlotDTO['userId'] = $("#"+formId+" #userId").val();
	meetingSlotDTO['meetingType'] = requestType;

	requestData['meetingSlotDTO'] = meetingSlotDTO;
	authentication['hash'] = getHash();
	authentication['userType'] = 'SCHOOL';
	authentication['userId'] = $("#"+formId+" #userId").val();
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	return request;
	}
function getRequestForSubmitMeetingForStudentSessionSlots(formId,moduleId,controllType,requestType){
	var request = {};
	var authentication = {};
	var requestData = {};
	var dashboardCommonDTO = {}
	var meetingSlotDTOList = [];
	
	if(controllType=='ADD'){
//		meetingSlotDTO['meetingType'] = "STUDENT_DOUBT_SESSION";
//		
//		meetingSlotDTO['timezone'] = $('#countryTimezoneId option:selected').attr('custom_timezone_id');
//		meetingSlotDTO['timeZoneCheck'] = $('#countryTimezoneId').val().trim();
//		var meetDate = $("#"+formId+" #meetingDate").val().trim();
//		meetDate = meetDate.split("-");
//		meetingDate = meetDate[2]+"-"+meetDate[0]+"-"+meetDate[1];
//		
//		meetingSlotDTO['meetingDate'] = meetingDate;
//		
//		meetingSlotDTO['weekID'] = $("#"+formId+" #weekPickerId").val().trim();
//		var startTime = $("#"+formId+" #startTime").val().trim();
//		meetingSlotDTO['startTime'] = startTime;
//		
//		var interval = $("#"+formId+" #timeInterval option:selected").val().trim();
//		var endTime= new Date("2016/09/12 "+startTime+":00");
//		endTime.setMinutes(endTime.getMinutes() + parseInt(interval));
//		endTime = endTime.getHours()+":"+endTime.getMinutes();
//		
//		meetingSlotDTO['endTime'] = endTime;
//		meetingSlotDTO['subject'] = "STUDENT_DOUBT_SESSION";
//		meetingSlotDTO['status'] = "0";
		
		$(".slotDate").each(function(){
			var enabledTimeSlotsDTO = [];
			meetingSlotDTO = {};
			meetingSlotDTO['meetingType'] = requestType;//"STUDENT_DOUBT_SESSION";   
			meetingSlotDTO['timezone'] = $('#timeZoneId').val().trim();
			meetingSlotDTO['weekCount'] = $('#weekCount').val().trim();
			meetingSlotDTO['inActDate'] = $('#inActDate').val().trim();
			meetingSlotDTO['dateCategory'] = $('#dateCategory').val().trim();
			if("SBSBINTERVIEWSLOT"==requestType){
				meetingSlotDTO['bufferTime'] = $("#"+formId+" #buferTime option:selected").val();
				meetingSlotDTO['meetingLinkActive'] = $("#"+formId+" #meetingLinkActive option:selected").val();
			}
//			meetingSlotDTO['slotCtFor'] = $("#"+formId+" #slotCtFor").val();
			var meetDate = $(this).attr('data-text');
			meetDate = meetDate.split("-");
			meetingDate = meetDate[2]+"-"+meetDate[0]+"-"+meetDate[1];
			meetingSlotDTO['meetingDate'] = meetingDate;
			meetingSlotDTO['subject'] = requestType;
			
			$(".slotTime"+$(this).attr('id')).each(function(){
				enabledTimeSlots = {};
				enabledTimeSlots['dayTime1'] = $(this).attr("data-starttime");
				enabledTimeSlots['dayTime2'] = $(this).attr("data-endtime");
				enabledTimeSlotsDTO.push(enabledTimeSlots);
			});
			meetingSlotDTO['enabledTimeSlotsDTO'] = enabledTimeSlotsDTO;
			meetingSlotDTOList.push(meetingSlotDTO);
		});
	}else if(controllType=='UPDATE'){
		meetingSlotDTO = {};
		meetingSlotDTO['controllType'] = controllType;
		meetingSlotDTO['meetingType'] =requestType;
		meetingSlotDTO['meetingId'] =$("#"+formId+" #meetingId").val().trim();
		meetingSlotDTO['meetingResult'] = $("#"+formId+" #meetingResult option:selected").val().trim();
		meetingSlotDTO['userType'] =moduleId;
		meetingSlotDTOList.push(meetingSlotDTO);
	}else if(controllType=='ADDURL'){
		meetingSlotDTO = {};
		meetingSlotDTO['controllType'] = controllType;
		meetingSlotDTO['meetingType'] = requestType;
		meetingSlotDTO['meetingId'] =$("#"+formId+" #meetingId").val().trim();
		meetingSlotDTO['meetingUrl'] =$("#"+formId+" #meetingUrl").val().trim();
		meetingSlotDTO['urlRemarks'] =escapeCharacters($("#"+formId+" #remarks").val().trim());
		meetingSlotDTO['userType'] =moduleId;
		meetingSlotDTOList.push(meetingSlotDTO);
	}else if(controllType=='SENDMAIL'){
		meetingSlotDTO = {};
		meetingSlotDTO['controllType'] = controllType;
		meetingSlotDTO['meetingType'] = requestType;
		meetingSlotDTO['meetingId'] =$("#"+formId+" #meetingId").val().trim();
		meetingSlotDTO['userType'] =moduleId;
		meetingSlotDTOList.push(meetingSlotDTO);
	}else if(controllType=='PUBLISH_RECORD'){
		meetingSlotDTO = {};
		meetingSlotDTO['controllType'] = controllType;
		meetingSlotDTO['meetingType'] =requestType;
		meetingSlotDTO['meetingId'] =$("#"+formId+" #meetingId").val().trim();
		meetingSlotDTO['meetingStrId'] =$("#"+formId+" #meetingStrId").val().trim();
		meetingSlotDTO['userType'] =moduleId;
		meetingSlotDTOList.push(meetingSlotDTO);
	}else if(controllType=='REVOKE'){
		meetingSlotDTO = {};
		meetingSlotDTO['controllType'] = controllType;
		meetingSlotDTO['meetingType'] = requestType;
		meetingSlotDTO['meetingId'] =$("#"+formId+" #meetingId").val().trim();
		meetingSlotDTO['meetingStrId'] =$("#"+formId+" #meetingStrId").val().trim();
		meetingSlotDTO['userType'] =moduleId;
		meetingSlotDTOList.push(meetingSlotDTO);
	}
	
	dashboardCommonDTO['meetingSlotDTO']=meetingSlotDTOList;
	requestData['dashboardCommonDTO'] = dashboardCommonDTO;
	authentication['hash'] = getHash();authentication['schoolId'] = SCHOOL_ID;authentication['schoolUUID'] = SCHOOL_UUID;
	authentication['userType'] = moduleId;
	authentication['userId'] = $("#"+formId+" #userId").val().trim();
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	return request;
}
function createDate(formId, elementId, startDate, endDate){
	$('#'+formId+' #'+elementId).datepicker({
		autoclose : true,
		format: 'mm-dd-yyyy',
		todayHighlight : true,
		startDate:startDate,
		endDate:endDate
	});
}

function createDateNew(formId, elementId, seltDate){
	console.log("seltDate=> ", seltDate);
	$('#'+formId+' #'+elementId).datepicker({
		startDate : seltDate,
		autoclose : true,
		format: 'mm-dd-yyyy',
		todayHighlight : true,
	});
	$('#'+formId+' #'+elementId).datepicker().datepicker("setDate", seltDate);
}
function setStudentTecherSessionDate(formId, elementId, calenderId){
	 var stDate=$("#"+formId+" #weekPickerId option:selected").attr('custom_startDate');
	 var edDate=$("#"+formId+" #weekPickerId option:selected").attr('custom_endDate');
	 
	 var sDate=stDate.split("-");
	 var eDate=edDate.split("-");
	 
	 var sDate1 = new Date(sDate[0],sDate[1]-1,sDate[2]);
	 var currentDate = new Date();
	 var startDate='';
	 if(sDate1.getTime()>currentDate.getTime()){
		 startDate=sDate1;
	 }else{
//		 currentDate.setDate(currentDate.getDate() + 1);
		 startDate=currentDate;
	 }
	 var endDate=new Date(eDate[0],eDate[1]-1,eDate[2]);
	 createDate(formId, calenderId, startDate, endDate)
}
function callAssignStudentTeacher(formId,studentId, viewAssignStudentTeacher, assignStudentTeacher, viewAssignPastStudentTeacher, standardId) {
	hideMessage('');
	$.ajax({
		type : "POST",
		url : getURLForHTML('dashboard','assign-student-teacher'),
		data : "studentId="+studentId+"&viewAssignStudentTeacher="+viewAssignStudentTeacher+"&assignStudentTeacher="+assignStudentTeacher+"&viewAssignPastStudentTeacher="+viewAssignPastStudentTeacher+"&standardId="+standardId,
		dataType : 'html',
		cache : false,
		async: false,
		timeout : 600000,
		success : function(htmlContent) {
			if(htmlContent!=""){
            	var stringMessage = [];
            	stringMessage = htmlContent.split("|");
        		if(stringMessage[0] == "FAILED" || stringMessage[0] == "EXCEPTION" || stringMessage[0] == "SESSIONOUT" ){
        			showMessage(true, stringMessage[1]);
        		} else {
        			$('#studentAssighnTeacherSupportContent').html(htmlContent);
        		}
        		return false;
			}
		},
		error : function(e) {
			console.log(e)
		//	showMessage(true, TECHNICAL_GLITCH);
			return false;
		}
	});
}
function calendarDateMeeting(replaceId, startDate, slotType) {
	var inActDate = $("#inActDate").val().trim();
	$.ajax({
		type : "POST",
		url : getURLForHTML('dashboard','meeting-dates'),
		data : {startDate:startDate, slotType:slotType, disabledDate:inActDate},
		dataType : 'html',
		cache : false,
		async: false,
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
	    			}
	    		} else {
	    			$('#monthYear').html('');
	    			$('#'+replaceId).html(htmlContent);
	    		}
	    		return false;
			}
		},
		error : function(e) {
			//showMessage(true, e.responseText);
			return false;
		}
	});
}
function callAssignStudentTeacherContent(callFor){
	var studentId=$('#studentTeacherMappingModalLabel #studentId').html();
	var studentName=$('#studentTeacherMappingModalLabel #studentName').html();
	var standardId=$('#studentTeacherMappingModalLabel #standardId').html();
	$('#viewStudentTeacherTab').removeClass('active');
	$('#viewStudentTeacherTab').removeClass('inactive-tab');
	$('#assignStudentTeacherTab').removeClass('active');
	$('#assignStudentTeacherTab').removeClass('inactive-tab');
	$('#viewPastStudentTeacherTab').removeClass('active');
	$('#viewPastStudentTeacherTab').removeClass('inactive-tab');
	if(callFor=='view-assignStudentTeacher'){
		var controllType="new";
		$('#viewStudentTeacherTab').addClass('active');
		$('#assignStudentTeacherTab').addClass('inactive-tab');
		$('#viewPastStudentTeacherTab').addClass('inactive-tab');
		callForDashboardData('formIdIfAny','student-teacher-linking-content?studentId='+studentId+"&callFor="+callFor+"&standardId="+standardId+"&controllType="+controllType,'studentTeacherLinkingContent');
	}else if(callFor=='assignStudentTeacher'){
		var controllType="new";
		$('#viewStudentTeacherTab').addClass('inactive-tab');
		$('#assignStudentTeacherTab').addClass('active');
		$('#viewPastStudentTeacherTab').addClass('inactive-tab');
		callForDashboardData('formIdIfAny','student-teacher-linking-content?studentId='+studentId+"&callFor="+callFor+"&standardId="+standardId+"&controllType="+controllType,'studentTeacherLinkingContent');
	}else if(callFor=='view-assignPastStudentTeacher'){
		var controllType="old";
		$('#viewStudentTeacherTab').addClass('inactive-tab');
		$('#assignStudentTeacherTab').addClass('inactive-tab');
		$('#viewPastStudentTeacherTab').addClass('active');
		callForDashboardData('formIdIfAny','student-teacher-linking-content?studentId='+studentId+"&callFor="+callFor+"&standardId="+standardId+"&controllType="+controllType,'studentTeacherLinkingContent');
	}
}
function viewStudentTeacherMappingsLogs(studentId, subjectId,studentTeacherMappingId) {
	hideMessage('');
	$.ajax({
		type : "POST",
		url : getURLForHTML('dashboard','student-teacher-mapping-log-content'),
		data : "studentId="+studentId+"&subjectId="+subjectId+"&studentTeacherMappingId="+studentTeacherMappingId,
		dataType : 'html',
		cache : false,
		timeout : 600000,
		success : function(htmlContent) {
			if(htmlContent!=""){
            	var stringMessage = [];
            	stringMessage = htmlContent.split("|");
        		if(stringMessage[0] == "FAILED" || stringMessage[0] == "EXCEPTION" || stringMessage[0] == "SESSIONOUT" ){
        			showMessage(true, stringMessage[1]);
        		} else {
        			$('#studentTeacherMappingLogContent').html(htmlContent);
        		}
        		return false;
			}
		},
		error : function(e) {
			console.log(e)
		//	showMessage(true, TECHNICAL_GLITCH);
			return false;
		}
	});
}
function submitStudentTeacherAssign(formId,moduleId,subjectId,standardId,studentId,oldTeacherId,courseType) {
	hideMessage('');
	if(!validateRequestStudentTeacherAssign(formId,moduleId,subjectId)){
		$('#modalMessage').click(function(){
			setTimeout(function(){$('body').addClass('modal-open');},1000);
		});
		return false;
	}
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLFor('dashboard','student-teacher-assign-submit'),
		data : JSON.stringify(getRequestForStudentTeacherAssign(formId, moduleId,subjectId,standardId,studentId,oldTeacherId,courseType)),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				showMessage(true, data['message']);
			} else {
				//showMessage(false, data['message']);
//				callAssignStudentTeacherContent('view-assignStudentTeacher');
				showMessage(true, "Student-teacher enrollment updated successfully.");
//				$('body').addClass('modal-open');
			}
			return false;
		},
		error : function(e) {
		//	showMessage(true, e.responseText);
			return false;
		}
	});
}
function getRequestForStudentTeacherAssign(formId,moduleId,subjectId,standardId,studentId,oldTeacherId,courseType){
	var request = {};
	var authentication = {};
	var requestData = {};
	var studentTeacherSavedMappingDTOArray = [];
//	$("#assigTeacherLink tbody tr").each(function(){
		var  studentTeacherSavedMappingDTO={};
//		var subjectId= $(this).find("td.subjectIdcls").attr("data-subjectId");
//		var standardId= $(this).find("td.subjectIdcls").attr("data-standardId");
		var teacherId= $("#teacherId"+subjectId).val().trim();
		studentTeacherSavedMappingDTO['subjectId'] = subjectId;
		studentTeacherSavedMappingDTO['teacherId'] = teacherId;
		studentTeacherSavedMappingDTO['standardId'] = standardId;
		
		studentTeacherSavedMappingDTO['stdEnrollDate'] = $("#stdEnrollDate"+subjectId).val();
		studentTeacherSavedMappingDTO['steachEnrollStartDate'] = $("#steachEnrollStartDate"+subjectId).val();
		studentTeacherSavedMappingDTO['steachEnrollEndDate'] = $("#steachEnrollEndDate"+subjectId).val();
		if($("#steachAmount"+subjectId).val()==undefined){
			studentTeacherSavedMappingDTO['amount'] = 0;
		}else{
			studentTeacherSavedMappingDTO['amount'] = $("#steachAmount"+subjectId).val();
		}
		if($("#steachEnrollEndDate"+subjectId).val().trim()!=''){
			if($("#reasonEnrollEnd"+subjectId).val().trim()==''){
				showMessage(true, 'Reason for ending enrollment is required.');
				return false;
			}
			studentTeacherSavedMappingDTO['reasonEnrollEnd'] = $("#reasonEnrollEnd"+subjectId).val();
			if($("#reasonEnrollEnd"+subjectId).val().trim()=='Other'){
				if($("#otherReason"+subjectId).val().trim()==''){
					showMessage(true, 'Reason for ending enrollment is required');
					return false;
				}
				studentTeacherSavedMappingDTO['otherReason'] = $("#otherReason"+subjectId).val().trim();
			}
		}
		
		studentTeacherSavedMappingDTO['studentId'] = studentId;//$(this).find("td.subjectIdcls").attr("data-studentId");
		studentTeacherSavedMappingDTO['oldTeacherId'] =oldTeacherId; //$(this).find("td.subjectIdcls").attr("data-assignId");
		studentTeacherSavedMappingDTO['courseType'] = courseType; //$(this).find("td.subjectIdcls").attr("data-courseType");
		studentTeacherSavedMappingDTOArray.push(studentTeacherSavedMappingDTO);
//	});
	
	requestData['studentTeacherSavedMappingDTO'] = studentTeacherSavedMappingDTOArray;
	authentication['hash'] = getHash();authentication['schoolId'] = SCHOOL_ID;authentication['schoolUUID'] = SCHOOL_UUID;
	authentication['userType'] = moduleId;
	authentication['userId'] = $("#"+formId+" #userId").val();
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	return request;
}

function validateRequestStudentTeacherAssign(formId,moduleId,subjectId){
	var errorInt =0;
//		$("#assigTeacherLink tbody tr").each(function(){
		var  studentTeacherSavedMappingDTO={};
//		var subjectId= $(this).find("td.subjectIdcls").attr("data-subjectId");
		var teacherId= $("#teacherId"+subjectId).val().trim();
		if(teacherId!=0 ){
			if($("#stdEnrollDate"+subjectId).val().trim()==''){
				errorInt = 1;
			}
			if($("#steachEnrollStartDate"+subjectId).val().trim()==''){
				errorInt = 2;
			}
			if($("#steachEnrollEndDate"+subjectId).val().trim()!=''){
				if($("#reasonEnrollEnd"+subjectId).val().trim()==''){
					errorInt = 3;
				}
				if($("#reasonEnrollEnd"+subjectId).val().trim()=='Other'){
					if($("#otherReason"+subjectId).val().trim()==''){
						errorInt = 4;
					}
				}
			}
			if($("#steachEnrollStartDate"+subjectId).val().trim()!='' && $("#steachEnrollEndDate"+subjectId).val().trim()!='' ){
				var stDate = $("#steachEnrollStartDate"+subjectId).val().split('-');
				var edDate = $("#steachEnrollEndDate"+subjectId).val().split('-');
				var startTime = new Date(stDate[2], stDate[0]-1, stDate[1]).getTime();
				var endTime = new Date(edDate[2], edDate[0]-1, edDate[1]).getTime();
				
				if(startTime > endTime){
					errorInt = 5;
				}
			}else if($("#steachEnrollEndDate"+subjectId).val().trim()==''){
				if($("#reasonEnrollEnd"+subjectId).val().trim()!=''){
					errorInt =6;
				}
			}
		}
		
//	});
	
	if(errorInt==1){
		showMessage(true, 'Student enroll date is required');
		return false;
	}
	if(errorInt==2){
		showMessage(true, 'Student-Teacher enroll start date is required');
		return false;
	}
	if(errorInt==3){
		showMessage(true, 'Reason for ending enrollment is required.');
		return false;
	}
	if(errorInt==4){
		showMessage(true, 'Reason for ending enrollment is required.');
		return false;
	}
	if(errorInt==5){
		showMessage(true, 'Student-Teacher enrollment start date must be less than Student-Teacher enrollment end date.');
		return false;
	}
	if(errorInt==6){
		showMessage(true, 'Student-Teacher enrollment end date is required.');
		return false;
	}
	return true;
}

function validateRequestForSubmitMeetingSlots(formId,moduleId,controllType){
	if(controllType=='ADD'){
		
		if($('#countryTimezoneId').val().trim()==0 || $('#countryTimezoneId').val().trim()==undefined){
			showMessage(true, 'Time-Zone is required');
			return false;
		}
		if($('#weekPickerId').val().trim()==0 || $('#weekPickerId').val().trim()==undefined){
			showMessage(true, 'Meeting week is required');
			return false;
		}
		if($('#meetingDate').val().trim()=='' || $('#meetingDate').val().trim()==undefined){
			showMessage(true, 'Meeting Date is required');
			return false;
		}
		if($('#startTime').val().trim()=='' || $('#startTime').val().trim()==undefined){
			showMessage(true, 'Start Time is required');
			return false;
		}
		if($('#timeInterval').val().trim()==0 || $('#timeInterval').val().trim()==undefined){
			showMessage(true, 'Time Interval is required');
			return false;
		}
	}else if(controllType=='UPDATE'){
		if($('#meetingResult').val().trim()=='' || $('#meetingResult').val().trim()==undefined){
			showMessage(true, 'Meeting Result is required');
			return false;
		}
	}else if(controllType=='ADDURL'){
		if($('#meetingUrl').val().trim()=='' || $('#meetingUrl').val().trim()==undefined){
			showMessage(true, 'Meeting Link is required');
			return false;
		}
	}
	return true;
}

function submitMeetingForSlots(formId,moduleId,controllType) {
	hideMessage('');
	$.ajax({
		type : "POST",
		url : getURLForHTML('dashboard','student-teacher-mapping-log-content'),
		data : "studentId="+studentId+"&subjectId="+subjectId+"&studentTeacherMappingId="+studentTeacherMappingId,
		dataType : 'html',
		cache : false,
		timeout : 600000,
		success : function(htmlContent) {
			if(htmlContent!=""){
            	var stringMessage = [];
            	stringMessage = htmlContent.split("|");
        		if(stringMessage[0] == "FAILED" || stringMessage[0] == "EXCEPTION" || stringMessage[0] == "SESSIONOUT" ){
        			showMessage(true, stringMessage[1]);
        		} else {
        			$('#studentTeacherMappingLogContent').html(htmlContent);
        		}
        		return false;
			}
		},
		error : function(e) {
			console.log(e)
		//	showMessage(true, TECHNICAL_GLITCH);
			return false;
		}
	});
}

function getRequestForSubmitMeetingSlots(formId,moduleId,controllType){
	var request = {};
	var authentication = {};
	var requestData = {};
	var meetingSlotDTO = {};
	
	if(controllType=='ADD'){
		meetingSlotDTO['meetingType'] = "STUDENT_DOUBT_SESSION";
		
		meetingSlotDTO['timezone'] = $('#countryTimezoneId option:selected').attr('custom_timezone_id');
		meetingSlotDTO['timeZoneCheck'] = $('#countryTimezoneId').val().trim();
		meetingSlotDTO['slotType'] = $('#meetingCategory1').val().trim();
		
		var meetDate = $("#"+formId+" #meetingDate").val().trim();
		meetDate = meetDate.split("-");
		meetingDate = meetDate[2]+"-"+meetDate[0]+"-"+meetDate[1];
		
		meetingSlotDTO['meetingDate'] = meetingDate;
		
		meetingSlotDTO['weekID'] = $("#"+formId+" #weekPickerId").val().trim();
		var startTime = $("#"+formId+" #startTime").val().trim();
		meetingSlotDTO['startTime'] = startTime;
		
		var interval = $("#"+formId+" #timeInterval option:selected").val().trim();
		var endTime= new Date("2016/09/12 "+startTime+":00");
		endTime.setMinutes(endTime.getMinutes() + parseInt(interval));
		endTime = endTime.getHours()+":"+endTime.getMinutes();
		
		meetingSlotDTO['endTime'] = endTime;
		meetingSlotDTO['subject'] = "STUDENT_DOUBT_SESSION";
		meetingSlotDTO['status'] = "0";
	}else if(controllType=='UPDATE'){
		meetingSlotDTO['controllType'] = controllType;
		meetingSlotDTO['meetingType'] = "STUDENT_DOUBT_SESSION";
		meetingSlotDTO['meetingId'] =$("#"+formId+" #meetingId").val().trim();
		meetingSlotDTO['meetingResult'] = $("#"+formId+" #meetingResult option:selected").val().trim();
	}else if(controllType=='ADDURL'){
		meetingSlotDTO['controllType'] = controllType;
		meetingSlotDTO['meetingType'] = "STUDENT_DOUBT_SESSION";
		meetingSlotDTO['meetingId'] =$("#"+formId+" #meetingId").val().trim();
		meetingSlotDTO['meetingUrl'] =$("#"+formId+" #meetingUrl").val().trim();
	}else if(controllType=='SENDMAIL'){
		meetingSlotDTO['controllType'] = controllType;
		meetingSlotDTO['meetingType'] = "STUDENT_DOUBT_SESSION";
		meetingSlotDTO['meetingId'] =$("#"+formId+" #meetingId").val().trim();
	}
	
	requestData['meetingSlotDTO'] = meetingSlotDTO;
	authentication['hash'] = getHash();authentication['schoolId'] = SCHOOL_ID;authentication['schoolUUID'] = SCHOOL_UUID;
	authentication['userType'] = moduleId;
	authentication['userId'] = $("#"+formId+" #userId").val().trim();
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	return request;
}


function viewStudentTeacherMappingsSendMail(studentTeacherMappingId) {
	hideMessage('');
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLFor('dashboard','student-teacher-assign-send-mail'),
		data : JSON.stringify(getRequestForStudentTeacherMailSend(studentTeacherMappingId)),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				showMessage(true, data['message']);
			} else {
				showMessage(false, data['message']);
				callAssignStudentTeacherContent('view-assignStudentTeacher');
				$('#modalMessage').click(function(){
					setTimeout(function(){$('body').addClass('modal-open');},1000);
				});
			}
			return false;
		},
		error : function(e) {
		//	showMessage(true, e.responseText);
			return false;
		}
	});
}
function getRequestForStudentTeacherMailSend(studentTeacherMappingId){
	var request = {};
	var authentication = {};
	var requestData = {};
	
	requestData['studentTeacherMappingId'] = studentTeacherMappingId;
	authentication['hash'] = getHash();authentication['schoolId'] = SCHOOL_ID;authentication['schoolUUID'] = SCHOOL_UUID;
	authentication['userType'] = moduleId;
	authentication['userId'] = $("#userId").val().trim();
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	return request;
}


function getTeacherCompensationStandard(formId, elementId, teacherId, standardId){
	 $.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForCommon('masters'),
		data : JSON.stringify(getRequestForMaster('formId', 'TEACHER-COMPENSATION-LIST',teacherId, standardId)),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		async: false,
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				showMessage(true, data['message']);
			} else {
				var data = data['mastersData']['teacherCompensationDTO'];         
		        console.log('teacherCompensationDTO main: '+data.amountInr);
		        if(data.amountInr==null && data.amountUsd==null){
		        	showMessage(true, "Please set teacher compensation");
		        	return;
		        }
		        if(data.amountInr==0){
		        	$("#"+elementId).val(data.amountUsd).trim();
		        }
		        if(data.amountUsd==0){
		        	$("#"+elementId).val(data.amountInr).trim();
		        }
		        
			}
			return false;
		},
		error : function(e) {
			//showMessage(true, e.responseText);
		}
	});
}

