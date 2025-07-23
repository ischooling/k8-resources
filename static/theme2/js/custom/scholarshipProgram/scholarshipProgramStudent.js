$(document).ready(function() {
	$("select#stateId").on("change", function() {
		callCities('scholarshipRegistration', this.value, 'stateId');
	});
	$("#backToRegistration").click(function() {
		if($('#userphone').val()!=''){
			$('#userphoneOriginal').val($('#userphone').val());
		}
		$('#scholarshipRegistrationDiv').show();
		$('#otpDiv').hide();
		$('#otpCode').val('');
		$('#verifyOTP').attr('disabled',false)
		$('#reg-step-1').show();
		$('#reg-step-2').hide();
		$('#otp-div').show();
		$('#otp-div-btn').show();
		$('#top-div').removeClass('mt-otp')
	});
	$("#changeNumber").click(function() {
		$("#userphone").focus()
		$('#userphone').attr('disabled',false)
		$('#changeNumber').hide();
		$('#sendOTP').show();
		$('#otpCode').val('');
		$('#verifyOTP').attr('disabled',true)
		$('#verifyOTP').hide();
		$('#otp-div').hide();
		$('#otp-div-btn').hide();
	});

	$("#sendOTP").click(function(event) {
		event.preventDefault();
		callForOTP('scholarshipRegistration','STUDENT', 1, 'S', 'SCHOLARSHIP-PROGRAM', '0');
	});

	$("#resendOTP").click(function(event) {
		event.preventDefault();
		callForOTP('scholarshipRegistration','STUDENT', 2, 'S', 'SCHOLARSHIP-PROGRAM', '0');
	});

	$("#verifyOTP").click(function(event) {
		event.preventDefault();
		callForOTP('scholarshipRegistration','STUDENT', 3, 'S', 'SCHOLARSHIP-PROGRAM', '0');
	});

});
function validateGrade(formId, needToDisplayError){
	var flag=true
	$("#"+formId+" #currentGrade").removeClass('bdr-red');
	if ($("#"+formId+" #currentGrade").val()==null || $("#"+formId+" #currentGrade").val()=='') {
		if(flag){
			if(needToDisplayError){
				$('#sendOTPFirst').removeClass('active-btn')
				showMessageScholarship(0, 'Student\'s grade is required.','serverError');
			}
		}
		$("#"+formId+" #currentGrade").addClass('bdr-red');
		flag=false
	}
	isAllFieldsValid(formId)
	return flag;
}

function validateStudent(formId, needToDisplayError){
	var flag=true
	$("#"+formId+" #studentName").removeClass('bdr-red');
	if ($("#"+formId+" #studentName").val().trim()=="") {
		if(flag){
			if(needToDisplayError){
				$('#sendOTPFirst').removeClass('active-btn')
				showMessageScholarship(0, 'Student name is required.','serverError');
			}
		}
		$("#"+formId+" #studentName").addClass('bdr-red');
		flag=false
	}
	isAllFieldsValid(formId)
	return flag;
}

function validateGender(formId, needToDisplayError){
	$("#"+formId+" #gender").removeClass('bdr-red');
	var flag=true

	if ($("#"+formId+" #gender").val()==null || $("#"+formId+" #gender").val()=='') {
		if(flag){
			if(needToDisplayError){
				$('#sendOTPFirst').removeClass('active-btn')
				showMessageScholarship(0, 'Gender is required.','serverError');
			}
		}
		$("#"+formId+" #gender").addClass('bdr-red');
		flag=false
	}
	isAllFieldsValid(formId)
	return flag;
}

