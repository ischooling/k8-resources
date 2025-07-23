var API_VERSION = CONTEXT_PATH+UNIQUEUUID+'/'+'api/v1/';
var API_VERSION_WITHOUT_UNIQUEID = CONTEXT_PATH+'/'+'api/v1/';
var GLOBAL_EMAIL = '';
var GRADE_CAL_RULE = {};
var DEFAULT_SEARCH_STATE=true;
var editor1;
var editor2;
var editor3;
var editor4;
var globalEntityId='';
var globalPGName='';
var TECHNICAL_GLITCH = 'Sorry for inconvenience, system has encountered technical glitch.';
var SERVICE_UNAVAILABLE='Temporarily Ticket Service is not available!';
var MAX_SIZE_LIMIT='Please upload maximum 5MB file in size.';
function redirectLoginPage(){
	//callLocationAndSelectCountryNew('continueSessionForm');
	//$('#sessionOutPermission').modal({backdrop: 'static', keyboard: false})
	console.log("school uuid ",SCHOOL_UUID);
	window.setTimeout(function(){window.location = APP_BASE_URL+"common/login/"+SCHOOL_UUID;},1000)
}
function refreshCaptcha(id){
	if(id!=undefined && id!='' && $('#'+id).length>0){
		document.images[id].src=BASE_URL+API_VERSION+'common/captcha.jpg?v='+new Date().getTime();
	}
}
function getURLForHTML(apiType, suffixUrl) {
	return APP_BASE_URL+UNIQUEUUID+'/'+apiType + '/' + suffixUrl;
}
function getURLFor(apiType, suffixUrl) {
	return BASE_URL+API_VERSION + apiType + '/' + suffixUrl;
}
function getURLForCommon(suffixUrl){
	return BASE_URL+API_VERSION + 'common' + '/' + suffixUrl;
}
function getURLForMeeting(suffixUrl){
	return BASE_URL+API_VERSION + 'meetings' + '/' + suffixUrl;
}
function logout(){
	var url = APP_BASE_URL+UNIQUEUUID+'/'+'common/logout/'+SCHOOL_UUID;
	goAheadGet(url,'');
}
function getURLForWithoutBase(apiType, suffixUrl) {
	return API_VERSION + apiType + '/' + suffixUrl;
}
function getURLForWithoutUnique(apiType, suffixUrl) {
	return BASE_URL+API_VERSION_WITHOUT_UNIQUEID + apiType + '/' + suffixUrl;
}




function getURLForSignup(suffixUrl, module){
	var apiType='common';
	if(module==undefined || module==null){
		if(moduleId=='STUDENT'){
			apiType='student';
		}else if(moduleId=='TEACHER'){
			apiType='teacher';
		}else if(moduleId=='SCHOOL' || moduleId=='SCHOOL_B2B'){
			apiType='school';
		}else if(moduleId=='COMMON'){
			apiType='common';
		}
	}else{
		apiType=module.toLowerCase();

	}
	return API_VERSION + apiType + '/' + suffixUrl;
}

$(document).ready(function() {
	if($('[data-toggle="tooltip"]').length > 0){
		$('[data-toggle="tooltip"]').tooltip();
	}

//	$('select[multiple].active.3col').multiselect({
//		columns:2,
//		placeholder: 'Optional Subject',
//		search: true,
//		searchOptions: {
//		    'default': 'Search Subjects'
//		},
//		selectAll: false,
//	});


	$("#login-btn").click(function(event){
		event.preventDefault();
		$("#signupDiv").css("margin-left","100%").css("width","100%").css("transition","0.3s");
		$("#loginDiv").fadeIn(100);
		$("#loginDiv").css("margin-left","0px").css("width","100%").css("transition","0.3s");
		$('#moduleNme').html('Student Login');

	});

	$("#signup-btn").click(function(event){
		event.preventDefault();
		$("#loginDiv").css("margin-left","-100%").css("width","100%").css("transition","0.3s");
		$("#signupDiv").fadeIn(100);
		$("#signupDiv").css("margin-left","0px").css("width","100%").css("transition","0.3s");
		$('#moduleNme').html('Student Registration');
	});
	$('.panel-heading a').click(function() {
	    $('.panel-heading').removeClass('active');
	    if(!$(this).closest('.panel').find('.panel-collapse').hasClass('in'))
	        $(this).parents('.panel-heading').addClass('active');
	});


	function toggleIcon(e) {
	    $(e.target)
	        .prev('.panel-heading')
	        .find(".more-less")
	        .toggleClass('glyphicon-plus glyphicon-minus');
	}
	$('.panel-group').on('hidden.bs.collapse', toggleIcon);
	$('.panel-group').on('shown.bs.collapse', toggleIcon);

});
function setPagePosition(position){
	signupPage=position;
}
function increasePosition(){
	signupPage = signupPage+1;
}
function decresePosition(){
	console.log('signupPage: '+signupPage+' - '+' signupSubPage1: '+signupSubPage1)
	if(signupPage==6){
		if($("#standardId5").val()>=11 && $("#standardId5").val()<=17){
			signupSubPage1=3;
			signupPage = signupPage-1;
			tabActiveStatus(signupPage);
		}else{
			if(signupSubPage1==1 || signupSubPage1==2){

			}else{
				if($("#standardId5").val()<4){
					signupSubPage1=2;
				}else{
					signupSubPage1=1;
				}
			}
			if(signupSubPage1==1){
				showOne();
			}else if(signupSubPage1==2){
				showTwo();
			}
			signupPage = signupPage-1;
			tabActiveStatus(signupPage);
		}
	}else if(signupPage==5){
		if(SCHOOL_ID==1){
			if($("#standardId5").val()>=11 && $("#standardId5").val()<=17){
				signupPage = signupPage-1;
				tabActiveStatus(signupPage);
			}else{
				if(signupSubPage1==4){
					if(!elligibleForAPCourse){
						signupSubPage1=2;
					}else{
						signupSubPage1=3;
					}
				}else if(signupSubPage1==3){
					showTwo();
					signupSubPage1=2;
				}else if(signupSubPage1==2){
					if($("#standardId5").val()<4){
						signupPage = signupPage-1;
						tabActiveStatus(signupPage);
					}else{
						signupSubPage1=1;
						showOne();
						tabActiveStatus(signupPage);
					}
				}else if(signupSubPage1==1){
					signupPage = signupPage-1;
					tabActiveStatus(signupPage);
				}
			}
		}else{
			signupPage = signupPage-2;
			tabActiveStatus(signupPage);
		}
		$('#signupSubPage1').val(signupSubPage1);
	}else{
		if(signupPage<=1){
			signupPage=1;
		}else if(signupPage==2){
			if(signupType=='Offline' || signupType=='Online-Flex'){
				signupPage = signupPage-1;
			}else{

			}
		}else{
			signupPage = signupPage-1;
			if(moduleId=='SCHOOL_B2B'){
				$('#signupStage2 #declConfirmation').prop('checked', false);
			}
		}
		tabActiveStatus(signupPage);
	}
	$('#signupSubPage1').val(signupSubPage1);
	console.log('signupPage : '+signupPage);
}

