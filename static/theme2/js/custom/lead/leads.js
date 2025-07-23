
$(function () {
        $('[data-toggle="tooltip"]').tooltip()
    });

function validateRequestForLeadSave(formId, newTheme, leadFrom){
	hideMessage('');
	var flag=true;
	if(leadFrom=='leadlist'){
		if ($("#"+formId+" #leadUpdateSource").val()==null || $("#"+formId+" #leadUpdateSource").val()=='0') {
			if(newTheme){
					showMessageTheme2(0, "Please select Lead Source",'',true);
				}else{
					showMessage(true, "Please select Lead Source");
				}
			return false;
		}
	}else if(leadFrom=='dashboard'){
		if ($("#"+formId+" #leadSource").val()==null || $("#"+formId+" #leadSource").val()=='0') {
			if(newTheme){
					showMessageTheme2(0, "Please select Lead Source",'',true);
				}else{
					showMessage(true, "Please select Lead Source");
				}
			return false;
		}
		if ($("#"+formId+" #phoneNo").val()==null || $("#"+formId+" #phoneNo").val()=='') {
			if(newTheme){
				showMessageTheme2(0, "Please enter phone no",'',true);
			}else{
				showMessage(true, "Please enter phone no");
			}
			return false;
		}
		if ($("#"+formId+" #leadAssignTo").val()==null || $("#"+formId+" #leadAssignTo").val()==0) {
			if(newTheme){
				showMessageTheme2(0, 'Please select Lead Assigned To','',true);
			}else{
				showMessage(true, 'Please select Lead Assigned To');
			}
			return false;
		}
	}else{
	
		if ($("#"+formId+" #leadSource").val()==null || $("#"+formId+" #leadSource").val()=='0') {
			if(newTheme){
					showMessageTheme2(0, "Please select Lead Source",'',true);
				}else{
					showMessage(true, "Please select Lead Source");
				}
			return false;
		}
		if($("#"+formId+" #leadSource").val()==5){
			if ($("#"+formId+" #leadDemoAssign").val()==null || $("#"+formId+" #leadDemoAssign").val()==0) {
				if(newTheme){
					showMessageTheme2(0, "Please choose Demo Assigned to",'',true);
				}else{
					showMessage(true, "Please choose Demo Assigned to");
				}
				return false;
			}
		}
		if($("#"+formId+" #demoSessionDateTime").val()!=null && $("#"+formId+" #demoSessionDateTime").val()!=''){
			if ($("#"+formId+" #leadDemoAssign").val()==null || $("#"+formId+" #leadDemoAssign").val()==0) {
				if(newTheme){
					showMessageTheme2(0, "Please choose Demo Assigned to",'',true);
				}else{
					showMessage(true, "Please choose Demo Assigned to");
				}
				return false;
			}
		}
		
		if($("#"+formId+" #leadSource").val()==14){
			if ($("#"+formId+" #leadOthers").val()==null || $("#"+formId+" #leadOthers").val()==0) {
				if(newTheme){
					showMessageTheme2(0, "Please Mention other lead source",'',true);
				}else{
					showMessage(true, "Please Mention other lead source");
				}
				return false;
			}
		}
		if ($("#"+formId+" #leademailId").val()==null || $("#"+formId+" #leademailId").val()=='') {
			if(newTheme){
				showMessageTheme2(0, "Please fill Email ID",'',true);
			}else{
				showMessage(true, "Please fill Email ID");
			}
			return false;
		}
		if (!validateEmail($("#"+formId+" #leademailId").val())) {
			if(newTheme){
				showMessageTheme2(0, "Email is either empty or invalid",'',true);
			}else{
				showMessage(true, "Email is either empty or invalid");
			}
			return false
		}
		if ($("#"+formId+" #isdCode").val()==null || $("#"+formId+" #isdCode").val()=='0') {
			if(newTheme){
				showMessageTheme2(0, "Please choose ISD Code",'',true);
			}else{
				showMessage(true, "Please choose ISD Code");
			}
			return false;
		}
		if ($("#"+formId+" #phoneNo").val()==null || $("#"+formId+" #phoneNo").val()=='') {
			if(newTheme){
				showMessageTheme2(0, "Please enter phone no",'',true);
			}else{
				showMessage(true, "Please enter phone no");
			}
			return false;
		}
		if ($("#"+formId+" #leadDate").val()==null || $("#"+formId+" #leadDate").val()=='') {
			if(newTheme){
				showMessageTheme2(0, "Please choose lead Date",'',true);
			}else{
				showMessage(true, "Please choose lead Date");
			}
			return false;
		}
		if ($("#"+formId+" #leadstdfname").val()==null || $("#"+formId+" #leadstdfname").val()=='') {
			
			if(newTheme){
				showMessageTheme2(0, "Please enter Student's First Name",'',true);
			}else{
				showMessage(true, "Please enter Student's First Name");
			}
			return false;
		}

		if ($("#"+formId+" #leadGrade").val()==null || $("#"+formId+" #leadGrade").val()=='') {
			if(newTheme){
				showMessageTheme2(0, 'Please choose grade','',true);
			}else{
				showMessage(true, 'Please choose grade');
			}
			return false;
		}
		if ($("#"+formId+" #leadStatus").val()==null || $("#"+formId+" #leadStatus").val()=='') {
			if(newTheme){
				showMessageTheme2(0, 'Please choose Lead Status','',true);
			}else{
				showMessage(true, 'Please choose Lead Status');
			}
			return false;
		}
		if ($("#"+formId+" #leadAssignTo").val()==null || $("#"+formId+" #leadAssignTo").val()==0) {
			if(newTheme){
				showMessageTheme2(0, 'Please select Lead Assigned To','',true);
			}else{
				showMessage(true, 'Please select Lead Assigned To');
			}
			return false;
		}
		if ($("#"+formId+" #leadPriority").val()==null || $("#"+formId+" #leadPriority").val()=='') {
			if(newTheme){
				showMessageTheme2(0, 'Please select Lead Priority','',true);
			}else{
				showMessage(true, 'Please select Lead Priority');
			}
			return false;
		}
		if ($("#"+formId+" #leadRemark").val()==null || $("#"+formId+" #leadRemark").val()=='') {
			
			if(newTheme){
				showMessageTheme2(0, 'Please fill Lead Remarks','',true);
			}else{
				showMessage(true, 'Please fill Lead Remarks');
			}
			return false;
		}
	}
	
	return flag;
}
function submitLeads(formId, roleModuleId, leadFrom, newTheme, leadFrom) {
	console.log("submitLeads", leadFrom);
	if(newTheme){
				hideMessageTheme2('');
			}else{
				hideMessage('');
			}
	if(!validateRequestForLeadSave(formId, newTheme, leadFrom)){
		return false;
	}
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLFor('leads','save-leads-form-data'),
		data : JSON.stringify(getRequestForLeadSave(formId, leadFrom)),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		success : function(data) {
			if (data['status'] == 'FAILED' || data['status'] == 'EXCEPTION' || data['status'] == 'SESSIONOUT' ) {
				if(newTheme){
					showMessageTheme2(0, data['message'],'',true);
				}else{
					showMessage(true, data['message']);
				}
			} else {
				if(newTheme){
					if(leadFrom=='leadlist'){
						window.location.reload();
					}else{
						showMessageTheme2(1, data['message'],'',true);
						setTimeout(function(){
							window.close();
						}, 2000);
					}
					
				}else{
					showMessage(false, data['message']);
					$('#'+formId)[0].reset();
					setTimeout(function(){
						if(leadFrom=='dashboard'){
							$("#addNewLeadModal").modal('hide');
							$(".modal-backdrop").remove();
							var urlSend = CONTEXT_PATH+UNIQUEUUID+'/dashboard/lead-data-list?moduleId='+moduleId+'&leadFrom=LEAD&clickFrom=list&currentPage=0&euid='+ENCRYPTED_USER_ID
							window.open(urlSend, '_blank');
							customLoader(false)
						}else{
							if(newTheme){ 
								window.location.reload();
							}else{
								callForDashboardData('formIdIfAny','lead-list?moduleId='+roleModuleId+'&leadFrom='+leadFrom+'&clickFrom=list&currentPage=0');
							}
						}
					}, 800);
				}
				
			}
			return false;
		},
		error : function(e) {
			//showMessage(true, e.responseText);
			return false;
		}
	});
}
function getRequestForLeadSave(formId, leadFrom){
	var leadAddFormRequestDTO = {};
	var authentication = {};
	var leadCommonDTO = {};

	var leadModifyDTO = {};
	var leadStudentDetailDTO = {};
	var leadModifyDetailDTO = {};
	var leadDemoInfo = {};

	leadModifyDetailDTO['isUserWise'] = false;
	leadModifyDetailDTO['isLeadSearch'] = false;
	if(leadFrom=='leadlist'){
		leadModifyDTO['leadSource'] =$("#leadUpdateSource").val();
		leadModifyDTO['leadId'] = $("#leadUpdateId").val();
		leadModifyDTO['leadDataFrom']='leadlist';
	}else if(leadFrom=='dashboard'){
		leadStudentDetailDTO['isdCode'] = $("#isdCode option:selected").val();
		leadStudentDetailDTO['phoneNo'] = $("#phoneNo").val();
		leadStudentDetailDTO['gurdianFname'] = $("#leadGuardfname").val();
		leadModifyDetailDTO['countrolType'] = 'add';
		leadModifyDTO['leadSource'] =$("#leadSource").val();
		leadModifyDTO['assignTo'] = $("#leadAssignTo").val();
		leadModifyDTO['leadStatus']='Assigned Working'
		leadModifyDTO['leadDataFrom']='dashboard';
}else{
	leadModifyDTO['parentleadId'] = $("#parentleadId").val();
	leadModifyDTO['leadId'] = $("#leadId").val();
	leadModifyDTO['leadNo'] =$("#leadNo").val();
	leadModifyDTO['academicId'] =$("#academicId").val();
	leadModifyDTO['rawLeadId'] =$("#rawLeadId").val();
	leadModifyDTO['leadSource'] =$("#leadSource").val();
	leadModifyDTO['leadOthers'] = $("#leadOthers").val();
	leadModifyDTO['leadAddName'] = $("#leadAdder").val();
	leadModifyDTO['leadDate'] = $("#leadDate").val();
	leadModifyDTO['leadMsg'] = escapeCharacters($("#leadStdMsg").val());
	leadModifyDTO['leadStatus'] = $("#leadStatus").val();
	leadModifyDTO['assignTo'] = $("#leadAssignTo option:selected").val();
	leadModifyDTO['mergeLeadsId'] = $("#mergeLeads").val();
	leadModifyDTO['assignName'] = $.trim($("#leadAssignTo option:selected").text().split("-")[0]);
	//leadCommonDTO['leadMailerLiteGroupName'] = $("#leadSourceGroup").val();

	leadModifyDetailDTO['countrolType'] = $("#countrolType").val();
	leadModifyDetailDTO['priority'] = $("#leadPriority").val();
	leadModifyDetailDTO['remarks'] = $("#leadRemark").val();

	leadStudentDetailDTO['stdDob'] = $("#leadDOB").val();
	leadStudentDetailDTO['gender'] = $("#leadGender option:selected").val();
	leadStudentDetailDTO['email'] = $("#leademailId").val();
	leadStudentDetailDTO['isdCode'] = $("#isdCode option:selected").val();
	leadStudentDetailDTO['phoneNo'] = $("#phoneNo").val();
	leadStudentDetailDTO['emailAlternet'] = $("#leademailAlternet").val();
	leadStudentDetailDTO['isdCodeAlter'] = $("#isdCodeAlter option:selected").val();
	leadStudentDetailDTO['phoneNoAlter'] = $("#phoneNoAlter").val();
	leadStudentDetailDTO['stdFname'] = $("#leadstdfname").val();
	leadStudentDetailDTO['stdMname'] = $("#leadstdmname").val();
	leadStudentDetailDTO['stdLname'] = $("#leadstdlname").val();
	leadStudentDetailDTO['standard'] = $("#leadGrade option:selected").val();
	leadStudentDetailDTO['gurdianFname'] = $("#leadGuardfname").val();
	leadStudentDetailDTO['gurdianMname'] = $("#leadGuardmname").val();
	leadStudentDetailDTO['gurdianLname'] = $("#leadGuardlname").val();
	leadStudentDetailDTO['country'] = $("#countryId option:selected").val();
	leadStudentDetailDTO['state'] = $("#stateId option:selected").val();
	leadStudentDetailDTO['city'] = $("#cityId option:selected").val();
	leadStudentDetailDTO['address'] = $("#leadAdd").val();
	leadStudentDetailDTO['pincode'] = $("#leadPin").val();

	leadDemoInfo['leadAssignUserEmail'] = $.trim($("#leadAssignTo option:selected").text().split("-")[1].replace("(","").replace(")","")); 
	leadDemoInfo['demoSessionDateTime'] = $("#demoSessionDateTime").val();
	leadDemoInfo['demoAssignTo'] = $('#leadDemoAssign option:selected').val();
	
}
if($("#leadSupportTo").val()=='' &&  $("#leadSupportTo").val()==undefined){
	leadModifyDTO['leadSupportTo'] = 0;
}else{
	leadModifyDTO['leadSupportTo'] = $("#leadSupportTo").val();
}
	leadCommonDTO['leadModifyDTO']=leadModifyDTO;
	leadCommonDTO['leadModifyDetailDTO']=leadModifyDetailDTO;
	leadCommonDTO['leadStudentDetailDTO']=leadStudentDetailDTO;
	leadCommonDTO['leadDemoInfo']=leadDemoInfo;

	authentication['hash'] = getHash();authentication['schoolId'] = SCHOOL_ID;authentication['schoolUUID'] = SCHOOL_UUID;
	authentication['userId'] = $("#leadAdderId").val();
	authentication['userType'] = 'COMMON';
	leadAddFormRequestDTO['leadCommonDTO'] = leadCommonDTO;
	leadAddFormRequestDTO['authentication'] = authentication;
	return leadAddFormRequestDTO;
}


