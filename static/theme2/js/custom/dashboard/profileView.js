// profile edit script
console.log("profile");
function activeInactiveAfterApply(src, USER_ROLE, position, index, elementId){
	if($(src).val()=='Invalid' || $(src).val()=='Not Clear' || $(src).val()=='Required'){
		if(USER_ROLE=='STUDENT'){
			$('#'+elementId+'CameraDiv').show();
		}
		if(position==2){
			if($('#dobProof').val()=='Aadhaar Card' || $('#dobProof').val()=='Passport'){
				$('#'+elementId+'UploadDivBack').show();
			}
		}
		$('#'+elementId+'UploadDiv').show();
		$('#'+elementId).attr('disabled',false);
		$('#uploadDocumentbtnDiv').show();
		$('.fileupload'+index+'Validity').html('<label class="text-danger">&nbsp;The above mentioned document is '+$(src).val()+', please upload.</label>');
		$('.fileupload'+index+'Validity').show();
		$('#fileupload'+index+'UploadDiv').hide();
	}else{
		$('.fileupload'+index+'Validity').hide();
		$('#'+elementId).attr('disabled',true);
		$('#'+elementId+'CameraDiv').hide();
		$('#'+elementId+'UploadDiv').hide();
	}

}
//cancel field functionality
$('.cancel-field-btn').on('click', function(){
	if($(this).parent().hasClass('documentApprovalDiv')==true){
		var admissionStatus = $('.admissionStatus').text();
        if(admissionStatus!=null && admissionStatus!=''){
            $('.admissionStatus').removeClass('hide-value').text(admissionStatus);
            if(admissionStatus=='Admission Under Review'|| admissionStatus=='Admission Confirmed' || admissionStatus=='Admission Not Confirmed'){
        		$('#documentRemarksDiv').hide();
        		$('#documentRemarksDescriptionDiv').hide();

            }else{
            	$('#documentRemarksDiv').show();
        		$('#documentRemarksDescriptionDiv').show();
            }
        }

		var documentRemarks = $(".documentRemarks").text();
        if(documentRemarks!=null && documentRemarks!=''){
            $('.documentRemarks').removeClass('hide-value').text(documentRemarks);
        }

		var documentRemarksDescription = $(".documentRemarksDescription").text();
        if(documentRemarksDescription!=null && documentRemarksDescription!=''){
            $('.documentRemarksDescription').removeClass('hide-value').text(documentRemarksDescription);
        }
       /* var documentRemarks = $("#documentRemarks").select2('data');
		console.log("documentRemarks ",documentRemarks);
		$('.documentRemarks, .documentRemarksDescription').removeClass('hide-value');
		for(i =0;i<documentRemarks.length;i++){
			if(i==0){
				$('.documentRemarks, .documentRemarksDescription').html('');
			}
			$('.documentRemarks, .documentRemarksDescription').append([i+1]+'. '+documentRemarks[i].text+'</br/>');
		}*/
		$(this).parent().find('.save-field-btn').removeClass('visible');
		$(this).parent().find('.field-value').removeClass('hide-value')
		$(this).removeClass('visible').parent().find('.edit-field-btn').show();
		$(this).parent().find('.field-input, .iti--allow-dropdown, .select2').removeClass('visible');
	}else{
	   var fieldValue = $(this).parent().find('.field-value').text();
	   var cancelFieldValue = fieldValue.split('-')[1];
	   $(this).parent().find('.save-field-btn').removeClass('visible');
	   $(this).removeClass('visible').parent().find('.edit-field-btn').show();
	   $(this).parent().find('.field-value').removeClass('hide-value').text(fieldValue);
	   $(this).parent().find('.iti--allow-dropdown, .select2').val(cancelFieldValue).removeClass('visible');
	   $(this).parent().find('.field-input').attr('value', fieldValue).removeClass('visible');
	   $(".otherRelationDiv").hide()
	}
 });
$('.edit-field-btn').on('click', function() {
	if($(this).parent().hasClass('documentApprovalDiv') == true) {
		var admissionStatus = $('.admissionStatus').text();
		$('#admissionStatus').val(admissionStatus).trigger('change');;

		var documentRemarks = $('.documentRemarks').text().split('. ')[1];
		$('#documentRemarks').val(documentRemarks).trigger('change');;

		var documentRemarksDescription = $('.documentRemarksDescription').html();
		$('.documentRemarksDescription').html('');
		$('.documentRemarksDescription').addClass('visible');
	} else {
		var fieldValue = $(this).parent().find('.field-value').text();
		if ($(this).prev().hasClass('iti--allow-dropdown')) {
			var string1 = fieldValue;
			string1 = string1.split('-')[1];
			$(this).parent().find('.field-input').addClass('visible').attr('value', string1);
		}else {
			$(this).parent().find('.field-input').addClass('visible').attr('value', fieldValue);
		}
	}
	$(this).hide().parent().find('.save-field-btn').addClass('visible');
	$(this).hide().parent().find('.cancel-field-btn').addClass('visible');
	$(this).parent().find('.field-value').addClass('hide-value');
	$(this).parent().find('.iti--allow-dropdown, .select2').addClass('visible')
});

