function createBatchByStudent(formId,roleModuleId,moduleId) {
	hideMessage('');
	var callFrom = $("#"+formId+" #callFrom").val();
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForHTML('dashboard','create-batch-student'),
		data : JSON.stringify(getRequestForCreateBatchByStudent(formId, roleModuleId)),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				showMessage(true, data['message']);
				$('#'+formId+' #batchId').val(data['extra'])
			} else {
				$('#'+formId+' #batchId').val(data['extra'])
				showMessage(true, data['message']);
				$('#'+formId)[0].reset();
				$('#addBatchModal').modal('hide');
				if(callFrom=='ManageBatch'){
					setTimeout(function(){ callDashboardPageSchool(moduleId,'manage-batch-student'); }, 1000);
				}
			}
			return false;
		},
		error : function(e) {
			//showMessage(true, e.responseText);
			console.log("ERROR : ", e);
		}
	});
}

function getRequestForCreateBatchByStudent(formId, roleModuleId){
	var request = {};
	var authentication = {};
	var requestData = {};
	var batchDTO = {};
	batchDTO['userId'] = $("#"+formId+" #userId").val();
	batchDTO['batchId'] = $("#"+formId+" #batchId").val();
	batchDTO['batchStudentIds'] =$("#"+formId+" #selectStudentIds").val();
	batchDTO['standardId'] = $("#"+formId+" #standardId").val();
	batchDTO['batchName'] = $("#"+formId+" #batchName").val();
	batchDTO['batchCategory'] = $("#"+formId+" #batchCategory").val();
	batchDTO['batchStartDate'] = $("#"+formId+" #batchStartDate").val();
	batchDTO['batchEndDate'] = $("#"+formId+" #batchEndDate").val();
	batchDTO['batchHolidayDate'] = $("#"+formId+" #batchHolidayDate").val();
	batchDTO['timeHrsFrom'] = $("#"+formId+" #timeHrsFrom").val();
	batchDTO['timeMinFrom'] = $("#"+formId+" #timeMinFrom").val();
	batchDTO['timeInterval'] = $("#"+formId+" #timeInterval").val();
	batchDTO['periodTime'] = $("#"+formId+" #batchPeriodTime").val();
	batchDTO['batchDuration'] = $("#"+formId+" #batchDuration").val();
	batchDTO['batchDurationMin'] = $("#"+formId+" #batchDurationMin").val();
	batchDTO['recessTime'] = $("#"+formId+" #recessTime").val();
	batchDTO['afterPeriod'] = $("#"+formId+" #afterPeriod").val();
	batchDTO['schoolId'] = SCHOOL_ID;
	batchDTO['sessionId']=$("#"+formId+" #sessionId").val();
	batchDTO['batchStudentLimit']=$("#"+formId+" #batchLimit").val();
	batchDTO['fakeCount']=$("#"+formId+" #fakeCount").val();
	batchDTO['admissionProcess']=$("#"+formId+" #admissionProcess").val();
	batchDTO['classRoomLink'] = $("#"+formId+" #batchLink").val();
	batchDTO['meetingVendor'] = $("#"+formId+" #meetingVendor").val();
	batchDTO['joiningType'] = $("#"+formId+" #joiningType").val();
	batchDTO['enableLms']=$("#"+formId+" #enableLms").val();
	batchDTO['courseProId']=$("#"+formId+" #courseProvider").val();
	requestData['batchDTO'] = batchDTO;
	authentication['hash'] = getHash();
	authentication['userId'] = $("#"+formId+" #userId").val();
	authentication['schoolId'] = SCHOOL_ID;
	authentication['schoolUUID'] = SCHOOL_UUID;
	authentication['userType'] = roleModuleId;
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	return request;
}

function saveAcceleratedModeSignupContent(formId,moduleId) {
	hideMessage('');
	if($('#'+formId+' #studentEmail').val()=='' || $('#'+formId+' #studentEmail').val()==undefined){
		showMessage(true, "Student Email is required to send link");
		return false;
	}
	var emailId = $('#'+formId+' #studentEmail').val();
	$.ajax({
		type : "POST",
		url : getURLForHTML('dashboard','accelerated-mode-signup-student-content'),
		data : "emailId="+emailId,
		dataType : 'html',
		cache : false,
		//timeout : 600000,
			success : function(htmlContent) {
				if(htmlContent!=""){
	            	var stringMessage = [];
	            	stringMessage = htmlContent.split("|");
	        		console.log('stringMessage: '+stringMessage);
	            	if(stringMessage[0] == "FAILED" || stringMessage[0] == "EXCEPTION" || stringMessage[0] == "SESSIONOUT" ){
	            		showMessage(true, stringMessage[1]);
	            		$('#accModeStudentContentModal').modal('show');
	        		}else{
	        			showMessage(true, stringMessage[1]);
	        			$('#accModeStudentContentModal').modal('hide');
	        			setTimeout(function(){ callDashboardPageSchool(moduleId,'accelerated-mode');}, 1000);
	        		}
	    			return false;
				}
		},
		error : function(e) {
			//showMessage(true, e.responseText);
			$("#nextStep").prop("disabled", false);
			tabActiveStatus(1);
		}
	});

}

function sendAcceleratedModeSignupLinkContent(accModeId,moduleId) {
		hideMessage('');
		$.ajax({
			type : "POST",
			url : getURLForHTML('dashboard','accelerated-mode-signup-mail'),
			data : "accModeId="+accModeId,
			dataType : 'html',
			cache : false,
			//timeout : 600000,
				success : function(htmlContent) {
					if(htmlContent!=""){
		            	var stringMessage = [];
		            	stringMessage = htmlContent.split("|");
		        		console.log('stringMessage: '+stringMessage);
		            	if(stringMessage[0] == "FAILED" || stringMessage[0] == "EXCEPTION" || stringMessage[0] == "SESSIONOUT" ){
		            		showMessage(true, stringMessage[1]);
		        		}else{
		        			showMessage(true, stringMessage[1]);
		        			setTimeout(function(){ callDashboardPageSchool(moduleId,'accelerated-mode');}, 1000);
		        		}
		    			return false;
					}
			},
			error : function(e) {
				//showMessage(true, e.responseText);
			}
		});
}