function showModalMessage(isWarnig, message, id){
	hideModalMessage(id);
	if (isWarnig) {
		$('#modalMessageNew').addClass('failure text-danger');
		$('#modalMessageNew1').addClass('failure text-danger');
	}else{
		$('#modalMessageNew').addClass('success text-success');
		$('#modalMessageNew1').addClass('success text-success');
	}
	$('#modalMessageNew').html(message);
	$('#modalMessageNew1').html(message);
}
function hideModalMessage(id){
	$('#modalMessageNew').html('');
	$('#modalMessageNew').removeClass('success text-success');
	$('#modalMessageNew').removeClass('failure text-danger');
	$('#modalMessageNew1').html('');
	$('#modalMessageNew1').removeClass('success text-success');
	$('#modalMessageNew1').removeClass('failure text-danger');
}
function showMessage(isWarnig, message, id) {
	window.scrollTo({ top: 100, left: 100, behavior: 'smooth' });
	if (isWarnig) {
		$('#errorHeading').html('Error! Be focus on work');
		$('#statusMessage').addClass('danger-color');
		$('#statusMessage').removeClass('success-color');
	} else {
		$('#errorHeading').html('Information!');
		$('#statusMessage').removeClass('danger-color');
		$('#statusMessage').addClass('success-color');
	}
	$('#statusMessage').html(message);
	$('#modalMessage').modal("show");
	setTimeout(function(){
		$('#modalMessage').modal("hide");
	}, 1500);
	if(signupPage>0){
		setTimeout(function(){
			$('#modalMessage').modal("hide");
		}, 3000);
		setTimeout(function(){
			tabActiveStatus(signupPage);
		}, 1);
	}
}
function hideMessage(id) {
	$('#errorHeading').html('');
	$('#statusMessage').removeClass('success-color');
	$('#statusMessage').removeClass('danger-color');
	$('#statusMessage').html('');
	$('#modalMessage').modal("hide");
}
function showMessageRequestDemoPage(isWarnig, message, id,fid) {
//	$('#'+id).parent().removeClass('error-message-hide');
	$('#'+id).parent().addClass('show-message');
	if(fid.length>0){
		$('#'+fid).addClass('highlight-field').parent().find('.select2-container--default').addClass('highlight-field');
	}
	$('#'+id).html(message);
}
function hideMessageRequestDemoPage(id,fid){
	$('#'+id).parent().removeClass('show-message');
	if(fid){
		$('#'+fid).removeClass('highlight-field').parent().find('.select2-container--default').removeClass('highlight-field');
	}
	//	$('#'+id).parent().addClass('error-message-hide');
	$('#'+id).html('');
}
function showMessageRequestDemoPageWithTimeout(isWarnig, message, id,fid) {
	$('#'+id).addClass('show-message');
	if(fid!=''){
		$('#'+fid).addClass('highlight-field');
	}
	$('#'+id).html(message);
	setTimeout(function(){
//		hideMessageRequestDemoPage(id,fid);
		$('#'+id).removeClass('show-message');
	}, 5000);
}
function showHideDiv(isHide, divId) {
	if (isHide) {
		$('#' + divId).removeClass('show');
		$('#' + divId).addClass('hide');
	} else {
		$('#' + divId).removeClass('hide');
		$('#' + divId).addClass('show');
	}
}
function getHash() {
	return Math.random().toString(36);
}
function buildDropdown(result, dropdown, emptyMessage) {
	dropdown.html('');
	if (result != '') {
	//	dropdown.append('<option value="0">' + emptyMessage + '</option>');
	//	dropdown.append('<option disabled selected> </option>');
		$.each(result, function(k, v) {
			if(v.extra!=null && v.extra1 !=null && v.extra2 !=null){
				dropdown.append('<option value="' + v.key + '" data-fullcourseid="'+v.extra2+'" data-courseProId="'+v.extra3+'">' + v.extra + ' - ' + v.extra1 + '</option>');
			}else if(v.extra!=null && v.extra1 !=null){
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

function resetDropdown(dropdown, emptyMessage) {
	dropdown.html('');
	//dropdown.append('<option value="0">' + emptyMessage + '</option>');
	//dropdown.append('<option disabled selected> </option>');
}

function customLoader(needToShow){
	if(needToShow){
		$('#commonloaderId').removeClass('hide');
		$('#commonloaderBody').addClass('loader');
		$('#commonloaderId').addClass('loader-bg');
		$('#commonloaderId').show();
	}else{
		$('#commonloaderBody').removeClass('loader');
		$('#commonloaderId').removeClass('loader-bg');
		$('#commonloaderId').addClass('hide');
		$('#commonloaderId').hide();
	}
}
$.ajaxSetup({
    beforeSend: function (xhr){
       xhr.setRequestHeader("UNIQUEUUID",UNIQUEUUID);
    }
});
$( document ).ajaxStart(function() {
	customLoader(true);
});
//$( document ).ajaxSend(function() {
//	customLoader(true);
//});
//$( document ).ajaxSuccess(function() {
//	customLoader(false);
//});
$(document).ajaxError(
	function(event, jqxhr, settings, exception) {
		console.log("event is" + event + "jqxhr is" + jqxhr + "settings" + settings + "exception is" + exception);
		customLoader(false);
		if (isJson(jqxhr.responseText)) {
			var parseResponse = JSON.parse(jqxhr.responseText);
			console.log("parse Response is:" + jqxhr.status);
			var hasProperty = parseResponse.hasOwnProperty("message");
			if (hasProperty) {
				showMessage(true, parseResponse.message)
			}
			else {
				showMessage(true, TECHNICAL_GLITCH);
			}

		} else {
			showMessage(true, TECHNICAL_GLITCH);
		}
});
//$( document ).ajaxComplete(function() {
//	customLoader(false);
//});
$( document ).ajaxStop(function() {
	customLoader(false);
});
function tabActiveStatus(tabPosition){
	signupPage=tabPosition;
	$('#tabPosition'+tabPosition).trigger('click');
}

function goAheadGet(url, hash) {
	var form = $('<form action="' + url + '" method="GET">'
			+ '<input type="hidden" name="hash" id="hash" value="' + hash + '" />'
			+ '</form>');
	$('body').append(form);
	$(form).submit();
}
function goAhead(url, hash) {
	var form = $('<form action="' + url + '" method="POST">'
			+ '<input type="hidden" name="hash" id="hash" value="' + hash + '" />'
			+ '</form>');
	$('body').append(form);
	$(form).target = "_blank";
	$(form).submit();
}

function callEmailCheck(formId, moduleId) {
	hideMessage('');
	if(!$("#"+formId+" #email").val()){
		return true;
	}
	if(!validateRequestForEmailCheck(formId)){
		return false;
	}
	$("#email").prop("disabled", true);
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForCommon('is-user-available'),
		data : JSON.stringify(getRequestForEmailCheck(formId,moduleId)),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				if(data['statusCode'] == '0043') {
					$('#allReadyEmail #emailNotVerify').show();
					$('#allReadyEmail #emailVerify').hide();
					$('#allReadyEmail #userDeclined').hide();
					$('#allReadyEmail').modal('toggle');
				}else if(data['statusCode'] == '0044') {
					$('#allReadyEmail #emailNotVerify').hide();
					$('#allReadyEmail #emailVerify').show();
					$('#allReadyEmail #userDeclined').hide();
					$('#allReadyEmail').modal('toggle');
				}else if(data['statusCode'] == '02') {
					$('#allReadyEmail #emailNotVerify').hide();
					$('#allReadyEmail #emailVerify').hide();
					$('#allReadyEmail #userDeclined').show();
					$('#allReadyEmail').modal('toggle');
				}else{
					showMessage(true, data['message']);
				}
			}
			$("#"+formId+" #email").prop("disabled", false);
			//refreshCaptcha('captchaImage');
			return false;
		},
		error : function(e) {
			//showMessage(true, e.responseText);
			console.log("ERROR : ", e);
			$("#"+formId+" #email").prop("disabled", false);
		}
	});
}

function validateRequestForEmailCheck(formId){
	if (!validateEmail($("#"+formId+" #email").val())) {
		$("#"+formId+" #email").css('color', '#a9a9a9');
		showMessage(false, 'Email is either empty or invalid');
		return false
	}
	return true;
}

function getRequestForEmailCheck(formId, moduleId){
	var request = {};
	var authentication = {};
	var requestData = {};
	requestData['requestKey'] = 'EMAIL-AVAILABLE';
	requestData['requestValue'] = $("#"+formId+" #email").val();
	authentication['hash'] = getHash();authentication['schoolId'] = SCHOOL_ID;authentication['schoolUUID'] = SCHOOL_UUID;
	authentication['userType'] = moduleId;
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	return request;
}

function emailCheck(emailId, moduleId) {
	var result="";
	hideMessage('');
	if (!validateEmail(emailId)) {
		showMessage(false, 'Email is either empty or invalid');
		return false
	}
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForCommon('is-user-available'),
		data : JSON.stringify(getCallRequestForEmailCheck(emailId, moduleId)),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		async:false,
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				showMessage(true, "Email already exist");
				result=false;
			}else{
				result=true;
			}
		},
		error : function(e) {
			//showMessage(true, e.responseText);
			console.log("ERROR : ", e);
		}
	});
	return result;
}

function getCallRequestForEmailCheck(emailId, module,userRole){
	var request = {};
	var authentication = {};
	var requestData = {};
	requestData['requestKey'] = 'EMAIL-AVAILABLE';
	requestData['requestValue'] = emailId;
	requestData['requestExtra1'] = userRole;
	authentication['hash'] = getHash();authentication['schoolId'] = SCHOOL_ID;authentication['schoolUUID'] = SCHOOL_UUID;
	authentication['userType'] = module;
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	return request;
}


function callCities(formId, value, elementStateId, elementCityIdAsParam) {
	var elementCityId='cityId';
	if(elementCityIdAsParam==undefined || elementCityIdAsParam==''){
		elementCityId='cityId';
	}else{
		elementCityId=elementCityIdAsParam;
	}
	hideMessage('');
	if (!validateRequestForMaster(formId, elementStateId)) {
		$("#"+formId+" #"+elementCityId).val(0).trigger('change');
		resetDropdown($("#"+formId+" #"+elementCityId), 'Select city');
		return false;
	}
	$("#"+formId+" #"+elementCityId).prop("disabled", true);
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
				showMessage(true, data['message']);
			} else {
				buildDropdown(data['mastersData']['cities'], $('#'+elementCityId), 'Select city');
			}
			$("#"+elementCityId).prop("disabled", false);
			return false;
		},
		error : function(e) {
			//showMessage(true, e.responseText);
			$("#"+elementCityId).prop("disabled", false);
		}
	});
}
function getAllCountryTimezone(formId, value, elementId) {
	hideMessage('');
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForCommon('masters'),
		data : JSON.stringify(getRequestForMaster(formId, 'TIMEZONE-LIST', value)),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				showMessage(true, data['message']);
			} else {
				$.each(data['mastersData']['countryTimeZones'], function(k, v) {
					$("#"+formId+" #"+elementId).append('<option custom_timezone_id="'+v.key+'" value="' + v.value + '">(' + v.extra + ') - ' + v.extra1 +'/'+ v.extra3+ '</option>');
				});
				if($("#"+formId+"Alternet #"+elementId).length){
					$("#"+formId+"Alternet #"+elementId).html($("#"+formId+" #"+elementId).html());
				}
			}
		}
	});
}
function callISDCode(formId, value, elementId) {
	$("#"+formId+" #"+elementId).html('<option value="">Select ISD code</option>');
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForCommon('masters'),
		data : JSON.stringify(getRequestForMaster(formId, 'COUNTRIES-LIST', value)),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				showMessage(true, data['message']);
			} else {
				$.each(data['mastersData']['countries'], function(k, v) {
					$("#"+formId+" #"+elementId).append('<option value="' + v.extra1 + '">' + v.extra1 + ' ' + v.value + '</option>');
				});
			}
			if($("#"+formId+"Alternet #"+elementId).length){
				$("#"+formId+"Alternet #"+elementId).html($("#"+formId+" #"+elementId).html());
			}
			callLocationAndSelectCountryNew(formId);
		}
	});
}
function callCountries(formId, value, elementId, elementStateIdAsParam) {
	var elementStateId='stateId';
	if(elementStateIdAsParam==undefined || elementStateIdAsParam==''){
		elementStateId='stateId';
	}else{
		elementStateId=elementStateIdAsParam;
	}
	$("#"+formId+" #"+elementId).html('<option value="">Select country*</option>');
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForCommon('masters'),
		data : JSON.stringify(getRequestForMaster(formId, 'COUNTRIES-LIST', value)),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				showMessage(true, data['message']);
			} else {
				$.each(data['mastersData']['countries'], function(k, v) {
					$("#"+formId+" #"+elementStateId).append('<option value="' + v.key + '">' + v.value + '</option>');
				});
			}
			if($("#"+formId+"Alternet #"+elementStateId).length){
				$("#"+formId+"Alternet #"+elementStateId).html($("#"+formId+" #"+elementId).html());
			}
		}
	});
}
function callStates(formId, value, elementId, elementStateIdAsParam, elementCityIdAsParam) {
	var elementCityId='cityId';
	if(elementCityIdAsParam==undefined || elementCityIdAsParam==''){
		elementCityId='cityId';
	}else{
		elementCityId=elementCityIdAsParam;
	}
	var elementStateId='stateId';
	if(elementStateIdAsParam==undefined || elementStateIdAsParam==''){
		elementStateId='stateId';
	}else{
		elementStateId=elementStateIdAsParam;
	}
	hideMessage('');
	if (!validateRequestForMaster(formId, elementId)) {
		$("#"+formId+" #"+elementStateId).val(0);
		resetDropdown($("#"+formId+" #"+elementStateId), 'Select state');
		$("#"+formId+" #"+elementCityId).val(0);
		resetDropdown($("#"+formId+" #"+elementCityId), 'Select city');
		return false;
	}
	$("#"+elementStateId).prop("disabled", true);
	resetDropdown($("#"+formId+" #"+elementCityId), 'Select city');
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
				showMessage(true, data['message']);
			} else {
				buildDropdown(data['mastersData']['states'], $('#'+elementStateId), 'Select state');
				if(formId=='inquiryForm'){
					$('#'+formId+' #countryCode').val($('#'+formId+' #countryId').val());
				}else if(formId=='signupStage2'){
					$('#'+formId+' #countryCode').val($('#'+formId+' #countryId option:selected').attr('dailCode'));
					$('#'+formId+' #countryCodeStudent').val($('#'+formId+' #countryId option:selected').attr('dailCode'));;
					//$('#'+formId+' #countryCodeAlternate').val($('#'+formId+' #countryId option:selected').attr('dailCode'));
				}
			}
			$("#"+elementStateId).prop("disabled", false);
		},
		error : function(e) {
			$("#"+elementStateId).prop("disabled", false);
		}
	});
}

