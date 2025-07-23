var LMS_UNER_MAINTANANCE='My Books is currently under maintenance, try again after some time.';
function flushLocalStorageData(){
	var keys=Object.keys(localStorage);
	var preserveKey=[];

	$.each(keys, function(k, v) {
		if(!keys.includes(v)){
			localStorage.removeItem(v);
		}
	});
	localStorage.clear();
	// console.log('localStorage : '+localStorage);
}
function showSubCourse(parentCourseId){
	$('#parentCourseId'+parentCourseId).addClass('show-subject');
	$("body").addClass("body-fixed")
}
function hideSubCourse(parentCourseId){
	$('#parentCourseId'+parentCourseId).removeClass('show-subject');
	$("body").removeClass("body-fixed")
}
var downloadList=[];

function renderEnrollments(moduleId){
    if(localStorage.getItem('e')!=null && localStorage.getItem('e')!='undefined'){
        var enrollments=JSON.parse(localStorage.getItem('e'));
		var batchCourse= JSON.parse(localStorage.getItem('lud')) ['batchCourse'];
        var html='';
		$.each(batchCourse, function(k, v) {
            html+=renderSingleBatchCourse(moduleId,k,v,enrollments);
        });
        return html;
    }else{
		if(localStorage.getItem('lmsInfo')!=null){
			var data=updateEnrollments();
			if(data['status']=='failed'){
				return '<h4 class="text-primary font-weight-bold text-center py-4">Your LMS is disabled. <br/>Please contact to administrator for further inquiry.</h4>';
			}
		}else{
			return '<h4 class="text-primary font-weight-bold text-center py-4">Your LMS is disabled. <br/>Please contact to administrator for further inquiry.</h4>';
		}
		// return renderEnrollments(moduleId)
    }
}

function getRequiredObjects(obj, key, val) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getRequiredObjects(obj[i], key, val));
        } else if (i == key && obj[key] == val) {
            objects.push(obj);
        }
    }
    return objects;
}

function getRemovedObjects(obj, firstKey, secondKey,val) {
    var objects = obj.filter(function(item) {
        return item[firstKey][secondKey] !== val;
     });
    return objects;
}
function getPrepareLmsJsondata(type, data){
	if(localStorage.getItem(type)==null){
		$.each(data['singleSignonUrl'], function(k, v) {
			if(v.lmsProviderId==37){
				localStorage.setItem(type,JSON.stringify(v));
				if(localStorage.getItem('lmsToken')==undefined || localStorage.getItem('lmsToken')==null){
					localStorage.setItem('lmsToken',v['lmsToken']);
				}
				if(localStorage.getItem('lmsProviderSSOUrl')==undefined || localStorage.getItem('lmsProviderSSOUrl')==null){
					localStorage.setItem('lmsProviderSSOUrl',data['lmsProviderSSOUrl']);
					if(v['lmsProviderSSOUrl']!=undefined){
						LMS_API_BASE_URL=v['lmsProviderSSOUrl'];
						if(ENVIRONMENT=='dev'){
						 	// LMS_API_BASE_URL='http://localhost:9000/api/v1';
						}
						// LMS_API_BASE_URL='https://sms.k8school.com/lms/api/v1';
					}
				}
			}
		});
	}
}

function getItemDetail(type, key){
	localStorage.getItem(type)[key];
}

function prepareLmsStudentDetails(userId){
	if(localStorage.getItem('lud')==null){
		customLoader(true);
		$.ajax({
			type : "GET",
			contentType : "application/json",
			url : APP_BASE_URL+'api/v1/lms-student-details?userId='+userId,
			dataType : 'json',
			async : false,
			global : false,
			success : function(data) {
				customLoader(false);
				if (data['status'] == 'failed' || data['status'] == 'exception' || data['status'] == 'timedout') {
					if(data['status'] == 'timedout'){
						redirectLoginPage();
					}else{
						if(tt=='theme1'){
							showMessage(false, data['message']);
						}else{
							showMessageTheme2(0, data['message'],'',true);
						}
					}
				} else {
					if(data['lmsDetails']!=undefined){
						localStorage.setItem('lud',JSON.stringify(data['lmsDetails']));
					}
				}
				return false;
			}
		});
	}
}

function updateEnrollmentsRequest() {
	var lmsDetails = JSON.parse(localStorage.getItem('lud'));
	var payload = {};
	payload['domainid'] = lmsDetails['did'];
	payload['userid'] = lmsDetails['luid'];;
	payload['enrollmentid'] = lmsDetails['leid'];
	return payload;
}

function updateEnrollments(){
	var resultData={};
	resultData['status']='failed';
	if(localStorage.getItem('e')!=null){
		return false;
	}
	if(localStorage.getItem('lud')==null){
		if(tt=='theme1'){
			showMessage(false, 'You don\'t have any enrollments');
		}else{
			showMessageTheme2(0, 'You don\'t have any enrollments','',true);
		}
		return false
	}
	var lud = JSON.parse(localStorage.getItem('lud'));
	var luid = lud['luid'];
	var leid = lud['leid'];
	if(luid!=0 && luid != undefined && leid!=null && leid!=null && leid!=undefined && leid.length>0) {
		customLoader(true);
		$.ajax({
			headers: {
			'Authorization':'Bearer '+localStorage.getItem('lmsToken'),
		},
			type : "POST",
			contentType : "application/json",
			url : LMS_API_BASE_URL+'/enrollments/get',
			data : JSON.stringify(updateEnrollmentsRequest()),
			dataType : 'json',
			async : false,
			global : false,
			success : function(data) {
				customLoader(false);
				if (data['status'] == 'failed' || data['status'] == 'exception' || data['status'] == 'timedout') {
					if(data['status'] == 'timedout'){
						redirectLoginPage();
					}else{
						if(tt=='theme1'){
							showMessage(false, data['message']);
						}else{
							showMessageTheme2(0, data['message'],'',true);
						}
					}
				} else {
					if(data['enrollments']!=undefined){
						localStorage.setItem('e',JSON.stringify(data['enrollments']))
						resultData=data['enrollments'];
					}
				}

			},
			error : function(e) {
				customLoader(false);
				if(tt=='theme1'){
					showMessage(false, LMS_UNER_MAINTANANCE);
				}else{
					showMessageTheme2(0, LMS_UNER_MAINTANANCE,'',true);
				}
			}
		});
	}
	return resultData;
}

function updateLessonIndexRequest(enrollmentid,courseid,lessonid){
	var lmsDetails = JSON.parse(localStorage.getItem('lud'));
	var payload = {};
	payload['domainid'] = lmsDetails['did'];
	payload['userid'] = lmsDetails['luid'];;
	payload['enrollmentid'] = enrollmentid;
	payload['courseid'] = courseid;
	return payload;
}

