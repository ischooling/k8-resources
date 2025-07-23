$(document).ready(function() {
});
function validateRequestForEvaluationFormDetails(formId, otpType){
	if ($("#"+formId+" #studentName").val()=='' || $("#"+formId+" #studentName").val()==null) {
		showMessageRequestDemoPageWithTimeout(true, 'Student Name is required','evaluationFieldError','studentName');
		return false
	}
	if ($("#"+formId+" #parentName").val()=='' || $("#"+formId+" #parentName").val()==null) {
		showMessageRequestDemoPageWithTimeout(true, 'Guardian Name is required','evaluationFieldError','parentName');
		return false
	}
	if ($("#"+formId+" #gradeId").val()=='' || $("#"+formId+" #gradeId").val()==null) {
		showMessageRequestDemoPageWithTimeout(true, 'Grade is required','evaluationFieldError','gradeId');
		return false;
	}
	if (!validateEmail($("#" + formId + " #emailId").val())) {
		showMessageRequestDemoPageWithTimeout(true, 'Email is either empty or invalid','evaluationFieldError','emailId');
		return false
	}
	if ($("#"+formId+" #userphone").val()=='' || $("#"+formId+" #userphone").val()==null) {
		showMessageRequestDemoPageWithTimeout(true, 'Phone Number is required','evaluationFieldError','userphone');
		return false
	}else if ($("#"+formId+" #userphone").val()!='') {
		var PhoneNumLength = $("#"+formId+" #userphone").val().length;
		if(PhoneNumLength != 10){
			showMessageRequestDemoPageWithTimeout(true, 'Phone Number is invalid','evaluationFieldError','userphone');
			return false
		}
	}
	if ($("#"+formId+" #stateId").val()==0 || $("#"+formId+" #stateId").val()==null) {
		showMessageRequestDemoPageWithTimeout(true, 'State is required','evaluationFieldError','stateId');
		return false;
	}
	if ($("#"+formId+" #cityId").val()==0 || $("#"+formId+" #cityId").val()==null) {
		showMessageRequestDemoPageWithTimeout(true, 'City is required','evaluationFieldError','cityId');
		return false;
	}
	var attachmentName1 = $('#fileupload1').parents(".file-tab").find("span.fileName").text();
	if (attachmentName1.trim() == "" || attachmentName1.trim() == undefined || attachmentName1.trim() == "No file chosen..." ) {
		showMessageRequestDemoPageWithTimeout(true, 'Birth certificate is Required','evaluationFieldError','fileupload1ChoosenFile');
		return false;
	}

	var attachmentName2 = $('#fileupload2').parents(".file-tab").find("span.fileName").text();
	if (attachmentName2.trim() == "" || attachmentName2.trim() == undefined || attachmentName2.trim() == "No file chosen..." ) {
		showMessageRequestDemoPageWithTimeout(true, 'Aadhaar card or any other ID proof is Required','evaluationFieldError','fileupload2ChoosenFile');
		return false;
	}

	var attachmentName3 = $('#fileupload3').parents(".file-tab").find("span.fileName").text();
	if (attachmentName3.trim() == "" || attachmentName3.trim() == undefined || attachmentName3.trim() == "No file chosen..." ) {
		showMessageRequestDemoPageWithTimeout(true, 'Academic documents of the last grade attended is Required','evaluationFieldError','fileupload3ChoosenFile');
		return false;
	}

	var otpverifiedStatus=$("#" + formId + " #otpVerfiedStatus").val();
	if(otpverifiedStatus){

	}else{
		if("sendOTP"==otpType){
			callForOTP('evalutionForm','COMMON', 1, 'S', 'EVALUATION-FORM','0');
		}
		if("resendOTP"==otpType){
			callForOTP('evalutionForm','COMMON', 2, 'S', 'EVALUATION-FORM','0');
		}
	}
	return true;
}

