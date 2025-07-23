function formatDateToMMMDDYYYYForFilter(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function formatDateToYYYYMMDD(dateStr) {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function resetRequiredFormData(hostId) {
  $(hostId).val('');
  $(hostId).trigger('change');
  $('#timezone').val('');
  $('#timezone').trigger('change');
  if(USER_ROLE == "TEACHER"){
    getHostListForFilter();
  }
}

function getMeetingManagementContent(title) {
  let htmlContent = `
    <div class="main-card mb-3">
      <div class="card">
        <div class="card-header card-header-primary">
          <h4 class="card-title">${title !== undefined ? title : "Meeting Management"}</h4>
        </div>
        <div id="card-body" class="card-body">
          <button onclick="showMeetingForm()" class="btn btn-primary my-3 ml-4 rounded" style="width: max-content;" id="scheduleMeetingBtn">Schedule a New Meeting</button>
          <div class="filter-section mb-3 rounded p-5" style="border: 1px solid #FF8601;background: floralwhite;">
            <h3 class="font-weight-bold text-20">Search Meeting</h3>
            <form id="filterMeeting">
              <div class="row">
                <div class="col-md-3">
                  <label class="text-dark" for="filterTitle">Title</label>
                  <input type="text" id="filterTitle" class="form-control" placeholder="Enter meeting title" />
                </div>
                <div id="filterHostDiv" class="col-md-3">
                  <label class="text-dark" for="filterHostUserId">Host User ID</label>
                  <select onchange="checkAndFetchSchedule();checkAndFetchMeetings();" id="filterHostUserId" name="filterHostUserId" class="form-control">
                    <!-- Dynamically loaded -->
                  </select>
                </div>
                <div class="col-md-3">
                  <label class="text-dark" for="filterMeetingStartDate">Start Date</label>
                  <input type="text" id="filterMeetingStartDate" class="form-control" placeholder="Select Start Date" />
                </div>
                <div class="col-md-3">
                  <label class="text-dark" for="filterMeetingEndDate">End Date</label>
                  <input type="text" id="filterMeetingEndDate" class="form-control" placeholder="Select End Date" />
                </div>
                <div class="col-md-3">
                  <label class="text-dark" for="limit">Limit</label>
                  <input type="number" min="1" id="limit" class="form-control" value="25" placeholder="Enter Limit" />
                </div>
              </div>
              <div class="text-right mt-3">
                <button type="submit" class="btn btn-primary rounded" onclick="applyFilters();">Apply</button>
                <button type="reset" class="btn btn-secondary rounded" onclick="resetRequiredFormData('#filterHostUserId');">Reset</button>
              </div>
            </form>
          </div>
          <div id="meetingTableContainer"></div>
        </div>
      </div>
    </div>`;

  $("#dashboardContentInHTML").html(htmlContent);

  getHostListForFilter();
  $("#filterMeetingStartDate, #filterMeetingEndDate").on("change", function () {
    const formattedDate = formatDateToMMMDDYYYYForFilter(this.value);
    $(this).val(formattedDate);
  });
   $('#filterMeetingStartDate').datepicker({
    format: 'M dd, yyyy',
    // startDate: new Date(),
    autoclose: true,
  });
   $('#filterMeetingEndDate').datepicker({
    format: 'M dd, yyyy',
    // startDate: new Date(),
    autoclose: true,
  });
  if(USER_ROLE == "TEACHER"){
    $("#scheduleMeetingBtn").hide();
    fetchMeetings();
  }
}

function fetchMeetings() {
  const startDate = $("#filterMeetingStartDate").val();
  const endDate = $("#filterMeetingEndDate").val();

  const body = {
    title: $("#filterTitle").val().trim(),
    hostUserId: USER_ROLE == "TEACHER" ? USER_ID : parseInt($("#filterHostUserId").val()),
    meetingStartDate: startDate ? formatDateToYYYYMMDD(startDate) : null,
    meetingEndDate: endDate ? formatDateToYYYYMMDD(endDate) : null,
    limit: $("#limit").val() ? $("#limit").val() : null
  };
  $.ajax({
    url: BASE_URL + CONTEXT_PATH + "api/v1/get-all-meetings",
    method: "POST",
    data: JSON.stringify(body),
    contentType: "application/json",
    success: function (response) {
      const json = JSON.parse(response);
      const responseHtml = renderMeetings(json.data.meetings);
      $("#meetingTableContainer").html(responseHtml);
      $("#mainTable").DataTable();
    },
    error: function () {
      alert("Failed to fetch meetings.");
    }
  });
}

function applyFilters() {
  $('#filterMeeting').on('submit', function(event) {
    event.preventDefault();
    fetchMeetings();
  });
}

function fetchParticipants(meetingId) {
  $.ajax({
    url: BASE_URL+CONTEXT_PATH+`api/v1/get-attendees-details?entityId=${meetingId}&entityType=GENERAL_MEETINGS`,
    method: 'GET',
    contentType: 'application/json',
    success: function(response) {
      try {
        if (response) {
          const data = JSON.parse(response);
          if(data.status == "success") {
            const participants = data.data.attendeesNames.map(name => name).join(', ')
            $(`#tooltip-${meetingId}`).attr('title', participants);
            $(`#tooltip-${meetingId}`).tooltip('show');
          } else {
            $(`#tooltip-${meetingId}`).attr('title', "No Participants");
            $(`#tooltip-${meetingId}`).tooltip('show');
          }
        } else {
          throw new Error("Empty or invalid response received.");
        }
      } catch (e) {
        console.error("Error parsing JSON response: ", e.message);
      }
    },
    error: function() {
      console.error("Error fetching participants");
    }
  });
}

function renderMeetings(meetings) {
  let meetingsHtml = `
    <div class="meeting-list">
      <table id="mainTable" class="table">
        <thead>
          <tr>
            <th style="padding-left:16px !important; width: 30px !important;">S.No.</th>
            <th style="width: 110px !important;">Topic</th>
            <th>Host</th>
            <th style="width: 200px !important;">When</th>
            <th>Duration</th>
            <th>Status</th>
            <th>Participants</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>`;

        // <span class="">
        //       <button onclick="showMeetingDetails(${meeting.meetingId})" style="font-size: 16px;" class="text-secondary border-0 bg-transparent"><i class="fa fa-eye"></i></button>
        //     </span>
  
  meetings.forEach((meeting, index) => {
    const currentDateTime = new Date();
    const endDateTime = new Date(meeting.endTime.replace(" ", "T"));
    const disableButtonsOnEnd = currentDateTime > endDateTime;
    const disableButtonsOnStart = meeting.meetingStatus == "started" || meeting.meetingStatus =="STARTED";
    const meetingDate = formatDateToMMMDDYYYY(meeting.startDate)
    const utc = meeting.utc.split(" ")[1]
              // <button onclick="startLensUrl('${meeting.meetingId}')" class="btn btn-sm btn-primary">Start</button>
          // <button onclick="copyJoinUrl('${meeting.meetingId}')" class="btn btn-sm btn-secondary">Copy</button>
          // <button onclick="showMeetingDetails(${meeting.meetingId})" class="btn btn-sm">View</button>
          // <button onclick="editMeeting(${meeting.meetingId})" class="btn btn-sm btn-secondary">Edit</button>
          // <button onclick="showWarningMessage('Are you sure you want to delete this meeting?', 'deleteMeeting(${meeting.meetingId})')" class="btn btn-sm btn-danger">Delete</button>
          // edit button 
          // <button onclick="editMeeting(${meeting.meetingId})" style="border: 0; background: transparent; color: darkslateblue !important; padding: 5px; box-shadow: 0px 0px transparent;" class="btn btn-sm" ${disableButtonsOnStart ? "disabled" : ""}><i style="font-size: 20px;" class="fa fa-pencil"></i></button>
    meetingsHtml += `
      <tr>
        <td>${index + 1}</td>
        <td>
          <div class="pl-3">
            ${meeting.title}
          </div>
        </td>
        <td>${meeting.hostName}</td>
        <td>${meetingDate} ${meeting.timeRange} ${meeting.timezoneName} ${utc}</td>
        <td>${meeting.formattedMeetingDuration}</td>
        <td style="text-transform: capitalize;">${meeting.meetingStatus}</td>
        <td>
          ${meeting.participants == "N/A" ? "No Participants" : `
            <button id="tooltip-${meeting.meetingId}" onclick="fetchParticipants(${meeting.meetingId})" type="button" class="text-primary border-0 bg-transparent" style="font-size: 14px; font-weight: 900;" data-toggle="tooltip" title="Loading participants...">
             ${meeting.participants}
            </button>
          `}
        </td>
        ${USER_ROLE != 'TEACHER' ?
          `<td>
            <button onclick="startLensUrl('${meeting.meetingId}')" style="border: 0; background: transparent; color: #FF8601 !important; padding: 5px; box-shadow: 0px 0px transparent;" class="btn btn-sm"><i style="font-size: 20px;" class="fa fa-play"></i></button>
            <button onclick="copyJoinUrl('${meeting.meetingId}')" style="border: 0; background: transparent; color: darkblue !important; padding: 5px; box-shadow: 0px 0px transparent;" class="btn btn-sm"><i style="font-size: 20px;" class="fa fa-clone"></i></button>
            <button onclick="showMeetingDetails(${meeting.meetingId})" style="border: 0; background: transparent; color: #001173 !important; padding: 5px; box-shadow: 0px 0px transparent;" class="btn btn-sm"><i style="font-size: 20px;" class="fa fa-eye"></i></button>
            <button onclick="showWarningMessage('Are you sure you want to delete this meeting?', 'deleteMeeting(${meeting.meetingId})')" style="border: 0; background: transparent; color: #DC362E !important; padding: 5px; box-shadow: 0px 0px transparent;" class="btn btn-sm" ${disableButtonsOnStart ? "disabled" : ""}><i style="font-size: 20px;" class="fa fa-trash"></i></button>
          </td>`
        :
          `<td>
            <button onclick="startLensUrl('${meeting.meetingId}')" style="border: 0; background: transparent; color: #FF8601 !important; padding: 5px; box-shadow: 0px 0px transparent;" class="btn btn-sm"><i style="font-size: 20px;" class="fa fa-play"></i></button>
            <button onclick="copyJoinUrl('${meeting.meetingId}')" style="border: 0; background: transparent; color: darkblue !important; padding: 5px; box-shadow: 0px 0px transparent;" class="btn btn-sm"><i style="font-size: 20px;" class="fa fa-clone"></i></button>
          </td>`
        }
        
      </tr>`;
  });

  meetingsHtml += `
        </tbody>
      </table>
    </div>`;
  return meetingsHtml;
}

function showMeetingForm() {
  const formHtml = getMeetingFormHtml();
  $('#card-body').html(formHtml);

  $('#when').datepicker({
    format: 'M dd, yyyy',
    startDate: new Date(),
    autoclose: true,
  });
  
  getHostList();
  getAllTimeZone();
  initializeMeetingForm();
}

function initializeMeetingForm() {
  $('#meetingForm').on('submit', function(event) {
    event.preventDefault();
    const formData = getMeetingFormData();
    submitMeetingForm(formData);
  });
}

function getMeetingFormHtml() {
  $("<style>")
    .prop("type", "text/css")
    .html(`
      .select2-selection.select2-selection--single {
        border: 1px solid #a1a1a1 !important;
        border-radius: 5px !important;
      }
      // .select2-selection__placeholder {
      //   color: #2e2e2e !important;
      // }
    `)
    .appendTo("head");

  return `
    <div class="d-flex w-100">
    <!-- Main meeting form on the left -->
      <div class="main-card mb-3" style="width: 70%">
        <div class="card" style="box-shadow: 0px 0px;">
          <div class="card-body mx-5">
            <button class="bg-transparent mb-4 border-0" style="font-size: 16px; color: #011174; font-weight: bold;" onclick="getMeetingManagementContent()">
              <i class="fa fa-chevron-left" style="margin-right: 4px; font-size: 14px"></i> Back to meetings
            </button>
            <h2 class="mb-5" style="font-weight: bold;">Schedule Meeting</h2>
            <form id="meetingForm">
              <div class="mb-5 d-flex align-items-center" style="gap: 50px;">
                <label for="topic" class="" style="color: #2E2E2E; font-size: 16px !important; width: 25%;">Topic</label>
                <input type="text" id="topic" name="topic" class="p-2 border rounded" style="border-color: #a1a1a1 !important;width: 100%; font-size: 14px;" placeholder="Enter meeting topic" required>
              </div>

              <div class="mb-5 d-flex align-items-center" style="gap: 50px;">
                <label for="host" class="" style="color: #2E2E2E; font-size: 16px !important; width: 25%;">Host</label>
                <select onchange="checkAndFetchSchedule();checkAndFetchMeetings();" id="host" name="host" class="p-2 border rounded" style="border-color: #a1a1a1 !important;width: 100%; font-size: 14px;" required>
                <!-- Dynamically loaded -->
                </select>
              </div>
              
              <div id="whenContainer" class="mb-5 d-flex align-items-center w-100" style="gap: 50px;">
                <label for="when" class="form-label" style="color: #2E2E2E; font-size: 16px !important; width: 25%;">When</label>
                <div class="d-flex w-100" style="gap: 16px;">
                  <input 
                    onchange="checkAndFetchSchedule();checkAndFetchMeetings();" 
                    type="text" 
                    id="when" 
                    name="when" 
                    placeholder="Select Date" 
                    class="p-2 border rounded" 
                    style="border-color: #a1a1a1 !important; font-size: 14px; width: 100%;" 
                    autocomplete="off" 
                    required
                  >
                  
                  <select 
                    onchange="checkAndFetchMeetings();" 
                    id="hour" 
                    name="hour" 
                    class="p-2 border rounded" 
                    style="border-color: #a1a1a1 !important; font-size: 14px; width: 100%;" 
                    required
                  >
                    <option value="" disabled selected>HH:MM</option>  
                    <option value="12:00">12:00</option>
                    <option value="12:30">12:30</option>
                    <option value="01:00">01:00</option>
                    <option value="01:30">01:30</option>
                    <option value="02:00">02:00</option>
                    <option value="02:30">02:30</option>
                    <option value="03:00">03:00</option>
                    <option value="03:30">03:30</option>
                    <option value="04:00">04:00</option>
                    <option value="04:30">04:30</option>
                    <option value="05:00">05:00</option>
                    <option value="05:30">05:30</option>
                    <option value="06:00">06:00</option>
                    <option value="06:30">06:30</option>
                    <option value="07:00">07:00</option>
                    <option value="07:30">07:30</option>
                    <option value="08:00">08:00</option>
                    <option value="08:30">08:30</option>
                    <option value="09:00">09:00</option>
                    <option value="09:30">09:30</option>
                    <option value="10:00">10:00</option>
                    <option value="10:30">10:30</option>
                    <option value="11:00">11:00</option>
                    <option value="11:30">11:30</option>
                  </select>

                  <select 
                    onchange="checkAndFetchMeetings();" 
                    id="ampm" 
                    name="ampm" 
                    class="p-2 border rounded" 
                    style="border-color: #a1a1a1 !important; font-size: 14px; width: 100%;" 
                    required
                  >
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                  </select>
                </div>
              </div>

              <div id="durationContainer" class="mb-5 d-flex align-items-center" style="gap: 50px;">
                <label for="durationHour" class="form-label" style="color: #2E2E2E; font-size: 16px !important; width: 25%;">Duration</label>
                <div class="d-flex w-100" style="gap: 16px;">
                  <div class="d-flex align-items-center w-25" style="gap: 6px;">
                    <select 
                      id="durationHour" 
                      name="durationHour" 
                      class="p-2 border rounded w-100" 
                      style="border-color: #a1a1a1 !important; font-size: 14px;" 
                      required>
                      <option value="00">00</option>
                      <option value="01">01</option>
                      <option value="02">02</option>
                      <option value="03">03</option>
                      <option value="04">04</option>
                      <option value="05">05</option>
                      <option value="06">06</option>
                      <option value="07">07</option>
                    </select>
                    <p class="m-0">Hr</p>
                  </div>

                  <div class="d-flex align-items-center w-25" style="gap: 6px;">
                    <select 
                      id="durationMinute" 
                      name="durationMinute" 
                      class="p-2 border rounded w-100" 
                      style="border-color: #a1a1a1 !important; font-size: 14px;" 
                      required>
                      <option value="00">00</option>
                      <option value="10">10</option>
                      <option value="20">20</option>
                      <option value="30">30</option>
                      <option value="40">40</option>
                      <option value="50">50</option>
                    </select>
                    <p class="m-0">Min</p>
                  </div>
                </div>
              </div>

              <div class="mb-5 d-flex align-items-center" style="gap: 50px;">
                <label for="timezone" style="color: #2E2E2E; font-size: 16px !important; width: 25%;">Time Zone</label>
                <select disabled id="timezone" name="timezone" class="p-2 border rounded" style="border-color: #a1a1a1 !important;width: 100%; font-size: 14px;" required>
                  <!-- Add more timezones as needed -->
                </select>
              </div>

              <div class="d-none hidden">
                <label for="attendees" class="form-label">Attendees (comma separated emails)</label>
                <input type="text" id="attendees" name="attendees" class="form-control" placeholder="Enter emails, separated by commas">
              </div>

              <div class="d-flex w-100 pt-2" style="gap: 16px;">
                <button type="submit" class="btn rounded" style="background-color: #FF8601 !important;">Save</button>
                <button type="reset" class="btn rounded btn-secondary" onclick="resetRequiredFormData('#host');">Reset</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <!-- Schedule section on the right -->
      <div id="scheduleAndMeetingContainer" class="flex-column mx-auto" style="gap: 8px; display: none; padding-left: 15px;margin-top: 50px; border-left: 2px solid #DBDBDB;">
        <div id="scheduleSection" class="main-card mb-3" style="display: none; border-bottom: 1px solid #DBDBDB;"">
          <div class="card mb-2" style="box-shadow: 0px 0px;">
            <div class="card-body">
              <div id="scheduleContent">Loading schedule...</div>
            </div>
          </div>
        </div>

        <div id="meetingSection" class="main-card mb-3" style="display: none;">
          <div class="card mt-2 mb-0" style="box-shadow: 0px 0px;">
            <div class="card-body">
              <div id="meetingContent">Loading meetings...</div>
            </div>
          </div>
        </div>
      </div>
    </div>`;
}

function getMeetingFormData() {
  const dateInput = $('#when').val();
  const date = new Date(dateInput);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();
  const formattedDate = `${month}/${day}/${year}`;

  const dayId = getDayId();

  return {
    userId: USER_ID,
    title: $('#topic').val(),
    startDate: formattedDate,
    startTime: `${$('#hour').val()} ${$('#ampm').val()}`,
    duration: `${$('#durationHour').val()}:${$('#durationMinute').val()}`,
    hostUserId: $('#host').val(),
    timezone: $('#timezone').val(),
    schoolId: SCHOOL_ID,
    attendeesEmail: $('#attendees').val(),
    dayId: dayId
  };
}

function convertToAmPm(time) {
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours, 10);
  const period = hour >= 12 ? 'PM' : 'AM';
  const formattedHour = hour % 12 || 12;
  return `${formattedHour}:${minutes} ${period}`;
}

function showConflictPopup(topic, date, time) {
  const popupHtml = `
    <div id="conflictPopup" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.5); display: flex; justify-content: center; align-items: center; z-index: 9999;">
      <div style="background: white; border-radius: 12px; overflow: hidden; width: 40%;">
      <div class="d-flex flex-column align-items-center" style="padding: 50px; background: #ff8601; padding: 30px 10px 15px; gap: 8px;">
        <i class="fa fa-exclamation-circle" style="color: white; font-size: 30px;"></i>
        <h4 style="font-size: 18px; font-weight: bold; color: white; text-align: center;">The meeting you are trying to schedule is clashing with the following meeting:</h4>
      </div>
        <div className="" style="padding: 20px;">
          <p style="font-size: 14px !important; margin-left: 16px;"><strong>Topic:</strong> ${topic}</p>
          <p style="font-size: 14px !important; margin-left: 16px;"><strong>Date:</strong> ${date}</p>
          <p style="font-size: 14px !important; margin-left: 16px;"><strong>Time:</strong> ${time}</p>
          <button id="closePopup" class="d-flex mx-auto" style="margin-top: 15px; padding: 5px 20px; border: none; background: #ef4444; color: white; border-radius: 5px; cursor: pointer;">CLOSE</button>
        </div>
      </div>
    </div>
  `;
  $('body').append(popupHtml);

  $('#closePopup').on('click', function () {
    $('#conflictPopup').remove();
  });
}

function showErrorPopup(message) {
  const popupHtml = `
    <div id="errorPopup" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.5); display: flex; justify-content: center; align-items: center; z-index: 9999;">
      <div style="background: white; border-radius: 12px; overflow: hidden; width: 40%;">
      <div class="d-flex flex-column align-items-center" style="padding: 50px; background: #ff8601; padding: 15px 10px 15px; gap: 8px;">
        <i class="fa fa-exclamation-circle" style="color: white; font-size: 30px;"></i>
      </div>
        <div className="" style="padding: 20px;">
          <p style="font-size: 16px !important; text-align: center;">${message}</p>
          <button id="closeErrorPopup" class="d-flex mx-auto" style="margin-top: 15px; padding: 5px 20px; border: none; background: #ef4444; color: white; border-radius: 5px; cursor: pointer;">CLOSE</button>
        </div>
      </div>
    </div>
  `;
  $('body').append(popupHtml);

  $('#closeErrorPopup').on('click', function () {
    $('#errorPopup').remove();
  });
}

function submitMeetingForm(formData) {
  if(formData.duration == "00:00") {
    showErrorPopup("The duration cannot be set to 00 hours and 00 minutes. Please specify a valid time.");
    return;
  } else {
    $.ajax({
      url: BASE_URL+CONTEXT_PATH+'api/v1/save-councellor-meeting',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(formData),
      success: function(response) {
        const res = JSON.parse(response);
        if (res.status == "failed") {
          const topic = res.data.title;
          const selectedDate = formatDateToMMMDDYYYYForFilter($("#when").val())
          const startTime = convertToAmPm(res.data.startTime);
          const endTime = convertToAmPm(res.data.endTime);
          const timeRange = startTime + " - " + endTime
          showConflictPopup(topic, selectedDate, timeRange);
          return;
        }
        const meetingId = res.data.meetingId;

        const hostDetails = {
          key : res.data.hostUserId,
          extra : res.data.hostName,
          extra1 : res.data.hostEmail,
          extra4 : res.data.roleName
        }
        const timezoneDetails = {
          key: res.data.timezone,
          extra: res.data.offset,
          value: res.data.countryTimezone
        }
        getHostList(hostDetails)
        getAllTimeZone(timezoneDetails)
        showMessage(false, res.message)
        const savedMeetingHtml = savedMeetingLinkHtml(meetingId, formData, hostDetails, timezoneDetails);
        $('#card-body').html(savedMeetingHtml);
      },
      error: function() {
        alert('Failed to save the meeting.');
      }
    });
  }
}

function editMeeting(meetingId) {
  $.ajax({
    url: BASE_URL+CONTEXT_PATH+`api/v1/get-meeting-details?meetingId=${meetingId}`,
    method: 'GET',
    contentType: 'application/json',
    success: function(response) {
      try {
        if (response) {
          const meeting = JSON.parse(response);
          const formHtml = getMeetingFormHtml();
          $('#card-body').html(formHtml);

          $('#when').datepicker({
              format: 'M dd, yyyy',
              startDate: new Date(),
              autoclose: true,
          });

          const dateInput = meeting.data.meetingStartDate;
          const [month, day, year] = dateInput.split('/');
          const date = new Date(`${year}-${month}-${day}`);

          const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
          const formattedDateForEdit = `${monthNames[date.getMonth()]} ${String(date.getDate()).padStart(2, '0')}, ${date.getFullYear()}`;

          $('#topic').val(meeting.data.title);
          $('#when').val(formattedDateForEdit);
          $('#hour').val(meeting.data.meetingStartTime.split(' ')[0]);
          $('#ampm').val(meeting.data.meetingStartTime.split(' ')[1]);
          $('#durationHour').val(meeting.data.duration.split(':')[0]);
          $('#durationMinute').val(meeting.data.duration.split(':')[1]);
          $('#timezone').val(meeting.data.countryTimezone);
          $('#attendees').val(meeting.data.attendeesEmail);
          const hostDetails = {
            key : meeting.data.hostUserId,
            extra : meeting.data.hostName,
            extra1 : meeting.data.hostEmail,
            extra4 : meeting.data.roleName,
            extra3 : meeting.data.timezone
          }
          getHostList(hostDetails);

          const timezoneDetails = {
            key: meeting.data.timezone,
            extra: meeting.data.offset,
            value: meeting.data.countryTimezone
          }
          getAllTimeZone(timezoneDetails);

          const originalMeetingData = {
            title: meeting.data.title,
            startDate: meeting.data.meetingStartDate,
            startTime: `${meeting.data.meetingStartTime.split(' ')[0]} ${meeting.data.meetingStartTime.split(' ')[1]}`,
            duration: meeting.data.duration,
            timezone: meeting.data.countryTimezone,
            attendeesEmail: meeting.data.attendeesEmail,
            hostUserId: meeting.data.hostUserId,
            hostName: meeting.data.hostName,
            hostEmail: meeting.data.hostEmail,
            timezone: meeting.data.timezone,
            // meetingEndDateTime: meeting.data.meetingEndDateTime
          };

          $('#meetingForm').on('submit', function(event) {
            event.preventDefault();
            const updatedFormData = getMeetingFormData();
            updatedFormData.meetingId = meetingId;
            updatedFormData.type = "E";
            updatedFormData.hostUserId = $('#host').val();
            updatedFormData.timezone = $('#timezone').val();
            
            const isChanged = hasMeetingChanged(originalMeetingData, updatedFormData);

            if (isChanged) {
              updateMeeting(meetingId, updatedFormData);
            } else {
              showMessage(false, "No Changes Found")
            }
            
          });
        } else {
          throw new Error("Empty or invalid response received.");
        }
      } catch (e) {
        console.error("Error parsing JSON response: ", e.message);
        alert('Failed to parse the meeting data.');
      }
    },
    error: function() {
      alert('Failed to load the meeting data.');
    }
  });
}

function hasMeetingChanged(originalData, updatedData) {
  return (
    originalData.title !== updatedData.title ||
    originalData.startDate !== updatedData.startDate ||
    originalData.startTime !== updatedData.startTime ||
    originalData.duration !== updatedData.duration ||
    originalData.timezone != updatedData.timezone ||
    originalData.attendeesEmail !== updatedData.attendeesEmail ||
    originalData.hostUserId != updatedData.hostUserId
  );
}

function updateMeeting(meetingId, formData) {
   if(formData.duration == "00:00") {
    showErrorPopup("The duration cannot be set to 00 hours and 00 minutes. Please specify a valid time.");
    return;
  } else {
    $.ajax({
      url: BASE_URL+CONTEXT_PATH+"api/v1/update-councellor-meeting",
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(formData),
      success: function(response) {
        const res = JSON.parse(response);
        if (res.status == "failed") {
          const topic = res.data.title;
          const selectedDate = formatDateToMMMDDYYYYForFilter($("#when").val())
          const startTime = convertToAmPm(res.data.startTime);
          const endTime = convertToAmPm(res.data.endTime);
          const timeRange = startTime + " - " + endTime
          showConflictPopup(topic, selectedDate, timeRange);
          return;
        }
        const newMeetingId = res.data.meetingId;
        const hostDetails = {
          key: res.data.hostUserId,
          extra: res.data.hostName,
          extra1 : res.data.hostEmail,
          extra4: res.data.roleName
        }
        const timezoneDetails = {
          key: res.data.timezone,
          extra: res.data.offset,
          value: res.data.countryTimezone
        }
        showMessage(false, res.message);
        const savedMeetingHtml = savedMeetingLinkHtml(newMeetingId, formData, hostDetails, timezoneDetails);
        $('#card-body').html(savedMeetingHtml);
      },
      error: function() {
        alert('Failed to update the meeting.');
      }
    });
  }
}

function deleteMeeting(meetingId) {
  const formData = {
    "meetingId": meetingId,
    "type": "D"
  }
  $.ajax({
    url: BASE_URL+CONTEXT_PATH+'api/v1/update-councellor-meeting',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(formData),
    success: function() {
      getMeetingManagementContent();
      showMessage(false, "Meeting Deleted Successfully")
    },
    error: function() {
      showMessage(true ,"Failed to delete the meeting.");
    }
  });
}

function showMeetingDetails(meetingId) {
  $.ajax({
    url: BASE_URL+CONTEXT_PATH+`api/v1/get-meeting-details?meetingId=${meetingId}`,
    method: 'GET',
    contentType: 'application/json',
    success: function(response) {
      try {
        if (response) {
          const meeting = JSON.parse(response);
          const formData = {
            title: meeting.data.title,
            startDate: meeting.data.meetingStartDate,
            startTime: meeting.data.meetingStartTime,
            duration: meeting.data.duration,
            timezone: meeting.data.countryTimezone,
            attendeesEmail: meeting.data.attendeesEmail,
            meetingStatus: meeting.data.meetingStatus,
            meetingEndDateTime: meeting.data.meetingEndDateTime,
          }
          const hostDetails = {
            key : meeting.data.hostUserId,
            extra : meeting.data.hostName,
            extra1 : meeting.data.hostEmail,
            extra4 : meeting.data.roleName
          }
          getHostList(hostDetails);

          const timezoneDetails = {
            key: meeting.data.timezone,
            extra: meeting.data.offset,
            value: meeting.data.countryTimezone
          }
          getAllTimeZone(timezoneDetails);

          const savedMeetingHtml = savedMeetingLinkHtml(meetingId, formData, hostDetails, timezoneDetails);
          $('#card-body').html(savedMeetingHtml);
        } else {
          throw new Error("Empty or invalid response received.");
        }
      } catch (e) {
        console.error("Error parsing JSON response: ", e.message);
        alert('Failed to parse the meeting data.');
      }
    }
  })
}

function savedMeetingLinkHtml(meetingId, formData, hostDetails, timezoneDetails) {
  const hour = formData.duration.split(":")[0];
  const minute = formData.duration.split(":")[1];
  const formattedDate = formatDateToMMMDDYYYY(formData.startDate);
  let joinUrl = joinLensUrl(""+meetingId);
  const currentDateTime = new Date();
  const endDateTime = new Date(formData.meetingEndDateTime?.replace(" ", "T"));
  const disableButtonsOnEnd = currentDateTime > endDateTime;
  const disableButtonsOnStart = formData.meetingStatus == "started" || formData.meetingStatus =="STARTED";
  return `
    <div class="meeting-container" style="padding-top: 30px; padding-left: 6rem;">
      <div class="d-flex align-items-center" style="gap: 10px;">
        <button class="bg-transparent mb-0 border-0" style="font-size: 16px; color: #011174; font-weight: bold;" onclick="getMeetingManagementContent()">
          Back to Meeting
        </button>
        <i class="fa fa-chevron-right" style="margin-right: 4px; font-size: 14px"></i>
        <p class="m-0" style="font-size: 16px !important;">Manage "${formData.title}"</p>
      </div>
     
      <div class="meeting-detail" style="padding-top: 10px;">
        <h3 style="font-size: 26px; color: #333; margin-bottom: 40px; margin-left: 10px; font-weight: bold;">Meeting Details</h3>
        
        <div class="" style="width: 75%;">
          <div style="display: flex; align-items: center; padding: 12px;">
            <div style="font-size: 14px; color: #666; width: 40%;"><strong>Topic</strong></div>
            <div style="font-size: 14px; width: 80%;">${formData.title}</div>
          </div>

          <div style="display: flex; align-items: center; padding: 12px;">
            <div style="font-size: 14px; color: #666; width: 40%;"><strong>Host Details</strong></div>
            <div style="font-size: 14px; width: 80%;">
              ${hostDetails.extra} (${hostDetails.extra4})
              <br>
              ${hostDetails.extra1}
            </div>
          </div>

          <div id="saveWhenContainer" style="display: flex; align-items: center; padding: 12px;">
            <div style="font-size: 14px; color: #666; width: 40%;"><strong>When</strong></div>
            <div style="font-size: 14px; width: 80%;">${formattedDate} ${formData.startTime}</div>
          </div>

          <div id="saveDurationContainer" style="display: flex; align-items: center; padding: 12px;">
            <div style="font-size: 14px; color: #666; width: 40%;"><strong>Duration</strong></div>
            <div style="font-size: 14px; width: 80%;">${hour} Hour(s) ${minute} Minute(s)</div>
          </div>

          <div style="display: flex; align-items: center; padding: 12px;">
            <div style="font-size: 14px; color: #666; width: 40%;"><strong>Time Zone</strong></div>
            <div style="font-size: 14px; width: 80%;">(${timezoneDetails.extra}) ${timezoneDetails.value}</div>
          </div>

          <div style="display: flex; align-items: center; padding: 12px;">
            <div style="font-size: 14px; color: #666; width: 40%;"><strong>Invite Link</strong></div>
            <div style="font-size: 14px; width: 80%; color: #ff8601;">${joinUrl}</div>
          </div>

          <div class="action-buttons" style="display: flex; justify-content: flex-start; gap: 12px; margin-top: 50px;">
            <button onclick="startLensUrl('${meetingId}')" class="btn rounded" style="padding: 10px 20px; font-size: 16px; background-color: #FF8601; font-weight: bold;">Start</button>
            <button onclick="copyJoinUrl('${meetingId}')" class="btn rounded" style="padding: 10px 20px; font-size: 16px; border: 1px solid #ddd; background-color: #FFF; color: #000;font-weight: bold;">
              <i class="fa fa-clone" style="font-size: 16px; margin-right: 6px;"></i>
              Copy Invitation
            </button>
            <button onclick="showWarningMessage('Are you sure you want to delete this meeting?', 'deleteMeeting(${meetingId})')" class="btn rounded" style="padding: 10px 20px; font-size: 16px; background-color: #EB2314; color: #FFF; font-weight: bold;" ${disableButtonsOnStart ? "disabled" : ""}>Delete</button>
          </div>
        </div>
      </div>
    </div>`
}

let selectedHostKey = null;
let selectedHostName = null;
let selectedRole = null;
let selectedHostTimezone = null;
let selectedHostTimezoneName = null;
let selectedHostTimezoneUTC = null;

function getHostList(hostDetails) {
  $.ajax({
    type: "POST",
    contentType: "application/json",
    url: getURLForCommon('masters'),
    data: JSON.stringify(getRequestForHostList('GET-ALL-HOST-LIST')),
    dataType: 'json',
    cache: false,
    timeout: 600000,
    success: function(response) {
      const data = response.mastersData.allHostList;
      const hostEmailSelect = $("#host");
      hostEmailSelect.empty();
      hostEmailSelect.append('<option value="">Select Host</option>');
      
      data.forEach(host => {
        const optionHtml = `<option value="${host.key}">${host.extra} (${host.extra4})</option>`;
        hostEmailSelect.append(optionHtml);
      });

      if (hostDetails) {
        hostEmailSelect.val(hostDetails.key);
      }

      hostEmailSelect.select2({
        placeholder: "Select Host",
        allowClear: true
      });

      selectedHostKey = hostDetails ? hostDetails.key : null;
      selectedHostName = hostDetails ? hostDetails.extra : null;
      selectedRole = hostDetails ? hostDetails.extra4 : null;
      selectedHostTimezone = hostDetails ? hostDetails.extra3 : null;
      selectedHostTimezoneName = hostDetails ? hostDetails.extra5 : null;
      selectedHostTimezoneUTC = hostDetails ? hostDetails.extra2 : null;

      hostEmailSelect.on('change', function() {
        selectedHostKey = $(this).val();
        const selectedHost = data.find(host => host.key === selectedHostKey);
        selectedHostName = selectedHost ? selectedHost.extra : null;
        selectedRole = selectedHost ? selectedHost.extra4 : null;
        selectedHostTimezone = selectedHost ? selectedHost.extra3 : null;
        selectedHostTimezoneName = selectedHost ? selectedHost.extra5 : null;
        selectedHostTimezoneUTC = selectedHost ? selectedHost.extra2 : null;

        getAllTimeZone(selectedHostTimezone ? { 
          key: selectedHostTimezone,
          value: selectedHostTimezoneName,
          extra: selectedHostTimezoneUTC
        } : null);
      });
    },
    error: function(e) {
      console.log(e);
    }
  });
}

function getHostListForFilter() {
  $.ajax({
    type: "POST",
    contentType: "application/json",
    url: getURLForCommon('masters'),
    data: JSON.stringify(getRequestForHostList('GET-ALL-HOST-LIST')),
    dataType: 'json',
    cache: false,
    timeout: 600000,
    success: function(response) {
      const data = response.mastersData.allHostList;
      const hostEmailSelect = $("#filterHostUserId");

      hostEmailSelect.empty();

      hostEmailSelect.append('<option value="" selected>Select Host</option>');

      data.forEach(host => {
        const optionHtml = `<option value="${host.key}">${host.extra} (${host.extra4})</option>`;
        hostEmailSelect.append(optionHtml);
      });

      if (USER_ROLE == 'TEACHER') {
        hostEmailSelect.val(USER_ID);
        $('#filterHostDiv').hide();
      }

      hostEmailSelect.select2({
        placeholder: "Select Host",
        allowClear: true
      });

      hostEmailSelect.on('change', function() {
        selectedHostKey = $(this).val();
        const selectedHost = data.find(host => host.key === selectedHostKey);
        selectedHostName = selectedHost ? selectedHost.extra4 : null;
        selectedHostTimezone = selectedHost ? selectedHost.extra3 : null;
        selectedHostTimezoneName = selectedHost ? selectedHost.extra5 : null;
        selectedHostTimezoneUTC = selectedHost ? selectedHost.extra2 : null;
      });
    },
    error: function(e) {
      console.log(e);
    }
  });
}

function getAllTimeZone(timezoneDetails) {
  $.ajax({
    type : "POST",
    contentType : "application/json",
    url : getURLForCommon('masters'),
    data : JSON.stringify(getRequestForMaster('', 'TIMEZONE-LIST', '')),
    dataType : 'json',
    success : function(response) {
      const data = response.mastersData.countryTimeZones;
      const timezoneSelect = $("#timezone");
      timezoneSelect.empty();

      if (timezoneDetails) {
        const selectedTimezone = timezoneDetails;
        timezoneSelect.append(
          selectedTimezone 
            ? `<option selected value="${selectedTimezone.key}">(${selectedTimezone.extra}) ${selectedTimezone.value}</option>`
            : '<option selected value="">Select Timezone</option>'
        );
      } else {
        timezoneSelect.append('<option selected value="">Select Timezone</option>');
      }

      data.forEach(timezone => {
        const optionHtml = `<option value="${timezone.key}">(${timezone.extra}) ${timezone.value}</option>`;
        timezoneSelect.append(optionHtml);
      });

      timezoneSelect.select2({
        placeholder: "Select Timezone",
        allowClear: true
      });
    }
  });
}

// video urls start 
function encode(data){
  return window.btoa(data);
}

function startLensUrl(entityId) {
  var payload={}
  payload['entityId']=entityId;
  payload['entityType']="GENERAL_MEETINGS";
  let baseUrl=BASE_URL+CONTEXT_PATH+"start?payload=";
  baseUrl += encode(JSON.stringify(payload))
  window.open(baseUrl,'_blank')
}

function joinLensUrl(entityId) {
  var payload={}
  payload['entityId']=entityId;
  payload['entityType']="GENERAL_MEETINGS";
  let baseUrl=BASE_URL+CONTEXT_PATH+"join?payload=";
  baseUrl += encode(JSON.stringify(payload))
  return baseUrl;
}

function copyJoinUrl(entityId) {
  let url = joinLensUrl(entityId);
  if (!url) {
    showMessage(false, "Url Invalid");
  } else {
    navigator.clipboard.writeText(url).then(
      () => showMessage(false, "URL copied successfully!")
    );
  }
}
// video urls end 

function getDayId() {
  const dateInput = $('#when').val();
  if (!dateInput) return null;

  const date = new Date(dateInput);
  const dayId = date.getDay() + 1;

  return dayId;
}

// schedule list start
function getScheduleList() {
  const hostName = selectedHostName;
  const dayId = getDayId();
  const teacherUserId = selectedHostKey;
  const date = new Date($("#when").val());
  const reqDate = formatDateToYYYYMMDD(date)
  const now = new Date();
  const systemTime = now.toTimeString().split(' ')[0];
  const startDate = `${reqDate} ${systemTime}`;
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric"
  });

  const body = { 
    teacherUserId: +teacherUserId,
    dayId: dayId,
    startDate: startDate,
  }

  if (!teacherUserId || !dayId) return;

  $.ajax({
    url: BASE_URL+CONTEXT_PATH+UNIQUEUUID+`/api/v1/dashboard/get-schedule`,
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(body),
    success: function(response) {
      try {
        const res = JSON.parse(response);
        const schedule = res.data.schedule;
        if (schedule && schedule.length > 0) {
          $('#scheduleAndMeetingContainer').css("display", "flex");
          $('#scheduleSection').show();
          $('#scheduleContent').html(`
            <h3 class="mb-4 text-center" style="font-weight: bold !important;">${hostName}'s schedule for ${formattedDate}.</h3>
            ${schedule
              .map(item => `<p class="bg-gray p-2 rounded">${item.timeRange}</p>`)
              .join('')}
            <p class="mb-4 text-danger text-center" style="font-weight: bold !important;">
              Do not schedule meetings within these time ranges.
            </p>
          `);
        } else {
          $('#scheduleAndMeetingContainer').css("display", "flex");
          $('#scheduleSection').show();
          $('#scheduleContent').html(`
            <h3 class="mb-4 text-center" style="font-weight: bold !important;">${hostName}'s schedule for ${formattedDate}.</h3>
            <p class="text-center text-primary" style="font-size: 16px !important; font-weight: bold !important;">Fully Available</p>
          `)
        }
      } catch (error) {
        console.error("Failed to fetch schedule:", error);
        $('#scheduleContent').html('<p>Error loading schedule.</p>');
      }
    }
  })
}

