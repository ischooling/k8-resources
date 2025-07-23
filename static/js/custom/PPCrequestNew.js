function validateRequestForPPCRequest(formId) {
  removeAllError(formId);
  var flag = true;
  if (!validateFormAscii(formId)) {
    showServerError(
      true,
      formId,
      "serverError",
      "Please use the English Keyboard while providing information"
    );
    flag = false;
  }
  if (
    $("#" + formId + " #name").val() == "" ||
    $("#" + formId + " #name").val() == null
  ) {
    showErrorForPPC(formId, "name", "Name is required");
    flag = false;
  }
  if (!validateEmail($("#" + formId + " #email").val())) {
    showErrorForPPC(formId, "email", "Email is either empty or invalid");
    flag = false;
  }
  //	if($("#"+formId+" #isdCodeMobileNo").length){
  //		if ($("#"+formId+" #isdCodeMobileNo").val()=='' || $("#"+formId+" #isdCodeMobileNo").val()==null) {
  //			showErrorForPPC(formId, 'isdCodeMobileNo', 'Isd code is required');
  //			flag=false;
  //		}
  //	}
  //	if($("#"+formId+" #contactNumber").length){
  //		if ($("#"+formId+" #contactNumber").val()=='' || $("#"+formId+" #contactNumber").val()==null) {
  //			showErrorForPPC(formId, 'contactNumber', 'Phone Number is required');
  //			flag=false;
  //		}
  //	}
  if ($("#" + formId + " #userphone").length) {
    if ($("#" + formId + " #userphone").val() != "") {
      if ($("#" + formId + " #isdCodeMobileNo").length) {
        if ($("#" + formId + " #isdCodeMobileNo").val() == "") {
          showErrorForPPC(formId, "isdCodeMobileNo", "Isd code is required");
          flag = false;
        }
      }
    }
  }
  if ($("#" + formId + " #curriculum").length) {
    if (
      $("#" + formId + " #curriculum").val() == "" ||
      $("#" + formId + " #curriculum").val() == null
    ) {
      showErrorForPPC(formId, "curriculum", "Curriculum is required");
      flag = false;
    }
  }
  if (
    $("#" + formId + " #grade").val() == "" ||
    $("#" + formId + " #grade").val() == null
  ) {
    showErrorForPPC(formId, "grade", "Grade is required");
    flag = false;
  }
  return flag;
}

function callForPPCRequestForm(formId, moduleId, folderName) {
  if (!validateRequestForPPCRequest(formId)) {
    return false;
  }
  var me = $(this);
  if (me.data("requestRunning")) {
    console.log("request blocked");
    return false;
  }
  me.data("requestRunning", true);
  $("#sendRequest").prop("disabled", true);
  $.ajax({
    type: "POST",
    url: getURLForHTML("common", "save-ppc-request-content"),
    contentType: "application/json",
    data: JSON.stringify(getRequestForPPCRequest(formId, moduleId, folderName)),
    dataType: "html",
    success: function (htmlContent) {
      if (htmlContent != "") {
        var stringMessage = [];
        stringMessage = htmlContent.split("|");
        if (
          stringMessage[0] == "FAILED" ||
          stringMessage[0] == "EXCEPTION" ||
          stringMessage[0] == "SESSIONOUT"
        ) {
          $("#" + formId + " #serverError").html(stringMessage[1]);
          showServerError(true, formId, "serverError", stringMessage[1]);
        } else {
          var url = "";
          if (ENVIRONMENT == "uat") {
            url =
              "http://164.52.198.42:8080/k8school/common/ppc-request-thank-you";
          } else if (ENVIRONMENT == "uat2") {
            url =
              "http://164.52.198.42:9090/k8school/common/ppc-request-thank-you";
          } else if (ENVIRONMENT == "dev") {
            url = "http://localhost:8080/k8school/common/ppc-request-thank-you";
          } else if (ENVIRONMENT == "staging") {
            url =
              "http://164.52.198.42:8070/k8school/common/ppc-request-thank-you";
          } else {
            url = ORIGIN_NEW_URL + "/home-lp-thankyou/";
          }
          goAhead(url, "");
          return false;
        }
        return false;
      }
    },
    complete: function () {
      window.setTimeout(function () {
        me.data("requestRunning", false);
      }, 10000);
    },
    error: function (e) {
      return false;
    },
  });
}

