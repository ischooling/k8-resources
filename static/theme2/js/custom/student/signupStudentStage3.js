$(document).ready(function() {
	restrictKeyEnter('scholarshipCodeInside');
});

function assignEvent(indexPosition, subjectId, courseId, tabActive, userReachedMaxLimit, courseCreditLimit, courseSelectedCredit, subjectCredit){
	//debugger;
	if(subjectId==''){
		showMessage(2, 'Please select a subject then click on the add button.');
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
		showMessage(2, 'You have already selected maximum subjects from this category.');
		return false;
	}
	if(userReachedMaxLimit =='true'){
		showMessage(2, 'You have already selected maximum subjects from this category.');
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
	getAllCourseDetails('signupStage3','0','N',false,'1',courseId);
	showSpecificContentNew(tabActive, courseId);
}

function removeCourse(subjectId,courseId, activeTab){
	var selectedSubjects = $('#selectedSubjects').val();
	selectedSubjects = selectedSubjects.split(',');
	//console.log('selectedSubjects remove '+selectedSubjects);
	selectedSubjects = selectedSubjects.filter(subId => subId !== subjectId)
	selectedSubjects=selectedSubjects.join(',');
	//console.log('selectedSubjects remove '+selectedSubjects);
	$('#selectedSubjects').val(selectedSubjects)
	$("#controlType").val('remove');
	$(".course-category").find("div[seletedsubject='"+subjectId +"']").addClass("slideout-animation").removeClass("slide-animation");
	$(".course-category").find("div[seletedsubject='"+subjectId +"']").removeClass("slide-animation").addClass("slideout-animation");
	setTimeout(function(){
		$(".course-category").find("div[seletedsubject='"+subjectId +"']").hide();
	}, 800);
	getAllCourseDetails('signupStage3','0','N',false,'1',courseId);
	showSpecificContentNew(activeTab, courseId);

}
function displayCourseDetails(subjectId){
	var flag=false
	//console.log('subjectId => '+subjectId)
	customLoaderSignup(true);
	$.ajax({
		type : "GET",
		contentType : "application/json",
		url : getURLForHTML('student','signup/subject-discription'),
		data :'subjectId='+subjectId,
		dataType : 'html',
		async : false,
		global : false,
		success : function(htmlContent) {
			customLoaderSignup(false);
			if(htmlContent!=""){
            	var stringMessage = [];
            	stringMessage = htmlContent.split("|");
        		if(stringMessage[0] == "FAILED" || stringMessage[0] == "EXCEPTION" || stringMessage[0] == "SESSIONOUT"){
        			if(stringMessage[0] == "SESSIONOUT"){
        				redirectLoginPage();
        			}else{
        				showMessage(1, stringMessage[1]);
        			}
        		} else {
        			$('#course-description-details').html(htmlContent)
        			flag = true;
        		}
			}
		},
		error : function(e) {
			customLoaderSignup(false);
			showMessage(0, TECHNICAL_GLITCH);
		}
	});
	return flag;
}

function showGuideLines(){
	$('#guide-elementry').show();
	$('#guide-middle').hide();
	$('#guide-high').hide();
	$('#guidelines').modal('show');
}

function applyScholarship(formId, appliedScholarshipCode,callFrom ){
	hideModalMessage('');
	if(!$('input[name=payModeCheckboxes]').is(':checked')){
		showModalMessage(0, 'Please select payment option');
		return false;
	}

	if (!validateCharacters($('#scholarshipCodeInside').val())) {
		showModalMessage(0, 'Please use the English Keyboard while providing information');
		return false
	}


	if($('#scholarshipCodeInside').val()=='' || $('#scholarshipCodeInside').val()==' '){
		showModalMessage(0, "Enter a valid Scholarship code.");
		return false;
	}
	var flag = false;
	customLoaderSignup(true);
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLFor('student','signup/apply-scholarship'),
		data : JSON.stringify(getRequestForStudentScholarship(formId, appliedScholarshipCode,callFrom)),
		dataType : 'json',
		async : false,
		global : false,
		success : function(data) {
			customLoaderSignup(false);
			if (data['status'] == '0' || data['status'] == '2') {
				showModalMessage(0, data['message']);
			}else{
				if(appliedScholarshipCode==2){
					$('#'+formId+' #scholarshipCodeInside').val('');
					$('#'+formId+' #scholarshipCode').val('');
				}
				$('#studentPaymentModal').modal('hide');
				$('#studentPaymentBookSeatModal').modal('hide');
				$('.modal-backdrop').remove();
				getAllCourseDetails('signupStage3', appliedScholarshipCode,'N',true,'2');
			}
			flag = true;
		},
		error : function(e) {
			customLoaderSignup(false);
			showMessage(0, TECHNICAL_GLITCH);
		}
	});
	return flag
}

