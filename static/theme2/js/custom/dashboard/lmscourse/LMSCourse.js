function getLMSCourseHeader(){
	var html=''
	html='<th></th><th>Course ID</th><th>Title</th><th>External ID</th><th>Term</th><th>Type</th><th>Start Date</th><th>End Date</th><th>Days</th><th>Content</th>';
	return '<thead><tr>'+html+'</tr></thead>';
}

function getLMSCourseTableBody(result, roleModuleId){
	//console.log(roleModuleId);
	var html='';
	var ind=0;
	$.each(result, function(k, v) {
		html+=
			'<tr id="lmsCourseTr'+v.courseid+'">'
				+'<td>'+(ind+=1)+'</td>'
				+'<td><a href="javascript:void(0)" onclick="getContent('+roleModuleId+', \'entire-course-detail\', \'\', '+v.courseid+');">'+v.courseid+'</a></td>'
				+'<td>['+v.domainname+'] '+v.title+'</td>'
				+'<td>'+v.externalid+'</td>'
				+'<td>'+v.term+'</td>'
				+'<td>'+v.type+'</td>'
				+'<td>'+v.startdate+'</td>'
				+'<td>'+v.endate+'</td>'
				+'<td>'+v.days+'</td>'
				+'<td><a href="'+v.content+'" target="_blank"><i class="fa fa-file-pdf-o" aria-hidden="true"></i></a></td>'
			'</tr>';
	});
	// html+='<tr>'
	// 			+'<td></td>'
	// 			+'<td>17248756</td>'
	// 			+'<td>[IS-CORP] AP Macroeconomics v20 (GS) (Master) (C-HSMAC 14)</td>'
	// 			+'<td>or-gom-20170202-ORG-100001-C-HSMAC 14AP</td>'
	// 			+'<td>&nbsp;</td>'
	// 			+'<td>Continuous</td>'
	// 			+'<td>Nov 12, 2023</td>'
	// 			+'<td>Nov 12, 2033</td>'
	// 			+'<td>365</td>'
	// 		+'</tr>';
	 return html;
}


function getLMSCourseFilter(roleAndModule, schoolId, userId, role){
	var lmsDetails1 = JSON.parse(localStorage.getItem('lud'));
	var html='';
	html+='<style> .filter-wrapper{width:100%;display:inline-block;}'
    +'.filter-wrapper button{margin-bottom:10px;}'
    +'.filter-wrapper button:focus{outline:none}'
	+' .filter-fields{width:100%;float:left; border:1px solid #dcade7;background:#fcf1ff;padding:15px 0;display:none;}'
	+' .filter-fields label{color:#9d36b3}'
    +'.filter-wrapper .select2-container--default .select2-selection--single{background-image:linear-gradient(to top, #9c27b0 2px, rgba(156, 39, 176, 0) 2px), linear-gradient(to top, #d2d2d2 1px, rgba(210, 210, 210, 0) 1px);background: transparent;border:0;border-radius:0;height:30px;border:0;border-bottom:1px solid #d2d2d2}'
    +'.filter-wrapper .select2-container--default .select2-selection--single .select2-selection__rendered{height:30px;}'
	+'</style>';
	html+='<div class="row">'
		+'<div class="col-md-12">'
			+'<div class="filter-wrapper">'
				+'<div class="full">'
					+'<button class="btn btn-sm btn-primary float-right show-filter" onClick="toggleFilter()"><i class="fa fa-filter"></i>&nbsp;Filter</button>'
				+'</div>'
				+'<form name="lmsCourseFilter" id="lmsCourseFilter" action="javascript:void(0)">'
					+'<div class="filter-fields">';
						html+='<div class="col-md-3 col-sm-3 col-xs-12">'
						+'<label>Domain</label>'
							+'<select name="domainByFilter" id="domainByFilter" class="form-control">'
								+'<option value="1" '+(lmsDetails1['did']==1?'selected':'')+'>root</option>'
								+'<option value="2" '+(lmsDetails1['did']==2?'selected':'')+'>entirets</option>'
								+'<option value="3" '+(lmsDetails1['did']==3?'selected':'')+'>k8schooluat</option>'
								+'<option value="4" '+(lmsDetails1['did']==4?'selected':'')+'>k8school-staging</option>'
								+'<option value="5" '+(lmsDetails1['did']==5?'selected':'')+'>k8school-prod</option>'
							+'</select>'
						+'</div>'
						+'<div class="col-md-3 col-sm-3 col-xs-12">'
								+'<label>Enter Course Name</label>'
								+'<input type="text" id="courseNameFilter" name="courseNameFilter" class="form-control" />'
							+'</div>'
							+'<div class="col-md-3 col-sm-3 col-xs-12">'
								+'<label>Sort By</label>'
								+'<select name="coursesortByFilter" id="coursesortByFilter" class="form-control">'
									+'<option value="DESC">Descending</option>'
									+'<option value="ASC" selected>Ascending</option>'
								+'</select>'
							+'</div>'
							+'<div class="col-md-3 col-sm-6 col-xs-12">'
								+'<label>Page Size</label>'
								+'<input type="text" name="coursepageSizeFilter" id="coursepageSizeFilter" class="form-control" value="25"/>'
							+'</div>'
							+'<div class="col-md-12 col-sm-12 col-xs-12 mt-2">'
								+'<button class="btn btn-sm btn-primary float-right" onclick="advanceLMSCourseSearchReset(\'lmsCourseFilter\')"><i class="fa fa-check"></i>&nbsp;Reset</button>'
								+'<button class="btn btn-sm btn-primary float-right" onclick="advanceLMSCourseSearch(\'lmsCourseFilter\',\''+roleAndModule.moduleId+'\','+userId+',\''+role+'\');"><i class="fa fa-check"></i>&nbsp;Apply</button>'
							+'</div>'
					+'</div>'
				+'</form>'
			+'</div>'
		+'</div>'
	+'</div>';
	return html;
}

