function initiateMergeBatch(formId, standardId) {
  resetMergeBatchForm(formId);
  getStandard(formId, standardId);
  $("#mergeBatchModal").modal("show");
}
function validateMergeBatches(formId) {
  var flag = true;
  return flag;
}

function getRequestForMergeBatches(formId, userId, schoolId) {
  var request = {};
  var authentication = {};
  authentication["hash"] = getHash();
  authentication["userId"] = userId;
  authentication["schoolId"] = SCHOOL_ID;
  authentication["schoolUUID"] = SCHOOL_UUID;
  request["authentication"] = authentication;
  request["schoolId"] = schoolId;
  return request;
}

function getMergeBatches(formId, moduleId, userId, schoolId, tableId, standardId) {
  if (!validateMergeBatches(formId)) {
    return false;
  }
  $.ajax({
    type: "POST",
    contentType: "application/json",
    url: getURLForHTML("dashboard", "merge-batches"),
    data: JSON.stringify(getRequestForMergeBatches(formId, userId, schoolId)),
    dataType: "json",
    success: function (data) {
      if (
        data["status"] == "0" ||
        data["status"] == "2" ||
        data["status"] == "3"
      ) {
        if (data["status"] == "3") {
          redirectLoginPage();
        } else {
          //showMessage(false, data['message']);
        }
      } else {
        $("#" + tableId + " tbody").html("");
        //showMessage(true, data['message']);
        $.each(data.mergeBatches, function (k, v) {
          var td0 = "<td>" + (k + 1) + "</td>";
          // var td10='<td style="width:165px">'
          // 	+'<button id="startURL'+k+'" class="btn btn-sm btn-primary" url="'+v.meetingUrl+'" onclick="copyURL(\'startURL'+k+'\',\'copyStartMsg'+k+'\')">Copy Start Url</button>';
          // 	if(v.meetingVendor=='ZOOM'){
          // 		td10+='<br/>'
          // 		+'<button id="joinURL'+k+'" class="btn btn-sm btn-primary" url="'+v.startUrl+'" onclick="copyURL(\'joinURL'+k+'\',\'copyJoinMsg'+k+'\')">Copy Join Url</button>';
          // 	}
          // 	td10+='<br/>'+'<span class="bold copyStartMsg'+k+'">'+'</span>';
          // if(v.meetingVendor=='ZOOM'){
          // 	td10+='<span class="bold copyJoinMsg'+k+'">'+'</span>';
          // }
          // td10+='</td>';
          var td1 =
            "<td><br/>" +
            v.mergeName +
            "<br/>" +
            v.fromBatch +
            "<br/>" +
            v.toBatch +
            "</td>";
          var td4 = "<td>" + v.subject + "</td>";
          var td4_2 = "<td>" + v.teacherName + "</td>";
          var td5 = "<td>" + v.startDate + "</td>";
          var td6 = "<td>" + v.endDate + "</td>";
          var td7 = "<td>" + v.mergedDate + "</td>";
          var td8 = "<td>" + v.separatedDated + "</td>";
          var td9 = "<td>" + v.status + "</td>";
          var td11 = "<td>" + v.meetingVendor + "</td>";
          var action = "<td></td>";
          var action = '<td><div class="dropdown"><button class="btn btn-primary dropdown-toggle" style="background-color: #007fff !important;border-color: #007fff;" type="button" data-toggle="dropdown"></button><ul class="dropdown-menu"><li>';
          var li3 = '<a href="javascript:void(0);" class="dropdown-item" onclick="batchMergeRecordingModal(' + moduleId + ',' + v.toBatchId + ',' + standardId + ',\'' + v.teacherName + '\',\'' + v.subject + '\');"><i class="fas fa-video"></i>&nbsp;&nbsp;Recordings</a>';
          action += li3;

          if (v.status != "Inactive") {
            //var li1='<a href="javascript:void(0);" class="dropdown-item" onclick="return callProceedMergeBatch(\''+formId+'\','+v.id+',\'Separate\');"><i class="fa fa-cogs"></i>&nbsp;&nbsp;Separate Batch</a>';
            var li2 = '<a href="javascript:void(0);" class="dropdown-item" onclick="return callProceedMergeBatch(\'' + formId + "'," + moduleId + "," + userId + ",'Inactive', " + v.id + ');"><i class="fa fa-cogs"></i>&nbsp;&nbsp;Inactive Batch</a>';
            var isEnabled = v.enableRegistration === true || v.enableRegistration === "true";
            var li4 = '<a href="javascript:void(0);" class="dropdown-item" ' + 'id="registrationAction_' + v.toBatchId + '" ' + 'data-enabled="' + isEnabled + '" ' + 'onclick="handleRegistrationAction(' + v.toBatchId + ', \'\')">' + '<i class="fa fa-toggle-on"></i>&nbsp;&nbsp;' + '<span class="reg-text">' + (isEnabled ? 'Disable Registration' : 'Enable Registration') + '</span>' + '</a>';
            action += li2;
            action += li4;
            action = action + "</li></ul></div></td>";
          }
          $("#" + tableId + " tbody").append(
            "<tr>" +
              td0 +
              td1 +
              td4 +
              td4_2 +
              td5 +
              td6 +
              td7 +
              td8 +
              td9 +
              td11 +
              action +
              "</tr>"
          );
        });
        var table = $("#" + tableId).DataTable();
        table.columns.adjust().draw();
      }
    },
  });
}

