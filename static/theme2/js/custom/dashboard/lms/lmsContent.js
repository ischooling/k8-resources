
function getEnrollments(titlle, roleAndModule, schoolId, userId, role){
    var html= '';
    if(tt=='theme2'){
        html+=
        '<div class="app-page-title">'
            +'<div class="page-title-wrapper">'
                +'<div class="page-title-heading">'
                    +'<div class="page-title-icon">'
                        +'<i class="pe-7s-notebook text-primary"></i>'
                    +'</div>'
                    +'<div>'+titlle+'</div>'
                +'</div>'
            +'</div>'
        +'</div>';

    }
    html+=
    '<div class="main-card mb-3 card">';
        if(tt=='theme1'){
            html+=
            '<div class="card-header card-header-primary">'
                +'<h4 class="card-title">'+titlle+'</h4>'
            +'</div>';
        }
	    html+=
        '<div class="card-body enrollments">'
	    +'</div>'
    +'</div>';
    return html;
}
function renderSingleBatchCourse(moduleId,keyCourse,valueCourse,enrollments){
    var html='';
    if(valueCourse.courseDetails.length>0){
        var htmlEnrollmentBasedOnBatch='';
        $.each(valueCourse.courseDetails, function(keyCourse, valueCourse) {
            htmlEnrollmentBasedOnBatch+=renderSingleEnrollment(moduleId,valueCourse,enrollments);
        });
        html=
        '<div id="batchtid_'+valueCourse.batchid+'" class="row">'
            +'<div class="col-lg-12 col-md-12 col-sm-12 col-12">'
                +'<h4 class="text-secondary">'+valueCourse.batchName+'</h4>'
            +'</div>'
            +htmlEnrollmentBasedOnBatch
        +'</div>'
    }
    return html;
}
function renderSingleEnrollment(moduleId,valueCourse,enrollments){
    var valueEnrollment=getRequiredObjects(enrollments,'enrollmentid',valueCourse.enrollmentid);
    if(valueEnrollment==undefined || valueEnrollment.length==0){
        return '';
    }
    var valueEnrollment=valueEnrollment[0];
    var resourceSingle=getRequiredObjects(valueEnrollment.courseDetails.resources,'forThumb','Y');
    if(resourceSingle==undefined || resourceSingle.length==0){
        return '';
    }
    resourceSingle=resourceSingle[0];
    var html=
    '<div class="col-sm-6 col-lg-3 col-xl-3 mb-3 animated zoomIn">'
        +'<div class="profile-responsive book-overlay card he-100 m-0">'
            +'<div class="dropdown-menu-header">'
                +'<div class="dropdown-menu-header-inner p-0">'
                    +'<div class="menu-header-image opacity-2 course-dashboard-thumb-img school-logo-thumb" style="background-image: url(\''+resourceSingle.url+'\');"></div>'
                +'</div>'
            +'</div>'
            +'<ul class="list-group list-group-flush book-overlay-content">'
                +'<li class="">'
                    +'<div class="widget-content pb-3 pt-1 pl-0 pr-0">'
                        +'<div class="text-center">'
                            +'<h6 class="mt-3 mb-3 font-size-md hover-primary-bg py-1">'
                                +'<span class="pr-2">'
                                    +'<b id="course_id_'+valueEnrollment.courseDetails.courseid+'" class="text-white">'+valueCourse.subjectName+'</b>'
                                +'</span>'
                            +'</h6>';
                            if(valueCourse.subCourseDetails!=undefined && valueCourse.subCourseDetails.length>0){
                                $('#dashboardContentInHTMLMyBook').append(renderSubSingleEnrollment(moduleId,valueCourse,enrollments));
                                html+='<a href="javascript:void(0);" onclick="showSubCourse('+valueCourse.subjectId+');" class="btn-wide btn-pill btn btn-outline-white">Read</a>';
                            }else{
                                html+='<a href="javascript:void(0);" onclick="getContent('+moduleId+',\'student-lms\',\'\',\''+valueEnrollment.enrollmentid+'~'+valueEnrollment.courseDetails.courseid+'~'+valueEnrollment.courseDetails.firstLessonid+'\');" class="btn-wide btn-pill btn btn-outline-white">Read</a>';
                            }
                        html+='</div>'
                    +'</div>'
                +'</li>'
            +'</ul>'
        +'</div>'
    +'</div>';
    return html;
}
function renderSubSingleEnrollment(moduleId,valueCourse,enrollments){
    var valueEnrollment=getRequiredObjects(enrollments,'enrollmentid',valueCourse.enrollmentid);
    if(valueEnrollment==undefined || valueEnrollment.length==0){
        return '';
    }
    var valueEnrollment=valueEnrollment[0];
    var resourceSingle = getRequiredObjects(valueEnrollment.courseDetails.resources,'forThumb','Y');
    if(resourceSingle==undefined || resourceSingle.length==0){
        return '';
    }
    resourceSingle=resourceSingle[0];
    var html=
	'<div id="parentCourseId'+valueCourse.subjectId+'" class="sub-subject-list">'
        +'<div class="card">'
            +'<div class="card-body sub-subject-list-wrapper">'
                +'<div class="close-subject" onClick="hideSubCourse('+valueCourse.subjectId+')">'
                 +'<i class="fa fa-times"></i>'
                +'</div>'
                +'<div class="row justify-content-center">'
                    +'<div class="col-lg-12 col-md-12 col-sm-12 col-12">'
                        +'<h4 id="course_id_'+valueCourse.courseid+'" class="text-secondary">'+valueCourse.subjectName+'</h4>'
                    +'</div>'
                    // +'<div class="col-sm-6 col-lg-3 col-xl-3 mb-3 animated zoomIn">'
                    //     +'<div class="profile-responsive book-overlay card he-100 m-0">'
                    //         +'<div class="dropdown-menu-header">'
                    //             +'<div class="dropdown-menu-header-inner p-0">'
                    //                 +'<div class="menu-header-image opacity-2 course-dashboard-thumb-img school-logo-thumb" style="background-image: url(\''+resourceSingle.url+'\');"></div>'
                    //             +'</div>'
                    //         +'</div>'
                    //         +'<ul class="list-group list-group-flush book-overlay-content">'
                    //             +'<li class="">'
                    //                 +'<div class="widget-content pb-3 pt-1 pl-0 pr-0">'
                    //                     +'<div class="text-center">'
                    //                         +'<h6 class="mt-3 mb-3 font-size-md hover-primary-bg py-1">'
                    //                             +'<span class="pr-2"><b id="course_id_'+valueEnrollment.courseDetails.courseid+'" class="text-white">'+valueCourse.subjectName+'</b></span>'
                    //                         +'</h6>'
                    //                         +'<a href="javascript:void(0);" onclick="return getContent('+moduleId+',\'student-lms\',\'\',\''+valueEnrollment.enrollmentid+'~'+valueEnrollment.courseDetails.courseid+'~'+valueEnrollment.courseDetails.firstLessonid+'\');" class="btn-wide btn-pill btn btn-outline-white">Read</a>'
                    //                     +'</div>'
                    //                 +'</div>'
                    //             +'</li>'
                    //         +'</ul>'
                    //     +'</div>'
                    // +' </div>'
                    +renderSubSingleEnrollmentInner(moduleId,valueCourse,enrollments);
                +'</div>'
            +'</div>'
        +'</div>'
    +'</div>';
	return html;
}