function getRequestForStudentScholarship(formId, appliedScholarshipCode,callFrom){
	var request = {};
	var authentication = {};
	var requestData = {};
	requestData['requestKey']='APPLY-SCHOLARSHIP';
	requestData['requestValue']=$("#"+formId+" #scholarshipCodeInside").val().trim();
	requestData['appliedScholarshipCode']=appliedScholarshipCode;
	requestData['requestExtra']=$("#"+formId+" #payMode").val();
	requestData['requestExtra1']=callFrom;
	requestData['requestExtra2']='Signup for Full-Time/Flex Program';
	authentication['hash'] = getHash();authentication['schoolId'] = SCHOOL_ID;authentication['schoolUUID'] = SCHOOL_UUID;
	authentication['userType'] = 'STUDENT';
	authentication['userId'] = $("#userId").val();
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	return request;
}
/*
function showPaymentMode(){
	//$('.modal-backdrop').remove();
	var standard =$("#standardId").val();
	if(standard==0){
		showMessage(0,'Grade is required');
		return false
	}
	if(standard>=11 && standard<=17){

	}else{
//		if(calculatePageCreditCount(4)<6){
//			showMessage(0,'Please choose atleast 6.0 credit to proceed for payment.');
//			return false
//		}
	}
	//$('#studentPaymentBookSeatModal').modal('hide');
	//$("#pay-five").prop("checked", false);
	//if($('#signupStage3 #payMode').val()=='registration'){
	//	showPaymentBookSeatMode();
	//	return;
	//}
	$("#enrollmentType").val('REGISTRATION_FRESH');
	$('#studentPaymentModal').modal('show');
	hideModalMessage('');
}
*/
function showPaymentFromEnrollMode(){
	hideModalMessage('');
	//console.log("showPaymentFromEnrollMode - payMode "+$('#signupStage3 #payMode').val());
	$('#studentPaymentBookSeatModal').modal('hide');
	$("#pay-five").prop("checked", false);
	//$("#pay-one").prop("checked", true);
	if($('#signupStage3 #payMode').val()=='registration'){
		if($('#signupStage3 #payMode').val()!=$('#signupStage3 #payMode').attr('data-paymode')){
			$('#signupStage3 #payMode').val($('#signupStage3 #payMode').attr('data-paymode'));
			selectPaymentmentMethod();
		}else{
			$('#signupStage3 #payMode').val('annually');
			$("#pay-one").prop("checked", true);
		}
	}else{
		$('#signupStage3 #payMode').val($('#signupStage3 #payMode').attr('data-paymode'));
	}
	$("#enrollmentType").val('REGISTRATION_FRESH');
	$('#studentPaymentModal').modal('show');
	$("#regPaymentType").val('')
}
function remvoeScholarshipCode(){
	$("#scholarshipCodeInside").val('');
	$("#scholarshipCodeInside").removeAttr('readonly')
	$('#applyScholarshipButton').show()
	$('#removeScholarshipButton').hide()
	$("#scholarshipCode").val('');
}
function showPaymentBookSeatMode(){
	//console.log("showPaymentBookSeatMode");
	$('#studentPaymentModal').modal('hide');
	$("#pay-one").prop("checked", false);
	$("#pay-five").prop("checked", true);
	$('#signupStage3 #payMode').val('registration');
	$("#enrollmentType").val('REGISTRATION_REGISTER');
	$('#studentPaymentBookSeatModal').modal('show');
	$("#regPaymentType").val('booking')
}

