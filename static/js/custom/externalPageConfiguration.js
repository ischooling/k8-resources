PRO_IP_API_URL='https://pro.ip-api.com/json/?key=9908tZlRhI0pK5W&fields=status,message,continent,continentCode,country,countryCode,region,regionName,city,district,zip,lat,lon,timezone,offset,currency,isp,org,as,asname,reverse,mobile,proxy,hosting,query';
moduleId = "REQUESTDEMO";
CONTEXT_PATH = 'k8school';
FILE_UPLOAD_PATH = "https://s3.amazonaws.com/internationalsch/";
UNIQUEUUID='';
SCHOOL_UUID='k8-school/';
var API_VERSION = CONTEXT_PATH+UNIQUEUUID+'/'+'api/v1/';
var TECHNICAL_GLITCH = 'Sorry for inconvenience, system has encountered technical glitch.';
var SERVICE_UNAVAILABLE='Temporarily Ticket Service is not available!';
var BASE_URL = '';
if (ENVIRONMENT == 'uat') {
	BASE_URL = 'http://164.52.198.42:8080/';
} else if (ENVIRONMENT == 'uat2') {
	BASE_URL = 'http://164.52.198.42:9090/';
} else if (ENVIRONMENT == 'dev') {
	BASE_URL = 'http://localhost:8080/';
} else if (ENVIRONMENT == 'staging') {
	BASE_URL = 'http://164.52.198.42:8070/';
} else if (ENVIRONMENT == 'uat3') {
	BASE_URL = 'http://164.52.198.42:7070/';
} else {
	BASE_URL = 'https://sms.k8school.com/';
}
function getURLForCommon(suffixUrl){
	return BASE_URL+API_VERSION + 'common' + '/' + suffixUrl;
}
function getURLForHTML(apiType, suffixUrl) {
	return APP_BASE_URL+UNIQUEUUID+'/'+apiType + '/' + suffixUrl;
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

function hideMessageRequestDemoPage(id,fid){
//	$('#'+id).parent().addClass('hide');
	$('#'+id).parent().removeClass('show-message');
	if(fid!=''){
		$('#'+fid).removeClass('highlight-field');
	}
	//	$('#'+id).parent().addClass('error-message-hide');
	$('#'+id).html('');
}
function removeAllError(formId){
	var elements=['name','email','isdCodeMobileNo','contactNumber','grade','description'];
	for(var index=0;index<elements.length;index++){
		if($('#'+formId+' #'+elements[index]).length){
			$('#'+formId+' #'+elements[index]).removeClass('error');
			$('#'+formId+' #'+elements[index]).next('p').html('');
		}
	}
	hideServerError(formId, 'serverError');
}
function showServerError(isError, formId, elementId, errorMessage){
	$('#'+formId+' #'+elementId).html(errorMessage);
	if(isError){
		$('#'+formId+' #'+elementId).removeClass('server-success');
		$('#'+formId+' #'+elementId).addClass('server-error');
	}else{
		$('#'+formId+' #'+elementId).addClass('server-success');
		$('#'+formId+' #'+elementId).removeClass('server-error');
	}
}
function hideServerError(formId, elementId){
	$('#'+formId+' #'+elementId).html('');
}
function showErrorForPPC(formId, elementId, message){
	$('#'+formId+' #'+elementId).addClass('error');
	$('#'+formId+' #'+elementId).next('p').html(message);
}


function showMessage(isWarnig, message, id) {
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
}
function hideMessage(id) {
	$('#errorHeading').html('');
	$('#statusMessage').removeClass('success-color');
	$('#statusMessage').removeClass('danger-color');
	$('#statusMessage').html('');
}

function resetDropdown(dropdown, emptyMessage) {
	dropdown.html('');
	//dropdown.append('<option value="0">' + emptyMessage + '</option>');
	dropdown.append('<option disabled selected> </option>');
}

function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
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
       xhr.setRequestHeader("Access-Control-Allow-Origin","*");
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

function chooseValueByElement(elementId, value){
	if($('#'+elementId).length){
		$('#'+elementId+' option').map(function () {
			var currentValue = $(this).text();
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
			currentValue = currentValue.substr(currentValue.indexOf('- ')+1); // returns text after space
			currentValue = currentValue.substr(0,currentValue.indexOf('/'));
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
function getHash() {
	return Math.random().toString(36);
}
function buildDropdown(result, dropdown, emptyMessage) {
	dropdown.html('');
	if (result != '') {
		if (emptyMessage != 'Select Date') {
			dropdown.append('<option value="0">' + emptyMessage + '</option>');
		}
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




function callDateListForDemo() {
	hideMessage('');
//	resetDropdown($("#"+formId+" #cityId"), 'Select city');
	$.ajax({
		type : "GET",
		contentType : "application/json",
		url : getURLForCommon('date-list-for-demo'),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		success : function(data) {
			if (data['statusResponse']['statusCode'] == '0' || data['statusResponse']['statusCode'] == '2') {
				showMessage(true, data['message']);
			} else {
				console.log("data is" + data['dateList']);
				buildDropdown(data['dateList'], $('#chooseDate'), 'Select Date');
				  var meetingDate=$('#chooseDate').val();
				  if(meetingDate!=null && meetingDate!=''){
					console.log("meetingDate",meetingDate);
					if(meetingDate!=''){
						var formId=$('.formClass').attr("id");
						callCommonFreeSlotsList(formId);
					}
				  }
			}
		},
		error : function(e) {
			//$("#stateId").prop("disabled", false);
		}
	});
}

function callCommonFreeSlotsList(formId) {
//	hideMessage('');
	$.ajax({
		type : "POST",
		url : getURLForCommon('free-slots-list'),
		contentType : "application/json",
		data : JSON.stringify(getRequestForFreeSlotsList(formId)),
		dataType : 'json',
		async : false,
		success : function(data) {
			if (data['statusResponse']['statusCode'] == '0' || data['statusResponse']['statusCode'] == '2') {
				showMessage(true, data['message']);
			} else {
				buildListForFreeSlots(data['requestDemoFreeSlotsDTO'], $('#viewFreeSlot'), '');
			}
		},
		error : function(e) {
			showMessage(true, e.responseText);
		}
	});
}

function getRequestForFreeSlotsList(formId){
	var demoFreeSlotListRequest= {};

	var lat="";
	var lon="";
	var book=""
	if($('#location').val()!=''){
		var locations = JSON.parse($('#location').val())
		lat=locations.lat;
		lon=locations.lon;
	}
	var requestType='REQUESTDEMO';
	var book='Y'

	demoFreeSlotListRequest['date'] = $('#'+formId+' #chooseDate').val();
	demoFreeSlotListRequest['countryTimezoneId'] = $("#" + formId + " #countryTimezoneId").val();
	demoFreeSlotListRequest['lat'] =lat;
	demoFreeSlotListRequest['lon'] = lon;
	demoFreeSlotListRequest['requestType'] =requestType;
	demoFreeSlotListRequest['book'] = book;
	demoFreeSlotListRequest['resStatus'] = $("#" + formId + "#meetingCheck").val();
	return demoFreeSlotListRequest;
}

function buildListForFreeSlots(result, dropdown, emptyMessage) {
	dropdown.html('');
	if (result != '') {
		dropdown.append('<option value="0">' + emptyMessage + '</option>');
		$.each(result, function(k, v) {
			if(v.id!=null && v.startTime !=null){
				dropdown.append('<div class="slot-wrapper slot-wrapper-flex"><div class="time-slot"><div class="form-check"><input class="form-check-input time-radio" type="radio" name="slotTime" id="'+ v.id +'" value="'+ v.startTime+'-'+v.endTime +'" slotIdAttr="'+ v.id +'" slotDateAttr="'+ v.meetingDate +'"><label class="meeting-time" for="'+ v.id +'">'+ v.startTime+'-'+v.endTime +'</label></div></div></div>');
			}
			//dropdown.append('<div class="item"><div id="viewFreeSlot"><div class="slot-wrapper slot-wrapper-flex"><div class="time-slot"><div class="form-check"><input class="form-check-input time-radio" type="radio" name="slotTime" id="'+ v.id +'" value="'+ v.startTime+'-'+v.endTime +'" slotIdAttr="'+ v.id +'" slotDateAttr="'+ v.meetingDate +'"><label class="meeting-time" for="'+ v.id +'">'+ v.startTime+'-'+v.endTime +'</label></div></div></div></div></div>');
		});
	}else{
		dropdown.append('No slots available, please try with another date.');
	}
}

function showMessageRequestDemoPage(isWarnig, message, id,fid) {
//	$('#'+id).parent().removeClass('error-message-hide');
	$('#'+id).parent().addClass('show-message');
//	$('#'+id).parent().removeClass('hide');
	if(fid!=''){
		$('#'+fid).addClass('error');
	}
	$('#'+id).html(message);
}
function hideMessageRequestDemoPage(id,fid){
//	$('#'+id).parent().addClass('hide');
	$('#'+id).parent().removeClass('show-message');
	if(fid!=''){
		$('#'+fid).removeClass('error');
	}
	//	$('#'+id).parent().addClass('error-message-hide');
	$('#'+id).html('');
}