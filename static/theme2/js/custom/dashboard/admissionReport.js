
function validateAdmissionReport(formId,moduleId){
	return true
}
function getAdmissionCountBySessionId(formId,moduleId,elementId) {
	var enrolmentType = $('#enrolmentType').val();
	var sessionId = $('#sessionYear').val();
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForCommon('masters'),
		data : JSON.stringify(getRequestForMaster(formId, 'COUNTRY_LIST_WITH_ADMISSION_COUNT','STUDENT',sessionId, enrolmentType)),
		dataType : 'json',
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				showMessage(1, data['message']);
			} else {
				$('#'+elementId).html('');
				$.each(data['mastersData']['countries'], function(k, v) {
					$('#'+elementId).append('<option value="' + v.key + '">' + v.value + ' (' + v.extra + ')</option>');
				});
				$('#'+elementId).val('');
				getAdmissionReport(formId,moduleId, '')
			}
		}
	});
}

function getAdmissionReport(formId,moduleId, currentCountryId) {
	hideMessage('');
	if(!validateAdmissionReport(formId,moduleId)){
		return false;
	}
	var schoolId = $('#schoolSettigsSelection').val();
	var sessionId = $('#sessionYear').val();
	var countryId = '';
	if(currentCountryId == undefined){
		countryId = $('#countryId').val();
	}
	
	$('#admissionReportDetails').html('');
	$.ajax({
		type : "GET",
		contentType : "application/json",
		url : getURLForHTML('report','school-admission-reports-content/'+SCHOOL_UUID+'?moduleId='+moduleId+'&schoolId='+schoolId+'&sessionId='+sessionId+'&countryId='+countryId),
		dataType : 'html',
		success : function(htmlContent) {
			if(htmlContent!=""){
            	var stringMessage = [];
            	stringMessage = htmlContent.split("|");
        		if(stringMessage[0] == "FAILED" || stringMessage[0] == "EXCEPTION"){
        			showMessage(1, stringMessage[1]);
        		} else {
					$('#swr0').html('');
					$('#swr0City').html('');
					$('#swr1').html('');
					$('#swr2').html('');
					$('#swr3').html('');
        			$('#admissionReportContent').html(htmlContent);
        		}
			}
			return false;
		}
	});
}


function validateAdmissionReportByType(formId,moduleId, schoolId, sessionId, countryId, reportType, reportTitle){
	return true
}

function getAdmissionReportByType(formId,moduleId, schoolId, sessionId, countryId, reportType, reportTitle) {
	hideMessage('');
	if(!validateAdmissionReportByType(formId,moduleId, schoolId, sessionId, countryId, reportType, reportTitle)){
		return false;
	}
	var url = getURLForHTML('report','admission-report-by-type/'+SCHOOL_UUID+'?moduleId='+moduleId+'&schoolId='+schoolId+'&sessionId='+sessionId+'&countryId='+countryId+'&reportType='+reportType+'&reportTitle='+reportTitle);
	console.log('getAdmissionDetails url '+url)
	$.ajax({
		type : "GET",
		contentType : "application/json",
		url : url,
		dataType : 'html',
		success : function(htmlContent) {
			if(htmlContent!=""){
            	var stringMessage = [];
            	stringMessage = htmlContent.split("|");
        		if(stringMessage[0] == "FAILED" || stringMessage[0] == "EXCEPTION"){
        			showMessage(1, stringMessage[1]);
        		} else {
	    			$('#admissionReportByType').html(htmlContent);
        		}
			}
			return false;
		}
	});
}
function validateLeadReportStateWiseByType(formId,moduleId, schoolId, sessionId,countryId, reportType, reportTitle, divId){
	return true
}

