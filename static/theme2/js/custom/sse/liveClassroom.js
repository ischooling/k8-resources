function getLiveClassroom(){
    var standardId=$('#standardId').val();
    if(standardId==''){
        standardId=0;
    }
    var date = $('#dateForLiveAttendance').val();
    var dateForLiveAttendance = new Date(date)
    var dayId = dateForLiveAttendance.getDay()+1;
    $.ajax({
        type : "GET",
        contentType : "application/json",
        url : getURLForHTML('dashboard','live-classroom-details'+"/"+SCHOOL_ID+'/'+dayId+'/'+standardId),
        dataType : 'json',
        success : function(data) {
            if (data['status'] == '0' || data['status'] == '2'|| data['status'] == '3') {
                if(data['status'] == '3'){
                    redirectLoginPage();
                }else{
                    if(tt=='theme2'){
                        showMessageTheme2(2, data['message'],'',true);
                    }else if(tt=='theme1'){
                        showMessage(true, data['message']);
                    }
                }
                $('#liveClassroomsDiv').html('');
            }else {
                var html=getLiveClassrommTime(data);
                $('#liveClassroomsDiv').html(html);
            }
        },
        error : function(e) {
            if(tt=='theme2'){
                showMessageTheme2(2, TECHNICAL_GLITCH,'',true);
            }else if(tt=='theme1'){
                showMessage(true, TECHNICAL_GLITCH);
            }
        }
    });
}

function getLiveClassroomAttendance(schoolId,entityType,entityId,dayId){
    $.ajax({
        type : "GET",
        contentType : "application/json",
        url : getURLForHTML('dashboard','live-classroom-attendance'+"/"+schoolId+'/'+entityType+'/'+entityId+'/'+dayId),
        dataType : 'json',
        success : function(data) {
            if (data['status'] == '0' || data['status'] == '2'|| data['status'] == '3') {
                if(data['status'] == '3'){
                    redirectLoginPage();
                }else{
                    if(tt=='theme2'){
                        showMessageTheme2(2, data['message'],'',true);
                    }else if(tt=='theme1'){
                        showMessage(true, data['message']);
                    }
                }
                $('#attendanceBody').html('');
            }else {
                var html=attendanceBody(data);
                $('#attendanceBody').html(html);
            }
        },
        error : function(e) {
            if(tt=='theme2'){
                showMessageTheme2(2, TECHNICAL_GLITCH,'',true);
            }else if(tt=='theme1'){
                showMessage(true, TECHNICAL_GLITCH);
            }
        }
    });
}

const showAttendanceDetailsModal = (hostEmail,hostName,entityType,entityId) => {
    $.ajax({
        type : "GET",
        contentType : "application/json",
        url : getURLForHTML('dashboard','live-classroom-attendance'+'?hostEmail='+hostEmail+'&hostName='+hostName+'&entityType='+entityType+'&entityId='+entityId),
        dataType : 'json',
        success : function(data) {
            if (data['status'] == '0' || data['status'] == '2'|| data['status'] == '3') {
                if(data['status'] == '3'){
                    redirectLoginPage();
                }else{
                    if(tt=='theme2'){
                        showMessageTheme2(2, data['message'],'',true);
                    }else if(tt=='theme1'){
                        showMessage(true, data['message']);
                    }
                }
                $('#attendanceBody').html('')
            }else {
                $('#attendanceBody').html(liveClassroomAttendanceContent(data))
                $("#attendanceModal").modal({backdrop: 'static', keyboard: false});
               
            }
        },
        error : function(e) {
            if(tt=='theme2'){
                showMessageTheme2(2, TECHNICAL_GLITCH,'',true);
            }else if(tt=='theme1'){
                showMessage(true, TECHNICAL_GLITCH);
            }
        }
    });
}

