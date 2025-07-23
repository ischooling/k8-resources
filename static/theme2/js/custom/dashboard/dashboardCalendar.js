
$(document).ready(function() {
    $('body').on("click", 'button.fc-prev-button', function() {
        //do something
        var view = $('#schoolcalendar').fullCalendar('getView');
        var b = $('#schoolcalendar').fullCalendar('getDate');
        //console.log(b.format('L'));
        var startdate = b.format('YYYY-MM-DD');
        var enddate = b.format('YYYY-MM-DD');
        if(view.name=='agendaWeek'){
            var today = new Date(startdate);
            var dates = startAndEndOfWeek(today);
            startdate = dates[0];
            enddate = dates[1];
        }else if(view.name=='month'){
            var today = new Date(startdate);
            var dates = startAndEndOfMonth(today);
            startdate = dates[0];
            enddate = dates[1];
        }
        callSchoolCalendarFinal(startdate, enddate);
    });
    $('body').on("click", 'button.fc-next-button', function() {
    //do something
        var view = $('#schoolcalendar').fullCalendar('getView');
        var b = $('#schoolcalendar').fullCalendar('getDate');
        //console.log(b.format('YYYY-MM-DD'));
        var startdate = b.format('YYYY-MM-DD');
        var enddate = b.format('YYYY-MM-DD');
        if(view.name=='agendaWeek'){
            var today = new Date(startdate);
            var dates = startAndEndOfWeek(today);
            startdate = dates[0];
            enddate = dates[1];
        }else if(view.name=='month'){
            var today = new Date(startdate);
            var dates = startAndEndOfMonth(today);
            startdate = dates[0];
            enddate = dates[1];
        }
        callSchoolCalendarFinal(startdate, enddate);
    });
    $('body').on("click", 'button.fc-agendaDay-button', function() {
        var b = $('#schoolcalendar').fullCalendar('getDate');
        var startdate = b.format('YYYY-MM-DD');
        var enddate = b.format('YYYY-MM-DD');
        callSchoolCalendarFinal(startdate, enddate);
    });
    $('body').on("click", 'button.fc-agendaWeek-button', function() {
    //do something
        var b = $('#schoolcalendar').fullCalendar('getDate');
        var startdate = b.format('YYYY-MM-DD');
        var today = new Date(startdate);
        var dates = startAndEndOfWeek(today);
        startdate = dates[0];
        enddate = dates[1];
        callSchoolCalendarFinal(startdate, enddate);
    });
    $('body').on("click", 'button.fc-month-button', function() {
    //do something
        var b = $('#schoolcalendar').fullCalendar('getDate');
        var startdate = b.format('YYYY-MM-DD');
        var today = new Date(startdate);
        var dates = startAndEndOfMonth(today);
        startdate = dates[0];
        enddate = dates[1];
        callSchoolCalendarFinal(startdate, enddate);
    });
    $('button.fc-today-button').unbind("click").bind("click", function() {
        $('#schoolcalendar').fullCalendar('today');
        var b = $('#schoolcalendar').fullCalendar('getDate');
        var startdate = b.format('YYYY-MM-DD');
        var today = new Date(startdate);
        var dates = startAndEndOfMonth(today);
        startdate = dates[0];
        enddate = dates[1];
        callSchoolCalendarFinal(startdate, enddate);
    });
    /* FULL CALENDAR SCRIPT */
});

function redirectToStudentTab(){
    callForDashboardData('form','manage-profile-content?profileFor=common');
    $('#studentTabId').trigger('click');
}