function getRequestForUpdateProfile(src,keyId,userId,moduleId){
	var requestProfile = {};
	var authentication = {};
	var requestProfileData = {};
	requestProfileData['keyId']=keyId;
	if(keyId=='phoneNumber' || keyId=='alternatePhoneNumber' || keyId=='parentContact' || keyId=='alternateParentPhoneNumber' || keyId=='payPalPhoneNumber' ){
		var valId ="";
		var lent=$('#'+keyId).val().indexOf("-")
		if(lent>0){
			var valPhoneId = $('#'+keyId).val().split("-")[1];
		}else{
			var valPhoneId = $('#'+keyId).val();
			if(valPhoneId==""){
				showMessageTheme2(2,' Either field value is invalid or empty.','',false);
				return false;
			}
		}
		requestProfileData['fieldValue']=escapeCharacters(valPhoneId);
	}
	if(keyId=='specialization' || keyId=='preferredSubjectName' || keyId=='lastsubTaught'){
		requestProfileData['fieldValue']=$('#'+keyId).val().toString();
	}else if(keyId=='phoneNumber'){
		requestProfileData['countryCode']=$('#phoneCountryCode').val();//$(".stuPhoneNumber .iti__active").last().attr("data-country-code");
		requestProfileData['countryIsdCode']=$('#phoneDailCode').val();//$(".stuPhoneNumber .iti__active").last().attr("data-dial-code");
	}else if(keyId=='alternatePhoneNumber'){
		requestProfileData['countryCode']= $('#alternateCountryCode').val();//$(".stuAlternatePhoneNumber .iti__active").last().attr("data-country-code");
		requestProfileData['countryIsdCode']=$('#alternateDailCode').val();//$(".stuAlternatePhoneNumber .iti__active").last().attr("data-dial-code");
	}else if(keyId=='parentContact'){
		requestProfileData['countryCode']=$('#parentPhoneCountryCode').val();//$(".stuParentPhoneNumber .iti__active").last().attr("data-country-code");
		requestProfileData['countryIsdCode']=$('#parentPhoneDailCode').val();//$(".stuParentPhoneNumber .iti__active").last().attr("data-dial-code");
	}else if(keyId=='alternateParentPhoneNumber'){
		requestProfileData['countryCode']=$('#alternateParentPhoneCountryCode').val();//$(".stuAlternateParentPhoneNumber .iti__active").last().attr("data-country-code");
		requestProfileData['countryIsdCode']=$('#alternateParentPhoneDailCode').val();//$(".stuAlternateParentPhoneNumber .iti__active").last().attr("data-dial-code");
	}else if(keyId=='payPalPhoneNumber'){
		requestProfileData['countryCode']=$('#payPalCountryCode').val();
		requestProfileData['countryIsdCode']=$('#payPalDailCode').val();
	}else if(keyId=='countrySection'){
		requestProfileData['countryId']=$('#countryId').val();
		requestProfileData['stateId']=$('#stateId').val();
		requestProfileData['cityId']=$('#cityId').val();
	}else if(keyId=='totalTeacheingExperience'){
		requestProfileData['yearValue']=$("#yearExp").val();
		requestProfileData['monthValue']=$("#monthExp").val();
	}else if(keyId=='lastOrgGradeName'){
		if($('#lastGradeK').val().length>0){
			requestProfileData['fieldValue']=$('#lastGradeK').val().toString();
		}else if($('#lastGradeM').val().length>0){
			requestProfileData['fieldValue']=$('#lastGradeM').val().toString();
		}else if($('#lastGradeH').val().length>0){
			requestProfileData['fieldValue']=$('#lastGradeH').val().toString();
		}
	}else if(keyId=='preferredGradeName'){
		if($('#prefGradeK').val().length>0){
			requestProfileData['fieldValue']=$('#prefGradeK').val().toString();
		}else if($('#prefGradeM').val().length>0){
			requestProfileData['fieldValue']=$('#prefGradeM').val().toString();
		}else if($('#prefGradeH').val().length>0){
			requestProfileData['fieldValue']=$('#prefGradeH').val().toString();
		}
	}else if(keyId=='otherRelation'|| keyId=='relationType'){
		requestProfileData['fieldValue']=$("#relationType").val();
		requestProfileData['fieldValue1']=$("#otherRelation").val();
	}else if(keyId=='admissionStatus'){
		requestProfileData['fieldValue']=$("#admissionStatus").val();
		requestProfileData['remarksDocumentStatusIds']=$("#documentRemarks").select2('val');
	}else if(keyId=='tcApplication'){
		requestProfileData['tcApplication']=$("#tcApplication").val();
	}else{
		requestProfileData['fieldValue']=escapeCharacters($('#'+keyId).val());
	}

	authentication['hash'] = getHash();authentication['schoolId'] = SCHOOL_ID;authentication['schoolUUID'] = SCHOOL_UUID;
	authentication['userType'] = moduleId;
	authentication['userId'] = userId;
	requestProfile['authentication'] = authentication;
	requestProfile['requestProfileData'] = requestProfileData;
	return requestProfile;
}

