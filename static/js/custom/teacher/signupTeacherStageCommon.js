function showAreaOfSpecializationModal(needtoShow){
	if(needtoShow){
		$('#areaOfSpecializationModalId').modal({
			backdrop: 'static',
			keyboard: false,
		})
	}
	if(PRESERVE_AREA_OF_SPECIALIZATION!=null){
		var ids = PRESERVE_AREA_OF_SPECIALIZATION.split(',')
		for(var index = 0; index<ids.length;index++){
			$('#areaOfspecialisation-'+ids[index]).addClass('greenDiv');
		}
		$("#countAreaOfspecialization").text(ids.length);
	}
}

function cancelAreaOfSpecialization(){
	$(".areaOfSpecialization").each(function() {
		if ($(this).hasClass("greenDiv")) {
			$(this).removeClass("greenDiv");
		}
	});
	var ids = PRESERVE_AREA_OF_SPECIALIZATION.split(',')
	for(var index=0; index<ids.length;index++){
		$('#areaOfspecialisation-'+ids[index]).addClass('greenDiv');
	}
	$("#countAreaOfspecialization").text(ids.length);
	$('#areaOfSpecializationModalId').modal('hide');
}

function calculateAreaOfSpecialization() {
	var selSubjectd = "";
	$(".areaOfSpecialization").each(function() {
		if ($(this).hasClass("greenDiv")) {
			selSubjectd = selSubjectd + "," + $(this).attr('id').split('-')[1];
		}
	});
	
	AREA_OF_SPECIALIZATION=selSubjectd.substr(1);
	$("#countAreaOfspecialization").text(AREA_OF_SPECIALIZATION.split(',').length);
	if (selSubjectd =="" || selSubjectd ==undefined ) {
		showMessage(true, 'Select Area of Specialization');
		return false
	}
	if(parseInt($("#countAreaOfspecialization").text())>= 6){
		showMessage(true, 'You cannot select more than 5 courses.');
		return false
	}
	PRESERVE_AREA_OF_SPECIALIZATION=AREA_OF_SPECIALIZATION;
	$('#areaOfSpecializationModalId').modal('hide');
	console.log('AREA_OF_SPECIALIZATION: '+AREA_OF_SPECIALIZATION);
	console.log('PRESERVE_AREA_OF_SPECIALIZATION: '+PRESERVE_AREA_OF_SPECIALIZATION);
	return AREA_OF_SPECIALIZATION;	
}

function showTaughtGradesModel(needtoShow){
	if(needtoShow){
		$('#taughtGradesModal').modal({
			backdrop: 'static',
			keyboard: false,
		})
	}
	elementrySchoolTaughtGradeCount=0;
	middleSchoolTaughtGradeCount=0;
	highSchoolTaughtGradeCount=0;
	if(PRESERVE_GRADES_TAUGHT!=null){ 
 	  	var ids = PRESERVE_GRADES_TAUGHT.split(',')
 	  	for(var index = 0; index<ids.length;index++){
 	  	  	$('#taughtgradeId-'+ids[index]).addClass('greenDiv');
			if (ids[index] == '1' || ids[index] == '2' || ids[index] == '3'  ) {
				middleSchoolTaughtGradeCount++;
			}else if (ids[index] == '4' || ids[index] == '5' || ids[index] == '6' || ids[index] == '7' ) {
				highSchoolTaughtGradeCount++;
			}else if (ids[index] == '11' || ids[index] == '12' || ids[index] == '13' || ids[index] == '14'|| ids[index] == '15' || ids[index] == '16' || ids[index] == '17' ) {
				elementrySchoolTaughtGradeCount++;
			} 
 	  	}
 	  	$("#countTaughtGrade").text(ids.length);
 	}
}

function cancelGradeTaught() {
	$(".pastTaughtGradeId").each(function() {
		if ($(this).hasClass("greenDiv")) {
			$(this).removeClass("greenDiv");
		}
	});
	var ids = PRESERVE_GRADES_TAUGHT.split(',')
	for(var index=0; index<ids.length;index++){
		console.log(ids[index])
		$('#taughtgradeId-'+ids[index]).addClass('greenDiv');
	}
	$("#countTaughtGrade").text(ids.length);
	$('#taughtGradesModal').modal('hide');
}

