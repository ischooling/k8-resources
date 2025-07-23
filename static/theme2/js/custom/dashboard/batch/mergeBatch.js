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

function getMergeBatches(formId, moduleId, userId, schoolId, tableId) {
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
          if (v.status != "Inactive") {
            var action =
              '<td><div class="dropdown"><button class="btn btn-primary dropdown-toggle" style="background-color: #007fff !important;border-color: #007fff;" type="button" data-toggle="dropdown"></button><ul class="dropdown-menu"><li>';
            //var li1='<a href="javascript:void(0);" class="dropdown-item" onclick="return callProceedMergeBatch(\''+formId+'\','+v.id+',\'Separate\');"><i class="fa fa-cogs"></i>&nbsp;&nbsp;Separate Batch</a>';
            var li2 =
              '<a href="javascript:void(0);" class="dropdown-item" onclick="return callProceedMergeBatch(\'' +
              formId +
              "'," +
              moduleId +
              "," +
              userId +
              ",'Inactive', " +
              v.id +
              ');"><i class="fa fa-cogs"></i>&nbsp;&nbsp;Inactive Batch</a>';
            action = action + li2;
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
          "mergeBatches"
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