function validateFields(keyId, fieldValue){
	if(keyId=='phoneNumber'){
		if(fieldValue==''|| fieldValue==undefined){
			showMessageTheme2(0,"Contact number is mandatory.",'',false);
			return false;
		}
	}else if(keyId=='gender' || keyId=='parentGender'){
		if(fieldValue==''|| fieldValue==undefined ||fieldValue==0){
			showMessageTheme2(0,"Please choose gender.",'',false);
			return false;
		}
	}else if(fieldValue=='Select Nationality'){
		showMessageTheme2(0," Please choose nationality to proceed.",'',false);
		return false;
	}else if(keyId=='addMissonDate' || keyId=='joiningDate'){
		if(fieldValue==''|| fieldValue==undefined ||fieldValue==0){
			showMessageTheme2(0,"Either field value is invalid or empty.",'',false);
			return false;
		}
	}else if(keyId=='dob'){
		if(fieldValue==''|| fieldValue==undefined ||fieldValue==0){
			showMessageTheme2(0,"Either field value is invalid or empty.",'',false);
			return false;
		}
	}else if(keyId=='standardId'){
		if( $("#standardId").val()==undefined ||$("#standardId").val()==0 || $("#standardId").val()==''){
			showMessageTheme2(0,"Either field value is invalid or empty.",'',false);
			return false;
		}
	}else if(keyId=='countrySection'){
		if( $("#countryId").val()==undefined ||$("#countryId").val()==0 || $("#countryId").val()==''){
			showMessageTheme2(0," Please choose country to proceed.",'',false);
			return false;
		}else if( $("#stateId").val()==undefined ||$("#stateId").val()==0 || $("#stateId").val()==''){
			showMessageTheme2(0,"Please choose state to proceed.",'',false);
			return false;
		}else if( $("#cityId").val()==undefined ||$("#cityId").val()==0 || $("#cityId").val()==''){
			showMessageTheme2(0,"Please choose city to proceed.",'',false);
			return false;
		}
	}else if(keyId=="totalTeacheingExperience"){
		if($("#yearExp").val()==undefined || $("#yearExp").val()=='' || $("#yearExp").val()==0){
			if( $("#monthExp").val()==undefined || $("#monthExp").val()=='' || $("#monthExp").val()==0){
				showMessageTheme2(0,"Please select total teaching experience in month.",'',false);
				return false;
			}
		}
	}else if(keyId=="preferredGradeName"){
		if($('#prefGradeK').val().length==0 && $('#prefGradeM').val().length==0 && $('#prefGradeH').val().length==0){
			showMessageTheme2(0,"Please select preferred grades.",'',false);
			return false;
		}
	}else if(keyId=="lastOrgGradeName"){
		if($('#lastGradeK').val().length==0 && $('#lastGradeM').val().length==0 && $('#lastGradeH').val().length==0){
			showMessageTheme2(0,"Please select current/Last Organization grades.",'',false);
			return false;
		}
	}else if(keyId=="specialization"){
		if($('#specialization').val().length==0){
			showMessageTheme2(0,"Please select specialization subjects.",'',false);
			return false;
		}
	}else if(keyId=="preferredSubjectName"){
		if($('#preferredSubjectName').val().length==0){
			showMessageTheme2(0,"Please select Preferred Courses.",'',false);
			return false;
		}
	}else if(keyId=="lastsubTaught"){
		if($('#lastsubTaught').val().length==0){
			showMessageTheme2(0,"Please select Courses Taught.",'',false);
			return false;
		}
	}else if(keyId=="emailId" || keyId=="altEmailId" ||keyId=="parentEmailId"|| keyId=="offEmailId" || keyId=="payPalEmail" || keyId=="guardianAltEmail"){
		if (!validateEmail($('#'+keyId).val())){
			showMessageTheme2(0,"Email is either empty or invalid.",'',false);
			return false;
		}
	}else if(keyId=='otherRelation'|| keyId=='relationType'){
		var viewValue='';
		if('Other'== $('#relationType').val()){
			if($('#otherRelation').val()=='' || $('#otherRelation').val()==undefined){
				showMessageTheme2(0,"Please Enter relation type.",'',false);
				return false;
			}
		}
	}else if(keyId=='admissionStatus'){
		if($('#admissionStatus').val().length==0){
			showMessageTheme2(0,"Please select document status.",'',false);
			return false;
		}
		if($('#admissionStatus').val()!='Admission Under Review' && $('#admissionStatus').val()!='Admission Confirmed' && $('#admissionStatus').val()!='Admission Not Confirmed'){
			if($('#documentRemarks').val().length==0){
				showMessageTheme2(0,"Please select remarks.",'',false);
				return false;
			}
			if($('#documentRemarks').val()!='None'){
				if($('.documentRemarksDescription').html().length==0){
					showMessageTheme2(0,"Please add document remarks description.",'',false);
					return false;
				}
			}
		}
	}else if(keyId=='profilePic' || keyId=='dobProof'
		|| keyId=='addressProof' || keyId=='signatureProof'
		|| keyId=='lastAcademicProof' || keyId=='otherDocumentProof'
		|| keyId=='profilePicValidity' || keyId=='ageProofValidity'
		|| keyId=='addressProofValidity' || keyId=='signatureProofValidity'
		|| keyId=='lastAcademicProofValidity' || keyId=='otherDocumentProofValidity'){
			if($('#'+keyId).val()== undefined || $('#'+keyId).val()== 0 ){
				showMessageTheme2(0,"Please select correct value.",'',false);
				return false;
			}
	}else if(keyId=='extendValidity'){
		if(fieldValue==''|| fieldValue==undefined ||fieldValue==0){
			showMessageTheme2(0,"Either field value is invalid or empty.",'',false);
			return false;
		}
		if(fieldValue.indexOf(' ') > -1 && fieldValue.indexOf(',') > -1){
			showMessageTheme2(0," Incorrect date format of Extend Admission On Hold Validity. Please choose a date.",'',false);
			return false;
		}
	}else if(keyId=='studentLastName'){

	}else if(keyId=='studentMiddleName'&& USER_ROLE == 'SCHOOL_ADMIN'){

	}else if(keyId=='fatherMiddleName'&& USER_ROLE == 'SCHOOL_ADMIN'){

	}else if(keyId=='fatherLastName' && USER_ROLE == 'SCHOOL_ADMIN'){

	}else if(keyId=='motherMiddleName'&& USER_ROLE == 'SCHOOL_ADMIN'){

	}else if(keyId=='motherLastName' && USER_ROLE == 'SCHOOL_ADMIN'){

	}else{
		if(fieldValue==''|| fieldValue==undefined ||fieldValue==0){
			showMessageTheme2(0,"Either field value is invalid or empty.",'',false);
			return false;
		}
	}

 return true;
}
function applyChanges(src, keyId,userId,roleModuleId,moduleId){
	console.log("inside apply changes function ");
	var fieldValue = $(src).parent().find('.field-input').val();
	if(keyId=='studentFirstName' || keyId=='studentMiddleName' || keyId=='studentLastName'
	|| keyId=='fatherFirstName' || keyId=='fatherMiddleName' || keyId=='fatherLastName'
	|| keyId=='motherFirstName' || keyId=='motherMiddleName' || keyId=='motherLastName'
	|| keyId=='guardianFirstName' || keyId=='guardianMiddleName' || keyId=='guardianLastName'
	|| keyId=='lastOrgName' || keyId=='lastJobTitle' || keyId=='address'){
		fieldValue = toTitleCase(fieldValue);
	}
	hideMessageTheme2('');
	if(!validateFields(keyId,fieldValue)){
		return false;
	}
	  $.ajax({
			type : "POST",
			contentType : "application/json",
			url : getURLForHTML('dashboard','update-user-profile-content'),
			data : JSON.stringify(getRequestForUpdateProfile(src, keyId, userId, moduleId)),
			dataType : 'json',
			success : function(data) {
				console.log("response data is:", data);
				if (data['status'] == '0' || data['status'] == '2') {
					showMessageTheme2(0, data['message'],'',false);
				} else {
					if(keyId=='phoneNumber' || keyId=='alternatePhoneNumber' ||  keyId=='parentContact' ||keyId=='alternateParentPhoneNumber' ||keyId=='payPalPhoneNumber'){
						var isdCode="";
						if(keyId=='phoneNumber'){
							isdCode=$('#phoneDailCode').val()+'-';//$(".stuPhoneNumber .iti__active").last().attr("data-dial-code")+'-';
						}else if( keyId=='alternatePhoneNumber'){
							isdCode=$('#alternateDailCode').val()+'-';//$(".stuAlternatePhoneNumber .iti__active").last().attr("data-dial-code")+'-';
						}else if( keyId=='parentContact'){
							isdCode=$('#parentPhoneDailCode').val()+'-';//$(".stuParentPhoneNumber .iti__active").last().attr("data-dial-code")+'-';
						}else if( keyId=='alternateParentPhoneNumber'){
							isdCode=$('#alternateParentPhoneDailCode').val()+'-';//$(".stuAlternateParentPhoneNumber .iti__active").last().attr("data-dial-code")+'-';
						}else if( keyId=='payPalPhoneNumber'){
							isdCode=$('#payPalDailCode').val()+'-';//$(".stuAlternateParentPhoneNumber .iti__active").last().attr("data-dial-code")+'-';
						}
						console.log("Isd Code",isdCode);
						$(src).removeClass('visible').parent().find('.edit-field-btn').show();
						$(src).parent().find('.field-value').removeClass('hide-value').text(isdCode+fieldValue);
						$(src).parent().find('.field-input, .iti--allow-dropdown, .select2').removeClass('visible')
						$(src).parent().find('.cancel-field-btn').removeClass('visible');
					}else if(keyId=='gender' || keyId=='parentGender'){
						if(fieldValue=='DONOTWANTTOSPECIFY'){
							fieldValue="Don't want to specify";
						}
						$(src).removeClass('visible').parent().find('.edit-field-btn').show();
						$(src).parent().find('.field-value').removeClass('hide-value').text(fieldValue);
						$(src).parent().find('.field-input, .iti--allow-dropdown, .select2').removeClass('visible')
						$(src).parent().find('.cancel-field-btn').removeClass('visible');
						if($('#isProfileUplaoded').val()==0 && keyId=='gender'){
							var profilePic="Profile-picture.jpg"
							if(fieldValue=='DONOTWANTTOSPECIFY'){
								fieldValue="Don't want to specify";
								profilePic="Profile-picture.jpg"
							}else if(fieldValue=='MALE'){
								 profilePic="male-profile.png"
							}else if(fieldValue=='FEMALE'){
								profilePic="female-profile.png"
							}
							$('.profile-pic').attr('src', PATH_FOLDER_IMAGE2+profilePic);
							$('#dropDownProfileImage').attr('src', PATH_FOLDER_IMAGE2+profilePic);
							$('#topProfileImage').attr('src', PATH_FOLDER_IMAGE2+profilePic);
						}
					}else if(keyId=='countrySection'){
						$('.countryName').text($('#countryId option:selected').text()).removeClass('hide-value');
						$('.cityName').text($('#cityId option:selected').text()).removeClass('hide-value');
						$('.stateName').text($('#stateId option:selected').text()).removeClass('hide-value');
						$(src).parent().find('.cancel-field-btn').removeClass('visible');
						$(src).parent().find('.field-input, .iti--allow-dropdown, .select2').removeClass('visible');
						$(src).removeClass('visible').parent().find('.edit-field-btn').show();
						$('.save-country').addClass('d-none');
					}else if(keyId=='addMissonDate'){
						var adDate=$('#addMissonDate').val();
						adDate=adDate.split('-');
						var selectedDate=new Date(adDate[1]+'/'+adDate[0]+'/'+adDate[2]);
						var selectedDate2 = selectedDate.toString().split(" ");
						$('.admissionViewDate').text(selectedDate2[2]+" "+selectedDate2[1]+", "+selectedDate2[3]).removeClass('hide-value');
						$(src).parent().find('.cancel-field-btn').removeClass('visible');
						$(src).parent().find('.field-input').removeClass('visible');
						$(src).removeClass('visible').parent().find('.edit-field-btn').show();
					}else if(keyId=='dob'){
						var adDate=$('#dob').val();
						adDate=adDate.split('-');
						var selectedDate=new Date(adDate[1]+'/'+adDate[0]+'/'+adDate[2]);
						var selectedDate2 = selectedDate.toString().split(" ");
						$('.dobViewDate').text(selectedDate2[2]+" "+selectedDate2[1]+", "+selectedDate2[3]).removeClass('hide-value');
						$(src).parent().find('.cancel-field-btn').removeClass('visible');
						$(src).parent().find('.field-input').removeClass('visible');
						$(src).removeClass('visible').parent().find('.edit-field-btn').show();
					}else if(keyId=='standardId'){
						$('.standardViewName').text($('#standardId option:selected').text()).removeClass('hide-value');
						$(src).parent().find('.cancel-field-btn').removeClass('visible');
						$(src).parent().find('.field-input, .iti--allow-dropdown, .select2').removeClass('visible');
						$(src).removeClass('visible').parent().find('.edit-field-btn').show();
					}else if(keyId=='registrationType'){
						$('.registrationType').text($('#registrationType option:selected').text()).removeClass('hide-value');
						$(src).parent().find('.cancel-field-btn').removeClass('visible');
						$(src).parent().find('.field-input, .iti--allow-dropdown, .select2').removeClass('visible');
						$(src).removeClass('visible').parent().find('.edit-field-btn').show();
					}else if(keyId=='tcApplication'){
						$('.tcApplication').text($('#tcApplication option:selected').text()).removeClass('hide-value');
						$(src).parent().find('.cancel-field-btn').removeClass('visible');
						$(src).parent().find('.field-input, .iti--allow-dropdown, .select2').removeClass('visible');
						$(src).removeClass('visible').parent().find('.edit-field-btn').show();
					}else if(keyId=='specialization'){
						$('.specilZViewSubject').text(data['extra']).removeClass('hide-value');
						$(src).parent().find('.cancel-field-btn').removeClass('visible');
						$(src).parent().find('.field-input, .iti--allow-dropdown, .select2').removeClass('visible');
						$(src).removeClass('visible').parent().find('.edit-field-btn').show();
					}else if(keyId=='totalTeacheingExperience'){
						$('.totalTeacheingExpView').text(data['extra']).removeClass('hide-value');
						$(src).parent().find('.cancel-field-btn').removeClass('visible');
						$(src).parent().find('.field-input, .iti--allow-dropdown, .select2').removeClass('visible');
						$(src).removeClass('visible').parent().find('.edit-field-btn').show();
					}else if(keyId=='preferredSubjectName'){
						$('.preferredSubjectNameView').text(data['extra']).removeClass('hide-value');
						$(src).parent().find('.cancel-field-btn').removeClass('visible');
						$(src).parent().find('.field-input, .iti--allow-dropdown, .select2').removeClass('visible');
						$(src).removeClass('visible').parent().find('.edit-field-btn').show();
					}else if(keyId=='lastsubTaught'){
						$('.lastsubTaughtView').text(data['extra']).removeClass('hide-value');
						$(src).parent().find('.cancel-field-btn').removeClass('visible');
						$(src).parent().find('.field-input, .iti--allow-dropdown, .select2').removeClass('visible');
						$(src).removeClass('visible').parent().find('.edit-field-btn').show();
					}else if(keyId=='lastOrgGradeName'){
						$('.lastOrgGradeNameView').text(data['extra']).removeClass('hide-value');
						$(src).parent().find('.cancel-field-btn').removeClass('visible');
						$(src).parent().find('.field-input, .iti--allow-dropdown, .select2').removeClass('visible');
						$(src).removeClass('visible').parent().find('.edit-field-btn').show();
					}else if(keyId=='preferredGradeName'){
						$('.prefGradeNameView').text(data['extra']).removeClass('hide-value');
						$(src).parent().find('.cancel-field-btn').removeClass('visible');
						$(src).parent().find('.field-input, .iti--allow-dropdown, .select2').removeClass('visible');
						$(src).removeClass('visible').parent().find('.edit-field-btn').show();
					}else if(keyId=='departmentId'){
						$('.departmentNameView').text($('#'+keyId).val()).removeClass('hide-value');
						$(src).parent().find('.cancel-field-btn').removeClass('visible');
						$(src).parent().find('.field-input, .iti--allow-dropdown, .select2').removeClass('visible');
						$(src).removeClass('visible').parent().find('.edit-field-btn').show();
					}else if(keyId=='countryTimezoneId'){
						$('.countryTimezoneView').text(data['extra']).removeClass('hide-value');
						$(src).parent().find('.cancel-field-btn').removeClass('visible');
						$(src).parent().find('.field-input, .iti--allow-dropdown, .select2').removeClass('visible');
						$(src).removeClass('visible').parent().find('.edit-field-btn').show();
					}else if(keyId=='designation'){
						$('.designationView').text($('#'+keyId).val()).removeClass('hide-value');
						$(src).parent().find('.cancel-field-btn').removeClass('visible');
						$(src).parent().find('.field-input, .iti--allow-dropdown, .select2').removeClass('visible');
						$(src).removeClass('visible').parent().find('.edit-field-btn').show();
					}else if(keyId=='otherRelation'|| keyId=='relationType'){
						var viewValue='';
						if('Other'== $('#relationType').val()){
							viewValue=$('#otherRelation').val();
						}else{
							viewValue=$('#relationType').val();
						}
						$('.relationTypeView').text(viewValue).removeClass('hide-value');
						$(src).parent().find('.cancel-field-btn').removeClass('visible');
						$(src).parent().find('.field-input, .iti--allow-dropdown, .select2').removeClass('visible');
						$(src).removeClass('visible').parent().find('.edit-field-btn').show();
						$(".otherRelationDiv").hide();
					}else if(keyId=='joiningDate'){
						var adDate=$('#joiningDate').val();
						adDate=adDate.split('-');
						var selectedDate=new Date(adDate[1]+'/'+adDate[0]+'/'+adDate[2]);
						var selectedDate2 = selectedDate.toString().split(" ");
						$('.joiningDateView').text(selectedDate2[2]+" "+selectedDate2[1]+", "+selectedDate2[3]).removeClass('hide-value');
						$(src).parent().find('.cancel-field-btn').removeClass('visible');
						$(src).parent().find('.field-input').removeClass('visible');
						$(src).removeClass('visible').parent().find('.edit-field-btn').show();
					}else if(keyId=='demoVedioLink'){
						var demoLink=$('#demoVedioLink').val();
						$('.viewDemoVedioLink').html("<a href="+demoLink+" target='blank'>View</a>").removeClass('hide-value');
						$(src).parent().find('.cancel-field-btn').removeClass('visible');
						$(src).parent().find('.field-input').removeClass('visible');
						$(src).removeClass('visible').parent().find('.edit-field-btn').show();
					}else if(keyId=='admissionStatus'){
						var admissionStatus = $('#admissionStatus').val();
						$('.admissionStatus').removeClass('hide-value').text(admissionStatus);

						var documentRemarks = $("#documentRemarks").select2('data');
						console.log("documentRemarks ",documentRemarks);
						$('.documentRemarks, .documentRemarksDescription').removeClass('hide-value');
						for(i =0;i<documentRemarks.length;i++){
							if(i==0){
								$('.documentRemarks, .documentRemarksDescription').html('');
							}
							$('.documentRemarks, .documentRemarksDescription').append([i+1]+'. '+documentRemarks[i].text+'</br/>');
						}

						$(src).removeClass('visible').parent().find('.edit-field-btn').show();
						$(src).parent().find('.field-value').removeClass('hide-value');
						$(src).parent().find('.field-input, .iti--allow-dropdown, .select2').removeClass('visible')
						$(src).parent().find('.cancel-field-btn').removeClass('visible');
					}else if(keyId=='extendValidity'){
						location.reload();
					}else if(keyId=='shift'){
						$(src).removeClass('visible').parent().find('.edit-field-btn').show();
						if(fieldValue == 'M'){
							$(src).parent().find('.field-value').removeClass('hide-value').text("Morning");
						}else if(fieldValue == 'E'){
							$(src).parent().find('.field-value').removeClass('hide-value').text("Evening");
						}
						$(src).parent().find('.field-input, .iti--allow-dropdown, .select2').removeClass('visible')
						$(src).parent().find('.cancel-field-btn').removeClass('visible');
					}else{
						$(src).removeClass('visible').parent().find('.edit-field-btn').show();
						$(src).parent().find('.field-value').removeClass('hide-value').text(fieldValue);
						$(src).parent().find('.field-input, .iti--allow-dropdown, .select2').removeClass('visible')
						$(src).parent().find('.cancel-field-btn').removeClass('visible');
					}
		      		showMessageTheme2(1, data['message'],'',false);
				}
				return false;
			}
		});
}

