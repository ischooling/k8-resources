const dt = new DataTransfer();

function playVideo(videoWrapper, videoId) {
 var popup = document.getElementById(videoId);
 popup.classList.toggle("show");
 $("#"+videoWrapper).addClass('d-flex');
 if (popup.paused){
   popup.play();
 }
 else{
   popup.play();
 }
}

function closeVideo(videoWrapper, videoId){
  var popup = document.getElementById(videoId);
  $("#"+videoWrapper).removeClass('d-flex');
  popup.pause();
}

function readMoreNotes(src){
  $(src).parent().toggleClass("read-more-active");
  if($(src).text() == "Read More"){
    $(src).text('Read Less');
  }
  else{
    $(src).text('Read More');
  }
}

function openResourceModal(modalId){
  $("#"+modalId).modal("show");
}

function chapaterBarPanel(){
  var headerHeight = '';
  if(tt == "theme1"){
    headerHeight = $("nav.navbar").height();
  }else{
    headerHeight = $(".sticky-header").height();
  }
  $(".chapter_bar").css({"height":'calc(100vh - '+headerHeight+'px)', "top":headerHeight+"px"});
}
function openchapaterBarPanel(){
  $('.chapter_bar').toggleClass("open_chapter_bar");
  $('.chapter_bar_openner .fa').toggleClass('fa-book fa-times');

  // if(!$('.chapter_bar').hasClass("open_chapter_bar")){
  //   $('.chapter_bar').toggleClass("open_chapter_bar");
  //   // setTimeout(function(){
  //   //   $('.chapter_bar').removeClass("open_chapter_bar");
  //   // }, 5000);
  // }
  closeMenu();
}
function closechapaterBarPanel(){
  $('.chapter_bar').removeClass("open_chapter_bar");
  $('.chapter_bar_openner .fa').removeClass("fa-times");
  $('.chapter_bar_openner .fa').addClass("fa-book");
}

$(document).ready(function(){
   $("#userResourceModel").modal("show");

});




function ViewUploadFile(elementId, type, viewElementId, hideElementId){
  if(type == "I"){
    $("#"+hideElementId).hide();
    $("#"+viewElementId).show();
    var filePath = $('#'+elementId).find('.img').attr("src");
    $("#"+viewElementId+' img').attr("src",filePath);
    $(".upload-file").css({"align-items":"center"});

  }else{
    var filePath = $('#'+elementId).find('.img').attr("pdfPath");
    $("#"+hideElementId).hide()
    $("#"+viewElementId).show();
    PDFObject.embed(filePath, "#"+viewElementId+" #pdfView");
    $(".upload-file").css({"align-items":"flex-start"});
  }
}


function viewAttachment(modalId,fileName, attachmentType, attachment){
  if(attachmentType == 'homeWorkAttachment'){
    $("#homeWorkSubmissionModalID .modal-dialog").removeClass(".modal-md");
    $("#homeWorkSubmissionModalID .modal-dialog").addClass("modal-xl");
    $("#"+modalId).removeClass('d-none');
    $(".homework-upload-view").addClass("max-width-500");
  }
  for(index=0;index<uploadResources.length;index++){
    if(uploadResources[index].resourceName==fileName){
      if(uploadResources[index].resourceType=='I'){
        if(uploadResources[index].resourceFrom=='A'){
          $("#"+modalId+" .upload_img img").attr('src',uploadResources[index].resourceContent)
        }else{
          $("#"+modalId+" .upload_img img").attr('src','data:image/png;base64,'+uploadResources[index].resourceContent)

        }
        $("#"+modalId+' .upload_img').removeClass("d-none");
        $("#"+modalId+" .upload_pdf").addClass("d-none");
      }else if(uploadResources[index].resourceType=='P'){

        // if(attachmentType == 'homeWorkAttachment'){
        //   PDFObject.embed(filePath, "#"+modalId+" .homeWorkPdf");
        // }
        if(uploadResources[index].resourceFrom=='A'){
          $("#"+modalId+" .upload_pdf .pre_upload_pdf").attr("data", uploadResources[index].resourceContent);
          $("#"+modalId+" .upload_pdf a.download-pdf-btn").attr("href",uploadResources[index].resourceContent);
        }else{
          var decodeB64 = uploadResources[index].resourceContent;
          $("#"+modalId+" .upload_pdf .pre_upload_pdf").attr("data", "data:application/pdf;base64,"+decodeB64);
          $("#"+modalId+" .upload_pdf a.download-pdf-btn").attr("href","data:application/pdf;base64,"+decodeB64);
          $("#"+modalId+" .upload_img img").attr('src','data:image/png;base64,'+uploadResources[index].resourceContent)
        }
        $("#"+modalId+" .upload_pdf").removeClass("d-none");
        $("#"+modalId+' .upload_img').addClass("d-none");


      }else if(uploadResources[index].resourceType=='V'){
      }
      if(attachmentType == 'studyResourcesAttachment'){
        $("#"+modalId).modal("show");
      }
    }
  }
 }