function renderSubSingleEnrollmentInner(moduleId,valueCourse,enrollments){
    var html='';
    $.each(valueCourse.subCourseDetails, function(keySubEnrollment, valueSubCourse) {
        var valueEnrollment=getRequiredObjects(enrollments,'enrollmentid',valueSubCourse.enrollmentid)[0];
        if(valueEnrollment!=undefined){
            var resourceSingle = getRequiredObjects(valueEnrollment.courseDetails.resources,'forThumb','Y')[0];
            html+='<div class="col-sm-6 col-lg-3 col-xl-3 mb-3 animated zoomIn">'
                +'<div class="profile-responsive book-overlay card he-100 m-0">'
                    +'<div class="dropdown-menu-header">'
                        +'<div class="dropdown-menu-header-inner p-0">'
                            +'<div class="menu-header-image opacity-2 course-dashboard-thumb-img school-logo-thumb" style="background-image: url(\''+resourceSingle.url+'\');"></div>'
                        +'</div>'
                    +'</div>'
                    +'<ul class="list-group list-group-flush book-overlay-content">'
                        +'<li class="">'
                            +'<div class="widget-content pb-3 pt-1 pl-0 pr-0">'
                                +'<div class="text-center">'
                                    +'<h6 class="mt-3 mb-3 font-size-md hover-primary-bg py-1">'
                                        +'<span class="pr-2"><b id="course_id_'+valueEnrollment.courseDetails.courseid+'" class="text-white">'+valueSubCourse.subjectName+'</b></span>'
                                    +'</h6>'
                                    +'<a href="javascript:void(0);" onclick="return getContent('+moduleId+',\'student-lms\',\'\',\''+valueEnrollment.enrollmentid+'~'+valueEnrollment.courseDetails.courseid+'~'+valueEnrollment.courseDetails.firstLessonid+'\');" class="btn-wide btn-pill btn btn-outline-white">Read</a>'
                                +'</div>'
                            +'</div>'
                        +'</li>'
                    +'</ul>'
                +'</div>'
            +' </div>';
        }
    });
    return html;
}
function renderLessonsIndex(enrollmentid,courseid,lessonid){
    if(localStorage.getItem('li'+courseid)!=null){
        var lessons=JSON.parse(localStorage.getItem('li'+courseid));
        var html='';
        $.each(lessons, function(k, v) {
            html+=renderSingleLesson(enrollmentid,courseid,v.lessonid,k,v);
        });
        $('.chapter_ui').append(html);
        chapaterBarPanel();
    }else{
        var data=updateLessonIndex(enrollmentid,courseid,lessonid);
        localStorage.setItem('li'+courseid,JSON.stringify(data['lessons']));
        localStorage.setItem('mpn'+courseid,JSON.stringify(data['maxPageNumber']));
        localStorage.setItem('lessonidToStudy'+courseid,JSON.stringify(data['lessonidToStudy']));
        renderLessonsIndex(enrollmentid,courseid,lessonid);
    }
}

function renderSingleLesson(enrollmentid,courseid,lessonid,k,v){
    var html=
    '<li class="chapter_item">';
    if(v.lessonType=='H' && v.startPage ==0){
        html+= '<span class="chapter_name_noclick lesson_name'+lessonid+'"><span class="lesson_sno'+lessonid+'">' +v.lessonName+'</span>';
    }else{
        if(v.serialNo==0){
            html+='<a class="chapter_name gotoChapter starte'+v.startPage+' chapter_to_study'+lessonid+'" href="javascript:void(0)" enrollmentid="'+enrollmentid+'" courseid="'+courseid+'" lessonid="'+lessonid+'"  allsessonid="'+v.allsessonid+'" startPageNo="'+v.startPage+'">'+ '<span class="lesson_sno'+lessonid+'"></span>'+ '&nbsp;<span class="lesson_name'+lessonid+'">' +v.lessonName+'</span>' +'<span class="chapter_page_no">'+ v.startPage + '-' + v.endPage+'</span>'+'</a>';
        }else{
            html+='<a class="chapter_name gotoChapter starte'+v.startPage+' chapter_to_study'+lessonid+'" href="javascript:void(0)" enrollmentid="'+enrollmentid+'" courseid="'+courseid+'" lessonid="'+lessonid+'"  allsessonid="'+v.allsessonid+'" startPageNo="'+v.startPage+'">'+ '<span class="lesson_sno'+lessonid+'">' +v.serialNo+'. '+'</span>'+ '&nbsp;<span class="lesson_name'+lessonid+'">' +v.lessonName+'</span>' +'<span class="chapter_page_no">'+ v.startPage + '-' + v.endPage+'</span>'+'</a>';
        }
    }
    html+='<div class="d-flex align-items-center flex-column justify-content-between">';
            if(v.progression!=null){
                if(v.progression.startDate!='' && v.progression.endDate!=''){
                    html+=
                    '<div class="started-lession-message full pr-1 blue-dark-bg">'
                        +'<p class="started-lession-message text-white text-right m-0">Lesson Started on: '+v.progression.startDate+'</p>'
                    +'</div>'
                    +'<div class="completed-lession-message full pr-1 blue-dark-bg">'
                        +'<p class="text-white text-right m-0">Lesson Completed on: '+v.progression.endDate+'</p>'
                    +'</div>';
                }else if(v.progression.startDate!='' && v.progression.endDate==''){
                    var warningMessag='Are you sure? You want to finish lesson: '+(k+1)+'. '+v.lessonName;
                    var functionName='lessonStartStopStatusWarning(\''+warningMessag+'\', \'C\','+v.progression.progressionid+','+enrollmentid+','+courseid+','+lessonid+')';
                    html+=
                    '<div class="started-lession-message full pr-1 blue-dark-bg">'
                        +'<p class="started-lession-message text-white text-right m-0">Lesson Started on: '+v.progression.startDate+'</p>'
                    +'</div>'
                    +'<div id="div_'+lessonid+'" class="completed-work full text-right">'
                        +'<span class="text-white d-inline-block mr-2">I have completed this lesson</span>'
                        +'<div class="d-inline-block">'
                            +'<label class="switch m-0">'
                                +'<input id="switchInput'+lessonid+'" class="switch-input" type="checkbox" onclick="'+functionName+'">'
                                +'<span class="switch-label" data-on="Yes" data-off="No"></span>'
                                +'<span class="switch-handle"></span>'
                            +'</label>'
                        +'</div>'
                    +'</div>';
                }else if(v.progression.startDate=='' && v.progression.endDate==''){
                    if(USER_ROLE=='TEACHER'){
                        var warningMessag='Are you sure you want to start lesson: '+(k+1)+'. '+v.lessonName+'?'
                        var functionName='lessonStartStopStatusWarning(\''+warningMessag+'\', \'S\','+v.progression.progressionid+','+enrollmentid+','+courseid+','+lessonid+')';
                    	var eligibleProgressStatus = v.eligibleForProgress;
                    	if(eligibleProgressStatus=='Y') {
                    		html+=
                    				'<div id="div_'+lessonid+'" class="completed-work full text-right">'
                    				+'<span class="text-white d-inline-block mr-2">Want to start this lesson?</span>'
                    				+'<div class="d-inline-block">'
                    				+'<label class="switch m-0">'
                    				+'<input id="switchInput'+lessonid+'" class="switch-input" type="checkbox" onclick="'+functionName+'">'
                    				+'<span class="switch-label" data-on="Yes" data-off="No"></span>'
                    				+'<span class="switch-handle"></span>'
                    				+'</label>'
                    				+'</div>'
                    				+'</div>';
                    	}
                    }
                }
            }
        html+=
        '</div>'
    +'</li>';
    return html;
}