//  select dropdown script
$(document).mouseup(function(e){
  var optionContainer = $(".select-option-wrapper");
  // if (!optionContainer.is(e.target) && optionContainer.has(e.target).length === 0){
  if (!optionContainer.is(e.target)){
      optionContainer.hide().removeClass('edge');

  }
});

$(function () {
    $(".select-option-input").on('click', function (e) {
      $(this).parent().find('.select-option-wrapper').show();
        if ($('.select-option-wrapper').length) {
            var scrollTop = $(window).scrollTop();
            var elm = $(this).parent();
            var dropdownHeight = $(this).parent().find('.select-option-wrapper').height()
            var off = elm.offset();
            var l = off.top;
            var docH = $(window).height();
            var currentElementOffset = l - scrollTop;
            var bottom = docH - currentElementOffset - elm.height();
           if (bottom > dropdownHeight) {
                $(this).parent().find('.select-option-wrapper').removeClass('edge');

            } else {
                $(this).parent().find('.select-option-wrapper').addClass('edge');
            }
        }
    });
});
$('.select-option-wrapper .option').click(function(){
  var selectedValue = $(this).text();
  $(this).parent().closest('.select-option-field').find('.select-option-input').val(selectedValue)
});


//
$("#separate-user").click(function(){
  if($(this).is(":checked") == true){
    $('.separate-user-for-parent').slideDown()
  }
  else{
    $('.separate-user-for-parent').slideUp()
  }
});

