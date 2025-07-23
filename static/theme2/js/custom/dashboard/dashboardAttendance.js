$(document).ready(function() {
	console.log('inside dashboardAttendance.js');
});

function callStudentBatchAttendance(formId, userId) {
	console.log("callStudentBatchAttendance", userId);
	$.ajax({
			type : "POST",
			contentType : "application/json",
			url : getURLForHTML('dashboard', 'student-batch-attendance-list'),
			data : JSON.stringify(getRequestForStudentBatchAttendance(formId, userId)),
			dataType : 'json',
			cache : false,
			timeout : 600000,
			success : function(data) {
				if (data['status'] == '0' || data['status'] == '2') {
					showMessage(true, data['message']);
				} else {
					$("#stuBatchAttendence").html('');
					var month = [];
					var present =[];
					var apsent=[];
					var leave=[];
					var attendPer=[];
					var attendp=0;
					var attenda=0;
					var attendl=0;
					console.log(data['attendance']);
					
					if(data['attendance']!=null){
						
						var attendTable = '<table class="fixedtable month-name" >';
						attendTable = attendTable + '<thead class="student-h-scroll-view"><tr>';
						var headerWise = data['attendance']['header'];
						for(m=0;m<headerWise.length;m++){
							attendTable = attendTable + '<th class="headcol"><div class="h_scroll"><img src="'+PATH_FOLDER_IMAGE2+'h_scroll.png"></div></th>';
							var headerDetails = headerWise[m]['details'];
							for(md=0;md<headerDetails.length;md++){
								attendTable = attendTable + '<th class="headcol">'+headerDetails[md]['day']+'</th>';
							}
						}
						attendTable = attendTable + '</tr></thead>';
						attendTable = attendTable + '<tbody><tr>';
						var monthWise = data['attendance']['monthWise'];
						//monthWise = sortJSON(monthWise,'day', '123');
						for(m=0;m<monthWise.length;m++){
							var mnt =  ""+monthWise[m]["entityName"]+"";
							month.push(mnt);
							present.push(monthWise[m]['presentInt']);
							apsent.push(monthWise[m]['apsentInt']);
							leave.push(monthWise[m]['leaveInt']);
							attendp = attendp+monthWise[m]['presentInt'];
							attenda = attenda+monthWise[m]['apsentInt'];
							attendl = attendl+monthWise[m]['leaveInt'];

							attendTable = attendTable + '<th class="headcol" style="padding:0px !important; text-align:center">'+monthWise[m]['entityName']+'</th>';
							var monthDetails = monthWise[m]['details'];
							for(md=0;md<monthDetails.length;md++){
								attendTable = attendTable + '<td class="long"><div class="text-center jvectormap-legend-cnt-v ">';
								if(monthDetails[md]['attendance']=='P'){
									attendTable = attendTable + "<a href=\"javascript:void(0);\" onClick=\"callStudentBatchAttendanceDateWise('','"+monthDetails[md]['attendanceDate']+"','"+userId+"','"+monthWise[m]['entityRole']+"','"+monthWise[m]['subjectId']+"');\" class=\"circle-icon "+monthDetails[md]['attendanceClass']+"\"><b>"+monthDetails[md]['attendance']+"</b></a>";
									//attendTable = attendTable + "<span class=\"circle-icon "+monthDetails[md]['attendanceClass']+"\"> "+monthDetails[md]['attendance']+"</span>";
								}else{
									attendTable = attendTable + "<span class=\"circle-icon "+monthDetails[md]['attendanceClass']+"\"> "+monthDetails[md]['attendance']+"</span>";
								}
								attendTable = attendTable + '</div></td>';
							}
							attendTable = attendTable + '</tr><tr>';
						}
						attendTable = attendTable + '</tbody>';
						attendTable = attendTable +'</table>';
					}

					
					$("#stuBatchAttendence").html(attendTable);
					getLinChartAttendance(month, present, apsent, leave, "chart-apex-column");
					attendPer.push(attendp);
					attendPer.push(attenda);
					attendPer.push(attendl);
					getAttendPercentWise(attendPer, "chartPer");
				}
			},
				error : function(e) {
					console.log(e);
				}
			});
}
function getRequestForStudentBatchAttendance(formId, userId) {
	var request = {};
	var authentication = {};
	var requestData = {};
	var attendanceFilterRequest = {};
	attendanceFilterRequest['userId'] =userId;
	attendanceFilterRequest['schoolId'] = SCHOOL_ID;
	requestData['attendanceFilterRequest'] = attendanceFilterRequest;

	authentication['hash'] = getHash();
	authentication['schoolId'] = SCHOOL_ID;
	authentication['schoolUUID'] = SCHOOL_UUID;
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	return request;
}