function leadFollowup(leadId, roleModuleId){
	$.ajax({
		type : "POST",
		url : getURLForHTML('dashboard','lead-followup'),
		data : {leadId:leadId,moduleId:roleModuleId},
		dataType : 'html',
		success : function(htmlContent) {
			if (htmlContent != "") {
				var stringMessage = [];
				stringMessage = htmlContent.split("|");
				if (stringMessage[0] == "FAILED" || stringMessage[0] == "EXCEPTION" || stringMessage[0] == "SESSIONOUT") {
					showMessage(true, stringMessage[1]);
				} else {
        			$('#followupContent').html(htmlContent)
        			$("#followupform").modal('show');
					$('.followCall').css( "display", "none" );
					$('.followMail').css( "display", "none" );
					$('.iNotSure').css( "display", "none" );
					$('.heNotSure').css( "display", "none" );
					$('.meetingSlotsDate').css( "display", "none" );
        			$("#followupform").modal('show');
        			//$("#li"+leadId).remove();
				}
				return false;
			}
			return false;
		}
	});
}


function validateRequestForLeadFollowupSave(formId, newTheme){
	if(newTheme){
		hideMessageTheme2('');
	}else{
		hideMessage('');
	}
	
	$('.errorLeadCls').css( "display", "none" );
	$('#errorMessageLead').html('');
	var flag=true;

	if ($("#"+formId+" #followMed").val()=='Mail') {
		if ($("#"+formId+" #mailSentDate").val()==undefined || $("#"+formId+" #mailSentDate").val()=='') {
			//showMessage(true, 'Enter mail sent date');
			$('.errorLeadCls').fadeIn();
			setTimeout(function (){
				$('.errorLeadCls').fadeOut();
			}, 5000)
			
			if(newTheme){
				showMessageTheme2(0, 'Enter mail sent date','',true);
			}else{
				$('#errorMessageLead').html('Enter mail sent date');
			}
			return false;
		}
		if ($("#"+formId+" #followupRemarks").val()==undefined || $("#"+formId+" #followupRemarks").val()=='') {
			$('.errorLeadCls').fadeIn();
			setTimeout(function (){
				$('.errorLeadCls').fadeOut();
			}, 5000)
			
			if(newTheme){
				showMessageTheme2(0, 'Enter follow up remarks','',true);
			}else{
				$('#errorMessageLead').html('Enter follow up remarks');
			}
			return false;
		}
	}else if ($("#"+formId+" #followMed").val()=='Call') {
		if ($("#"+formId+" #callscheduleDate").val()==undefined || $("#"+formId+" #callscheduleDate").val()=='') {
			$('.errorLeadCls').fadeIn();
			setTimeout(function (){
				$('.errorLeadCls').fadeOut();
			}, 5000)
			if(newTheme){
				showMessageTheme2(0, 'Enter follow up last call','',true);
			}else{
				$('#errorMessageLead').html('Enter follow up last call');
			}
			return false;
		}
		if ($("#"+formId+" #callWith").val()==undefined || $("#"+formId+" #callWith").val()=='') {
			$('.errorLeadCls').fadeIn();
			setTimeout(function (){
				$('.errorLeadCls').fadeOut();
			}, 5000)
			
			if(newTheme){
				showMessageTheme2(0, 'Select follow up last call with','',true);
			}else{
				$('#errorMessageLead').html('Select follow up last call with');
			}
			return false;
		}
		
		if ($("#"+formId+" #callStatus").val()=='interested') {
			if ($("#"+formId+" #interestedFor").val()=='Demo Request') {
				if($("#demoStatus").val()==0){
					if ($("#"+formId+" #bookMeeetingDate").val()==undefined || $("#"+formId+" #bookMeeetingDate").val()=='') {
						//showMessage(true, 'Please select a booked meeting date');
						$('.errorLeadCls').fadeIn();
						setTimeout(function (){
							$('.errorLeadCls').fadeOut();
						}, 5000)
						$('#errorMessageLead').html('Please select a booked meeting date');
						return false;
					}
					if($("input[name='slotTime']:checked").val()==undefined){
						//showMessage(true, 'Please select any one Slot.');
						$('.errorLeadCls').fadeIn();
						setTimeout(function (){
							$('.errorLeadCls').fadeOut();
						}, 5000)
						if(newTheme){
							showMessageTheme2(0, 'Please select any one Slot.','',true);
						}else{
							$('#errorMessageLead').html('Please select any one Slot.');
						}
						return false;
					}
					
				}
			}
		}
		
//		if($("#verifyCall").val()!=undefined){
//			if($("#teamMemberRemark").val()==''){
//				$('.errorLeadCls').fadeIn();
//				setTimeout(function (){
//					$('.errorLeadCls').fadeOut();
//				}, 5000)
//				$('#errorMessageLead').html('Please fill team member feedback');
//				return false;
//			}
//			
//			
//		}
		
//			if ($("#"+formId+" #callscheduleDate").val()==null || $("#"+formId+" #callscheduleDate").val()=='') {
//				showMessage(true, 'Enter call schedule Date');
//				flag=false;
//			}
//			if ($("#"+formId+" #callStatus").val()==null || $("#"+formId+" #callStatus").val()=='') {
//				showMessage(true, 'Please choose call Status');
//				flag=false;
//			}
	}
	if ($("#"+formId+" #selectStatusOfLead").val()==undefined || $("#"+formId+" #selectStatusOfLead").val()=='') {
			$('.errorLeadCls').fadeIn();
			setTimeout(function (){
				$('.errorLeadCls').fadeOut();
			}, 5000)
			if(newTheme){
				showMessageTheme2(0, 'Please select followup status.','',true);
			}else{
				$('#errorMessageLead').html('Please select followup status.');
			}
			return false;
		}
	return flag;
}
function submitLeadFollowupSave(formId,roleModuleId, leadFrom, newTheme) {
	console.log("submitLeadFollowupSave");
	$('.errorLeadCls').css( "display", "none" );
	$('.errorLeadCls').removeClass('success');
	$('#errorMessageLead').html('');
	hideMessageTheme2('');
	//hideMessage('');
	if(!validateRequestForLeadFollowupSave(formId, newTheme)){
		return false;
	}
	
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLFor('leads','save-leads-followup'),
		data : JSON.stringify(getRequestForLeadFollowupSave(formId)),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				//showMessage(true, data['message']);
				if(newTheme){
					showMessageTheme2(0, data['message'],'',true);
				}else{
					$('.errorLeadCls').css( "display", "block" );
					$('#errorMessageLead').html(data['message']);
				}
				return false;
			} else {
				//showMessage(false, data['message']);
				
				if(newTheme){
					showMessageTheme2(1, data['message'],'',false);
					window.close();
				}else{
					$('.errorLeadCls').css( "display", "block" );
					$('.errorLeadCls').addClass('success');
					$('#errorMessageLead').html(data['message']);
				}
				
				getPendingNotCall();
				setTimeout(function(){ 
					$("#followupform").modal('hide');
				}, 300);
				setTimeout(function(){ 
					if(newTheme){
						window.reload();
					}else{
						callForDashboardData('formIdIfAny','lead-list?moduleId='+roleModuleId+'&leadFrom='+leadFrom+'&clickFrom=list&currentPage=0');
						$("body").removeClass("modal-open");
					}
					
				}, 250);
			}
			return false;
		},
		error : function(e) {
			//showMessage(true, e.responseText);
			return false;
		}
	});
}
function getRequestForLeadFollowupSave(formId){
	console.log("getRequestForLeadFollowupSave");
	var leadAddFormRequestDTO = {};
	var authentication = {};
	var leadCommonDTO = {};
	var leadModifyDTO={};
	var leadCallFollowupDTO={};
	var leadDemoInfo={};
	
	leadModifyDTO['leadId'] = $("#leadId").val();
	leadCallFollowupDTO['followupBy'] =$("#followMed").val();
	if($("#callscheduleDate").val()!=''){
		leadCallFollowupDTO['callscheduleDate'] = $("#callscheduleDate").val()+' '+$("#scheduleHours").val()+':'+$("#scheduleMins").val();
	}else{
		leadCallFollowupDTO['callscheduleDate']='';
	}
	
	leadCallFollowupDTO['followRemarks'] = $("#followupRemarks").val();
	leadCallFollowupDTO['followupRemarkBy'] = $("#followupRemarkBy").val();
	leadCallFollowupDTO['callStatus'] = $("#callStatus").val();
	
	leadCallFollowupDTO['toCall'] = $("#callWith").val();
	leadCallFollowupDTO['callHrs'] = $("#callHours").val();
	leadCallFollowupDTO['callMins'] = $("#callMins").val();
	//leadCommonDTO['callBadge'] = $('input[name="callBadge"]:checked').val();
	
	leadCallFollowupDTO['callVerify'] = $("#verifyCall").val();
	leadCallFollowupDTO['superRemark'] = $("#teamMemberRemark").val();
	leadCallFollowupDTO['leadFollowStatus'] = $("#selectStatusOfLead").val();
	if($("#selectStatusOfLead").val()=='Interested in Enrollment'){
		leadCallFollowupDTO['callBadge'] ='followup1'
	}
	if($("#selectStatusOfLead").val()=='Share details over WhatsApp/e-mail'){
		leadCallFollowupDTO['callBadge'] ='followup2'
	}
	if($("#selectStatusOfLead").val()=='Need time'
		|| $("#selectStatusOfLead").val()=='Exploring more option'
		|| $("#selectStatusOfLead").val()=='High Fee/ Affordability Issue'
		|| $("#selectStatusOfLead").val()=='Call Back Request'
		|| $("#selectStatusOfLead").val()=='Issue with school timing'
		|| $("#selectStatusOfLead").val()=='Not answered from last 3 calls'
		|| $("#selectStatusOfLead").val()=='Other'
		||$("#selectStatusOfLead").val()=='Not Answering/ Not reachable/ Switch off' ){
			leadCallFollowupDTO['callBadge'] ='followup3';
		}
		
	if($("#selectStatusOfLead").val()=='Not answered from last 5  calls'
	 	|| $("#selectStatusOfLead").val()=='Age Constraint'
		|| $("#selectStatusOfLead").val()=='Language Barrier'
		|| $("#selectStatusOfLead").val()=='Looking for Job'
		|| $("#selectStatusOfLead").val()=='Looking for business proposal – B2B Lead'
		|| $("#selectStatusOfLead").val()=='Looking for higher GRADE'
		|| $("#selectStatusOfLead").val()=='Invalid lead'
		|| $("#selectStatusOfLead").val()=='Looking for an online coaching class'
		|| $("#selectStatusOfLead").val()=='Not interested'
		|| $("#selectStatusOfLead").val()=='Duplicate lead'){
			leadCallFollowupDTO['callBadge'] ='red';
		}
		if($("#selectStatusOfLead").val()=='Demo Needed'){
			leadCallFollowupDTO['callBadge'] ='yellow';
		}
		if($("#selectStatusOfLead").val()=='Admission Fee Paid'){
			leadCallFollowupDTO['callBadge'] ='darkgreen';
		}
		if($("#selectStatusOfLead").val()=='Tuition Fee Paid'){
			leadCallFollowupDTO['callBadge'] ='green';
		}
	
	if($("#notSureCallscheduleDate").val()!=''){
		leadCallFollowupDTO['notSureCallscheduleDate'] = $("#notSureCallscheduleDate").val()+' '+$("#notSureHours").val()+':'+$("#notSureMins").val();
	}else{
		leadCallFollowupDTO['notSureCallscheduleDate']='';
	}
	leadCallFollowupDTO['interestedFor'] = $("#interestedFor").val();
	

	if ($("#"+formId+" #interestedFor").val()=='Demo Request'){
		leadDemoInfo['meetingDate'] =$("input[name='slotTime']:checked").attr('slotDateAttr');
		leadDemoInfo['meetingSlotId'] = $("input[name='slotTime']:checked").attr('slotidattr');
		leadDemoInfo['meetingSlotTime'] = $("input[name='slotTime']:checked").val();
		leadDemoInfo['countryTimezoneId'] = ($("#" + formId + " #countryTimezoneId").val()).trim();
		leadDemoInfo['campaignName'] = "Request-demo";
	}

	leadCommonDTO['leadModifyDTO'] = leadModifyDTO;
	leadCommonDTO['leadCallFollowupDTO'] = leadCallFollowupDTO;
	leadCommonDTO['leadDemoInfo'] = leadDemoInfo;

	authentication['hash'] = getHash();authentication['schoolId'] = SCHOOL_ID;authentication['schoolUUID'] = SCHOOL_UUID;
	authentication['userId'] = $("#leadAdderId").val();
	authentication['userType'] = 'COMMON';
	leadAddFormRequestDTO['authentication'] = authentication;
	leadAddFormRequestDTO['leadCommonDTO'] = leadCommonDTO;
	return leadAddFormRequestDTO;
}

