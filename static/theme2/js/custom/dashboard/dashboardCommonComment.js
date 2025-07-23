$(document).ready(function() {

});
function callForCommonComments(formId, controllType, entityId, entityName, title) {
	hideMessage('');
	if(title!=undefined && title!=''){
		$('#commonCommentTitle').html(title);
	}
	$('#commonCommentsLogsModel').modal('show');
	$.ajax({
		type : "POST",
		url : getURLForHTML('dashboard','common-comments-by-entity-id'),
		data : "controllType="+controllType+"&entityId="+entityId+"&entityName="+entityName,
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
        			$('#commonCommentsLogsModelContents').html(htmlContent);
        		}
        		return false;
			}
		},
		error : function(e) {
			console.log(e)
			//showMessage(true, TECHNICAL_GLITCH);
			return false;
		}
	});
}

function saveCommonComments(formId, controllType, entityId, entityName, title) {
	hideMessage('');
	if ($("#"+formId+" #entityId").val()=='') {
		showMessage(true, 'Entity is required');
		return false
	}
	if ($("#"+formId+" #comments").val()=='' || $("#"+formId+" #comments").val()==null) {
		showMessage(true, 'Comments is required');
		return false
	}
	if($("#"+formId+" #comments").val().length>500){
		showMessage(true, 'Comments length should not more than 500 characters');
		return false
	}
	$.ajax({
		type : "POST",
		url : getURLForHTML('dashboard','save-common-comments-content'),
		data : encodeURI("request="+JSON.stringify(getRequestForSaveCommonComments(formId, moduleId))),
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
        			callForCommonComments(formId, controllType, entityId, entityName, title)
        			showMessage(true, stringMessage[1]);
        		}
        		return false;
			}
		},
		error : function(e) {
			console.log(e)
			//showMessage(true, TECHNICAL_GLITCH);
			return false;
		}
	});
}

function getRequestForSaveCommonComments(formId, moduleId){
	var request = {};
	var authentication = {};
	var requestData = {};
	var commonCommentsDTO = {};
	commonCommentsDTO['entityId']=$("#"+formId+" #entityId").val();
	commonCommentsDTO['entityName']=$("#"+formId+" #entityName").val();
	commonCommentsDTO['comments']=escapeCharacters($("#"+formId+" #comments").val());
	commonCommentsDTO['addedBy']=$("#"+formId+" #userId").val();
	requestData['commonCommentsDTO'] = commonCommentsDTO
	
	authentication['hash'] = getHash();authentication['schoolId'] = SCHOOL_ID;authentication['schoolUUID'] = SCHOOL_UUID;
	authentication['userType'] = moduleId;
	authentication['userId'] = $("#"+formId+" #userId").val();
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	return request;
}