function getLMSContent(enrollmentid,courseid,lessonid){
    var courseTitle=$('#course_id_'+courseid).html();
    var html =
    '<div class="main-card mb-3 mt-3 lms-ui">'
        +'<div class="leftContentDiv">'
            +'<div class="bookViewer">'
                +'<div class="card m-0">'
                    +'<div class="card-body pt-1">'
                        +'<div class="d-flex flex-wrap justify-content-end align-items-center pl-4 mb-1">'
                            +'<h5 class="text-left text-primary text-26 m-0 chapter-name pl-4">'
                                +'<b>'+courseTitle+'</b>'
                            +'</h5>'

                            +'<h6 class="head-chapter-name text-center"style="flex:1"><b>'
                                
                            +'</h6></b>'
                            +'<a href="javascript:void(0)" class="pull-right btn btn-primary" onclick="callDashboardPageSchool('+roleAndModule.moduleId+',\''+roleAndModule.pageLink+'\',\'\','+USER_ID+');">'
                                +'<i class="fa fa-book"></i>&nbsp;'+roleAndModule.moduleName
                            +'</a>'
                        +'</div>'
                        +'<div class="top-bar">'
                            +'<button class="btn btn-primary pdf-page-navigation p-2 ml-1" id="prev-page"><i class="fa fa-arrow-circle-left"></i></button>'
                            +'<button class="btn btn-primary pdf-page-navigation p-2 ml-1" id="next-page"><i class="fa fa-arrow-circle-right"></i></button>'
                            +'<span class="page-info">Page'
                                +'<label class="page-nav">'
                                    +'<input type="text" id="page-num" class="d-inline-block pdf-page-input">&nbsp;/<span id="page-count"></span>'
                                +'</label>'
                            +'</span>'
                            +'<div class="right-actions">'
                                +'<button class="btn btn-primary ml-1 pull-right open-chapter" onclick="openchapaterBarPanel()" id=""><i class="fa fa-book"></i>&nbsp;Lessons</button>'
                                +'<span class="full_screen_view_btn">'
                                    +'<img class="maximize" title="Maximize Screen" onclick="fullScreenMode(true)" src="'+APP_BASE_URL+'/static/theme2/images/maximize.png"></img>'
                                    +'<img class="minimize" title="Minimize Screen" onclick="fullScreenMode(false)" src="'+APP_BASE_URL+'/static/theme2/images/minimize.png"></img>'
                                +'</span>'
                            +'</div>'
                        +'</div>'
                        +'<div class="full text-center book-wrapper">'
                            +'<canvas class="shadow" id="pdf-render"></canvas>'
                        +'</div>'
                    +'</div>'
                +'</div>'
                +'<div class="lessonResources">'
                +'</div>'
            +'</div>'
            +'<div class="card rightContentDiv m-0">'
            +'</div>'
        +'</div>'
    +'</div>'
    +'<div class="chapter_bar">'
        +'<div class="chapter_bar_openner" onclick=openchapaterBarPanel()>'
            +'<i class="fa fa-book"></i>'
        +'</div>'
        +'<div class="chapter_bar_inner">'
            +'<h4 class="book-name">'
                +'Table of Contents'
            +'</h4>'
            +'<ul class="chapter_ui">'
            +'</ul>'
        +'</div>'
    +'</div>'
    +resourceModal(enrollmentid,courseid,lessonid,courseTitle)
    +warningModal()
    +homeWorkSubmissionModal(enrollmentid,courseid,lessonid)
    +viewUploadFileModal(enrollmentid,courseid,lessonid);
    var pageLink='';
    if(USER_ROLE=='TEACHER'){
        pageLink='my-classes';
    }else if(USER_ROLE=='STUDENT'){
        pageLink='my-book';
    }
    //var moduleDetails = getModuleDetails(SCHOOL_ID,pageLink);
    var mybooks= '<div class="my-course-btn">'
        +'<a href="javascript:void(0)" onClick="slideResource();">'
        //+'<a href="javascript:void(0)" onClick="getContent('+moduleDetails.id+', \''+moduleDetails.pageLink+'\', \'\', \'\');">'
            +'<i class="fa fa-book"></i>'
            +'<span class="btn-title">Resources</span>'
        +'</a>'
        +'</div>'
    html+=mybooks;
    return html;
}

function getLMSContentRight(enrollmentid,courseid,lessonid, alllessonid){
    var html='';
    html='<div id="lesson_name_'+lessonid+'" class="full">'
            +'<h4 class="m-0 text-secondary text-20 m-0"><b>'+$('.lesson_sno'+lessonid).html()+' '+$('.lesson_name'+lessonid).html()+'</b></h4>'
        +'</div>'
    $(".rightContentDiv, .head-chapter-name").html(html);
    if(USER_ROLE=='STUDENT'){

        var htmlStudyResource =
        '<div id="studyResource_'+lessonid+'" class="full  mt-3">'
            +studyResource(enrollmentid,courseid,lessonid,'Y','Y')
        +'</div>';
        $(".rightContentDiv").append(htmlStudyResource);
        var htmlLearningResource =
        '<div id="learningResource_'+lessonid+'" class="full mt-3">'
            +learningResource(enrollmentid,courseid,lessonid,'N','N')
        +'</div>';
        $(".rightContentDiv").append(htmlLearningResource);
        var htmlHomeWorkResource =
        '<div id="homeWork_'+lessonid+'" class="full mt-3">'
            +homeWorkResource(enrollmentid,courseid,lessonid,'Y', alllessonid)
        +'</div>';
        $(".rightContentDiv").append(htmlHomeWorkResource);

    }else if(USER_ROLE=='TEACHER'){
        html=
        '<div id="studyResource_'+lessonid+'" class="full">'
            +studyResource(enrollmentid,courseid,lessonid,'Y','Y')
        +'</div>';
        $(".rightContentDiv").append(html);
    }else{
        html=
        '<div id="studyResource_'+lessonid+'" class="full">'
            +studyResource(enrollmentid,courseid,lessonid,'Y','Y')
        +'</div>';
        $(".rightContentDiv").append(html);
    }
}

function singleVideoRenderd1(k,v,enrollmentid,courseid,lessonid){
    var urls = getRequiredObjects(v,'resourceType','V');
    var html='';
    if(urls.length>0){
        url=urls[0].url;
        html+=
        '<div class="video-wapper align-items-center" id="videoWrapper'+k+'">'
            +'<video class="videoTag" id="video'+k+'" controls   disablePictureInPicture controlsList="nodownload">'
            +'<source src="'+url+'" type="video/mp4">'
            +'Your browser does not support the video tag.'
            +'</video>'
            +'<button class="transparent-video-close-btn" onclick="closeVideo(\'videoWrapper'+k+'\',\'video'+k+'\');"><i class="fa fa-times"></i></button>'
        +'</div>';
    }
    return html;
}

function singleVideoRenderd2(k,v,enrollmentid,courseid,lessonid){
    var urls = getRequiredObjects(v,'resourceType','V');
    var html='';
    if(urls.length>0){
        url=urls[0].url;
        title = urls[0].title;
        html+=
        '<div class="full text-center">'
            +'<button class="video_play_button ml-1 mb-1" onclick="playVideo(\'videoWrapper'+k+'\',\'video'+k+'\')">'
                +'<i class="fa fa-play"></i>'
            +'</button>'
            +'<span class="video-lable">'
                +title+'<br/>Video '+(k+1)
            +'</span>'
        +'</div>';
    }
    return html;
}