function validateDOB(formId, needToDisplayError){
	var flag=true
	$("#"+formId+" #studentDob").removeClass('bdr-red');
	if ($("#"+formId+" #studentDob").val().trim()=='') {
		if(flag){
			if(needToDisplayError){
				$('#sendOTPFirst').removeClass('active-btn')
				showMessageScholarship(0, 'Student\'s Date of Birth is required.','serverError');
			}
		}
		$("#"+formId+" #studentDob").addClass('bdr-red');
		flag=false
	}
	isAllFieldsValid(formId)
	return flag;
}
function validateMotherName(formId, needToDisplayError){
	var flag=true
	$("#"+formId+" #mothersName").removeClass('bdr-red');
	if ($("#"+formId+" #mothersName").val().trim()=="") {
		if(flag){
			if(needToDisplayError){
				$('#sendOTPFirst').removeClass('active-btn')
				showMessageScholarship(0, 'Mother\'s name is required.','serverError');
			}
		}
		$("#"+formId+" #mothersName").addClass('bdr-red');
		flag=false
	}
	isAllFieldsValid(formId)
	return flag;
}
function validatePhone(formId, needToDisplayError){
	var flag=true
	$("#"+formId+" #userphoneOriginal").removeClass('bdr-red');
	if ( $("#"+formId+" #userphoneOriginal").val().trim()=="" || M.isMobile($("#"+formId+" #userphoneOriginal").val().trim())==null) {
		if(flag){
			if(needToDisplayError){
				$('#sendOTPFirst').removeClass('active-btn')
				showMessageScholarship(0, 'Phone number is either invalid or empty.','serverError');
			}
		}
		$("#"+formId+" #userphoneOriginal").addClass('bdr-red');
		flag=false
	}
	isAllFieldsValid(formId)
	return flag;
}

function validateEmail(formId, needToDisplayError){
	var flag=true
	$("#"+formId+" #email").removeClass('bdr-red');
	if($("#"+formId+" #email").val()=="" || M.isEmail($("#"+formId+" #email").val())==null){
		if(flag){
			if(needToDisplayError){
				$('#sendOTPFirst').removeClass('active-btn')
				showMessageScholarship(0, 'Email is either invalid or empty.','serverError');
			}
		}
		$("#"+formId+" #email").addClass('bdr-red');
		flag=false
	}
	isAllFieldsValid(formId)
	return flag;
}
function validateStateId(formId, needToDisplayError){
	var flag=true
	$("#"+formId+" #stateId").removeClass('bdr-red');
	if ($("#"+formId+" #stateId").val()==null || $("#"+formId+" #stateId").val()=='') {
		if(flag){
			if(needToDisplayError){
				$('#sendOTPFirst').removeClass('active-btn')
				showMessageScholarship(0, 'State is required.','serverError');
			}
		}
		$("#"+formId+" #stateId").addClass('bdr-red');
		flag=false
	}
	isAllFieldsValid(formId)
	return flag;
}
function validateCityId(formId, needToDisplayError){
	var flag=true
	$("#"+formId+" #cityId").removeClass('bdr-red');
	if ($("#"+formId+" #cityId").val()==null || $("#"+formId+" #cityId").val()=='') {
		if(flag){
			if(needToDisplayError){
				$('#sendOTPFirst').removeClass('active-btn')
				showMessageScholarship(0, 'City is required.','serverError');
			}
		}
		$("#"+formId+" #cityId").addClass('bdr-red');
		flag=false
	}
	isAllFieldsValid(formId)
	return flag;
}
function validateTandC(formId, needToDisplayError){
	var flag=true
	$("#"+formId+" #checkTandC").removeClass('chk-otl');
	if (!$("#"+formId+" #checkTandC").is(':checked')){
		if(flag){
			if(needToDisplayError){
				$('#sendOTPFirst').removeClass('active-btn')
				showMessageScholarship(0, 'Please accept terms and conditions to proceed.','serverError');
			}
		}
		$("#"+formId+" #checkTandC").addClass('chk-otl');
		flag=false
	}
	isAllFieldsValid(formId)
	return flag;
}
function isAllFieldsValid(formId){
	var flag=true
	if (

			$("#"+formId+" #currentGrade").val()==null || $("#"+formId+" #currentGrade").val()==''
			|| $("#"+formId+" #studentName").val().trim()==""
			|| $("#"+formId+" #gender").val()==null || $("#"+formId+" #gender").val()==''
			|| $("#"+formId+" #studentDob").val().trim()==''
			|| $("#"+formId+" #mothersName").val().trim()==""
			|| $("#"+formId+" #userphoneOriginal").val().trim()=="" || M.isMobile($("#"+formId+" #userphoneOriginal").val().trim())==null
			|| $("#"+formId+" #email").val()=="" || M.isEmail($("#"+formId+" #email").val())==null
			|| $("#"+formId+" #stateId").val()==null || $("#"+formId+" #stateId").val()==''
			|| $("#"+formId+" #cityId").val()==null || $("#"+formId+" #cityId").val()==''
			|| !$("#"+formId+" #checkTandC").is(':checked')


	) {
		flag=false
	}

	if(flag){
		$('#sendOTPFirst').addClass('active-btn')
	}else{
		$('#sendOTPFirst').removeClass('active-btn')
	}

	return flag;
}
function validateSignupScholarshipProgram(formId, needToDisplayError){
	var flag=true
	flag = validateGrade(formId, needToDisplayError)
	if(flag){
		flag = validateStudent(formId, needToDisplayError)
	}
	if(flag){
		flag =validateGender(formId, needToDisplayError)
	}
	if(flag){
		flag =validateDOB(formId, needToDisplayError)
	}
	if(flag){
		flag =validateMotherName(formId, needToDisplayError)
	}
	if(flag){
		flag =validatePhone(formId, needToDisplayError)
	}
	if(flag){
		flag =validateEmail(formId, needToDisplayError)
	}
	if(flag){
		flag =validateStateId(formId, needToDisplayError)
	}
	if(flag){
		flag =validateCityId(formId, needToDisplayError)
	}
	if(flag){
		flag =validateTandC(formId, needToDisplayError)
	}
	return flag;
}

