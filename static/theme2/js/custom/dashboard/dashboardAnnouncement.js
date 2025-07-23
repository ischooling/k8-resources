// $(".announcement-anchor .announcement-list").unbind("click").bind("click", function() {
//     $(this).parent().find(".horizontal-scroll-table").slideToggle();
//     $(this).parent().closest("li").siblings().find(".horizontal-scroll-table").slideUp();
// });
function getSingleSignOnUrl(userId,schoolId){
	$.ajax({
		type : "GET",
		contentType : "application/json",
		url : getURLForWithoutUnique('student','get-single-signon-url'),
		data : "userId="+userId+"&schoolId="+schoolId,
		dataType : 'json',
		async  : false,
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2'|| data['status'] == '3') {
				if(data['status'] == '3'){
					redirectLoginPage();
				}else{
					if(tt=='theme2'){
						showMessageTheme2(2, data['message'],'',true);
					}else if(tt=='theme1'){
						showMessage(true, data['message']);
					}
				}
			}else {
				getPrepareLmsJsondata('lmsInfo',data);
				if(USER_ROLE=='STUDENT'){
					var html=''
					$.each(data['singleSignonUrl'], function(k, v) {
						html+='<div class="page-title-wrapper">'
							+'<div class="page-title-heading">'
								+'<div class="page-title-icon p-1"> <i class="pe-7s-users icon-gradient bg-ripe-malin"> </i> </div>'
								+'<div>'+data['profileName']+'</div>'
							+'</div>'
							+'<div class="page-title-actions">';
								if(v['lmsEnabled']=='Y' && v['inHouseLms']=='N' && v['lmsProviderId']==36){
									html+=
									'<div class="d-inline-block">'
										+'<label class="switch">'
											+'<input class="switch-input" id=redirectLmsUrl type="checkbox" value="yes" onclick="redirectLms();" changeUrl="'+v['lmsProviderSSOUrl']+'" />'
											+'<span class="switch-label" data-on="" data-off="LMS"></span> <span class="switch-handle"></span>'
										+'</label>'
									+'</div>';
								}
							html+=
							'</div>'
						+'</div>';
					});
					$('#studentTitleContent').html(html);
				}
			}
		},
		error : function(e) {
			if(tt=='theme2'){
				showMessageTheme2(2, TECHNICAL_GLITCH,'',true);
			}else if(tt=='theme1'){
				showMessage(true, TECHNICAL_GLITCH);
			}
		}
	});
}

function getAnnouncement(userId,schoolId,moduleId,role){
	$.ajax({
		type : "GET",
		contentType : "application/json",
		url : getURLForWithoutUnique('student','announcement'),
		data : "userId="+userId+"&schoolId="+schoolId,
		dataType : 'json',
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2'|| data['status'] == '3') {
				if(data['status'] == '3'){
					redirectLoginPage();
				}else{
					if(tt=='theme2'){
						showMessageTheme2(2, data['message'],'',true);
					}else if(tt=='theme1'){
						showMessage(true, data['message']);
					}
				}
			}else {
				var newAnnouncementCount = parseInt(data['newAnnouncementCount']);
				$('.announcementCount').html(newAnnouncementCount>0?newAnnouncementCount+' New Announcements':'');
				$('.announcementCountToggle').html('New Announcements : '+newAnnouncementCount);
				var htmlli='';
				$.each(data['schoolAnnounceDTO'], function(innerIndex, annoucement) {
					htmlli+=
					'<li class="col-md-12 col-sm-12 col-12 p-0">'
						+'<div class="announcement-anchor" onclick="showAnnounceDataById('+annoucement.announceId+','+moduleId+')">'
							+'<div class="announcement-list">'
								+'<span class="annoucement-icon">'
									+'<i class="fa fa-bullhorn"></i>'
									+(annoucement.replyStatus=='N'?'<label class="new-label ann_new_label_id'+annoucement.announceId+'">New</label>':'')
								+'</span>'
								+'<h4 class="announcement-title">'
									+'<span>'
										+annoucement.announceTitle
										+(annoucement.replyStatus=='N' && annoucement.latestStstus=='Y'?'<label class="m-0 announcement-ribbon ann_new_label_id'+annoucement.announceId+'">LATEST</label><i class="fa fa-star announcement-ribbon-star ann_new_label_id'+annoucement.announceId+'"></i>':'')
									+'</span>'
								+'</h4>'
							+'</div>'
						+'</div>'
					'</li>';
				});
				$('.announcements').html('<ul>'+htmlli+'</ul>');
			}
		},
		error : function(e) {
			if(tt=='theme2'){
				showMessageTheme2(2, TECHNICAL_GLITCH,'',true);
			}else if(tt=='theme1'){
				showMessage(true, TECHNICAL_GLITCH);
			}
		}
	});
}
function showAnnounceDataById(announceId,moduleId) {
	hideMessage('');
	$.ajax({
		type : "POST",
		url : getURLForHTML('dashboard','school-announce-data'),
		data : "announceId="+announceId+"&moduleId="+moduleId,
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
					}else{
						if(tt=='theme2'){
							showMessageTheme2(2, stringMessage[1],'',true);
						}else if(tt=='theme1'){
							showMessage(true, stringMessage[1]);
						}
					}
				} else {
					$('#announceDataId').html(htmlContent);
				}
				return false;
			}
		},
		error : function(e) {
			if(tt=='theme2'){
				showMessageTheme2(2, TECHNICAL_GLITCH,'',true);
			}else if(tt=='theme1'){
				showMessage(true, TECHNICAL_GLITCH);
			}
			return false;
		}
	});
}