function validateRequestForMaster(formId, elementId) {
	if($('#'+formId+ ' #'+elementId).val()=='' || $('#'+formId+ ' #'+elementId).val()<=0){
		return false;
	}
	return true;
}

function callForResetPassword(formId, moduleId) {
	hideMessage('');
//	if($('#password').val()=='' && $('#resetPassword').val()==''){
//		showMessage(true, "Fields are not valid");
//		return false;
//	}else if($('#password').val()!=$('#resetPassword').val()){
//		showMessage(true, "Password does not match.");
//		return false;
//	}
	$.ajax({
		type : "POST",
		url : getURLForCommon('reset-password'),
		contentType : "application/json",
		data : JSON.stringify(getRequestForReset(formId, moduleId)),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				showMessage(true, data['message']);

			} else {
				//showMessage(false, data['message']);
				if(data['statusCode'] == '0024'){
					showMessage(true, data['message']);
					redirectLoginPage();
				}else{
					showMessage(true, data['message']);
				}

			}
			return false;
		},
		error : function(e) {
			//showMessage(true, e.responseText);
			console.log("ERROR : ", e);
		}
	});
}

function getRequestForReset(formId, moduleId){
	var request = {};
	var authentication = {};
	var requestData = {};
	var changePasswordDTO = {};
	changePasswordDTO['password'] = $("#" + formId + " #password").val();
	changePasswordDTO['confirmPassword'] = $("#" + formId + " #confirmPassword").val();
	requestData['changePasswordDTO'] = changePasswordDTO;
	authentication['hash'] = getHash();authentication['schoolId'] = SCHOOL_ID;authentication['schoolUUID'] = SCHOOL_UUID;
	authentication['userType'] = moduleId;
	authentication['userId'] = $("#" + formId + " #userId").val();
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	return request;
}

function callForEmailForgot(formId, moduleId) {
	hideMessage('');
	if(!validateForEmailForgot(formId)){
		return false;
	}
	//$("#resendEmail").prop("disabled", true);
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForCommon('forgot-password'),
		data : JSON.stringify(getRequestForForgot(formId, moduleId)),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				//showMessage(true, data['message']);
				if(data['statusCode'] == '0047') {

					$('#allReadyEmail #emailNotVerify').html(data['message']);
					$('#allReadyEmail #emailNotVerify').show();
					$('#allReadyEmail #emailVerify').hide();
					$('#allReadyEmail #userDeclined').hide();
					$('#allReadyEmail').modal('toggle');
				}else{
					showMessage(true, data['message']);
				}
			} else {
				$("#forgotPassword #emailForgotid").val('');
				$("#forgotPassword").modal('hide');
				showMessage(false, data['message']);

			}
			//$("#resendEmail").prop("disabled", false);
			return false;
		},
		error : function(e) {
			//showMessage(true, e.responseText);
			console.log("ERROR : ", e);
			//$("#resendEmail").prop("disabled", false);
		}
	});
}

function validateForEmailForgot(formId){
	//GLOBAL_EMAIL
	if (!validateEmail($("#"+formId+" #emailid").val())) {
		$("#"+formId+" #emailid").css('color', '#a9a9a9');
		showMessage(false, 'Please enter a valid email address.');
		return false
	}
	return true;
}

function getRequestForForgot(formId, moduleId){
	var request = {};
	var authentication = {};
	var requestData = {};
	requestData['requestKey'] = 'FORGOT-PASSWORD';
	requestData['requestValue'] = $("#"+formId+" #emailForgotid").val();
	authentication['hash'] = getHash();authentication['schoolId'] = SCHOOL_ID;authentication['schoolUUID'] = SCHOOL_UUID;
	authentication['userType'] = moduleId;
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	return request;
}

function callForEmailResend(emailId, moduleId, sendStatus) {
	hideMessage('');
	if(!validateForEmailResend(emailId)){
		return false;
	}
	$("#resendEmail").prop("disabled", true);
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForCommon('resend-email-verification'),
		data : JSON.stringify(getRequestForEmailResend(emailId,moduleId, sendStatus)),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				if (data['statusCode'] == '0022') {
					$('#emialLimit #emailLimitText').html(data['message']);
					$('#emialLimit').modal('toggle');
				}else{
					showMessage(true, data['message']);
				}
			}else {
				showMessage(false, data['message']);
			}
			$("#resendEmail").prop("disabled", false);
			return false;
		},
		error : function(e) {
			//showMessage(true, e.responseText);
			console.log("ERROR : ", e);
			$("#resendEmail").prop("disabled", false);
		}
	});
}

function validateForEmailResend(emailId){
	//GLOBAL_EMAIL
	if (!validateEmail(emailId)) {
		showMessage(false, 'Email is either empty or invalid');
		return false
	}
	return true;
}

function getRequestForEmailResend(emailId, moduleId, sendStatus){
	var request = {};
	var authentication = {};
	var requestData = {};
	requestData['requestKey'] = 'EMAIL-RESEND';
	requestData['requestValue'] =emailId;
	requestData['requestExtra'] =sendStatus;
	authentication['hash'] = getHash();authentication['schoolId'] = SCHOOL_ID;authentication['schoolUUID'] = SCHOOL_UUID;
	authentication['userType'] = moduleId;
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	return request
}

function validateRequestForContact(formId) {

	if ($("#"+formId+" #countryId").val()==0 || $("#"+formId+" #countryId").val()==null) {
		showMessage(true, 'Country is required');
		return false
	}
	if ($("#"+formId+" #stateId").val()==0 || $("#"+formId+" #stateId").val()==null) {
		showMessage(true, 'State is required');
		return false
	}
	if ($("#"+formId+" #cityId").val()==0 || $("#"+formId+" #cityId").val()==null) {
		showMessage(true, 'City is required');
		return false
	}
	if ($("#"+formId+" #name").val()=="") {
		showMessage(true, 'Name is required');
		return false
	}

	if (!validateEmail($("#" + formId + " #email").val())) {
		showMessage(false, 'Email is either empty or invalid');
		return false
	}
	if ($("#"+formId+" #countryCode").val()==0 ) {
		showMessage(true, 'Country Code is required');
		return false
	}

	if ($("#"+formId+" #contactNumber").val()==0) {
		showMessage(true, 'Contact Number is required');
		return false
	}
	if ($("#"+formId+" #contactDescription").val()==0) {
		showMessage(true, 'Contact Description is required');
		return false
	}


	if (!validateCaptcha($("#" + formId + " #captcha").val())) {
		showMessage(false, 'Either captcha is empty or invalid');
		return false
	}
	return true;
}

function getRequestForContact(formId, moduleId) {
	var request = {};
	var authentication = {};
	var requestData = {};
	var contactUsDTO = {};
	contactUsDTO['countryId'] = $("#" + formId + " #countryId").val();
	contactUsDTO['stateId'] = $("#" + formId + " #stateId").val();
	contactUsDTO['cityId'] = $("#" + formId + " #cityId").val();
	contactUsDTO['name'] = $("#" + formId + " #name").val();
	contactUsDTO['email'] = $("#" + formId + " #email").val();
	contactUsDTO['isdCode'] = $("#" + formId + " #countryCode").val();
	contactUsDTO['contactNumber'] = $("#" + formId + " #contactNumber").val();
	contactUsDTO['contactDescription'] = $("#" + formId + " #contactDescription").val();
	contactUsDTO['captcha'] = $("#" + formId + " #captcha").val();
	requestData['contactUsDTO'] = contactUsDTO;
	authentication['hash'] = getHash();authentication['schoolId'] = SCHOOL_ID;authentication['schoolUUID'] = SCHOOL_UUID;
	authentication['userType'] = moduleId;
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	console.log("request "+request);
	return request;
}

function callUserContact(formId, moduleId) {
	hideMessage('');
	if (!validateRequestForContact(formId)) {
		return false;
	}
	$("#login").prop("disabled", true);
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForCommon('contact'),
		data : JSON.stringify(getRequestForContact(formId, moduleId)),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				refreshCaptcha('captchaImage');
				showMessage(true, data['message']);
			} else {
				//customLoader(true);
				showMessage(false, data['message']);
				// LOGIC TO DISPLAY DASHBOARD
				// LOGIC TO DISPLAY SIGN-PROCESS
			}
			$("#login").prop("disabled", false);
			return false;
		},
		error : function(e) {
			//showMessage(true, e.responseText);
			$("#login").prop("disabled", false);
		}
	});
}

function disabledBackButton(){
	history.pushState(null, null, location.href);
	window.onpopstate = function () {
		history.go(1);
	};
}
//disable back button
/*
window.onload = function () {
    if (typeof history.pushState === "function") {
        history.pushState("jibberish", null, null);
        window.onpopstate = function () {
            history.pushState('newjibberish', null, null);
        };
    } else {
        var ignoreHashChange = true;
        window.onhashchange = function () {
            if (!ignoreHashChange) {
                ignoreHashChange = true;
                window.location.hash = Math.random();
            }else {
                ignoreHashChange = false;
            }
        };
    }
};
*/
//upload document function