function updateLessonIndex(enrollmentid,courseid,lessonid){
	var resultData={};
	if(localStorage.getItem('lud')==null){
		if(tt=='theme1'){
			showMessage(false, 'You don\'t have any enrollments');
		}else{
			showMessageTheme2(0, 'You don\'t have any enrollments','',true);
		}
		return false
	}
	customLoader(true);
	$.ajax({
		headers: {
			'Authorization':'Bearer '+localStorage.getItem('lmsToken'),
		},
		type : "POST",
		contentType : "application/json",
		url : LMS_API_BASE_URL+'/lesson/list',
		data : JSON.stringify(updateLessonIndexRequest(enrollmentid,courseid,lessonid)),
		dataType : 'json',
		async : false,
		global : false,
		success : function(data) {
			customLoader(false);
			if (data['status'] == 'failed' || data['status'] == 'exception' || data['status'] == 'timedout') {
				if(data['status'] == 'timedout'){
					redirectLoginPage();
				}else{
					if(tt=='theme1'){
						showMessage(false, data['message']);
					}else{
						showMessageTheme2(0, data['message'],'',true);
					}
				}
			}
			resultData=data;
		},
		error : function(e) {
			customLoader(false);
			if(tt=='theme1'){
				showMessage(false, LMS_UNER_MAINTANANCE);
			}else{
				showMessageTheme2(0, LMS_UNER_MAINTANANCE,'',true);
			}
		}
	});
	return resultData;
}

function updateLessonResourceRequest(enrollmentid,courseid,lessonid){
	var lmsDetails = JSON.parse(localStorage.getItem('lud'));
	var payload = {};
	payload['domainid'] = lmsDetails['did'];
	payload['userid'] = lmsDetails['luid'];;
	payload['courseid'] = courseid;
	payload['lessonid'] = lessonid;
	return payload;
}

function updateLessonResources(enrollmentid,courseid,lessonid){
	if(localStorage.getItem('lud')==null){
		if(tt=='theme1'){
			showMessage(false, 'You don\'t have any enrollments');
		}else{
			showMessageTheme2(0, 'You don\'t have any enrollments','',true);
		}
		return false
	}
	customLoader(true);
	$.ajax({
		headers: {
			'Authorization':'Bearer '+localStorage.getItem('lmsToken'),
		},
		type : "POST",
		contentType : "application/json",
		url : LMS_API_BASE_URL+'/lesson/resources',
		data : JSON.stringify(updateLessonResourceRequest(enrollmentid,courseid,lessonid)),
		dataType : 'json',
		async : false,
		global : false,
		success : function(data) {
			customLoader(false);
			if (data['status'] == 'failed' || data['status'] == 'exception' || data['status'] == 'timedout') {
				if(data['status'] == 'timedout'){
					redirectLoginPage();
				}else{
					// if(tt=='theme1'){
					// 	showMessage(false, data['message']);
					// }else{
					// 	showMessageTheme2(0, data['message'],'',true);
					// }
				}
			} else {
				if(data['lessons']!=undefined){
					localStorage.setItem('lr'+lessonid,JSON.stringify(data['lessons']));
					lessonResources(enrollmentid,courseid,lessonid);
				}
			}
			return false;
		},
		error : function(e) {
			customLoader(false);
			if(tt=='theme1'){
				showMessage(false, LMS_UNER_MAINTANANCE);
			}else{
				showMessageTheme2(0, LMS_UNER_MAINTANANCE,'',true);
			}
		}
	});
}

function addNotes(appndDiv,noteElementId,enrollmentid,courseid,lessonid,userIdChecks){
	var data=updateStudyResource(enrollmentid,courseid,lessonid,userIdChecks);
	if (data['status'] == 'failed' || data['status'] == 'exception' || data['status'] == 'timedout') {
		if(tt=='theme1'){
			showMessage(false, data['message']);
		}else{
			showMessageTheme2(0, data['message'],'',true);
		}
	}else{
		var isAttachmentAvailable=data['isAttachmentAvailable'];
		var isTextAvailable=true;
		var visibleText='';
		visibleText=$("#"+noteElementId).val().trim();
		var html=getResourceContentByType('',visibleText,isTextAvailable,isAttachmentAvailable,enrollmentid,courseid,lessonid,data['noteid'],data['noteid'],'N','Y','Y');
		$("."+appndDiv).append(html);
		visibleText=$("#"+noteElementId).val('');
		$('#lsr'+lessonid).text(parseInt($('#lsr'+lessonid).text())+1);
	}
}

var uploadResources=[];
function updateStudyResource(enrollmentid,courseid,lessonid,userIdChecks){
	var resultData={};
	resultData['status']='failed';
	resultData['message']='Unable processed your request.';
	if($("#studyResourcesNotes").val().trim()==''){
		resultData['message']='Please add a note.';
		return resultData;
	}
	if(localStorage.getItem('lud')!=null){
		customLoader(true);
		$.ajax({
			headers: {
				'Authorization':'Bearer '+localStorage.getItem('lmsToken'),
			},
			type : "POST",
			contentType : "application/json",
			url : LMS_API_BASE_URL+'/resource/save',
			data : JSON.stringify(updateResourceRequest(enrollmentid,courseid,lessonid)),
			dataType : 'json',
			async : false,
			global : false,
			success : function(data) {
				customLoader(false);
				if (data['status'] == 'failed' || data['status'] == 'exception' || data['status'] == 'timedout') {
					if(data['status'] == 'timedout'){
						redirectLoginPage();
					}else{
						if(tt=='theme1'){
							showMessage(false, data['message']);
						}else{
							showMessageTheme2(0, data['message'],'',true);
						}
					}
				} else {
					var message=data['message'];
					if(USER_ROLE=='TEACHER'){
						message='Learning Resources added Succesfully';
					}else if(USER_ROLE=='STUDENT'){
						message='Study Resources added Succesfully';
					}
					if(tt=='theme1'){
						showMessage(false, message);
					}else{
						showMessageTheme2(1, message,'',true);
					}
					if(uploadResources.length>0){
						data['isAttachmentAvailable']=true;
					}else{
						data['isAttachmentAvailable']=false;
					}
					uploadResources=[];
					dt.clearData();
					$('#uploadedStudyResourcesNotes').html('');
					updateStudyResourceList(enrollmentid,courseid,lessonid,userIdChecks);
				}
				resultData=data;
			},
			error : function(e) {
				customLoader(false);
				if(tt=='theme1'){
					showMessage(false, LMS_UNER_MAINTANANCE);
				}else{
					showMessageTheme2(0, LMS_UNER_MAINTANANCE,'',true);
				}
			}
		});
	}
	return resultData;
}

