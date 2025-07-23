$(document).ready(function() {
	getStudentSignupDetailInReviewStage('signupStage6');
});

$(document).on("click","#chkval", function(){
	if($("#chkval").is(":checked")){
		$("#payTabData").removeAttr("disabled");
	}else{
		$("#payTabData").attr("disabled", true);
	}
});

function previewFillSectionStudent(){
	//Student details
	$('#editStage2FirstName').text($("#signupStage2 #firstName").val());
	$('#editStage2MiddleName').text($('#signupStage2 #middleName').val());
	$('#editStage2LastName').text($('#signupStage2 #lastName').val());
	$('#editStage2Dob').text($('#signupStage2 #dob').val());
	$('#editStage2Country').text($('#signupStage2 #countryId option:selected').text());
	$('#editStage2State').text($('#signupStage2 #stateId option:selected').text());
	$('#editStage2City').text($('#signupStage2 #cityId option:selected').text());
	$('#editStage2Gender').text($('#signupStage2 #gender option:selected').text());
	$('#editStage2Email').text($('#signupStage2 #communicationEmail').val());
	$('#editStage2Phoneno').text($('#signupStage2 #countryCodeStudent option:selected' ).text().split(" ")[0] + " "+$('#signupStage2 #contactNumber').val());
	if($('#signupStage2 #contactNumberAlternate').val()!=undefined && $('#signupStage2 #contactNumberAlternate').val()!=''){
		$('#editStage2AltPhoneno').text($('#signupStage2 #countryCodeAlternate option:selected' ).text().split(" ")[0] + " "+ $('#signupStage2 #contactNumberAlternate').val());
	}else{
		$('#editStage2AltPhoneno').text('NA');
	}
	$('#editStage2LearningCenter').text($('#signupStage2 #studyCenter option:selected').text());
	
}

function previewFillSectionPreviousQualification(){
	$('#editStage3RelationStudent').text($('#signupStage3 #highestQualification option:selected').text());
	$('#editStage3FirstName').text($("#signupStage3 #nameOfSchool").val());
	$('#editStage3Email').text($('#signupStage3 #studyCourses').val());
	$('#editStage3Gender').text($('#signupStage3 #finalMarksGpa').val());
	$('#editStage3PhoneNo').text($('#signupStage3 #graduationMonth option:selected').text()+'/'+$('#signupStage3 #graduationYear  option:selected').text());
	
}

function previewFillSectionCourse(){
	
	if($('#standardId').val()==9){
		$('#editStage5Standard').text('Middle School');
	}else if($('#standardId').val()==10){
		$('#editStage5Standard').text('High School');
	}
	
	var radioId='dtl-one';
	var data = $("#"+radioId+" #originalStage5Data").text().split('|')
	console.log(data);
	
	var i=1;
	var totalCredit=0;
	var totalCost=0;
	$('#selectedSubjectsList').html('<tr style="color:#fff;"><th>Subject Name</th><th>Credit</th></tr>');
	$(".prefilleDetails").each(function(){
		var values = $(this).attr('prefilleDetails').split('~');
		var subjectName = values[0];
		var subjectCredit = values[1];
		var subjectFee = values[2];
		totalCredit += parseFloat(subjectCredit);
		totalCost += parseFloat(subjectFee);
		i++;
		$('#selectedSubjectsList').append('<tr><td>'+subjectName+'</td> <td>'+parseFloat(subjectCredit).toFixed(1)+'</td>  </tr>');
    });
	$('#selectedSubjectsList').append('<tr><td><strong>Total</strong></td> <td><strong>'+parseFloat(totalCredit).toFixed(1)+'</strong></td> </tr>');
	if(data[0].length>1){
		$('#editStage5CourseFee').text(data[0].trim());
		$('.editStage5Registration').text(data[1].trim());
		if(data[2].trim()=='$0.00'){
			$('.editStage5DiscountEligible').hide();
		}else{
			$('.editStage5DiscountEligible').show();
		}
		$('#editStage5ScholarShipFee').text(data[2].trim());
		if(data[6].trim()=='percent'){
			$('#editStage5ScholarShipFeeValue').html(data[3].trim()+'%');
		}else{
			$('#editStage5ScholarShipFeeValue').html('$'+data[3].trim());
		}
		$('.grossFeeAfterRegistrationString').text(data[5].trim());
		
		if(radioId=='dtl-one'){
			$('#paypalAmount').val(data[5].trim());
			var wireTransferAmount = data[5].replace('$','');
			wireTransferAmount = wireTransferAmount.replace('.00','');
			wireTransferAmount = wireTransferAmount.replace(',','');
			wireTransferAmount = parseFloat(wireTransferAmount)+parseFloat('35.00');
			$('#wireTransferAmount').val('$'+wireTransferAmount.toFixed(2));
		}else{
			$('#paypalAmount').val(data[5].trim());
			var wireTransferAmount = data[5].replace('$','');
			wireTransferAmount = wireTransferAmount.replace('.00','');
			wireTransferAmount = wireTransferAmount.replace(',','');
			wireTransferAmount = parseFloat(wireTransferAmount)+parseFloat('35.00');
			$('#wireTransferAmount').val('$'+wireTransferAmount.toFixed(2));
		}
	}
}

function getStudentSignupDetailInReviewStage() {
	previewFillSectionStudent();
	previewFillSectionPreviousQualification();
	previewFillSectionCourse();
}
function callSigninStudentPay(formId){
	$('#callPaymentStudentModal').modal({backdrop: 'static', keyboard: false})
	$('#payTabModal').modal('hide');
}
function callStudentTransferSubmit(paymentOption){
	var functionName='';
	var userId=$('#userId').val();
	if(paymentOption==1){
		if($("#wireTransferNumberPaypal").val()=='' || $("#wireTransferNumberPaypal").val()==undefined){
			showMessage(true, 'Reference Number is required');
			return false;
		}else{
			functionName="callStudentWireTransferPayment('1', '"+userId+"', 'student');"
		}
	}
	if(paymentOption==2){
		if($("#referenceNumber").val()=='' || $("#referenceNumber").val()==undefined){
			showMessage(true, 'Reference Number is required');
			return false;
		}else{
			functionName="callStudentWireTransferPayment('2', '"+userId+"','student');"
		}
	}
	$('#proceedStudentPayment').attr("onclick",functionName);
	$('#reference_number').modal('show');
}