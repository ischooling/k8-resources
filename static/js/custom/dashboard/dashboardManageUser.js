function showManageProfileParentContentListingWithQueries(elementId, argument){
	console.log('DEFAULT_SEARCH_STATE: '+DEFAULT_SEARCH_STATE);
	var isDataTable = $.fn.dataTable.isDataTable('#'+elementId);
	console.log(elementId+ ' = ' +isDataTable);
	if(isDataTable){
		$('#'+elementId).dataTable().fnDestroy();
	}
	$('#'+elementId).DataTable( {
		"stateSave": true,
		"searching": true,
        "processing": true,
        "serverSide": true,
        "pagingType":"full",
        "searching": true,
        "pageLength": 10,
        "stateLoadParams": function (settings, data) {
        	if (!DEFAULT_SEARCH_STATE) {
	            return false;
        	}
          },
        "ajax": {
            "url": CONTEXT_PATH+UNIQUEUUID+"/"+"dashboard/manage-profile-content-1"+argument,
            "data": function ( data ) {
            	//console.log('data '+data)
            }
        },
        "fnRowCallback": function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
        	$(nRow).find('td:eq(3)').css('text-align','left');
        	$(nRow).find('td:eq(4)').css('text-align','left');
        	$(nRow).find('td:eq(5)').css('text-align','left');
        	//$('tr').addClass('success');
        },
        "columns": [
	         { "data": "sno", "name" : "sno", "title" : "S.No"  },
	         { "data": "name", "name" : "name" , "title" : "Parent Name"},
	         { "data": "userName", "name" : "userName" , "title" : "User Name"},
	         { "data": "studentProfile", "name" : "studentProfile" , "title" : "Student Details", 'text-align':'center'},
	         { "data": "profileStatus", "name" : "profileStatus" , "title" : "Profile Status", 'text-align':'center'},
	         { "data": "action", "name" : "action" , "title" : "Action", 'text-align':'center'},
         ],
	});
	$('#'+elementId).dataTable().fnSetFilteringEnterPress();
	bindHover();
}



function showScholarShipStudentData(elementId, argument){
	console.log('DEFAULT_SEARCH_STATE: '+DEFAULT_SEARCH_STATE);
	var isDataTable = $.fn.dataTable.isDataTable('#'+elementId);
	console.log(elementId+ ' = ' +isDataTable);
	if(isDataTable){
		$('#'+elementId).dataTable().fnDestroy();
	}
	$('#'+elementId).DataTable( {
		"stateSave": true,
		"searching": true,
        "processing": true,
        "serverSide": true,
        "searching": true,
        "pageLength": 10,
        "paginationType":"full",
        "stateLoadParams": function (settings, data) {
        	if (!DEFAULT_SEARCH_STATE) {
	            return false;
        	}
          },
        "ajax": {
            "url": CONTEXT_PATH+UNIQUEUUID+"/dashboard/scholarship-program-student-data"+argument,
            "data": function ( data ) {
            	console.log('data '+data)
            }
        },
        "fnRowCallback": function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
        	$(nRow).find('td:eq(3)').css('text-align','left');
        	$(nRow).find('td:eq(4)').css('text-align','left');
        	$(nRow).find('td:eq(5)').css('text-align','left');
        	//$('tr').addClass('success');
        },
        "columns": [
        	 { "data": "sno", "name" : "sno", "title" : "Sr. No"  },
	         { "data": "regNumber", "name" : "regNumber", "title" : "Registration NumberName/GenderDOB/Applying"  },
	         { "data": "mothersName", "name" : "mothersName", "title" : "Mother�s NameContact NumberEmailState/City"  },
	         { "data": "paymentStatus", "name" : "paymentStatus", "title" : "Payment Status/Receipt"  },
	         { "data": "examStartDateTime", "name" : "examStartDateTime", "title" : "Started OnSubmitted On"  },
	         { "data": "examAutoSubmit", "name" : "examAutoSubmit", "title" : "Auto Submit/Self Submit"  },
	         { "data": "marksObtained", "name" : "marksObtained", "title" : "Score Obtained out of Max Marks"  },
	         { "data": "examResultStatus", "name" : "examResultStatus", "title" : "Test Result Status"  },
	         { "data": "examResultMailSent", "name" : "examResultMailSent", "title" : "Test Result Mail/SMS Sent"  },
	         { "data": "action", "name" : "action", "title" : "Action"  },

         ],
	});
	$('#'+elementId).dataTable().fnSetFilteringEnterPress();
	bindHover();
}

