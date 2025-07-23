$(document).ready(function() {
	restrictKeyEnter('scholarshipCodeInside');
});
function showGuideLines(){
	/*var standard =$("#standardId5").val();
	console.log("standard"+standard);
	if(standard==1 || standard==2 ||standard==3 ){
		$('#guide-like-heading-high-1').hide();
		$('#guide-like-content-high-1').hide();
		$('#guide-like-heading-middle').show();
		$('#guide-like-content-middle').show();
	}else{
		$('#guide-like-heading-high-1').show();
		$('#guide-like-content-high-1').show();
		$('#guide-like-heading-middle').hide();
		$('#guide-like-content-middle').hide();
	}*/
	$('#guidelinesNew').modal('show');

}
function calculateCredit(currentId){
    var totalCredit=0;
   console.log("inside");
    $("#select-sub-regular"+currentId +" li").each(function(){
        if($(this).find('label').hasClass('active')){
            totalCredit+=parseFloat($(this).find('label').attr('credit'));
        }
    });
    console.log('totalCredit: calculateCredit: '+totalCredit);
    return totalCredit;
}
function calculatePlacementCredit(currentId){
    var totalCredit=0;
    $("#select-sub-placement"+currentId +" li").each(function(){
        if($(this).find('label').hasClass('active')){
            totalCredit+=parseFloat($(this).find('label').attr('credit'));
        }
    });
    console.log('totalCredit: calculatePlacementCredit :'+totalCredit);
    return totalCredit;
}
function calculateRecoveryCourseCredit(currentId){
    var totalCredit=0;
    $("#select-sub-credit-recovery"+currentId +" li").each(function(){
    	console.log('active :: '+$(this).find('label').hasClass('active'));
        if($(this).find('label').hasClass('active')){
            totalCredit += parseFloat($(this).find('label').attr('credit'));
        }
    });
    console.log('totalCredit: calculateRecoveryCourseCredit : '+totalCredit);
    return totalCredit;
}

function calculateCRCreditOfASubject(currentId,parentSubjectId){
    var totalCredit=0;
    var parent=$('#parentSubjectIdCredit').val().split(',');
    $("#select-sub-credit-recovery"+currentId +" li").each(function(){
    	console.log('active :: '+$(this).find('label').hasClass('active'));
        if($(this).find('label').hasClass('active')){
        console.log("parent  ",parent);
        console.log("parent Subject ID ",parentSubjectId);
        console.log("Array ",$.inArray(parentSubjectId,parent));
        var currentParentSubjectId = $(this).find('label').attr('parentSubjectId');
    	console.log('Array :: '+$.inArray(parentSubjectId,parent));
    	if(parentSubjectId==currentParentSubjectId){
        if($.inArray(parentSubjectId,parent)>=0 ){
        			totalCredit += parseFloat($(this).find('label').attr('credit'));
        			console.log('totalCredit: calculateRecoveryCourseCreditOfASubject : '+totalCredit);
        		}
    	   }
        }
    });

    return totalCredit;
}
function calculateFTCreditOfASubject(currentId,parentSubjectId){
	var totalCredit=0.0;
    var parent=$('#parentSubjectIdRegural').val().split(',');
    console.log('parent '+parent);
    $("#select-sub-regular"+currentId +" li").each(function(){
    	console.log('active :: '+$(this).find('label').hasClass('active'));
        if($(this).find('label').hasClass('active')){
        	var currentParentSubjectId = $(this).find('label').attr('parentSubjectId');
        	console.log('Array :: '+$.inArray(parentSubjectId,parent));
        	if(parentSubjectId==currentParentSubjectId){
        		if($.inArray(parentSubjectId,parent)>=0 ){
        			totalCredit +=parseFloat($(this).find('label').attr('credit'));
        			console.log('totalCredit Full Time  : '+totalCredit);
        		}
        	}
        }

    });
    console.log('totalCredit: calculateRecoveryCourseCreditOfASubject : '+totalCredit);
    return totalCredit;
}