function checkAndFetchSchedule() {
  const date = $('#when').val();
  selectedHostKey = $('#host').val();

  if (date && selectedHostKey && selectedRole == "TEACHER" && selectedHostKey !== "0") {
    getScheduleList();
  } else {
    $('#scheduleAndMeetingContainer').css("display", "none");
    $('#scheduleSection').hide();
  }
}
// schedule list end


function getRequiredDateTime() {
  const dateInput = $('#when').val();
  if (!dateInput) return null;

  const [month, day, year] = dateInput.replace(',', '').split(' ');
  const monthIndex = new Date(`${month} 1, 2000`).getMonth();
  const date = new Date(year, monthIndex, parseInt(day));

  const formattedDate = `${year}-${String(monthIndex + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

  let hour = $('#hour').val();
  const ampm = $('#ampm').val();

  var [hours, minutes] = hour?.split(':') || ["00", "00"];

  if (ampm === 'PM' && hours !== '12') {
    hours = parseInt(hours) + 12;
  } else if (ampm === 'AM' && hours === '12') {
    hours = '00';
  }

  const formattedDateTime = `${formattedDate} ${String(hours).padStart(2, '0')}:${minutes}:00`;
  return formattedDateTime;
}

// meeting list start
function getMeetingList() {
  const meetingStartDate = getRequiredDateTime();
  const date = new Date($("#when").val());
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric"
  });

  if (!meetingStartDate) {
    return;
  }

  const formData = {
    "meetingStartDate": meetingStartDate,
    "hostUserId": $('#host').val()
  };

  $.ajax({
    url: BASE_URL+CONTEXT_PATH+`/api/v1/get-scheduled-meetings`,
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(formData),
    success: function(response) {
      try {
        const res = JSON.parse(response);
        const meetings = res.data.meetings;
        if (meetings && meetings.length > 0) {
          $('#scheduleAndMeetingContainer').css("display", "flex");
          $('#meetingSection').show();
          $('#meetingContent').html(`
            <h3 class="mb-4 text-center" style="font-weight: bold !important;">Existing meetings for ${formattedDate}.</h3>
            ${meetings
              .map(item => `<p class="bg-gray p-2 rounded">${item.timeRange}</p>`)
              .join('')}
            <p class="mb-4 text-danger text-center" style="font-weight: bold !important;">
              Do not schedule meetings within these time ranges.
            </p>
          `);
        } else {
          $('#scheduleAndMeetingContainer').css("display", "flex");
          $('#meetingSection').show();
          $('#meetingContent').html(`
            <h3 class="mb-4 text-center" style="font-weight: bold !important;">Existing meetings for ${formattedDate}.</h3>
            <p class="text-center text-primary" style="font-size: 16px !important; font-weight: bold !important;">No Meetings For Now</p>
          `);
        }
      } catch (error) {
        console.error("Failed to fetch meetings:", error);
        $('#meetingContent').html('<p>Error loading meetings.</p>');
      }
    }
  })
}

function checkAndFetchMeetings() {
  const meetingStartDate = getRequiredDateTime();
  
  selectedHostKey = $('#host').val();

  if (meetingStartDate && selectedHostKey && selectedHostKey !== "0") {
    getMeetingList();
  } else {
    $('#scheduleAndMeetingContainer').css("display", "none");
    $('#meetingSection').hide();
  }
}
// meeting list end

function formatDateToMMMDDYYYY(dateString) {
  const [month, day, year] = dateString.split('/');
  const date = new Date(`${year}-${month}-${day}`);
  
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric"
  });
}

function getRequestForHostList(key){
	var request = {};
	var requestData = {};
	var authentication = {};
	authentication['hash'] = getHash(); authentication['schoolId'] = SCHOOL_ID; authentication['schoolUUID'] = SCHOOL_UUID;
	authentication['userType'] = 'COMMON';
	requestData['requestKey'] = key;
	requestData['requestValue'] = SCHOOL_ID;
	request['requestData'] = requestData;
	request['authentication'] = authentication;
	return request;
}