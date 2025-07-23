function callDashboardPageStudent(pageNo, args) {}

function callStudentInneraction(actionType, arg0) {}

function checkBoxDisable() {
  if ($("#checkParentDetails").is(":checked")) {
    $("input[name=guardianEmail]").attr("disabled", true);
    $("input[name=guardianEmail]").val("");
    $("input[name=guardianEmail]").removeAttr("required");
  } else {
    $("input[name=guardianEmail]").removeAttr("disabled");
    $("input[name=guardianEmail]").attr("required", true);
  }
}

//function showEligibleCourseToChoose(providerId){
//	if(providerId==2){
//		$('#eligibleCourseToChooseModal').modal({backdrop: 'static', keyboard: false});
//	}else{
//		$('#eligibleCourseToChooseModal').modal('show');
//	}
//}

function showEligibleCourseToChoose() {
  $("#eligibleCourseToChooseModal").modal({
    backdrop: "static",
    keyboard: false,
  });
}
function cancelEligbileCourse() {
  $(".subjectToChooseId").each(function () {
    if ($(this).hasClass("greenDiv")) {
      $(this).removeClass("greenDiv");
    }
  });
  $("#eligibleCourseToChooseModal").modal("hide");
}

function saveEligibleCourse(
  elegibleToChoose,
  currentSizeLeftTable1,
  currentSizeLeftTable2
) {
  //	var totalSize=6;
  //	var currentSizeLeft = totalSize-elegibleToChoose;
  var selectedSubject = 0;
  $(".subjectToChooseId").each(function () {
    if ($(this).hasClass("greenDiv")) {
      selectedSubject++;
    }
  });
  if (selectedSubject != elegibleToChoose) {
    showMessage(
      true,
      "Please select at most " + elegibleToChoose + " course(s)."
    );
    return false;
  }
  $(".subjectToChooseId").each(function () {
    $("#semester1table #" + this.id).remove();
    $("#semester2table #" + this.id).remove();
  });
  //	var currentSizeLeftTable1 = currentSizeLeft;
  //	var currentSizeLeftTable2 = currentSizeLeft;
  $(".subjectToChooseId").each(function () {
    if ($(this).hasClass("greenDiv")) {
      var html =
        '<tr id="' +
        this.id +
        '" entityName="' +
        $(this).attr("entityName") +
        '"><td>' +
        ++currentSizeLeftTable1 +
        "</td><td>" +
        $(this).attr("nameAndCode") +
        "</td></tr>";
      $("#semester1table").append(html);
    } else {
      var html =
        '<tr id="' +
        this.id +
        '" entityName="' +
        $(this).attr("entityName") +
        '"><td>' +
        ++currentSizeLeftTable2 +
        "</td><td>" +
        $(this).attr("nameAndCode") +
        "</td></tr>";
      $("#semester2table").append(html);
    }
  });
  $("#eligibleCourseToChooseModal").modal("hide");
}