function getLmsCourseContent(titlle, roleAndModule, schoolId, userId, role){
	//$(".courseback").removeClass('dd-none');
	var lmsbredcrum='';
	var lmsDetails = JSON.parse(localStorage.getItem('lud'));
	if(lmsDetails!=null){
		lmsbredcrum=lmsDetails['did']+'/courses';
	}
	var html=
		'<div class="row">'
			+'<div class="col-md-12 col-lg-12 col-sm-12">'
			+'<div class="card">'
					+'<div class="card-header card-header-primary">'
					+'<h4 class="card-title titlename">'+titlle+'</h4>'
					+'<h4 class="card-title pull-right courseback d-none"  onclick="getContent('+roleAndModule.moduleId+',\'entire-course\', \'\', \'\')" style="margin-top:-25px;cursor:pointer;">'
					+'<i class="fa fa-arrow-circle-left"></i> Back</h4>'
					+'</div>'
					+'<div><h4 class="card-title text-center"><span class="lmsbredcrum">'+lmsbredcrum+'</span><span class="tabname"></span></h4></div>'
					+'<div class="card-body" id="lmsDetail">'
						+'<div class="row">'
							+'<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">'
								+getLMSCourseFilter(roleAndModule,schoolId,userId,role)
							+'</div>'
						+'</div>'
						+'<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt-4">'
							+'<div class="row">'
								+'<div id="LMSListContentDiv" style="width:100%;display:inline-block">'
									+LMSCourseTable('LMSCourseTableID', 'Admin')
								+'</div>'
							+'</div>'
						+'</div>'
					+'</div>'
				+'</div>'
				
			+'</div>'
			+lmsHistoryChnageModal()
		+'</div>'
		+getLessondetailPopup();
	return html;
}
function getCourseDetailTab(courseid, roleModuleId){
	var html='';
	html +='<ul class="nav nav-tabs mb-3 bg-secondary" id="" role="tablist">'
								+'<li class="nav-item active" role="presentation">'
									+'<a class="nav-link text-white" id="details" data-toggle="tab" href="#detailsContent" onclick="getContent('+roleModuleId+', \'entire-course-detail\', \'\', '+courseid+');" role="tab" aria-controls="detailsContent" aria-selected="true">'
										+'DETAILS'
									+'</a>'
								+'</li>'
								+'<li class="nav-item" role="presentation">'
									+'<a class="nav-link text-white" id="lessons" data-toggle="tab" href="#lessonsContent" onclick="getLessonsListByCourse('+courseid+',\'for_sms\','+roleModuleId+');" role="tab" aria-controls="enrollmentContent" aria-selected="false">'
										+'LESSONS'
									+'</a>'
								+'</li>'
								+'<li class="nav-item" role="presentation">'
									+'<a class="nav-link text-white" id="enrollment" data-toggle="tab" href="#enrollmentContent" onclick="getEnrollmentListByCourse('+courseid+',\'for_sms\','+roleModuleId+');" role="tab" aria-controls="enrollmentContent" aria-selected="false">'
										+'ENROLLMENTS'
									+'</a>'
								+'</li>'
								+'<li class="nav-item" role="presentation">'
									+'<a class="nav-link text-white" id="subscribers" data-toggle="tab" href="#subscribersContent" onclick="courseSubscription();" role="tab" aria-controls="subscribersContent" aria-selected="false">'
										+'SUBSCRIBERS'
									+'</a>'
								+'</li>'
								+'<li class="nav-item" role="presentation">'
									+'<a class="nav-link text-white" id="history" data-toggle="tab" href="#historyContent" onclick="courseHistory();" role="tab" aria-controls="historyContent" aria-selected="false">'
										+'HISTORY'
									+'</a>'
								+'</li>'
							+'</ul>';
							return html;
}

