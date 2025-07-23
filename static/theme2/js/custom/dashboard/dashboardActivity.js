var displayNone='display:none;';
var joinOngoingActivity='Join Ongoing Activity';
var joinOngoingAssessment='Join Ongoing Assessment';
var upcomintActivity='Upcoming Activity';
var upcomintAssessment='Upcoming Assessment';
function getActivities(userId,schoolId,moduleId, role){
	$.ajax({
		type : "GET",
		contentType : "application/json",
		url : getURLForWithoutUnique('student','activities'),
		data : "userId="+userId+"&schoolId="+schoolId,
		dataType : 'json',
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2'|| data['status'] == '3') {
				if(data['status'] == '3'){
					redirectLoginPage();
				}else{
					if(tt=='theme2'){
						showMessageTheme2(2, data['message'],'',true);
					}else if(tt=='theme1'){
						showMessage(true, data['message']);
					}
				}
			}else {
				if(role=='STUDENT'){
					$('.activitiesContent').html(buildActivityStudent(data, 'parent'));
					initActivityDashboard();
					$('.activitiesContentNav').html(buildActivityStudent(data, 'navParent'));
					initActivityNavigation();
				}else if(role=='TEACHER'){
					$('#t1ul').append(buildActivityTeacher(data));
				}
			}
		},
		error : function(e) {
			if(tt=='theme2'){
				showMessageTheme2(2, TECHNICAL_GLITCH,'',true);
			}else if(tt=='theme1'){
				showMessage(true, TECHNICAL_GLITCH);
			}
		}
	});
}
function buildActivityTeacher(data){
	var htmlli='';
	$.each(data['activities'], function(innerIndex, ead) {
		console.log('activitiesType innerIndex : '+innerIndex);
		htmlli+='<li  class="myActivityLoop activityCounterLi activity-date-and-time-wrapper" data-timeid="'+ead.id+'" data-timedate="'+ead.startDate+' '+ead.startTime+'" data-status="'+ead.showCounterStatus+'" data-curDate="'+ead.currentDateTime+'">'
					+'<div class="join-div" style='+(ead.showCounterStatus=="NO"?"":displayNone)+'>'
						+'<h4 class="shake-animation waves-effect without-cursor-nav 1">'
							+'<i class="metismenu-icon pe-7s-stopwatch"></i>'
							+'<span>'+(ead.activityTypeId!=4?joinOngoingActivity:joinOngoingAssessment)+'</span>'
						+'</h4>'
						+getShowHideActivity(ead.id, ead.extraActivityAction,ead.activityTypeId)
						+'<div class="px-1">'
							+'<a style="background-color:#eb8524;color:#fff;padding:5px;border-radius:4px;margin-bottom:5px"'
								+' onclick="return callDashboardPageSchool('+ead.id+',\'view-extra-activity\',\'\',\'?id='+ead.id+'&activitiesType='+ead.activityTypeId+'&startDate='+ead.startDate+'&startTime='+ead.startTime+'\');"'
								+' href="javascript:void(0);" class="waves-effect"><i class="metismenu-icon pe-7s-usb"></i>&nbsp;<span >'+ead.activityTitle+'</span>'
							+'</a>'
						+'</div>'
					+'</div>'

					+'<div class="counter-div-wrapper '+(ead.showCounterStatus=="NO"?displayNone:"")+'">'
						+'<h4 class="shake-animation waves-effect without-cursor-nav counter-div 2">'
							+'<i class="metismenu-icon pe-7s-stopwatch"></i>'
							+'<span>'+(ead.activityTypeId!=4?upcomintActivity:upcomintAssessment)+'</span>'
						+'</h4>'
						+getShowHideActivity(ead.id, ead.extraActivityAction,ead.activityTypeId)
						+'<div class="px-1">'
							+'<a class="activity-btn disable-btn-color" '
							+' onclick="return callDashboardPageSchool('+ead.id+',\'view-extra-activity\',\'\',\'?id='+ead.id+'&activitiesType='+ead.activityTypeId+'&startDate='+ead.startDate+'&startTime='+ead.startTime+'\');"'
							+' href="javascript:void(0);" class="waves-effect"><i class="metismenu-icon pe-7s-usb"></i>&nbsp;<span >'+ead.activityTitle+'</span>'
							+'</a>'
						+'</div>'
						+'<div class="counter-div mb-1 px-1">'
							+'<div class="activity-date-and-time">'
								+'<span>Date: <b>'+ead.startDateNewFormat+'</b></span>'
								+'<span>Time: <b>'+ead.startTimeNewFormat+'</b></span>'
							+'</div>'
						+'</div>'
						+'<div class="counter-div" style="'+(ead.showCounterStatus =="NO"?displayNone:"")+'">'
							+'<div id="timer'+ead.id+'">'
								+'<div id="days'+ead.id+'" class="count-div days"></div>'
								+'<div id="hours'+ead.id+'" class="count-div hours"></div>'
								+'<div id="minutes'+ead.id+'" class="count-div minutes"></div>'
								+'<div id="seconds'+ead.id+'" class="count-div seconds"></div>'
							+'</div>'
						+'</div>'
					+'</div>'
					// +getShowHideActivity(ead.id, ead.extraActivityAction,ead.activityTypeId);
		htmlli+='</li>';
		
	});
	return htmlli;
}