function callBatchSubjectAndTeacherMapping(formId,batchId,batchName,standardId, controllType,moduleId) {
	hideMessage('');
	$.ajax({
		type : "POST",
		url : getURLForHTML('dashboard','batch-subject-and-teacher-mapping'),
		data : "batchId="+batchId+"&standardId="+standardId+"&controllType="+controllType+"&batchName="+batchName,
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
        			$('body').find('.modal-backdrop').remove();
        			$('#batchSubjectTeacherSupportContent').html(htmlContent);
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

function callAssignBatchSubjectTeacherContent(callFor){
	var batchId=$('#subjectTeacherMappingModalLabel #batchId').html();
	var batchName=$('#subjectTeacherMappingModalLabel #batchName').html();
	var standardId=$('#subjectTeacherMappingModalLabel #standardId').html();
	$('#viewStudentTeacherTab').removeClass('active');
	$('#viewStudentTeacherTab').removeClass('inactive-tab');
	$('#assignStudentTeacherTab').removeClass('active');
	$('#assignStudentTeacherTab').removeClass('inactive-tab');
	$('#viewPastStudentTeacherTab').removeClass('active');
	$('#viewPastStudentTeacherTab').removeClass('inactive-tab');
	if(callFor=='View'){
		var controllType="new";
		$('#viewStudentTeacherTab').addClass('active');
		$('#assignStudentTeacherTab').addClass('inactive-tab');
		$('#viewPastStudentTeacherTab').addClass('inactive-tab');
		callForDashboardData('formIdIfAny','batch-subject-teacher-linking-content?batchId='+batchId+"&callFor="+callFor+"&standardId="+standardId+"&controllType="+controllType+"&batchName="+batchName,'studentTeacherLinkingContent');
	}else if(callFor=='Assign'){
		var controllType="new";
		$('#viewStudentTeacherTab').addClass('inactive-tab');
		$('#assignStudentTeacherTab').addClass('active');
		$('#viewPastStudentTeacherTab').addClass('inactive-tab');
		callForDashboardData('formIdIfAny','batch-subject-teacher-linking-content?batchId='+batchId+"&callFor="+callFor+"&standardId="+standardId+"&controllType="+controllType+"&batchName="+batchName,'studentTeacherLinkingContent');
	}else if(callFor=='view-assignPastStudentTeacher'){
		var controllType="old";
		$('#viewStudentTeacherTab').addClass('inactive-tab');
		$('#assignStudentTeacherTab').addClass('inactive-tab');
		$('#viewPastStudentTeacherTab').addClass('active');
		callForDashboardData('formIdIfAny','student-teacher-linking-content?studentId='+studentId+"&callFor="+callFor+"&standardId="+standardId+"&controllType="+controllType,'studentTeacherLinkingContent');
	}
}
function changeTeacherSubjectInBatch(formId,moduleId,oldSubjectId,batchId,teacherId,inc){
	var newSubjectId =$("#newSubjectIds"+inc+" option:selected").val();
	if(newSubjectId==0){
		showMessage(true, "Please select subject to update.");
		$('#modalMessage').click(function(){
			setTimeout(function(){$('body').addClass('modal-open');},1000);
		});
		return false;
	}
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForHTML('dashboard','batch-teacher-subject-change-data'),
		data : JSON.stringify(getRequestForBatchTeacherSubjectChange(formId, moduleId,oldSubjectId,newSubjectId,batchId,teacherId)),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				showMessage(true, data['message']);
				$("#newSubjectIds"+inc).val(oldSubjectId);
			} else {
				showMessage(true, "Teacher's subject updated successfully.");
			}
			return false;
		},
		error : function(e) {
		return false;
		}
	});
}

function getRequestForBatchTeacherSubjectChange(formId,moduleId,oldSubjectId,newSubjectId,batchId,teacherId){
	var request = {};
	var authentication = {};
	var requestData = {};

	var  batchTeacherSavedMappingDTO={};
	batchTeacherSavedMappingDTO['subjectId'] = newSubjectId;
	batchTeacherSavedMappingDTO['teacherId'] = teacherId;
	batchTeacherSavedMappingDTO['batchId'] = batchId;
	batchTeacherSavedMappingDTO['oldTeacherId'] =oldSubjectId;

	requestData['batchTeacherSavedMapping'] = batchTeacherSavedMappingDTO;
	authentication['hash'] = getHash();authentication['schoolId'] = SCHOOL_ID;authentication['schoolUUID'] = SCHOOL_UUID;
	authentication['userType'] = moduleId;
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	return request;
}

