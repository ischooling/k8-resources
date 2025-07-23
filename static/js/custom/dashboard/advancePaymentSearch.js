function advancePaymentSearchStudent(formId, moduleId) {
	var dateFrom=$("#"+formId+" #paymentDateFrom").val();
	var dateTo =$("#"+formId+" #paymentDateTo").val();
	hideMessage('');
	if(dateFrom !="" && dateFrom!=undefined){
		if(dateTo=="" || dateTo==undefined){
			showMessage(true,"Payment Date To field is mandatory if you choose a date from Payment Date From field.");
			return false;
		}
	}
	if(dateTo !="" && dateTo!=undefined){
		if(dateFrom=="" || dateFrom==undefined){
			showMessage(true,"Payment Date From field is mandatory if you choose a date from Payment Date To field.");
			return false;
		}
	}
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForHTML('dashboard','advance-payment-search-content'),
		data : JSON.stringify(getCallRequestForAdvancePaymentSearchStudent(formId, moduleId)),
		dataType : 'html',
		async:false,
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
        			//$('#'+formId)[0].reset();
    				$('#advSerch').modal('hide');
    				$('#advance-serach-content').html(htmlContent);
        		}
        		return false;
			}
		}
	});
}

function getCallRequestForAdvancePaymentSearchStudent(formId, moduleId){
	var requestPaymentSearch = {};
	var authentication = {};
	var advancePaymentSearchDTO = {};
	advancePaymentSearchDTO['moduleId'] = moduleId;
	advancePaymentSearchDTO['paymentType'] = $("#"+formId+" #paymentType").select2('val');
	advancePaymentSearchDTO['paymentVia'] = $("#"+formId+" #paymentVia").select2('val');
	if($("#"+formId+" #paymentGateway").select2('val')!='BLANK'){
		advancePaymentSearchDTO['paymentGateway']=$("#"+formId+" #paymentGateway").select2('val');
	}
	advancePaymentSearchDTO['gradeId'] = $("#"+formId+" #gradeId").select2('val');
	advancePaymentSearchDTO['studentName'] = $("#"+formId+" #studentName").val().trim();
	advancePaymentSearchDTO['studentEmail'] = $("#"+formId+" #studentEmail").val().trim();
	advancePaymentSearchDTO['countryId'] = $("#"+formId+" #countryId").select2('val');
	advancePaymentSearchDTO['paymentMode'] = $("#"+formId+" #paymentMode").select2('val');
	//advancePaymentSearchDTO['paymentTitle'] = $("#"+formId+" #paymentTitle").val().trim();
	advancePaymentSearchDTO['transactionRefNumber'] = $("#"+formId+" #transactionRefNumber").val().trim();
	advancePaymentSearchDTO['userRefNumber'] = $("#"+formId+" #userRefNumber").val().trim();
	advancePaymentSearchDTO['phoneNo'] = $("#"+formId+" #userPhoneNumber").val().trim();
	advancePaymentSearchDTO['paymentStatus'] = $("#"+formId+" #paymentStatus").select2('val');
	advancePaymentSearchDTO['paymentDateFrom'] = $("#"+formId+" #paymentDateFrom").val().trim();
	advancePaymentSearchDTO['paymentDateTo'] = $("#"+formId+" #paymentDateTo").val().trim();
	advancePaymentSearchDTO['minAmount'] = $("#"+formId+" #minAmount").val().trim();
	advancePaymentSearchDTO['maxAmount'] = $("#"+formId+" #maxAmount").val().trim();
	advancePaymentSearchDTO['sortBy'] = $("#"+formId+" #sortBy").select2('val');
	advancePaymentSearchDTO['orderBy'] = $("#"+formId+" #orderBy").select2('val');

	advancePaymentSearchDTO['startPosition'] = $("#"+formId+" #startPosition").val().trim();
	advancePaymentSearchDTO['numberOfRecords'] = $("#"+formId+" #numberOfRecords").val().trim();

	advancePaymentSearchDTO['schoolId'] = $("#"+formId+" #schoolId").select2('val');
	advancePaymentSearchDTO['schoolUUID'] = SCHOOL_UUID;

	requestPaymentSearch['advancePaymentSearchDTO'] = advancePaymentSearchDTO;
	authentication['hash'] = getHash();authentication['schoolId'] = SCHOOL_ID;authentication['schoolUUID'] = SCHOOL_UUID;
	authentication['userType'] = "SCHOOL";
	authentication['schoolId'] = SCHOOL_ID;
	authentication['schoolUUID'] = SCHOOL_UUID;
	requestPaymentSearch['authentication'] = authentication;

	return requestPaymentSearch;

}

