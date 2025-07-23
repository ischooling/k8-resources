function validateRequestForPPCRequest(formId){
	if (!validateFormAscii(formId)) {
		showMessage(false, 'Please use the English Keyboard while providing information');
		return false
	}
	
	if ($("#"+formId+" #name").val()=='' || $("#"+formId+" #name").val()==null) {
		showMessage(true, 'Name is required');
		return false
	}
	if (!validateEmail($("#" + formId + " #email").val().trim())) {
		showMessage(false, 'Email is either empty or invalid');
		return false
	}
	if($("#"+formId+" #isdCodeMobileNo").length){
		if ($("#"+formId+" #isdCodeMobileNo").val()=='' || $("#"+formId+" #isdCodeMobileNo").val()==null) {
			showMessage(true, 'Isd code is required');
			return false
		}
	}
	if($("#"+formId+" #contactNumber").length){
		if ($("#"+formId+" #contactNumber").val()=='' || $("#"+formId+" #contactNumber").val()==null) {
			showMessage(true, 'Phone Number is required');
			return false
		}
	}
	if ($("#"+formId+" #grade").val()=='0' || $("#"+formId+" #grade").val()==null) {
		showMessage(true, 'Grade is required');
		return false
	}
	return true;
}

function callForPPCRequestForm(formId, moduleId,folderName) {
	hideMessage('');
	if(!validateRequestForPPCRequest(formId)){
		return false;
	}
	var me = $(this);
	if(me.data('requestRunning')){
		console.log('request blocked')
		return false;
	}
	me.data('requestRunning', true);
	$("#sendRequest").prop("disabled", true);
	$.ajax({
		type : "POST",
		url : getURLForHTML('common','save-ppc-request-content'),
		contentType : "application/json",
		data : JSON.stringify(getRequestForPPCRequest(formId, moduleId, folderName)),
		dataType : 'html',
		success : function(htmlContent) {
			if(htmlContent!=""){
            	var stringMessage = [];
            	stringMessage = htmlContent.split("|");
        		if(stringMessage[0] == "FAILED" || stringMessage[0] == "EXCEPTION" || stringMessage[0] == "SESSIONOUT" ){
        			showMessage(true, stringMessage[1]);
        		} else {
        			var url = '';
        			if(ENVIRONMENT=='uat'){
        				url = 'http://164.52.198.42:8080/k8school/common/ppc-request-thank-you';
        			}else if(ENVIRONMENT=='uat2'){
        				url = 'http://164.52.198.42:9090/k8school/common/ppc-request-thank-you';
        			}else if(ENVIRONMENT=='dev'){
        				url = 'http://localhost:8080/k8school/common/ppc-request-thank-you';
        			}else if(ENVIRONMENT=='staging'){
        				url = 'http://164.52.198.42:8070/k8school/common/ppc-request-thank-you';
        			}else{
        				url = 'https://www.k8school.com/'+folderName+'-thankyou/';
        			}
        			goAhead(url,'');
        			return false;
        		}
        		return false;
			}
		},
        complete: function() {
			window.setTimeout(function(){me.data('requestRunning', false);},10000)
        },
		error : function(e) {
			showMessage(true, TECHNICAL_GLITCH);
			return false;
		}
	});
}
function getRequestForPPCRequest(formId, moduleId, folderName){
	var request = {};
	var authentication = {};
	var requestData = {};
	var PPCRequestDTO = {};
	PPCRequestDTO['name'] = toTitleCase($("#" + formId + " #name").val());
	PPCRequestDTO['email'] = $("#" + formId + " #email").val().trim();
	PPCRequestDTO['isdCode'] = $("#" + formId + " #isdCodeMobileNo :selected").text().split(" ")[0];
	PPCRequestDTO['contactNumber'] = $("#" + formId + " #contactNumber").val();
	PPCRequestDTO['grade'] = $("#" + formId + " #grade").val();
	PPCRequestDTO['description'] = escapeCharacters($("#" + formId + " #description").val());
	PPCRequestDTO['location'] = $("#" + formId + " #location").val();
	PPCRequestDTO['campaignName'] = folderName;
	
	PPCRequestDTO['utmSource'] = getCookie('us');
	PPCRequestDTO['utmMedium'] = getCookie('um');
	PPCRequestDTO['utmDescription'] = getCookie('uc');
	PPCRequestDTO['originalUrl'] = getCookie('cu');
	PPCRequestDTO['gclid'] = getCookie('gclid');
	PPCRequestDTO['utmCampaign'] = getCookie('ucam');
	PPCRequestDTO['utmTerm'] = getCookie('ut');
	
	requestData['ppcRequestDTO'] = PPCRequestDTO;
	authentication['hash'] = getHash();authentication['schoolId'] = SCHOOL_ID;authentication['schoolUUID'] = SCHOOL_UUID;
	authentication['userType'] = moduleId;
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	return request;
}