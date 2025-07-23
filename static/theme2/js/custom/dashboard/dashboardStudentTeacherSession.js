$(document).ready(function() {
	
});

function meetingSlotModal(){
	
	console.log("hello meetingSlotModal");
	callLocationAndSelectTimeZoneSession('teacherMeetingSlotsForm');
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

function meetingResultModal(meetingId, userId, meetingresult){
	$('#updateMeetingResultModal').modal('show');
	$('#updateMeetingResultForm #userId').val(userId);
	$('#updateMeetingResultForm #meetingId').val(meetingId);
	if(meetingresult=='N/A'){
		$('#updateMeetingResultForm #meetingResult').val($('#updateMeetingResultForm #meetingResult option:selected').text());
	}else{
		$('#updateMeetingResultForm #meetingResult').val(meetingresult);
	}
}

function bookingSlotModal(subjectId, roleModuleId, themeType){
	
	if(themeType=='theme2'){
		$.ajax({
			type : "POST",
			url : getURLForHTML('dashboard','student-subject-session-booking'),
			data : "subjectId="+subjectId+"&moduleId="+roleModuleId,
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
	        				showMessageTheme2(0, stringMessage[1], '', false);
	        			}
	        		} else {
	        			$('#bookASession').html(htmlContent);
	        			$("#studentBookingSlotsModal  #course").show();
	        			$('#studentBookingSlotsModal').modal('show');
	        		}
				}
			},
			error : function(e) {
				//showMessage(true, TECHNICAL_GLITCH);
			}
		});
	}else{
		$("#course").show();
		$('#studentBookingSlotsModal').modal('show');
	}
	
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
	$('#meetingUrlForm #meetingId').val(meetingId);
	$('#meetingUrlForm #userId').val(userId);
	$('#meetingUrlForm #meetingUrl').val(meetingUrl);
	$('#meetingUrlForm #remarks').val(urlRemarks);
	$('#meetingUrlForm #mailSendStatus').val(mailSendStatus);
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