function callForSignupScholarshipProgram(formId) {
	hideMessage('');
	if(!validateSignupScholarshipProgram(formId, true)){
		return false;
	}
	$('#userphone').val($('#'+formId+' #userphoneOriginal').val());
	$('#userphoneForChange').attr('disabled', true);
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForHTML('sbsb','registration/stage-1'),
		data : JSON.stringify(getRequestForSignupScholarshipProgram(formId)),
		dataType : 'json',
		success : function(data) {
			console.log('data '+data)
			if (data['status'] == 'FAILED' || data['status'] == 'EXCEPTION') {
				showMessageScholarship(0, data['message'], 'serverError');
			}else{
				showMessageScholarship(1, data['message'], 'serverError');
				if(data['statusCode']=='OTP-SEND' || data['statusCode']=='OTP009'){
					globalEntityId=data['entityId']
					$('#payId').val(data['payId']);
					$('#userId').val(data['payId']);
					$('#scholarshipRegistrationDiv').hide();
					$('#otpDiv').show();

					$('#changeNumber').show();
					$('#sendOTP').hide();

					$('#reg-step-2').show();
					$('#reg-step-1').hide();
					$('#otp-div').show();
					$('#otp-div-btn').show();
					$('#userphone').attr('disabled',true)
					$('#top-div').addClass('mt-otp')
					var razorPayData = data['razorPayData']
					var options = {
					    "key": razorPayData.key,
					    "amount": razorPayData.amount,
					    "order_id": razorPayData.orderId,
					    "currency": "INR",
					    "name": razorPayData.name,
					    "description": razorPayData.description,
					    "callback_url": razorPayData.successUrl,
					    "prefill": {
					        "name": razorPayData.payerName,
					        "email": razorPayData.payerEmail,
					        "contact": razorPayData.payerContact
					    },
					    "notes": {
					        "address": "6 New Shreyas,  Opp Jain Temple, Tagore Park Sarvapalli Radhakrishna Ambawadi Ahmedabad- 380015"
					    },
					    "theme": {
					        "color": "#F37254"
					    }
					};
					var rzp1 = new Razorpay(options);
					document.getElementById('rzp-button1').onclick = function(e){
					    rzp1.open();
					    e.preventDefault();
					}
				}else if(data['statusCode']=='OTP-SEND'){

				}
			}
		}
	});
}