function getHash() {
	return 'ajslfkjalksdf'
}

function getLinChartAttendance(month, present, apsent, leave, chartId){

	var columnChart = {
			series: [
			   {
			   name: 'Present',
			   data: present
			 },
			 {
			   name: 'Absent',
			   data: apsent
			  }, 
			 {
			   name: 'Leave',
			   data: leave
			 }
		  ],
			chart: {
			type: 'bar',
			height: 350
		  },
		  colors: ['#3ac47d', '#ff4560', '#f7ab19'],
		  plotOptions: {
			bar: {
			  horizontal: false,
			  columnWidth: '55%',
			  endingShape: 'rounded'
			},
		  },
  
		  dataLabels: {
			enabled: false,
		   },
		  stroke: {
			show: true,
			width: 2,
			colors: ['transparent']
		  },
		  xaxis: {
			categories: month,
		  },
		  yaxis: {
			title:false,
		  },
		  fill: {
			opacity: 1
		  },
		  tooltip: {
			y: {
			  formatter: function (val) {
				return val 
			  }
			}
		  }
		  };
  
		  var chart = new ApexCharts(document.querySelector("#"+chartId), columnChart);
		  chart.render();
  }

  function getAttendPercentWise(presentPer, chartId){
	var options = {
			series: presentPer,
			chart: {
			 height:250,
			type: 'donut',
		  },
		  labels: ["Present","Absent", "Leave"],
		  colors: ['#3ac47d', '#ff4560', '#f7ab19'],
		  responsive: [{
			breakpoint: 480,
			options: {
			  chart: {
				width: 300,
				height:250
			  },
			  legend: {
				show: false,
				position: 'bottom'
			  }
			}
		  }]
		  };
  
		  var chart = new ApexCharts(document.querySelector("#"+chartId), options);
		  chart.render();
  }

  function sortJSON(arr, key, way) {
    return arr.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        if (way === '123') { return ((x < y) ? -1 : ((x > y) ? 1 : 0)); }
        if (way === '321') { return ((x > y) ? -1 : ((x < y) ? 1 : 0)); }
    });
}

function callStudentBatchAttendanceDateWise(formId, todaydate, userId, userRole, subjectId) {
	console.log("callStudentBatchAttendance", userId);
	$.ajax({
			type : "POST",
			contentType : "application/json",
			url : getURLForHTML('dashboard', 'student-batch-attendance-daywise'),
			data : JSON.stringify(getRequestForAttendanceFilterDate(formId,todaydate, userId, userRole, subjectId)),
			dataType : 'json',
			cache : false,
			timeout : 600000,
			success : function(data) {
				if (data['status'] == '0' || data['status'] == '2') {
					showMessage(true, data['message']);
				} else {
					$("#attendanceCourseDayWise").html('');
					console.log(data['attendance']);
					var monthWise = data['attendance']['monthWise'];
					monthWise = sortJSON(monthWise,'day', '123');
					if(monthWise!=null){
						var attendTable = '<table class="table table-striped table-bordered">';
						attendTable = attendTable + '<thead><tr>';
						attendTable = attendTable + '<th>S.N.</th>';
						attendTable = attendTable + '<th>Subject Name</th>';
						attendTable = attendTable + '<th>Joining Date</th>';
						attendTable = attendTable + '<th>Joining Time</th>';
						attendTable = attendTable + ' <th>Leaving Time</th>';
						attendTable = attendTable + '<th>Total Duration<br/>HH:MM:SS</th>';
						attendTable = attendTable + '</tr></thead><tbody >';
						for(ms=0;ms<monthWise.length;ms++){
							var monthDetails = monthWise[ms]['details'];
							var inc=1;
							for(mds=0;mds<monthDetails.length;mds++){
								attendTable = attendTable + '<tr>'
								attendTable = attendTable + '<td>'+inc+'</td>';
								attendTable = attendTable + '<td>'+monthDetails[mds]['attendance']+'</td>';
								attendTable = attendTable + '<td>'+monthDetails[mds]['attendanceDate']+'</td>';
								attendTable = attendTable + '<td>'+monthDetails[mds]['attendanceJoinTime']+'</td>';
								if(monthDetails[mds]['attendanceLeaveTime']!=undefined){
									attendTable = attendTable + '<td>'+monthDetails[mds]['attendanceLeaveTime']+'</td>';
								}else{
									attendTable = attendTable + '<td>-</td>';
								}
								attendTable = attendTable + '<td>'+monthDetails[mds]['attendanceDuration']+'</td>';
								attendTable = attendTable + '</tr>';
								inc=inc+1;
							}
						}
						var tad='<tr><td colspan="5" align="right"><b>Total</b></td><td><b>'+data['attendance']['totalDayAttendanceDuration']+'</b></td></tr>';
						
						attendTable = attendTable +tad+ '</tbody> </table>';
					}
					
					$("#attendanceCourseDayWise").html(attendTable);
				}
			},
				error : function(e) {
					console.log(e);
				}
			});
}