function interviewerListData(elementId, argument){
	console.log('DEFAULT_SEARCH_STATE: '+DEFAULT_SEARCH_STATE);
	var isDataTable = $.fn.dataTable.isDataTable('#'+elementId);
	console.log(elementId+ ' = ' +isDataTable);
	if(isDataTable){
		$('#'+elementId).dataTable().fnDestroy();
	}
	$('#'+elementId).DataTable( {
		"stateSave": true,
		"searching": true,
        "processing": true,
        "serverSide": true,
        "searching": true,
        "pageLength": 10,
        "paginationType":"full",
        "stateLoadParams": function (settings, data) {
        	if (!DEFAULT_SEARCH_STATE) {
	            return false;
        	}
          },
        "ajax": {
            "url": CONTEXT_PATH+UNIQUEUUID+"/dashboard/interviewer-list-details-data"+argument,
            "data": function ( data ) {
            	console.log('data '+data)
            }
        },
        "fnRowCallback": function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
        	$(nRow).find('td:eq(3)').css('text-align','left');
        	$(nRow).find('td:eq(4)').css('text-align','left');
        	$(nRow).find('td:eq(5)').css('text-align','left');
        	//$('tr').addClass('success');
        },
        "columns": [
        	 { "data": "sno", "name" : "sno", "title" : "Sr. No"  },
	         { "data": "interviewerName", "name" : "interviewerName", "title" : "Interviewer Name"  },
	         { "data": "userEmail", "name" : "userEmail", "title" : "Email"  },
	         { "data": "noOfInterviewsTaken", "name" : "noOfInterviewsTaken", "title" : "Number of Interviews Taken"  },
	         { "data": "pendingInterviews", "name" : "pendingInterviews", "title" : "Number of Pending Interviews"  },
	         { "data": "status", "name" : "status", "title" : "Status" },
	         { "data": "action", "name" : "action", "title" : "Action" },
	          ],
	});
	$('#'+elementId).dataTable().fnSetFilteringEnterPress();
	bindHover();
}


function interviewerNotBookedListData(elementId, argument){
	console.log('DEFAULT_SEARCH_STATE: '+DEFAULT_SEARCH_STATE);
	var isDataTable = $.fn.dataTable.isDataTable('#'+elementId);
	console.log(elementId+ ' = ' +isDataTable);
	if(isDataTable){
		$('#'+elementId).dataTable().fnDestroy();
	}
	$('#'+elementId).DataTable( {
		"stateSave": true,
		"searching": true,
        "processing": true,
        "serverSide": true,
        "searching": true,
        "pageLength": 10,
        "paginationType":"full",
        "stateLoadParams": function (settings, data) {
        	if (!DEFAULT_SEARCH_STATE) {
	            return false;
        	}
          },
        "ajax": {
            "url": CONTEXT_PATH+UNIQUEUUID+"/dashboard/student-interview-not-booked-list"+argument,
            "data": function ( data ) {
            	console.log('data '+data)
            }
        },
        "fnRowCallback": function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
        	$(nRow).find('td:eq(3)').css('text-align','left');
        	$(nRow).find('td:eq(4)').css('text-align','left');
        	$(nRow).find('td:eq(5)').css('text-align','left');
        	//$('tr').addClass('success');
        },
        "columns": [
        	 { "data": "sno", "name" : "sno", "title" : "Sr. No"  },
	         { "data": "gradeAndStuDetails", "name" : "gradeAndStuDetails", "title" : "Grade Applied For/Student Name/Registration Number/Student DOB"  },
	         { "data": "motherNameAndDetails", "name" : "motherNameAndDetails", "title" : "Mother�s Name/Phone Number/Email/State/City"  },
	         { "data": "scoreObtained", "name" : "scoreObtained", "title" : "Score Obtained out of Max Marks"  },
	         { "data": "status", "name" : "status", "title" : "Status"  },
	          ],
	});
	$('#'+elementId).dataTable().fnSetFilteringEnterPress();
	bindHover();
}


