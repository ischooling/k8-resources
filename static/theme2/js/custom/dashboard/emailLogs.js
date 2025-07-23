function getEmailLogsByEmail() { 
    $.ajax({
        contentType: "application/json",
        type: "POST",
        url: getURLForHTML('dashboard', 'email-logs-data'),
        data: JSON.stringify(getEmailLogsByEmailPayload()),
        success: function (data) {
            if (data['status'] == '0' || data['status'] == '2') {
                showMessage(true, data['message']);
                return false;
            } else {
                var isDataTable = $.fn.dataTable.isDataTable('#emailLogsTable');
                if (isDataTable) {
                    $('#emailLogsTable').dataTable().fnDestroy();
                }
                $("#logsDataTableWrapper").html(emailLogTable(data['list']));
                if($(".email_logs_slide_popup").length < 1){
                    $("body").append(emailLogsSlidePopupContent());
                }
                $('#emailLogsTable').dataTable({
                    order: [[0, 'asc']]
                })
                return false;
            }
        },
        error: function (e) {
            console.log(e)
            return false;
        }
    });

}

function getEmailAttachments(emailId) {
    var attachments = {};
    // var data={};
    // data['emailId']=emailId;
    $.ajax({
        contentType: "application/json",
        type: "POST",
        url: getURLForHTML('dashboard', 'get-email-attachments?emailId='+emailId),
        async: false,
        success: function (data) {
            if (data == null && data == undefined) {
                showMessage(true, data);
            } else {
                attachments = data.attachments;
            }
        },
        error: function (e) {
            console.log(e)
        }
    });
    return attachments;
}



function getEmailLogsByEmailPayload() {
    var request = {};
    var email = $("#emailLogForm" + " #getEmail").val();
    var startDate = $("#emailLogForm" + " #startDate").val();
    var endDate = $("#emailLogForm" + " #endDate").val();
    request['email'] = email;
    request['startDate'] = startDate;
    request['endDate'] = endDate;
    return request;
}

function emailLogTable(data) {
    //debugger
    var html = '<table class="table table-bordered table-striped" id="emailLogsTable" style="width:100%">'
        + '<thead>'
        + '<tr>'
        + '<th>S No.</th>'
        + '<th>Send To</th>'
        + '<th>CC</th>'
        + '<th>BCC</th>'
        + '<th>Mail Subject</th>'
        + '<th>Attachments</th>'
        + '<th>Service Provider</th>'
        + '<th>Date Time</th>'
        + '<th>Mail Status</th>'
        + '<th>Action</th>'
        + '</tr>'
        + '</thead>'
        + '<tbody >'
        + getTableData(data)
        + '</tbody>'
        + '</table>';
    return html;
}

function getTableData(data) {
    var rows = '';
    for (var i = 0; i < data.length; i++) {
        var row = '<tr>';
        var emails = data[i].to;
        var emailArray = emails.split(',');
        var mails = '';
        emailArray.forEach(element => {
            mails += element + '</br>';
        });

        var ccs = data[i].cc;
        var ccemailArray = ccs.split(',');
        var ccmails = '';
        ccemailArray.forEach(element => {
            ccmails += element + '</br>';
        });

        var bccs = data[i].bcc;
        var bccemailArray = bccs.split(',');
        var bccmails = '';
        bccemailArray.forEach(element => {
            bccmails += element + '</br>';
        });
    row +=  '<td>' + (i+1) + '</td>' +    
    '<td>' + mails + '</td>' +
            '<td>' + ccmails + '</td>' +
            '<td>' + bccmails + '</td>' +
            '<td>' + data[i].subject + '</td>' +
            '<td>' + data[i].attachment + '</td>' +
            '<td>' + data[i].serviceBy + '</td>' +
            '<td>' + data[i].time + '</td>' +
            '<td>' + data[i].mailStatus + '</td>' + 
            '<td><button class="btn btn-sm btn-primary" onclick="viewEmaillogsPopupConent('+data[i].id+',\''+mails+'\',\''+ccs+'\',\''+bccs+'\',\''+btoa(unescape(encodeURIComponent(data[i].subject)))+'\',\''+data[i].time+'\')"><i class="fa fa-eye"></i></button></td>' +
            '</tr>';
        rows += row;
    }
    return rows;
}