function handleFileSelect(f) {
	//const uploadFilesLength=document.getElementById('attach-resource')
	//var f = evt.target.files[0];
	var reader = new FileReader();
	reader.onload = (function(theFile) {
		return function(e) {
			var binaryData = e.target.result;
			var base64String = window.btoa(binaryData);
			var filetype= "";
			if(isImage(f.name)){
				filetype = "I";
			}else if(isPdf(f.name)){
				filetype = "P";
			}else if(isVideo(f.name)){
				filetype = "V";
			}
			var UploadFile = {};
			UploadFile['resourceName']=f.name;
			UploadFile['resourceFrom']='L';
			UploadFile['resourceType']=filetype;//getFileTyp(f.type);
			UploadFile['resourceContent']=base64String;
			uploadResources.push(UploadFile);
			console.log(UploadFile);
		};
	})(f);
  reader.readAsBinaryString(f);
}
function updateResourceRequest(enrollmentid,courseid,lessonid){
	var resourcesList=[];
	if(uploadResources.length>0){
		for(ins=0;ins<uploadResources.length;ins++){
			resourcesList.push(uploadResources[ins]);
		}
	}
	var resourceSaveRequest = {};
	resourceSaveRequest['domainid'] = JSON.parse(localStorage.getItem('lud')).did;
	resourceSaveRequest['userid'] = JSON.parse(localStorage.getItem('lud')).luid;
	resourceSaveRequest['enrollmentid'] = enrollmentid;
	resourceSaveRequest['lessonid'] = lessonid;
	resourceSaveRequest['notes'] = $("#studyResourcesNotes").val();
	resourceSaveRequest['resources'] = resourcesList;
	return resourceSaveRequest;
}

function updateStudyResourceList(enrollmentid,courseid,lessonid,userIdChecks){
	var resultData={};
	if(localStorage.getItem('lud')==null){
		if(tt=='theme1'){
			showMessage(false, 'You don\'t have any enrollments');
		}else{
			showMessageTheme2(0, 'You don\'t have any enrollments','',true);
		}
		return false
	}
	customLoader(true);
	$.ajax({
		headers: {
			'Authorization':'Bearer '+localStorage.getItem('lmsToken'),
		},
		type : "POST",
		contentType : "application/json",
		url : LMS_API_BASE_URL+'/resource/uploaded-by-user',
		data : JSON.stringify(updateResourceListRequest(enrollmentid,courseid,lessonid,userIdChecks)),
		dataType : 'json',
		async : false,
		global : false,
		success : function(data) {
			customLoader(false);
			if (data['status'] == 'failed' || data['status'] == 'exception' || data['status'] == 'timedout') {
				if(data['status'] == 'timedout'){
					redirectLoginPage();
				}else{
					// if(tt=='theme1'){
					// 	showMessage(false, data['message']);
					// }else{
					// 	showMessageTheme2(0, data['message'],'',true);
					// }
				}
			} else {
				var keyName='';
				if(userIdChecks=='Y'){
					keyName='lsr'+lessonid;
				}else if(userIdChecks=='N'){
					keyName='llr'+lessonid;
				}
				if(data['notes']!=undefined){
					localStorage.setItem(keyName,JSON.stringify(data['notes']))
					resultData=data;
				}
			}
		},
		error : function(e) {
			customLoader(false);
			if(tt=='theme1'){
				showMessage(false, LMS_UNER_MAINTANANCE);
			}else{
				showMessageTheme2(0, LMS_UNER_MAINTANANCE,'',true);
			}
		}
	});
	return resultData;
}

function updateResourceListRequest(enrollmentid,courseid,lessonid,userIdChecks){
	var lmsDetails = JSON.parse(localStorage.getItem('lud'));
	var resourceListRequest = {};
	resourceListRequest['domainid'] = lmsDetails['did'];
	resourceListRequest['userid'] = lmsDetails['luid'];
	resourceListRequest['enrollmentid'] = enrollmentid;
	resourceListRequest['lessonid'] = lessonid;
	resourceListRequest['matchType'] = userIdChecks;
	var statusTypesL=[];
	statusTypesL.push('L');
	resourceListRequest['statusTypes']=statusTypesL;
	return resourceListRequest;
}

function isImage(filename) {
	var ext = filename.substr( (filename.lastIndexOf('.') +1) );
	switch (ext.toLowerCase()) {
		case 'jpg':
		case 'jpeg':
		case 'gif':
		case 'bmp':
		case 'png':
		//etc
		return true;
	}
	return false;
}

function isPdf(filename) {
	var ext = filename.substr( (filename.lastIndexOf('.') +1) );
	switch (ext.toLowerCase()) {
	  	case 'pdf':
		//etc
		return true;
	}
	return false;
}

function isVideo(filename) {
	var ext = filename.substr( (filename.lastIndexOf('.') +1) );
	switch (ext.toLowerCase()) {
	  	case 'm4v':
	  	case 'avi':
	  	case 'mpg':
	  	case 'mp4':
		// etc
		return true;
	}
	return false;
}

function renderResourcesByUserRequest(enrollmentid,courseid,lessonid,noteid,entityId,entityType,statusTypes,userIdChecks){
	var lmsDetails = JSON.parse(localStorage.getItem('lud'));
	var resourceListRequest = {};
	resourceListRequest['domainid'] = lmsDetails['did'];
	resourceListRequest['userid'] = lmsDetails['luid'];
	resourceListRequest['enrollmentid'] = enrollmentid;
	resourceListRequest['lessonid'] = lessonid;
	resourceListRequest['noteid'] = noteid;
	resourceListRequest['entityId'] = entityId;
	resourceListRequest['entityType'] = entityType;
	resourceListRequest['userIdChecks'] = userIdChecks;
	var statusTypesN=[];
	statusTypesN.push(statusTypes);
	resourceListRequest['statusTypes']=statusTypesN;
	return resourceListRequest;
}