function getCourseDescription(courseDetail){
	//var courseDet=JSON.parse(courseDetail);
	var lmsDetails = JSON.parse(localStorage.getItem('lud'));
	var lmsbredcrum = lmsDetails['did']+'/course/'+courseDetail[0]['courseid'];
	$(".lmsbredcrum").html(lmsbredcrum);
	$(".tabname").html("/details");

	$(".courseback").removeClass('d-none');
	$(".titlename").html('Course - '+courseDetail[0]['title']);
	
	
	
	var html='';
	html+='<div class="lms-details">'
		+'<div class="lms-details-thumb-img">'
			+'<img src="'+courseDetail[0]['thumbnail']+'" id="course_thumb" alt=""/>'
		+'</div>'
		+'<div class="lms-details-fields">'
			+'<div class="full">'
				+'<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 col-12 mb-2">'
					+'<label>Title*</label>'
					+'<input type="text" value="'+courseDetail[0]['title']+'" class="form-control" id="course_title"/>'
				+'</div>'
				+'<div class="col-lg-4 col-md-6 col-sm-12 col-xs-12 col-12 mb-2">'
					+'<label>Term</label>'
					+'<input type="text" value="'+courseDetail[0]['term']+'" class="form-control" id="course_term"/>'
				+'</div>'
				+'<div class="col-lg-2 col-md-6 col-sm-12 col-xs-12 col-12 mb-2">'
					+'<label>Course ID</label>'
					+'<input type="text" value="'+courseDetail[0]['courseid']+'" class="form-control" id="course_id"/>'
				+'</div>'
				+'<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 col-12 mb-2">'
					+'<label>External ID</label>'
					+'<input type="text" value="'+courseDetail[0]['externalid']+'" class="form-control" id="course_externalid"/>'
				+'</div>'
				+'<div class="col-lg-4 col-md-6 col-sm-12 col-xs-12 col-12 mb-2">'
					+'<label>Domain</label>'
					+'<input type="text" value="'+courseDetail[0]['domainname']+'" class="form-control" id="course_domainname"/>'
				+'</div>'
				+'<div class="col-lg-2 col-md-6 col-sm-12 col-xs-12 col-12 mb-2">'
					+'<label>Domain ID</label>'
					+'<input type="text" value="'+courseDetail[0]['domainid']+'" class="form-control" id="course_domainid"/>'
				+'</div>'
				+'<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 col-12 mb-2">'
					+'<label>Base Course</label>'
					+'<input type="text" value="" class="form-control" id="course_bashcourse"/>'
				+'</div>'
				+'<div class="col-lg-4 col-md-6 col-sm-12 col-xs-12 col-12 mb-2">'
					+'<label>Base Course ID</label>'
					+'<input type="text" value="" class="form-control" id="course_bashcourseid"/>'
				+'</div>'
				+'<div class="col-lg-2 col-md-6 col-sm-12 col-xs-12 col-12 mb-2">'
					+'<label>Schema</label>'
					+'<input type="text" value="" class="form-control" id="course_schema"/>'
				+'</div>'
				+'<div class="col-lg-2 col-md-6 col-sm-12 col-xs-12 col-12 mb-2">'
					+'<label class="full">&nbsp;</label>'
					+'<span>'
						+'<input type="checkbox" id="course_public" name="public" value="public">'
						+'<label for="public">Public</label>'
					+'</span>'
				+'</div>'
				+'<div class="col-lg-2 col-md-6 col-sm-12 col-xs-12 col-12 mb-2">'
					+'<label>Type</label>'
					+'<input type="text" value="'+courseDetail[0]['type']+'" class="form-control" id="course_type"/>'
				+'</div>'
				+'<div class="col-lg-2 col-md-6 col-sm-12 col-xs-12 col-12 mb-2">'
					+'<label>Days</label>'
					+'<input type="text" value="'+courseDetail[0]['days']+'" class="form-control" id="course_days"/>'
				+'</div>'
				+'<div class="col-lg-2 col-md-6 col-sm-12 col-xs-12 col-12 mb-2">'
					+'<label>Start Date</label>'
					+'<input type="text" id="startDate" value="'+courseDetail[0]['startDate']+'" class="form-control" id="course_startdate"/>'
				+'</div>'
				+'<div class="col-lg-2 col-md-6 col-sm-12 col-xs-12 col-12 mb-2">'
					+'<label>End Date</label>'
					+'<input type="text" id="endDate" value="'+courseDetail[0]['endDate']+'" class="form-control" id="course_enddate"/>'
				+'</div>'
				+'<div class="col-lg-2 col-md-12 col-sm-12 col-xs-12 col-12 mb-2 text-right">'
					+'<input type="button"  value="Save" class="btn btn-primary"/>'
				+'</div>'
			+'</div>'
		+'</div>'
	+'</div>';
 	$("#detailsContent").html(html);

}