function getStandard(formId, elementId) {
  emptyBatch();
  var flag = false;
  $("#" + formId + " #" + elementId).prop("disabled", true);
  $.ajax({
    type: "POST",
    contentType: "application/json",
    url: getURLForCommon("masters"),
    data: JSON.stringify(getRequestForMaster("formId", "GRADES-LIST")),
    dataType: "json",
    success: function (data) {
      if (data["status"] == "0" || data["status"] == "2") {
        showMessage(0, data["message"]);
      } else {
        buildDropdown(
          data["mastersData"]["standards"],
          $("#" + elementId),
          "Select grade*"
        );
      }
      $("#" + elementId).prepend("<option value=''></option>");
      $("#" + elementId).prop("disabled", false);
      flag = true;
    },
    error: function (e) {
      $("#" + elementId).prop("disabled", false);
      flag = false;
    },
  });
  return flag;
}

function changeMergeRule() {
  var check = $("#fromBatch")
    .select2("val")
    .find((element) => element == $("#toBatch").val());
  if (check != undefined) {
    $("#mergeBatchProceed").hide();
    $("#mergeBatchLable").hide();
    $(".mergeBatchDates").show();
    $("#mergeBatchLable").html("");
    return false;
  }
  var fromBatchText = $("#fromBatch option:selected")
    .toArray()
    .map((item) => item.text)
    .join();
  var toBatchText = $("#toBatch option:selected")
    .toArray()
    .map((item) => item.text)
    .join();
  $("#mergeRule").html("");
  //var option1='<option value="FROM_BATCH_URL">All student will join classroom in '+fromBatchText.toUpperCase()+'\'s batch meeting url</option>';
  //$('#mergeRule').append(option1)
  //var option2='<option value="TO_BATCH_URL">All student will join classroom in '+toBatchText.toUpperCase()+'\'s batch meeting url</option>';
  //$('#mergeRule').append(option2)
  var option3 =
    '<option value="NEW_URL">All student will join classroom with new url</option>';
  $("#mergeRule").append(option3);
  if (fromBatchText != toBatchText) {
    $("#mergeBatchLable").html(
      'Merge "' +
        fromBatchText.toUpperCase() +
        '" batch with "' +
        toBatchText.toUpperCase() +
        '" batch'
    );
    $("#mergeBatchLable").show();
    $("#mergeBatchProceed").show();
  } else {
    $("#mergeBatchProceed").hide();
  }
  $(".mergeBatchDates").show();
}

function getCoursesByBatchIds(formId, batchIds, elementId) {
  $("#subjectId").html();
  var value = []; // $("#"+formId+" #"+batchIds).select2('val');
  value.push($("#" + formId + " #" + batchIds).val());
  if (value.length === 0) {
    $("#" + formId + " #subjectIds").html("");
    return false;
  }
  var check = $("#fromBatch")
    .select2("val")
    .find((element) => element == $("#toBatch").val());
  if (check != undefined) {
    changeMergeRule();
    return false;
  }
  courseProviderId = $("#" + formId + " #courseProviderId").val();
  $.ajax({
    type: "POST",
    contentType: "application/json",
    url: getURLForCommon("masters"),
    data: JSON.stringify(
      getRequestForMaster(
        formId,
        "ASSIGN_SUBJECTS_ONLY_BASED_ON_BATCHES",
        "",
        courseProviderId,
        "",
        "",
        value
      )
    ),
    dataType: "json",
    async: false,
    success: function (data) {
      if (data["status"] == "0" || data["status"] == "2") {
        showMessage(true, data["message"]);
      } else {
        var result = data["mastersData"]["courseList"];
        var dropdown = $("#" + formId + " #" + elementId);
        dropdown.html("");
        $.each(result, function (k, v) {
          dropdown.append(
            '<option value="' + v.key + '">' + v.value + " </option>"
          );
        });
        $("#" + elementId).prepend("<option value=''></option>");
      }
      changeMergeRule();
    },
  });
}
function getBatchesByGradeFresh(
  formId,
  standardId,
  subjectId,
  courseType,
  courseProviderId
) {
  var value = $("#" + formId + " #" + standardId).val();
  courseProviderId = $("#" + formId + " #courseProviderId").val();
  callBatchesByMulltipleGradeId(
    formId,
    value,
    standardId,
    subjectId,
    courseProviderId,
    "0"
  );
}