function getSelectedSubjects(){
	var selectedSubjects='';
	var creditCount=0.0;
	var parentSubjectId='';

    for(var currentId=1;currentId<=7;currentId++){
    	$("#select-sub-regular"+currentId +" li").each(function(){
            if($(this).find('label').hasClass('active')){
                selectedSubjects+=$(this).find('label').attr('subjectId')+",";
                creditCount += parseFloat($(this).find('label').attr('credit'));
                parentSubjectId+=$(this).find('label').attr('parentSubjectId')+",";
            }
        });
    }
    parentSubjectId = parentSubjectId.substring(0, parentSubjectId.length-1);
    $("#parentSubjectIdRegural").val(parentSubjectId);
    parentSubjectId='';
    $("#creditCountRegular").val(creditCount);
    creditCount=0.0;
    for(var currentId=1;currentId<=7;currentId++){
    	$("#select-sub-credit-recovery"+currentId +" li").each(function(){
            if($(this).find('label').hasClass('active')){
                selectedSubjects+=$(this).find('label').attr('subjectId')+",";
                creditCount += parseFloat($(this).find('label').attr('credit'));
                parentSubjectId+=$(this).find('label').attr('parentSubjectId')+",";
            }
        });
    }
    parentSubjectId = parentSubjectId.substring(0, parentSubjectId.length-1);
    $("#parentSubjectIdCredit").val(parentSubjectId);
    parentSubjectId='';
    $("#creditCountCredit").val(creditCount);
    creditCount=0.0;
    for(var currentId=1;currentId<=7;currentId++){
    	$("#select-sub-placement"+currentId +" li").each(function(){
            if($(this).find('label').hasClass('active')){
                selectedSubjects+=$(this).find('label').attr('subjectId')+",";
                creditCount += parseFloat($(this).find('label').attr('credit'));
            }
        });
    }
    $("#creditCountAdvance").val(creditCount);
    creditCount=0.0;
	$("#course-list-wrapper-CTE li a").each(function(){
		if ($(this).attr('class') == 'selected-course') {
			selectedSubjects+=$(this).attr('courseId')+',';
			creditCount = parseFloat(creditCount)+ parseFloat($(this).attr('subjectCredit'));
		}
    });
	$("#creditCountCTE").val(creditCount);
	selectedSubjects = selectedSubjects.substring(0,selectedSubjects.length-1);
	$("#selectedSubjects").val(selectedSubjects);
    console.log('total getSelectedSubjects: '+selectedSubjects+' creditCount : '+creditCount+' parentSubjectId : '+parentSubjectId);
    return selectedSubjects;
}

function isValidClickForPlacement(currentId){
    var status = true;
    $('#sub-box'+currentId).html('');
    var isSelectLabelBlank=true;
    var showHint=false;
    $("#select-sub-regular"+currentId +" li").each(function(){
        if($(this).find('label').hasClass('active')){
           $('#sub-box'+currentId).append('<p id="selected'+$(this).find('label').attr('id')+'">'+$(this).text() +' <a href="javascript:void(0);" onclick="return removePlacementSelectedSubject(\'selected'+$(this).find('label').attr('id')+'\');">X</a></p>');
           isSelectLabelBlank=false;
        }
        var subjectHint=$(this).find('label').attr('subjectHint');
		//console.log('checkbox class:: '+$(this).find('label').attr('class'));
    	if(subjectHint!=undefined && subjectHint==1 && $(this).find('label').hasClass('active')){ //showing hint for opted subject
    		showHint=true;
    	}
    });
    if(showHint && calculatePlacementCredit(currentId)<1){
    	$('#hintMsg'+currentId).text('We assume that you have already completed the first part of selected course in this section');
    }else{
    	$('#hintMsg'+currentId).text('');
    }
    if(isSelectLabelBlank){
    	$('#sub-box'+currentId).append('<p>Select Course</p>');
    }
    return status;
}
function isValidClickForRecovery(currentId){
    var status = true;
    $('#sub-box2'+currentId).html('');
    var isSelectLabelBlank=true;
    var showHint=false;
    $("#select-sub-credit-recovery"+currentId +" li").each(function(){
        if($(this).find('label').hasClass('active')){
           $('#sub-box2'+currentId).append('<p id="selected'+$(this).find('label').attr('id')+'">'+$(this).text() +' <a href="javascript:void(0);" onclick="return removeRecoverySelectedSubject(\'selected'+$(this).find('label').attr('id')+'\');">X</a></p>');
           isSelectLabelBlank=false;
        }
        var subjectHint=$(this).find('label').attr('CrsubjectHint');
    	if(subjectHint!=undefined && subjectHint==1 && $(this).find('label').hasClass('active')){ //showing hint for opted subject
    		showHint=true;
    	}
    });
    if(isSelectLabelBlank){
    	$('#sub-box2'+currentId).append('<p>Select Course</p>');
    }
    return status;
}
function isValidClick(currentId){
    var status = true;
    $('#sub-box'+currentId).html('');
    var isSelectLabelBlank=true;
    var showHint=false;
    $("#select-sub-regular"+currentId +" li").each(function(){
        if($(this).find('label').hasClass('active')){
           $('#sub-box'+currentId).append('<p id="selected'+$(this).find('label').attr('id')+'">'+$(this).text() +' <a href="javascript:void(0);" onclick="return removeSelectedSubject(\'selected'+$(this).find('label').attr('id')+'\');">X</a></p>');
           isSelectLabelBlank=false;
        }
        var subjectHint=$(this).find('label').attr('subjectHint');
		//console.log('checkbox class:: '+$(this).find('label').attr('class'));
    });
    if(isSelectLabelBlank){
    	$('#sub-box'+currentId).append('<p>Select Course</p>');
    }
    return status;
}