function getRequestForAttendanceFilterDate(formId, todaydate, userId, userRole, subjectId) {
	var request = {};
	var authentication = {};
	var requestData = {};
	var attendanceFilterRequest = {};
	attendanceFilterRequest['attendanceStartDate']=todaydate;
	attendanceFilterRequest['attendanceEndDate']=todaydate;
	attendanceFilterRequest['attendanceTodayDate']=todaydate;
	attendanceFilterRequest['attendaceFor']=userRole;
	attendanceFilterRequest['subjectId']=subjectId;
	
	attendanceFilterRequest['userId'] =userId;
	attendanceFilterRequest['schoolId'] = SCHOOL_ID;
	requestData['attendanceFilterRequest'] = attendanceFilterRequest;

	authentication['hash'] = getHash();
	authentication['schoolId'] = SCHOOL_ID;
	authentication['schoolUUID'] = SCHOOL_UUID;
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	return request;
}

function callBatchAttendanceFilter(formId, userId, selectDate, attendaceFor, dateType) {
	var subjectWise = "N";
	if($("#"+formId+" #subjectWiseCheck").is(":checked")){
		subjectWise ="Y";
	}
	console.log("subjectWise ",subjectWise);
	$.ajax({
			type : "POST",
			contentType : "application/json",
			url : getURLForHTML('dashboard', 'batch-attendance-by-filter'),
			data : JSON.stringify(getRequestForBatchAttendanceFilter(formId, userId, selectDate, attendaceFor, dateType)),
			dataType : 'json',
			cache : false,
			timeout : 600000,
			success : function(data) {
				if (data['status'] == '0' || data['status'] == '2') {
					showMessage(true, data['message']);
				} else {
					$("#bachAttendanceReport").html('');
					console.log(data['attendance']);
					
					if(data['attendance']!=null){
						var attendTable = '<table class="fixedtable month-name" >';
						$('.month-name').html(data['attendance']['entityName']);
						$('#nextDate').val(data['attendance']['nextDate']);
						$('#prevDate').val(data['attendance']['preDate']);
						$('#seletDateType').val(data['attendance']['dataType']);
						$('#dataFrom').val(data['attendance']['dataFrom']);
						
						attendTable = attendTable + '<thead class="admin-h-scroll-view"><tr>';
						var headerWise = data['attendance']['header'];
						for(m=0;m<headerWise.length;m++){
							attendTable = attendTable + '<th class="headcol"><div class="h_scroll"><img src="'+PATH_FOLDER_IMAGE2+'h_scroll.png"></div></th>';
							var headerDetails = headerWise[m]['details'];
							for(md=0;md<headerDetails.length;md++){
								attendTable = attendTable + '<th class="headcol"><div><b class="full">'+headerDetails[md]['weekday']+'</b><b class="full">'+headerDetails[md]['day']+'</b></div></th>';
							}
						}
						attendTable = attendTable + '</tr></thead>';
						attendTable = attendTable + '<tbody><tr>';
						var monthWise = data['attendance']['monthWise'];
						if(monthWise!=null){
							//monthWise = sortJSON(monthWise,'day', '123');
							for(m=0;m<monthWise.length;m++){
								var mnt =  ""+monthWise[m]["entityName"]+"";
								//0434d8d5-c7c1-406a-ba80-78952775fe31/dashboard/get-student-attendance?moduleId=144
								var url=APP_BASE_URL+UNIQUEUUID+'/dashboard/get-student-attendance?moduleId='+moduleId+'&userId='+monthWise[m]['entityId']
								var attendanceLink = '<a target="_bleank" href="'+url+'">'+monthWise[m]['entityName']+'</a>'
								var subjectName = monthWise[m]['subjectName']==null?'':monthWise[m]['subjectName'];
								//attendTable = attendTable + '<th class="headcol" style="padding:0px !important; text-align:center">'+'<table>'+'<tr>'+ '<td>'+monthWise[m]['entityName']+'</td>'+ '<td>'+monthWise[m]['batchName']+'</td>'+ '<td>'+monthWise[m]['subjectName']+'</td>' +'</tr>'+'</table>'+'</th>';
								attendTable = attendTable + '<th class="headcol" style="padding:0px !important; text-align:center;min-width:200px;">'+'<table>'+'<tr>'+ '<td>'+attendanceLink + '</br>'+ monthWise[m]['batchName']+'</br>'+subjectName+'</td>'+'</table>'+'</th>';
								var monthDetails = monthWise[m]['details'];
								for(md=0;md<monthDetails.length;md++){
									attendTable = attendTable + '<td class="long">';
									if(subjectWise=='Y'){
										attendTable = attendTable + '<div class="text-center jvectormap-legend-cnt-v ">';
										if(monthDetails[md]['attendance']=='P'){
											attendTable = attendTable + "<a href=\"javascript:void(0);\" onClick=\"callStudentBatchAttendanceDateWise('','"+monthDetails[md]['attendanceDate']+"','"+monthWise[m]['entityId']+"','"+monthWise[m]['entityRole']+"','"+monthWise[m]['subjectId']+"');\" class=\"circle-icon "+monthDetails[md]['attendanceClass']+"\"><span data-tooltip=\"Join Time: "+monthDetails[md]['attendanceJoinTime']+"  Leave Time: "+monthDetails[md]['attendanceLeaveTime']+" Duration: "+monthDetails[md]['attendanceDuration']+" Total Duration: "+monthDetails[md]['totalAttendanceDuration']+"\" data-tooltip-position=\"top\">"+monthDetails[md]['attendance']+"</span></a>";
										}else{
											attendTable = attendTable + "<span class=\"circle-icon "+monthDetails[md]['attendanceClass']+"\"> "+monthDetails[md]['attendance']+"</span>";
										}
										attendTable = attendTable + '</div>';
									}else{
										// if(monthDetails[md]['totalAttendanceDuration']=='00:00:00' 
										// ||monthDetails[md]['totalAttendanceDuration']==null){
										// 	attendTable = attendTable + '-';
										// }else{
										// 	attendTable = attendTable + monthDetails[md]['totalAttendanceDuration'];
										// }
										if(monthDetails[md]['attendance']=='P'){
											attendTable = attendTable + monthDetails[md]['totalAttendanceDuration'];
										}else{
											attendTable = attendTable + '-';
										}
										
									}
									
									attendTable = attendTable + '</td>';
								}
								attendTable = attendTable + '</tr><tr>';
							}
							attendTable = attendTable + '</tbody>';
						}	
						attendTable = attendTable +'</table>';
					}
					$('#attendanceAdvanceSearch').modal('hide');
					$("#bachAttendanceReport").html(attendTable);
				}
			},
				error : function(e) {
					console.log(e);
				}
			});
}
function getRequestForBatchAttendanceFilter(formId, userId, selectDate, attendaceFor, dateType) {
	var request = {};
	var authentication = {};
	var requestData = {};
	var attendanceFilterRequest = {};
	// if($("#seletDateType").val()!=''){
	// 	dateType = $("#seletDateType").val();
	// }
	if(selectDate!=''){
		attendanceFilterRequest['attendanceTodayDate'] =selectDate;
	}
	attendanceFilterRequest['attendaceFor']=attendaceFor.toString();

	var standards = $("#"+formId+" #standardId").val();
	attendanceFilterRequest['standardIdString']=standards.toString();

	var batchs = $("#"+formId+" #batchId").val();
	attendanceFilterRequest['batchIdString']=batchs.toString();
	
	var subjectIdss = $("#"+formId+" #subjectIds").val();
	attendanceFilterRequest['subjectIdString']=subjectIdss.toString();

	var studentIds = $("#"+formId+" #studentId").val();
	attendanceFilterRequest['entityIdString']=studentIds.toString();
	if($("#"+formId+" #subjectWiseCheck").is(":checked")){
		attendanceFilterRequest['subjectWise']='Y';
	}else{
		attendanceFilterRequest['subjectWise']='N';
	}
	

	// if($("#"+formId+" #attenStartDateSearch").val()!=''){
	// 	var strtDate = $("#"+formId+" #attenStartDateSearch").val().toString().split("-");
	// 	var stDate = strtDate[2]+'-'+strtDate[1]+'-'+strtDate[0];
	// 	attendanceFilterRequest['attendanceStartDate']=stDate;
	// }
	// if($("#"+formId+" #attenEndDateSearch").val()!=''){
	// 	var endDate = $("#"+formId+" #attenEndDateSearch").val().toString().split("-");
	// 	var enDate = endDate[2]+'-'+endDate[1]+'-'+endDate[0];
	// 	attendanceFilterRequest['attendanceEndDate']=enDate;
	// }
	// if($("#"+formId+" #attenStartDateSearch").val()!=''){
	// 	var strtDate = $("#"+formId+" #attenStartDateSearch").val().toString().split("-");
	// 	var stDate = strtDate[2]+'-'+strtDate[1]+'-'+strtDate[0];
	// 	attendanceFilterRequest['attendanceTodayDate']=stDate;
	// }
	

	attendanceFilterRequest['selectDateType'] =dateType;
	attendanceFilterRequest['userId'] =userId;
	attendanceFilterRequest['schoolId'] = SCHOOL_ID;
	requestData['attendanceFilterRequest'] = attendanceFilterRequest;

	authentication['hash'] = getHash();
	authentication['schoolId'] = SCHOOL_ID;
	authentication['schoolUUID'] = SCHOOL_UUID;
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	return request;
}