//function saveEligibleCourse2(elegibleToChoose,currentSizeLeftTable1,currentSizeLeftTable2, studentId, standardId, enrollmentType, providerId){
////	var totalSize=6;
////	var currentSizeLeft = totalSize-elegibleToChoose;
//	var selectedSubject=0;
//	$(".subjectToChooseId").each(function() {
//		if ($(this).hasClass("greenDiv")) {
//			selectedSubject++;
//		}
//	})
//	if(selectedSubject != elegibleToChoose){
//		showMessage(true, 'Please select at most '+elegibleToChoose+' course(s).')
//		return false;
//	}
//	$(".subjectToChooseId").each(function() {
//		$('#semester1table #'+this.id).remove();
//		$('#semester2table #'+this.id).remove();
//	})
////	var currentSizeLeftTable1 = currentSizeLeft;
////	var currentSizeLeftTable2 = currentSizeLeft;
//	$(".subjectToChooseId").each(function() {
//		if ($(this).hasClass("greenDiv")) {
//			var html = '<tr id="'+this.id+'" entityName="'+$(this).attr('entityName')+'"><td>'+(++currentSizeLeftTable1)+'</td><td>'+$(this).attr('nameAndCode')+'</td></tr>';
//			$('#semester1table').append(html);
//		}else{
//			var html = '<tr id="'+this.id+'" entityName="'+$(this).attr('entityName')+'"><td>'+(++currentSizeLeftTable2)+'</td><td>'+$(this).attr('nameAndCode')+'</td></tr>';
//			$('#semester2table').append(html);
//		}
//	});
//	$('#eligibleCourseToChooseModal').modal('hide');
//	saveCurrentSelectedSubjects(studentId, standardId, enrollmentType,providerId)
//}
function saveCurrentSelectedSubjects(studentId, standardId, enrollmentType) {
  if (
    $("#chooseDateToStartSemster").val().trim() == "" ||
    $("#chooseDateToStartSemster").val().trim() == undefined
  ) {
    showMessage(true, "Please select your academic year start date.");
    return false;
  }
  $("#selectStudentCourseProceed").attr("disabled", false);
  var selectedSemester1Subject = "";
  var selectedSemester1SubjectDate = "";
  var selectedSemester2Subject = "";
  var selectedSemester2SubjectDate = "";
  var selectedSemesterAPSubject = "";

  $("#semester1table tbody tr").each(function () {
    //		entityName = $(this).attr('entityName');
    //		if(entityName=='PLACEMENT-SUBJECT'){
    //			selectedSemesterAPSubject+=this.id+',';
    //		}else{
    //		}
    selectedSemester1Subject += this.id + ",";
    selectedSemester1SubjectDate += this.id + ",";
  });
  $("#semester2table tbody tr").each(function () {
    //		entityName = $(this).attr('entityName');
    //		if(entityName=='PLACEMENT-SUBJECT'){
    //			//selectedSemesterAPSubject+=this.id+',';
    //		}else{
    //		}
    selectedSemester2Subject += this.id + ",";
    selectedSemester2SubjectDate += this.id + ",";
  });
  selectedSemester1Subject = selectedSemester1Subject.substr(
    0,
    selectedSemester1Subject.length - 1
  );
  selectedSemester1SubjectDate = selectedSemester1SubjectDate.substr(
    0,
    selectedSemester1SubjectDate.length - 1
  );
  selectedSemester2Subject = selectedSemester2Subject.substr(
    0,
    selectedSemester2Subject.length - 1
  );
  selectedSemester2SubjectDate = selectedSemester2SubjectDate.substr(
    0,
    selectedSemester2SubjectDate.length - 1
  );
  selectedSemesterAPSubject = selectedSemesterAPSubject.substr(
    0,
    selectedSemesterAPSubject.length - 1
  );
  var length1 = selectedSemester1Subject.split(",").length;
  var length2 = selectedSemester2Subject.split(",").length;
  var length3 = 0;
  if (selectedSemesterAPSubject != "") {
    length3 = selectedSemesterAPSubject.split(",").length;
  }
  //REGISTRATION_FRESH, REGISTRATION_NEXT_GRADE
  //	TODO model course selection blank for flex signup

  //	if(enrollmentType=='REGISTRATION_FRESH' || enrollmentType=='REGISTRATION_NEXT_GRADE'){
  //		if(parseInt(length1+length3) == 6 && parseInt(length2+length3) == 6){
  //		}else {
  //			showMessage(true, 'Please select courses for this semester.')
  //			return false;
  //		}
  //	}
  $("#selectedSemester1Subject").val(selectedSemester1Subject);
  $("#selectedSemester1SubjectDate").val(selectedSemester1SubjectDate);
  $("#selectedSemester2Subject").val(selectedSemester2Subject);
  $("#selectedSemester2SubjectDate").val(selectedSemester2SubjectDate);
  $("#selectedSemesterAPSubject").val(selectedSemesterAPSubject);

  var payload =
    "studentId=" +
    studentId +
    "&standardId=" +
    standardId +
    "&semester1Subject=" +
    $("#selectedSemester1Subject").val().trim() +
    "&semester2Subject=" +
    $("#selectedSemester2Subject").val().trim() +
    "&semesterAPSubject=" +
    $("#selectedSemesterAPSubject").val().trim() +
    "&selectedSemester1SubjectDate=" +
    $("#selectedSemester1SubjectDate").val().trim() +
    "&selectedSemester2SubjectDate=" +
    $("#selectedSemester2SubjectDate").val().trim() +
    "&semesterStartDate=" +
    $("#chooseDateToStartSemster").val().trim();
  $.ajax({
    type: "POST",
    url: getURLForHTML("dashboard", "save-student-course-selection-content"),
    data: payload,
    dataType: "html",
    cache: false,
    timeout: 600000,
    success: function (htmlContent) {
      if (htmlContent != "") {
        var stringMessage = [];
        stringMessage = htmlContent.split("|");
        if (
          stringMessage[0] == "FAILED" ||
          stringMessage[0] == "EXCEPTION" ||
          stringMessage[0] == "SESSIONOUT"
        ) {
          if (stringMessage[0] == "SESSIONOUT") {
            redirectLoginPage();
          }
        }
        showMessage(true, stringMessage[1]);
        $("#selectStudentCourseProceed").attr("disabled", true);
        $("#studentCourseSelectionModel").modal("hide");
        if (USER_ROLE == "STUDENT") {
        } else {
          setTimeout(function () {
            hideMessage("");
            DEFAULT_SEARCH_STATE = true;
            setTimeout(function () {
              callDashboardPageSchool("8", "manage-user-list", "", "");
            }, 1000);
            //						callDashboardPageSchool('2b','studentTab','','&schoolId='+SCHOOL_ID);
          }, 3100);
        }
      }
    },
    error: function (e) {
      //showMessage(true, TECHNICAL_GLITCH);
    },
  });
}
//ADD PROVIDERID 01-06-2020 BY VIPIN
function callStudentCourseSelection(studentId, standardId, providerId) {
  console.log("student-course-selection-content-theme2");
  $.ajax({
    type: "POST",
    //contentType : "application/json",
    url: getURLForHTML("dashboard", "student-course-selection-content-theme2"),
    data:
      "studentId=" +
      studentId +
      "&standardId=" +
      standardId +
      "&providerId=" +
      providerId,
    dataType: "json",
    success: function (data) {
      if (data["status"] == "0" || data["status"] == "2") {
        showMessageTheme2(2, stringMessage[1], "", true);
      } else {
        $("#semester1table tbody").html("");
        $("#semester2table tbody").html("");
        if (data["scsDTO"]["semesterSubjects1"].length > 0) {
          var sno = 0;
          console.log(data["scsDTO"]["semesterSubjects1"]);
          $.each(data["scsDTO"]["semesterSubjects1"], function (k, subject) {
            sno++;
            semester1tableTr =
              '<tr id="' +
              subject.entityId +
              '" entityName="' +
              subject.entityName +
              '">' +
              "<td>" +
              sno +
              "</td>" +
              "<td>" +
              subject.subjectCode +
              " - " +
              subject.subjectName +
              "</td>" +
              "</tr>";
            //console.log(v.entityId)
            $("#semester1table tbody").append(semester1tableTr);
          });
        }

        if (data["scsDTO"]["semesterSubjects2"].length > 0) {
          var sno = 0;
          $.each(data["scsDTO"]["semesterSubjects2"], function (k, subject) {
            sno++;
            semester2tableTr =
              '<tr id="' +
              subject.entityId +
              '" entityName="' +
              subject.entityName +
              '">' +
              "<td>" +
              sno +
              "</td>" +
              "<td>" +
              subject.subjectCode +
              " - " +
              subject.subjectName +
              "</td>" +
              "</tr>";
            //console.log(v.entityId)
            $("#semester2table tbody").append(semester2tableTr);
          });
        }
        if (
          data["scsDTO"]["eligibileToChooseSubject"] ||
          data["scsDTO"]["eligibileToChooseSubject"] == "true"
        ) {
          $("#eligibileToChooseSubject").show();
          showEligibleCourseToChoose();
        }
        if (data["scsDTO"]["eligibileToCallToChooseSubject"]) {
          $("#studentCourseSelectionModel").modal({
            backdrop: "static",
            keyboard: false,
          });
        }
        $("#semesterSubjectsToChoose").html("");

        $.each(
          data["scsDTO"]["semesterSubjectsToChoose"],
          function (k, subject) {
            semesterSubjectsToChoose =
              "<div class=\"col-md-12 block subjectToChooseId select-course-list pt-2 pb-2 mb-1\" onclick=\"selectSubjectNew(this, true, 'subjectToChooseId', '" +
              data["scsDTO"]["chooseSubjectCount"] +
              "');\" " +
              'id="' +
              subject.entityId +
              '" nameAndCode="' +
              subject.subjectCode +
              " - " +
              subject.subjectName +
              '" entityName="' +
              subject.entityName +
              '">' +
              '<div class="center-elem justify-content-between ">' +
              '<p class="mb-0 font-weight-semi-bold full">' +
              subject.subjectCode +
              " - " +
              subject.subjectName +
              " &nbsp;</p>" +
              '<span class="check-icon">' +
              '<i class="fa fa-check"></i>' +
              "</span>" +
              "</div>" +
              "</div>";
            $("#semesterSubjectsToChoose").append(semesterSubjectsToChoose);
          }
        );
        $("#saveEligibleCourse").attr(
          "onclick",
          "saveEligibleCourse('" +
            data["scsDTO"]["chooseSubjectCount"] +
            "','" +
            data["scsDTO"]["semesterSubjects1"].length +
            "','" +
            data["scsDTO"]["semesterSubjects2"].length +
            "')"
        );
        $("#selectStudentCourseProceed").attr(
          "onclick",
          "saveCurrentSelectedSubjects('" +
            data["studentId"] +
            "','" +
            data["standardId"] +
            "', '" +
            data["enrollmentType"] +
            "')"
        );
        $("#chooseDateToStartSemster").val("");
        $("#chooseDateToStartSemster").removeAttr("disabled");
        $("#selectStudentCourseProceed").removeAttr("disabled");
        var startDate = new Date();
        startDate.setDate(startDate.getDate() + 1);
        $(".subjectSemesterStartDateCl").datepicker({
          startDate: startDate,
          format: "mm-dd-yyyy",
          autoclose: true,
          //todayHighlight : true,
        });
      }
    },
    error: function (e) {
      //showMessage(true, TECHNICAL_GLITCH);
    },
  });
}
function callSemesterStartDateEntry(studentId) {
  $.ajax({
    type: "POST",
    url: getURLForHTML(
      "dashboard",
      "student-semester-start-date-entry-content"
    ),
    data: "studentId=" + studentId,
    dataType: "html",
    cache: false,
    timeout: 600000,
    success: function (htmlContent) {
      if (htmlContent != "") {
        var stringMessage = [];
        stringMessage = htmlContent.split("|");
        if (
          stringMessage[0] == "FAILED" ||
          stringMessage[0] == "EXCEPTION" ||
          stringMessage[0] == "SESSIONOUT"
        ) {
          if (stringMessage[0] == "SESSIONOUT") {
            redirectLoginPage();
          } else {
            showMessage(true, stringMessage[1]);
          }
        } else {
          $("#studentSemesterStartDateEntryHTML").html(htmlContent);
        }
      }
    },
    error: function (e) {
      //showMessage(true, TECHNICAL_GLITCH);
    },
  });
}
function callSemesterStartDateEntry1(
  studentId,
  standardId,
  studentName,
  moduleId
) {
  $.ajax({
    type: "POST",
    url: getURLForHTML(
      "dashboard",
      "student-semester-start-date-entry-content1"
    ),
    data:
      "studentId=" +
      studentId +
      "&standardId=" +
      standardId +
      "&moduleId=" +
      moduleId,
    dataType: "html",
    cache: false,
    timeout: 600000,
    success: function (htmlContent) {
      if (htmlContent != "") {
        var stringMessage = [];
        stringMessage = htmlContent.split("|");
        if (
          stringMessage[0] == "FAILED" ||
          stringMessage[0] == "EXCEPTION" ||
          stringMessage[0] == "SESSIONOUT"
        ) {
          if (stringMessage[0] == "SESSIONOUT") {
            redirectLoginPage();
          } else {
            showMessage(true, stringMessage[1]);
          }
        } else {
          $("#studentSemesterStartDateEntryHTML1").html(htmlContent);
        }
      }
    },
    error: function (e) {
      //showMessage(true, TECHNICAL_GLITCH);
    },
  });
}
function callForSession(
  studentId,
  standardId,
  semesterType,
  sessionId,
  startDate,
  controllType
) {
  $.ajax({
    type: "POST",
    url: getURLForHTML("dashboard", "student-semester-content"),
    data:
      "studentId=" +
      studentId +
      "&standardId=" +
      standardId +
      "&semesterType=" +
      semesterType +
      "&sessionId=" +
      sessionId +
      "&startDate=" +
      startDate +
      "&controllType=" +
      controllType,
    dataType: "html",
    cache: false,
    timeout: 600000,
    success: function (htmlContent) {
      if (htmlContent != "") {
        var stringMessage = [];
        stringMessage = htmlContent.split("|");
        if (
          stringMessage[0] == "FAILED" ||
          stringMessage[0] == "EXCEPTION" ||
          stringMessage[0] == "SESSIONOUT"
        ) {
          if (stringMessage[0] == "SESSIONOUT") {
            redirectLoginPage();
          } else {
            showMessage(true, stringMessage[1]);
          }
        } else {
          $("#studentAddNewSemesterData").html(htmlContent);
          if (controllType == "VIEW") {
            $("#studentSessionForm .subjcheck").attr("disabled", true);
            $("#studentSessionForm .full .detail-input").attr("disabled", true);
            $("#sessionSave").hide();
            $("#sessionAddNew").hide();
          } else {
            $("#sessionSave").show();
          }
          $("#sessionAddNew").hide();
        }
      }
    },
    error: function (e) {
      //showMessage(true, TECHNICAL_GLITCH);
    },
  });
}