function getEnrollByCourse(enrollmentList, roleModuleId){
	var lmsbredcrum = $(".lmsbredcrum").text();
	$(".lmsbredcrum").html(lmsbredcrum);
	$(".tabname").html("/enrollments");

	var html='';
	html+='<div class="enrollments-table-wrapper full">'
			+'<table class="table table-bordered table-striped responsive" style="width:100%;">'
				+'<thead>'
					+'<tr><th></th><th>Enrollment ID</th>'
					+'<th>User ID</th><th>First Name</th>'
					+'<th>Last Name</th><th>User Name</th>'
					+'<th>Role</th><th>Status</th>'
					+'<th>Start Date</th><th>End Date</th>'
					+'<th>Enrollment External ID</th>'
					+'<th>User External ID</th></tr>'
				+'<thead>'
				+'<tbody>';
				$.each(enrollmentList, function(k, v) {
					html+='<tr>'
						+'<td></td>'
						+'<td><a href="javascript:void(0)" onclick="getEnrollDetail('+v.userid+', '+v.enrollmentid+', '+roleModuleId+');">'+v.enrollmentid+'</a></td>'
						+'<td><a href="javascript:void(0)" onclick="getContent('+roleModuleId+', \'entire-user-detail\', \'\', '+v.userid+');">'+v.userid+'</a></td>'
						+'<td>'+v.firstname+'</td>'
						+'<td>'+v.lastname+'</td>'
						+'<td>'+v.username+'</td>'
						+'<td>'+v.userrole+'</td>'
						+'<td>'+v.status+'</td>'
						+'<td>'+v.startDate+'</td>'
						+'<td>'+v.endDate+'</td>'
						+'<td>'+v.externalid+'</td>'
						+'<td>'+v.userexternalid+'</td>'
					+'</tr>';
				});
			html+='</tbody>'
			+'</table>'
		+'</div>';
	$("#enrollmentContent").html(html);
}

function getCourseDetailHtml(courseid, roleModuleId){
	var  html='';
	html+='<div class="full tabs-wrapper">'
							+getCourseDetailTab(courseid, roleModuleId)
							+'<form id="lmsContent">'
								+'<div class="tab-content card-box-shadow" id="">'
								 + '<div class="tab-pane fade active in" id="detailsContent" role="tabpanel" aria-labelledby="details">'
								 + '</div>'
								 +'<div class="tab-pane fade" id="lessonsContent" role="tabpanel" aria-labelledby="lesson">'
									+'</div>'
									+'<div class="tab-pane fade" id="enrollmentContent" role="tabpanel" aria-labelledby="enrollment">'
									+'</div>'
									+'<div class="tab-pane fade" id="subscribersContent" role="tabpanel" aria-labelledby="subscribers">'
									+'</div>'
									+'<div class="tab-pane fade p-1" id="historyContent" role="tabpanel" aria-labelledby="history">'
									+'</div>'
								+'</div>'
							+'</form>'
						+'</div>';
				return html;
}