function sendMailLeadFollowupSave(leadId, roleModuleId, leadFrom, userId, newTheme) {
	
	if(newTheme){
		hideMessageTheme2('');
	}else{
		hideMessage('');
	}
	
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLFor('leads','send-mail-followup'),
		data : JSON.stringify(getRequestForLeadFollowupSendMailSave(leadId, userId)),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				if(newTheme){
					showMessageTheme2(0, data['message'],'',true);
				}else{
					showMessage(true, data['message']);
				}
				
				
			} else {
				if(newTheme){
					showMessageTheme2(1, data['message'],'',false);
				}else{
					showMessage(false, data['message']);
					callForDashboardData('formIdIfAny','lead-list?moduleId='+roleModuleId+'&leadFrom='+leadFrom+'&clickFrom=list&currentPage=0');
				
				}
				//$(".modal-backdrop").remove();
			}
			return false;
		},
		error : function(e) {
			//showMessage(true, e.responseText);
			return false;
		}
	});
}
function getRequestForLeadFollowupSendMailSave(leadId, userId){
	var leadAddFormRequestDTO = {};
	var authentication = {};
	var leadCommonDTO = {};
	
	leadCommonDTO['leadId'] =leadId;
	leadCommonDTO['followupBy'] ="Mail";
	authentication['hash'] = getHash();authentication['schoolId'] = SCHOOL_ID;authentication['schoolUUID'] = SCHOOL_UUID;
	authentication['userId'] = userId;
	authentication['userType'] = 'COMMON';
	leadAddFormRequestDTO['authentication'] = authentication;
	leadAddFormRequestDTO['leadCommonDTO'] = leadCommonDTO;
	return leadAddFormRequestDTO;
}