function getRequestForPPCRequest(formId, moduleId, folderName) {
  var request = {};
  var authentication = {};
  var requestData = {};
  var PPCRequestDTO = {};
  PPCRequestDTO["name"] = toTitleCase($("#" + formId + " #name").val());
  PPCRequestDTO["email"] = $("#" + formId + " #email").val();
  PPCRequestDTO["isdCode"] = $("#" + formId + " #isdCodeMobileNo :selected")
    .text()
    .split(" ")[0];
  PPCRequestDTO["contactNumber"] = $("#" + formId + " #userphone").val();
  if ($("#" + formId + " #curriculum").length) {
    PPCRequestDTO["curriculum"] = $("#" + formId + " #curriculum").val();
  }
  PPCRequestDTO["grade"] = $("#" + formId + " #grade").val();
  PPCRequestDTO["description"] = escapeCharacters(
    $("#" + formId + " #description").val()
  );
  PPCRequestDTO["location"] = $("#" + formId + " #location").val();
  PPCRequestDTO["campaignName"] = folderName;

  PPCRequestDTO["utmSource"] = getCookie("us");
  PPCRequestDTO["utmMedium"] = getCookie("um");
  PPCRequestDTO["utmDescription"] = getCookie("uc");
  PPCRequestDTO["originalUrl"] = getCookie("cu");
  PPCRequestDTO["gclid"] = getCookie("gclid");
  PPCRequestDTO["utmCampaign"] = getCookie("ucam");
  PPCRequestDTO["utmTerm"] = getCookie("ut");

  requestData["ppcRequestDTO"] = PPCRequestDTO;
  authentication["hash"] = getHash();
  authentication["schoolId"] = SCHOOL_ID;
  authentication["schoolUUID"] = SCHOOL_UUID;
  authentication["userType"] = moduleId;
  request["authentication"] = authentication;
  request["requestData"] = requestData;
  return request;
}

function validateRequestForMaster(formId, elementId) {
  if (
    $("#" + formId + " #" + elementId).val() == "" ||
    $("#" + formId + " #" + elementId).val() <= 0
  ) {
    return false;
  }
  return true;
}
function getRequestForMaster(
  formId,
  key,
  value,
  requestExtra,
  requestExtra1,
  requestExtra2
) {
  var request = {};
  var authentication = {};
  var requestData = {};
  requestData["requestKey"] = key;
  requestData["requestValue"] = value;
  if (requestExtra != undefined) {
    requestData["requestExtra1"] = requestExtra;
  }
  if (requestExtra1 != undefined) {
    requestData["requestExtra2"] = requestExtra1;
  }
  //New line add by mayank
  if (requestExtra2 != undefined) {
    requestData["requestExtra"] = requestExtra2;
  }
  authentication["hash"] = getHash();
  authentication["schoolId"] = SCHOOL_ID;
  authentication["schoolUUID"] = SCHOOL_UUID;
  authentication["userType"] = "COMMON";
  request["authentication"] = authentication;
  request["requestData"] = requestData;
  return request;
}

function callStates(formId, value, elementId) {
  if (!validateRequestForMaster(formId, elementId)) {
    $("#" + formId + " #stateId").val(0);
    resetDropdown($("#" + formId + " #stateId"), "Select state");
    $("#" + formId + " #cityId").val(0);
    resetDropdown($("#" + formId + " #cityId"), "Select city");
    return false;
  }
  $("#stateId").prop("disabled", true);
  resetDropdown($("#" + formId + " #cityId"), "Select city");
  $.ajax({
    type: "POST",
    contentType: "application/json",
    url: getURLForCommon("masters"),
    data: JSON.stringify(getRequestForMaster(formId, "STATES-LIST", value)),
    dataType: "json",
    cache: false,
    timeout: 600000,
    success: function (data) {
      if (data["status"] == "0" || data["status"] == "2") {
        showMessageRequestDemoPage(true, stringMessage[1], "serverError", "");
      } else {
        buildDropdown(
          data["mastersData"]["states"],
          $("#stateId"),
          "Select state"
        );
        if (formId == "inquiryForm") {
          $("#" + formId + " #countryCode").val(
            $("#" + formId + " #countryId").val()
          );
        } else if (formId == "signupStage2") {
          $("#" + formId + " #countryCode").val(
            $("#" + formId + " #countryId option:selected").attr("dailCode")
          );
          $("#" + formId + " #countryCodeStudent").val(
            $("#" + formId + " #countryId option:selected").attr("dailCode")
          );
        }
      }
      $("#stateId").prop("disabled", false);
    },
    error: function (e) {
      $("#stateId").prop("disabled", false);
    },
  });
}

function callCities(formId, value, elementId) {
  if (!validateRequestForMaster(formId, elementId)) {
    $("#" + formId + " #cityId")
      .val(0)
      .trigger("change");
    resetDropdown($("#" + formId + " #cityId"), "Select city");
    return false;
  }
  $("#" + formId + " #cityId").prop("disabled", true);
  $.ajax({
    type: "POST",
    contentType: "application/json",
    url: getURLForCommon("masters"),
    data: JSON.stringify(getRequestForMaster("formId", "CITIES-LIST", value)),
    dataType: "json",
    cache: false,
    timeout: 600000,
    success: function (data) {
      if (data["status"] == "0" || data["status"] == "2") {
        showMessageRequestDemoPage(true, stringMessage[1], "serverError", "");
      } else {
        buildDropdown(
          data["mastersData"]["cities"],
          $("#cityId"),
          "Select city"
        );
      }
      $("#cityId").prop("disabled", false);
      return false;
    },
    error: function (e) {
      $("#cityId").prop("disabled", false);
    },
  });
}

