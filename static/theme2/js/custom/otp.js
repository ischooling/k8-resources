$(document).ready(function() {
	//entityType==REQUEST-DEMO
	//entityType==STUDENT-SIGNUP
	//entityType==TEACHER-SIGNUP
//	$("#sendOTP").click(function(event) {
//		event.preventDefault();
//		callForOTP('userSignupForm',moduleId, 1, 'S', 'REQUEST-DEMO','0');
//	});

//	$("#resendOTP").click(function(event) {
//		event.preventDefault();
//		callForOTP('userSignupForm',moduleId, 2, 'S', 'REQUEST-DEMO','0');
//	});

//	$("#verifyOTP").click(function(event) {
//		event.preventDefault();
//		callForOTP('userSignupForm',moduleId, 3, 'S', 'REQUEST-DEMO','0');
//	});

});

//otpType = 1 = SEND-OTP
//otpType = 2 = RESEND-OTP
//otpType = 3 = VERIFY-OTP

function callForOTP(formId, moduleId, otpType, messageChannel, entityType, entityId) {

	if(entityType=='STUDENT-SIGNUP' || entityType=='TEACHER-SIGNUP'){
		hideMessage('');
		hideMessageRequestDemoPage('serverError','');
	}else if(entityType=='SCHOLARSHIP-PROGRAM'){
		hideMessageScholarship('serverError');
	}else if(entityType=='REQUEST-DEMO'){
		hideMessage('');
		hideMessageRequestDemoPage('serverError','');
	}

	if(!validateRequestForOTP(formId, moduleId, otpType, messageChannel, entityType, entityId)){
		return false;
	}
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForCommon('otp-process'),
		data : JSON.stringify(getRequestForOTP(formId, moduleId, otpType, messageChannel, entityType, entityId)),
		dataType : 'json',
		async : false,
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				if(entityType=='STUDENT-SIGNUP' || entityType=='TEACHER-SIGNUP'){
					showMessageRequestDemoPage(false, data['message'], 'serverError','');
				}else if(entityType=='SCHOLARSHIP-PROGRAM'){
					showMessageScholarship(0, data['message'], 'serverError');
				}else if(entityType=='REQUEST-DEMO'){
					$('#otpMessage').addClass('danger').html(data['message']);
					$('.send-otp-message').addClass('show-otp-message');
					$('.confirm-meeting-form').addClass('otp-overlay');
					setTimeout(function(){
						$('.send-otp-message').removeClass('show-otp-message');
						$('.confirm-meeting-form').removeClass('otp-overlay');
					}, 4000);
					showMessage(false, data['message']);
					showMessageRequestDemoPage(false, data['message'],'otpCodeError','otpCode');
				}else if(entityType=='EVALUATION-FORM'){
					showMessageRequestDemoPageWithTimeout(true, data['message'],'otpModelMesg','');
				}
				return false;
			}
			if(otpType==1){
				if(data['statusCode']=='OTP009'){
					if(JSON.parse($('#location').val()).timezone!='Asia/Kolkata'){
						$('#heading-id').addClass('hide')
						$('.fixed-height-desktop').removeClass('hide-step');
						$('.opt-step').addClass('hide')
					}else{
						if(entityType=='STUDENT-SIGNUP' || entityType=='TEACHER-SIGNUP'){
							$('.otp-field-wrapper').slideDown();
							$('#userphone').prop('disabled', true);
							$('#sendOTP').hide()
							$('#changeNumber').show()
							showMessage(false, data['message']);
							showMessageRequestDemoPage(false, data['message'], 'serverError','');
						}else if(entityType=='SCHOLARSHIP-PROGRAM'){
							$('#sendOTP').hide()
							$('#changeNumber').show()
							showMessageScholarship(1, data['message'], 'serverError');
							$('#verifyOTP').attr('disabled',false)
							$('#userphone').attr('disabled',true)
							$('#otpCode').val('')
							$('#otp-div').show();
							$('#otp-div-btn').show();
						}else if(entityType=='REQUEST-DEMO'){
							var PhoneNumLength = $("#"+formId+" #userphone").val().length;
							var PhoneNumber = $("#"+formId+" #userphone").val();
							if(PhoneNumLength > 9 && PhoneNumLength < 11 ){
								$('.otp-field-wrapper').css("display","block");
								$('.otp-message').css("display","none");
								$('.send-otp').addClass('hide-btn');
								$('.change-number').removeClass('hide-btn');
								$('#userphone').attr('disabled', true);
								$('#otpMessage').html('An OTP has been sent to <b>+91-' + PhoneNumber+'</b>');
								$('.send-otp-message').addClass('show-otp-message');
								$('.confirm-meeting-form').addClass('otp-overlay');
								setTimeout(function(){
									$('.send-otp-message').removeClass('show-otp-message');
									$('.confirm-meeting-form').removeClass('otp-overlay');
								}, 4000);
							}
						}else if(entityType=='EVALUATION-FORM'){
							var PhoneNumber = $("#"+formId+" #userphone").val();
							$('#userNoForOtp').html("We've sent a verification code to your registered number "+PhoneNumber);
							var counter = 15;
							var interval = setInterval(function() {
							    // Display 'counter' wherever you want to display it.
							    if (counter <= 0) {
										clearInterval(interval);
									 /* $('#timer').html("<h4><b>Count down complete</b></h4>");  */
									 $('#OTP_MODAL .modal-body').find('.disable-otp-item').removeClass('disable-otp-item')
									 $('#time').text("");
									 $('#timer').hide()
								   return;
							    }else{
								    $('#time').text(counter+" Sec.");
								 //console.log("Timer --> " + counter);
							    }
							    counter--;
							}, 1000);
							$("#OTP_MODAL").modal({backdrop: 'static',keyboard: false});
						}
					}
				}else if(data['statusCode']=='OTP012'){
					if(entityType=='STUDENT-SIGNUP' || entityType=='TEACHER-SIGNUP'){
						showMessageRequestDemoPage(false, data['message'], 'serverError','');
					}else if(entityType=='SCHOLARSHIP-PROGRAM'){
						showMessageScholarship(0, data['message'], 'serverError');
					}else if(entityType=='REQUEST-DEMO'){
						$('#otpMessage').addClass('danger').html(data['message']);
						$('.send-otp-message').addClass('show-otp-message');
						$('.confirm-meeting-form').addClass('otp-overlay');
						setTimeout(function(){
							$('.send-otp-message').removeClass('show-otp-message');
							$('.confirm-meeting-form').removeClass('otp-overlay');
						}, 4000);
						showMessage(false, data['message']);
						showMessageRequestDemoPage(false, data['message'], 'serverError','');
					}else if(entityType=='EVALUATION-FORM'){
						showMessageRequestDemoPageWithTimeout(true, data['message'],'evaluationFieldError','');
					}
					return false;
				}else{
					if(entityType=='STUDENT-SIGNUP' || entityType=='TEACHER-SIGNUP'){
						$('.otp-field-wrapper').slideDown();
						$('#mobileNumber').prop('disabled', true);
						$('#sendOTP').hide()
						$('#changeNumber').show()
					}else if(entityType=='SCHOLARSHIP-PROGRAM'){
						$('#mobileNumber').prop('disabled', true);
						$('#sendOTP').hide()
						$('#changeNumber').show()
					}else if(entityType=='REQUEST-DEMO'){
						$('#otpMessage').addClass('danger').html(data['message']);
						$('.send-otp-message').addClass('show-otp-message');
						$('.confirm-meeting-form').addClass('otp-overlay');
						setTimeout(function(){
							$('.send-otp-message').removeClass('show-otp-message');
							$('.confirm-meeting-form').removeClass('otp-overlay');
						}, 4000);
						showMessage(false, data['message']);
						showMessageRequestDemoPage(false, data['message'], 'serverError','');
					}else if(entityType=='EVALUATION-FORM'){
						showMessageRequestDemoPageWithTimeout(true, data['message'],'evaluationFieldError','');
					}
				}
			}else if(otpType==2){
				if(entityType=='STUDENT-SIGNUP' || entityType=='TEACHER-SIGNUP'){
					$('.otp-field-wrapper').slideDown();
					$('#userphone').prop('disabled', true);
					$('#sendOTP').hide()
					$('#changeNumber').show()
					showMessage(false, data['message']);
					showMessageRequestDemoPage(false, data['message'], 'serverError','');
				}else if(entityType=='SCHOLARSHIP-PROGRAM'){
					$('#userphone').prop('disabled', true);
					$('#sendOTP').hide()
					$('#changeNumber').show()
					$('#otpCode').val('')
					showMessageScholarship(1, data['message'], 'serverError');
				}else if(entityType=='REQUEST-DEMO'){
					if(data['statusCode']=='OTP006'){
						var PhoneNumber = $('#userphone').val()
						$('#otpMessage').html('An OTP has been sent to <b>+91-' + PhoneNumber+'</b>');
						$('.send-otp-message').addClass('show-otp-message');
						$('.confirm-meeting-form').addClass('otp-overlay');
						setTimeout(function(){
							$('.send-otp-message').removeClass('show-otp-message');
							$('.confirm-meeting-form').removeClass('otp-overlay');
						}, 4000);
					}else{
						$('#otpMessage').addClass('danger').html(data['message']);
						$('.send-otp-message').addClass('show-otp-message');
						$('.confirm-meeting-form').addClass('otp-overlay');
						setTimeout(function(){
							$('.send-otp-message').removeClass('show-otp-message');
							$('.confirm-meeting-form').removeClass('otp-overlay');
						}, 4000);
						showMessage(false, data['message']);
						showMessageRequestDemoPage(false, data['message'], 'serverError','');
					}
				}else if(entityType=='EVALUATION-FORM'){
					if(data['statusCode']=='OTP006'){
						var PhoneNumber = $("#"+formId+" #userphone").val();
						$('#userNoForOtp').html("We've resent a verification code to your registered number "+PhoneNumber);
						$('#OTP_MODAL .modal-body').find('#resendOTP').addClass('disable-otp-item')
						$('#OTP_MODAL .modal-body').find('#editMobileNo').addClass('disable-otp-item')

						var counter = 15;
						var interval = setInterval(function() {

						    // Display 'counter' wherever you want to display it.
						    if (counter <= 0) {
						     		clearInterval(interval);
						      	/* $('#timer').html("<h4><b>Count down complete</b></h4>");  */
						      	$('#OTP_MODAL .modal-body').find('.disable-otp-item').removeClass('disable-otp-item')
						      	$('#time').text("");
						      	$('#timer').hide()
						        return;
						    }else{
						    	$('#timer').show()
						    	$('#time').text(counter+" Sec.");
						      //console.log("Timer --> " + counter);
						    }
						    counter--;
						}, 1000);
					}
				}
			}else if(otpType==3){
				if(entityType=='STUDENT-SIGNUP' || entityType=='TEACHER-SIGNUP'){
					if (data['statusCode'] == 'MIDPAGE001') {
						url = CONTEXT_PATH + "student/signup/student-registration";
						goAhead(url, '');
						showMessageRequestDemoPage(false, data['message'], 'serverError','');
						return false;
					}else if(data['statusCode']=='TECMID001'){
						url = CONTEXT_PATH+"teacher/signup/teacher-registration";
						showMessageRequestDemoPage(false, data['message'], 'serverError','');
						goAhead(url, '');
						return false;
					}else {
						$('#heading-id').addClass('hide')
						$('.fixed-height-desktop').removeClass('hide-step');
						$('.opt-step').addClass('hide')
						showMessageRequestDemoPage(true, data['message'], 'serverError', '');
					}

				}else if(entityType=='SCHOLARSHIP-PROGRAM'){
					showMessageScholarship(1, 'Phone number verified successfully', 'serverError');
					$('#userphone').attr('disabled',false)
					$('#changeNumber').hide();
					$('#sendOTP').show();
					$('#verifyOTP').attr('disabled',true)
					$('#otp-div').hide();
					$('#otp-div-btn').hide();
					$('#rzp-button1').trigger('click');
				}else if(entityType=='REQUEST-DEMO'){
					if(data['statusCode']=='OTP009'){
						$('.change-number').addClass('hide-btn');
						$('.otp-field-wrapper').css("display","none");
						$('#userphone').attr('disabled', true);
						$('#sendOtp').addClass('hide');
						$('#verifiedNumber').removeClass('hide')
						$('#otpMessage').addClass('verified').html('Your mobile number is verified');
						$('.send-otp-message').addClass('show-otp-message');
						setTimeout(function(){
							$('.send-otp-message').removeClass('show-otp-message');
							$('.confirm-meeting-form').removeClass('otp-overlay');
						}, 4000);
						$('#otpVerifiedstatus').val('true');
						if(formId=='requestDemo'){
							validateRequestForActiveConfirm(formId, moduleId);
						}
					}else{
						$('#otpMessage').addClass('danger').html(data['message']);
						$('.send-otp-message').addClass('show-otp-message');
						$('.confirm-meeting-form').addClass('otp-overlay');
						setTimeout(function(){
							$('.send-otp-message').removeClass('show-otp-message');
							$('.confirm-meeting-form').removeClass('otp-overlay');
						}, 4000);
						showMessage(false, data['message']);
						showMessageRequestDemoPage(false, data['message'],'otpCodeError','otpCode');
					}
				}else if(entityType=='EVALUATION-FORM'){
					if(data['statusCode']=='OTP009'){
						$("#OTP_MODAL").modal('toggle');
						$('#otpVerifiedstatus').val('true');
						$('#userphone').attr('disabled', true);
						callForEvaluationForm(formId, moduleId);
					}else{
						showMessageRequestDemoPageWithTimeout(true, data['message'],'otpModelMesg','');
					}
				}

			}
			return true;
		}
	});
}