function callForEvaluationForm(formId, moduleId) {
	if(!validateRequestForEvaluationFormDetails(formId,moduleId)){
		return false;
	}
	$.ajax({
		type : "POST",
		url : getURLForHTML('common','evaluation-form-content'),
		contentType : "application/json",
		data : JSON.stringify(getRequestForEvaluation(formId, moduleId)),
		dataType : 'html',
		cache : false,
		timeout : 600000,
		success : function(htmlContent) {
			if(htmlContent!=""){
            	var stringMessage = [];
            	stringMessage = htmlContent.split("|");
        		if(stringMessage[0] == "FAILED" || stringMessage[0] == "EXCEPTION" || stringMessage[0] == "SESSIONOUT" ){
        			showMessageRequestDemoPageWithTimeout(true, stringMessage[1],'evaluationFieldError','');
        		} else {
					var placeName=$("#" + formId + " #cityId option:selected").text();
					$('#showPtName').html(toTitleCase($("#" + formId + " #parentName").val()));
					$('#showStName').html(toTitleCase($("#" + formId + " #studentName").val()));
					$('#showGradeName').html($("#" + formId + " #gradeId :selected").text());
					$('#showPlaceName').html("<b>Place : </b>"+placeName);
					var d = new Date();
					var strDate = M.months[d.getMonth()]+ " " +  d.getDate() + ", " +d.getFullYear();
					$('#showDate').html("<b>Date : </b>"+strDate);
					$('.form-review-wrapper').addClass('show-form-review');
					$('.form-wrapper').hide();
					$('#evaluationId').val(stringMessage[2]);
        		}
        		return false;
			}
			return false;
		},
		error : function(e) {
			showMessage(true, e.responseText);
		}
	});
}
function getRequestForEvaluation(formId, moduleId){
	var request = {};
	var authentication = {};
	var requestData = {};
	var evaluationFormDTO = {};
	var url=window.location.href;
	var isDemoUser=url.split('?isDemoUser')[1];
	if(isDemoUser!=undefined && isDemoUser!=''){
		isDemoUser=isDemoUser.split('=')[1];
		evaluationFormDTO['isDemoUser'] = isDemoUser;
	}
	evaluationFormDTO['evaluationId'] = $("#" + formId + " #evaluationId").val();
	evaluationFormDTO['studentName'] = $("#" + formId + " #studentName").val();
	evaluationFormDTO['parentName'] = $("#" + formId + " #parentName").val();
	evaluationFormDTO['emailId'] = $("#" + formId + " #emailId").val();
	evaluationFormDTO['gradeId'] = $("#" + formId + " #gradeId").val();
	evaluationFormDTO['gradeName'] = $("#" + formId + " #gradeId :selected").text();
	evaluationFormDTO['contactNumber'] = $("#" + formId + " #userphone").val();
	evaluationFormDTO['otpVerfiedStatus'] = $("#" + formId + " #otpVerfiedStatus").val();
	evaluationFormDTO['stateId'] = $("#" + formId + " #stateId").val();
	evaluationFormDTO['cityId'] = $("#" + formId + " #cityId").val();

	evaluationFormDTO['attachment1'] = $('#fileupload1').parents(".file-tab").find("span.fileName").text();
	evaluationFormDTO['attachment2'] = $('#fileupload2').parents(".file-tab").find("span.fileName").text();
	evaluationFormDTO['attachment3'] = $('#fileupload3').parents(".file-tab").find("span.fileName").text();

	evaluationFormDTO['location'] = $("#" + formId + " #location").val();
	requestData['evaluationFormDTO'] = evaluationFormDTO;
	authentication['hash'] = getHash();
	authentication['userType'] = moduleId;
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	return request;
}
function callForEvaluationProgramPayment(formId, moduleId) {
	hideMessage('');
//	if(!validateEvaluationProgramPayment(formId, true)){
//		return false;
//	}
//	$('#userphone').val($('#'+formId+' #userphoneOriginal').val());
//	$('#userphoneForChange').attr('disabled', true);
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForHTML('common','evaluation-program-payment'),
//		url : getURLForHTML('sbsb','registration/stage-1'),
		data : JSON.stringify(getRequestForEvaluationProgramPayment(formId)),
		dataType : 'json',
		success : function(data) {
			console.log('data '+data)
			if (data['status'] == 'FAILED' || data['status'] == 'EXCEPTION') {
				showMessageRequestDemoPageWithTimeout(true, data['message'],'evaluationPaymentError','');
			}else{
//				showMessageScholarship(1, data['message'], 'serverError');
				globalEntityId=data['entityId']
				$('#payId').val(data['payId']);
				$('#userId').val(data['payId']);
				
				if(data['razorPayData']!=null){
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
					$('#rzp-button1').trigger('click');
				}else if(data['ccAvenueData']!=null){
					var ccAvenueData = data['ccAvenueData']
					var pgUrl=ccAvenueData.gatewayUrl+'&encRequest='+ccAvenueData.encRequest+'&access_code='+ccAvenueData.accessCode;
					goAhead(pgUrl,'');
				}
			}
		}
	});
}
function getRequestForEvaluationProgramPayment(formId){
	var evaluationFormDTO = {};
	var url=window.location.href;
	var isDemoUser=url.split('?isDemoUser')[1];
	if(isDemoUser!=undefined && isDemoUser!=''){
		isDemoUser=isDemoUser.split('=')[1];
		evaluationFormDTO['isDemoUser'] = isDemoUser;
		evaluationFormDTO['schoolUUID'] = SCHOOL_UUID;
	}
	evaluationFormDTO['evaluationId'] = $("#" + formId + " #evaluationId").val();
	return 	evaluationFormDTO;
}