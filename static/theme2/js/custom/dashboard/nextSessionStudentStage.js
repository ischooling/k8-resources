$(document).ready(function() {
	restrictKeyEnter('scholarshipCodeInside');
});
function callMigrationStep2(formId,backStepValue,nextStep, nextGradeId,enrollmentType) {
	hideMessage('');
	$.ajax({
		type : "POST",
		url : getURLForHTML('dashboard','student/migration-step-2?backStepValue='+backStepValue),
		data : JSON.stringify(getRequestForMigrationStep2(formId, nextGradeId, enrollmentType)),
		dataType : 'html',
		contentType : "application/json",
		success : function(htmlContent) {
			if(htmlContent!=""){
            	var stringMessage = [];
            	stringMessage = htmlContent.split("|");
        		if(stringMessage[0] == "FAILED" || stringMessage[0] == "EXCEPTION" || stringMessage[0] == "SESSIONOUT"){
        			if(stringMessage[0] == "SESSIONOUT"){
        				redirectLoginPage();
        			}else{
        				showMessageTheme2(1, stringMessage[1],'',true);
        			}
        		} else {
        			$('#migrationStep2').html(htmlContent);
        			showMessageTheme2(1, 'Please choose one elective subject','',true);
        			steps(nextStep);
        		}
        		return false;
			}
		}
	});
}

function getRequestForMigrationStep2(formId, nextGradeId, enrollmentType) {
	var studentCourseDetailsInfoDTO = {};
	studentCourseDetailsInfoDTO['enrollmentType'] = enrollmentType;
	studentCourseDetailsInfoDTO['standardId'] = nextGradeId;
	return studentCourseDetailsInfoDTO;
}

function callMigrationStep3(formId,backStepValue,nextStep,callFrom){
	hideMessage('');
	hideModalMessage('');
	$.ajax({
		type : "POST",
		url : getURLForHTML('dashboard','student/migration-step-3?backStepValue='+backStepValue),
		data :JSON.stringify(getRequestForMigrationStep3(formId,callFrom)),
		dataType : 'html',
		contentType : "application/json",
		success : function(htmlContent) {
			customLoader(false);
			if(htmlContent!=""){
            	var stringMessage = [];
            	stringMessage = htmlContent.split("|");
        		if(stringMessage[0] == "FAILED" || stringMessage[0] == "EXCEPTION" || stringMessage[0] =="SESSIONOUT"){
        			if(stringMessage[0] == "SESSIONOUT"){
        				redirectLoginPage();
        			}else{
						showMessageTheme2(0, stringMessage[1], '', true);
					}
        		} else {
        			$('#migrationStep3').html(htmlContent);
        			showMessageTheme2(1, 'You have selected subject successfully','',true);
        			steps(nextStep);
        		}
			}
		}
	});
}

function getRequestForMigrationStep3(formId, callFrom) {
	var courseDetailsDTO={};
	courseDetailsDTO['standardId'] = $("#standardId").val();
	courseDetailsDTO['callFrom'] = callFrom;
	courseDetailsDTO['enrollmentType'] = $("#enrollmentType").val();
	courseDetailsDTO['selectedSubjects'] = $("#selectedSubjects").val();
	courseDetailsDTO['payMode'] = $("#payMode").val();
	courseDetailsDTO['scholarshipCode'] = $("#scholarshipCodeInside").val();

	courseDetailsDTO['creditCountRegular'] = $("#creditCountRegular").val();
	courseDetailsDTO['parentSubjectIdRegural'] = $("#parentSubjectIdRegural").val();
	return courseDetailsDTO;
}