function leadFollowupActivityLogs(leadId, roleModuleId, logType){
	$.ajax({
		type : "POST",
		url : getURLForHTML('dashboard','lead-activity-logs'),
		data : {leadId:leadId,moduleId:roleModuleId,logType:logType},
		dataType : 'html',
		success : function(htmlContent) {
			if (htmlContent != "") {
				var stringMessage = [];
				stringMessage = htmlContent.split("|");
				if (stringMessage[0] == "FAILED" || stringMessage[0] == "EXCEPTION" || stringMessage[0] == "SESSIONOUT") {
					showMessage(true, stringMessage[1]);
				} else {
					if(logType=='editLog'){
						$('#tblLeadEditLog').html(htmlContent)
						$("#editLogsTab").css( "display", "block" );
						$("#followupLogsTab").css( "display", "none" );
					}else{
						$('#tblLeadFollowLog').html(htmlContent);
						$("#followupLogsTab").css( "display", "block" );
						$("#editLogsTab").css( "display", "none" );
					}
        			
				}
				return false;
			}
			return false;
		}
	});
}

function demoRequestAccept(requestDemoId, roleModuleId, userId, controlType, demoType) {
	console.log("leads");
	hideMessage('');
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLFor('leads','demo-request-accepted'),
		data : JSON.stringify(getRequestForDemoRequestAcceptSave(requestDemoId, userId, controlType)),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		success : function(data) {
			if (data['status'] == "FAILED" || data['status'] == "EXCEPTION" || data['status'] == "SESSIONOUT") {
				showMessage(true, data['message']);
			} else {
				showMessage(false, data['message']);
				if(demoType=='pool'){
					setTimeout(function(){callDashboardPageSchool(roleModuleId,'request-demo');}, 3000);
				}else if(demoType=='accept'){
					callDashboardPageSchool(roleModuleId,'accept-demo-list');
				}
				//$(".modal-backdrop").remove();
			}
			return false;
		},
		error : function(e) {
			//showMessage(true, e.responseText);
			return false;
		}
	});
}
function getRequestForDemoRequestAcceptSave(requestDemoId, userId, controlType){
	var leadAddFormRequestDTO = {};
	var authentication = {};
	var leadCommonDTO = {};
	
	leadCommonDTO['rawLeadId'] =requestDemoId;
	leadCommonDTO['controlType'] =controlType;
	authentication['hash'] = getHash();authentication['schoolId'] = SCHOOL_ID;authentication['schoolUUID'] = SCHOOL_UUID;
	authentication['userId'] = userId;
	authentication['userType'] = 'COMMON';
	leadAddFormRequestDTO['authentication'] = authentication;
	leadAddFormRequestDTO['leadCommonDTO'] = leadCommonDTO;
	return leadAddFormRequestDTO;
}


