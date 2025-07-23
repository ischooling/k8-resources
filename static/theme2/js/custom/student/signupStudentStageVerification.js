$(document).ready(function() {
});

function validateRequestForUplodDocument(formId){
	var backrequired = $('#profilePicProof option').filter(':selected').attr('backrequired');
	if(getImageObject('1Front')==''){
		if(backrequired == 'true'){
			if(pageFor=='PROFILE-VIEW'){
				showMessageTheme2(0, 'Please capture or upload front side of Passport Size Photo','',false);
			}else{
	        	showMessage(0, 'Please capture or upload front side of Passport Size Photo','',false);
			}
		}else{
			if(pageFor=='PROFILE-VIEW'){
				showMessageTheme2(0, 'Please capture or upload Passport Size Photo','',false);
			}else{
				showMessage(0, 'Please capture or upload Passport Size Photo','',false);
			}
		}
		return false;
	}
	if(backrequired == 'true'){
		if(getImageObject('1Back')==''){
			if(pageFor=='PROFILE-VIEW'){
				showMessageTheme2(0, 'Please capture or upload back side of Passport Size Photo','',false);
			}else{
				showMessage(0, 'Please capture or upload back side of Passport Size Photo','',false);
			}
			return false;
		}
	}
	if($('#fileupload1FrontValidity').length>0 && $('#fileupload1FrontValidity').is(':visible')){
		if(pageFor=='PROFILE-VIEW'){
			showMessageTheme2(0, 'Please capture or upload Passport Size Photo','',false);
		}else{
			showMessage(0, 'Please capture or upload Passport Size Photo','',false);
		}
		return false;
	}
	if(!$('#dobProof').is(':disabled')){
		if($('#dobProof').val()==undefined || $('#dobProof').val()==0){
			if(pageFor=='PROFILE-VIEW'){
				showMessageTheme2(0, 'Please Select Document Type of Date of Birth Proof','',false);
			}else{
				showMessage(0, 'Please Select Document Type of Date of Birth Proof','',false);
			}
			return false;
		}
		var backrequired = $('#dobProof option').filter(':selected').attr('backrequired');
		if(getImageObject('2Front')==''){
			if(backrequired == 'true'){
				if(pageFor=='PROFILE-VIEW'){
					showMessageTheme2(0, 'Please capture or upload front side of '+$('#dobProof').val(),'',false);
				}else{
					showMessage(0, 'Please capture or upload front side of '+$('#dobProof').val(),'',false);
				}
			}else{
				if(pageFor=='PROFILE-VIEW'){
					showMessageTheme2(0, 'Please capture or upload '+$('#dobProof').val(),'',false);
				}else{
					showMessage(0, 'Please capture or upload '+$('#dobProof').val(),'',false);
				}
			}
			return false;
		}
		if(backrequired == 'true'){
			if(getImageObject('2Back')==''){
				if(pageFor=='PROFILE-VIEW'){
					showMessageTheme2(0, 'Please capture or upload back side of '+$('#dobProof').val(),'',false);
				}else{
					showMessage(0, 'Please capture or upload back side of '+$('#dobProof').val(),'',false);
				}
				return false;
			}
		}
		if($('#fileupload2FrontValidity').length>0 && $('#fileupload2FrontValidity').is(':visible')){
			if(pageFor=='PROFILE-VIEW'){
				showMessageTheme2(0, 'Please capture or upload Date of Birth Proof','',false);
			}else{
				showMessage(0, 'Please capture or upload Date of Birth Proof','',false);
			}
			return false;
		}
	}
	if($('#lastAcademicProof').length>0){
		var validity=$('#lastAcademicProofValidity').val();
		if(validity=='Invalid' || validity=='Not Clear' || validity=='Required' || validity=='Upload Now' || validity=='0' ){
			if($('#lastAcademicProofValidity').val()==undefined || $('#lastAcademicProofValidity').val()==0){
				if(pageFor=='PROFILE-VIEW'){
					showMessageTheme2(0, 'Please Select an Option for Last Academic Proof','',false);
				}else{
					showMessage(0, 'Please Select an Option for Last Academic Proof','',false);
				}
				return false;
			}
			if($('#lastAcademicProofValidity').val()=='Upload Now'){
				var backrequired = $('#lastAcademicProof option').filter(':selected').attr('backrequired');
				if(getImageObject('5Front')==''){
					if(backrequired == 'true'){
						if(pageFor=='PROFILE-VIEW'){
							showMessageTheme2(0, 'Please capture or upload front side of Last Academic Proof','',false);
						}else{
							showMessage(0, 'Please capture or upload front side of Last Academic Proof','',false);
						}
					}else{
						if(pageFor=='PROFILE-VIEW'){
							showMessageTheme2(0, 'Please capture or upload Last Academic Proof','',false);
						}else{
							showMessage(0, 'Please capture or upload Last Academic Proof','',false);
						}
					}
					return false;
				}
				if(backrequired == 'true'){
					if(getImageObject('5Back')==''){
						if(pageFor=='PROFILE-VIEW'){
							showMessageTheme2(0, 'Please capture or upload back side of Last Academic Proof','',false);
						}else{
							showMessage(0, 'Please capture or upload back side of Last Academic Proof','',false);
						}
						return false;
					}
				}
			}
		}
		if($('#fileupload5FrontValidity').length>0 && $('#fileupload5FrontValidity').is(':visible')){
			if(pageFor=='PROFILE-VIEW'){
				showMessageTheme2(0, 'Please capture or upload Last Academic Proof','',false);
			}else{
				showMessage(0, 'Please capture or upload Last Academic Proof','',false);
			}
			return false;
		}
	}
	if($('#otherDocumentProof').length>0){
		var validity=$('#otherDocumentProofValidity').val();
		if(validity=='Invalid' || validity=='Not Clear' || validity=='Required' ){
			if($('#otherDocumentProof').val()==undefined || $('#otherDocumentProof').val()==0){
				if(pageFor=='PROFILE-VIEW'){
					showMessageTheme2(0, 'Please Select Other Document Type','',false);
				}else{
					showMessage(0, 'Please Select Other Document Type','',false);
				}
				return false;
			}
			
			if($('#lastAcademicProof').val()=='Upload Now'){
				var backrequired = $('#lastAcademicProof option').filter(':selected').attr('backrequired');
				if(getImageObject('6Front')==''){
					if(backrequired == 'true'){
						if(pageFor=='PROFILE-VIEW'){
							showMessageTheme2(0, 'Please capture or upload front side of Other Document Proof','',false);
						}else{
							showMessage(0, 'Please capture or upload front side of Other Document Proof','',false);
						}
					}else{
						if(pageFor=='PROFILE-VIEW'){
							showMessageTheme2(0, 'Please capture or upload Last Academic Proof','',false);
						}else{
							showMessage(0, 'Please capture or upload Last Academic Proof','',false);
						}
					}
					return false;
				}
				if(backrequired == 'true'){
					if(getImageObject('6Back')==''){
						if(pageFor=='PROFILE-VIEW'){
							showMessageTheme2(0, 'Please capture or upload back side of Other Document Proof','',false);
						}else{
							showMessage(0, 'Please capture or upload back side of Other Document Proof','',false);
						}
						return false;
					}
				}
			}
		}
		if($('#fileupload6FrontValidity').length>0 && $('#fileupload6FrontValidity').is(':visible')){
			if(pageFor=='PROFILE-VIEW'){
				showMessageTheme2(0, 'Please capture or upload Other Document Proof','',false);
			}else{
				showMessage(0, 'Please capture or upload Other Document Proof','',false);
			}
			return false;
		}
	}
	return true;
}
function proceedToUploadDocument(formId, callingFrom,userId){
	hideMessage('');
	if(!validateRequestForUplodDocument(formId)){
		return false;
	}
	showWarningMessage('Are you sure you want to submit the documents?', 'uploadAcademicDocumentForApproval(\'signupStage7\',\''+callingFrom+'\',\''+userId+'\')');
}

