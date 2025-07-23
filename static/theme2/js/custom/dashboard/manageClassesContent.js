function getClassroomHeader(role){
	var html=''
	if(role!='TEACHER'){
		html='<th>S.No.</th><th>Student Name/Email/Teacher Name/Email</th><th>Course Name/Grade</th><th>Student Timezone</th><th>Teacher Timezone</th><th>Admin Timezone</th><th>Link Generation Status</th><th>Join Class</th><th>Mark Session</th><th>Class Status</th><th>Class Type</th><th>Action</th>';
	}else{
		html='<th>S.No.</th><th>Student Name</th><th>Course Name/Grade</th><th>Student Timezone</th><th>Teacher Timezone</th><th>Link Generation Status</th><th>Join Class</th><th>Mark Session</th><th>Class Status</th><th>Action</th>';
	}
	return '<thead><tr>'+html+'</tr></thead><tbody></tbody>';
}

function getClassroomBody(result, userId, role){
	var html='';
	$.each(result, function(k, v) {
		joinClassStatus = "Link not generated yet";
		if (v.externalMeetingUrl!='' && v.externalMeetingUrlCreated!='') {
			joinClassStatus = "External Link Added<br/> Link created On: " + v.externalMeetingUrlCreated;
		}else if (v.externalMeetingUrl!='' && v.externalMeetingUrlCreated=='') {
			joinClassStatus = "External Link Added";
		}else if(v.meetingUrl!='') {
			joinClassStatus = "Successfully Generated";
		}

		joinClass='';
		if(SCHOOL_ID==1){
			if(v.meetingCurStatus=='Y'){
				if(v.meetingUrl!==''){
					joinClass+='<a href="'+v.meetingUrl+'" target="_blank">Join Class</a>';
				}
			}else if(v.meetingCurStatus=='N'){
				if(v.studentName!='N/A'){
					joinClass+='Session not started yet'+'<br/>';
				}
			}else if(v.meetingCurStatus=='E'){
				joinClass+='Session Expired'+'<br/>';
			}else if(v.meetingCurStatus=='F'){
				joinClass+='Session Ended'+'<br/>';
			}
		}else{
			if(v.externalMeetingUrl!=''){
				joinClass+='<a id="joinClass'+v.meetingId+'" href="'+v.externalMeetingUrl+'" target="_blank"><i data-toggle="tooltip" title="Join Class" class="fa fa-video-camera"></i></a>';
				joinClass+=' | ';
				joinClass+='<a id="_createLink'+v.meetingId+'" href="javascript:void(0);"  onclick="meetingUrlModalTeacher('+v.meetingId+','+userId+',\''+v.externalMeetingUrl+'\',\''+v.mailSendStatus+'\',\''+ v.urlRemarks+'\')"><i data-toggle="tooltip" title="View Comments" class="fa fa-eye"></i></a>';
			}else{
				if(v.meetingCurStatus=='Y'){
					if(v.meetingUrl!==''){
						joinClass+='<a href="'+v.meetingUrl+'" target="_blank">Join Class</a>';
					}
				}else if(v.meetingCurStatus=='N'){
					if(v.studentName!='N/A'){
						joinClass+='Session not started yet'+'<br/>';
					}
				}else if(v.meetingCurStatus=='E'){
					joinClass+='Session Expired'+'<br/>';
				}else if(v.meetingCurStatus=='F'){
					joinClass+='Session Ended'+'<br/>';
				}
			}
		}
		
		if(v.meetingCurStatus=='N' || v.meetingCurStatus=='Y'){
			if(v.externalMeetingUrl!=''){
				joinClass+='<a id="joinClass'+v.meetingId+'" href="'+v.externalMeetingUrl+'" target="_blank"><i data-toggle="tooltip" title="Join Class" class="fa fa-video-camera"></i></a>';
				joinClass+=' | ';
				joinClass+='<a id="_createLink'+v.meetingId+'" href="javascript:void(0);"  onclick="meetingUrlModalTeacher('+v.meetingId+','+userId+',\''+v.externalMeetingUrl+'\',\''+v.mailSendStatus+'\',\''+ v.urlRemarks+'\')"><i data-toggle="tooltip" title="View Comments" class="fa fa-eye"></i></a>';
			}else if(v.meetingUrl!==''){
				//joinClass+='<a href="'+v.meetingUrl+'" target="_blank">Join Class</a>';
			}else if(v.meetingCurStatus!='F'){
				if(v.studentName!='N/A'){
					joinClass+='<a id="createLink'+v.meetingId+'" href="javascript:void(0);"  onclick="meetingUrlModalTeacher('+v.meetingId+','+userId+',\''+v.externalMeetingUrl+'\',\''+v.mailSendStatus+'\',\''+v.urlRemarks+'\')"><i data-toggle="tooltip" title="Create Class Link" class="fa fa-plus"></i></a>';
					if('TEACHER'==role){
						createClassroomSessionContent='| <a id="createClassLink'+v.meetingId+'" href="javascript:void(0);" onclick="createGotoMeetingLink('+userId+','+v.meetingId+','+roleAndModule.moduleId+',\''+v.meetingType+'\')">Create Meeting Link</a>';
						joinClass+=createClassroomSessionContent;
					}
				}
			}
		}
		updateClassroomSessionContent='';
		meetingResultContent='';
		if(v.meetingResult!=''){
			meetingResultContent='<strong>'+v.meetingResult+'</strong><br/>';
			updateClassroomSessionContent='<a id="updateStatus'+v.meetingId+'" href="javascript:void(0);" onclick="meetingResultModal('+v.meetingId+','+userId+',\''+v.meetingResult+'\',\''+v.meetingCurStatus+'\',\''+role+'\')">Change</a>';
		}else{
			updateClassroomSessionContent='<a id="updateStatus'+v.meetingId+'" href="javascript:void(0);" onclick="meetingResultModal('+v.meetingId+','+userId+',\''+v.meetingResult+'\',\''+v.meetingCurStatus+'\',\''+role+'\')">Update Session</a>';
		}
		markSession='';
		if(meetingResultContent=='' || 'TEACHER'!=role){
			isUpdate = false;
			if (v.bookedDate=='N/A') {
				markSession=v.bookedDate;
			}else{
				if(v.meetingResult!=''){
					if (v.revokeChangedStatus=='Y') {
						markSession += meetingResultContent;
						if ('ADMIN'==role || 'SUPER_ADMIN' == role || 'SCHOOL' == role || 'DIRECTOR' == role || 'SCHOOL_ADMIN' == role ) {
							markSession+=' | ';
							markSession+=updateClassroomSessionContent;
						}
						isUpdate = true;
					}else{
						if ('ADMIN'==role || 'SUPER_ADMIN' == role || 'SCHOOL' == role || 'DIRECTOR' == role || 'SCHOOL_ADMIN' == role ) {
							if (v.meetingResult!='') {
								markSession += meetingResultContent+' | ';
							}
							markSession+=updateClassroomSessionContent;
							isUpdate = true;
						} else {
							if (v.isStatusUpdate == 1 && !isUpdate) {
								markSession+=updateClassroomSessionContent+'<br/>';
								isUpdate = true;
							} else {
								markSession += meetingResultContent;
								if (roleAndModule.updated=='Y' && !isUpdate) {
									markSession+=updateClassroomSessionContent+'<br/>';
									isUpdate = true;
								}
							}
							if ((v.meetingCurStatus=='F' || v.meetingCurStatus=='E') && roleAndModule.updated=='Y' && !isUpdate) {
								markSession+=updateClassroomSessionContent+'<br/>';
								isUpdate = true;
							}
							if (v.externalMeetingUrl!='' && roleAndModule.updated=='Y' && v.mailSendStatus=='Y' && !isUpdate) {
								markSession+=updateClassroomSessionContent
								isUpdate = true;
							}
						}
					}
				}else{
					// if ('ADMIN'==role || 'SUPER_ADMIN' == role || 'SCHOOL' == role || 'DIRECTOR' == role || 'SCHOOL_ADMIN' == role ) {
					// 	markSession+=updateClassroomSessionContent;
					// 	isUpdate = true;
					// } else {
					// 	if (markSession==''){
					// 		if ( v.mailSendStatus=='Y' && v.externalMeetingUrl!='' && roleAndModule.updated=='Y') {
					// 			markSession+=updateClassroomSessionContent;
					// 			isUpdate = true;
					// 		}
					// 		if ((v.meetingCurStatus=='E' || v.meetingCurStatus=='F') && roleAndModule.updated=='Y' && !isUpdate) {
					// 			markSession+=updateClassroomSessionContent;
					// 			isUpdate = true;
					// 		}
					// 	}
					// }
					markSession+=updateClassroomSessionContent;
					isUpdate = true;
				}
			}
		}else{
			markSession += meetingResultContent;
		}

		action='';
		if(v.externalMeetingUrl!=''){
			if(v.mailSendStatus=='Y'){
				action+='<i data-toggle="tooltip" title="Mail Already Sent" class="fa fa-check"></i> | <a id="sendMail'+v.meetingId+'" href="javascript:void(0);" onclick="sendMailModel('+v.meetingId+','+userId+',\'' +v.externalMeetingUrl+'\',\'' +v.mailSendStatus+'\')"><i data-toggle="tooltip" title="ReSend Mail" class="fa fa-paper-plane"></i></a>';
			}else if(v.mailSendStatus=='N' || mailSendStatus=='N/A'){
				action+='<a id="sendMail'+v.meetingId+'" href="javascript:void(0);" onclick="sendMailModel('+v.meetingId+','+userId+',\'' +v.externalMeetingUrl+'\',\''+v.mailSendStatus+'\')"><i data-toggle="tooltip" title="Send Mail\" class="fa fa-paper-plane"></i></a>';
			}
			action+=' | ';
		}
		if(roleAndModule.deleted=='Y'){
			if (v.bookedDate=='N/A') {
				action+='<a href="javascript:void(0);" onclick="showWarningMessage(\'Are you sure you want to delete?\',\'submitRequestDemoMeetingSlots(\\\'teacherMeetingSlotsForm\\\',\\\'TEACHER\\\',\\\'EDIT\\\',\\\''+v.meetingId+'\\\',\\\'DELETESLOTFROMTEACHER\\\','+roleAndModule.moduleId+','+userId+')\')"><i class="fa fa-trash"></i></a>';
			}
		}
		if(action==''){
			action='N/A';
		}
		// className=k%2==0?'even':'odd';
		className='';
		studentTeacher='';
		if('TEACHER'==role){
			studentTeacher=v.studentName;//+'<br>'+v.teacherName;
		}else{
			studentTeacher=v.studentName+'<br>'+v.studentEmail+'<br>'+v.teacherName+'<br>'+v.teacherOfficialEmail+'<br>'+v.teacherEmail+'<br>';
		}
		courseStandard=v.subjectName+'<br>'+v.standardName;
		//'/'+v.meetingId+'/'+v.bookedDate+
		html+=
			'<tr id="classrommTr'+v.meetingId+'" class="'+className+'">'
				+'<td>'+v.sno;
					// if(ENVIRONMENT!='prod'){
					// 	html+='/'+v.meetingId;
					// }
				html+='</td>'
				+'<td>'+studentTeacher+'</td>'
				+'<td>'+courseStandard+'</td>'
				+'<td>'+v.studentTimezone+'</td>'
				+'<td>'+v.teacherTimezone+'</td>';
				if('TEACHER'!=role){
					html+='<td>'+v.adminTimezone+'</td>';
				}
		html+=	'<td><span class="linkStatus'+v.meetingId+'">'+joinClassStatus+'</span></td>'
				+'<td class="joinView'+v.meetingId+'">'+joinClass+'</td>'
				+'<td class="markSession'+v.meetingId+'">'+markSession+'</td>'
				+'<td>'+v.classStatus+'</td>';
				if('TEACHER'!=role){
					html+='<td>'+v.classType+'</td>';
				}
		html+=	'<td class="classAction'+v.meetingId+'">'+action+'</td>'
			'</td>';
	});
	return html;
}

