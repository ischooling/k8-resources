function getChildActivityList(parentActivityTypeId) {
	console.log("Building Sub Activity Dropdown", parentActivityTypeId);
	$.ajax({
			type : "POST",
			contentType : "application/json",
			url : getURLForCommon('masters'),
			data : JSON.stringify(getRequestForMaster('formId','CHILD-ACTIVITY-LIST-BY-PARENT-ID', parentActivityTypeId)),
			dataType : 'json',
			cache : false,
			timeout : 600000,
			async : false,
			success : function(data) {
				if (data['status'] == '0' || data['status'] == '2') {
					showMessage(true, data['message']);
				} else {
					var result = data['mastersData']['remarksList'];
					$('#extraActivityForm #subActivityLength').val(result.length);
					if(result.length>0){
						$("#subActivityTypeDiv").show();
						var dropdown = $('#extraActivityForm #subActivityType');
						dropdown.html('');
						dropdown.append('<option value="0">Select Sub Activity</option>');
						$.each(result, function(k, v) {
							dropdown.append('<option value="' + v.key + '">'
									+ v.value + ' </option>');
						});
					}else{
						$("#subActivityTypeDiv").hide();
					}
				}
			},
				error : function(e) {
					console.log(e);
				}
			});
}

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
	$("#userIds").val('').trigger('change');
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
	console.log("Building Batch and Subject Name dropdown", value);
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
	if($("#" + formId + " #activityType").val()==0 || $("#" + formId + " #activityType").val()==undefined){
		showMessage(true, "Activity Type is required.");
		return false;
	}
	if($("#" + formId + " #subActivityLength").val()>0){
		if($("#" + formId + " #subActivityType").val()==0 || $("#" + formId + " #subActivityType").val()==undefined){
			showMessage(true, "Sub Activity Type is required.");
			return false;
		}
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
		if($("#" + formId + " #startDate").val()=='' || $("#" + formId + " #startDate").val()==undefined){
			showMessage(true, "Start Date is required.");
			return false;
		}
		if($("#" + formId + " #endDate").val()=='' || $("#" + formId + " #endDate").val()==undefined){
			showMessage(true, "End Date is required.");
			return false;
		}
		var ckBoxLength = $("#" + formId + " #daycheckboxDiv input:checked").length;	
		if (ckBoxLength==undefined || ckBoxLength == ""  || ckBoxLength==0) {
			showMessage(true, "Please Select atleast a day to add activity.");
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
	if($("#" + formId + " #durationMin").val()=='0' && $("#" + formId + " #duration").val()=='0'){
		showMessage(true, " Duration minute is required if duration hours are not selected.");
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
	if($("#" + formId + " #hostId").val()=='' || $("#" + formId + " #hostId").val()==undefined){
		showMessage(true, "Host is required.");
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
			if (data['status'] == '0' || data['status'] == '2') {
				showMessage(true, data['message']);
			} else {
				showMessage(false, data['message']);
				resetExtraActivityForm(formId);
				$('#addExtraActivityModal').modal('toggle');
				setTimeout(function(){ callDashboardPageSchool(137,'extra-activity'); }, 2000);
			}
			return false;
		},
		error : function(e) {
			return false;
		}
	});
	
}

	function getRequestForExtraActivity(formId) {
		var request = {};
		var authentication = {};
		var requestData = {};
		var extraActivityDetailsDTO = {};

		extraActivityDetailsDTO['activityTypeId'] =$("#" + formId + " #activityType").val();
		if($("#" + formId + " #subActivityLength").val()!=null){
			extraActivityDetailsDTO['subActivityTypeId'] =$("#" + formId + " #subActivityType").val();
		}
		extraActivityDetailsDTO['activityFor'] = $("#" + formId + " #activityFor").val();
		extraActivityDetailsDTO['standardIds'] = $("#" + formId + " #standardIds").select2('val');
		extraActivityDetailsDTO['batchIds'] = $("#" + formId + " #batchIds").select2('val');

		extraActivityDetailsDTO['userIds'] = $("#" + formId + " #userIds").select2('val');
		extraActivityDetailsDTO['subjectIds'] = $("#" + formId + " #subjectIds").select2('val');
		extraActivityDetailsDTO['activityMeetingType'] = $("#" + formId + " #activityMeetingType").val();
		
		extraActivityDetailsDTO['startDate'] = $("#" + formId + " #startDate").val();
		extraActivityDetailsDTO['endDate'] = $("#" + formId + " #endDate").val();
		extraActivityDetailsDTO['startTimeHrsFrom'] = $("#" + formId + " #timeHrsFrom").val();
		extraActivityDetailsDTO['startTimeMinFrom'] = $("#" + formId + " #timeMinFrom").val();
		extraActivityDetailsDTO['durationHours'] = $("#" + formId + " #duration").val();
		extraActivityDetailsDTO['durationMinutes'] = $("#" + formId + " #durationMin").val();
		extraActivityDetailsDTO['showLinkBefore'] = $("#" + formId + " #showLinkBefore").val();
		extraActivityDetailsDTO['activityTitle'] = $("#" + formId + " #activityTitle").val();
		extraActivityDetailsDTO['teacherIdAsHost'] = $("#" + formId + " #hostId").val();
		if($("#" + formId + " #fileupload1Span").text()=='No file chosen...'){
			extraActivityDetailsDTO['uploadFile'] = "";
		}else{
			extraActivityDetailsDTO['uploadFile'] = $("#" + formId +" #fileupload1Span").text();
		}
		extraActivityDetailsDTO['joiningLink'] = $("#" + formId + " #joiningLink").val();
		extraActivityDetailsDTO['activityPurpose'] = $("#" + formId + " #activityPurpose").val();
		extraActivityDetailsDTO['meetingVendor'] = $("#" + formId + " #meetingVendor").val();
		extraActivityDetailsDTO['schoolId'] = SCHOOL_ID;
		if($("#" + formId + " #activityMeetingType").val()=='REC'){
			var ckBoxValues = $("#" + formId + " #daycheckboxDiv input[type='checkbox']:checked").map(function() {
				return this.value;
			  }).get();
			if(ckBoxValues.length>0){
				extraActivityDetailsDTO['daysId'] = ckBoxValues;
			}
			getAllDaysDate(formId);
		}
		extraActivityDetailsDTO['recurringDates'] = $("#" + formId + " #recurringDates").val();
		requestData['extraActivityDetailsDTO'] = extraActivityDetailsDTO;

		authentication['hash'] = getHash();authentication['schoolId'] = SCHOOL_ID;
		authentication['schoolUUID'] = SCHOOL_UUID;
		request['authentication'] = authentication;
		request['requestData'] = requestData;
		return request;
	}