function advancePaymentSearchStudentReset(formId){
	$("#"+formId+" #schoolId").val(SCHOOL_ID).trigger('change');
	$("#"+formId+" #paymentType").val('').trigger('change');
	$("#"+formId+" #paymentVia").val('').trigger('change');
	$("#"+formId+" #paymentGateway").val('BLANK').trigger('change');
	$("#"+formId+" #gradeId").val('').trigger('change');
	$("#"+formId+" #studentName").val('');
	$("#"+formId+" #studentEmail").val('');
	$("#"+formId+" #countryId").val('').trigger('change');
	$("#"+formId+" #paymentMode").val('').trigger('change');
//	$("#"+formId+" #paymentTitle").val('');
	$("#"+formId+" #transactionRefNumber").val('');
	$("#"+formId+" #userRefNumber").val('');
	$("#"+formId+" #paymentStatus").val('').trigger('change');
	$("#"+formId+" #paymentDateFrom").val('');
	$("#"+formId+" #paymentDateTo").val('');
	$("#"+formId+" #sortBy").val('DESC').trigger('change');
	$("#"+formId+" #orderBy").val('PAY_DATE').trigger('change');
	$("#"+formId+" #userPhoneNumber").val('');
	$("#"+formId+" #minAmount").val('');
	$("#"+formId+" #maxAmount").val('');



	$("#"+formId+" #startPosition").val('0');
	$("#"+formId+" #numberOfRecords").val('25');
}

function searchStudentByNameAndEmail(sName,sEmail,schoolId){
	var searchName=sName;
	var searchEmail=sEmail;
	hideMessage('');
	$.ajax({
		type : "GET",
		url : getURLForHTML('dashboard','search-student'),
		data : "name="+searchName+'&email='+searchEmail+'&schoolId='+schoolId,
		dataType : 'html',
		async : false,
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
    				$('#paymentTableSearch').modal('hide');
    				$('#advance-serach-content').html(htmlContent);
        		}
        		return false;
			}
		}
	});
}

function addPayment(userId,standardId,studentId,studentStandardId){
	hideMessage('');
	$('#userIdSearch').val(userId);
	$('#standardIdSearch').val(standardId);
	$('#studentIdSearch').val(studentId);
	$('#studentStandardId').val(studentStandardId);
	$('#addPaymentModal').modal('show');
}