function getBatchesByGrade(
  formId,
  standardId,
  subjectId,
  courseType,
  courseProviderId
) {
  if (
    $("#" + formId + " #courseProviderId").val() == "" ||
    $("#" + formId + " #courseProviderId").val() == 0
  ) {
    emptyBatch();
    return false;
  }
  courseProviderId = $("#" + formId + " #courseProviderId").val();
  if (
    $("#" + formId + " #" + standardId).val() == "" ||
    $("#" + formId + " #" + standardId).val() == 0
  ) {
    emptyBatch();
    return false;
  }
  var value = $("#" + formId + " #" + standardId).val();
  callBatchesByMulltipleGradeId(
    formId,
    value,
    standardId,
    subjectId,
    courseProviderId,
    "0"
  );
  copyBatch();
}

function getRequestForProceedMergeBatches(
  formId,
  userId,
  controlType,
  batchMergeId
) {
  var request = {};
  var authentication = {};
  var proceedMergeBatch = {};
  authentication["hash"] = getHash();
  authentication["userId"] = userId;
  authentication["schoolId"] = SCHOOL_ID;
  authentication["schoolUUID"] = SCHOOL_UUID;

  proceedMergeBatch["batchMergeId"] = batchMergeId;
  proceedMergeBatch["controlType"] = controlType;
  proceedMergeBatch["schoolId"] = SCHOOL_ID;
  if (controlType == "Merge") {
    proceedMergeBatch["mergeName"] = $("#" + formId + " #mergeName").val();
    //proceedMergeBatch['mergeDescription'] = $('#'+formId+' #mergeDescription').val();
    proceedMergeBatch["standardId"] = $("#" + formId + " #standardId").select2(
      "val"
    );
    proceedMergeBatch["fromBatches"] = $("#" + formId + " #fromBatch").select2(
      "val"
    );
    proceedMergeBatch["toBatch"] = $("#" + formId + " #toBatch").val();
    proceedMergeBatch["subjectId"] = $("#" + formId + " #subjectId").val();
    proceedMergeBatch["mergeRule"] = $("#" + formId + " #mergeRule").val();
    proceedMergeBatch['enableRegistration'] = $("#" + formId + " #enableRegistration").val() === "true";
    proceedMergeBatch["mergeStartDate"] = $(
      "#" + formId + " #mergeStartDate"
    ).val();
    proceedMergeBatch["mergeEndDate"] = $(
      "#" + formId + " #mergeEndDate"
    ).val();
    proceedMergeBatch["meetingVendor"] = $(
      "#" + formId + " #meetingVendor"
    ).val();
  }
  request["authentication"] = authentication;
  request["proceedMergeBatch"] = proceedMergeBatch;
  return request;
}
function validateRequestForProceedMergeBatch(formId, controlType) {
  if (controlType == "Merge") {
    if ($("#" + formId + " #mergeName").val() == "") {
      showMessage(0, "Merge batch name is required");
      return false;
    }
    if ($("#" + formId + " #mergeStartDate").val() == "") {
      showMessage(0, "Start date is required");
      return false;
    }
    if ($("#" + formId + " #mergeEndDate").val() == "") {
      showMessage(0, "End date is required");
      return false;
    }

    var startDate = new Date(
      $("#" + formId + " #mergeStartDate").val()
    ).getTime();
    var endDate = new Date($("#" + formId + " #mergeEndDate").val()).getTime();

    if (
      new Date($("#" + formId + " #mergeStartDate").val()).getTime() >
      new Date($("#" + formId + " #mergeEndDate").val()).getTime()
    ) {
      showMessage(
        0,
        "Either merge end date is greater or equal to merge start date"
      );
      return false;
    }
  }
  return true;
}
function callProceedMergeBatch(
  formId,
  moduleId,
  userId,
  controlType,
  batchMergeId
) {
  if (!validateRequestForProceedMergeBatch(formId, controlType)) {
    return false;
  }
  var me = $(this);
  if (me.data("requestRunning")) {
    return false;
  }
  me.data("requestRunning", true);
  $.ajax({
    type: "POST",
    contentType: "application/json",
    url: getURLForHTML("dashboard", "proceed-merge-batches"),
    data: JSON.stringify(
      getRequestForProceedMergeBatches(
        formId,
        userId,
        controlType,
        batchMergeId
      )
    ),
    dataType: "json",
    success: function (data) {
      if (data["status"] == "0" || data["status"] == "2") {
        showMessage(0, data["message"]);
      } else {
        $("#mergeBatchModal").modal("hide");
        showMessage(0, data["message"]);
        getMergeBatches(
          "mergeBatchForm",
          moduleId,
          userId,
          SCHOOL_ID,
          "mergeBatches",
          standardId
        );
      }
    },
    complete: function () {
      window.setTimeout(function () {
        me.data("requestRunning", false);
      }, 10000);
    },
  });
}

