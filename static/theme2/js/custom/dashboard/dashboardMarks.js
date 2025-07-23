$(document).ready(function() {

});
//ADD PROVIDERID 01-06-2020 BY VIPIN
function addSemesterMarks(formId, userId, studentId, semesterType,standardId,studentStandardId,studentSessionId, providerId) {
	hideMessage('');
	var postData = "studentStandardId="+studentStandardId+"&moduleId="+roleModuleId;
	$.ajax({
		type : "GET",
		url : getURLForHTML('dashboard','get-semester-marks'),
		data : postData,
		dataType : 'html',
		cache : false,
		timeout : 600000,
		success : function(htmlContent) {
			if(htmlContent!=""){
            	var stringMessage = [];
            	stringMessage = htmlContent.split("|");
        		if(stringMessage[0] == "FAILED" || stringMessage[0] == "EXCEPTION" || stringMessage[0] == "SESSIONOUT" ){
        			if(stringMessage[0] == "SESSIONOUT"){
        				redirectLoginPage();
        			}else {
        				showMessage(true, stringMessage[1]);
        			}
        		} else {
        			$('#semesterMarksUploadContents').html(htmlContent);
        		}
        		return false;
			}
		},
		error : function(e) {
			//showMessage(true, TECHNICAL_GLITCH);
			return false;
		}
	});
}

function requestForSaveSemesterData(formId, courseProviderId){
	var marksRepresentDTO = {};

	marksRepresentDTO['schoolId']=$('#'+formId+' #schoolId').val();
	marksRepresentDTO['userId']=$('#'+formId+' #userId').val();
	marksRepresentDTO['studentId']=$('#'+formId+' #studentId').val();
	marksRepresentDTO['standardId']=$('#'+formId+' #standardId').val();
	marksRepresentDTO['studentStandardId']=$('#'+formId+' #studentStandardId').val();
	marksRepresentDTO['studentSessionId']=$('#'+formId+' #studentSessionId').val();
	marksRepresentDTO['courseProviderId']=$('#'+formId+' #courseProviderId').val();
	marksRepresentDTO['studentName']=$('#'+formId+' #studentName').val();
	marksRepresentDTO['fatherName']=$('#'+formId+' #fatherName').val();
	marksRepresentDTO['motherName']=$('#'+formId+' #motherName').val();
	marksRepresentDTO['dob']=$('#'+formId+' #studentDob').val();
	marksRepresentDTO['programStatus']=$('#'+formId+' #programStatus').val();
	marksRepresentDTO['reasonFroLeaving']=$('#'+formId+' #reasonFroLeaving').val();
	marksRepresentDTO['sessionId']=$('#'+formId+' #sessionId').val();
	if($('#'+formId+' #progressionGrade').val()!=''){
		marksRepresentDTO['progressionGrade']=$('#'+formId+' #progressionGrade').val();
	}else{
		marksRepresentDTO['progressionGrade']=parseInt($('#'+formId+' #standardId').val())+1;
	}
	var semesterMarksDTO=[];

		if(editor1!=undefined){
			marksRepresentDTO['marksRemarks']=escapeCharacters(editor1.getData());
		}

	//marksRepresentDTO['marksRemarks']=$('#'+formId+' #marksRemarks').val();

	marksRepresentDTO['semesterGraduateDateT']=$('#'+formId+' #semesterBGraduateDate').val();
	marksRepresentDTO['semesterIssueDateT']=$('#'+formId+' #semesterBIssueDate').val();
	
	marksRepresentDTO['segment1Enable']=$('#'+formId+' #segment1Enable').prop("checked")?'Y':'N';
	marksRepresentDTO['segment2Enable']=$('#'+formId+' #segment2Enable').prop("checked")?'Y':'N';	

	var semesterMarksA={};
	var semesterMarks=[];
		$("#currentSemesterMarks tbody tr").each(function() {
			var marksDTO = {};
			marksDTO['courseType']=$(this).find(".courseType").val();
			marksDTO['marksId']=$(this).find(".marksId").val();
			marksDTO['subjectId']=$(this).find(".subjectId").val();
			var percentageObtained = $(this).find(".percentageObtained").val()
			marksDTO['cwMarks']=$(this).find(".gradeObtained").val();
			marksDTO['assessmentMarks']=$(this).find(".percentageObtained").val();
			marksDTO['obtainedMarks']=$(this).find(".courseProgress").val();
			marksDTO['totalMarks']=$(this).find(".totalMarkText").text();
			marksDTO['gradeCalculated']=$(this).find(".gradeCalculated").text();
			marksDTO['subjectCredit']=$(this).find(".subjectCredit").text();
			marksDTO['credits']=$(this).find(".credit").text();
			marksDTO['gpaCalculated']=$(this).find(".gpaCalculated").text();
			marksDTO['effectiveGpa']=$(this).find(".effectiveGpa").text();
			semesterMarks.push(marksDTO);
		});
		semesterMarksA['semesterMarks']=semesterMarks;
		semesterMarksDTO.push(semesterMarksA);
		var devAspectsMarks={};
		var devAspectMarks=[];
		$("#coScholasticTable tbody tr").each(function() {
			var devAspectsDTO = {};
			devAspectsDTO['devAspectId']=$(this).find(".devAspectId").attr('id');
			devAspectsDTO['remarks']=$(this).find(".devAspectRemarks").val();
			devAspectMarks.push(devAspectsDTO);
		});
		devAspectsMarks['devAspectMarks']=devAspectMarks
		semesterMarksDTO.push(devAspectsMarks);
		marksRepresentDTO['grandTotal']=$('#'+formId+' #cumulativeGrade').html();
		marksRepresentDTO['cumulativeGpa']=$('#'+formId+' #cumulativeGpa').html();
		marksRepresentDTO['resultStatus']=$('#'+formId+' #resultStatus').html();
		marksRepresentDTO['marks']=semesterMarksDTO;
	return marksRepresentDTO;
}