function renderResourcesByUser(enrollmentid,courseid,lessonid,noteid,entityId,entityType,statusTypes,userIdChecks){
	customLoader(true);
	$.ajax({
		headers: {
			'Authorization':'Bearer '+localStorage.getItem('lmsToken'),
		},
		type : "POST",
		contentType : "application/json",
		url : LMS_API_BASE_URL+'/resource/list',
		data : JSON.stringify(renderResourcesByUserRequest(enrollmentid,courseid,lessonid,noteid,entityId,entityType,statusTypes,userIdChecks)),
		dataType : 'json',
		async : false,
		global : false,
		success : function(data) {
			customLoader(false);
			if (data['status'] == 'failed' || data['status'] == 'exception' || data['status'] == 'timedout') {
				if(data['status'] == 'timedout'){
					redirectLoginPage();
				}else{
					if(tt=='theme1'){
						showMessage(false, data['message']);
					}else{
						showMessageTheme2(0, data['message'],'',true);
					}
				}
			} else {
				var unreadCountKey='';
				if(userIdChecks=='Y'){
					unreadCountKey='lsr'+lessonid+'unread';
				}else if(userIdChecks=='N'){
					unreadCountKey='llr'+lessonid+'unread';
				}
				var unreadCount = 0;
				if(data['note'].peepedAt==''){
					if(localStorage.getItem(unreadCountKey)!=null && localStorage.getItem(unreadCountKey)!='undefined'){
						unreadCount = localStorage.getItem(unreadCountKey);
						unreadCount=parseInt(unreadCount)-1;
					}
					if(unreadCount<0){
						unreadCount=0;
					}
					localStorage.setItem(unreadCountKey,unreadCount);
					if(userIdChecks=='N'){
						$('#note_'+noteid).append('<span class="pr-2 text-success"><i class="fa fa-check-double"></i></span>');
					}
				}else{
					unreadCount=localStorage.getItem(unreadCountKey);
				}
				var unreadCountContent='';
				if(unreadCount>0){
					unreadCountContent+=unreadCount+' New ';
					if(unreadCount<=1){
						unreadCountContent+='resource';
					}else{
						unreadCountContent+='resources';
					}
				}
				$('#unreadCountContent').html(unreadCountContent);
				renderUploadedUserData(data,userIdChecks);
			}
			// if($(".modal-backdrop").length > 0){
			// 	var BootStrapBackdrop = $(".modal-backdrop")[0];
			// 	$("#dashboardContentInHTML").append(BootStrapBackdrop)
			// }
			return true;
		},
		error : function(e) {
			customLoader(false);
			if(tt=='theme1'){
				showMessage(false, LMS_UNER_MAINTANANCE);
			}else{
				showMessageTheme2(0, LMS_UNER_MAINTANANCE,'',true);
			}
		}
	});
}

function updateLessonDetail(enrollmentid,courseid,lessonid, foruse){
	var resultData={};
	if(localStorage.getItem('lud')==null){
		if(tt=='theme1'){
			showMessage(false, 'You don\'t have any enrollments');
		}else{
			showMessageTheme2(0, 'You don\'t have any enrollments','',true);
		}
		return false
	}
	customLoader(true);
	$.ajax({
		headers: {
			'Authorization':'Bearer '+localStorage.getItem('lmsToken'),
		},
		type : "POST",
		contentType : "application/json",
		url : LMS_API_BASE_URL+'/lesson/details',
		data : JSON.stringify(updateLessonDetailRequest(enrollmentid,courseid,lessonid)),
		dataType : 'json',
		async : false,
		global : false,
		success : function(data) {
			customLoader(false);
			if (data['status'] == 'failed' || data['status'] == 'exception' || data['status'] == 'timedout') {
				if(data['status'] == 'timedout'){
					redirectLoginPage();
				}else{
					if(foruse=='for_sms'){

					}else{
						if(tt=='theme1'){
							showMessage(false, data['message']);
						}else{
							showMessageTheme2(0, data['message'],'',true);
						}
					}
				}
			} else {
				if(foruse=='for_sms'){

				}else{
					if(data['lessons']!=undefined){
						localStorage.setItem('lidetail'+courseid,JSON.stringify(data['lessons']));
						renderLessonsIndex(enrollmentid,courseid,lessonid);
					}
				}
			}
			resultData=data;
		},
		error : function(e) {
			customLoader(false);
			if(tt=='theme1'){
				showMessage(false, LMS_UNER_MAINTANANCE);
			}else{
				showMessageTheme2(0, LMS_UNER_MAINTANANCE,'',true);
			}
		}
	});
	return resultData;
}

function updateLessonDetailRequest(enrollmentid,courseid,lessonid){
	var lmsDetails = JSON.parse(localStorage.getItem('lud'));
	var payload = {};
	payload['domainid'] = lmsDetails['did'];
	payload['userid'] = lmsDetails['luid'];
	payload['courseid'] = courseid;
	lessonidList=[];
	lessonidList.push(lessonid);
	payload['lessonid'] = lessonidList;
	return payload;
}


function lessonStartStopStatusRequest(controlType,progressionid,enrollmentid,courseid,lessonid){
	var lmsDetails = JSON.parse(localStorage.getItem('lud'));
	var payload = {};
	payload['domainid'] = lmsDetails['did'];
	payload['userid'] = lmsDetails['luid'];
	var progressDTO={};
	progressDTO['userid']=lmsDetails['luid'];
	progressDTO['controlType']=controlType;
	progressDTO['progressionid']=progressionid;
	progressDTO['enrollmentid']=enrollmentid;
	progressDTO['courseid']=courseid;
	progressDTO['lessonid']=lessonid;
	var progression=[];
	progression.push(progressDTO);
	payload['progression'] = progression;
	return payload;
}
function lessonWarnigNo(modalId,lessonid){
	$('#switchInput'+lessonid).prop('checked', false);
	modelAction(modalId,'hide');
}

