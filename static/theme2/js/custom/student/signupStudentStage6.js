$(document).ready(function() {
});

function validateRequestForBatchSelection(formId){
	if($('.batch-item' ).length==0){
		showMessage(0, 'No batch is available, Please contact the admission support for further information.');
		return false;
	}
	if($("input[name='batchId']:checked").val()==undefined){
		showMessage(0, 'Please select at least one batch to process further.');
		return false;
	}
	return true;
}

function callForSignupStudentBatchSelection(formId) {
	var flag=false
	var batchByPassStatus= $('#batchBypass').val();
	hideMessage('');
	if(!batchByPassStatus){
		if(!validateRequestForBatchSelection(formId)){
			return false;
		}
	}
	customLoaderSignup(true);
	$.ajax({
		type : "POST",
		url : getURLForHTML('student','signup/stage-8'),
		data : encodeURI("request="+JSON.stringify(getRequestForBatchSelection(formId))),
		dataType : 'html',
		async : false,
		global : false,
		success : function(htmlContent) {
			customLoaderSignup(false);
			if(htmlContent!=""){
            	var stringMessage = [];
            	stringMessage = htmlContent.split("|");
        		if(stringMessage[0] == "FAILED" || stringMessage[0] == "EXCEPTION" || stringMessage[0] == "SESSIONOUT"){
        			if(stringMessage[0] == "SESSIONOUT"){
        				redirectLoginPage();
        			}else{
        				showMessage(0, stringMessage[1]);
        			}
        			flag=false
        		} else {
        			$('#signupStage9Content').html(htmlContent)
        			if(!batchByPassStatus) {
        				showMessage(1, 'You have successfully selected batch', '', true);
        			}
        			flag=true
        		}
			}
		}
	});
	return flag;
}

function getRequestForBatchSelection(formId){
	var request = {};
	var authentication = {};
	var requestData = {};
	requestData['requestKey']=$("input[name='batchId']:checked").val()
	authentication['hash'] = getHash();
	authentication['schoolId'] = SCHOOL_ID;
	authentication['schoolUUID'] = SCHOOL_UUID;
	authentication['userType'] = 'STUDENT';
	authentication['userId'] = $("#"+formId+" #userId").val();
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	return request;
}

function displaySection(sectionNumber){
	hideMessage('');
	$('#formSteps div').steps('setStep', sectionNumber);
}