function submitBatchSubjectTeacherAssign(formId,moduleId) {
	var subjectId=$("#subjectIds option:selected").val();
	var standardId=$("#subjectIds option:selected").attr('data-standardId');
	var batchId=$("#subjectIds option:selected").attr('data-studentId');
	var oldTeacherId=$("#subjectIds  option:selected").attr('data-assignId');
	var courseType=$("#subjectIds option:selected").attr('data-courseType');
	hideMessage('');
	if(subjectId=='Select Subject'){
		showMessage(true, "Please select subject to update.");
		$('#modalMessage').click(function(){
			setTimeout(function(){$('body').addClass('modal-open');},1000);
		});
		return false;
	}
	if(!validateRequestBatchSubjectTeacherAssign(formId,moduleId,subjectId)){
		$('#modalMessage').click(function(){
			setTimeout(function(){$('body').addClass('modal-open');},1000);
		});
		return false;
	}
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForHTML('dashboard','batch-teacher-assign-submit'),
		data : JSON.stringify(getRequestForBatchTeacherAssign(formId, moduleId,subjectId,standardId,batchId,oldTeacherId,courseType)),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				showMessage(true, data['message']);
			} else {
				showMessage(true, "Batch Subject-teacher updated successfully.");
				setTimeout(function(){ callBatchSubjectAndTeacherMapping('formId',batchId,'',standardId,'Assign',125);},1000);
			}
			return false;
		},
		error : function(e) {
		return false;
		}
	});
}
function getRequestForBatchTeacherAssign(formId,moduleId,subjectId,standardId,batchId,oldTeacherId,courseType){
	var request = {};
	var authentication = {};
	var requestData = {};
	var batchTeacherSavedMappingDTOArray = [];
		var  batchTeacherSavedMappingDTO={};
		var teacherId= $("#teacherId option:selected").val();
		batchTeacherSavedMappingDTO['subjectId'] = subjectId;
		batchTeacherSavedMappingDTO['teacherId'] = teacherId;
		batchTeacherSavedMappingDTO['standardId'] = standardId;

		batchTeacherSavedMappingDTO['batchId'] = batchId;//$(this).find("td.subjectIdcls").attr("data-studentId");
		batchTeacherSavedMappingDTO['oldTeacherId'] =oldTeacherId; //$(this).find("td.subjectIdcls").attr("data-assignId");
		batchTeacherSavedMappingDTO['courseType'] = courseType; //$(this).find("td.subjectIdcls").attr("data-courseType");
		batchTeacherSavedMappingDTOArray.push(batchTeacherSavedMappingDTO);
//	});

	requestData['batchTeacherSavedMappingDTO'] = batchTeacherSavedMappingDTOArray;
	authentication['hash'] = getHash();authentication['schoolId'] = SCHOOL_ID;authentication['schoolUUID'] = SCHOOL_UUID;
	authentication['userType'] = moduleId;
	authentication['userId'] = $("#"+formId+" #userId").val();
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	return request;
}

function validateRequestBatchSubjectTeacherAssign(formId,moduleId,subjectId){
		var teacherId= $("#teacherId option:selected").val();
		if(teacherId==0 || teacherId==undefined){
			showMessage(true, 'Please Select a teacher to update.');
			return false;
		}
	return true;
}

function advanceBatchStudentSearch(formId, moduleId) {
	hideMessage('');
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForHTML('dashboard','assigned-batch-student-search-content'),
		data : JSON.stringify(getCallRequestForBatchStudentSearch(formId, moduleId)),
		dataType : 'html',
		async:false,
		success : function(htmlContent) {
			if(htmlContent!=""){
            	var stringMessage = [];
            	stringMessage = htmlContent.split("|");
        		if(stringMessage[0] == "FAILED" || stringMessage[0] == "EXCEPTION" || stringMessage[0] == "SESSIONOUT"){
        			if(stringMessage[0] == "SESSIONOUT"){
        				redirectLoginPage();
        			}else{
        				showMessage(true, stringMessage[1]);
        			}
        		} else {
    				$('#advBatchStudentSearch').modal('hide');
    				$('#advance-search-content').html(htmlContent);
        		}
        		return false;
			}
		}
	});
}

function getCallRequestForBatchStudentSearch(formId, moduleId){
	var requestTranscriptSearch = {};
	var authentication = {};
	var batchStudentSearchDTO = {};
	batchStudentSearchDTO['moduleId'] = moduleId;
	batchStudentSearchDTO['gradeId'] = $("#"+formId+" #gradeId").select2('val');
	batchStudentSearchDTO['studentName'] = $("#"+formId+" #studentName").val().trim();
	batchStudentSearchDTO['studentSubject'] = $("#"+formId+" #studentSubject").select2('val');
	batchStudentSearchDTO['sortBy'] = $("#"+formId+" #sortBy").select2('val');
	batchStudentSearchDTO['startPosition'] = $("#"+formId+" #startPosition").val().trim();
	batchStudentSearchDTO['numberOfRecords'] = $("#"+formId+" #numberOfRecords").val().trim();
	batchStudentSearchDTO['schoolUUID'] = SCHOOL_UUID;
	batchStudentSearchDTO['schoolId'] = SCHOOL_ID;

	requestTranscriptSearch['batchStudentSearchDTO'] = batchStudentSearchDTO;
	authentication['hash'] = getHash();
	authentication['userType'] = "SCHOOL";
	authentication['schoolId'] = SCHOOL_ID;
	authentication['schoolUUID'] = SCHOOL_UUID;
	requestTranscriptSearch['authentication'] = authentication;

	return requestTranscriptSearch;

}

function batchStudentSearchReset(formId){
	$("#"+formId+" #gradeId").val('').trigger('change');
	$("#"+formId+" #studentName").val('');
	$("#"+formId+" #studentSubject").val('');
	$("#"+formId+" #sortBy").val('DESC').trigger('change');
	$("#"+formId+" #startPosition").val('0');
	$("#"+formId+" #numberOfRecords").val('25');
}

function updateTeacherTimeTableSchedule(batchTeacherMappingId,subjectId,teacherId,elementId){
	$(".subjectTeacherTimeError").text('');
	hideMessage('');
	if(!validateRequestBatchSubjectTeacherTime(subjectId, elementId)){
		return false;
	}
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForHTML('dashboard','update-teacher-batch-time-schedule'),
		data : JSON.stringify(getRequestForBatchTeacherTime(batchTeacherMappingId,subjectId,teacherId,elementId)),
		dataType : 'json',
		cache : false,
		//timeout : 600000,
			success : function(data) {
				if (data['status'] == '0' || data['status'] == '2') {
					showMessage(true, data['message']);
				} else {
					showMessage(true, "Teacher time updated successfully.");
					setTimeout(function(){$('#batchSubjectTeacherMappingModel').modal('hide'); },1000);
				}
				return false;
		},
		error : function(e) {
			//showMessage(true, e.responseText);
		}
	});
}