function saveSemesterMarks(formId, semSubjectStatus,roleModuleId){
	
	$('#transcriptErrMsg').text('');
	var validationType='all';
	var courseProvider = $('#'+formId+' #courseProviderId').val();
	var standardId =$('#'+formId+' #standardId').val();
	if(courseProvider != 36 || (courseProvider==36 && standardId != 17 && standardId != 11 && standardId != 12 && standardId != 13)){
		if(!$(".segment1Enable").prop("checked") && !$(".segment2Enable").prop("checked")){
			$('#transcriptErrMsg').text('Segment is mandatory.');
			$("body,html").animate({scrollTop: $("#transcriptErrMsg").offset().top - 70}, 800);
			return false;
		}
	}
	
	if(semSubjectStatus=='false'){
		if($('#'+formId+' #semesterBIssueDate').val()=='' || $('#'+formId+' #semesterBGraduateDate').val()==undefined){
			$('#transcriptErrMsg').text('Date of Issuance is mandatory.');
			$("body,html").animate({scrollTop: $("#transcriptErrMsg").offset().top - 70}, 800);
			return false;
		}

		if($('#'+formId+' #studentName').val()=="" || $('#'+formId+' #studentName').val()==undefined){
			$('#transcriptErrMsg').text('Student Name is mandatory.');
			 $("body,html").animate({scrollTop: $("#transcriptErrMsg").offset().top - 70}, 800);
			 return false;
		}
		if($('#'+formId+' #studentDob').val()=="" || $('#'+formId+' #studentDob').val()==undefined){
			$('#transcriptErrMsg').text('Student dob is mandatory');
			 $("body,html").animate({scrollTop: $("#transcriptErrMsg").offset().top - 70}, 800);
			 return false;
		}
		if($('#'+formId+' #fatherName').val()=="" || $('#'+formId+' #fatherName').val()==undefined){
			$('#transcriptErrMsg').text('Father Name is mandatory');
			 $("body,html").animate({scrollTop: $("#transcriptErrMsg").offset().top - 70}, 800);
			 return false;
		}
		if($('#'+formId+' #motherName').val()=="" || $('#'+formId+' #motherName').val()==undefined){
			$('#transcriptErrMsg').text('Mother Name is mandatory');
			 $("body,html").animate({scrollTop: $("#transcriptErrMsg").offset().top - 70}, 800);
			 return false;
		}
		if($('#'+formId+' #programStatus').val()=="" || $('#'+formId+' #programStatus').val()==undefined){
			$('#transcriptErrMsg').text('Please choose program status.');
			 $("body,html").animate({scrollTop: $("#transcriptErrMsg").offset().top - 70}, 800);
			 return false;
		}
		if($('#'+formId+' #standardId').val()!=3){
			if($('#'+formId+' #progressionGrade').val()=="" || $('#'+formId+' #progressionGrade').val()==undefined){
				$('#transcriptErrMsg').text('Grade for Progression is mandatory');
				 $("body,html").animate({scrollTop: $("#transcriptErrMsg").offset().top - 70}, 800);
				 return false;
			}
		}
		getGrandTotal();
		validationFlag = validateSemesterMarks('currentSemesterMarks', courseProviderId);
		if(!validationFlag){
			return false;
		}
	}
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForHTML('dashboard','save-semester-marks'),
		data : JSON.stringify(requestForSaveSemesterData(formId, courseProviderId )),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				if(data['status'] == '2'){
					redirectLoginPage();
				}else{
					$('#transcriptErrMsg').text(data['message']);
					 $("body,html").animate({scrollTop: $("#transcriptErrMsg").offset().top - 70}, 800);
				}
			} else {
				$('#transcriptErrMsg').text(data['message']);
				$("body,html").animate({scrollTop: $("#transcriptErrMsg").offset().top - 70}, 800);
				setTimeout(function(){hideMessage('');}, 3100);

			}
			return false;
		},
		error : function(e) {
			//showMessage(true, e.responseText);
			return false;
		}
	});
}

;function validateSemesterMarks(tableId, courseProviderId){
	// console.log('validateSemesterMarks :: '+tableId);
	var returnStatus=true;
	var position=1;
	var gradeCount=0;
	var percentageCount=0;
	var validEntryCount=0;
	var calculatePassingRuleStatus= true;
	var courseProviderIdVar= $("#courseProviderId").val();
	$("#"+tableId+ " tbody tr").each(function() {
		$(this).removeClass('tr-red');
		var cwWorkMarks = $(this).find(".gradeObtained").val();
		var credit= $(this).find(".credit").text();
		var totalMaxMarks  = $(this).find(".courseProgress").attr('data-totalMaxMarks');
		var minMarks  = $(this).find(".inputMark").attr('data-minmarks');
		var assessmentMarks = $(this).find(".percentageObtained").val();
		var ruleStatus=calculateSemesterPassingRule(tableId, position, true, courseProviderIdVar,credit,cwWorkMarks,assessmentMarks, totalMaxMarks, minMarks);
		// console.log('ruleStatus :: '+ruleStatus);
			if(ruleStatus){
				validEntryCount+=1;
			}
		//	if(!ruleStatus){
		//		if(calculatePassingRuleStatus){
		//			calculatePassingRuleStatus = false;
		//		}
		//	}

		position++;
	});

	if(validEntryCount==0){
	 	 $('#transcriptErrMsg').text('Please provide grades for atleast one course.');
		 $("body,html").animate({scrollTop: $("#transcriptErrMsg").offset().top}, 800);
		return false;
	}
	return calculatePassingRuleStatus;
}
//submitType==1 save & confirm
//submitType==2 save

