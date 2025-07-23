function callBatchNameList(formId) {
	var value= $("#"+formId+" #standardIds").select2('val');
	console.log("Building Batch dropdown", value);
	$.ajax({
			type : "POST",
			contentType : "application/json",
			url : getURLForCommon('masters'),
			data : JSON.stringify(getRequestForMaster('formId','BATCH-NAME-LIST-BASED-ON-STANDARD','','','','', value)),
			dataType : 'json',
			cache : false,
			timeout : 600000,
			async : false,
			success : function(data) {
				if (data['status'] == '0' || data['status'] == '2') {
					showMessage(true, data['message']);
				} else {
					var result = data['mastersData']['remarksList'];
					var dropdown = $('#extraActivityForm #batchIds');
					dropdown.html('');
					$.each(result, function(k, v) {
						dropdown.append('<option value="' + v.key + '">'
								+ v.value + ' </option>');
					});
				}
			},
				error : function(e) {
					console.log(e);
				}
			});
}

function callSubjectNameList(formId) {
	var value= $("#"+formId+" #batchIds").select2('val');
	if(value.length===0){
		$("#"+formId+" #subjectIds").html('');
		return false;
	}
	console.log("Building Subject dropdown", value);
	$.ajax({
			type : "POST",
			contentType : "application/json",
			url : getURLForCommon('masters'),
			data : JSON.stringify(getRequestForMaster('formId','SUBJECT-NAME-LIST-BASED-ON-BATCHES','','','','', value)),
			dataType : 'json',
			cache : false,
			timeout : 600000,
			async : false,
			success : function(data) {
				if (data['status'] == '0' || data['status'] == '2') {
					showMessage(true, data['message']);
				} else {
					var result = data['mastersData']['courseList'];
					var dropdown = $('#extraActivityForm #subjectIds');
					dropdown.html('');
					$.each(result, function(k, v) {
						dropdown.append('<option value="' + v.key + '">'
								+ v.value + ' </option>');
					});
				}
			},
				error : function(e) {
					console.log(e);
				}
			});
}

function callBatchNameListForTeacher(formId) {
	var value= $("#"+formId+" #userId").val();
	console.log("Building Batch and Course Name dropdown", value);
	$.ajax({
			type : "POST",
			contentType : "application/json",
			url : getURLForCommon('masters'),
			data : JSON.stringify(getRequestForMaster('formId','BATCH-NAME-LIST-BASED-ON-TEACHER', value)),
			dataType : 'json',
			cache : false,
			timeout : 600000,
			async : false,
			success : function(data) {
				if (data['status'] == '0' || data['status'] == '2') {
					showMessage(true, data['message']);
				} else {
					var result = data['mastersData']['remarksList'];
					var result2 = data['mastersData']['courseList'];
					var dropdown = $('#extraActivityForm #batchIds');
					var dropdown2 = $('#extraActivityForm #subjectIds');
					dropdown.html('');
					dropdown2.html('');
					$.each(result, function(k, v) {
						dropdown.append('<option value="' + v.key + '">'
								+ v.value + ' </option>');
					});
					$.each(result2, function(k, v) {
						dropdown2.append('<option value="' + v.key + '">'
								+ v.value + ' </option>');
					});
				}
			},
				error : function(e) {
					console.log(e);
					// showMessage(true, e.responseText);
					// $("#"+formId+" #pastTaughtSubjectId").prop("disabled",
					// false);
				}
			});
}

function validateExtraActivityDetails(formId){
	if($("#" + formId + " #activityType").val()=='' || $("#" + formId + " #activityType").val()==undefined){
		showMessage(true, "Activity Type is required.");
		return false;
	}
	if($("#" + formId + " #activityFor").val()=='' || $("#" + formId + " #activityFor").val()==undefined){
		showMessage(true, "Activity For is required.");
		return false;
	}
	if($("#" + formId + " #activityMeetingType").val()=='ODM'){
		if($("#" + formId + " #startDate").val()=='' || $("#" + formId + " #startDate").val()==undefined){
			showMessage(true, "Start Date is required.");
			return false;
		}
		if($("#" + formId + " #endDate").val()=='' || $("#" + formId + " #endDate").val()==undefined){
			showMessage(true, "End Date is required.");
			return false;
		}
	}else{
		if($("#" + formId + " #recurringDates").val()=='' || $("#" + formId + " #recurringDates").val()==undefined){
			showMessage(true, "Recurring Dates are required.");
			return false;
		}
	}

	if($("#" + formId + " #timeHrsFrom").val()=='' || $("#" + formId + " #timeHrsFrom").val()==undefined){
		showMessage(true, " Start time hour is required.");
		return false;
	}
	if($("#" + formId + " #timeMinFrom").val()=='' || $("#" + formId + " #timeMinFrom").val()==undefined){
		showMessage(true, " Start time minute is required.");
		return false;
	}
	if($("#" + formId + " #durationMin").val()=='' || $("#" + formId + " #durationMin").val()==undefined){
		showMessage(true, " Duration minute is required.");
		return false;
	}
	if($("#" + formId + " #activityTitle").val()=='' || $("#" + formId + " #activityTitle").val()==undefined){
		showMessage(true, "Activity Title is required.");
		return false;
	}
	if($("#" + formId + " #meetingVendor").val()=='' || $("#" + formId + " #meetingVendor").val()==undefined){
		showMessage(true, "Meeting Vendor is required.");
		return false;
	}
	if($("#" + formId + " #meetingVendor").val()=='External'){
		if($("#" + formId + " #joiningLink").val()=='' || $("#" + formId + " #joiningLink").val()==undefined){
			showMessage(true, "Joining Link is required.");
			return false;
		}
	}
	return true;
}

