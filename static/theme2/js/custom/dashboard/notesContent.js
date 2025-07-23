// function getClassroomReminder(result){
//     var html = 
//     '<div class="main-card mb-3 card mt-3">'
//         +'<div class="card-header text-white py-2 h-auto bg-primary"><i class="fa fa-bell"></i>&nbsp;Birthday</div>'
//         +'<div class="card-body pt-2">'
//             +getClassroomRemindersTable(result)
//         +'</div>'
//     +'</div>';
//     return html;
// }
// function getClassroomRemindersTableHeader(){
//     var html =
//         '<thead>'
//             +'<tr>'
//                 +'<td>S. No.</td>'
//                 +'<td>Student Name</td>'
//                 +'<td>Remarks</td>'
//                 +'<td>Acknowledgment</td>'
//             +'</tr>'
//         +'</thead>';
//     return html;
// }   

// function getClassroomRemindersTableBody(result){
//     debugger
//     var html='';
//     var colspan= result.birthDay.length;
// 	$.each(result.birthDay, function(k, v) {
//         html+=
//             '<tr id="sessionSubjectStudent'+v.studentId+'">'
//                 +'<td>'+(k+1)+'</td>'
//                 +'<td>'+v.name+'</td>'
//                 +'<td>'+v.dob+'</td>'
//                 // if(k == 0){
//                 //     html+='<td class="text-center" rowspan="'+colspan+'">'
//                 //         +'<a href="javascript:void(0)" onclick="bDayAcknowledgment()" class="btn btn-sm btn-primary">Acknowledgment</a>'
//                 //     +'</td>';
//                 // }
//                 +'<td class="text-center">'
//                     +'<a href="javascript:void(0)" onclick="bDayAcknowledgment()" class="btn btn-sm btn-primary">Acknowledgment</a>'
//                 +'</td>'
//         +'</tr>';
//     });
//     return html;
// }

// function getClassroomRemindersTable(result){
//     var html =
//         '<table class="table table-hover table-striped table-bordered responsive dt-responsive" id="stuBirthDayTable" style="width:100% !important">'
//             +getClassroomRemindersTableHeader()
//             +getClassroomRemindersTableBody(result)
//         +'</table>';
//     return html;    
// }
// function bDayAcknowledgment(){

// }

function getStudentNotesContent(titlle, roleAndModule, schoolId, userId, role){
    var html = 
        '<div class="main-card mb-3 card mt-3">'
            +'<div class="card-header text-white py-2 h-auto bg-primary">Notes</div>'
            +'<div class="card-body">'
                +'<div class="col mb-2 p-0">'
                    +getCreateNoteTable()
                +'</div>'
            +'</div>'
        +'</div>';
}
function getStudentNotesTableHeader(){
    var html =
        '<thead>'
            +'<tr>'
                +'<td>S. No.</td>'
                +'<td>Student</td>'
                +'<td>Remarks</td>'
                +'<td>Priority</td>'
                +'<td>Action</td>'
			+'</tr>'
        +'</thead>';
    return html;
}   

function getStudentNotesTableBody(result){
    // debugger
    var html='';
    $.each(result.noteList, function(k, v) {
        html+=
            '<tr id="row-note'+v.id+'">'
                +'<td>'+(k+1)+'</td>'
                +'<td>'+v.name+'</td>'
                +'<td>'+v.remarks+'</td>';
                if(v.priority == "H"){
                    html+='<td class="text-center"><span class="text-white py-1 px-2 bg-danger d-inline-block" style="min-width:118px;">High Priority</span></td>';
                }else if(v.priority == "M"){
                    html+='<td class="text-center"><span class="text-white py-1 px-2 bg-warning d-inline-block" style="min-width:118px;">Medium Priority</span></td>';
                }else if(v.priority == "L"){
                    html+='<td class="text-center"><span class="text-dark py-1 px-2 bg-gray d-inline-block" style="min-width:118px;">Low Priority</span></td>';
                }else{
                    html+='<td class="font-weight-bold text-success">N/A</td>';
                }
                html+='<td class="text-center">'
                    +'<a href="javascript:void(0)" onclick="bDayAcknowledgment('+USER_ID+','+v.id+', \'row-note'+v.id+'\', \'notesTable\')" class="btn btn-sm btn-primary">Acknowledgment</a>'
                +'</td>'
        +'</tr>';
    });
    $("#studentNotesTable tbody").html(html);
}