function copyBatch() {
  $("#fromBatch").prepend("<option value=''></option>");
  $("#toBatch").prepend("<option value=''></option>");
  $("#toBatch").html($("#fromBatch").html());
}
function emptyBatch() {
  $("#toBatch").html("");
  $("#fromBatch").html("");
  $("#subjectId").html("");
  $("#mergeBatchProceed").hide();
  $(".mergeBatchDates").hide();
}
function resetMergeBatchForm(formId) {
  $("#" + formId + " #mergeName").val("");
  $("#" + formId + " #standardId").html("");
  $("#" + formId + " #mergeRule").html("");
  $("#" + formId + " #mergeStartDate").val("");
  $("#" + formId + " #mergeEndDate").val("");
  $("#" + formId + " #mergeBatchLable").html("");
  emptyBatch();
}

function copyURL(eleID, msgEle) {
  var copyURL = $("#" + eleID).attr("url");
  if (copyURL.length > 0) {
    var textarea = document.createElement("textarea");
    textarea.textContent = copyURL;
    textarea.style.position = "fixed"; // Prevent scrolling to bottom of page in MS Edge.
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    $("." + msgEle).removeClass("text-danger");
    $("." + msgEle)
      .addClass("text-success")
      .text("URL copied!"),
      setTimeout(function () {
        $("." + msgEle).text("");
      }, 3000);
    document.body.removeChild(textarea);
  } else {
    $("." + msgEle).removeClass("text-danger");
    $("." + msgEle)
      .addClass("text-danger")
      .text("Invalid URL"),
      setTimeout(function () {
        $("." + msgEle).text("");
      }, 3000);
  }
}

function batchMergeRecordingModal(moduleId, batchId, standardId, teacherName, subject) {
  $("#modalModuleId").val(moduleId);
  $("#modalBatchId").val(batchId);
  $("#modalStandardId").val(standardId);
  $("#modalTeacherName").val(teacherName);
  $("#modalSubject").val(subject);
  const table = $("#recordingsTable");
  table.empty();
  table.append('<tr><td colspan="3" class="text-center">No recordings found</td></tr>');
  $("body").append(mergeBatchRecordingModal());
  $("#mergeBatchRecordingModal").modal("show");
  setTodayAsDefault();
  loadTeacherSubjectDropdownBatchMerge(batchId, teacherName, subject);
}

function loadTeacherSubjectDropdownBatchMerge(batchId, teacherName, subjectName1) {
  const dropdown = $("#teacherSubjectDropdown");
  const dayDropdown = $("#dayNameDropdown");
  dayDropdown.empty().append('<option value="">-- Select Day --</option>');
  dropdown.empty().append('<option value="">-- Select Teacher & Subject --</option>');

  $.ajax({
    url: BASE_URL + CONTEXT_PATH + "api/v1/get-all-class-meetings-list",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify({ batchId }),
    success: function(response) {
      if (typeof response === "string") response = JSON.parse(response);
      const classList = response?.data?.allClassList || [];

      if (!Array.isArray(classList) || classList.length === 0) {
        dropdown.append('<option value="">No Teacher & Subject found</option>');
        return;
      }

      classList.forEach(item => {
        const teacher = item.userFullName || "Unknown Teacher";
        const subject = item.subjectName || "Unknown Subject";
        const id = item.id;
        const batchId = item.batchId;
        const subjectId = item.subjectId;
        const standardId = item.standardId;
        const mergeTeacher = teacherName;
        const mergeSubject = subjectName1;

        dropdown.append('<option value="' + id + '" data-teacher="' + teacher + '" data-subject="' + subject + '" data-dayoptions=' + JSON.stringify(item.dayOptions || []) + ' data-batchId="' + batchId + '" data-subjectId="' + subjectId + '" data-standardId="' + standardId + '">' + teacher + ' - ' + subject + '</option>');
      });

      dropdown.on("change", function() {
        const selected = $(this).find("option:selected");
        const dayOptions = selected.data("dayoptions") || "";

        dayDropdown.empty().append('<option value="">-- Select Day --</option>');
        if (dayOptions) {
          dayDropdown.append(dayOptions);
        }
      });
    },
    error: function(err) {
      console.error("Failed to load teacher & subject list:", err);
      showMessage("Failed to load teachers & subjects", true);
    }
  });
}