function validateRequestBatchSubjectTeacherTime(subjectId, elementId){

	if($("#startDate"+elementId).val()==undefined || $("#startDate"+elementId).val()==''){
		//showMessage(true, 'Please enter start date.');
		$(".subjectTeacherTimeError").text('Please enter start date.');
		return false;
	}
	if($("#endDate"+elementId).val()==undefined || $("#endDate"+elementId).val()==''){
		//showMessage(true, 'Please enter end date.');
		$(".subjectTeacherTimeError").text('Please enter end date.');
		return false;
	}
	var timeDays=[];
	var i=0;
	$("input:checkbox[name=teachDays"+elementId+"]:checked").each(function() {
		if($(this).val()==''){
			$(".subjectTeacherTimeError").text('Please choose day.');
			i=1;
		}
		if($("#timeInterval"+subjectId+""+$(this).val()).val()==''){
			//showMessage(true, 'Please choose time schedule.');
			$(".subjectTeacherTimeError").text('Please choose time schedule.');
			i=1;
		}

//		var result = teacherTimeCheck($("#timeInterval"+subjectId+""+$(this).val()).val(), elementId, $(this).val());
//		console.log(result);
//		if(result===false){
//			$(".subjectTeacherTimeError").text('Selected time already schedule');
//			i=1;
//		}

		timeDays.push($("#timeInterval"+subjectId+""+$(this).val()).val());
	});
	if(i>0){
		$(".subjectTeacherTimeError").text('Please choose time schedule.');
		return false;
	}
	if (timeDays.length === 0) {
		$(".subjectTeacherTimeError").text('Please choose time schedule.');
		return false;
	}
	return true;
}

function getRequestForBatchTeacherTime(batchTeacherMappingId,subjectId,teacherId,elementId){
	var request = {};
	var authentication = {};
	var requestData = {};
	var batchTeacherMappingDTO = {}
	var batchTeacherSavedMappingDTO=[];
	var daysIds="";
	var is=0;
	batchTeacherMappingDTO['firstBatchTeacherMappingId'] = batchTeacherMappingId;
	batchTeacherMappingDTO['batchStartDate'] = chageDateFormat($("#batchStartDate").val());
	batchTeacherMappingDTO['batchEndDate'] = chageDateFormat($("#batchEndDate").val());
	batchTeacherMappingDTO['subjectId'] = subjectId;
	batchTeacherMappingDTO['oldTeacherId'] = teacherId;
	batchTeacherMappingDTO['newTeacherId'] = $("#assignTeacherId"+elementId).val();
	batchTeacherMappingDTO['steachStartDate'] = $("#startDate"+elementId).val();
	batchTeacherMappingDTO['steachEndDate'] = $("#endDate"+elementId).val();
	if($("#checkTeacher"+elementId).is(":checked")){
		batchTeacherMappingDTO['teacherCountinueCheck'] = "Y";
	}else{
		batchTeacherMappingDTO['teacherCountinueCheck'] = "N";
		batchTeacherMappingDTO['continueTeacherId'] = $("#assignContinueTeacherId"+elementId).val();
	}

	$("input:checkbox[name=teachDays"+elementId+"]:checked").each(function() {
		var  batchTeacherSavedMapping={};
		batchTeacherSavedMapping['batchTeacherMappingId'] = $(this).attr("data-batchid");
		batchTeacherSavedMapping['dayId'] = $(this).val();
		batchTeacherSavedMapping['scheduleTime'] = $("#timeInterval"+subjectId+""+$(this).val()).val();
		batchTeacherSavedMappingDTO.push(batchTeacherSavedMapping);
		is=is+1;
	});
	batchTeacherMappingDTO['batchTeacherSavedMappingList'] = batchTeacherSavedMappingDTO;
	requestData['batchTeacherMapping'] = batchTeacherMappingDTO;
	authentication['hash'] = getHash();authentication['schoolId'] = SCHOOL_ID;authentication['schoolUUID'] = SCHOOL_UUID;
	authentication['userType'] = moduleId;
	authentication['userId'] = $("#userId").val();
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	return request;
}

function changeTeacherTime(id, teacherId, elementId){
	$("#startDate"+elementId).val('');
	$("#endDate"+elementId).val('');
}

function callStudentBatchTransfer(formId,batchId,batchName,standardId, controllType,moduleId) {
	hideMessage('');
	$.ajax({
		type : "POST",
		url : getURLForHTML('dashboard','move-student-batch'),
		data : "batchId="+batchId+"&standardId="+standardId+"&controllType="+controllType+"&batchName="+batchName+"&moduleId="+moduleId,
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
        			if(controllType=='Delete'){
        				showMessage(true, 'Batch deleted successfully.');
        				setTimeout(function(){ callDashboardPageSchool(moduleId,'manage-batch-student'); },1000);
        			}else{
        				$('#batchSubjectTeacherSupportContent').html(htmlContent);
        			}
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

function getRequestForMoveBatchByStudent(formId, moduleId,controllType){
	var request = {};
	var authentication = {};
	var requestData = {};
	var batchDTO = {};
	batchDTO['userId'] = $("#"+formId+" #userId").val();
	batchDTO['batchId'] = $("#"+formId+" #batchId").val();
	batchDTO['controllType'] = controllType;
	batchDTO['moveToBatchId'] = $("#"+formId+" #tansferBatch option:selected").val();
	batchDTO['batchStudentIds'] =$("#"+formId+" #selectStudentIds").val();
	batchDTO['standardId'] = $("#"+formId+" #standardId").val();
	batchDTO['batchName'] = $("#"+formId+" #batchName").val();
	batchDTO['schoolId'] = SCHOOL_ID;
	requestData['batchDTO'] = batchDTO;
	authentication['hash'] = getHash();
	authentication['userId'] = $("#"+formId+" #userId").val();
	authentication['schoolId'] = SCHOOL_ID;
	authentication['schoolUUID'] = SCHOOL_UUID;
	authentication['userType'] = moduleId;
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	return request;
}

function transferStudent(formId,moduleId,roleModuleId,controllType){
	if(controllType !='Add'){
		if($('#tansferBatch option:selected').val()==0){
			showMessage(true, "Please select batch to move student.");
			return;
		}
	}
	var studentIds = "";
	$('#moveStudentBatch > tbody  > tr').each(function(index, tr) {
			if($(this).find(".checkStudentname").is(":checked")){
				studentIds = studentIds + $(this).find(".checkStudentname").val()+',';
			}
		});
	if(studentIds==""){
		showMessage(true, "Please select atleast one student");
		return;
	}else{
		$("#selectStudentIds").val(studentIds.substring(0, studentIds.length-1));
		console.log("student Ids are ",studentIds);
	}

	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForHTML('dashboard','move-batch-student'),
		data : JSON.stringify(getRequestForMoveBatchByStudent(formId,moduleId,controllType)),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				showMessage(true, data['message']);
			} else {
				showMessage(true, data['message']);
				$('#batchStudentTransferModel').modal('hide');
				setTimeout(function(){ callDashboardPageSchool(roleModuleId,'manage-batch-student'); },1000);
			}
			return false;
		},
		error : function(e) {
			//showMessage(true, e.responseText);
			console.log("ERROR : ", e);
		}
	});
}