function getRequestForSignupScholarshipProgram(formId){
	var scholarshipProgramDTO = {};
	var url=window.location.href;
	var isDemoUser=url.split('?isDemoUser')[1];
	if(isDemoUser!=undefined && isDemoUser!=''){
		isDemoUser=isDemoUser.split('=')[1];
		scholarshipProgramDTO['isDemoUser'] = isDemoUser;
	}
	scholarshipProgramDTO['messageChannel'] = 'S';
	scholarshipProgramDTO['location'] = $("#"+formId+" #location").val();
	scholarshipProgramDTO['otpType'] = 1;
	scholarshipProgramDTO['isdCode'] = $("#" + formId + " #isdCodeMobileNo").val();
	scholarshipProgramDTO['userphone'] = $("#"+formId+" #userphoneOriginal").val();
	scholarshipProgramDTO['otpCode'] = $("#"+formId+" #otpCode").val();
	scholarshipProgramDTO['signupType'] = 'Online';
	scholarshipProgramDTO['entityType'] = 'SCHOLARSHIP-PROGRAM';
	scholarshipProgramDTO['entityId'] = 0;
	scholarshipProgramDTO['schoolUUID'] = SCHOOL_UUID;
	scholarshipProgramDTO['uploadProfileImg'] = $('#fileupload1').parents(".file-tab").find("span.fileName").text();

	scholarshipProgramDTO['controllType'] = $("#"+formId+" #controllType").val();
	scholarshipProgramDTO['location'] = $("#"+formId+" #location").val();
	scholarshipProgramDTO['grade'] = $("#"+formId+" #currentGrade").val();
	scholarshipProgramDTO['studentName'] = $("#"+formId+" #studentName").val();
	scholarshipProgramDTO['gender'] = $("#"+formId+" #gender").val();
	scholarshipProgramDTO['fathersName'] = $("#"+formId+" #fathersName").val();
	scholarshipProgramDTO['mothersName'] = $("#"+formId+" #mothersName").val();
	var studentDOB = $("#"+formId+" #studentDob").val().split("-")[2]+'-'+$("#"+formId+" #studentDob").val().split("-")[1]+'-'+$("#"+formId+" #studentDob").val().split("-")[0];
	scholarshipProgramDTO['studentDob'] = studentDOB;
	scholarshipProgramDTO['email'] = $("#"+formId+" #email").val();
	if($("#"+formId+" #countryId").val()=='' || $("#"+formId+" #countryId").val()=='0'){
		scholarshipProgramDTO['countryId'] = 101;
	}else{
		scholarshipProgramDTO['countryId'] = 101;
	}
	scholarshipProgramDTO['stateId'] = $("#"+formId+" #stateId").val();
	scholarshipProgramDTO['cityId'] = $("#"+formId+" #cityId").val();
	scholarshipProgramDTO['addressLine1'] = $("#"+formId+" #addressLine1").val();
	scholarshipProgramDTO['zipCode'] = $("#"+formId+" #zipCode").val();
	console.log('getRequestForSignupScholarshipProgramStudent '+scholarshipProgramDTO);
	return 	scholarshipProgramDTO;
}

function setDefault(formId){
	$("#"+formId+" #currentGrade").val('');
	 $("#"+formId+" #studentName").val('Kedar Five Thakur');
	 $("#"+formId+" #gender").val('FEMALE');
	 $("#"+formId+" #fathersName").val('Kedar Nath Thakur');
	 $("#"+formId+" #mothersName").val('Raj Kumari Thakur');
	 $("#"+formId+" #studentDob").val('26-09-2007');
	 $("#"+formId+" #isdCodeMobileNo").val('91');
	 $("#"+formId+" #userphoneOriginal").val('9818934238');
	 $("#"+formId+" #email").val('priyanshi.malik@seriindia.org');
	 $("#"+formId+" #addressLine1").val('N/A');
}


//function callStudentQuestion(gradeId){
//	console.log("call-Student-Question");
//	$.ajax({
//		type : "POST",
//		url : getURLForHTML('sbsb','examination'),
//		data : "gradeId="+gradeId,
//		dataType : 'html',
//		cache : false,
//		timeout : 600000,
//		success : function(htmlContent) {
//			if(htmlContent!=""){
//            	var stringMessage = [];
//            	stringMessage = htmlContent.split("|");
//        		if(stringMessage[0] == "FAILED" || stringMessage[0] == "EXCEPTION" || stringMessage[0] == "SESSIONOUT"){
//        			if(stringMessage[0] == "SESSIONOUT"){
//        				redirectLoginPage();
//        			}else{
//        				showMessageScholarship(true, stringMessage[1]);
//        			}
//        		} else {
//        			$('#studentCourseSelectionHTML').html(htmlContent)
//        		}
//			}
//		}
//	});
//}