function showScholarShipStudentInterviewData(elementId, argument){
	console.log('DEFAULT_SEARCH_STATE: '+DEFAULT_SEARCH_STATE);
	var isDataTable = $.fn.dataTable.isDataTable('#'+elementId);
	console.log(elementId+ ' = ' +isDataTable);
	if(isDataTable){
		$('#'+elementId).dataTable().fnDestroy();
	}
	$('#'+elementId).DataTable( {
		"stateSave": true,
		"searching": true,
        "processing": true,
        "serverSide": true,
        "searching": true,
        "pageLength": 10,
        "stateLoadParams": function (settings, data) {
        	if (!DEFAULT_SEARCH_STATE) {
	            return false;
        	}
          },
        "ajax": {
            "url": CONTEXT_PATH+UNIQUEUUID+"/dashboard/scholarship-interview-pool-1"+argument,
            "data": function ( data ) {
            	console.log('data '+data)
            }
        },
        "fnRowCallback": function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
//        	$(nRow).find('td:eq(3)').css('text-align','left');
//        	$(nRow).find('td:eq(4)').css('text-align','left');
//        	$(nRow).find('td:eq(5)').css('text-align','left');
//        	$('tr').addClass('success');
        },
        "columns": [
        	 { "data": "sno", "name" : "sno", "title" : "Sr. No"  },
	         { "data": "regNumber", "name" : "regNumber", "title" : "Name/Registration Number/Gender/DOB/Applying"  },
	         { "data": "marksObtained", "name" : "marksObtained", "title" : "Score Obtained out of Max Marks"  },
	         { "data": "interviewBookingDate", "name" : "interviewBookingDate", "title" : "Interview Date & Time"  },
	         { "data": "interviewBookingStatus", "name" : "interviewBookingStatus", "title" : "Status"  },
	         { "data": "action", "name" : "action", "title" : "Action"  },

         ],
	});
	$('#'+elementId).dataTable().fnSetFilteringEnterPress();
	bindHover();
}


function bindHover(){
	console.log('bindHover  called')
//	setTimeout(function(){
//		$('div.dropdown.tooltip-content1').hover(function() {
//			$(this).find('div.dropdown-menu').stop(true, true).delay(200).fadeIn(200);
//		}, function() {
//			$(this).find('div.dropdown-menu').stop(true, true).delay(200).fadeOut(200);
//		});
//	}, 1500);
}

function showManageProfileSchoolContentListingWithQueries(elementId, argument){
	console.log('DEFAULT_SEARCH_STATE: '+DEFAULT_SEARCH_STATE);
	var isDataTable = $.fn.dataTable.isDataTable('#'+elementId);
	console.log(elementId+ ' = ' +isDataTable);
	if(isDataTable){
		$('#'+elementId).dataTable().fnDestroy();
	}
	$('#'+elementId).DataTable( {
		"stateSave": true,
        "processing": true,
        "serverSide": true,
        "pagingType":"full",
        "searching": true,
        "pageLength": 10,
        "stateLoadParams": function (settings, data) {
        	if (!DEFAULT_SEARCH_STATE) {
	            return false;
        	}
          },
        "ajax": {
            "url": CONTEXT_PATH+UNIQUEUUID+"/"+"dashboard/manage-profile-content-1"+argument,
            "data": function ( data ) {
            	//console.log('data '+data)
            }
        },
        "fnRowCallback": function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
        	if (aData['viewProfile'] || aData['editProfile']){
        		$('td', nRow).css('text-align','left');
        	}
        	//$('#'+elementId+' tr:first').addClass('success');
        },
        "columns": [
	         { "data": "sno", "name" : "sno", "title" : "S.No"  },
	         { "data": "schoolName", "name" : "schoolName" , "title" : "School Name"},
	         { "data": "userName", "name" : "userName" , "title" : "User Name"},
	         { "data": "profileStatus", "name" : "profileStatus" , "title" : "Profile Status"},
	         { "data": "action", "name" : "action" , "title" : "Action"},
         ],
         /* drawCallback: function() {
     	    this.api().state.clear();
     	  } */
	});
	$('#'+elementId).dataTable().fnSetFilteringEnterPress();
}