function getClassroomSessionFilter(roleAndModule, schoolId, userId, role){
	var html=
	'<div class="row">'
		+'<div class="col-md-12">'
			+'<div class="filter-wrapper">'
				+'<div class="full">'
				+'<button class="btn btn-sm btn-primary float-right show-filter" onClick="toggleFilter()"><i class="fa fa-filter"></i>&nbsp;Filter</button>'
				+'</div>'
				+'<form name="classroomSessionFilter" id="classroomSessionFilter" action="javascript:void(0)">'
					+'<div class="filter-fields">';
						if(role!='TEACHER'){
							html+='<div class="col-md-3 col-sm-3 col-xs-12">'
										+'<label>Select Learning Program</label>'
										+'<select name="enrollmentType" id="enrollmentType" class="form-control">'
											+getLearningProgramContent(schoolId)
										+'</select>'
									+'</div>';
						}
						html+='<div class="col-md-3 col-sm-3 col-xs-12">'
									+'<label>Grade</label>'
									+'<select name="standardId" id="standardId" class="form-control">'
										+getStandardContent(schoolId)
									+'</select>'
								+'</div>';
						if(role!='TEACHER'){
							html+='<div class="col-md-3 col-sm-3 col-xs-12">'
										+'<label>Select LMS Platform</label>'
										+'<select name="courseProviderId" id="courseProviderId" class="form-control">'
											+getLmsPlateformContent(schoolId)
										+'</select>'
									+'</div>';
						}
						html+='<div class="col-md-3 col-sm-6 col-xs-12">'
							+'<label>Student Name</label>'
							+'<input type="text" name="studentName" id="studentName" class="form-control" value="" maxlength="100" onkeydown="return M.isChars(event);">'
						+'</div>';
						if(role!='TEACHER'){
							html+='<div class="col-md-3 col-sm-6 col-xs-12">'
										+'<label>Student Email</label>'
										+'<input type="text" name="studentEmail" id="studentEmail" class="form-control" value="" maxlength="100" onkeydown="return M.isEmail(event);"/>'
									+'</div>';
						}
						html+='<div class="col-md-3 col-sm-6 col-xs-12">'
							+'<label>Course Name</label>'
							+'<input type="text" name="subjectIds" id="subjectIds" class="form-control" value="" maxlength="40" onkeydown="return M.isChars(event);">'
						+'</div>';
						if(role!='TEACHER'){
							html+='<div class="col-md-3 col-sm-6 col-xs-12">'
								+'<label>Teacher Name</label>'
								+'<input type="text" name="teacherName" id="teacherName" class="form-control" value="" maxlength="100" onkeydown="return M.isChars(event);">'
							+'</div>'
							+'<div class="col-md-3 col-sm-6 col-xs-12">'
								+'<label>Teacher Email</label>'
								+'<input type="text" name="teacherEmail" id="teacherEmail" class="form-control" value="" maxlength="100" onkeydown="return M.isEmail(event);"/>'
							+'</div>';
						}
						html+='<div class="col-md-3 col-sm-3 col-xs-12">'
							+'<label>Class Status</label>'
							+'<select name="classStatus" id="classStatus" class="form-control">'
								+'<option value="">Select Class Status</option>'
								+'<option value="B">Booked</option>'
								+'<option value="A">Available</option>'
							+'</select>'
						+'</div>'
						+'<div class="col-md-3 col-sm-3 col-xs-12">'
							+'<label>Mark Status</label>'
							+'<select name="markStatus" id="markStatus" class="form-control">'
								+'<option value="">Select Mark Status</option>'
								+'<option value="NU">Not Updated</option>'
								+'<option value="Completed">Completed</option>'
								+'<option value="Reschedule Session">Reschedule Session</option>'
								+'<option value="Missed by Student">Missed by Student</option>'
								+'<option value="Missed by Teacher">Missed by Teacher</option>'
							+'</select>'
						+'</div>'
						+'<div class="col-md-3 col-sm-6 col-xs-12">'
							+'<label>Class Start Date</label>'
							+'<input type="text" name="classStartDate" id="classStartDate" class="form-control filterDates" value="" maxlength="10"/>'
						+'</div>'
						+'<div class="col-md-3 col-sm-6 col-xs-12">'
							+'<label>Class End Date</label>'
							+'<input type="text" name="classEndDate" id="classEndDate" class="form-control filterDates" value="" maxlength="10"/>'
						+'</div>'
						+'<div class="col-md-3 col-sm-3 col-xs-12" style="display:'+(role=='TEACHER'?'none':'block')+';">'
							+'<label>Search By</label>'
							+'<select name="searchBy" id="searchBy" class="form-control">';
								if(role!='TEACHER'){
									html+='<option value="A">Admin</option>'
									+'<option value="S">Student</option>'
									+'<option value="T">Teacher</option>';
								}else{
									html+='<option value="S">Student</option>';
								}
					html+='</select>'
						+'</div>'
						+'<div class="col-md-3 col-sm-3 col-xs-12">'
							+'<label>Sort By</label>'
							+'<select name="sortBy" id="sortBy" class="form-control">'
								+'<option value="ASC">Ascending</option>'
								+'<option value="DESC">Descending</option>'
							+'</select>'
						+'</div>'
						+'<div class="col-md-3 col-sm-6 col-xs-12">'
							+'<label>Page Size</label>'
							+'<input type="text" name="pageSize" id="pageSize" class="form-control" value="25"/>'
						+'</div>'
						+'<div class="col-md-12 col-sm-12 col-xs-12 mt-2">'
							+'<button class="btn btn-sm btn-primary float-right" onclick="advanceClassroomSearchReset(\'classroomSessionFilter\')"><i class="fa fa-check"></i>&nbsp;Reset</button>'
							+'<button class="btn btn-sm btn-primary float-right" onclick="advanceClassroomSearch(\'classroomSessionFilter\',\''+roleAndModule.moduleId+'\','+userId+',\''+role+'\');"><i class="fa fa-check"></i>&nbsp;Apply</button>'
						+'</div>'
					+'</div>'
				+'</form>'
			+'</div>'
		+'</div>'
	+'</div>';
	return html;
}

