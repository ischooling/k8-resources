function callCommonInitPayment(formId, moduleId, eligiblePaymentGateway) {
	hideMessage('');
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForHTML('common','payment-initiated'),
		data : JSON.stringify(getRequestForInitPayment(formId, moduleId, eligiblePaymentGateway)),
		dataType : 'json',
		cache : false,
		async: false,
		timeout : 600000,
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				showMessage(1, data['message']);
			} else {
				showMessage(1, data['message']);
				callCommonPaymentGateway('','common','', eligiblePaymentGateway);
			}
			return false;
		}
	});
}
function getRequestForInitPayment(formId, moduleId, eligiblePaymentGateway){
	var request = {};
	var authentication = {};
	var requestData = {};
	var commonPaymentInfoDTO = {};
	commonPaymentInfoDTO['eligiblePaymentGateway'] = eligiblePaymentGateway;
	commonPaymentInfoDTO['userType'] = moduleId;
	if(moduleId=='STUDENT'){
		commonPaymentInfoDTO['studentId'] = $('#studentId').val().trim();
		commonPaymentInfoDTO['moduleName'] = $('#moduleName').val().trim();
		commonPaymentInfoDTO['paymentTitle'] = $('#paymentType').val().trim()();
		commonPaymentInfoDTO['paymentType'] = $('#paymentType').val().trim()();
		commonPaymentInfoDTO['paymentAmount'] = $('#totalPaymentAmount').attr('data-payAmount');
	}else if(moduleId=='SCHOOL'){
		commonPaymentInfoDTO['moduleName'] = $('#moduleName').val().trim();
		commonPaymentInfoDTO['paymentTitle'] = $('#paymentType').val().trim();
		commonPaymentInfoDTO['paymentType'] = $('#paymentType').val().trim();
		if($('#paymentType').val()=='SCHOOL-STUDENT-FEE'){
			commonPaymentInfoDTO['schoolId'] = $('#schoolId').val().trim();
			commonPaymentInfoDTO['studentId'] = $('#totalStudentIds').val().trim();
			commonPaymentInfoDTO['totalCount'] = $('#totalCount').val().trim();
			commonPaymentInfoDTO['gradeId'] = $('#currentGradeId').val().trim();
		}
	}
	commonPaymentInfoDTO['teacherRequestSubjectIds'] = $('#totalSubjectIds').attr('data-subjectids');
	
	requestData['commonPaymentInfoDTO'] = commonPaymentInfoDTO;
	authentication['hash'] = getHash();authentication['schoolId'] = SCHOOL_ID;authentication['schoolUUID'] = SCHOOL_UUID;
	authentication['userType'] = moduleId;
	authentication['userId']=$('#userId').val().trim();
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	return request;
}