/*api-for-free-slot-list*/
function validateRequestLeadFreeSlotList(formId){
	hideMessage('');
	if ($("#"+formId+" #bookMeeetingDate").val()==null || $("#"+formId+" #bookMeeetingDate").val()=='') {
		showMessage(true, 'Please select book meeting date');
		return false;
	}
	return true;
}
function showLeadFreeSlotList(formId,roleModuleId) {
	hideMessage('');
	if(!validateRequestLeadFreeSlotList(formId)){
		return false;
	}
	var meetingDate = $('#'+formId+' #bookMeeetingDate').val();
	var countryTimezoneId=$('#'+formId+' #countryTimezoneId').val();
	var lat = "";
	var lon = "";
	var requestType = "REQUESTDEMO";
	var book = "Y";
	
	$.ajax({
		type : "POST",
		url : getURLForHTML('dashboard','lead-free-slot-list'),
		data : {moduleId:roleModuleId,date:meetingDate,countryTimezoneId:countryTimezoneId,lat:lat,lon:lon,requestType:requestType,book:book},
		dataType : 'html',
		success : function(htmlContent) {
			if(htmlContent!=""){
            	var stringMessage = [];
            	stringMessage = htmlContent.split("|");
        		if(stringMessage[0] == "FAILED" || stringMessage[0] == "EXCEPTION" || stringMessage[0] == "SESSIONOUT" ){
        			showMessage(true, stringMessage[1]);
        			$('#freeSlotList').html('');
        		} else {
        			$('#freeSlotList').html(htmlContent);
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

function discardRawDemoData(leadsource, leadRawId, roleModuleId, userId) {
	hideMessage('');
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLFor('leads','lead-raw-list-discard-request'),
		data : JSON.stringify(getRequestForDiscardRawDemoData(leadsource, leadRawId,userId)),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				showMessage(true, data['message']);
			} else {
				showMessage(false, data['message']);
				setTimeout(function(){
					callDashboardPageSchool(roleModuleId,'raw-lead-list');
				}, 3000);
				//$(".modal-backdrop").remove();
			}
			return false;
		},
		error : function(e) {
			//showMessage(true, e.responseText);
			return false;
		}
	});
}
function getRequestForDiscardRawDemoData(leadsource, leadRawId,userId){
	var rawLeadDiscardRequestDTO = {};
	var authentication = {};
	var rawDiscardDTO = {};
	
	rawDiscardDTO['leadSourceId'] =leadRawId;
	rawDiscardDTO['leadSourceName'] =leadsource;
	rawDiscardDTO['userId'] =userId;
	
	authentication['hash'] = getHash();
	authentication['userId'] = userId;
	authentication['userType'] = 'COMMON';
	rawLeadDiscardRequestDTO['authentication'] = authentication;
	rawLeadDiscardRequestDTO['rawDiscardDTO'] = rawDiscardDTO;
	return rawLeadDiscardRequestDTO;
}


//function getRequestForLeadFreeSlotList(formId){
//	var leadFreeSlotRequestDTO = {};
//	var authentication = {};
//	var apiFreeSlotDTO = {};
//	
//	apiFreeSlotDTO['meetingDate'] = $('#'+formId+' #bookMeeetingDate').val();
//	apiFreeSlotDTO['countryTimezoneId'] =$('#'+formId+' #countryTimezoneId').val();
//	apiFreeSlotDTO['lat'] = "";
//	apiFreeSlotDTO['lon'] = "";
//	apiFreeSlotDTO['requestType'] = "REQUESTDEMO";
//	apiFreeSlotDTO['book'] = "Y";
//	
//	authentication['hash'] = getHash();authentication['schoolId'] = SCHOOL_ID;authentication['schoolUUID'] = SCHOOL_UUID;
//	authentication['userId'] = $("#leadAdderId").val();
//	authentication['userType'] = 'COMMON';
//	leadFreeSlotRequestDTO['authentication'] = authentication;
//	leadFreeSlotRequestDTO['apiFreeSlotDTO'] = apiFreeSlotDTO;
//	return leadFreeSlotRequestDTO;
//}

/*api-for-free-slot-list*/

function discardLeadsData(leadId, roleModuleId, leadFrom, leadSourceFrom, userId, newTheme) {
	
	if(newTheme){
		hideMessageTheme2('');
	}else{
		hideMessage('');
	}
	
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLFor('leads','lead-discard-request'),
		data : JSON.stringify(getRequestForDiscardLeadsData(leadId, leadFrom, leadSourceFrom, userId)),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				if(newTheme){
					showMessageTheme2(0, data['message'],'',true);
				}else{
					showMessage(true, data['message']);
				}
				
			} else {
				if(newTheme){
					showMessageTheme2(1, data['message'],'',false);
					location.reload();
				}else{
					showMessage(false, data['message']);
					setTimeout(function(){
						callForDashboardData('formIdIfAny','lead-list?moduleId='+roleModuleId+'&leadFrom='+leadFrom+'&clickFrom=list&currentPage=0');
					}, 3000);
				}
			}
			return false;
		},
		error : function(e) {
			//showMessage(true, e.responseText);
			return false;
		}
	});
}
function getRequestForDiscardLeadsData(leadId, leadFrom, leadSourceFrom, userId){
	var leadAddFormRequestDTO = {};
	var authentication = {};
	var leadCommonDTO = {};
	var leadModifyDTO={};
	var leadModifyDetailDTO={};
	
	leadModifyDTO['leadId'] =leadId;
	leadModifyDetailDTO['clickFrom'] =leadFrom;
	leadModifyDTO['leadSourceName'] =leadSourceFrom;

	leadCommonDTO['leadModifyDTO'] = leadModifyDTO;
	leadCommonDTO['leadModifyDetailDTO'] = leadModifyDetailDTO;

	authentication['hash'] = getHash();authentication['schoolId'] = SCHOOL_ID;authentication['schoolUUID'] = SCHOOL_UUID;
	authentication['userId'] = userId;
	authentication['userType'] = 'COMMON';
	leadAddFormRequestDTO['authentication'] = authentication;
	leadAddFormRequestDTO['leadCommonDTO'] = leadCommonDTO;
	return leadAddFormRequestDTO;
}


function feedbackLeadsData(leadStatus, leadId, remarks, remarkBy, userId) {
	hideMessage('');
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLFor('leads','lead-update-remarks'),
		data : JSON.stringify(getRequestForRemarkLeadsData(leadStatus, leadId, remarks, remarkBy, userId)),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				showMessage(true, data['message']);
			} else {
				//showMessage(false, data['message']);
//				setTimeout(function(){
//					callForDashboardData('formIdIfAny','lead-list?moduleId='+roleModuleId+'&leadFrom='+leadFrom);
//				}, 3000);
			}
			return false;
		},
		error : function(e) {
			//showMessage(true, e.responseText);
			return false;
		}
	});
}
function getRequestForRemarkLeadsData(leadStatus, leadId, remarks, remarkBy, userId){
	var leadAddFormRequestDTO = {};
	var authentication = {};
	var leadCommonDTO = {};
	
	leadCommonDTO['id'] =leadId;
	leadCommonDTO['superRemark'] =remarks;
	leadCommonDTO['callVerify'] =leadStatus;
	leadCommonDTO['superRemarkBy'] =remarkBy;
	authentication['hash'] = getHash();authentication['schoolId'] = SCHOOL_ID;authentication['schoolUUID'] = SCHOOL_UUID;
	authentication['userId'] = userId;
	authentication['userType'] = 'COMMON';
	leadAddFormRequestDTO['authentication'] = authentication;
	leadAddFormRequestDTO['leadCommonDTO'] = leadCommonDTO;
	return leadAddFormRequestDTO;
}


function getPendingNotCall(){
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLFor('leads','send-lead-notcall-cron'),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		async:false,
		success : function(data) {
			if(data!=""){
				//console.log(data.leadCommonDTO);
				$('.custom_modal_wrapper').addClass('show-wrapper');
				$('.custom-modal ul').empty();
				var htmlVar="";
				$.each(data.leadCommonDTO, function(k, v) {
					htmlVar = htmlVar + " <li class=\"modal_item\" id=\"li"+v.leadId+"\" style=\"top:0\">";
					htmlVar = htmlVar + " <p class=\"message\">Lead Source.: "+v.leadSourceName+"<br/>Lead no.: "+v.leadNo+"<br/>Grade: "+v.standardName+"<br/>Student name: "+v.stdFname+"<br/>Phone No: "+v.isdCode+" "+v.phoneNo+"<br/>Next Call: "+v.notSureCallscheduleDateString+"<br/></p>";
					htmlVar = htmlVar + " <div class=\"input-wrapper\">";
					htmlVar = htmlVar + " <button type=\"button\" class=\"submit-btn\" onclick=\"leadFollowup("+v.leadId+", 111);\">Call</button>";
					htmlVar = htmlVar + " </div></li>";
				});
				$('.custom-modal ul').append(htmlVar);
				$('.custom-modal ul').addClass('show-item');
				return false;
			}
		}
	});
}