function buildActivityStudent(data, prefixId){
	var htmlli='';
	$.each(data['activitiesType'], function(outerIndex, atList) {
		htmlli+='<li class="sub-menu">';
			if(atList.parentId==0){
				htmlli+=
						'<a id="'+prefixId+'-'+atList.id+'" href="javascript:void(0);" class="waves-effect custom-rounded-btn" aria-expanded="true">'
							+'<span class="text-white">'+atList.activityName+'</span>'
							+'<i class="metismenu-state-icon pe-7s-angle-down caret-left text-white"></i>'
						+'</a>'
						+'<ul class="mm-collapse">'
							if(data['activities'].length>0){
								$.each(data['activities'], function(innerIndex, ead) {
									if(ead.subActivityTypeId==0 && ead.activityTypeId==atList.id){
										
										htmlli+='<li  class="myActivityLoop activityCounterLi activity-date-and-time-wrapper" data-timeid="'+ead.id+'" data-timedate="'+ead.startDate+' '+ead.startTime+'" data-status="'+ead.showCounterStatus+'" data-curDate="'+ead.currentDateTime+'">'
													+'<div class="join-div" style='+(ead.showCounterStatus=="NO"?"":displayNone)+'>'
														+'<h4 class="shake-animation waves-effect without-cursor-nav 3">'
															+'<i class="metismenu-icon pe-7s-stopwatch"></i>'
															+'<span>'+(ead.activityTypeId!=4?joinOngoingActivity:joinOngoingAssessment)+'</span>'
														+'</h4>'
														+getShowHideActivity(ead.id, ead.extraActivityAction,ead.activityTypeId)
														+'<div class="px-1">'
															+'<a style="background-color:#eb8524;color:#fff;padding:5px;border-radius:4px;margin-bottom:5px"'
																+' onclick="autoDisposeRightActivity();callDashboardPageSchool('+ead.id+',\'view-extra-activity\',\'\',\'?id='+ead.id+'&activitiesType='+ead.activityTypeId+'&startDate='+ead.startDate+'&startTime='+ead.startTime+'\');"'
																+' href="javascript:void(0);" class="waves-effect"><i class="metismenu-icon pe-7s-usb"></i>&nbsp;<span >'+ead.activityTitle+'</span>'
															+'</a>'
														+'</div>'
													+'</div>'
													+'<div style="'+(ead.showCounterStatus=="NO"?displayNone:"")+'">'
														+'<h4 class="shake-animation waves-effect without-cursor-nav counter-div 4">'
															+'<i class="metismenu-icon pe-7s-stopwatch"></i>'
															+'<span>'+(ead.activityTypeId!=4?upcomintActivity:upcomintAssessment)+'</span>'
														+'</h4>'
														+getShowHideActivity(ead.id, ead.extraActivityAction,ead.activityTypeId)
															+'<div class="px-1">'
															+'<a class="activity-btn disable-btn-color" '
															+' onclick="autoDisposeRightActivity();callDashboardPageSchool('+ead.id+',\'view-extra-activity\',\'\',\'?id='+ead.id+'&activitiesType='+ead.activityTypeId+'&startDate='+ead.startDate+'&startTime='+ead.startTime+'\');"'
															+' href="javascript:void(0);" class="waves-effect"><i class="metismenu-icon pe-7s-usb"></i>&nbsp;<span >'+ead.activityTitle+'</span>'
															+'</a>'
														+'</div>'
														+'<div class="counter-div mb-1 px-1">'
															+'<div class="activity-date-and-time">'
																+'<span>Date: <b>'+ead.startDateNewFormat+'</b></span>'
																+'<span>Time: <b>'+ead.startTimeNewFormat+'</b></span>'
															+'</div>'
														+'</div>'
														+'<div class="counter-div" style="'+(ead.showCounterStatus =="NO"?displayNone:"")+'">'
															+'<div id="timer'+ead.id+'">'
																+'<div id="days'+ead.id+'" class="count-div days"></div>'
																+'<div id="hours'+ead.id+'" class="count-div hours"></div>'
																+'<div id="minutes'+ead.id+'" class="count-div minutes"></div>'
																+'<div id="seconds'+ead.id+'" class="count-div seconds"></div>'
															+'</div>'
														+'</div>'
													+'</div>';
										htmlli+='</li>';
									}else if(ead.subActivityTypeId!=0 && ead.activityTypeId==atList.id){
										htmlli+=
										'<li class="sub-menu">';
											+'<a href="javascript:void(0);" class="waves-effect custom-rounded-sub-btn text-white">'+ead.subActivityName
												+'<i class="metismenu-state-icon pe-7s-angle-down caret-left text-white"></i>'
											+'</a>'
											+'<ul class="mm-collapse">'
												+'<li class="myActivityLoop activityCounterLi activity-date-and-time-wrapper" data-timeid="'+ead.id+'" data-timedate="'+ead.startDate+' '+ead.startTime+'" data-status="'+ead.showCounterStatus+'" data-curDate="'+ead.currentDateTime+'">'
													+'<div class="join-div" style='+(ead.showCounterStatus ="NO"?"":displayNone)+'>'
														+'<h4 class="shake-animation waves-effect without-cursor-nav 5">'
															+'<i class="metismenu-icon pe-7s-stopwatch"></i>'
															+'<span>'+(ead.activityTypeId!=4?joinOngoingActivity:joinOngoingAssessment)+'</span>'
														+'</h4>'
														+getShowHideActivity(ead.id, ead.extraActivityAction,ead.activityTypeId)
														+'<div class="px-1">'
															+'<a style="background-color:#eb8524;color:#fff;padding:5px;border-radius:4px;margin-bottom:5px"'
																+' onclick="autoDisposeRightActivity();callDashboardPageSchool('+ead.id+',\'view-extra-activity\',\'\',\'?id='+ead.id+'&activitiesType='+ead.activityTypeId+'&startDate='+ead.startDate+'&startTime='+ead.startTime+'\');"'
																+' href="javascript:void(0);" class="waves-effect"><i class="metismenu-icon pe-7s-usb"></i>&nbsp;<span >'+ead.activityTitle+'</span>'
															+'</a>'
														+'</div>'
													+'</div>'
													+'<div style="'+(ead.showCounterStatus=="NO"?displayNone:"")+'">'
														+'<h4 class="shake-animation waves-effect without-cursor-nav counter-div 6">'
															+'<i class="metismenu-icon pe-7s-stopwatch"></i>'
															+'<span>'+(ead.activityTypeId!=4?upcomintActivity:upcomintAssessment)+'</span>'
														+'</h4>'
														+getShowHideActivity(ead.id, ead.extraActivityAction,ead.activityTypeId)
														+'<div class="px-1">'
															+'<a class="activity-btn disable-btn-color" '
															+' onclick="autoDisposeRightActivity();callDashboardPageSchool('+ead.id+',\'view-extra-activity\',\'\',\'?id='+ead.id+'&activitiesType='+ead.activityTypeId+'&startDate='+ead.startDate+'&startTime='+ead.startTime+'\');"'
															+' href="javascript:void(0);" class="waves-effect"><i class="metismenu-icon pe-7s-usb"></i>&nbsp;<span >'+ead.activityTitle+'</span>'
															+'</a>'
														+'</div>'
														+'<div class="counter-div mb-1 px-1">'
															+'<div class="activity-date-and-time">'
																+'<span>Date: <b>'+ead.startDateNewFormat+'</b></span>'
																+'<span>Time: <b>'+ead.startTimeNewFormat+'</b></span>'
															+'</div>'
														+'</div>'
														+'<div class="counter-div" style="'+(ead.showCounterStatus =="NO"?displayNone:"")+'">'
															+'<div id="timer'+ead.id+'">'
																+'<div id="days'+ead.id+'" class="count-div days"></div>'
																+'<div id="hours'+ead.id+'" class="count-div hours"></div>'
																+'<div id="minutes'+ead.id+'" class="count-div minutes"></div>'
																+'<div id="seconds'+ead.id+'" class="count-div seconds"></div>'
															+'</div>'
														+'</div>'
													+'</div>';
												+'</li>';
											+'</ul>';
										+'</li>';
									}
								});
							}
				htmlli+='</ul>';
			}
		htmlli+='</li>';
	});
	return htmlli;
}

