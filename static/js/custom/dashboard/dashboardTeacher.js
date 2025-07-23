$(document).ready(function() {

});
function callDashboardPageTeacher(pageNo, args){
	if(pageNo=='1'){
		callForDashboardData('formIdIfAny','teacher-content');
	}else if(pageNo=='2a'){
		callForDashboardData('formIdIfAny','attendance-content'+args);
	}else if(pageNo=='2b'){
		callForDashboardData('formIdIfAny','student-attendance-list');
	}else if(pageNo=='3a'){
		callForDashboardData('formIdIfAny','teacher-subject-content');
	}else if(pageNo=='4a'){
		callForDashboardData('formIdIfAny','teacher-current-task-request-content');
	}else if(pageNo=='4b'){
		callForDashboardData('formIdIfAny','teacher-task-request-content');
	}else if(pageNo=='4c'){
		callForDashboardData('formIdIfAny','teacher-student-task-request-content');
	}else if(pageNo=='5'){
		callForDashboardData('formIdIfAny','teacher-events-content');
	}else if(pageNo=='6'){
		callForDashboardData('formIdIfAny','ptm-meeting-slots-request-content');
	}else if(pageNo=='7'){
		callForDashboardData('formIdIfAny','teacher-attempt-ptm-slots-request-content');
	}else if(pageNo=='8'){
		callForDashboardData('formIdIfAny','assigned-students-content');
	}else if(pageNo=='10'){
		callForDashboardData('formIdIfAny','techer-user-guide-request-content');
	}else if(pageNo=='11'){
		callForDashboardData('formIdIfAny','payment-history-list'+args);
	}else if(pageNo=='12'){
		callForDashboardData('formIdIfAny','teacher-create-session-content'+args);
	}else if(pageNo=='16T'){
		callForDashboardData('formIdIfAny','teacher-view-tips-attachement'+args);
	}else if(pageNo=='2002'){
		callForDashboardData('formIdIfAny','notifications'+args);
	}
}

/*function callTeacherInneraction(actionType, arg0,arg1){
//	if(actionType=='3syllabus'){
//		callForDashboardData('formIdIfAny','teacher-syllabus-content?subjectId='+arg0+'&placementSubjectId='+arg1);	
//	}
}*/


function createRatingAjax(params) {
	var ratingParams = $.parseJSON(params)
	$.ajax({
		type : "POST",
		url : getURLForHTML('dashboard','teacher-rating-submit-request-content'),
		data : { comments:ratingParams.comments, entityId: ratingParams.entityId, studentId: parseInt(ratingParams.studentId), rating: parseInt(ratingParams.rating)},
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
        			$('#dashboardContentInHTML').html(htmlContent)
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


function submitPTMRemarksSlots(formId,moduleId) {
	hideMessage('');
	if(!validateRequestForSubmitPTMRemarksSlots(formId,moduleId)){
		return false;
	}
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLFor('dashboard','ptm-remarks-submit'),
		data : JSON.stringify(getRequestForSubmitPTMRemarksSlots(formId, moduleId)),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				showMessage(true, data['message']);
			} else {
				showMessage(false, data['message']);
				$('#'+formId)[0].reset();
				
			}
			return false;
		},
		error : function(e) {
			//showMessage(true, e.responseText);
			return false;
		}
	});
}

function getRequestForSubmitPTMRemarksSlots(formId,moduleId){
	var request = {};
	var authentication = {};
	var requestData = {};
	var meetingSlotDTO = {};
	
	var rating=$("#"+formId+" input[name='rating']:checked").val().trim();
	var ratingDescr=$("#"+formId+" #sremark").val().trim();
	var meetingId=$("#"+formId+" #meetingId").val().trim();
	
	meetingSlotDTO['rating'] = rating;
	meetingSlotDTO['meetingResult'] = ratingDescr;
	meetingSlotDTO['meetingId'] = meetingId;
	
	requestData['meetingSlotDTO'] = meetingSlotDTO;
	authentication['hash'] = getHash();authentication['schoolId'] = SCHOOL_ID;authentication['schoolUUID'] = SCHOOL_UUID;
	authentication['userType'] = moduleId;
	authentication['userId'] = $("#"+formId+" #userId").val().trim();
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	return request;
}

function validateRequestForSubmitPTMRemarksSlots(formId,moduleId){
	return true;
}

//$('#sendremarkback').bind('click', function() {
//	var rating=$("input[name='rating']:checked").val();
//	var ratingDescr=$('#sremark').val();
//	var meetingId=$('#meetingId').val();
//	console.log("rating "+ rating+' ratingDescr '+ratingDescr+' meetingId '+meetingId);
//	var url="/remarks";
//	var data = 'data={"meetingId":"'+meetingId+'", "rating":"'+rating+'", "ratingDescr":"'+ratingDescr+'"}';
//		jQuery.ajax({
//        type:'post',
//        url: url,
//        data: data,
//        dataType: "json",
//        success:function(response){
//        	console.log(response.status);
//        	if(response.status=='success'){
//        		alert("Successfully saved.");
//        		$('#remarkform').trigger("reset");
//        		
//        	}
//        	
//        },
//        error:function(response){
//        	return false;
//        }
//    });
//});