function removeSelectedSubject(id){
	console.log('removed: '+id);
    $('#'+id).remove();
    var labelId = id.split("selected")[1];
    console.log('labelId '+labelId);
    $('#'+labelId).toggleClass('active');
    $('#'+labelId).parent().removeClass('new-bg');
    var divLabelId=$('#'+labelId).parent().parent().prev().attr('id');
    console.log('divLabelId '+divLabelId);
    var currentId=divLabelId.split("sub-box")[1];
    console.log('currentId '+currentId);
    if($('#'+divLabelId).text().trim()==""){
    	$('#'+divLabelId).append('<p>Select Course</p>');
    	$('#hintMsg'+currentId).text('');
    }
    getSelectedSubjects();
    getAllCourseDetails('signupStage5','0','N',false);
}

function removePlacementSelectedSubject(id){
    console.log('removed: '+id);
    $('#'+id).remove();
    var labelId = id.split("selected")[1];
    $('#'+labelId).toggleClass('active');
    $('#'+labelId).parent().removeClass('new-bg');
    console.log($('#'+labelId).parent().parent().prev().attr('id'));
    var divLabelId=$('#'+labelId).parent().parent().prev().attr('id');
    var currentId=divLabelId.split("sub-box1")[1];
    if($('#'+divLabelId).text().trim()==""){
    	$('#'+divLabelId).append('<p>Select Course</p>');
    	$('#hintMsg'+currentId).text('');
    }
    getSelectedSubjects();
    getAllCourseDetails('signupStage5','0','N',false);
}

function removeRecoverySelectedSubject(id){
    console.log('removed: '+id);
    $('#'+id).remove();
    var labelId = id.split("selected")[1];
    $('#'+labelId).toggleClass('active');
    $('#'+labelId).parent().removeClass('new-bg');
    console.log($('#'+labelId).parent().parent().prev().attr('id'));
    var divLabelId=$('#'+labelId).parent().parent().prev().attr('id');
    var currentId=divLabelId.split("sub-box2")[1];
    if($('#'+divLabelId).text().trim()==""){
    	$('#'+divLabelId).append('<p>Select Course</p>');
    	$('#hintMsg2'+currentId).text('');
    }
    getSelectedSubjects();
    getAllCourseDetails('signupStage5','0','N',false);
}

function showDropdown(index){
    for(position=1;position<=7;position++){
        if(position == index){
            $('#select-sub-regular'+position).css("display", "block");
        }else{
            $('#select-sub-regular'+position).css("display", "none");
        }
    }

}
function showDropdownForPlacement(index){
    console.log("showDropdownForPlacement");
	for(position=1;position<=7;position++){
        if(position == index){
            $('#select-sub-placement'+position).css("display", "block");
        }else{
            $('#select-sub-placement'+position).css("display", "none");
        }
    }

}

