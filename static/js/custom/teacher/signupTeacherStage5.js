//$(document).ready(function() {
//	
//	$(".divTimeZone").removeClass("is-empty");
//	$(".divMeetingDate").removeClass("is-empty");
//	
//	getAllCountryTimezone('signupStage4',1,'countryTimezoneId');
////	var d = new Date();
////	var strDate = d.getDate()+ "/" + (d.getMonth()+1) + "/" +d.getFullYear()  ;
//	
//	$("#countryTimezoneId").change(function(){
//		var selectDate = "auto";
//		var meetingDate = "";
//		if($("#signupStage5 #meetingDate").val() != ""){
//			selectDate = $("#signupStage5 #meetingDate").val();
//			selectDate = selectDate.split("-");
//			meetingDate = selectDate[2]+"-"+selectDate[0]+"-"+selectDate[1];
//		}else{
//			showMessage(true, "Please choose meeting Date");
//			$(".divMeetingDate").removeClass("is-empty");
//			return false;
//		}
//		
//		var countryTimezoneId = $('#countryTimezoneId').val();
//		if(countryTimezoneId!=null &&  countryTimezoneId!=0){
//			getAllMeetingSlotTimezone("#signupStage5", meetingDate, "#interviewSlotId", "INTERVIEW", countryTimezoneId);
//		}else{
//			showMessage(true, "Please select a Time Zone");
//			$('#chooseDate').val("");
//			return false;
//		}
//		
//	});
//});
function emptyDateAndSlots(){
	$('#chooseDate').val("");
	$('#meetingSlot').html("");
}
//function getMeetingSlots(formId){
//	var currentDate = $('#'+formId+' #meetingDate').val().split('-');
//	var selectTime = new Date(currentDate[0]+'/'+currentDate[1]+'/'+currentDate[2]);
//	var currentTime = new Date()
//	var timesInMiliSeconds = selectTime.getMilliseconds();//M.dateDiffSecs($('#meetingDate').val());
//	var timesInMiliSecondsToday = currentTime.getMilliseconds();
//	console.log('timesInMiliSeconds '+timesInMiliSeconds);
//	if(selectTime>=currentTime){
//		//alert("good day");
//	}else{
//		showMessage(true, 'Please select future meeting date.');
//		$('#'+formId+' #meetingDate').val("");
//		$('#'+formId+" .meetingSlot").text("");
//		return false;
//	}
//	
//	var selectDate = "auto";
//	if($('#'+formId+' #meetingDate').val() != ""){
//		selectDate = $('#'+formId+' #meetingDate').val();
//		selectDate = selectDate.split("-");
//		meetingDate = selectDate[2]+"-"+selectDate[0]+"-"+selectDate[1];
//	}
////	var selectTimeZone1 = "+08:00";
////	if($('#'+formId+' #countryTimezoneId option:selected').val()!=0){
////		var selectTimeZone  = $('#'+formId+' #countryTimezoneId option:selected').text().split(")");
////		selectTimeZone1 = selectTimeZone[0].replace("(GMT","");
////	}else{
////		showMessage(true, "Please select Time Zone");
////		return false;
////	}
//	var countryTimezoneId = $('#countryTimezoneId').val();
//	if(countryTimezoneId!=null &&  countryTimezoneId!=0){
//		getAllMeetingSlotTimezone("#signupStage5", meetingDate, "#interviewSlotId", "INTERVIEW", countryTimezoneId);
////	callRequestDemoFreeSlots('#requestDemo',"date="+meetingDate+"&countryTimezoneId="+countryTimezoneId+"&lat="+lat+"&lon="+lon+"&requestType=REQUESTDEMO");
//	}else{
//		showMessage(true, "Please select a Time Zone");
//		$('#chooseDate').val("");
//		return false;
//	}
//}
function submitQuestionsAnswers(formId){
	$.ajax({
		type : "POST",
		url : getURLForHTML('teacher','signup/update-questions-answers'),
		data : encodeURI("request="+JSON.stringify(getRequestForQuestionsAnswers(formId))),
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
        				tabActiveStatus(5);
        			}
        		} else {
        			if($('#questionSetId').val()==1){
        				$('#questionSet1').hide();
        				$('#teacherQuestionSet2').html(htmlContent);
        				$('#examSetType').html('Set 2');
        				$('#questionSet2').show();
        				$('#questionSetId').val(parseInt($('#questionSetId').val())+1)
        			}else{
        				var set1marks=htmlContent.split('|')[1];
        				var set2marks=htmlContent.split('|')[2];
        				console.log("set1marks :"+set1marks+"set2marks :"+set2marks);
        				$('#questionSet2').hide();
        				$('#scoreObtained').html(htmlContent);
        				$('#questionsReviewForTeacherDetailsModal').modal('show');
        				$('#scoreObtained1').html(set1marks);
        				$('#scoreObtained2').html(set2marks);
        				$('#scoreObtained3').html(parseInt(set1marks)+parseInt(set2marks));
        			}
        			tabActiveStatus(5);
        		}
        		$("#nextStep").prop("disabled", false);
        		return false;
			}
			return false;
		},
		error : function(e) {
			//showMessage(true, e.responseText);
			$("#nextStep").prop("disabled", false);
			tabActiveStatus(5);
		}
	});
}
function getRequestForQuestionsAnswers(formId){
	var request = {};
	var authentication = {};
	var requestData = {};
	var requestData = {};
	requestData['requestKey']='';
	requestData['requestValue']=$('#questionSetId').val();
	var teacherQuestionAnsDTOArray=[];
	if($('#questionSetId').val()==1){
		$("#signupTrainigStage5QuestionSet1 .teacherQuestionAns").each(function(){
			var teacherQuestionAnsDTO={};
			var questionId = $(this).find("input[name=questionId]").val();
			teacherQuestionAnsDTO['answer']= $("input[name=radio-group"+questionId+"]:checked"). val();
				
			teacherQuestionAnsDTO['questionId'] = questionId;
			teacherQuestionAnsDTO['setNo'] =  $('#questionSetId').val();
			teacherQuestionAnsDTOArray.push(teacherQuestionAnsDTO);
		});
	}else{
		$("#signupTrainigStage5QuestionSet2 .teacherQuestionAns").each(function(){
			var teacherQuestionAnsDTO={};
			var questionId = $(this).find("input[name=questionId]").val();
			teacherQuestionAnsDTO['answer']= $("input[name=radio-group"+questionId+"]:checked"). val();
				
			teacherQuestionAnsDTO['questionId'] = questionId;
			teacherQuestionAnsDTO['setNo'] =  $('#questionSetId').val();
			teacherQuestionAnsDTOArray.push(teacherQuestionAnsDTO);
		});
	}
	
	
	requestData["teacherQuestionAnsDTO"] = teacherQuestionAnsDTOArray;
	authentication['hash'] = getHash();authentication['schoolId'] = SCHOOL_ID;authentication['schoolUUID'] = SCHOOL_UUID;
	authentication['userType'] = 'TEACHER';
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	return request;
}