function saveAnnouncementAcknowledge(announceId, userId,roleModuleId) {
	hideMessage('');
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForHTML('dashboard','save-acknowledge-request'),
		data : JSON.stringify(getRequestForAnnouncementAcknowledge(announceId, userId,roleModuleId)),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2' || data['status'] == '3') {
				if(data['status'] == '3'){
					redirectLoginPage();
				}else{
					if(tt=='theme2'){
						showMessageTheme2(0,data['message'],'',false);
					}else if(tt=='theme1'){
						showMessage(true, data['message']);
					}
				}
			} else {
				//$('#announcementbyIdData').modal('hide');
				$('.ann_new_label_id'+announceId).remove();
				$('.acknowledgeTr'+announceId).html('<button class="btn btn-sm btn-success"><i class="fa fa-check"></i></button>');
				if(tt=='theme2'){
					showMessageTheme2(1,data['message'],'',false);
				}else if(tt=='theme1'){
					showMessage(true, data['message']);
				}
			}
			return false;
		},
		error : function(e) {
			if(tt=='theme2'){
				showMessageTheme2(2, TECHNICAL_GLITCH,'',true);
			}else if(tt=='theme1'){
				showMessage(true, TECHNICAL_GLITCH);
			}
			return false;
		}
	});
}
function getRequestForAnnouncementAcknowledge(announceId, userId,roleModuleId){
	var appCommonAuthRequest = {};
	var authentication = {};
	var requestData = {};
	
	requestData['announceId'] = announceId;
	requestData['userId'] = userId;
	requestData['moduleId'] = roleModuleId;
	authentication['hash'] = getHash();authentication['schoolId'] = SCHOOL_ID;authentication['schoolUUID'] = SCHOOL_UUID;
	authentication['userId'] = userId;
	appCommonAuthRequest['authentication'] = authentication;
	appCommonAuthRequest['requestData'] = requestData;
	return appCommonAuthRequest;
}		
function announcementModal(announceId, announcementTitle,announcementDate,announcementTime, announceTeachRemarks, fileType, fileName, replyStatus){
	$('#announcementID').modal('show');
	$('#announceId').val(announceId);
	$('#announceTitle').html(announcementTitle);
	$('#announceDate').html(announcementDate);
	$('#announceTime').html(announcementTime);
	$('#announceTeachRemarks').html("<b>Remarks: </b>"+announceTeachRemarks);
	$("#pdfViewDiv").css("display", "none");
	$("#imgViewDiv").css("display", "none");
	$("#saveAnnouncementAcknowledgeId").css("display", "none");
	$('#attachmentImg').attr('onClick', '');
	$('#attchmentPdf').attr('href', '');
	if('IMAGE'==fileType){
		$("#imgViewDiv").css("display", "block");
		$('#attachmentImg').attr('onClick', 'showDocument("'+fileName+'")');
	}else if('FILE'==fileType){
		$("#pdfViewDiv").css("display", "block");
		$('#attchmentPdf').attr('href', fileName);
	}
	if('N'==replyStatus){
		$("#saveAnnouncementAcknowledgeId").css("display", "block");
	}
}


