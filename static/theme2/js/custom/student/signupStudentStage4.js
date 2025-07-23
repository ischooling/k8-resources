$(document).ready(function() {
});

$(document).on("click","#signupStage4 #chkval", function(){
	if($("#chkval").is(":checked")){
		$("#payTabData").removeAttr("disabled");
	}else{
		$("#payTabData").attr("disabled", true);
	}
	
});
$(document).on("click","#signupStage4 #chkvalBook", function(){
	if($("#chkvalBook").is(":checked")){
		$("#payTabBookingModal #payTabData").removeAttr("disabled");
	}else{
		$("#payTabBookingModal #payTabData").attr("disabled", true);
	}
	
});

function callSigninStudentPay(formId){
	$('#callPaymentStudentModal').modal({backdrop: 'static', keyboard: false})
	$('#payTabModal').modal('hide');
}
function callStudentTransferSubmit(paymentOption){
	var functionName='';
	var userId=$('#userId').val();
	hideModalMessage('');
	if(paymentOption==1){
		if($("#wireTransferNumberPaypal").val()=='' || $("#wireTransferNumberPaypal").val()==undefined){
			showModalMessage(0, 'Reference Number is required');
			return false;
		}else{
			functionName="callStudentWireTransferPayment('1', '"+userId+"', 'student');"
		}
	}
	if(paymentOption==2){
		if($("#referenceNumber").val()=='' || $("#referenceNumber").val()==undefined){
			showModalMessage(0, 'Reference Number is required');
			return false;
		}else{
			functionName="callStudentWireTransferPayment('2', '"+userId+"','student');"
		}
	}
	$('#proceedStudentPayment').attr("onclick",functionName);
	$('#reference_number').modal('show');
}