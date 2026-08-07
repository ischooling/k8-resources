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


function callAgilixbuzzSyncUser(formId, moduleId, requestKey, value, lmsProviderId, userId) {
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
			// NOTE: this endpoint (AgilixbuzzSyncResponse) returns 'code', NOT 'status':
			//   "1"/"OK" = success, "3" = session out, "0"/"2" = failed/exception.
			var code = data['code'];
			showMessage(true, data['message']);
			if (code == '3') {
				redirectLoginPage();
			} else if ((code == '1' || code == 'OK')
					&& typeof userId !== 'undefined' && userId !== ''
					&& typeof callChangePasswordModal === 'function') {
				// Sync succeeded -> reload the "Manage LMS Content" modal so the updated
				// LMS User Name/LMS User Id and Mail Sent Status reflect immediately.
				$('#studentViewLmsEntryModel').modal('hide');
				setTimeout(function(){ callChangePasswordModal(userId); }, 600);
			}
			return false;
		}
	});
}