function LMSCourseTable(tableId){
	html='<table id="'+tableId+'" class="table table-bordered" style="width:100%;">'
		+getLMSCourseHeader()
		+'<tbody></tbody>'
	+'</table><br/>';
	return html;
}

function advanceLMSCourseSearchReset(formId){
	$('#' + formId)[0].reset();
	$("#"+formId+" #courseNameFilter").val(" ");
}

function advanceLMSCourseSearch(formid, roleModuleId, userid, role){
	getCourseList('LMSTblList','for_sms', roleModuleId);
}

function courseSubscription(){
	var lmsbredcrum = $(".lmsbredcrum").text();
	$(".lmsbredcrum").html(lmsbredcrum);
	$(".tabname").html("/subscribers");
}
function courseHistory(){
	var lmsbredcrum = $(".lmsbredcrum").text();
	$(".lmsbredcrum").html(lmsbredcrum);
	$(".tabname").html("/history");

	var html='';
	html+='<div class="lms-history-wrapper">'
											+'<div class="lms-history-list card-box-shadow p-3">'
												+'<div class="lms-history-list-head">'
													+'<h4 class="lms-history-title">'
														+'Friday, September 23, 2022, 12:00 PM'
													+'</h4>'
													+'<span class="lms-history-sub-title">'
														+'by IS Dev Team (167179484)'
													+'</span>'
												+'</div>'
												+'<div class="lms-history-list-table">'
													+'<table class="table">'
														+'<thead>'
															+'<tr>'
																+'<th>'
																	+'Change'
																+'</th>'
																+'<th>'
																	+'Old Value'
																+'</th>'
																+'<th>'
																	+'New Value'
																+'</th>'
															+'</tr>'
														+'</thead>'
														+'<tbody>'
															+'<tr>'
																+'<td>'
																	+'Coursedata'
																+'</td>'
																+'<td>'
																	+'Old Value'
																+'</td>'
																+'<td>'
																	+'New Value'
																+'</td>'
															+'</tr>'
														+'</tbody>'
														+'<tfoot>'
															+'<tr>'
																+'<td colspan="3" class="text-right">'
																	+'<button class="btn btn-primary" onclick="historyChangeModalShow()">'
																		+'CHANGES'
																	+'</button>'
																	+'<button class="btn btn-primary">'
																		+'DETAILS'
																	+'</button>'
																+'</td>'
															+'</tr>'
														+'</tfoot>'
													+'</table>'
												+'</div>'
											+'</div>'
										+'</div>';

	$("#historyContent").html("");
}

function lmsHistoryChnageModal(){
    // to vertical align modal need to add class width modal-dialog (modal-dialog-centered)
	var html =
	'<div class="modal fade fade-scale" id="lmsHistoryChnage" tabindex="-1">'
		+'<div class="modal-dialog modal-md  box-shadow-none" role="document">'
			+'<div class="modal-content">'
				+'<div  class="modal-body" style="margin:0 !important">'
					+'<p>'
						+'stry. Lorem Ipsum has been the industry  standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letra'
					+'</p>'
				+'</div>'
				+'<div class="modal-footer">'
					+'<div class="text-right">'
						+'<button id="resetDeleteErrorWarningCancel1" type="button" class="btn btn-success" data-dismiss="modal">Close</button>'
					+'</div>'
				+'</div>'
			+'</div>'
		+'</div>'
	+'</div>';
	return html;
}

function datepickerInitialize(formId, elementId, startDate, endDate){
	var date = new Date();
	var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());

	$("#"+formId+" #"+elementId).datepicker({
		autoclose: true,
		format: 'mm-dd-yyyy',
		startDate: startDate,
		endDate: endDate,
	}).datepicker("setDate", today);
	
}

function getEnrollDetail(userid, enrollmentid, roleModuleId){
	$('#lmsDetail').html(getEnrollDetailHtml(userid, enrollmentid, roleModuleId));
	getEnrollmentListByUser(userid, enrollmentid, 'for_sms', 'IDS_LIST', roleModuleId)
}


