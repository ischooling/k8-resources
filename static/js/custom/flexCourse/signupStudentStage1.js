$(document).ready(function() {
	
});
function saveSignupStudentFlex(){
	if(signupPage==1){
		if($('#creditCount').val().endsWith(".5")){
			$('#halfSemesterWarning').modal('show');
			window.setTimeout(function(){tabActiveStatus(1);},100)
		}else{
			callForSignupUserDetails('signupStage1');
		}
	}else if(signupPage==2){
		callForSignupStudentDetails('signupStage2');
	}else if(signupPage==3){
		callForSignUpEducation('signupStage3');
	}else if(signupPage==4){
		//callForSignupStudentAddressDetails('signupStage4');
		callForSignupCourseDetails('signupStage6');
	}else if(signupPage==5){
		getStudentSignupDetailInReviewStage('signupStage6');
		$('#Preview').show();
	}else if(signupPage==6){
		
		
	}else if(signupPage==7){
		//getRequestForStudentPayment('signupStage6');
	}
	
}

function validateRequestForSignupUser(formId){
	
	return true;
}

function callForSignupUserDetails(formId) {
	hideMessage('');
	if(!validateRequestForSignupUser(formId)){
		tabActiveStatus(1);
		return false;
	}
	$("#nextStep").prop("disabled", true);
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForHTML('student/flexcourse','signup/stage-1'),
		data : JSON.stringify(getRequestForFlexCourseDetailsForStudentDetails(formId)),
		dataType : 'html',
		cache : false,
		timeout : 600000,
		success : function(htmlContent) {
			if(htmlContent!=""){
            	var stringMessage = [];
            	stringMessage = htmlContent.split("|");
        		if(stringMessage[0] == "FAILED" || stringMessage[0] == "EXCEPTION" || stringMessage[0] == "SESSIONOUT"){
        			if(stringMessage[0] == "SESSIONOUT"){
        				redirectLoginPage();
        			}else{
        				showMessage(true, stringMessage[1]);
            			tabActiveStatus(1);
        			}
        		} else {
        			$('#signupStage2Content').html(htmlContent)
        			showMessage(false, 'Courses updated successfully.');
        			tabActiveStatus(2);
        		}
        		$("#nextStep").prop("disabled", false);
        		return false;
			}
		},
		error : function(e) {
			$("#nextStep").prop("disabled", false);
			tabActiveStatus(1);
		}
	});
}

function getRequestForFlexCourseDetailsForStudentDetails(formId){	
	var flexCourseDetailsInfoDTO = {};
	flexCourseDetailsInfoDTO['enrollmentType'] = $("#enrollmentType").val();
	flexCourseDetailsInfoDTO['standardId'] = $("#standardId").val();
	flexCourseDetailsInfoDTO['selectedSubjects'] = $("#selectedSubjects").val();
	flexCourseDetailsInfoDTO['location'] = $("#location").val();
	console.log('getRequestForFlexCourseDetailsForStudentDetails '+flexCourseDetailsInfoDTO);
	return flexCourseDetailsInfoDTO;
}


function getRequestForFlexCourseDetails(formId) {

	var flexCourseDetailsInfoDTO = {};
	flexCourseDetailsInfoDTO['enrollmentType'] = $("#enrollmentType").val();
	flexCourseDetailsInfoDTO['standardId'] = $("#standardId").val();
	flexCourseDetailsInfoDTO['selectedSubjects'] = $("#selectedSubjects").val();
	flexCourseDetailsInfoDTO['location'] = $("#location").val();
	console.log('getRequestForFlexCourseDetails '+flexCourseDetailsInfoDTO);
	return flexCourseDetailsInfoDTO;
}