function callLocationAndSelectCountryNew(formId) {
  $.ajax({
    global: false,
    type: "GET",
    url: PRO_IP_API_URL,
    success: function (data) {
      callLocationAndSelectCountryNewFill(formId, data);
    },
  });
}

function callLocationAndSelectCountryNewFill(formId, data) {
  console.log("data :" + JSON.stringify(data));
  console.log("data.timezone " + data.timezone);
  /*if($('#'+formId+' #countryTimezoneId').length){
		$('#'+formId+' #countryTimezoneId').select2();
	}*/
  if (data != undefined && data != "") {
    /*if($("#"+formId+" #countryTimezoneId").length){
			$('#countryTimezoneId').val(data.timezone).trigger('change')
		}*/
    /*if($("#"+formId+" #chooseDate").length){
			$("#"+formId+" #chooseDate").datepicker().datepicker("setDate", new Date());
		}*/
    chooseValueByElement("isdCodeMobileNo", data.country);
    chooseValueByElement("isdCodeWhatsupNo", data.country);
    chooseCountryElement("countryId", data.country);
    $("#countryId").trigger("change");
    $("#" + formId + " #location").val(JSON.stringify(data));
    if ($("#" + formId + "Alternet #location").length) {
      $("#" + formId + "Alternet #location").val(
        $("#" + formId + " #location").val()
      );
    }
  }
}

