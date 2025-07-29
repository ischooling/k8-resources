function callCommonInitPayment(formId, moduleId, eligiblePaymentGateway) {
	hideMessage('');
	//$('#callPaymentModal').modal('show');
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
				showMessage(true, data['message']);
			} else {
				showMessage(true, data['message']);
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
		commonPaymentInfoDTO['paymentTitle'] = $('#paymentType').val().trim();
		commonPaymentInfoDTO['paymentType'] = $('#paymentType').val().trim();
		commonPaymentInfoDTO['paymentAmount'] = $('#totalPaymentAmount').attr('data-payAmount');
	}else if(moduleId=='SCHOOL'){
		commonPaymentInfoDTO['moduleName'] = $('#moduleName').val().trim();
		commonPaymentInfoDTO['paymentTitle'] = $('#paymentType').val().trim();
		commonPaymentInfoDTO['paymentType'] = $('#paymentType').val().trim();
		if($('#paymentType').val().trim()=='SCHOOL-STUDENT-FEE'){
			commonPaymentInfoDTO['schoolId'] = $('#schoolId').val().trim();
			commonPaymentInfoDTO['studentId'] = $('#totalStudentIds').val().trim();
			commonPaymentInfoDTO['totalCount'] = $('#totalCount').val().trim();
			commonPaymentInfoDTO['gradeId'] = $('#currentGradeId').val().trim();
		}
	}
	commonPaymentInfoDTO['teacherRequestSubjectIds'] = $('#totalSubjectIds').attr('data-subjectids');
//	commonPaymentInfoDTO['teacherRequestPlacementSubjectIds'] = $('#totalPlacementSubjectIds').attr('data-placementSubjectIds');
	
	requestData['commonPaymentInfoDTO'] = commonPaymentInfoDTO;
	//alert(commonPaymentInfoDTO);
	authentication['hash'] = getHash();authentication['schoolId'] = SCHOOL_ID;authentication['schoolUUID'] = SCHOOL_UUID;
	authentication['userType'] = moduleId;
	authentication['userId']=$('#userId').val().trim();
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	return request;
}

