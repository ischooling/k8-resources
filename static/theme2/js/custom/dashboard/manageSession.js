function advanceManageSessionSearchReset(formId){
	$('#' + formId)[0].reset();
	$("#"+formId+" #standardId").val(" ").trigger('change');
}

function advanceManageSessionSearch(formId,moduleId, userId, userRole){
	var argument='?moduleId='+moduleId+'&schoolId='+SCHOOL_ID+'&'+$('#'+formId).serialize();
	manageSessionData('manageStudentSession',argument, userId, userRole);
}

function manageSessionData(elementId, argument, userId, role){
	$.ajax({
		type : "GET",
		contentType : "application/json",
		url : CONTEXT_PATH+UNIQUEUUID+"/dashboard/student-manage-session-content"+argument,
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
				$('#manageSessionUserContentDiv').html(manageSessionTable(elementId,role));
				$('#'+elementId+' > tbody').append(getManageSessionTableBody(data.sessions, userId, role));
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