function callMigrationStep4(formId,backStepValue, nextStep) {
	hideMessage('');
	if(!validateRequestForMigrationStep4(formId)){
		return false;
	}
	$.ajax({
		type : "POST",
		url : getURLForHTML('dashboard','student/migration-step-4?backStepValue='+backStepValue),
		data : JSON.stringify(getRequestForMigrationStep4(formId)),
		dataType : 'html',
		contentType : "application/json",
		success : function(htmlContent) {
			if(htmlContent!=""){
            	var stringMessage = [];
            	stringMessage = htmlContent.split("|");
        		if(stringMessage[0] == "FAILED" || stringMessage[0] == "EXCEPTION" || stringMessage[0] == "SESSIONOUT"){
        			if(stringMessage[0] == "SESSIONOUT"){
        				redirectLoginPage();
        			}else{
        				showMessageTheme2(0, stringMessage[1], '', true);
        			}
        		} else {
        			$('#migrationStep4').html(htmlContent);
        			steps(nextStep);
        			showMessageTheme2(1, 'You have successfully selected batch', '', true);
        		}
			}
		}
	});
}

function getRequestForMigrationStep4(formId){
	var request = {};
	var authentication = {};
	var requestData = {};
	requestData['requestKey']=$("input[name='batchId']:checked").val()
	authentication['hash'] = getHash();
	authentication['schoolId'] = SCHOOL_ID;
	authentication['schoolUUID'] = SCHOOL_UUID;
	authentication['userType'] = 'STUDENT';
	authentication['userId'] = $("#"+formId+" #userId").val();
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	return request;
}

function validateRequestForMigrationStep4(formId){
	if($('.batch-item' ).length==0){
		showMessageTheme2(0, 'No batch is available, Please contact the admission support for further information.');
		return false;
	}
	if($("input[name='batchId']:checked").val()==undefined){
		showMessageTheme2(0, 'Please select at least one batch to process further.');
		return false;
	}
	return true;
}

function callMigrationStep5(formId, backStepValue,nextStep, callFrom) {
	hideMessage('');
	if(!validateRequestForMigrationStep5(formId, callFrom)){
		return false;
	}
	$.ajax({
		type : "POST",
		url : getURLForHTML('dashboard','student/migration-step-5?backStepValue='+backStepValue),
		data : JSON.stringify(getRequestForMigrationStep5(formId, callFrom)),
		dataType : 'html',
		contentType : "application/json",
		success : function(htmlContent) {
			if(htmlContent!=""){
            	var stringMessage = [];
            	stringMessage = htmlContent.split("|");
        		if(stringMessage[0] == "FAILED" || stringMessage[0] == "EXCEPTION" || stringMessage[0] == "SESSIONOUT"){
        			if(stringMessage[0] == "SESSIONOUT"){
        				redirectLoginPage();
        			}else{
        				showMessageTheme2(0, stringMessage[1], '', true);
        			}
        		} else {
        			$('#migrationStep5').html(htmlContent);
        			steps(nextStep);
        			showMessageTheme2(1, 'You have successfully chosen a payment plan', '', true);
        		}
			}
		}
	});
}

function getRequestForMigrationStep5(formId, callFrom){
	var request = {};
	var authentication = {};
	var requestData = {};
	var courseDetailsDTO={};
	courseDetailsDTO['standardId'] = $("#standardId").val();
	courseDetailsDTO['enrollmentType'] = $("#enrollmentType").val();
	courseDetailsDTO['selectedSubjects'] = $("#selectedSubjects").val();
	courseDetailsDTO['payMode'] = $("#payMode").val();
	courseDetailsDTO['callFrom'] = callFrom;
	if($("#regPaymentType").val()==''){
		courseDetailsDTO['scholarshipCode'] = $("#scholarshipCode").val();
	}else{
		courseDetailsDTO['scholarshipCode'] = '';
	}
	courseDetailsDTO['creditCountRegular'] = $("#creditCountRegular").val();
	courseDetailsDTO['parentSubjectIdRegural'] = $("#parentSubjectIdRegural").val();

	requestData['courseDetailsDTO']=courseDetailsDTO;

	authentication['hash'] = getHash();
	authentication['userType'] = 'STUDENT';
	authentication['userId'] = $("#"+formId+" #userId").val();
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	console.log('request '+request);
	return request;
}

function validateRequestForMigrationStep5(formId, callFrom){
	if (!validateFormAscii(formId)) {
		showMessageTheme2(0, 'Please use the English Keyboard while providing information');
		return false;
	}
	if(!$("#checkTerms").is(':checked')){
		showMessageTheme2(0, 'Please agree to terms and conditions');
		return false;
	}
	return true;
}