function initActivityDashboard(){
    var activitylength = $(".card-activity .vertical-nav-menu > .sub-menu").length;
    for(var i = 1; i<=activitylength; i++){
        var subActivityLength = $(".card-activity .vertical-nav-menu  .sub-menu:nth-child("+i+") > ul .sub-menu").length;
        if($(".card-activity .vertical-nav-menu > .sub-menu:nth-child("+i+") ul li").length < 1){
            $(".card-activity .vertical-nav-menu > .sub-menu:nth-child("+i+") a").addClass("disable-activity");
        }else if(subActivityLength >= 1){
            for(var j = 1; j<=subActivityLength; j++){
                $(".card-activity .vertical-nav-menu  .sub-menu:nth-child("+i+")").addClass('mm-active');
                $(".card-activity .vertical-nav-menu > .sub-menu:nth-child("+i+")  ul").addClass('mm-show');
                $(".card-activity .vertical-nav-menu > .sub-menu:nth-child("+i+") > ul > .sub-menu:nth-child("+j+")").addClass('mm-active');
                $(".card-activity .vertical-nav-menu > .sub-menu:nth-child("+i+") > ul > .sub-menu:nth-child("+j+") ul").addClass('mm-show');
            }
        }else{
            $(".card-activity .vertical-nav-menu > .sub-menu:nth-child("+i+")  ul").addClass('mm-show');
            $(".card-activity .vertical-nav-menu  .sub-menu:nth-child("+i+")").addClass('mm-active');
        }
    }
    $("#main-nav1").metisMenu('dispose');
    $("#main-nav1").metisMenu();
}