function callTeacherTimeScheduleBatch(batchId,subjectId,teacherId) {
	hideMessage('');
	$.ajax({
		type : "POST",
		url : getURLForHTML('dashboard','batch-subject-teacher-timeschedule-content'),
		data : "batchId="+batchId+"&subjectId="+subjectId+"&teacherId="+teacherId,
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
        			$("#batch-schedule"+subjectId+"").html(htmlContent);
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

function teacherTimeCheck(scheduleTime, elementId, dayid, batchId) {
	var result=false;
	hideMessage('');
	$(".subjectTeacherTimeError").text('');
	var teacherId = $("#assignTeacherId"+elementId).val();
	console.log($("#assignTeacherId"+elementId).val());
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForHTML('dashboard','teacher-time-available'),
		data : JSON.stringify(getCallRequestForTeacherTime(teacherId, scheduleTime, dayid, elementId)),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		async:false,
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				result=true;
				//result = batchTimeCheck(scheduleTime, elementId, dayid, batchId);
			}else{
				$(".subjectTeacherTimeError").text('Selected time already scheduled');
				$("#teachDays"+elementId+dayid).prop("checked",false);
				$("#timeInterval"+elementId+dayid).val('');
				result=false;
			}
		},
		error : function(e) {
			//showMessage(true, e.responseText);
			console.log("ERROR : ", e);
		}
	});
	return result;
}

function getCallRequestForTeacherTime(teacherId, scheduleTime, dayid, subjectId){
	var stDate = $("#startDate"+subjectId).val();
	var enDate = $("#endDate"+subjectId).val();
	var request = {};
	var authentication = {};
	var requestData = {};
	requestData['requestKey'] = 'TEACHER-TIME-AVAILABLE';
	requestData['requestValue'] = teacherId;
	requestData['requestExtra'] = scheduleTime;
	requestData['requestExtra1'] = dayid;
	requestData['requestExtra2'] = subjectId;

	if(stDate!=undefined && stDate!=''){
		requestData['requestExtra3'] = stDate.split("-")[2]+'-'+stDate.split("-")[1]+'-'+stDate.split("-")[0];
	}
	if(enDate!=undefined && enDate!=''){
		requestData['requestExtra4'] = enDate.split("-")[2]+'-'+enDate.split("-")[1]+'-'+enDate.split("-")[0];
	}
	authentication['hash'] = getHash();authentication['schoolId'] = SCHOOL_ID;authentication['schoolUUID'] = SCHOOL_UUID;
	authentication['userType'] = moduleId;
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	return request;
}

function batchTimeCheck(scheduleTime, elementId, dayid, batchId) {
	var result=false;
	hideMessage('');
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForHTML('dashboard','student-subject-time-available'),
		data : JSON.stringify(getCallRequestForBatchTime(batchId, scheduleTime, dayid)),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		async:false,
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				result=true;
			}else{
				$(".subjectTeacherTimeError").text('Selected time already scheduled');
				$("#teachDays"+elementId+dayid).prop("checked",false);
				$("#timeInterval"+elementId+dayid).val('');
				result=false;
			}
		},
		error : function(e) {
			//showMessage(true, e.responseText);
			console.log("ERROR : ", e);
		}
	});
	return result;
}

function getCallRequestForBatchTime(batchId, scheduleTime, dayid){
	var request = {};
	var authentication = {};
	var requestData = {};
	requestData['requestKey'] = 'BATCH-TIME-AVAILABLE';
	requestData['requestValue'] = batchId;
	requestData['requestExtra'] = scheduleTime;
	requestData['requestExtra1'] = dayid;
	authentication['hash'] = getHash();authentication['schoolId'] = SCHOOL_ID;authentication['schoolUUID'] = SCHOOL_UUID;
	authentication['userType'] = moduleId;
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	return request;
}

function calendarDates(replaceId, startDate, slotType,userId) {
	customLoader(true);
	var inActDate = $("#inActDate").val();
	$.ajax({
		type : "POST",
		url : getURLForHTML('dashboard','calendar-dates'),
		data : {startDate:startDate, slotType:slotType, disabledDate:inActDate,userId:userId},
		dataType : 'html',
		global : false,
		success : function(htmlContent) {
			if(htmlContent!=""){
				customLoader(false);
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
			customLoader(false);
			//showMessage(true, e.responseText);
			return false;
		}
	});
}

function editBatchDetails(formId, moduleId,roleModuleId) {
	hideMessage('');
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForHTML('dashboard','edit-batch-details'),
		data : JSON.stringify(getRequestForEditBatchDetails(formId, moduleId)),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				showMessage(true, data['message']);
			} else {
				showMessage(true, data['message']);
				$('#'+formId)[0].reset();
				$('#batchStudentTransferModel').modal('hide');
				setTimeout(function(){
					callDashboardPageSchool(roleModuleId,'manage-batch-student');
				},1000);
			}
			return false;
		},
		error : function(e) {
			//showMessage(true, e.responseText);
			console.log("ERROR : ", e);
		}
	});
}