function changeMobileNumber(entityType){
	if(entityType=='STUDENT-SIGNUP' || entityType=='TEACHER-SIGNUP'||entityType==undefined){
		$('.otp-field-wrapper').slideUp();
		$('.fixed-height-desktop').addClass('hide-step');
		$('.opt-step').removeClass('hide')
		$('#userphone').prop('disabled', false);
		$('#sendOTP').show()
		$('#changeNumber').hide()
		$('#otpCode').val("");
	}else if(entityType=='SCHOLARSHIP-PROGRAM'){

	}else if(entityType=='REQUEST-DEMO'){

	}

}

function validateRequestForOTP(formId, moduleId, otpType, messageChannel, entityType, entityId){
	var flag=true;

	if(entityType=='STUDENT-SIGNUP' || entityType=='TEACHER-SIGNUP'){
		hideMessageRequestDemoPage('serverError','');
		hideMessageRequestDemoPage('userphoneError','userphone');
		hideMessageRequestDemoPage('otpCodeError','otpCode');
	}else if(entityType=='SCHOLARSHIP-PROGRAM'){
		hideMessageScholarship('serverError');
	}else if(entityType=='REQUEST-DEMO'){
		hideMessageRequestDemoPage('serverError','');
		hideMessageRequestDemoPage('userphoneError','userphone');
		hideMessageRequestDemoPage('otpCodeError','otpCode');
	}

	if (!validateFormAscii(formId)) {
		if(entityType=='STUDENT-SIGNUP' || entityType=='TEACHER-SIGNUP'){
			showMessageRequestDemoPage(false, 'Please use the English Keyboard while providing information','serverError','');
		}else if(entityType=='SCHOLARSHIP-PROGRAM'){
			showMessageScholarship(0, 'Please use the English Keyboard while providing information','serverError');
		}else if(entityType=='REQUEST-DEMO'){
			showMessageRequestDemoPage(false, 'Please use the English Keyboard while providing information','serverError','');
		}else if(entityType=='EVALUATION-FORM'){
			showMessageRequestDemoPageWithTimeout(true, 'Please use the English Keyboard while providing information','otpModelMesg','');
		}
		return false
	}
	$("#"+formId+" #userphone").removeClass('bdr-red');
	if (M.isMobile($("#"+formId+" #userphone").val()) == null) {
		if(entityType=='STUDENT-SIGNUP' || entityType=='TEACHER-SIGNUP'){
			$("#"+formId+" #userphone").css('color', '#a9a9a9');
			showMessageRequestDemoPage(true, 'Mobile number is either empty or invalid', 'mobileNumberError','userphone');
		}else if(entityType=='SCHOLARSHIP-PROGRAM'){
			showMessageScholarship(0, 'Phone number is either invalid or empty','serverError');
			$("#"+formId+" #userphone").addClass('bdr-red');
		}else if(entityType=='REQUEST-DEMO'){
			$("#"+formId+" #userphone").css('color', '#a9a9a9');
			showMessageRequestDemoPage(true, 'Mobile number is either empty or invalid', 'mobileNumberError','userphone');
		}else if(entityType=='EVALUATION-FORM'){
			$("#"+formId+" #userphone").css('color', '#a9a9a9');
			showMessageRequestDemoPageWithTimeout(true, 'Mobile number is either empty or invalid','otpModelMesg','');
		}
		return false
	}
	if(otpType==3){
		$("#"+formId+" #otpCode").removeClass('bdr-red');
		if(entityType=='EVALUATION-FORM'){
			formId='evalutionOTPModelForm';
		}
		if ($("#"+formId+" #otpCode").val().length !=6 ) {
			if(entityType=='STUDENT-SIGNUP' || entityType=='TEACHER-SIGNUP'){
				$("#"+formId+" #otpCode").css('color', '#a9a9a9');
				showMessageRequestDemoPage(true, 'Please enter valid OTP', 'otpCodeError','otpCode');
			}else if(entityType=='SCHOLARSHIP-PROGRAM'){
				showMessageScholarship(0, 'Please enter valid OTP','serverError');
				$("#"+formId+" #otpCode").addClass('bdr-red');
			}else if(entityType=='REQUEST-DEMO'){
				$("#"+formId+" #otpCode").css('color', '#a9a9a9');
				showMessageRequestDemoPage(true, 'Please enter valid OTP', 'otpCodeError','otpCode');
			}else if(entityType=='EVALUATION-FORM'){
				$("#"+formId+" #otpCode").css('color', '#a9a9a9');
				showMessageRequestDemoPageWithTimeout(true, 'Please enter valid OTP','otpModelMesg','otpCode');
			}
			flag=false
		}
	}
	return flag;
}

