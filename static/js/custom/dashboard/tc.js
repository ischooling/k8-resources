$(document).ready(function() {
    console.log(window.location);
    const uRLSearchParams = new URLSearchParams(window.location.search);
    const userId = uRLSearchParams.get("userId")
    const url =  BASE_URL + CONTEXT_PATH + 'api/v1/tc/get-prefilled-for-tc?userId=' + userId;
    $.ajax({
        type : "GET",
        url : url,
        contentType : "application/json",
        success : function(rdata) {
            const response =  JSON.parse(rdata);
            if (response.statusCode == '1' || response.statusCode == '2') {
                showMessage(true, response['message']);
            } else{
                data = response.data;
                $("#student-name").text(data.fullName)
                $("#student-grade").text(data.grade)
                $("#admission-number").text(data.rollNO)
                $("#guardian-name").text(data.parentFullName)
                $("#phoneNo").text(data.mob)
                var dateFormat = data.dob.split('-');
                var year = dateFormat[0];
                var yearSeperate = year.split('');
                $("#year1").text(yearSeperate[0]);
                $("#year2").text(yearSeperate[1]);
                $("#year3").text(yearSeperate[2]);
                $("#year4").text(yearSeperate[3]);
                var month = dateFormat[1];
                var monthSeperate = month.split('');
                $("#month1").text(monthSeperate[0]);
                $("#month2").text(monthSeperate[1]);
                var day = dateFormat[2];
                var dateSeperate = day.split('');
                $("#day1").text(dateSeperate[0]);
                $("#day2").text(dateSeperate[1]);
                $("#info-msg").hide();
                console.log(data);
            }
        },
        error : function(e) {
            const response =  JSON.parse(e.responseText);
            if(response.message === "Data Already Submitted") {
                data = response.data;
                $("#student-name").text(data.fullName)
                $("#student-grade").text(data.grade)
                $("#admission-number").text(data.rollNO)
                $("#guardian-name").text(data.parentFullName)
                $("#phoneNo").text(data.mob)
                var dateFormat = data.dob.split('-');
                var year = dateFormat[0];
                var yearSeperate = year.split('');
                $("#year1").text(yearSeperate[0]);
                $("#year2").text(yearSeperate[1]);
                $("#year3").text(yearSeperate[2]);
                $("#year4").text(yearSeperate[3]);
                var month = dateFormat[1];
                var monthSeperate = month.split('');
                $("#month1").text(monthSeperate[0]);
                $("#month2").text(monthSeperate[1]);
                var day = dateFormat[2];
                var dateSeperate = day.split('');
                $("#day1").text(dateSeperate[0]);
                $("#day2").text(dateSeperate[1]);
                $("#reasonForLeaving").attr("disabled", true);
                $("#reasonForLeaving").text(data.transferReason)
                $("#schoolName").attr("disabled", true);
                $("#schoolName").val(data.toSchoolName)
                $("#schoolAddress").attr("disabled", true);
                $("#schoolAddress").val(data.toAddress);
                $("#validation").hide();
                $("#submitTCForm").addClass("submitButton");
                $("#info-msg").text("You have already submitted the form");
                console.log(data);
                if(USER_ROLE == "SCHOOL_ADMIN"){
                    $("#reasonForLeaving").attr("disabled", false);
                    $("#reasonForLeaving").text(data.transferReason)
                    $("#schoolName").attr("disabled", false);
                    $("#schoolName").val(data.toSchoolName)
                    $("#schoolAddress").attr("disabled", false);
                    $("#schoolAddress").val(data.toAddress);
                    $("#validation").show();
                    $("#validation").attr("checked",true);
                    $("#submitTCForm").removeClass("submitButton");
                    $("#info-msg").text("Form Already Submitted By Student");
                }
            }
		}
    });
});

function handleSaveRequiredData (e) {
    e.preventDefault();
    let isValid = true;
    $("#errorReason, #errorSchoolName, #errorSchoolAddress").text('');

    const transferReason = $('#reasonForLeaving').val().trim();
    const schoolName = $('#schoolName').val().trim();
    const address = $('#schoolAddress').val().trim();
    const isCheckboxChecked = $('#validation').is(':checked');

    if (transferReason === '') {
        $("#errorReason").text('Reason for leaving is required.');
        isValid = false;
    }
    if (schoolName === '') {
        $("#errorSchoolName").text('School name is required.');
        isValid = false;
    }
    if (address === '') {
        $("#errorSchoolAddress").text('School address is required.');
        isValid = false;
    }
    if (!isCheckboxChecked) {
        $("#errorCheckbox").text('You must agree to the terms.');
        isValid = false;
    }

    if (!isValid) {
        return;
    }

    const body = {
        ...data,
        transferReason,
        address,
        schoolName
    }

    $.ajax({
        type : "POST",
        url : BASE_URL + CONTEXT_PATH + 'api/v1/tc/save-tc-application',
        data: JSON.stringify(body),
        contentType : "application/json",
        success : function(rdata) {
            const response =  JSON.parse(rdata);
            showMessageTheme2(true, response.message)
            if(USER_ROLE == "STUDENT"){
                $("#submitTCForm").addClass("submitButton");
            }
        }
    });
}