function getManageSessionContent(titlle, roleAndModule, schoolId, userId, role){
	var html= 
		'<div class="row">'
			+'<div class="col-md-12 col-lg-12 col-sm-12">'
				+'<div class="card">'
					+'<div class="card-header card-header-primary">'
						+'<h4 class="card-title">'+titlle+'</h4>'
					+'</div>'
					+'<div class="card-body">'
						+'<div class="row">'
							+'<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">'
							+getClassroomSessionFilter(roleAndModule,schoolId,userId,role)
							+'</div>'
						+'</div>'
						+'<br>'
						+'<div class="col-md-12">'
							+'<div class="row">'
								+'<div style="width:100%;">'
									+'<div class="tab-content clearfix">'
										+'<div class="row">'
											+'<div id="manageSessionContentDiv" style="width:100%;display:inline-block">'
											+'</div>'
										+'</div>'
									+'</div>'
								+'</div>'
							+'</div>'
						+'</div>'
					+'</div>'
				+'</div>'
			+'</div>'
		+'</div>';
	return html;
}

function getManageSessionContentTeacher(titlle, roleAndModule, schoolId, userId, role){
	var html= 
		'<div class="row">'
			+'<div class="col-md-12 col-lg-12 col-sm-12">'
				+'<div class="card">'
					+'<div class="card-header card-header-primary">'
						+'<h4 class="card-title">'+titlle+'</h4>'
					+'</div>'
					+'<div class="card-body">'
						+'<div class="row">'
							+'<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">';
								if(roleAndModule.added=='Y'){
									html+='<p>'
										+'<a href="javascript:void(0);" onclick="deletemeetingSlotModal();" class="btn btn-primary fa-pull-right meetingSlotAdd">Delete Meeting Session Slot</a>'
										+'<a href="javascript:void(0);" onclick="meetingSlotModal();" class="btn btn-primary fa-pull-right meetingSlotAdd">Add New Session Slot</a>'
									+'</p>';
								}
						html+='</div>'
						+'</div>'
						+'<div class="row">'
							+'<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">'
							+getClassroomSessionFilter(roleAndModule,schoolId,userId,role)
							+'</div>'
						+'</div>'
						+'<br>'
						+'<div class="col-md-12">'
							+'<div class="row">'
								+'<div style="width:100%;">'
									+'<div class="tab-content clearfix">'
										+'<div class="row">'
											+'<div id="manageSessionContentDiv" style="width:100%;display:inline-block">'
											+'</div>'
										+'</div>'
									+'</div>'
								+'</div>'
							+'</div>'
						+'</div>'
					+'</div>'
				+'</div>'
			+'</div>'
		+'</div>';
	return html;
}

