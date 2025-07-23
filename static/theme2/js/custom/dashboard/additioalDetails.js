function additionalModel(moduleId){
	if($('.additionalTask').length>0){
		$('#'+moduleId).modal({backdrop: 'static', keyboard: false});
	}
}
function getAdditionalDetails(userId,divId, rf){
    $.ajax({
        type : "GET",
        url : getURLForHTML('dashboard','student/get-additional-details?userId='+userId+'&rf='+rf),
        dataType : 'html',
        success : function(htmlContent) {
            if(htmlContent!=""){
                var stringMessage = [];
                stringMessage = htmlContent.split("|");
                if(stringMessage[0] == "FAILED" || stringMessage[0] == "EXCEPTION" || stringMessage[0] == "SESSIONOUT"){
                    if(stringMessage[0] == "SESSIONOUT"){
                        redirectLoginPage();
                    }else {
                        showModalMessage(1, stringMessage[1]);
                    }
                }else{ 
					$('#'+divId).html(htmlContent);
                }
                return false;
            }
        }
    });
}
function saveParents(formId, userId, rf) {
	hideMessage('');
	if(!validateRequestForParent(formId,userId)){
		return false;
	}
	$('#saveParentBtn').attr('disabled',true);
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForHTML('dashboard','student/save-parent'),
		data : JSON.stringify(getRequestForSaveParent(formId,userId, rf)),
		dataType : 'json',
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				if(data['status'] == '3'){
					redirectLoginPage();
				}else{
					showModalMessage(0, data['message']);
					$('#saveParentBtn').attr('disabled',false);
				}
			}else{
				showModalMessage(1, data['message']);
				disabledAllElement(formId, true);
				$('#saveParentBtn').hide();
				if($('.additionalTask').length<=1){
					$('#saveCloseBtn').attr('disabled',false);
					$('#saveCloseBtn').show();
				}
				$('#parentDetailsDiv').removeClass('additionalTask');
			}
		},
		error : function(e) {
			$('#saveParentBtn').attr('disabled',false);
		}
	});
}
function getRequestForSaveParent(formId,userId,rf){
	var saveParentRequest = {};
	var authentication = {};
	var saveParentDetails = {};
	var fatherDetail={};
	var motherDetail={};
	
	fatherDetail['firstName'] = $("#"+formId+" #firstNameFather").val();
	fatherDetail['middleName'] = $("#"+formId+" #middletNameFather").val();
	fatherDetail['lastName'] = $("#"+formId+" #lastNameFather").val();
	
	motherDetail['firstName'] = $("#"+formId+" #firstNameMother").val();
	motherDetail['middleName'] = $("#"+formId+" #middletNameMother").val();
	motherDetail['lastName'] = $("#"+formId+" #lastNameMother").val();
	
	saveParentDetails['requestFrom']=rf
	saveParentDetails['studentUserId']=$('#studentUserId').val()
	saveParentDetails['fatherDetail']=fatherDetail;
	saveParentDetails['motherDetail']=motherDetail;
	
	authentication['hash'] = getHash();
	authentication['schoolId'] = SCHOOL_ID;
	authentication['schoolUUID'] = SCHOOL_UUID;
	authentication['userType'] = 'STUDENT';
	authentication['userId'] = userId;
	saveParentRequest['authentication'] = authentication;
	saveParentRequest['saveParentDetails'] = saveParentDetails;
	return saveParentRequest;
}
function validateRequestForParent(formId,userId){
	if (!validateFormAscii(formId)) {
		showModalMessage(0, 'Please use the English Keyboard while providing information');
		return false
	}

	if($("#"+formId+" #firstNameFather").length){
		if ($("#"+formId+" #firstNameFather").val()=="") {
			showModalMessage(0, 'First name of father is required.');
			return false
		}
		// if ($("#"+formId+" #lastNameFather").val()=="") {
		// 	showModalMessage(0, 'Last name of father is required.');
		// 	return false
		// }
	}
	if($("#"+formId+" #firstNameMother").length){
		if ($("#"+formId+" #firstNameMother").val()=="") {
			showModalMessage(0, 'First name of mother is required.');
			return false
		}
		// if ($("#"+formId+" #lastNameMother").val()=="") {
		// 	showModalMessage(0, 'Last name of mother is required.');
		// 	return false
		// }
	}
	return true;
}