function getRequestForEditBatchDetails(formId, moduleId){
	var request = {};
	var authentication = {};
	var requestData = {};
	var batchDTO = {};
	batchDTO['userId'] = $("#"+formId+" #userId").val();
	batchDTO['batchId'] = $("#"+formId+" #batchId").val();
	batchDTO['batchName'] = $("#"+formId+" #batchNameEdit").val();
	batchDTO['batchStartDate'] = $("#"+formId+" #batchStartDate").val();
	batchDTO['batchEndDate'] = $("#"+formId+" #batchEndDate").val();
	batchDTO['batchHolidayDate'] = $("#"+formId+" #batchHolidayDate").val();
	batchDTO['timeHrsFrom'] = $("#"+formId+" #timeHrsFrom").val();
	batchDTO['timeMinFrom'] = $("#"+formId+" #timeMinFrom").val();
	batchDTO['timeInterval'] = $("#"+formId+" #timeInterval").val();
	batchDTO['batchStudentLimit'] = $("#"+formId+" #batchLimit").val();
	batchDTO['fakeCount'] = $("#"+formId+" #batchFakeCount").val();
	batchDTO['admissionProcess']=$("#"+formId+" #admissionProcess").val();
	batchDTO['enableLms']=$("#"+formId+" #enableLms").val();
	batchDTO['periodTime'] = $("#"+formId+" #batchPeriodTime").val();
	batchDTO['batchDuration'] = $("#"+formId+" #batchDuration").val();
	batchDTO['batchDurationMin'] = $("#"+formId+" #batchDurationMin").val();
	batchDTO['recessTime'] = $("#"+formId+" #recessTime").val();
	batchDTO['afterPeriod'] = $("#"+formId+" #afterPeriod").val();
	batchDTO['classRoomLink'] = $("#"+formId+" #batchLink").val();
	batchDTO['meetingVendor'] = $("#"+formId+" #meetingVendor").val();
	batchDTO['joiningType'] = $("#"+formId+" #joiningType").val();
	batchDTO['schoolId'] = SCHOOL_ID;
	requestData['batchDTO'] = batchDTO;
	authentication['hash'] = getHash();
	authentication['userId'] = $("#"+formId+" #userId").val();
	authentication['schoolId'] = SCHOOL_ID;
	authentication['schoolUUID'] = SCHOOL_UUID;
	authentication['userType'] = moduleId;
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	return request;
}