function copyLink(src) {
    var copyURL = $(src).attr('value');
    var https = copyURL.split(":")[0];
    var textarea = document.createElement("textarea");
    if(copyURL.length>0 || https === "https"){
        textarea.textContent = copyURL;
        textarea.style.position = "fixed"; // Prevent scrolling to bottom of page in MS Edge.
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        $(src).parent().find(".copy-msg").removeClass("text-danger")
        $(src).parent().find(".copy-msg").addClass("text-success").text("Link copied!"),
        setTimeout(function(){
            $(src).parent().find(".copy-msg").text("")
        }, 3000) 
        document.body.removeChild(textarea);
    }else{
        copyURL = "Link Not Found";
        textarea.textContent = copyURL;
        textarea.style.position = "fixed"; // Prevent scrolling to bottom of page in MS Edge.
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        $(src).parent().find(".copy-msg").removeClass("text-danger")
        $(src).parent().find(".copy-msg").addClass("text-danger").text("Invalid Link"),
        setTimeout(function(){
            $(src).parent().find(".copy-msg").text("")
        }, 3000) 
    }
}

function getLiveClass(){
    $.ajax({
        type : "GET",
        contentType : "application/json",
        url : getURLForHTML('dashboard','today-class/'+"/"+SCHOOL_ID),
        dataType : 'json',
        success : function(data) {
            if (data['status'] == '0' || data['status'] == '2'|| data['status'] == '3') {
                if(data['status'] == '3'){
                    redirectLoginPage();
                }else{
                    if(tt=='theme2'){
                        showMessageTheme2(2, data['message'],'',true);
                    }else if(tt=='theme1'){
                        showMessage(true, data['message']);
                    }
                }
            }else {
                getLiveClassChart(data);
            }
        },
        error : function(e) {
            if(tt=='theme2'){
                showMessageTheme2(2, TECHNICAL_GLITCH,'',true);
            }else if(tt=='theme1'){
                showMessage(true, TECHNICAL_GLITCH);
            }
        }
    });
}

function getLiveClassChart(data){
    var batchtime=[];
    var totalClass=[];
    var totalStudent=[];
    var totalTeacher=[];
    var liveClass=[];
    var offClass=[];
    var liveStudent=[];
    var offStudent=[];
    var liveTeacher=[];
    var offTeacher=[];
    for(var i=0;i<data.liveClassrooms.length;i++)
    {
        var classLive = data.liveClassrooms[i];
        batchtime.push(classLive.startTime+'-'+classLive.endTime);
        totalClass.push(classLive.totalClass);
        totalStudent.push(classLive.totalStudent);
        totalTeacher.push(classLive.totalTeacher);
        liveClass.push(classLive.liveClass);
        offClass.push(classLive.offClass);
        liveStudent.push(classLive.liveStudent);
        offStudent.push(classLive.offStudent);
        liveTeacher.push(classLive.liveTeacher);
        offTeacher.push(classLive.offTeacher);
    }    
    var options = {
        series: [{
        name: 'Total Class',
        data: totalClass
      }, {
        name: 'Live Class',
        data: liveClass
      }, {
        name: 'Off Class',
        data: offClass
      }, {
        name: 'Offline Student',
        data: offStudent
      },{
        name: 'Live Student',
        data: liveStudent
      }],
        chart: {
        type: 'bar',
        height: 350,
        stacked: true,
      },
      plotOptions: {
        bar: {
          horizontal: true,
          dataLabels: {
            total: {
              enabled: false,
              offsetX: 0,
              style: {
                fontSize: '13px',
                fontWeight: 900
              }
            }
          }
        },
      },
      stroke: {
        width: 1,
        colors: ['#fff']
      },
      // title: {
      //   text: 'Fiction Books Sales'
      // },
      xaxis: {
        categories: batchtime,
        labels: {
          formatter: function (val) {
            return val + ""
          }
        }
      },
      yaxis: {
        title: {
          text: undefined
        },
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + ""
          }
        }
      },
      fill: {
        opacity: 1
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left',
        offsetX: 20
      }
      };

      var chart = new ApexCharts(document.querySelector("#total-class-chart"), options);
      chart.render();

}