function showManageProfileStudentContentListingWithQueries(elementId, argument, userRole){
	console.log('DEFAULT_SEARCH_STATE: '+DEFAULT_SEARCH_STATE);
	var isDataTable = $.fn.dataTable.isDataTable('#'+elementId);
	console.log(elementId+ ' = ' +isDataTable);
	if(isDataTable){
		$('#'+elementId).dataTable().fnDestroy();
	}
	console.log("referral bvccb nvbv");
	var columns = [
        { "data": "sno", "name" : "sno", "title" : "S.No" },
        { "data": "name", "name" : "name" , "title" : "Student Name"},
        { "data": "userName", "name" : "userName" , "title" : "User Name"},
        { "data": "standard", "name" : "standard" , "title" : "Grade"},
        { "data": "profileStatus", "name" : "profileStatus" , "title" : "Profile Status"},
        { "data": "createDate", "name" : "createDate" , "title" : "Last Profile Updated Date"},
        { "data": "courseProviderName", "name" : "courseProviderName" , "title" : "LMS Platform"},
    ];
    if(SCHOOL_ID!=4){
		   columns.push({ "data": "referralCode", "name" : "referralCode" , "title" : "Counselor Name/Referral Code"},
				   { "data": "action", "name" : "action" , "title" : "Action"});

    }else{
    	 columns.push({"data": "action", "name" : "action" , "title" : "Action"});
    }
	$('#'+elementId).DataTable( {
		"stateSave": true,
        "processing": true,
        "serverSide": true,
        "pagingType":"full",
        "searching": true,
        "pageLength": 10,
        "stateLoadParams": function (settings, data) {
        	if (!DEFAULT_SEARCH_STATE) {
	            return false;
        	}
          },
        "ajax": {
            "url": CONTEXT_PATH+UNIQUEUUID+"/"+"dashboard/manage-profile-content-1"+argument,
            "data": function ( data ) {
            	//console.log('data '+data)
            }
        },
        "fnRowCallback": function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
        	if (aData['paymentTypeApplicationFee'] || aData['parentProfile'] || aData['viewProfile']){
        		$('td', nRow).css('text-align','left');
        	}
        		if(aData['referralCode'].indexOf("N/A") != -1){}
        		else{
        			$(nRow).addClass('rowForCounselor');
        		}
        },
        "columns": columns
        /*  drawCallback: function() {
        	    this.api().state.clear();
    	  } */
	});
	if(userRole=='SCHOOL'){
		$('#'+elementId).dataTable().fnSetColumnVis(6,false);
		$('#'+elementId).dataTable().fnSetColumnVis(7,false);
	}
	$('#'+elementId).dataTable().fnSetFilteringEnterPress();
}