function createScholarShip(uuid, autoSubmit) {
	console.log("ATTEMPTED_QUESTION=> ",ATTEMPTED_QUESTION);
	console.log("MAX_QUESTION=> ",MAX_QUESTION);
	ATTEMPTED_QUESTION = ATTEMPTED_QUESTION +1;
	hideMessage('');
	$('#submitNext').attr('disabled', true);
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForHTML('sbsb','submit-scholarship-answer'),
		data : JSON.stringify(getRequestForScholarShipAnswer(autoSubmit)),
		dataType : 'json',
		success : function(data) {
			$('#submitNext').attr('disabled', false);
			if (data['status'] == '0' || data['status'] == '2') {
				if(data['statusCode']=='EXAM-CLOSED'){
					location.reload();
				}else{
					if(uuid==''){

					}else{
						$('#submitTest').attr('disabled', false);
					}
				}
				console.log("msg", data['message']);
			} else {
				console.log("msg", data['message']);
				if(uuid==''){

				}else{
					location.reload();
				}
			}
			return false;
		}
	});
}

function getRequestForScholarShipAnswer(autoSubmit){
	var request = {};
	var authentication = {};
	var requestData = {};
	var questionAnswer = {};
	var quesNo =0;
	var quesNotAttempt =1;
	var quesAttempt =1;
	var questionId = 0;
	var skipQs = true;
	if($(".quesLi").hasClass("active-qus")){
		//$.each($("input[name='ans']"), function(){
		questionId = $(".active-qus").attr('data-question');
		var qsCheckId = "";
		if($("input[name='ans"+questionId+"']").is(":checked")){
			skipQs = false;
			questionAnswer['scholarProgramId'] = $("#scholarProgramId").val();
			questionAnswer['questionId'] = $("input[name='ans"+questionId+"']:checked").attr('data-questionid');
			questionAnswer['correctAnswerOption'] = $("input[name='ans"+questionId+"']:checked").attr("data-answeroption");
			questionAnswer['answer'] = "";
			questionAnswer['autoSubmit'] = autoSubmit;
			quesNo = parseInt($("#"+questionId).text());
	    	$("#questionNo").text(quesNo+1);
	    	quesAttempt = quesAttempt + parseInt($("#questionAttempt").text());
	    	$("#questionAttempt").text(quesAttempt);
		}

		if(skipQs){
			questionAnswer['scholarProgramId'] = $("#scholarProgramId").val();
			questionAnswer['questionId'] = questionId;
			questionAnswer['correctAnswerOption'] = 0;
			questionAnswer['answer'] = "";
			questionAnswer['autoSubmit'] = autoSubmit;
			quesNo = parseInt($("#"+questionId).text());
	    	$("#questionNo").text(quesNo+1);
			quesNotAttempt = quesNotAttempt + parseInt($("#questionNoAttempt").text());
	    	$("#questionNoAttempt").text(quesNotAttempt);
		}
		//});
	}
	console.log("questionAnswer=>", JSON.stringify(questionAnswer));
	requestData['questionAnswerDTO'] = questionAnswer;
	authentication['hash'] = getHash();authentication['schoolId'] = SCHOOL_ID;authentication['schoolUUID'] = SCHOOL_UUID;
	authentication['userId'] = $("#scholarProgramId").val();
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	return request;
}

function createCloseBrowserScholarShip(uuid, autoSubmit, isRequiredReload) {
	hideMessage('');
//	if(!validateRequestForSubmitScholarship(formId)){
//		return false;
//	}
	$.ajax({
		type : "GET",
		contentType : "application/json",
		url : getURLForHTML('sbsb','close-browser-exam?UUID='+uuid+'&autoSubmit='+autoSubmit),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				console.log("msg", data['message']);
			} else {
				console.log("msg", data['message']);
			}
			if(isRequiredReload){
				location.reload();
			}
			return false;
		},
		error : function(e) {
			if(isRequiredReload){
				location.reload();
			}
		}
	});
}