function showPaymentTermCondMode(){
	hideModalMessage();
	$('#callPaymentStudentModal').modal('show');
}

function callMigrationMoveToDashboard() {
	hideMessage('');
	$.ajax({
		type : "GET",
		url : getURLForHTML('dashboard','student/migration-to-dashboard'),
		dataType : 'html',
		contentType : "application/json",
		success : function(htmlContent) {
			if(htmlContent!=""){
            	var stringMessage = [];
            	stringMessage = htmlContent.split("|");
        		if(stringMessage[0] == "0" || stringMessage[0] == "2" || stringMessage[0] == "3"){
        			if(stringMessage[0] == "3"){
        				redirectLoginPage();
        			}else{
        				showMessageTheme2(0, stringMessage[1], '', true);
        			}
        		}else{
					showMessageTheme2(1, 'You are successfully migrated');
        			goAhead(stringMessage[1], '');
				}
			}
		}
	});
}

function assignEvent(indexPosition, subjectId, courseId, tabActive, userReachedMaxLimit, courseCreditLimit, courseSelectedCredit, subjectCredit){
	if(subjectId==''){
		showMessageTheme2(2, 'Please select a subject then click on the add button.');
		return false;
	}
	var functionName="addCourse('"+subjectId+"','"+courseId+"','"+tabActive+"','"+userReachedMaxLimit+"','"+courseCreditLimit+"','"+courseSelectedCredit+"','"+subjectCredit+"');";
	$('#add_course_'+courseId+'_'+indexPosition).attr('onclick',functionName);
	addCourse(subjectId, courseId, tabActive, userReachedMaxLimit, courseCreditLimit, courseSelectedCredit, subjectCredit)
}
function addCourse(subjectId, courseId, tabActive, userReachedMaxLimit, courseCreditLimit, courseSelectedCredit, subjectCredit){
	//console.log('courseCreditLimit '+courseCreditLimit+', courseSelectedCredit '+courseSelectedCredit+', subjectCredit '+subjectCredit)
	var currentSelectedCredits=parseFloat(subjectCredit)+parseFloat(courseSelectedCredit);
	//console.log('currentSelectedCredits '+currentSelectedCredits)
	if(parseFloat(currentSelectedCredits) > parseFloat(courseCreditLimit) ){
		showMessageTheme2(2, 'You have already selected maximum subjects from this category.');
		return false;
	}
	if(userReachedMaxLimit =='true'){
		showMessageTheme2(2, 'You have already selected maximum subjects from this category.');
		return false;
	}
	$("#controlType").val('add');
	var selectedSubjects = $('#selectedSubjects').val();
	//console.log('selectedSubjects add '+selectedSubjects);
	var selectedSubjects = selectedSubjects.split(',');
	selectedSubjects.push(subjectId);
	selectedSubjects=selectedSubjects.join(',');
	//console.log('selectedSubjects add '+selectedSubjects);
	$('#selectedSubjects').val(selectedSubjects)
	getAllCourseDetails('formMigrationStep3','0','N',false,'1',courseId);
	showSpecificContentNew(tabActive, courseId);
}

