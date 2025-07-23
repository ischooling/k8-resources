function getLMSClassroomHeader(role){
	var html=''
	if(role!='TEACHER'){
		html='<th>S.No.</th><th>LMS Platform</th><th>Student Name</th><th>LMS User Name</th><th>User Name</th><th>Grade</th><th>SMS/LMS Profile Status</th><th>Student Academic Year Start Date</th><th>Registration Type</th><th>Action</th>';
	}else{
		html='<th>S.No.</th><th>Student Name</th><th>Course Name/Grade</th><th>Student Timezone</th><th>Teacher Timezone</th><th>Link Generation Status</th><th>Join Class</th><th>Mark Session</th><th>Class Status</th><th>Action</th>';
	}
	return '<thead><tr>'+html+'</tr></thead><tbody></tbody>';
}

function getManageLMSUserTableBody(result, userId, role){
	var html='';
	$.each(result, function(k, v) {
		action='';
		html+=
			'<tr id="lmsUserTr'+v.studentId+'">'
				+'<td>'+v.sno+'</td>'
				+'<td>'+v.courseProviderName+'</td>'
				+'<td>'+v.name+'</td>'
				+'<td>'+v.lmsUserName+'</td>'
				+'<td>'+v.userName+'</td>'
				+'<td>'+v.gradeName+'</td>'
				+'<td>'+v.userProfileStatus+'</td>'
				+'<td>'+v.semesterStartDate+'</td>'
				+'<td>'+v.registrationType+'</td>';
		html+=	'<td>'+v.action+'</td>'
			'</tr>';
	});
	return html;
}