function searchRecordingsMergeBatch() {
  const meetingId = $('#teacherSubjectDropdown').val();
  const dayId = $("#dayNameDropdown").val();
  const startDate = $('#startDate').val();
  const endDate = $('#endDate').val();
  const batchId = $('#teacherSubjectDropdown').find("option:selected").attr('data-batchId');
  const subjectId = $('#teacherSubjectDropdown').find("option:selected").attr('data-subjectId');
  const standardId = $('#teacherSubjectDropdown').find("option:selected").attr('data-standardId');

  if (!meetingId) { showMessage(true,'Please select a teacher & subject'); return; }
  if (!dayId) { showMessage(true,'Please select a day'); return; }
  if (!startDate || !endDate) { showMessage(true,'Please select a valid date range'); return; }

  const requestData = {
    entityId: parseInt(meetingId),
    startDate: startDate,
    endDate: endDate,
    entityName: 'BATCH_TEACHER_MAPPING',
    dayId: $("#dayNameDropdown").val(),
    batchId: parseInt(batchId),
    subjectId: parseInt(subjectId),
    standardId: parseInt(standardId)
  };

  $.ajax({
    url: BASE_URL + CONTEXT_PATH + "api/v1/get-all-lens-session-list",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(requestData),
    success: function(response) {
      if (typeof response === "string") response = JSON.parse(response);

      const sessions = response.data?.allLensSessionList || [];
      const table = $("#recordingsTable");
      table.empty();

      if (sessions.length === 0) {
        table.append('<tr><td colspan="3" class="text-center">No recordings found</td></tr>');
      } else {
        if (isUserAllowed) {
          sessions.forEach(function(session) {
          var meetingStartDateAndTime = changeDateFormatK8(new Date(session.createdAt), "MMM dd, yyyy hh:mm:ss A");
          var meetingStartDateFormatted = changeDateFormatK8(new Date(session.startTime), "MMM dd, yyyy hh:mm:ss A");
          const viewBtn = session.recordingsCount > 0
            ? '<button onclick="openRecordingModalMergeBatch(' + session.entityId + ', \'' + session.lensSessionId + '\', \'' + meetingStartDateAndTime + '\', \'Meeting\', \'' + meetingStartDateFormatted + '\', \'Host\')" ' +
                'class="btn btn-sm btn-link text-primary" title="Play Recording">' +
                '<i class="fa fa-video-camera" style="font-size: 20px;"></i>' +
              '</button>' +
              '</td>' :
              '<td>No recordings</td>';

          table.append(
            '<tr>' +
              '<td>' + (meetingStartDateAndTime || '-') + '</td>' +
              '<td>' + (session.meetingId || '-') + '</td>' +
              '<td>' + viewBtn + '</td>' +
            '</tr>'
          );
        });
        }
      }
    },
    error: function() { showMessage(true, 'Failed to load recordings'); }
  });
}

function openRecordingModalMergeBatch(entityId, sessionId, meetingStartDate, title, startTime, hostName) {
  const body = {
    sessionId: sessionId,
    entityId: entityId,
    entityName: 'BATCH_TEACHER_MAPPING',
    meetingType: 'CLASS',
    meetingDate: formatDateToYYYYMMDD(meetingStartDate)
  };

  $.ajax({
    type: "POST",
    url: BASE_URL + CONTEXT_PATH + "api/v1/get-event-recordings",
    data: JSON.stringify(body),
    contentType: "application/json",
    success: function (response) {
      let res = (typeof response === "string") ? JSON.parse(response) : response;

      if (res && res.statusCode === 0 && res.status === "success") {
        const recordings = res.data?.recordingUrls || [];
        if (recordings.length > 0) {
          $("#recordingListContainer").html(populateRecordingTable(recordings, sessionId, entityId, title, meetingStartDate, startTime));
          $("#recordingListModal").modal("show");
        } else {
          showMessage("No recordings available.", '', true);
        }
      } 
    },
    error: function (err) {
      console.error("Error fetching recordings:", err);
      showMessage("Failed to load recordings.", '', true);
    }
  });
}