function calculateSemesterPassingRule(tableId, position, errorMessage, courseProviderId, credit, cwMarks, assessmentMarks,totalMaxMarks, minMarks){
	var standardId =$('#studentSemesterMarksForm #standardId').val();
	$('#transcriptErrMsg').text('');
	// console.log('calculateSemesterPassingRule position: '+position);
	var obtainedMarks = Math.round((parseFloat(cwMarks)+parseFloat(assessmentMarks)).toFixed(1));
	$('#'+tableId+' #courseProgress-'+position).val(obtainedMarks);
	$('#'+tableId+' #tr-'+position).removeClass('tr-red');
	var courseType = $('#'+tableId+' #courseType-'+position).val();
	var marksId = $('#'+tableId+' #marksId-'+position).val();
	var subjectId = $('#'+tableId+' #subjectId-'+position).val();
	var percentageObtained = Math.round(((parseFloat(obtainedMarks)/parseFloat(totalMaxMarks))* 100).toFixed(1));
	if(($("#segment1Enable").is(":checked") && $("#segment2Enable").is(":checked")) || (courseProviderId==36 && (standardId == 17 || standardId == 11 || standardId == 12 || standardId == 13))){
		if((assessmentMarks != "" && assessmentMarks < minMarks ) || (cwMarks != '' && cwMarks < minMarks)){
			percentageObtained=0.0;
		}
	}
	var credit = credit;
	var checkCondition=true;
	var validationFlag=true;
	// console.log("credit=> ", credit);

	if((cwMarks=='' || cwMarks==undefined) && $("#segment1Enable").is(":checked")){
		validationFlag=false;
		if(errorMessage){
			if(standardId==17 || (standardId>10 && standardId<14)){
				$('#transcriptErrMsg').text( 'Please enter classwork marks');
			}else{
				$('#transcriptErrMsg').text( 'Please enter segment-1 marks');
			}
			$("body,html").animate({scrollTop: $("#transcriptErrMsg").offset().top - 70}, 800);
		}
	}
	if((assessmentMarks=='' || assessmentMarks==undefined) && $("#segment2Enable").is(":checked")){
		validationFlag=false;
		if(errorMessage){
			if(standardId==17 || (standardId>10 && standardId<14)){
				$('#transcriptErrMsg').text( 'Please enter assessment marks');
			}else{
				$('#transcriptErrMsg').text( 'Please enter segment-2 marks');
			}
			$("body,html").animate({scrollTop: $("#transcriptErrMsg").offset().top - 70}, 800);
		}
	}
	if(percentageObtained<60){
		$('#'+tableId+' #tr-'+position).addClass('tr-yellow1');
	}else{
		$('#'+tableId+' #tr-'+position).removeClass('tr-yellow1');
		$('#'+tableId+' #percentageObtained'+position).removeClass('tr-red');
	}

	if(checkCondition){
		if (parseFloat(obtainedMarks) < 0 ){
			validationFlag=false;
			if(errorMessage){
				$('#transcriptErrMsg').text('Obtained Marks cannot be less than 0');
				$("body,html").animate({scrollTop: $("#transcriptErrMsg").offset().top - 70}, 800);
			}
		}else if (parseFloat(obtainedMarks)>parseFloat(totalMaxMarks)){
			validationFlag=false;
			if(errorMessage){
				$('#transcriptErrMsg').text('Obtained Marks cannot be more than '+totalMaxMarks);
				$("body,html").animate({scrollTop: $("#transcriptErrMsg").offset().top - 70}, 800);
			}
		}

	}
	getSemesterGrade(tableId, courseType, percentageObtained, position, courseProviderId, credit );
	var needToCalCumuGrade = true;
	if(needToCalCumuGrade){
		getGrandTotal();
	}	
	return validationFlag;
}

//gradeType = 1 :: FULL-TIME-SUBJECT
//gradeType = 2 :: CREDIT-RECOVERY-SUBJECT
//gradeType = 3 :: Honors Course
function getSemesterGrade(tableId, courseType, percentage, position, courseProviderId, subjectCredit) {
	// console.log("getSemesterGrade=> ", courseProviderId);

	var gpa = "0.00";
	var grade = "F";
	var status = 'Completed';
	if(status=='Incomplete'){
		grade = "I";
	}else if(status=='-'){
		grade = "F";
	}else{
		// console.log('getSemesterGrade: courseType: '+ courseType+ ' percentage: '+percentage+' position: '+position);

		percentage = Math.round(percentage);
		// console.log('Round off percentge :: ',percentage)

		if(courseType == 'FT' || courseType == 'CR'|| courseType == 'ADV'){
			if(percentage>100){
				grade = "F";
				gpa = "0.00";
			}else if(percentage>=95.1){
				grade = "A+";
				gpa = 4.00;
			}else if(percentage>=92.1){
				grade = "A";
				gpa = 4.00;
			}else if(percentage>=88.1){
				grade = "A-";
				gpa = 3.70;
			}else if(percentage>=85.1){
				grade = "B+";
				gpa = 3.30;
			}else if(percentage>=82.1){
				grade = "B";
				gpa = 3.00;
			}else if(percentage>=78.1){
				grade = "B-";
				gpa = 2.70;
			}else if(percentage>=75.1){
				grade = "C+";
				gpa = 2.30;
			}else if(percentage>=72.1){
				grade = "C";
				gpa = 2.00;
			}else if(percentage>=68.1){
				grade = "C-";
				gpa = 1.70;
			}else if(percentage>=65.1){
				grade = "D+";
				gpa = 1.30;
			}else if(percentage>=62.1){
				grade = "D";
				gpa = 1.00;
			}else if(percentage>=59.1){
				grade = "D-";
				gpa = 0.70;
			}else{
				grade = "F";
				gpa = "0.00";
			}
		}else if(courseType == 'AP'){
			if(percentage>100){
				grade = "F";
				gpa = 1.00;
			}else if(percentage>=95.1){
				grade = "A+";
				gpa = 5.00;
			}else if(percentage>=92.1){
				grade = "A";
				gpa = 5.00;
			}else if(percentage>=88.1){
				grade = "A-";
				gpa = 4.70;
			}else if(percentage>=85.1){
				grade = "B+";
				gpa = 4.30;
			}else if(percentage>=82.1){
				grade = "B";
				gpa = 4.00;
			}else if(percentage>=78.1){
				grade = "B-";
				gpa = 3.70;
			}else if(percentage>=75.1){
				grade = "C+";
				gpa = 3.30;
			}else if(percentage>=72.1){
				grade = "C";
				gpa = 3.00;
			}else if(percentage>=68.1){
				grade = "C-";
				gpa = 2.70;
			}else if(percentage>=65.1){
				grade = "D+";
				gpa = 2.30;
			}else if(percentage>=62.1){
				grade = "D";
				gpa = 2.00;
			}else if(percentage>=59.1){
				grade = "D-";
				gpa = 1.70;
			}else{
				grade = "F";
				gpa = 1.00;
			}
		}else if(courseType == 'HON' || courseType == 'ADV'){
			if(percentage>100){
				grade = "F";
				gpa = 1.00;
			}else if(percentage>=95.1){
				grade = "A+";
				gpa = 4.50;
			}else if(percentage>=92.1){
				grade = "A";
				gpa = 4.50;
			}else if(percentage>=88.1){
				grade = "A-";
				gpa = 4.20;
			}else if(percentage>=85.1){
				grade = "B+";
				gpa = 3.80;
			}else if(percentage>=82.1){
				grade = "B";
				gpa = 3.50;
			}else if(percentage>=78.1){
				grade = "B-";
				gpa = 3.20;
			}else if(percentage>=75.1){
				grade = "C+";
				gpa = 2.80;
			}else if(percentage>=72.1){
				grade = "C";
				gpa = 2.50;
			}else if(percentage>=68.1){
				grade = "C-";
				gpa = 2.20;
			}else if(percentage>=65.1){
				grade = "D+";
				gpa = 1.80;
			}else if(percentage>=62.1){
				grade = "D";
				gpa = 1.50;
			}else if(percentage>=59.1){
				grade = "D-";
				gpa = 1.20;
			}else{
				grade = "F";
				gpa = 0.0;
			}
		}
	}
	
	$('#'+tableId+' #gradeCalculated-'+position).html(grade);
	$('#'+tableId+' #gpaCalculated-'+position).html(parseFloat(gpa).toFixed(1));
	if(grade=='F'){
		$('#'+tableId+' #credit-'+position).html('0.0');
		$('#'+tableId+' #effectiveGpa-'+position).html('0.0');
	}else{
		if(parseFloat(subjectCredit)<0.5){
			$('#'+tableId+' #credit-'+position).html(parseFloat(subjectCredit).toFixed(2));
		}else{
			$('#'+tableId+' #credit-'+position).html(parseFloat(subjectCredit).toFixed(1));
		}
		
		$('#'+tableId+' #effectiveGpa-'+position).html(parseFloat(parseFloat(gpa) * parseFloat(subjectCredit)).toFixed(2));
	}
	return grade;
}