function getManageLMSFilter(roleAndModule, schoolId, userId, role){
	var html=
	'<div class="row">'
		+'<div class="col-md-12">'
			+'<div class="filter-wrapper">'
				+'<div class="full">'
				+'<button class="btn btn-sm btn-primary float-right show-filter" onClick="toggleFilter()"><i class="fa fa-filter"></i>&nbsp;Filter</button>'
				+'</div>'
				+'<form name="lmsStudentFilter" id="lmsStudentFilter" action="javascript:void(0)">'
					+'<div class="filter-fields">';
						html+=	'<div class="col-md-3 col-sm-6 col-xs-12">'
								+'<label> Start Date</label>'
								+'<input type="text" name="academicYearStartDate" id="academicYearStartDate" class="form-control filterDates" value="" maxlength="10"/>'
								+'</div>'
								+'<div class="col-md-3 col-sm-6 col-xs-12">'
								+'<label>End Date</label>'
								+'<input type="text" name="academicYearEndDate" id="academicYearEndDate" class="form-control filterDates" value="" maxlength="10"/>'
								+'</div>';
						html+='<div class="col-md-3 col-sm-3 col-xs-12">'
										+'<label>Select Learning Program</label>'
										+'<select name="enrollmentType" id="enrollmentType" class="form-control">'
											+getLearningProgramContent(schoolId)
										+'</select>'
									+'</div>';

						html+='<div class="col-md-3 col-sm-3 col-xs-12">'
									+'<label>Grade</label>'
									+'<select name="standardId" id="standardId" multiple="multiple" class=" multiselect-dropdown form-control">'
										+getStandardContent(schoolId)
									+'</select>'
								+'</div>';

						html+='<div class="col-md-3 col-sm-3 col-xs-12">'
										+'<label>Select LMS Platform</label>'
										+'<select name="courseProviderId" id="courseProviderId" class="form-control">'
											+getLmsPlateformContent(schoolId)
										+'</select>'
									+'</div>';

						html+='<div class="col-md-3 col-sm-6 col-xs-12">'
							+'<label>Student Name</label>'
							+'<input type="text" name="studentName" id="studentName" class="form-control" value="" maxlength="100" onkeydown="return M.isChars(event);">'
						+'</div>';

						html+='<div class="col-md-3 col-sm-6 col-xs-12">'
									+'<label>Student Email</label>'
									+'<input type="text" name="studentEmail" id="studentEmail" class="form-control" value="" maxlength="100" onkeydown="return M.isEmail(event);"/>'
								+'</div>';

						html+='<div class="col-md-3 col-sm-3 col-xs-12">'
							+'<label>Academic Year Selected</label>'
							+'<select name="academicYearStatus" id="academicYearStatus" class="form-control">'
								+'<option value="">Select Academic Year Selected Status</option>'
								+'<option value="Y">Yes</option>'
								+'<option value="N">No</option>'
							+'</select>'
						+'</div>'
						+'<div class="col-md-3 col-sm-3 col-xs-12">'
							+'<label>LMS Status</label>'
							+'<select name="lmsStatus" id="lmsStatus" class="form-control">'
								+'<option value="">Select LMS Status</option>'
								+'<option value="1">Active</option>'
								+'<option value="0">Inactive</option>'
							+'</select>'
						+'</div>';

						html+='<div class="col-md-3 col-sm-3 col-xs-12" style="display:'+(role=='TEACHER'?'none':'block')+';">'
							+'<label>Profile Status</label>'
							+'<select name="profileStatus" id="profileStatus" class="form-control">';

						html+='<option value="">Select Profile Status</option>'
								+'<option value="0">Completed</option>'
									+'<option value="1">Withdrawn</option>';


					html+='</select>'
						+'</div>'
						+'<div class="col-md-3 col-sm-3 col-xs-12">'
							+'<label>Sort By</label>'
							+'<select name="sortBy" id="sortBy" class="form-control">'
								+'<option value="DESC">Descending</option>'
								+'<option value="ASC">Ascending</option>'
							+'</select>'
						+'</div>'
						+'<div class="col-md-3 col-sm-6 col-xs-12">'
							+'<label>Page Size</label>'
							+'<input type="text" name="pageSize" id="pageSize" class="form-control" value="25"/>'
						+'</div>'
						+'<div class="col-md-12 col-sm-12 col-xs-12 mt-2">'
							+'<button class="btn btn-sm btn-primary float-right" onclick="advanceLMSUserSearchReset(\'lmsStudentFilter\')"><i class="fa fa-check"></i>&nbsp;Reset</button>'
							+'<button class="btn btn-sm btn-primary float-right" onclick="advanceLMSUSerSearch(\'lmsStudentFilter\',\''+roleAndModule.moduleId+'\','+userId+',\''+role+'\');"><i class="fa fa-check"></i>&nbsp;Apply</button>'
						+'</div>'
					+'</div>'
				+'</form>'
			+'</div>'
		+'</div>'
	+'</div>';
	return html;
}

function callChangePasswordModal(userId){
	$.ajax({
		type : "POST",
		url : getURLForHTML('dashboard','student-view-lms-content'),
		data : "userId="+userId+"&moduleId=14",
		dataType : 'html',
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
        			$('#viewStudentLmsContent').html(htmlContent)
        		}
			}
		}
	});
	$('#lmsUserForm #userId1').val(userId);
}

function getManageLmsUserContent(titlle, roleAndModule, schoolId, userId, role){
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

						html+='</div>'
						+'</div>'
						+'<div class="row">'
							+'<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">'
							+getManageLMSFilter(roleAndModule,schoolId,userId,role)
							+'</div>'
						+'</div>'
						+'<br>'
						+'<div class="col-md-12">'
							+'<div class="row">'
								+'<div style="width:100%;">'
									+'<div class="tab-content clearfix">'
										+'<div class="row">'
											+'<div id="manageLMSUserContentDiv" style="width:100%;display:inline-block">'
											+'</div>'
											+'<div id="viewStudentLmsContent">'
											+'</div>'
											+'<div id="studentAssighnTeacherSupportContent"></div>'
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

function manageLMSUserTable(tableId, role){
	html='<table id="'+tableId+'" class="table table-bordered responsive" style="width:100%;">'
		+getLMSClassroomHeader(role)
	+'</table><br/>';
	return html;
}