function calculateGradeTaught() {
	var selTaughtSubjectd = "";
	$(".pastTaughtGradeId").each(function() {
		if ($(this).hasClass("greenDiv")) {
			selTaughtSubjectd = selTaughtSubjectd + "," + $(this).attr('id').split('-')[1];
		}
	});
	if (selTaughtSubjectd == "") {
		showMessage(true, 'Please select grade');
		return false
	}

	GRADES_TAUGHT = selTaughtSubjectd.substr(1);
//	$("#countTaughtGrade").text(GRADES_TAUGHT.split(',').length);
//	if (parseInt($("#countTaughtGrade").text()) >= 6) {
//		showMessage(true, 'You cannot select more than 5 courses.');
//		return false
//	}
	if(PRESERVE_GRADES_TAUGHT != GRADES_TAUGHT){
		needToCallTaughtSubject=true;
		PRESERVE_GRADES_TAUGHT = GRADES_TAUGHT;
	}
	$('#taughtGradesModal').modal('hide');
	$("#countTaughtGrade").text(GRADES_TAUGHT.split(',').length);
	console.log('GRADES_TAUGHT: ' + GRADES_TAUGHT);
	console.log('PRESERVE_GRADES_TAUGHT: ' + PRESERVE_GRADES_TAUGHT);
	return PRESERVE_GRADES_TAUGHT;
}

function showTaughtSubjectModal(flag) {
	if (flag) {
		if (GRADES_TAUGHT != "") {
			if (needToCallTaughtSubject) {
				callTeacherTaughtSubjects('signupStage3', GRADES_TAUGHT, 'pastTaughtGradeId', true);
				needToCallTaughtSubject=false;
			}
			
			$('#taughtSubjectModal').modal({
				backdrop : 'static',
				keyboard : false
			});
		} else {
			showMessage(true, 'Please select taught grade');
		}
	}
	console.log('GRADES_TAUGHT: ' + GRADES_TAUGHT);
	console.log('PRESERVE_GRADES_TAUGHT: ' + PRESERVE_GRADES_TAUGHT);
}

function cancelSubjectTaught() {
	$(".pastTaughtSubjectId").each(function() {
		if ($(this).hasClass("greenDiv")) {
			$(this).removeClass("greenDiv");
		}
	});
	var ids = PRESERVE_SUBJECTS_TAUGHT.split(',')
	for(var index=0; index<ids.length;index++){
		$('#taughtSubjectId-'+ids[index]).addClass('greenDiv');
	}
	$('#countSubjectTaught').text(ids.length);
	$('#taughtSubjectModal').modal('hide');
}

function calculateSubjectTaught() {
	var selGradeId = "";
	$(".pastTaughtSubjectId").each(function() {
		if ($(this).hasClass("greenDiv")) {
			selGradeId = selGradeId + "," + $(this).attr('id').split('-')[1];
		}
	});
	if (selGradeId == "" || selGradeId == undefined) {
		showMessage(true, 'Please select Course');
		return false
	}
	SUBJECTS_TAUGHT = selGradeId.substr(1);
	PRESERVE_SUBJECTS_TAUGHT = SUBJECTS_TAUGHT;
	$('#countSubjectTaught').text(SUBJECTS_TAUGHT.split(',').length);
	console.log('SUBJECTS_TAUGHT: ' + SUBJECTS_TAUGHT);
	console.log('PRESERVE_SUBJECTS_TAUGHT: ' + PRESERVE_SUBJECTS_TAUGHT);
	$('#taughtSubjectModal').modal('hide');
	return true;
}

function showPreferredGradesModel(needtoShow){
	if(needtoShow){
		$('#preferredGradeModal').modal({
			backdrop: 'static',
			keyboard: false,
		})
	}
	elementrySchoolGradeCount=0;
	middleSchoolGradeCount=0;
	highSchoolGradeCount=0;
	if(PRESERVE_PREFERRED_GRADES!=null){ 
  	  	var ids = PRESERVE_PREFERRED_GRADES.split(',')
  	  	for(var index = 0; index<ids.length;index++){
  	  	  	$('#pregrade-'+ids[index]).addClass('greenDiv');
	  	  	if (ids[index] == '1' || ids[index] == '2' || ids[index] == '3'  ) {
	  	  		middleSchoolGradeCount++;
			}else if (ids[index] == '4' || ids[index] == '5' || ids[index] == '6' || ids[index] == '7' ) {
				highSchoolGradeCount++;
			}else if (ids[index] == '11' || ids[index] == '12' || ids[index] == '13' || ids[index] == '14'|| ids[index] == '15' || ids[index] == '16' || ids[index] == '17' ) {
				elementrySchoolGradeCount++;
			}
  	  	}
  	  $("#countPreferredGrade").text(ids.length);
  	}
}