function showPaymentTermCondMode(){

//	if($("#regPaymentType").val()=='booking'){
//		$('#payTabModal').modal('hide');
//		$('#payTabBookingModal').modal('show');
//	}else{
//		$('#payTabBookingModal').modal('hide');
//		$('#payTabModal').modal('show');
//	}
	hideModalMessage();
	$('#callPaymentStudentModal').modal('show');
}

function calculatePageCreditCount(pageNumber){
	var creditCountRegular = parseFloat($("#creditCountRegular").val())
	return creditCountRegular;
}
function getAllCourseDetails(formId, appliedScholarshipCode,isGradeChange, needToShowModal,callFrom){
	$("#"+formId+" #scholarshipCode").val($('#'+formId+' #scholarshipCodeInside').val());
	var standardId=$("#"+formId+" #standardId").val();
	if(standardId==0){
		$('#payMode').val('annually');
		$('#selectedSubjects').val('');
		$('#scholarshipCodeInside').val('');
		$('#scholarshipCode').val('');
		$('#parentSubjectIdRegural').val('');
		$('#creditCountRegular').val('0.0');
		$('#studentGuidlines').show();
		$('#courseSubjectDetails').html('')
		return false;
	}
	if(isGradeChange=='Y'){ //For Grade Change reassign mandatory subjects.
		$('#payMode').val('annually');
		$('#selectedSubjects').val('');
		$('#scholarshipCodeInside').val('');
		$('#scholarshipCode').val('');
		$('#parentSubjectIdRegural').val('');
		$('#creditCountRegular').val('0.0');
	}
	$('#standardName').html($('#standardId option:selected').text());
	hideMessage('');
	hideModalMessage('');
	$("#appliedScholarshipCode").val(appliedScholarshipCode)
	var postData=encodeURI("request="+JSON.stringify(getRequestForStudentCourseDetailsInfo(formId,callFrom, appliedScholarshipCode)));
	//console.log('postData '+postData);
	if (!validateCharacters(postData)) {
		if(needToShowModal){
			showModalMessage(0, 'Please use the English Keyboard while providing information');
		}else{
			showMessage(0, 'Please use the English Keyboard while providing information');
		}
		return false
	}
	var flag = false;
	customLoaderSignup(true);
	$.ajax({
		type : "POST",
		url : getURLForHTML('student','signup/course-details-by-standard-id'),
		data :postData,
		dataType : 'html',
		async : false,
		global : false,
		success : function(htmlContent) {
			customLoaderSignup(false);
			if(htmlContent!=""){
            	var stringMessage = [];
            	stringMessage = htmlContent.split("|");
        		if(stringMessage[0] == "FAILED" || stringMessage[0] == "EXCEPTION" || stringMessage[0] =="SESSIONOUT"){
        			if(stringMessage[0] == "SESSIONOUT"){
        				redirectLoginPage();
        			}
        		} else {
        			$('#courseSubjectDetails').html(htmlContent);
        			$('#courseFirstListOpen').val(1);
        			if(needToShowModal){
        				showPaymentMode();
        			}
        			flag = true;
        		}
			}
		},
		error : function(e) {
			customLoaderSignup(false);
			showMessage(0, TECHNICAL_GLITCH);
		}
	});
	return flag;
}