function lessonResources(enrollmentid,courseid,lessonid){
    if(localStorage.getItem('lr'+lessonid)!=null){
        var lessons=JSON.parse(localStorage.getItem('lr'+lessonid));
        var lessonResourcs1='';
        $.each(lessons, function(k, v) {
            $.each(v.resources, function(k1, v1) {
                lessonResourcs1+=singleVideoRenderd1(k1,v1,enrollmentid,courseid,lessonid);
            });
        });
        var lessonResourcs1Content=
            '<div class="full">'
                +lessonResourcs1
            +'</div>';
        var lessonResourcs2='';
            $.each(lessons, function(k, v) {
                $.each(v.resources, function(k1, v1) {
                    lessonResourcs2+=singleVideoRenderd2(k1,v1,enrollmentid,courseid,lessonid);
                });
            });
        var lessonResourcs2Content=
            '<div class="chapter_thumb_video_wrapper">'
                +'<div class="video-btn-wrapper owl-carousel">'
                	+lessonResourcs2
                +'</div>'
            +'</div>';
        var html=lessonResourcs1Content+lessonResourcs2Content;
        $('.lessonResources').html(html);
        crousel();
    }else{
        updateLessonResources(enrollmentid,courseid,lessonid)
    }
}

function studyResource(enrollmentid,courseid,lessonid,userIdChecks,deletePermission){
    var key='';
    if(userIdChecks=='Y'){
        key='lsr'+lessonid;
    }else if(userIdChecks=='N'){
        key='llr'+lessonid;
    }
    if(localStorage.getItem(key)==null || localStorage.getItem(key)=='undefined'){
        var flag = updateStudyResourceList(enrollmentid,courseid,lessonid,userIdChecks);
        if (flag['status'] == 'success') {
            return studyResource(enrollmentid,courseid,lessonid,userIdChecks,deletePermission);
        }
    }
    var notes = JSON.parse(localStorage.getItem(key));
    var maxNotesLimits=5;
    var totalNotesCount=0;
    var resourcesHtml='';
    if(notes!=null){
        maxNotesLimits=notes['maxNotesLimits'];
        totalNotesCount=notes['totalNotesCount'];
        resourcesHtml=renderResourcesContents(notes['resources'],enrollmentid,courseid,lessonid,userIdChecks,deletePermission);
    }
	var title='';
    if(USER_ROLE=='STUDENT'){
        title='Study Resources';
    }else if(USER_ROLE=='TEACHER'){
        title='Learning Resources';
    }else{
        title='Study/Learning Resources';
    }
    var unreadCount=0;
    if(notes!=null){
        var unreadCountKey=key+'unread'
        if(localStorage.getItem(unreadCountKey)==null || localStorage.getItem(unreadCountKey)=='undefined'){
            $.each(notes['resources'], function(k, v) {
                if(v.notes.peepedAt==''){
                    unreadCount++;
                }
            });
            localStorage.setItem(unreadCountKey,unreadCount);
        }else{
            unreadCount=localStorage.getItem(unreadCountKey);
        }
    }
    var html =
    '<div class="card box-shadow-none">'
        +'<div class="card-header theme-bg text-white justify-content-between card-header-primary d-flex">'
            +'<h6 class="m-0 font-size-md full">'
                +title
                +'<span id="unkownID">'
                +'</span>'
                +'&nbsp;<span class="pull-right">('
                    +'<b id="'+key+'">'+totalNotesCount+'</b>/'
                    +'<b>'+maxNotesLimits+'</b>'
                +')</span>'
            +'</h6>'
        +'</div>'
        +'<div class="card-body bg-gray pt-0">'
            +'<div class="full study-resources-notes scrollbar-container ps--active-y">'
                +resourcesHtml
            +'</div>'
            +'<div class="full mt-2">'
                +'<textarea rows="5" class="font-size-md form-control" style="resize:vertical;height:inherit" id="studyResourcesNotes" maxlength="500" placeholder="Type your notes here..."></textarea>'
                +'<div class="d-flex justify-content-between align-items-center">'
                    +'<div class="attachment-work">'
                        +'<input type="file" class="attach-file" accept="application/pdf, image/*" id="attach-resource" multiple onchange="uploadFile('+enrollmentid+','+courseid+','+lessonid+',\'attach-resource\',\'uploadedStudyResourcesNotes\',\'fileUploadLimitsMsg\',\'uploadFile\',\'studyResourcesAttachment\')"/>'
                        +'<span class="upload-resource-btn font-size-md">'
                            +'<i class="fa fa-paperclip font-size-md"></i>&nbsp;<b>attachment</b>'
                        +'</span>'
                    +'</div>'
                    +'<button class="btn btn-secondary btn-sm mt-2 float-right" id="studyResources" onclick="addNotes('+"'study-resources-notes'"+','+"'studyResourcesNotes'"+','+enrollmentid+','+courseid+','+lessonid+',\'Y\')">Submit</button>'
                +'</div>'
                +'<div class="full text-danger font-weight-bold d-none" id="fileUploadLimitsMsg">'
                +'</div>'
                +'<div class="d-flex flex-wrap align-items-center mt-1" id="uploadedStudyResourcesNotes">'
                +'</div>'
            +'</div>'
        +'</div>'
    +'</div>'
    return html;
}

function homeWorkResource(enrollmentid,courseid,lessonid,lessonactive,alllessonid){
    var homeWorkContent=stddHomeworkList(enrollmentid,courseid,lessonid, alllessonid);
    var seencount = parseInt(localStorage.getItem('hread'));
    var newUnreadmsg = seencount+' New Homework';
    if(seencount<=0){
        newUnreadmsg='';
    }
    var html =
    '<div class="card box-shadow-none">'
        +'<div class="card-header theme-bg text-white justify-content-between card-header-primary d-flex">'
            +'<h6 class="m-0 font-size-md full">Homework <span class="pull-right" id="newhwread">'+newUnreadmsg+'</span></h6>'
        +'</div>'
        +'<div class="card-body card-body px-0 pt-1">'
            +'<div class="homework-submission-wrapper">'
                +'<ul>'
                    + homeWorkContent
                +'</ul>'
            +'</div>'
        +'</div>'
    +'</div>';
    return html;
}

function stddHomeworkList(enrollmentid,courseid,lessonid, alllessonid){
    var html='';
    //console.log("stddHomeworkList");
    var seencount=0;
    localStorage.setItem('htotal',0);
    localStorage.setItem('hread',0);
    if(localStorage.getItem('student_homework'+lessonid)!=null && localStorage.getItem('student_homework'+lessonid)!='undefined' ){
        var stdhomework = JSON.parse(localStorage.getItem('student_homework'+lessonid));
        localStorage.setItem('htotal',stdhomework.length);
        if(stdhomework.length>0){
            $.each(stdhomework, function(k, v) {
                var newSts='';
                var doublecheck='';
                var cssNewHomework='';
                if(v.seenStatus=='PENDING'){
                    newSts='New Home Work';
                    seencount +=1;
                }else{
                    doublecheck ='<i class="fa fa-check-double"></i>'
                    cssNewHomework='d-none';
                }

                html+='<li class="col-md-12 col-sm-12 col-12">'
                    +'<div class="home-anchor" onclick="homeWorkModal(\''+"homeWorkSubmissionModalID"+'\',\''+enrollmentid+'\',\''+courseid+'\',\''+lessonid+'\','+v.taskId+');">'
                        +'<div class="home-list">'
                            +'<span class="home-icon"><i class="fa fa-book"></i><label class="new-label '+cssNewHomework+'" id="newhw'+v.taskId+'">'+newSts+'</label></span>'
                            +'<h4 class="home-title"><span>'+v.taskTitle+'</h4>'
                            +'<span class="pr-2 text-success" id="dblcheck'+v.taskId+'">'+doublecheck+'</span>'
                        +'</div>'
                    +'</div>'
                +'</li>'
                localStorage.setItem('hread',seencount);
            });
        }else{
            html+='<li class="col-md-12 col-sm-12 col-12">No homework assigned</li>'
        }
        return html;
    }else{
        var data = callStudentHomework('',courseid,lessonid, alllessonid);
        if(data){
            html = stddHomeworkList(enrollmentid,courseid,lessonid, alllessonid)
        }
    }
    return html;
}