function getLeadReportStateWiseByType(formId,moduleId, schoolId, sessionId,countryId, reportType, reportTitle, divId) {
	hideMessage('');
	if(!validateLeadReportStateWiseByType(formId,moduleId, schoolId, sessionId,countryId, reportType, reportTitle, divId)){
		return false;
	}
	var url = getURLForHTML('report','lead-report-state-wise-by-type/'+SCHOOL_UUID
		+'?moduleId='+moduleId+'&schoolId='+schoolId+'&sessionId='+sessionId
		+'&countryId='+countryId+'&reportType='+reportType+'&reportTitle='+reportTitle);
	console.log('getLeadReportStateWiseByType url '+url)
	$.ajax({
		type : "GET",
		contentType : "application/json",
		url : url,
		dataType : 'html',
		success : function(htmlContent) {
			if(htmlContent!=""){
            	var stringMessage = [];
            	stringMessage = htmlContent.split("|");
        		if(stringMessage[0] == "FAILED" || stringMessage[0] == "EXCEPTION"){
        			showMessage(1, stringMessage[1]);
        		} else {
	    			$('#'+divId).html(htmlContent);
        		}
			}
			return false;
		}
	});
}


function validateLeadReportCityWiseByType(formId,moduleId, schoolId, sessionId,countryId,stateId, reportType, reportTitle){
	return true
}

function getLeadReportCityWiseByType(formId,moduleId, schoolId, sessionId,countryId,stateId, reportType, reportTitle, divId) {
	hideMessage('');
	if(!validateLeadReportCityWiseByType(formId,moduleId, schoolId, sessionId,countryId,stateId, reportType, reportTitle)){
		return false;
	}
	var url = getURLForHTML('report','lead-report-city-wise-by-type/'+SCHOOL_UUID
		+'?moduleId='+moduleId+'&schoolId='+schoolId+'&sessionId='+sessionId+'&countryId='+countryId
		+'&stateId='+stateId+'&reportType='+reportType+'&reportTitle='+reportTitle);
	console.log('getLeadReportCityWiseByType url '+url)
	$.ajax({
		type : "GET",
		contentType : "application/json",
		url : url,
		dataType : 'html',
		success : function(htmlContent) {
			if(htmlContent!=""){
            	var stringMessage = [];
            	stringMessage = htmlContent.split("|");
        		if(stringMessage[0] == "FAILED" || stringMessage[0] == "EXCEPTION"){
        			showMessage(1, stringMessage[1]);
        		} else {
	    			$('#'+divId).html(htmlContent);
        		}
			}
			return false;
		}
	});
}

function validateAdmissionReportStateWiseByType(formId,moduleId, schoolId, sessionId,countryId, reportType, reportTitle){
	return true
}

function getAdmissionReportStateWiseByType(formId,moduleId, schoolId, sessionId,countryId, reportType, reportTitle, divId) {
	hideMessage('');
	if(!validateAdmissionReportStateWiseByType(formId,moduleId, schoolId, sessionId,countryId, reportType, reportTitle)){
		return false;
	}
	var url = getURLForHTML('report','admission-report-state-wise-by-type/'+SCHOOL_UUID
		+'?moduleId='+moduleId+'&schoolId='+schoolId+'&sessionId='+sessionId
		+'&countryId='+countryId+'&reportType='+reportType+'&reportTitle='+reportTitle);
	console.log('getAdmissionReportStateWiseByType url '+url)
	$.ajax({
		type : "GET",
		contentType : "application/json",
		url : url,
		dataType : 'html',
		success : function(htmlContent) {
			if(htmlContent!=""){
            	var stringMessage = [];
            	stringMessage = htmlContent.split("|");
        		if(stringMessage[0] == "FAILED" || stringMessage[0] == "EXCEPTION"){
        			showMessage(1, stringMessage[1]);
        		} else {
	    			$('#'+divId).html(htmlContent);
        		}
			}
			return false;
		}
	});
}

function validateAdmissionReportCityWiseByType(formId,moduleId, schoolId, sessionId,countryId,stateId, reportType, reportTitle){
	return true
}