function callForLMSContent(userId, controllType, courseProId, lmsId) {
  $.ajax({
    type: "POST",
    url: getURLForHTML("dashboard", "student-lms-content"),
    data:
      "userId=" +
      userId +
      "&controllType=" +
      controllType +
      "&courseProId=" +
      courseProId +
      "&lmsId=" +
      lmsId,
    dataType: "html",
    cache: false,
    timeout: 600000,
    success: function (htmlContent) {
      if (htmlContent != "") {
        var stringMessage = [];
        stringMessage = htmlContent.split("|");
        if (
          stringMessage[0] == "FAILED" ||
          stringMessage[0] == "EXCEPTION" ||
          stringMessage[0] == "SESSIONOUT"
        ) {
          if (stringMessage[0] == "SESSIONOUT") {
            redirectLoginPage();
          } else {
            showMessage(true, stringMessage[1]);
          }
        } else {
          if (controllType == "ACTIVE" || controllType == "INACTIVE") {
            if (controllType == "ACTIVE") {
              $("#lmsuserInactive" + lmsId).show();
              $("#lmsuserActive" + lmsId).hide();
            } else if (controllType == "INACTIVE") {
              $("#lmsuserInactive" + lmsId).hide();
              $("#lmsuserActive" + lmsId).show();
            }
          } else {
            $("#studentViewEditLMSData").html(htmlContent);
            if (controllType == "VIEW") {
              $("#studentLmsContentForm .subjcheck").attr("disabled", true);
              $("#lmsContentSave").hide();
              $("#lmsContentAdd").hide();
              $("#lmsContentAddNewUser").show();
            } else if (controllType == "EDIT") {
              $("#lmsContentSave").show();
              $("#lmsContentAdd").hide();
              $("#lmsContentAddNewUser").show();
            } else {
              $("#lmsContentAddNewUser").hide();
              $("#lmsContentSave").hide();
              $("#lmsContentAdd").show();
            }
          }
        }
      }
    },
  });
}
function callForBuzzSession(
  studentStandardId,
  studentId,
  standardId,
  controllType,
  moduleId
) {
  $.ajax({
    type: "POST",
    url: getURLForHTML("dashboard", "student-semester-buzz-content"),
    data:
      "studentStandardId=" +
      studentStandardId +
      "&studentId=" +
      studentId +
      "&standardId=" +
      standardId +
      "&moduleId=" +
      moduleId +
      "&controllType=" +
      controllType,
    dataType: "html",
    cache: false,
    timeout: 600000,
    success: function (htmlContent) {
      if (htmlContent != "") {
        var stringMessage = [];
        stringMessage = htmlContent.split("|");
        if (
          stringMessage[0] == "FAILED" ||
          stringMessage[0] == "EXCEPTION" ||
          stringMessage[0] == "SESSIONOUT"
        ) {
          if (stringMessage[0] == "SESSIONOUT") {
            redirectLoginPage();
          } else {
            showMessage(true, stringMessage[1]);
          }
        } else {
          $("#studentSemesterStartDateEntryHTML1").html(htmlContent);
          $("#sessionSave").show();
          //        			if(controllType=='VIEW'){
          //        				$('#studentSessionForm .subjcheck').attr('disabled', true);
          //        				$('#studentSessionForm .full .detail-input').attr('disabled', true);
          //        				$("#sessionSave").hide();
          //        			}else{
          //        				$("#sessionSave").show();
          //        			}
          //        			$("#sessionAddNew").hide();
        }
      }
    },
    error: function (e) {
      //showMessage(true, TECHNICAL_GLITCH);
    },
  });
}

