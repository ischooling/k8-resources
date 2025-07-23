
function getSchoolSettingDetails() {
	var schoolId=$('#schoolSettigsSelection').val();
	hideMessage('');
	$.ajax({
		type : "GET",
		url : getURLForHTML('dashboard','school-settings-details'),
		data : "SCHOOLID="+schoolId,
		dataType : 'html',
		cache : false,
		timeout : 600000,
		success : function(htmlContent) {
			if(htmlContent!=""){
            	var stringMessage = [];
            	stringMessage = htmlContent.split("|");
        		if(stringMessage[0] == "FAILED" || stringMessage[0] == "EXCEPTION" || stringMessage[0] == "SESSIONOUT" ){
        			if(stringMessage[0] == "SESSIONOUT"){
        				redirectLoginPage();
        			}else {
        				showMessage(true, stringMessage[1]);
        			}
        		} else {
        			$('#schoolSettingsContent').hide();
        			$('#schoolSettingsOnChangeData').html(htmlContent);
        			$('#schoolSettingsOnChangeData').show();
        		}
        		return false;
			}
		},
		error : function(e) {
			//showMessage(true, TECHNICAL_GLITCH);
			return false;
		}
	});
}

function saveSchoolSettings(formId, schoolId, updateFor) {
	hideMessage('');
	if(!validateRequestForSchoolSettings(formId, schoolId, updateFor)){
		return false;
	}
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForHTML('dashboard','send-referralcode-to-user'),
		data : JSON.stringify(getRequestForUserReferral(formId, moduleId,isForSpecificUser)),
		dataType : 'json',
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				showMessage(true, data['message']);
			} else {
				showMessage(true, data['message']);
				$('#sendReferralModal').modal('hide');
			}
			return false;
		}
	});
}

function validateRequestForSchoolSettings(formId, schoolId, updateFor){
	return true;
}

function getRequestForUserReferral(formId, schoolId, updateFor){
	var request = {};
	var authentication = {};
	var requestData = {};
	var counselorReferralDTO = {};
	var emailStr = "";
	
	counselorReferralDTO['id'] = $("#"+formId+" #referralSendId").val();
	counselorReferralDTO['counselorId'] = $("#"+formId+" #counselorId").val();
	counselorReferralDTO['referralCode'] = $("#"+formId+" #referralCode").val();
	//counselorReferralDTO['emailId'] = $("#"+formId+" #emailId").val();
	$("input[name='emailId']").each(function() {
		emailStr = emailStr + $(this).val()+",";
	});
	counselorReferralDTO['emailId'] = emailStr;
	requestData['counselorReferralDTO'] = counselorReferralDTO;
	authentication['hash'] = getHash();authentication['schoolId'] = SCHOOL_ID;authentication['schoolUUID'] = SCHOOL_UUID;
	authentication['userType'] = moduleId;
	authentication['userId'] = $("#"+formId+" #userId").val();
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	
	return request;
}

function saveSchoolSettingData(formId, moduleName, settingId,schoolId){
	$("#errMsg").text('');
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForHTML('dashboard','save-school-setting-lms-role-pg-data'),
		data : JSON.stringify(getRequestForSaveSchoolSettingData(formId,moduleName, settingId,schoolId)),
		dataType : 'json',
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				$("#errMsg").text(data['message'])
				$("body,html").animate({scrollTop: $("#errMsg").offset().top -70}, 800);
			} else {
				$("#errMsg").text(data['message'])
				$("body,html").animate({scrollTop: $("#errMsg").offset().top -70}, 800);
			}
			return false;
		}
	});
}