function getAdmissionReportCityWiseByType(formId,moduleId, schoolId, sessionId,countryId,stateId, reportType, reportTitle, divId) {
	hideMessage('');
	if(!validateAdmissionReportCityWiseByType(formId,moduleId, schoolId, sessionId,countryId,stateId, reportType, reportTitle)){
		return false;
	}
	var url = getURLForHTML('report','admission-report-city-wise-by-type/'+SCHOOL_UUID
		+'?moduleId='+moduleId+'&schoolId='+schoolId+'&sessionId='+sessionId+'&countryId='+countryId
		+'&stateId='+stateId+'&reportType='+reportType+'&reportTitle='+reportTitle);
	console.log('getAdmissionReportCityWiseByType url '+url)
	$.ajax({
		type : "GET",
		contentType : "application/json",
		url : url,
		dataType : 'html',
		success : function(htmlContent) {
			if(htmlContent!=""){
            	var stringMessage = [];
            	stringMessage = htmlContent.split("|");
        		if(stringMessage[0] == "FAILED" || stringMessage[0] == "EXCEPTION"){
        			showMessage(1, stringMessage[1]);
        		} else {
	    			$('#'+divId).html(htmlContent);
        		}
			}
			return false;
		}
	});
}

function circleBar(elementID, value, per, colorCode){
	$("#"+elementID).circleProgress({
        value: per,
        size: 52,
        lineCap: "round",
        fill: {
            color: colorCode
        }
	}).on("circle-animation-progress", (function(e, i, n) {
        $(this).find("small").html("<span>" + parseInt(n * 100) + "%<span>")
    }))
}
function largeCircleBar(elementID, value, per, colorCode){
	$("#"+elementID).circleProgress({
        value: per,
        size: 96,
        lineCap: "round",
        fill: {
            color: colorCode
        }
	}).on("circle-animation-progress", (function(e, i, n) {
        $(this).find("small").html("<span>" + parseInt(n * 100) + "%<span>")
    }))
}

function getAdmissionReportGradeWiseByType(formId,moduleId, schoolId, sessionId, datestart, reportType, reportTitle, divId) {
	hideMessage('');
	
	var url = getURLForHTML('report','admission-report-grade-wise-by-type/'+SCHOOL_UUID
		+'?moduleId='+moduleId+'&schoolId='+schoolId+'&sessionId='+sessionId
		+'&datestart='+datestart+'&reportType='+reportType+'&reportTitle='+reportTitle);
	console.log('getAdmissionReportGradeWiseByType url '+url)
	$.ajax({
		type : "GET",
		contentType : "application/json",
		url : url,
		dataType : 'html',
		success : function(htmlContent) {
			if(htmlContent!=""){
            	var stringMessage = [];
            	stringMessage = htmlContent.split("|");
        		if(stringMessage[0] == "FAILED" || stringMessage[0] == "EXCEPTION"){
        			showMessage(1, stringMessage[1]);
        		} else {
	    			$('#'+divId).html(htmlContent);
        		}
			}
			return false;
		}
	});
}

function getOnlineUserReport(formId,moduleId, schoolId, reportTitle, divId) {
	hideMessage('');
	var url = getURLForHTML('report','online-user-report/'+SCHOOL_UUID
		+'?moduleId='+moduleId+'&schoolId='+schoolId+'&reportTitle='+reportTitle);
	console.log('getAdmissionReportGradeWiseByType url '+url)
	$.ajax({
		type : "GET",
		contentType : "application/json",
		url : url,
		dataType : 'html',
		success : function(htmlContent) {
			if(htmlContent!=""){
            	var stringMessage = [];
            	stringMessage = htmlContent.split("|");
        		if(stringMessage[0] == "FAILED" || stringMessage[0] == "EXCEPTION"){
        			showMessage(1, stringMessage[1]);
        		} else {
	    			$('#'+divId).html(htmlContent);
        		}
			}
			return false;
		}
	});
}