//function saveSemesterStartDateEntry(studentId){
//	if($('#semesterStartDateA').val().trim()=='' || $('#semesterEndDateA').val().trim()==''){
//		showMessage(true, 'Please choose semester A start and end date');
//		return false;
//	}
//	if($('#semesterAStatus').val().trim()==''){
//		showMessage(true, 'Please choose semester A status');
//		return false;
//	}
//	if($('#semesterStartDateB').val().trim()=='' && $('#semesterEndDateB').val().trim()==''){
//
//	}else{
//		if($('#semesterStartDateB').val().trim()!='' && $('#semesterEndDateB').val().trim()==''){
//			showMessage(true, 'Please choose semester B start and end date');
//			return false;
//		}
//		if($('#semesterStartDateB').val().trim()=='' && $('#semesterEndDateB').val().trim!=''){
//			showMessage(true, 'Please choose semester B start and end date');
//			return false;
//		}
//		if($('#semesterBStatus').val().trim()==''){
//			showMessage(true, 'Please choose semester B status');
//			return false;
//		}
//	}
//
//	if($('#weeklyReportFrequency').val().trim()==''){
//		showMessage(true, 'Please select week day');
//		return false;
//	}
//	var payLoad="studentId="+studentId
//				+"&semesterAStartDate="+$('#semesterStartDateA').val().trim()
//				+"&semesterAEndDate="+$('#semesterEndDateA').val().trim()
//				+"&semesterAStatus="+$('#semesterAStatus').val().trim()
//				+"&semesterBStartDate="+$('#semesterStartDateB').val().trim()
//				+"&semesterBEndDate="+$('#semesterEndDateB').val().trim()
//				+"&semesterBStatus="+$('#semesterBStatus').val().trim()
//				+"&weeklyReportFrequency="+$('#weeklyReportFrequency').val().trim();
//	$.ajax({
//		type : "POST",
//		url : getURLForHTML('dashboard','save-student-semester-start-date-entry'),
//		data : payLoad,
//		dataType : 'html',
//		cache : false,
//		timeout : 600000,
//		success : function(htmlContent) {
//			if(htmlContent!=""){
//            	var stringMessage = [];
//            	stringMessage = htmlContent.split("|");
//        		if(stringMessage[0] == "FAILED" || stringMessage[0] == "EXCEPTION" || stringMessage[0] == "SESSIONOUT"){
//        			if(stringMessage[0] == "SESSIONOUT"){
//        				redirectLoginPage();
//        			}else{
//        				showMessage(true, stringMessage[1]);
//        			}
//        		} else {
//        			$('#studentSemesterStartDateEntryModel').modal('hide');
//        			showMessage(true, stringMessage[1]);
//        			setTimeout(function(){
//						hideMessage('');
//						DEFAULT_SEARCH_STATE=true;
//						callDashboardPageSchool('2b','studentTab','','&schoolId='+SCHOOL_ID);
//					}, 3100);
//        		}
//			}
//		},
//		error : function(e) {
//			//showMessage(true, TECHNICAL_GLITCH);
//		}
//	});
//}

function validateRequestForsaveSemesterStartDateEntry1(formId) {
  if (
    $("#" + formId + " #sessionName")
      .val()
      .trim() == "" ||
    $("#" + formId + " #sessionName")
      .val()
      .trim() == null
  ) {
    showModalMessage(true, "Session Name is required");
    return false;
  }

  if (
    $("#" + formId + " #semesterDateStart")
      .val()
      .trim() == null ||
    $("#" + formId + " #semesterDateStart")
      .val()
      .trim() == ""
  ) {
    showModalMessage(true, "Semester Start Date is required");
    return false;
  }
  if (
    $("#" + formId + " #semesterDateEnd")
      .val()
      .trim() == null ||
    $("#" + formId + " #semesterDateEnd")
      .val()
      .trim() == ""
  ) {
    showModalMessage(true, "Semester End Date is required");
    return false;
  }
  if (
    $("#" + formId + " #weeklyReportFrequency")
      .val()
      .trim() == null ||
    $("#" + formId + " #weeklyReportFrequency")
      .val()
      .trim() == ""
  ) {
    showModalMessage(true, "Please select week day");
    return false;
  }
  if (
    $("#" + formId + " #semesterStatus")
      .val()
      .trim() == null ||
    $("#" + formId + " #semesterStatus")
      .val()
      .trim() == ""
  ) {
    showModalMessage(true, "Please choose semester  status");
    return false;
  }

  return true;
}
function saveSemesterStartDateEntry1(formId, studentId) {
  if (!validateRequestForsaveSemesterStartDateEntry1(formId)) {
    return false;
  }
  hideMessage("");
  $.ajax({
    type: "POST",
    contentType: "application/json",
    url: getURLForHTML("dashboard", "save-student-semester-start-date-entry1"),
    data: JSON.stringify(
      getRequestForSaveSemesterStartDateEntry1(formId, studentId)
    ),
    dataType: "json",
    cache: false,
    timeout: 600000,
    success: function (data) {
      if (data["status"] == "0" || data["status"] == "2") {
        showModalMessage(true, data["message"]);
      } else {
        showModalMessage(true, data["message"]);
        setTimeout(function () {
          $("#studentSemesterStartDateEntryModel").modal("hide");
        }, 1000);

        $("#sessionAddNew").show();
        $("#sessionSave").hide();
        //				callSemesterStartDateEntry(studentId);
        /*$('#studentSemesterStartDateEntryModel').modal('hide');
				setTimeout(function(){ callDashboardPageSchool('2b','studentTab','','&schoolId='+SCHOOL_ID); }, 1000);*/
      }
      return false;
    },
    error: function (e) {
      console.log("ERROR : ", e);
    },
  });
}
function getRequestForSaveSemesterStartDateEntry1(formId, studentId) {
  var request = {};
  var authentication = {};
  var requestData = {};

  var studentSesssionDTO = {};
  studentSesssionDTO["studentId"] = studentId;
  studentSesssionDTO["sesssionId"] = $("#" + formId + " #sesssionId")
    .val()
    .trim();
  studentSesssionDTO["sessionName"] = $("#" + formId + " #sessionName")
    .val()
    .trim();
  studentSesssionDTO["semesterDateStart"] = $(
    "#" + formId + " #semesterDateStart"
  )
    .val()
    .trim();
  studentSesssionDTO["semesterDateEnd"] = $("#" + formId + " #semesterDateEnd")
    .val()
    .trim();
  studentSesssionDTO["frequencyDayId"] = $(
    "#" + formId + " #weeklyReportFrequency"
  )
    .val()
    .trim();
  studentSesssionDTO["standardId"] = $("#" + formId + " #standardId")
    .val()
    .trim();
  studentSesssionDTO["semesterType"] = $("#" + formId + " #semesterType")
    .val()
    .trim();
  var subjectList = [];
  var unSubjectList = [];
  $.each($("input[name='subjcheck']"), function () {
    if (this.checked) {
      subjectList.push($(this).val().trim());
    } else {
      unSubjectList.push($(this).val().trim());
    }
  });

  studentSesssionDTO["selectedSubjects"] = subjectList.join();
  studentSesssionDTO["withdrownSubjects"] = unSubjectList.join();
  //	studentSesssionDTO['selectedAPSubjects'] =subjectList.join();
  //	studentSesssionDTO['withdrownAPSubjects'] = unSubjectList.join();
  studentSesssionDTO["semesterStatus"] = $("#" + formId + " #semesterStatus")
    .val()
    .trim();

  requestData["studentSesssionDTO"] = studentSesssionDTO;
  authentication["hash"] = getHash();
  authentication["schoolId"] = SCHOOL_ID;
  authentication["schoolUUID"] = SCHOOL_UUID;
  authentication["userType"] = "STUDENT";
  request["authentication"] = authentication;
  request["requestData"] = requestData;
  return request;
}