function advanceLeadSearchStudent(formId, moduleId, leadFrom, clickFrom, currentPage, typeTheme, newTheme, callbadge) {
	customLoader(true);
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForHTML('dashboard','advance-lead-search-content'),
		data : JSON.stringify(getCallRequestForAdvanceLeadSearchStudent(formId, moduleId, leadFrom, clickFrom, currentPage, typeTheme, newTheme, callbadge)),
		dataType : 'html',
		async:false,
		success : function(htmlContent) {
			customLoader(false);
			if(htmlContent!=""){
            	var stringMessage = [];
            	stringMessage = htmlContent.split("|");
        		if(stringMessage[0] == "FAILED" || stringMessage[0] == "EXCEPTION" || stringMessage[0] == "SESSIONOUT"){
        			if(stringMessage[0] == "SESSIONOUT"){
        				redirectLoginPage();
        			}else{
						if(newTheme){
							showMessageTheme2(1, data['message'],'',false);
						}else{
							showMessage(true, stringMessage[1]);
						}
        			}
        		} else {
        			//$('#'+formId)[0].reset();
					if(newTheme){
						$('#leadAdvanceSearch').modal('hide');
					    $('#leadSourceList').html(htmlContent);
					}else{
						$('#advLeadSerch').modal('hide');
					    $('#leadSourceList').html(htmlContent);
					}
    				
        		}
        		return false;
			}
		},
		error : function(e) {
			customLoader(false);
			//customLoaderDashBoard(6, false);
			showMessage(true, e.responseText);
		}
	});
}

function getCallRequestForAdvanceLeadSearchStudent(formId, moduleId, leadFrom, clickFrom, currentPage,typeTheme, newTheme, callbadge ){
	$(".leadErrorText").html('');
	var leadModifyDTO = {};
	var leadStudentDetailDTO = {};
	var leadModifyDetailDTO = {};
	var leadCallFollowupDTO = {};
	var leadDemoInfo = {};
	var leadCountDetailDTO = {};

	var leadCommonDTO = {};
	var leadAddFormRequestDTO = {};
	var calbag = clickFrom.split("-");
	if(calbag[0]=='totalGreen'){
		leadCallFollowupDTO['callBadge'] = "green";
	}else if(calbag[0]=='totalYellow'){
		leadCallFollowupDTO['callBadge'] = "yellow";
	}else if(calbag[0]=='totalRed'){
		leadCallFollowupDTO['callBadge'] = "red";
	}else if(calbag[0]=='totalWhite'){
		leadCallFollowupDTO['callBadge'] = "white";
	}else{
		leadCallFollowupDTO['callBadge'] = $("input[name='callBadgeSearch']:checked").val();
	}
	
	leadCallFollowupDTO['interestedFor'] = $("#"+formId+" #interestedForSearch").val();
	leadCallFollowupDTO['callStatus'] = $("#"+formId+" #callStatusSearch").val();
	leadCallFollowupDTO['followupBy'] =$("#"+formId+" #followMedSearch option:selected").val();
	leadCallFollowupDTO['toCall'] = $("#"+formId+" #callWithSearch").val();
	leadCallFollowupDTO['leadFollowStatus'] = $("#"+formId+" #searchStatusOfLead").val();
	leadCommonDTO['leadCallFollowupDTO'] = leadCallFollowupDTO;

	leadCommonDTO['leadDemoInfo'] = leadDemoInfo;
	leadModifyDTO['moduleId'] = moduleId;
	leadModifyDTO['acadmicYear'] = $("#"+formId+" #leadAcadmicYear").val(); 
	leadModifyDTO['leadNo'] = $("#"+formId+" #leadNoSearch").val();
	leadModifyDTO['leadSource'] = $("#"+formId+" #leadSourceSearch").val();
	leadModifyDTO['assignTo'] = $("#"+formId+" #leadAssignToSearch option:selected").val();
	leadModifyDTO['leadStatus'] = $("#"+formId+" #leadStatusSearch").val();
	leadModifyDTO['leadFrom']=leadFrom;
	leadCommonDTO['leadModifyDTO'] = leadModifyDTO;

	leadStudentDetailDTO['stdFname'] = $("#"+formId+" #leadstdfnameSearch").val();
	leadStudentDetailDTO['gurdianFname'] = $("#"+formId+" #leadParentfnameSearch").val();
	leadStudentDetailDTO['country'] = $("#"+formId+" #countryId option:selected").val();
	leadStudentDetailDTO['state'] = $("#"+formId+" #stateId option:selected").val();
	leadStudentDetailDTO['city'] = $("#"+formId+" #cityId option:selected").val();
	leadStudentDetailDTO['standard'] = $("#"+formId+" #leadGradeSearch option:selected").val();
	leadStudentDetailDTO['email'] = $("#"+formId+" #leademailIdSearch").val();
	leadStudentDetailDTO['phoneNo'] = $("#"+formId+" #phoneNoSearch").val();
	leadCommonDTO['leadStudentDetailDTO'] = leadStudentDetailDTO;

	leadModifyDetailDTO['clickBy'] = callbadge;
	leadModifyDetailDTO['priority'] = $("#"+formId+" #leadPrioritySearch").val();
	if($("#"+formId+" #leadStatusSearch").val()=='SCHOLARSHIP'){
		leadModifyDetailDTO['sbsbStatus']="Y";
	}else if($("#"+formId+" #leadStatusSearch").val()=='Unassigned'){
		//leadFrom = "RAW";
	}else{
		leadModifyDetailDTO['sbsbStatus']="N";
	}
	leadModifyDetailDTO['utmSource'] = $("#"+formId+" #utmSourceSearch").val();
	leadModifyDetailDTO['demoAssignTo'] = $("#"+formId+" #leadDemoAssignSearch option:selected").val();
	leadModifyDetailDTO['leadStartDate'] = $("#"+formId+" #leadStartDateSearch").val();
	leadModifyDetailDTO['leadEndDate'] = $("#"+formId+" #leadEndDateSearch").val();
	leadModifyDetailDTO['searchDateType'] = $("#"+formId+" #searchDateType option:selected").val();
	leadModifyDetailDTO['newTheme'] = typeTheme;
	
	leadModifyDetailDTO['clickFrom']=clickFrom;//$("#"+formId+" #clickFrom").val();
	leadCommonDTO['leadModifyDetailDTO'] = leadModifyDetailDTO;
	if($("#"+formId+" #leadStartDateSearch").val()!='' && $("#"+formId+" #leadEndDateSearch").val()!=''){
		if($("#"+formId+" #searchDateType option:selected").val()=='' ){
			$(".leadErrorText").html('Please select type for date');
			return false;
		}
	}
	
	leadCountDetailDTO['totalCallDay'] = $("#"+formId+" #lastTotalCallDay").val();
	leadCommonDTO['leadCountDetailDTO'] = leadCountDetailDTO;
	if(currentPage==undefined){
		currentPage=0;
	}
	
	leadAddFormRequestDTO['leadCommonDTO'] = leadCommonDTO;
	leadAddFormRequestDTO['currentPage'] = currentPage;
	leadAddFormRequestDTO['recordsPerPage']=10;
	return leadAddFormRequestDTO;
}

function advanceLeadSearchStudentReset(formId){
	console.log(formId);
	$("#"+formId+" #leadNoSearch").val('').trigger('change');
	$("#"+formId+" #leadSourceSearch").val('').trigger('change');
	$("#"+formId+" #leadStatusSearch").val('').trigger('change');
	$("#"+formId+" #leadAssignToSearch").val('').trigger('change');
	$("#"+formId+" #followMedSearch").val('').trigger('change');
	$("#"+formId+" #leademailIdSearch").val('');
	$("#"+formId+" #phoneNoSearch").val('');
	$("#"+formId+" #leadstdfnameSearch").val('');
	$("#"+formId+" #leadParentfnameSearch").val('');
	$("#"+formId+" #leadGradeSearch").val('');
	//$("#"+formId+" #city").val('0').trigger('change');
	//$("#"+formId+" #stateId").val('0').trigger('change');
	$("#"+formId+" #countryId").val('0').trigger('change');
	$("#"+formId+" #leadPrioritySearch").val('').trigger('change');
	$("#"+formId+" #callWithSearch").val('').trigger('change');
	$("#"+formId+" input[name='callBadgeSearch']").prop('checked',false);
	$("#"+formId+" #searchStatusOfLead").val('').trigger('change');
	$("#"+formId+" #leadDemoAssignSearch").val('0').trigger('change');
	$("#"+formId+" #leadStartDateSearch").val('');
	$("#"+formId+" #leadEndDateSearch").val('');
	$("#"+formId+" #leadModifyStartDateSearch").val('');
	$("#"+formId+" #leadModifyEndDateSearch").val('');
	$("#"+formId+" #leadCallStartDateSearch").val('');
	$("#"+formId+" #leadCallEndDateSearch").val('');
	$("#"+formId+" #utmSourceSearch").val('').trigger('change');
	$("#"+formId+" #clsrmBkedDateSearch").val('');
	$("#"+formId+" #clsrmBkedLastDateSearch").val('');
}