function showFlexCourses(formId){
	$('#flex-course-selected-div').hide();
	$('#flex-course-div').show();
	var postData=JSON.stringify(getRequestForFlexCourseDetails(formId))
	console.log('showFlexCourses postData : '+postData);
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForHTML('student/flexcourse','signup/course-details-by-standard-id'),
		data :postData,
		dataType : 'html',
		cache : false,
		timeout : 600000,
		success : function(htmlContent) {
			if(htmlContent!=""){
            	var stringMessage = [];
            	stringMessage = htmlContent.split("|");
        		if(stringMessage[0] == "FAILED" || stringMessage[0] == "EXCEPTION" || stringMessage[0] == "SESSIONOUT"){
        			if(stringMessage[0] == "SESSIONOUT"){
        				redirectLoginPage();
        			}else{
        				showMessage(true, stringMessage[1]);
        			}
        		} else {
        			$('#nextStep').hide();
        			$('#flex-course-div').html(htmlContent)
        			//showMessage(false, 'Flex course list fetch successfully');
        		}
        		$("#nextStep").prop("disabled", false);
        		return false;
			}
		},
		error : function(e) {
			$("#nextStep").prop("disabled", false);
		}
	});
}

function flushSelectedCourse(){
	$('#selectedSubjects').val('');
	$(".selected-course ").each(function(){
        $(this).removeClass('selected-course');
        var functionName=$(this).attr('onclick');
        console.log('functionName '+functionName);
        functionName = functionName.replace('true',false);
        console.log('functionName '+functionName);
        $(this).attr('onclick',functionName);
	});
	$('#go-to-cart').attr('subjects', 0);
	$('#go-to-cart').addClass('disable-go-to-cart-btn');
	$('#go-to-cart').text('Go to cart ('+$('#go-to-cart').attr('subjects')+')');
	setSelectedSubjectInSession('signupStage1');
}

function switchGrade(standardId){
	console.log('standardId=>'+standardId+", standardId field => "+$('#standardId').val())
	console.log('FT => '+$('#selectedSubjects').val());
	if($('#standardId').val()==standardId){
		setFlexStandard(standardId)
	}else{
		if($('#selectedSubjects').val()!='' ){
			if(standardId==9){
				$('#gradeChangeWarningMessage').html('You are about to switch to Middle School courses. Please note that your High School course selection will be lost. Do you wish to proceed?');
			}else if(standardId==10){
				$('#gradeChangeWarningMessage').html('You are about to switch to High School courses. Please note that your Middle School course selection will be lost. Do you wish to proceed?');
			}else{
			}
			$('#gradeChangeWarningYes').attr("onclick", "switchGradeYes('"+standardId+"')");
			$('#gradeChangeWarningNo').attr("onclick", "switchGradeNo('"+standardId+"')");
			$('#gradeChangeWarning').modal('show');
		}else{
			setFlexStandard(standardId)
		}
	}
}

function switchGradeYes(standardId){
	$('#gradeChangeWarning').modal('hide');
	flushSelectedCourse();
	setFlexStandard(standardId);
	setSelectedSubjectInSession('signupStage1');
	//window.location = CONTEXT_PATH+"student/flexcourse/signup/flush-session-and-redirect?standardId="+standardId;
}

function switchGradeNo(standardId){
	if($('#standardId').val()==9){
		$('#middle-school-tab').trigger('click');
		$('#class-9').show();
		$('#class-10').hide();
	}else if ($('#standardId').val()==10){
		$('#high-school-tab').trigger('click');
		$('#class-10').show();
		$('#class-9').hide();
	}
	$('#gradeChangeWarning').modal('hide');
}

function setFlexStandard(standardId){
	$('#standardId').val(standardId);
	if(standardId==9){
		$('#class-9').show();
		$('#class-10').hide();
		$("#class-9").select2({
		    placeholder: "Search...",
		});
		if ($('#class-10').hasClass("select2-hidden-accessible")) {
			$('#class-10').select2('destroy');
		}
	}else if(standardId==10){
		$('#class-9').hide();
		$('#class-10').show();
		$("#class-10").select2({
		    placeholder: "Search...",
		});
		if ($('#class-9').hasClass("select2-hidden-accessible")) {
			$('#class-9').select2('destroy');
		}
	}
}

