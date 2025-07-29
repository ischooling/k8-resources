function getURLForSmile(suffixUrl){
	return APP_BASE_URL+'common/'+suffixUrl;
}

function getURLForHTML(apiType, suffixUrl) {
	return APP_BASE_URL+apiType + '/' + suffixUrl;
}

function tabActiveStatus(tabPosition){
	signupPage=tabPosition;
	$('#tabPosition'+tabPosition).trigger('click');
}

function validateRequestForSmile() {
	var showError = 1;
	showMessageBAS('fNameError', '');
	showMessageBAS('lNameError', '');
	showMessageBAS('emailError', '');
	showMessageBAS('countryIdError', '');
	showMessageBAS('stateIdError', '');
	showMessageBAS('cityIdError', '');
	showMessageBAS('pincodeError', '');
	showMessageBAS('addressError', '');
	if ($('#fName').val() == '') {
		showMessageBAS('fNameError', 'First Name is required.');
		showError = 0;
	}
	if ($('#lName').val() == '') {
		showMessageBAS('lNameError', 'Last Name is required.');
		showError = 0;
	}
	if (!validateEmail($('#email').val())) {
		showMessageBAS('emailError', 'Email Address is either empty or invalid');
		showError = 0;
	}
	if ($('#countryId').val() == null || $('#countryId').val() == 0) {
		showMessageBAS('countryIdError', 'Country is required');
		showError = 0;
	}
	if ($('#stateId').val() == null || $('#stateId').val() == 0) {
		showMessageBAS('stateIdError', 'State is required');
		showError = 0;
	}
	if ($('#cityId').val() == null || $('#cityId').val() == 0) {
		showMessageBAS('cityIdError', 'City is required');
		showError = 0;
	}
	if ($('#pincode').val() == '') {
		showMessageBAS('pincodeError', 'Pincode is required.');
		showError = 0;
	}
	if ($('#address').val() == '') {
		showMessageBAS('addressError', 'Address is required.');
		showError = 0;
	}
	if (showError == 0) {
		return false;
	}
	return true;
}

var signupstage = 1;

function smile() {
	if (signupstage == 1) {
		if ($('#amount-input').val() != null && $('#amount-input').val() != '') {
			if ($('#amount-input').val().charAt(0) == '.') {
				return signupstage = 1;
		      }
			if ($('#amount-input').val().charAt(0) == '0') {
				return signupstage = 1;
		      }
			if (parseFloat($("#amount-input").val()) > 999999999.99) {
				return signupstage = 1;
		      }
		    if ($('#amount-input').val().includes('.')) {
		    	if ($('#amount-input').val().split('.').length != 2) {
					return signupstage = 1;
				} else {
					if ($('#amount-input').val().split('.')[1] == '') {
						return signupstage = 1;
					}
				}
			}
			signupstage = 2;
		} else {
			signupstage = 1
		}
	} else if (signupstage = 2) {
		saveSmile();
	}
}

function smilePrev() {
	signupstage = 1;
}

function saveSmile() {
	if (!validateRequestForSmile()) {
		return false;
	}
	$.ajax({
		type : "POST",
		url : getURLForSmile("buy-a-smile-activity"),
		contentType : "application/json",
		data : JSON.stringify(getRequestForSmile()),
		dataType : 'html',
		success : function(html) {
			if (html != "") {
				var obj = JSON.parse(html);
				if (obj.statusResponse.status == "FAILED"
						|| obj.statusResponse.status == "EXCEPTION"
						|| obj.statusResponse.status == "SESSIONOUT") {
					showMessageBAS('serverError', obj.statusResponse.message);
				} else {
					var obj = JSON.parse(html);
					$('#smileId').val(obj.smileId);
					callSigninStudentPay(this);
				}
			}
		},
		error : function(e) {
			console.log(true, e.responseText);
		}
	});
}

function callSigninStudentPay(formId){
	$('#callPaymentStudentModal').modal({backdrop: 'static', keyboard: false})
}