function callSubjectNameMultipleList(formId, value, userId, userRole, dataType ) {
	
	$.ajax({
			type : "POST",
			contentType : "application/json",
			url : getURLForCommon('masters'),
			data : JSON.stringify(getRequestForMaster('formId','SUBJECT-NAME-LIST-BASED-ON-BATCHES',userId,'',userRole, dataType, value)),
			dataType : 'json',
			cache : false,
			timeout : 600000,
			async : false,
			success : function(data) {
				if (data['status'] == '0' || data['status'] == '2') {
					showMessage(true, data['message']);
				} else {
					var result = data['mastersData']['courseList'];
					var dropdown = $("#"+formId+" #subjectIds");
					dropdown.html('');
					$.each(result, function(k, v) {
						dropdown.append('<option value="' + v.key + '">'
								+ v.value + ' </option>');
					});
				}
			},
				error : function(e) {
					console.log(e);
				}
			});
}

function advanceAttendSearchReset(formId){
	customLoader(true);
	$('#' + formId)[0].reset();
	$("#"+formId+" #attendanceFor").val('0').trigger('change');
	$("#"+formId+" #standardId").val('').trigger('change');
	$("#"+formId+" #batchId").val('').trigger('change');
	$("#"+formId+" #subjectIds").val('').trigger('change');
	$("#"+formId+" #studentId").val('').trigger('change');
	// $("#"+formId+" #attenStartDateSearch").val('');
	// $("#"+formId+" #attenEndDateSearch").val('');
	customLoader(false);
}