function cancelPreferredGrade(){
	$(".preferredGradeId").each(function() {
		if ($(this).hasClass("greenDiv")) {
			$(this).removeClass("greenDiv");
		}
	});
	var subIds = PREFERRED_GRADES.split(',')
	for(var index=0; index<subIds.length;index++){
		$('#pregrade-'+subIds[index]).addClass('greenDiv');
	}
	$('#preferredGradeModal').modal('hide');
}

function calculatePreferredGrade() {
	var selPreGradeId = "";
	$(".preferredGradeId").each(function() {
		if ($(this).hasClass("greenDiv")) {
			selPreGradeId = selPreGradeId + "," + $(this).attr('id').split('-')[1];
		}
	});
	PREFERRED_GRADES = selPreGradeId.substr(1);
	if (selPreGradeId == "" || selPreGradeId == undefined) {
		showMessage(true, 'Select Preferred Grade');
		return false
	}
	if(PRESERVE_PREFERRED_GRADES != PREFERRED_GRADES){
		needToCallPreferredSubject=true;
		PRESERVE_PREFERRED_GRADES = PREFERRED_GRADES;
	}
	$('#preferredGradeModal').modal('hide');
	$("#countPreferredGrade").text(PREFERRED_GRADES.split(',').length);
	console.log('PREFERRED_GRADES: ' + PREFERRED_GRADES);
	console.log('PRESERVE_PREFERRED_GRADES: ' + PRESERVE_PREFERRED_GRADES);
	return PREFERRED_GRADES;
}

function showPreferredSubjectModal(flag) {
	if (flag) {
		if (PREFERRED_GRADES != "") {
			if (needToCallPreferredSubject) {
				callTeacherPreferredSubjects('signupStage3', PREFERRED_GRADES, 'preferredGradeId', true);
				needToCallPreferredSubject=false;
			}
			$('#preferredSubjectModal').modal({
				backdrop : 'static',
				keyboard : false
			});
		} else {
			showMessage(true, 'Please select preferred grade');
		}
	}
}

function cancelPreferredSubject() {
	$(".preferredSubjectId").each(function() {
		if ($(this).hasClass("greenDiv")) {
			$(this).removeClass("greenDiv");
		}
	});
	var ids = PRESERVE_PREFERRED_SUBJECTS.split(',')
	for(var index=0; index<ids.length;index++){
		$('#prefferedSubjectId-'+ids[index]).addClass('greenDiv');
	}
	$("#countPreferredSubject").text(ids.length);
	$('#preferredSubjectModal').modal('hide');
}

function calculatePreferredSubject() {
	var selPreSubjectd = "";
	$(".preferredSubjectId").each(function() {
		if ($(this).hasClass("greenDiv")) {
			selPreSubjectd = selPreSubjectd + "," + $(this).attr('id').split('-')[1];
		}
	});
	if (selPreSubjectd == "" || selPreSubjectd == undefined) {
		showMessage(true, 'Select Preferred courses');
		return false
	}
	PREFERRED_SUBJECTS = selPreSubjectd.substr(1);
	$("#countPreferredSubject").text(PREFERRED_SUBJECTS.split(',').length);
	if (parseInt($("#countPreferredSubject").text()) >= 6) {
		showMessage(true, 'You cannot select more than 5 courses.');
		return false
	}
	PRESERVE_PREFERRED_SUBJECTS = PREFERRED_SUBJECTS;
	console.log('PREFERRED_SUBJECTS: ' + PREFERRED_SUBJECTS);
	console.log('PRESERVE_PREFERRED_SUBJECTS: ' + PRESERVE_PREFERRED_SUBJECTS);
	$('#preferredSubjectModal').modal('hide');
	return PREFERRED_SUBJECTS;
}