function showDropdownForCreditRecovery(index){
    console.log("showDropdownForCreditRecovery");
	for(position=1;position<=7;position++){
        if(position == index){
            $('#select-sub-credit-recovery'+position).css("display", "block");
        }else{
            $('#select-sub-credit-recovery'+position).css("display", "none");
        }
    }
}
function applyScholarship(formId, appliedScholarshipCode ){
	hideMessage('');
	if(!$('input[name=payModeCheckboxes]').is(':checked')){
		showMessage(true, "Please select payment option");
		return false;
	}

	if (!validateCharacters($('#scholarshipCodeInside').val())) {
		showMessage(false,
				'Please use the English Keyboard while providing information');
		return false
		}


	if($('#scholarshipCodeInside').val()=='' || $('#scholarshipCodeInside').val()==' '){
		showMessage(true, "Enter a valid Scholarship code.");
		return false;
	}
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLFor('student','signup/apply-scholarship'),
		data : JSON.stringify(getRequestForStudentScholarship(formId, appliedScholarshipCode)),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {

			}else{
				if(appliedScholarshipCode==2){
					$('#'+formId+' #scholarshipCodeInside').val('');
				}
				cancelPaymentOption(false);
				getAllCourseDetails('signupStage5', appliedScholarshipCode,'N',true);
			}
			showMessage(true, data['message']);
			return false;
		},
		error : function(e) {
			//showMessage(true, e.responseText);
			$("#nextStep").prop("disabled", false);
			tabActiveStatus(5);
		}
	});
}
function getRequestForStudentScholarship(formId, appliedScholarshipCode){
	var request = {};
	var authentication = {};
	var requestData = {};
	requestData['requestKey']='APPLY-SCHOLARSHIP';
	requestData['requestValue']=$("#"+formId+" #scholarshipCodeInside").val().trim();
	requestData['appliedScholarshipCode']=appliedScholarshipCode;
	requestData['requestExtra']=$("#"+formId+" #payMode").val();
	authentication['hash'] = getHash();authentication['schoolId'] = SCHOOL_ID;authentication['schoolUUID'] = SCHOOL_UUID;
	authentication['userType'] = 'STUDENT';
	authentication['userId'] = $("#"+formId+" #userId").val();
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	return request;
}

function cancelPaymentOption(flag){
	if (!validateCharacters($("#additionalInfo").val())) {
		showMessage(false, 'Please use the English Keyboard while providing information');
		return false;
	}

	$('#studentPaymentModal').modal('hide');
	$('body').removeClass("modal-open");
	$('.modal-backdrop').remove();
	if(flag){
		window.setTimeout(function(){
			getAllCourseDetails('signupStage5','0','N',false);
		},500);
	}
}

function showPaymentMode(){
	console.log("studentPaymentModal - signupSubPage1 "+signupSubPage1);
	$('#studentPaymentBookSeatModal').modal('hide');
	$("#pay-five").prop("checked", false);
	console.log("data-paymode => ", $('#signupStage5 #payMode').attr('data-paymode'));
	if($('#signupStage5 #payMode').attr('data-paymode')=='registration'){
		showPaymentBookSeatMode();
		return;
	}
	$("#enrollmentType").val('REGISTRATION_FRESH');
	$('#studentPaymentModal').modal('show');
}

function showPaymentFromEnrollMode(){
	console.log("showPaymentFromEnrollMode - payMode "+$('#signupStage5 #payMode').val());
	$('#studentPaymentBookSeatModal').modal('hide');
	$("#pay-five").prop("checked", false);
	//$("#pay-one").prop("checked", true);
	if($('#signupStage5 #payMode').val()=='registration'){
		if($('#signupStage5 #payMode').val()!=$('#signupStage5 #payMode').attr('data-paymode')){
			$('#signupStage5 #payMode').val($('#signupStage5 #payMode').attr('data-paymode'));
			selectPaymentmentMethod();
		}else{
			$('#signupStage5 #payMode').val('annually');
			$("#pay-one").prop("checked", true);
		}
	}else{
		$('#signupStage5 #payMode').val($('#signupStage5 #payMode').attr('data-paymode'));
	}
	$("#enrollmentType").val('REGISTRATION_FRESH');
	$('#studentPaymentModal').modal('show');
}

function cancelPaymentBookSeatOption(flag){

	$('#studentPaymentBookSeatModal').modal('hide');
	$('.modal-backdrop').remove();
	if(flag){
		window.setTimeout(function(){
			getAllCourseDetails('signupStage5','0','N',false);
		},500);
	}
}

function showPaymentBookSeatMode(){
	console.log("showPaymentBookSeatMode");
	$('#studentPaymentModal').modal('hide');
	$("#pay-one").prop("checked", false);
	$("#pay-five").prop("checked", true);
	$('#signupStage5 #payMode').val('registration');
	$("#enrollmentType").val('REGISTRATION_REGISTER');
	$('#studentPaymentBookSeatModal').modal('show');
}