function validateRequestForCommonForm(formId, moduleId) {
  hideMessageRequestDemoPage("serverError", "");
  hideMessageRequestDemoPage("usernameError", "username");
  hideMessageRequestDemoPage("emailError", "email");
  hideMessageRequestDemoPage("isdCodeMobileNoError", "isdCodeMobileNo");
  hideMessageRequestDemoPage("isdCodeMobileNoError", "userphone");
  hideMessageRequestDemoPage("isdCodeWhatsupNoError", "isdCodeWhatsupNo");
  hideMessageRequestDemoPage("isdCodeWhatsupNoError", "wtspNumber");
  hideMessageRequestDemoPage("relationTypeError", "relationType");
  hideMessageRequestDemoPage("titleError", "title");
  hideMessageRequestDemoPage("parentNameError", "parentName");
  hideMessageRequestDemoPage("occupationError", "occupation");
  hideMessageRequestDemoPage("dobError", "dob");
  //	hideMessageRequestDemoPage('descriptionError');
  hideMessageRequestDemoPage("freeSlotListError", "viewFreeSlot");
  //	hideMessageRequestDemoPage('countryTimezoneIdError','countryTimezoneId');
  hideMessageRequestDemoPage("chooseDateError", "chooseDate");
  hideMessageRequestDemoPage("termsAndConditionsError", "termsAndConditions");
  hideMessageRequestDemoPage("stateIdError", "stateId");
  hideMessageRequestDemoPage("cityIdError", "cityId");
  hideMessageRequestDemoPage("gradeError", "grade");
  hideMessageRequestDemoPage("callbackError", "callback");
  var flag = true;
  //	if (!validateFormAscii(formId)) {
  //		showMessageRequestDemoPage(false, 'Please use the English Keyboard while providing information');
  //		flag=false;
  //	}
  //if('BOOKMEETING_NEW'==moduleId){
  var radioCheck = $(".radioCheck:checked").attr("id");
  if (radioCheck == "CB") {
    if (
      $("#" + formId + " #callback").val() == "" ||
      $("#" + formId + " #callback").val() == null
    ) {
      showMessageRequestDemoPage(
        true,
        "Please Select your call me back reason",
        "callbackError",
        "callback"
      );
      flag = false;
    }
  }

  if (
    $("#" + formId + " #username").val() == "" ||
    $("#" + formId + " #username").val() == null
  ) {
    showMessageRequestDemoPage(
      true,
      "Name is required",
      "usernameError",
      "username"
    );
    flag = false;
  }

  if ($("#" + formId + " #curriculum").length) {
    if (
      $("#" + formId + " #curriculum").val() == "" ||
      $("#" + formId + " #curriculum").val() == null
    ) {
      showMessageRequestDemoPage(
        formId,
        "curriculum",
        "Curriculum is required"
      );
      flag = false;
    }
  }
  if (
    $("#" + formId + " #grade").val() == "" ||
    $("#" + formId + " #grade").val() == null
  ) {
    showMessageRequestDemoPage(
      true,
      "Grade is required",
      "gradeError",
      "grade"
    );
    flag = false;
  }
  if (!validateEmail($("#" + formId + " #email").val())) {
    showMessageRequestDemoPage(
      false,
      "Email is either empty or invalid",
      "emailError",
      "email"
    );
    flag = false;
  }

  // if (
  //   $("#" + formId + " #isdCodeMobileNo").val() == "" ||
  //   $("#" + formId + " #isdCodeMobileNo").val() == null
  // ) {
  //   showMessageRequestDemoPage(
  //     true,
  //     "ISD Code is required",
  //     "isdCodeMobileNoError",
  //     "isdCodeMobileNo"
  //   );
  //   flag = false;
  // }

  // if (
  //   $("#" + formId + " #userphone").val() == "" ||
  //   $("#" + formId + " #userphone").val() == null
  // ) {
  //   showMessageRequestDemoPage(
  //     true,
  //     "Phone Number is required",
  //     "isdCodeMobileNoError",
  //     "userphone"
  //   );
  //   flag = false;
  // } else if ($("#" + formId + " #otpVerifiedstatus").val() == "true") {
  // } else {
  //   showMessageRequestDemoPage(
  //     true,
  //     "Phone no. is not verified",
  //     "isdCodeMobileNoError",
  //     "userphone"
  //   );
  //   flag = false;
  // }

  if (
    $("#" + formId + " #isdCodeWtsp").val() == "" ||
    $("#" + formId + " #isdCodeWtsp").val() == null
  ) {
    showMessageRequestDemoPage(
      true,
      "Whatsapp ISD Code is required",
      "isdCodeWtspError",
      "isdCodeWtsp"
    );
    flag = false;
  }

  if (
    $("#" + formId + " #wtsappNo").val() == "" ||
    $("#" + formId + " #wtsappNo").val() == null
  ) {
    showMessageRequestDemoPage(
      true,
      "Whatsapp Number is required",
      "isdCodeWtspError",
      "wtsappNo"
    );
    flag = false;
  }
  //  else {
  //   showMessageRequestDemoPage(
  //     true,
  //     "Whatsapp number is not verified",
  //     "isdCodeWtspError",
  //     "wtsappNo"
  //   );
  //   flag = false;
  // }

  if ($("#" + formId + " #stateId").length) {
    if (
      $("#" + formId + " #stateId").val() == 0 ||
      $("#" + formId + " #stateId").val() == null
    ) {
      showMessageRequestDemoPage(
        true,
        "State is required",
        "stateIdError",
        "stateId"
      );
      flag = false;
    }
  }
  if ($("#" + formId + " #cityId").length) {
    if (
      $("#" + formId + " #cityId").val() == 0 ||
      $("#" + formId + " #cityId").val() == null
    ) {
      showMessageRequestDemoPage(
        true,
        "City is required",
        "cityIdError",
        "cityId"
      );
      flag = false;
    }
  }
  if (radioCheck != "I") {
    if (
      $("#" + formId + " #chooseDate").val() == null ||
      $("#" + formId + " #chooseDate").val() == ""
    ) {
      showMessageRequestDemoPage(
        true,
        "Please select a date",
        "chooseDateError",
        "chooseDate"
      );
      flag = false;
    }
    if ($("input[name='slotTime']:checked").val() == undefined) {
      showMessageRequestDemoPage(
        true,
        "Please select any one Slot.",
        "freeSlotListError",
        "viewFreeSlot"
      );
      flag = false;
    }
  }
  /*}
	
	 Not in common page	
	else{
		if ($("#"+formId+" #username").val()=='' || $("#"+formId+" #username").val()==null) {
			showMessageRequestDemoPage(true, 'Name is required','usernameError','username');
			flag=false;
		}
	
		if (!validateEmail($("#" + formId + " #email").val())) {
			showMessageRequestDemoPage(false, 'Email is either empty or invalid', 'emailError','email');
			flag=false;
		}
		if('BOOKMEETING'==moduleId){
		if ($("#"+formId+" #relationType").val()=='' || $("#"+formId+" #relationType").val()==null) {
			showMessageRequestDemoPage(true, 'Relation Type is required', 'relationTypeError','relationType');
			flag=false;
		}
		if ($("#"+formId+" #title").val()=='' || $("#"+formId+" #title").val()==null) {
			showMessageRequestDemoPage(true, 'Title is required', 'titleError','title');
			flag=false;
		}
		if ($("#"+formId+" #parentName").val()=='' || $("#"+formId+" #parentName").val()==null) {
			showMessageRequestDemoPage(true, 'Father/Mother Name is required', 'parentNameError','parentName');
			flag=false;
		}
		if ($("#"+formId+" #occupation").val()=='' || $("#"+formId+" #occupation").val()==null) {
			showMessageRequestDemoPage(true, 'Occupation is required', 'occupationError','occupation');
			flag=false;
		}
		if ($("#"+formId+" #gender").val()=='' || $("#"+formId+" #gender").val()==null) {
			showMessageRequestDemoPage(true, 'Gender is required', 'genderError','gender');
			flag=false;
		}
		if($("#"+formId+" #dob").val()=='' || $("#"+formId+" #dob").val()==null) {
			showMessageRequestDemoPage(true, 'Date of Birth is required', 'dobError','dob');
			flag=false;
		}
		if ($("#"+formId+" #stateId").val()==0 || $("#"+formId+" #stateId").val()==null) {
			showMessageRequestDemoPage(true, 'State is required', 'stateIdError','stateId');
			flag=false;
		}
		if ($("#"+formId+" #cityId").val()==0 || $("#"+formId+" #cityId").val()==null) {
			showMessageRequestDemoPage(true, 'City is required', 'cityIdError','cityId');
			flag=false;
		}
	}
	if ($("#"+formId+" #grade").val()=='' || $("#"+formId+" #grade").val()==null) {
		showMessageRequestDemoPage(true, 'Grade is required', 'gradeError','grade');
		flag=false;
	}
	if('BOOKMEETING'!=moduleId){
		if ($("#"+formId+" #isdCodeWhatsupNo").val()=='' || $("#"+formId+" #isdCodeWhatsupNo").val()==null) {
			showMessageRequestDemoPage(true, 'ISD Code for whatsApp is required', 'isdCodeWhatsupNoError','isdCodeWhatsupNo');
			flag=false;
		} 
	}
	if ($("#"+formId+" #wtspNumber").val()=='' || $("#"+formId+" #wtspNumber").val()==null) {
		showMessageRequestDemoPage(true, 'WhatsApp Number is required', 'isdCodeWhatsupNoError','wtspNumber');
		flag=false;
	}
	if('BOOKMEETING'!=moduleId){
		if (($("#"+formId+" #isdCodeWhatsupNo").val()=='' || $("#"+formId+" #isdCodeWhatsupNo").val()==null)  &&  ($("#"+formId+" #wtspNumber").val()=='' || $("#"+formId+" #wtspNumber").val()==null)) {
			showMessageRequestDemoPage(true, 'ISD Code and WhatsApp No. are required', 'isdCodeWhatsupNoError','wtspNumber');
			flag=false;
		}
	}
	if('BOOKMEETING'!=moduleId){
		if ($("#"+formId+" #isdCodeMobileNo").val()=='' || $("#"+formId+" #isdCodeMobileNo").val()==null) {
			showMessageRequestDemoPage(true, 'ISD Code is required', 'isdCodeMobileNoError','isdCodeMobileNo');
			flag=false;
		} 
	}
	if('BOOKMEETING'==moduleId){
		//if ($("#"+formId+" #userphone").val()=='' || $("#"+formId+" #userphone").val()==null || !ValidateNo($("#"+formId+" #userphone").val())) {
		if ($("#"+formId+" #userphone").val()=='' || $("#"+formId+" #userphone").val()==null) {	
			showMessageRequestDemoPage(true, 'Phone Number is required', 'isdCodeMobileNoError','userphone');
			flag=false;
		}else if ($("#"+formId+" #otpVerifiedstatus").val()=='true') {
			
		}else{
			showMessageRequestDemoPage(true, 'Phone no. is not verified', 'isdCodeMobileNoError','userphone');
			flag=false;
		}
	}else{
		if ($("#"+formId+" #userphone").val()=='' || $("#"+formId+" #userphone").val()==null) {
			showMessageRequestDemoPage(true, 'Phone Number is required', 'isdCodeMobileNoError','userphone');
			flag=false;
		}
	}
	
	if('BOOKMEETING'!=moduleId){
		if (($("#"+formId+" #isdCodeMobileNo").val()=='' || $("#"+formId+" #isdCodeMobileNo").val()==null)  &&  ($("#"+formId+" #userphone").val()=='' || $("#"+formId+" #userphone").val()==null)) {
			showMessageRequestDemoPage(true, 'ISD Code and Phone No. are required', 'isdCodeMobileNoError','isdCodeMobileNo');
			flag=false;
		}
	}
	
//	if ($("#"+formId+" #description").val()=='' || $("#"+formId+" #description").val()==null) {
//		showMessageRequestDemoPage(true, 'Description is required', 'descriptionError');
//		flag=false;
//	}
//	if ($("#"+formId+" #countryTimezoneId").val()==null || $("#"+formId+" #countryTimezoneId").val()==0) {
//		showMessageRequestDemoPage(true, 'Please select a Time Zone', 'countryTimezoneIdError','countryTimezoneId');
//		flag=false;
//	}
	
	if ($("#"+formId+" #chooseDate").val()==null || $("#"+formId+" #chooseDate").val()=='') {
		showMessageRequestDemoPage(true, 'Please select a Month', 'chooseDateError','chooseDate');
		flag=false;
	}
	if($("input[name='slotTime']:checked").val()==undefined){
		showMessageRequestDemoPage(true, 'Please select any one Slot.', 'freeSlotListError','viewFreeSlot');
		flag=false;
	}
//	if('BOOKMEETING'==moduleId){
//		if ($("#"+formId+" #otpVerifiedstatus").val()) {
//			
//		}else{
//			showMessageRequestDemoPage(true, 'Phone no is not verified', 'isdCodeMobileNoError','userphone');
//			flag=false;
//		}
//	}
	if('BOOKMEETING'==moduleId){
		if($("#"+formId+" #termsAndConditions").is(':checked')){
			
		}else{
			$('#termsAndConditions').closest('.term-and-condition').addClass('highlight-field');
			showMessageRequestDemoPage(true, 'Please agree to the terms & conditions','termsAndConditionsError','termsAndConditions');
			flag= false
		}
	}	
	}
	 Not in common page
	*/

  return flag;
}