function uploadFile(enrollmentid, courseid, lessonid, inputId, outputId, errorEleId, viewEleID,  attachmentType){
  var input = document.getElementById(inputId);
  var inputVal = $("#"+inputId).val();
  var ext = inputVal.split('.').pop();
  var uploadedFileLength = $("#"+outputId+" .uploadSpan").length;
  var fsize = $("#"+inputId)[0].files[0].size;
  var fileSize = Math.round((fsize / 1024));

  if(fileSize <= 5120){
    if(ext == "pdf" || ext == "png" || ext == "jpg" || ext == "jpeg"){
      if(dt.items.length < 5 && input.files.length < 6 && uploadedFileLength < 5){
        $("#"+errorEleId).addClass('d-none').text("");
        for(var i = 0; i < input.files.length; i++){
          handleFileSelect(input.files[i]);
          var fileLabel =
            '<span class="d-inline-block btn bg-secondary p-1 text-white ml-1 mb-1 uploadSpan">'
              +'<span class="file-delete" ><i class="fa fa-times mr-1 cursor"></i></span>'
              +'<label class="uploadFileName text-white m-0">'+input.files.item(i).name+'</label>'
              +'<i class="fa fa-eye ml-1" onclick="viewAttachment(\''+viewEleID+'\',\''+input.files.item(i).name+'\', \''+attachmentType+'\',);"></i></span>'
          $("#"+outputId).append(fileLabel);
        };
        for (let file of input.files) {
          dt.items.add(file);
        }
        input.files = dt.files;
      //
      $('.file-delete').unbind().bind('click',function(){
        uploadResources=[];
        console.log('called how many times')
        var name = $(this).parent().find('.uploadFileName').text();
        $(this).parent().remove();
        for(var i = 0; i < dt.items.length; i++){
          if(name === dt.items[i].getAsFile().name){
            dt.items.remove(i);
            if(dt.items.length < 5){
              $("#"+errorEleId).addClass('d-none').text("");
            }
            continue;
          }
        }
        document.getElementById(inputId).files = dt.files;
        for(var j = 0; j < dt.files.length; j++){
          handleFileSelect(dt.files[j]);
        }
        if($("#homeWorkSubmissionModalID .modal-dialog").hasClass("modal-xl") == true){
          $("#homeWorkSubmissionModalID .modal-dialog").removeClass("modal-xl");
          $("#homeWorkSubmissionModalID #homeWorkUploadview").addClass("d-none");
          $(".homework-upload-view").removeClass("max-width-500");
        }
      });


      }else{
        $("#"+errorEleId).removeClass('d-none').text("You can only upload a maximum of 5 files");
        setTimeout(function(){
          $("#"+errorEleId).addClass('d-none');
        }, 8000);
      }
    }
    else{
      $("#"+errorEleId).removeClass('d-none').text('Please upload files in PDF, JPG and JPEG with max size of 5MB');
      setTimeout(function(){
        $("#"+errorEleId).addClass('d-none');
      }, 8000);
    }
  }else{
    $("#"+errorEleId).removeClass('d-none').text('Please upload files in PDF, JPG and JPEG with max size of 5MB');
  }
}


function removeImg(ind){
  console.log(ind)
  $('.imgrm'+ind).text();
}

function validateTextArea(elementId, btnId, enrollmentid, courseid, lessonid){
  var textAreaLength = $("#"+elementId).val().length;
  if(textAreaLength > 0){
    $("#"+btnId).removeAttr('disabled');

  }else{
    $("#"+btnId).attr('disabled','disabled');
  }
}
$(".studyResourcesNotes").click(function(){
  var textAreaLength = $(this).val().length;
    if(textAreaLength > 0){

    }
});

