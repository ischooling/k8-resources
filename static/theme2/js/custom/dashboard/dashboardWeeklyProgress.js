$(document).ready(function() {
	
});
function sendSWPREmail(studentId, uploadId){
	$('#sendSWPR').attr('disabled','disabled');
	//goAhead('send-mail-student-weekly-progress-report?studentId='+studentId+'&uploadId='+uploadId+'&forDownload=false', '');
	$.ajax({
		type : "POST",
		url : getURLForHTML('dashboard','send-mail-student-weekly-progress-report'),
		data : 'studentId='+studentId+'&uploadId='+uploadId+'&forDownload=false',
		dataType : 'html',
		cache : false,
		timeout : 600000,
		success : function(htmlContent) {
			alert("Progress report has been sent");
		},
		error : function(e) {
			$('#sendSWPR').removeAttr('disabled','disabled');
			//showMessage(true, TECHNICAL_GLITCH);
			return false;
		}
	});
}

function setCalenderDate(disbleDates){
	console.log($('#semesterId :selected').attr('semesterDateStart')+' - '+$('#semesterId :selected').attr('semesterDateEnd'));
	var startDate = new Date($('#semesterId :selected').attr('semesterDateStart'));
	//startDate.setMonth(startDate.getMonth() - 5);
	var endDate = new Date($('#semesterId :selected').attr('semesterDateEnd'));
	endDate.setDate(endDate.getDate() + 7);
	console.log(startDate+' - '+endDate);
	$("#frequencyDate").datepicker("remove");
	$('#frequencyDate').val('');
	$("#frequencyDate").datepicker({
    	startDate : startDate,
		endDate : endDate,
		format : 'mm-dd-yyyy',
        autoclose: true,
        daysOfWeekDisabled: disbleDates,
    });
}
function showSWPRForUpload(studentId, studentName, standardId){
	$('#swprUploadModelTitleUpload').html('Upload Weekly Progress Report for '+studentName)
	callSWPRForUpload('SWPRUploadForm', studentId, standardId);
	$('#swprUploadModule').modal('show');
}
function showSWPRForView(studentId, studentName, standardId){
	$('#swprUploadModelTitleView').html('View Weekly Progress Report for '+studentName)
	callSWPRForUpload('SWPRUploadForm', studentId, standardId);
	$('#swprViewModule').modal('show');
}
function callSWPRForUpload(formId, studentId, standardId) {
	hideMessage('');
	$.ajax({
		type : "POST",
		url : getURLForHTML('dashboard','get-swpr-for-upload'),
		data : "studentId="+studentId+"&standardId="+standardId,
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
        			}else {
        				showMessage(true, stringMessage[1]);
        			}
        		} else {
        			$('#swprUploadModuleContents').html(htmlContent);
        		}
        		return false;
			}
		},
		error : function(e) {
			//showMessage(true, TECHNICAL_GLITCH);
			return false;
		}
	});
}
function uploadSWPRCSV(formId, studentId, standardId) {
	hideMessage('');
	if($('#semesterId').val()==''){
		showMessage(true, 'Please select session');
		return false;
	}
	if($('#reportId').val()==''){
		showMessage(true, 'Please select Report Type');
		return false;
	}
	if($('#frequencyDate').val()==''){
		showMessage(true, 'Please select weekly report date');
		return false;
	}
	if($('#fileupload1Hash').val()==''){
		showMessage(true, 'Please upload csv file');
		return false;
	}
	var frequencyDate =$('#frequencyDate').val();
	frequencyDate = frequencyDate.split('-');
	var uploadDate = frequencyDate[2]+'-'+frequencyDate[0]+'-'+frequencyDate[1];
	var startDate = $('#startDate').val();
	if (startDate == undefined) {
		var uploadstartDate = null;
	} else {
		startDate = startDate.split('-');
		var uploadstartDate = startDate[2] + '-' + startDate[0] + '-'+ startDate[1];
		
	}
	var endDate =$('#endDate').val();
	if (endDate== undefined) {
		var uploadendDate = null;
	} else {
		endDate = endDate.split('-');
		var uploadendDate = endDate[2]+'-'+endDate[0]+'-'+endDate[1];
		
	}
	var retrievedDate =$('#retrievedDate').val();
	if (retrievedDate== undefined) {
		var uploadRetrievedDate = null;
	} else {
		retrievedDate = retrievedDate.split('-');
		var uploadRetrievedDate = retrievedDate[2]+'-'+retrievedDate[0]+'-'+retrievedDate[1];
		
	}
	var payload = "studentId="+studentId
					+'&uploadHashId='+$('#fileupload1Hash').val()
					+'&semesterId='+$('#semesterId').val()
					+'&uploadDate='+uploadDate
					+'&standardId='+standardId
					+'&reportId='+$('#reportId').val()
					+'&uploadstartDate='+uploadstartDate
					+'&uploadendDate='+uploadendDate
					+'&uploadRetrievedDate='+uploadRetrievedDate;
	$.ajax({
		type : "POST",
		url : getURLForHTML('dashboard','upload-student-weekly-progress-report'),
		data : payload,
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
        			}else {
        				showMessage(true, stringMessage[1]);
        			}
        		}else{
        			showMessage(false, stringMessage[1]);
        		}
        		setTimeout(function(){
					hideMessage('');
					callSWPRForUpload('SWPRUploadForm', studentId, standardId);
				}, 3100);
        		return false;
			}
		},
		error : function(e) {
		//	showMessage(true, TECHNICAL_GLITCH);
			return false;
		}
	});
}

function sendMailStudentGradebookSummery(payload, uploadId, startdate, enddate){
	subReportType=$("#subReportTypevalue").val();
	//goAhead('send-mail-student-weekly-progress-report?studentId='+studentId+'&uploadId='+uploadId+'&forDownload=false', '');
	$.ajax({
		type : "POST",
		url : getURLForHTMLWithoutUniq('dashboard','send-mail-student-get-user-gradebook'),
		data : 'payload='+payload+'&uploadId='+uploadId+'&forDownload=false&startdate='+startdate+'&enddate='+enddate+'&subReportType='+subReportType,
		dataType : 'html',
		cache : false,
		timeout : 600000,
		success : function(htmlContent) {
			alert("Progress report has been sent");
		},
		error : function(e) {
			$('#sendSWPR').removeAttr('disabled','disabled');
			//showMessage(true, TECHNICAL_GLITCH);
			return false;
		}
	});
}
function callDateWiseGradebokSummery(lmsUserId,lmsproid,stuserid) {
	var startdate = $("#startdate").val();
	var enddate = $("#enddate").val();
	if(startdate=='' && enddate==''){
		showMessageTheme2(0, 'Please select report start date and end date','', false);
		return false;
	} 
	var selectedDate=new Date(startdate);
	var selectedDate2=new Date(enddate);
	
	if(selectedDate>selectedDate2){
		showMessageTheme2(0, 'Please select start date must be less then end date','', false);
		return false;
	}
	var subReportType = $("#subReportTypevalue").val();
	
	hideMessage('');
	$.ajax({
		type : "POST",
		url : getURLForHTML('dashboard','get-user-gradebook-content'),
		data : "lmsUserId="+lmsUserId+"&lmsProId="+lmsproid+"&stuserId="+stuserid+"&startdate="+startdate+"&enddate="+enddate+"&subReportType="+subReportType,
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
        			$("#enrollMentGrade").html(htmlContent);
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