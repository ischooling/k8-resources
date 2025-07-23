function callUserActivity(formId, userId, showActivityLog, showLoginHistoryLog,roleModuleId) {
	hideMessage('');
	if(roleModuleId==undefined){
		roleModuleId=userId;
	}
	$.ajax({
		type : "POST",
		url : getURLForHTML('dashboard','user-activity'),
		data : "userId="+userId+"&showActivityLog="+showActivityLog+"&showLoginHistoryLog="+showLoginHistoryLog+"&moduleId="+roleModuleId,
		dataType : 'html',
		cache : false,
		timeout : 600000,
		success : function(htmlContent) {
			if(htmlContent!=""){
            	var stringMessage = [];
            	stringMessage = htmlContent.split("|");
        		if(stringMessage[0] == "FAILED" || stringMessage[0] == "EXCEPTION" || stringMessage[0] == "SESSIONOUT" ){
        			showMessage(true, stringMessage[1]);
        		} else {
        			$('#userActivityHTML').html(htmlContent);
        		}
        		return false;
			}
		},
		error : function(e) {
			console.log(e)
		//	showMessage(true, TECHNICAL_GLITCH);
			return false;
		}
	});
}
function callUserActivityLogs(callFor,roleModuleId){
	var userId=$('#userActivityUserId').html();
	if(roleModuleId==undefined){
		roleModuleId=$('#userActivityUserId').html();
	}
	$('#activityLogTab').removeClass('active');
	$('#activityLogTab').removeClass('inactive-tab');
	$('#activityHistoryTab').removeClass('active');
	$('#activityHistoryTab').removeClass('inactive-tab');
	if(callFor=='activity-logs'){
		$('#activityLogTab').addClass('active');
		$('#activityHistoryTab').addClass('inactive-tab');
		callForDashboardData('formIdIfAny','remarks-history-content?userId='+userId+'&moduleId='+roleModuleId,'userActivityContent');
	}else if(callFor=='login-history'){
		$('#activityLogTab').addClass('inactive-tab');
		$('#activityHistoryTab').addClass('active');
		callForDashboardData('formIdIfAny','attendance-content?userId='+userId+'&type=modal&moduleId='+roleModuleId, 'userActivityContent');
	}
}
function callActivityByEntityIdAndName(entityId, entityName, title){
	callForCommonComments('commonCommentsLogsForm', 'add', entityId, entityName, title);
}