function getRequestForSaveSchoolSettingData(formId,moduleName,settingId,schoolId){
	request = {};
	var authentication = {};
	var requestData = {};
	var schoolSettingLmsDTO = {};
	if(moduleName=='PG'){
		schoolSettingLmsDTO['gatewayName'] = $("#"+formId+" #paymentGateway").val();
		schoolSettingLmsDTO['gatewayMode'] = $("#"+formId+" #gatewayMode").val();
		schoolSettingLmsDTO['endpointUrl'] = $("#"+formId+" #endPointUrl").val();
		schoolSettingLmsDTO['merchantEmail'] = $("#"+formId+" #merchantEmail").val();
		schoolSettingLmsDTO['secretKey'] = $("#"+formId+" #secretKey").val();
		schoolSettingLmsDTO['clientId'] = $("#"+formId+" #clientId").val();
		schoolSettingLmsDTO['paymentModeIp'] =$("#"+formId+" #paymentModeIp").val();
		if($("#"+formId+" #pgStatus").val() =='ACTIVE'){
			schoolSettingLmsDTO['status'] = 'Y';
		}else{
			schoolSettingLmsDTO['status'] = 'N';
		}
	}else if(moduleName=='LMSSM'){
		schoolSettingLmsDTO['domainId'] = $("#"+formId+" #domainId").val();
		schoolSettingLmsDTO['domainName'] = $("#"+formId+" #domainName").val();
		schoolSettingLmsDTO['lmsLoginUrl'] = $("#"+formId+" #lmsLoginUrl").val();
		schoolSettingLmsDTO['userSpace'] = $("#"+formId+" #userSpace").val();
		schoolSettingLmsDTO['prefixStudent'] = $("#"+formId+" #prefixStudent").val();
		schoolSettingLmsDTO['prefixTeacher'] = $("#"+formId+" #prefixTeacher").val();
		schoolSettingLmsDTO['prefixAdmin'] = $("#"+formId+" #prefixAdmin").val();
		if($("#"+formId+" #schoolLmsStatus").val() =='ACTIVE'){
			schoolSettingLmsDTO['status'] = 'Y';
		}else{
			schoolSettingLmsDTO['status'] = 'N';
		}
		var lmsProvider = $("#"+formId+" #lmsProviderId").val();
		if(lmsProvider =='Buzz'){
			schoolSettingLmsDTO['lmsProviderId'] = 31;
		}else if(lmsProvider =='Agilix Buzz'){
			schoolSettingLmsDTO['lmsProviderId'] =1;
		}else if(lmsProvider =='Odysseyware'){
			schoolSettingLmsDTO['lmsProviderId'] = 2;
		}else{
			schoolSettingLmsDTO['lmsProviderId'] = 36;
		}
	}else if(moduleName=='LMSRM'){
		schoolSettingLmsDTO['roleName'] = $("#"+formId+" #rolelmsRoleName"+settingId).val();
		schoolSettingLmsDTO['roleLmsId'] = $("#"+formId+" #roleLmsId"+settingId).val();
		if($("#"+formId+" #roleLmsStatus"+settingId).val() =='ACTIVE'){
			schoolSettingLmsDTO['status'] = 'Y';
		}else{
			schoolSettingLmsDTO['status'] = 'N';
		}
		var lmsProvider = $("#"+formId+" #rolelmsProvider"+settingId).val();
		if(lmsProvider =='Buzz'){
			schoolSettingLmsDTO['lmsProviderId'] = 31;
		}else if(lmsProvider =='Agilix Buzz'){
			schoolSettingLmsDTO['lmsProviderId'] =1;
		}else if(lmsProvider =='Odysseyware'){
			schoolSettingLmsDTO['lmsProviderId'] = 2;
		}else{
			schoolSettingLmsDTO['lmsProviderId'] = 36;
		}
	}else if(moduleName=='SSO'){
		schoolSettingLmsDTO['schoolUuid'] = $("#"+formId+" #schoolUuid").val();
		schoolSettingLmsDTO['schoolName'] = $("#"+formId+" #schoolDisplayName").val();
		schoolSettingLmsDTO['address'] = $("#"+formId+" #schoolAddress").val();
		schoolSettingLmsDTO['contactEmail'] = $("#"+formId+" #contactEmail").val();
		schoolSettingLmsDTO['whatsAppCode'] = $("#"+formId+" #whatsAppCode").val();
		schoolSettingLmsDTO['whatsAppContact'] = $("#"+formId+" #whatsAppContact").val();
		schoolSettingLmsDTO['schoolContactCode'] = $("#"+formId+" #schoolContactCode").val();
		schoolSettingLmsDTO['schoolContact'] = $("#"+formId+" #contactNumber").val();
		schoolSettingLmsDTO['landlineCode'] = $("#"+formId+" #lanlineCode").val();
		schoolSettingLmsDTO['landlineContact'] = $("#"+formId+" #landlineContact").val();
		schoolSettingLmsDTO['schoolTimeZone'] = $("#"+formId+" #schoolTimezone").val();
		
	}else if(moduleName=='SSL'){
		schoolSettingLmsDTO['schoolWebsite'] = $("#"+formId+" #website").val();
		schoolSettingLmsDTO['logoUrl'] = $("#"+formId+" #logoUrl").val();
		schoolSettingLmsDTO['emailLogoUrl'] = $("#"+formId+" #emailLogoUrl").val();
		schoolSettingLmsDTO['favIconUrl'] = $("#"+formId+" #favUrl").val();
		schoolSettingLmsDTO['signupUrl'] = $("#"+formId+" #signupUrl").val();
		schoolSettingLmsDTO['ticketRaisedUrl'] = $("#"+formId+" #ticketRaisedUrl").val();
		schoolSettingLmsDTO['termsOfUserUrl'] = $("#"+formId+" #termsUrl").val();
		schoolSettingLmsDTO['privacyPolicyUrl'] = $("#"+formId+" #privacyPolicyUrl").val();
		schoolSettingLmsDTO['contactUsActive'] = $("#"+formId+" #contactUsStatus").val();
		schoolSettingLmsDTO['contactUsUrl'] = $("#"+formId+" #contactUsUrl").val();
		schoolSettingLmsDTO['instagramUrl'] = $("#"+formId+" #instagramUrl").val();
		schoolSettingLmsDTO['fbUrl'] = $("#"+formId+" #facebookUrl").val();
		schoolSettingLmsDTO['pintrestUrl'] = $("#"+formId+" #pintrestUrl").val();
		schoolSettingLmsDTO['twitterUrl'] = $("#"+formId+" #twitterUrl").val();
		schoolSettingLmsDTO['linkdinUrl'] = $("#"+formId+" #linkedinUrl").val();
		schoolSettingLmsDTO['codeConductUrl'] = $("#"+formId+" #codeConductUrl").val();
		schoolSettingLmsDTO['studHBookUrl'] = $("#"+formId+" #stdtHandbokUrl").val();
		schoolSettingLmsDTO['chatBoatActive'] = $("#"+formId+" #chatbotStatus").val();
		schoolSettingLmsDTO['chatBoatUrl'] = $("#"+formId+" #chatbotUrl").val();
		
	}else if(moduleName=='SSM'){
		schoolSettingLmsDTO['senderEmail'] = $("#"+formId+" #senderEmail").val();
		schoolSettingLmsDTO['emailForClassRoomSession'] = $("#"+formId+" #classroomEmail").val();
		schoolSettingLmsDTO['emailForDemoCouncelling'] = $("#"+formId+" #demoEmail").val();
		schoolSettingLmsDTO['emailForStudentInstallmentFee'] = $("#"+formId+" #feeEmail").val();
		schoolSettingLmsDTO['emailForPpcRequest'] = $("#"+formId+" #ppcEmail").val();
		schoolSettingLmsDTO['emailForClientSignup'] = $("#"+formId+" #signupEmail").val();
		schoolSettingLmsDTO['emailForHiring'] = $("#"+formId+" #hiringEmail").val();
		schoolSettingLmsDTO['emailAccountName'] = $("#"+formId+" #accountNameEmail").val();
		schoolSettingLmsDTO['emailAccountAdminName'] = $("#"+formId+" #accountAdminEmail").val();
		schoolSettingLmsDTO['emailAccountSupport'] = $("#"+formId+" #supportEmail").val();
		schoolSettingLmsDTO['emailOtherAdmin'] = $("#"+formId+" #otherAdminEmail").val();
		schoolSettingLmsDTO['technicalEmail'] = $("#"+formId+" #technicalEmail").val();
		schoolSettingLmsDTO['emailAccountForAuditor'] = $("#"+formId+" #auditorEmail").val();
		schoolSettingLmsDTO['emailForAdmissionSupporte'] = $("#"+formId+" #emailForAdmissionSupporte").val();
		schoolSettingLmsDTO['emailForAdmin1'] = $("#"+formId+" #emailForAdmin1").val();
		schoolSettingLmsDTO['emailForAdmin2'] = $("#"+formId+" #emailForAdmin2").val();
		schoolSettingLmsDTO['emailForAdmin3'] = $("#"+formId+" #emailForAdmin3").val();
		schoolSettingLmsDTO['emailForAdmin4'] = $("#"+formId+" #emailForAdmin4").val();
		schoolSettingLmsDTO['withdrawalRequestAdmin'] = $("#"+formId+" #withdrawalRequestAdmin").val();
		
	}else if(moduleName=='SST'){
		schoolSettingLmsDTO['vendorId'] = $("#"+formId+" #vendorId").val();
		schoolSettingLmsDTO['showSubjectCostOnSignup'] = $("#"+formId+" #showSubjectCost").val();
		schoolSettingLmsDTO['flexEnrollment'] = $("#"+formId+" #flexEnrollment").val();
		schoolSettingLmsDTO['schoolEnrollment'] = $("#"+formId+" #schoolEnrollment").val();
		schoolSettingLmsDTO['letterHeadImg'] = $("#"+formId+" #letterHead").val();
		schoolSettingLmsDTO['teachAgreementSign'] = $("#"+formId+" #teacherAgreementSign").val();
		schoolSettingLmsDTO['courseProviderName'] = $("#"+formId+" #coureProviderName").val();
		
	}
	schoolSettingLmsDTO['schoolId'] = schoolId;
	schoolSettingLmsDTO['moduleName'] = moduleName;
	schoolSettingLmsDTO['id'] = settingId;
	requestData['schoolSettingLmsDTO'] = schoolSettingLmsDTO;
	authentication['hash'] = getHash();authentication['schoolId'] = SCHOOL_ID;authentication['schoolUUID'] = SCHOOL_UUID;
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	
	return request;
}

