$(document).ready(function() {
	restrictKeyEnter('scholarshipCodeInside');
});

function callForStudentNextSession(formId, nextGradeId, nextGradeName, enrollmentType) {
	hideMessage('');
	$.ajax({
		type : "POST",
		url : getURLForHTML('dashboard','student/standard-id'),
		data : JSON.stringify(getRequestForStudentNextSession(formId, nextGradeId, enrollmentType)),
		dataType : 'html',
		contentType : "application/json",
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
        			$('#divNextSession').hide();
        			$('#divNextSessionCourseChoose').html(htmlContent);
        			$('#divNextSessionCourseChoose').show();
        			isEligibleCreditRecovery(formId);
        			$(".btn-finish").hide();
        			//check condition wheather call FT or CR very first time?
        			//getNextCourseDetails('nextSessionSubject','0','Y',false,'FT');
        		}
        		$("#nextSesionStep").prop("disabled", false);
        		return false;
			}
		},
		error : function(e) {
			//showMessage(true, e.responseText);
			$("#nextSesionStep").prop("disabled", false);
			tabActiveStatus(4);
		}
	});
}

function getRequestForStudentNextSession(formId, nextGradeId, enrollmentType) {
	var studentCourseDetailsInfoDTO = {};
	studentCourseDetailsInfoDTO['enrollmentType'] = enrollmentType;
	studentCourseDetailsInfoDTO['standardId'] = nextGradeId;//$("#"+formId+" #standardId").val();
	return studentCourseDetailsInfoDTO;
}


function getNextCourseDetails(formId, appliedScholarshipCode,isGradeChange, needToShowModal, clickCourseTab){
	$("#"+formId+" #scholarshipCode").val($('#'+formId+' #scholarshipCodeInside').val());
	if($("#"+formId+" #standardId").val()!=0){
		$('#studentGuidlines').show();
	}
//	var creditRecoverSelectedSubjects=$("#creditRecoverSelectedSubjects").val();
	var selectedSubjects=$("#selectedSubjects").val();
//	var placementSelectedSubjects=$("#placementSelectedSubjects").val();

	var postData=JSON.stringify(getRequestForStudentNextSessionCourse(formId))
	if (!validateCharacters(postData)) {
		showMessage(false, 'Please use the English Keyboard while providing information');
		return false
	}
	
	$.ajax({
		type : "POST",
		url : getURLForHTML('dashboard','student/course-details-by-standard-id'),
		data :postData,
		dataType : 'html',
		contentType : "application/json",
		cache : false,
		timeout : 600000,
		success : function(htmlContent) {
			if(htmlContent!=""){
            	var stringMessage = [];
            	stringMessage = htmlContent.split("|");
        		if(stringMessage[0] == "FAILED" || stringMessage[0] == "EXCEPTION" || stringMessage[0] =="SESSIONOUT"){
        			showMessage(true, stringMessage[1]);
        			if(stringMessage.length==3 && stringMessage[2]=='true'){
        				if(stringMessage[1] !='Please select courses worth 6 units of academic credit.')
        				showPaymentMode();
        			}
        			if(stringMessage[0] == "SESSIONOUT"){
        				redirectLoginPage();
        			}
        		} else {
        			$('#studentNextSessionCoursesContent').html(htmlContent);
        			if(needToShowModal){
        				showPaymentMode();
        			}
        		}
        		if(clickCourseTab=='FT'){
        			$(".nav-tabs li").removeClass('active');
        			$(".full_time").addClass('active');
        			$(".tab-pane").removeClass("in active");
        			$("#full_time").addClass(' in active');
        		}else if(clickCourseTab=='CR'){
            			$(".nav-tabs li").removeClass('active');
            			$(".credit").addClass('active');
            			$(".tab-pane").removeClass("in active");
            			$("#credit_recovery").addClass(' in active');
            	}else if(clickCourseTab=='AP'){
            			$(".nav-tabs li").removeClass('active');
            			$(".advance").addClass('active');
            			$(".tab-pane").removeClass("in active");
            			$("#advanced_placement").addClass(' in active');
            	}
        		
        		$("#nextSesionStep").prop("disabled", false);
        		$(".btn-finish").hide();
        		return false;
			}
		},
		error : function(e) {
			$('#courseSubjectDetails').html(e.responseText);
			$("#nextSesionStep").prop("disabled", false);
		}
	});
}