function getClassNowRun(){
    $.ajax({
        type : "GET",
        contentType : "application/json",
        url : getURLForHTML('dashboard','current-class'+"/"+SCHOOL_ID),
        dataType : 'json',
        success : function(data) {
            if (data['status'] == '0' || data['status'] == '2'|| data['status'] == '3') {
                if(data['status'] == '3'){
                    redirectLoginPage();
                }else{
                    if(tt=='theme2'){
                        //showMessageTheme2(2, data['message'],'',true);
                        $("#current-class-chart").html("No live class now")
                    }else if(tt=='theme1'){
                        showMessage(true, data['message']);
                    }
                }
            }else {
                    getNowRunClassChart(data);
                
            }
        },
        error : function(e) {
            if(tt=='theme2'){
                showMessageTheme2(2, TECHNICAL_GLITCH,'',true);
            }else if(tt=='theme1'){
                showMessage(true, TECHNICAL_GLITCH);
            }
        }
    });
}

function getNowRunClassChart(data){
    var batchName=[];
    var batchtime=[];
    var totalClass=[];
    var totalStudent=[];
    var totalTeacher=[];
    var liveClass=[];
    var offClass=[];
    var liveStudent=[];
    var offStudent=[];
    var liveTeacher=[];
    var offTeacher=[];
    for(var i=0;i<data.liveClassrooms.length;i++)
    {
        var classLive = data.liveClassrooms[i];
        batchtime.push(classLive.startTime+'-'+classLive.endTime);
        totalClass.push(classLive.totalClass);
        totalStudent.push(classLive.totalStudent);
        totalTeacher.push(classLive.totalTeacher);
        liveClass.push(classLive.liveClass);
        offClass.push(classLive.offClass);
        liveStudent.push(classLive.liveStudent);
        offStudent.push(classLive.offStudent);
        liveTeacher.push(classLive.liveTeacher);
        offTeacher.push(classLive.offTeacher);
        batchName.push(classLive.batchName)
    }    
    //console.log(batchtime);
    var options = {
        series: [{
        name: 'Total Class',
        data: totalClass
      }, {
        name: 'Live Class',
        data: liveClass
      }, {
        name: 'Off Class',
        data: offClass
      }, {
        name: 'Offline Student',
        data: offStudent
      },{
        name: 'Live Student',
        data: liveStudent
      }],
        chart: {
        type: 'bar',
        height: 350,
        stacked: true,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          dataLabels: {
            total: {
              enabled: false,
              offsetX: 0,
              style: {
                fontSize: '13px',
                fontWeight: 900
              }
            }
          }
        },
      },
      stroke: {
        width: 1,
        colors: ['#fff']
      },
      // title: {
      //   text: 'Fiction Books Sales'
      // },
      xaxis: {
        categories: batchName,
        labels: {
          formatter: function (val) {
            return val + ""
          }
        }
      },
      yaxis: {
        title: {
          text: undefined
        },
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + ""
          }
        }
      },
      fill: {
        opacity: 1
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left',
        offsetX: 20
      }
      };

      var chart = new ApexCharts(document.querySelector("#current-class-chart"), options);
      chart.render();

}

function getCurrentClassLive(){
  customLoader(true);

  $.ajax({
      type : "GET",
      contentType : "application/json",
      url : getURLForHTML('dashboard','live-class'+"/"+SCHOOL_ID),
      dataType : 'json',
      success : function(data) {
         // console.log(data.liveClassrooms);
          if (data['status'] == '0' || data['status'] == '2'|| data['status'] == '3') {
              if(data['status'] == '3'){
                  redirectLoginPage();
              }else{
                  if(tt=='theme2'){
                      //showMessageTheme2(2, data['message'],'',true);
                     $("#live-class-now").html("No live class now")
                  }else if(tt=='theme1'){
                      showMessage(true, data['message']);
                  }
              }
              customLoader(false);
          }else {
              var liveTbl= liveClassTable(data.liveClassrooms);
              $('#live-class-now').html(liveTbl);
              customLoader(false);
              setTimeout(getColleps(), 5000);
          }
      },
      error : function(e) {
        customLoader(false);
          if(tt=='theme2'){
              showMessageTheme2(2, TECHNICAL_GLITCH,'',true);
          }else if(tt=='theme1'){
              showMessage(true, TECHNICAL_GLITCH);
          }
      }
  });
}

