function renderPdfView(elementId, pdfUrl,pageNum, totalNumOFPages,startPages,endPages){
  $("#page-count").text(totalNumOFPages)
  pageNum = parseInt(pageNum);
  var canvas = document.querySelector('#' + elementId);
  ctx = canvas.getContext('2d');
  // Render the page
  const renderPage = num => {
    customLoader(true);
    // create new image object to use as pattern
    var img = new Image();
    img.src = generateBookUrl(pdfUrl, num, totalNumOFPages);
    img.onload = function(){
      // create pattern
      const height = img.naturalHeight;
      const width = img.naturalWidth;
      canvas.height = height;
      canvas.width = width;
      var ptrn = ctx.createPattern(img,'no-repeat');
      ctx.fillStyle = ptrn;
      ctx.fillRect(0,0,canvas.width,canvas.height);
      $("#page-num").val(num)
      customLoader(false);
    }
  }
  renderPage(pageNum);
  // Show Prev Page
  const showPrevPage = () => {
    if (pageNum <= 1) {
      return;
    }else{
      pageNum--;
      $.each(startPages, function( index, value ) {
        if(pageNum == value || pageNum > value && pageNum <= endPages[index]){
          var ele = ".starte"+value;
          var enrollmentid = parseInt($(ele).attr("enrollmentid"));
          var courseid = parseInt($(ele).attr("courseid"));
          var lessonid = parseInt($(ele).attr("lessonid"));
          var startPageNo = parseInt($(ele).attr("startPageNo"));
          var allsessonid = $(ele).attr("allsessonid");
          loadPageWithResources(enrollmentid,courseid,lessonid, allsessonid);
        }
      });
    }
    renderPage(pageNum);
    document.getElementById('page-num').value = pageNum;
  };

  // Show Next Page
  const showNextPage = () => {
    if (pageNum >= totalNumOFPages) {
      return;
    }else{
      pageNum++;
      $.each(startPages, function( index, value ) {
        if(pageNum == value || pageNum > value && pageNum <= endPages[index]){
          var ele = ".starte"+value;
          var enrollmentid = parseInt($(ele).attr("enrollmentid"));
          var courseid = parseInt($(ele).attr("courseid"));
          var lessonid = parseInt($(ele).attr("lessonid"));
          var startPageNo = parseInt($(ele).attr("startPageNo"));
          var allsessonid = $(ele).attr("allsessonid");
          loadPageWithResources(enrollmentid,courseid,lessonid, allsessonid);
        }
      });
    }
    renderPage(pageNum);
    document.getElementById('page-num').value = pageNum;
  };

  function goToChapter(pageNo) {
    renderPage(pageNo);
    document.getElementById('page-num').value = pageNo;
    pageNum = pageNo;
    $('.book-wrapper').animate({'scrollTop': $('body, html ').offset().top - 0 }, 'slow');
    var windowWidth = $(window).width();
    if(windowWidth < 481){
      closechapaterBarPanel();
    }
  }

  function getPageValue(pageNo) {
    if (isNaN(pageNo)) {
      //alert('Invalid page request.');
    } else if (pageNo > totalNumOFPages || pageNo < 1) {
        //alert('Invalid page request...');
        if(tt=='theme1'){
          showMessage(false, 'Invalid page request...');
        }else{
          showMessageTheme2(0, 'Invalid page request...','',true);
        }
    } else {
        pageNum = pageNo;
        $.each(startPages, function( index, value ) {
          if(pageNum == value || pageNum > value && pageNum <= endPages[index]){
            var ele = ".starte"+value;
            var enrollmentid = parseInt($(ele).attr("enrollmentid"));
            var courseid = parseInt($(ele).attr("courseid"));
            var lessonid = parseInt($(ele).attr("lessonid"));
            var startPageNo = parseInt($(ele).attr("startPageNo"));
            var allsessonid = $(ele).attr("allsessonid");
            loadPageWithResources(enrollmentid,courseid,lessonid, allsessonid);
          }
        });
        renderPage(pageNo);
    }
  }

  $(".chapter_name").unbind().bind('click', function(e){
    isPdfLoaded =  false;
    var enrollmentid = parseInt($(this).attr("enrollmentid"));
    var courseid = parseInt($(this).attr("courseid"));
    var lessonid = parseInt($(this).attr("lessonid"));
    var startPageNo = parseInt($(this).attr("startPageNo"));
    var allsessonid = $(this).attr("allsessonid");
    loadPageWithResources(enrollmentid,courseid,lessonid, allsessonid);
    goToChapter(startPageNo);
  });

  $("#page-num").keyup(function(){
    var getPageNo = parseInt($(this).val());
    window.setTimeout(function(){
      getPageValue(getPageNo);
    },500);
  });
  // Button Events
  document.querySelector('#prev-page').addEventListener('click', showPrevPage);
  document.querySelector('#next-page').addEventListener('click', showNextPage);
}

function generateBookUrl(pdfUrl, pageNumber, totalNumOFPages){
  var fileName=pdfUrl.substring(pdfUrl.lastIndexOf('/')+1);
  return 'https://k8school.s3.amazonaws.com/books/'+fileName.substring(0,fileName.length-4)+generateSequenceNumber(pageNumber,totalNumOFPages,'.png');
}

function generateSequenceNumber(pageNumber, totalNumOFPages, extension){
  if(parseInt(totalNumOFPages)<=10){
    if(pageNumber<10){
      return '-'+pageNumber+extension;
    }
  }else if(parseInt(totalNumOFPages)<=100){
    if(pageNumber<10){
      return '-0'+pageNumber+extension;
    }else if(pageNumber<100){
      return '-'+pageNumber+extension;
    }
  }else if(parseInt(totalNumOFPages)<=1000){
    if(pageNumber<10){
      return '-00'+pageNumber+extension;
    }else if(pageNumber<100){
      return '-0'+pageNumber+extension;
    }else if(pageNumber<1000){
      return '-'+pageNumber+extension;
    }
  }
}