function showPaymentBookSeatModeK12(){
	console.log("showPaymentBookSeatMode");
	$('#studentPaymentModal').modal('hide');
	$("#pay-one").prop("checked", false);
	$("#pay-five").prop("checked", true);
	$('#signupStage5 #payMode').val('registration');
	$("#enrollmentType").val('REGISTRATION_REGISTER');
	$('#studentPaymentBookSeatModal').modal('show');
}

function showPaymentTermCondMode(){
	if($("#regPaymentType").val()=='booking'){
		$('#payTabModal').modal('hide');
		$('#payTabBookingModal').modal('show');
	}else{
		$('#payTabBookingModal').modal('hide');
		$('#payTabModal').modal('show');
	}

}


function calculatePageCreditCount(pageNumber){
	var creditCountCredit = parseFloat($("#creditCountCredit").val())
	var creditCountRegular = parseFloat($("#creditCountRegular").val())
	var creditCountAdvance = parseFloat($("#creditCountAdvance").val())
	var creditCountCte     = parseFloat($("#creditCountCTE").val())
	var creditCountTotal = 0;

	if(pageNumber==1){
		return creditCountCredit;
	}else if(pageNumber==2){
		return creditCountRegular;
	}else if(pageNumber==3){
		return creditCountAdvance;
	}else if(pageNumber==4){
		creditCountTotal = parseFloat(creditCountCredit+creditCountRegular+creditCountAdvance+creditCountCte);
	}
	console.log("Total Credits are :  "+creditCountTotal);
	return creditCountTotal;
}
function updatePaymentMode(){
	if($('#pay-four').is(':checked')){
		$('#paymentModeAfterSelection').html("Payment Mode: 9 Months Installment<span class=\"pull-right btn-\" onclick=\"showPaymentMode();\"><strong>Change Payment Mode</strong></span>");
	}else if($('#pay-three').is(':checked')){
		$('#paymentModeAfterSelection').html("Payment Mode: 6 Months Installment<span class=\"pull-right btn-\" onclick=\"showPaymentMode();\"><strong>Change Payment Mode</strong></span>");
	}else if($('#pay-two').is(':checked')){
		$('#paymentModeAfterSelection').html("Payment Mode: Quarterly<span class=\"pull-right btn-\" onclick=\"showPaymentMode();\"><strong>Change Payment Mode</strong></span>");
	}else if($('#pay-one').is(':checked')){
		$('#paymentModeAfterSelection').html("Payment Mode: One Time Payment Plan<span class=\"pull-right btn-\" onclick=\"showPaymentMode();\"><strong>Change Payment Mode</strong></span>");
	}else{
		$('#paymentModeAfterSelection').html("Payment Mode: One Time Payment Plan<span class=\"pull-right btn-\" onclick=\"showPaymentMode();\"><strong>Change Payment Mode</strong></span>");
	}
}
function showOne(){
	$('#divCreditRecoveryDetailsContent').show();
	$('#divRegularDetailsContent').hide();
	$('#divAdvancedPlacementDetailsContent').hide();
}
function showTwo(){
	$('#divCreditRecoveryDetailsContent').hide();
	$('#divRegularDetailsContent').show();
	$('#divAdvancedPlacementDetailsContent').hide();
}
function showThree(){
	$('#divCreditRecoveryDetailsContent').hide();
	$('#divRegularDetailsContent').hide();
	$('#divAdvancedPlacementDetailsContent').show();
}
function showFour(){
	if($("#standardId5").val()==6 || $("#standardId5").val()==7){
		if($('#placementSelectedSubjects').val()==''){
			showThree();
		}else{
			showTwo()
		}
	}
	showPaymentMode();
}
function getAllCourseDetails(formId, appliedScholarshipCode,isGradeChange, needToShowModal){
	$("#"+formId+" #scholarshipCode").val($('#'+formId+' #scholarshipCodeInside').val());
	var changedLabel='Select Grade <span>*</span>';
	if($("#"+formId+" #standardId5").val()==0){
		$('#lableChanged').html(changedLabel);
		$('#courseSubjectDetails').html('');
		$('#selectedSubjects').val('');
		$('#creditCountCTE').val('')
		$('#studentGuidlines').hide();
		return false;
	}
	if($("#"+formId+" #standardId5").val()!=0){
		$('#studentGuidlines').show();
	}

	changedLabel='Selected Grade <span>*</span>';
	$('#lableChanged').html(changedLabel);
	var selectedSubjects=$("#selectedSubjects").val();
	if(isGradeChange=='Y'){ //For Grade Change reassign mandatory subjects.
		selectedSubjects='';
		$('#selectedSubjects').val('');
		$('#scholarshipCodeInside').val('');
		$('#scholarshipCode').val('');
		$('#parentSubjectIdCredit').val('');
		$('#parentSubjectIdRegural').val('');
		$('#creditCountCredit').val('0.0');
		$('#creditCountRegular').val('0.0');
		$('#creditCountAdvance').val('0.0');
		$('#creditCountCTE').val('0.0');
		signupSubPage1=3;
		$('#signupSubPage1').val(signupSubPage1);
		$('#payMode').val('annually');
		$('#enrollmentType').val('REGISTRATION_FRESH');
	}

	additionalInfo=$('#additionalInfo').val();
	if($('#additionalInfo').val()==undefined || $('#additionalInfo').val()=='undefined'){
		additionalInfo='';
	}
	var postData=encodeURI("request="+JSON.stringify(getRequestForStudentCourseDetailsInfo(formId)));
	console.log('postData '+postData);
	if (!validateCharacters(postData)) {
		showMessage(false, 'Please use the English Keyboard while providing information');
		return false
	}

	$.ajax({
		type : "POST",
		url : getURLForHTML('student','signup/course-details-by-standard-id'),
		data :postData,
		dataType : 'html',
		success : function(htmlContent) {
			if(htmlContent!=""){
            	var stringMessage = [];
            	stringMessage = htmlContent.split("|");
        		if(stringMessage[0] == "FAILED" || stringMessage[0] == "EXCEPTION" || stringMessage[0] =="SESSIONOUT"){
        			showMessage(true, stringMessage[1]);
        			if(stringMessage.length==3 && stringMessage[2]=='true'){
        				//showPaymentMode();
        			}
        			if(stringMessage[0] == "SESSIONOUT"){
        				redirectLoginPage();
        			}
        		} else {
        			$('#courseSubjectDetails').html(htmlContent);
        			if(needToShowModal){
        				showPaymentMode();
        			}
        		}
        		$("#nextStep").prop("disabled", false);
        		return false;
			}
		},
		error : function(e) {
			$('#courseSubjectDetails').html(e.responseText);
			$("#nextStep").prop("disabled", false);
		}
	});
}
function getRequestForStudentCourseDetailsInfo(formId) {
	var studentCourseDetailsInfoDTO = {};
	studentCourseDetailsInfoDTO['enrollmentType'] = $("#enrollmentType").val();
	studentCourseDetailsInfoDTO['courseEnrollmentType'] = $("#courseEnrollmentType").val();
	studentCourseDetailsInfoDTO['standardId'] = $("#standardId5").val();
	studentCourseDetailsInfoDTO['selectedFullTimeCoursesIds'] =  $("#selectedSubjects").val()
	studentCourseDetailsInfoDTO['payMode'] = $("#signupStage5 #payMode").val();
	studentCourseDetailsInfoDTO['scholarshipCode'] = $("#scholarshipCode").val();
	studentCourseDetailsInfoDTO['signupSubPage1'] = $("#signupSubPage1").val();
	studentCourseDetailsInfoDTO['appliedScholarshipCode'] = $("#appliedScholarshipCode").val();
	studentCourseDetailsInfoDTO['additionalInfo'] = escapeCharacters($("#additionalInfo").val());
	console.log('Course Details '+studentCourseDetailsInfoDTO);
	return studentCourseDetailsInfoDTO;
}