function callForRequestDemoForm(formId, moduleId, folderName) {
  $(".callBackSubmit").prop("disabled", true);
  $(".reqeustDemo").prop("disabled", true);
  if (!validateRequestForCommonForm(formId, moduleId)) {
    $(".callBackSubmit").prop("disabled", false);
    $(".reqeustDemo").prop("disabled", false);
    return false;
  }

  const finalFolder =
    folderName === "Blog-lead"
      ? window.location.pathname.replaceAll("/", "")
      : folderName;

  var me = $(this);
  if (me.data("requestRunning")) {
    console.log("request blocked");
    return false;
  }
  me.data("requestRunning", true);
  $.ajax({
    type: "POST",
    url: getURLForHTML("common", "reqeust-demo-content"),
    contentType: "application/json",
    data: JSON.stringify(
      getRequestForRequestDemo(formId, moduleId, finalFolder)
    ),
    dataType: "json",
    success: function (data) {
      if (data.status == "FAILED") {
        $(".callBackSubmit").prop("disabled", false);
        $(".reqeustDemo").prop("disabled", false);
      } else {
        var url = "";
        var parameters = "";
        if (data.fn) {
          parameters += "?fn=" + base64Encode(data.fn);
        }
        if (data.c) {
          parameters += "&c=" + base64Encode(data.c);
        }
        if (data.un) {
          parameters += "&un=" + base64Encode(data.un);
        }
        if (ENVIRONMENT == "uat") {
          url =
            "http://164.52.198.42:8080/k8school/common/book-a-demo-thank-you/" +
            parameters;
        } else if (ENVIRONMENT == "uat2") {
          url =
            "http://164.52.198.42:9090/k8school/common/book-a-demo-thank-you/" +
            parameters;
        } else if (ENVIRONMENT == "dev") {
          url =
            "http://localhost:8080/k8school/common/book-a-demo-thank-you/" +
            parameters;
        } else if (ENVIRONMENT == "staging") {
          url =
            "http://164.52.198.42:8070/k8school/common/book-a-demo-thank-you/" +
            parameters;
        } else {
          url = ORIGIN_NEW_URL + "/home-lp-thankyou/" + parameters;
        }
        goAhead(url, "");
        return false;
      }
      return false;
    },
    complete: function () {
      window.setTimeout(function () {
        me.data("requestRunning", false);
      }, 10000);
    },
    error: function (e) {
      $(".callBackSubmit").prop("disabled", false);
      $(".reqeustDemo").prop("disabled", false);
    },
  });
}
function getRequestForRequestDemo(formId, moduleId, folderName) {
  var request = {};
  var authentication = {};
  var requestData = {};
  var requestDemoDTO = {};
  var isdWhatsappNo = $("#" + formId + " #isdCodeWtsp").val();
  var whatsappNo = $("#" + formId + " #wtsappNo").val();
  if (isdWhatsappNo && whatsappNo) {
    requestDemoDTO["wtspNumber"] = isdWhatsappNo.trim() + whatsappNo.trim();
  }
  requestDemoDTO["name"] = $("#" + formId + " #username").val();
  requestDemoDTO["email"] = $("#" + formId + " #email").val();
  if ("BD" == $(".radioCheck:checked").attr("id")) {
    requestDemoDTO["requestCallFrom"] = "DEMO";
  } else if ("CB" == $(".radioCheck:checked").attr("id")) {
    requestDemoDTO["requestCallFrom"] = "PPC";
  }
  requestDemoDTO["isdCode"] =
    $("#" + formId + " #isdCodeMobileNo").val() != ""
      ? $("#" + formId + " #isdCodeMobileNo").val()
      : isdWhatsappNo;
  requestDemoDTO["contactNumber"] =
    $("#" + formId + " #userphone").val() != ""
      ? $("#" + formId + " #userphone").val()
      : whatsappNo;
  requestDemoDTO["contactDescription"] = escapeCharacters(
    $("#" + formId + " #description").val()
  );
  requestDemoDTO["location"] = $("#" + formId + " #location").val();
  if ($("#" + formId + " #curriculum").length) {
    requestDemoDTO["curriculum"] = $("#" + formId + " #curriculum").val();
  }
  if ($("#" + formId + " #countryId").length) {
    requestDemoDTO["countryId"] = $("#" + formId + " #countryId").val();
  }
  requestDemoDTO["grade"] = $("#" + formId + " #grade").val();
  if ($("#" + formId + " #cityId").length) {
    requestDemoDTO["cityId"] = $("#" + formId + " #cityId").val();
  }
  if ($("#" + formId + " #stateId").length) {
    requestDemoDTO["stateId"] = $("#" + formId + " #stateId").val();
  }
  requestDemoDTO["otpVerifiedStatus"] = $(
    "#" + formId + " #otpVerifiedstatus"
  ).val();
  requestDemoDTO["countryTimezoneId"] = "186";
  requestDemoDTO["callBackReason"] = $("#" + formId + " #callback").val();
  //	requestDemoDTO['countryTimezoneId'] = $('#countryTimezoneId option:selected').attr('custom_timezone_id');
  requestDemoDTO["timeZone"] = "Asia/Kolkata"; //$("#" + formId + " #countryTimezoneId").val().trim();
  requestDemoDTO["studentTimeZone"] = "India/Kolkata"; // $("#" + formId + " #countryTimezoneId option:selected").text().trim();
  requestDemoDTO["meetingDate"] = $("input[name='slotTime']:checked").attr(
    "slotDateAttr"
  );
  requestDemoDTO["meetingSlotId"] = $("input[name='slotTime']:checked").attr(
    "slotidattr"
  );
  requestDemoDTO["meetingSlotTime"] = $("input[name='slotTime']:checked").val();
  requestDemoDTO["campaignName"] = folderName;
  requestDemoDTO["moduleName"] = moduleId;
  requestDemoDTO["utmSource"] = getCookie("us");
  requestDemoDTO["utmMedium"] = getCookie("um");
  requestDemoDTO["utmDescription"] = getCookie("uc");
  requestDemoDTO["originalUrl"] = window.location.href;
  requestDemoDTO["gclid"] = getCookie("gclid");
  requestDemoDTO["utmCampaign"] = getCookie("ucam");
  requestDemoDTO["utmTerm"] = getCookie("ut");

  requestDemoDTO["utmDescription"] = getCookie("uc");

  requestData["requestDemoDTO"] = requestDemoDTO;
  authentication["hash"] = getHash();
  authentication["userType"] = "COMMON";
  request["authentication"] = authentication;
  request["requestData"] = requestData;
  return request;
}