function bindFileUpload(uploadIndex, uploadCategoryId, uploadUserId){
	$('#fileupload'+uploadIndex).fileupload({
		formData: {uploadCategory: uploadCategoryId, uploadUserId: uploadUserId},
		url :  APP_BASE_URL+UNIQUEUUID+'/'+'api/upload',
		dataType : 'json',
		type: "POST",
		enctype: 'multipart/form-data',
		add: function(e, data) {
            var uploadErrors = [];
            var acceptFileTypes = /^image\/(png|jpe?g)$/i;
        		var acceptFileTypesPDF = /^application\/pdf$/i;
            var isError = false;
            if(data.originalFiles[0]['type'].length
            		&& ( acceptFileTypes.test(data.originalFiles[0]['type'])
            				|| acceptFileTypesPDF.test(data.originalFiles[0]['type']))  ) {

            }else{
            		isError = true;
            }
//            else{
//
//	            	if(data.originalFiles[0]['type'].length && !acceptFileTypes.test(data.originalFiles[0]['type'])) {
//	            		isError = true;
//	            	}
//            }
            if(isError){
            		uploadErrors.push('Please upload files in following formats (jpg, jpeg, pdf or png).');
            }
            if(data.originalFiles.length && data.originalFiles[0]['size'] > 5242880) {
                uploadErrors.push(MAX_SIZE_LIMIT);
                isError = true;
            }
            if(uploadErrors.length > 0) {
                showMessage(true, uploadErrors.join("\n"));
                return false;
            }
        	data.process().done(function () {
                data.submit();
            });
		},
		start: function (e) {
//			console.log(uploadIndex+' start '+e);
			$('#fileupload'+uploadIndex+'Span').html('')
			$('#fileupload'+uploadIndex+'Progress .progress-bar').css('width', 0 + '%');
			$('#fileupload'+uploadIndex+'ProgressStatus').removeClass('progress-bar-success').removeClass('progress-bar-danger');
		},
		send: function (e, data) {
//			console.log(uploadIndex+' send '+e+" = "+data);
			$('#fileupload'+uploadIndex+'Progress .progress-bar').css('width', 5 + '%');
		},
		done : function(e, data) {
//			console.log(uploadIndex+' done '+e+" = "+data);
			if(data.result.status==0){
//				$('#fileupload'+uploadIndex+'Progress .progress-bar').css('width', 100 + '%');
				//DISPLAY MESSAGE FORM SERVER SIDE data.resutl.message
				$('#fileupload'+uploadIndex+'ProgressStatus').removeClass('progress-bar-success').addClass('progress-bar-danger');
			}else{
				$.each(data.result.uploadFiles, function(index, file) {
					//console.log(uploadIndex+' done'+index+" = "+file+' == '+file.fileName);
					if(file.status==1){
						var removeClassName ='';
						if(uploadIndex==1){
							removeClassName=('fa fa-user');
						}else if(uploadIndex==2){
							removeClassName=('fa fa-calendar');
						}else if(uploadIndex==3){
							removeClassName=('fa fa-home');
						}else if(uploadIndex==4){
							removeClassName=('fa fa-image');
						}else if(uploadIndex==5){
							removeClassName=('fa fa-graduation-cap');
						}
						$('#fileupload'+uploadIndex+'Response').removeClass(removeClassName);
						$('#fileupload'+uploadIndex+'Response').removeClass('label-error').addClass('fa fa-check-circle green');
						if($('#fileupload'+uploadIndex+'Span').html()==''){
							$('#fileupload'+uploadIndex+'Span').html(file.fileName);
						}else{
							$('#fileupload'+uploadIndex+'Span').html($('#fileupload'+uploadIndex+'Span').html()+','+file.fileName);
						}
						if(uploadIndex==1){
							$('.profile-pic').attr('src', FILE_UPLOAD_PATH+file.fileName);
						}
					}
				});
			}
		},
		progressall : function(e, data) {
//			console.log(uploadIndex+' progressall '+e+" = "+data);
			$('#fileupload'+uploadIndex+'ProgressStatus').removeClass('label-error').addClass('fa fa-check-circle green');
			//var progress = parseInt(data.loaded / data.total * 100, 10);
			$('#fileupload'+uploadIndex+'Progress .progress-bar').css('width', 100 + '%');
		},
		fail: function (e, data) {
//			console.log(uploadIndex+' fail '+e+" = "+data);
//				console.log(uploadIndex+' fail '+index+" = "+file+' == '+file.name);
				//$('#fileupload'+uploadIndex+'Progress .progress-bar').css('width', 100 + '%');
				$('#fileupload'+uploadIndex+'ProgressStatus').addClass('label-error');
				showMessage(true, MAX_SIZE_LIMIT);
		}
	}).prop('disabled', !$.support.fileInput).parent().addClass($.support.fileInput ? undefined : 'disabled');
}
function bindFileUploadNew(uploadIndex, uploadCategoryId, uploadUserId){
	console.log('dd');
	$('#'+uploadIndex).fileupload({
		formData: {uploadCategory: uploadCategoryId, uploadUserId: uploadUserId},
		url : APP_BASE_URL+UNIQUEUUID+'/'+'api/upload',
		dataType : 'json',
		type: "POST",
		enctype: 'multipart/form-data',
		add: function(e, data) {
            var uploadErrors = [];
            var acceptFileTypes = /^image\/(png|jpe?g)$/i;
        		var acceptFileTypesPDF = /^application\/pdf$/i;
            var isError = false;
            if(data.originalFiles[0]['type'].length
            		&& ( acceptFileTypes.test(data.originalFiles[0]['type'])
            				|| acceptFileTypesPDF.test(data.originalFiles[0]['type']))  ) {

            }else{
            		isError = true;
            }
//            else{
//
//	            	if(data.originalFiles[0]['type'].length && !acceptFileTypes.test(data.originalFiles[0]['type'])) {
//	            		isError = true;
//	            	}
//            }
            if(isError){
            		uploadErrors.push('Please upload files in following formats (jpg, jpeg, pdf or png).');
            }
            if(data.originalFiles.length && data.originalFiles[0]['size'] > 5242880) {
                uploadErrors.push(MAX_SIZE_LIMIT);
                isError = true;
            }
            if(uploadErrors.length > 0) {
                showMessage(true, uploadErrors.join("\n"));
                return false;
            }
        	data.process().done(function () {
                data.submit();
            });
		},
		start: function (e) {
			console.log('start');
			$("#"+uploadIndex).parents(".file-tab").find("span.fileName").text();
		},
		send: function (e, data) {
			console.log('send');
		},
		done : function(e, data) {
			console.log('done');
			if(data.result.status==0){
				//$("#"+uploadIndex).parents(".file-tab").find("span.fileName").text();
			}else{
				$.each(data.result.uploadFiles, function(index, file) {
					if(file.status==1){
						console.log('aya');
						console.log('file: '+file);
						$("#"+uploadIndex).parents(".file-tab").find("span.fileName").text(file.fileName);
						console.log($("#"+uploadIndex).parents(".file-tab").find("span.fileName").text(file.fileName));
						//console.log('type'+data.originalFiles[0]['type']);
						if(data.originalFiles[0]['type']=='application/pdf'){
							$("#"+uploadIndex).parents(".file-tab").find("img").attr('src', PATH_FOLDER_IMAGE+'pdf.jpg');
						}

					}
				});
			}
		},
		progressall : function(e, data) {
			console.log('progressall');
		},
		fail: function (e, data) {
			console.log('fail');
			$('#fileupload'+uploadIndex+'Progress .progress-bar').css('width', 100 + '%');
			$('#fileupload'+uploadIndex+'ProgressStatus').removeClass('progress-bar-success').addClass('progress-bar-danger');
			showMessage(true, MAX_SIZE_LIMIT);
		}
	}).prop('disabled', !$.support.fileInput).parent().addClass($.support.fileInput ? undefined : 'disabled');
}
function bindFileUploadNew1(uploadIndex, uploadCategoryId, uploadUserId, uploadMethodType){
	$('[data-toggle="tooltip"]').tooltip({ trigger: "hover" });
	$('#fileupload'+uploadIndex).fileupload({
		formData: {uploadCategory: uploadCategoryId, uploadUserId: uploadUserId},
		url : APP_BASE_URL+UNIQUEUUID+'/'+'api/upload',
		dataType : 'json',
		type: "POST",
		enctype: 'multipart/form-data',
		add: function(e, data) {
            var uploadErrors = [];
            var acceptFileTypes = /^image\/(png|jpe?g)$/i;
        		var acceptFileTypesPDF = /^application\/pdf$/i;
            var isError = false;
            if(data.originalFiles[0]['type'].length
            		&& ( acceptFileTypes.test(data.originalFiles[0]['type'])
            				|| acceptFileTypesPDF.test(data.originalFiles[0]['type']))  ) {

            }else{
            		isError = true;
            }
            if(isError){
            		uploadErrors.push('Please upload files in following formats (jpg, jpeg, pdf or png).');
            }
            if(data.originalFiles.length && data.originalFiles[0]['size'] > 5242880) {
                uploadErrors.push(MAX_SIZE_LIMIT);
                isError = true;
            }
            if(uploadErrors.length > 0) {
                showMessage(true, uploadErrors.join("\n"));
                return false;
            }
        	data.process().done(function () {
                data.submit();
            });
		},
		start: function (e) {
			console.log('start');
			if(uploadMethodType==1){
				$('#fileupload'+uploadIndex+'Span').html('')
				$('#fileupload'+uploadIndex+'Progress .progress-bar').css('width', 0 + '%');
				$('#fileupload'+uploadIndex+'ProgressStatus').removeClass('progress-bar-success').removeClass('progress-bar-danger');
			}else if(uploadMethodType==2){
				$('#fileupload'+uploadIndex).parents(".file-tab").find("span.fileName").text();
			}else if(uploadMethodType==3){
				$('#fileupload'+uploadIndex).parents(".file-tab").find("span.fileName").text();
				$('#fileupload'+uploadIndex).parent('span').parent('p').parent('div').find('i').removeClass('fa-check-circle-o');
				$('#fileupload'+uploadIndex).parent('span').parent('p').parent('div').find('i').removeClass('fa-close');
			}else if(uploadMethodType==4){
			}
		},
		send: function (e, data) {
			console.log('send');
			if(uploadMethodType==1){
				$('#fileupload'+uploadIndex+'Progress .progress-bar').css('width', 5 + '%');
			}else if(uploadMethodType==2){
			}else if(uploadMethodType==3){
			}else if(uploadMethodType==4){
			}
		},
		done : function(e, data) {
			console.log('done');
			if(data.result.status==0){
				if(uploadMethodType==1){
					$('#fileupload'+uploadIndex+'Progress .progress-bar').css('width', 100 + '%');
					$('#fileupload'+uploadIndex+'ProgressStatus').removeClass('progress-bar-success').addClass('progress-bar-danger');
				}else if(uploadMethodType==2){
					$('#fileupload'+uploadIndex).parents(".file-tab").find("span.fileName").text();
				}else if(uploadMethodType==3){
					$('#fileupload'+uploadIndex).parent('span').parent('p').parent('div').find('i').removeClass('fa-check-circle-o');
					$('#fileupload'+uploadIndex).parent('span').parent('p').parent('div').find('i').removeClass('fa-close');
					$('#fileupload'+uploadIndex).parent('span').parent('p').parent('div').find('i').addClass('fa fa-close');
					$('#fileupload'+uploadIndex).parent('span').parent('p').parent('div').find('h1').attr('style','color:red');
					$('#fileupload'+uploadIndex).parent('span').parent('p').parent('div').find('span.fileName').html('');
					$('#fileupload'+uploadIndex).parent('span').parent('p').find('a.view').next('a.remove').attr('style','display:none;');
					$('#fileupload'+uploadIndex).parent('span').parent('p').find('a.view').attr('style','display:none;');
				}else if(uploadMethodType==4){
					$('#fileName'+uploadIndex).html('');
					$('#divdeleteDocument'+uploadIndex).attr('style','display:none;');
					$('#divshowDocument'+uploadIndex).attr('style','display:none;');
				}
			}else{
				$.each(data.result.uploadFiles, function(index, file) {
					if(file.status==1){
						console.log('file: '+file);
						if(uploadMethodType==1){
							var removeClassName ='';
							if(uploadIndex==1){
								removeClassName=('fa fa-user');
							}else if(uploadIndex==2){
								removeClassName=('fa fa-calendar');
							}else if(uploadIndex==3){
								removeClassName=('fa fa-home');
							}else if(uploadIndex==4){
								removeClassName=('fa fa-image');
							}else if(uploadIndex==5){
								removeClassName=('fa fa-graduation-cap');
							}
							$('#fileupload'+uploadIndex+'Response').removeClass(removeClassName);
							$('#fileupload'+uploadIndex+'Response').removeClass('label-error').addClass('fa fa-check-circle green');
							if($('#fileupload'+uploadIndex+'Span').html()==''){
								$('#fileupload'+uploadIndex+'Span').html(file.fileName);
							}else{
								$('#fileupload'+uploadIndex+'Span').html($('#fileupload'+uploadIndex+'Span').html()+','+file.fileName);
							}
							if(uploadIndex==1){
								$('.profile-pic').attr('src', FILE_UPLOAD_PATH+file.fileName);
								if(data.originalFiles[0]['type']=='application/pdf'){
									showMessage(true, 'Please upload files in following formats (jpg, jpeg or png).');
									return false;
								}
							}
						}else if(uploadMethodType==2){
							$('#fileupload'+uploadIndex).parents(".file-tab").find("span.fileName").text(file.fileName);
							console.log($('#fileupload'+uploadIndex).parents(".file-tab").find("span.fileName").text(file.fileName));
							if(data.originalFiles[0]['type']=='application/pdf'){
								$('#fileupload'+uploadIndex).parents(".file-tab").find("img").attr('src', PATH_FOLDER_IMAGE+'pdf.jpg');
							}
						}else if(uploadMethodType==3){
							$('#fileupload'+uploadIndex).parent('span').parent('p').parent('div').find('i').addClass('fa fa-check-circle-o');
							$('#fileupload'+uploadIndex).parent('span').parent('p').parent('div').find('h1').attr('style','color:green');
							$('#fileupload'+uploadIndex).parent('span').parent('p').parent('div').find('span.fileName').html(file.fileName);
							$('#fileupload'+uploadIndex).parent('span').parent('p').find('a.view').next('a.remove').attr('href','javascript:removeDocument("'+uploadIndex+'","'+uploadMethodType+'");');
							$('#fileupload'+uploadIndex).parent('span').parent('p').find('a.view').next('a.remove').attr('style','display:block;');
							$('#fileupload'+uploadIndex).parent('span').parent('p').find('a.view').attr('style','display:block;');
							if(data.originalFiles[0]['type']=='application/pdf'){
								$('#fileupload'+uploadIndex).parent('span').parent('p').find('a.view').attr('target','_blank');
								$('#fileupload'+uploadIndex).parent('span').parent('p').find('a.view').attr('href',FILE_UPLOAD_PATH+file.fileName);
							}else{
								$('#fileupload'+uploadIndex).parent('span').parent('p').find('a.view').attr('target','_self');
								$('#fileupload'+uploadIndex).parent('span').parent('p').find('a.view').attr('href','javascript:showDocument("'+FILE_UPLOAD_PATH+file.fileName+'");');
							}
						}else if(uploadMethodType==4){
							$('#fileName'+uploadIndex).html(file.fileName);
							$('#deleteDocument'+uploadIndex).attr('href','javascript:removeDocument("'+uploadIndex+'","'+uploadMethodType+'");');
//							$('#deleteDocument'+uploadIndex).attr('style','display:block;');
//							$('#showDocument'+uploadIndex).attr('style','display:block;');
							$('#divdeleteDocument'+uploadIndex).attr('style','display:block;');
							$('#divshowDocument'+uploadIndex).attr('style','display:block;');
							if(data.originalFiles[0]['type']=='application/pdf'){
								$('#showDocument'+uploadIndex).attr('target','_blank');
								$('#showDocument'+uploadIndex).attr('href',FILE_UPLOAD_PATH+file.fileName);
							}else{
								$('#showDocument'+uploadIndex).attr('target','_self');
								$('#showDocument'+uploadIndex).attr('href','javascript:showDocument("'+FILE_UPLOAD_PATH+file.fileName+'");');
							}
						}else if(uploadMethodType==5){

							$('#fileupload'+uploadIndex+'img').attr('fileName',file.fileName);
							$('#fileupload'+uploadIndex+'img').attr('href','javascript:removeDocument("'+uploadIndex+'","'+uploadMethodType+'");');
							if(data.originalFiles[0]['type']=='application/pdf'){
								$('#fileupload'+uploadIndex+'img').addClass('full mt-1');
								$('#fileupload'+uploadIndex+'img').attr('target','_blank');
								$('#fileupload'+uploadIndex+'img').attr('href',FILE_UPLOAD_PATH+file.fileName);
//								$('#fileupload'+uploadIndex+'imgIcon').attr('src',PATH_FOLDER_IMAGE+'pdf.jpg');
								setTimeout(function(){$('#fileupload'+uploadIndex+'imgIcon').attr('src',PATH_FOLDER_IMAGE+'pdf.jpg');}, 3000);
								$('#fileupload'+uploadIndex+'div').hide();

							}else{
								$('#fileupload'+uploadIndex+'img').addClass('full mt-1');
								$('#fileupload'+uploadIndex+'img').attr('target','_self');
								$('#fileupload'+uploadIndex+'img').attr('href','javascript:showDocument("'+FILE_UPLOAD_PATH+file.fileName+'");');
								setTimeout(function(){$('#fileupload'+uploadIndex+'imgIcon').attr('src',FILE_UPLOAD_PATH+file.fileName);}, 3000);
							}
							//$('#fileupload'+uploadIndex+'div').hide();
						}
						else if(uploadMethodType==6){
							$('#fileupload'+uploadIndex+'Span').html(file.fileName);
						}
					}
				});
			}
		},
		progressall : function(e, data) {
			console.log('progressall');
			if(uploadMethodType==1){
				$('#fileupload'+uploadIndex+'ProgressStatus').removeClass('label-error').addClass('fa fa-check-circle green');
				//var progress = parseInt(data.loaded / data.total * 100, 10);
				$('#fileupload'+uploadIndex+'Progress .progress-bar').css('width', 100 + '%');
			}else if(uploadMethodType==2){
			}else if(uploadMethodType==3){
			}else if(uploadMethodType==4){
			}

		},
		fail: function (e, data) {
			console.log('fail');
//			console.log(uploadIndex+' fail '+e+" = "+data);
//			console.log(uploadIndex+' fail '+index+" = "+file+' == '+file.name);
			if(uploadMethodType==1){
				//$('#fileupload'+uploadIndex+'Progress .progress-bar').css('width', 100 + '%');
				$('#fileupload'+uploadIndex+'ProgressStatus').addClass('label-error');
				showMessage(true, MAX_SIZE_LIMIT);
			}else if(uploadMethodType==2){
				$('#fileupload'+uploadIndex+'Progress .progress-bar').css('width', 100 + '%');
				$('#fileupload'+uploadIndex+'ProgressStatus').removeClass('progress-bar-success').addClass('progress-bar-danger');
			}else if(uploadMethodType==3){
				$('#fileupload'+uploadIndex).parent('span').parent('p').parent('div').find('i').addClass('fa fa-close');
				$('#fileupload'+uploadIndex).parent('span').parent('p').parent('div').find('h1').attr('style','color:red');
				$('#fileupload'+uploadIndex).parent('span').parent('p').parent('div').find('span.fileName').html('');
				$('#fileupload'+uploadIndex).parent('span').parent('p').find('a.view').next('a.remove').attr('style','display:none;');
				$('#fileupload'+uploadIndex).parent('span').parent('p').find('a.view').attr('style','display:none;');
			}
			showMessage(true, MAX_SIZE_LIMIT);
		}
	}).prop('disabled', !$.support.fileInput).parent().addClass($.support.fileInput ? undefined : 'disabled');
}
function bindFileUploadForCSV(uploadIndex, uploadStudentId, uploadStandardId){
	$('#fileupload'+uploadIndex).fileupload({
		formData: {uploadStudentId: uploadStudentId, uploadStandardId: uploadStandardId},
		url :  CONTEXT_PATH+UNIQUEUUID+'/'+'api/upload-csv',
		dataType : 'json',
		type: "POST",
		enctype: 'multipart/form-data',
		add: function(e, data) {
            var uploadErrors = [];
            //application/vnd.ms-excel - text/csv
            var acceptFileTypesApplication = /^application\/vnd.ms-excel$/i;
            var acceptFileTypesText = /^text\/csv$/i;
            var isError = false;
            console.log('bindFileUploadForCSV type: '+data.originalFiles[0]['type']);
            if(data.originalFiles[0]['type'].length
            		&& (acceptFileTypesApplication.test(data.originalFiles[0]['type'])
            				|| acceptFileTypesText.test(data.originalFiles[0]['type']) ) ) {

            }else{
        		isError = true;
            }
            if(isError){
        		uploadErrors.push('Please upload files in following formats csv.');
            }
            if(data.originalFiles.length && data.originalFiles[0]['size'] > 10485760) {
                uploadErrors.push('Please upload maximum 10MB file in size.');
                isError = true;
            }
            if(uploadErrors.length > 0) {
                showMessage(true, uploadErrors.join("\n"));
                return false;
            }
        	data.process().done(function () {
                data.submit();
            });
		},
		start: function (e) {
			$('#fileupload'+uploadIndex+'Span').html('')
			$('#fileupload'+uploadIndex+'Progress .progress-bar').css('width', 0 + '%');
			$('#fileupload'+uploadIndex+'ProgressStatus').removeClass('progress-bar-success').removeClass('progress-bar-danger');
		},
		send: function (e, data) {
			$('#fileupload'+uploadIndex+'Progress .progress-bar').css('width', 5 + '%');
		},
		done : function(e, data) {
			if(data.result.status==0){
				$('#fileupload'+uploadIndex+'ProgressStatus').removeClass('progress-bar-success').addClass('progress-bar-danger');
			}else{
				$.each(data.result.uploadFiles, function(index, file) {
					if(file.status==1){
						var removeClassName ='';
						$('#fileupload'+uploadIndex+'ChoosenFile').html(file.fileName);
						$('#fileupload'+uploadIndex+'Hash').val(file.hash);
						fileupload1Hash
						$('#fileupload'+uploadIndex+'Response').removeClass(removeClassName);
						$('#fileupload'+uploadIndex+'Response').removeClass('label-error').addClass('fa fa-check-circle green');
						if($('#fileupload'+uploadIndex+'Span').html()==''){
							$('#fileupload'+uploadIndex+'Span').html(file.fileName);
						}else{
							$('#fileupload'+uploadIndex+'Span').html($('#fileupload'+uploadIndex+'Span').html()+','+file.fileName);
						}
					}
				});
			}
		},
		progressall : function(e, data) {
			$('#fileupload'+uploadIndex+'ProgressStatus').removeClass('label-error').addClass('fa fa-check-circle green');
			//var progress = parseInt(data.loaded / data.total * 100, 10);
			$('#fileupload'+uploadIndex+'Progress .progress-bar').css('width', 100 + '%');
		},
		fail: function (e, data) {
			$('#fileupload'+uploadIndex+'ProgressStatus').addClass('label-error');
			showMessage(true, MAX_SIZE_LIMIT);
		}
	}).prop('disabled', !$.support.fileInput).parent().addClass($.support.fileInput ? undefined : 'disabled');
}
function bindFileUploadForPDF(uploadIndex, uploadUserId){
	$('#fileupload'+uploadIndex).fileupload({
		formData: { uploadUserId: uploadUserId},
		url :  APP_BASE_URL+UNIQUEUUID+'/'+'api/upload',
		dataType : 'json',
		type: "POST",
		enctype: 'multipart/form-data',
		add: function(e, data) {
            var uploadErrors = [];
            var acceptFileTypesPDF = /^application\/pdf$/i;
            var isError = false;
            if(data.originalFiles[0]['type'].length && acceptFileTypesPDF.test(data.originalFiles[0]['type'])) {

            }else{
        		isError = true;
            }
            if(isError){
        		uploadErrors.push('Please upload files in pdf format.');
            }
            console.log('originalFiles size'+data.originalFiles[0]['size'])
             if(data.originalFiles.length && data.originalFiles[0]['size'] > 5242880) {
                uploadErrors.push(MAX_SIZE_LIMIT);
                isError = true;
            }
            if(uploadErrors.length > 0) {
            	isError = true;
                showMessage(true, uploadErrors.join("\n"));
                return false;
            }
        	data.process().done(function () {
                	data.submit();
            });
		},
		start: function (e) {
			$('#fileupload'+uploadIndex+'Span').html('')
			$('#fileupload'+uploadIndex+'Progress .progress-bar').css('width', 0 + '%');
			$('#fileupload'+uploadIndex+'ProgressStatus').removeClass('progress-bar-success').removeClass('progress-bar-danger');
		},
		send: function (e, data) {
			$('#fileupload'+uploadIndex+'Progress .progress-bar').css('width', 5 + '%');
		},
		done : function(e, data) {
			if(data.result.status==0){
				$('#fileupload'+uploadIndex+'ProgressStatus').removeClass('progress-bar-success').addClass('progress-bar-danger');
			}else{
				$.each(data.result.uploadFiles, function(index, file) {
					if(file.status==1){
						var removeClassName ='';
						$('#fileupload'+uploadIndex+'ChoosenFile').html(file.fileName);
						$('#fileupload'+uploadIndex+'Hash').val(file.hash);
//						fileupload1Hash
						$('#fileupload'+uploadIndex+'Response').removeClass(removeClassName);
						$('#fileupload'+uploadIndex+'Response').removeClass('label-error').addClass('fa fa-check-circle green');
						if($('#fileupload'+uploadIndex+'Span').html()==''){
							$('#fileupload'+uploadIndex+'Span').html(file.fileName);
						}else{
							$('#fileupload'+uploadIndex+'Span').html($('#fileupload'+uploadIndex+'Span').html()+','+file.fileName);
						}
					}
				});
			}
		},
		progressall : function(e, data) {
			$('#fileupload'+uploadIndex+'ProgressStatus').removeClass('label-error').addClass('fa fa-check-circle green');
			//var progress = parseInt(data.loaded / data.total * 100, 10);
			$('#fileupload'+uploadIndex+'Progress .progress-bar').css('width', 100 + '%');
		},
		fail: function (e, data) {
			$('#fileupload'+uploadIndex+'ProgressStatus').addClass('label-error');
			showMessage(true, MAX_SIZE_LIMIT);
		}
	}).prop('disabled', !$.support.fileInput).parent().addClass($.support.fileInput ? undefined : 'disabled');
}