function showManageProfileTeacherContentListingWithQueries(elementId, argument){
	console.log('DEFAULT_SEARCH_STATE: '+DEFAULT_SEARCH_STATE);
	var isDataTable = $.fn.dataTable.isDataTable('#'+elementId);
	console.log(elementId+ ' = ' +isDataTable);
	if(isDataTable){
		$('#'+elementId).dataTable().fnDestroy();
	}
	$('#'+elementId).DataTable( {
		"stateSave": true,
        "processing": true,
        "serverSide": true,
        "pagingType":"full",
        "searching": true,
        "pageLength": 10,
        "stateLoadParams": function (settings, data) {
        	if (!DEFAULT_SEARCH_STATE) {
	            return false;
        	}
          },
        "ajax": {
            "url": CONTEXT_PATH+UNIQUEUUID+"/"+"dashboard/manage-profile-content-1"+argument,
            "data": function ( data ) {
            	//console.log('data '+data)
            }
        },
        "fnRowCallback": function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
        	$(nRow).find('td:eq(3)').css('text-align','left');
        	$(nRow).find('td:eq(4)').css('text-align','left');
        	$(nRow).find('td:eq(5)').css('text-align','left');
        	$(nRow).find('td:eq(6)').css('text-align','left');
        	$(nRow).find('td:eq(7)').css('text-align','left');
        	//$('tr').addClass('success');
        },
        "columns": [
	         { data: "sno", title : "S.No"  },
	         { data: "name", title : "Teacher Name"},
	         { data: "userName", "name" : "userName" , "title" : "User Name"},
	         { data: "assignCourse", title : "Assigned Courses", 'text-align':'center'},
	         { data: "specialization", title : "Specialization", 'text-align':'center'},
	         { data: "profileStatus", title : "Profile Status", 'text-align':'center'},
	         { data: "downloadAgreement", title : "Agreement", 'text-align':'center'},
	         { data: "action", title : "Action", 'text-align':'center'},
         ],
	});
	$('#'+elementId).dataTable().fnSetFilteringEnterPress();
	bindHover();
}