function getRequestForSmile() {
	var buyASmileRequestDTO = {};
	var buyASmileDTO = {};
	if ($('#eId').val() != null) {
		buyASmileRequestDTO['editId'] = $('#eId').val();
		buyASmileRequestDTO['uuId'] = $('#uuId').val();
	}
	buyASmileDTO['amount'] = (Math.round($('#amount-input').val() * 100) / 100).toFixed(2);
	buyASmileDTO['firstName'] = $('#fName').val();
	buyASmileDTO['lastName'] = $('#lName').val();
	buyASmileDTO['email'] = $('#email').val();
	buyASmileDTO['countryId'] = $('#countryId option:selected').val();
	buyASmileDTO['stateId'] = $('#stateId option:selected').val();
	buyASmileDTO['cityId'] = $('#cityId option:selected').val();
	buyASmileDTO['pincode'] = $('#pincode').val();
	buyASmileDTO['address'] = $('#address').val();
	buyASmileRequestDTO['buyASmileDTO'] = buyASmileDTO;
	buyASmileRequestDTO['controlType'] = "ADD";
	return buyASmileRequestDTO;
}

function callStates(formId, value, elementId) {
	hideMessage('');
	if (!validateRequestForMaster(formId, elementId)) {
		$("#"+formId+" #stateId").val(0);
		resetDropdown($("#"+formId+" #stateId"), 'Select state');
		$("#"+formId+" #cityId").val(0);
		resetDropdown($("#"+formId+" #cityId"), 'Select city');
		return false;
	}
	$("#stateId").prop("disabled", true);
	resetDropdown($("#"+formId+" #cityId"), 'Select city');
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForCommon('masters'),
		data : JSON.stringify(getRequestForMaster(formId, 'STATES-LIST', value)),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				showMessageBAS('serverError', data['message']);
			} else {
				buildDropdown(data['mastersData']['states'], $('#stateId'), 'Select state');
				if(formId=='inquiryForm'){
					$('#'+formId+' #countryCode').val($('#'+formId+' #countryId').val());
				}else if(formId=='signupStage2'){
					$('#'+formId+' #countryCode').val($('#'+formId+' #countryId option:selected').attr('dailCode'));
					$('#'+formId+' #countryCodeStudent').val($('#'+formId+' #countryId option:selected').attr('dailCode'));;
					//$('#'+formId+' #countryCodeAlternate').val($('#'+formId+' #countryId option:selected').attr('dailCode'));
				}
			}
			$("#stateId").prop("disabled", false);
		},
		error : function(e) {
			//showMessageBAS(true, e.responseText);
			$("#stateId").prop("disabled", false);
		}
	});
}

function callCities(formId, value, elementId) {
	hideMessage('');
	if (!validateRequestForMaster(formId, elementId)) {
		$("#"+formId+" #cityId").val(0);
		resetDropdown($("#"+formId+" #cityId"), 'Select city');
		return false;
	}
	$("#"+formId+" #cityId").prop("disabled", true);
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForCommon('masters'),
		data : JSON.stringify(getRequestForMaster('formId', 'CITIES-LIST', value)),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				showMessageBAS('serverError', data['message']);
			} else {
				buildDropdown(data['mastersData']['cities'], $('#cityId'), 'Select city');
			}
			$("#cityId").prop("disabled", false);
			return false;
		},
		error : function(e) {
			//showMessageBAS(true, e.responseText);
			$("#cityId").prop("disabled", false);
		}
	});
}

function hideMessage(id) {
	$('#errorHeading').html('');
	$('#statusMessage').removeClass('success-color');
	$('#statusMessage').removeClass('danger-color');
	$('#statusMessage').html('');
	$('#modalMessage').modal("hide");
}

function validateRequestForMaster(formId, elementId) {
	if($('#'+formId+ ' #'+elementId).val()=='' || $('#'+formId+ ' #'+elementId).val()<=0){
		return false;
	}
	return true;
}