function validateRequestForSaveUserEditedLmsContent(formId, controllType) {
  if (
    $("#" + formId + " #lmsPlatform")
      .val()
      .trim() == undefined ||
    $("#" + formId + " #lmsPlatform")
      .val()
      .trim() == "0"
  ) {
    showModalMessage(true, "LMS Platform is required");
    return false;
  }
  if (
    $("#" + formId + " #fName")
      .val()
      .trim() == "" ||
    $("#" + formId + " #fName")
      .val()
      .trim() == null
  ) {
    showModalMessage(true, "First Name is required");
    return false;
  }

  if (
    $("#" + formId + " #lName")
      .val()
      .trim() == null ||
    $("#" + formId + " #lName")
      .val()
      .trim() == ""
  ) {
    showModalMessage(true, "Last Name is required");
    return false;
  }
  if (
    $("#" + formId + " #userEmail")
      .val()
      .trim() == null ||
    $("#" + formId + " #userEmail")
      .val()
      .trim() == ""
  ) {
    showModalMessage(true, "Email is required");
    return false;
  }
  //	if ($("#"+formId+" #reference").val().trim()==null || $("#"+formId+" #reference").val().trim()=='') {
  //		showModalMessage(true, 'External Id is required');
  //		return false;
  //	}
  //	if ($("#"+formId+" #userData").val().trim()==null || $("#"+formId+" #userData").val().trim()=='') {
  //		showModalMessage(true, 'Description is required');
  //		return false;
  //	}
  if (controllType == "ADD") {
    if (
      $("#" + formId + " #lmsPlatform")
        .val()
        .trim() == "0"
    ) {
      showModalMessage(true, "LMS Platform is required");
      return false;
    }
    //		if ($("#"+formId+" #lmsUserId").val().trim()==null || $("#"+formId+" #lmsUserId").val().trim()=='') {
    //			showModalMessage(true, 'LMS User Id is required');
    //			return false;
    //		}
    if (
      $("#" + formId + " #password")
        .val()
        .trim() == null ||
      $("#" + formId + " #password")
        .val()
        .trim() == ""
    ) {
      showModalMessage(true, "Password is required");
      return false;
    }
    if (
      $("#" + formId + " #confirmPassword")
        .val()
        .trim() == null ||
      $("#" + formId + " #confirmPassword")
        .val()
        .trim() == ""
    ) {
      showModalMessage(true, "Confirm Password is required");
      return false;
    }
    if (
      $("#" + formId + " #password")
        .val()
        .trim() !=
      $("#" + formId + " #confirmPassword")
        .val()
        .trim()
    ) {
      showModalMessage(true, "Password and confirm password does not match.");
      return false;
    }
  }
  return true;
}
function saveUserEditedLmsContent(formId, controllType) {
  if (!validateRequestForSaveUserEditedLmsContent(formId, controllType)) {
    return false;
  }
  hideMessage("");
  $.ajax({
    type: "POST",
    contentType: "application/json",
    url: getURLForHTML("dashboard", "save-user-edited-lms-content"),
    data: JSON.stringify(
      getRequestForSaveUserEditedLmsContent(formId, controllType)
    ),
    dataType: "json",
    cache: false,
    timeout: 600000,
    success: function (data) {
      if (data["status"] == "0" || data["status"] == "2") {
        showModalMessage(true, data["message"]);
      } else {
        showModalMessage(true, data["message"]);
        //				setTimeout(function(){ $('#studentViewLmsEntryModel').modal('hide'); }, 1000);
        $("#lmsContentSave").hide();
        //				callSemesterStartDateEntry(studentId);
        /*$('#studentSemesterStartDateEntryModel').modal('hide');
				setTimeout(function(){ callDashboardPageSchool('2b','studentTab','','&schoolId='+SCHOOL_ID); }, 1000);*/
      }
      return false;
    },
    error: function (e) {
      console.log("ERROR : ", e);
    },
  });
}
function getRequestForSaveUserEditedLmsContent(formId, controllType) {
  var request = {};
  var authentication = {};
  var requestData = {};
  var LMSUserInfoDTO = {};
  LMSUserInfoDTO["controllType"] = controllType;
  LMSUserInfoDTO["userId"] = $("#" + formId + " #userId")
    .val()
    .trim();
  LMSUserInfoDTO["entityRole"] = $("#" + formId + " #entityRole")
    .val()
    .trim();
  LMSUserInfoDTO["firstName"] = $("#" + formId + " #fName")
    .val()
    .trim();
  LMSUserInfoDTO["lastName"] = $("#" + formId + " #lName")
    .val()
    .trim();
  LMSUserInfoDTO["reference"] = $("#" + formId + " #reference")
    .val()
    .trim();
  if (
    $("#" + formId + " #lmsPlatform")
      .val()
      .trim() == "Odysseyware"
  ) {
    LMSUserInfoDTO["courseProviderId"] = 2;
  } else if (
    $("#" + formId + " #lmsPlatform")
      .val()
      .trim() == "Agilix Buzz"
  ) {
    LMSUserInfoDTO["courseProviderId"] = 1;
  } else if (
    $("#" + formId + " #lmsPlatform")
      .val()
      .trim() == "Buzz"
  ) {
    LMSUserInfoDTO["courseProviderId"] = 31;
  } else if ($("#" + formId + " #lmsPlatform").val() == "FLVS") {
    LMSUserInfoDTO["courseProviderId"] = 36;
  } else {
    LMSUserInfoDTO["courseProviderId"] = 37;
  }
  LMSUserInfoDTO["lmsRegNumber"] = $("#" + formId + " #lmsUserId")
    .val()
    .trim();
  if ($("#" + formId + " #password").length > 0) {
    LMSUserInfoDTO["password"] = $("#" + formId + " #password")
      .val()
      .trim();
  }
  if ($("#" + formId + " #confirmPassword").length > 0) {
    LMSUserInfoDTO["confirmPassword"] = $("#" + formId + " #confirmPassword")
      .val()
      .trim();
  }
  LMSUserInfoDTO["lmsId"] = $("#" + formId + " #lmsId")
    .val()
    .trim();
  LMSUserInfoDTO["userData"] = $("#" + formId + " #userData")
    .val()
    .trim();
  LMSUserInfoDTO["email"] = $("#" + formId + " #userEmail")
    .val()
    .trim();
  LMSUserInfoDTO["lmsUserName"] = $("#" + formId + " #lmsUserName")
    .val()
    .trim();
  requestData["lmsUserInfoDTO"] = LMSUserInfoDTO;
  authentication["hash"] = getHash();
  authentication["schoolId"] = SCHOOL_ID;
  authentication["schoolUUID"] = SCHOOL_UUID;
  authentication["userType"] = "STUDENT";
  request["authentication"] = authentication;
  request["requestData"] = requestData;
  return request;
}