function showManageProfileCommonContentListingWithQueries(elementId, argument){
	console.log('DEFAULT_SEARCH_STATE: '+DEFAULT_SEARCH_STATE);
	var isDataTable = $.fn.dataTable.isDataTable('#'+elementId);
	console.log(elementId+ ' = ' +isDataTable);
	if(isDataTable){
		$('#'+elementId).dataTable().fnDestroy();
	}
	console.log("referral");
	$('#'+elementId).DataTable( {
		"stateSave": true,
        "processing": true,
        "serverSide": true,
        "pagingType":"full",
        "searching": true,
        "pageLength": 10,
        "stateLoadParams": function (settings, data) {
        	if (!DEFAULT_SEARCH_STATE) {
	            return false;
        	}
          },
        "ajax": {
            "url": CONTEXT_PATH+UNIQUEUUID+"/"+"dashboard/user-list-content-1"+argument,
            "data": function ( data ) {
            	//console.log('data '+data)
            }
        },
        "fnRowCallback": function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
        	if (aData['paymentTypeApplicationFee'] || aData['parentProfile'] || aData['viewProfile']){
        		$('td', nRow).css('text-align','left');
        	}
        },
        "columns": [
	         { "data": "sno", "name" : "sno", "title" : "S.No"  },
	         { "data": "name", "name" : "name" , "title" : "Name"},
	         { "data": "userName", "name" : "userName" , "title" : "User Name"},
	         { "data": "roleName", "name" : "roleName" , "title" : "Role"},
	         { "data": "gotoMeetingStatus", "name" : "gotoMeetingStatus" , "title" : "Meeting User"},
	         { "data": "profileStatus", "name" : "profileStatus" , "title" : "Profile Status"},
	         { "data": "addedDate", "name" : "addedDate" , "title" : "Added Date"},
	         { "data": "action", "name" : "action" , "title" : "Action"},
         ],
        /*  drawCallback: function() {
        	    this.api().state.clear();
    	  } */
	});
	$('#'+elementId).dataTable().fnSetFilteringEnterPress();
}
function classroomSessionsData(elementId, argument){
	console.log('DEFAULT_SEARCH_STATE: '+DEFAULT_SEARCH_STATE);
	var isDataTable = $.fn.dataTable.isDataTable('#'+elementId);
	console.log(elementId+ ' = ' +isDataTable);
	if(isDataTable){
		$('#'+elementId).dataTable().fnDestroy();
	}
	$('#'+elementId).DataTable( {
		"stateSave": true,
		"searching": true,
        "processing": true,
        "pagingType":"full",
        "serverSide": true,
        "searching": true,
        "pageLength": 10,
        "stateLoadParams": function (settings, data) {
        	if (!DEFAULT_SEARCH_STATE) {
	            return false;
        	}
          },
        "ajax": {
            "url": CONTEXT_PATH+UNIQUEUUID+"/dashboard/student-teacher-sessions-report-data"+argument,
            "data": function ( data ) {
            	console.log('data '+data)
            }
        },
        "fnRowCallback": function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
        	$(nRow).find('td:eq(3)').css('text-align','left');
        	$(nRow).find('td:eq(4)').css('text-align','left');
        	$(nRow).find('td:eq(5)').css('text-align','left');
        },
        "columns": [

        	 { "data": "sno", "name" : "sno", "title" : "S. No"},
        	 { "data": "subjectName", "name" : "subjectName", "title" : "Subject Name"},//standardName
        	 { "data": "teacherName", "name" : "teacherName", "title" : "Teacher Details"},//teacherEmail
        	 { "data": "studentName", "name" : "studentName", "title" : "Student Details"},//studentEmail
        	 { "data": "studentDateTime", "name" : "studentDateTime", "title" : "Student Time Zone"},//studentTimezone studentDaylightResponse
        	 { "data": "teacherDateTime", "name" : "teacherTimeZone", "title" : "Teacher Time Zone"},//teacherTimezone teacherDaylightResponse
        	 { "data": "adminDateTime", "name" : "adminDateTime", "title" : "Admin Time Zone"},//adminDateTime
        	// { "data": "recordingUrl", "name" : "recordingUrl", "title" : "Join/View Session"},
        	 { "data": "moderator", "name" : "moderator", "title" : "Join/View Session As Moderator"},
        	 { "data": "attendee", "name" : "attendee", "title" : "Join/View Session As Attendee"},
        	 { "data": "attendeeStatus", "name" : "attendeeStatus", "title" : "Link Generation Status"},
        	 { "data": "sessionLink", "name" : "sessionLink", "title" : "Session Link"},
        	 { "data": "sendMail", "name" : "sendMail", "title" : "Send Mail"},
        	 { "data": "markSession", "name" : "markSession", "title" : "Mark Session"},
        	 { "data": "status", "name" : "status", "title" : "Session Status"},
        	 { "data": "createdDate", "name" : "createdDate", "title" : "Created Date / Booked Date"},//bookedDate
        	 { "data": "recordingPublished", "name" : "recordingPublished", "title" : "Action"},
        	 { "data": "endMeeting", "name" : "endMeeting", "title" : "End meeting"},

	          ],
	});
	$('#'+elementId).dataTable().fnSetFilteringEnterPress();
	bindHover();
}