function renderResourcesContents(resources,enrollmentid,courseid,lessonid,userIdChecks,deletePermission){
    var html='';
    $.each(resources, function(k, v) {
        var isAttachmentAvailable=false;
        if(v.contentOrDocument!=null && v.contentOrDocument!=undefined && v.contentOrDocument.length>0){
            isAttachmentAvailable=true;
        }

        html+=getResourceContentByType(v.notes.peepedAt,v.notes.notes,true,isAttachmentAvailable,enrollmentid,courseid,lessonid,v.notes.noteid,v.notes.entityId,v.notes.entityType,userIdChecks,deletePermission);
    });
    return html;
}

function getResourceContentByType(readStatus,visibleText,isTextAvailable,isAttachmentAvailable,enrollmentid,courseid,lessonid,noteid,entityId,entityType,userIdChecks,deletePermission){
    var html='';
    if(visibleText.length>20){
        visibleText=visibleText.substring(0,20);
        visibleText=visibleText+'...';
    }
    var warningMessag='Are you sure you want to delete note: '+visibleText+'?';
    var functionRender='renderResourcesByUser('+enrollmentid+','+courseid+','+lessonid+','+noteid+','+entityId+',\''+entityType+'\',\'N\',\''+userIdChecks+'\')';
    var functionDeleteNote='deleteNotesWarning(\''+warningMessag+'\','+enrollmentid+','+courseid+','+lessonid+','+noteid+','+entityId+',\''+entityType+'\',\'N\',\''+userIdChecks+'\')';
    if(isTextAvailable && isAttachmentAvailable){
        html=
        '<div id="note_'+noteid+'" class="notes-wrapper text-white mt-1">'
            +'<p class="notes">'
                +'<a href="javascript:void(0)" onclick="'+functionRender+'">'
                    +'<i class="fa fa-paperclip text-20 mr-1 text-secondary">'
                    +'</i>'
                    +visibleText
                +'</a>'
            +'</p>';
            if(readStatus!='' && userIdChecks=='N'){
                html+='<span class="pr-2 text-success"><i class="fa fa-check-double"></i></span>';
            }
            if(deletePermission=='Y' && entityType=='N'){
                html+='<div onclick="'+functionDeleteNote+'" class="delete-notes"><i class="fa fa-times"></i></div>';
            }
        html+=
        '</div>';
    }else if(isTextAvailable){
        html=
        '<div id="note_'+noteid+'" class="notes-wrapper text-white mt-1">'
            +'<p class="notes">'
                +'<a href="javascript:void(0)" onclick="'+functionRender+'">'
                    +visibleText
                +'</a>'
            +'</p>';
            if(readStatus!='' && userIdChecks=='N'){
                html+='<span class="pr-2 text-success"><i class="fa fa-check-double"></i></span>';
            }
            if(deletePermission=='Y' && entityType=='N'){
                html+='<div onclick="'+functionDeleteNote+'" class="delete-notes"><i class="fa fa-times"></i></div>';
            }
        html+=
        '</div>';
    }else if(isAttachmentAvailable){
        html=
        '<div id="note_'+noteid+'" class="notes-wrapper text-white mt-1">'
            +'<p class="notes">'
                +'<a href="javascript:void(0)" onclick="'+functionRender+'">'
                    +'<i class="fa fa-paperclip text-white text-20">'
                    +'</i>'
                +'</a>'
            +'</p>';
            if(readStatus!='' && userIdChecks=='N'){
                html+='<span class="pr-2 text-success"><i class="fa fa-check-double"></i></span>';
            }
            if(deletePermission=='Y' && entityType=='N'){
                html+='<div onclick="'+functionDeleteNote+'" class="delete-notes"><i class="fa fa-times"></i></div>';
            }
        html+=
        '</div>';
    }
    return html;
}

function learningResource(enrollmentid,courseid,lessonid,userIdChecks,deletePermission){
    var key='';
    if(userIdChecks=='Y'){
        key='lsr'+lessonid;
    }else if(userIdChecks=='N'){
        key='llr'+lessonid;
    }
    if(localStorage.getItem(key)==null || localStorage.getItem(key)=='undefined'){
        var flag = updateStudyResourceList(enrollmentid,courseid,lessonid,userIdChecks);
        if (flag['status'] == 'success') {
            return learningResource(enrollmentid,courseid,lessonid,userIdChecks,deletePermission);
        }
    }
    var notes = JSON.parse(localStorage.getItem(key));
    var maxNotesLimits=5;
    var totalNotesCount=0;
    var resourcesHtml='';
    if(notes!=null){
        maxNotesLimits=notes['maxNotesLimits'];
        totalNotesCount=notes['totalNotesCount'];
        resourcesHtml=renderResourcesContents(notes['resources'],enrollmentid,courseid,lessonid,userIdChecks,deletePermission)
    }
    var title='';
    if(USER_ROLE=='STUDENT'){
        title='Learning Resources';
    }else if(USER_ROLE=='TEACHER'){
        title='Study Resources';
    }else{
        title='Learning/Study Resources';
    }
    var unreadCount=0;
    if(notes!=null){
        var unreadCountKey=key+'unread'
        if(localStorage.getItem(unreadCountKey)==null || localStorage.getItem(unreadCountKey)=='undefined'){
            $.each(notes['resources'], function(k, v) {
                if(v.notes.peepedAt==''){
                    unreadCount++;
                }
            });
            localStorage.setItem(unreadCountKey,unreadCount);
        }else{
            unreadCount=localStorage.getItem(unreadCountKey);
        }
    }
    if(resourcesHtml==''){
        resourcesHtml='No resources added yet';
    }
    var html =
    '<div class="card box-shadow-none">'
        +'<div class="card-header theme-bg text-white justify-content-between card-header-primary d-flex">'
            +'<h6 class="m-0 font-size-md full">'
                +title
                +'<span class="pull-right" id="unreadCountContent">';
                    if(unreadCount>0){
                        html+=unreadCount+' New ';
                        if(unreadCount<=1){
                            html+='resource';
                        }else{
                            html+='resources';
                        }
                    }
                html+='</span>'
            +'</h6>'
        +'</div>'
        +'<div class="card-body bg-gray pt-0">'
            +'<div class="full learning-resources-notes scrollbar-container ps--active-y">'
                +resourcesHtml
            +'</div>'
        +'</div>'
    +'</div>'
    return html;
}

