const dthw = new DataTransfer();
var homeworkAttachment=[]
function submitTask(formId,moduleId,moduleId1) {
	hideMessage('');
	if(!validateRequestForSubmitTask(formId,moduleId)){
		return false;
	}
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForHTML('dashboard','task-submit'),
		data : JSON.stringify(getRequestForSubmitTask(formId, moduleId)),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				showMessage(true, data['message']);
			} else {
				showMessage(false, data['message']);
				homeworkAttachment=[];
				dthw.clearData();
				setTimeout(function (){callDashboardPageSchool(moduleId1,'assign-home-work');},1000);
			}
			return false;
		},
		error : function(e) {
			//showMessage(true, e.responseText);
			return false;
		}
	});
}

function getRequestForSubmitTask(formId,moduleId,moduleId1){
	console.log("submitTask");
	var request = {};
	var authentication = {};
	var requestData = {};
	var taskdto = {};
	taskdto['taskId'] = $("#"+formId+" #taskId").val();
	taskdto['schoolId'] = $("#"+formId+" #schoolId").val();
	taskdto['standardId'] = $("#"+formId+" #standardId").val();
	taskdto['batchId'] = $("#"+formId+" #batchId").val();
	taskdto['teacherId'] = $("#"+formId+" #teacherId").val();
	taskdto['subjectId'] = $("#"+formId+" #subjectId").val();
	taskdto['lessonId']= $("#"+formId+" #lessonId").val();
	taskdto['taskName'] = $("#"+formId+" #taskName").val();
	taskdto['taskTitle'] = escapeCharacters($("#"+formId+" #taskTitle").val());
	
	var startDateEndDate = $("#"+formId+" #startDateEndDate").val();
	var dates = startDateEndDate.split(" - ");
	taskdto['startDate'] = dates[0];
	taskdto['endDate'] = dates[1];
	if(editor1!=undefined){
		taskdto['taskDescription'] = escapeCharacters(editor1.getData());
	}
	taskdto['replyRequired'] = $("#"+formId+" #replyRequired").val();
	taskdto['homeworkAttachment']=homeworkAttachment;
	requestData['taskdto'] = taskdto;
	authentication['hash'] = getHash();authentication['schoolId'] = SCHOOL_ID;authentication['schoolUUID'] = SCHOOL_UUID;
	authentication['userType'] = moduleId;
	authentication['userId'] = $("#"+formId+" #userId").val();
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	return request;
}

function validateRequestForSubmitTask(formId,moduleId){
	if($("#"+formId+" #standardId").val()==''){
		showMessage(1, "Please select grade");
		return false;
	}
	if($("#"+formId+" #standardId").val()==''){
		showMessage(1, "Please select grade");
		return false;
	}
	if($("#"+formId+" #subjectId").val()==''){
		showMessage(1, "Please select subject");
		return false;
	}
	if($("#"+formId+" #taskName").val()==''){
		showMessage(1, "Please select task type");
		return false;
	}
	if($("#"+formId+" #taskTitle").val()==''){
		showMessage(1, "Please select task title");
		return false;
	}
	if($("#"+formId+" #replyRequired").val()==''){
		showMessage(1, "Please select reply Required");
		return false;
	}
	
	return true;
}

