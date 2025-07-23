function getLMSUserHeader(){
	var html=''
	html='<th></th><th>User ID</th><th>First Name</th><th>Last Name</th><th>Username</th><th>Email</th><th>External ID</th><th>Status</th><th>Action</th>';
	return '<thead><tr>'+html+'</tr></thead>';
}

function getLMSUserTableBody(result, roleModuleId){
	//console.log(result);
	var html='';
	var ind=0;
	$.each(result, function(k, v) {
		html+=
			'<tr id="lmsUserTr'+v.userid+'">'
				+'<td>'+(ind+=1)+'</td>'
				+'<td><a href="javascript:void(0)" onclick="getContent('+roleModuleId+', \'entire-user-detail\', \'\', '+v.userid+');">'+v.userid+'</a></td>'
				+'<td>'+v.firstName+'</td>'
				+'<td>'+v.lastName+'</td>'
				+'<td>'+v.username+'</td>'
				+'<td>'+v.email+'</td>'
				+'<td>'+v.externalid+'</td>'
				+'<td>'+v.status+'</td>'
				+'<td style="text-align:center;"><a href="javascript:void(0);" onclick="return showWarningMessage(\'Are you sure you want to delete?\',\' deleteLmsUser('+roleModuleId+','+v.userid+') \'); "><i class="fa fa-trash"></i></a></td>'
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


function getLMSUserFilter(roleAndModule, schoolId, userId, role){
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
				+'<form name="lmsUserFilter" id="lmsUserFilter" action="javascript:void(0)">'
					+'<div class="filter-fields">';
						html+='<div class="col-md-3 col-sm-3 col-xs-12">'
								+'<label>Enter Domain Name</label>'
								+'<input type="text"  class="form-control" />'
							+'</div>'
							// +'<div class="col-md-3 col-sm-3 col-xs-12">'
							// 	+'<label>Sort By</label>'
							// 	+'<select name="sortBy" id="sortBy" class="form-control">'
							// 		+'<option value="DESC">Descending</option>'
							// 		+'<option value="ASC">Ascending</option>'
							// 	+'</select>'
							// +'</div>'
							// +'<div class="col-md-3 col-sm-6 col-xs-12">'
							// 	+'<label>Page Size</label>'
							// 	+'<input type="text" name="pageSize" id="pageSize" class="form-control" value="25"/>'
							// +'</div>'
							+'<div class="col-md-12 col-sm-12 col-xs-12 mt-2">'
								+'<button class="btn btn-sm btn-primary float-right" onclick="advanceLMSUserSearchReset(\'lmsUserFilter\')"><i class="fa fa-check"></i>&nbsp;Reset</button>'
								+'<button class="btn btn-sm btn-primary float-right" onclick="advanceLMSUserSearch(\'lmsUserFilter\',\''+roleAndModule.moduleId+'\','+userId+',\''+role+'\');"><i class="fa fa-check"></i>&nbsp;Apply</button>'
							+'</div>'
					+'</div>'
				+'</form>'
			+'</div>'
		+'</div>'
	+'</div>';
	return html;
}

function getLmsUserContent(titlle, roleAndModule, schoolId, userId, role){
	//$(".usersback").removeClass('dd-none');
	var lmsbredcrum='';
	var lmsDetails = JSON.parse(localStorage.getItem('lud'));
	if(lmsDetails!=null){
		lmsbredcrum=lmsDetails['did']+'/users';
	}
	var html=
		'<div class="row">'
			+'<div class="col-md-12 col-lg-12 col-sm-12">'
			+'<div class="card">'
					+'<div class="card-header card-header-primary">'
					+'<h4 class="card-title titlename">'+titlle+'</h4>'
					+'<h4 class="card-title pull-right usersback d-none"  onclick="getContent('+roleAndModule.moduleId+',\'entire-user\', \'\', \'\')" style="margin-top:-25px;cursor:pointer;">'
					+'<i class="fa fa-arrow-circle-left"></i> Back</h4>'
					+'</div>'
					+'<div><h4 class="card-title text-center"><span class="lmsbredcrum">'+lmsbredcrum+'</span><span class="tabname"></span></h4></div>'
					+'<div class="card-body" id="lmsDetail">'
					
						// +'<div class="row">'
						// 	+'<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">'
						// 		+getLMSUserFilter(roleAndModule,schoolId,userId,role)
						// 	+'</div>'
						// +'</div>'
						+'<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt-4">'
							+'<div class="row">'
								+'<div id="LMSListContentDiv" style="width:100%;display:inline-block">'
									+LMSUserTable('LMSUserTableID', 'Admin')
								+'</div>'
							+'</div>'
						+'</div>'
					+'</div>'
				+'</div>'
				
			+'</div>'
			+lmsHistoryChnageModal()
		+'</div>';
	return html;
}
function getUserDetailTab(userid, enrollmentid, roleModuleId){
	var html='';
	html +='<ul class="nav nav-tabs mb-3 bg-secondary" id="" role="tablist">'
								+'<li class="nav-item active" role="presentation">'
									+'<a class="nav-link text-white" id="details" data-toggle="tab" href="#detailsContent" onclick="getContent('+roleModuleId+', \'entire-user-detail\', \'\', '+userid+');" role="tab" aria-controls="detailsContent" aria-selected="true">'
										+'DETAILS'
									+'</a>'
								+'</li>'
								+'<li class="nav-item" role="presentation">'
									+'<a class="nav-link text-white" id="enrollment" data-toggle="tab" href="#enrollmentContent" onclick="getEnrollmentListByUser('+userid+','+enrollmentid+',\'for_sms\',\'ALL_LIST\','+roleModuleId+');" role="tab" aria-controls="enrollmentContent" aria-selected="false">'
										+'ENROLLMENTS'
									+'</a>'
								+'</li>'
								+'<li class="nav-item" role="presentation">'
									+'<a class="nav-link text-white" id="performance" data-toggle="tab" href="#performanceContent" onclick="userPerformance();" role="tab" aria-controls="performanceContent" aria-selected="false">'
										+'PERFORMANCE'
									+'</a>'
								+'</li>'
								+'<li class="nav-item" role="presentation">'
									+'<a class="nav-link text-white" id="subscribers" data-toggle="tab" href="#subscribersContent" onclick="userSubscription();" role="tab" aria-controls="subscribersContent" aria-selected="false">'
										+'SUBSCRIBERS'
									+'</a>'
								+'</li>'
								+'<li class="nav-item" role="presentation">'
									+'<a class="nav-link text-white" id="history" data-toggle="tab" href="#historyContent" onclick="userHistory();" role="tab" aria-controls="historyContent" aria-selected="false">'
										+'HISTORY'
									+'</a>'
								+'</li>'
							+'</ul>';
							return html;
}

function getUserDescription(userDetail){
	//var courseDet=JSON.parse(courseDetail);
	var lmsDetails = JSON.parse(localStorage.getItem('lud'));
	var lmsbredcrum = lmsDetails['did']+'/users/'+userDetail[0]['userid'];
	$(".lmsbredcrum").html(lmsbredcrum);
	$(".tabname").html("/details");

	$(".usersback").removeClass('d-none');
	$(".titlename").html('Users - '+userDetail[0]['firstName']+' '+userDetail[0]['lastName']);
	
	var  checkActive=userDetail[0]['status']=='Active'?'checked':'';
	
	var html='';
	html+='<div class="lms-details">'
		+'<div class="lms-details-thumb-img">'
			+'<img src="'+userDetail[0]['thumbnail']+'" id="course_thumb" alt=""/>'
		+'</div>'
		+'<div class="lms-details-fields">'
			+'<div class="full">'
				+'<div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 col-12 mb-2">'
					+'<label>Username*</label>'
					+'<input type="text" value="'+userDetail[0]['username']+'" class="form-control" id="user_name"/>'
				+'</div>'
				
				+'<div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 col-12 mb-2">'
					+'<label>first Name</label>'
					+'<input type="text" value="'+userDetail[0]['firstName']+'" class="form-control" id="user_firstname"/>'
				+'</div>'
				+'<div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 col-12 mb-2">'
					+'<label>last Name</label>'
					+'<input type="text" value="'+userDetail[0]['lastName']+'" class="form-control" id="user_lastname"/>'
				+'</div>'
				+'<div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 col-12 mb-2">'
					+'<label>User ID</label>'
					+'<input type="text" value="'+userDetail[0]['userid']+'" class="form-control" id="user_email_id"/>'
				+'</div>'
				+'<div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 col-12 mb-2">'
					+'<label>External ID</label>'
					+'<input type="text" value="'+userDetail[0]['externalid']+'" class="form-control" id="user_email_externalid"/>'
				+'</div>'
				+'<div class="col-lg-3 col-md-6 col-sm-12 col-xs-12 col-12 mb-2">'
					+'<label>Domain</label>'
					+'<input type="text" value="'+userDetail[0]['domainname']+'" class="form-control" id="user_domainname"/>'
				+'</div>'
				+'<div class="col-lg-3 col-md-6 col-sm-12 col-xs-12 col-12 mb-2">'
					+'<label>Domain ID</label>'
					+'<input type="text" value="'+userDetail[0]['domainid']+'" class="form-control" id="user_domainid"/>'
				+'</div>'
				+'<div class="col-lg-4 col-md-4 col-sm-6 col-xs-12 col-12 mb-2">'
					+'<label>Email</label>'
					+'<input type="text" value="'+userDetail[0]['email']+'" class="form-control" id="user_email"/>'
				+'</div>'
				+'<div class="col-lg-4 col-md-4 col-sm-6 col-xs-12 col-12 mb-2">'
					+'<label>Notification Email</label>'
					+'<input type="text" value="" class="form-control" id="user_notiemail"/>'
				+'</div>'
				+'<div class="col-lg-4 col-md-4 col-sm-6 col-xs-12 col-12 mb-2">'
					+'<label>Notification Mobile no</label>'
					+'<input type="text" value="" class="form-control" id="user_notimob"/>'
				+'</div>'
				
				+'<div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 col-12 mb-2">'
					+'<label class="full">&nbsp;</label>'
					+'<span>'
						+'<input type="checkbox" id="user_public" name="active" value="'+userDetail[0]['status']+'" '+checkActive+' >'
						+'<label for="active">Active</label>'
					+'</span>'
				+'</div>'
				+'<div class="col-lg-2 col-md-12 col-sm-12 col-xs-12 col-12 mb-2 text-right">'
					+'<input type="button"  value="Save" class="btn btn-primary"/>'
				+'</div>'
			+'</div>'
		+'</div>'
	+'</div>';
 	$("#detailsContent").html(html);

}

function getEnrollByUser(enrollmentList, roleModuleId){
	var lmsbredcrum = $(".lmsbredcrum").text();
	$(".lmsbredcrum").html(lmsbredcrum);
	$(".tabname").html("/enrollments");
var inf=0;
	var html='';
	html+='<div class="enrollments-table-wrapper full">'
			+'<table class="table table-bordered table-striped responsive" style="width:100%;">'
				+'<thead>'
					+'<tr><th></th>'
					+'<th>Course ID</th><th>Course</th>'
					+'<th>Term</th><th>Role</th><th>Status</th>'
					+'<th>Start Date</th><th>End Date</th>'
					+'<th>Enrollment External ID</th>'
					+'<th>Course External ID</th></tr>'
				+'<thead>'
				+'<tbody>';
				$.each(enrollmentList, function(k, v) {
					html+='<tr>'
						+'<td>'+(inf+=1)+'</td>'
						+'<td><a href="javascript:void(0)" onclick="getContent('+roleModuleId+', \'entire-course-detail\', \'\', '+v.courseid+');">'+v.courseid+'</a></td>'
						+'<td>'+v.courseDetails.title+'</td>'
						+'<td>'+v.courseDetails.term+'</td>'
						+'<td>'+v.userrole+'</td>'
						+'<td>'+v.status+'</td>'
						+'<td>'+v.startDate+'</td>'
						+'<td>'+v.endDate+'</td>'
						+'<td>'+v.externalid+'</td>'
						+'<td>'+v.courseDetails.externalid+'</td>'
					+'</tr>';
				});
			html+='</tbody>'
			+'</table>'
		+'</div>';
	$("#enrollmentContent").html(html);
}

function getUserDetailHtml(userid, roleModuleId){
	console.log(roleModuleId);
	var  html='';
	html+='<div class="full tabs-wrapper">'
							+getUserDetailTab(userid, 0,roleModuleId)
							+'<form id="lmsContent">'
								+'<div class="tab-content card-box-shadow" id="">'
								 + '<div class="tab-pane fade active in" id="detailsContent" role="tabpanel" aria-labelledby="details">'
								 + '</div>'
									+'<div class="tab-pane fade" id="enrollmentContent" role="tabpanel" aria-labelledby="enrollment">'
									+'</div>'
									+'<div class="tab-pane fade" id="performanceContent" role="tabpanel" aria-labelledby="performance">'
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

function LMSUserTable(tableId){
	html='<table id="'+tableId+'" class="table table-bordered" style="width:100%;">'
		+getLMSUserHeader()
		+'<tbody></tbody>'
	+'</table><br/>';
	return html;
}

function advanceLMSUserSearchReset(formId){
	$('#' + formId)[0].reset();
	$("#"+formId+" #domainid").val(" ").trigger('change');
}

function advanceLMSUserSearch(){
	getUserList('LMSTblList','for_sms');
}

function userPerformance(){
	var lmsbredcrum = $(".lmsbredcrum").text();
	$(".lmsbredcrum").html(lmsbredcrum);
	$(".tabname").html("/performance");
}
function userSubscription(){
	var lmsbredcrum = $(".lmsbredcrum").text();
	$(".lmsbredcrum").html(lmsbredcrum);
	$(".tabname").html("/subscribers");
}
function userHistory(){
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
																	+'Userdata'
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