function resourceModal(enrollmentid,courseid,lessonid){
    // to vertical align modal need to add class width modal-dialog (modal-dialog-centered)
	var html =
	'<div class="modal fade fade-scale" id="userResourceModel" tabindex="-1">'
		+'<div class="modal-dialog modal-xl  box-shadow-none" role="document">'
			+'<div class="modal-content">'
				+'<div class="modal-header pt-2 pb-2 bg-secondary justify-content-between flex-wrap">'
					+'<h6 class="heading text-white" id="documentLabel"></h6>'
                    +'<h6 class="heading text-white ml-auto" id="documentUploadedAt"></h6>'
                    +'<button type="button" class="close text-white m-0 p-0 pl-2" data-dismiss="modal" aria-label="Close">'
                        +'<span aria-hidden="true">×</span>'
                    +'</button>'
				+'</div>'
				+'<div id="resourcesModelBody" class="modal-body">'
				+'</div>'
				// +'<div class="modal-footer">'
				// 	+'<div class="text-right">'
				// 		+'<button id="resetDeleteErrorWarningCancel1" type="button" class="btn btn-success" data-dismiss="modal">Close</button>'
				// 	+'</div>'
				// +'</div>'
			+'</div>'
		+'</div>'
	+'</div>';
	return html;
}

function warningModal(){
    // to vertical align modal need to add class width modal-dialog (modal-dialog-centered)
	var html =
	'<div class="modal fade fade-scale" id="actionCompleteWarning" tabindex="-1">'
		+'<div class="modal-dialog modal-sm  box-shadow-none" role="document">'
			+'<div class="modal-content">'
				+'<div class="modal-body m-0 py-2" style="margin-top:0 !important">'
                    +'<h3 class="full py-4 font-size-lg mt-0 mb-0 text-center warningMsg"></h3>'
				    +'<div class=" full text-center">'
                        +'<input id="yesAction" type="button" value="Yes" class="btn btn-success btn-sm mr-1"/>'
                        +'<input id="noAction" type="button" value="No" class="btn btn-primary btn-sm"/>'
                    +'</div>'
                +'</div>'
			+'</div>'
		+'</div>'
	+'</div>';
	return html;
}

function homeWorkSubmissionModal(enrollmentid,courseid,lessonid){
    // to vertical align modal need to add class width modal-dialog (modal-dialog-centered)
	var html =
	'<div class="modal fade fade-scale" id="homeWorkSubmissionModalID" tabindex="-1">'
		+'<div class="modal-dialog modal-dialog-centered modal-md  box-shadow-none" role="document">'
			+'<div class="modal-content">'
            +'<form name="studentHomworkFormLms" id="studentHomworkFormLms" action="javascript:void(0);">'
            +'<input type="hidden" id="taskId" value="1">'
            +'<input type="hidden" id="userId" value="">'
				+'<div class="modal-header pt-2 pb-2 bg-secondary justify-content-between">'
					+'<h6 class="heading text-white" id="lmsHwTitle">HOMEWORK</h6>'
                    +'<button type="button" class="close text-white m-0 p-0 pl-2" data-dismiss="modal" aria-label="Close">'
                        +'<span aria-hidden="true">×</span>'
                    +'</button>'
                +'</div>'
                +'<div class="modal-body m-0 py-2 homework-view-modal" style="margin-top:0 !important">'
                    +'<div class="home-work-wrapper">'
                        +'<div class="home-work-status-top-bar">'
                            +'<div class="view-status flex-column">'
                                +'<div class="tick-mark"></div>'
                                +'<span class="status-circle">'
                                    +'<i class="fa fa-eye"></i>'
                                +'</span>'
                                +'<label class="status-label">View</label>'
                            +'</div>'
                            +'<div class="download-status flex-column">'
                                +'<div class="tick-mark"></div>'
                                +'<span class="status-circle">'
                                    +'<i class="fa fa-paperclip"></i>'
                                +'</span>'
                                +'<label class="status-label">Download</label>'
                            +'</div>'
                            +'<div class="submit-status flex-column">'
                                +'<div class="tick-mark"></div>'
                                +'<span class="status-circle">'
                                    +'<i class="fa fa-arrow-up"></i>'
                                +'</span>'
                                +'<label class="status-label">Submit</label>'
                            +'</div>'
                            +'<div class="done-status flex-column">'
                                +'<div class="tick-mark"></div>'
                                +'<span class="status-squre">'
                                    +'<i class="fa fa-check"></i>'
                                +'</span>'
                                +'<label class="status-label">Done</label>'
                            +'</div>'
                        +'</div>'
                        +'<div class="full home-work-discription">'

                        +'</div>'
                        +'<div class="full my-2">'
                            +'<table class="homework-submission-table table mb-1" cellpadding="0" cellspacing="0">'
                                +'<tbody>'
                                    +'<tr>'
                                        +'<td>'
                                            +'<table class="table" cellpadding="0" cellspacing="0">'
                                                +'<tbody>'
                                                    +'<tr>'
                                                        +'<td>'
                                                            +'ATTACHMENT'
                                                        +'</td>'
                                                    +'</tr>'
                                                    +'<tr>'
                                                        +'<td id="hwctp1">'
                                                            +'<a href="javascript:void(0)" target="_blank" class="btn btn-sm btn-primary downloadAttachTeacher" >'
                                                                +'Download <i class="fa fa-arrow-down"></i>'
                                                            +'</a>'
                                                            +'<span class="downloadna">N/A</span>'
                                                        +'</td>'
                                                    +'</tr>'
                                                    +'<tr>'
                                                        +'<td>'
                                                            +'GIVEN DATE'
                                                        +'</td>'
                                                    +'</tr>'
                                                    +'<tr>'
                                                        +'<td id="givendate">'
                                                            +''
                                                        +'</td>'
                                                    +'</tr>'
                                                +'</tbody>'
                                            +'</table>'
                                        +'</td>'
                                        +'<td>'
                                            +'<table class="table" cellpadding="0" cellspacing="0">'
                                                +'<tbody>'
                                                    +'<tr>'
                                                        +'<td>'
                                                            +'GIVEN BY'
                                                        +'</td>'
                                                    +'</tr>'
                                                    +'<tr>'
                                                        +'<td id="givenby">'
                                                            +''
                                                        +'</td>'
                                                    +'</tr>'
                                                    +'<tr>'
                                                        +'<td>'
                                                            +'DUE DATE'
                                                        +'</td>'
                                                    +'</tr>'
                                                    +'<tr>'
                                                        +'<td id="duedate">'
                                                            +''
                                                        +'</td>'
                                                    +'</tr>'
                                                +'</tbody>'
                                            +'</table>'
                                        +'</td>'
                                    +'</tr>'
                                +'</tbody>'
                            +'</table>'
                        +'</div>'
                        +'<div class="row">'
                            +'<div class="col-lg-6 col-md-6 col-sm-6 col-6 col-xs-6">'
                                +'<div class="full border">'
                                    +'<label class="full text-center m-0 py-2">'
                                        +'STATUS'
                                    +'</label>'
                                    +'<b class="full p-2 text-center bg-success text-white hwstatus">'
                                        +''
                                    +'</b>'
                                +'</div>'
                            +'</div>'
                            +'<div class="col-lg-6 col-md-6 col-sm-6 col-6 col-xs-6">'
                                +'<div class="full border">'
                                    +'<label class="full text-center m-0 py-2">'
                                        +'HOMEWORK IS'
                                    +'</label>'
                                    +'<b class="full text-center p-2 bg-danger text-white hwcheckstatus">'
                                        +''
                                    +'</b>'
                                +'</div>'
                            +'</div>'
                        +'</div>'
                        +'<div class="full">'
                            +'<div class="d-flex flex-wrap align-items-center mt-1" id="uploadedHomeWork">'
                            +'</div>'
                            +'<div class="full text-danger font-weight-bold d-none" id="HomeWorkUploadLimitsMsg">'
                            +'</div>'
                            +'<div class="d-flex justify-content-between align-items-center replyhw">'
                                +'<div class="attachment-work">'
                                    +'<input type="file" class="attach-file" accept="application/pdf, image/*" name="fileuploadHomework[]" id="fileuploadHomework" multiple onchange="uploadFile('+enrollmentid+','+courseid+','+lessonid+',\'fileuploadHomework\',\'uploadedHomeWork\',\'HomeWorkUploadLimitsMsg\',\'homeWorkUploadview\',\'homeWorkAttachment\')"/>'
                                    +'<span class="upload-resource-btn font-size-md">'
                                        +'<i class="fa fa-paperclip font-size-md"></i>&nbsp;<b>upload homework</b>'
                                    +'</span>'
                                +'</div>'
                                +'<button class="btn btn-secondary btn-sm mt-2 float-right" onclick="submitReplyTask(\'studentHomworkFormLms\',0,\'LMS\');">Submit</button>'
                            +'</div>'
                        +'</div>'
                    +'</div>'
                    +'<div class="d-none homework-upload-view" id="homeWorkUploadview">'
                        +'<div class="upload_img d-none">'
                            +'<img src=""/>'
                        +'</div>'
                        +'<div class="upload_pdf d-none">'
                                +'<a href="" class="btn btn-sm btn-primary download-pdf-btn mb-2 pull-right" download="file.pdf">'
                                    +'Download PDF'
                                +'</a>'
                                +'<object type="application/pdf" class="pre_upload_pdf" data="">'
                                +'</object>'
                        +'</div>'
                    +'</div>'
                +'</div>'
				// +'<div class="modal-footer">'
				// 	+'<div class="text-right">'
				// 		+'<button id="resetDeleteErrorWarningCancel1" type="button" class="btn btn-success" data-dismiss="modal">Close</button>'
				// 	+'</div>'
				// +'</div>'
                +'</form>'
			+'</div>'
		+'</div>'
	+'</div>';
	return html;
}