function base64Encode(text) {
  return btoa(unescape(encodeURIComponent(text)));
}

function callForInquiryForm(formId, moduleId, folderName) {
  if (!validateRequestForCommonForm(formId, moduleId)) {
    return false;
  }
  $(".inquirySubmit").prop("disabled", true);
  var me = $(this);
  if (me.data("requestRunning")) {
    console.log("request blocked");
    return false;
  }
  const finalFolder =
    folderName === "Blog-lead"
      ? window.location.pathname.replaceAll("/", "") + " (Blog-lead)"
      : folderName;
  me.data("requestRunning", true);
  $.ajax({
    type: "POST",
    url: getURLForHTML("common", "inquiry-content"),
    contentType: "application/json",
    data: JSON.stringify(getRequestForInquiry(formId, moduleId, finalFolder)),
    dataType: "json",
    success: function (data) {
      if (data.status == "FAILED") {
        showMessageRequestDemoPage(true, data.message, "serverError", "");
      } else {
        $(".inquirySubmit").prop("disabled", false);
        var url = "";
        var parameters = "";
        if (data.fn) {
          parameters += "?fn=" + base64Encode(data.fn);
        }
        if (data.c) {
          parameters += "&c=" + base64Encode(data.c);
        }
        if (data.un) {
          parameters += "&un=" + base64Encode(data.un);
        }
        if (ENVIRONMENT == "uat") {
          url =
            "http://164.52.198.42:8080/k8school/common/book-a-demo-thank-you/" +
            parameters;
        } else if (ENVIRONMENT == "uat2") {
          url =
            "http://164.52.198.42:9090/k8school/common/book-a-demo-thank-you/" +
            parameters;
        } else if (ENVIRONMENT == "dev") {
          url =
            "http://localhost:8080/k8school/common/book-a-demo-thank-you/" +
            parameters;
        } else if (ENVIRONMENT == "staging") {
          url =
            "http://164.52.198.42:8070/k8school/common/book-a-demo-thank-you/" +
            parameters;
        } else {
          url = ORIGIN_NEW_URL + "/home-lp-thankyou/" + parameters;
        }
        goAhead(url, "");
        return false;
      }
      $(".inquirySubmit").prop("disabled", false);
      return false;
    },
    complete: function () {
      window.setTimeout(function () {
        me.data("requestRunning", false);
      }, 10000);
    },
    error: function () {
      $(".inquirySubmit").prop("disabled", false);
    },
  });
}