function manageClassroomTable(tableId, role){
	html='<table id="'+tableId+'" class="table table-bordered responsive" style="width:100%;">'
		+getClassroomHeader(role)
	+'</table><br/>';
	return html;
}
function getUpdateMeetingResultModal(roleAndModule, role){
	var html=
	'<div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" id="updateMeetingResultModal">'
		+'<div class="modal-dialog modal-md">'
			+'<form name="updateMeetingResultForm" id="updateMeetingResultForm">'
				+'<div class="modal-content" style="border: none; border-radius: 1px">'
					+'<input type="hidden" class="form-control" id="userId" name="userId" value="">'
					+'<input type="hidden" class="form-control" id="meetingId" name="meetingId" value="">'
					+'<input type="hidden" class="form-control" id="meetingCurStatus" name="meetingCurStatus" value="">'
					+'<div class="modal-header text-center">'
						+'<h4 class="modal-title" id="myLargeModalLabel">Mark Session</h4>'
						+'<button type="button" class="close" data-dismiss="modal" aria-hidden="true" style="color:#fff;">x</button>'
					+'</div>'
					+'<div class="modal-body">'
						+'<div class="col-md-12 col-sm-12 col-xs-12">'
							+'<div class="form-group">'
								+'<label>Mark Session</label> '
								+'<select class="form-control" name="meetingResult" id="meetingResult" required>'
								+'</select>'
							+'</div>'
						+'</div>'
					+'</div>'
					+'<div class="modal-footer">';
						if(roleAndModule.updated=='Y'){
							html+='<button type="button" class="send btn btn-primary  text-left meetingSaveResult" onClick="updateClassroomSession(\''+roleAndModule.moduleId+'\',\''+role+'\');"><i class="fa fa-envelope-o"></i> Save</button>';
						}
						html+='<button type="button" class="btn btn-danger waves-effect text-right" data-dismiss="modal">Close</button>'
					+'</div>'
				+'</div>'
			+'</form>'
		+'</div>'
	+'</div>';
	return html;
}

