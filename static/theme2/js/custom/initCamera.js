function captureImagePP(modalID, index, label){
	$("#"+modalID).modal({backdrop: 'static', keyboard: false})
	$('#imageCaptureLabel').html(label);
	$('#cameraPosition').show();
    Webcam.set({
        width: 565,
        height: 427,
        image_format: 'jpeg',
        jpeg_quality: 92
    });
    Webcam.attach('#cameraPosition');
    $('#captureBtns').hide();
    $('#captureImage').hide();
    $('#takeSnapshot').show();
    $('#fileuploadimg img').hide();
    $('#snapshotId').attr('onClick','takeSnapshot(\''+index+'\')');
    $('#captureId').attr('onClick','capturePhoto(\''+modalID+'\',\''+index+'\')');
    $('#declineId').attr('onClick','declinePhoto(\''+modalID+'\', \''+index+'\')');
}
function captureImage(modalID, index, label){
	$("#"+modalID).modal({backdrop: 'static', keyboard: false})
	$('#imageCaptureLabel').html(label);
	$('#cameraPosition').show();
    Webcam.set({
        width: 565,
        height: 427,
        image_format: 'jpeg',
        jpeg_quality: 92
    });
    Webcam.attach('#cameraPosition');
    $('#captureBtns').hide();
    $('#captureImage').hide();
    $('#takeSnapshot').show();
    $('#fileuploadimg img').hide();
    $('#snapshotId').attr('onClick','takeSnapshot(\''+index+'\')');
    $('#captureId').attr('onClick','capturePhoto(\''+modalID+'\',\''+index+'\')');
    $('#declineId').attr('onClick','declinePhoto(\''+modalID+'\', \''+index+'\')');
}
function takeSnapshot(index) {
	Webcam.snap( function(data_uri) {
        $('#fileuploadimg img').attr('src', data_uri);
    } );
    $('#cameraPosition').hide();
    $('#takeSnapshot').hide();
    $('#captureBtns').show();
    $('#fileuploadimg img').show();
}

function capturePhoto(modalID, index) {
	$('#cameraPosition').hide()
    $('#takeSnapshot').hide()
	setImageObject(index, $('#fileuploadimg img').attr('src'))
    $('#fileuploadimg img').show()
    $('#captureImage').show()
    $('.fileupload'+index+'Validity').hide();
    $("#"+modalID).modal("hide");
  	isDocumnetUpload(true, index)
}

function declinePhoto(modalID, index, needToOverried) {
	console.log($('#fileupload'+index+'Validity').css('display'))
    $('#fileupload'+index+'Validity').css('display','block')
    $('#cameraPosition').hide()
    $('#takeSnapshot').hide()
    $('#captureBtns').hide();
    if(needToOverried==undefined){
    	$('#fileuploadimg img').attr('src', getImageObject(index))
	}
    $('#captureImage').show();
    $("#"+modalID).modal("hide");
    isDocumnetUpload(false, index)
}

function changeLastAcademicProof(elementId, index){
	var selectedValue = $('#'+elementId).val();
	/*
	if ($('#'+elementId).hasClass("select2-hidden-accessible")) {
		selectedValue = $('#'+elementId).select2("val");
	}else{
		selectedValue = $('#'+elementId).val();
	}
	*/
	removeDocumentFinal('5Front')
	if(selectedValue == "Upload Now"){
		$("#captureOrUploadImage5Front").show();
		if(getImageObject('5Front')!=''){
			$("#fileupload5FrontUploadDiv").show();
		}else{
			$("#fileupload5FrontUploadDiv").hide();
		}
	}else{
		$("#captureOrUploadImage5Front, #fileupload5FrontUploadDiv").hide();
	}
}

function documentBackReuired(id, index){
	$('#fileupload'+index+'FrontUploadDiv').hide();
	$('#fileupload'+index+'BackUploadDiv').hide();
	removeDocumentFinal(index+'Front');
	removeDocumentFinal(index+'Back');
	if( $('#'+id).val()==null || $('#'+id).val()=='0' || $('#'+id).val()==''){
		return false;
	}
	var backrequired = $('#'+id+' option').filter(':selected').attr('backrequired');
	if(backrequired == 'true'){
		$("#backrequired"+index+"ForntLabel").html('Front Side');
		if(pageFor=='PROFILE-VIEW'){
			$("#backrequired"+index+"BackDiv").css({'display':'flex'});
			if(USER_ROLE=='STUDENT'){
				$('#'+id+'CameraDivBack').show();
			}
			$('#'+id+'UploadDivBack').show();
		}else{
			$("#backrequired"+index+"BackDiv").show();
		}
	}else{
		$("#backrequired"+index+"ForntLabel").html('&nbsp;');
		$("#backrequired"+index+"BackDiv").hide();
	}
}
function isDocumnetUpload(flag, index){
	if(flag){
		$('#fileupload'+index+'UploadDiv').show();
		$('#fileupload'+index+'UploadStatus').removeClass('fa-times text-danger').addClass('fa-check text-success');
		$('#fileupload'+index+'View').show();
		$('#fileupload'+index+'Remove').show();
	}else{
		$('#fileupload'+index+'UploadStatus').removeClass('fa-check text-success').addClass('fa-times text-danger');
		$('#fileupload'+index+'View').hide();
		$('#fileupload'+index+'Remove').hide();
	}
}