function removeCourse(subjectId,courseId, activeTab){
	var selectedSubjects = $('#selectedSubjects').val();
	selectedSubjects = selectedSubjects.split(',');
	//console.log('selectedSubjects remove '+selectedSubjects);
	selectedSubjects = selectedSubjects.filter(subId => subId !== subjectId)
	selectedSubjects=selectedSubjects.join(',');
	$('#selectedSubjects').val(selectedSubjects)
	$("#controlType").val('remove');
	$(".course-category").find("div[seletedsubject='"+subjectId +"']").addClass("slideout-animation").removeClass("slide-animation");
	$(".course-category").find("div[seletedsubject='"+subjectId +"']").removeClass("slide-animation").addClass("slideout-animation");
	setTimeout(function(){
		$(".course-category").find("div[seletedsubject='"+subjectId +"']").hide();
	}, 800);
	getAllCourseDetails('formMigrationStep3','0','N',false,'1',courseId);
	showSpecificContentNew(activeTab, courseId);
}
function displayCourseDetails(subjectId){
	$.ajax({
		type : "GET",
		contentType : "application/json",
		url : getURLForHTML('dashboard','student/subject-discription'),
		data :'subjectId='+subjectId,
		dataType : 'html',
		success : function(htmlContent) {
			if(htmlContent!=""){
            	var stringMessage = [];
            	stringMessage = htmlContent.split("|");
        		if(stringMessage[0] == "FAILED" || stringMessage[0] == "EXCEPTION" || stringMessage[0] == "SESSIONOUT"){
        			if(stringMessage[0] == "SESSIONOUT"){
        				redirectLoginPage();
        			}else{
        				showMessageTheme2(1, stringMessage[1],'',true);
        			}
        			return false;
        		} else {
        			$('#course-description-details').html(htmlContent)
        			return true;
        		}
			}
		}
	});
}

function displayCourseDetails1(subjectId,showFee){
	if(showFee=='' || showFee==undefined){
		showFee=null;
	}
	$.ajax({
		type : "GET",
		contentType : "application/json",
		url : getURLForHTML('dashboard','student/subject-discription'),
		data :'subjectId='+subjectId+'&showFee='+showFee,
		dataType : 'html',
		success : function(htmlContent) {
			if(htmlContent!=""){
            	var stringMessage = [];
            	stringMessage = htmlContent.split("|");
        		if(stringMessage[0] == "FAILED" || stringMessage[0] == "EXCEPTION" || stringMessage[0] == "SESSIONOUT"){
        			if(stringMessage[0] == "SESSIONOUT"){
        				redirectLoginPage();
        			}else{
        				showMessageTheme2(1, stringMessage[1],'',true);
        			}
        			return false;
        		} else {
        			$('#course-description-details').html(htmlContent)
        			return true;
        		}
			}
		}
	});
}
function getAllCourseDetails(formId, appliedScholarshipCode,isGradeChange, needToShowModal,callFrom){
	hideMessage('');
	hideModalMessage('');
	$("#appliedScholarshipCode").val(appliedScholarshipCode)
	var postData=JSON.stringify(getRequestForStudentCourseDetailsInfo(formId,callFrom, appliedScholarshipCode));
	console.log('postData '+postData);
	if (!validateCharacters(postData)) {
		if(needToShowModal){
			showModalMessage(0, 'Please use the English Keyboard while providing information');
		}else{
			showMessageTheme2(0, 'Please use the English Keyboard while providing information');
		}
		return false
	}
	$.ajax({
		type : "POST",
		url : getURLForHTML('dashboard','student/course-details-by-standard-id'),
		data :postData,
		dataType : 'html',
		contentType : "application/json",
		async : false,
		success : function(htmlContent) {
			if(htmlContent!=""){
            	var stringMessage = [];
            	stringMessage = htmlContent.split("|");
        		if(stringMessage[0] == "FAILED" || stringMessage[0] == "EXCEPTION" || stringMessage[0] =="SESSIONOUT"){
        			if(stringMessage[0] == "SESSIONOUT"){
        				redirectLoginPage();
        			}else{
						showMessageTheme2(0, stringMessage[1], '', true);
					}
        		} else {
        			$('#migrationStep2').html(htmlContent);
        		}
			}
		}
	});
}