function updateGradeApplyingFor(formId, studentDob, currentGrade){
	var lastDate=new Date(2020,5,1);
	var ageLDOA = M.countAgeNew(1,5,2020)//last date of application
	var selectedDate=$('#'+studentDob).val().split('-')
	var ageCAA = M.countAgeNew(selectedDate[0], selectedDate[1], selectedDate[2])
	var age = ageCAA-ageLDOA
	console.log('selectedDate '+selectedDate+', ageCAA '+ageCAA+', ageLDOA '+ageLDOA+', age '+age);
	if(age>12.928767){
		$('#'+currentGrade).html('<option value="3">Grade 8</option>')
	}else if(age>11.9260273){
		$('#'+currentGrade).html('<option value="2">Grade 7</option>')
	}else if(age>10.9260273){
		$('#'+currentGrade).html('<option value="1">Grade 6</option>')
	}else if(age>9.9260273){
		$('#'+currentGrade).html('<option value="16">Grade 5</option>')
	}else if(age>8.9260273){
		$('#'+currentGrade).html('<option value="15">Grade 4</option>')
	}else if(age>7.92328){
		$('#'+currentGrade).html('<option value="14">Grade 3</option>')
	}else if(age>6.92328){
		$('#'+currentGrade).html('<option value="13">Grade 2</option>')
	}else if(age>5.923287){
		$('#'+currentGrade).html('<option value="12">Grade 1</option>')
	}
//	else if(age>4.92328){
//		$('#'+currentGrade).html('<option value="11">Kindergarten</option>')
//	}else if(age>3.920547){
//		$('#'+currentGrade).html('<option value="17">Pre-K</option>')
//	}
}

function updateDateOfBirth(){
	var currentYear=new Date().getFullYear();
	var yearDifference=0;
	if($('#currentGrade').val()==17){
		yearDifference=3;
	}else if($('#currentGrade').val()==11){
		yearDifference=4;
	}else if($('#currentGrade').val()==12){
		yearDifference=5;
	}else if($('#currentGrade').val()==13){
		yearDifference=6;
	}else if($('#currentGrade').val()==14){
		yearDifference=7;
	}else if($('#currentGrade').val()==15){
		yearDifference=8;
	}else if($('#currentGrade').val()==16){
		yearDifference=9;
	}else if($('#currentGrade').val()==1){
		yearDifference=10;
	}else if($('#currentGrade').val()==2){
		yearDifference=11;
	}else if($('#currentGrade').val()==3){
		yearDifference=12;
	}
	if(yearDifference==0){
		$('#studentDob').attr('disabled', true)
		showMessageScholarship(0, 'Please choose your appropriate grade.','serverError');
	}else{
		$('#studentDob').attr('disabled', false)
	}
	var yearStart=currentYear-(yearDifference+1);
	var yearEnd=currentYear-(yearDifference-1);

	var startDate = new Date(yearStart,3,2);
	startDate.setDate(startDate.getDate()-100);
	var endDate = new Date(yearEnd,3,1);
	$('#studentDob').val('')
	$('#studentDob').datepicker('remove')
	$('#studentDob').datepicker({
       	autoclose: true,
       	format: 'dd-mm-yyyy',
       	startDate:startDate,
       	endDate:endDate
    }).on('changeDate', function() {
    	validateDOB('scholarshipRegistration', true);
    });
}

function createInterview(submitFrom) {
	hideModalMessage()
	if($("#interviewStatus").val()==''){
		showModalMessage(0, 'Please select a interview status')
		return false;
	}
	if($("#comment").val()==''){
		showModalMessage(0, 'Please add interview comment')
		return false;
	}
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForHTML('sbsb','submit-interview-status'),
		data : JSON.stringify(getRequestForInterviewAnswer(submitFrom)),
		dataType : 'json',
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				console.log("msg", data['message']);
			} else {
				console.log("msg", data['message']);
				showModalMessage(1, data['message'])
				//$('#interviewSaveConfirm').hide();

			}
			return false;
		}
	});
}
function showModalMessage(isWarning, message){
	$('#saveMessage').html(message);
	$('#interviewSaveMessage').modal('show');
}

