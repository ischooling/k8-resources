var defaultLocation='{"as":"AS10029 SHYAM SPECTRA PVT LTD","city":"New Delhi","country":"India","countryCode":"IN","isp":"Shyam Spectra Pvt Ltd","lat":28.6331,"lon":77.2207,"org":"Shyam Spectra Pvt Ltd","query":"125.63.99.243","region":"DL","regionName":"National Capital Territory of Delhi","status":"success","timezone":"Asia/Kolkata","zip":"110055"}';

function callLocationDetailsFill(formId, data){
	console.log('data :'+JSON.stringify(data))
	if(data!=undefined && data !=''){
		if($("#"+formId+" #countryTimezoneId").length){
			$("#countryTimezoneId").val(data.timezone)
		}
		if($("#"+formId+"Alternet #countryTimezoneId").length){
			$("#"+formId+"Alternet #countryTimezoneId").val(data.timezone)
		}
		if($("#"+formId+" #chooseDate").length){
			$("#"+formId+" #chooseDate").datepicker().datepicker("setDate", new Date());
		}
		chooseValueByElement('isdCodeMobileNo', data.country);
		chooseValueByElement('isdCodeWhatsupNo', data.country);
		$("#"+formId+" #location").val(JSON.stringify(data));
		if($("#"+formId+"Alternet #location").length){
			$("#"+formId+"Alternet #location").val($("#"+formId+" #location").val());
		}
	}
}
function callLocationDetails(formId){
	if(LOCATION_SERVICE_BYPASS=='true'){
		callLocationDetailsFill(formId, JSON.parse(DEFAULT_LOCATION))
	}else{
		$.ajax({
			global: false,
			type : "GET",
			url : PRO_IP_API_URL,
			success : function(data) {
				callLocationDetailsFill(formId, data)
			}
		});
	}
}

function callLocationAndSelectCountry(formId){
	return true;
}
function callLocationAndSelectCountryNewFill(formId, data){
	console.log('data :'+JSON.stringify(data))
	console.log('data.timezone '+data.timezone)
	if(formId=='userSignupForm'){
		if(data.timezone!='Asia/Kolkata'){
			$('#sendOTP').text('Proceed');
			if(window.location.search.indexOf('isa=Y')<0){
				if(window.location.search==''){
					window.location.href=window.location.origin+'/student/signup?isa=Y'
				}else{
					window.location.href=window.location.origin+'/student/signup'+window.location.search+'&isa=Y'
				}
			}
		}
	}
	if($('#'+formId+' #countryTimezoneId').length){
		$('#'+formId+' #countryTimezoneId').select2();
	}
	if(data!=undefined && data !=''){
		if($("#"+formId+" #countryTimezoneId").length){
			$('#countryTimezoneId').val(data.timezone).trigger('change')
		}
		if($("#"+formId+" #chooseDate").length){
			$("#"+formId+" #chooseDate").datepicker().datepicker("setDate", new Date());
		}
		if($("#"+formId+" #isdCodeMobileNo").length){
			chooseValueByElement('isdCodeMobileNo', data.country);
		}
		if($("#"+formId+" #isdCodeWhatsupNo").length){
			chooseValueByElement('isdCodeWhatsupNo', data.country);
		}
		if($("#"+formId+" #countryId").length){
			chooseCountryElement('countryId', data.country);
			$('#countryId').trigger('change');
		}	
		$("#"+formId+" #location").val(JSON.stringify(data));
		if($("#"+formId+"Alternet #location").length){
			$("#"+formId+"Alternet #location").val($("#"+formId+" #location").val());
		}
	}
}
function callLocationAndSelectCountryNew(formId){
	if(LOCATION_SERVICE_BYPASS=='true'){
		callLocationAndSelectCountryNewFill(formId, JSON.parse(DEFAULT_LOCATION))
	}else{
		$.ajax({
			global: false,
			type : "GET",
			url : PRO_IP_API_URL,
			success : function(data) {
				callLocationAndSelectCountryNewFill(formId, data)
			}
		});
	}
}