function getRequestForStudentCourseDetails(standardId){
	return "";
}

function callForSignupCourseDetails(formId) {
	hideMessage('');
//	if(!getSelectedCourse('signupStage5','0')){
//		return false;
//	}
	/*if(!$('input[name=payModeCheckboxes]').is(':checked')){
		showMessage(true, "Please select payment option");
		return false;
	}*/
	if(!validateRequestForSignupCourse(formId)){
		return false;
	}
	$("#nextStep").prop("disabled", true);
	$.ajax({
		type : "POST",
		url : getURLForHTML('student','signup/stage-5'),
		data : encodeURI("request="+JSON.stringify(getRequestForStudentCourse(formId))),
		dataType : 'html',
		cache : false,
		timeout : 600000,
		success : function(htmlContent) {
			if(htmlContent!=""){
            	var stringMessage = [];
            	stringMessage = htmlContent.split("|");
        		if(stringMessage[0] == "FAILED" || stringMessage[0] == "EXCEPTION" || stringMessage[0] == "SESSIONOUT"){
        			if(stringMessage[0] == "SESSIONOUT"){
        				redirectLoginPage();
        			}else {
        				showMessage(true, stringMessage[1]);
        				tabActiveStatus(5);
        			}
        		} else {
        			console.log("standardId val is ",$("#standardId5").val() );
        			signupSubPage1=3;
        			$('#signupSubPage1').val(signupSubPage1);
        			$('#signupStage6Content').html(htmlContent)
        			getStudentSignupDetailInReviewStage();
        			showMessage(false, 'Course updated successfully.');
        			tabActiveStatus(6);
        		}
        		$("#nextStep").prop("disabled", false);
        		return false;
			}
		},
		error : function(e) {
			//showMessage(true, e.responseText);
			$("#nextStep").prop("disabled", false);
			tabActiveStatus(5);
		}
	});
}