function validateStudentSlots(formId){
	var countryTimezone="";
	var subjectId="";
	var teacherId="";
	var providerId="";
	var standardId="";
	if($('#countryTimezoneId option:selected').val()!=null && $('#countryTimezoneId option:selected').val()!='0'){
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
		showMessageTheme2(0, 'Time-Zone is required', '', false);
		return false;
	}
	if($('#subjectId').val()==0 || $('#subjectId').val()==undefined){
		showMessageTheme2(0, 'Course is required', '', false);
		return false;
	}
	if($("input[name='slotTime']:checked").val()==undefined){
		showMessageTheme2(0, 'Please select any one Slot.', '', false);
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
				showMessageTheme2(0, data['message'], '', false);
			} else {
				showMessageTheme2(1, data['message'], '', false);
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
	meetingSlotDTO['timeZoneCheck'] = $('#countryTimezoneId').val();
	meetingSlotDTO['meetingType'] = "STUDENT_DOUBT_SESSION";
	meetingSlotDTO['subjectId'] = $("#subjectId").val();
	meetingSlotDTO['standardId'] = $('#'+formId+' #subjectId option:selected').attr('data-standardId');
	meetingSlotDTO['studentStandardId'] = $('#'+formId+' #subjectId option:selected').attr('data-studentStandardId');
	meetingSlotDTO['studentSessionId'] = $('#'+formId+' #subjectId option:selected').attr('data-studentSessionId');
	meetingSlotDTO['providerId'] = $('#'+formId+' #subjectId option:selected').attr('data-providerId');
	
	meetingSlotDTO['planId'] = $('#'+formId+' #subjectId option:selected').attr('data-planid');
	
	requestData['meetingSlotDTO'] = meetingSlotDTO;
	authentication['hash'] = getHash();authentication['schoolId'] = SCHOOL_ID;authentication['schoolUUID'] = SCHOOL_UUID;
	authentication['userType'] = moduleId;
	authentication['userId'] = $("#userId").val();
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
	console.log('callSubjectByGradeAndTeacherId theme2');
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
//		if($('#standardId').val()==0 || $('#standardId').val()==undefined){
//			showMessage(true, 'Grade is required');
//			return false;
//		}
//		if($('#subjectId').val()==0 || $('#subjectId').val()==undefined){
//			showMessage(true, 'Course is required');
//			return false;
//		}
//		if($('#countryTimezoneId').val()==0 || $('#countryTimezoneId').val()==undefined){
//			showMessage(true, 'Time-Zone is required');
//			return false;
//		}
//		if($('#weekPickerId').val()==0 || $('#weekPickerId').val()==undefined){
//			showMessage(true, 'Meeting week is required');
//			return false;
//		}
//		if($('#meetingDate').val()=='' || $('#meetingDate').val()==undefined){
//			showMessage(true, 'Meeting Date is required');
//			return false;
//		}
//		if($('#startTime').val()=='' || $('#startTime').val()==undefined){
//			showMessage(true, 'Start Time is required');
//			return false;
//		}
//		if($('#timeInterval').val()==0 || $('#timeInterval').val()==undefined){
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
		if($('#meetingResult').val()=='' || $('#meetingResult').val()==undefined){
			showMessage(true, 'Session Status is required');
			return false;
		}
	}else if(controllType=='ADDURL'){
		if($('#meetingUrl').val()=='' || $('#meetingUrl').val()==undefined){
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

	meetingSlotDTO['weekCount'] = $("#"+formId+" #weekCount").val();
	meetingSlotDTO['inActDate'] = $("#"+formId+" #inActDate").val();
	meetingSlotDTO['timezone'] = $("#"+formId+" #countryTimezoneId option:selected").attr('custom_timezone_id');
	meetingSlotDTO['timeZoneCheck'] = $("#"+formId+" #countryTimezoneId option:selected").val();
	meetingSlotDTO['dateCategory'] = $("#"+formId+" #dateCategory").val();
	meetingSlotDTO['startDate'] = $("#"+formId+" #meetingDateFrom").val();
	meetingSlotDTO['endDate'] = $("#"+formId+" #meetingDateTo").val();
	meetingSlotDTO['timeHrsFrom'] = $("#"+formId+" #timeHrsFrom").val();
	meetingSlotDTO['timeMinFrom'] = $("#"+formId+" #timeMinFrom").val();
	meetingSlotDTO['timeHrsTo'] = $("#"+formId+" #timeHrsTo").val();
	meetingSlotDTO['timeMinTo'] = $("#"+formId+" #timeMinTo").val();
	meetingSlotDTO['timeInterval'] = $("#"+formId+" #timeInterval").val();
	meetingSlotDTO['userId'] = $("#"+formId+" #userId").val();
	meetingSlotDTO['meetingType'] = requestType;

	requestData['meetingSlotDTO'] = meetingSlotDTO;
	authentication['hash'] = getHash();authentication['schoolId'] = SCHOOL_ID;authentication['schoolUUID'] = SCHOOL_UUID;
	authentication['userType'] = 'SCHOOL';
	authentication['userId'] = $("#"+formId+" #userId").val();
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
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				showMessage(true, data['message']);
			} else {
				showMessage(false, data['message']);
				$('.modal-backdrop').remove();
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
					}
				}
			}
			return false;
		}
	});
}