function removeDocument(uploadIndex, uploadMethodType){
	console.log(uploadIndex);
	if(uploadMethodType==1){

	}else if(uploadMethodType==2){

	}else if(uploadMethodType==3){
		$('#fileupload'+uploadIndex).parent('span').parent('p').find('a.view').hide();
		$('#fileupload'+uploadIndex).parent('span').parent('p').find('a.view').next('a.remove').hide();
		$('#fileupload'+uploadIndex).parent('span').parent('p').parent('div').find('span.fileName').html('');
		$('#fileupload'+uploadIndex).parent('span').parent('p').parent('div').find('i').removeClass('fa-check-circle-o');
		$('#fileupload'+uploadIndex).parent('span').parent('p').parent('div').find('i').removeClass('fa-close');
		$('#fileupload'+uploadIndex).parent('span').parent('p').parent('div').find('h1').removeAttr('style');
		$('#fileupload'+uploadIndex).parent('span').parent('p').parent('div').find('a.view').attr('href','');
		$('#fileupload'+uploadIndex).parent('span').parent('p').parent('div').find('a.remove').attr('href','');
		console.log("delete docs"+$('#fileupload'+uploadIndex).parent('span').parent('p').parent('div').find('a.remove').attr('href',''));
	}else if(uploadMethodType==4){
		$('#fileName'+uploadIndex).html('');
		$('#divdeleteDocument'+uploadIndex).attr('style','display:none;');
		$('#divshowDocument'+uploadIndex).attr('style','display:none;');
	}
}
//convert serialize object to json
function getJSONRequest(formId, isMulitSelect) {
	$(".disabledFields").each(function(){
		$(this).removeAttr('disabled');
	});
	var serializedString = $('#' + formId).serialize();
	console.log('serializedString '+serializedString);
	$(".disabledFields").each(function(){
		$(this).attr('disabled','disabled');
	});
	serializedString = serializedString.replace(/\+/g, '%20');
	var formFieldArray = serializedString.split("&");
	var requestObj = {};
	$.each(formFieldArray, function(i, pair) {
		var nameValue = pair.split("=");
		if(nameValue[1]!=''){
			var name = nameValue[0];
			var value = escapeCharacters(nameValue[1]);
			console.log('name '+name);
			console.log(' value '+value);
			console.log('original Value '+nameValue[1]);
			requestObj[name] = value;
		}
	});
//	$.each(formFieldArray, function(i, pair) {
//		var nameValue = pair.split("=");
//		if(nameValue[1]!=''){
//			var name = decodeURIComponent(nameValue[0]);
//			var value = decodeURIComponent(nameValue[1]);
//			requestObj[name] = value;
//		}
//	});
	if(isMulitSelect!=undefined){
		var name = decodeURIComponent("teacherSubjectIds");
		if($('#teacherSubjectIds').val()!='null' && $('#teacherSubjectIds').val()!=null && $('#teacherSubjectIds').val()!=''){
			var value = decodeURIComponent($('#teacherSubjectIds').val());
		}
		requestObj[name] = value;

		var name1 = decodeURIComponent("teacherPlacementSubjectIds");
		if($('#teacherPlacementSubjectIds').val()!='null' && $('#teacherPlacementSubjectIds').val()!=null && $('#teacherPlacementSubjectIds').val()!=''){
			var value1 = decodeURIComponent($('#teacherPlacementSubjectIds').val());
		}
		requestObj[name1] = value1;


	}
	console.log('requestObj '+requestObj);
	return requestObj;
}
function callSubjectsByGradeId(formId, value, elementId, toElementId, requestExtra, requestExtra1, requestExtra2) {
	hideMessage('');
//	if (!validateRequestForMasterGrade(formId, elementId)) {
//		$("#"+formId+" #"+elementId).val().trim(0);
//		return false;
//	}
	//$("#"+formId+" #pastTaughtSubjectId").prop("disabled", true);
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForCommon('masters'),
		data : JSON.stringify(getRequestForMaster(formId, 'SUBJECT-LIST-BY-GRADE', value, requestExtra, requestExtra1, requestExtra2)),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		async: false,
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				showMessage(true, data['message']);
			} else {
				buildDropdown(data['mastersData']['subject'], $("#"+formId+" #"+toElementId), 'Select course');
				//$("#"+formId+" #pastTaughtSubjectId").prop("disabled", false);
			}
			//$("#"+formId+" #pastTaughtSubjectId").prop("disabled", false);
		},
		error : function(e) {
			console.log(e);
		//	showMessage(true, e.responseText);
			//$("#"+formId+" #pastTaughtSubjectId").prop("disabled", false);
		}
	});
}