function getEnrollDetailHtml(userid, enrollmentid, roleModuleId){
	var  html='';
	html+='<div class="full tabs-wrapper">'
							+getEnrollDetailTab(enrollmentid, roleModuleId)
							+'<form id="lmsContent">'
								+'<div class="tab-content card-box-shadow" id="">'
								 + '<div class="tab-pane fade active in" id="detailsContent" role="tabpanel" aria-labelledby="details">'
								 + '</div>'
									+'<div class="tab-pane fade" id="enrollmentContent" role="tabpanel" aria-labelledby="enrollment">'
									+'</div>'
									+'<div class="tab-pane fade" id="subscribersContent" role="tabpanel" aria-labelledby="subscribers">'
									+'</div>'
									+'<div class="tab-pane fade p-1" id="historyContent" role="tabpanel" aria-labelledby="history">'
									+'</div>'
								+'</div>'
							+'</form>'
						+'</div>';
				return html;
}

function getEnrollDetailTab(enrollmentid, roleModuleId){
	var html='';
	html +='<ul class="nav nav-tabs mb-3 bg-secondary" id="" role="tablist">'
								+'<li class="nav-item active" role="presentation">'
									+'<a class="nav-link text-white" id="enroll_details" data-toggle="tab" href="#enroll_detailsContent" role="tab" aria-controls="enroll_detailsContent" aria-selected="true">'
										+'DETAILS'
									+'</a>'
								+'</li>'
								+'<li class="nav-item" role="presentation">'
									+'<a class="nav-link text-white" id="enroll_enrollment" data-toggle="tab" href="#enroll_enrollmentContent"  role="tab" aria-controls="enroll_enrollmentContent" aria-selected="false">'
										+'OBSERVERS'
									+'</a>'
								+'</li>'
								+'<li class="nav-item" role="presentation">'
									+'<a class="nav-link text-white" id="enroll_history" data-toggle="tab" href="#enroll_historyContent" onclick="courseHistory();" role="tab" aria-controls="enroll_historyContent" aria-selected="false">'
										+'HISTORY'
									+'</a>'
								+'</li>'
							+'</ul>';
							return html;
}

function getEnrollDescription(userDetail){
	//var courseDet=JSON.parse(courseDetail);
	var lmsDetails = JSON.parse(localStorage.getItem('lud'));
	var lmsbredcrum = lmsDetails['did']+'/enrollments/'+userDetail[0]['enrollmentid'];
	$(".lmsbredcrum").html(lmsbredcrum);
	$(".tabname").html("/details");
	
	$(".courseback").removeClass('d-none');
	$(".titlename").html(userDetail[0]['courseDetails']['title']+' - '+userDetail[0]['firstname']+' '+userDetail[0]['lastname']);
	
	var  checkActive=userDetail[0]['status']=='Active'?'checked':'';
	
	var html='';
	html+='<div class="lms-details">'
		+'<div class="lms-details-thumb-img">'
			+'<img src="'+userDetail[0]['thumbnail']+'" id="user_thumb" alt=""/>'
		+'</div>'
		+'<div class="lms-details-fields">'
			+'<div class="full">'
				+'<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 col-12 mb-2">'
					+'<label>Course Title</label>'
					+'<input type="text" value="'+userDetail[0]['courseDetails']['title']+'" class="form-control" id="course_name"/>'
				+'</div>'
				+'<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 col-12 mb-2">'
					+'<label>Course ID</label>'
					+'<input type="text" value="'+userDetail[0]['courseid']+'" class="form-control" id="course_id"/>'
				+'</div>'
				+'<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 col-12 mb-2">'
					+'<label>Course External ID</label>'
					+'<input type="text" value="'+userDetail[0]['courseDetails']['externalid']+'" class="form-control" id="course_externalid"/>'
				+'</div>'
				+'<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 col-12 mb-2">'
					+'<label>First Name</label>'
					+'<input type="text" value="'+userDetail[0]['firstname']+'" class="form-control" id="user_firstname"/>'
				+'</div>'
				+'<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 col-12 mb-2">'
					+'<label>Last Name</label>'
					+'<input type="text" value="'+userDetail[0]['lastname']+'" class="form-control" id="user_lastname"/>'
				+'</div>'
				+'<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 col-12 mb-2">'
					+'<label>User ID</label>'
					+'<input type="text" value="'+userDetail[0]['userid']+'" class="form-control" id="user_email_id"/>'
				+'</div>'
				+'<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 col-12 mb-2">'
					+'<label>External ID</label>'
					+'<input type="text" value="'+userDetail[0]['userexternalid']+'" class="form-control" id="user_externalid"/>'
				+'</div>'
				+'<div class="col-lg-3 col-md-6 col-sm-12 col-xs-12 col-12 mb-2">'
					+'<label>Role</label>'
					+'<input type="text" value="'+userDetail[0]['userrole']+'" class="form-control" id="user_userrole"/>'
				+'</div>'
				+'<div class="col-lg-3 col-md-6 col-sm-12 col-xs-12 col-12 mb-2">'
					+'<label>Status</label>'
					+'<input type="text" value="'+userDetail[0]['status']+'" class="form-control" id="user_status"/>'
				+'</div>'
				
				+'<div class="col-lg-2 col-md-12 col-sm-12 col-xs-12 col-12 mb-2 text-right">'
					+'<input type="button"  value="Save" class="btn btn-primary"/>'
				+'</div>'
			+'</div>'
		+'</div>'
	+'</div>';
 	$("#detailsContent").html(html);

}