function getStudentNotesTable(){
    var html =
        '<table class="table table-hover table-striped table-bordered responsive dt-responsive" id="studentNotesTable" style="width:100% !important">'
            +getStudentNotesTableHeader()
            +'<tbody>'
            +'</tbody>'
        +'</table>';
    return html;    
}
function getNoteContent(titlle, roleAndModule, schoolId, userId, role){
	var html = '';
    if(USER_ROLE != 'SCHOOL_ADMIN'){
        if(tt == "theme2"){
            html+= pageHeading();
        }
        html+='<div class="main-card mb-3 card mt-3">'
            +'<div class="card-header text-white py-2 h-auto bg-primary">Add Notes</div>'
            +'<div class="card-body">'
                +'<div class="col mb-2 p-0">'
                    +getCreateNoteForm()
                +'</div>'
            +'</div>'
        +'</div>'
        +'<div class="main-card mb-3 card mt-3">'
            +'<div class="card-header text-white py-2 h-auto bg-primary">Notes</div>'
            +'<div class="card-body">'
                +'<div class="col mb-2 p-0">'
                    +getCreateNoteTable()
                +'</div>'
            +'</div>'
        +'</div>';
    }
    if(USER_ROLE == 'SCHOOL_ADMIN'){
        html+=getNotesForAdminContent()
    }    
    return html;
}

function pageHeading(){
	var html ='';
    if(USER_ROLE == 'STUDENT'){
	    html+='<div class="app-page-title pt-2 pb-2">';
            if(MAINTENANCEDOWNTIME != ''){
                html+='<div class="marquee">'
                        +'<marquee id="marqueeDiv" direction="left" style="color: red" width="100%">'+MAINTENANCEDOWNTIME+'</marquee>'
                    +'</div>';
            }
            html+='<div class="page-title-wrapper">'
                    +'<div class="page-title-heading">'
                        +'<div class="page-title-icon">'
                            +'<i class="pe-7s-note2 text-primary"></i>'
                        +'</div>'
                        +'<div>Notes</div>'
                    +'</div>'
                +'</div>'
            +'</div>';
    }
	return html;
}

function getCreateNoteTableHeader(){
    var html =
        '<thead>'
            +'<tr>'
                +'<td>S. No.</td>'
                +'<td>Remarks</td>'
                +'<td>Approval Status</td>'
                +'<td>Priority</td>'
				+'<td>Action</td>'
            +'</tr>'
        +'</thead>';
    return html;
}   

function getCreateNoteTableBody(result){
    // debugger
    var html='';
    $.each(result.noteList, function(k, v) {
        html+=
            '<tr id="row-note'+v.id+'">'
                +'<td>'+(k+1)+'</td>'
                +'<td>'+v.note+'</td>';
                if(v.status == "P"){
                    html+='<td class="font-weight-bold text-warning">Pending</td>';
                }else if(v.status == "R"){
                    html+='<td class="font-weight-bold text-danger">Rejected</td>';
                }else if(v.status == "A"){
                    html+='<td class="font-weight-bold text-success">Approved</td>';
                }else{
                    html+='<td class="font-weight-bold text-success">N/A</td>';
                }
                if(v.priority == "H"){
                    html+='<td class="text-center"><span class="text-white py-1 px-2 bg-danger d-inline-block" style="min-width:118px;">High Priority</span></td>';
                }else if(v.priority == "M"){
                    html+='<td class="text-center"><span class="text-white py-1 px-2 bg-warning d-inline-block" style="min-width:118px;">Medium Priority</span></td>';
                }else if(v.priority == "L"){
                    html+='<td class="text-center"><span class="text-dark py-1 px-2 bg-gray d-inline-block" style="min-width:118px;">Low Priority</span></td>';
                }else{
                    html+='<td class="font-weight-bold text-success">N/A</td>';
                }
                html+='<td class="text-center">'
                    +'<a href="javascript:void(0)" onclick="deactivateNote('+USER_ID+','+v.id+', \'row-note'+v.id+'\', \'notesTable\')" class="btn btn-sm btn-primary">Deactivate</a>'
                +'</td>'
        +'</tr>';
    });
    $("#notesTable tbody").html(html);
}