function getRequestForInquiry(formId, moduleId, folderName) {
  var request = {};
  var authentication = {};
  var requestData = {};
  var contactUsDTO = {};
  var isdWhatsappNo = $("#" + formId + " #isdCodeWtsp").val();
  var whatsappNo = $("#" + formId + " #wtsappNo").val();
  if (isdWhatsappNo && whatsappNo) {
    contactUsDTO["wtsappNo"] = isdWhatsappNo.trim() + whatsappNo.trim();
  }
  contactUsDTO["name"] = $("#" + formId + " #username")
    .val()
    .trim();
  if ($("#" + formId + " #curriculum").length) {
    contactUsDTO["curriculum"] = $("#" + formId + " #curriculum").val();
  }
  contactUsDTO["grade"] = $("#" + formId + " #grade").val();
  contactUsDTO["email"] = $("#" + formId + " #email")
    .val()
    .trim();
  if ($("#" + formId + " #isdCodeMobileNo").length) {
    contactUsDTO["isdCode"] =
      $("#" + formId + " #isdCodeMobileNo").val() != ""
        ? $("#" + formId + " #isdCodeMobileNo").val()
        : isdWhatsappNo;
  } else {
    contactUsDTO["isdCode"] = "+91";
  }
  contactUsDTO["contactNumber"] =
    $("#" + formId + " #userphone").val() != ""
      ? $("#" + formId + " #userphone").val()
      : whatsappNo;
  if ($("#" + formId + " #countryId").length) {
    contactUsDTO["countryId"] = $("#" + formId + " #countryId").val();
  } else {
    contactUsDTO["countryId"] = "101";
  }
  if ($("#" + formId + " #stateId").length) {
    contactUsDTO["stateId"] = $("#" + formId + " #stateId")
      .val()
      .trim();
  }
  if ($("#" + formId + " #cityId").length) {
    contactUsDTO["cityId"] = $("#" + formId + " #cityId")
      .val()
      .trim();
  }
  contactUsDTO["utmSource"] = getCookie("us");
  contactUsDTO["utmMedium"] = getCookie("um");
  contactUsDTO["utmDescription"] = getCookie("uc");
  contactUsDTO["originalUrl"] = getCookie("cu");
  contactUsDTO["gclid"] = getCookie("gclid");
  contactUsDTO["utmCampaign"] = getCookie("ucam");
  contactUsDTO["utmTerm"] = getCookie("ut");

  contactUsDTO["contactDescription"] = escapeCharacters(
    $("#" + formId + " #description")
      .val()
      .trim()
  );
  contactUsDTO["location"] = $("#" + formId + " #location")
    .val()
    .trim();
  contactUsDTO["captchaByPass"] = "T";
  contactUsDTO["campaignName"] = folderName;
  // not here
  //contactUsDTO['inquiryType'] = $("#" + formId + " #inquiryId").val().trim();
  //contactUsDTO['inquiryOther'] = $("#" + formId + " #otherType").val().trim();
  // not here

  //contactUsDTO['captcha'] = $("#" + formId + " #captcha").val().trim();

  contactUsDTO["utmSource"] = getCookie("us");
  contactUsDTO["utmMedium"] = getCookie("um");
  contactUsDTO["utmDescription"] = getCookie("uc");
  contactUsDTO["originalUrl"] = getCookie("cu");
  contactUsDTO["gclid"] = getCookie("gclid");
  contactUsDTO["utmCampaign"] = getCookie("ucam");
  contactUsDTO["utmTerm"] = getCookie("ut");

  requestData["contactUsDTO"] = contactUsDTO;
  authentication["hash"] = getHash();
  authentication["schoolId"] = SCHOOL_ID;
  authentication["schoolUUID"] = SCHOOL_UUID;
  authentication["userType"] = moduleId;
  request["authentication"] = authentication;
  request["requestData"] = requestData;
  return request;
}