function getGrandTotal(){
	var grandTotal=0.0;
	var standardId = $('#studentSemesterMarksForm #standardId').val();
	var maxTotalMarksOfCourse=0;
	var sumEffectiveGpa=0.0;
	var sumCredits=0.0;
	var numberofFailedSubject = 0;
	$("#currentSemesterMarks tbody tr").each(function() {
		grandTotal = parseFloat( parseFloat(grandTotal)+ parseFloat($(this).find(".courseProgress").val()));
		maxTotalMarksOfCourse = parseFloat( parseFloat(maxTotalMarksOfCourse)+ parseFloat($(this).find(".courseProgress").attr('data-totalMaxMarks')) );
		sumEffectiveGpa = parseFloat( parseFloat(sumEffectiveGpa)+ parseFloat($(this).find(".effectiveGpa").text()) );
		sumCredits = parseFloat( parseFloat(sumCredits)+ parseFloat($(this).find(".subjectCredit").text()));
		var minMarks = parseFloat($(this).find("input.percentageObtained").attr("data-minMarks"));
		var obtTotal = parseFloat($(this).find(".courseProgress").val());
		var total = parseFloat($(this).find(".courseProgress").attr('data-totalMaxMarks'));
		var coursePercentage = Math.round(((parseFloat(obtTotal)/parseFloat(total))*100).toFixed(1));
		// if($("#segment1Enable").is(":checked") && $("#segment2Enable").is(":checked")){
			if(($(this).find(".gradeObtained").val() != "" && $(this).find(".gradeObtained").val() < minMarks && $(this).find(".gradeObtained").val() > 0) || ($(this).find(".percentageObtained").val() != "" && $(this).find(".percentageObtained").val() < minMarks && $(this).find(".percentageObtained").val() > 0)){
				coursePercentage=0.0;
				$(this).addClass("tr-yellow1");
				if($(this).find("input.gradeObtained").val() < minMarks && $(this).find("input.gradeObtained").val() > 0){
					$(this).find("input.gradeObtained").addClass("tr-red");
				}else{
					$(this).find("input.gradeObtained").removeClass("tr-red");
				}
				if($(this).find("input.percentageObtained").val() < minMarks && $(this).find("input.percentageObtained").val() > 0){
					$(this).find("input.percentageObtained").addClass("tr-red");
				}else{
					$(this).find("input.percentageObtained").removeClass("tr-red");
				}
			}else{
				$(this).removeClass("tr-yellow1");
				$(this).find("input.gradeObtained, input.percentageObtained").removeClass("tr-red");
			}
		// }
		if(coursePercentage<60 ){
			numberofFailedSubject = numberofFailedSubject +1;
		}

	});
	$('#cumulativeGrade').html(Math.round(parseFloat(grandTotal).toFixed(1))+ '/'+maxTotalMarksOfCourse);
	if($('#cumulativeGrade').text()=='NaN'){
	 $('#cumulativeGrade').html('');
	}
	$('#cumulativeGpa').html(parseFloat(parseFloat(sumEffectiveGpa)/parseFloat(sumCredits)).toFixed(2));
	if($('#cumulativeGpa').text()=='NaN'){
	 $('#cumulativeGpa').html('0.0');
	}
	//var percentObtained = ((parseFloat(grandTotal)/parseFloat(maxTotalMarksOfCourse))*100).toFixed(1);
	if(numberofFailedSubject >0){
		$('#resultStatus').text('Fail').addClass("text-danger");
	}else{
		$('#resultStatus').text('Pass').removeClass("text-danger");
	}

}

function publishSemesterMarks(payload){
	$('#publishSemestermarks').attr('disabled','disabled');
	$.ajax({
		type : "POST",
		url : getURLForHTML('dashboard','publish-student-semester-transcript'),
		data : 'payload='+payload,
		dataType : 'html',
		cache : false,
		timeout : 600000,
		success : function(htmlContent) {
			alert("Student Transcript has been published on student dashboard");
			$('#publishSemestermarks').hide();
		},
		error : function(e) {
			$('#sendSWPR').removeAttr('disabled','disabled');
			//showMessage(true, TECHNICAL_GLITCH);
			return false;
		}
	});
}