function crousel(){
  //alert("aaaaaaaaaaaa")
  $('.video-btn-wrapper').owlCarousel({
    loop:true,
    margin:10,
    responsiveClass:true,
    navText:["<i class='fa fa-chevron-left'></i>","<i class='fa fa-chevron-right'></i>"],
    responsive:{
      0:{
        items:1,
        nav:true
      },
      550:{
        items:2,
        nav:true
      },
      786:{
        items:2,
        nav:true
      },
      1000:{
        items:3,
        nav:true,
        loop:false
      },
      1200:{
        items:4,
        nav:true,
        loop:false
      },
      1349:{
        items:4,
        nav:true,
        loop:false
      }
    }
  });
}



function lmsCourseDataTable (tableID){
  var lmsCourseTable = $('#'+tableID).DataTable({
    columnDefs: [{
        orderable: false,
        className: 'select-checkbox',
        targets: 0
    }],
    select: {
        style: 'os',
        selector: 'td:first-child'
    },
    order: [
        [1, 'asc']
    ]
  });
  lmsCourseTable.on("click", "th.select-checkbox", function() {
    if ($("th.select-checkbox").hasClass("selected")) {
      lmsCourseTable.rows().deselect();
        $("th.select-checkbox").removeClass("selected");
    } else {
      lmsCourseTable.rows().select();
        $("th.select-checkbox").addClass("selected");
    }
  }).on("select deselect", function() {
    ("Some selection or deselection going on")
    if (lmsCourseTable.rows({
            selected: true
        }).count() !== lmsCourseTable.rows().count()) {
        $("th.select-checkbox").removeClass("selected");
    } else {
        $("th.select-checkbox").addClass("selected");
    }
  });
}

$(document).mouseup(function(e){
    var container = $(".chapter_bar");
    // if the target of the click isn't the container nor a descendant of the container
    if (!container.is(e.target) && container.has(e.target).length === 0 && container.hasClass("open_chapter_bar")){
        container.removeClass("open_chapter_bar");
        $('.chapter_bar_openner .fa').removeClass("fa-times");
        $('.chapter_bar_openner .fa').addClass("fa-book");
    }
});

function slideResource(){
  var windowWidth = $(window).width();
  $(".my-course-btn .fa").toggleClass("fa-book fa-times");
  if(windowWidth < 500){
    $(".rightContentDiv").css({"width":windowWidth - 10 + "px", "max-width":windowWidth - 10 + "px","flex-basis":windowWidth - 10 + "px"});
  }else{
    $(".rightContentDiv").css({"width":"450px","max-width":'450px',"flex-basis":"450px"});
  }
  $(".leftContentDiv").toggleClass("slide-book");
}


$(".app-sidebar__inner ul li a").on("click", function(){
  if($(this).hasClass('mm-active') && $(this).hasClass('student-home')){
        if($('#dashboardContentInHTML .check-activity-page-load').length < 1){
            $('.ui-theme-settings').addClass("d-none");
            $("#main-nav2").removeClass("metismenu")
        }else{
            $('.ui-theme-settings').removeClass("d-none");
        }
    }else{
        $('.ui-theme-settings').removeClass("d-none settings-open");
        $("#TooltipDemo").find("i").addClass("fa-angle-left").removeClass('fa-angle-right');
    }
});
function fullScreenMode() {
  var docWindow = window.document;
  var element = document.getElementById("dashboardContentInHTML");
 
  var requestFullScreen = element.requestFullscreen || element.mozRequestFullScreen || element.webkitRequestFullScreen || element.msRequestFullscreen;
  var cancelFullScreen = docWindow.exitFullscreen || docWindow.mozCancelFullScreen || docWindow.webkitExitFullscreen || docWindow.msExitFullscreen;
 
  if(!docWindow.fullscreenElement && !docWindow.mozFullScreenElement && !docWindow.webkitFullscreenElement && !docWindow.msFullscreenElement) {
    var chapterName = parseFloat($(".chapter-name").parent().outerHeight());
    var topBar = parseFloat($(".top-bar").outerHeight());
    var cardBodyPaddingTop = $(".bookViewer .card-body").css('padding-top');
    var cardBodyPaddingBottom = $(".bookViewer .card-body").css('padding-bottom');
    var lessonResourcesHeight = parseFloat($(".lessonResources").outerHeight());
    cardBodyPaddingTop = cardBodyPaddingTop.split("p");
    cardBodyPaddingBottom = cardBodyPaddingBottom.split("p");
    var cardBodyPadding = parseFloat(cardBodyPaddingTop[0]) + parseFloat(cardBodyPaddingBottom[0]);
    var thumbVideoHeight =  lessonResourcesHeight + cardBodyPadding + topBar + chapterName + 10;
    $(".full_screen_view_btn .maximize").hide();
    $(".full_screen_view_btn .minimize").show();
    $(".leftContentDiv").addClass("fullScreenView");
    $(".fullScreenView .book-wrapper").css({"max-height":'calc(100vh - '+thumbVideoHeight+'px)'});
    $(".chapter_bar").css({"height":'100vh', "top":"0px"});
    $("#dashboardContentInHTML").css({"background":"#f1f4f6"})
    requestFullScreen.call(element);
  }
  else {
    if((window.fullScreen) || (window.innerWidth == screen.width && window.innerHeight == screen.height)){
          cancelFullScreen.call(docWindow);
    }
    $(".full_screen_view_btn .maximize").show();
    $(".full_screen_view_btn .minimize").hide();
    $(".leftContentDiv").removeClass("fullScreenView");
    $(".book-wrapper").css({"max-height":"500px"});
    chapaterBarPanel();
  }
 }

 function exitFullscreen(){
  var docWindow = window.document;
  var cancelFullScreen = docWindow.exitFullscreen || docWindow.mozCancelFullScreen || docWindow.webkitExitFullscreen || docWindow.msExitFullscreen;
  if((window.fullScreen) || (window.innerWidth == screen.width && window.innerHeight == screen.height)){
        cancelFullScreen.call(docWindow);
  }
 }