function getRequestForStudentNextSessionCourse(formId) {

	var studentCourseDetailsInfoDTO = {};
	studentCourseDetailsInfoDTO['enrollmentType'] = $("#enrollmentType").val();
	studentCourseDetailsInfoDTO['standardId'] = $("#"+formId+" #standardId").val();
	studentCourseDetailsInfoDTO['selectedFullTimeCoursesIds'] = $("#"+formId+" #selectedSubjects").val();
	studentCourseDetailsInfoDTO['payMode'] = $("#"+formId+"  #payMode").val();
	studentCourseDetailsInfoDTO['scholarshipCode'] = $("#"+formId+" #scholarshipCode").val();
	studentCourseDetailsInfoDTO['appliedScholarshipCode'] = $("#"+formId+" #appliedScholarshipCode").val();
	console.log('Course Details '+studentCourseDetailsInfoDTO);
	return studentCourseDetailsInfoDTO;
}

function showGuideLines(){
	var standard =$("#standardId").val();
	console.log("standard"+standard);
	if(standard==1 || standard==2 ||standard==3 ){
		$('#guide-like-heading-high').hide();
		$('#guide-like-content-high').hide();
		$('#guide-like-heading-middle').show();
		$('#guide-like-content-middle').show();
	}else{
		$('#guide-like-heading-high').show();
		$('#guide-like-content-high').show();
		$('#guide-like-heading-middle').hide();
		$('#guide-like-content-middle').hide();
	}
	$('#guidelines').modal('show');
	
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
    
function removeSelectedSubject(id, courseType){
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
    //getAllCourseDetails('signupStage5','0','N',false);
    getNextCourseDetails('nextSessionSubject','0','N',false,courseType);
}
    
//function removePlacementSelectedSubject(id){
//    console.log('removed: '+id);
//    $('#'+id).remove();
//    var labelId = id.split("selected")[1];
//    $('#'+labelId).toggleClass('active');
//    $('#'+labelId).parent().removeClass('new-bg');
//    console.log($('#'+labelId).parent().parent().prev().attr('id'));
//    var divLabelId=$('#'+labelId).parent().parent().prev().attr('id');
//    var currentId=divLabelId.split("sub-box1")[1];
//    if($('#'+divLabelId).text().trim()==""){
//    	$('#'+divLabelId).append('<p>Select Course</p>');
//    	$('#hintMsg'+currentId).text('');
//    }
//    getPlacementSelectedSubjects();
//    //getAllCourseDetails('signupStage5','0','N',false);
//    getNextCourseDetails('nextSessionSubject','0','N',false,'AP');
//}
//    
//function removeRecoverySelectedSubject(id){
//    console.log('removed: '+id);
//    $('#'+id).remove();
//    var labelId = id.split("selected")[1];
//    $('#'+labelId).toggleClass('active');
//    $('#'+labelId).parent().removeClass('new-bg');
//    console.log($('#'+labelId).parent().parent().prev().attr('id'));
//    var divLabelId=$('#'+labelId).parent().parent().prev().attr('id');
//    var currentId=divLabelId.split("sub-box2")[1];
//    if($('#'+divLabelId).text().trim()==""){
//    	$('#'+divLabelId).append('<p>Select Course</p>');
//    	$('#hintMsg2'+currentId).text('');
//    }
//    getSelectedRecoverySubjects();
//    //getAllCourseDetails('signupStage5','0','N',false);
//    getNextCourseDetails('nextSessionSubject','0','N',false,'CR');
//}
    
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
		url : getURLForHTML('dashboard','student/apply-scholarship'),
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
				//getAllCourseDetails('signupStage5', appliedScholarshipCode,'N',true);
				getNextCourseDetails('nextSessionSubject',appliedScholarshipCode,'N',true,'FT');
			}
			showMessage(true, data['message']);
			return false;
		},
		error : function(e) {
			//showMessage(true, e.responseText);
			$("#nextSesionStep").prop("disabled", false);
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
	requestData['requestExtra2']='Student Progression';
	authentication['hash'] = getHash();authentication['schoolId'] = SCHOOL_ID;authentication['schoolUUID'] = SCHOOL_UUID;
	authentication['userType'] = 'STUDENT';
	authentication['userId'] = $("#"+formId+" #userId").val();
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	return request;
}