function getMeetingUrlModal(roleAndModule, role){
	var html=
	'<div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" id="meetingUrlModal">'
	   +'<div class="modal-dialog modal-md">'
			+'<form name="meetingUrlForm" id="meetingUrlForm">'
				+'<div class="modal-content" style="border: none; border-radius: 1px">'
					+'<input type="hidden" class="form-control" id="userId" name="userId" value="">'
					+'<input type="hidden" class="form-control" id="meetingId" name="meetingId" value="">'
					+'<input type="hidden" class="form-control" id="mailSendStatus" name="mailSendStatus" value="">'
					+'<div class="modal-header text-center">'
						+'<h4 class="modal-title" id="myLargeModalLabel">Session Link</h4>'
						+'<button type="button" class="close" data-dismiss="modal" aria-hidden="true" style="color:#fff;">x</button>'
					+' </div>'
					+'<div class="modal-body">'
						+'<div class="col-md-12 col-sm-12 col-xs-12">'
							+'<div class="form-group">'
								+'<label>Session Link</label>'
							   +'<input type="text" class="form-control" id="meetingUrl" name="meetingUrl" maxlength=150 value="">'
							+'</div>'
						+'</div>'
					   +'<div class="col-md-12 col-sm-12 col-xs-12">'
							+'<div class="form-group">'
								+'<label>Remarks</label>'
								+'<input type="text" class="form-control" id="remarks" name="remarks" maxlength=200 value="">'
							+'</div>'
						+'</div>'
				+'</div>'
				+'<div style="text-align:center;"  id="note">'
					+'<p>Note: Once the link is added, you won\'t be able to change the link.</p>'
				+'</div>'
				   +'<div class="modal-footer">';
						if(roleAndModule.added=='Y'){
							html+='<button type="button" id="saveMeetingUrl" class="send btn btn-primary  text-left meetingUrl" onClick="saveClassroomSessionMeetingUrl(\''+roleAndModule.moduleId+'\',\''+role+'\');"><i class="fa fa-envelope-o"></i> Save</button>';
						}
						html+='<button type="button" class="btn btn-danger waves-effect text-right" data-dismiss="modal">Close</button>'
					+'</div>'
				+'</div>'
			+'</form>'
		+'</div>'
	+'</div>';
	return html;
}