function getRequestForSubmitMeetingForStudentSessionSlots(formId,moduleId,controllType, requestType){
	var request = {};
	var authentication = {};
	var requestData = {};
	var dashboardCommonDTO = {}
	var meetingSlotDTOList = [];
	
	if(controllType=='ADD'){
//		meetingSlotDTO['meetingType'] = "STUDENT_DOUBT_SESSION";
//		
//		meetingSlotDTO['timezone'] = $('#countryTimezoneId option:selected').attr('custom_timezone_id');
//		meetingSlotDTO['timeZoneCheck'] = $('#countryTimezoneId').val();
//		var meetDate = $("#"+formId+" #meetingDate").val();
//		meetDate = meetDate.split("-");
//		meetingDate = meetDate[2]+"-"+meetDate[0]+"-"+meetDate[1];
//		
//		meetingSlotDTO['meetingDate'] = meetingDate;
//		
//		meetingSlotDTO['weekID'] = $("#"+formId+" #weekPickerId").val();
//		var startTime = $("#"+formId+" #startTime").val();
//		meetingSlotDTO['startTime'] = startTime;
//		
//		var interval = $("#"+formId+" #timeInterval option:selected").val();
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
			meetingSlotDTO['timezone'] = $('#timeZoneId').val();
			meetingSlotDTO['weekCount'] = $('#weekCount').val();
			meetingSlotDTO['inActDate'] = $('#inActDate').val();
			meetingSlotDTO['dateCategory'] = $('#dateCategory').val();
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
		meetingSlotDTO['meetingType'] = "STUDENT_DOUBT_SESSION";
		meetingSlotDTO['meetingId'] =$("#"+formId+" #meetingId").val();
		meetingSlotDTO['meetingResult'] = $("#"+formId+" #meetingResult option:selected").val();
		meetingSlotDTO['userType'] =moduleId;
		meetingSlotDTOList.push(meetingSlotDTO);
	}else if(controllType=='ADDURL'){
		meetingSlotDTO = {};
		meetingSlotDTO['controllType'] = controllType;
		meetingSlotDTO['meetingType'] = "STUDENT_DOUBT_SESSION";
		meetingSlotDTO['meetingId'] =$("#"+formId+" #meetingId").val();
		meetingSlotDTO['meetingUrl'] =$("#"+formId+" #meetingUrl").val();
		meetingSlotDTO['urlRemarks'] =escapeCharacters($("#"+formId+" #remarks").val());
		meetingSlotDTO['userType'] =moduleId;
		meetingSlotDTOList.push(meetingSlotDTO);
	}else if(controllType=='SENDMAIL'){
		meetingSlotDTO = {};
		meetingSlotDTO['controllType'] = controllType;
		meetingSlotDTO['meetingType'] = "STUDENT_DOUBT_SESSION";
		meetingSlotDTO['meetingId'] =$("#"+formId+" #meetingId").val();
		meetingSlotDTO['userType'] =moduleId;
		meetingSlotDTOList.push(meetingSlotDTO);
	}
	
	dashboardCommonDTO['meetingSlotDTO']=meetingSlotDTOList;
	requestData['dashboardCommonDTO'] = dashboardCommonDTO;
	authentication['hash'] = getHash();authentication['schoolId'] = SCHOOL_ID;authentication['schoolUUID'] = SCHOOL_UUID;
	authentication['userType'] = moduleId;
	authentication['userId'] = $("#"+formId+" #userId").val();
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
	var inActDate = $("#inActDate").val();
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
function submitStudentTeacherAssign(formId,moduleId) {
	hideMessage('');
//	if(!validateRequestStudentTeacherAssign(formId,moduleId)){
//		return false;
//	}
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLFor('dashboard','student-teacher-assign-submit'),
		data : JSON.stringify(getRequestForStudentTeacherAssign(formId, moduleId)),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				showMessage(true, data['message']);
			} else {
				//showMessage(false, data['message']);
				callAssignStudentTeacherContent('view-assignStudentTeacher');
			}
			return false;
		},
		error : function(e) {
		//	showMessage(true, e.responseText);
			return false;
		}
	});
}
function getRequestForStudentTeacherAssign(formId,moduleId){
	var request = {};
	var authentication = {};
	var requestData = {};
	var studentTeacherSavedMappingDTOArray = [];
	
	$("#assigTeacherLink tbody tr").each(function(){
		var  studentTeacherSavedMappingDTO={};
		var subjectId= $(this).find("td.subjectIdcls").attr("data-subjectId");
		var standardId= $(this).find("td.subjectIdcls").attr("data-standardId");
		var teacherId= $(this).find("#teacherId"+subjectId).val();
		studentTeacherSavedMappingDTO['subjectId'] = subjectId;
		studentTeacherSavedMappingDTO['teacherId'] = teacherId;
		studentTeacherSavedMappingDTO['standardId'] = standardId;
		studentTeacherSavedMappingDTO['studentId'] = $(this).find("td.subjectIdcls").attr("data-studentId");
		studentTeacherSavedMappingDTO['oldTeacherId'] =$(this).find("td.subjectIdcls").attr("data-assignId");
//		studentTeacherSavedMappingDTO['subjectName'] =$(this).find("td.subjectIdcls").attr("data-subjectName").split("(")[0];
//		studentTeacherSavedMappingDTO['subjectCode'] =$(this).find("td.subjectIdcls").attr("data-subjectCode");	
		studentTeacherSavedMappingDTO['courseType'] = $(this).find("td.subjectIdcls").attr("data-courseType");
		studentTeacherSavedMappingDTOArray.push(studentTeacherSavedMappingDTO);
	});
	
	requestData['studentTeacherSavedMappingDTO'] = studentTeacherSavedMappingDTOArray;
	authentication['hash'] = getHash();authentication['schoolId'] = SCHOOL_ID;authentication['schoolUUID'] = SCHOOL_UUID;
	authentication['userType'] = moduleId;
	authentication['userId'] = $("#"+formId+" #userId").val();
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	return request;
}