function callCreditType(){
	console.log('next session')
	if($("#standardId").val()<4){
		$('#selectedOnlySubjectPlacement').addClass('hide');
	}else if(elligibleForAPCourse){
		$('#selectedOnlySubjectPlacement').removeClass('hide');
		if($('#iscreditRecoveryYes').is(":checked")){
			showOne();
			$('#selectedOnlySubjectCredit').removeClass('hide')
			$('#selectedOnlySubjectPlacement').removeClass('hide')
			$('#iscreditRecoveryYes').prop('disabled',true);
			$('#iscreditRecoveryNo').prop('disabled',true);
		}else if($('#iscreditRecoveryNo').is(":checked")){
			showTwo();
			$('#selectedOnlySubjectCredit').addClass('hide')
		}
	}else if(!elligibleForAPCourse){
		$('#selectedOnlySubjectPlacement').addClass('hide');
		if($('#iscreditRecoveryYes').is(":checked")){
			showOne();
			$('#selectedOnlySubjectCredit').removeClass('hide')
			$('#selectedOnlySubjectPlacement').addClass('hide')
			$('#iscreditRecoveryYes').prop('disabled',true);
			$('#iscreditRecoveryNo').prop('disabled',true);
		}else if($('#iscreditRecoveryNo').is(":checked")){
			showTwo();
			$('#selectedOnlySubjectCredit').addClass('hide')
		}	
	}
};
function isEligibleCreditRecovery(formId){
	if($("#"+formId+" #standardId").val()==0 || $("#"+formId+" #standardId").val()<=3){
		$('#creditHide').addClass('hide');
	}else{
		$('#creditHide').removeClass('hide');
	}
}
function cancelPaymentOption(flag){
	if($("input:radio[name='payModeCheckboxes']").is(":checked")){
		
	}else{
		showMessage(false, 'Please choose payment option');
		return false;
	}
	
	if (!validateCharacters($("#additionalInfo").val())) {
		showMessage(false, 'Please use the English Keyboard while providing information');
		return false;
	}
	$('#studentPaymentModal').modal('hide');
	$('.modal-backdrop').remove();
	if(flag){
		window.setTimeout(function(){
			//getAllCourseDetails('signupStage5','0','N',false);
			getNextCourseDetails('nextSessionSubject','0','N',false,'FT');
		},500);
	}
	$('body').removeClass('modal-open')
}

function showPaymentMode(){
//	if(calculatePageCreditCount(4)!=6){
//		showMessage(false,'Please choose 6.0 credit to change payment method.');
//		return false
//	}else{
		$('#studentPaymentModal').modal('show');
//	}
}