function hideModalMessage(){
	$('#saveMessage').html('');
	$('#interviewSaveMessage').modal('hide');
}
function getRequestForInterviewAnswer(submitFrom){

	var request = {};
	var authentication = {};
	var requestData = {};
	var scholarshipProgram = {};
	var studentInterview = [];
	scholarshipProgram['interviewId'] = $("#interviewId").val();
	scholarshipProgram['scholarProgramId'] = $("#scholarProgramId").val();
	scholarshipProgram['interviewerId'] = $("#interviewerId").val();

	scholarshipProgram['markInterviewStatus'] = $("#interviewStatus").val();
	scholarshipProgram['interviewComment'] = $("#comment").val();
	scholarshipProgram['totalMarks'] = $("#finalTotalMarks").text();
	scholarshipProgram['interviewMark'] = $("#optainMark").text();
	scholarshipProgram['finalScore'] = $("#finalScore").text();
	$(".interQuestion").each(function(index, tr) {
		console.log(index);
		console.log($(this).attr("data-questionid"));
		var questionId = $(this).attr("data-questionid");
			var studentInt = {}
			studentInt['questionId'] = questionId;
			studentInt['scholarProgramId'] = $("#scholarProgramId").val();
			studentInt['intQuesAnsId'] = $("#intQuesAnsId"+questionId).val();
			studentInt['maxMark'] = $("#qmaxMark"+questionId).text();
			studentInt['intMark'] = $("#totalMarks"+questionId).val();
			studentInt['comment'] = $("#additionalComments"+questionId).val();
			studentInterview.push(studentInt);
		});
	scholarshipProgram['scholarShipCode'] = $("#scholarCode").text();
	scholarshipProgram['scholarShipStatus'] = $("#scholarStatus").val();

	var startDate = $.trim($("#daterange").val().split("-")[0]);
	var endDate = $.trim($("#daterange").val().split("-")[1]);
	scholarshipProgram['scholarShipCodeStart'] = startDate;
	scholarshipProgram['scholarShipCodeEnd'] = endDate;
	scholarshipProgram['submitFrom'] = submitFrom;
	scholarshipProgram['studentInterview'] = studentInterview;
	console.log("questionAnswer=>", JSON.stringify(scholarshipProgram));
	requestData['scholarshipProgramDTO'] = scholarshipProgram;
	authentication['hash'] = getHash();authentication['schoolId'] = SCHOOL_ID;authentication['schoolUUID'] = SCHOOL_UUID;
	authentication['userId'] = $("#interviewerId").val();
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	return request;
}


function getFinalScore(finalScore, totalMarks, grade) {
	hideMessage('');
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForHTML('sbsb','get-fee-breakout'),
		data : JSON.stringify(getRequestForFinalScore(finalScore, totalMarks, grade)),
		dataType : 'json',
		success : function(data) {
			console.log(data.responseData.feeBreakup);
			if (data['status'] == '0' || data['status'] == '2') {
				console.log("msg", data['message']);
			} else {
				console.log("msg", data['message']);
				$("#regFee").text(data.responseData.feeBreakup.registrationFeeString);
				$("#totalGradeFee").text(data.responseData.feeBreakup.courseFeeString);
				$("#scholarDiscount").text(data.responseData.feeBreakup.scholarshipDiscountString);
				$("#amountPayble").text(data.responseData.feeBreakup.payableAmountString);
				$("#finalPercent").text(data.responseData.feeBreakup.scholarshipDiscountPercentage);
				$("#finalDisAmount").text(data.responseData.feeBreakup.scholarshipDiscountString);
				if(data.responseData.feeBreakup.scholarshipDiscount>0){
					$("#eligibleScholar").text("Recommended for Scholarship");
					$("#scholarStatus").val("Y");
				}else{
					$("#eligibleScholar").text("Not Recommended for Scholarship");
					$("#scholarStatus").val("N");
				}
			}
			return false;
		}
	});
}

function getRequestForFinalScore(finalScore, totalMarks, grade){
	var request = {};
	var authentication = {};
	var requestData = {};
	var scholarshipProgram = {};
	scholarshipProgram['interviewId'] = $("#interviewId").val();
	scholarshipProgram['totalMarks'] = totalMarks;
	scholarshipProgram['finalScore'] = finalScore;
	scholarshipProgram['grade'] = grade;
	requestData['scholarshipProgramDTO'] = scholarshipProgram;
	authentication['hash'] = getHash();authentication['schoolId'] = SCHOOL_ID;authentication['schoolUUID'] = SCHOOL_UUID;
	authentication['userId'] = $("#interviewerId").val();
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	return request;
}