function checkObtainedGrade(tableId, elementId ,position, minMarks, credit, totalMaxMarks, maxMarks){
	var courseProvider = $("#courseProviderId").val();
	var standardId = $("#standardId").val();
	if(courseProvider != 36 || (courseProvider==36 && standardId != 17 && standardId != 11 && standardId != 12 && standardId != 13)){
		if(!$("#segment1Enable").is(":checked") || !$("#segment2Enable").is(":checked")){
			if(totalMaxMarks != maxMarks){
				totalMaxMarks=totalMaxMarks/2;
				credit=credit/2;
			}
		}else{
			if($("#segment1Enable").is(":checked") && $("#segment2Enable").is(":checked")){
				if((totalMaxMarks <100 && credit == "0.5" && maxMarks == "50") || (totalMaxMarks <50 && credit == "0.25" && maxMarks == "25")){
					totalMaxMarks=totalMaxMarks*2;
					credit=credit*2;
				}
			}
		}
	}
	
	
	var standardId =$('#studentSemesterMarksForm #standardId').val();
	$('#'+tableId+' #'+elementId+'-'+position).removeClass('tr-red');

	if($('#'+tableId+' #'+elementId+'-'+position).val()!='' && $('#'+tableId+' #'+elementId+'-'+position).val()<minMarks){
		$('#'+tableId+' #'+elementId+'-'+position).addClass('tr-red');
	}
	if($('#'+tableId+' #gradeObtained-'+position).val() != ""){
		var cwMarks = Math.round(parseFloat($('#'+tableId+' #gradeObtained-'+position).val()));
	}else{
		cwMarks=0;
	}
	if($('#'+tableId+' #percentageObtained-'+position).val() != ""){
		var assessmentMarks = Math.round(parseFloat($('#'+tableId+' #percentageObtained-'+position).val()));
	}else{
		assessmentMarks=0;
	}
	
	
	
	if (cwMarks < 0 ){
				if(standardId==17 || (standardId>10 && standardId<14)){
					$('#transcriptErrMsg').text('Obtained Class Work Marks cannot be less than 0');
				}else{
					$('#transcriptErrMsg').text('Obtained Segment-1 Marks cannot be less than 0');
				}
				$("body,html").animate({scrollTop: $("#transcriptErrMsg").offset().top - 70}, 800);
				$('#'+tableId+' #'+elementId+'-'+position).addClass('tr-red');
				return false;

		}else if (cwMarks>parseFloat(maxMarks)){
				if(standardId==17 || (standardId>10 && standardId<14)){
					$('#transcriptErrMsg').text('Obtained Class Work Marks cannot be more than '+maxMarks);
				}else{
					$('#transcriptErrMsg').text('Obtained Segment-1 Marks cannot be more than '+maxMarks);
				}

				$("body,html").animate({scrollTop: $("#transcriptErrMsg").offset().top - 70}, 800);
				$('#'+tableId+' #'+elementId+'-'+position).addClass('tr-red');
				$('#'+tableId+' #'+elementId+'-'+position).val('');
				return false;

		}

		if (assessmentMarks < 0 ){
				if(standardId==17 || (standardId>10 && standardId<14)){
					$('#transcriptErrMsg').text('Obtained Assessment Marks cannot be less than 0');
				}else{
					$('#transcriptErrMsg').text('Obtained Segment-2 Marks cannot be less than 0');
				}

				$("body,html").animate({scrollTop: $("#transcriptErrMsg").offset().top - 70}, 800);
				$('#'+tableId+' #'+elementId+'-'+position).addClass('tr-red');
				return false;

		}else if (assessmentMarks>parseFloat(maxMarks)){
				if(standardId==17 || (standardId>10 && standardId<14)){
						$('#transcriptErrMsg').text('Obtained Assessment Marks cannot be more than '+maxMarks);
				}else{
						$('#transcriptErrMsg').text('Obtained Segment-2 Marks cannot be more than '+maxMarks);
				}

				$("body,html").animate({scrollTop: $("#transcriptErrMsg").offset().top - 70}, 800);
				$('#'+tableId+' #'+elementId+'-'+position).addClass('tr-red');
				$('#'+tableId+' #'+elementId+'-'+position).val('');
				return false;

		}
	$('#'+tableId+' #gradeObtained-'+position).val(cwMarks);
	$('#'+tableId+' #percentageObtained-'+position).val(assessmentMarks);
	calculateSemesterPassingRule(tableId, position, true, 36,credit,cwMarks,assessmentMarks, totalMaxMarks,minMarks);
}

function submitPreSemesterMark(formId,moduleId) {
	hideMessage('');
	if(!validateRequestForPreSemesterMark(formId,moduleId)){
		return false;
	}
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForHTML('dashboard','pre-grade-submit'),
		data : JSON.stringify(getRequestForPreSemesterMark(formId, moduleId)),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				showMessageTheme2(0, data['message'],'', false);
			} else {
				showMessageTheme2(1, data['message'],'', false);
				$('#'+formId)[0].reset();
				location.reload();
			}
			return false;
		},
		error : function(e) {
			//showMessage(true, e.responseText);
			return false;
		}
	});
}

function getRequestForPreSemesterMark(formId,moduleId){
	var request = {};
	var authentication = {};
	var requestData = {};
	var marksRepresentDTO = {};
	marksRepresentDTO['schoolId'] = $("#"+formId+" #schoolId").val();
	marksRepresentDTO['studentStandardId'] = $("#"+formId+" #studentStandardId").val();
	marksRepresentDTO['studentId'] = $("#"+formId+" #studentId").val();

	marksRepresentDTO['standardId'] = $("#"+formId+" #standardId").val();
	marksRepresentDTO['gradeCalculated'] = $("#"+formId+" #gradeCalculated").val();
	marksRepresentDTO['gpaCalculated'] = $("#"+formId+" #gpaCalculated").val();
	marksRepresentDTO['preMarksId']  = $("#"+formId+" #marksPreGradeId").val();
	requestData['marksRepresentDTO'] = marksRepresentDTO;
	authentication['hash'] = getHash();authentication['schoolId'] = SCHOOL_ID;authentication['schoolUUID'] = SCHOOL_UUID;
	authentication['userType'] = moduleId;
	authentication['userId'] = $("#"+formId+" #userId").val();
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	return request;
}