function calculatePageCreditCount(pageNumber){
	var creditCountCredit = 0;
	var creditCountRegular = 0;
	var creditCountAdvance = 0;
	var creditCountCTE = 0;
	var creditCountTotal = 0;
	if($("#creditCountCredit").val()!=''){
		creditCountCredit = parseFloat($("#creditCountCredit").val())
	}
	if($("#creditCountRegular").val()!=''){
		creditCountRegular = parseFloat($("#creditCountRegular").val())
	}
	if($("#creditCountAdvance").val()!=''){
		creditCountAdvance = parseFloat($("#creditCountAdvance").val())
	}
	if($("#creditCountCTE").val()!=''){
		creditCountCTE = parseFloat($("#creditCountCTE").val())
	}
	
	if(pageNumber==1){
		return creditCountCredit;
	}else if(pageNumber==2){
		return creditCountRegular;
	}else if(pageNumber==3){
		return creditCountAdvance;
	}else if(pageNumber==4){
		creditCountTotal = creditCountCredit+creditCountRegular+creditCountAdvance+creditCountCTE;
	}
	return creditCountTotal;
}
function updatePaymentMode(){
	var planName='';
	if($('#pay-four').is(':checked')){
		if(SCHOOL_ID==4){
			planName='9 Months Installment';
		}else{
			planName='9 Months Installment';
		}
		$('#paymentModeAfterSelection').html("Payment Mode: "+planName+"<span class=\"pull-right btn-\" onclick=\"showPaymentMode();\"><strong>Change Payment Mode</strong></span>");
	}else if($('#pay-three').is(':checked')){
		if(SCHOOL_ID==4){
			planName='6 Months Installment';
		}else{
			planName='6 Months Installment';
		}
		$('#paymentModeAfterSelection').html("Payment Mode: "+planName+"<span class=\"pull-right btn-\" onclick=\"showPaymentMode();\"><strong>Change Payment Mode</strong></span>");
	}else if($('#pay-two').is(':checked')){
		if(SCHOOL_ID==4){
			planName='Quarterly';
		}else{
			planName='Annually';
		}
		$('#paymentModeAfterSelection').html("Payment Mode: "+planName+"<span class=\"pull-right btn-\" onclick=\"showPaymentMode();\"><strong>Change Payment Mode</strong></span>");
	}else if($('#pay-one').is(':checked')){
		if(SCHOOL_ID==4){
			planName='Annually Plan';
		}else{
			planName='Annually Plan';
		}
		$('#paymentModeAfterSelection').html("Payment Mode: "+planName+"<span class=\"pull-right btn-\" onclick=\"showPaymentMode();\"><strong>Change Payment Mode</strong></span>");
	}else{
		$('#paymentModeAfterSelection').html("Payment Mode: "+planName+"<span class=\"pull-right btn-\" onclick=\"showPaymentMode();\"><strong>Change Payment Mode</strong></span>");
	}
}
function showOne(){
	$('#divCreditRecoveryDetailsContent').show();
	$('#divCreditRecoveryDetailsContent').addClass("active");
	$('#divRegularDetailsContent').removeClass("active");
	$('#divAdvancedPlacementDetailsContent').removeClass("active");
//	$('#divRegularDetailsContent').hide();
//	$('#divAdvancedPlacementDetailsContent').hide();
}
function showTwo(){
//	$('#divCreditRecoveryDetailsContent').hide();
	$('#divCreditRecoveryDetailsContent').removeClass("active");
	$('#divRegularDetailsContent').show();
	$('#divRegularDetailsContent').addClass("active");
//	$('#divAdvancedPlacementDetailsContent').hide();
	$('#divAdvancedPlacementDetailsContent').removeClass("active");
}
function showThree(){
//	$('#divCreditRecoveryDetailsContent').hide();
	$('#divCreditRecoveryDetailsContent').removeClass("active");
//	$('#divRegularDetailsContent').hide();
	$('#divRegularDetailsContent').removeClass("active");
	$('#divAdvancedPlacementDetailsContent').show();
	$('#divAdvancedPlacementDetailsContent').addClass("active");
}

function showFullCourse(){
	$('#divRegularDetailsContent').show();
	$('#divCreditRecoveryDetailsContent').hide();
	$('#divAdvancedPlacementDetailsContent').hide();
	
}
function showFullCreditTwo(isCredit){
	$('#divRegularDetailsContent').show();
	if(isCredit){
		$('#divCreditRecoveryDetailsContent').show();
	}else{
		$('#divCreditRecoveryDetailsContent').hide();
	}
	$('#divAdvancedPlacementDetailsContent').hide();
}
function showFullCreditAdvance(isCredit){
	$('#divRegularDetailsContent').show();
	if(isCredit){
		$('#divCreditRecoveryDetailsContent').show();
	}else{
		$('#divCreditRecoveryDetailsContent').hide();
	}
	$('#divAdvancedPlacementDetailsContent').show();
}

function showFour(){
	if($("#standardId").val()==6 || $("#standardId").val()==7){
		if($('#placementSelectedSubjects').val()==''){
			showThree();
		}else{
			showTwo()
		}
	}
	showPaymentMode();
}



function getRequestForStudentCourseDetails(standardId){
	return "";
}

function callForNextSessionCourseDetails(formId) {
	hideMessage('');
	$("#nextSesionStep").prop("disabled", true);
	$.ajax({
		type : "POST",
		url : getURLForHTML('dashboard','student/course-details'),
		data : JSON.stringify(getRequestForStudentCourse(formId)),
		dataType : 'html',
		contentType : "application/json",
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
        				displaySection2();
        			}
        		} else {
        			cancelPaymentOption(false)
        			$('#divNextSessionCourseReview').html(htmlContent);
        			getStudentNextSessionReviewStage();
        			showMessage(false, 'Course updated successfully.');
        			displaySection3();
        		}
        		$("#nextSesionStep").prop("disabled", false);
        		return false;
			}
		},
		error : function(e) {
			$("#nextSesionStep").prop("disabled", false);
			displaySection2();
		}
	});
}