function callCommonPaymentGateway(formId, module, args, callCommonPaymentGateway){
	hideModalMessage('');
	$('#cardHolderNameError').hide();
	$('#cardNumberError').hide();
	$('#cardExpiryMonthError').hide();
	$('#cardExpiryMonthError').hide();
	$('#cardCodeError').hide();
	if(callCommonPaymentGateway=='WELLSFARGO'){
		if($('#cardHolderName').val()=='' || $('#cardHolderName').val()==undefined){
			$('#cardHolderNameError').show();
			return false;
		}
		if($('#cardNumber').val()=='' || $('#cardNumber').val()==undefined){
			$('#cardNumberError').show();
			return false;
		}
		if($('#cardExpiryYear').val()=='' || $('#cardExpiryYear').val()==undefined){
			$('#cardExpiryMonthError').show();
			return false;
		}
		if($('#cardExpiryMonth').val()=='' || $('#cardExpiryMonth').val()==undefined){
			$('#cardExpiryMonthError').show();
			return false;
		}
		if($('#cardCode').val()=='' || $('#cardCode').val()==undefined){
			$('#cardCodeError').show();
			return false;
		}
	}
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
				showModalMessage(true, data['message']);
			} else {
				showModalMessage(false, data['message']);
				window.location.replace(data['extra']);
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
		
		if(eligiblePaymentGateway=='WELLSFARGO'){
			var creditCard = {};
			creditCard['cardHolderName']=$('#cardHolderName').val().trim();
			creditCard['cardNumber']=$('#cardNumber').val().trim();
			creditCard['expirationDate']=$('#cardExpiryYear').val().trim()+'-'+$('#cardExpiryMonth').val().trim();
			creditCard['cardCode']=$('#cardCode').val().trim();
			commonPaymentInfoDTO['creditCard']=creditCard;
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
		if(eligiblePaymentGateway=='WELLSFARGO'){
			var creditCard = {};
			creditCard['cardHolderName']=$('#cardHolderName').val().trim();
			creditCard['cardNumber']=$('#cardNumber').val().trim();
			creditCard['expirationDate']=$('#cardExpiryYear').val().trim()+'-'+$('#cardExpiryMonth').val().trim();
			creditCard['cardCode']=$('#cardCode').val().trim();
			commonPaymentInfoDTO['creditCard']=creditCard;
		}
		if(args!=undefined && args !=''){
			//type=INSTALLMENT-FEE&userId=331&payId=6691&paymentType=nineMonthly
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
		if(eligiblePaymentGateway=='WELLSFARGO'){
			var creditCard = {};
			creditCard['cardHolderName']=$('#cardHolderName').val();
			creditCard['cardNumber']=$('#cardNumber').val();
			creditCard['expirationDate']=$('#cardExpiryYear').val()+'-'+$('#cardExpiryMonth').val();
			creditCard['cardCode']=$('#cardCode').val();
			commonPaymentInfoDTO['creditCard']=creditCard;
		}
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
		if(eligiblePaymentGateway=='WELLSFARGO'){
			var creditCard = {};
			creditCard['cardHolderName']=$('#cardHolderName').val();
			creditCard['cardNumber']=$('#cardNumber').val();
			creditCard['expirationDate']=$('#cardExpiryYear').val()+'-'+$('#cardExpiryMonth').val();
			creditCard['cardCode']=$('#cardCode').val();
			commonPaymentInfoDTO['creditCard']=creditCard;
		}
		if(args!=undefined && args !=''){
			//type=INSTALLMENT-FEE&userId=331&payId=6691&paymentType=nineMonthly
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
		if(eligiblePaymentGateway=='WELLSFARGO'){
			var creditCardDTO = {};
			creditCardDTO['cardHolderName']=$('#cardHolderName').val();
			creditCardDTO['cardNumber']=$('#cardNumber').val();
			creditCardDTO['expirationDate']=$('#cardExpiryYear').val()+'-'+$('#cardExpiryMonth').val();
			creditCardDTO['cardCode']=$('#cardCode').val();
			commonPaymentInfoDTO['creditCard']=creditCardDTO;
		}
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

function callStudentWireTransferPayment(paymentOption, userId, moduleId, callingFrom,paymentByUserId){
	console.log("Module ID is ",moduleId);
	$.ajax({
		type : "POST",
		url : getURLForHTML('common','call-for-wire-transfer-payment'),
		contentType : "application/json",
		data : JSON.stringify(getRequestForStudentWireTransferPayment(paymentOption, userId, moduleId,callingFrom,paymentByUserId)),
		dataType : 'html',
		cache : false,
		timeout : 600000,
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				showMessage(true, data['message']);
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

function getRequestForStudentWireTransferPayment(paymentOption, userId, moduleId,callingFrom,paymentByUserId){
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
		paypalAndWireTransferPaymentInfoDTO['referenceNumber'] = $("#wirePaymentForm #referenceNumber").val();
		paypalAndWireTransferPaymentInfoDTO['uplaodedFileName'] =$("#wirePaymentForm #fileName9").html();
		paypalAndWireTransferPaymentInfoDTO['amountPaid'] =$("#wirePaymentForm #wireTransferAmount").val();
		paypalAndWireTransferPaymentInfoDTO['userPaymentDetailsId'] =$("#wirePaymentForm #userPaymentDetailsId").val();
		paypalAndWireTransferPaymentInfoDTO['paymentTitle'] =$("#wirePaymentForm #paymentTitle").val();
	}
	console.log("Payment data is : "+paypalAndWireTransferPaymentInfoDTO)
	return paypalAndWireTransferPaymentInfoDTO;
}

function callClientCommonPaymentGateway(formId, moduleId,userId,userPaymentDetailsId, termCondi,paymentByUserId ){
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
    			if(termCondi=='booksession'){
    				$("#payTabBookingSessionModal").modal('hide');
    				$("#paymentBookSessionModel").html(htmlContent);
    				$('#callPaymentStudentModal').modal({backdrop: 'static', keyboard: false})
    				$('#payTabModal').modal('hide');
    			}else{
    				setTimeout(function(){$("#paymentMethodModel").html(htmlContent);},1000);
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
	console.log("Payment data is : "+clientCommonPaymentInfoDTO);
	
	return clientCommonPaymentInfoDTO;
	
}

$(document).on("click","#dashboardPayment #chkval", function(){
	if($("#chkval").is(":checked")){
		$("#payTabData").removeAttr("disabled");
	}else{
		$("#payTabData").attr("disabled", true);
	}
});

function continueWorking(){
	$('#logout_modal_logout').modal('hide');
//	setTimeout(function(){ 
//				callDashboardPageStudent('12');
//			},1000);
}
function callStudentTransferSubmit(paymentOption, callingFrom, paymentByUserId){
	console.log("Payment by parent");
	var functionName='';
	var userId=$('#userId').val();
	if(paymentOption==1){
		if($("#wireTransferNumberPaypal").val()=='' || $("#wireTransferNumberPaypal").val()==undefined){
			showMessage(true, "Reference Number is required");
			return false;
		}else{
			functionName="callStudentWireTransferPayment('1', '"+userId+"', 'student','"+callingFrom+"', '"+paymentByUserId+"');"
		}
	}
	if(paymentOption==2){
		if($("#referenceNumber").val()=='' || $("#referenceNumber").val()==undefined){
			showMessage(true, "Reference Number is required");
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