function viewEmaillogsPopupConent(emailId,mails,cc,bcc,subject,time){
    var attachments = getEmailAttachments(emailId);
    var attch = "";
    if(attachments != undefined && attachments != null)
    {
        attachments.forEach(attachment => {
            attch += '<a href='+FILE_UPLOAD_PATH+attachment+' target="_blank" class="d-line-block mr-3"><i class="fa fa-paperclip"></i>&nbsp;'+attachment+'</a> '
        });
    }
    $("#mailTime").html(time);
    $("#cc").html(cc);
    $("#bcc").html(bcc);
    $("#sendTo").html(mails);
    $("#emailSubject").html(decodeURIComponent(escape(atob(subject))));
    $("#attachment").html(attch);
    $("#emailTemplate").attr('src',APP_BASE_URL+UNIQUEUUID+'/dashboard'+'/email-content?emailId='+emailId);
    $(".email_logs_slide_popup").addClass("viewSlideContent")
}


function getEmailVerifyByEmail() {
    var email = $("#emailVerifyForm" + " #getVEmail").val();
    console.log("email is " + email);
    if (!validateEmail(email)) {
        showMessage(true, 'Email is either empty or invalid', 'studEmailIdError');
        return false;
    }
    if (email != '') {
        var data={};
          data['email']=email;
        $.ajax({
            contentType: "application/json",
            type: "POST",
            url: getURLForHTML('dashboard', 'email-status-data'),
		    data : JSON.stringify(data),
            dataType: 'json',
            success: function (data) {
                if (data['status'] == '0' || data['status'] == '2') {
                    showMessage(true, data['message']);
                    return false;
                } else {
                    var isDataTable = $.fn.dataTable.isDataTable('#emailVTable');
                    if (isDataTable) {
                        $('#emailVTable').dataTable().fnDestroy();
                    }
                    $("#verificationDataTableWrapper").html(emailVerificationTable(data));
                    $('#emailVTable').dataTable()
                    return false;
                }
            },
            error: function (e) {
                console.log(e)
                return false;
            }
        });
    } else {
        return false;
    }
}


function emailVerificationTable(data) {
    //debugger
    var html = '<table class="table" id="emailVTable">'
        + '<thead>'
        + '<tr>'
        + '<th>Email</th>'
        + '<th>Verification Status</th>'
        + '<th>Checked Date</th>'
        + '<th>Action</th>'
        + '</tr>'
        + '</thead>'
        + '<tbody >'
        + getVTableData(data)
        + '</tbody>'
        + '</table>';
    return html;
}

function getVTableData(data) {

    var button = '';
    if (data['emailStatus'] == 'Verified') {
        button = '<td> <button onClick="getChangeEmailVerification(0)" class="btn btn-primary">Unverify</button> </td>';
    } else {
        button = '<td> <button onClick="getChangeEmailVerification(1)" class="btn btn-primary">Verify</button> </td>';
    }
    var row = '<tr>' +
        '<td>' + data['email'] + '</td>' +
        '<td>' + data['emailStatus'] + '</td>' +
        '<td>' + data['dateTime'] + '</td>' +
        button +
        '</tr>';
    return row;
}


function getChangeEmailVerification(status) {
    var email = $("#emailVerifyForm" + " #getVEmail").val();
    var data={};
    data['email']=email;
    data['status']=status;
    $.ajax({
        contentType: "application/json",
        type: "POST",
        url: getURLForHTML('dashboard', 'email-status-change'),
        data : JSON.stringify(data),
        dataType: 'json',
        success: function (data) {
            if (data['status'] == '0' || data['status'] == '2') {
                showMessage(true, data['message']);
                return false;
            } else {
                getEmailVerifyByEmail();
                return false;
            }
        },
        error: function (e) {
            console.log(e)
            return false;
        }
    });
}
function closeSlideContent(){
    
    $(".email_logs_slide_popup").removeClass("viewSlideContent");
}
$(document).ready(function(){
    $(document).mouseup(function(e){
        var container = $(".email_logs_slide_popup");
        // if the target of the click isn't the container nor a descendant of the container
        if (!container.is(e.target) && container.has(e.target).length === 0){
            container.removeClass("viewSlideContent");
        }
    });
});


function resizeIframe(obj) {
    obj.style.height = obj.contentWindow.document.documentElement.scrollHeight + 'px';
  }