function uploadAcademicDocumentForApproval(formId, callingFrom,userId) {
	var flag=false
	$('#uploadDocumentbtn').attr('disabled',true);
	customLoader(true);
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLFor('student','signup/stage-7'),
		data : JSON.stringify(getRequestForStudentUploadDocument(formId,callingFrom,userId)),
		dataType : 'json',
		async : false,
		global : false,
		success : function(data) {
			customLoader(false);
			if (data['status'] == '0' || data['status'] == '2') {
				if(pageFor=='PROFILE-VIEW'){
					showMessageTheme2(0, data['message'],'',false);
				}else{
					showMessage(0, data['message'],'messageDiv1',false);
				}
				$('#uploadDocumentbtn').attr('disabled',false);
				if(callingFrom=='verification'){
					$('#uploadDocumentbtn').show();
				}else if(callingFrom=='profile'){
					$('#uploadDocumentbtn').show();
				}
			}else{
				if(callingFrom=='verification'){
					$('#uploadDocumentbtn').hide();
				}else if(callingFrom=='profile'){
					$('#uploadDocumentbtn').hide();
				}
				if(pageFor=='PROFILE-VIEW'){
					showMessageTheme2(1, 'Your documents have been uploaded successfully for review','',false);
				}else{
					showMessage(1, 'Your documents have been uploaded successfully for review','messageDiv1',false);
				}
				$('#profilePicProof, #profilePicValidity, #dobProof, #ageProofValidity, #lastAcademicProof, #lastAcademicProofValidity, #otherDocumentProof, #otherDocumentProofValidity').attr('disabled','true');
				$('#captureOrUploadImage1Front, #captureOrUploadImage2Front, #captureOrUploadImage2Back, #captureOrUploadImage5Front, #captureOrUploadImage6Front').hide();
				$('#fileupload1FrontRemove, #fileupload2FrontRemove, #fileupload2BackRemove, #ileupload5FrontRemove, #ileupload6FrontRemove').hide();
				if(callingFrom=='verification'){
					$('.status-title').html('Admission Under Review')
					$('.status-message').html('<b>Your admission is under review. Please check the status of your child’s admission within 3-4 working days.</b>')
					$('#changeColourOnsave').addClass('text-warning');
				}
    			flag=true;
			}
		},
		error : function(e) {
			customLoader(false);
			showMessage(0, TECHNICAL_GLITCH);
		}
	});
	return flag;
}