function saveStudentAddress(formId, userId, codeLabel) {
	hideMessage('');
	if(!validateRequestForStudentAddress(formId,userId, codeLabel)){
		return false;
	}
	$('#saveAddressBtn').attr('disabled',true);
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForHTML('dashboard','student/save-address'),
		data : JSON.stringify(getRequestForStudentAddress(formId,userId)),
		dataType : 'json',
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				if(data['status'] == '3'){
					redirectLoginPage();
				}else{
					showModalMessage(0, data['message']);
					$('#saveAddressBtn').attr('disabled',false);
				}
			}else{
				showModalMessage(1, data['message']);
				disabledAllElement(formId, true);
				$('#saveAddressBtn').hide();
				if($('.additionalTask').length<=1){
					$('#saveCloseBtn').attr('disabled',false);
					$('#saveCloseBtn').show();
				}
				$('#addressDetailsDiv').removeClass('additionalTask');
			}
		},
		error : function(e) {
			$('#saveAddressBtn').attr('disabled',false);
		}
	});
}
function getRequestForStudentAddress(formId,userId){
	var saveAddressRequest = {};
	var authentication = {};
	
	var signupAddress = {};
	var residentialAddress={};
	var mailingAddress={};
	
	residentialAddress['countryId'] = $("#"+formId+" #residentialAddressCountryId").val();
	residentialAddress['stateId'] = $("#"+formId+" #residentialAddressStateId").val();
	residentialAddress['cityId'] = $("#"+formId+" #residentialAddressCityId").val();
	residentialAddress['address1'] = escapeCharacters(toTitleCase($("#"+formId+" #residentialAddressAddress1").val()));
	residentialAddress['address2'] = escapeCharacters(toTitleCase($("#"+formId+" #residentialAddressAddress2").val()));
	residentialAddress['pincode'] = toTitleCase($("#"+formId+" #residentialAddressPincode").val());
	
	mailingAddress['countryId'] = $("#"+formId+" #mailingAddressCountryId").val();
	mailingAddress['stateId'] = $("#"+formId+" #mailingAddressStateId").val();
	mailingAddress['cityId'] = $("#"+formId+" #mailingAddressCityId").val();
	mailingAddress['address1'] = escapeCharacters(toTitleCase($("#"+formId+" #mailingAddressAddress1").val()));
	mailingAddress['address2'] = escapeCharacters(toTitleCase($("#"+formId+" #mailingAddressAddress2").val()));
	mailingAddress['pincode'] = toTitleCase($("#"+formId+" #mailingAddressPincode").val());
	signupAddress['sameAddress'] = $('#sameAddress').is(':checked')?'Y':'N';
	
	signupAddress['residentialAddress']=residentialAddress;
	signupAddress['mailingAddress']=mailingAddress;
	signupAddress['studentUserId']=$('#studentUserId').val()
	
	authentication['hash'] = getHash();
	authentication['schoolId'] = SCHOOL_ID;
	authentication['schoolUUID'] = SCHOOL_UUID;
	authentication['userType'] = 'STUDENT';
	authentication['userId'] = userId;
	saveAddressRequest['authentication'] = authentication;
	saveAddressRequest['signupAddress'] = signupAddress;
	return saveAddressRequest;
}
function validateRequestForStudentAddress(formId,userId,codeLabel){
	if (!validateFormAscii(formId)) {
		showModalMessage(0, 'Please use the English Keyboard while providing information');
		return false
	}
	if ($("#"+formId+" #residentialAddressAddress1").val()=="") {
		showModalMessage(0, 'Residential address Line 1 is required');
		return false
	}
	if ($("#"+formId+" #residentialAddressPincode").val()=="") {
		showModalMessage(0, 'Residential '+codeLabel+' Code is required');
		return false
	}
	if(!$("#"+formId+" #sameAddress").is(':checked')){
		if ($("#"+formId+" #mailingAddressAddress1").val()=="") {
			showModalMessage(0, 'Mailing Address Line 1 is required');
			return false
		}
		if ($("#"+formId+" #mailingAddressPincode").val()=="") {
			showModalMessage(0, 'Mailing '+codeLabel+' Code is required');
			return false
		}
	}
	return true;
}