function populateRecordingTable(recordings, sessionId, meetingId, meetingTitle, attendanceDate, attendanceJoinTime) {
    var titles = {
        "shared_screen_with_speaker_view.mp4": "Shared Screen with Speaker View",
        "active_speaker.mp4": "Active Speaker",
        "shared_screen_with_gallery_view.mp4": "Shared Screen With Gallery View",
        "gallery_view.mp4": "Gallery View",
        "shared_screen.mp4": "Shared Screen",
        "shared_screen_with_speaker_view_CC.mp4": "Shared Screen With Speaker View CC",
        "-1.1.mp4": "Recording",
        "-1.2.mp4": "Recording 2",
        "audio_only": "Audio File"
    };

    var fullContent = "";

    recordings.forEach(function(record) {
        var meetingId = record.meetingId;
        var sessionUrls = record.urls.map(function(urlData) {
            for (var key in titles) {
                if (urlData.url.indexOf(key) !== -1) {
                    return { url: urlData.url, title: titles[key] };
                }
            }
        }).filter(Boolean);

        var transcriptUrl = record.urls.length > 0 ? record.urls[record.urls.length - 1].url : null;

        var tableContent = "" +
            "<div class='recordings-table-wrapper my-4'>" +
                "<table class='table table-bordered'>" +
                    "<thead class='table-light'>" +
                        "<tr style='background-color: #e3e3e3;'>" +
                            "<th>Recording Title</th>" +
                            "<th>Action</th>" +
                        "</tr>" +
                    "</thead>" +
                    "<tbody>";

        if (sessionUrls.length > 0) {
            sessionUrls.forEach(function(recording) {
                tableContent +=
                    "<tr style='background-color: #fff;'>" +
                        "<td>" + recording.title + "</td>" +
                        "<td>" +
                            "<button class='btn btn-primary btn-sm' " +
                                "onclick='playRecordingBatch(\"" + recording.url + "\", \"" + recording.title + "\", \"" + meetingTitle + "\", \"" + attendanceDate + "\", \"" + attendanceJoinTime + "\")'>" +
                                "<i class='fa fa-play' aria-hidden='true'></i>" +
                            "</button>" +
                            "<button onclick=\"copyToClipboardSignedUrl('" + recording.url + "')\" style=\"border:0; background:transparent; color:darkblue; padding:5px;\" class=\"btn btn-sm\">" +
                            "<i style=\"font-size:20px;\" class=\"fa fa-clone\"></i>" +
                            "</button>" +
                            "<div id=\"toast\" style=\"visibility: hidden;min-width: 120px; background-color: #333; color: #fff; text-align: center; border-radius: 5px; padding: 8px; position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%); z-index: 1000;\">Copied!</div>" +
                        "</td>" +
                    "</tr>";
            });

            if (transcriptUrl) {
                tableContent +=
                    "<tr style='background-color: #fff;'>" +
                        "<td>Transcript</td>" +
                        "<td>" +
                            "<button class='btn btn-primary btn-sm' " +
                                "onclick='showVTTFile(\"" + transcriptUrl + "\", \"Transcript\", \"" + meetingTitle + "\", \"" + attendanceDate + "\", \"" + attendanceJoinTime + "\")'>" +
                                "<i class='fa fa-book' aria-hidden='true'></i>" +
                            "</button>" +
                        "</td>" +
                    "</tr>";
            }
        } else {
            tableContent += "<tr><td colspan='2'>No recordings available.</td></tr>";
        }

        tableContent +=
                    "</tbody>" +
                "</table>" +
            "</div>";

        fullContent += tableContent;
    });

    if (fullContent.trim() === "") {
        fullContent = "<p>No recordings available for any session.</p>";
    }
    var recordingTable = $("#recordingTable_" + sessionId);
    if (recordingTable.length > 0) {
        recordingTable.empty();
        recordingTable.append(fullContent);
    } 
    return fullContent;
}

