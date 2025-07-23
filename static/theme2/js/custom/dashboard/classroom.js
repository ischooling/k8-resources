function getBirthDayToday(teacherId, batchId) {
	customLoader(true);
	$.ajax({
		type: "GET",
		contentType: "application/json",
		url: getURLForWithoutUnique('', 'student-birthday-for-teacher/?teacherId=' + teacherId + '&batchId=' + batchId),
		dataType: 'json',
		success: function (data) {
			if (data['status'] == '0' || data['status'] == '2' || data['status'] == '3') {
				if (data['status'] == '3') {
					redirectLoginPage();
				} else {
					if (tt == 'theme1') {
						showMessage(false, data['message']);
					} else {
						showMessageTheme2(0, data['message'], '', true);
					}
				}
			} else if (data['status'] == '1') {
				$("#classroomContentDIV").append(getClassroomReminder(data));
				$("#stuBirthDayTable").dataTable({
					theme: "bootstrap4"
				});
				//$("#classroomContentDIV").append(getStudentNotesContent());

				customLoader(false);
			}
			return false;
		}
	});
}

function getNotes(teacherId, batchId, subjectId) {
	customLoader(true);
	$.ajax({
		type: "GET",
		contentType: "application/json",
		url: getURLForWithoutUnique('', 'get-all-meetings-notes/?teacherId=' + teacherId + '&batchId=' + batchId + '&subjectId=' + subjectId),
		dataType: 'json',
		success: function (data) {
			if (data['status'] == '0' || data['status'] == '2' || data['status'] == '3') {
				if (data['status'] == '3') {
					redirectLoginPage();
				} else {
					if (tt == 'theme1') {
						showMessage(false, data['message']);
					} else {
						showMessageTheme2(0, data['message'], '', true);
					}
				}
			} else {

			}
			return false;
		}
	});
}


function notifyNotes(teacherId, batchId, notesIds) {
	customLoader(true);
	$.ajax({
		type: "POST",
		contentType: "application/json",
		url: getURLForWithoutUnique('', 'notify-notes'),
		data: JSON.stringify(notifyRequest(teacherId, batchId, notesIds)),
		dataType: 'json',
		success: function (data) {
			if (data['status'] == '0' || data['status'] == '2' || data['status'] == '3') {
				if (data['status'] == '3') {
					redirectLoginPage();
				} else {
					if (tt == 'theme1') {
						showMessage(false, data['message']);
					} else {
						showMessageTheme2(0, data['message'], '', true);
					}
				}
			} else {

			}
			return false;
		}
	});
}

function notifyRequest(teacherId, batchId, notesArray) {
	var request = {};
	request['teacherId'] = teacherId;
	request['batchId'] = batchId;
	request['notesArray'] = notesArray;
	return request;
}