//SCRIPT FOR RIGHT NAVIGATION
function initActivityNavigation(){
    var activitylength = $(".ui-theme-settings .vertical-nav-menu .sub-menu").length;
    for(var i = 1; i<=activitylength; i++){
        if($(".ui-theme-settings .vertical-nav-menu > .sub-menu:nth-child("+i+") ul li").length < 1){
            $(".ui-theme-settings .vertical-nav-menu > .sub-menu:nth-child("+i+") a").addClass("disable-activity");
        }else{
            $(".ui-theme-settings .vertical-nav-menu > .sub-menu:nth-child("+i+")").addClass('mm-active');
            $(".ui-theme-settings .vertical-nav-menu > .sub-menu:nth-child("+i+") ul").addClass('mm-show');
        }
    }
    
}
$("#main-nav2 li a").unbind().bind("click", function(){
    $("#main-nav2 li a").removeClass("mm-active");
    $(this).addClass("mm-active");
});

function slideMenu2(){
	$("#main-nav2").metisMenu('dispose'); 
	$("#main-nav2").metisMenu();   
}

$(document).ready(function(){
	$(".close-right-slide-panel").unbind().bind("click", function(){
	    $(".ui-theme-settings").toggleClass("settings-open");
	    $("#TooltipDemo").find("i").toggleClass("fa-angle-right fa-angle-left");
	});
	$("#TooltipDemo").unbind().bind("click", function(){
	    $(".ui-theme-settings").toggleClass("settings-open");
	    $(this).find("i").toggleClass("fa-angle-right fa-angle-left");
	   	 slideMenu2() ;
	});
	$("#main-nav li a").unbind().bind("click", function(){
		$("#main-nav li a").removeClass("mm-active");
	    $(this).addClass("mm-active");
	});
	if($(".app-sidebar__inner li:nth-child(2) a").hasClass('mm-active')){
		$('.ui-theme-settings').addClass("d-none");
	}	
	$(".app-sidebar__inner ul li a").on("click", function(){
		if($(this).hasClass('mm-active') && $(this).hasClass('student-home')){
	        if($('#dashboardContentInHTML .check-activity-page-load').length < 1){
	            $('.ui-theme-settings').addClass("d-none");
	            $("#main-nav2").removeClass("metismenu")
	        }else{
	            $('.ui-theme-settings').removeClass("d-none");
	        }
	    }else{
	        $('.ui-theme-settings').removeClass("d-none settings-open");
	        $("#TooltipDemo").find("i").addClass("fa-angle-left").removeClass('fa-angle-right');
	    }
	});
});