function getRequestForStudentCourseDetailsInfo(formId,appliedScholarshipCode, callFrom) {

	var studentCourseDetailsInfoDTO = {};
	studentCourseDetailsInfoDTO['themeType'] = 'theme2';
	studentCourseDetailsInfoDTO['standardId'] = $("#standardId").val();
	studentCourseDetailsInfoDTO['callFrom'] = callFrom;
	if($("#enrollmentType").val()==undefined){
		studentCourseDetailsInfoDTO['enrollmentType'] = 'REGISTRATION_FRESH';
	}else{
		studentCourseDetailsInfoDTO['enrollmentType'] = $("#enrollmentType").val()
	}
	if($("#courseEnrollmentType").val()==undefined){
		studentCourseDetailsInfoDTO['courseEnrollmentType'] = 'REGISTRATION_FRESH';
	}else{
		studentCourseDetailsInfoDTO['courseEnrollmentType'] = $("#courseEnrollmentType").val();
	}
	if($("#selectedSubjects").val()==undefined){
		studentCourseDetailsInfoDTO['selectedFullTimeCoursesIds'] =  '';
	}else{
		studentCourseDetailsInfoDTO['selectedFullTimeCoursesIds'] =  $("#selectedSubjects").val()
	}
	if($("#payMode").val()==undefined){
		studentCourseDetailsInfoDTO['payMode'] = 'annually';
	}else{
		studentCourseDetailsInfoDTO['payMode'] = $("#payMode").val();
	}
	if($("#scholarshipCode").val()==undefined){
		studentCourseDetailsInfoDTO['scholarshipCode'] = '';
		studentCourseDetailsInfoDTO['appliedScholarshipCode'] = appliedScholarshipCode;
	}else{
		if(appliedScholarshipCode==2){
			$("#scholarshipCodeInside").val('')
		}
		studentCourseDetailsInfoDTO['scholarshipCode'] = $("#scholarshipCodeInside").val();
		studentCourseDetailsInfoDTO['appliedScholarshipCode'] = appliedScholarshipCode;
	}
	return studentCourseDetailsInfoDTO;
}
function activeTabList(courseHeadId){
	$(".courseSelectId-"+courseHeadId).parent().closest('li').find('.a-content').slideToggle();
	$(".courseSelectId-"+courseHeadId).find('.plus-icon').toggleClass('fa-minus fa-plus')
	$(".courseSelectId-"+courseHeadId).parent().closest('li').siblings().find('.plus-icon').removeClass('fa-minus')
	$(".courseSelectId-"+courseHeadId).parent().closest('li').siblings().find('.plus-icon').addClass('fa-plus')
	$(".courseSelectId-"+courseHeadId).parent().closest('li').siblings().find('.a-content').slideUp();
}
function showSpecificContentNew(tabId, liId){
	console.log("showSpecificContentNew");
	$('.custom-tab-wrapper li a').addClass('inactive');
	$('#'+tabId).removeClass("inactive");
	$('#'+tabId).parent().addClass("active-tab").siblings().removeClass("active-tab");
	if(tabId=='ft_courses'){
		$("#ft_coursesC").show();
		$("#ap_coursesC").hide();
		$("#cs_coursesC").hide();
		$("#cte_coursesC").hide();
	}else if(tabId=='ap_courses'){
		$("#ft_coursesC").hide();
		$("#ap_coursesC").show();
		$("#cs_coursesC").hide();
		$("#cte_coursesC").hide();
	}else if(tabId=='cs_courses'){
		$("#ft_coursesC").hide();
		$("#ap_coursesC").hide();
		$("#cs_coursesC").show();
		$("#cte_coursesC").hide();
	}else if(tabId=='cte_courses'){
		$("#ft_coursesC").hide();
		$("#ap_coursesC").hide();
		$("#cs_coursesC").hide();
		$("#cte_coursesC").show();
		
	}
	activeTabList(liId);
}
function displayScholorshipDetails(radioId){
	if(radioId=='dtl-one'){
		$('#payMode').val('annually');
		$('#condition25Percentage').hide()
		$('#annual-course-fee-details').show()
		$('#installment3-course-fee-details').hide()
		$('#installment5-course-fee-details').hide()
	}else if(radioId=='dtl-two'){
		$('#payMode').val('threeMonthly');
		$('#condition25Percentage').show()
		$('#annual-course-fee-details').hide()
		$('#installment3-course-fee-details').show()
		$('#installment5-course-fee-details').hide()
	}else if(radioId=='dtl-three'){
		$('#payMode').val('fiveMonthly');
		$('#condition25Percentage').show()
		$('#annual-course-fee-details').hide()
		$('#installment3-course-fee-details').hide()
		$('#installment5-course-fee-details').show()
	}else if(radioId=='dtl-four'){
		$('#payMode').val('nineMonthly');
		$('#condition25Percentage').show()
		$('#annual-course-fee-details').hide()
		$('#installment3-course-fee-details').hide()
		$('#installment5-course-fee-details').hide()
	}
}