function getSendMailModal(roleAndModule, role){
	var html=
	'<div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" id="sendMailModal">'
		+'<div class="modal-dialog modal-md">'
			+'<form name="sendMailForm" id="sendMailForm">'
				+'<div class="modal-content" style="border: none; border-radius: 1px">'
					+'<input type="hidden" class="form-control" id="userId" name="userId" value="">'
					+'<input type="hidden" class="form-control" id="meetingId" name="meetingId" value="">'
					+'<div class="modal-header text-center">'
						+'<h4 class="modal-title" id="myLargeModalLabel">Send Mail</h4>'
						+'<button type="button" class="close" data-dismiss="modal" aria-hidden="true" style="color:#fff;">x</button>'
					+'</div>'
					+'<div style="text-align:center;">'
						+'<p>Are you sure you want to send this mail?</p>'
					+'</div>'
					+'<div class="modal-footer">';
						if(roleAndModule.added=='Y'){
							html+='<button type="button" class="send btn btn-primary  text-left sendMail" onClick="sendClassroomSessionMail(\''+roleAndModule.moduleId+'\',\''+role+'\');"><i class="fa fa-envelope-o"></i> Yes</button>';
						}
						html+='<button type="button" class="btn btn-danger waves-effect text-right" data-dismiss="modal">No</button>'
					+'</div>'
				+'</div>'
			+'</form>'
		+'</div>'
	+'</div>';
	return html;
}