function getCreateNoteTable(){
    var html =
        '<table class="table table-hover table-striped table-bordered responsive dt-responsive" id="notesTable" style="width:100% !important">'
            +getCreateNoteTableHeader()
            +'<tbody>'
            +'</tbody>'
        +'</table>';
    return html;    
}

function getCreateNoteForm(){
	var html =
		'<form>'
			+'<div class="col p-0">'
				+'<div class="position-relative form-group mb-2">'
					+'<textarea class="form-control" rows="4" name="addNote" id="addNote" placeholder="Write a note..." maxlength="255" onkeyup="checkAddNoteEmpty(this)">'
					+'</textarea>'
				+'</div>'
				+'<div class="position-relative form-group text-right mb-0">'
					+'<a href="javascript:void(0)" class="btn btn-sm btn-success px-4 disabled" id="addNoteButton" onclick="createNote(\'addNote\')" disabled="disabled">Save</a>'
				+'</div>'
			+'</div>'
		+'</form>';
	return html;
}

function getNotesForAdminContent(){
    var html =
        getPendingNotesRequestCard()
        +getApprovedNotesByMeCard()
        +getRejectedNotesByMeCard();
        return html;
}
function getPendingNotesRequestCard(){
    var html = 
        '<div class="row">'
            +'<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">'
                +'<div class="card">'
                    +'<div class="card-header card-header-primary">'
                        +'<div class="card-title">Peding Notes Request</div>'
                    +'</div>'
                    +'<div class="card-body">'
                        +'<div class="full mb-2">'
                            +getPendingNotesRequestForm()
                        +'</div>'
                    +'</div>'
                +'</div>'
            +'</div>'
        +'</div>';
    return html;
}
function getPendingNotesRequestTableHeader(){
    var html =
        '<thead>'
            +'<tr>'
                +'<td class="text-left">S. No.</td>'
                +'<td>Student Name</td>'
                +'<td>Role</td>'
                +'<td>Email ID</td>'
                +'<td style="min-width:425px">Remark</td>'
				+'<td style="min-width:100px">Approval Status</td>'
                +'<td style="min-width:120px">Priority</td>'
                +'<td class="text-center">Action</td>'
            +'</tr>'
        +'</thead>';
    return html;
}
function getPendingNotesRequestTableBody(notesReqList){
    var html='';
    $.each(notesReqList.notesDTO, function(k, v) {
        html+=
            '<tr id="row-note'+v.noteId+'">'
                +'<td class="text-left py-1">'+(k+1)+'</td>'
                +'<td class="py-1">'+v.name+'</td>'
                +'<td class="py-1">'+v.role+'</td>'
                +'<td class="py-1">'+v.email+'</td>'
                +'<td class="py-1">'+v.remarks+'</td>'
                +'<td class="py-1">'
                    +'<select name="approvalStatus-'+v.noteId+'" id="approvalStatus-'+v.noteId+'" class="form-control approvalStatus-'+v.noteId+'" onchange="showPriorityOption(this, \'priorityLavel-'+v.noteId+'\')">'
                        +'<option value="">Select Status</option>'
                        +'<option value="A">Approve</option>'
                        +'<option value="R">Reject</option>'
                    +'</select>'
                +'</td>'
                +'<td class="py-1">'
                    +'<select name="priorityLavel-'+v.noteId+'" id="priorityLavel-'+v.noteId+'" class="form-control priorityLavel-'+v.noteId+'" disabled="disabled">'
                        +'<option value="" class="d-none"></option>'
                        +'<option value="H" class="d-none">High Priority</option>'
                        +'<option value="M" class="d-none">Medium Priority</option>'
                        +'<option value="L" class="d-none">Low Priority</option>'
                    +'</select>'
                +'</td>'
                +'<td class="py-1 text-center">'
                    +'<a href="javascript:void(0)" class="btn btn-primary btn-sm waves-effect waves-light" id="savePendingNotesReq" onclick="savePendingNotesReq('+USER_ID+','+v.noteId+',\'approvalStatus-'+v.noteId+'\',\'priorityLavel-'+v.noteId+'\')">Save</a>'
                +'</td>'
                
            +'</tr>';
    });
    $("#notesRequestTable tbody").html(html);
}
function getPendingNotesRequestTable(){
    var html =
        '<table class="table table-hover table-striped table-bordered" id="notesRequestTable" style="width:100% !important;min-width:650px">'
            +getPendingNotesRequestTableHeader()
            +'<tbody>'
            +'</tbody>'
        +'</table>';
    return html; 
}
function getPendingNotesRequestForm(){
    var html = 
        '<form class="form-horizontal" action="javascript:void(0);" name="notesRequestForm" id="notesRequestForm" method="post">'
            +'<div class="full" style="overflow:auto;max-height:400px">'
                +getPendingNotesRequestTable()
            +'</div>'
        +'</form>';
    return html;
}