function saveExtraActivityDetails(formId,moduleId, roleModuleId) {
	hideMessage('');
	if(!validateExtraActivityDetails(formId)){
		return false;
	}

	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForHTML('dashboard', 'save-extra-activity'),
		data : JSON.stringify(getRequestForExtraActivity(formId)),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		success : function(data) {
			console.log("response data is:", data);
			if (data['status'] == '0' || data['status'] == '2') {
				showMessage(true, data['message']);
			} else {
				showMessage(false, data['message']);
				$('#' + formId)[0].reset();
				$('#addExtraActivityModal').modal('toggle');
				setTimeout(function(){ callDashboardPageSchool(128,'extra-activity'); }, 2000);
			}
			return false;
		},
		error : function(e) {
			return false;
		}
	});

	function getRequestForExtraActivity(formId) {
		var request = {};
		var authentication = {};
		var requestData = {};
		var extraActivityDetailsDTO = {};

		extraActivityDetailsDTO['activityTypeId'] =$("#" + formId + " #activityType").val();
		extraActivityDetailsDTO['activityFor'] = $("#" + formId + " #activityFor").val();
		extraActivityDetailsDTO['standardIds'] = $("#" + formId + " #standardIds").select2('val');
		extraActivityDetailsDTO['batchIds'] = $("#" + formId + " #batchIds").select2('val');
		extraActivityDetailsDTO['subjectIds'] = $("#" + formId + " #subjectIds").select2('val');
		extraActivityDetailsDTO['activityMeetingType'] = $("#" + formId + " #activityMeetingType").val();
		extraActivityDetailsDTO['recurringDates'] = $("#" + formId + " #recurringDate").val();
		extraActivityDetailsDTO['startDate'] = $("#" + formId + " #startDate").val();
		extraActivityDetailsDTO['endDate'] = $("#" + formId + " #endDate").val();
		extraActivityDetailsDTO['startTimeHrsFrom'] = $("#" + formId + " #timeHrsFrom").val();
		extraActivityDetailsDTO['startTimeMinFrom'] = $("#" + formId + " #timeMinFrom").val();
		extraActivityDetailsDTO['durationHours'] = $("#" + formId + " #duration").val();
		extraActivityDetailsDTO['durationMinutes'] = $("#" + formId + " #durationMin").val();
		extraActivityDetailsDTO['activityTitle'] = $("#" + formId + " #activityTitle").val();
		if($("#" + formId + " #fileupload1Span").text()=='No file chosen...'){
			extraActivityDetailsDTO['uploadFile'] = "";
		}else{
			extraActivityDetailsDTO['uploadFile'] = $("#" + formId +" #fileupload1Span").text();
		}
		extraActivityDetailsDTO['joiningLink'] = $("#" + formId + " #joiningLink").val();
		extraActivityDetailsDTO['activityPurpose'] = $("#" + formId + " #activityPurpose").val();
		extraActivityDetailsDTO['meetingVendor'] = $("#" + formId + " #meetingVendor").val();
		extraActivityDetailsDTO['schoolId'] = SCHOOL_ID;
		requestData['extraActivityDetailsDTO'] = extraActivityDetailsDTO;

		authentication['hash'] = getHash();authentication['schoolId'] = SCHOOL_ID;
		authentication['schoolUUID'] = SCHOOL_UUID;
		request['authentication'] = authentication;
		request['requestData'] = requestData;
		return request;
	}

}
function activeInactiveExtraActivity(formId,status,id,roleModuleId) {

	var request = {};
	var authentication = {};
	var requestData = {};
	var extraActivityDetailsDTO = {};
	extraActivityDetailsDTO['activeInactiveStatus'] = status;
	extraActivityDetailsDTO['id'] = id;
	requestData['extraActivityDetailsDTO'] = extraActivityDetailsDTO;
	authentication['hash'] = getHash();authentication['schoolId'] = SCHOOL_ID;authentication['schoolUUID'] = SCHOOL_UUID;
	request['authentication'] = authentication;
	request['requestData'] = requestData;

	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForHTML('dashboard', 'active_inactive_extra_activity'),
		data : JSON.stringify(request),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				showMessage(true, data['message']);
			} else {
				showMessage(false, data['message']);
				setTimeout(function() {
				callDashboardPageSchool(roleModuleId,'extra-activity');}, 3000);
			}
			return false;
		},
		error : function(e) {
			return false;
		}
	});

}

function sendMailForExtraActivity(id){
	var request = {};
	var authentication = {};
	var requestData = {};
	var extraActivityDetailsDTO = {};
	extraActivityDetailsDTO['id'] = id;
	requestData['extraActivityDetailsDTO'] = extraActivityDetailsDTO;
	authentication['hash'] = getHash();authentication['schoolId'] = SCHOOL_ID;authentication['schoolUUID'] = SCHOOL_UUID;
	request['authentication'] = authentication;
	request['requestData'] = requestData;

	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForHTML('dashboard', 'extra_activity_send_Mail'),
		data : JSON.stringify(request),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		success : function(data) {
			console.log("response data is:", data);
			if (data['status'] == '0' || data['status'] == '2') {
				showMessage(true, data['message']);
			} else {
				showMessage(false, data['message']);
			}
			return false;
		},
		error : function(e) {
			//showMessage(true, e.responseText);
			return false;
		}
	});

}

function getHash() {
	return 'ajslfkjalksdf'
}