function callCommonPaymentGateway(formId, module, args, callCommonPaymentGateway){
	hideModalMessage('');
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForHTML('common','call-payment-gateway'),
		data : JSON.stringify(getRequestForCommonPayment(formId, module, args, callCommonPaymentGateway)),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				showModalMessage(0, data['message']);
			} else {
				showModalMessage(1, data['message']);
				if(data['paymentGateway']=='RAZORPAY'){
					prepareSmoovPayDataAndPost(data['razorPayData']);
				}else if(data['paymentGateway']=='SMOOVPAY'){
					prepareSmoovPayDataAndPost(data['smoovPayData']);
				}else{
					window.location.replace(data['extra']);
				}
			}
			return false;
		}
	});
}
function getRequestForCommonPayment(formId, module, args, eligiblePaymentGateway){
	var request = {};
	var authentication = {};
	var requestData = {};
	if(module=='common'){
		authentication['userType'] = module;
		authentication['userId'] = $("#userId").val().trim();
		var commonPaymentInfoDTO = {};
		commonPaymentInfoDTO['themeType'] = 'theme2';
		commonPaymentInfoDTO['paymentOptionName'] = 'Online'
		commonPaymentInfoDTO['eligiblePaymentGateway'] = eligiblePaymentGateway;
		commonPaymentInfoDTO['userType'] = module;
		commonPaymentInfoDTO['moduleName'] = $('#moduleName').val().trim();
		commonPaymentInfoDTO['paymentTitle'] = $('#paymentType').val().trim();
		commonPaymentInfoDTO['paymentType'] = $('#paymentType').val().trim();
		commonPaymentInfoDTO['userPaymentId'] = $('#payId').val().trim();
		console.log("Data for Payment is :  ", commonPaymentInfoDTO);
		requestData['commonPaymentInfoDTO'] = commonPaymentInfoDTO;
	}else if(module=='student'){
		authentication['userType'] = 'STUDENT';
		var commonPaymentInfoDTO = {};
		commonPaymentInfoDTO['themeType'] = 'theme2';
		commonPaymentInfoDTO['paymentOptionName'] = 'Online'
		commonPaymentInfoDTO['eligiblePaymentGateway'] = eligiblePaymentGateway;
		commonPaymentInfoDTO['userType'] = moduleId;
		if(args!=undefined && args !=''){
			//type=INSTALLMENT-FEE&userId=331&payId=6691&paymentType=nineMonthInstall
			console.log('getRequestForCommonPayment=>'+args);
			var params = args.split("&");
			var type=params[0].split("=");
			var user=params[1].split("=");
			var userPaymentId=params[2].split("=");
			var paymentType=params[3].split("=");
			var paymentByUserId = params[4].split("=");
			commonPaymentInfoDTO['paymentByUserId'] = paymentByUserId[1];
			authentication['userId'] = user[1];
			commonPaymentInfoDTO['userPaymentId'] = userPaymentId[1];
			if(type[1]=='SUBJECT_FEE'){
				commonPaymentInfoDTO['paymentType'] = type[1];
			}else{
				commonPaymentInfoDTO['paymentType'] = paymentType[1];
			}
			commonPaymentInfoDTO['paymentTitle'] = type[1];
		}else{
			authentication['userId'] = $("#"+formId+" #userId").val().trim();
			//commonPaymentInfoDTO['moduleName'] = $('#moduleName').val().trim();
			commonPaymentInfoDTO['paymentTitle'] = $('#paymentType').val().trim();
			commonPaymentInfoDTO['paymentType'] = $('#paymentType').val().trim();
		}
		console.log("Data for Payment is :  ", commonPaymentInfoDTO);
		requestData['commonPaymentInfoDTO'] = commonPaymentInfoDTO;
	}else if(module=='school'){
		authentication['userType'] = 'SCHOOL';
		authentication['userId'] = $("#userId").val().trim();
		var commonPaymentInfoDTO = {};
		commonPaymentInfoDTO['themeType'] = 'theme2';
		commonPaymentInfoDTO['paymentOptionName'] = 'Online'
		commonPaymentInfoDTO['eligiblePaymentGateway'] = eligiblePaymentGateway;
		commonPaymentInfoDTO['userType'] = module;
		commonPaymentInfoDTO['moduleName'] = 'SCHOOL_B2B';
		if(args!=undefined && args !=''){
			//'type=One_time_Application_Fee&userId=&payId=&paymentType=One_time_Application_Fee';
			console.log('getRequestForCommonPayment=>'+args);
			var params = args.split("&");
			var type=params[0].split("=");
			var user=params[1].split("=");
			var userPaymentId=params[2].split("=");
			var paymentType=params[3].split("=");
			commonPaymentInfoDTO['paymentType'] = type[1];
			commonPaymentInfoDTO['paymentTitle'] = type[1];
		}else{
			if($('#paymentType').val().trim()==undefined){
				commonPaymentInfoDTO['paymentTitle'] = 'APPLICATION-FEE';
				commonPaymentInfoDTO['paymentType'] = 'APPLICATION-FEE';
			}else{
				commonPaymentInfoDTO['paymentTitle'] = $('#paymentType').val().trim();
				commonPaymentInfoDTO['paymentType'] = $('#paymentType').val().trim();
			}
		}
		console.log("Data for Payment is :  ", commonPaymentInfoDTO);
		requestData['commonPaymentInfoDTO'] = commonPaymentInfoDTO;
	}else if(module=='student'){
		authentication['userType'] = 'STUDENT';
		var commonPaymentInfoDTO = {};
		commonPaymentInfoDTO['themeType'] = 'theme2';
		commonPaymentInfoDTO['paymentOptionName'] = 'Online'
		commonPaymentInfoDTO['eligiblePaymentGateway'] = eligiblePaymentGateway;
		commonPaymentInfoDTO['userType'] = moduleId;
		if(args!=undefined && args !=''){
			//type=INSTALLMENT-FEE&userId=331&payId=6691&paymentType=nineMonthInstall
			console.log('getRequestForCommonPayment=>'+args);
			var params = args.split("&");
			var type=params[0].split("=");
			var user=params[1].split("=");
			var userPaymentId=params[2].split("=");
			var paymentType=params[3].split("=");
			authentication['userId'] = user[1];
			commonPaymentInfoDTO['userPaymentId'] = userPaymentId[1];
			commonPaymentInfoDTO['paymentType'] = type[1];
			commonPaymentInfoDTO['paymentTitle'] = type[1];
		}else{
			authentication['userId'] = $("#"+formId+" #userId").val().trim();
			//commonPaymentInfoDTO['moduleName'] = $('#moduleName').val().trim();
			commonPaymentInfoDTO['paymentTitle'] = $('#paymentType').val().trim();
			commonPaymentInfoDTO['paymentType'] = $('#paymentType').val().trim();
		}
		requestData['commonPaymentInfoDTO'] = commonPaymentInfoDTO;
	}else if(module=='school'){
		authentication['userType'] = 'SCHOOL';
		authentication['userId'] = $("#userId").val().trim();
		var commonPaymentInfoDTO = {};
		commonPaymentInfoDTO['themeType'] = 'theme2';
		commonPaymentInfoDTO['paymentOptionName'] = 'Online'
		commonPaymentInfoDTO['eligiblePaymentGateway'] = eligiblePaymentGateway;
		commonPaymentInfoDTO['userType'] = module;
		commonPaymentInfoDTO['moduleName'] = 'SCHOOL_B2B';
		if(args!=undefined && args !=''){
			//'type=One_time_Application_Fee&userId=&payId=&paymentType=One_time_Application_Fee';
			console.log('getRequestForCommonPayment=>'+args);
			var params = args.split("&");
			var type=params[0].split("=");
			var user=params[1].split("=");
			var userPaymentId=params[2].split("=");
			var paymentType=params[3].split("=");
			commonPaymentInfoDTO['paymentType'] = type[1];
			commonPaymentInfoDTO['paymentTitle'] = type[1];
		}else{
			commonPaymentInfoDTO['paymentTitle'] = 'APPLICATION-FEE';
			commonPaymentInfoDTO['paymentType'] = 'APPLICATION-FEE';
		}
		requestData['commonPaymentInfoDTO'] = commonPaymentInfoDTO;
	}
	authentication['hash'] = getHash();authentication['schoolId'] = SCHOOL_ID;authentication['schoolUUID'] = SCHOOL_UUID;
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	
	return request;
}