//function callPlacementSubjectsByGradeId(formId, value, elementId, toElementId, requestExtra) {
//	hideMessage('');
//	resetDropdown($("#"+formId+" #"+toElementId), 'Select course');
//	if (!validateRequestForMasterGrade(formId, elementId)) {
//		$("#"+formId+" #"+elementId).val().trim(0);
//		//resetDropdown($("#"+formId+" #"+elementId), 'Select course');
//		return false;
//	}
//	$("#"+formId+" #pastTaughtSubjectId").prop("disabled", true);
//	$.ajax({
//		type : "POST",
//		contentType : "application/json",
//		url : getURLForCommon('masters'),
//		data : JSON.stringify(getRequestForMaster(formId, 'PLACEMENT-SUBJECT-LIST-BY-GRADE', value, requestExtra)),
//		dataType : 'json',
//		cache : false,
//		timeout : 600000,
//		async: false,
//		success : function(data) {
//			if (data['status'] == '0' || data['status'] == '2') {
//				showMessage(true, data['message']);
//			} else {
//				buildDropdown(data['mastersData']['subject'], $("#"+formId+" #"+toElementId), 'Select course');
//				$("#"+formId+" #pastTaughtSubjectId").prop("disabled", false);
//			}
//			$("#"+formId+" #pastTaughtSubjectId").prop("disabled", false);
//		},
//		error : function(e) {
//		//	showMessage(true, e.responseText);
//			$("#"+formId+" #pastTaughtSubjectId").prop("disabled", false);
//		}
//	});
//}