function classroomSessionsForOther(elementId, argument){
	console.log('DEFAULT_SEARCH_STATE: '+DEFAULT_SEARCH_STATE);
	var isDataTable = $.fn.dataTable.isDataTable('#'+elementId);
	console.log(elementId+ ' = ' +isDataTable);
	if(isDataTable){
		$('#'+elementId).dataTable().fnDestroy();
	}
	$('#'+elementId).DataTable( {
		"stateSave": true,
		"searching": true,
        "processing": true,
        "serverSide": true,
        "pagingType":"full",
        "searching": true,
        "pageLength": 10,
        "stateLoadParams": function (settings, data) {
        	if (!DEFAULT_SEARCH_STATE) {
	            return false;
        	}
          },
        "ajax": {
            "url": CONTEXT_PATH+UNIQUEUUID+"/dashboard/student-teacher-sessions-report-data"+argument,
            "data": function ( data ) {
            	console.log('data '+data)
            }
        },
        "fnRowCallback": function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
        	$(nRow).find('td:eq(3)').css('text-align','left');
        	$(nRow).find('td:eq(4)').css('text-align','left');
        	$(nRow).find('td:eq(5)').css('text-align','left');
        	//$('tr').addClass('success');
        },
        "columns": [

        	 { "data": "sno", "name" : "sno", "title" : "S. No"},
        	 { "data": "subjectName", "name" : "subjectName", "title" : "Subject Name"},//standardName
        	 { "data": "teacherName", "name" : "teacherName", "title" : "Teacher Details"},//teacherEmail
        	 { "data": "studentName", "name" : "studentName", "title" : "Student Details"},//studentEmail
        	 { "data": "studentDateTime", "name" : "studentDateTime", "title" : "Student Time Zone"},//studentTimezone studentDaylightResponse
        	 { "data": "teacherDateTime", "name" : "teacherTimeZone", "title" : "Teacher Time Zone"},//teacherTimezone teacherDaylightResponse
        	 { "data": "adminDateTime", "name" : "adminDateTime", "title" : "Admin Time Zone"},//adminDateTime
        	 { "data": "recordingUrl", "name" : "recordingUrl", "title" : "Join/View Session"},
//        	 { "data": "moderator", "name" : "moderator", "title" : "Join/View Session As Moderator"},
//        	 { "data": "attendee", "name" : "attendee", "title" : "Join/View Session As Attendee"},
        	 { "data": "attendeeStatus", "name" : "attendeeStatus", "title" : "Link Generation Status"},
        	 { "data": "sessionLink", "name" : "sessionLink", "title" : "Session Link"},
        	 { "data": "sendMail", "name" : "sendMail", "title" : "Send Mail"},
        	 { "data": "markSession", "name" : "markSession", "title" : "Mark Session"},
        	 { "data": "status", "name" : "status", "title" : "Session Status"},
        	 { "data": "createdDate", "name" : "createdDate", "title" : "Created Date / Booked Date"},//bookedDate
//        	 { "data": "recordingPublished", "name" : "recordingPublished", "title" : "Action"},
//        	 { "data": "endMeeting", "name" : "endMeeting", "title" : "End meeting"},

	          ],
	});
	$('#'+elementId).dataTable().fnSetFilteringEnterPress();
	bindHover();
}

function showManageProfileOtpMobileListingWithQueries(elementId, argument){
	console.log('DEFAULT_SEARCH_STATE: '+DEFAULT_SEARCH_STATE);
	var isDataTable = $.fn.dataTable.isDataTable('#'+elementId);
	console.log(elementId+ ' = ' +isDataTable);
	if(isDataTable){
		$('#'+elementId).dataTable().fnDestroy();
	}
	console.log("referral");
	$('#'+elementId).DataTable( {
		"stateSave": true,
        "processing": true,
        "serverSide": true,
        "searching": true,
        "pageLength": 10,
        "paginationType":"full",
        "stateLoadParams": function (settings, data) {
        	if (!DEFAULT_SEARCH_STATE) {
	            return false;
        	}
          },
        "ajax": {
            "url": CONTEXT_PATH+UNIQUEUUID+"/dashboard/otp-mobile-list-content-1"+argument,
            "data": function ( data ) {
            	//console.log('data '+data)
            }
        },
        "fnRowCallback": function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
        	if (aData['paymentTypeApplicationFee'] || aData['parentProfile'] || aData['viewProfile']){
        		$('td', nRow).css('text-align','left');
        	}
        	//$('#'+elementId+' tr:first').addClass('success');
        },
        "columns": [
	         { "data": "sno", "name" : "sno", "title" : "S.No"  },
	         { "data": "entityName", "name" : "entityName" , "title" : "Entity Name"},
	         { "data": "mobileNumber", "name" : "mobileNumber" , "title" : "Mobile Number"},
	         { "data": "otpVerified", "name" : "otpVerified" , "title" : "OTP Verified"},
	         { "data": "otpSendDate", "name" : "otpSendDate" , "title" : "OTP SendDate"},
	         { "data": "verifyDate", "name" : "verifyDate" , "title" : "Verify Date"},
	         { "data": "otpSendCount", "name" : "otpSendCount" , "title" : "OTP SendCount"},
	         { "data": "createdDate", "name" : "createdDate" , "title" : "Added Date"},
         ],
        /*  drawCallback: function() {
        	    this.api().state.clear();
    	  } */
	});
	$('#'+elementId).dataTable().fnSetFilteringEnterPress();
}
function advanceStudentSearch(formId, moduleId) {
	hideMessage('');

	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForHTML('dashboard','advance-student-search'),
		data : JSON.stringify(getCallRequestForadvanceStudentSearch(formId, moduleId)),
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
        			$(".filter-fields").stop();
    				$('#manageStudent').html(htmlContent);
        		}
        		return false;
			}
		}
	});
}

