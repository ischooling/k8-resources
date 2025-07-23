$(document).ready(function() {
	getStudentSignupDetailInReviewStage('signupStage6');
});

$(document).on("click","#signupStage6 #chkval", function(){
	if($("#chkval").is(":checked")){
		$("#payTabData").removeAttr("disabled");
	}else{
		$("#payTabData").attr("disabled", true);
	}

});
$(document).on("click","#signupStage6 #chkvalBook", function(){
	if($("#chkvalBook").is(":checked")){
		$("#payTabBookingModal #payTabData").removeAttr("disabled");
	}else{
		$("#payTabBookingModal #payTabData").attr("disabled", true);
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
function previewFillSectionParent(){
	//Parent / Guardian Details
	if($('#signupStage3 #relationship').val()=='Other'){
		$('#editStage3RelationStudent').text($('#signupStage3 #otherName').val());
	}else{
		$('#editStage3RelationStudent').text($('#signupStage3 #relationship option:selected').text());
	}

	$('#editStage3FirstName').text($("#signupStage3 #firstName").val());
	$('#editStage3MiddleName').text($('#signupStage3 #middleName').val());
	$('#editStage3LastName').text($('#signupStage3 #lastName').val());
	if($('#signupStage3 #parentEmail').val()!='' && $('#signupStage3 #parentEmail').val()!=undefined){
		$('#editStage3Email').text($('#signupStage3 #parentEmail').val());
	}else{
		$('#editStage3Email').text('NA');
	}
	//$('#signupStage2 #countryCode').val($('option:selected', $('#signupStage2 #countryId')).attr('dailCode'));
	$('#editStage3PhoneNo').text($('#signupStage3 #countryCodeParent option:selected' ).text().split(" ")[0] + " "+$('#signupStage3 #contactNumber').val());
	if($('#signupStage3 #contactNumberAlternate').val()!=undefined && $('#signupStage3 #contactNumberAlternate').val()!=''){
		$('#editStage3AltPhoneNo').text($('#signupStage3 #countryCodeAlternateParent option:selected' ).text().split(" ")[0] + " "+$('#signupStage3 #contactNumberAlternate').val());
	}else{
		$('#editStage3AltPhoneNo').text('NA');
	}

	$('#editStage3Gender').text($('#signupStage3 #gender option:selected').text());
	if($('#signupStage3 #skipParent').is(':checked')){
		$('#editStage3ParentDeclaration').text('Yes');
	}else{
		$('#editStage3ParentDeclaration').text('No');
	}

	$('#editStage3Responsible').text($('#signupStage3 #responsibleConfirm').val());
}
function previewFillSectionAddress(){
	//Address Details
	$('#editStage4ResidentialAddressAddress1').text($('#signupStage4 #residentialAddressAddress1').val()
			+', '
			+ $("#signupStage4 #residentialAddressAddress2").val()
			+', '
			+$('#signupStage4 #residentialAddressCityId option:selected').text()+', '+$('#signupStage4 #residentialAddressStateId option:selected').text()+', '+$('#signupStage4 #residentialAddressCountryId option:selected').text());
	//$('#editStage4ResidentialAddressAddress2').text($("#signupStage4 #residentialAddressAddress2").val());
	$('#editStage4ResidentialAddressPincode').text($('#signupStage4 #residentialAddressPincode').val());
	if ($('#signupStage4 #sameAddress').is(":checked")){
		$('#editStage4SameAsAbove').text("Y");
	}else{
		$('#editStage4SameAsAbove').text("N");
	}
	$('#editStage4MailingAddressAddress1').text($('#signupStage4 #mailingAddressAddress1').val()+', '
			+ $('#signupStage4 #mailingAddressAddress2').val()
			+ ', '
			+$('#signupStage4 #mailingAddressCityId option:selected').text()+', '+$('#signupStage4 #mailingAddressStateId option:selected').text()+', '+$('#signupStage4 #mailingAddressCountryId option:selected').text());
	//$('#editStage4MailingAddressAddress2').text($('#signupStage4 #mailingAddressAddress2').val());
	$('#editStage4MailingAddressPincode').text($('#signupStage4 #mailingAddressPincode').val());
}
function previewFillSectionCourse(){
	console.log("previewFillSectionCourse");
	var radioId='';
	if($('#pay-one').is(':checked')){
		radioId = 'dtl-one';
	}else if($('#pay-two').is(':checked')){
		radioId = 'dtl-two';
	}else if($('#pay-three').is(':checked')){
		radioId = 'dtl-three';
	}else if($('#pay-four').is(':checked')){
		radioId = 'dtl-four';
	}else if($('#pay-five').is(':checked')){
		radioId = 'dtl-five';
	}
	if(radioId==''){
		return false;
	}
	var data = $("#"+radioId+" #originalStage5Data").text().split('|')
	console.log(data);
	if($('#signupStage5 #standardId5').val()>=11 && $('#signupStage5 #standardId5').val()<=17){
		var basePath=$('#selectedSubjectsList').attr('src').split('standard')[0];
		$('#selectedSubjectsList').attr('src',basePath+'standard'+$('#signupStage5 #standardId5').val()+'preview.jpg');
	}else{
		$('#editStage5Standard').text($('#signupStage5 #standardId5 option:selected').text());
		var i=1;
		var totalCredit=0;
		var totalCost=0;
		$('#selectedSubjectsList').html('<tr style="color:#fff;"><th>Subject Name</th><th>Credit</th><th>Fee </th></tr>');
		for(var currentId=1;currentId<=7;currentId++){
			$("#select-sub-credit-recovery"+currentId +" li").each(function(){
				if($(this).find('label').hasClass('active')){
					var subjectName = $(this).find('label').attr('subjectName');
					var subjectCredit = $(this).find('label').attr('credit');
					var subjectFee = $(this).find('label').attr('subjectfee');
					$('#selectedSubjectsList').append('<tr><td>'+subjectName+'</td> <td>'+parseFloat(subjectCredit).toFixed(1)+'</td> <td>$ '+parseFloat(subjectFee).toFixed(2)+'</td> </tr>');
					totalCredit += parseFloat(subjectCredit);
					totalCost += parseFloat(subjectFee);
					i++;
				}
			});
		}
		for(var currentId=1;currentId<=7;currentId++){
			$("#select-sub-regular"+currentId +" li").each(function(){
				if($(this).find('label').hasClass('active')){
					var subjectName = $(this).find('label').attr('subjectName');
					var subjectCredit = $(this).find('label').attr('credit');
					var subjectFee = $(this).find('label').attr('subjectfee');
					$('#selectedSubjectsList').append('<tr><td>'+subjectName+'</td> <td>'+parseFloat(subjectCredit).toFixed(1)+'</td> <td>$ '+parseFloat(subjectFee).toFixed(2)+'</td> </tr>');
					totalCredit += parseFloat(subjectCredit);
					totalCost += parseFloat(subjectFee);
					i++;
				}
			});
		}
		for(var currentId=1;currentId<=7;currentId++){
			$("#select-sub-placement"+currentId +" li").each(function(){
				if($(this).find('label').hasClass('active')){
					var subjectName = $(this).find('label').attr('subjectName');
					var subjectCredit = $(this).find('label').attr('credit');
					var subjectFee = $(this).find('label').attr('subjectfee');
					$('#selectedSubjectsList').append('<tr><td>'+subjectName+'</td> <td>'+parseFloat(subjectCredit).toFixed(1)+'</td> <td>$ '+parseFloat(subjectFee).toFixed(2)+'</td> </tr>');
					totalCredit += parseFloat(subjectCredit);
					totalCost += parseFloat(subjectFee);
					i++;
				}
			});
		}

		//add logic for cte courses
		$("#course-list-wrapper-CTE li").each(function(){
			console.log("lidi=>", $(this).attr('class'));
			var liId = $(this).attr('class');
			if ($("#subject-id-"+liId).attr('class') == 'selected-course') {
				var subjectName = $("#subject-id-"+liId).attr('subjectName');
				var subjectCredit = $("#subject-id-"+liId).attr('subjectCredit');
				var subjectFee = $("#subject-id-"+liId).attr('subjectfee');
				$('#selectedSubjectsList').append('<tr><td>'+subjectName+'</td> <td>'+parseFloat(subjectCredit).toFixed(1)+'</td> <td>$ '+parseFloat(subjectFee).toFixed(2)+'</td> </tr>');
				totalCredit += parseFloat(subjectCredit);
				totalCost += parseFloat(subjectFee);
				i++;
			}
		});
		$('#selectedSubjectsList').append('<tr><td><strong>Total</strong></td> <td><strong>'+parseFloat(totalCredit).toFixed(1)+'</strong></td> <td><strong>$ '+Math.round(parseFloat(totalCost)).toFixed(2)+'</strong></td> </tr>');
	}

	$('#editStage5PaymentMethod').text(data[0].trim());
	$('.editStage5NoOfInstallment').text(data[1].trim());
	$('#editStage5CourseFee').text(data[2].trim());

	if(data[2].trim()=='$0.00'){
		$("#regPaymentType").val('booking');
		$('.editStage5CourseFeeEligible').hide();
	}else{
		$("#regPaymentType").val('');
		$('.editStage5CourseFeeEligible').show();
	}
	$('#editStage5ScholarShipFee').text(data[3].trim());
	if(data[17].trim()=='percent'){
		$('#editStage5ScholarShipFeeValue').html(data[15].trim()+'%');
	}else{
		$('#editStage5ScholarShipFeeValue').html('$'+data[15].trim());
	}

	if(data[3].trim() =='$0.00'){
		if($('#signupStage5 #standardId5').val()>=11 && $('#signupStage5 #standardId5').val()<=17 && data[0].trim()=='One Time Payment Plan'){
			$('.editStage5DiscountEligible').show();
			$('#hideIfScholarshipZero').hide();

		}else{
			$('.editStage5DiscountEligible').hide();
		}

	}else{
		$('.editStage5DiscountEligible').show();
	}

	$('.editStage5CourseFeeAfterScholarship').text(data[4].trim());
	if($('#signupStage5 #standardId5').val()>=11 && $('#signupStage5 #standardId5').val()<=17){
		$('.editStage5AmountPayable').text(data[13].trim());
	}else{
		$('.editStage5AmountPayable').text(data[16].trim());
	}

	$('#editStage5RemainingAmount').text(data[6].trim());
	$('#editStage5InterestAmount').text(data[8].trim());
	$('.editStage5TotalCourseFee').text(data[9].trim());
	$('.editStage5InstallmentFee').text(data[10].trim());
	$('#editStage5QuartlyFee').text($("#"+radioId+" #originalStage5DiscountByPaymentMode").text().trim());
	$('.editStage5Registration').text(data[11].trim());
	if(data[11].trim()=='$0.00'){
		$('.editStage5RegistrationEligible').hide();
		$('#registerPayEnabled').hide();
	}else{
		$('.editStage5RegistrationEligible').show();
		$('#registerPayEnabled').show();
	}
	$('.editStage5GrossFee').text(data[12].trim());
	$('.grossFeeAfterRegistrationString').text(data[13].trim());

	if(radioId=='dtl-one'){
		$('#paypalAmount').val(data[13].trim());
		var wireTransferAmount = data[13].replace('$','');
		wireTransferAmount = wireTransferAmount.replace('.00','');
		wireTransferAmount = wireTransferAmount.replace(',','');
		wireTransferAmount = parseFloat(wireTransferAmount)+parseFloat('35.00');
		$('#wireTransferAmount').val('$'+wireTransferAmount.toFixed(2));
	}else{
		if($('#signupStage5 #standardId5').val()>=11 && $('#signupStage5 #standardId5').val()<=17){
			$('#paypalAmount').val(data[13].trim());
			var wireTransferAmount = data[13].replace('$','');
			wireTransferAmount = wireTransferAmount.replace('.00','');
			wireTransferAmount = wireTransferAmount.replace(',','');
			wireTransferAmount = parseFloat(wireTransferAmount)+parseFloat('35.00');
			$('#wireTransferAmount').val('$'+wireTransferAmount.toFixed(2));
		}else{
			$('#paypalAmount').val(data[16].trim());
			var wireTransferAmount = data[16].replace('$','');
			wireTransferAmount = wireTransferAmount.replace('.00','');
			wireTransferAmount = wireTransferAmount.replace(',','');
			wireTransferAmount = parseFloat(wireTransferAmount)+parseFloat('35.00');
			$('#wireTransferAmount').val('$'+wireTransferAmount.toFixed(2));
		}

	}

	if(data[1].trim()=='1'){
		$('.editStage5AnnualPayment').show();
		$('.editStage5InstallmentPayment').hide();
	}else if(data[1].trim()=='3'){
		$('.editStage5AnnualPayment').hide();
		$('.editStage5InstallmentPayment').show();
	}else if(data[1].trim()=='6'){
		$('.editStage5AnnualPayment').hide();
		$('.editStage5InstallmentPayment').show();
	}else if(data[1].trim()=='9'){
		$('.editStage5AnnualPayment').hide();
		$('.editStage5InstallmentPayment').show();
	}

}

function getStudentSignupDetailInReviewStage() {
	previewFillSectionStudent();
	previewFillSectionParent();
	previewFillSectionAddress();
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