function autoDisposeRightActivity(){
	$('.ui-theme-settings').removeClass(" settings-open");
	$("#TooltipDemo").find("i").addClass("fa-angle-left").removeClass('fa-angle-right');
}
function assessmentShowConfirmationByTeacher(activityId,activityTypeId,extraActivityAction){
	$("#assessmentConfirmation").modal("show");
	var triggerAssessmentFun = 'extraActivityAction('+USER_ID+','+SCHOOL_ID+','+activityId+','+activityTypeId+',\''+extraActivityAction+'\')';
    $("#assessmentConfirmationBtn").attr("onclick", triggerAssessmentFun);
	$("html").removeClass("nav-open");
	$(".navbar-toggler").removeClass("toggled");
	$(".close-layer").remove();
	if(extraActivityAction == "Y"){
        $("#assessmentConfirmation .alertMsg").text("Are you sure you want to show exam paper to student?");
	}else{
        $("#assessmentConfirmation .alertMsg").text("Are you sure you want to hide exam paper from student?");
	}
}
function extraActivityAction(userId,schoolId,activityId,activityTypeId,extraActivityAction){
	$.ajax({
		type : "GET",
		contentType : "application/json",
		url : getURLForWithoutUnique('student','extra-activity-action'),
		data : "userId="+userId+"&schoolId="+schoolId+"&activityId="+activityId+"&action="+extraActivityAction,
		dataType : 'json',
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2'|| data['status'] == '3') {
				if(data['status'] == '3'){
					redirectLoginPage();
				}else{
					if(tt=='theme2'){
						showMessageTheme2(2, data['message'],'',true);
					}else if(tt=='theme1'){
						showMessage(true, data['message']);
					}
				}
			}else {
				
				if(USER_ROLE=='STUDENT'){
					
				}else if(USER_ROLE=='TEACHER'){
					var activityType='';
					if(activityTypeId==1){
						activityType='Extra Curricular';
					}else if(activityTypeId==2){
						activityType='Academic Activity';
					}else if(activityTypeId==3){
						activityType='Festival Activity';
					}else if(activityTypeId==4){
						activityType='Paper';
					}
					var messageHtml='';
					var extraActivityActionNext='Y';
					var linkText='Show activity for Student';
					if(extraActivityAction==null || extraActivityAction=='' || extraActivityAction=='N'){
						linkText='Show '+activityType+' for Student';
						extraActivityActionNext='Y';
						messageHtml=activityType+' is hidden for Student';
					}else if(extraActivityAction=='Y'){
						linkText='Hide '+activityType+' for student';
						extraActivityActionNext='N';
						messageHtml=activityType+' is visible for Student';
					}
					$('.extraActivityAction_'+activityId).html(linkText);
					var functionName='assessmentShowConfirmationByTeacher('+activityId+','+activityTypeId+',\''+extraActivityActionNext+'\')';
					$('.extraActivityAction_'+activityId).attr('onclick',functionName);
					if(tt=='theme2'){
						showMessageTheme2(2, messageHtml,'',true);
					}else if(tt=='theme1'){
						showMessage(true, messageHtml);
					}
				}
				$("#assessmentConfirmation").modal("hide");
			}
		},
		error : function(e) {
			if(tt=='theme2'){
				showMessageTheme2(2, TECHNICAL_GLITCH,'',true);
			}else if(tt=='theme1'){
				showMessage(true, TECHNICAL_GLITCH);
			}
		}
	});
}