function getRequestForStudentCourse(formId){
	var request = {};
	var authentication = {};
	var requestData = {};
	var courseDetailsDTO={};
	courseDetailsDTO['standardId'] = $("#standardId5").val();
//	if($('#iscreditRecoveryYes').is(":checked")){
		courseDetailsDTO['isCreditRecoveryOpted'] = 1;
//	}else if($('#iscreditRecoveryNo').is(":checked")){
//		courseDetailsDTO['isCreditRecoveryOpted'] = 0;
//	}
	courseDetailsDTO['themeType'] = 'theme1';
	courseDetailsDTO['enrollmentType'] = $("#enrollmentType").val();
//	courseDetailsDTO['creditRecoverSelectedSubjects'] = $("#creditRecoverSelectedSubjects").val();
	courseDetailsDTO['selectedSubjects'] = $("#selectedSubjects").val();
//	courseDetailsDTO['selectedCTESubjects'] = $("#selectedCTESubjects").val() ;
//	courseDetailsDTO['placementSelectedSubjects'] = $("#placementSelectedSubjects").val();
	courseDetailsDTO['payMode'] = $("#signupStage5 #payMode").val();
	courseDetailsDTO['scholarshipCode'] = $("#scholarshipCode").val();

	courseDetailsDTO['additionalInfo'] = escapeCharacters($("#additionalInfo").val());
	courseDetailsDTO['creditCountCredit'] = $("#creditCountCredit").val();
	courseDetailsDTO['creditCountRegular'] = $("#creditCountRegular").val();
	courseDetailsDTO['creditCountAdvance'] = $("#creditCountAdvance").val();

	courseDetailsDTO['parentSubjectIdCredit'] = $("#parentSubjectIdCredit").val();
	courseDetailsDTO['parentSubjectIdRegural'] = $("#parentSubjectIdRegural").val();

	requestData['courseDetailsDTO']=courseDetailsDTO;

	authentication['hash'] = getHash();authentication['schoolId'] = SCHOOL_ID;authentication['schoolUUID'] = SCHOOL_UUID;
	authentication['userType'] = 'STUDENT';
	authentication['userId'] = $("#"+formId+" #userId").val();
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	console.log('request '+request);
	return request;
}

function validateRequestForSignupCourse(formId){
	if(!validateCharacters($("#additionalInfo").val()))
		{
		showMessage(false, 'Please use the English Keyboard while providing information');
		return false
		}

	if (!validateFormAscii(formId)) {
		showMessage(false, 'Please use the English Keyboard while providing information');
		return false;
	}

	if ($("#signupStage5 #standardId5").val()==0 || $("#signupStage5 #standardId5").val()==null) {
		showMessage(true, 'Please select grade');
		return false;
	}
	return true;
}