function lessonStartStopStatusWarning(warningMessag,controlType,progressionid,enrollmentid,courseid,lessonid){
	var modalId='actionCompleteWarning';
	modelAction(modalId,'show')
	$('#'+modalId+' .warningMsg').html(warningMessag);

	var yesFunction='lessonStartStopStatus(\''+controlType+'\','+progressionid+','+enrollmentid+','+courseid+','+lessonid+')';
	var noFunction='lessonWarnigNo(\''+modalId+'\','+lessonid+')';
	$('#'+modalId+' #yesAction').attr('onClick',yesFunction);
	$('#'+modalId+' #noAction').attr('onClick',noFunction);
}
function lessonStartStopStatus(controlType,progressionid,enrollmentid,courseid,lessonid){
	if(localStorage.getItem('lud')==null){
		if(tt=='theme1'){
			showMessage(false, 'You don\'t have any enrollments');
		}else{
			showMessageTheme2(0, 'You don\'t have any enrollments','',true);
		}
		return false
	}
	customLoader(true);
	$.ajax({
		headers: {
			'Authorization':'Bearer '+localStorage.getItem('lmsToken'),
		},
		type : "POST",
		contentType : "application/json",
		url : LMS_API_BASE_URL+'/progression/save',
		data : JSON.stringify(lessonStartStopStatusRequest(controlType,progressionid,enrollmentid,courseid,lessonid)),
		dataType : 'json',
		async : false,
		global : false,
		success : function(data) {
			if (data['status'] == 'failed' || data['status'] == 'exception' || data['status'] == 'timedout') {
				customLoader(false);
				if(data['status'] == 'timedout'){
					redirectLoginPage();
				}else{
					if(tt=='theme1'){
						showMessage(false, data['message']);
					}else{
						showMessageTheme2(0, data['message'],'',true);
					}
				}
				lessonWarnigNo('actionCompleteWarning',lessonid);
			} else {
				//update html
				$.each(data['progressionStatus'], function(k, v) {
					if(v.status!='success'){
						if(tt=='theme1'){
							showMessage(false, v.message);
						}else{
							showMessageTheme2(0,v.message,'',true);
						}
						lessonWarnigNo('actionCompleteWarning',lessonid);
					}else{
						var lessonResult = JSON.parse(localStorage.getItem('li'+courseid));
						$.each(lessonResult, function(keyLesson, valueLesson) {
							if(valueLesson.lessonid==lessonid){
								progression=valueLesson['progression'];
								progression['progressionid']=v.progressionid
								if(controlType=='S'){
									progression['startDate']=changeDateFormat(new Date(),"MMM dd, yyyy hh:mm a")
								}else if(controlType=='C'){
									progression['endDate']=changeDateFormat(new Date(),"MMM dd, yyyy hh:mm a")
								}
								valueLesson['progression']=progression;
								lessonResult[keyLesson]=valueLesson;
								localStorage.setItem('li'+courseid,JSON.stringify(lessonResult))
							}
						});
						if(controlType=='S'){
							var warningMessag='Are you sure you want to finish lesson "'+$('.lesson_sno'+lessonid).html()+' '+$('.lesson_name'+lessonid).html()+'"';
							var functionName='lessonStartStopStatusWarning(\''+warningMessag+'\', \'C\','+data['progressionStatus'][0]['progressionid']+','+enrollmentid+','+courseid+','+lessonid+')';
							var html=
							'<div class="started-lession-message full pr-1 blue-dark-bg">'
								+'<p class="started-lession-message text-white text-right m-0">Lesson Started on: '+changeDateFormat(new Date(),"MMM dd, yyyy hh:mm a")+'</p>'
							+'</div>'
							+'<div id="div_'+lessonid+'" class="completed-work full text-right">'
								+'<span class="text-white d-inline-block mr-2">I have completed this lesson</span>'
								+'<div class="d-inline-block">'
									+'<label class="switch m-0">'
										+'<input id="switchInput'+lessonid+'" class="switch-input" type="checkbox" onclick="'+functionName+'">'
										+'<span class="switch-label" data-on="Yes" data-off="No"></span>'
										+'<span class="switch-handle"></span>'
									+'</label>'
								+'</div>'
							+'</div>';
							$('#div_'+lessonid).after(html);
							$('#div_'+lessonid).remove();
						}else if(controlType=='C'){
							var html=
							'<div class="completed-lession-message full pr-1 blue-dark-bg">'
								+'<p class="text-white text-right m-0">Lesson Completed on: '+changeDateFormat(new Date(),"MMM dd, yyyy hh:mm a")+'</p>'
							+'</div>';
							$('#div_'+lessonid).after(html);
							$('#div_'+lessonid).remove();
						}
						if(controlType=='S'){
							$('.chapter_to_study'+lessonid).trigger('click');
						}
						modelAction('actionCompleteWarning','hide');
					}
				});
				customLoader(false);
			}
			return true;
		},
		error : function(e) {
			customLoader(false);
			if(tt=='theme1'){
				showMessage(false, LMS_UNER_MAINTANANCE);
			}else{
				showMessageTheme2(0, LMS_UNER_MAINTANANCE,'',true);
			}
		}
	});
}


function openCompleteWarningModal(src, modalId, enrollmentid, courseid, lessonid,){
	if($(src).prop('checked') == true){
	  $("#"+modalId).modal("show");
	  // $("#"+modalId).modal({
	  //   backdrop: 'static',
	  // });
	}
  }
  function getValueCompleteWarningModal(src, modalId, enrollmentid, courseid, lessonid){
	  if($(src).val() ==  "Yes"){
		$("#completed_lession_"+lessonid).closest('.completed-work').parent().find('.lession-message').removeClass('d-none');
		$("#completed_lession_"+lessonid).closest('.completed-work').hide();
		$("#"+modalId).modal("hide");
	  }else{
		$("#"+modalId).modal("hide");
		$("#completed_lession_"+lessonid).prop("checked" , false);
	  }
  }

  function deleteNotesRequest(enrollmentid,courseid,lessonid,noteid,entityId,entityType,statusType,userIdChecks){
	var lmsDetails = JSON.parse(localStorage.getItem('lud'));
	var resourceListRequest = {};
	resourceListRequest['domainid'] = lmsDetails['did'];
	resourceListRequest['userid'] = lmsDetails['luid'];
	resourceListRequest['enrollmentid'] = enrollmentid;
	resourceListRequest['lessonid'] = lessonid;
	resourceListRequest['noteid'] = noteid;
	resourceListRequest['entityId'] = entityId;
	resourceListRequest['entityType'] = entityType;
	var statusTypesL=[];
	statusTypesL.push(statusType);
	resourceListRequest['statusTypes']=statusTypesL;
	return resourceListRequest;
}
function modelAction(modalId,showhide){
	$("#"+modalId).modal(showhide);
  }

function deleteNotesWarning(warningMessag,enrollmentid,courseid,lessonid,noteid,entityId,entityType,statusType,userIdChecks){
	var modalId='actionCompleteWarning';
	modelAction(modalId,'show')
	$('#'+modalId+' .warningMsg').html(warningMessag);

	var yesFunction='deleteNotes('+enrollmentid+','+courseid+','+lessonid+','+noteid+','+entityId+',\''+entityType+'\',\''+statusType+'\',\''+userIdChecks+'\')';
	var noFunction='modelAction(\''+modalId+'\',\'hide\')';
	$('#'+modalId+' #yesAction').attr('onClick',yesFunction);
	$('#'+modalId+' #noAction').attr('onClick',noFunction);
}
function deleteNotes(enrollmentid,courseid,lessonid,noteid,entityId,entityType,statusType,userIdChecks){
	customLoader(true);
	$.ajax({
		headers: {
			'Authorization':'Bearer '+localStorage.getItem('lmsToken'),
		},
		type : "POST",
		contentType : "application/json",
		url : LMS_API_BASE_URL+'/resource/delete',
		data : JSON.stringify(deleteNotesRequest(enrollmentid,courseid,lessonid,noteid,entityId,entityType,statusType,userIdChecks)),
		dataType : 'json',
		async : false,
		global : false,
		success : function(data) {
			customLoader(false);
			if (data['status'] == 'failed' || data['status'] == 'exception' || data['status'] == 'timedout') {
				if(data['status'] == 'timedout'){
					redirectLoginPage();
				}else{
					if(tt=='theme1'){
						showMessage(false, data['message']);
					}else{
						showMessageTheme2(0, data['message'],'',true);
					}
				}
			}else{
				//UPDATE LOCALSTORAGE BY LEARNING RESOURCES
				$('#lsr'+lessonid).text(parseInt($('#lsr'+lessonid).text())-1);
				var notes = JSON.parse(localStorage.getItem('lsr'+lessonid));
				notes['totalNotesCount']=$('#lsr'+lessonid).text();
				resources=notes['resources'];
				resources=getRemovedObjects(resources,'notes','noteid',noteid);
				notes['resources']=resources
				localStorage.setItem('lsr'+lessonid,JSON.stringify(notes))
				$('#note_'+noteid).remove();
				modelAction('actionCompleteWarning','hide');
				if(tt=='theme1'){
					showMessage(false, 'Note deleted.');
				}else{
					showMessageTheme2(1, 'Note deleted.','',true);
				}
			}
			return true;
		},
		error : function(e) {
			customLoader(false);
			if(tt=='theme1'){
				showMessage(false, LMS_UNER_MAINTANANCE);
			}else{
				showMessageTheme2(0, LMS_UNER_MAINTANANCE,'',true);
			}
		}
	});
}