function prepareSmoovPayDataAndPost(smoovPayData){
	$("#smoovpayForm").attr("action", smoovPayData['endPoint']);
	$("#smoovpayForm input[name*='action']" ).val(smoovPayData['action']);
	$("#smoovpayForm input[name*='currency']" ).val(smoovPayData['currency']);
	$("#smoovpayForm input[name*='version']" ).val(smoovPayData['version']);
	$("#smoovpayForm input[name*='item_name_1']" ).val(smoovPayData['itemName1']);
	$("#smoovpayForm input[name*='item_description_1']" ).val(smoovPayData['itemDescription1']);
	$("#smoovpayForm input[name*='item_quantity_1']" ).val(smoovPayData['itemQuantity1']);
	$("#smoovpayForm input[name*='item_amount_1']" ).val(smoovPayData['itemAmount1']);
	$("#smoovpayForm input[name*='merchant']" ).val(smoovPayData['merchant']);
	$("#smoovpayForm input[name*='ref_id']" ).val(smoovPayData['refId']);
	$("#smoovpayForm input[name*='delivery_charge']" ).val(smoovPayData['deliveryCharge']);
	$("#smoovpayForm input[name*='tax_amount']" ).val(smoovPayData['taxAmount']);
	$("#smoovpayForm input[name*='tax_percentage']" ).val(smoovPayData['taxPercentage']);
	$("#smoovpayForm input[name*='total_amount']" ).val(smoovPayData['totalAmount']);
	$("#smoovpayForm input[name*='str_url']" ).val(smoovPayData['strUrl']);
	$("#smoovpayForm input[name*='success_url']" ).val(smoovPayData['successUrl']);
	$("#smoovpayForm input[name*='cancel_url']" ).val(smoovPayData['cancelUrl']);
	$("#smoovpayForm input[name*='signature']" ).val(smoovPayData['signature']);
	$("#smoovpayForm input[name*='signature_algorithm']" ).val(smoovPayData['signatureAlgorithm']);
	$("#smoovpayForm").submit();
}