function studentStatusUpdate(userId, status, rolemoduleId) {
  $.ajax({
    type: "POST",
    url: getURLForHTML(
      "dashboard",
      "student-withdrown-join?userId=" + userId + "&status=" + status
    ),
    dataType: "html",
    cache: false,
    timeout: 600000,
    async: false,
    success: function (htmlContent) {
      if (htmlContent != "") {
        var stringMessage = [];
        stringMessage = htmlContent.split("|");
        if (
          stringMessage[0] == "FAILED" ||
          stringMessage[0] == "EXCEPTION" ||
          stringMessage[0] == "SESSIONOUT"
        ) {
          if (stringMessage[0] == "SESSIONOUT") {
            redirectLoginPage();
          } else {
            showMessage(true, stringMessage[1]);
          }
        } else if (stringMessage[0] == "SUCCESS") {
          setTimeout(function () {
            callDashboardPageSchool(
              rolemoduleId,
              "manage-user-list",
              "",
              "&schoolId=" + SCHOOL_ID
            );
          }, 1000);
          showMessage(true, stringMessage[1]);
        }
        return false;
      }
    },
  });
}

function validateRequestForsaveBuzzSemester(formId) {
  hideModalMessage();
  var status = true;
  var mesg = "";
  if (
    $("#" + formId + " #semesterDateStart")
      .val()
      .trim() == null ||
    $("#" + formId + " #semesterDateStart")
      .val()
      .trim() == ""
  ) {
    mesg = "Academic Start Date is required";
    status = false;
  } else if (
    $("#" + formId + " #semesterDateYear")
      .val()
      .trim() == null ||
    $("#" + formId + " #semesterDateYear")
      .val()
      .trim() == ""
  ) {
    mesg = "Academic Year is required";
    status = false;
  } else if (
    $("#" + formId + " #weeklyReportFrequency")
      .val()
      .trim() == null ||
    $("#" + formId + " #weeklyReportFrequency")
      .val()
      .trim() == ""
  ) {
    mesg = "Please select week day";
    status = false;
  } else {
    $("#studentEnrollSemester > tbody  > tr").each(function () {
      var sessionSubjectDTO = {};
      var sessionSubjectId = $(this).attr("id");
      var sessionId = $(this)
        .find(".sessionName option:selected")
        .attr("data-sessionId"); //$(this).find(".sessionId").val();
      var sessionName = $(this).find(".sessionName").val();
      var subjectId = $(this).find(".subjectId").val();
      var lmsSubjectId = $(this).find(".lmsSubjectId").val();
      var lmsSubjectStart = $(this).find(".lmsSubjectStart").val();
      var lmsSubjectEnd = $(this).find(".lmsSubjectEnd").val();
      var sessionActive = 1; //$(this).find(".sessionActive").val();
      var subjectStatus = $(this).find(".subjectStatus").val();
      if (subjectStatus == "MOVE") {
        subjectStatus = "A";
        var lmsSubjectIdMove = $(this).find(".lmsSubjectIdMove").val();
        if (lmsSubjectId != lmsSubjectIdMove) {
          lmsSubjectId = lmsSubjectIdMove;
        }
      }
      var subjectStatusDate = $(this).find(".subjectStatusDate").val();
      var lmsSubjectReference = $(this).find(".lmsSubjectReference").val();

      if (subjectId == null || subjectId == "") {
        mesg = "Subject Name is required";
        status = false;
        return false;
      }else if($(this).find(".parentSubject").val()=='PARENT'){
			mesg='Can not assign master subject. Please choose copy subject.';
			status= false;
			return false;
      }
    });
  }

  if (!status) {
    showModalMessage(true, mesg);
    $('#studentBuzzSemesterModel').animate({scrollTop: "0px"}, 'slow');
    return status;
  } else {
    return status;
  }

  //	return status;
}
function saveBuzzSemester(
  formId,
  studentStandardId,
  studentId,
  standardId,
  moduleId
) {
  hideModalMessage();
  if (!validateRequestForsaveBuzzSemester(formId)) {
    return false;
  }
  $.ajax({
    type: "POST",
    contentType: "application/json",
    url: getURLForHTML("dashboard", "save-student-buzz-semester"),
    data: JSON.stringify(
      getRequestForSaveBuzzSemester(formId, studentStandardId, studentId)
    ),
    dataType: "json",
    cache: false,
    timeout: 600000,
    success: function (data) {
      if (data["status"] == "0" || data["status"] == "2") {
        showModalMessage(true, data["message"]);
      } else {
        showModalMessage(true, data["message"]);
        setTimeout(function () {
          $("#studentBuzzSemesterModel").modal("hide");
        }, 800);
        setTimeout(function () {
          callForBuzzSession(
            studentStandardId,
            studentId,
            standardId,
            "EDIT",
            moduleId
          );
        }, 800);
      }
      return false;
    },
    error: function (e) {
      console.log("ERROR : ", e);
    },
  });
}
function getRequestForSaveBuzzSemester(formId, studentStandardId, studentId) {
  var request = {};
  var authentication = {};
  var requestData = {};
  var studentSesssionList = [];
  var studentSesssionDTO = {};
  var sessionSubject = [];
  var subjectList = [];
  var unSubjectList = [];

  studentSesssionDTO["studentId"] = studentId;
  studentSesssionDTO["studentUserId"] = $(
    "#" + formId + " studentUserId"
  ).val();
  studentSesssionDTO["studentStandardId"] = $(
    "#" + formId + " #studentStandardId"
  )
    .val()
    .trim();
  studentSesssionDTO["standardId"] = $("#" + formId + " #standardId")
    .val()
    .trim();
  studentSesssionDTO["semesterDateStart"] = $(
    "#" + formId + " #semesterDateStart"
  )
    .val()
    .trim();
  studentSesssionDTO["frequencyDayId"] = $(
    "#" + formId + " #weeklyReportFrequency"
  )
    .val()
    .trim();
  studentSesssionDTO["standardId"] = $("#" + formId + " #standardId")
    .val()
    .trim();
  studentSesssionDTO["userId"] = $("#" + formId + " #userId")
    .val()
    .trim();

  $("#studentEnrollSemester > tbody  > tr").each(function () {
    var sessionSubjectDTO = {};
    var sessionSubjectId = $(this).attr("id");
    var sessionId = $(this)
      .find(".sessionName option:selected")
      .attr("data-sessionId"); //$(this).find(".sessionId").val().trim();
    var sessionName = $(this).find(".sessionName").val().trim();
    var subjectId = $(this).find(".subjectId").val().trim();
    var lmsSubjectId = $(this).find(".lmsSubjectId").val().trim();
    var lmsSubjectStart = $(this).find(".lmsSubjectStart").val().trim();
    var lmsSubjectEnd = $(this).find(".lmsSubjectEnd").val().trim();
    var sessionActive = 1; //$(this).find(".sessionActive").val().trim();
    var subjectStatus = $(this).find(".subjectStatus").val().trim();
    if (subjectStatus == "MOVE") {
      subjectStatus = "A";
      var lmsSubjectIdMove = $(this).find(".lmsSubjectIdMove").val().trim();
      if (lmsSubjectId != lmsSubjectIdMove) {
        lmsSubjectId = lmsSubjectIdMove;
      }
    }
    var subjectStatusDate = $(this).find(".subjectStatusDate").val().trim();
    var lmsSubjectReference = $(this).find(".lmsSubjectReference").val().trim();

    sessionSubjectDTO["sessionSubjectId"] = sessionSubjectId;
    sessionSubjectDTO["sessionId"] = sessionId;

    sessionSubjectDTO["sessionName"] = sessionName;
    sessionSubjectDTO["subjectId"] = subjectId;
    sessionSubjectDTO["lmsSubjectId"] = lmsSubjectId;
    sessionSubjectDTO["startDate"] = lmsSubjectStart;
    sessionSubjectDTO["endDate"] = lmsSubjectEnd;
    sessionSubjectDTO["sessionActive"] = sessionActive;
    sessionSubjectDTO["subjectStatus"] = subjectStatus;
    sessionSubjectDTO["statusDate"] = subjectStatusDate;
    sessionSubjectDTO["lmsSubjectReference"] = lmsSubjectReference;
    sessionSubject.push(sessionSubjectDTO);
    if (subjectStatus == "A" || subjectStatus == "C") {
      subjectList.push(subjectId);
    } else {
      unSubjectList.push(subjectId);
    }
  });
  studentSesssionDTO["sessionSubjectDTO"] = sessionSubject;
  studentSesssionDTO["selectedSubjects"] = subjectList.join();
  studentSesssionDTO["withdrownSubjects"] = unSubjectList.join();
  studentSesssionDTO["semesterStatus"] = $(
    "#" + formId + " #semesterStatus"
  ).val();

  requestData["studentSesssionDTO"] = studentSesssionDTO;
  authentication["hash"] = getHash();
  authentication["schoolId"] = SCHOOL_ID;
  authentication["schoolUUID"] = SCHOOL_UUID;
  authentication["userType"] = "STUDENT";
  request["authentication"] = authentication;
  request["requestData"] = requestData;
  //console.log(JSON.stringify(request));

  return request;
}

