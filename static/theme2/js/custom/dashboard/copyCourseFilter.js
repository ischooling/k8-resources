function callAllStandardList(formId) {
	resetDropdown($('#'+formId+' #gradeDropDown'), 'Select Grade');
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForCommon('masters'),
		data : JSON.stringify(getRequestForMaster('formId', 'ALL-STANDARD-LIST', 'gradeList')),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		async : false,
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				showMessage(true, data['message']);
			} else {
				var result = data['mastersData']['standards'];
				var dropdown = $('#'+formId+' #gradeDropDown');
				dropdown.html('');
				dropdown.append('<option value="0">Select Grade</option>');
				$.each(result, function(k, v) {
					dropdown.append('<option value="' + v.key + '">' + v.value+ ' </option>');
				});
			}
		}
	});
}

function callCourseProviderList(formId, elementId) {
	resetDropdown($('#studentFilter #lmsPlatform'), 'Select LMS Platform');
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForCommon('masters'),
		data : JSON.stringify(getRequestForMaster('formId','ALL-COURSE-PROVIDER-LIST', 'courseProList')),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		async : false,
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				showMessage(true, data['message']);
			} else {
				var result = data['mastersData']['courseList'];
				var dropdown = $('#'+formId+' #'+elementId);
				dropdown.html('');
				//dropdown.append('<option value="0">Select LMS Platform</option>');
				$.each(result, function(k, v) {
					if(v.key==36 || v.key==37 || v.key==38){
						dropdown.append('<option value="' + v.key + '">' + v.value + ' </option>');
						//dropdown.prop("disabled",true)
					}
				});
			}
		}
	});
}

function callCategoryNameList(formId, value) {
	resetDropdown($('#studentFilter #categoryName'), 'Select Category Name');
	var requestExtra = $('#lmsPlatform').val()[0];
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForCommon('masters'),
		data : JSON.stringify(getRequestForMaster('formId', 'ALL-CATEGORY-NAME-LIST', value, requestExtra)),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		async : false,
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				showMessage(true, data['message']);
			} else {
				var result = data['mastersData']['courseList'];
				var dropdown = $('#studentFilter #categoryName');
				dropdown.html('');
				dropdown
						.append('<option value="0">Select Category Name</option>');
				$.each(result, function(k, v) {
					dropdown.append('<option value="' + v.key + '">'+ v.value + ' </option>');
				});
			}
		}
	});
}

function resetCourseSearchFilter(formId) {
	$("#" + formId + " #courseName").val('').trigger('change');
	;
	$("#" + formId + " #lmsPlatform").val('').trigger('change');
	$("#" + formId + " #gradeDropDown").val("").trigger('change');
	$("#" + formId + " #categoryName").val("").trigger('change');
	$("#" + formId + " #courseType").val("").trigger('change');
	$("#" + formId + " #lmsCourseType").val("").trigger('change');
	$("#" + formId + " #lmsCourseId").val('').trigger('change');
	;
	$("#" + formId + " #SyncedLms").val('').trigger('change');
	$("#" + formId + " #courseStatus").val('').trigger('change');

}

function advanceCourseSearchFilter(formId) {
	hideMessage('');
	$
			.ajax({
				type : "POST",
				contentType : "application/json",
				url : getURLForHTML('dashboard', 'filter-copy-course-content'),
				data : JSON
						.stringify(getCallRequestForAdvanceCourseSearchFilter(formId)),
				dataType : 'json',
				async : false,
				success : function(data) {
					if (data['status'] == '0' || data['status'] == '2') {
						showMessage(true, stringMessage[1]);
					} else {
						$('#copyCourseTable tbody').html('');
						console.log("Subject data",
								data['subjectListB2CInfoDTO'])
						if (data['subjectListB2CInfoDTO'].length > 0) {
							var sno = 0;
							$
									.each(
											data['subjectListB2CInfoDTO'],
											function(k, subject) {
												sno++;
												copyCourseTableTr = '<tr id="'
														+ subject.entityId
														+ '" entityName="'
														+ subject.entityName
														+ '">'
														+ '<td><input type="checkbox" class="checkCopySubject" value="'
														+ subject.subjectId
														+ '"></td>'
														+ '<td>'
														+ sno
														+ '</td>'
														+ '<td>'
														+ subject.courseProviderName
														+ '</td>' + '<td>'
														+ subject.standardName
														+ '</td>' + '<td>'
														+ subject.courseName
														+ '</td>' + '<td>'
														+ subject.courseType
														+ '</td>' + '<td>'
														+ subject.parentsId
														+ '</td>' + '<td>'
														+ subject.subjectName
														+ '</td>' + '<td> <span id="courseIdFromLmsError'+subject.subjectId+'" class="text-danger"></span><br/><input type="text" id="courseIdFromLms'+subject.subjectId+'" class="form-control" onkeydown="return M.digit(event);" value="'
														+ subject.lmsCourseId
														+ '"/>'
														+ subject.syncedStatus
														+ '</td>' + '<td class="text-center">'
														+ '<button class="btn btn-sm btn-primary" onclick="saveCourseLmsId('+subject.subjectId+');">Save</button>'
														+ '</td>' + '</tr >';
												// console.log(v.entityId)
												$('#copyCourseTable tbody')
														.append(
																copyCourseTableTr);
											});
						} else {
							copyCourseTableTr = '<tr colspan=8> No data available in table</tr>'
							$('#copyCourseTable tbody').append(
									copyCourseTableTr);
						}
						var startDate = new Date();
						startDate.setDate(startDate.getDate() + 1);
						$(".subjectSemesterStartDateCl").datepicker({
							startDate : startDate,
							format : 'mm-dd-yyyy',
							autoclose : true,
						// todayHighlight : true,
						});
					}
				},
			});
			$("#selectallrow").prop("checked", false);
			$("#copyCourseTable  tbody .checkCopySubject").click(function(){
				var total_check_boxes = $("#copyCourseTable  tbody .checkCopySubject").length;
		        var total_checked_boxes = $("#copyCourseTable  tbody .checkCopySubject:checked").length;
		        if (total_check_boxes === total_checked_boxes) {
		        	$("#selectallrow").prop("checked", true);
                }
                else {
                	$("#selectallrow").prop("checked", false);
                }
			});
}