function callForSignupTeacherInterviewSlotSubmit(formId) {
	if(!validateRequestForSignupTeacherInterviewAndTraining(formId)){
		tabActiveStatus(5);
		return false;
	}
	
	$('#submitInterviewSlotModal').modal('show');
	window.setTimeout(function(){tabActiveStatus(5)},1000)
}

function callForSignupTeacherInterviewAndTraining(formId) {
	hideMessage('');
	$('#submitInterviewSlotModal').modal('hide');
	if(!validateRequestForSignupTeacherInterviewAndTraining(formId)){
		tabActiveStatus(5);
		return false;
	}
	$("#nextStep").prop("disabled", true);
	$.ajax({
		type : "POST",
		url : getURLForHTML('teacher','signup/stage-5'),
		data : encodeURI("request="+JSON.stringify(getRequestForTeacherInterviewAndTraining(formId))),
		dataType : 'html',
		cache : false,
		timeout : 600000,
		success : function(htmlContent) {
			if(htmlContent!=""){
            	var stringMessage = [];
            	stringMessage = htmlContent.split("|");
        		if(stringMessage[0] == "FAILED" || stringMessage[0] == "EXCEPTION"){
        			showMessage(true, stringMessage[1]);
        			tabActiveStatus(5);
        		} else {
        			//$('#signupStage6Content').html(htmlContent)
        			tabActiveStatus(5);
        			showMessage(false, 'Teacher Interview Details updated successfully.');
        			console.log("stringMessage[2]"+stringMessage[2]);
        			$('#timeslot').html(stringMessage[2]);
        			$('#teacherName').html(stringMessage[3]);
        			$('#interviewReviewForTeacherDetailsModal').modal('show');
        		}
        		$("#nextStep").prop("disabled", false);
        			return false;
			}
		},
		error : function(e) {
			//showMessage(true, e.responseText);
			$("#nextStep").prop("disabled", false);
			tabActiveStatus(5);
		}
	});
}
function validateRequestForSignupTeacherInterviewAndTraining(formId, elementId) {
	
	if (!validateFormAscii(formId)) {
		showMessage(false, 'Please use the English Keyboard while providing information');
		return false
	}
	if ($("#"+formId+" #countryTimezoneId").val()==null || $("#"+formId+" #countryTimezoneId").val()==0) {
		showMessage(true, 'Please select a Time Zone');
		return false
	}
	
	if ($("#"+formId+" #chooseDate").val()==null || $("#"+formId+" #chooseDate").val()=='') {
		showMessage(true, 'Please select a Month');
		return false
	}
	
//	if ($("#"+formId+" #skypeId").val()==null || $("#"+formId+" #skypeId").val()=='') {
//		showMessage(true, 'Please enter Skype Id');
//		return false
//	}
	
	if($("input[name='slotTime']:checked").val()==undefined){
		showMessage(true, 'Please select any one Slot.');
		return false;
	}
	return true;
}
function getRequestForTeacherInterviewAndTraining(formId){
	var request = {};
	var authentication = {};
	var requestData = {};
	var teacherInterviewDetailsDTO = {};
	teacherInterviewDetailsDTO['countryTimezoneId'] = $('#countryTimezoneId option:selected').attr('custom_timezone_id');
	teacherInterviewDetailsDTO['interviewSlotId'] = $("input[name='slotTime']:checked").attr('slotidattr');
	teacherInterviewDetailsDTO['location'] = $("#location").val();
//	teacherInterviewDetailsDTO['skypeId'] = escapeCharacters($("#"+formId+" #skypeId").val());
	var interviewSlot=$("input[name='slotTime']:checked").val().split('-');
	teacherInterviewDetailsDTO['startTime'] = interviewSlot[0];
	teacherInterviewDetailsDTO['endTime'] = interviewSlot[1];
	
	requestData['teacherInterviewDetailsDTO'] = teacherInterviewDetailsDTO;
	authentication['hash'] = getHash();authentication['schoolId'] = SCHOOL_ID;authentication['schoolUUID'] = SCHOOL_UUID;
	authentication['userType'] = 'TEACHER';
	authentication['userId'] = $("#"+formId+" #userId").val();
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	return request;

}

