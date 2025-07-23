function getEmailLogsContent(title, newTheme) {
	var html = 
			'<div class="main-card mb-3">'
				+'<div class="card">';
					if (newTheme) {
 
					} else {
						html += '<div class="card-header card-header-primary"><h4 class="card-title">' + title + '</h4></div>';
					}
					html+='<div class="card-body">'
								+'<form id="emailLogForm" action="javascript:void(0);">'
									+'<div class="row p-4">'
										+'<div class="col-lg-4 col-md-6 col-sm-6 col-xs-12">'
											+'<label class="m-0 full">Enter Email</label>'
											+'<input type="text" id="getEmail" class="form-control" />'
										+'</div>'
										+'<div class="col-lg-4 col-md-6 col-sm-6 col-xs-12">'
											+'<label class="m-0 full">Start Date</label>'
											+'<input type="text" id="startDate" class="form-control" />'
										+'</div>'
										+'<div class="col-lg-4 col-md-6 col-sm-6 col-xs-12">'
											+'<label class="m-0 full">End Date</label>'
											+'<input type="text" id="endDate" class="form-control" />'
										+'</div>'
										+'<div class="col-xs-12 text-right">'
											+'<button class="btn btn-sm btn-primary" onclick="getEmailLogsByEmail()">Search</button>'
										+'</div>'
									+'</div>'
								+'</form>'
							+'</div>'
						+'<div id="logsDataTableWrapper" class="p-4">'
					+'</div>'
				+'</div>'
			+'</div>';

	+getEmailLogsByEmail()
	return html;

}

function emailLogsSlidePopupContent(){
	var html =
			'<div class="email_logs_slide_popup card m-0">'
				+'<div class="card-header card-header-primary d-flex m-0">'
					+'<h4 class="card-title">Email Logs</h4>'
					+'<span style="width:35px;line-height:24px;cursor:pointer;margin-left:auto;text-align:center" onclick="closeSlideContent()">'
						+'<i class="fa fa-times"></i>'
					+'</span>'
				+'</div>'
				+'<div class="card-body p-4">'
					+'<div class="col p-0"><b>Details</b></div>'
					+'<div class="d-flex mb-2 pl-2">'
						+'<div style="min-width:100px">Send on</div>'
						+'<div id="mailTime"></div>'
					+'</div>'
					+'<div class="d-flex mb-2 pl-2">'
						+'<div style="min-width:100px">Sent To</div>'
						+'<div id="sendTo"></div>'
					+'</div>'
					+'<div class="d-flex mb-2 pl-2">'
						+'<div style="min-width:100px">CC</div>'
						+'<div id="cc"></div>'
					+'</div>'
					+'<div class="d-flex mb-2 pl-2">'
						+'<div style="min-width:100px">BCC</div>'
						+'<div id="bcc"></div>'
					+'</div>'
					+'<div class="d-flex mb-2 pl-2">'
						+'<div style="min-width:100px">Subject</div>'
						+'<div id="emailSubject"></div>'
					+'</div>'
					+'<div class="iframe-content mt-3">'
						+'<iframe id="emailTemplate" src="" width="100%" onload="resizeIframe(this)">'
						+'</iframe>'
					+'</div>'
					+'<div class="mb-2 pl-2">'
						+'<div><b>Attachment</b></div>'
						+'<div id="attachment">'
							// +'<a href="" target="_blank" class="d-line-block mr-3"><i class="fa fa-paperclip"></i>&nbsp;sdfsadf3241234safasfd</a>'
						+'</div>'
					+'</div>'
				+'</div>'
			+'</div>';
		return html;	
}