function getRequestForOTP(formId, moduleId, otpType, messageChannel, entityType, entityId){
	var RequestOTP = {};
	var authentication = {};
	var RequestOTPData = {};
	var url=window.location.href;
	var isDemoUser=url.split('?isDemoUser')[1];
	RequestOTPData['messageChannel'] = messageChannel;
	RequestOTPData['location'] = $("#"+formId+" #location").val();
	RequestOTPData['formId'] = formId;
	RequestOTPData['otpType'] = otpType;
	RequestOTPData['isdCode'] = $("#" + formId + " #isdCodeMobileNo").val();
	RequestOTPData['userphone'] = $("#"+formId+" #userphone").val();
	RequestOTPData['signupType'] = 'Online';
	RequestOTPData['schoolUUID'] = SCHOOL_UUID;
	RequestOTPData['schoolId'] = SCHOOL_ID;

	if(entityType=='EVALUATION-FORM'){
		RequestOTPData['otpCode'] = $("#evalutionOTPModelForm #otpCode").val();
	}else{
		RequestOTPData['otpCode'] = $("#"+formId+" #otpCode").val();
	}
	RequestOTPData['entityType'] = entityType;
	if(globalEntityId==''){
		RequestOTPData['entityId'] = entityId;
	}else{
		RequestOTPData['entityId'] = globalEntityId;
	}

	if(isDemoUser!=undefined && isDemoUser!=''){
		isDemoUser=isDemoUser.split('=')[1];
		RequestOTPData['isDemoUser'] = isDemoUser;
	}
	RequestOTP['requestOTPData'] = RequestOTPData;
	authentication['hash'] = getHash();authentication['schoolId'] = SCHOOL_ID;authentication['schoolUUID'] = SCHOOL_UUID;
	authentication['userType'] = moduleId;
	RequestOTP['authentication'] = authentication;
	RequestOTP['requestData'] = RequestOTPData;
	return RequestOTP;
}