function validateRequestForPreSemesterMark(formId){
	var standardId = $("#"+formId+" #standardId").val();
	var gradeCalculated = $("#"+formId+" #gradeCalculated").val();
	var gpaCalculated = $("#"+formId+" #gpaCalculated").val();
	if(standardId==''){
		showMessageTheme2(0, 'Please select standard','', false);
		return false;
	}
	if(gradeCalculated==''){
		showMessageTheme2(0, 'Please select grade Calculated','', false);
		return false;
	}

	if(gpaCalculated==''){
		showMessageTheme2(0, 'Please enter gpa','', false);
		return false;
	}


	return true;
}

function removePreGrade(preGradeId){
		//;
		hideMessage('');
		if(preGradeId==''){
			return false;
		}
		$.ajax({
			type : "POST",
			contentType : "application/json",
			url : getURLForHTML('dashboard','remove-pre-grade-marks'),
			data : JSON.stringify(getRequestForRemovePreGrade(preGradeId)),
			dataType : 'json',
			cache : false,
			//timeout : 600000,
				success : function(data) {
					if (data['status'] == '0' || data['status'] == '2') {
						showMessageTheme2(0, data['message'],'', false);
					} else {
						showMessageTheme2(1, data['message'],'', false);
						location.reload();
					}
					return false;
			},
			error : function(e) {
				//showMessage(true, e.responseText);
			}
		});
	}


	function getRequestForRemovePreGrade(preGradeId){
		var request = {};
		var authentication = {};
		var requestData = {};
		var marksRepresentDTO = {}
		marksRepresentDTO['preMarksId'] = preGradeId;
		requestData['marksRepresentDTO'] = marksRepresentDTO;
		authentication['hash'] = getHash();authentication['schoolId'] = SCHOOL_ID;authentication['schoolUUID'] = SCHOOL_UUID;
		authentication['userType'] = moduleId;
		authentication['userId'] = $("#userId").val();
		request['authentication'] = authentication;
		request['requestData'] = requestData;
		return request;
	}


	function callForBackStageTranscript(studentStandardId) {
		if (studentStandardId == null || studentStandardId == undefined || studentStandardId == '') {
			showMessage(false, 'Student StandardId is mandatory');
			return false;
		}
		$.ajax({
			type : "POST",
			url : getURLForHTML('dashboard','go-backstage-transcript?studentStandardId='+studentStandardId),
			contentType : "application/json",
			dataType : 'html',
			success : function(htmlContent) {
				if (htmlContent != "") {
					var obj = JSON.parse(htmlContent);
					if (obj.statusResponse.status == "FAILED"
							|| obj.statusResponse.status == "EXCEPTION"
							|| obj.statusResponse.status == "SESSIONOUT") {
						if(obj.statusResponse.status == "SESSIONOUT"){
							redirectLoginPage();
						}else {
							setTimeout(function(){$('#backStageTranscriptMessageDiv').show();
							$('#backStageTranscriptMessage').html(obj.statusResponse.message);}, 3000);
						}
					}else if(obj.statusResponse.status == "SUCCESS"){
						setTimeout(function(){$('#backStageTranscriptMessageDiv').show();
						$('#backStageTranscriptMessage').html(obj.statusResponse.message);}, 3000);
					}
					return false;
				}
			},
			error : function(e) {
				// console.log(true, e.responseText);
			}
		});
	}
function saveSemesterMarksEntirets(formId,roleModuleId){

	$('#transcriptErrMsg').text('');
	var validationType='all';
	var courseProviderId = $('#'+formId+' #courseProviderId').val();
	
		if($('#'+formId+' #semesterBIssueDate').val()=='' || $('#'+formId+' #semesterBGraduateDate').val()==undefined){
			$('#transcriptErrMsg').text('Date of Issuance is mandatory.');
			 $("body,html").animate({scrollTop: $("#transcriptErrMsg").offset().top - 70}, 800);
			return false;
		}

		if($('#'+formId+' #studentName').val()=="" || $('#'+formId+' #studentName').val()==undefined){
			$('#transcriptErrMsg').text('Student Name is mandatory.');
			 $("body,html").animate({scrollTop: $("#transcriptErrMsg").offset().top - 70}, 800);
			 return false;
		}
		if($('#'+formId+' #studentDob').val()=="" || $('#'+formId+' #studentDob').val()==undefined){
			$('#transcriptErrMsg').text('Student dob is mandatory');
			 $("body,html").animate({scrollTop: $("#transcriptErrMsg").offset().top - 70}, 800);
			 return false;
		}
		if($('#'+formId+' #fatherName').val()=="" || $('#'+formId+' #fatherName').val()==undefined){
			$('#transcriptErrMsg').text('Father Name is mandatory');
			 $("body,html").animate({scrollTop: $("#transcriptErrMsg").offset().top - 70}, 800);
			 return false;
		}
		if($('#'+formId+' #motherName').val()=="" || $('#'+formId+' #motherName').val()==undefined){
			$('#transcriptErrMsg').text('Mother Name is mandatory');
			 $("body,html").animate({scrollTop: $("#transcriptErrMsg").offset().top - 70}, 800);
			 return false;
		}
		if($('#'+formId+' #programStatus').val()=="" || $('#'+formId+' #programStatus').val()==undefined){
			$('#transcriptErrMsg').text('Please choose program status.');
			 $("body,html").animate({scrollTop: $("#transcriptErrMsg").offset().top - 70}, 800);
			 return false;
		}
		if($('#'+formId+' #standardId').val()!=3){
			if($('#'+formId+' #progressionGrade').val()=="" || $('#'+formId+' #progressionGrade').val()==undefined){
				$('#transcriptErrMsg').text('Grade for Progression is mandatory');
				 $("body,html").animate({scrollTop: $("#transcriptErrMsg").offset().top - 70}, 800);
				 return false;
			}
		}
		if(editor1.getData().replace(/<[^>]*>/g, '').length>200){
			$('#transcriptErrMsg').text('Segment - 1 Remarks should not be more than 200 characters');
			$("body,html").animate({scrollTop: $("#transcriptErrMsg").offset().top - 70}, 800);
			return false;
		}
		if(editor2.getData().replace(/<[^>]*>/g, '').length>200){
			$('#transcriptErrMsg').text('Segment - 2 Remarks should not be more than 200 characters');
			$("body,html").animate({scrollTop: $("#transcriptErrMsg").offset().top - 70}, 800);
			return false;
		}
	
	
	editor1.getData()
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForHTML('dashboard','save-semester-marks-entirets'),
		data : JSON.stringify(requestForSaveSemesterDataForEntirets(formId, courseProviderId )),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				if(data['status'] == '2'){
					$('#transcriptErrMsg').text(data['message']);
					 $("body,html").animate({scrollTop: $("#transcriptErrMsg").offset().top - 70}, 800);
				}else{
					$('#transcriptErrMsg').text(data['message']);
					 $("body,html").animate({scrollTop: $("#transcriptErrMsg").offset().top - 70}, 800);
				}
			} else {
				$('#transcriptErrMsg').text(data['message']);
				$("body,html").animate({scrollTop: $("#transcriptErrMsg").offset().top - 70}, 800);
				setTimeout(function(){hideMessage('');}, 3100);

			}
			return false;
		},
		error : function(e) {
			//showMessage(true, e.responseText);
			return false;
		}
	});
}