function resetDropdown(dropdown, emptyMessage) {
	dropdown.html('');
	//dropdown.append('<option value="0">' + emptyMessage + '</option>');
	dropdown.append('<option disabled selected> </option>');
}

var API_VERSION = CONTEXT_PATH+'api/v1/';

function getURLForCommon(suffixUrl){
	return BASE_URL+API_VERSION + 'common' + '/' + suffixUrl;
}

function getRequestForMaster(formId, key, value, requestExtra, requestExtra1) {
	var request = {};
	var authentication = {};
	var requestData = {};
	requestData['requestKey'] = key;
	requestData['requestValue'] = value;
	if(requestExtra!=undefined){
		requestData['requestExtra'] = requestExtra;
	}
	if(requestExtra1!=undefined){
		requestData['requestExtra1'] = requestExtra1;
	}
	authentication['hash'] = getHash();authentication['schoolId'] = SCHOOL_ID;authentication['schoolUUID'] = SCHOOL_UUID;
	authentication['userType'] = 'COMMON';
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	return request;
}

function getHash() {
	return 'ajslfkjalksdf'
}

function buildDropdown(result, dropdown, emptyMessage) {
	dropdown.html('');
	if (result != '') {
		dropdown.append('<option value="0">' + emptyMessage + '</option>');
	//	dropdown.append('<option disabled selected> </option>');
		$.each(result, function(k, v) {
			if(v.extra!=null && v.extra1 !=null){
				dropdown.append('<option value="' + v.key + '">' + v.extra + ' - ' + v.extra1 + '</option>');
			}else if(v.extra!=null){
				if(v.extra=='selected'){
					dropdown.append('<option disabled selected value="' + v.key + '">'+ v.value + '</option>');
				}else if(v.extra=='non-selected'){
					dropdown.append('<option value="' + v.key + '"> ' + v.value + '</option>');
				}else{
					dropdown.append('<option value="' + v.key + '"> ' + v.value + '</option>');
				}
				
			}else{
				dropdown.append('<option value="' + v.key + '">' + v.value + '</option>');
			}
		});
	}else{
		dropdown.append('<option value="0">' + emptyMessage + '</option>');
	}
}

function showMessageBAS(elementId, message) {
	$('#'+elementId).html(message);
	if(message=''){
		$('#'+elementId).removeClass('show');
	}else{
		$('#'+elementId).addClass('show');
	}
}

function callCommonPaymentGatewaySmile(formId, module, args, callCommonPaymentGateway){
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForHTML('common','call-payment-gateway'),
		data : JSON.stringify(getRequestForCommonPayment(formId, module, args, callCommonPaymentGateway)),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				showMessageBAS('serverError', data['message']);
			} else {
				showMessageBAS('serverError', data['message']);
				window.location.replace(data['extra']);
			}
			return false;
		},
		error : function(e) {
			//showMessage(true, e.responseText);
		}
	});
}

function getRequestForCommonPayment(formId, module, args, eligiblePaymentGateway){
	var request = {};
	var authentication = {};
	var requestData = {};
	if(module=='common'){
		authentication['userType'] = module;
		authentication['userId'] = $("#smileId").val();
		var commonPaymentInfoDTO = {};
		commonPaymentInfoDTO['paymentOptionName'] = 'Online'
		commonPaymentInfoDTO['eligiblePaymentGateway'] = eligiblePaymentGateway;
		commonPaymentInfoDTO['userType'] = module;
		commonPaymentInfoDTO['moduleName'] = "common";
		commonPaymentInfoDTO['paymentTitle'] = "Change a Life";
		commonPaymentInfoDTO['paymentType'] = "annually";
		console.log("Data for Payment is :  ", commonPaymentInfoDTO);
		requestData['commonPaymentInfoDTO'] = commonPaymentInfoDTO;
	}
	authentication['hash'] = getHash();authentication['schoolId'] = SCHOOL_ID;authentication['schoolUUID'] = SCHOOL_UUID;
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	
	return request;
}

function validateEmail(email) {
	var expr = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
	return expr.test(email);
}