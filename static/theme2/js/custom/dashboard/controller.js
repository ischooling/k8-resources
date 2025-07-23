function getContent(moduleId, pageNo, replaceDiv, extraParam){
	customLoader(false);
	roleAndModule = getUserRights(SCHOOL_ID, USER_ROLE_ID, USER_ID, moduleId);
	$('#dashboardContentInHTMLMyBook').hide();
	$('#dashboardContentInHTML').show();
	if(pageNo=='my-book' || pageNo=='my-classes'){
		var needToCallApi=true;
		if($('#dashboardContentInHTMLMyBook').html().length>200){
			needToCallApi=false;
		}
		if(needToCallApi){
			if(localStorage.getItem('lmsToken')==undefined || localStorage.getItem('lmsToken')==null){
				getSingleSignOnUrl(USER_ID,SCHOOL_ID);
			}
			prepareLmsStudentDetails(USER_ID)
			$('#dashboardContentInHTMLMyBook').html(getEnrollments(roleAndModule.moduleName,roleAndModule,SCHOOL_ID,USER_ID));
			$('.enrollments').html(renderEnrollments(roleAndModule.moduleId));
		}
		$('#dashboardContentInHTMLMyBook').show();
		$('#dashboardContentInHTML').hide();
		$('.ui-theme-settings').removeClass("d-none");
		if($("body").hasClass("lms-book-View")){
			$("body").removeClass("lms-book-View");
		}
	}else if(pageNo=='student-lms'){
		closeMenu();
		$("body").addClass("lms-book-View");
		$(".sub-subject-list").removeClass("show-subject");
		const courseidAndLesssonid=extraParam.split('~');
		var pdfUrl = '';
		var objectBasedOnCourseid=getRequiredObjects(JSON.parse(localStorage.getItem('e')),'enrollmentid',courseidAndLesssonid[0]);
		if(objectBasedOnCourseid.length>0){
			var obejectBasedOnResourse=getRequiredObjects(objectBasedOnCourseid[0]['courseDetails'],'forThumb','N');
			if(obejectBasedOnResourse.length>0){
				var pdfUrl = obejectBasedOnResourse[0].url;
			}
		}
		console.log('original pdf '+pdfUrl);
		// if(ENVIRONMENT=='dev'){
			// pdfUrl = APP_BASE_URL+'/static/theme2/images/FlipBookPDF/RealEnglishGrade08.pdf';
			// pdfUrl = APP_BASE_URL+'/static/theme2/images/FlipBookPDF/ESEC-01-book-compressed.pdf';
			// console.log('original pdf '+pdfUrl);
		// }
		//$(".lmsCourse").trigger("click");
		$('#dashboardContentInHTML').html(getLMSContent(courseidAndLesssonid[0],courseidAndLesssonid[1],courseidAndLesssonid[2]));
		renderLessonsIndex(courseidAndLesssonid[0],courseidAndLesssonid[1],courseidAndLesssonid[2]);
		var startPageNo=1;
		var allsessonid='';
		var lessonidToStudy='';
		if(localStorage.getItem('lessonidToStudy'+courseidAndLesssonid[1])!=null && localStorage.getItem('lessonidToStudy'+courseidAndLesssonid[1])!=undefined){
            lessonidToStudy=localStorage.getItem('lessonidToStudy'+courseidAndLesssonid[1])
			startPageNo=$('.chapter_to_study'+lessonidToStudy).attr('startPageNo');
			allsessonid=$('.chapter_to_study'+lessonidToStudy).attr('allsessonid');
        }
		if(pdfUrl!=''){
			if(localStorage.getItem('li'+courseidAndLesssonid[1])!=null){
                var lessons=JSON.parse(localStorage.getItem('li'+courseidAndLesssonid[1]));
				var endPage =localStorage.getItem('mpn'+courseidAndLesssonid[1]);
				var startPages=[];
				var endPages=[];
				$.each(lessons, function(k,v){
					startPages.push(v.startPage);
					endPages.push(v.endPage);
				});
                renderPdfView('pdf-render', pdfUrl,startPageNo, endPage, startPages, endPages);
            }
			loadPageWithResources(courseidAndLesssonid[0],courseidAndLesssonid[1],lessonidToStudy, allsessonid);
		}
		if($("body").hasClass("body-fixed")){
			$("body").removeClass("body-fixed");
		}
		// customLoader(true);
		uiSetWindowSize(true);
		
	}else if(pageNo=='student-teacher-sessions'){
		$('#dashboardContentInHTML').html(getManageSessionContent('Classes',roleAndModule,SCHOOL_ID,USER_ID,USER_ROLE));
		$(".filterDates").datepicker("destroy");
		$('.filterDates').datepicker({
			autoclose: true,
			format: 'M dd, yyyy',
		});
		$('#dashboardContentInHTML').append(getUpdateMeetingResultModal(roleAndModule, USER_ROLE));
		$('#dashboardContentInHTML').append(getMeetingUrlModal(roleAndModule, USER_ROLE));
		$('#dashboardContentInHTML').append(getSendMailModal(roleAndModule, USER_ROLE));
		$('#dashboardContentInHTML').append(getPublicRecordModal(roleAndModule, USER_ROLE));
		$('#dashboardContentInHTML').append(getRevokeModal(roleAndModule, USER_ROLE));
	}else if(pageNo=='create-manage-sessions'){
		$('#dashboardContentInHTMLAdditional').html(getManageSessionContentTeacher('Create/Manage Classes',roleAndModule,SCHOOL_ID,USER_ID,USER_ROLE));
		$(".filterDates").datepicker("destroy");
		$('.filterDates').datepicker({
			autoclose: true,
			format: 'M dd, yyyy',

		});
		$('#dashboardContentInHTMLAdditional').append(getUpdateMeetingResultModal(roleAndModule, USER_ROLE));
		$('#dashboardContentInHTMLAdditional').append(getMeetingUrlModal(roleAndModule, USER_ROLE));
		$('#dashboardContentInHTMLAdditional').append(getSendMailModal(roleAndModule, USER_ROLE));
	}else if(pageNo=='manage-lms-user'){
		$('#dashboardContentInHTML').html(getManageLmsUserContent('Manage LMS User',roleAndModule,SCHOOL_ID,USER_ID,USER_ROLE));

		$("#standardId").select2({});
		$("#standardId option[value='17']").remove();
	//	$(".filterDates").datepicker("destroy");
		$(".filterDates").datepicker({
			todayBtn:  1,
	       	autoclose: true,
	       	format: 'M dd, yyyy',
	       	todayHighlight : true,

		});
		// getContent(moduleId, pageNo, replaceDiv, extraParam);
	}else if(pageNo=='student-assigned-report'){
		$('#dashboardContentInHTML').html(getStudentAssignedReportContent('Student Assigned Report',roleAndModule,SCHOOL_ID,USER_ID,USER_ROLE));
		$('#dashboardContentInHTML').append(filterTeacherReportModal(SCHOOL_ID));

		$(".multiselect-dropdown").select2({});
		$(".singleSelect2-dropdown").select2({});

		$("#startDate").datepicker({
			autoclose: true,
			format: 'M d, yyyy',
		}).on('changeDate', function (selected) {
			$("#endDate").removeAttr('disabled');
			$( "#endDate" ).datepicker( "minDate", endDate);
		});
		$("#endDate").datepicker({
			autoclose: true,
			format: 'M d, yyyy',
		}).on('changeDate', function (selected) {
			studentTeacherValidDate('studentTeacherValidDate');
		});
		teacherReportByDate('studentTeacherValidDate');
		if(ENVIRONMENT=='dev'){
			$('#studentAssignedReportFilter #officialEmail').val('devaleenaray@gmail.com');//FOR TESTING PURPOSES ONLY
		}
	}else if(pageNo=='manage-session'){
		$('#dashboardContentInHTML').html(getManageSessionUserContent('Manage Session',roleAndModule,SCHOOL_ID,USER_ID,USER_ROLE));

		$("#standardId").select2({});
		//$("#standardId option[value='17']").remove();
//		$(".filterDates").datepicker("destroy");
		$(".filterDates").datepicker({
			todayBtn:  1,
	       	autoclose: true,
	       	format: 'M dd, yyyy',
	       	todayHighlight : true,

		});
	}else if(pageNo=='entire-course'){
		$('#dashboardContentInHTML').html(getLmsCourseContent('Courses',roleAndModule,SCHOOL_ID,USER_ID,USER_ROLE));
		//getCourseList('LMSTblList','for_sms', roleAndModule.moduleId);
		datepickerInitialize("lmsContent", "startDate", "", "")
		datepickerInitialize("lmsContent", "endDate", "", "")
	}else if(pageNo=='entire-course-detail'){
		$('#lmsDetail').html(getCourseDetailHtml(extraParam,roleAndModule.moduleId));
		getCourseDetail(extraParam, 'for_sms');
	}else if(pageNo=='entire-user'){
		$('#dashboardContentInHTML').html(getLmsUserContent('Users',roleAndModule,SCHOOL_ID,USER_ID,USER_ROLE));
		getUserList('LMSTblList','for_sms',0, 'ALL_LIST',roleAndModule.moduleId);
		datepickerInitialize("lmsContent", "startDate", "", "");
		datepickerInitialize("lmsContent", "endDate", "", "");
	}else if(pageNo=='entire-user-detail'){
		$('#lmsDetail').html(getUserDetailHtml(extraParam, roleAndModule.moduleId));
		getUserList('LMSTblList','for_sms',extraParam, 'IDS_LIST',roleAndModule.moduleId);
	}else if(pageNo=='common-notes'){
		$('#dashboardContentInHTML').html(getNoteContent('Users',roleAndModule,SCHOOL_ID,USER_ID,USER_ROLE));
		debugger
		if(USER_ROLE != 'SCHOOL_ADMIN'){
			getNotes(USER_ID,"notesTable");
		}else{
			getPendingNotes();
			getApprovedByMe(USER_ID);
			getRejectedByMe(USER_ID);
		}
		
	}else if(pageNo == 'email-logs'){
		$('#dashboardContentInHTML').html(getEmailLogsContent('Email Logs', false));
		$("#startDate").datepicker({
			autoclose: true,
	       	format: 'yyyy-mm-dd',
	       	todayHighlight : true,
		});
		$("#endDate").datepicker({
			autoclose: true,
	       	format: 'yyyy-mm-dd',
	       	todayHighlight : true,
		});
	}else if (pageNo === "meeting-management") {
		getMeetingManagementContent("Meeting Management")
		
	}
	closeMenu();
	windowScrollToTop();
}

function getUserRights(schoolId, roleId, userId, moduleId){
	customLoader(true);
	$.ajax({
		type : "GET",
		contentType : "application/json",
		url : getURLFor('module','?schoolId='+schoolId+'&roleId='+roleId+'&userId='+userId+'&moduleId='+moduleId),
		dataType : 'json',
		async: false,
		global: false,
		success : function(data) {
			customLoader(false);
			roleAndModule=data
		},
		error : function(e) {
			customLoader(false);
			showMessage(true, e.responseText);
		}
	});
	return roleAndModule;
}

function getModuleDetails(schoolId, moduleLink){
	var moduleDetails='';
	$.ajax({
		type : "GET",
		contentType : "application/json",
		url : getURLFor('get-module-by-link','?schoolId='+schoolId+'&moduleLink='+moduleLink),
		dataType : 'json',
		async: false,
		global: false,
		success : function(data) {
			moduleDetails=data
		},
		error : function(e) {
			showMessage(true, e.responseText);
		}
	});
	return moduleDetails;
}