function getApprovedNotesByMeCard(){
    var html = 
        '<div class="row">'
            +'<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">'
                +'<div class="card">'
                    +'<div class="card-header card-header-success">'
                        +'<div class="card-title">Approved Notes</div>'
                    +'</div>'
                    +'<div class="card-body">'
                        +'<div class="full mb-2" style="overflow:auto;max-height:400px">'
                            +getApprovedNotesByMeTable()
                        +'</div>'
                    +'</div>'
                +'</div>'
            +'</div>'
        +'</div>';
    return html;
}
function getApprovedNotesByMeTableHeader(){
    var html = 
        '<thead>'
            +'<tr>'
                +'<td class="text-left">S. No.</td>'
                +'<td>Student Name</td>'
                +'<td>Role</td>'
                +'<td>Email ID</td>'
                +'<td style="min-width:425px">Remark</td>'
                +'<td class="text-center" style="min-width:100px">Status</td>'
                +'<td class="text-center" style="min-width:120px">Priority</td>'
                +'<td style="min-width:120px">Change Status</td>'
                +'<td style="min-width:120px">Change Priority</td>'
                +'<td class="text-center">Action</td>'
            +'</tr>'
        +'</thead>';
    return html;
}
function getApprovedNotesByMeTableBody(notesApproveList){
    var html = '';
    $.each(notesApproveList.notesDTO, function(k, v) {
        html+=
            '<tr id="approve-row-note'+v.noteId+'">'
                +'<td class="text-left py-1">'+(k+1)+'</td>'
                +'<td class="py-1">'+v.name+'</td>'
                +'<td class="py-1">'+v.role+'</td>'
                +'<td class="py-1">'+v.email+'</td>'
                +'<td class="py-1">'+v.remarks+'</td>'
                +'<td class="text-center text-success py-1">Approved</td>';
                if(v.priority == "H"){
                    html+='<td class="text-center"><span class="text-white py-1 px-2 bg-danger d-inline-block" style="min-width:118px;">High Priority</span></td>';
                }else if(v.priority == "M"){
                    html+='<td class="text-center"><span class="text-white py-1 px-2 bg-warning d-inline-block" style="min-width:118px;">Medium Priority</span></td>';
                }else if(v.priority == "L"){
                    html+='<td class="text-center"><span class="text-dark py-1 px-2 bg-gray d-inline-block" style="min-width:118px;">Low Priority</span></td>';
                }else{
                    html+='<td class="font-weight-bold text-center">N/A</td>';
                }
                html+='<td class="py-1">'
                        +'<select name="approvalStatus-'+v.noteId+'" id="approvalStatus-'+v.noteId+'" class="form-control approvalStatus-'+v.noteId+'" onchange="showPriorityOption(this, \'priorityLavel-'+v.noteId+'\')">'
                            +'<option value="">Select Status</option>'
                            +'<option value="A">Approve</option>'
                            +'<option value="R">Reject</option>'
                        +'</select>'
                    +'</td>'
                    +'<td class="py-1">'
                        +'<select name="priorityLavel-'+v.noteId+'" id="priorityLavel-'+v.noteId+'" class="form-control priorityLavel-'+v.noteId+'" disabled="disabled">'
                            +'<option value="" class="d-none"></option>'
                            +'<option value="H" class="d-none">High Priority</option>'
                            +'<option value="M" class="d-none">Medium Priority</option>'
                            +'<option value="L" class="d-none">Low Priority</option>'
                        +'</select>'
                    +'</td>'
                +'<td class="py-1 text-center">'
                    +'<a href="javascript:void(0)" class="btn btn-primary btn-sm waves-effect waves-light" id="savePendingNotesReq" onclick="savePendingNotesReq('+USER_ID+','+v.noteId+',\'approvalStatus-'+v.noteId+'\',\'priorityLavel-'+v.noteId+'\')">Save</a>'
                +'</td>'
                
            +'</tr>';
    });
    $("#approvedNotesTable tbody").html(html);
}
function getApprovedNotesByMeTable(){
    var html =
        '<table class="table table-hover table-striped table-bordered" id="approvedNotesTable" style="width:100% !important;min-width:650px">'
            +getApprovedNotesByMeTableHeader()
            +'<tbody>'
            +'</tbody>'
        +'</table>';
    return html; 
}