function validateRequestForSubmitMeetingSlots(formId,moduleId,controllType){
	if(controllType=='ADD'){
		
		if($('#countryTimezoneId').val()==0 || $('#countryTimezoneId').val()==undefined){
			showMessage(true, 'Time-Zone is required');
			return false;
		}
		if($('#weekPickerId').val()==0 || $('#weekPickerId').val()==undefined){
			showMessage(true, 'Meeting week is required');
			return false;
		}
		if($('#meetingDate').val()=='' || $('#meetingDate').val()==undefined){
			showMessage(true, 'Meeting Date is required');
			return false;
		}
		if($('#startTime').val()=='' || $('#startTime').val()==undefined){
			showMessage(true, 'Start Time is required');
			return false;
		}
		if($('#timeInterval').val()==0 || $('#timeInterval').val()==undefined){
			showMessage(true, 'Time Interval is required');
			return false;
		}
	}else if(controllType=='UPDATE'){
		if($('#meetingResult').val()=='' || $('#meetingResult').val()==undefined){
			showMessage(true, 'Meeting Result is required');
			return false;
		}
	}else if(controllType=='ADDURL'){
		if($('#meetingUrl').val()=='' || $('#meetingUrl').val()==undefined){
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
		meetingSlotDTO['timeZoneCheck'] = $('#countryTimezoneId').val();
		meetingSlotDTO['slotType'] = $('#meetingCategory1').val();
		
		var meetDate = $("#"+formId+" #meetingDate").val();
		meetDate = meetDate.split("-");
		meetingDate = meetDate[2]+"-"+meetDate[0]+"-"+meetDate[1];
		
		meetingSlotDTO['meetingDate'] = meetingDate;
		
		meetingSlotDTO['weekID'] = $("#"+formId+" #weekPickerId").val();
		var startTime = $("#"+formId+" #startTime").val();
		meetingSlotDTO['startTime'] = startTime;
		
		var interval = $("#"+formId+" #timeInterval option:selected").val();
		var endTime= new Date("2016/09/12 "+startTime+":00");
		endTime.setMinutes(endTime.getMinutes() + parseInt(interval));
		endTime = endTime.getHours()+":"+endTime.getMinutes();
		
		meetingSlotDTO['endTime'] = endTime;
		meetingSlotDTO['subject'] = "STUDENT_DOUBT_SESSION";
		meetingSlotDTO['status'] = "0";
	}else if(controllType=='UPDATE'){
		meetingSlotDTO['controllType'] = controllType;
		meetingSlotDTO['meetingType'] = "STUDENT_DOUBT_SESSION";
		meetingSlotDTO['meetingId'] =$("#"+formId+" #meetingId").val();
		meetingSlotDTO['meetingResult'] = $("#"+formId+" #meetingResult option:selected").val();
	}else if(controllType=='ADDURL'){
		meetingSlotDTO['controllType'] = controllType;
		meetingSlotDTO['meetingType'] = "STUDENT_DOUBT_SESSION";
		meetingSlotDTO['meetingId'] =$("#"+formId+" #meetingId").val();
		meetingSlotDTO['meetingUrl'] =$("#"+formId+" #meetingUrl").val();
	}else if(controllType=='SENDMAIL'){
		meetingSlotDTO['controllType'] = controllType;
		meetingSlotDTO['meetingType'] = "STUDENT_DOUBT_SESSION";
		meetingSlotDTO['meetingId'] =$("#"+formId+" #meetingId").val();
	}
	
	requestData['meetingSlotDTO'] = meetingSlotDTO;
	authentication['hash'] = getHash();authentication['schoolId'] = SCHOOL_ID;authentication['schoolUUID'] = SCHOOL_UUID;
	authentication['userType'] = moduleId;
	authentication['userId'] = $("#"+formId+" #userId").val();
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	return request;
}