function playRecordingBatch(videoUrl, title) {
  var videoModal = $("#videoModal");
  $.ajax({
    type: "POST",
    contentType: APPLICATION_JSON_VALUE,
    dataType: 'json',
    url: getURLForSignVideo(videoUrl),
    data: JSON.stringify({
      url: videoUrl
    }),
    success: function (responseData) {
      if (responseData.status == 0) {
        const signedUrl = responseData.url;
        recordingTitle = title;
        if (videoModal.length == 0) {
          $("body").append(
            '<div id="videoModal" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.5); display: flex; justify-content: center; align-items: center; z-index: 10000;">' +
              '<div style="background: white; border-radius: 12px; overflow: hidden; width: 70%; max-width: 70%;margin: auto; margin-top:50px;">' +
                '<div>' +
                  '<div class="d-flex justify-content-between align-items-center" style="padding: 15px 10px; background: #027FFF;">' +
                    '<h5 class="text-white mb-0" style="font-size: 18px; font-weight: bold;">' + recordingTitle + '</h5>' +
                    '<button onclick="closeVideoModal();" type="button" class="text-white btn btn-sm btn-danger" data-bs-dismiss="modal" aria-label="Close" style="font-size: 20px !important; margin: 0; padding: 0px 8px;">&times;</button>' +
                  '</div>' +
                  '<div style="padding: 20px;">' +
                    '<video class="videoTag w-100" style="height: 70vh; overflow-y: auto;" controls>' +
                      '<source src="' + signedUrl + '" type="video/mp4" />' +
                      'Your browser does not support the video tag.' +
                    '</video>' +
                  '</div>' +
                '</div>' +
              '</div>' +
            '</div>'
          );
        } else {
          videoModal.find(".modal-title").text(title);
          videoModal.find(".videoTag source").attr("src", signedUrl);
          videoModal.find(".videoTag")[0]?.load();
        }

        $("#videoModal").modal("show");
      } else {
        showMessage(responseData.message || "Failed to fetch video URL", '', true);
      }

      customLoader(false);
    }
  });
}

function mergeBatchRecordingModal() {
  return `
    <div class="modal fade" id="mergeBatchRecordingModal" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-xl" role="document">
        <div class="modal-content">
          <div class="modal-header bg-success">
            <h4 class="modal-title">Recordings</h4>
            <button type="button" class="close" data-dismiss="modal">
              <span>&times;</span>
            </button>
          </div>

          <div class="modal-body">
            <form class="form-row align-items-end">

              <div class="form-group col-md-3">
                <label>Select Teacher & Subject</label>
                <select class="form-control" id="teacherSubjectDropdown">
                  <option value="">-- Select Teacher & Subject --</option>
                </select>
              </div>

              <div class="form-group col-md-2">
                <label>Select Day Name</label>
                <select class="form-control" id="dayNameDropdown">
                  <option value="">-- Select Day --</option>
                </select>
              </div>

              <div class="form-group col-md-2">
                <label>Date Filter</label>
                <select class="form-control" id="dateFilter">
                  <option value="today">Today</option>
                  <option value="week">Week</option>
                  <option value="month">Month</option>
                  <option value="custom">Custom</option>
                </select>
              </div>

              <div class="form-group col-md-2">
                <label>From Date</label>
                <input type="date" class="form-control" id="startDate" disabled>
              </div>

              <div class="form-group col-md-2">
                <label>To Date</label>
                <input type="date" class="form-control" id="endDate" disabled>
              </div>

              <div class="form-group col-md-1">
                <button type="button" class="btn btn-primary btn-block" onclick="searchRecordingsMergeBatch()">Search</button>
              </div>

            </form>

            <div class="table-responsive mt-3">
              <table class="table table-bordered">
                <thead class="bg-primary text-white">
                  <tr>
                    <th>Start Time</th>
                    <th>Meeting ID</th>
                    <th>Recordings</th>
                  </tr>
                </thead>
                <tbody id="recordingsTable"></tbody>
              </table>
            </div>

          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="recordingListModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-info">
            <h5 class="modal-title">Recording List</h5>
            <button type="button" class="close" data-dismiss="modal">
              <span>&times;</span>
            </button>
          </div>
          <div class="modal-body" id="recordingListContainer"></div>
        </div>
      </div>
    </div>
    `;
}