function removeTeacherTimeTable(batchId,subjectId,teacherId,startDate, batchEndDate){
		hideMessage('');
		if(teacherId==''){
			return false;
		}
		$.ajax({
			type : "POST",
			contentType : "application/json",
			url : getURLForHTML('dashboard','remove-teacher-time-table'),
			data : JSON.stringify(getRequestForRemoveTeacherTimeTable(batchId,subjectId,teacherId,startDate, batchEndDate)),
			dataType : 'json',
			cache : false,
			//timeout : 600000,
				success : function(data) {
					if (data['status'] == '0' || data['status'] == '2') {
						showMessage(true, data['message']);
					} else {
						showMessage(true, "Teacher time remove successfully.");
						setTimeout(function(){$('#batchSubjectTeacherMappingModel').modal('hide'); },1000);
					}
					return false;
			},
			error : function(e) {
				//showMessage(true, e.responseText);
			}
		});
	}


	function getRequestForRemoveTeacherTimeTable(batchId,subjectId,teacherId,startDate, batchEndDate){
		var request = {};
		var authentication = {};
		var requestData = {};
		var batchTeacherMappingDTO = {}
		batchTeacherMappingDTO['batchId'] = batchId;
		batchTeacherMappingDTO['subjectId'] = subjectId;
		batchTeacherMappingDTO['teacherId'] = teacherId;
		batchTeacherMappingDTO['steachStartDate'] = startDate;
		var batchEndDates = batchEndDate.split("-")[2]+'-'+batchEndDate.split("-")[1]+'-'+batchEndDate.split("-")[0]
		batchTeacherMappingDTO['batchEndDate'] = batchEndDates;
		requestData['batchTeacherMapping'] = batchTeacherMappingDTO;
		authentication['hash'] = getHash();authentication['schoolId'] = SCHOOL_ID;authentication['schoolUUID'] = SCHOOL_UUID;
		authentication['userType'] = moduleId;
		authentication['userId'] = $("#userId").val();
		request['authentication'] = authentication;
		request['requestData'] = requestData;
		return request;
	}

	function updateClassLink(formId, moduleId, roleModuleId) {
		hideMessage('');
		$(".error-message-link").text('');
		if($("#"+formId+" #classLink").val()==''){
			$(".error-message-link").text('Please fill classroom link');
			return false;
		}
		if($("#"+formId+" #teacherId").val()==''){
			$(".error-message-link").text('teacher not found');
			return false;
		}
		if($("#"+formId+" #subjectId").val()==''){
			$(".error-message-link").text('subject not found');
			return false;
		}
		$.ajax({
			type : "POST",
			contentType : "application/json",
			url : getURLForHTML('dashboard','create-teacher-class-link'),
			data : JSON.stringify(getRequestForUpdateClassLink(formId, moduleId)),
			dataType : 'json',
			cache : false,
			timeout : 600000,
			success : function(data) {
				if (data['status'] == '0' || data['status'] == '2') {
					showMessage(true, data['message']);
				} else {
					showMessage(true, data['message']);
					$('#'+formId)[0].reset();
					$('#batchCreateTime').modal('hide');
					setTimeout(function(){ callDashboardPageSchool(roleModuleId,'batch-schedule','',$("#userId").val()); }, 1000);
				}
				return false;
			},
			error : function(e) {
				//showMessage(true, e.responseText);
				console.log("ERROR : ", e);
			}
		});
	}

	function getRequestForUpdateClassLink(formId, moduleId){
		var request = {};
		var authentication = {};
		var requestData = {};
		var batchTeacherMappingDTO = {};
		batchTeacherMappingDTO['batchId'] =$("#"+formId+" #batchId").val();
		batchTeacherMappingDTO['teacherId'] = $("#"+formId+" #teacherId").val();
		batchTeacherMappingDTO['subjectId'] = $("#"+formId+" #subjectId").val();
		batchTeacherMappingDTO['steachStartDate'] = $("#"+formId+" #startDate").val();
		batchTeacherMappingDTO['startTime'] = $("#"+formId+" #startTime").val();
		batchTeacherMappingDTO['meetingLink'] = $("#"+formId+" #classLink").val();
		batchTeacherMappingDTO['meetingVendor'] = $("#"+formId+" #meetingVendor").val();
		batchTeacherMappingDTO['meetingGenerateStatus'] = "MANUAL";
		requestData['batchTeacherMapping'] = batchTeacherMappingDTO;
		authentication['hash'] = getHash();
		authentication['userId'] = $("#"+formId+" #userId").val();
		authentication['schoolId'] = SCHOOL_ID;
		authentication['schoolUUID'] = SCHOOL_UUID;
		authentication['userType'] = moduleId;
		request['authentication'] = authentication;
		request['requestData'] = requestData;
		return request;
	}

	function sendMailStudentMoveBatch(formId, moduleId, batchId, studentId) {
		hideMessage('');
		$.ajax({
			type : "POST",
			contentType : "application/json",
			url : getURLForHTML('dashboard','send-mail-student-move-batch'),
			data : JSON.stringify(getRequestForStudentMoveBatch(formId, moduleId, batchId, studentId)),
			dataType : 'json',
			cache : false,
			timeout : 600000,
			success : function(data) {
				if (data['status'] == '0' || data['status'] == '2') {
					showMessage(true, data['message']);
				} else {
					showMessage(true, data['message']);
				}
				return false;
			},
			error : function(e) {
				//showMessage(true, e.responseText);
				console.log("ERROR : ", e);
			}
		});
	}

	function sendMailTeacherMoveBatch(formId, moduleId, batchId, teacherId, userId,mailType) {
		hideMessage('');
		$.ajax({
			type : "POST",
			contentType : "application/json",
			url : getURLForHTML('dashboard','send-mail-teacher-move-batch'),
			data : JSON.stringify(getRequestForTeacherMoveBatch(formId, moduleId, batchId, teacherId, userId,mailType)),
			dataType : 'json',
			cache : false,
			timeout : 600000,
			success : function(data) {
				if (data['status'] == '0' || data['status'] == '2') {
					showMessage(true, data['message']);
				} else {
					showMessage(true, data['message']);
				}
				return false;
			},
			error : function(e) {
				//showMessage(true, e.responseText);
				console.log("ERROR : ", e);
			}
		});
	}

	function getRequestForTeacherMoveBatch(formId, moduleId,  batchId, teacherId, userId,mailType){
		console.log('inside');
		var request = {};
		var authentication = {};
		var requestData = {};
		var teacherDetailsDTO = {};
		teacherDetailsDTO['batchId'] = batchId;
		teacherDetailsDTO['mailType'] = mailType;
		if(mailType=='SendToOne'){
			teacherDetailsDTO['teacherId'] = teacherId;
		}else{
			teacherDetailsDTO['ids'] = $("#batchMoveForm #selectTeacherIdsForMail").val();
		}
		requestData['teacherDetailsDTO'] = teacherDetailsDTO;
		authentication['hash'] = getHash();authentication['schoolId'] = SCHOOL_ID;authentication['schoolUUID'] = SCHOOL_UUID;
		authentication['userId'] = userId;
		authentication['userType'] = moduleId;
		request['authentication'] = authentication;
		request['requestData'] = requestData;
		return request;
	}


	function getRequestForStudentMoveBatch(formId, moduleId,  batchId, studentId){
		var request = {};
		var authentication = {};
		var requestData = {};
		var batchStudentDetailsDTO = {};
		batchStudentDetailsDTO['batchId'] = batchId;
		batchStudentDetailsDTO['studentId'] = studentId;
		requestData['batchStudentDetailsDTO'] = batchStudentDetailsDTO;
		authentication['hash'] = getHash();authentication['schoolId'] = SCHOOL_ID;authentication['schoolUUID'] = SCHOOL_UUID;
		authentication['userType'] = moduleId;
		request['authentication'] = authentication;
		request['requestData'] = requestData;
		return request;
	}

function inactiveTeacherTimeTableSchedule(batchId,subjectId,batchName,standardId) {
	hideMessage('');
	$.ajax({
		type : "POST",
		url : getURLForHTML('dashboard','inactive-batch-subject'),
		data : "batchId="+batchId+"&subjectId="+subjectId,
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
        			showMessage(true, "Batch Subject deleted successfully.");
        			setTimeout(function(){ callBatchSubjectAndTeacherMapping('formId',batchId,batchName,standardId,'View',121);},1000);

        		}
        		return false;
			}
		},
		error : function(e) {
			console.log(e)
			return false;
		}
	});
}