function displayScholorshipDetails(radioId){
	var data = $("#"+radioId+" #originalStage5Data").text().split('|')
	console.log('data '+data)
	if(data[1].trim()=='1'){
		$('#annual-course-fee-details').show()
		$('#installment3-course-fee-details').hide()
		$('#installment6-course-fee-details').hide()
		$('#installment9-course-fee-details').hide()
	}else if(data[1].trim()=='3'){
		$('#annual-course-fee-details').hide()
		$('#installment3-course-fee-details').show()
		$('#installment6-course-fee-details').hide()
		$('#installment9-course-fee-details').hide()
	}else if(data[1].trim()=='6'){
		$('#annual-course-fee-details').hide()
		$('#installment3-course-fee-details').hide()
		$('#installment6-course-fee-details').show()
		$('#installment9-course-fee-details').hide()
	}else if(data[1].trim()=='9'){
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

function displayCTECourseDetailsFromSearch(callFrom){
	var subjectId = 0;
	if($('#standardId').val()==9){
		subjectId = $('#class-9').val();
	}else if($('#standardId').val()==10){
		subjectId = $('#class-10').val();
	}
	if(subjectId!=''){
		displayFlexCourseDetails(subjectId, false, callFrom)
	}
}

function getSelectedCTESubjects(divId, elementId, pickInitialValue){
	var selectedCTESubject='';
	var totalCteCredit=0.0;
	if(pickInitialValue){
		if($('#'+elementId).val()==''){

		}else{
			selectedCTESubject=$('#'+elementId).val()+",";
		}
	}
	$("#"+divId+" li a").each(function(){
		if ($(this).attr('class') == 'selected-course') {
			selectedCTESubject+=$(this).attr('courseId')+',';
			totalCteCredit = parseFloat(totalCteCredit)+ parseFloat($(this).attr('subjectCredit'));
		}
    });
	selectedCTESubject = selectedCTESubject.substring(0,selectedCTESubject.length-1);
	$('#'+elementId).val(selectedCTESubject);
	$('#cteSubjectModal').modal('hide');
	$('#creditCountCTE').val(totalCteCredit.toFixed(2));

}

function confirmAndContinue(formId){
	$('#cteSubjectModal').modal('hide');
	getSelectedSubjects();
	getAllCourseDetails('signupStage5','0','N',false);
}
function getRequestForCTECourseDetails(formId) {
	var cteCourseDetailsinfoDTO = {};
	cteCourseDetailsinfoDTO['enrollmentType'] = $("#enrollmentType").val();
	cteCourseDetailsinfoDTO['standardId'] = $("#standardId5").val();
	cteCourseDetailsinfoDTO['selectedSubjects'] = $("#selectedSubjects").val();
	console.log('getRequestForCTECourseDetails '+cteCourseDetailsinfoDTO);
	return cteCourseDetailsinfoDTO;
}

function getCTECourseCatalogue(formId){

	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForHTML('student','cte-course-details-by-standard-id'),
		data :JSON.stringify(getRequestForCTECourseDetails(formId)),
		dataType : 'html',
		cache : false,
		timeout : 600000,
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
        			$('#cteCourseCatalogue').html(htmlContent);
        			$('#cteSubjectModal').modal('show');
        		}
        		$("#nextStep").prop("disabled", false);
        		return false;
			}
		},
		error : function(e) {
			$("#nextStep").prop("disabled", false);
		}
	});
}

function activeSubject(subjectId){
	var subjectClass = $('#subject-id-'+subjectId).attr('class');
	if(subjectClass == 'selected-course'){
		$('#subject-id-'+subjectId).removeClass('selected-course');
	}else{
		$('#subject-id-'+subjectId).addClass('selected-course');
	}
}
function activeSubjectFromSearch(){
	var subjectId= $('#class-cte').val();
	console.log("CTE Subject Id from search "+subjectId);
	activeSubject(subjectId);
}

function arrangeOrder(){
	$(".course-list-item").each(function(){
	    $(this).attr('style','grid-row-end: span '+Math.ceil((($(this).children().height()-2)/16)+1));
	});
}

function cancelCTESubjectModal(formId) {

	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForHTML('student','cte-course-details-by-standard-id'),
		data :JSON.stringify(getRequestForCTECourseDetails(formId)),
		dataType : 'html',
		cache : false,
		timeout : 600000,
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
        			$('#cteSubjectModal').modal('hide');
        		}
        		$("#nextStep").prop("disabled", false);
        		return false;
			}
		},
		error : function(e) {
			$("#nextStep").prop("disabled", false);
		}
	});

}