$(document).ready(function () {
  setTodayAsDefault();

  $(document).on('change', '#dateFilter', function () {
    const filter = $(this).val();
    const today = new Date();
    let start = "", end = "";

    if (filter === 'custom') {
      $('#startDate, #endDate')
        .prop('readonly', false)
        .prop('disabled', false)
        .val('');
    } else {
      $('#startDate, #endDate')
        .prop('readonly', true)
        .prop('disabled', true);

      switch (filter) {
        case 'today':
          start = end = formatDate(today);
          break;

        case 'week':
          const firstDay = new Date(today);
          firstDay.setDate(today.getDate() - today.getDay());
          const lastDay = new Date(firstDay);
          lastDay.setDate(firstDay.getDate() + 6);
          start = formatDate(firstDay);
          end = formatDate(lastDay);
          break;

        case 'month':
          const firstOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
          const lastOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
          start = formatDate(firstOfMonth);
          end = formatDate(lastOfMonth);
          break;
      }

      $('#startDate').val(start);
      $('#endDate').val(end);
    }
  });

  $(document).on('hidden.bs.modal', '#mergeBatchRecordingModal', function () {
    const table = $("#recordingsTable");
    table.empty();
    table.append(
      '<tr><td colspan="3" class="text-center">No recordings found</td></tr>'
    );
    setTodayAsDefault();
  });
});

$(document).on('focus', '#startDate, #endDate', function () {
  $(this).datepicker({
    format: 'yyyy-mm-dd',
    autoclose: true,
    todayHighlight: true
  });
});

function setTodayAsDefault() {
  const today = new Date();
  const formatted = formatDate(today);
  $('#startDate').val(formatted).prop('readonly', true).prop('disabled', true);
  $('#endDate').val(formatted).prop('readonly', true).prop('disabled', true);
  $('#dateFilter').val('today');
}

function formatDate(date) {
  return date.toISOString().split('T')[0];
}

var regEntityId = null;
var regNextValue = false;
var regFlag = null;

function handleRegistrationAction(id, flag) {

  const actionEl = $("#registrationAction_" + id);

  const isEnabled = actionEl.data("enabled") == true;

  regEntityId = id;
  regNextValue = !isEnabled;
  regFlag = flag;

  if (!$("#registrationConfirmModal").length) {
    $("body").append(registrationConfirmModal());
  }

  const msg = isEnabled
    ? "Do you want to disable registration?"
    : "Do you want to enable registration?";

  $("#registrationConfirmMsg").text(msg);
  $("#registrationConfirmModal").modal("show");
}


function registrationConfirmModal() {
  return `
  <div class="modal fade" id="registrationConfirmModal" tabindex="-1">
    <div class="modal-dialog modal-sm modal-dialog-centered">
      <div class="modal-content">

        <div class="modal-header bg-primary text-white">
            <h5 class="modal-title">Confirm</h5>
            <button type="button" class="close text-white" data-dismiss="modal">
                <span>&times;</span>
            </button>
        </div>

        <div class="modal-body text-center">
          <p id="registrationConfirmMsg"></p>
        </div>

        <div class="modal-footer justify-content-center">
          <button class="btn btn-secondary" data-dismiss="modal">No</button>
          <button class="btn btn-primary" id="confirmRegistrationBtn">Yes</button>
        </div>

      </div>
    </div>
  </div>
  `;
}


$(document).on("click", "#confirmRegistrationBtn", function () {
  const btn = $(this);
  btn.prop("disabled", true);

  $.ajax({
    url: getURLForHTML('dashboard','api/update-registration'),
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify({
      id: regEntityId,
      enableRegistration: regNextValue,
      extraActivityFlag: regFlag
    }),
    success: function () {

    showMessage(false, "Updated successfully");

    const newValue = !!regNextValue;

    $("#registrationStatus_" + regEntityId)
        .text(newValue ? "Enabled" : "Disabled");

    const actionEl = $("#registrationAction_" + regEntityId);
    actionEl
        .data("enabled", newValue)
        .attr("data-enabled", newValue);
    setRegistrationText(regEntityId);

    $("#registrationConfirmModal").modal("hide");
    },
    error: function () {
      showMessage(true, "Something went wrong");
    },
    complete: function () {
      btn.prop("disabled", false);
    }
  });
});

$(document).on("shown.bs.dropdown", ".dropdown", function () {
  const actionEl = $(this).find("[id^='registrationAction_']")[0];
  if (!actionEl) return;

  const batchId = actionEl.id.replace("registrationAction_", "");
  setRegistrationText(batchId);
});

function setRegistrationText(batchId) {
  const el = document.getElementById("registrationAction_" + batchId);
  if (!el) return;

  const enabled = el.dataset.enabled === "true";

  el.querySelector(".reg-text").innerText =
    enabled ? "Disable Registration" : "Enable Registration";
}