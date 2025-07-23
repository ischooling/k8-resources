function chapterBar(){
  var html = '<div class="chapter_bar">'
              +'<div class="chapter_bar_openner">'
                +'<i class="fa fa-angle-right"></i>'
              +'</div>'
              +'<div class="chapter_bar_inner">'
                +'<ul class="chapter_ui">'
                  +'<li class="chapter_item">'
                    +'<a class="chapter_name" href="javascript:void(0)"  onclick="goToChapter(1)">Chapter 1</a>'
                  +'</li>'
                  +'<li class="chapter_item">'
                    +'<a class="chapter_name" href="javascript:void(0)" onclick="goToChapter(34)">Chapter 2</a>'
                  +'</li>'
                  +'<li class="chapter_item">'
                    +'<a class="chapter_name" href="javascript:void(0)" onclick="goToChapter(1)">Chapter 3</a>'
                  +'</li>'
                  +'<li class="chapter_item">'
                    +'<a class="chapter_name" href="javascript:void(0)" onclick="goToChapter(17)">Chapter 4</a>'
                  +'</li>'
                +'</ul>'
              +'</div>'
            +'</div>'; 
  return html;
} 

function container(){
  var html = '<div class="main-card mb-3 mt-3">'
              +'<div class="row">'
                +leftPart()
                +rightPart()
              +'</div>'
            +'</div>';
  return html;
}

function leftPart(){
  var html =  '<div class="col-lg-8 col-md-12 col-sm-12 col-12">'
                +bookViewer()
                +lessonVideo()
              +'</div>';
  return html;
}

function bookViewer(){
  var html = '<div class="card">'
              +'<div class="card-body">'
                  +'<div class="top-bar">'
                  +'<button class="btn btn-primary ml-1" id="prev-page"><i class="fas fa-arrow-circle-left"></i> Prev Page</button>'
                  +'<button class="btn btn-primary ml-1" id="next-page">Next Page <i class="fas fa-arrow-circle-right"></i></button>'
                  +'<span class="page-info">Page'
                  +'<input type="text" id="page-num" class="text-center form-control d-inline-block mx-1" style="width:55px">  of <span id="page-count"></span>'
                  +'</span>'
                  +'</div>'
                +'<div class="full text-center book-wrapper">'
                  +'<canvas class="shadow mt-4" id="pdf-render" style="width:100%"></canvas>'
                +'</div>'
              +'</div>'
            +'</div>';
  return html;
}

function lessonVideo(){
  var html = '<div class="full">'
              +'<div class="video-wapper align-items-center" id="videoWrapper1">'
                +'<video class="videoTag" id="video1" controls  disablePictureInPicture controlsList="nodownload">'
                  +'<source src="https://s3.amazonaws.com/testseri/test/SCS05ANLCH01TP01A.mp4" type="video/mp4">'
                  +'Your browser does not support the video tag.'
                +'</video>'
              +'</div>'
              +'<div class="video-wapper align-items-center" id="videoWrapper2">'
                +'<iframe width="800" height="450" id="video2" src="https://www.youtube.com/embed/tgbNymZ7vqY?autoplay=1&mute=1"></iframe>'
              +'</div>'
            +'</div>'
            +'<div class="video-btn-wrapper">'
              +'<button class="video_play_button ml-1 mb-1" onclick="playVideo('+"'videoWrapper1'"+', '+"'video1'"+')">'
                +'<i class="fa fa-play"></i>'
              +'</button>'
              +'<button class="video_play_button ml-1 mb-1" onclick="playVideo('+"'videoWrapper2'"+', '+"'video2'"+')">'
                +'<i class="fa fa-play"></i>'
              +'</button>'
            +'</div>';
  return html;
}

function rightPart(){
  var html =  '<div class="col-lg-4 col-md-12 col-sm-12 col-12 card pt-3  pb-3 animated zoomIn">'
                +studyResource()
                +learningResource()
              +'</div>';
  return html;
}

function studyResource(){
  var html = '<div class="full">'
                +'<div class="card box-shadow-none">'
                  +'<div class="card-header theme-bg text-white justify-content-between card-header-primary d-flex">'
                    +'<h6 class="m-0 font-size-md">Study Resources</h6>'
                  +'</div>'
                  +'<div class="card-body bg-gray">'
                    +'<div class="full study-resources-notes scrollbar-container ps--active-y">'
                      
                    +'</div>'
                    +'<div class="full">'
                      +'<textarea rows="5" class="form-control" style="resize:none" id="studyResourcesNotes" maxlength="250"></textarea>'
                      +'<button class="btn btn-secondary btn-sm mt-2 float-right" id="studyResources" onclick="addNotes('+"'studyResources'"+','+"'study-resources-notes'"+','+"'studyResourcesNotes'"+')">Submit</button> '
                    +'</div>'
                    +homeWork()
                  +'</div>'
                +'</div>'  
              +'</div>';
  return html;
}

function homeWork(){
  var html = '<div class="full">'
              +'<div class="full mt-2">'
                +'<h6 class="text-uppercase bg-danger px-1 py-2 my-1 text-white text-center">Homework submission</h6>'
              +'</div>'
              +'<div class="d-flex justify-content-between align-items-center">'
                +'<div class="attachment-work">'
                  +'<input type="file" class="attach-file"/>'
                  +'<span class="upload-work-btn">'
                    +'<i class="fa fa-paperclip"></i>&nbsp;<b>attachment</b>'
                  +'</span>'
                +'</div>'
                +'<button class="btn btn-secondary btn-sm mt-2 float-right">Submit</button>'
              +'</div>'
            +'</div>';
  return html;
} 

function learningResource(){
  var html = '<div class="full mt-3">'
              +'<div class="card box-shadow-none">'
                +'<div class="card-header theme-bg text-white justify-content-between card-header-primary d-flex">'
                  +'<h6 class="m-0 font-size-md">Learning Resources</h6>'
                +'</div>'
                +'<div class="card-body bg-gray">'
                  +'<div class="full learning-resources-notes scrollbar-container ps--active-y">'
                    
                  +'</div>'
                  +'<div class="full">'
                    +'<textarea rows="5" class="form-control" style="resize:none" id="learningResources"></textarea>'
                    +'<button class="btn btn-secondary btn-sm mt-2 float-right" id="learningResources" onclick="addNotes('+"'learningResources'"+','+"'learning-resources-notes'"+','+"'learningResources'"+')">Submit</button>'
                  +'</div>'
                +'</div>'
              +'</div>'
            +'</div>';
  return html;
}
$(document).ready(function(){
  $("#lms").append(container());
  $("body").append(chapterBar());
  var pdfUrl = 'http://localhost:8080/k8school/static/theme2/images/FlipBookPDF/science.pdf';
  pdfUrl='https://s3.amazonaws.com/testseri/test/C-MSSS-01-book.pdf';
  renderPdfView('pdf-render', pdfUrl);
});