function validateRequestForSchoolHoliday(formId){
    if($("#"+formId+" #holidayFor").val()==''){
        showMessage(1, "Please select holiday for");
        return false;
    }
    
    if($("#"+formId+" #holidayHome").val()==''){
        showMessage(1, "Please enter holiday name");
        return false;
    }
    if($("#"+formId+" #holidayType").val()==''){
        showMessage(1, "Please select holiday type");
        return false;
    }
    if($("#"+formId+" #holidayStartDate").val()==''){
        showMessage(1, "Please select start date");
        return false;
    }
    if($("#"+formId+" #startTimeInHrs").val()==''){
        showMessage(1, "Please select Start time(hrs)");
        return false;
    }
    if($("#"+formId+" #startTimeInMin").val()==''){
        showMessage(1, "Please select Start time(Min)");
        return false;
    }

    if($("#"+formId+" #holidayEndDate").val()==''){
        showMessage(1, "Please select end date");
        return false;
    }
    if($("#"+formId+" #endTimeInHrs").val()==''){
        showMessage(1, "Please select End time(hrs)");
        return false;
    }
    if($("#"+formId+" #endTimeInMin").val()==''){
        showMessage(1, "Please select End time(Min)");
        return false;
    }
    
    var str = $("#"+formId+" #holidayHome").val();
    if(str.length>100){
        showMessage(1, "You cannot have more than 100 characters! now your char length is "+str.length);
        return false;
    }
    
    if($("#"+formId+" #holidayStartDate").val()!='' && $("#"+formId+" #startTimeInHrs").val()!='' && $("#"+formId+" #startTimeInMin").val()!=''){
        var holidayStartDate=$("#"+formId+" #holidayStartDate").val();
        holidayStartDate=holidayStartDate.split("-");
        var holidayDateTime=new Date(holidayStartDate[2]+'/'+holidayStartDate[0]+'/'+holidayStartDate[1]+' '+$("#"+formId+" #startTimeInHrs").val().trim()+':'+$("#"+formId+" #startTimeInMin").val().trim()+':00');
        var currentDate= new Date();
        if(currentDate>holidayDateTime){
            showMessage(1, "Please select future time duration");
            return false;
        }
    }
    
    return true;
}
function submitSchoolHoliday(formId) {
    hideMessage('');
    if(!validateRequestForSchoolHoliday(formId)){
        return false;
    }
    
    var fdata = new FormData();
    fdata.append('userId',$("#"+formId+" #userId").val());
    fdata.append('holidayId',$("#"+formId+" #holidayId").val());
    fdata.append('standardId',$("#"+formId+" #standardId").select2('val'));
    fdata.append('batchId',$("#"+formId+" #batchId").select2('val'));
    fdata.append('studentId',$("#"+formId+" #studentId").select2('val'));
    fdata.append('schoolId',$("#"+formId+" #schoolId").val());
    fdata.append('holidayFor',$("#"+formId+" #holidayFor").select2('val'));
    fdata.append('holidayType',$("#"+formId+" #holidayType").select2('val'));
    fdata.append('holidayHome',escapeCharacters($("#"+formId+" #holidayHome").val()));
    fdata.append('holidayStartDate',$("#"+formId+" #holidayStartDate").val());
    fdata.append('startTime',$("#"+formId+" #startTimeInHrs").val()+':'+$("#"+formId+" #startTimeInMin").val()+':00');
    fdata.append('holidayEndDate',$("#"+formId+" #holidayEndDate").val());
    fdata.append('endTime',$("#"+formId+" #endTimeInHrs").val()+':'+$("#"+formId+" #endTimeInMin").val()+':00');
    fdata.append('holidayRemark',escapeCharacters($("#"+formId+" #holidayRemark").val()));
    
    $.ajax({
        type : "POST",
        url : getURLForHTML('dashboard','school-holiday-submit'),
        data : fdata,
        dataType : 'json',
        type: "POST",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        success : function(data) {
            if (data['status'] == '0' || data['status'] == '2') {
                showMessage(true, data['message']);
            } else {
                $('#'+formId+ ' #announceFor').val('').trigger("change");
                $('#'+formId+ ' #standardId').val('').trigger("change");
                $('#'+formId+ ' #batchId').val('').trigger("change");
                $('#'+formId+ ' #studentId').val('').trigger("change");
                $("#"+formId+" #batchId").html('');
                $("#"+formId+" #studentId").html('');
                $("#"+formId+" #fileupload1Span").text('No file chosen...');
                $('#'+formId)[0].reset();
                showMessage(false, data['message']);
                
            }
            return false;
        },
        error : function(e) {
            //showMessage(true, e.responseText);
            return false;
        }
    });
}
function updateSchoolHolidays(userId,holidayid,controllType,moduleId) {
    hideMessage('');
    
    var fdata = new FormData();
    fdata.append('userId',userId);
    fdata.append('holidayId',holidayid);
    fdata.append('controllType',controllType);
    $.ajax({
        type : "POST",
        url : getURLForHTML('dashboard','holidays-update'),
        data : fdata,
        dataType : 'json',
        type: "POST",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        success : function(data) {
            if (data['status'] == '0' || data['status'] == '2') {
                showMessage(true, data['message']);
            } else {
                showMessage(false, data['message']);
                setTimeout(function (){callDashboardPageSchool(moduleId,'holiday-list');},1000);
            }
            return false;
        },
        error : function(e) {
            //showMessage(true, e.responseText);
            return false;
        }
    });
}