function callStudentHomework(formId, courseid, lessonid, alllessonid) {
	var resultData={};
	customLoader(true);
    $.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForWithoutUnique('dashboard', 'app-student-homework-content'),
		data : JSON.stringify(getRequestForStudentHomework(formId, courseid, lessonid, alllessonid)),
		dataType : 'json',
		async : false,
		global : false,
		success : function(data) {
			customLoader(false);
			if (data['statusResponse']['statusCode'] == '0' || data['statusResponse']['statusCode'] == '2') {
				console.log("homework not found");
			} else {
				localStorage.setItem('student_homework'+lessonid,JSON.stringify(data['dashboardStudentDTO']['studentTaskDTO']['taskDTOList']));
				resultData=data['dashboardStudentDTO']['studentTaskDTO']['taskDTOList'];
			}
		},
		error : function(e) {
			customLoader(false);
			if(tt=='theme1'){
				showMessage(false, LMS_UNER_MAINTANANCE);
			}else{
				showMessageTheme2(0, LMS_UNER_MAINTANANCE,'',true);
			}
		}
	});
	return resultData;
}

function getRequestForStudentHomework(formId, courseid, lessonid, alllessonid){
	var appCommonAuthRequest = {};
	var authentication = {};
	var requestData = {};
	var lessonids = [];
	//lessonids.push(lessonid);
	if(alllessonid!=undefined){
		lessonids = alllessonid.split(",");
	}else{
		lessonids.push(lessonid);
	}

	requestData['courseId'] = courseid;
	requestData['lessonId'] = lessonids;
	requestData['userId'] = USER_ID;
	requestData['start'] = 0;
	requestData['limit'] = 0;
	authentication['hash'] = getHash();
	authentication['userType'] = USER_ROLE;
	authentication['userId'] = USER_ID;
	appCommonAuthRequest['authentication'] = authentication;
	appCommonAuthRequest['requestData'] = requestData;
	return appCommonAuthRequest;
}

function callStudentHomeworkDetail(taskId) {
	$("#studentHomworkFormLms #taskId").val(taskId);
	$("#studentHomworkFormLms #userId").val(USER_ID);
    $.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForWithoutUnique('dashboard', 'app-student-homework-detail'),
		data : JSON.stringify(getRequestForStudentHomeworkDetail(taskId)),
		dataType : 'json',
		async : false,
		global : false,
		success : function(data) {
			if (data['statusResponse']['statusCode'] == '0' || data['statusResponse']['statusCode'] == '2') {
				console.log("homework not found");
			} else {
				var hwdata = data['dashboardStudentDTO']['studentTaskDTO']['taskDTOList'];
				localStorage.setItem('hw_detail'+taskId,JSON.stringify(data['dashboardStudentDTO']['studentTaskDTO']['taskDTOList']));
				console.log(hwdata);


			}
			return true
		},
		error : function(e) {
			if(tt=='theme1'){
				showMessage(false, LMS_UNER_MAINTANANCE);
			}else{
				showMessageTheme2(0, LMS_UNER_MAINTANANCE,'',true);
			}
		}
	});
	return false;
}

function getRequestForStudentHomeworkDetail(taskId){
	var appCommonAuthRequest = {};
	var authentication = {};
	var requestData = {};

	requestData['taskId'] = taskId;
	authentication['hash'] = getHash();
	authentication['userType'] = USER_ROLE;
	authentication['userId'] = USER_ID;
	appCommonAuthRequest['authentication'] = authentication;
	appCommonAuthRequest['requestData'] = requestData;
	return appCommonAuthRequest;
}



const downloadFile = (urls) => {
//   var urls = [
// 	APP_BASE_URL+'/static/theme2/images/FlipBookPDF/science.pdf',
// 	APP_BASE_URL+'/static/theme2/images/FlipBookPDF/RealEnglishGrade08.pdf'
// 	];
    if(!urls) return;
	downloadExample(urls,'homework.zip');
};

  function downloadExample(urls,zippedFileName){
	  var zip = new JSZip();
	  urls.forEach(function(url, index) {
		var fileName=url.split('/');
		fileName=fileName[fileName.length-1];
		zip.file(fileName, JSZipUtils.getBinaryContent(url), {binary: true});
	  });
	  zipFiles(zip, zippedFileName);
  }

  async function zipFiles(zip, zippedFileName) {
	const content = await zip.generateAsync({ type: "blob" });
	saveAs(content, zippedFileName);
  }
  
  function saveAs(content, fileName) {
	const a = document.createElement("a");
	const isBlob = content.toString().indexOf("Blob") > -1;
	let url = content;
	if (isBlob) {
	  url = window.URL.createObjectURL(content);
	}
	a.href = url;
	a.download = fileName;
	a.click();
	if (isBlob) {
	  window.URL.revokeObjectURL(url);
	}
  }

  function getCourseList(elementId, foruse, roleModuleId){
	customLoader(true);
	console.log(LMS_API_BASE_URL);
	$.ajax({
		headers: {
			'Authorization':'Bearer '+localStorage.getItem('lmsToken'),
		},
		type : "POST",
		contentType : "application/json",
		url : LMS_API_BASE_URL+'/course/list',
		data : JSON.stringify(updateCoursseRequest()),
		dataType : 'json',
		async : false,
		global : false,
		success : function(data) {
			customLoader(false);
			if (data['status'] == 'failed' || data['status'] == 'exception' || data['status'] == 'timedout') {
				if(tt=='theme1'){
					showMessage(false, data['message']);
				}else{
					showMessageTheme2(0, data['message'],'',true);
				}
			} else {
				if(foruse=='for_sms'){
					$('#LMSListContentDiv').html(LMSCourseTable(elementId));
					$('#'+elementId+' > tbody').append(getLMSCourseTableBody(data['courses'], roleModuleId));
					var isDataTable = $.fn.dataTable.isDataTable('#'+elementId);
					if(isDataTable){
						$('#'+elementId).dataTable().fnDestroy();
					}
					$('#'+elementId).DataTable();
				}
			}
			return true;
		},
		error : function(e) {
			customLoader(false);
			if(tt=='theme1'){
				showMessage(false, LMS_UNER_MAINTANANCE);
			}else{
				showMessageTheme2(0, LMS_UNER_MAINTANANCE,'',true);
			}
		}
	});
}
function updateCoursseRequest(){
	var lmsDetails = JSON.parse(localStorage.getItem('lud'));
	var payload = {};
	payload['domainid'] = $("#domainByFilter").val();//lmsDetails['did'];
	payload['userid'] = lmsDetails['luid'];
	payload['coursename'] = $("#courseNameFilter").val();
	payload['shortby'] = $("#coursesortByFilter").val();
	payload['startpage'] = 0;
	payload['pagesize'] = $("#coursepageSizeFilter").val();
	
	return payload;
}


