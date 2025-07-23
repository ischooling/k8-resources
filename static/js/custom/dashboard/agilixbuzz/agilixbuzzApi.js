function validateRequestForAgilixbuzzSyncEnrollment(formId, moduleId, requestKey, lmsProviderId) {
	return true;
}

function getRequestForAgilixbuzzSyncEnrollment(formId, moduleId, requestKey, value, lmsProviderId) {
	var  AgilixbuzzSyncRequest= {};
	AgilixbuzzSyncRequest['uniqueId']= UNIQUEUUID;
	AgilixbuzzSyncRequest['moduleId'] = moduleId;
	AgilixbuzzSyncRequest['requestKey'] = requestKey;
	AgilixbuzzSyncRequest['lmsProviderId'] = lmsProviderId;
	
	var requestValues=[];
	
	var requestValue={};
	requestValue['value']=value;
	requestValues.push(requestValue);
	requestValue['lmsProviderId']=lmsProviderId;
	
	AgilixbuzzSyncRequest['requestValues'] = requestValues;
	return AgilixbuzzSyncRequest;
}

function callAgilixbuzzSyncEnrollment(formId, moduleId, requestKey, value, lmsProviderId) {
	hideMessage('');	
	if (!validateRequestForAgilixbuzzSyncEnrollment(formId, moduleId, requestKey, value, lmsProviderId)) {
		return false;
	}
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLFor('buzz-sync','enrollment'),
		data : JSON.stringify(getRequestForAgilixbuzzSyncEnrollment(formId, moduleId, requestKey, value, lmsProviderId)),
		dataType : 'json',
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2' || data['status'] == '3') {
				showMessage(true, data['message']);
				if(data['status'] == '3'){
					redirectLoginPage();
				}
			} else {
				showMessage(true, data['message']);
			}
			return false;
		}
	});
}


function validateRequestForAgilixbuzzSyncUser(formId, moduleId, requestKey, lmsProviderId) {
	return true;
}

function getRequestForAgilixbuzzSyncUser(formId, moduleId, requestKey, value, lmsProviderId) {
	var AgilixbuzzSyncRequest = {};
	AgilixbuzzSyncRequest['uniqueId']= UNIQUEUUID;
	AgilixbuzzSyncRequest['moduleId'] = moduleId;
	AgilixbuzzSyncRequest['schoolId'] = SCHOOL_ID;
	AgilixbuzzSyncRequest['requestKey'] = requestKey;
	AgilixbuzzSyncRequest['lmsProviderId'] = lmsProviderId;
	var requestValues=[];
	
	var requestValue={};
	requestValue['value']=value;
	requestValue['lmsProviderId']=lmsProviderId;

	requestValues.push(requestValue);
	
	AgilixbuzzSyncRequest['requestValues'] = requestValues;
	return AgilixbuzzSyncRequest;
}


function callAgilixbuzzSyncUser(formId, moduleId, requestKey, value, lmsProviderId) {
	hideMessage('');
	if (!validateRequestForAgilixbuzzSyncUser(formId, moduleId, requestKey, value, lmsProviderId)) {
		return false;
	}
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLFor('buzz-sync','user'),
		data : JSON.stringify(getRequestForAgilixbuzzSyncUser(formId, moduleId, requestKey, value, lmsProviderId)),
		dataType : 'json',
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2' || data['status'] == '3') {
				showMessage(true, data['message']);
				if(data['status'] == '3'){
					redirectLoginPage();
				}
			} else {
				showMessage(true, data['message']);
			}
			return false;
		}
	});
}