function liveClassTable(classes ){
  console.log(classes);
    $(".totalLiveClass").html('<b>'+classes.length+'<b/>');
    var htmlTbl ='';
    // htmlTbl='<table class="table row-height-small table-bordered table-hover text-center">'
    // +'<thead>'
    // +'<tr class="bg-primary">'
    // +'<th class="text-white"><b>#</b></th>'
    // +'<th class="text-white"><b>Class Time</b></th>'
    // +'<th class="text-white"><b>Meeting Id</b></th>'
    // +'<th class="text-white"><b>Grade</b></th>'
    // +'<th class="text-white"><b>Subject</b></th>'
    // +'<th class="text-white"><b>Student</b></th>'
    // +'<th class="text-white"><b>Teacher</b></th>'

    // +'</tr></thead><tbody>';
    // var a=1;
    // for(md=0;md<classes.length;md++){
    //   var cssatt =  classes[md]['liveClass']==0?'badge-danger':'badge-success';
    //   var csstext =  classes[md]['liveClass']==0?'Offline':'Live';
    //   var cssattstd =  classes[md]['liveStudent']==0?'badge-danger':'badge-success';
    //   var csstextstd =  classes[md]['liveStudent']==0?'Offline':'Live';
    //   var cssattteach =  classes[md]['liveTeacher']==0?'badge-danger':'badge-success';
    //   var csstexteach =  classes[md]['liveTeacher']==0?'Offline':'Live';
    //   var meetingtype='';
    //   if(classes[md]['meetingType']=='OFFLINE_MEETING'){
    //     meetingtype = "Teacher Created Link ";
    //   }else if(classes[md]['meetingType']=='BATCH_TEACHER_MAPPING'){
    //     meetingtype = "Group Learning ";
    //   }else if(classes[md]['meetingType']=='MEETINGS'){
    //     meetingtype = "1:1 ";
    //   }else if(classes[md]['meetingType']=='RECURRING_CLASS'){
    //     meetingtype = "1:1 ";
    //   }
    //   htmlTbl+='<tr class="livecl-'+classes[md]['meetingid']+'">'
    //   +'<td class="text-dark">'+(a++)+'</td>'
    //   +'<td class="text-dark">'+classes[md]['startTime']+'-'+classes[md]['endTime']+'</td>'
    //   +'<td class="text-dark"><a href="'+classes[md]['meetingUrl']+'" target="_blank"> '+classes[md]['meetingid']+'</td>'
    //   +'<td class="text-dark text-left">'+classes[md]['grade']+'</td>'
    //   +'<td class="text-dark text-left"><div class="badge '+cssatt+' ml-2">'+csstext+'</div> '+meetingtype+'-'+classes[md]['subjectName']+'</td>'
    //   +'<td class="text-dark text-left"><div class="badge '+cssattstd+' ml-2">'+csstextstd+'</div> '+classes[md]['studName']+'</td>'
    //   +'<td class="text-dark text-left"><div class="badge '+cssattteach+' ml-2">'+csstexteach+'</div> '+classes[md]['teachName']+'</td>'
    //   +'</tr>';
    // }
    // htmlTbl+='</tbody>';


// var a=1;    
// for(md=0;md<classes.length;md++){
//       var cssatt =  classes[md]['liveClass']==0?'badge-danger':'badge-success';
//       var csstext =  classes[md]['liveClass']==0?'Offline':'Live';
//       var cssshow ="";

//       var meetingtype='';
//       if(classes[md]['meetingType']=='OFFLINE_MEETING'){
//         meetingtype = "Teacher Created Link ";
//       }else if(classes[md]['meetingType']=='BATCH_TEACHER_MAPPING'){
//         meetingtype = "Group Learning ";
//       }else if(classes[md]['meetingType']=='MEETINGS'){
//         meetingtype = "1:1 ";
//       }else if(classes[md]['meetingType']=='RECURRING_CLASS'){
//         meetingtype = "1:1 ";
//       }
//       var areaExp = "false";
//       if(a==1){
//         areaExp = "true";
//       }
      
//       htmlTbl+='<div class="card"><div id="heading'+a+'" class="card-header">';
//       htmlTbl+='<span  data-toggle="collapse" data-target="#collapse'+a+'" aria-expanded="'+areaExp+'" aria-controls="collapseT'+a+'" class="text-left m-0 p-0 btn btn-link btn-block">';
//       htmlTbl+='<table class="table row-height-small table-bordered text-center">';
//       htmlTbl+='<tr class="livecl-'+classes[md]['meetingid']+'">'
//         +'<td class="text-dark">'+(a)+'</td>'
//         +'<td class="text-dark">'+classes[md]['startTime']+'-'+classes[md]['endTime']+'</td>'
//         +'<td class="text-dark"><a href="'+classes[md]['meetingUrl']+'" target="_blank"> '+classes[md]['meetingid']+'</td>'
//         +'<td class="text-dark text-left">'+classes[md]['grade']+'</td>'
//         +'<td class="text-dark text-left"><div class="badge '+cssatt+' ml-2">'+csstext+'</div> '+meetingtype+'-'+classes[md]['subjectName']+'</td>'
        
//         +'</tr>';
//     htmlTbl+='</tbody>';
//     htmlTbl+='</table>';
//     htmlTbl+='</span></div>';
//     if(a==1){
//       htmlTbl+='<div data-parent="#accordion" id="collapse'+a+'" aria-labelledby="heading'+a+'" class="collapse show"><div class="card-body">';
//     }else{
//       htmlTbl+='<div data-parent="#accordion" id="collapse'+a+'"  class="collapse"><div class="card-body">';
//     }
//     htmlTbl+='<table class="table row-height-small table-bordered table-hover text-center">'
//     +'<thead>'
//     +'<tr class="bg-primary">'
//     +'<th class="text-white"><b>Student</b></th>'
//     +'<th class="text-white"><b>Teacher</b></th>'
//     +'</tr></thead><tbody>';
//     var b=0;
//     var clsStud=classes[md]['liveClassStudent'];
    //console.log(clsStud);
    // for(rw=0;rw<clsStud.length;rw++){
    //   var cssattstd =  clsStud[rw]['liveStudent']==0?'badge-danger':'badge-success';
    //   var csstextstd =  clsStud[rw]['liveStudent']==0?'Offline':'Live';
    //   var cssattteach =  clsStud[rw]['liveTeacher']==0?'badge-danger':'badge-success';
    //   var csstexteach =  clsStud[rw]['liveTeacher']==0?'Offline':'Live';
    //   htmlTbl+='<tr class="livecl-'+clsStud[rw]['meetingid']+'">'
    //   +'<td class="text-dark">'+(a++)+'</td>'
    //   +'<td class="text-dark text-left"><div class="badge '+cssattstd+' ml-2">'+csstextstd+'</div> '+clsStud[rw]['studName']+'</td>'
    //   +'<td class="text-dark text-left"><div class="badge '+cssattteach+' ml-2">'+csstexteach+'</div> '+clsStud[rw]['teachName']+'</td>'
    //   +'</tr>';
    // }
    
//     htmlTbl+='</tbody>';
//     htmlTbl+='</tbody>';
//     htmlTbl+='</table>';
//     htmlTbl+='</div></div></div>';
//     a++;
// }
htmlTbl+='<table class="table row-height-small table-bordered">'
        +'<tr>'
        +'<th style="width:5%">Sn.</th>'
        +'<th style="width:12%">Time</th>'
        +'<th style="width:10%">Meeting Id</th>'
        +'<th style="width:8%">Grade</th>'
        +'<th style="width:40%">Batch Name</th>'
        +'<th style="width:20%">Teacher Name</th>'
        +'<th style="width:5%">Total</th>'
        +'<th style="width:5%">Live</th>'
        +'</tr>'
        +'</tbody>'
        +'</table>';
var a=1;
for(md=0;md<classes.length;md++){
      var cssatt =  classes[md]['liveClass']==0?'badge-danger':'badge-success';
      var csstext =  classes[md]['liveClass']==0?'Offline':'Live';
      var cssattteach =  classes[md]['liveTeacher']==0?'badge-danger':'badge-success';
      var csstexteach =  classes[md]['liveTeacher']==0?'Offline':'Live';

      var meetingtype='';
      if(classes[md]['meetingType']=='OFFLINE_MEETING'){
        meetingtype = "Teacher Created Link ";
      }else if(classes[md]['meetingType']=='BATCH_TEACHER_MAPPING'){
        meetingtype = "Group Learning ";
      }else if(classes[md]['meetingType']=='MEETINGS'){
        meetingtype = "1:1 ";
      }else if(classes[md]['meetingType']=='RECURRING_CLASS'){
        meetingtype = "1:1 ";
      }
      var areaExp = "false";
      if(a==1){
        areaExp = "true";
      }
    //htmlTbl='';
    var livest = 0;
    if(classes[md]['liveStudent']!=''){
      livest=(parseInt(classes[md]['liveStudent'])>0?(parseInt(classes[md]['liveStudent'])-1):0);
    }
    
    htmlTbl+='<span class="accordion">'
        +'<table class="table row-height-small table-bordered">'
        +'<tr class="livecl-'+classes[md]['meetingid']+'">'
        +'<td class="text-dark" style="width:5%">'+(a)+'</td>'
        +'<td class="text-dark" style="width:12%">'+classes[md]['startTime']+'-'+classes[md]['endTime']+'</td>'
        +'<td class="text-dark" style="width:10%"><a href="'+classes[md]['meetingUrl']+'" target="_blank"> '+classes[md]['meetingid']+'</td>'
        +'<td class="text-dark text-left" style="width:8%">'+classes[md]['grade']+'</td>'
        +'<td class="text-dark text-left" style="width:40%"><div class="badge '+cssatt+' ml-2">'+csstext+'</div> '+classes[md]['batchName']+'</td>'
        +'<td class="text-dark text-left" style="width:20%"><div class="badge '+cssattteach+' ml-2">'+csstexteach+'</div> '+classes[md]['teachName']+'</td>'
        +'<td class="text-dark text-left" style="width:5%">'+classes[md]['totalStudent']+'</td>'
        +'<td class="text-dark text-left" style="width:5%">'+livest+'</td>'
        +'</tr>'
        +'</tbody>'
        +'</table></span>';

        htmlTbl+='<div class="panel">'
              +'<table class="table row-height-small table-bordered text-left" style="font-size:11px">'
              +'<thead>'
              +'<tr class="bg-primary">'
              +'<th class="text-white"><b>Student</b></th>'
              +'</tr></thead><tbody>';
            var b=0;
            var clsStud=classes[md]['liveClassStudent'];
            for(rw=0;rw<clsStud.length;rw++){
                var cssattstd =  clsStud[rw]['liveStudent']==0?'badge-danger':'badge-success';
                var csstextstd =  clsStud[rw]['liveStudent']==0?'Offline':'Live';
                htmlTbl+='<tr class="livecl-'+clsStud[rw]['meetingid']+'">'
                  +'<td class="text-dark text-left"><div class="badge '+cssattstd+' ml-2">'+csstextstd+'</div> '+clsStud[rw]['studName']+'</td>'
                  +'</tr>';
            }
    htmlTbl+='</tbody></table>';
    htmlTbl+='</div>';
    a++;
}

// htmlTbl+='<button class="accordion">Section 2</button>';
// htmlTbl+='<div class="panel">';
// htmlTbl+='<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>';
// htmlTbl+='</div>';

// htmlTbl+='<button class="accordion">Section 3</button>';
// htmlTbl+='<div class="panel">';
// htmlTbl+='<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>';
// htmlTbl+='</div>';

    return htmlTbl;
}

function getColleps(){
  var acc = document.getElementsByClassName("accordion");
      var i;
      for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function() {
          //$('.panel').css({'display':'none'});
          //$('.accordion').removeClass('active');
          this.classList.toggle("active");
          var panel = this.nextElementSibling;
          if (panel.style.display === "block") {
            panel.style.display = "none";
          } else {
            panel.style.display = "block";
          }
        });
      }
}