function addStudentPayment(formId, moduleId){
	var paymentTitle=$("#"+formId+" #paymentType1").val();
	var paymentName=$("#"+formId+" #paymentName1").val();
	//var userRefNumber =$("#"+formId+" #userRefNumber1").val();
	var payableAmount =$("#"+formId+" #payableAmount").val();
	var currency1 =$("#"+formId+" #currency1").val();
	var paymentDate =$("#"+formId+" #paymentDate1").val();
	var scheduleDate =$("#"+formId+" #scheduleDate1").val();
	var status =$("#"+formId+" #status1").val();
	//var transactionNumber =$("#"+formId+" #transactionNumber").val();
	var regAmount =$("#"+formId+" #registrationAmount").val();


	if(paymentTitle =="" || paymentTitle == undefined){
		showMessage(true,"Payment title is mandatory.");
		return false;
	}
	if(paymentTitle=='SUBJECT_FEE_ADV' || paymentTitle=='SUBJECT_FEE'){
		if(paymentName == undefined || paymentName ==""){
			showMessage(true,"Installment number is mandatory.");
			return false;
		}
	}
	/*if(userRefNumber  == "" || userRefNumber == undefined){
		showMessage(true,"Enter user reference number");
		return false;
	}*/
	if(payableAmount==0){
		showMessage(true,"Payable fee can not be zero.");
		return false;
	}
	if(paymentTitle =="REGISTRATION_FEE"){
		if(regAmount==0){
			showMessage(true,"Registration fee is a mandatory field!");
			return false;
		}
	}
	if(currency1 =="0" || currency1 =="" || currency1 == undefined){
		showMessage(true,"Choose the currency in which the payment is being done.");
		return false;
	}
	if(status=="SUCCESS"){
		if(paymentDate =="" || paymentDate == undefined){
			showMessage(true,"Payment date is a mandatory field.");
			return false;
		}
	}
	if(status=="SCHEDULED"){
		if(scheduleDate =="" || scheduleDate == undefined){
			showMessage(true,"Please enter the scheduled payment date.");
			return false;
		}
	}
	
	if(status =="0" || status =="" || status == undefined){
		showMessage(true,"Please select the payment status.");
		return false;
	}
	/*if((transactionNumber=="" || transactionNumber == undefined) && status!='SCHEDULED'){
		showMessage(true,"Please enter the transaction number.");
		return false;
	}*/
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForHTML('dashboard','save-payment'),
		data :JSON.stringify(getRequestDataForAddPaymentDetails(formId, moduleId)),

		dataType : 'html',
		async:false,
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
					showMessage(true, stringMessage[1]);
					$('#addPaymentModal').modal('hide');
				}
				return false;
			}
		}
	});

}

function getRequestDataForAddPaymentDetails(formId, moduleId){
	var request = {};
	var authentication = {};
	var addPaymentDTO = {};
	var requestData ={};
	addPaymentDTO['userId'] = $("#"+formId+" #userIdSearch").val().trim();
	addPaymentDTO['standardId'] = $("#"+formId+" #standardIdSearch").val().trim();
	addPaymentDTO['studentId'] = $("#"+formId+" #studentIdSearch").val().trim();
	addPaymentDTO['studentStandardId'] = $("#"+formId+" #studentStandardId").val().trim();
	addPaymentDTO['paymentTitle'] = $("#"+formId+" #paymentType1").select2('val');
	addPaymentDTO['paymentName'] = $("#"+formId+" #paymentName1").select2('val');
	addPaymentDTO['referenceNumber'] = $("#"+formId+" #userRefNumber1").val().trim();
	addPaymentDTO['payableAmount'] = $("#"+formId+" #payableAmount").val().trim();
	addPaymentDTO['registrationAmount'] = $("#"+formId+" #registrationAmount").val().trim();
	addPaymentDTO['additionalAmount'] = $("#"+formId+" #additionalAmount").val().trim();
	addPaymentDTO['currency'] = $("#"+formId+" #currency1").select2('val');
	addPaymentDTO['paymentGateway'] = $("#"+formId+" #paymentGateway1").select2('val');
	addPaymentDTO['status'] = $("#"+formId+" #status1").select2('val');
	addPaymentDTO['paymentDate'] = $("#"+formId+" #paymentDate1").val().trim();
	addPaymentDTO['scheduleDate'] = $("#"+formId+" #scheduleDate1").val().trim();
	addPaymentDTO['transactionNumber'] = $("#"+formId+" #transactionNumber").val().trim();
	requestData['addPaymentDTO'] = addPaymentDTO;
	request['requestData'] = requestData;
	authentication['hash'] = getHash();
	authentication['schoolId'] = SCHOOL_ID;
	authentication['schoolUUID'] = SCHOOL_UUID;
	request['authentication'] = authentication;
	return request;
}