function activeTabList(courseHeadId){
	//$(this).parent().closest('li').find('.a-content').slideToggle();
	//$('.accordion li:first-child .a-content').slideToggle();
	$(".courseSelectId-"+courseHeadId).parent().closest('li').find('.a-content').slideToggle();
	$(".courseSelectId-"+courseHeadId).find('.plus-icon').toggleClass('fa-minus fa-plus')
	$(".courseSelectId-"+courseHeadId).parent().closest('li').siblings().find('.plus-icon').removeClass('fa-minus')
	$(".courseSelectId-"+courseHeadId).parent().closest('li').siblings().find('.plus-icon').addClass('fa-plus')
	$(".courseSelectId-"+courseHeadId).parent().closest('li').siblings().find('.a-content').slideUp();
}
function showSpecificContentNew(tabId, liId){
	//console.log("showSpecificContentNew");
	$('.custom-tab-wrapper li a').addClass('inactive');
	$('#'+tabId).removeClass("inactive");
	$('#'+tabId).parent().addClass("active-tab").siblings().removeClass("active-tab");
	//$('#'+tabId).parent().parent().next().find('#'+tabId+'C').show().siblings().hide();
	if(tabId=='ft_courses'){
		$("#ft_coursesC").show();
		$("#ap_coursesC").hide();
		$("#cs_coursesC").hide();
		$("#cte_coursesC").hide();
		$("#hon_coursesC").hide();
		$("#adv_coursesC").hide();
	}else if(tabId=='ap_courses'){
		$("#ft_coursesC").hide();
		$("#ap_coursesC").show();
		$("#cs_coursesC").hide();
		$("#cte_coursesC").hide();
		$("#hon_coursesC").hide();
		$("#adv_coursesC").hide();
	}else if(tabId=='cs_courses'){
		$("#ft_coursesC").hide();
		$("#ap_coursesC").hide();
		$("#cs_coursesC").show();
		$("#cte_coursesC").hide();
		$("#hon_coursesC").hide();
		$("#adv_coursesC").hide();
	}else if(tabId=='cte_courses'){
		$("#ft_coursesC").hide();
		$("#ap_coursesC").hide();
		$("#cs_coursesC").hide();
		$("#cte_coursesC").show();
		$("#hon_coursesC").hide();
		$("#adv_coursesC").hide();
	}else if(tabId=='hon_courses'){
		$("#ft_coursesC").hide();
		$("#ap_coursesC").hide();
		$("#cs_coursesC").hide();
		$("#cte_coursesC").hide();
		$("#hon_coursesC").show();
		$("#adv_coursesC").hide();
	}else if(tabId=='adv_courses'){
		$("#ft_coursesC").hide();
		$("#ap_coursesC").hide();
		$("#cs_coursesC").hide();
		$("#cte_coursesC").hide();
		$("#hon_coursesC").hide();
		$("#adv_coursesC").show();
	}
	//$('.accordion li:first-child .a-content').show();
	activeTabList(liId);
//	$('#'+tabId).parent().parent().next().find('#'+tabId+'C').find('#'+liId).siblings().find(".a-content").slideUp()
//	$('#'+tabId).parent().parent().next().find('#'+tabId+'C').find('#'+liId+' .a-content').show()
}
function getRequestForStudentCourseDetailsInfo(formId,callFrom, appliedScholarshipCode) {

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
	if($("#signupStage3 #payMode").val()==undefined){
		studentCourseDetailsInfoDTO['payMode'] = 'annually';
	}else{
		studentCourseDetailsInfoDTO['payMode'] = $("#signupStage3 #payMode").val();
	}
	if($("#scholarshipCode").val()==undefined){
		studentCourseDetailsInfoDTO['scholarshipCode'] = '';
		studentCourseDetailsInfoDTO['appliedScholarshipCode'] = '';
	}else{
		studentCourseDetailsInfoDTO['scholarshipCode'] = $("#scholarshipCode").val();
		studentCourseDetailsInfoDTO['appliedScholarshipCode'] = appliedScholarshipCode;
	}
	if($("#controlType").val()==undefined) {
		studentCourseDetailsInfoDTO['controlType'] ='add';
	}else {
		studentCourseDetailsInfoDTO['controlType'] = $("#controlType").val().trim();
	}
	return studentCourseDetailsInfoDTO;
}

function proceedToPayment(){
	if($('#scholarshipApplied').val()==1 && $('#scholarshipCodeInside').val()!='' ){
		$('#studentPaymentModal .modal-body').animate({scrollTop: "0px"
	    }, 'slow');

		return false;
	}
	$('#scholarshipCode').val($('#scholarshipCodeInside').val())
	$('#formSteps div').steps('setStep', 3)
}
function getRequestForStudentCourseDetails(standardId){
	return "";
}