function callStudentWireTransferPayment(paymentOption, userId, moduleId, callingFrom,paymentByUserId){
	$.ajax({
		type : "POST",
		url : getURLForHTML('common','call-for-wire-transfer-payment'),
		contentType : "application/json",
		data : JSON.stringify(getRequestForStudentWireTransferPayment(paymentOption, userId, moduleId, callingFrom,paymentByUserId)),
		dataType : 'html',
		cache : false,
		timeout : 600000,
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				showMessage(1, data['message']);
			}else{
				$('#callPaymentStudentModal').modal('hide');
				if(callingFrom=='migration' || callingFrom=='signup'){
					$('#logout_modal_logout').modal('show');
				}else{					
					$('#logout_modal_continue').modal('show');
				}
			}
		}
	});
}

function getRequestForStudentWireTransferPayment(paymentOption, userId, moduleId, callingFrom,paymentByUserId){
	var paypalAndWireTransferPaymentInfoDTO = {};
	paypalAndWireTransferPaymentInfoDTO['userId']=userId;
	paypalAndWireTransferPaymentInfoDTO['paymentByUserId']=paymentByUserId;
	paypalAndWireTransferPaymentInfoDTO['moduleId']=moduleId;
	paypalAndWireTransferPaymentInfoDTO['callingFrom']=callingFrom;
	paypalAndWireTransferPaymentInfoDTO['paymentMode']=$('#editStage5PaymentMethod').text();
	if(paymentOption==1){
		paypalAndWireTransferPaymentInfoDTO['paymentOptionName'] = "Paypal";
		paypalAndWireTransferPaymentInfoDTO['referenceNumber'] = $("#paypalForm #wireTransferNumberPaypal").val().trim();
		paypalAndWireTransferPaymentInfoDTO['uplaodedFileName'] =$("#paypalForm #fileName8").html();
		paypalAndWireTransferPaymentInfoDTO['amountPaid'] =$("#paypalForm #paypalAmount").val().trim();
		paypalAndWireTransferPaymentInfoDTO['userPaymentDetailsId'] =$("#paypalForm #userPaymentDetailsId").val().trim();
		paypalAndWireTransferPaymentInfoDTO['paymentTitle'] =$("#paypalForm #paymentTitle").val().trim();
	}else{
		paypalAndWireTransferPaymentInfoDTO['paymentOptionName'] = "WireTransfer";
		paypalAndWireTransferPaymentInfoDTO['referenceNumber'] = $("#wirePaymentForm #referenceNumber").val().trim();
		paypalAndWireTransferPaymentInfoDTO['uplaodedFileName'] =$("#wirePaymentForm #fileName9").html();
		paypalAndWireTransferPaymentInfoDTO['amountPaid'] =$("#wirePaymentForm #wireTransferAmount").val().trim();
		paypalAndWireTransferPaymentInfoDTO['userPaymentDetailsId'] =$("#wirePaymentForm #userPaymentDetailsId").val().trim();
		paypalAndWireTransferPaymentInfoDTO['paymentTitle'] =$("#wirePaymentForm #paymentTitle").val().trim()();
	}
	return paypalAndWireTransferPaymentInfoDTO;
}

function callClientCommonPaymentGatewayOffline(formId, moduleId,userId,userPaymentDetailsId, termCondi, paymentByUserId){
	console.log("callClientCommonPaymentGateway theme2", termCondi);
	$.ajax({
		type : "POST",
		url : getURLForHTML('common','call-for-client-common-payment-method-offline'),
		contentType : "application/json",
		data : JSON.stringify(getRequestForClientPayment(formId, moduleId,userId,userPaymentDetailsId, termCondi,paymentByUserId)),
		dataType : 'html',
		cache : false,
		timeout : 600000,
		success : function(htmlContent) {
			var stringMessage = [];
        	stringMessage = htmlContent.split("|");
			if(stringMessage[0] == "FAILED" || stringMessage[0] == "EXCEPTION" || stringMessage[0] == "SESSIONOUT"){
    			if(stringMessage[0] == "SESSIONOUT"){
    				//redirectLoginPage();
				}
    		}else{
    			$("#paymentMethodModel").html(htmlContent);
    			setTimeout(function(){$('body').addClass("modal-open");},1000);
    			
			}
		}
	});
}