function getSelectedFlexSubjects(divId, elementId, pickInitialValue){
	var selectedSubject='';
	if(pickInitialValue){
		if($('#'+elementId).val()==''){
			
		}else{
			selectedSubject=$('#'+elementId).val()+",";
		}
	}
	$("#"+divId+" li a").each(function(){
		if ($(this).attr('class') == 'selected-course') {
			selectedSubject+=$(this).attr('courseId')+',';
		}
    });
	selectedSubject = selectedSubject.substring(0,selectedSubject.length-1);
	$('#'+elementId).val(selectedSubject);
}

function updateCart(formId){
	getSelectedFlexSubjects('course-list-wrapper-FT10','selectedSubjects',false);
	getSelectedFlexSubjects('course-list-wrapper-CR10','selectedSubjects',true);
	getSelectedFlexSubjects('course-list-wrapper-AP10','selectedSubjects',true);
	getSelectedFlexSubjects('course-list-wrapper-CTE10','selectedSubjects',true);
	getSelectedFlexSubjects('course-list-wrapper-FT9','selectedSubjects',true);
	getSelectedFlexSubjects('course-list-wrapper-CR9','selectedSubjects',true);
	getSelectedFlexSubjects('course-list-wrapper-AP9','selectedSubjects',true);
}

function goToCart(formId, checkValidationa){
	if(checkValidationa){
		if($('#go-to-cart').attr('subjects')==0){
			showMessage(true, 'Cart is empty');
			return false;
		}
		updateCart(formId);
	}
	
	var postData=JSON.stringify(getRequestForFlexCourseDetails(formId))
	console.log('showFlexCourses postData : '+postData);
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForHTML('student/flexcourse','signup/course-details-subject-id'),
		data :postData,
		dataType : 'html',
		cache : false,
		timeout : 600000,
		success : function(htmlContent) {
			if(htmlContent!=""){
            	var stringMessage = [];
            	stringMessage = htmlContent.split("|");
        		if(stringMessage[0] == "FAILED" || stringMessage[0] == "EXCEPTION" || stringMessage[0] == "SESSIONOUT"){
        			if(stringMessage[0] == "SESSIONOUT"){
        				redirectLoginPage();
        			}else{
        				showMessage(true, stringMessage[1]);
        			}
        		} else {
        			$('#nextStep').show();
        			$('#flex-course-selected-div').html(htmlContent)
        			$('#flex-course-div').hide();
        			$('#flex-course-selected-div').show();
        			//showMessage(false, 'Flex course details fetch successfully');
        		}
        		$("#nextStep").prop("disabled", false);
        		return false;
			}
		},
		error : function(e) {
			$("#nextStep").prop("disabled", false);
		}
	});
}

function removeFromCart(subjectId){
	$('#subject-id-'+subjectId).removeClass('selected-course');
	$('#subject-id-'+subjectId).attr("onclick", "displayFlexCourseDetails('"+subjectId+"', 'false','chooseSubject');");
	closeCourseDetailsDescription();
	var totalSubject = parseInt($('#go-to-cart').attr('subjects'))-1;
	$('#go-to-cart').attr('subjects', totalSubject);
	$('#go-to-cart').text('Go to cart ('+$('#go-to-cart').attr('subjects')+')');
	if(totalSubject==0){
		$('#go-to-cart').addClass('disable-go-to-cart-btn');
		$('#go-to-cart').prop("disabled", true);
	}else{
		$('#go-to-cart').removeClass('disable-go-to-cart-btn');
		$('#go-to-cart').prop("disabled", false);
	}
	updateCart('signupStage1');
	setSelectedSubjectInSession('signupStage1');
}

function removeSubject(subjectId, creditLimit){
	var subjects = $('#selectedSubjects').val().split(',');
	$('#cart-subject-id-'+subjectId).remove();
	subjects = $.grep(subjects, function(value) {
		return value != subjectId;
	});
	$('#creditCount').val(parseFloat($('#creditCount').val())-parseFloat(creditLimit));
	console.log('subjects.length :'+subjects.length);
	$('#selectedSubjects').val(subjects.join());
	if(subjects.length==0){
		showFlexCourses('signupStage1');
		setSelectedSubjectInSession('signupStage1');
//		window.location = CONTEXT_PATH+"student/flexcourse/signup/flush-session-and-redirect";
	}else{
		goToCart('signupStage1',false);
		setSelectedSubjectInSession('signupStage1');
	}
}