$('.show-stu-confirmation').click(function(){
  $('.stu-confirmation').slideDown();
});

$('#documentRemarks').on('change', function(){
	if($(this).val() == "OTHER"){
		$('.documentRemarksDescription').html('');
		//$('.documentRemarksDescription').focus();
	}else{
		$('.documentRemarksDescription').html($('#documentRemarks option:selected').attr('statusDescription'));
		//$('.documentRemarksDescription').focus();
	}

	$('.documentRemarksDescription').addClass('visible');
});
$(".multiselect-dropdown").select2({
    theme: "bootstrap4",
    placeholder: "Select an option"
});
$(".multiselect-dropdown_special").select2({
    theme: "bootstrap4",
    maximumSelectionLength: 5,
    placeholder: "Select an option"
});
$(".multiselect_dropdown_pref_courses").select2({
    theme: "bootstrap4",
    maximumSelectionLength: 5,
    placeholder: "Select an option"
});
$(".multiselect_course_taught").select2({
    theme: "bootstrap4",
    maximumSelectionLength: 5,
    placeholder: "Select an option"
});

$(".multiselectDropdown").select2({
    theme: "bootstrap4",
    placeholder: "Select an option"
});
$(".multiselectDropdown1").select2({
    theme: "bootstrap4",
    placeholder: "Select an option"
});
$(".multiselectDropdown2").select2({
    theme: "bootstrap4",
    placeholder: "Select an option"
});
$(".multiselectDropdown3").select2({
    theme: "bootstrap4",
    placeholder: "Select an option"
});
$(".multiselectDropdown4").select2({
    theme: "bootstrap4",
    placeholder: "Select an option"
});
$(".multiselectDropdown5").select2({
    theme: "bootstrap4",
    placeholder: "Select an option"
});