function getLessonsListByCourse(courseid, fromuse, roleModuleId){
	var data=updateLessonIndex('',courseid,'');
	getLessonByCourse(data['lessons']);
}


function getLessonByCourse(lessonList){
	var lmsbredcrum = $(".lmsbredcrum").text();
	$(".lmsbredcrum").html(lmsbredcrum);
	$(".tabname").html("/lesson");

	var html='';
	html+='<div class="enrollments-table-wrapper full">'
			+'<table class="table table-bordered table-striped responsive" style="width:100%;">'
				+'<thead>'
					+'<tr><th></th><th>Lesson ID</th>'
					+'<th>Lesson Name</th>'
					+'<th>Lesson Order</th><th>Start Page</th>'
					+'<th>EndPage</th>'
					+'<th>Resource</th></tr>'
				+'<thead>'
				+'<tbody>';
				$.each(lessonList, function(k, v) {
					html+='<tr>'
						+'<td></td>'
						+'<td><a href="javascript:void(0)" onclick="getLessonsListByLesson('+v.courseid+', '+v.lessonid+');">'+v.lessonid+'</a></td>'
						+'<td>'+v.lessonName+'</td>'
						+'<td>'+v.lessonOrder+'</td>'
						+'<td>'+v.startPage+'</td>'
						+'<td>'+v.endPage+'</td>'
						+'<td>';
						$.each(v.resources, function(c, r) {
							html+='<span><a href="'+r.url+'" target="_blank">'+r.resourceName+'</a></span><br/>';
						});
							
						html+='</td></tr>';
				});
			html+='</tbody>'
			+'</table>'
		+'</div>';
	$("#lessonsContent").html(html);
}

function getLessonsListByLesson(courseid, lessonid){
	var data=updateLessonDetail('',courseid,lessonid,'for_sms');
	$('#lessonUpdateModule').modal('show');
	getLessondetail(data['lessons']);
	
}

function getLessondetailPopup(){
	var html='';
	html+='<div class="modal fade" id="lessonUpdateModule" role="dialog">'
	html+='<div class="modal-dialog modal-lg" style="margin-top:70px;">'
	html+='<div class="modal-content">'
	html+='<div class="modal-header bg-primary white-text" >'
	html+='<h4 id="headLessonTitle" class="modal-title" style="color: #fff; margin-left: 30px;"></h4>'
	html+='<button type="button" class="close" data-dismiss="modal" aria-label="Close" style="margin-right: 5px;margin-top: -5px;">'
	html+='<span aria-hidden="true" style="color: #fff;">&times;</span>'
	html+='</button>'
	html+='</div>'
	html+='<div id="lessondesc" class="modal-body " >'
	
	html+='</div>'
	html+='</div>'
	html+='</div>'
	html+='</div>'
	return html;
}