function lmsProviderChagedDetails(schoolId) {
	var lmsProvider=36;
	if($('#lmsProviderId').val()=='Agilix Buzz'){
		lmsProvider=1;
	}else if($('#lmsProviderId').val()=='Odysseyware'){
		lmsProvider=2;
	}else if($('#lmsProviderId').val()=='Buzz'){
		lmsProvider=31;
	}
	hideMessage('');
	$.ajax({
		type : "GET",
		url : getURLForHTML('dashboard','school-setting-lms-details'),
		data : "SCHOOLID="+schoolId+"&lmsProviderId="+lmsProvider,
		dataType : 'html',
		cache : false,
		timeout : 600000,
		success : function(htmlContent) {
			if(htmlContent!=""){
            	var stringMessage = [];
            	stringMessage = htmlContent.split("|");
        		if(stringMessage[0] == "FAILED" || stringMessage[0] == "EXCEPTION" || stringMessage[0] == "SESSIONOUT" ){
        			if(stringMessage[0] == "SESSIONOUT"){
        				redirectLoginPage();
        			}else {
        				showMessage(true, stringMessage[1]);
        			}
        		} else {
        			$('#schoolSettingsContent').hide();
        			$('#schoolSettingsOnChangeData').html(htmlContent);
        			$('#schoolSettingsOnChangeData').show();
        			if(lmsProvider==1){
        				$('#lmsProviderId').val('Agilix Buzz')
        			}else if(lmsProvider==2){
        				$('#lmsProviderId').val('Odysseyware')
        			}else if(lmsProvider==31){
        				$('#lmsProviderId').val('Buzz')
        			}else{
        				$('#lmsProviderId').val('FLVS')
        			}
        		}
        		return false;
			}
		},
		error : function(e) {
			//showMessage(true, TECHNICAL_GLITCH);
			return false;
		}
	});
}