function callLmsSubjectBySubject(
  formId,
  subjectId,
  toElementId,
  toElementIdAlternate
) {
  hideMessage("");
  if (subjectId == null || subjectId == "") {
    showModalMessage(true, "Subject Name is required");
    return false;
  }
  $.ajax({
    type: "POST",
    contentType: "application/json",
    url: getURLForCommon("masters"),
    data: JSON.stringify(
      getRequestForMaster(formId, "LMS-SUBJECT-LIST", subjectId)
    ),
    dataType: "json",
    async: false,
    success: function (data) {
      if (data["status"] == "0" || data["status"] == "2") {
        showMessage(true, data["message"]);
      } else {
        buildDropdown(
          data["mastersData"]["subject"],
          $("#" + formId + " #" + toElementId),
          "Select Subject"
        );
        $("#" + formId + " #" + toElementId).val(''),

        buildDropdown(
          data["mastersData"]["subject"],
          $("#" + formId + " #" + toElementIdAlternate),
          "Select Subject"
        );
      }
    },
  });
}

function changeEnrollmentStatus(rowPosition) {
  var subjectStatus = $("#subjectStatus" + rowPosition)
    .val()
    .trim();
  if (subjectStatus == "MOVE") {
    $("#lmsSubjectIdMove" + rowPosition).prop("disabled", false);
  } else {
    $("#lmsSubjectIdMove" + rowPosition).prop("disabled", true);
  }
}
function chooseEnrollmentSubject(rowPosition) {
  $("#lmsSubjectIdMove" + rowPosition).val($("#lmsSubjectId" + rowPosition).val().trim());
  var id = $("#lmsSubjectId" + rowPosition).val();
  if (id != 0) {
    $.ajax({
      type: "GET",
      url: getURLForHTML("dashboard", "get-subject-parent-id"),
      data: "id=" + id,
      dataType: "html",
      success: function (data) {
        var stringMessage = [];
        stringMessage = data.split("|");
        if (
          stringMessage[0] == "EXCEPTION" ||
          stringMessage[0] == "SESSIONOUT"
        ) {
          if (stringMessage[0] == "SESSIONOUT") {
            showMessage(true, stringMessage[1]);
            redirectLoginPage();
          } else {
            showMessage(true, stringMessage[1]);
          }
        } else {
          if (stringMessage[0] == "SUCCESS") {
            $("#lmsSubjectParentId" + rowPosition).val("NOT PARENT");
          } else {
            showMessage(
              true,
              "You can not assign a master copy. Please choose a copy course"
            );
            $("#lmsSubjectParentId" + rowPosition).val("PARENT");
          }
        }
      },
      error: function (e) {
        //showMessage(true, e.responseText);
        return false;
      },
    });
  }
}
function studentStatusUpdateReserveSeat(userId, status, roleModuleId) {
  $.ajax({
    type: "POST",
    url: getURLForHTML(
      "dashboard",
      "user-reserve-seat?userId=" + userId + "&status=" + status
    ),
    dataType: "html",
    cache: false,
    timeout: 600000,
    async: false,
    success: function (htmlContent) {
      if (htmlContent != "") {
        var stringMessage = [];
        stringMessage = htmlContent.split("|");
        if (
          stringMessage[0] == "FAILED" ||
          stringMessage[0] == "EXCEPTION" ||
          stringMessage[0] == "SESSIONOUT"
        ) {
          if (stringMessage[0] == "SESSIONOUT") {
            redirectLoginPage();
          } else {
            showMessage(true, stringMessage[1]);
          }
        } else if (stringMessage[0] == "SUCCESS") {
          showMessage(true, stringMessage[1]);
          setTimeout(function () {
            callDashboardPageSchool("8", "manage-user-list");
          }, 1000);
        }
        return false;
      }
    },
  });
}