function getPublicRecordModal(roleAndModule, role){
	var html=
	'<div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" id="publishRecordModal">'
		+'<div class="modal-dialog modal-md">'
			+'<form name="publishRecordForm" id="publishRecordForm">'
				+'<div class="modal-content" style="border: none; border-radius: 1px">'
					+'<input type="hidden" class="form-control" id="userId" name="userId" value="">'
					+'<input type="hidden" class="form-control" id="meetingId" name="meetingId" value="">'
					+'<input type="hidden" class="form-control" id="meetingStrId" name="meetingStrId" value="">'
					+'<div class="modal-header text-center">'
						+'<h4 class="modal-title" id="myLargeModalLabel"><span id="publishHeadId"></span> Recording</h4>'
						+'<button type="button" class="close" data-dismiss="modal" aria-hidden="true" style="color:#fff;">x</button>'
					+'</div>'
					+'<div style="text-align:center;">'
						+'<p>Are you sure you want to <span id="publishId"></span> Recording?</p>'
					+'</div>'
					+'<div class="modal-footer">';
						if(roleAndModule.added=='Y'){
							html+='<button type="button" class="send btn btn-primary  text-left publishRecord" onClick="publishClassroomSession(\''+roleAndModule.moduleId+'\',\''+role+'\');"><i class="fa fa-envelope-o"></i> Yes</button>';
						}
						html+='<button type="button" class="btn btn-danger waves-effect text-right" data-dismiss="modal">No</button>'
					+'</div>'
				+'</div>'
			+'</form>'
		+'</div>'
	+'</div>';
	return html;
}

function getRevokeModal(roleAndModule, role){
	var html=
	'<div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" id="revokeModal">'
		+'<div class="modal-dialog modal-md">'
			+'<form name="revokeForm" id="revokeForm">'
				+'<div class="modal-content" style="border: none; border-radius: 1px">'
					+'<input type="hidden" class="form-control" id="userId" name="userId" value="">'
					+'<input type="hidden" class="form-control" id="meetingId" name="meetingId" value="">'
					+'<input type="hidden" class="form-control" id="meetingStrId" name="meetingStrId" value="">'
					+'<div class="modal-header text-center">'
						+'<h4 class="modal-title" id="myLargeModalLabel"><span id="publishHeadId"></span> Revoke</h4>'
						+'<button type="button" class="close" data-dismiss="modal" aria-hidden="true" style="color:#fff;">x</button>'
					+'</div>'
					+'<div style="text-align:center;">'
						+'<p>Are you sure you want to Revoke?</p>'
					+'</div>'
					+'<div class="modal-footer">';
						if(roleAndModule.added=='Y'){
							html+='<button type="button" class="send btn btn-primary  text-left meetingRevoke" onClick="revokeClassroomSession(\''+roleAndModule.moduleId+'\',\''+role+'\');"><i class="fa fa-envelope-o"></i> Yes</button>';
						}
						html+='<button type="button" class="btn btn-danger waves-effect text-right" data-dismiss="modal">No</button>'
					+'</div>'
				+'</div>'
			+'</form>'
		+'</div>'
	+'</div>';
	return html;
}