function getLessondetail(lessondetail){
	console.log(lessondetail);
	var lsndtl = lessondetail[0];
	var html='';
	html+='<form autocomplete="off" id="lessonupdateform" name="lessonupdateform" action="javascript:void(0);" method="post">'
	html+='<input type="hidden" class="form-control" id="lessonid" name="lessonid" value="'+lsndtl['lessonid']+'" >'
	html+='<input type="hidden" class="form-control" id="courseid" name="courseid" value="'+lsndtl['coures']['courseid']+'" >'
	html+='<div class="row">'
		html+='<div class="col-md-4">'
		html+='<div class="form-group">'
		html+='<label class="bmd-label-floating">Lesson Name</label> '
		html+='<input type="text" class="form-control" id="lessonname" name="lessonname" value="'+lsndtl['lessonName']+'" >'
		html+='</div>'
		html+='</div>'
		html+='<div class="col-md-4">'
		html+='<div class="form-group">'
		html+='<label class="bmd-label-floating">External id</label> '
		html+='<input type="text" class="form-control" id="externalid" name="externalid" value="'+lsndtl['externalid']+'" disabled>'
		html+='</div>'
		html+='</div>'
		html+='<div class="col-md-4">'
		html+='<div class="form-group">'
		html+='<label class="bmd-label-floating">Completion days</label> '
		html+='<input type="text" class="form-control" id="completeDays" name="completeDays" value="'+lsndtl['completionDays']+'" >'
		html+='</div>'
		html+='</div>'
		html+='<div class="col-md-4">'
		html+='<div class="form-group">'
		html+='<label class="bmd-label-floating">Start page</label> '
		html+='<input type="text" class="form-control" id="startpage" name="startpage" value="'+lsndtl['startPage']+'" >'
		html+='</div>'
		html+='</div>'
		html+='<div class="col-md-4">'
		html+='<div class="form-group">'
		html+='<label class="bmd-label-floating">End Page</label> '
		html+='<input type="text" class="form-control" id="endpage" name="endpage" value="'+lsndtl['endPage']+'" >'
		html+='</div>'
		html+='</div>'
		html+='<div class="col-md-4">'
		html+='<div class="form-group">'
		html+='<label class="bmd-label-floating">Eligible For Grading</label> '
		html+='<select name="eligibleForGradingFilter" id="eligibleForGradingFilter" class="form-control">'
				+'<option value="Y" '+(lsndtl['eligibleForGrading']=='Y'?'selected':'')+'>Y</option>'
				+'<option value="N" '+(lsndtl['eligibleForGrading']=='N'?'selected':'')+'>N</option>'
			+'</select>';	
		html+='</div>'
		html+='</div>'
		html+='<div class="col-md-4">'
		html+='<div class="form-group">'
		html+='<label class="bmd-label-floating">Eligible For Grading</label> '
		html+='<select name="eligibleForProgressFilter" id="eligibleForProgressFilter" class="form-control">'
				+'<option value="Y" '+(lsndtl['eligibleForProgress']=='Y'?'selected':'')+'>Y</option>'
				+'<option value="N" '+(lsndtl['eligibleForProgress']=='N'?'selected':'')+'>N</option>'
			+'</select>';	
		html+='</div>'
		html+='</div>'
		html+='<div class="col-md-4">'
		html+='<div class="form-group">'
		html+='<label class="bmd-label-floating">Lesson Type</label> '
		html+='<select name="lessontype" id="lessontype" class="form-control">'
				+'<option value="C" '+(lsndtl['lessonType']=='C'?'selected':'')+'>Cover</option>'
				+'<option value="P" '+(lsndtl['lessonType']=='P'?'selected':'')+'>Preface</option>'
				+'<option value="I" '+(lsndtl['lessonType']=='I'?'selected':'')+'>TableOfContent</option>'
				+'<option value="H" '+(lsndtl['lessonType']=='H'?'selected':'')+'>Header</option>'
				+'<option value="L" '+(lsndtl['lessonType']=='L'?'selected':'')+'>Lesson</option>'
				+'<option value="Q" '+(lsndtl['lessonType']=='Q'?'selected':'')+'>Question and Answer</option>'
				+'<option value="T" '+(lsndtl['lessonType']=='T'?'selected':'')+'>Test Paper</option>'
				+'<option value="G" '+(lsndtl['lessonType']=='G'?'selected':'')+'>General</option>'
			+'</select>';	
		html+='</div>'
		html+='</div>'
		html+='<div class="col-md-4">'
		html+='<div class="form-group">'
		html+='<input type="button"  value="save Lesson" id="savelessonbtn" onclick="saveLesson(\'lessonupdateform\',\'for_sms\');" class="btn btn-primary"/>'	
		html+='</div>'
		html+='</div>'
	html+='</div>'	
	html+='</form>'

	$("#lessondesc").html(html);
}