function showPaymentEditPopup(id) {
  console.log(id);
  $.ajax({
    type: "GET",
    url: getURLForHTML("dashboard", "get-user-payment"),
    data: "id=" + id,
    dataType: "html",
    cache: false,
    timeout: 600000,
    success: function (htmlContent) {
      if (htmlContent != "") {
        $("#showEditPopupContainer").html(htmlContent);
        $("#editPaymentModal").modal({
          backdrop: "static",
          keyboard: false,
        });
      }
      $("#paymentDate2").datepicker({
        autoclose: true,
        endDate: new Date(),
        format: "mm-dd-yyyy",
        //startDate: startDate,
      });
      $("#scheduleDate2").datepicker({
        startDate: new Date(),
        autoclose: true,
        format: "mm-dd-yyyy",
        //startDate: startDate,
      });
    },
    error: function (e) {
      //showMessage(true, TECHNICAL_GLITCH);
      return false;
    },
  });
}

function sendmail(id) {
  $.ajax({
      type: "POST",
      contentType: "application/json",
      url: getURLForHTML('dashboard', 'sendmail-for-advance-payment-for-second-time?userPaymentDetailsId='+id),
      dataType: 'json',
      async: false,
      success: function (responce) {
          if (responce['status'] == '0' || responce['status'] == '2' || responce['status'] == '3') {
              if (data['status'] == '3') {
                  redirectLoginPage();
              } else {
                  if (tt == 'theme1') {
                      showMessage(false, responce['message']);
                  } else {
                      showMessage(0, responce['message'], '', true);
                  }
              }
          } else {
              showMessage(1, responce['message'], '', true);
          }
      }
  });
}

function editStudentPayment(formId, moduleId) {
  var paymentTitle = $("#" + formId + " #paymentType2").val();
  var paymentName=$("#"+formId+" #paymentName2").val();
  var userRefNumber = $("#" + formId + " #userRefNumber2").val();
  var payableAmount = $("#" + formId + " #payableAmount2").val();
  var currency1 = $("#" + formId + " #currency2").val();
  var paymentDate = $("#" + formId + " #paymentDate2").val();
  var scheduleDate = $("#" + formId + " #scheduleDate2").val();
  var status = $("#" + formId + " #status2").val();
  var transactionNumber = $("#" + formId + " #transactionNumber2").val();

  if (paymentTitle == "" || paymentTitle == undefined) {
    showMessage(true, "Payment Title is mandatory.");
    return false;
  }
  if(paymentTitle=='SUBJECT_FEE_ADV' || paymentTitle=='SUBJECT_FEE'){
		if(paymentName == undefined || paymentName ==""){
			showMessage(true,"Installment number is mandatory.");
			return false;
		}
	}
  if (userRefNumber == "" || userRefNumber == undefined) {
    showMessage(true, "Enter User Reference Number");
    return false;
  }
  if (payableAmount == 0) {
    showMessage(true, "Pay Amount can not be zero.");
    return false;
  }
  if (currency1 == "0" || currency1 == "" || currency1 == undefined) {
    showMessage(
      true,
      "Choose the currency in which the payment is being done."
    );
    return false;
  }
  if (status == "SUCCESS") {
    if (paymentDate == "" || paymentDate == undefined) {
      showMessage(true, "Payment Date is a mandatory field.");
      return false;
    }
  }
  if (status == "SCHEDULED")
    if (scheduleDate == "" || scheduleDate == undefined) {
      showMessage(true, "Please Enter the scheduled payment date.");
      return false;
    }
  if (status == "INITIATED")
    if (paymentDate == "" || paymentDate == undefined) {
      showMessage(true, "Please Enter the payment date.");
      return false;
    }
  if (status == "0" || status == "" || status == undefined) {
    showMessage(true, "Please select the Payment Status.");
    return false;
  }
  if (
    (transactionNumber == "" || transactionNumber == undefined) &&
    status != "SCHEDULED"
  ) {
    showMessage(true, "Please enter the transaction number.");
    return false;
  }
  $.ajax({
    type: "POST",
    contentType: "application/json",
    url: getURLForHTML("dashboard", "edit-payment"),
    data: JSON.stringify(getRequestDataForEditPaymentDetails(formId, moduleId)),

    dataType: "html",
    async: false,
    success: function (htmlContent) {
      if (htmlContent != "") {
        var stringMessage = [];
        stringMessage = htmlContent.split("|");
        if (
          stringMessage[0] == "FAILED" ||
          stringMessage[0] == "EXCEPTION" ||
          stringMessage[0] == "SESSIONOUT"
        ) {
          if (stringMessage[0] == "SESSIONOUT") {
            redirectLoginPage();
          } else {
            showMessage(true, stringMessage[1]);
          }
        } else {
          showMessage(true, stringMessage[1]);
          $("#editPaymentModal").modal("hide");
        }
        return false;
      }
    },
  });
}

function getRequestDataForEditPaymentDetails(formId, moduleId) {
  var request = {};
  var authentication = {};
  var addPaymentDTO = {};
  var requestData = {};
  addPaymentDTO["userId"] = $("#" + formId + " #userIdSearch").val().trim();
  addPaymentDTO["paymentTitle"] = $("#" + formId + " #paymentType2").select2("val");
  addPaymentDTO['paymentName'] = $("#"+formId+" #paymentName2").select2('val');
  addPaymentDTO["referenceNumber"] = $("#" + formId + " #userRefNumber2").val().trim();
  addPaymentDTO["payableAmount"] = $("#" + formId + " #payableAmount2").val().trim();
  addPaymentDTO["registrationAmount"] = $("#" + formId + " #registrationAmount2").val().trim();
  addPaymentDTO["additionalAmount"] = $("#" + formId + " #additionalAmount2").val().trim();
  addPaymentDTO["currency"] = $("#" + formId + " #currency2").select2("val");
  addPaymentDTO["paymentGateway"] = $("#" + formId + " #paymentGateway2").select2("val");
  addPaymentDTO["status"] = $("#" + formId + " #status2").select2("val");
  addPaymentDTO["paymentDate"] = $("#" + formId + " #paymentDate2").val().trim();
  addPaymentDTO["scheduleDate"] = $("#" + formId + " #scheduleDate2").val().trim();
  addPaymentDTO["transactionNumber"] = $("#" + formId + " #transactionNumber2").val().trim();
  addPaymentDTO["id"] = $("#" + formId + " #userPayId").val().trim();
  requestData["addPaymentDTO"] = addPaymentDTO;
  request["requestData"] = requestData;
  authentication["hash"] = getHash();
  authentication["schoolId"] = SCHOOL_ID;
  authentication["schoolUUID"] = SCHOOL_UUID;
  request["authentication"] = authentication;

  return request;
}

function deletePayment(id) {
  $.ajax({
    type: "GET",
    url: getURLForHTML("dashboard", "delete-user-payment"),
    data: "id=" + id,
    dataType: "html",
    cache: false,
    timeout: 600000,
    success: function (data) {
      var stringMessage = [];
      stringMessage = data.split("|");
      if (stringMessage[0] == "EXCEPTION" || stringMessage[0] == "FAILED") {
        showMessage(true, stringMessage[1]);
      } else {
        showMessage(true, stringMessage[1]);
        $("#record_" + id)
          .next()
          .remove();
        $("#record_" + id).remove();
      }
    },
    error: function (e) {
      return false;
    },
  });
}