function getCallRequestForadvanceStudentSearch(formId, moduleId){
	var request = {};
	var requestData = {};
	var authentication = {};
	var studentDetailDTO = {};
	studentDetailDTO['moduleId'] = moduleId;
	studentDetailDTO['enrollType'] = $("#"+formId+" #filterEnrollType").val();
	if($("#"+formId+" #filterEnrollType").val()=='ONE_TO_ONE_FLEX'){
		studentDetailDTO['profileFor'] = "flexStudent";
	}if($("#"+formId+" #filterEnrollType").val()=='BATCH'){
		studentDetailDTO['profileFor'] = "batchStudent";
	}else{
		studentDetailDTO['profileFor'] = "student";
	}
	studentDetailDTO['timZoneFrom'] = $("#"+formId+" #countryTimezoneFromId option:selected").attr("data-timezone");
	studentDetailDTO['timZoneTo'] = $("#"+formId+" #countryTimezoneToId option:selected").attr("data-timezone");
	studentDetailDTO['studentName'] = $("#"+formId+" #studName").val();
	studentDetailDTO['standardId'] =$("#"+formId+" #filterStandardId").val();
	studentDetailDTO['schoolId'] = $("#"+formId+" #schoolId").val();
	studentDetailDTO['email'] = $("#"+formId+" #emailId").val();
	studentDetailDTO['contactNo'] = $("#"+formId+" #mobileNo").val();
	studentDetailDTO['countryId'] = $("#"+formId+" #countryId").val();
	studentDetailDTO['stateId'] = $("#"+formId+" #stateId").val();
	studentDetailDTO['cityId'] = $("#"+formId+" #cityId").val();
	studentDetailDTO['enrollStatus'] = $("#"+formId+" #filterEnrollStatus").val();
	studentDetailDTO['userClickFrom'] = $("#"+formId+" #userClickFrom").val();
	studentDetailDTO['courseProId'] = $("#"+formId+" #courseProviderId").val();
	studentDetailDTO['page'] = $("#"+formId+" #page").val();
	studentDetailDTO['pageSize'] = $("#"+formId+" #pageSize").val();

	studentDetailDTO['schoolUUID'] = SCHOOL_UUID;
	requestData['studentDetailDTO'] = studentDetailDTO;
	request['requestData'] = requestData;
	authentication['hash'] = getHash();
	authentication['userType'] = "SCHOOL";
	authentication['schoolId'] = SCHOOL_ID;
	authentication['schoolUUID'] = SCHOOL_UUID;
	request['authentication'] = authentication;
	console.log(request);
	return request;

}

function advanceManageStudentSearchReset(formId){
	$('#' + formId)[0].reset();
	$("#"+formId+" #filterEnrollStatus").val('').trigger('change');
	$("#"+formId+" #countryTimezoneFromId").val('').trigger('change');
	$("#"+formId+" #countryTimezoneToId").val('').trigger('change');
	$("#"+formId+" #filterStandardId").val('').trigger('change');
	$("#"+formId+" #cityId").val('');
	$("#"+formId+" #filterEnrollType").val('');
	$("#"+formId+" #countryTimezoneFromId").val('');
	$("#"+formId+" #filterEnrollStatus").val('');
	$("#"+formId+" #studName").val('');
	$("#"+formId+" #emailId").val('');
	$("#"+formId+" #mobileNo").val('');
	$("#"+formId+" #countryId").val('');
	$("#"+formId+" #stateId").val('');
}