function getShowHideActivity(activityId, extraActivityAction, activityTypeId){
	var html='';
	var activityType='';
	if(activityTypeId==1){
		activityType='Extra Curricular';
	}else if(activityTypeId==2){
		activityType='Academic Activity';
	}else if(activityTypeId==3){
		activityType='Festival Activity';
	}else if(activityTypeId==4){
		activityType='Paper';
	}
	if(activityTypeId==4){
		if(USER_ROLE == 'TEACHER'){
			var extraActivityActionNext='Y';
			var linkText='Show activity for Student';
			if(extraActivityAction==null || extraActivityAction=='' || extraActivityAction=='N'){
				linkText='Show '+activityType+' for Student';
				extraActivityActionNext='Y';
			}else if(extraActivityAction=='Y'){
				linkText='Hide '+activityType+' for student';
				extraActivityActionNext='N';
			}
			html+='<div class="px-1" style="display:inline-block"><a id="extraActivityAction_'+activityId+'" onClick="assessmentShowConfirmationByTeacher('+activityId+','+activityTypeId+',\''+extraActivityActionNext+'\')" href="javascript:void(0)" class="extraActivityAction_'+activityId+' btn btn-primary text-white show-paper float-right" style="display:inline-block;padding:4px 8px !important">'+linkText+'</a></div>';
		}
	}
	return html;
}
// 

function assessmentConfirmationModal(){
	var html =
		'<div class="modal fade modal-style" id="assessmentConfirmation" role="dialog" data-backdrop="false">'
	        +'<div class="modal-dialog modal-sm">'
			    +'<div class="modal-content">'
				    +'<div class="modal-body">'
					    +'<div class="py-4 full">'
						    +'<h3 class="py-4 text-dark text-center mt-4 alertMsg">Are you sure ?</h3>'
						+'</div>'
						+'<div class="text-center full">'
						    +'<a href="javascript:void(0)" class="btn btn-primary btn-sm" id="assessmentConfirmationBtn">Yes</a>'
							+'<button type="button" class="btn btn-primary active btn-sm" id="assessmentConfirmationRejectBtn">No</button>'
						+'</div>'
					+'</div>'
				+'</div>'
			+'</div>'
		+'</div>';
		return html;
}
$(document).ready(function(){
    $("body").append(assessmentConfirmationModal());
    $("#assessmentConfirmationRejectBtn").click(function(){
		$("#assessmentConfirmation").modal("hide");
        $("html").addClass("nav-open");
	    $(".navbar-toggler").addClass("toggled");
	    $("body").append('<div class="close-layer visible"></div>');
	});
});

							
						