$(document).ready(function() {
});

function validateRequestForUplodDocumentOnAdmissionForm(formId){
	var backrequired = $('#profilePicProof option').filter(':selected').attr('backrequired');
	if(getImageObject('1Front')==''){
		if(backrequired == 'true'){
			showMessage(0, 'Please capture or upload front side of Passport Size Photo','',false);
		}else{
			showMessage(0, 'Please capture or upload Passport Size Photo','',false);
		}
		return false;
	}
	if(backrequired == 'true'){
		if(getImageObject('1Back')==''){
			showMessage(0, 'Please capture or upload back side of Passport Size Photo','',false);
			return false;
		}
	}
	if(!$('#dobProof').is(':disabled')){
		if($('#dobProof').val()==undefined || $('#dobProof').val()==0){
			showMessage(0, 'Please Select Document Type of Date of Birth Proof','',false);
			return false;
		}
		var backrequired = $('#dobProof option').filter(':selected').attr('backrequired');
		if(getImageObject('2Front')==''){
			if(backrequired == 'true'){
				showMessage(0, 'Please capture or upload front side of '+$('#dobProof').val(),'',false);
			}else{
				showMessage(0, 'Please capture or upload '+$('#dobProof').val(),'',false);
			}
			return false;
		}
		if(backrequired == 'true'){
			if(getImageObject('2Back')==''){
				showMessage(0, 'Please capture or upload back side of '+$('#dobProof').val(),'',false);
				return false;
			}
		}
	}
	if($('#lastAcademicProof').length>0){
		//if(!$('#lastAcademicProof').is(':disabled')){
			if($('#lastAcademicProofValidity').val()==undefined || $('#lastAcademicProofValidity').val()==0){
				showMessage(0, 'Please Select an Option for Last Academic Proof','',false);
				return false;
			}
			if($('#lastAcademicProofValidity').val()=='Upload Now'){
				var backrequired = $('#lastAcademicProof option').filter(':selected').attr('backrequired');
				if(getImageObject('5Front')==''){
					if(backrequired == 'true'){
						showMessage(0, 'Please capture or upload front side of Last Academic Proof','',false);
					}else{
						showMessage(0, 'Please capture or upload Last Academic Proof','',false);
					}
					return false;
				}
				if(backrequired == 'true'){
					if(getImageObject('5Back')==''){
						showMessage(0, 'Please capture or upload back side of Last Academic Proof','',false);
						return false;
					}
				}
			}
		//}
	}
	return true;
}

function uploadAcademicDocument(formId) {
	hideMessage('');
	if(!validateRequestForUplodDocumentOnAdmissionForm(formId)){
		return false;
	}
	$('#uploadDocumentbtn').attr('disabled',true);
	var flag=false
	customLoaderSignup(true);
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForHTML('student','signup/stage-5-upload-document'),
		data : JSON.stringify(getRequestForUploadDocumentAdmissionForm(formId)),
		dataType : 'html',
		async : false,
		global : false,
		success : function(htmlContent) {
			customLoaderSignup(false);
			if(htmlContent!=""){
            	var stringMessage = [];
            	stringMessage = htmlContent.split("|");
        		if(stringMessage[0] == "FAILED" || stringMessage[0] == "EXCEPTION" || stringMessage[0] == "SESSIONOUT"){
        			if(stringMessage[0] == "SESSIONOUT"){
        				redirectLoginPage();
        			}else {
        				showMessage(0, stringMessage[1]);
        			}
        		} else {
        			$('#signupStage7Content').html(htmlContent)
        			showMessage(1, 'Subject updated successfully.');
        			setTimeout(function(){
        				hideMessage('');
        			}, 3000);
        			hideModalMessage();
        			flag=true;
        		}
			}
		},
		error : function(e) {
			customLoaderSignup(false);
			showMessage(0, TECHNICAL_GLITCH);
		}
	});
	return flag;
}
function getRequestForUploadDocumentAdmissionForm(formId){
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

	requestForUploadDocument['authentication'] = authentication;
	requestForUploadDocument['uploadFile'] = uploadFileArray;
	return requestForUploadDocument;
}