function getAllMeetingSlotTimezone(formId, actionUrl) {
//	hideMessage('');
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForHTML('common','get-request-demo-free-slots?'+actionUrl),
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
        			$('#meetingSlot').html(htmlContent);
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
//function getAllMeetingSlotTimezone(formId, value, elementId, extra, extra1) {
//	hideMessage('');
//	$.ajax({
//		type : "POST",
//		contentType : "application/json",
//		url : getURLForCommon('masters'),
//		data : JSON.stringify(getRequestForMeeting(formId, 'MEETINGS-LIST', value, extra, extra1)),
//		dataType : 'json',
//		cache : false,
//		timeout : 600000,
//		success : function(data) {
//			if (data['status'] == '0' || data['status'] == '2') {
//				showMessage(true, data['message']);
//			} else {
//				//buildDropdown(data['mastersData']['meetings'], $('#interviewSlotId'), 'Select Meeting');
//				$('.meetingSlot').empty();
//				var result = data['mastersData']['meetings'];
//				if (result != '' && result!=undefined) {
//					$.each(result, function(k, v) {
//						if(v.extra!=null && v.extra1 !=null){
//							htmlDiv = "<div class='col-md-6 col-sm-6 col-xs-12 time-slot'>" + 
//								"<p><input type='radio' id='time"+ v.key +"' name='interviewSlot' value="+ v.key +',' + v.extra +"-"+ v.extra1 + "> <label id='startTime' for='time"+ v.key +"'>" + v.extra + " - " + v.extra1 + "</label></p>" +
//								"</div>";
//							$(".meetingSlot").append(htmlDiv);
//						}
//						
//					});
//				}else{
//					htmlDiv = "<div class='col-md-12 col-sm-6 col-xs-12'>" +
//						"<p>No Interview slot available. Please click <a target='_blank' href='"+CONTEXT_PATH+"common/inquiry' >here</a> to contact administrator.</p>" +
//						"</div>";
//					$(".meetingSlot").append(htmlDiv);
//				}
//				
//			}
//		},
//		error : function(e) {
//			//showMessage(true, e.responseText);
//		}
//	});
//}

function getRequestForMeeting(formId, key, value, extra, extra1) {
	//alert("key "+key+"value "+value+"extra "+extra+"extra1 "+extra1);
	var request = {};
	var authentication = {};
	var requestData = {};
	requestData['requestKey'] = key;
	requestData['requestValue'] = value;
	requestData['requestExtra'] = extra;
	requestData['requestExtra1'] = extra1;
	authentication['hash'] = getHash();authentication['schoolId'] = SCHOOL_ID;authentication['schoolUUID'] = SCHOOL_UUID;
	authentication['userType'] = 'TEACHER';
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	return request;
}

function getAllTeacherQuestion(formId, setId) {
	var postData ="setId="+setId;
$.ajax({
		type : "GET",
		contentType : "text/plain",
		url : getURLForHTML('teacher', 'signup/teacher-question'),
		data : encodeURI(postData),
		dataType : 'html',
		cache : false,
		timeout : 600000,
		success : function(htmlContent) {
			if (htmlContent != "") {
				var stringMessage = [];
				stringMessage = htmlContent.split("|");
				if (stringMessage[0] == "FAILED"
						|| stringMessage[0] == "EXCEPTION"
						|| stringMessage[0] == "SESSIONOUT") {
					showMessage(true, stringMessage[1]);
					if (stringMessage[0] == "SESSIONOUT") {
						redirectLoginPage();
					}
				} else {
					$('#' + formId + ' #teacherQuestion').html(htmlContent);
					// showMessage(false, data['message']);
					
				}
				$("#nextStep").prop("disabled", false);
				return false;
			}
		},
		error : function(e) {
			$('#' + formId + ' #teacherQuestion').html(e.responseText);
			$("#nextStep").prop("disabled", false);
		}
	});
	
}