function getRequestForStudentCourse(formId){
	var request = {};
	var authentication = {};
	var requestData = {};
	var courseDetailsDTO={};
	
	courseDetailsDTO['standardId'] = $("#standardId").val();
	if($('#iscreditRecoveryYes').is(":checked")){
		courseDetailsDTO['isCreditRecoveryOpted'] = 1;
	}else if($('#iscreditRecoveryNo').is(":checked")){
		courseDetailsDTO['isCreditRecoveryOpted'] = 0;
	}
	courseDetailsDTO['themeType'] = 'theme1';
	//courseDetailsDTO['yearlySubjects'] = $("#"+formId+" #yearlySubjects").val();
	//courseDetailsDTO['semesterSubjects'] = $("#"+formId+" #semesterSubjects").val();
	courseDetailsDTO['enrollmentType'] = $("#enrollmentType").val();
	courseDetailsDTO['selectedSubjects'] = $("#selectedSubjects").val();
	courseDetailsDTO['payMode'] = $("#nextSessionSubject #payMode").val();
	courseDetailsDTO['scholarshipCode'] = $("#scholarshipCode").val();

	courseDetailsDTO['additionalInfo'] = escapeCharacters($("#additionalInfo").val());
	courseDetailsDTO['creditCountCredit'] = $("#creditCountCredit").val();
	courseDetailsDTO['creditCountRegular'] = $("#creditCountRegular").val();
	courseDetailsDTO['creditCountAdvance'] = $("#creditCountAdvance").val();
	courseDetailsDTO['creditCountCTE'] = $("#creditCountCTE").val();
	courseDetailsDTO['parentSubjectIdCredit'] = $("#parentSubjectIdCredit").val();
	courseDetailsDTO['parentSubjectIdRegural'] = $("#parentSubjectIdRegural").val();
	courseDetailsDTO['nextSessionStatus'] = "Y";
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
	
	if ($("#nextSessionSubject #standardId").val()==0 || $("#nextSessionSubject #standardId").val()==null) {
		showMessage(true, 'Please select grade');
		return false;
	}
	if(parseFloat($('#nextSessionSubject #totalCredit').html() < parseFloat(6))){
		showMessage(true, "Please select courses atleast worth 6 units of academic credit.");
        return false;
	}
	return true;
}

function displayScholorshipDetails(radioId){
	var data = $("#"+radioId+" #originalStage5Data").text().split('|')
	if(data[1].trim()=='1'){
		$('#condition25Percentage').hide()
		$('#annual-course-fee-details').show()
		$('#installment3-course-fee-details').hide()
		$('#installment5-course-fee-details').hide()
	}else if(data[1].trim()=='3'){
		$('#condition25Percentage').show()
		$('#annual-course-fee-details').hide()
		$('#installment3-course-fee-details').show()
		$('#installment5-course-fee-details').hide()
	}else if(data[1].trim()=='6'){
		$('#condition25Percentage').show()
		$('#annual-course-fee-details').hide()
		$('#installment3-course-fee-details').hide()
		$('#installment5-course-fee-details').show()
	}else if(data[1].trim()=='9'){
		$('#condition25Percentage').show()
		$('#annual-course-fee-details').hide()
		$('#installment3-course-fee-details').hide()
		$('#installment5-course-fee-details').hide()
	}
}
function selectPaymentmentMethod(){
	if ($('#payMode').val() == 'annually') {
		$("#pay-one").trigger('click');
	} else if ($('#payMode').val() == 'threeMonthly') {
		$("#pay-two").trigger('click');
	} else if ($('#payMode').val() == 'fiveMonthly') {
		$("#pay-three").trigger('click');
	} else if ($('#payMode').val() == 'nineMonthly') {
		$("#pay-four").trigger('click');
	}
}