var CALENDAR_EVENT_DATA=[];
function callSchoolCalendar(formId, userId, standardId, UNIQUEUUID, startdate, enddate) {
    $.ajax({
            type : "POST",
            contentType : "application/json",
            url : getURLForHTML('dashboard', 'school-calendar'),
            data : JSON.stringify(getRequestForSchoolCalendar(formId, userId, standardId, UNIQUEUUID, startdate, enddate)),
            dataType : 'json',
            async : true,
            success : function(data) {
                if (data['status'] == '0' || data['status'] == '2') {
                    showMessage(true, data['message']);
                } else {
                    CALENDAR_EVENT_DATA = data['schoolCalendar']['event'];
                    $('#schoolcalendar').fullCalendar('removeEvents');
    	                setTimeout(function(){
		                    getFullCalendar(CALENDAR_EVENT_DATA);
						}, 1000);
                    //Getting new event json data
                    $("#schoolcalendar").fullCalendar('addEventSource', CALENDAR_EVENT_DATA);
                    // $("."+CALENDAR_EVENT_DATA[0].className).append('<span class="blink"><i class="fa fa-circle"></i> LIVE</span>');
                }
            },
                error : function(e) {
                    console.log(e);
                }
            });
}


function getRequestForSchoolCalendar(formId, userId, standardId, UNIQUEUUID, startdate, enddate) {
	if(startdate=='' || startdate==undefined){
        startdate = todayDate();
    }
    if(enddate=='' || enddate==undefined){
        enddate = todayDate();
    }
    var schoolCalendarRequestDTO = {};
    schoolCalendarRequestDTO['userId'] =userId;
    schoolCalendarRequestDTO['schoolId'] = SCHOOL_ID;
    schoolCalendarRequestDTO['startDate']=startdate;
    schoolCalendarRequestDTO['endDate']=enddate;
    schoolCalendarRequestDTO['standardIds']=standardId;
    schoolCalendarRequestDTO['uniqueId']= UNIQUEUUID;
    return schoolCalendarRequestDTO;
}

function todayDate(){
	var d = new Date();
    var day = d.getDate();
    var month = d.getMonth() + 1;
    var year = d.getFullYear();
    if (day < 10) {
        day = "0" + day;
    }
    if (month < 10) {
        month = "0" + month;
    }
    var date = year + "-" + month + "-" + day;

    return date;
}


function getHash() {
    return 'ajslfkjalksdf'
}

var slotDurationGap = "00:30:00";
function getFullCalendar(CALENDAR_EVENT_DATA){
    if(USER_ROLE == "TEACHER"){
        slotDurationGap = "00:15:00";
    }
    $("#schoolcalendar").fullCalendar({
        header: {
            left: "prev,next today",
            center: "title",
            right: "agendaDay,agendaWeek"
        },
        buttonText:{
            today:    'Today',
            month:    'Month',
            week:     'Week',
            day:      'Day'
        },
        themeSystem: "bootstrap4",
        bootstrapFontAwesome: !0,
        defaultView: 'agendaDay',
        defaultDate: todayDate(),
        timeFormat: 'h(:mm)a',
        navLinks: !0,
        editable: false,
        allDayDefault: false,
        eventLimit: !0,
        eventStartEditable :false,
        minTime: '00:00:00',
        maxTime: '24:00:00',
        slotDuration: slotDurationGap,
        // slotLabelInterval:"00:30:00",
        events: CALENDAR_EVENT_DATA,
        eventClick: function(info) {
            if (info.url) {
                // window.open(info.url, '_blank');
                    classDetailsOnModal(info.url, info.title);
                return false;
            }else{
                eventDetailsOnModal(info.id, info.title, info.activities)
            }
        }
        // editable: true,
        // selectable: true,
        // selectHelper: true,
        // slotDuration: '00:35:00',
        // snapDuration: '00:35:00',
        // defaultView: 'agendaDay',
        // minTime: '00:00:00',
        // maxTime: '20:00:00'
    });
}


function eventDetailsOnModal(modalId, modalTitle, activities){
    $(".calendarbox").attr('id',modalId);
    $("#"+modalId).modal("show");
    $("#calendarbox_title").text(modalTitle);
    $("#"+modalId+ " .activity_type .activity").text(activities)
}



function createIframe(soruceUrl){
	var iframe = document.createElement('iframe');
	iframe.src = soruceUrl;
	return iframe;
}