function getRejectedNotesByMeCard(){
    var html = 
        '<div class="row">'
            +'<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">'
                +'<div class="card">'
                    +'<div class="card-header card-header-danger">'
                        +'<div class="card-title">Rejected Notes</div>'
                    +'</div>'
                    +'<div class="card-body">'
                        +'<div class="full mb-2" style="overflow:auto;max-height:400px">'
                            +getRejectedNotesByMeTable()
                        +'</div>'
                    +'</div>'
                +'</div>'
            +'</div>'
        +'</div>';
    return html;
}
function getRejectedNotesByMeTableHeader(){
    var html = 
        '<thead>'
            +'<tr>'
                +'<td class="text-left">S. No.</td>'
                +'<td>Student Name</td>'
                +'<td>Role</td>'
                +'<td>Email ID</td>'
                +'<td style="min-width:425px">Remark</td>'
                +'<td class="text-center" style="min-width:100px">Status</td>'
                +'<td class="text-center" style="min-width:120px">Priority</td>'
                +'<td style="min-width:120px">Change Status</td>'
                +'<td style="min-width:120px">Change Priority</td>'
                +'<td class="text-center">Action</td>'
            +'</tr>'
        +'</thead>';
    return html;
}
function getRejectedNotesByMeTableBody(notesRejectedList){
    var html = "";
    $.each(notesRejectedList.notesDTO, function(k, v) {
        html+=
            '<tr id="approve-row-note'+v.noteId+'">'
                +'<td class="text-left py-1">'+(k+1)+'</td>'
                +'<td class="py-1">'+v.name+'</td>'
                +'<td class="py-1">'+v.role+'</td>'
                +'<td class="py-1">'+v.email+'</td>'
                +'<td class="py-1">'+v.remarks+'</td>'
                +'<td class="text-center py-1 text-danger">Rejected</td>'
                +'<td class="text-center py-1">N/A</td>'
                +'<td class="py-1">'
                        +'<select name="approvalStatus-'+v.noteId+'" id="approvalStatus-'+v.noteId+'" class="form-control approvalStatus-'+v.noteId+'" onchange="showPriorityOption(this, \'priorityLavel-'+v.noteId+'\')">'
                            +'<option value="">Select Status</option>'
                            +'<option value="A">Approve</option>'
                            +'<option value="R">Reject</option>'
                        +'</select>'
                    +'</td>'
                    +'<td class="py-1">'
                        +'<select name="priorityLavel-'+v.noteId+'" id="priorityLavel-'+v.noteId+'" class="form-control priorityLavel-'+v.noteId+'" disabled="disabled">'
                            +'<option value="" class="d-none"></option>'
                            +'<option value="H" class="d-none">High Priority</option>'
                            +'<option value="M" class="d-none">Medium Priority</option>'
                            +'<option value="L" class="d-none">Low Priority</option>'
                        +'</select>'
                    +'</td>'
                +'<td class="py-1 text-center">'
                    +'<a href="javascript:void(0)" class="btn btn-primary btn-sm waves-effect waves-light" id="savePendingNotesReq" onclick="savePendingNotesReq('+USER_ID+','+v.noteId+',\'approvalStatus-'+v.noteId+'\',\'priorityLavel-'+v.noteId+'\')">Save</a>'
                +'</td>'
            +'</tr>';
    });
    console.log(html)
    $("#rejectedNotesTable tbody").html(html);
}
function getRejectedNotesByMeTable(){
    var html =
        '<table class="table table-hover table-striped table-bordered" id="rejectedNotesTable" style="width:100% !important;min-width:650px">'
            +getRejectedNotesByMeTableHeader()
            +'<tbody>'
            +'</tbody>'
        +'</table>';
    return html; 
}