function getCallRequestForAdvanceCourseSearchFilter(formId) {
	var requestFilterCopyCourse = {};
	var authentication = {};
	var filterAndCopyCourseDTO = {};
	filterAndCopyCourseDTO['gradeId'] = $("#" + formId + " #gradeDropDown")
			.select2('val');
	filterAndCopyCourseDTO['lmsPlatform'] = $("#" + formId + " #lmsPlatform")
			.select2('val');
	filterAndCopyCourseDTO['courseName'] = $("#" + formId + " #courseName")
			.val().trim();
	filterAndCopyCourseDTO['numberOfRecords'] = $(
			"#" + formId + " #numberOfRecords").val().trim();
	if($("#" + formId + " #lmsCourseId").val().length>0){
		filterAndCopyCourseDTO['lmsCourseId'] = $("#" + formId + " #lmsCourseId").val().replace(/ /g,"").split(",");
	}
	filterAndCopyCourseDTO['categoryName'] = $("#" + formId + " #categoryName")
			.select2('val');
	filterAndCopyCourseDTO['lmsCourseType'] = $(
			"#" + formId + " #lmsCourseType").select2('val');
	filterAndCopyCourseDTO['courseType'] = $("#" + formId + " #courseType")
			.select2('val');
	filterAndCopyCourseDTO['syncedLms'] = $("#" + formId + " #SyncedLms").select2('val');
	filterAndCopyCourseDTO['courseStatus'] = $("#" + formId + " #courseStatus")
			.select2('val');
	filterAndCopyCourseDTO['schoolUUID'] = SCHOOL_UUID;
	filterAndCopyCourseDTO['schoolId'] = SCHOOL_ID;

	requestFilterCopyCourse['filterAndCopyCourseDTO'] = filterAndCopyCourseDTO;
	authentication['hash'] = getHash();
	authentication['schoolId'] = SCHOOL_ID;
	authentication['schoolUUID'] = SCHOOL_UUID;
	authentication['userType'] = "SCHOOL";
	authentication['schoolId'] = SCHOOL_ID;
	authentication['schoolUUID'] = SCHOOL_UUID;
	requestFilterCopyCourse['authentication'] = authentication;

	return requestFilterCopyCourse;

}

function validateRequestForCopyCourse(formId,controlType){
	if(controlType !='SYNC' && controlType !='UPDATECOURSE'){

		if($("#" + formId + " #suffixNo").val()==''){
			$('#copyCourseForm #copyCourseErrMessage').text('Please enter suffix number');
			return false;
		}
		if($("#" + formId + " #type").val()=='' || $("#" + formId + " #type").val()==undefined){
			$('#copyCourseForm #copyCourseErrMessage').text('Please choose type');
			return false;
		}
		if($("#" + formId + " #type").val()=='Range'){
			if($("#" + formId + " #startDate").val()=='' || $("#" + formId + " #startDate").val()==undefined){
				$('#copyCourseForm #copyCourseErrMessage').text('Please choose start Date');
				return false;
			}
			if($("#" + formId + " #endDate").val()=='' || $("#" + formId + " #endDate").val()==undefined){
				$('#copyCourseForm #copyCourseErrMessage').text('Please choose end Date');
				return false;
			}
		}
		if($("#" + formId + " #type").val()=='Continous'){
			if($("#" + formId + " #daysCount").val()==''){
				$('#copyCourseForm #copyCourseErrMessage').text('Please enter days');
				return false;
			}
		}
//		if($("#" + formId + " #term").val()==''){
//			$('#copyCourseForm #copyCourseErrMessage').text('Please enter term');
//			return false;
//		}
	}
	return true;
}

