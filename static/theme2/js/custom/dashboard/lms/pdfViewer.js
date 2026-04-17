function renderPdfView(elementId, pdfUrl,pageNum, totalNumOFPages,startPages,endPages){
  var sanitizedTotalPage = sanitizePageLabel(totalNumOFPages);
  var canvas = document.querySelector('#' + elementId);
  var pageSequence = buildPageSequence(startPages || [], endPages || [], pageNum, totalNumOFPages);
  var pageKeyMap = buildPageKeyMap(pageSequence);
  var lessonRanges = buildLessonRanges(startPages || [], endPages || [], pageSequence);
  var pageInputTimer = null;
  var currentPage = resolveKnownPageLabel(pageNum, pageKeyMap);

  $("#page-count").text(sanitizedTotalPage);

  if (!pageSequence.length) {
    pageSequence.push(sanitizePageLabel(pageNum));
    pageKeyMap = buildPageKeyMap(pageSequence);
    currentPage = resolveKnownPageLabel(pageNum, pageKeyMap);
  }

  if (!currentPage) {
    currentPage = pageSequence[0];
  }

  ctx = canvas.getContext('2d');

  const renderPage = function(pageLabel) {
    customLoader(true);
    var img = new Image();
    img.src = generateBookUrl(pdfUrl, pageLabel, totalNumOFPages);
    img.onload = function(){
      const height = img.naturalHeight;
      const width = img.naturalWidth;
      canvas.height = height;
      canvas.width = width;
      var ptrn = ctx.createPattern(img,'no-repeat');
      ctx.fillStyle = ptrn;
      ctx.fillRect(0,0,canvas.width,canvas.height);
      $("#page-num").val(pageLabel);
      customLoader(false);
    };
    img.onerror = function() {
      customLoader(false);
    };
  };

  function getCurrentPageIndex() {
    return getPageIndex(currentPage, pageSequence, pageKeyMap);
  }

  function updateLessonResources(pageLabel) {
    var currentIndex = getPageIndex(pageLabel, pageSequence, pageKeyMap);

    if (currentIndex < 0) {
      return;
    }

    $.each(lessonRanges, function(index, lessonRange) {
      if (currentIndex >= lessonRange.startIndex && currentIndex <= lessonRange.endIndex) {
        loadResourcesForStartPage(lessonRange.startPage);
        return false;
      }
    });
  }

  function moveToPage(pageLabel, shouldUpdateLesson) {
    currentPage = resolveKnownPageLabel(pageLabel, pageKeyMap) || sanitizePageLabel(pageLabel);

    if (shouldUpdateLesson) {
      updateLessonResources(currentPage);
    }

    renderPage(currentPage);
    document.getElementById('page-num').value = currentPage;
  }

  renderPage(currentPage);

  const showPrevPage = function() {
    var currentIndex = getCurrentPageIndex();

    if (currentIndex <= 0) {
      return;
    }

    moveToPage(pageSequence[currentIndex - 1], true);
  };

  const showNextPage = function() {
    var currentIndex = getCurrentPageIndex();

    if (currentIndex < 0 || currentIndex >= pageSequence.length - 1) {
      return;
    }

    moveToPage(pageSequence[currentIndex + 1], true);
  };

  function goToChapter(pageNo) {
    moveToPage(pageNo, false);
    $('.book-wrapper').animate({'scrollTop': $('body, html ').offset().top - 0 }, 'slow');
    var windowWidth = $(window).width();
    if(windowWidth < 481){
      closechapaterBarPanel();
    }
  }

  function getPageValue(pageNo) {
    var resolvedPage = resolveKnownPageLabel(pageNo, pageKeyMap);

    if (!resolvedPage) {
      if(tt=='theme1'){
        showMessage(false, 'Invalid page request...');
      }else{
        showMessageTheme2(0, 'Invalid page request...','',true);
      }
      return;
    }

    moveToPage(resolvedPage, true);
  }

  $(".chapter_name").off('click.pdfViewer').on('click.pdfViewer', function(){
    isPdfLoaded =  false;
    var enrollmentid = parseInt($(this).attr("enrollmentid"));
    var courseid = parseInt($(this).attr("courseid"));
    var lessonid = parseInt($(this).attr("lessonid"));
    var startPageNo = $(this).attr("startPageNo");
    var allsessonid = $(this).attr("allsessonid");
    loadPageWithResources(enrollmentid,courseid,lessonid, allsessonid);
    goToChapter(startPageNo);
  });

  $("#page-num").off('keyup.pdfViewer').on('keyup.pdfViewer', function(){
    var $pageInput = $(this);
    clearTimeout(pageInputTimer);
    pageInputTimer = window.setTimeout(function(){
      getPageValue($pageInput.val());
    },500);
  });

  $('#prev-page').off('click.pdfViewer').on('click.pdfViewer', showPrevPage);
  $('#next-page').off('click.pdfViewer').on('click.pdfViewer', showNextPage);
}