function displayFlexCourseDetailsFromSearch(callFrom){
	var subjectId = 0;
	if($('#standardId').val()==9){
		subjectId = $('#class-9').val();
	}else if($('#standardId').val()==10){
		subjectId = $('#class-10').val();
	}
	if(subjectId!=''){
		displayFlexCourseDetails(subjectId, false, callFrom)
	}
}

function displayFlexCourseDetails(subjectId, isSelected, callFrom){
	$('.modal-backdrop').remove();
	console.log('subjectId => '+subjectId+', isSelected => '+isSelected)
	$.ajax({
		type : "GET",
		contentType : "application/json",
		url : getURLForHTML('student/flexcourse','signup/subject-discription'),
		data :'subjectId='+subjectId+"&isSelected="+isSelected+"&callFrom="+callFrom,
		dataType : 'html',
		cache : false,
		timeout : 600000,
		success : function(htmlContent) {
			if(htmlContent!=""){
            	var stringMessage = [];
            	stringMessage = htmlContent.split("|");
        		if(stringMessage[0] == "FAILED" || stringMessage[0] == "EXCEPTION" || stringMessage[0] == "SESSIONOUT"){
        			if(stringMessage[0] == "SESSIONOUT"){
        				redirectLoginPage();
        			}else{
        				showMessage(true, stringMessage[1]);
        			}
        		} else {
        			$('#flex-course-description-details').html(htmlContent)
        		}
        		return false;
			}
		}
	});
}

function setSelectedSubjectInSession(formId){
	var postData=JSON.stringify(getRequestForFlexCourseDetails(formId))
	console.log('showFlexCourses postData : '+postData);
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForHTML('student/flexcourse','signup/set-courses-session'),
		data :postData,
		dataType : 'html',
		cache : false,
		timeout : 600000,
		success : function(htmlContent) {
//			if(htmlContent!=""){
//            	var stringMessage = [];
//            	stringMessage = htmlContent.split("|");
//        		if(stringMessage[0] == "FAILED" || stringMessage[0] == "EXCEPTION" || stringMessage[0] == "SESSIONOUT"){
//        			if(stringMessage[0] == "SESSIONOUT"){
//        				redirectLoginPage();
//        			}else{
//        				showMessage(true, stringMessage[1]);
//        			}
//        		} else {
//        			showMessage(false, 'Cart updated successfully');
//        		}
//        		return false;
//			}
		}
	});
}
function updateSearchBox(subjectId){
	
}
function addToCard(subjectId){
	$('#subject-id-'+subjectId).addClass('selected-course');
	$('#subject-id-'+subjectId).removeAttr('onclick');
	$('#subject-id-'+subjectId).attr('onclick','displayFlexCourseDetails("'+subjectId+'", "true","chooseSubject")');
	closeCourseDetailsDescription();
	var totalSubject = parseInt($('#go-to-cart').attr('subjects'))+1;
	$('#go-to-cart').attr('subjects', totalSubject);
	$('#go-to-cart').text('Go to cart ('+$('#go-to-cart').attr('subjects')+')');
	if(totalSubject==0){
		$('#go-to-cart').prop("disabled", true);
		$('#go-to-cart').addClass('disable-go-to-cart-btn');
	}else{
		$('#go-to-cart').prop("disabled", false);
		$('#go-to-cart').removeClass('disable-go-to-cart-btn');
	}
	updateCart('signupStage1');
	updateSearchBox(subjectId);
	setSelectedSubjectInSession('signupStage1');
}

function arrangeOrder(){
	$(".course-list-item").each(function(){
	    $(this).attr('style','grid-row-end: span '+Math.ceil((($(this).children().height()-2)/16)+1));
	});
}

function closeCourseDetailsDescription(){
	if($('#standardId').val()==9){
		$('#class-9').val('').trigger('change');
	}else if($('#standardId').val()==10){
		$('#class-10').val('').trigger('change');
	}
	$('#flex-course-desc-modal').modal('hide');
}