function submitCourse(){
	var creditCountTotal = calculatePageCreditCount(4);
	if(enrollmentType=='REGISTRATION_NEXT_GRADE'){
		if(creditCountTotal<6){
			showMessage(false,'Please select courses atleast worth 6 units of academic credit.');
			return false
		}
		var creditCountTotal = calculatePageCreditCount(3);
		if( creditCountTotal >3){
			showMessage(false,'Please select advanced placement worth 0-3 units of academic credit');
			return false
		}
	}else if(enrollmentType=='REGISTRATION_IMPORVE_GRADES'){
		if(creditCountTotal==0){
			showMessage(false,'Please select atleast courses worth 0.5 units of academic credit.');
			return false
		}
	}else if(enrollmentType=='REGISTRATION_COMPLETE_GRADES'){
		if(creditCountTotal==0){
			showMessage(false,'Please select atleast courses worth 0.5 units of academic credit.');
			return false
		}
		var maxCreditLimit=$('#maxCreditLimit').val();
		if( parseFloat(creditCountTotal)>parseFloat(maxCreditLimit) ){
			showMessage(false, 'Please select courses worth '+maxCreditLimit+' units of academic credit.');
			return false
		}
	}else{
		
	}
}

function getStudentNextSessionReviewStage() {
	previewFillSectionCourse();
}