function exportLeadData(formId, moduleId, leadFrom, clickFrom,  currentPage) {
	
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForHTML('dashboard','export-lead-data'),
		data : JSON.stringify(getCallRequestForExportLeadData(formId, moduleId, leadFrom, clickFrom, currentPage)),
		dataType : 'json',
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
    				$('#advLeadSerch').modal('hide');
    				$('#leadSourceList').html(htmlContent);
        		}
        		return false;
			}
		}
	});
}

function getCallRequestForExportLeadData(formId, moduleId, leadFrom, clickFrom, currentPage ){
	var leadCommonDTO = {};
	var leadModifyDTO = {};
	var leadStudentDetailDTO = {};
	var leadModifyDetailDTO = {};
	var leadCallFollowupDTO = {};
	var leadDemoInfo = {};

	var authentication = {};
	var leadAddFormRequestDTO = {};
	console.log($("input[name='callBadgeSearch']:checked").val());
	var calbag = clickFrom.split("-");
	if(calbag[0]=='totalGreen'){
		leadModifyDetailDTO['callBadge'] = "green";
	}else if(calbag[0]=='totalYellow'){
		leadModifyDetailDTO['callBadge'] = "yellow";
	}else if(calbag[0]=='totalRed'){
		leadModifyDetailDTO['callBadge'] = "red";
	}else if(calbag[0]=='totalWhite'){
		leadModifyDetailDTO['callBadge'] = "white";
	}else{
		leadModifyDetailDTO['callBadge'] = $("input[name='callBadgeSearch']:checked").val();
	}

	leadModifyDetailDTO['priority'] = $("#"+formId+" #leadPrioritySearch").val();
	leadModifyDetailDTO['leadStartDate'] = $("#"+formId+" #leadStartDateSearch").val();
	leadModifyDetailDTO['leadEndDate'] = $("#"+formId+" #leadEndDateSearch").val();

	leadModifyDTO['moduleId'] = moduleId;
	leadModifyDTO['leadNo'] = $("#"+formId+" #leadNoSearch").val();
	leadModifyDTO['leadSource'] = $("#"+formId+" #leadSourceSearch").val();
	leadModifyDTO['assignTo'] = $("#"+formId+" #leadAssignToSearch option:selected").val();

	leadStudentDetailDTO['stdFname'] = $("#"+formId+" #leadstdfnameSearch").val();
	leadCallFollowupDTO['interestedFor'] = $("#"+formId+" #interestedForSearch").val();
	leadCallFollowupDTO['callStatus'] = $("#"+formId+" #callStatusSearch").val();
	leadCallFollowupDTO['followupBy'] =$("#"+formId+" #followMedSearch option:selected").val();
	leadCallFollowupDTO['toCall'] = $("#"+formId+" #callWithSearch").val();

	leadStudentDetailDTO['country'] = $("#"+formId+" #countryId option:selected").val();
	leadStudentDetailDTO['state'] = $("#"+formId+" #stateId option:selected").val();
	leadStudentDetailDTO['city'] = $("#"+formId+" #cityId option:selected").val();
	leadStudentDetailDTO['standard'] = $("#"+formId+" #leadGradeSearch option:selected").val();
	leadStudentDetailDTO['email'] = $("#"+formId+" #leademailIdSearch").val();
	leadStudentDetailDTO['phoneNo'] = $("#"+formId+" #phoneNoSearch").val();

	if($("#"+formId+" #leadStatusSearch").val()=='SCHOLARSHIP'){
		leadModifyDetailDTO['sbsbStatus']="Y";
	}else{
		leadModifyDTO['leadStatus'] = $("#"+formId+" #leadStatusSearch").val();
		leadModifyDetailDTO['sbsbStatus']="N";
	}
	
	leadDemoInfo['demoAssignTo'] = $("#"+formId+" #leadDemoAssignSearch option:selected").val();
	if(currentPage==undefined){
		currentPage=0;
	}
	leadModifyDTO['leadFrom']=leadFrom;
	leadModifyDetailDTO['clickFrom']=clickFrom;//$("#"+formId+" #clickFrom").val();
	leadCommonDTO['leadModifyDTO'] =leadModifyDTO;
	leadCommonDTO['leadModifyDetailDTO'] =leadModifyDetailDTO;
	leadCommonDTO['leadStudentDetailDTO'] =leadStudentDetailDTO;
	leadCommonDTO['leadCallFollowupDTO'] =leadCallFollowupDTO;
	leadCommonDTO['leadDemoInfo'] =leadDemoInfo;


	leadAddFormRequestDTO['leadCommonDTO'] = leadCommonDTO;
	leadAddFormRequestDTO['currentPage'] = currentPage;
	leadAddFormRequestDTO['recordsPerPage']=10;
	authentication['hash'] = getHash();authentication['schoolId'] = SCHOOL_ID;authentication['schoolUUID'] = SCHOOL_UUID;
	authentication['userId'] = $("#"+formId+" #userId").val();
	authentication['userType'] = 'COMMON';
	leadAddFormRequestDTO['authentication'] = authentication;
	return leadAddFormRequestDTO;
}



function moveLeadsData(userId, roleModuleId, leadFrom, currentPage, newTheme) {
	if(newTheme){
		hideMessageTheme2('');
	}else{
		hideMessage('');
	}
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLFor('leads','lead-move'),
		data : JSON.stringify(getRequestForMoveLeadsData(userId)),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				if(newTheme){
					showMessageTheme2(0, data['message'],'',true);
				}else{
					showMessage(true, data['message']);
				}
				
			} else {
				if(newTheme){
							showMessageTheme2(1, data['message'],'',false);
							$("#leadNoMove").val('')
							setTimeout(function(){
								location.reload();
							}, 1500);
						}else{
							showMessage(true, data['message']);
							$('#moveLeads').modal('hide');
							setTimeout(function(){
								callForDashboardData('formIdIfAny','lead-list?moduleId='+roleModuleId+'&leadFrom='+leadFrom+'&clickFrom=list&currentPage='+currentPage);
							}, 1500);
						}
				
			}
			return false;
		},
		error : function(e) {
			//showMessage(true, e.responseText);
			return false;
		}
	});
}
function getRequestForMoveLeadsData(userId){
	var leadAddFormRequestDTO = {};
	var authentication = {};
	var leadCommonDTO = {};
	var leadModifyDTO = {};
	var moveleadNo = $("#leadNoMove").val();
	
	leadModifyDTO['leadNo'] =moveleadNo.substring(1,moveleadNo.lenght);
	leadModifyDTO['assignTo'] =$("#leadDemoAssignMove").val();
	leadCommonDTO['leadModifyDTO']=leadModifyDTO;

	authentication['hash'] = getHash();authentication['schoolId'] = SCHOOL_ID;
	authentication['schoolUUID'] = SCHOOL_UUID;
	authentication['userId'] = userId;
	authentication['userType'] = 'COMMON';
	leadAddFormRequestDTO['authentication'] = authentication;
	leadAddFormRequestDTO['leadCommonDTO'] = leadCommonDTO;
	return leadAddFormRequestDTO;
}

