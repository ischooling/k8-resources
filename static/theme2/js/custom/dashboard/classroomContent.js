function getClassroomReminder(result){
    var html = 
    '<div class="main-card mb-3 card mt-3">'
        +'<div class="card-header text-white py-2 h-auto bg-primary"><i class="fa fa-bell"></i>&nbsp;Birthday</div>'
        +'<div class="card-body pt-2">'
            +getClassroomRemindersTable(result)
        +'</div>'
    +'</div>';
    return html;
}
function getClassroomRemindersTableHeader(){
    var html =
        '<thead>'
            +'<tr>'
                +'<td>S. No.</td>'
                +'<td>Student Name</td>'
                +'<td>Remarks</td>'
                // +'<td>Acknowledgment</td>'
            +'</tr>'
        +'</thead>';
    return html;
}   

function getClassroomRemindersTableBody(result){
    var html='';
    // var colspan= result.birthDay.length;
	$.each(result.birthDay, function(k, v) {
        html+=
            '<tr id="sessionSubjectStudent'+v.studentId+'">'
                +'<td>'+(k+1)+'</td>'
                +'<td>'+v.name+'</td>'
                +'<td>'+v.dob+'</td>'
                // if(k == 0){
                //     html+='<td class="text-center" rowspan="'+colspan+'">'
                //         +'<a href="javascript:void(0)" onclick="bDayAcknowledgment()" class="btn btn-sm btn-primary">Acknowledgment</a>'
                //     +'</td>';
                // }
                // +'<td class="text-center">'
                //     +'<a href="javascript:void(0)" onclick="bDayAcknowledgment()" class="btn btn-sm btn-primary">Acknowledgment</a>'
                // +'</td>'
        +'</tr>';
    });
    return html;
}

function getClassroomRemindersTable(result){
    var html =
        '<table class="table table-hover table-striped table-bordered responsive dt-responsive" id="stuBirthDayTable" style="width:100% !important">'
            +getClassroomRemindersTableHeader()
            +getClassroomRemindersTableBody(result)
        +'</table>';
    return html;    
}

function getClassroomContent(){

}

function bDayAcknowledgment(){

}