function submitReplyTask(formId,moduleId, callFrom) {
	
	if(tt=='theme2'){
		hideMessageTheme2('');
	}else{
		hideMessage('');
	}
	var fdata = new FormData();
	fdata.append('userId',$("#"+formId+" #userId").val());
	fdata.append('taskId',$("#"+formId+" #taskId").val());

	var totalfiles = 0
	if(callFrom=='LMS'){
		totalfiles = dt.files.length;
	}else{
		totalfiles = $("#"+formId+" #fileuploadHomework").get(0).files.length;
	}
	if(totalfiles==0){
		if(tt=='theme2'){
			showMessageTheme2(0, 'Please choose atleast one file',true);
		}else if(tt=='theme1'){
			showMessage(false, 'Please choose atleast one file');
		}
		return;
	}
	if(callFrom=='LMS'){
		for(var j = 0; j < dt.files.length; j++){
			fdata.append("replyAttachment[]", dt.files[j]);
		}
	}else{
		for (var index = 0; index < totalfiles; index++) {
			fdata.append("replyAttachment[]", $("#"+formId+" #fileuploadHomework").get(0).files[index]);
		}
	}
	
	// if(editor1!=undefined){
	// 	fdata.append('contentReply',escapeCharacters(editor1.getData()));
	// }else{
	// 	fdata.append('contentReply',$("#"+formId+" #contentReply").val());
	// }
	customLoader(true);
	$.ajax({
		type : "POST",
		url : getURLForHTML('dashboard','student-homework-submit'),
		data : fdata,
		dataType : 'json',
		type: "POST",
		processData: false,
		contentType: false,
		async : false,
		global:false,
		enctype: 'multipart/form-data',
		success : function(data) {
			customLoader(false);
			if (data['status'] == '0' || data['status'] == '2') {
				showMessage(true, data['message']);
			} else {
				if(callFrom=='LMS'){
					showMessageTheme2(1, 'Homework Submitted','',true);
					$("#homeWorkSubmissionModalID").modal('hide');
					dt.clearData();
				}else{
					if(tt=='theme2'){
						//showMessageTheme2(2, TECHNICAL_GLITCH,'',true);
						showMessageTheme2(1, data['message'],'',true);
					}else if(tt=='theme1'){
						showMessage(false, data['message']);
					}

					$('#'+formId)[0].reset();
					$("#studentHomworkModel").modal('hide');
					$('.modal-backdrop').remove();
				}
				var taskId=$("#"+formId+" #taskId").val();
				if(localStorage.getItem('hw_detail'+taskId)!=null && localStorage.getItem('hw_detail'+taskId)!='undefined'){
					var hwdata = JSON.parse(localStorage.getItem('hw_detail'+taskId));
					if(hwdata.length>0){
						hwdata[0]['homeworkAttachmentStudentLocal']=uploadResources;
						hwdata[0].seenStatus='SEEN';
						uploadResources=[];
					}
					if(hwdata[0].taskReply.length>0){
						for(var t=0;t<hwdata[0].taskReply.length;t++){
							taskReply = hwdata[0].taskReply[t];
							taskReply.replyStatus='SUBMITTED';
							hwdata[0].taskReply[t]=taskReply;
						}
					}
					
					localStorage.setItem('hw_detail'+taskId,JSON.stringify(hwdata))
				}
			}
			return false;
		},
		error : function(e) {
			customLoader(false);
			//showMessage(true, e.responseText);
			return false;
		}
	});
}


 
  
function encodeImageFileAsURL(element) {  
	var imagebase64 = ""; 
    var files = element.files;
	
	for (var i = 0; i < files.length; i++) {
		homeworkAttach = {};
		homeworkAttach['fileName'] = files[i].name;
		homeworkAttach['fileType'] = "IMAGE";
		// var dvPreview = $(".dvImages1").last().clone(true);
        // var dvImages = $("#dvImages");
		
	    var reader = new FileReader();  
	    reader.onloadend = function() {  
	        imagebase64 = reader.result.substr(reader.result.indexOf(',') + 1);  
			homeworkAttach['fileContent'] = imagebase64;
			homeworkAttachment.push(homeworkAttach);
			//localStorage.setItem("homeworkAttachment", JSON.stringify(homeworkAttachment));
			console.log(homeworkAttachment);
			var img = $("<img />");
             	img.attr("style", "height:100px;width: 100px");
                img.attr("src", reader.result);
                dvPreview.append(img);
                dvImages.append(dvPreview);
	    }  
	    reader.readAsDataURL(files[i]); 
	}

}


function base64ImageFileAsURL(f) {
	//const uploadFilesLength=document.getElementById('attach-resource')
	//var f = evt.target.files[0];
	var reader = new FileReader();
	reader.onload = (function(theFile) {
		return function(e) {
			var binaryData = e.target.result;
			var base64String = window.btoa(binaryData);
			// var UploadFile = {};
			// UploadFile['resourceName']=f.name;
			// UploadFile['resourceFrom']='L';
			// UploadFile['resourceType']=filetype;//getFileTyp(f.type);
			// UploadFile['resourceContent']=base64String;
			// uploadResources.push(UploadFile);

			homeworkAttach = {};
			homeworkAttach['fileName'] = f.name;
			homeworkAttach['fileType'] = "IMAGE";
			homeworkAttach['fileContent'] = base64String;
			homeworkAttachment.push(homeworkAttach);
			console.log(homeworkAttachment);
		};
	})(f);
  reader.readAsBinaryString(f);
}