function proceedwithControll(url, response){
	if (response['status'] == '0' || response['status'] == '2' || response['status'] == '3') {
		if (response['status'] == '3') {
			redirectLoginPage();
		} else {
            if(response['message']){
                var message=response['message'];
                if('Too many attempts. Please try after some time'==message){
                    message='Please click on the class again'
                }
                if(tt == 'theme2'){
                    showMessageTheme2(false, message);
                }else{
                    showMessage(false, message);
                }
            }else{
                if(response['dateStatus']=='past' || response['dateStatus']=='future'){
                    $('#classJoinInSameWindowModal').modal({backdrop: 'static', keyboard: false});
                    $('#classTime').html(response['classDate']);
                    $('#className').html(response['className']);
                    $('#subjectName').html(response['subjectName']);
                    if(response['userRole']=='STUDENT'){
                        $('#classJoinInSameWindowBody').html(calendarMeetingLinkValidateStudent(url, response));
                    }else{
                        $('#classJoinInSameWindowBody').html(calendarMeetingLinkValidateTeacher(url, response));
                    }
                }
            }
		}
	} else {
		if(response['dateStatus']=='between'){
            var classUrl=response['redirectUrl'];
            console.log('class url '+classUrl);
			// window.open(classUrl,"_blank");
            if(response['userRole']=='STUDENT'){
                $('#classJoinInSameWindowModal').modal({backdrop: 'static', keyboard: false});
                $('#classJoinInSameWindowBody').html(calendarMeetingLinkValidateStudent(classUrl, response));
            }else{
                $('#joinUrlInfo-content').html(teacherCodeForJoinMeeting(classUrl, response));
                $('#joinUrlInfo').modal('show');
            }
          
		}
	}
}

function proceedwithActivityControll(response){
    if (response['status'] == '0' || response['status'] == '2' || response['status'] == '3') {
		if (response['status'] == '3') {
			redirectLoginPage();
		}else{
            $('#classJoinInSameWindowModal').modal({backdrop: 'static', keyboard: false});
            $('#classJoinInSameWindowBody').html(calendarMeetingLinkValidateActivity(response['message']));
        }
    }else{
        var classUrl=response['redirectUrl'];
        console.log('class url '+classUrl);
        // window.open(classUrl,"_blank");
        if(response['userRole']=='STUDENT'){
            $('#classJoinInSameWindowModal').modal({backdrop: 'static', keyboard: false});
            $('#classJoinInSameWindowBody').html(calendarMeetingLinkValidateActivityStudent(classUrl, response));
        }else{
            $('#joinUrlInfo-content').html(teacherCodeForJoinMeeting(classUrl, response));
            $('#joinUrlInfo').modal('show');
        }
      
        
    }
}

function classDetailsOnModalActivity(url){
    customLoader(true);
    $.ajax({
        type : "GET",
        contentType: "application/json",
        dataType: 'json',
        url : url,
        success : function(responseData) {
            console.log('baseUrl '+url);
            console.log('responseData '+JSON.stringify(responseData));
            proceedwithActivityControll(responseData);
            customLoader(false);
        }
    });
}

function classDetailsOnModal(url){
	if(
		url.indexOf('join-class-by-meeting')>0 
		|| url.indexOf('prepare-for-class-by-meeting')>0
		|| url.indexOf('is-eight.vercel.app')>0
	){
		window.open(url,"_blank");
	}else{
        customLoader(true)
        $.ajax({
            type : "GET",
            contentType: "application/json",
            dataType: 'json',
            url : url,
            success : function(responseData) {
                console.log('baseUrl '+url);
                console.log('responseData '+JSON.stringify(responseData));
                proceedwithControll(url, responseData);
                customLoader(false);
            }
        });
	}
}

function startAndEndOfWeek(date) {
  var now = date? new Date(date) : new Date();
  now.setHours(0,0,0,0);
  var sunday = new Date(now);
  sunday.setDate(sunday.getDate() - sunday.getDay());
  var startDate = (sunday.getFullYear()+"-"+(sunday.getMonth()+1)+"-"+sunday.getDate());
  var saturday = new Date(now);
  saturday.setDate(saturday.getDate() - saturday.getDay() + 6);
  var endDate = (saturday.getFullYear()+"-"+(saturday.getMonth()+1)+"-"+saturday.getDate());
  return [startDate, endDate];
}

function startAndEndOfMonth(date) {
  var now = date? new Date(date) : new Date();
  now.setHours(0,0,0,0);
  var firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
  var startDate = (firstDay.getFullYear()+"-"+(firstDay.getMonth()+1)+"-"+firstDay.getDate());

  var lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  var endDate = (lastDay.getFullYear()+"-"+(lastDay.getMonth()+1)+"-"+lastDay.getDate());
  return [startDate, endDate];
}

