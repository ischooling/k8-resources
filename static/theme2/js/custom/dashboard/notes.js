
function saveNotes(userId, remarks) {
    customLoader(true);
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: getURLForWithoutUnique('', 'create-note/'),
        data: JSON.stringify(getRequestBody(userId, remarks)),
        dataType: 'json',
        success: function (data) {
            if (data['status'] == '0' || data['status'] == '2' || data['status'] == '3') {
                console.log(data);
                if (tt != 'theme1') {
                    showMessageTheme2(0, data['message']);
                } else {
                    showMessage(false, data['message']);
                }
            } else {
                if (tt != 'theme1') {
                    showMessageTheme2(1, data['message']);
                } else {
                    showMessage(false, data['message']);
                }
                getNotes(USER_ID, "notesTable",);
                $("#addNote").val("");
            }
            customLoader(false);
        }
    });
}

function getRequestBody(userId, remarks) {
    var request = {};
    request['userId'] = userId;
    request['remarks'] = remarks;
    return request;
}


function getNotesOnClassJoining(teacherId, batchId, subjectId) {
    customLoader(true);
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: getURLForWithoutUnique('', 'get-notes-on-class-joining/?teacherId=' + teacherId + '&batchId=' + batchId + '&subjectId=' + subjectId),
        dataType: 'json',
        success: function (data) {
            if (data['status'] == '0' || data['status'] == '2' || data['status'] == '3') {
                if (data['status'] == '3') {
                    redirectLoginPage();
                } else {
                    if (tt == 'theme1') {
                        showMessage(false, data['message']);
                    } else {
                        showMessageTheme2(0, data['message'], '', true);
                    }
                }
            } else if (data['status'] == '1') {
                // $("#classroomContentDIV").append(getNoteReminder(data));
                // $("#notesTable").dataTable({
                //     theme: "bootstrap4"
                // });

                $("#classroomContentDIV").append(getNoteReminder(data.notesForClass));
                $("#notesTableTeacher").dataTable({
                    theme: "bootstrap4"
                });
                customLoader(false);
            }
            return false;
        }
    });
}


function getNotes(userId, elementId) {
    customLoader(true);
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: getURLForWithoutUnique('', 'get-note/' + '?userId=' + userId),
        //data : JSON.stringify(getRequestBody(userId)),
        dataType: 'json',
        success: function (data) {
            if (data['status'] == '0' || data['status'] == '2' || data['status'] == '3') {
                console.log(data);
            } else {
                var isDataTable = $.fn.dataTable.isDataTable('#' + elementId);
                if (isDataTable) {
                    $('#' + elementId).dataTable().fnDestroy();
                }
                getCreateNoteTableBody(data);
                getStudentNotesTableBody(data);
                $('#' + elementId).DataTable();
            }
            customLoader(false);
        }
    });
}




function deactivateNote(userId, noteId, rowID, tableID) {
    customLoader(true);
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: getURLForWithoutUnique('', 'deactivate-note/' + '?userId=' + userId + '&noteId=' + noteId),
        //data : JSON.stringify(getRequestBody(userId)),
        dataType: 'json',
        success: function (data) {
            if (data['status'] == '0' || data['status'] == '2' || data['status'] == '3') {
                if (tt != 'theme1') {
                    showMessageTheme2(0, data['message']);
                } else {
                    showMessage(false, data['message']);
                }
                console.log(data);
            } else {
                //$("#"+rowID).remove();
                if (tt != 'theme1') {
                    showMessageTheme2(1, data['message']);
                } else {
                    showMessage(false, data['message']);
                }
                getNotes(USER_ID, "notesTable",);
                var isDataTable = $.fn.dataTable.isDataTable('#' + tableID);
                if (isDataTable) {
                    $('#' + tableID).dataTable().fnDestroy();
                }
                $('#' + tableID).DataTable();

            }
            customLoader(false);
        }
    });
}
function createNote() {
    var notes = $("#addNote").val();
    saveNotes(USER_ID, notes);
}
function checkAddNoteEmpty(src) {
    if ($(src).val().length > 0) {
        $("#addNoteButton").removeClass("disabled");
        $("#addNoteButton").attr("disabled", false);
    } else {
        $("#addNoteButton").addClass("disabled");
        $("#addNoteButton").attr("disabled", true);
    }
}

function showPriorityOption(src, elementID) {
    if ($(src).val() == 'A') {
        $("#" + elementID + " option:first-child").text("Select Priority");
        $("#" + elementID + " option").removeClass("d-none");
        $("#" + elementID).attr('disabled', false);
    } else {
        $("#" + elementID + " option:first-child").text("");
        $("#" + elementID + " option").addClass("d-none");
        $("#" + elementID).attr('disabled', true);
        $("#" + elementID).val("").change();
    }

}
function savePendingNotesReq(userId, noteId, approveStatus, priority) {
    var statusVal = $("#" + approveStatus).val();
    var priorityVal = $("#" + priority).val();
    if (statusVal == '' && priorityVal == '') {
        showMessage(false, "Please select approve status and priority");
        return false;
    }
    else if (statusVal == 'A' && priorityVal == '') {
        showMessage(false, "Please select priority");
        return false;

    } else if (statusVal == 'R' && priorityVal == '') {
        priorityVal = "-"
        changeStatus(userId, noteId, statusVal, priorityVal)
    } else if (statusVal == 'A' && priorityVal != '') {
        changeStatus(userId, noteId, statusVal, priorityVal)
    }
}
function getPendingNotes() {
    customLoader(true);
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: getURLForWithoutUnique('', 'get-all-pending-notes/'),
        //data : JSON.stringify(getRequestBody(userId)),
        dataType: 'json',
        success: function (data) {
            if (data['status'] == '0' || data['status'] == '2' || data['status'] == '3') {
                console.log(data);
            } else {
                console.log(data);
                getPendingNotesRequestTableBody(data)
            }
            customLoader(false);
        }
    });
}
function getApprovedByMe(userId) {
    customLoader(true);
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: getURLForWithoutUnique('', 'get-all-approved-notes-by-me/?userId=' + userId),
        dataType: 'json',
        success: function (data) {
            if (data['status'] == '0' || data['status'] == '2' || data['status'] == '3') {
                console.log(data);
                showMessage(false, data['messages']);
            } else {
                console.log(data);
                getApprovedNotesByMeTableBody(data)
                //showMessage(false, data['messages']);
            }
            customLoader(false);
        }
    });
}
function getRejectedByMe(userId) {
    customLoader(true);
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: getURLForWithoutUnique('', 'get-all-rejected-notes-by-me/?userId=' + userId),
        dataType: 'json',
        success: function (data) {
            if (data['status'] == '0' || data['status'] == '2' || data['status'] == '3') {
                console.log(data);
                showMessage(false, data['messages']);
            } else {
                console.log(data);
                getRejectedNotesByMeTableBody(data)
            }
            customLoader(false);
        }
    });
}
function changeStatus(userId, noteId, status, priority) {
    customLoader(true);
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: getURLForWithoutUnique('', 'change-note-status/?userId=' + userId + '&noteId=' + noteId + '&status=' + status + '&priority=' + priority),
        dataType: 'json',
        success: function (data) {
            if (data['status'] == '0' || data['status'] == '2' || data['status'] == '3') {
                console.log(data);
                showMessage(false, data['MESSAGE']);
            } else {
                console.log(data);
                showMessage(false, data['MESSAGE']);
            }
            getPendingNotes();
            getApprovedByMe(USER_ID);
            getRejectedByMe(USER_ID);
            customLoader(false);
        }
    });
}