function validateRequestForMeetingSlots(formId,moduleId){
	
	if($('#slotCtFor').val().trim()=='0'){
		showMessage(true, 'Session Creation For field is mandatory.');
		return false;
	}
	if($('#weekCount').val().trim()=='' || $('#weekCount').val().trim()==undefined){
		showMessage(true, 'Session Type is required');
		return false;
	}
	if($('#countryTimezoneId').val().trim()==0 || $('#countryTimezoneId').val().trim()==undefined){
		showMessage(true, 'Country Timezone is required');
		return false;
	}
	if($('#dateCategory').val().trim()=='' || $('#dateCategory').val().trim()==undefined){
		showMessage(true, 'Session Type  is required');
		return false;
	}
	if($('#meetingDateFrom').val().trim()=='' || $('#meetingDateFrom').val().trim()==undefined){
		showMessage(true, 'Session Date From is required');
		return false;
	}
	if($('#meetingDateTo').val().trim()=='' || $('#meetingDateTo').val().trim()==undefined){
		showMessage(true, 'Session Date to is required');
		return false;
	}
	if(new Date($('#meetingDateFrom').val().trim()) > new Date($('#meetingDateTo').val().trim()))
	{//compare end <=, not >=
		showMessage(true, 'From date is less than To date');
		return false;
	}
	if($('#timeHrsFrom').val().trim()=='' || $('#timeHrsFrom').val().trim()==undefined){
		showMessage(true, 'Session time is required');
		return false;
	}
	if($('#timeMinFrom').val().trim()=='' || $('#timeMinFrom').val().trim()==undefined){
		showMessage(true, 'Session time is required');
		return false;
	}
	if($('#timeHrsTo').val().trim()=='' || $('#timeHrsTo').val().trim()==undefined){
		showMessage(true, 'Session time is required');
		return false;
	}
	if($('#timeMinTo').val().trim()=='' || $('#timeMinTo').val().trim()==undefined){
		showMessage(true, 'Session time is required');
		return false;
	}
	if($('#timeInterval').val().trim()==0 || $('#timeInterval').val().trim()==undefined){
		showMessage(true, 'Time Interval is required');
		return false;
	}

return true;
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



function calendarDateMeetingSlots(formId, moduleId, controlType, replaceId,requestType) {

hideMessage('');
if(!validateRequestForMeetingSlots(formId, moduleId)){
	return false;
}

$.ajax({
	type : "POST",
	url : getURLForHTML('dashboard','meeting-dates-slots'),
	data : encodeURI( "request="+ JSON.stringify(getRequestForMeetingSlots(formId,requestType))),
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
function getRequestForMeetingSlots(formId,requestType){
var request = {};
var authentication = {};
var requestData = {};
var meetingSlotDTO = {};

meetingSlotDTO['weekCount'] = $("#"+formId+" #weekCount").val().trim();
meetingSlotDTO['inActDate'] = $("#"+formId+" #inActDate").val().trim();
meetingSlotDTO['timezone'] = $('#countryTimezoneId option:selected').attr('custom_timezone_id');
meetingSlotDTO['timeZoneCheck'] = $('#countryTimezoneId option:selected').val().trim();
meetingSlotDTO['dateCategory'] = $("#"+formId+" #dateCategory").val().trim();
meetingSlotDTO['startDate'] = $("#"+formId+" #meetingDateFrom").val().trim();
meetingSlotDTO['endDate'] = $("#"+formId+" #meetingDateTo").val().trim();
meetingSlotDTO['timeHrsFrom'] = $("#"+formId+" #timeHrsFrom").val().trim();
meetingSlotDTO['timeMinFrom'] = $("#"+formId+" #timeMinFrom").val().trim();
meetingSlotDTO['timeHrsTo'] = $("#"+formId+" #timeHrsTo").val().trim();
meetingSlotDTO['timeMinTo'] = $("#"+formId+" #timeMinTo").val().trim();
meetingSlotDTO['timeInterval'] = $("#"+formId+" #timeInterval").val().trim();
meetingSlotDTO['userId'] = $("#"+formId+" #userId").val().trim();
meetingSlotDTO['slotCtFor'] = $("#"+formId+" #slotCtFor").val().trim();
meetingSlotDTO['meetingType'] = requestType;

requestData['meetingSlotDTO'] = meetingSlotDTO;
authentication['hash'] = getHash();authentication['schoolId'] = SCHOOL_ID;authentication['schoolUUID'] = SCHOOL_UUID;
authentication['userType'] = 'TEACHER';
authentication['userId'] = $("#"+formId+" #userId").val().trim();
request['authentication'] = authentication;
request['requestData'] = requestData;
return request;
}