function getCourseDetail(courseid, foruse){
	if(localStorage.getItem('lud')==null){
		if(tt=='theme1'){
			showMessage(false, 'You don\'t have any enrollments');
		}else{
			showMessageTheme2(0, 'You don\'t have any enrollments','',true);
		}
		return false
	}
	customLoader(true);
	$.ajax({
		headers: {
			'Authorization':'Bearer '+localStorage.getItem('lmsToken'),
		},
		type : "POST",
		contentType : "application/json",
		url : LMS_API_BASE_URL+'/course/details',
		data : JSON.stringify(updateCourseDetailRequest(courseid)),
		dataType : 'json',
		async : false,
		global : false,
		success : function(data) {
			customLoader(false);
			if (data['status'] == 'failed' || data['status'] == 'exception' || data['status'] == 'timedout') {
				if(data['status'] == 'timedout'){
					redirectLoginPage();
				}else{
					if(tt=='theme1'){
						showMessage(false, data['message']);
					}else{
						showMessageTheme2(0, data['message'],'',true);
					}
				}
			} else {
				if(foruse=='for_sms'){
					getCourseDescription(data['courses']);
				}
			}
			return true;
		},
		error : function(e) {
			customLoader(false);
			if(tt=='theme1'){
				showMessage(false, LMS_UNER_MAINTANANCE);
			}else{
				showMessageTheme2(0, LMS_UNER_MAINTANANCE,'',true);
			}
		}
	});
}

function updateCourseDetailRequest(courseid){
	var lmsDetails = JSON.parse(localStorage.getItem('lud'));
	var payload = {};
	payload['domainid'] = lmsDetails['did'];
	courseidList=[];
	courseidList.push(courseid);
	payload['courseid'] = courseidList;
	payload['completeDetails'] = false;
	return payload;
}


function getEnrollmentListByCourse(courseid, foruse, roleModuleId){
	if(localStorage.getItem('lud')==null){
		if(tt=='theme1'){
			showMessage(false, 'You don\'t have any enrollments');
		}else{
			showMessageTheme2(0, 'You don\'t have any enrollments','',true);
		}
		return false
	}
	customLoader(true);
	$.ajax({
		headers: {
			'Authorization':'Bearer '+localStorage.getItem('lmsToken'),
		},
		type : "POST",
		contentType : "application/json",
		url : LMS_API_BASE_URL+'/enrollments/get-by-course',
		data : JSON.stringify(updateEnrollmentListByCourseRequest(courseid)),
		dataType : 'json',
		async : false,
		global : false,
		success : function(data) {
			customLoader(false);
			console.log(data);
			if (data['status'] == 'failed' || data['status'] == 'exception' || data['status'] == 'timedout') {
				if(data['status'] == 'timedout'){
					redirectLoginPage();
				}else{
					if(tt=='theme1'){
						showMessage(false, data['message']);
					}else{
						showMessageTheme2(0, data['message'],'',true);
					}
				}
			} else {
				if(foruse=='for_sms'){
					getEnrollByCourse(data['enrollments'], roleModuleId);
				}
			}
			return true;
		},
		error : function(e) {
			customLoader(false);
			if(tt=='theme1'){
				showMessage(false, LMS_UNER_MAINTANANCE);
			}else{
				showMessageTheme2(0, LMS_UNER_MAINTANANCE,'',true);
			}
		}
	});
}

function updateEnrollmentListByCourseRequest(courseid){
	var lmsDetails = JSON.parse(localStorage.getItem('lud'));
	var payload = {};
	payload['domainid'] = lmsDetails['did'];
	payload['userid'] = lmsDetails['luid'];
	courseidList=[];
	courseidList.push(courseid);
	payload['courseid'] = courseidList;
	return payload;
}

function loadPageWithResources(enrollmentid,courseid,lessonid, allsessonid){
    lessonResources(enrollmentid,courseid,lessonid);
    getLMSContentRight(enrollmentid,courseid,lessonid, allsessonid);
}


function getUserList(elementId, foruse, userid, datatype, roleModuleId){
	customLoader(true);
	$.ajax({
		headers: {
			'Authorization':'Bearer '+localStorage.getItem('lmsToken'),
		},
		type : "POST",
		contentType : "application/json",
		url : LMS_API_BASE_URL+'/user/get',
		data : JSON.stringify(updateUserRequest(userid, datatype)),
		dataType : 'json',
		async : false,
		global : false,
		success : function(data) {
			customLoader(false);
			if (data['status'] == 'failed' || data['status'] == 'exception' || data['status'] == 'timedout') {
				if(tt=='theme1'){
					showMessage(false, data['message']);
				}else{
					showMessageTheme2(0, data['message'],'',true);
				}
			} else {
				if(foruse=='for_sms'){
					if(datatype=='IDS_LIST'){
						getUserDescription(data['users']);
					}else{
						$('#LMSListContentDiv').html(LMSUserTable(elementId));
						$('#'+elementId+' > tbody').append(getLMSUserTableBody(data['users'], roleModuleId));
						var isDataTable = $.fn.dataTable.isDataTable('#'+elementId);
						if(isDataTable){
							$('#'+elementId).dataTable().fnDestroy();
						}
						$('#'+elementId).DataTable();
					}
				}
			}
			return true;
		},
		error : function(e) {
			customLoader(false);
			if(tt=='theme1'){
				showMessage(false, LMS_UNER_MAINTANANCE);
			}else{
				showMessageTheme2(0, LMS_UNER_MAINTANANCE,'',true);
			}
		}
	});
}
function updateUserRequest(userid, datatype){
	var lmsDetails = JSON.parse(localStorage.getItem('lud'));
	var payload = {};
	payload['domainid'] = lmsDetails['did'];
	useridList=[];
	if(userid>0){
		useridList.push(userid);
	}
	payload['userid'] = useridList;
	payload['datatype'] = datatype;
	return payload;
}