function requestForSaveSemesterDataForEntirets(formId, courseProviderId){
	var entiretsTranscriptDetails = {};
	entiretsTranscriptDetails['schoolId']=$('#'+formId+' #schoolId').val();
	entiretsTranscriptDetails['userId']=$('#'+formId+' #userId').val();
	entiretsTranscriptDetails['studentId']=$('#'+formId+' #studentId').val();
	entiretsTranscriptDetails['standardId']=$('#'+formId+' #standardId').val();
	entiretsTranscriptDetails['studentStandardId']=$('#'+formId+' #studentStandardId').val();
	entiretsTranscriptDetails['sessionId']=$('#'+formId+' #sessionId').val();
	entiretsTranscriptDetails['courseProviderId']=$('#'+formId+' #courseProviderId').val();
	entiretsTranscriptDetails['studentName']=$('#'+formId+' #studentName').val();
	entiretsTranscriptDetails['fatherName']=$('#'+formId+' #fatherName').val();
	entiretsTranscriptDetails['motherName']=$('#'+formId+' #motherName').val();
	entiretsTranscriptDetails['dateOfBirth']=$('#'+formId+' #studentDob').val();
	entiretsTranscriptDetails['programStatus']=$('#'+formId+' #programStatus').val();
	entiretsTranscriptDetails['reasonFroLeaving']=$('#'+formId+' #reasonFroLeaving').val();
	if($('#'+formId+' #progressionGrade').val()!=''){
		entiretsTranscriptDetails['progressionGrade']=$('#'+formId+' #progressionGrade').val();
	}else{
		entiretsTranscriptDetails['progressionGrade']=parseInt($('#'+formId+' #standardId').val())+1;
	}
	var observations=[];
	if(editor1.getData()!=''){
		var seg1Remarks = escapeCharacters(editor1.getData());
		observations.push(seg1Remarks);
	}else{
		observations.push('');
	}
	if(editor2.getData()!=''){
		var seg2Remarks = escapeCharacters(editor2.getData());		
		observations.push(seg2Remarks);
	}else{
		observations.push('');
	}
	entiretsTranscriptDetails['remarks']=observations;
	
	entiretsTranscriptDetails['segment1Enable']=$('#'+formId+' #segment1Enable').prop("checked")?'Y':'N';
	entiretsTranscriptDetails['segment2Enable']=$('#'+formId+' #segment2Enable').prop("checked")?'Y':'N';	
	entiretsTranscriptDetails['semesterGraduateDateT']=$('#'+formId+' #semesterBGraduateDate').val();
	entiretsTranscriptDetails['semesterIssueDateT']=$('#'+formId+' #semesterBIssueDate').val();
	
	var courses=[]; //semesterMarksDTO=[];
	//var semesterMarksA={};
	 //semesterGrades=[];
		$("#entiretsMarks tbody tr.gradable").each(function() {
			var entiretsSegmentGrade = {};
			entiretsSegmentGrade['entityType']=$(this).attr("entityType");
			entiretsSegmentGrade['entityId']=$(this).attr("entityId");
			entiretsSegmentGrade['includeInTranscript']=$(this).find(".includeInTranscript").val();
			var segment1Grades=[];
			$(this).children("td").find(".segment1Tbl .segGrades td").each(function(){
				var grades = $(this).find(".gradeDropdown").val();
				if(grades=='N'){
					segment1Grades.push('');
				}else{
					segment1Grades.push(grades);
				}
			});
			var segment2Grades=[];
			$(this).children("td").find(".segment2Tbl .segGrades td").each(function(){
				var grades = $(this).find(".gradeDropdown").val();
				if(grades=='N'){
					segment2Grades.push('');
				}else{
					segment2Grades.push(grades);
				}
				
			});
			entiretsSegmentGrade['segemnt1grades']=segment1Grades
			entiretsSegmentGrade['segemnt2grades']=segment2Grades
			courses.push(entiretsSegmentGrade);
		});
		entiretsTranscriptDetails['courses']=courses;
		entiretsTranscriptDetails['resultStatus']=$('#'+formId+' #resultStatus').val();
	return entiretsTranscriptDetails;
}
var gradeObtained = [];
var percentageObtained = [];
function enabledDisabledSegment(changeSegmentId,segmentId, eleClass){
	if($("#"+changeSegmentId).is(":checked")){
		$("."+eleClass).attr("disabled",false);
		if($("#"+segmentId).is(":checked")){
			$("#currentSemesterMarks tbody tr").each(function(i){
				if(gradeObtained.length>0 && gradeObtained[i] != undefined){
					// $(this).find(".gradeObtained").val(gradeObtained[i] == 0?'0.0':gradeObtained[i]);	
				}
				if(percentageObtained.length>0 && percentageObtained[i] != undefined){
					// $(this).find(".percentageObtained").val(percentageObtained[i] == 0?'0.0':percentageObtained[i]);
				}
				if(parseInt($(this).find(".totalMarkText").text())>0){

				}
				if(parseInt($(this).find(".totalMarkText").text())>0){
					$(this).find(".totalMarkText").text(parseFloat($(this).find(".totalMarkText").text())+parseFloat($(this).find("."+eleClass).text()));
					var totalmaxmarks = $(this).find(".totalMarkText").parent().find(".courseProgress").attr("data-totalmaxmarks");
					$(this).find(".totalMarkText").parent().find(".courseProgress").attr("data-totalmaxmarks", parseFloat(totalmaxmarks)*2);
				}
				
				$(this).find(".courseProgress").val(Math.round(parseFloat($(this).find(".courseProgress").val())) + Math.round(parseFloat($(this).find("."+eleClass).val())))
				$(this).find(".subjectCredit").text((parseFloat($(this).find(".percentageObtained").attr("data-credit"))*2).toFixed(1));
				$(this).find(".percentageObtained").attr("data-credit", (parseFloat($(this).find(".percentageObtained").attr("data-credit"))*2).toFixed(1));
				
				console.log(i+"checked", $(this).find("."+eleClass).attr("data-credit"))
				if(parseInt($(this).find(".percentageObtained").val())>0){
					$("#percentageObtained-"+(i+1)).trigger("blur");
				}else{
					getGrandTotal()
				}
				if(parseInt($(this).find(".gradeObtained").val())>0){
					$("#gradeObtained-"+(i+1)).trigger("blur");
				}else{
					getGrandTotal()
				}
			});
		}
	}else{
		if($("#"+segmentId).is(":checked")){
			gradeObtained=[];
			percentageObtained=[];
			$("#currentSemesterMarks tbody tr").each(function(i){
				if(parseInt($(this).find(".percentageObtained").val())>0){
					percentageObtained.push(parseInt($(this).find(".percentageObtained").val()))
				}else{
					percentageObtained.push(0);
				}
				if(parseInt($(this).find(".gradeObtained").val())>0){
					gradeObtained.push(parseInt($(this).find(".gradeObtained").val()))
				}else{
					gradeObtained.push(0);
				}
				if(gradeObtained.length>0 && gradeObtained[i] != undefined){
					// $(this).find(".gradeObtained").val(gradeObtained[i] == 0?'0.0':gradeObtained[i]);	
				}
				if(percentageObtained.length>0 && percentageObtained[i] != undefined){
					// $(this).find(".percentageObtained").val(percentageObtained[i] == 0?'0.0':percentageObtained[i]);
				}
				if(parseInt($(this).find(".totalMarkText").text())>0){
					$(this).find(".totalMarkText").text(parseFloat($(this).find(".totalMarkText").text())-parseFloat($(this).find("."+eleClass).text()));
					var totalmaxmarks = $(this).find(".totalMarkText").parent().find(".courseProgress").attr("data-totalmaxmarks");
					$(this).find(".totalMarkText").parent().find(".courseProgress").attr("data-totalmaxmarks", parseFloat(totalmaxmarks)/2);
				}
				$(this).find(".courseProgress").val(Math.round(parseFloat($(this).find(".courseProgress").val())) - Math.round(parseFloat($(this).find("."+eleClass).val())))
				$(this).find("."+eleClass).attr("disabled",true);
				$(this).find("."+eleClass).val("0.0");
				// console.log(i+"sadf",$(this).find("."+eleClass).attr("data-credit"))
				if($(this).find(".percentageObtained").attr("data-credit")<1.0){
					
					$(this).find(".subjectCredit").text((parseFloat($(this).find(".percentageObtained").attr("data-credit"))/2).toFixed(2));
					$(this).find(".percentageObtained").attr("data-credit", (parseFloat($(this).find(".percentageObtained").attr("data-credit"))/2).toFixed(2));
				}else{
					$(this).find(".subjectCredit").text((parseFloat($(this).find(".percentageObtained").attr("data-credit"))/2).toFixed(1));
					$(this).find(".percentageObtained").attr("data-credit", (parseFloat($(this).find(".percentageObtained").attr("data-credit"))/2).toFixed(1));
				}
				
				if(changeSegmentId == "segment1Enable"){
					if(parseInt($("#percentageObtained-"+(i+1)).val())>0){
						$("#percentageObtained-"+(i+1)).trigger("blur");
					}else{
						getGrandTotal()
					}
				}else{
					if(parseInt($("#gradeObtained-"+(i+1)).val())>0){
						$("#gradeObtained-"+(i+1)).trigger("blur");
					}else{
						getGrandTotal()
					}
				}
				$(this).find("."+eleClass).removeClass("tr-red");
			});
			
		}else{
			$("."+eleClass).attr("disabled",false);
			$("#"+changeSegmentId).prop("checked",true);
			$('#transcriptErrMsg').text('Segment is mandatory.');
			$("body,html").animate({scrollTop: $("#transcriptErrMsg").offset().top - 70}, 800);
			return false;
		}
		
	}	
}

function enabledDisabledSegmentEntireTS(changeSegmentId,segmentId, eleClass){
	if($("#"+changeSegmentId).is(":checked")){
		$("."+eleClass).attr("disabled",false);
		if($("#"+segmentId).is(":checked")){
			$("."+eleClass).attr("disabled",false);
		}
	}else{
		if($("#"+segmentId).is(":checked")){
			$("#entiretsMarks tbody tr").each(function(){
				$(this).find("."+eleClass).prop("disabled",true);
			});
		}else{
			$("."+eleClass).attr("disabled",false);
			$("#"+changeSegmentId).prop("checked",true);
			$('#transcriptErrMsg').text('Segment is mandatory.');
			$("body,html").animate({scrollTop: $("#transcriptErrMsg").offset().top - 70}, 800);
			return false;
		}
	}	
}