function submitSchoolDiaryTeacher(formId,moduleId) {
	hideMessage('');
	if(!validateRequestForSchoolDiaryTeacher(formId,moduleId)){
		return false;
	}
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForHTML('dashboard','teacher-diary-remark-submit'),
		data : JSON.stringify(getRequestForSchoolDiaryTeacher(formId, moduleId)),
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

function getRequestForSchoolDiaryTeacher(formId,moduleId){
	var request = {};
	var authentication = {};
	var requestData = {};
	var taskdto = {};
	taskdto['taskId'] = $("#"+formId+" #diaryId").val();
	taskdto['schoolId'] = $("#"+formId+" #schoolId").val();
	taskdto['standardId'] = $("#"+formId+" #standardId").val();
	taskdto['batchId'] = $("#"+formId+" #batchId").val();
	taskdto['studentId'] = $("#"+formId+" #studentId").val();
	taskdto['contentReply'] = escapeCharacters($("#"+formId+" #diaryRemark").val());
	/*if(editor1!=undefined){
		taskdto['contentReply']=escapeCharacters(editor1.getData());
	}*/
	taskdto['replyStatus'] = $("#"+formId+" #remarkType").val();
	requestData['taskdto'] = taskdto;
	authentication['hash'] = getHash();authentication['schoolId'] = SCHOOL_ID;authentication['schoolUUID'] = SCHOOL_UUID;
	authentication['userType'] = moduleId;
	authentication['userId'] = $("#"+formId+" #userId").val();
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	return request;
}

function validateRequestForSchoolDiaryTeacher(formId,moduleId){
	if($("#"+formId+" #standardId").val()==''){
		showMessage(1, "Please select grade");
		return false;
	}
	var str = $("#"+formId+" #diaryRemark").val();
	if(str.length>400){
		showMessage(1, "You cannot have more than 400 characters! now your char length is "+str.length);
		return false;
	}
	return true;
}

function callStudentByGradeId(formId, value, elementId, toElementId, requestExtra, requestExtra1) {
	hideMessage('');
	resetDropdown($("#"+formId+" #"+toElementId), 'Select student');
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForCommon('masters'),
		data : JSON.stringify(getRequestForMaster(formId, 'STUDENT-LIST', value, requestExtra, requestExtra1)),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		async: false,
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				showMessage(true, data['message']);
			} else {
				buildDropdown(data['mastersData']['studentList'], $("#"+formId+" #"+toElementId), 'Select student');
			}
		},
		error : function(e) {
			//showMessage(true, e.responseText);
			$("#"+formId+" #pastTaughtSubjectId").prop("disabled", false);
		}
	});
}