function uiSetWindowSize(req){
  if(true){
    var headerHeight = parseInt($(".sticky-header").outerHeight());
    var footerHeight = parseInt($(".app-wrapper-footer").outerHeight())
    var chapterName = parseInt($(".chapter-name").parent().outerHeight());
    var topBar = parseInt($(".top-bar").outerHeight());
    var cardBodyPaddingTop = $(".bookViewer .card-body").css('padding-top');
    var cardBodyPaddingBottom = $(".bookViewer .card-body").css('padding-bottom');
    var lessonResourcesHeight = parseInt($(".lessonResources").outerHeight());
    cardBodyPaddingTop = cardBodyPaddingTop.split("p");
    cardBodyPaddingBottom = cardBodyPaddingBottom.split("p");
    var cardBodyPadding = parseInt(cardBodyPaddingTop[0]) + parseInt(cardBodyPaddingBottom[0]);
    var minusHeight =  headerHeight + footerHeight + 17;
    var bookHeight =  headerHeight + footerHeight + lessonResourcesHeight + cardBodyPadding + topBar + chapterName + 21;
    $(".book-wrapper").css({"max-height":'calc(100vh - '+bookHeight+'px)'});
    $(".rightContentDiv").css({"height":'calc(100vh - '+minusHeight+'px)'});
    $(".lms-ui").attr("style","margin-bottom: 0px !important");
    chapaterBarPanel();
  }
}

if(document.addEventListener){
 document.addEventListener('fullscreenchange', exitHandler, false);
 document.addEventListener('mozfullscreenchange', exitHandler, false);
 document.addEventListener('MSFullscreenChange', exitHandler, false);
 document.addEventListener('webkitfullscreenchange', exitHandler, false);
}
function exitHandler(){
  if (!document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement){
    $(".full_screen_view_btn .maximize").show();
    $(".full_screen_view_btn .minimize").hide();
    $(".leftContentDiv").removeClass("fullScreenView");
    $(".book-wrapper").css({"max-height":"500px"});
    chapaterBarPanel();
  }
}

function windowScrollToTop(){
	$("html, body").animate({ scrollTop: "0" });
}

$(window).on('keyup', function(e) {
  //alert("Escape")
  if (e.key == "Escape") {
    var videoWrapperID = $(".video-wapper.d-flex").attr("id");
    var videoID = $(".video-wapper.d-flex").children().attr("id");
    closeVideo(videoWrapperID, videoID);
  }
 });

 $(document).ready(function(){
  $("#homeWorkSubmissionModalID").modal("show");
 });

 $(document).on('show.bs.modal', '.modal', function() {
  const zIndex = 1040 + 10 * $('.modal.show').length;
  $(this).css('z-index', zIndex);
  setTimeout(() => $('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack'));
});