function verifyCallFn(leadStatus, leadId){
		var remarks = $("#teamMemberRemark"+leadId).val();
		var remarkBy = $("#superRemarkBy"+leadId).val();
		if($("#teamMemberRemark"+leadId).val()==''){
			$('.errorLeadCls').fadeIn();
			setTimeout(function (){
				$('.errorLeadCls').fadeOut();
			}, 5000)
			$('#errorMessageLead').html('Please fill team member feedback.');
			return false;
		}
		feedbackLeadsData(leadStatus, leadId, remarks, remarkBy, '${userId}');
	}
	

function getCounselorReportData(assignTo) {
	
	$.ajax({
		type : "POST",
		url : getURLForHTML('dashboard','counselor-lead-search-content'),
		data : "assignTo="+assignTo,
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
					$('#counselorRptcontent').html(htmlContent);
					$('#counselorReport').modal('show');
        		}
        		return false;
			}
		}
	});
}

function getScheduleCall(assignTo){
	customLoader(false)
	$.ajax({
		type : "POST",
		url : getURLForHTML('dashboard','counselor-lead-schedule'),
		data : "assignTo="+assignTo,
		dataType : 'html',
		cache : false,
		timeout : 600000,
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
					$('#scheduleMessageContent').html(htmlContent);
					//$("body").addClass("position-fixed");
					$(".custom-overlay, .fixed-message-card").show();
        		}
        		return false;
			}
		}
	});
}

function dashboardRequestDemo(newTheme) {
	var strDate ="";
	var strDateTo ="";
	var standard ="";
	var url="";
	dateFrom= $("#formdate").val();
	dateto = $("#todate").val();
	if(dateFrom!="" && dateFrom!=undefined){
		strDate = dateFrom.split("-")[2]+"-"+dateFrom.split("-")[0]+"-"+dateFrom.split("-")[1];
	}else{
		strDate="";
	}
	
	if(dateto!="" && dateto!=undefined){
		strDateTo = dateto.split("-")[2]+"-"+dateto.split("-")[0]+"-"+dateto.split("-")[1];
	}else{
		strDateTo="";
	}
	if(newTheme){
		standard = $("#standardDashboard").val()
		url = 'counselor-leads-by-filter?todayDate='+strDate+'&toDate='+strDateTo+'&standard='+standard;
	}else{
		url = 'get-request-leads-user?todayDate='+strDate+'&toDate='+strDateTo;
	}
	customLoader(true)
	$.ajax({
		global: false,
		type : "POST",
		url : getURLForHTML('dashboard',url),
		data : '',
		dataType : 'html',
		cache : false,
		timeout : 600000,
		success : function(htmlContent) {
			customLoader(false);
			if(htmlContent!=""){
            	var stringMessage = [];
            	stringMessage = htmlContent.split("|");
        		if(stringMessage[0] == "FAILED" || stringMessage[0] == "EXCEPTION" || stringMessage[0] == "SESSIONOUT" ){
        			if(stringMessage[0] == "SESSIONOUT"){
        				redirectLoginPage();
        			}else{
        				showMessage(true, stringMessage[1]);
        			}
        		}else{
							if(newTheme){
								$('#counselorLeadReportTable').html(htmlContent);
							}else{
								$('#dashboardDemoLead').html(htmlContent);
							}
        			
        		}
    			return false;
			}
		},
		error : function(e) {
			customLoader(false);
			//customLoaderDashBoard(6, false);
			showMessage(true, e.responseText);
		}
	});
}


function saveLeadAssignToCounselor(userId, tblId) {
	hideMessageTheme2('');
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLFor('leads','save-assign-lead-tocounselor'),
		data : JSON.stringify(getRequestForLeadAssignToCounselor(userId, tblId)),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				showMessageTheme2(0, data['message'],'',true);
			} else {
							showMessageTheme2(1, data['message'],'',false);
							setTimeout(function(){
								location.reload();
							}, 1500);
				
			}
			return false;
		},
		error : function(e) {
			//showMessage(true, e.responseText);
			return false;
		}
	});
}
function getRequestForLeadAssignToCounselor(userId, tblId){
	var leadAddFormRequestDTO = {};
	var authentication = {};
	var leadCommonDTO = {};
	var leadLastCallDTO = [];
	
	$('#'+tblId+' tr.assignItem').each(function() { 
			var leadLastCall = {};
			leadLastCall['assignTo'] = $(this).find("td .assignto").val();
			leadLastCall['orderBy'] = $(this).find("td .rowindex").text();
			var grades = $(this).find("td .leadGrades").select2('val');
			leadLastCall['leadGrade'] = grades.toString();

			var chckValue = $(this).find("td .assignActiveCouns").val();
			if(chckValue==undefined){}else{
				leadLastCall['counselorActive']=chckValue;
			}
			leadLastCallDTO.push(leadLastCall);
		});
	
	leadCommonDTO['leadLastCallList'] = leadLastCallDTO;
	authentication['hash'] = getHash();authentication['schoolId'] = SCHOOL_ID;authentication['schoolUUID'] = SCHOOL_UUID;
	authentication['userId'] = userId;
	authentication['userType'] = 'COMMON';
	leadAddFormRequestDTO['authentication'] = authentication;
	leadAddFormRequestDTO['leadCommonDTO'] = leadCommonDTO;
	return leadAddFormRequestDTO;
}


function saveInactiveAssignCounselor(userId, checkedVal, orderBy) {
	hideMessageTheme2('');
	customLoader(true);
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLFor('leads','inactive-assign-counselor'),
		data : JSON.stringify(getRequestForInactiveAssignCounselor(userId, checkedVal, orderBy)),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		success : function(data) {
			customLoader(false);
			if (data['status'] == '0' || data['status'] == '2') {
				showMessageTheme2(0, data['message'],'',true);
			} else {
				showMessageTheme2(1, data['message'],'',false);
				setTimeout(function(){
					location.reload();
				}, 1500);
			}
			return false;
		},
		error : function(e) {
			customLoader(false);
			return false;
		}
	});
}
function getRequestForInactiveAssignCounselor(userId, checkedVal, orderBy){
	var leadAddFormRequestDTO = {};
	var authentication = {};
	var leadCommonDTO = {};
	// leadCommonDTO['orderBy']=orderBy;
	// leadCommonDTO['assignTo']=userId;
	// leadCommonDTO['counselorActivate']=checkedVal;
	var leadModifyDTO = {};
	
	leadModifyDTO['assignTo'] = userId;
	leadCommonDTO['leadModifyDTO']=leadModifyDTO;
	var leadDemoInfo = {};
	leadDemoInfo['orderBy']=orderBy;
	leadDemoInfo['counselorActivate']=checkedVal;
	leadCommonDTO['leadDemoInfo']=leadDemoInfo;
	
	authentication['hash'] = getHash();authentication['schoolId'] = SCHOOL_ID;authentication['schoolUUID'] = SCHOOL_UUID;
	authentication['userId'] = userId;
	authentication['userType'] = 'COMMON';
	leadAddFormRequestDTO['authentication'] = authentication;
	leadAddFormRequestDTO['leadCommonDTO'] = leadCommonDTO;
	return leadAddFormRequestDTO;
}

function leadsDataLogDelete(leadId, userId) {
	hideMessage('');
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLFor('leads','leadlog-delete'),
		data : JSON.stringify(getRequestForDeleteLeadsLogData(leadId, userId)),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				showMessageTheme2(0, data['message'],'',true);
			} else {
				showMessageTheme2(1, data['message'],'',false);
				setTimeout(function(){
						location.reload();
				}, 1500);
				
			}
			return false;
		},
		error : function(e) {
			//showMessage(true, e.responseText);
			return false;
		}
	});
}

function getRequestForDeleteLeadsLogData(leadId,userId ){
	var leadAddFormRequestDTO = {};
	var authentication = {};
	var leadCommonDTO = {};
	
	leadCommonDTO['id'] =leadId;
	authentication['hash'] = getHash();authentication['schoolId'] = SCHOOL_ID;authentication['schoolUUID'] = SCHOOL_UUID;
	authentication['userId'] = userId;
	authentication['userType'] = 'COMMON';
	leadAddFormRequestDTO['authentication'] = authentication;
	leadAddFormRequestDTO['leadCommonDTO'] = leadCommonDTO;
	return leadAddFormRequestDTO;
}