function viewUploadFileModal(enrollmentid,courseid,lessonid){
    // to vertical align modal need to add class width modal-dialog (modal-dialog-centered)
	var html =
	'<div class="modal fade fade-scale" id="uploadFile" tabindex="-1">'
		+'<div class="modal-dialog modal-md  box-shadow-none" role="document">'
			+'<div class="modal-content">'
                +'<div class="modal-header pt-2 pb-2 bg-secondary justify-content-between flex-wrap">'
                    +'<h6 class="heading text-white">Preview File</h6>'
                    +'<button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">'
                        +'<span aria-hidden="true">×</span>'
                    +'</button>'
                +'</div>'
				+'<div class="modal-body m-0 py-2" style="margin-top:0 !important">'
                    +'<div id="pre_upload_image_div" class="full text-center upload_img d-none">'
                        +'<img id="pre_upload_image" class="w-100" src="" />'
                    +'</div>'
                    +'<div id="pre_upload_pdf_div"class=" full text-center upload_pdf d-none">'
                        +'<a href="" class="btn btn-sm btn-primary download-pdf-btn mb-2 pull-right" download="file.pdf">'
                            +'Download PDF'
                        +'</a>'
                        +'<object type="application/pdf" class="pre_upload_pdf" data="">'
                        +'</object>'
                    +'</div>'
                +'</div>'
			+'</div>'
		+'</div>'
	+'</div>';
	return html;
}

function renderUploadedUserData(data,userIdChecks){
    if(USER_ROLE=='STUDENT'){
        if(userIdChecks=='Y'){
            documentLabel='Study Resources';
        }else{
            documentLabel='Learning Resources';
        }
    }else if(USER_ROLE=='TEACHER'){
        documentLabel='Learning Resources';
    }else{
        html+='Study/Learning Resources';
    }
    $('#documentLabel').html(documentLabel);
    $('#documentUploadedAt').html('Added Time: '+data['note'].uploadedTimeFormatted);
    var documentHtml='';
    var messsage=data['note'].notes;
    var createdBy=data['note'].createdBy;
    var firstElementId='';
    $.each(data['resource'], function(k, v) {
        if(v.resourceType=='P'){
            var functionName='ViewUploadFile(\'resource_'+v.resourceid+'\',\''+v.resourceType+'\',\'uploadPdfiew\',\'uploadImgview\')';
            if(firstElementId==''){
                firstElementId='resource_'+v.resourceid;
            }
            documentHtml+='<span id="resource_'+v.resourceid+'" class="thumb " onclick="'+functionName+'">'
                +'<img class="img" src="'+APP_BASE_URL+'/static/theme2/images/pdf.jpg" pdfPath="'+v.thumbnail+'"/>'
            +'</span>'
        }else{
            var functionName='ViewUploadFile(\'resource_'+v.resourceid+'\',\''+v.resourceType+'\',\'uploadImgview\',\'uploadPdfiew\')';
            if(firstElementId==''){
                firstElementId='resource_'+v.resourceid;
            }
            documentHtml+='<span id="resource_'+v.resourceid+'" class="thumb" onclick="'+functionName+'">'
                +'<img class="img" src="'+v.thumbnail+'"/>'
            +'</span>'
        }
    });
    var html=messsage
        +'<div class="submitNotes">'+createdBy+'</div>'
        +'<hr/>';
        if(documentHtml!=''){
            html+=
            '<div class="d-flex mt-2">'
                +'<div class="upload-file-thumb">'
                    +documentHtml
                +'</div>'
                +'<div class="upload-file">'
                    +'<div id="uploadImgview" class="upload-file-view">'
                        +'<img src=""/>'
                    +'</div>'
                    +'<div id="uploadPdfiew" class="upload-pdf-view">'
                        +'<div id="pdfView" class="pdf-View"></div>'
                    +'</div>'
                +'</div>'
            +'</div>';
        }
    $('#resourcesModelBody').html(html);
    openResourceModal('userResourceModel');
    if(documentHtml!=''){
        $('#'+firstElementId).trigger('click');
    }
}



function refreshHomeworkList(lessonid, taskId){
    seencount = parseInt(localStorage.getItem('hread'));
    if(localStorage.getItem('student_homework'+lessonid)!=null && localStorage.getItem('student_homework'+lessonid)!='undefined'){

        var stdhomework = JSON.parse(localStorage.getItem('student_homework'+lessonid));
        if(stdhomework.length>0){
            var studHWlist = [];
            for(var s=0;s<stdhomework.length;s++){
                var doublecheck='';
                studHWlist = stdhomework[s];
                if(studHWlist.taskId==taskId){
                    if(studHWlist.seenStatus=='PENDING'){
                        studHWlist.seenStatus='SEEN';
                        seencount-=1;
                        stdhomework[s] = studHWlist;
                        var doublecheck ='<i class="fa fa-check-double"></i>'
                        $("#newhw"+taskId).addClass('d-none');
                        $("#dblcheck"+taskId).html(doublecheck);
                    }
                }
                if(seencount<=0){
                    localStorage.setItem('hread',0);
                    $("#newhwread").text('');
                }else{
                    localStorage.setItem('hread',seencount);
                    $("#newhwread").text(seencount+' New Homework');
                }
            }
            localStorage.setItem('student_homework'+lessonid,JSON.stringify(stdhomework));
        }

    }
}