function callDiaryReplyList(diaryId,moduleId) {
	console.log("callcallDiaryReplyList")
	hideMessage('');
	$.ajax({
		type : "POST",
		url : getURLForHTML('dashboard','teacher-diary-reply/'+SCHOOL_UUID),
		data : "diaryId="+diaryId,
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
        			$('#diaryReplyListContent').html(htmlContent);
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
function validateRequestForSchoolAnnounce(formId){
	if($("#"+formId+" #announceFor").val()==''){
		showMessage(1, "Please select announce for");
		return false;
	}
	if($("#"+formId+" #announceFor").val()=='student'){
		if($("#"+formId+" #standardId").val()==''){
			showMessage(1, "Please select grade");
			return false;
		}
	}
	if($("#"+formId+" #announceTitle").val()==''){
		showMessage(1, "Please enter subject");
		return false;
	}
	if($("#"+formId+" #announceRemark").val()==''){
		showMessage(1, "Please add description ");
		return false;
	}
	
	if($("#"+formId+" #announceDate").val()==''){
		showMessage(1, "Please select date");
		return false;
	}
	if($("#"+formId+" #timeInHrs").val()==''){
		showMessage(1, "Please select Start time(hrs)");
		return false;
	}
	if($("#"+formId+" #timeInMin").val()==''){
		showMessage(1, "Please select Start time(Min)");
		return false;
	}
	
	var str = $("#"+formId+" #announceTitle").val();
	if(str.length>100){
		showMessage(1, "You cannot have more than 100 characters! now your char length is "+str.length);
		return false;
	}
	var str = $("#"+formId+" #announceRemark").val();
	if(str.length>400){
		showMessage(1, "You cannot have more than 250 characters! now your char length is "+str.length);
		return false;
	}
	
	/*if($("#"+formId+" #fileuploadAnnounce").get(0).files[0]==undefined || $("#"+formId+" #fileuploadAnnounce").get(0).files[0]==''){
		showMessage(1, "Please upload Attachment");
		return false;
	}*/
	
	
	
	if($("#"+formId+" #announceDate").val()!='' && $("#"+formId+" #timeInHrs").val()!='' && $("#"+formId+" #timeInMin").val()!=''){
		var announceDate=$("#"+formId+" #announceDate").val();
			announceDate=announceDate.split("-");
		var announcMentDateTime=new Date(announceDate[2]+'/'+announceDate[0]+'/'+announceDate[1]+' '+$("#"+formId+" #timeInHrs").val().trim()+':'+$("#"+formId+" #timeInMin").val().trim()+':00');
		var currentDate= new Date();
		if(currentDate>announcMentDateTime){
			showMessage(1, "Please select future time duration");
			return false;
		}
	}
	
	return true;
}
function submitSchoolAnnounce(formId,moduleId) {
	hideMessage('');
	if(!validateRequestForSchoolAnnounce(formId)){
		return false;
	}
	
	var fdata = new FormData();
	fdata.append('userId',$("#"+formId+" #userId").val());
	fdata.append('announceId',$("#"+formId+" #announceId").val());
	fdata.append('standardId',$("#"+formId+" #standardId").select2('val'));
	fdata.append('batchId',$("#"+formId+" #batchId").select2('val'));
	fdata.append('studentId',$("#"+formId+" #studentId").select2('val'));
	fdata.append('schoolId',$("#"+formId+" #schoolId").val());
	fdata.append('attachment', $("#"+formId+" #fileuploadAnnounce").get(0).files[0]);
	fdata.append('announceRemark',escapeCharacters($("#"+formId+" #announceRemark").val()));
	fdata.append('announceFor',$("#"+formId+" #announceFor").select2('val'));
	fdata.append('announceTitle',escapeCharacters($("#"+formId+" #announceTitle").val()));
	fdata.append('announceDate',$("#"+formId+" #announceDate").val());
	fdata.append('timeDuration',$("#"+formId+" #timeInHrs").val()+':'+$("#"+formId+" #timeInMin").val()+':00');
	$.ajax({
		type : "POST",
		url : getURLForHTML('dashboard','teacher-school-announce-submit'),
		data : fdata,
		dataType : 'json',
		type: "POST",
		processData: false,
		contentType: false,
		enctype: 'multipart/form-data',
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				showMessage(true, data['message']);
			} else {
				$('#'+formId+ ' #announceFor').val('').trigger("change");
				$('#'+formId+ ' #standardId').val('').trigger("change");
				$('#'+formId+ ' #batchId').val('').trigger("change");
				$('#'+formId+ ' #studentId').val('').trigger("change");
				$("#"+formId+" #batchId").html('');
				$("#"+formId+" #studentId").html('');
				$("#"+formId+" #fileupload1Span").text('No file chosen...');
				$('#'+formId)[0].reset();
				showMessage(false, data['message']);
				
			}
			return false;
		},
		error : function(e) {
			//showMessage(true, e.responseText);
			return false;
		}
	});
}

function updateSchoolAnnounce(userId,announceId,controllType,moduleId) {
	hideMessage('');
	
	var fdata = new FormData();
	fdata.append('userId',userId);
	fdata.append('announceId',announceId);
	fdata.append('controllType',controllType);
	$.ajax({
		type : "POST",
		url : getURLForHTML('dashboard','teacher-school-announce-update'),
		data : fdata,
		dataType : 'json',
		type: "POST",
		processData: false,
		contentType: false,
		enctype: 'multipart/form-data',
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				showMessage(true, data['message']);
			} else {
				showMessage(false, data['message']);
				setTimeout(function (){callDashboardPageSchool(moduleId,'school-announce-list');},1000);
			}
			return false;
		},
		error : function(e) {
			//showMessage(true, e.responseText);
			return false;
		}
	});
}
function callAnnounceReplyList(announceId,moduleId) {
	hideMessage('');
	$.ajax({
		type : "POST",
		url : getURLForHTML('dashboard','teacher-announce-reply/'+SCHOOL_UUID),
		data : "announceId="+announceId,
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
        			$('#announceReplyListContent').html(htmlContent);
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

function callStudentBatchesByGradeId(formId, value, elementId, toElementId, requestExtra, requestExtra1, requestExtra2) {
	hideMessage('');
	
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForCommon('masters'),
		data : JSON.stringify(getRequestForMaster(formId, 'MULTIPLE-STUDENT-LIST','', requestExtra, requestExtra1,requestExtra2,value)),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		async: false,
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				showMessage(true, data['message']);
			} else {
				buildDropdown(data['mastersData']['studentList'], $("#"+formId+" #"+toElementId), 'Select student');
			}
		},
		error : function(e) {
			//showMessage(true, e.responseText);
			$("#"+formId+" #pastTaughtSubjectId").prop("disabled", false);
		}
	});
}


function getLessonDropdown(result, dropdown, emptyMessage){
	dropdown.html('');
	if (result != '') {
		$.each(result, function(k, v) {
			if(v.lessonid!=null){
				dropdown.append('<option value="' + v.lessonid + '"> ' + v.lessonName + '</option>');
			}
		});
	}else{
		dropdown.append('<option value="0">' + emptyMessage + '</option>');
	}
}