function callLocationAndSelectCountryNew1Fill(formId, type, data,meetingCheck){
	console.log('data :'+JSON.stringify(data))
	if($('#countryTimezoneId').length){
		//$('#countryTimezoneId').select2();
	}
	if(data!=undefined && data !=''){
		if($("#"+formId+" #isdCodeMobileNo").length){
			chooseValueByElement('isdCodeMobileNo', data.country);
		}
		if($("#"+formId+" #isdCodeWhatsupNo").length){
			chooseValueByElement('isdCodeWhatsupNo', data.country);
		}
		if($("#"+formId+" #countryId").length){
			chooseCountryElement('countryId', data.country);
		}
		//$('#countryTimezoneId').val(data.timezone).trigger('change')
		//$('#countryTimezoneId').val(null).trigger('change');//to become unselect
		if($("#"+formId+" #chooseDate").length){
			var startDate = new Date();
//			startDate.setDate(startDate.getDate()+1);
			startDate.setDate(startDate.getDate());
			$("#"+formId+" #chooseDate").datepicker().datepicker("setDate", startDate);
			freeslotsList(formId,true,type,meetingCheck)
		}else if($("#"+formId+" #newDateslected").length){
			var meetingDate=$("#"+formId+" #newDateslected").val();
			if(meetingDate!=null &&  meetingDate!=''){
				meetingDate=meetingDate.split('-');
				var selectedDate=new Date(meetingDate[1]+'/'+meetingDate[0]+'/'+meetingDate[2]);
				var selectedDate2 = selectedDate.toString().split(" ");
				$('#selectedMeetingDate').html("Select your preferred time on "+selectedDate2[0]+", "+selectedDate2[2]+" "+selectedDate2[1]);
			}	
			freeslotsList(formId,true,type,meetingCheck)
		}	
		$("#"+formId+" #location").val(JSON.stringify(data));
		if($("#"+formId+"Alternet #location").length){
			$("#"+formId+"Alternet #location").val($("#"+formId+" #location").val());
		}
//		if($("#"+formId+" #stateId").length){
//			getISDCodeByCityAndCountry('New Delhi', 'India', 'stateId', 'cityId');
//		}
		if($("#"+formId+" #cityId").length){
			getISDCodeByCityAndCountry(data.city, data.country, 'stateId', 'cityId');
		}
	}
}
function callLocationAndSelectCountryNew1(formId, type,meetingCheck){
	if(LOCATION_SERVICE_BYPASS=='true'){
		callLocationAndSelectCountryNew1Fill(formId, type, JSON.parse(DEFAULT_LOCATION),meetingCheck)
	}else{
		$.ajax({
			global: false,
			type : "GET",
			url : PRO_IP_API_URL,
			success : function(data) {
				callLocationAndSelectCountryNew1Fill(formId, type, data,meetingCheck)
			}
		});
	}
}

function callLocationAndSelectTimeZoneFill(formId, data){
	console.log('data :'+JSON.stringify(data))
	if($('#countryTimezoneId').length){
//		$('#countryTimezoneId').select2();
	}
	if(data!=undefined && data !=''){
		$('#countryTimezoneId').val(data.timezone).trigger('change')
		$("#"+formId+" #location").val(JSON.stringify(data));
	}
}

function callLocationAndSelectTimeZone(formId){
	if(LOCATION_SERVICE_BYPASS=='true'){
		callLocationAndSelectTimeZoneFill(formId, JSON.parse(DEFAULT_LOCATION))
	}else{
		$.ajax({
			global: false,
			type : "GET",
			url : PRO_IP_API_URL,
			success : function(data) {
				callLocationAndSelectTimeZoneFill(formId, data)
			}
		});
	}
}

function callLocationAndSelectDate(formId, type, examStartDate, examInterviewDiff){
	if(LOCATION_SERVICE_BYPASS=='true'){
		callLocationAndSelectDateFill(formId, type, JSON.parse(DEFAULT_LOCATION),examStartDate, examInterviewDiff)
	}else{
		$.ajax({
			global: false,
			type : "GET",
			url : PRO_IP_API_URL,
			success : function(data) {
				callLocationAndSelectDateFill(formId, type, data,examStartDate,examInterviewDiff)
			}
		});
	}
}

function callLocationAndSelectDateFill(formId, type, data, examStartDate,examInterviewDiff){

	if(data!=undefined && data !=''){
		console.log('callLocationAndSelectDateFillS :'+JSON.stringify(data))
		
		if($("#"+formId+" #chooseDate").length){
			var stDate=examStartDate;
			stDate=stDate.split('-');
			var availableDate=new Date(stDate[1]+'/'+stDate[0]+'/'+stDate[2]);
			stDate=availableDate;
			if(parseInt(examInterviewDiff)>0){
				stDate.setDate(stDate.getDate()+parseInt(examInterviewDiff));
			}
			console.log("stDate");
			var startDate = new Date();
			if(stDate>startDate){
				startDate=stDate;
			}
			startDate.setDate(startDate.getDate())
			$("#"+formId+" #chooseDate").datepicker().datepicker("setDate", startDate);
			freeslotsList(formId,true,type)
		}
		$("#"+formId+" #location").val(JSON.stringify(data));
	}
}

function callLocationAndSelectTimeZoneFillSession(formId, data){
	console.log('callLocationAndSelectTimeZoneFillSession data :'+JSON.stringify(data))
	if($("#"+formId+" #countryTimezoneId").length){
		$("#"+formId+" #countryTimezoneId").select2({
			theme: "bootstrap4",
			dropdownParent: $('#teacherMeetingSlotsModal')
		});
	}
	if(data!=undefined && data !=''){
		$("#"+formId+" #countryTimezoneId").val(data.timezone).trigger('change')
		$("#"+formId+" #location").val(JSON.stringify(data));
	}
}

function callLocationAndSelectTimeZoneSession(formId){
	if(LOCATION_SERVICE_BYPASS=='true'){
		callLocationAndSelectTimeZoneFillSession(formId, JSON.parse(DEFAULT_LOCATION))
	}else{
		$.ajax({
			global: false,
			type : "GET",
			url : PRO_IP_API_URL,
			success : function(data) {
				callLocationAndSelectTimeZoneFillSession(formId, data)
			}
		});
	}
}