function homeWorkModal(modalId, enrollmentid, courseid, lessonid, taskId){
    //console.log(taskId);
    uploadResources=[];
    $("#"+modalId).modal("show");
    if($(".modal-backdrop").length > 0){
        var BootStrapBackdrop = $(".modal-backdrop")[0];
        $("#dashboardContentInHTML").append(BootStrapBackdrop)
    }
    if(modalId=='homeWorkSubmissionModalID'){
        $("#"+modalId+" #homeWorkUploadview").addClass("d-none");
        $("#homeWorkSubmissionModalID .modal-dialog").addClass(".modal-md");
        $("#homeWorkSubmissionModalID .modal-dialog").removeClass("modal-xl");
        refreshHomeworkList(lessonid, taskId);
        if(localStorage.getItem('hw_detail'+taskId)!=null && localStorage.getItem('hw_detail'+taskId)!='undefined'){
            var hwdata = JSON.parse(localStorage.getItem('hw_detail'+taskId));
            if(hwdata.length>0){
                downloadList=[];
                //$("#newhw"+taskId).text('');
                //$("#hwctp").text('FRESH');
                $("#lmsHwTitle").text(hwdata[0].taskTitle);
                $("#givendate").text(hwdata[0].startDate);
                $("#givenby").text(hwdata[0].evaluatedBy);
                $("#duedate").text(hwdata[0].endDate);
                if(hwdata[0].taskReply.length>0){
                    for(var t=0;t<hwdata[0].taskReply.length;t++){
                        if(hwdata[0].taskReply[t].replyStatus=='SUBMITTED'){
                            $(".hwstatus").removeClass('bg-primary');
                            $(".hwstatus").addClass('bg-success');
                            $(".submit-status").addClass('homework-checked');
                        }else {
                            $(".hwstatus").removeClass('bg-success');
                            $(".hwstatus").addClass('bg-primary');
                            $(".submit-status").removeClass('homework-checked');

                        }
                        $(".hwstatus").text(hwdata[0].taskReply[t].replyStatus);
                    }
                }else{
                    $(".hwstatus").text('PENDING');
                    $(".hwstatus").removeClass('bg-success');
                    $(".hwstatus").addClass('bg-primary');
                }

                if(hwdata[0].replyRequired=='Y' && hwdata[0].evaluatedStatus!='CHECKED'){
                    $(".replyhw").removeClass('d-none');
                    $(".replyhw").addClass('d-flex');
                    $(".submit-status").removeClass('d-none');
                    $(".done-status").removeClass('done');

                    $(".hwcheckstatus").removeClass('bg-success');
                    $(".hwcheckstatus").addClass('bg-danger');

                }else if(hwdata[0].replyRequired=='Y' && hwdata[0].evaluatedStatus=='CHECKED'){
                    $(".replyhw").removeClass('d-flex');
                    $(".replyhw").addClass('d-none');
                    $(".submit-status").removeClass('d-none');
                    $(".done-status").addClass('done');

                    $(".hwcheckstatus").removeClass('bg-danger');
                    $(".hwcheckstatus").addClass('bg-success');
                }else{
                    $(".replyhw").removeClass('d-flex');
                    $(".replyhw").addClass('d-none');
                    $(".submit-status").addClass('d-none');
                    $(".done-status").addClass('done');

                    $(".hwstatus").text('Viewed');
                    $(".hwstatus").removeClass('bg-primary');
                    $(".hwstatus").addClass('bg-success');

                    $(".hwcheckstatus").removeClass('bg-success');
                    $(".hwcheckstatus").addClass('bg-danger');
                }


                $(".hwcheckstatus").text(hwdata[0].evaluatedStatus=='PENDING'?'NOT CHECKED':hwdata[0].evaluatedStatus);
                if(hwdata[0].seenStatus=='SEEN'){
                    $(".view-status").addClass('homework-checked');
                }else{
                    $(".view-status").removeClass('homework-checked');
                }
                if(hwdata[0].attachStatus=='Y'){
                    $(".download-status").addClass('homework-checked');
                    $(".download-status").removeClass('d-none');
                    $(".downloadAttachTeacher").removeClass('d-none');
                    $(".downloadna").addClass('d-none');
                }else{
                    $(".download-status").removeClass('homework-checked');
                    $(".download-status").addClass('d-none');
                    $(".downloadAttachTeacher").addClass('d-none');
                    $(".downloadna").removeClass('d-none');
                    //$('#hwctp1').text('N/A');

                }



                $(".home-work-discription").html(hwdata[0].taskDescription);
                if(hwdata[0].homeworkAttachment!=undefined){
                    if(hwdata[0].homeworkAttachment.length>0){
                        for(var ht=0;ht<hwdata[0].homeworkAttachment.length;ht++){
                            downloadList.push(hwdata[0].homeworkAttachment[ht].image);
                        }
                    }
                }
                $("#uploadedHomeWork").html('');
                if(hwdata[0].homeworkAttachmentStudentLocal!=undefined){
                    uploadResources=hwdata[0].homeworkAttachmentStudentLocal;
                    for(var h=0;h<hwdata[0].homeworkAttachmentStudentLocal.length;h++){
                        var UploadFile = hwdata[0].homeworkAttachmentStudentLocal[h];
                        var strFile = UploadFile['resourceName']
                        var fileLabel =
                        '<span class="d-inline-block btn bg-secondary p-1 text-white ml-1 mb-1 uploadSpan">'
                        +'<span class="file-delete" ><i class="fa fa-times mr-1 cursor"></i></span>'
                        +'<label class="uploadFileName text-white m-0">'+strFile+'</label>'
                        +'<i class="fa fa-eye ml-1" onclick="viewAttachment(\'homeWorkUploadview\',\''+strFile+'\',\'homeWorkAttachment\');"></i></span>'
                        $("#uploadedHomeWork").append(fileLabel);
                    }
                }else if(hwdata[0].homeworkAttachmentStudent!=undefined){
                    if(hwdata[0].homeworkAttachmentStudent.length>0){
                        uploadResources=[];
                        for(var h=0;h<hwdata[0].homeworkAttachmentStudent.length;h++){

                            str = hwdata[0].homeworkAttachmentStudent[h].image;
                            arr = str.split('/');
                            strFile = arr[arr.length-1];
                            var filetype = "";
                            if(isImage(strFile)){
                                filetype = "I";
                            }else if(isPdf(strFile)){
                                filetype = "P";
                            }else if(isVideo(strFile)){
                                filetype = "V";
                            }
                            var UploadFile = {};
                            UploadFile['resourceName']=strFile;
                            UploadFile['resourceFrom']='A';
                            UploadFile['resourceType']=filetype;//getFileTyp(f.type);
                            UploadFile['resourceContent']=str;
                            uploadResources.push(UploadFile);

                            var fileLabel =
                            '<span class="d-inline-block btn bg-secondary p-1 text-white ml-1 mb-1 uploadSpan">'
                            +'<label class="uploadFileName text-white m-0">'+strFile+'</label>'
                            +'<i class="fa fa-eye ml-1" onclick="viewAttachment(\'homeWorkUploadview\',\''+strFile+'\',\'homeWorkAttachment\');"></i></span>'
                            $("#uploadedHomeWork").append(fileLabel);
                        }
                    }
                }
            }
        }else{
            callStudentHomeworkDetail(taskId);
            homeWorkModal(modalId, enrollmentid, courseid, lessonid, taskId);
        }

        $(".downloadAttachTeacher").unbind().bind('click',function(){
            downloadFile(downloadList);
        });


    }
}