function callClientCommonPaymentGateway(formId, moduleId,userId,userPaymentDetailsId, termCondi, paymentByUserId){
	console.log("callClientCommonPaymentGateway theme2", termCondi);
	$.ajax({
		type : "POST",
		url : getURLForHTML('common','call-for-client-common-payment-method'),
		contentType : "application/json",
		data : JSON.stringify(getRequestForClientPayment(formId, moduleId,userId,userPaymentDetailsId, termCondi,paymentByUserId)),
		dataType : 'html',
		cache : false,
		timeout : 600000,
		success : function(htmlContent) {
			var stringMessage = [];
        	stringMessage = htmlContent.split("|");
			if(stringMessage[0] == "FAILED" || stringMessage[0] == "EXCEPTION" || stringMessage[0] == "SESSIONOUT"){
    			if(stringMessage[0] == "SESSIONOUT"){
    				redirectLoginPage();
				}
    		}else{
    			if(termCondi=='booksession' ){
    				$("#payTabBookingSessionModal").modal('hide');
    				$("#paymentBookSessionModel").html(htmlContent);
    				$('#callPaymentStudentModal').modal({backdrop: 'static', keyboard: false})
    				$('#payTabModal').modal('hide');
    			}else{
    				$("#paymentMethodModel").html(htmlContent);
    			}
    			setTimeout(function(){$('body').addClass("modal-open");},1000);
    			
			}
		}
	});
}

function getRequestForClientPayment(formId, moduleId,userId,userPaymentDetailsId, termCondi,paymentByUserId){
	var clientCommonPaymentInfoDTO = {};
	clientCommonPaymentInfoDTO['userId']=userId;
	clientCommonPaymentInfoDTO['paymentByUserId']=paymentByUserId;
	clientCommonPaymentInfoDTO['moduleId']=moduleId;
	clientCommonPaymentInfoDTO['userPaymentDetailsId']=userPaymentDetailsId;
	clientCommonPaymentInfoDTO['termCondi']=termCondi;
	return clientCommonPaymentInfoDTO;
	
}

function continueWorking(){
	$('#logout_modal_logout').modal('hide');
	customLoader(true);
	setTimeout(function(){ 
		window.location.reload();
	},1000);
}

function callSigninStudentPay(formId, callingFrom){
	hideModalMessage(true);
	$('#callPaymentStudentModal').modal({backdrop: 'static', keyboard: false})
	setTimeout(function(){$('body').addClass('modal-open');},1000);
	$('#payTabModal').modal('hide');
}

function callStudentTransferSubmit(paymentOption, callingFrom, paymentByUserId){
	var functionName='';
	var userId=$('#userId').val().trim();
	if(paymentOption==1){
		if($("#wireTransferNumberPaypal").val().trim()=='' || $("#wireTransferNumberPaypal").val().trim()==undefined){
			showMessageTheme2(0, 'Reference Number is required','',true);
			return false;
		}else{
			functionName="callStudentWireTransferPayment('1', '"+userId+"', 'student','"+callingFrom+"', '"+paymentByUserId+"');"
		}
	}
	if(paymentOption==2){
		if($("#referenceNumber").val().trim()=='' || $("#referenceNumber").val().trim()==undefined){
			showMessageTheme2(0, 'Reference Number is required','',true);
			return false;
		}else{
			functionName="callStudentWireTransferPayment('2', '"+userId+"', 'student','"+callingFrom+"', '"+paymentByUserId+"');"
		}
	}
	$('#proceedStudentPayment').attr("onclick",functionName);
	$('#cancelStudentPayment').attr("onclick","$('#callPaymentStudentModal').modal({backdrop: 'static', keyboard: false});");
	$('#callPaymentStudentModal').modal('hide');
	$('#reference_number').modal('show');
}