function copySelectedCourse(formId, tableId, controlType) {
	$('#copyCourseForm #copyCourseErrMessage').text('');
	var subjectIds = "";
	$('#' + tableId + '> tbody  > tr').each(
			function(index, tr) {
				if ($(this).find(".checkCopySubject").is(":checked")) {
					subjectIds = subjectIds+ $(this).find(".checkCopySubject").val() + ',';
				}
			});
	if (subjectIds == "") {
		$('#copyCourseForm #copyCourseErrMessage').text('Please select atleast one subject to copy');
		return;
	} else {
		$("#copyCourseForm #selectSubjectIds").val(subjectIds.substring(0, subjectIds.length - 1));
	}

	if(!validateRequestForCopyCourse(formId, controlType)){
		return false;
	}
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForHTML('dashboard', 'copy-course'),
		data : JSON.stringify(getRequestForCopyCourse(formId, controlType)),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				$('#copyCourseForm #copyCourseErrMessage').text( data['message']);
			} else {

				if(controlType !='SAVE'){
					var result = data['copyCourseSyncStatus'];
					var msg = $('#copyCourseForm #copyCourseErrMessage');
					$.each(result, function(k, v) {
						msg.append(v.message+'<br/>');
					});
					$('#' + formId)[0].reset();
				}else{
					$('#copyCourseForm #copyCourseErrMessage').text( data['message']);
					$('#' + formId)[0].reset();
				}
			}
			return false;
		},
		error : function(e) {
			// showMessage(true, e.responseText);
			console.log("ERROR : ", e);
		}
	});
	$('#type').val("");
    $('#type').select2({
    	theme:"bootstrap4",
    }).trigger('change');

}

function getRequestForCopyCourse(formId, controlType) {
	var request = {};
	var authentication = {};
	var requestData = {};
	var filterAndCopyCourseDTO = {};
	// filterAndCopyCourseDTO['userId'] = $("#"+formId+" #userId").val();
	filterAndCopyCourseDTO['controlType'] =controlType;
	filterAndCopyCourseDTO['copySubjectIds'] = $("#" + formId + " #selectSubjectIds").val();
	filterAndCopyCourseDTO['derivative'] = $("#" + formId + " #derivative")
			.val();
	filterAndCopyCourseDTO['suffix'] = $("#" + formId + " #suffix").val();
	filterAndCopyCourseDTO['suffixNo'] = $("#" + formId + " #suffixNo").val();
	filterAndCopyCourseDTO['externalId'] = $("#" + formId + " #externalId")
			.val();
	filterAndCopyCourseDTO['type'] = $("#" + formId + " #type").val();
	filterAndCopyCourseDTO['daysCount'] = $("#" + formId + " #daysCount").val();
	filterAndCopyCourseDTO['startDate'] = $("#" + formId + " #startDate").val();
	filterAndCopyCourseDTO['endDate'] = $("#" + formId + " #endDate").val()
			.trim();
	filterAndCopyCourseDTO['term'] = $("#" + formId + " #term").val();
	filterAndCopyCourseDTO['lmsPlatform'] = $("#lmsPlatform").val();
	filterAndCopyCourseDTO['schoolId'] = SCHOOL_ID;
	requestData['filterAndCopyCourseDTO'] = filterAndCopyCourseDTO;
	authentication['hash'] = getHash();
	authentication['schoolId'] = SCHOOL_ID;
	authentication['schoolUUID'] = SCHOOL_UUID;
	authentication['userType'] = 'SCHOOL';
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	return request;
}

function saveCourseLmsId(subjectId){
	if($('#courseIdFromLms'+subjectId).val()=='' || $('#courseIdFromLms'+subjectId).val()==undefined){
		$('#courseIdFromLmsError'+subjectId).text('Lms Course Id is mandatory.')
		return false;
	}
	var lmsCourseId = $('#courseIdFromLms'+subjectId).val();
	$.ajax({
		type : "GET",
		contentType : "application/json",
		url : getURLForHTML('dashboard', 'save-copy-course-lms-id'),
		data : "subjectId="+subjectId+"&lmsCourseId="+lmsCourseId,
		dataType : 'json',
		cache : false,
		timeout : 600000,
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				$('#courseIdFromLmsError'+subjectId).text('Lms Course Id not saved.');
			} else {
				$('#courseIdFromLmsError'+subjectId).removeClass('text-danger');
				$('#courseIdFromLmsError'+subjectId).addClass('text-success');
				$('#courseIdFromLmsError'+subjectId).text('Lms Course Id saved successfully.');
			}
			return false;
		},
		error : function(e) {
			// showMessage(true, e.responseText);
			console.log("ERROR : ", e);
		}
	});
}