function callBothSubjectAndPlacementSubjectsByGrade(formId, value, elementId, toElementId, requestExtra1, requestExtra2) {
	hideMessage('');
	resetDropdown($("#"+formId+" #"+toElementId), 'Select course');
	if (!validateRequestForMasterGrade(formId, elementId)) {
		$("#"+formId+" #"+elementId).val(0);
		//resetDropdown($("#"+formId+" #"+elementId), 'Select course');
		return false;
	}

	console.log("Subject Id : "+requestExtra1);
	console.log("Placement Subject Id : "+requestExtra2);
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForCommon('masters'),
		data : JSON.stringify(getRequestForMaster(formId, 'BOTH-SUBJECT-AND-PLACEMENT-SUBJECT', value, requestExtra1, requestExtra2)),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		async: false,
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				showMessage(true, data['message']);
			} else {
				console.log("Response Data  "+data)
				$("#"+formId+" #"+toElementId).html('<option value="">Select Course</option>');
				$.each(data['mastersData']['subject'], function(k, v) {
					$("#"+formId+" #"+toElementId).append('<option courseType="'+ v.extra +'" value="' + v.key + '">' + v.value + '</option>');
				});
			}
		},
		error : function(e) {
		//	showMessage(true, e.responseText);
			$("#"+formId+" #pastTaughtSubjectId").prop("disabled", false);
		}
	});
}


function callTeacherSubjectsByGradeId(formId, value, elementId, toElementId, requestExtra) {
	hideMessage('');
	resetDropdown($("#"+formId+" #"+toElementId), 'Select course');
	if (!validateRequestForMasterGrade(formId, elementId)) {
		$("#"+formId+" #"+elementId).val(0);
		//resetDropdown($("#"+formId+" #"+elementId), 'Select course');
		return false;
	}
	$("#"+formId+" #pastTaughtSubjectId").prop("disabled", true);
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForCommon('masters'),
		data : JSON.stringify(getRequestForMaster(formId, 'TEACHER_SUBJECT-LIST-BY-GRADE', value, requestExtra)),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		async: false,
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				showMessage(true, data['message']);
			} else {
				buildDropdown(data['mastersData']['teacherSubject'], $("#"+formId+" #"+toElementId), 'Select course');
				$("#"+formId+" #pastTaughtSubjectId").prop("disabled", false);
			}
			$("#"+formId+" #pastTaughtSubjectId").prop("disabled", false);
		},
		error : function(e) {
			//showMessage(true, e.responseText);
			$("#"+formId+" #pastTaughtSubjectId").prop("disabled", false);
		}
	});
}
function callTeacherTaughtSubjects(formId, value, elementId, flag) {
	hideMessage('');
	$.ajax({
		global: flag,
		type : "POST",
		url : getURLForHTML('dashboard','teacher-subject-List'),
		data : "value="+value+"&elementId="+elementId,
		dataType : 'html',
		cache : false,
		timeout : 600000,
		success : function(htmlContent) {
			if(htmlContent!=""){
			var stringMessage = [];
			stringMessage = htmlContent.split("|");
			if(stringMessage[0] == "FAILED" || stringMessage[0] == "EXCEPTION" || stringMessage[0] == "SESSIONOUT" ){
				showMessage(true, stringMessage[1]);
			}else{
				$('#teacherTaughtSubjectContent').html(htmlContent)
			}
			//return false;
			}
		},
		error : function(e) {
			//showMessage(true, e.responseText);
		return false;
	 }
  });
}
function callTeacherPreferredSubjects(formId, value, elementId, flag) {
	hideMessage('');
	$.ajax({
		global: flag,
		type : "POST",
		url : getURLForHTML('dashboard','teacher-preferred-subject-List'),
		data : "value="+value+"&elementId="+elementId,
		dataType : 'html',
		cache : false,
		timeout : 600000,
			success : function(htmlContent) {
				if(htmlContent!=""){
	            	var stringMessage = [];
	            	stringMessage = htmlContent.split("|");
	            	if(stringMessage[0] == "FAILED" || stringMessage[0] == "EXCEPTION" || stringMessage[0] == "SESSIONOUT" ){
	            		showMessage(true, stringMessage[1]);
	        		}else{
	        			$('#teacherPreferredSubjectsContent').html(htmlContent)
	        		}
	    			//return false;
				}
		},
		error : function(e) {
			//showMessage(true, e.responseText);
		return false;
	 }
  });
}

function validateRequestForMasterGrade(formId, elementId, toElementId) {
	console.log('element=>'+$('#'+formId+ ' #'+elementId).val())
	if($('#'+formId+ ' #'+elementId).val()==null || $('#'+formId+ ' #'+elementId).val()=='' || $('#'+formId+ ' #'+elementId).val()==0){
		return false;
	}
	return true;
}

function callTeacherEventSubjectsByGradeId(formId, value, toElementId, requestExtra) {
	hideMessage('');
	resetDropdown($("#"+formId+" #"+toElementId), 'Select course');
	$("#"+formId+" #pastTaughtSubjectId").prop("disabled", true);
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForCommon('masters'),
		data : JSON.stringify(getRequestForMaster(formId, 'TEACHER_EVENT_SUBJECT-LIST', value, requestExtra)),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		async: false,
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				showMessage(true, data['message']);
			} else {
				buildDropdown(data['mastersData']['teacherEventSubject'], $("#"+formId+" #"+toElementId), 'Select course');
				$("#"+formId+" #pastTaughtSubjectId").prop("disabled", false);
			}
			$("#"+formId+" #pastTaughtSubjectId").prop("disabled", false);
		},
		error : function(e) {
			//showMessage(true, e.responseText);
			$("#"+formId+" #pastTaughtSubjectId").prop("disabled", false);
		}
	});
}
function getRequestForMaster(formId, key, value, requestExtra, requestExtra1, requestExtra2,requestExtraRemarks) {
	var request = {};
	var authentication = {};
	var requestData = {};
	requestData['requestKey'] = key;
	requestData['requestValue'] = value;
	if(requestExtra!=undefined){
		requestData['requestExtra1'] = requestExtra;
	}
	if(requestExtra1!=undefined){
		requestData['requestExtra2'] = requestExtra1;
	}
	if(requestExtra2!=undefined){
		requestData['requestExtra3'] = requestExtra2;
	}
	//New line add by mayank
	if(requestExtraRemarks!=undefined && requestExtraRemarks!=''){
		requestData['requestExtraRemarks'] = requestExtraRemarks;
	}
	authentication['hash'] = getHash();authentication['schoolId'] = SCHOOL_ID;authentication['schoolUUID'] = SCHOOL_UUID;
	authentication['userType'] = 'COMMON';
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	return request;
}

function getRequestForActivityMaster(formId, key, value, list1, list2) {
	var request = {};
	var authentication = {};
	var requestData = {};
	requestData['requestKey'] = key;
	requestData['requestValue'] = value;
	if(list1!=undefined || list1!=''){
		requestData['batchIds'] = list1;
	}
	if(list2!=undefined || list2!=''){
		requestData['subjectIds'] = list2;
	}
	authentication['hash'] = getHash();
	authentication['schoolId'] = SCHOOL_ID;
	authentication['schoolUUID'] = SCHOOL_UUID;
	authentication['userType'] = 'COMMON';
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	return request;
}

function customLoaderPreview(needToShow){
	if(needToShow){
		$('#commonloaderId1').removeClass('hide');
		$('#commonloaderBody1').addClass('loader');
		$('#commonloaderId1').addClass('loader-bg');
		$('#commonloaderId1').show();
	}else{
		$('#commonloaderBody1').removeClass('loader');
		$('#commonloaderId1').removeClass('loader-bg');
		$('#commonloaderId1').addClass('hide');
		$('#commonloaderId1').hide();
	}
}
function showDocument(imagePath){
	customLoaderPreview(true);
	$('#documentPreview').attr('src','');
	$('#documentPreview').attr('src',imagePath);
	$('#documentPreviewModal').modal('show');
	window.setTimeout(function(){
		customLoaderPreview(false);
	},1000);
}

function showSubjectCatalog(subjectId, courseType) {
	$.ajax({
		type : "POST",
		url : getURLForHTML('student','course-catalog'),
		data : 'subjectId='+subjectId+'&courseType='+courseType,
		dataType : 'html',
		cache : false,
		async:false,
		timeout : 600000,
		success : function(htmlContent) {
			if(htmlContent!=""){
            	var stringMessage = [];
            	stringMessage = htmlContent.split("|");
        		if(stringMessage[0] == "FAILED" || stringMessage[0] == "EXCEPTION"){
        			showMessage(true, stringMessage[1]);
        		} else {
//        			$('#subjectCatalogModalContent').html('');
        			$('#subjectCatalogModalContent').html(htmlContent);
        			$('#subjectCatalogModal').modal('show');
        		}
			}
			return false;
		},
		error : function(e) {
			//showMessage(true, e.responseText);
		}
	});
}
function showWarningMessage(warningMessage, functionName){
	if(functionName==''){
		$('#resetDeleteErrorWarningYes').hide();
		$('#resetDeleteErrorWarningNo').hide();
		$('#resetDeleteErrorWarningCancel').show();
	}else{
		$('#resetDeleteErrorWarningYes').show();
		$('#resetDeleteErrorWarningNo').show();
		$('#resetDeleteErrorWarningCancel').hide();
	}
	functionName = "$('#remarksresetDelete').modal('hide');"+functionName+";";
    $('#warningMessage').html(warningMessage);
	$('#resetDeleteErrorWarningYes').attr('onclick',functionName);
	$('#remarksresetDelete').modal('show');
}
function sendAnnouncementWarning(message, functionName){
	$('#resetDeleteErrorWarningYes1').show();
	$('#resetDeleteErrorWarningNo1').show();
	$('#resetDeleteErrorWarningCancel1').hide();
	$('#remarksresetDelete1Icon').removeAttr('class');
	$('#remarksresetDelete1Icon').attr('class','fa fa-envelope fa-4x');
	functionName = "$('#remarksresetDelete1').modal('hide');"+functionName+";";
    $('#warningMessage1').html(message);
	$('#resetDeleteErrorWarningYes1').attr('onclick',functionName);
	$('#remarksresetDelete1').modal('show');
}
function sendHolidayActivWarning(message, functionName){
	$('#resetDeleteErrorWarningYes1').show();
	$('#resetDeleteErrorWarningNo1').show();
	$('#resetDeleteErrorWarningCancel1').hide();
	$('#remarksresetDelete1Icon').removeAttr('class');
	$('#remarksresetDelete1Icon').attr('class','fa fa-ban fa-4x');
	functionName = "$('#remarksresetDelete1').modal('hide');"+functionName+";";
    $('#warningMessage1').html(message);
	$('#resetDeleteErrorWarningYes1').attr('onclick',functionName);
	$('#remarksresetDelete1').modal('show');
}