function getEnrollmentListByUser(userid, enrollmentid, foruse, datatype, roleModuleId){
	customLoader(true);
	$.ajax({
		headers: {
			'Authorization':'Bearer '+localStorage.getItem('lmsToken'),
		},
		type : "POST",
		contentType : "application/json",
		url : LMS_API_BASE_URL+'/enrollments/get-allcourse',
		data : JSON.stringify(updateEnrollByUserRequest(userid, enrollmentid, datatype)),
		dataType : 'json',
		async : false,
		global : false,
		success : function(data) {
			customLoader(false);
			if (data['status'] == 'failed' || data['status'] == 'exception' || data['status'] == 'timedout') {
				if(tt=='theme1'){
					showMessage(false, data['message']);
				}else{
					showMessageTheme2(0, data['message'],'',true);
				}
			} else {
				if(foruse=='for_sms'){
					if(datatype=='ALL_LIST'){
						getEnrollByUser(data['enrollments'], roleModuleId);
					}else if(datatype=='IDS_LIST'){
						getEnrollDescription(data['enrollments'], roleModuleId);
					}
					
				}
			}
			return true;
		},
		error : function(e) {
			customLoader(false);
			if(tt=='theme1'){
				showMessage(false, LMS_UNER_MAINTANANCE);
			}else{
				showMessageTheme2(0, LMS_UNER_MAINTANANCE,'',true);
			}
		}
	});
}
function updateEnrollByUserRequest(userid,enrollmentid, datatype){
	var lmsDetails = JSON.parse(localStorage.getItem('lud'));
	var payload = {};
	payload['domainid'] = lmsDetails['did'];
	payload['userid'] =userid;
	enrollmentidList=[];
	if(enrollmentid>0){
		enrollmentidList.push(enrollmentid);
	}
	payload['enrollmentid'] = enrollmentidList;
	payload['datatype'] = datatype;
	return payload;
}

function deleteLmsUser(moduleId, userid, fromcall){
	customLoader(true);
	$.ajax({
		headers: {
			'Authorization':'Bearer '+localStorage.getItem('lmsToken'),
		},
		type : "POST",
		contentType : "application/json",
		url : LMS_API_BASE_URL+'/user/delete',
		data : JSON.stringify(deleteUserRequest(userid)),
		dataType : 'json',
		async : false,
		global : false,
		success : function(data) {
			customLoader(false);
			if (data['status'] == 'failed' || data['status'] == 'exception' || data['status'] == 'timedout') {
				if(data['status'] == 'timedout'){
					redirectLoginPage();
				}else{
					if(tt=='theme1'){
						showMessage(false, data['message']);
					}else{
						showMessageTheme2(0, data['message'],'',true);
					}
				}
			}else{
				//UPDATE LOCALSTORAGE BY LEARNING RESOURCES
				if(tt=='theme1'){
					showMessage(false, 'User deleted.');
				}else{
					showMessageTheme2(1, 'User deleted.','',true);
				}
				if(fromcall=='SMS_USER'){

				}else{
					getContent(moduleId, 'entire-user', '', '');
				}
			}
			return true;
		},
		error : function(e) {
			customLoader(false);
			if(tt=='theme1'){
				showMessage(false, LMS_UNER_MAINTANANCE);
			}else{
				showMessageTheme2(0, LMS_UNER_MAINTANANCE,'',true);
			}

		}
	});
}

function deleteUserRequest(userid){
	console.log(userid);
	var lmsDetails = JSON.parse(localStorage.getItem('lud'));
	var payload = {};
	payload['domainid'] = lmsDetails['did'];
	payload['softDelete'] =false;
	var useridList=[];
	if($.isNumeric(userid)){
		if(userid>0){
			users={};
			users['userid']=userid;
			useridList.push(users);
		}
	}else{
		var userstr = userid.split(",");
		for(var u=0;u<userstr.length;u++){
			users={};
			users['userid']=userid[u];
			useridList.push(users);
		}
	}
	payload['users'] = useridList;
	return payload;
}



function saveLesson(elementId, foruse, roleModuleId){
	customLoader(true);
	courseid=$("#courseid").val();
	$.ajax({
		headers: {
			'Authorization':'Bearer '+localStorage.getItem('lmsToken'),
		},
		type : "POST",
		contentType : "application/json",
		url : LMS_API_BASE_URL+'/lesson/save',
		data : JSON.stringify(updateLessonRequest()),
		dataType : 'json',
		async : false,
		global : false,
		success : function(data) {
			customLoader(false);
			if (data['status'] == 'failed' || data['status'] == 'exception' || data['status'] == 'timedout') {
				if(tt=='theme1'){
					showMessage(false, data['message']);
				}else{
					showMessageTheme2(0, data['message'],'',true);
				}
			} else {
				if(foruse=='for_sms'){

					$('#lessonUpdateModule').modal('hide');
					if(tt=='theme1'){
						showMessage(false, data['message']);
					}else{
						showMessageTheme2(0, data['message'],'',true);
					}
					var data=updateLessonIndex('',courseid,'');
					getLessonByCourse(data['lessons']);
				}
			}
			return true;
		},
		error : function(e) {
			customLoader(false);
			if(tt=='theme1'){
				showMessage(false, LMS_UNER_MAINTANANCE);
			}else{
				showMessageTheme2(0, LMS_UNER_MAINTANANCE,'',true);
			}
		}
	});
}
function updateLessonRequest(){
	var lmsDetails = JSON.parse(localStorage.getItem('lud'));
	var payload = {};
	payload['domainid'] = lmsDetails['did'];
	payload['userid'] = lmsDetails['luid'];
	payload['lessonid'] = $("#lessonid").val();
	payload['lessonName'] = $("#lessonname").val();
	payload['completionDays'] = $("#completeDays").val();
	payload['eligibleForGrading'] = $("#eligibleForGradingFilter").val();
	payload['eligibleForProgress'] = $("#eligibleForProgressFilter").val();
	payload['startPage'] =  $("#startpage").val();
	payload['endPage'] = $("#endpage").val();
	payload['lessonType'] = $("#lessontype").val();
	
	return payload;
}