$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
	var tabID = $(this).attr('tabid');
	changeSelect(tabID)

});
function changeSelect(tabID) {


	$('.multiselectDropdown').select2({
	    theme: "bootstrap4",
	    placeholder: "Select an option"
    }).change(function (e) {
    	e.preventdefault;
         var gradesLength = $('.multiselectDropdown :selected').length;
         if(gradesLength > 0){
        	  $('#middleSchool select').prop('disabled', true);
        	  $('#highSchool select').prop('disabled', true);
          }
         else{
        	 $('#middleSchool select').prop('disabled', false);
       	  	$('#highSchool select').prop('disabled', false);
         }
        });
	$('.multiselectDropdown1').select2({
	    theme: "bootstrap4",
	    placeholder: "Select an option"
    }).change(function (e) {
    	e.preventdefault;
        var gradesLength = $('.multiselectDropdown1 :selected').length;
        if(gradesLength > 0){
        	  $('#kindergarten select').prop('disabled', true);
        	  $('#highSchool select').prop('disabled', true);
          }
       else{
    	    $('#kindergarten select').prop('disabled', false);
      	  	$('#highSchool select').prop('disabled', false);
        }
        });
	$('.multiselectDropdown2').select2({
	    theme: "bootstrap4",
	    placeholder: "Select an option"
    }).change(function (e) {
    	e.preventdefault;
        var gradesLength = $('.multiselectDropdown2 :selected').length;
        if(gradesLength > 0){
        	  $('#kindergarten select').prop('disabled', true);
        	  $('#middleSchool select').prop('disabled', true);
          }
        else{
        	$('#kindergarten select').prop('disabled', false);
      	  	$('#middleSchool select').prop('disabled', false);
        }
        });

	$('.multiselectDropdown3').select2({
	    theme: "bootstrap4",
	    placeholder: "Select an option"
    }).change(function (e) {
    	e.preventdefault;
         var gradesLength = $('.multiselectDropdown3 :selected').length;
         if(gradesLength > 0){
        	  $('#currentMiddleSchool select').prop('disabled', true);
        	  $('#currentHighSchool select').prop('disabled', true);
          }
         else{
        	 $('#currentMiddleSchool select').prop('disabled', false);
       	  	$('#currentHighSchool select').prop('disabled', false);
         }
        });
	$('.multiselectDropdown4').select2({
	    theme: "bootstrap4",
	    placeholder: "Select an option"
    }).change(function (e) {
    	e.preventdefault;
        var gradesLength = $('.multiselectDropdown4 :selected').length;
        if(gradesLength > 0){
        	  $('#currentKindergartenSchool select').prop('disabled', true);
        	  $('#currentHighSchool select').prop('disabled', true);
          }
       else{
    	    $('#currentKindergartenSchool select').prop('disabled', false);
      	  	$('#currentHighSchool select').prop('disabled', false);
        }
        });
	$('.multiselectDropdown5').select2({
	    theme: "bootstrap4",
	    placeholder: "Select an option"
    }).change(function (e) {
    	e.preventdefault;
        var gradesLength = $('.multiselectDropdown5 :selected').length;
        if(gradesLength > 0){
        	  $('#currentKindergartenSchool select').prop('disabled', true);
        	  $('#currentMiddleSchool select').prop('disabled', true);
          }
        else{
        	$('#currentKindergartenSchool select').prop('disabled', false);
      	  	$('#currentMiddleSchool select').prop('disabled', false);
        }
        });
	/*alert("#" +tabID)*/
	$("#" +tabID).find('.select2').addClass('visible');
}