function studentRemoveFromBatch(formId, moduleId, batchId, studentId,batchName,standardId) {
		hideMessage('');
		$.ajax({
			type : "POST",
			contentType : "application/json",
			url : getURLForHTML('dashboard','remove-student-from-batch'),
			data : JSON.stringify(getRequestForStudentRemoveFromBatch(formId, moduleId, batchId, studentId)),
			dataType : 'json',
			cache : false,
			timeout : 600000,
			success : function(data) {
				if (data['status'] == '0' || data['status'] == '2') {
					showMessage(true, data['message']);
				} else {
						showMessage(true, data['message']);
						$('#batchStudentTransferModel').modal('hide');
	        			setTimeout(function(){ callStudentBatchTransfer('formId',batchId,batchName,standardId,'Edit',moduleId);},1000);
				}
				return false;
			},
			error : function(e) {
				//showMessage(true, e.responseText);
				console.log("ERROR : ", e);
			}
		});
	}

	function getRequestForStudentRemoveFromBatch(formId, moduleId,  batchId, studentId){
		var request = {};
		var authentication = {};
		var requestData = {};
		var batchStudentDetailsDTO = {};
		batchStudentDetailsDTO['batchId'] = batchId;
		batchStudentDetailsDTO['studentId'] = studentId;
		requestData['batchStudentDetailsDTO'] = batchStudentDetailsDTO;
		authentication['userId'] =$('#userId').val();
		authentication['hash'] = getHash();authentication['schoolId'] = SCHOOL_ID;authentication['schoolUUID'] = SCHOOL_UUID;
		authentication['userType'] = moduleId;
		request['authentication'] = authentication;
		request['requestData'] = requestData;
		return request;
	}

function changeVendor(formId, elementId, toElement){
	if($('#'+formId+' #'+elementId).val()=='External'){
		$('#'+formId+' #'+toElement).attr('readonly', false)
	}else{
		$('#'+formId+' #'+toElement).val('')
		$('#'+formId+' #'+toElement).attr('readonly', true)
	}
	if($('#'+formId+' #joiningType').val()=='Multiple'){
		$('#'+formId+' #'+toElement).val('')
	}
}

function changeJoiningType(formId, toElement){
	if($('#'+formId+' #joiningType').val()=='Multiple'){
		$('#'+formId+' #'+toElement).val('')
	}
}

function getBatchScheduleByUser(replaceDiv, userId, moduleId) {
	$.ajax({
		type : "POST",
		url : getURLForHTML('dashboard','teacher-batch-time-schedule?moduleId='+moduleId+'&userId='+userId),
		dataType : 'html',
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
        			return false;
        		}
        		$('#'+replaceDiv).html(htmlContent);
        		return false;
			}
		}
	});
}

function getRequestForSaveJoinLinkInfo(formId, meetingId){
	var request = {};
	var authentication = {};
	var requestData = {};
	var batchDTO = {};
	batchDTO['userId'] = $("#"+formId+" #userId").val();
	batchDTO['joinMeetingId'] = meetingId;
	batchDTO['controllType'] = "add";
	batchDTO['joinEntityCode'] = $("#"+formId+" #teacherCode").val();
	batchDTO['schoolId'] = SCHOOL_ID;
	requestData['batchDTO'] = batchDTO;
	authentication['hash'] = getHash();
	authentication['userId'] = $("#"+formId+" #userId").val();
	authentication['schoolId'] = SCHOOL_ID;
	authentication['schoolUUID'] = SCHOOL_UUID;
	authentication['userType'] = moduleId;
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	return request;
}

function saveJoinLinkInfo(formId, meetingLinkId, meetingUrl){
	showMessage('');
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForHTML('dashboard','save-joinlink-info'),
		data : JSON.stringify(getRequestForSaveJoinLinkInfo(formId,meetingLinkId)),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				showMessage(false, data['message']);
			} else {
				showMessage(true, data['message']);
				$('#joinUrlInfo').modal('hide');
				window.open(meetingUrl, '_blank');
			}
			return false;
		},
		error : function(e) {
			//showMessage(true, e.responseText);
			console.log("ERROR : ", e);
		}
	});
}


function employeeCodeCheck(empcode, moduleId) {
	var result="";
	hideMessageTheme2('');
	if (empcode=='') {
		showMessageTheme2(false, 'Code is either empty or invalid');
		return false
	}
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForHTML('dashboard','is-usercode-available'),
		data : JSON.stringify(getCallRequestForEmpcodeCheck(empcode, moduleId)),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		async:false,
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				showMessageTheme2(false, "Code not exist");
				result=false;
			}else{
				//showMessageTheme2(true, "Successfully match your empcode");
				result=true;
			}
		},
		error : function(e) {
			//showMessage(true, e.responseText);
			console.log("ERROR : ", e);
		}
	});
	return result;
}

function getCallRequestForEmpcodeCheck(empcode, module){
	var request = {};
	var authentication = {};
	var requestData = {};
	requestData['requestKey'] = 'EMPCODE-AVAILABLE';
	requestData['requestValue'] = empcode;
	authentication['hash'] = getHash();authentication['schoolId'] = SCHOOL_ID;authentication['schoolUUID'] = SCHOOL_UUID;
	authentication['userType'] = module;
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	return request;
}

function sendOrCreateMeetingUser(formId, moduleId,roleModuleId) {
	hideMessage('');
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForHTML('dashboard','send-or-create-meeting-user'),
		data : JSON.stringify(getRequestForSendOrCreateMeetingUser(formId, moduleId)),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				showMessage(true, data['message']);
			} else {
				$.each(data.zoomUsers, function(k, v) {
					$('#meetingStatus_'+v.userId).html(v.zoomStatus);
				});
				showMessage(true, data['message']);
			}
			return false;
		}
	});
}
function getRequestForSendOrCreateMeetingUser(formId, moduleId){
	var request = {};
	var authentication = {};
	var requestData = {};
	var batchDTO = {};
	batchDTO['userId'] = $("#"+formId+" #userId").val();
	batchDTO['batchId'] = $("#"+formId+" #batchId").val();
	batchDTO['schoolId'] = SCHOOL_ID;
	requestData['batchDTO'] = batchDTO;
	authentication['hash'] = getHash();
	authentication['userId'] = $("#"+formId+" #userId").val();
	authentication['schoolId'] = SCHOOL_ID;
	authentication['schoolUUID'] = SCHOOL_UUID;
	authentication['userType'] = moduleId;
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	return request;
}