function applyScholarship(formId, appliedScholarshipCode ){
	hideMessage('');
	if(!$('input[name=payModeCheckboxes]').is(':checked')){
		showMessageTheme2(0, "Please select payment option",'',true);
		return false;
	}
	if (!validateCharacters($('#scholarshipCodeInside').val())) {
		showMessageTheme2(0, 'Please use the English Keyboard while providing information','',true);
		return false
	}
	
	
	if($('#scholarshipCodeInside').val()=='' || $('#scholarshipCodeInside').val()==' '){
		showMessageTheme2(0, "Enter a valid Scholarship code.",'',true);
		return false;
	}
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForHTML('dashboard','student/apply-scholarship'),
		data : JSON.stringify(getRequestForStudentScholarship(formId, appliedScholarshipCode)),
		dataType : 'json',
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				showMessageTheme2(0, data['message'],'',true);
				return false;
			}else{
				if(appliedScholarshipCode==2){
					$('#'+formId+' #scholarshipCodeInside').val('');
					$('#'+formId+' #scholarshipCode').val('');
					$('#scholarshipCodeInside').val('');
				}
				$('#scholarshipCode').val($('#scholarshipCodeInside').val());
				getAllCourseDetails('formMigrationStep3',appliedScholarshipCode,'N',true,'FT');
			}
			showMessageTheme2(1, data['message'],'',true);
			return false;
		}
	});
}
function showPaymentMode(){
	var flag = validCourseSelection();
	if(flag){		
		if($('#migration-payment-option-content-orginal').html().length>10){
			$('#migration-payment-option-content').html($('#migration-payment-option-content-orginal').html())
			$('#migration-payment-option-content-orginal').html('')
		}
		selectPaymentmentMethod();
		$('#studentPaymentModal').modal('show');
	}
}

function selectPaymentmentMethod(){
	if ($('#payMode').val() == 'annually') {
		$("#pay-one").trigger('click');
	} else if ($('#payMode').val() == 'threeMonthly') {
		$("#pay-two").trigger('click');
	} else if ($('#payMode').val() == 'fiveMonthly') {
		$("#pay-three").trigger('click');
	} else if ($('#payMode').val() == 'nineMonthly') {
		$("#pay-four").trigger('click');
	}
}

function getRequestForStudentScholarship(formId, appliedScholarshipCode){
	var request = {};
	var authentication = {};
	var requestData = {};
	requestData['requestKey']='APPLY-SCHOLARSHIP';
	requestData['requestValue']=$("#scholarshipCodeInside").val().trim();
	requestData['appliedScholarshipCode']=appliedScholarshipCode;
	requestData['requestExtra']=$("#"+formId+" #payMode").val();
	requestData['requestExtra2']='Student Progression';
	authentication['userId'] = $("#"+formId+" #userId").val();
	authentication['hash'] = getHash();authentication['schoolId'] = SCHOOL_ID;authentication['schoolUUID'] = SCHOOL_UUID;
	authentication['userType'] = 'STUDENT';
	authentication['schoolId'] = SCHOOL_ID;
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	return request;
}


function steps(step){
	switch(step){
		case '1':
			$(".step1").show();
			$(".step2, .step3, .step4, .step5").hide();
			break;
		case '2':
			$(".step1, .step3, .step4, .step5").hide();
			$(".step2").show();
			break;
		case '3':
			$(".step1, .step2, .step4, .step5").hide();
			$(".step3").show();
			break;
		case '4':
			$(".step1, .step2, .step3, .step5").hide();
			$(".step4").show();
			break;
		case '5':
			$(".step1, .step2, .step3, .step4").hide();
			$(".step5").show();
			break;
	}
}