function sanitizePageLabel(pageValue) {
  return $.trim(String(pageValue == null ? "" : pageValue)).replace(/^['"]+|['"]+$/g, '');
}

function parsePageLabel(pageValue) {
  var sanitizedValue = sanitizePageLabel(pageValue);

  if (sanitizedValue === '') {
    return null;
  }

  if (/^\d+$/.test(sanitizedValue)) {
    return {
      original: sanitizedValue,
      prefix: '',
      number: parseInt(sanitizedValue, 10)
    };
  }

  var hyphenIndex = sanitizedValue.lastIndexOf('-');
  if (hyphenIndex === -1) {
    return null;
  }

  var prefix = sanitizedValue.substring(0, hyphenIndex);
  var numberPart = sanitizedValue.substring(hyphenIndex + 1);

  if (!/^\d+$/.test(numberPart)) {
    return null;
  }

  return {
    original: sanitizedValue,
    prefix: prefix,
    number: parseInt(numberPart, 10)
  };
}

function parseRomanNumeral(value) {
  var romanValue = String(value || '').toUpperCase();
  var romanMap = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000
  };
  var total = 0;
  var previousValue = 0;
  var index;
  var currentValue;

  if (!/^[IVXLCDM]+$/.test(romanValue)) {
    return null;
  }

  for (index = romanValue.length - 1; index >= 0; index--) {
    currentValue = romanMap[romanValue.charAt(index)];

    if (currentValue < previousValue) {
      total -= currentValue;
    } else {
      total += currentValue;
      previousValue = currentValue;
    }
  }

  return total;
}

function getPrefixSortMeta(prefix) {
  var sanitizedPrefix = String(prefix || '').toUpperCase();
  var romanNumber;

  if (sanitizedPrefix === '') {
    return {
      type: 0,
      numericValue: 0,
      textValue: ''
    };
  }

  romanNumber = parseRomanNumeral(sanitizedPrefix);
  if (romanNumber != null) {
    return {
      type: 1,
      numericValue: romanNumber,
      textValue: sanitizedPrefix
    };
  }

  return {
    type: 2,
    numericValue: 0,
    textValue: sanitizedPrefix
  };
}

function comparePagePrefixes(prefixA, prefixB) {
  var prefixMetaA = getPrefixSortMeta(prefixA);
  var prefixMetaB = getPrefixSortMeta(prefixB);

  if (prefixMetaA.type !== prefixMetaB.type) {
    return prefixMetaA.type - prefixMetaB.type;
  }

  if (prefixMetaA.type === 1 && prefixMetaA.numericValue !== prefixMetaB.numericValue) {
    return prefixMetaA.numericValue - prefixMetaB.numericValue;
  }

  if (prefixMetaA.textValue < prefixMetaB.textValue) {
    return -1;
  }

  if (prefixMetaA.textValue > prefixMetaB.textValue) {
    return 1;
  }

  return 0;
}

function comparePageLabels(pageValueA, pageValueB) {
  var parsedPageA = parsePageLabel(pageValueA);
  var parsedPageB = parsePageLabel(pageValueB);
  var prefixComparison;
  var sanitizedPageA;
  var sanitizedPageB;

  if (parsedPageA && parsedPageB) {
    prefixComparison = comparePagePrefixes(parsedPageA.prefix, parsedPageB.prefix);

    if (prefixComparison !== 0) {
      return prefixComparison;
    }

    return parsedPageA.number - parsedPageB.number;
  }

  sanitizedPageA = sanitizePageLabel(pageValueA).toUpperCase();
  sanitizedPageB = sanitizePageLabel(pageValueB).toUpperCase();

  if (sanitizedPageA < sanitizedPageB) {
    return -1;
  }

  if (sanitizedPageA > sanitizedPageB) {
    return 1;
  }

  return 0;
}

function getPageKey(pageValue) {
  var parsedPage = parsePageLabel(pageValue);

  if (!parsedPage) {
    return sanitizePageLabel(pageValue).toUpperCase();
  }

  return parsedPage.prefix.toUpperCase() + '|' + parsedPage.number;
}

function formatPageLabel(prefix, number) {
  if (prefix) {
    return prefix + '-' + number;
  }

  return String(number);
}

function buildPageRangeContext(startPages, endPages, pageNum, totalNumOFPages) {
  var prefixOrder = [];
  var prefixDisplayMap = {};
  var prefixMaxMap = {};

  function addPageToContext(pageLabel) {
    var parsedPage = parsePageLabel(pageLabel);
    var prefixKey;

    if (!parsedPage) {
      return;
    }

    prefixKey = parsedPage.prefix.toUpperCase();

    if ($.inArray(prefixKey, prefixOrder) === -1) {
      prefixOrder.push(prefixKey);
      prefixDisplayMap[prefixKey] = parsedPage.prefix;
    }

    prefixMaxMap[prefixKey] = Math.max(prefixMaxMap[prefixKey] || 0, parsedPage.number);
  }

  $.each(startPages || [], function(_, pageLabel) {
    addPageToContext(pageLabel);
  });

  $.each(endPages || [], function(_, pageLabel) {
    addPageToContext(pageLabel);
  });

  addPageToContext(pageNum);
  addPageToContext(totalNumOFPages);

  prefixOrder.sort(function(prefixKeyA, prefixKeyB) {
    return comparePagePrefixes(prefixDisplayMap[prefixKeyA], prefixDisplayMap[prefixKeyB]);
  });

  return {
    prefixOrder: prefixOrder,
    prefixDisplayMap: prefixDisplayMap,
    prefixMaxMap: prefixMaxMap
  };
}

function expandPageRange(startPage, endPage, pageRangeContext) {
  var expandedPages = [];
  var parsedStart = parsePageLabel(startPage);
  var parsedEnd = parsePageLabel(endPage);
  var startPrefixIndex;
  var endPrefixIndex;

  if (!parsedStart || !parsedEnd) {
    return expandedPages;
  }

  startPrefixIndex = $.inArray(parsedStart.prefix.toUpperCase(), pageRangeContext.prefixOrder);
  endPrefixIndex = $.inArray(parsedEnd.prefix.toUpperCase(), pageRangeContext.prefixOrder);

  if (startPrefixIndex === -1 || endPrefixIndex === -1 || startPrefixIndex > endPrefixIndex) {
    return expandedPages;
  }

  $.each(pageRangeContext.prefixOrder, function(prefixIndex, prefixKey) {
    var startNumber;
    var endNumber;
    var number;

    if (prefixIndex < startPrefixIndex || prefixIndex > endPrefixIndex) {
      return;
    }

    startNumber = prefixIndex === startPrefixIndex ? parsedStart.number : 1;
    endNumber = prefixIndex === endPrefixIndex ? parsedEnd.number : (pageRangeContext.prefixMaxMap[prefixKey] || 0);

    for (number = startNumber; number <= endNumber; number++) {
      expandedPages.push(formatPageLabel(pageRangeContext.prefixDisplayMap[prefixKey], number));
    }
  });

  return expandedPages;
}

function buildPageSequence(startPages, endPages, pageNum, totalNumOFPages) {
  var pageSequence = [];
  var uniquePageMap = {};
  var pageRangeContext = buildPageRangeContext(startPages, endPages, pageNum, totalNumOFPages);

  $.each(startPages || [], function(index, startPage) {
    $.each(expandPageRange(startPage, endPages[index], pageRangeContext), function(_, pageLabel) {
      var pageKey = getPageKey(pageLabel);

      if (!uniquePageMap[pageKey]) {
        uniquePageMap[pageKey] = true;
        pageSequence.push(pageLabel);
      }
    });
  });

  if (!pageSequence.length) {
    var sanitizedCurrentPage = sanitizePageLabel(pageNum);

    if (sanitizedCurrentPage !== '') {
      pageSequence.push(sanitizedCurrentPage);
    }
  }

  pageSequence.sort(comparePageLabels);

  return pageSequence;
}

function buildPageKeyMap(pageSequence) {
  var pageKeyMap = {};

  $.each(pageSequence || [], function(_, pageLabel) {
    pageKeyMap[getPageKey(pageLabel)] = pageLabel;
  });

  return pageKeyMap;
}

function resolveKnownPageLabel(pageValue, pageKeyMap) {
  var sanitizedValue = sanitizePageLabel(pageValue);
  var pageKey;

  if (sanitizedValue === '') {
    return '';
  }

  pageKey = getPageKey(sanitizedValue);

  if (pageKeyMap[pageKey]) {
    return pageKeyMap[pageKey];
  }

  return '';
}

function getPageIndex(pageValue, pageSequence, pageKeyMap) {
  var resolvedPage = resolveKnownPageLabel(pageValue, pageKeyMap);

  if (!resolvedPage) {
    return -1;
  }

  return $.inArray(resolvedPage, pageSequence || []);
}

function buildLessonRanges(startPages, endPages, pageSequence) {
  var lessonRanges = [];
  var orderedPages = pageSequence || [];
  var pagePositionMap = {};

  $.each(orderedPages, function(index, pageLabel) {
    pagePositionMap[getPageKey(pageLabel)] = index;
  });

  $.each(startPages || [], function(index, startPage) {
    var startIndex = pagePositionMap[getPageKey(startPage)];
    var endIndex = pagePositionMap[getPageKey(endPages[index])];

    if (startIndex == null || endIndex == null) {
      return;
    }

    lessonRanges.push({
      startPage: sanitizePageLabel(startPage),
      startIndex: startIndex,
      endIndex: endIndex
    });
  });

  lessonRanges.sort(function(lessonRangeA, lessonRangeB) {
    return lessonRangeA.startIndex - lessonRangeB.startIndex;
  });

  return lessonRanges;
}

function loadResourcesForStartPage(startPage) {
  var $lessonElement = $(".chapter_name").filter(function() {
    return sanitizePageLabel($(this).attr("startPageNo")) === sanitizePageLabel(startPage);
  }).first();

  if (!$lessonElement.length) {
    return;
  }

  var enrollmentid = parseInt($lessonElement.attr("enrollmentid"));
  var courseid = parseInt($lessonElement.attr("courseid"));
  var lessonid = parseInt($lessonElement.attr("lessonid"));
  var allsessonid = $lessonElement.attr("allsessonid");

  loadPageWithResources(enrollmentid,courseid,lessonid, allsessonid);
}

function generateBookUrl(pdfUrl, pageNumber, totalNumOFPages){
  var fileName=pdfUrl.substring(pdfUrl.lastIndexOf('/')+1);
  return 'https://k8school.s3.amazonaws.com/books/'+fileName.substring(0,fileName.length-4)+generateSequenceNumber(pageNumber,totalNumOFPages,'.png');
}

function generateSequenceNumber(pageNumber, totalNumOFPages, extension) {
    var value = $.trim(String(pageNumber || ""));
    var totalPages = parseInt(String(totalNumOFPages || "").replace(/[^\d]/g, ""), 10) || 0;
    var ext = extension || "";

    var match = value.match(/^([A-Za-z]+)?-?(\d+)$/);
    if (!match) {
        return "-" + value + ext;
    }

    var stringPart = match[1] || "";
    var numberPart = match[2];

    var padLength = 1;
    if (totalPages >= 100) {
        padLength = 3;
    } else if (totalPages >= 10) {
        padLength = 2;
    }

    var paddedNumber = numberPart.padStart(padLength, "0");

    if (stringPart) {
        return "-" + stringPart + "-" + paddedNumber + ext;
    }

    return "-" + paddedNumber + ext;
}