function getRequestForStudentUploadDocument(formId,callingFrom, userId){
	var requestForUploadDocument = {};
	var authentication = {};
	authentication['hash'] = getHash();
	authentication['schoolId'] = SCHOOL_ID;
	authentication['schoolUUID'] = SCHOOL_UUID;
	authentication['userType'] = 'STUDENT';
	authentication['userId'] = $("#"+formId+" #userId").val();

	var uploadFileArray = [];
	var backrequired = $('#profilePicProof option').filter(':selected').attr('backrequired');
	if(getImageObject('1Front').startsWith("data")){
		var uploadFile1 = {};
		uploadFile1['attachmentType']=1;
		uploadFile1['proofName']='Passport Size Photo';
		uploadFile1['fileContent'] = getImageObject('1Front').split("base64,")[1];
		uploadFile1['fileType'] ="image";
		uploadFile1['fileName'] ="studentPassportPhoto.jpeg";
		uploadFileArray.push(uploadFile1);
	}
	backrequired = $('#dobProof option').filter(':selected').attr('backrequired');
	if($('#dobProof').length>0 && !$('#dobProof').is(':disabled')){
		var uploadFile2 = {};
		uploadFile2['attachmentType']=14;
		uploadFile2['proofName']=$('#dobProof').val();
		if(getImageObject('2Front').startsWith("data")){
			uploadFile2['fileContent'] = getImageObject('2Front').split("base64,")[1];
			uploadFile2['fileType'] ="image";
			uploadFile2['fileName'] ="studentAgeProofFront.jpeg";
		}
		uploadFileArray.push(uploadFile2);
	}
	if(backrequired == 'true'){
		var uploadFile2Back = {};
		uploadFile2Back['attachmentType']=32;
		uploadFile2Back['proofName']=$('#dobProof').val();
		if(getImageObject('2Back').startsWith("data")){
			uploadFile2Back['fileContent'] = getImageObject('2Back').split("base64,")[1];
			uploadFile2Back['fileType'] ="image";
			uploadFile2Back['fileName'] ="studentAgeProofBack.jpeg";
		}
		uploadFileArray.push(uploadFile2Back);
	}

	if($('#lastAcademicProofValidity').length>0 && !$('#lastAcademicProofValidity').is(':disabled')){
		var uploadFile5 = {};
		uploadFile5['attachmentType']=17;
		uploadFile5['proofName']=$('#lastAcademicProofValidity').val();
		if(getImageObject('5Front').startsWith("data")){
			uploadFile5['fileContent'] = getImageObject('5Front').split("base64,")[1];
			uploadFile5['fileType'] ="image";
			uploadFile5['fileName'] ="lastAcademicProof.jpeg";
		}
		uploadFileArray.push(uploadFile5);
	}

	if($('#otherDocumentProof').length>0 && !$('#otherDocumentProof').is(':disabled')){
		var uploadFile6 = {};
		uploadFile6['attachmentType']=9999;
		uploadFile6['proofName']=$('#otherDocumentProof').val();
		if(getImageObject('6Front').startsWith("data")){
			uploadFile6['fileContent'] = getImageObject('6Front').split("base64,")[1];
			uploadFile6['fileType'] ="image";
			uploadFile6['fileName'] ="otherDocumentProof.jpeg";
		}
		uploadFileArray.push(uploadFile6);
	}
	requestForUploadDocument['userId'] = userId;
	requestForUploadDocument['callingFrom'] = callingFrom;
	requestForUploadDocument['authentication'] = authentication;
	requestForUploadDocument['uploadFile'] = uploadFileArray;
	return requestForUploadDocument;
}