function callForSignupCourseDetails(formId,callFrom) {
	var flag=false;
	hideModalMessage('');
	if(!validateRequestForSignupCourse(formId)){
		return flag;
	}
	customLoaderSignup(true);
	$.ajax({
		type : "POST",
		url : getURLForHTML('student','signup/stage-5'),
		data : encodeURI("request="+JSON.stringify(getRequestForStudentCourse(formId,callFrom))),
		dataType : 'html',
		async : false,
		global : false,
		success : function(htmlContent) {
			customLoaderSignup(false);
			if(htmlContent!=""){
            	var stringMessage = [];
            	stringMessage = htmlContent.split("|");
        		if(stringMessage[0] == "FAILED" || stringMessage[0] == "EXCEPTION" || stringMessage[0] == "SESSIONOUT"){
        			if(stringMessage[0] == "SESSIONOUT"){
        				redirectLoginPage();
        			}else {
        				showModalMessage(0, stringMessage[1]);
        			}
        		} else {
        			$('#signupStage4Content').html(htmlContent)
        			showMessage(1, 'Subject updated successfully.');
        			setTimeout(function(){
        				hideMessage('');
        			}, 3000);
        			hideModalMessage();
        			flag=true;
        		}
			}
		},
		error : function(e) {
			customLoaderSignup(false);
			showMessage(0, TECHNICAL_GLITCH);
		}
	});
	return flag;
}

function getRequestForStudentCourse(formId,callFrom){
	var request = {};
	var authentication = {};
	var requestData = {};
	var courseDetailsDTO={};
	courseDetailsDTO['standardId'] = $("#standardId").val();
	courseDetailsDTO['themeType'] = 'theme2';
	courseDetailsDTO['enrollmentType'] = $("#enrollmentType").val();
	courseDetailsDTO['selectedSubjects'] = $("#selectedSubjects").val();
	courseDetailsDTO['payMode'] = $("#signupStage3 #payMode").val();
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
	return request;
}

function validateRequestForSignupCourse(formId){
	if (!validateFormAscii(formId)) {
		showMessage(0, 'Please use the English Keyboard while providing information');
		return false;
	}

	if ($("#signupStage3 #standardId").val()==0 || $("#signupStage3 #standardId").val()==null) {
		showMessage(0, 'Please select grade');
		return false;
	}
	return true;
}

function displayScholorshipDetails(radioId){
	if(radioId=='dtl-one'){
		$('#annual-course-fee-details').show()
		$('#installment3-course-fee-details').hide()
		$('#installment6-course-fee-details').hide()
		$('#installment9-course-fee-details').hide()
	}else if(radioId=='dtl-two'){
		$('#annual-course-fee-details').hide()
		$('#installment3-course-fee-details').show()
		$('#installment6-course-fee-details').hide()
		$('#installment9-course-fee-details').hide()
	}else if(radioId=='dtl-three'){
		$('#annual-course-fee-details').hide()
		$('#installment3-course-fee-details').hide()
		$('#installment6-course-fee-details').show()
		$('#installment9-course-fee-details').hide()
	}else if(radioId=='dtl-four'){
		$('#annual-course-fee-details').hide()
		$('#installment3-course-fee-details').hide()
		$('#installment6-course-fee-details').hide()
		$('#installment9-course-fee-details').show()
	}
}

function selectPaymentmentMethod(){
	if ($('#payMode').val() == 'annually') {
		$("#pay-one").trigger('click');
	} else if ($('#payMode').val() == 'threeMonthly') {
		$("#pay-two").trigger('click');
	} else if ($('#payMode').val() == 'sixMonthInstall') {
		$("#pay-three").trigger('click');
	} else if ($('#payMode').val() == 'nineMonthInstall') {
		$("#pay-four").trigger('click');
	} else if ($('#payMode').val() == 'registration') {
		$("#pay-five").trigger('click');
	}
}

function closePaymentModal(){
	$('#studentPaymentModal').modal('hide');
	hideModalMessage('');
}
function proceedToChangeGrade(){
	$('#changeSelectedGrade').modal('hide')
	displaySection(0);
}
function cancelToChangeGrade(){
	$('#changeSelectedGrade').modal('hide')
}
function changeSelectedGrade(){
	$('#changeSelectedGrade').modal({backdrop: 'static', keyboard: false})
}