function showWarningMessageShow(warningMessage1, functionName1){
	if(functionName1==''){
		$('#resetDeleteErrorWarningYes1').hide();
		$('#resetDeleteErrorWarningNo1').hide();
		$('#resetDeleteErrorWarningCancel1').show();
	}else{
		$('#resetDeleteErrorWarningYes1').show();
		$('#resetDeleteErrorWarningNo1').show();
		$('#resetDeleteErrorWarningCancel1').hide();
	}
	$('#remarksresetDelete1Icon').removeAttr('class');
	$('#remarksresetDelete1Icon').attr('class','fa fa-refresh fa-4x');
	functionName1 = "$('#remarksresetDelete1').modal('hide');"+functionName1+";";
    $('#warningMessage1').html(warningMessage1);
	$('#resetDeleteErrorWarningYes1').attr('onclick',functionName1);
	$('#remarksresetDelete1').modal('show');
}
function selectSubjectNew(src, flag, applicableClass, counterCheck) {
	if (flag) {
		if (!$(src).hasClass("greenDiv")) {
			$(src).addClass("greenDiv");
			var selSubjectd = "";
			$("."+applicableClass).each(function() {
				if ($(this).hasClass("greenDiv")) {
					selSubjectd = selSubjectd + "," + $(this).attr('id');
				}
			});
			selSubjectd=selSubjectd.substr(1);
			var choosenItems = selSubjectd.split(',').length;
			if(choosenItems<=parseInt(counterCheck)){

			}else{
				$(src).removeClass("greenDiv");
				showMessage(true, 'You cannot select more than '+counterCheck+' courses.');
			}
		} else {
			$(src).removeClass("greenDiv");
		}
	}
}

function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}


function getISDCodeByCityAndCountry(cityName, countryName, elementId1, elementId2){
	$.ajax({
		type : "GET",
		url : getURLForHTML('common','get-isdcode-by-city-and-country'),
		data : "cityName="+cityName+'&countryName='+countryName,
		dataType : 'html',
		async : false,
		success : function(content) {
			var data=content.split('|')
//			console.log('finalValue=>'+finalValue);
			if(elementId1!=''){
				$('#'+elementId1).val(data[2]).trigger('change');
			}
			if(elementId2!=''){
				window.setTimeout(function(){$('#'+elementId2).val(data[4]).trigger('change');},1000)
			}
			return content;
		}
	});
}

/*function getISDCodeByCityAndCountry(cityName, countryName, elementId1, elementId2){
	$.ajax({
		type : "GET",
		url : getURLForHTML('common','get-isdcode-by-city-and-country'),
		data : "cityName="+cityName+'&countryName='+countryName,
		dataType : 'html',
		async : false,
		success : function(content) {
			var finalValue=content+" "+countryName;
//			console.log('finalValue=>'+finalValue);
			if(elementId1!=''){
				chooseValueByElement(elementId1, finalValue)
			}
			if(elementId2!=''){
				chooseValueByElement(elementId2, finalValue)
			}
			chooseValueByElement('countryId', countryName)
			return content;
		}
	});
}*/
function chooseValueByElement(elementId, value){
	if($('#'+elementId).length){
		$('#'+elementId+' option').map(function () {
			var currentValue = $(this).text();
			//currentValue = currentValue.substr(0,currentValue.indexOf(' ')); // returns text before space
			currentValue = currentValue.substr(currentValue.indexOf(' ')+1); // returns text after space
			if (currentValue === value){
				return this;
			}
		}).attr('selected', 'selected');
	}
}
function chooseTimezoneValueByElement(elementId, value){
	if($('#'+elementId).length){
		$('#'+elementId+' option').map(function () {
			var currentValue = $(this).text();
			//currentValue = currentValue.substr(0,currentValue.indexOf(' ')); // returns text before space
			currentValue = currentValue.substr(currentValue.indexOf('- ')+1); // returns text after space
			currentValue = currentValue.substr(0,currentValue.indexOf('/'));
			//console.log('1. currentValue=>'+currentValue+', value=>'+value+', conditions=>'+(currentValue === value));
			if (currentValue === value){
				return this;
			}
		}).attr('selected', 'selected');
	}
}
function chooseCountryElement(elementId, value){
	if($('#'+elementId).length){
		$('#'+elementId+' option').map(function () {
			var currentValue = $(this).text();
			if (currentValue === value){
				return this;
			}
		}).attr('selected', 'selected');
		$('#countryId').trigger('change');
	}
}
function showPassWord(elementId, iconId) {
	var x = document.getElementById(elementId);
	var y = document.getElementById(iconId);
	if (x.type === "password") {
		x.type = "text";
		// this.class = "fa fa-eye";
		y.classList.remove("fa-eye-slash");
		y.classList.add("fa-eye");
	} else {
		x.type = "password";
		// y.class = "fa-eye-slash";
		y.classList.remove("fa-eye");
		y.classList.add("fa-eye-slash");
	}
}

function getRandomColor() {
	  var letters = '0123456789ABCDEF';
	  var color = '#';
	  for (var i = 0; i < 6; i++) {
	    color += letters[Math.floor(Math.random() * 16)];
	  }
	  return color;
}


function callBatchesByGradeId(formId, value, elementId, toElementId, requestExtra, requestExtra1, requestExtra2) {
	hideMessage('');
	if (!validateRequestForMaster(formId, elementId)) {
		resetDropdown($("#"+formId+" #"+toElementId), 'Select batch');
		$("#"+formId+" #"+toElementId).val('');
		return false;
	}
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForCommon('masters'),
		data : JSON.stringify(getRequestForMaster(formId, 'BATCH-LIST-BY-STANDARD-ID', value, requestExtra, requestExtra1, requestExtra2)),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		async: false,
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				showMessage(true, data['message']);
			} else {
				buildDropdown(data['mastersData']['subject'], $("#"+formId+" #"+toElementId), 'Select batch');
				//$("#"+formId+" #pastTaughtSubjectId").prop("disabled", false);
			}
			//$("#"+formId+" #pastTaughtSubjectId").prop("disabled", false);
		},
		error : function(e) {
			console.log(e);
		//	showMessage(true, e.responseText);
			//$("#"+formId+" #pastTaughtSubjectId").prop("disabled", false);
		}
	});
}

function callBatchesByMulltipleGradeId(formId, value, elementId, toElementId, requestExtra, requestExtra1, requestExtra2) {
	hideMessage('');
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForCommon('masters'),
		data : JSON.stringify(getRequestForMaster(formId, 'BATCH-NAME-LIST-BASED-ON-MULTIPLE-STANDARD', "", requestExtra, requestExtra1, requestExtra2,value)),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		async: false,
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				showMessage(true, data['message']);
			} else {
				buildDropdown(data['mastersData']['subject'], $("#"+formId+" #"+toElementId), 'Select batch');
				//$("#"+formId+" #pastTaughtSubjectId").prop("disabled", false);
			}
			//$("#"+formId+" #pastTaughtSubjectId").prop("disabled", false);
		},
		error : function(e) {
			console.log(e);
			//showMessage(true, e.responseText);
			//$("#"+formId+" #pastTaughtSubjectId").prop("disabled", false);
		}
	});
}

function toTitleCase(str) {
	return str.toLowerCase().replace(/(?:^|\s)\w/g, function(match) {return match.toUpperCase();});
}
function disabledAllElement(formId, needDisabled) {
	var form = document.getElementById(formId);
	var elements = form.elements;
	for (var i = 0, len = elements.length; i < len; ++i) {
    	elements[i].disabled = needDisabled;
	}
}
function chageDateFormat(dateFormatAsMMMDDYYY) {
	var today = new Date(dateFormatAsMMMDDYYY)
	var dd = today.getDate();
	var mm = today.getMonth() + 1;

	var yyyy = today.getFullYear();
	if (dd < 10) {
		dd = '0' + dd;
	}
	if (mm < 10) {
		mm = '0' + mm;
	}
	var today = mm + '-' + dd + '-' + yyyy;
	console.log('chageDateFormat '+today);
	return today;
}
//mm dd, yyyy to desiredFormat
function changeDateFormat(date, dateFormat){
	if('mm-dd-yyyy'==dateFormat){
		return ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '-' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '-' + date.getFullYear();
	}else if('yyyy-mm-dd'==dateFormat){
		return date.getFullYear()+ '-' + ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '-' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate()));
	}else if('dd-mm-yyyy'==dateFormat){
		return ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '-' + ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '-' + date.getFullYear();
	}else if('MMM dd, yyyy'==dateFormat){
		return M.months[date.getMonth()] + ' ' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + ', ' + date.getFullYear();
	}else if('MMM dd, yyyy hh:mm a'==dateFormat){
		return M.months[date.getMonth()] + ' ' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + ', ' + date.getFullYear()+' '+date.toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3").toUpperCase();
	}else{
		return date.getFullYear()+ '-' + ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '-' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate()));
	}
}

function windowScrollToTop(){
	$("html, body").animate({ scrollTop: "0" });
}

function isCustomLoaderOpen(){
	if(tt=='theme1'){
		return $('#commonloaderId').hasClass('loader-bg');
	}else{
		return $('#commonloaderIdNewLoader').hasClass('loader-bg');
	}
}

$(document).ready(function () {  
	$("#captcha").keyup(function () {  
		$(this).val($(this).val().toUpperCase());  
	});  
}); 

function convertTZ(date, tzString) {
	return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", { timeZone: tzString }));
}

function copyLink(src) {
    var copyURL = $(src).attr('value');
    var https = copyURL.split(":")[0];
    //var textarea = document.createElement("textarea");
    if(copyURL.length>0 || https === "https"){
		navigator.clipboard.writeText(copyURL).then(() => {
			//alert("Copied the link: " + copyURL);
		}).catch(err => {
			console.error('Failed to copy: ', err);
		});
	
        $(src).parent().find(".copy-msg").removeClass("text-danger")
        $(src).parent().find(".copy-msg").addClass("text-success").text("Link copied!"),
        setTimeout(function(){
            $(src).parent().find(".copy-msg").text("")
        }, 3000) 
       // document.body.removeChild(textarea);
    }else{
        // copyURL = "Link Not Found";
        // textarea.textContent = copyURL;
        // textarea.style.position = "fixed"; // Prevent scrolling to bottom of page in MS Edge.
        // document.body.appendChild(textarea);
        // textarea.select();
        // document.execCommand("copy");
        $(src).parent().find(".copy-msg").removeClass("text-danger")
        $(src).parent().find(".copy-msg").addClass("text-danger").text("Invalid Link"),
        setTimeout(function(){
            $(src).parent().find(".copy-msg").text("")
        }, 3000) 
    }
}