function calendarMeetingLinkValidate(){
	var html =
	    `<div class="calendarClassDetails modal fade" id="classJoinInSameWindowModal" tabindex="-1" role="dialog" aria-labelledby="classJoinInSameWindowModalLabel" aria-hidden="true">
			 <div class="modal-dialog `+(tt!="theme1"? 'modal-lg':'')+`">
				 <div class="modal-content">
					 <div class="modal-header py-2 bg-primary">`
                        if(tt!="theme1"){
                            html+=`<h5 class="modal-title text-white">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="20px" fill="#fff"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336l24 0 0-64-24 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l48 0c13.3 0 24 10.7 24 24l0 88 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-80 0c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>&nbsp;Information
                                </h5>`;
                        }else{
                            html+=`<h4 class="modal-title text-white d-flex">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="20px" fill="#fff"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336l24 0 0-64-24 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l48 0c13.3 0 24 10.7 24 24l0 88 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-80 0c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>&nbsp;Information
                                </h4>`;
                        }
					html+=`</div>
					 <div id="classJoinInSameWindowBody" class="modal-body py-4">
					 </div>
				 </div>
			 </div>
		 </div>`
        html+= `<div class="modal fade" id="joinUrlInfo">
                        <div class="modal-dialog modal-md" role="document">
                            <div id="joinUrlInfo-content" class="modal-content">
                               
                            </div>
                        </div>
                    </div>`;
	return html;
 }

 function calendarMeetingLinkValidateTeacher(url, response){
    var warringMessage=false;
    if(response['dateStatus']=='past'){
      if(response['pastClassWarning']){
        warringMessage=true;
      }
    }else if(response['dateStatus']=='future'){
      if(response['futureClassWarning']){
        warringMessage=true;
      }
    }
	 if(warringMessage){
		var jfmUrl=url+'?jfm=Y';
		var html=
		`<div class="full text-center mb-2">
			<h5 class="font-weight-bold">You are about to start the following class:</h5>
		</div>
		<div id="classJoinWaringDiv">
			<div id="classWaringMessage" class="full text-center my-4">`;
                if(tt != 'theme1'){
                   html += `<h5>The class `+response.classDate+` | `+response.className+` | `+response.subjectName+`</h5>
                    <h5>The current time does not match this scheduled class time. Do you still wish to proceed?</h5>`;
                }else{
                     html += `<h4>The class `+response.classDate+` | `+response.className+` | `+response.subjectName+`</h4>
                    <h4>The current time does not match this scheduled class time. Do you still wish to proceed?</h4>`;
             
                }
            html +=`</div>
			<div class="full text-center mt-2">
				<button type="button" class="btn btn-outline-dark font-size-lg" data-dismiss="modal">No</button>
				<a id="classJoinWaring" href="javascript:void(0)" class="btn btn-primary font-size-lg" onclick="classDetailsOnModal('`+jfmUrl+`')"> Start Class</a>
			</div>
		</div>`;
		return html;
	}
	var html=
	`<div id="classJoinWaringDiv">
		<div id="classWaringMessage" class="full text-center my-4">
			<h5>The class `+response.className+` is scheduled for `+response.classDate+`.</h5>
			<h5>You can start the class on `+response.canJoindateStart+`.</h5>
		</div>
		<div class="full text-center mt-2">
			<button type="button" class="btn btn-outline-dark font-size-lg" data-dismiss="modal">Close</button>
		</div>
	</div>`;
	return html;
 }

 function calendarMeetingLinkValidateStudent(url, response){
	var html= (response.meetingId != undefined &&  response.meetingPasscode != undefined )? `<div id="classJoinWaringDiv">
		<div id="classWaringMessage" class="full text-center my-4">
			<h5>The class `+response.className+` | `+response.subjectName+` is scheduled for `+response.classDate+`.</h5><br/>
            <h6>If you are having issues with redirection to the class, please join with the credentials given below. </h6>
            <h5> Meeting ID : ` + response.meetingId + '<br/>  Meeting Passcode : ' + response.meetingPasscode + `</h6>
            <div class="copy-msg font-size-lg mb-2"></div>
            <a target="_blank" id="classJoinWaring" href="`+url+`" class="btn btn-primary font-size-lg">Join Class Now</a>
            <button  value="`+url+`" class="btn btn-success font-size-lg" onclick="copyLink(this)"><i class="fa fa-copy"></i>&nbsp;Copy Class Link</button>
		</div>
		<div class="full text-center mt-2">
			<button type="button" class="btn btn-outline-dark font-size-lg" data-dismiss="modal">Close</button>
		</div>
	</div>`:
	`<div id="classJoinWaringDiv">
		<div id="classWaringMessage" class="full text-center my-4">
			<h5>The class `+response.className+` | `+response.subjectName+` is scheduled for `+response.classDate+`.</h5>
            <a target="_blank" id="classJoinWaring" href="`+url+`" class="btn btn-primary font-size-lg">Join Class Now</a>
		</div>
		<div class="full text-center mt-2">
			<button type="button" class="btn btn-outline-dark font-size-lg" data-dismiss="modal">Close</button>
		</div>
	</div>`;
	return html;
 }
 function teacherCodeForJoinMeeting(url, response){
	var html=`
    <div class="modal-header bg-success" style="color:#fff; background:green">
        <h4 class="modal-title" id="exampleModalLabel1">Enter Classroom</h4>
        <p style="position: absolute;right: 15px;top:12px;">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true" style="color:#fff;">×</span>
            </button>
        </p>
    </div>
    <form action="javascript:void(0);" id="joinUrlInfoForm" name="joinUrlInfoForm" autocomplete='off'>
        <input type="hidden" name="meetingLinkId" id="meetingLinkId" value="${response.teacherCodeMeetingId}" />
        <input type="hidden" name="userId" id="userId" value="${USER_ID}" />
        <div class="modal-body delete-modal">
            <div class="full">
                <div class="form-group mb-2 p-0">
                    <label class="mb-0">Employee Code</label>
                    <input type="text" name="teacherCode" id="teacherCode" class="form-control">
                </div>
            </div>
            <div class="full mt-1">
                <button type="button" class="btn btn-success btn-shadow float-right pr-4 pl-4" id="btnClickSaveJoinInfo" onclick="saveJoinLinkInfo('joinUrlInfoForm','${response.teacherCodeMeetingId}','${response.redirectUrl}');">Enter classroom</button>
                <button type="button" class="btn btn-info btn-shadow float-right pr-4 pl-4 mr-2" data-dismiss="modal">Close</button>
            </div>
        </div>
    </form>`

	
	return html;
 }
 function calendarMeetingLinkValidateActivity(message){
	var html=
	`<div id="classJoinWaringDiv">`
        if(tt != 'theme1'){
            html +=`<h5>` + message + `.</h5>`;
        }else{
            html +=`<h4>` + message + `.</h4>`;
        }	
        if (response.meetingId != undefined &&  response.meetingPasscode != undefined ){
            html += `<h6 class="text-center" >If you are having issues with redirection to the class, please join with the credentials given below. </h6>
            <h5 class="text-center" > Meeting ID : ` + response.meetingId + '<br/>  Meeting Passcode : ' + response.meetingPasscode + `</h5>`
        }
		html +=`<div class="full text-center mt-2">
			<button type="button" class="btn btn-outline-dark font-size-lg" data-dismiss="modal">Close</button>
		</div>
	</div>`;
	return html;
 }

 function calendarMeetingLinkValidateActivityStudent(url, response){
	var html=
	`<div id="classJoinWaringDiv">`;
        if(tt != 'theme1'){
            html += `<h5 class="text-center font-weight-bold">`+response.activityTitle+` is scheduled for `+response.startDate+` at `+response.startTime+`</h5>`;
        }else{
            html += `<h3 class="text-center font-weight-bold">`+response.activityTitle+` is scheduled for `+response.startDate+` at `+response.startTime+`</h3>`;
        }
        if (response.meetingId != undefined &&  response.meetingPasscode != undefined ){
            html += `<h6 class="text-center" >If you are having issues with redirection to the class, please join with the credentials given below. </h6>
            <h5 class="text-center" > Meeting ID : ` + response.meetingId + '<br/>  Meeting Passcode : ' + response.meetingPasscode + `</h5>`
        }
		html += `<div class="full text-center mt-2">
                <button type="button" class="btn btn-outline-dark `+(tt != 'theme1'?"font-size-lg":"")+`" data-dismiss="modal">Close</button>
                <a target="_blank" id="classJoinWaring" href="`+url+`" class="btn  btn-primary `+(tt != 'theme1'?"font-size-lg":"")+`">Join Now</a>
		    </div> 
	</div>`;
	return html;
 }