function getNoteReminder(result){
    var html = 
    '<div class="main-card mb-3 card mt-3">'
        +'<div class="card-header text-white py-2 h-auto bg-primary"><i class="fa fa-bell"></i>&nbsp;Notes</div>'
        +'<div class="card-body pt-2">'
            +getCreateNoteTeacherTable(result)
        +'</div>'
    +'</div>';
    return html;
}

function getCreateNoteTeacherTable(result){
    var html =
        '<table class="table table-hover table-striped table-bordered responsive dt-responsive" id="notesTableTeacher" style="width:100% !important">'
            +getCreateNoteTeacherTableHeader()
            +'<tbody>'
                +getCreateNoteTeacherTableBody(result)
            +'</tbody>'
        +'</table>';
    return html;    
}

function getCreateNoteTeacherTableHeader(){
    var html =
        '<thead>'
            +'<tr>'
                +'<td>S. No.</td>'
                +'<td>name</td>'
                +'<td>Priority</td>'
                +'<td>Remarks</td>'
			+'</tr>'
        +'</thead>';
    return html;
}   

function getCreateNoteTeacherTableBody(result){
    console.log(result)
    var html='';
    $.each(result, function(k, v) {
        html+=
            '<tr id="row-note'+v.id+'">'
                +'<td>'+(k+1)+'</td>'
                +'<td>'+v.name+'</td>';
                // if(v.status == "P"){
                //     html+='<td class="font-weight-bold text-warning">Pending</td>';
                // }else if(v.status == "R"){
                //     html+='<td class="font-weight-bold text-danger">Rejected</td>';
                // }else if(v.status == "A"){
                //     html+='<td class="font-weight-bold text-success">Approved</td>';
                // }else{
                //     html+='<td class="font-weight-bold text-success">N/A</td>';
                // }
                if(v.priority == "H"){
                    html+='<td class="text-center"><span class="text-white py-1 px-2 bg-danger d-inline-block" style="min-width:118px;">High Priority</span></td>';
                }else if(v.priority == "M"){
                    html+='<td class="text-center"><span class="text-white py-1 px-2 bg-warning d-inline-block" style="min-width:118px;">Medium Priority</span></td>';
                }else if(v.priority == "L"){
                    html+='<td class="text-center"><span class="text-dark py-1 px-2 bg-gray d-inline-block" style="min-width:118px;">Low Priority</span></td>';
                }else{
                    html+='<td class="font-weight-bold text-success">N/A</td>';
                }
                html+='<td>'+v.remarks+'</td>';
                // html+='<td class="text-center">'
                //     +'<a href="javascript:void(0)" onclick="deactivateNote('+USER_ID+','+v.id+', \'row-note'+v.id+'\', \'notesTable\')" class="btn btn-sm btn-primary">Deactivate</a>'
                // +'</td>'
        +'</tr>';
    });
    return html;
    // $("#notesTable tbody").html(html);
}