function previewFillSectionCourse(){
	var radioId='';
	if($('#pay-one').is(':checked')){
		radioId = 'dtl-one';
	}else if($('#pay-two').is(':checked')){
		radioId = 'dtl-two';
	}else if($('#pay-three').is(':checked')){
		radioId = 'dtl-three';
	}else if($('#pay-four').is(':checked')){
		radioId = 'dtl-four';
	}
	if(radioId==''){
		return false;
	}
	var data = $("#"+radioId+" #originalStage5Data").text().split('|')
	console.log(data);
	$('#editStage5Standard').text($('#nextSessionSubject #standardId option:selected').text());
	var i=1;
	var totalCredit=0;
	var totalCost=0;
	$('#selectedSubjectsList').html('<tr style="color:#fff;"><th>Subject Name</th><th>Credit</th><th>Fee (USD)</th></tr>');
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
	$('#editStage5PaymentMethod').text(data[0].trim());
	$('.editStage5NoOfInstallment').text(data[1].trim());
	$('#editStage5CourseFee').text(data[2].trim());
	$('#editStage5ScholarShipFee').text(data[3].trim());
	if(data[17].trim()=='percent'){
		$('#editStage5ScholarShipFeeValue').html(data[15].trim()+'%');
	}else{
		$('#editStage5ScholarShipFeeValue').html('$'+data[15].trim());
	}
	
	if(data[3].trim()=='$0.00'){
		$('.editStage5DiscountEligible').hide();
	}else{
		$('.editStage5DiscountEligible').show();
	}
		
	$('.editStage5CourseFeeAfterScholarship').text(data[4].trim());
	$('.editStage5AmountPayable').text(data[16].trim());
		
	$('#editStage5RemainingAmount').text(data[6].trim());
	$('#editStage5InterestAmount').text(data[8].trim());
	$('.editStage5TotalCourseFee').text(data[9].trim());
	$('.editStage5InstallmentFee').text(data[10].trim());
	$('#editStage5QuartlyFee').text($("#"+radioId+" #originalStage5DiscountByPaymentMode").text().trim());
	$('.editStage5Registration').text(data[11].trim());
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
		$('#paypalAmount').val(data[16].trim());
		var wireTransferAmount = data[16].replace('$','');
		wireTransferAmount = wireTransferAmount.replace('.00','');
		wireTransferAmount = wireTransferAmount.replace(',','');
		wireTransferAmount = parseFloat(wireTransferAmount)+parseFloat('35.00');
		$('#wireTransferAmount').val('$'+wireTransferAmount.toFixed(2));
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

$(document).on("click","#nextSessionCourseModal #chkval", function(){
	if($("#chkval").is(":checked")){
		$("#payTabData").removeAttr("disabled");
	}else{
		$("#payTabData").attr("disabled", true);
	}
});

function backCourseSelection(pageNumber){
	if(pageNumber==1){
		displaySection1();
	}else if(pageNumber==2){
		displaySection2();
	}else if(pageNumber==3){
		displaySection3();
	}
}

function displaySection1(){
	$('#divNextSession').show();
	$('#divNextSessionCourseChoose').hide();
	$('#divNextSessionCourseReview').hide();
	$(".btn-finish").hide();
}
function displaySection2(){
	$('#divNextSession').hide();
	$('#divNextSessionCourseChoose').show();
	$('#divNextSessionCourseReview').hide();
	$(".btn-finish").hide();
}

function displaySection3(){
	$('#divNextSession').hide();
	$('#divNextSessionCourseChoose').hide();
	$('#divNextSessionCourseReview').show();
	$(".btn-finish").show();
}

function callSigninStudentPay(formId, callingFrom){
	$('#callPaymentStudentModal').modal({backdrop: 'static', keyboard: false})
	$('#payTabModal').modal('hide');
}
function callStudentTransferSubmit(paymentOption, callingFrom,paymentByUserId){
	
	var functionName='';
	var userId=$('#userId').val();
	if(paymentOption==1){
		if($("#wireTransferNumberPaypal").val()=='' || $("#wireTransferNumberPaypal").val()==undefined){
			showMessage(true, 'Reference Number is required');
			return false;
		}else{
			functionName="callStudentWireTransferPayment('1', '"+userId+"', 'student', '"+callingFrom+"', '"+paymentByUserId+"');"
		}
	}
	if(paymentOption==2){
		if($("#referenceNumber").val()=='' || $("#referenceNumber").val()==undefined){
			showMessage(true, 'Reference Number is required');
			return false;
		}else{
			functionName="callStudentWireTransferPayment('2', '"+userId+"','student', '"+callingFrom+"', '"+paymentByUserId+"' );"
		}
	}
	$('#proceedStudentPayment').attr("onclick",functionName);
	$('#cancelStudentPayment').attr("onclick"," $('#callPaymentStudentModal').modal({backdrop: 'static', keyboard: false});");
	$('#callPaymentStudentModal').modal('hide');
	$('#reference_number').modal('show');
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
	$('#cteSubjectModalNextSession').modal('hide');
	$('#creditCountCTE').val(totalCteCredit.toFixed(2));
	
}

function confirmAndContinueForNextSession(formId){
	$('#cteSubjectModalNextSession').modal('hide');
	getSelectedSubjects();
	getNextCourseDetails('nextSessionSubject','0','N',false);  
}
function getRequestForCTECourseDetailsForNextSession(formId) {
	var cteCourseDetailsinfoDTO = {};
	cteCourseDetailsinfoDTO['enrollmentType'] = $("#enrollmentType").val();
	cteCourseDetailsinfoDTO['standardId'] = $("#standardId").val();
	cteCourseDetailsinfoDTO['selectedSubjects'] = $("#selectedSubjects").val();
	cteCourseDetailsinfoDTO['previousSelectedSubjects'] = $('#previousSelectedSubjects').val();
	console.log('getRequestForCTECourseDetails  NEXT SESSION '+cteCourseDetailsinfoDTO);
	return cteCourseDetailsinfoDTO;
}

function getCTECourseCatalogueForNextSession(formId){
	
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForHTML('dashboard','student/cte-course-details-by-standard-id'),
		data :JSON.stringify(getRequestForCTECourseDetailsForNextSession(formId)),
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
        			$('#cteCourseCatalogueNextSession').html(htmlContent);
        			$('#cteSubjectModalNextSession').modal('show');
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

function activeSubjectForNextSession(subjectId){
	var subjectClass = $('#subject-id-'+subjectId).attr('class');
	if(subjectClass == 'selected-course'){
		$('#subject-id-'+subjectId).removeClass('selected-course');
	}else{
		$('#subject-id-'+subjectId).addClass('selected-course');
	}
}
function activeSubjectFromSearchForNextSession(){
	var subjectId= $('#class-cte-next-session').val();
	console.log("CTE Subject Id from search "+subjectId);
	activeSubjectForNextSession(subjectId);
}

function arrangeOrder(){
	$(".course-list-item").each(function(){
	    $(this).attr('style','grid-row-end: span '+Math.ceil((($(this).children().height()-2)/16)+1));
	});
}

function cancelCTESubjectModalForNextSession(formId) {
	
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForHTML('dashboard','student/cte-course-details-by-standard-id'),
		data :JSON.stringify(getRequestForCTECourseDetailsForNextSession(formId)),
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
        			$('#cteSubjectModalNextSession').modal('hide');
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
