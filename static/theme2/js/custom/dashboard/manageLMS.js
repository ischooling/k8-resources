function advanceLMSUserSearchReset(formId){
	$('#' + formId)[0].reset();
	$("#"+formId+" #standardId").val(" ").trigger('change');
}

function advanceLMSUSerSearch(formId,moduleId, userId, userRole){
	var argument='?moduleId='+moduleId+'&schoolId='+SCHOOL_ID+'&'+$('#'+formId).serialize();
	manageLMSUSersData('manageLMSUserList',argument, userId, userRole);
}

function manageLMSUSersData(elementId, argument, userId, role){
	$.ajax({
		type : "GET",
		contentType : "application/json",
		url : CONTEXT_PATH+UNIQUEUUID+"/dashboard/show-student-lms-list-1"+argument,
		dataType : 'json',
		success : function(data) {
			$('#'+elementId+' > tbody').html('');
			if (data['status'] == '0' || data['status'] == '2' || data['status'] == '3') {
				if(data['status'] == '3'){
					redirectLoginPage();
				}else{
					if(tt=='theme1'){
						showMessage(false, data['message']);
					}else{
						showMessageTheme2(0, data['message'],'',true);
					}
				}
			} else {
				$('#manageLMSUserContentDiv').html(manageLMSUserTable(elementId,role));
				$('#'+elementId+' > tbody').append(getManageLMSUserTableBody(data.sessions, userId, role));
				var isDataTable = $.fn.dataTable.isDataTable('#'+elementId);
				if(isDataTable){
					$('#'+elementId).dataTable().fnDestroy();
				}
				$('#'+elementId).DataTable();
			}
			return false;
		}
	});
	bindHover();
}

function callLMSContentByUserId(parentId, parentUserId, parentLmsId,moduleId){
	console.log('callLMSCourse ManagerCourseList page')
	$.ajax({
		type : "POST",
		url : getURLForHTML('dashboard','parent-view-lms-content'),
		data : "parentId="+parentId+"&parentUserId="+parentUserId+"&parentLmsId="+parentLmsId+"&moduleId="+moduleId,
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

function studentListLmsCreatedContent(elementId, argument, userRole){
	$('#'+elementId).DataTable( {
        "processing": true,
        "serverSide": true,
        "searching": true,
        "pagingType":"full",
        "pageLength": 10,
        "ajax": {
            "url": CONTEXT_PATH+UNIQUEUUID+"/"+"dashboard/show-student-lms-list-1"+argument,
            "data": function ( data ) {
            	//console.log('data '+data)
            }
        },
         "fnRowCallback": function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
        	//$('tr').addClass(' success:' );
        	$('th').css('color','#464646' );
        },
        "columns": [
	         { "data": "sno", "name" : "sno", "title" : "S.No" },
	         { "data": "courseProviderName", "name" : "courseProviderName" , "title" : "LMS Platform"},
	         { "data": "name", "name" : "name" , "title" : "Student Name"},
	         { "data": "lmsUserName", "name" : "lmsUserName" , "title" : "LMS User Name"},
	         { "data": "userName", "name" : "userName" , "title" : "User Name"},
	         { "data": "gradeName", "name" : "gradeName" , "title" : "Grade"},
	         { "data": "userProfileStatus", "name" : "userStatus", "title" : "SMS/LMS Profile Status"},
	         { "data": "semesterStartDate", "name" : "semesterStartDate" , "title" : "Student Academic Year Start Date"},
	         { "data": "registrationType", "name" : "registrationType" , "title" : "Registration Type"},
	         { "data": "action", "name" : "action1" , "title" : "Action"},
	      // { "data": "action", "name" : "action" , "title" : "Assign Teacher"},
         ]
	});
	if(userRole=='SCHOOL'){
		$('#'+elementId).dataTable().fnSetColumnVis(1,false);
		//$('#'+elementId).dataTable().fnSetColumnVis(4,false);
	}
	$('#'+elementId).dataTable().fnSetFilteringEnterPress();
}