function getWeekdayDates(startDate, endDate, weekdays) {
	var weekdayDates = [];
	var current = moment(startDate).startOf('day');
	var end = moment(endDate).startOf('day');

	while (current.isBefore(end) || current.isSame(end, 'day')) {
		if(weekdays.includes(current.day())) {
			weekdayDates.push(current.format('YYYY-MM-DD'));
		}
		current.add(1, 'days');
	}

	return weekdayDates;
}

function getAllDaysDate(formId){
	var startDate = $("#" + formId + " #startDate").val();
	var endDate = $("#" + formId + " #endDate").val();
	var weekdays = $("#" + formId + " #daycheckboxDiv input[type='checkbox']:checked").map(function() {
		return parseInt(this.value - 1);
	}).get();
	var weekdayDates = getWeekdayDates(startDate, endDate, weekdays);
	$("#" + formId + " #recurringDates").val(weekdayDates.join(', '))
	console.log(weekdayDates.join(', '))
}
function resetExtraActivityForm(formId){
	$('#extraActivityForm #activityTitle').val('');
	$('#extraActivityForm #activityType').val(0).trigger('change');
	$('#extraActivityForm #activityFor').val('').trigger('change');
	$("#userIds").val('').trigger('change');
	$('#extraActivityForm #startDate').val('');
	$('#extraActivityForm #endDate').val('');
	$("#extraActivityForm #recurringDates").val('');
	$('#extraActivityForm #batchIds').val('').trigger('change');
	$("#extraActivityForm #subjectIds").val('').trigger('change');
	$('#extraActivityForm #timeHrsFrom').val('');
	$('#extraActivityForm #timeMinFrom').val('');
	$('#extraActivityForm #duration').val('0');
	$('#extraActivityForm #durationMin').val('0');
	$("#extraActivityForm #fileupload1Span").text('');
	$('#extraActivityForm #activityMeetingType').val('ODM').trigger('change');
	$('#extraActivityForm #joiningLink').val('');
	$('#extraActivityForm #activityPurpose').val('');

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
			console.log("response data is:", data);
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
			//showMessage(true, e.responseText);
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

function copyExtraActivityDetails(activityTypeId,activityFor,activityMeetingType,activityTitle,joiningLink,activityPurpose, startDate,endDate,
		batchIds,subjectIds,recurringDates,startTimeHours,startTimeMin,duration,durationMin,uploadFlie, subActivityName, users){

	$('#addExtraActivityModal').modal('show');
	$('#extraActivityForm #activityTitle').val(activityTitle.replace('- Assessment',''));
	$('#extraActivityForm #activityType').val(activityTypeId).trigger('change');
	$('#extraActivityForm #activityFor').val(activityFor).trigger('change');
	$('#extraActivityForm #startDate').val(startDate);
	$('#extraActivityForm #endDate').val(endDate);
	$("#extraActivityForm #recurringDates").val(recurringDates);
	$('#extraActivityForm #subActivityType option:selected').text(subActivityName);
	$.each(batchIds.split(","), function(i,e){
		$("#extraActivityForm #batchIds option[value='" + e + "']").prop("selected", true);
	});
	$.each(subjectIds.split(","), function(i,e){
		callSubjectNameList('extraActivityForm');
		$("#extraActivityForm #subjectIds option[value='" + e + "']").prop("selected", true);
	});
	if(users!='' && users!=undefined && users!=null){
		getUserListByActivityFor('extraActivityForm',128);
		$.each(users.split(","), function(i,e){
			$("#extraActivityForm #userIds option[value='" + e + "']").prop("selected", true);
		});
	}
	$('#extraActivityForm #timeHrsFrom').val(startTimeHours);
	$('#extraActivityForm #timeMinFrom').val(startTimeMin);
	$('#extraActivityForm #duration').val(duration);
	if(durationMin<60){
		$('#extraActivityForm #durationMin').val(durationMin);
	}else{
		$('#extraActivityForm #durationMin').val('0');
	}
	$("#extraActivityForm #fileupload1Span").text(uploadFlie);
	if(activityMeetingType=='One Day Meeting'){
		$('#extraActivityForm #activityMeetingType').val('ODM').trigger('change');
	}else{
		$('#extraActivityForm #activityMeetingType').val('REC').trigger('change');
	}

	$('#extraActivityForm #joiningLink').val(joiningLink);
	$('#extraActivityForm #activityPurpose').val(activityPurpose);
}

function getUserListByActivityFor(formId, moduleId){

	if($("#" + formId + " #activityFor").val()=='' || $("#" + formId + " #activityFor").val()==undefined){
		showMessage(true, "Activity For is required to get User's List.");
		return false;
	}
	if($("#" + formId + " #activityFor").val()=='All'){
		if($("#" + formId + " #batchIds").val()=='' || $("#" + formId + " #batchIds").val()==undefined){
			showMessage(true, "Class selection is required.");
			return false;
		}
	}
	var activityFor = $("#" + formId + " #activityFor").val();
	var batchIds= $("#"+formId+" #batchIds").select2('val');
	var subjectIds= $("#"+formId+" #subjectIds").select2('val');

	console.log("Building User List Dropdown");
	$.ajax({
			type : "POST",
			contentType : "application/json",
			url : getURLForCommon('masters'),
			data : JSON.stringify(getRequestForActivityMaster('formId','GET-USER-LIST-FOR-ACTIVITY', activityFor,batchIds,subjectIds)),
			dataType : 'json',
			cache : false,
			timeout : 600000,
			async : false,
			success : function(data) {
				if (data['status'] == '0' || data['status'] == '2') {
					showMessage(true, data['message']);
				} else {
					var result = data['mastersData']['remarksList'];
					if(result.length>0){
						var dropdown = $('#extraActivityForm #userIds');
						dropdown.html('');
						$.each(result, function(k, v) {
							dropdown.append('<option value="' + v.key + '">'
									+ v.value + ' </option>');
						});
						showMessage(true, 'User list fetched successfully');
						}else{
						showMessage(true, 'There is no user assigned for selected data.');

						}


				}
			},
				error : function(e) {
					console.log(e);
				}
			});


}

function getHash() {
	return 'ajslfkjalksdf'
}

function getTeacherListForHost(formId, toElementId){
	customLoader(true);
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForCommon('masters'),
		data : JSON.stringify(getRequestForTeacherList('GET-ALL-TEACHER-LIST')),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				showMessage(true, data['message']);
			} else {
				if (data['status'] == '0' || data['status'] == '2') {
					showMessage(true, data['message']);
				} else {
					buildDropdownForHost(data['mastersData']['allTeacherList'], $("#"+formId+" #"+toElementId), 'School Admin');
					showMessage(true, "Teacher list fetched");
				}
			}
			customLoader(false);
		},
		error : function(e) {
			console.log(e);
			customLoader(false);
		}
	});
}

function getRequestForTeacherList(key){
	var request = {};
	var requestData = {};
	var authentication = {};
	authentication['hash'] = getHash(); authentication['schoolId'] = SCHOOL_ID; authentication['schoolUUID'] = SCHOOL_UUID;
	authentication['userType'] = 'COMMON';
	requestData['requestKey'] = key;
	requestData['requestValue'] = SCHOOL_ID;
	request['requestData'] = requestData;
	request['authentication'] = authentication;
	return request;
}

function buildDropdownForHost(result, dropdown, emptyMessage) {
	dropdown.html('');
		dropdown.append('<option value="">Select</option>');
		dropdown.append('<option value="0">' + emptyMessage + '</option>');
	if (result != '') {
		$.each(result, function(k, v) {
			if(v.extra!=null && v.extra1 !=null && v.extra2 !=null && v.extra4 != null){
				dropdown.append('<option value="' + v.key + '" data-fullcourseid="'+v.extra2+'" data-courseProId="'+v.extra3+'">' + v.extra + ' - ' + v.extra1 +' ('+v.extra4+')'+ '</option>');
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