$('.save-field-btn').on('click', function(){
	$(".multiselect-dropdown").select2("close");
});
$(".select_dropdown").select2({
    theme: "bootstrap4",
    placeholder: "Select an option",
     minimumResultsForSearch: Infinity
});

function hideRemarksAndDescription(data){
	console.log(data);
	if(data=='Admission Under Review' || data=='Admission Confirmed' || data=='Admission Not Confirmed'){
		$('#documentRemarksDiv').hide();
		$('#documentRemarksDescriptionDiv').hide();
	}else{
		$('#documentRemarksDiv').show();
		$('#documentRemarksDescriptionDiv').show();
		$('.documentRemarksDescription').html('');
		resetDropdown($('#documentRemarks'), 'Select Remarks');
		$.ajax({
			type : "POST",
			contentType : "application/json",
			url : getURLForCommon('masters'),
			data : JSON.stringify(getRequestForMaster('formId','REMARKS-LIST-BY-ADMISSION-TYPE', data)),
			dataType : 'json',
			cache : false,
			timeout : 600000,
			async : false,
			success : function(data) {
				if (data['status'] == '0' || data['status'] == '2') {
					showMessage(true, data['message']);
				} else {
					var result = data['mastersData']['remarksList'];
					var dropdown = $('#documentRemarks');
					dropdown.html('');
					dropdown
					.append('<option value="0" disabled>Select Remarks</option>');
					$.each(result, function(k, v) {
						dropdown.append('<option value="' + v.key + '" statusDescription="' + v.extra + '">'+ v.value + ' </option>');
					});
				}
			}
		});
	}

}

function getDocumentRemarksDescription(documentstatusId){
	var dsId =['0'];
	if($("#documentRemarks").val() !=0 && $("#documentRemarks").val() !=undefined && $("#documentRemarks").val() !='' ){
		dsId= $("#documentRemarks").select2('val');
	}
	console.log("Values :: ",dsId);
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForCommon('masters'),
		data : JSON.stringify(getRequestForMaster('formId',
				'REMARKS-DESCRIPTION-BY-ID','value','extra','extra1','extra2',dsId)),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		async : false,
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				showMessage(true, data['message']);
			} else {
				var result = data['mastersData']['remarksList'];
				var dropdown = '';//$('.documentRemarksDescription').html();
				$.each(result, function(k, v) {
					if(dropdown==''){
						dropdown = v.orderBy +". "+v.value;
					}else{
						dropdown= dropdown+"</br>"+v.orderBy+ ". "+v.value;
					}
				});
				$('.documentRemarksDescription').html(dropdown);
			}
		}
	});
}


