// Demo Theme Options

$(document).ready(() => {

    $('.btn-open-options').click(function () {
        $('.ui-theme-settings').toggleClass('settings-open');
    });

    $('.close-sidebar-btn').click(function () {
    	$('.student-grievience').hide();
        var classToSwitch = $(this).attr('data-class');
        var containerElement = '.app-container';
        $(containerElement).toggleClass(classToSwitch);

        var closeBtn = $(this);

        if (closeBtn.hasClass('is-active')) {
            closeBtn.removeClass('is-active');
            $('.student-grievience').show();
        } else {
            closeBtn.addClass('is-active');
        }
    });

    $('.switch-container-class').on('click', function () {

        var classToSwitch = $(this).attr('data-class');
        var containerElement = '.app-container';
        $(containerElement).toggleClass(classToSwitch);

        $(this).parent().find('.switch-container-class').removeClass('active');
        $(this).addClass('active');

    });

    $('.switch-theme-class').on('click', function () {

        var classToSwitch = $(this).attr('data-class');
        var containerElement = '.app-container';

        if (classToSwitch == 'app-theme-white') {
            $(containerElement).removeClass('app-theme-gray');
            $(containerElement).addClass(classToSwitch);
        }

        if (classToSwitch == 'app-theme-gray') {
            $(containerElement).removeClass('app-theme-white');
            $(containerElement).addClass(classToSwitch);
        }

        if (classToSwitch == 'body-tabs-line') {
            $(containerElement).removeClass('body-tabs-shadow');
            $(containerElement).addClass(classToSwitch);
        }

        if (classToSwitch == 'body-tabs-shadow') {
            $(containerElement).removeClass('body-tabs-line');
            $(containerElement).addClass(classToSwitch);
        }

        $(this).parent().find('.switch-theme-class').removeClass('active');
        $(this).addClass('active');

    });

    $('.switch-header-cs-class').on('click', function () {
        var classToSwitch = $(this).attr('data-class');
        var containerElement = '.app-header';

        $('.switch-header-cs-class').removeClass('active');
        $(this).addClass('active');

        $(containerElement).attr('class', 'app-header');
        $(containerElement).addClass('header-shadow ' + classToSwitch);

    });

    $('.switch-sidebar-cs-class').on('click', function () {
        var classToSwitch = $(this).attr('data-class');
        var containerElement = '.app-sidebar';

        $('.switch-sidebar-cs-class').removeClass('active');
        $(this).addClass('active');

        $(containerElement).attr('class', 'app-sidebar');
        $(containerElement).addClass('sidebar-shadow ' + classToSwitch);

    });


    // data table js
    $("#example3").DataTable({
        responsive: true,
        scrollY: "265px",
    });
    $("#example4").DataTable({
        responsive: true,
        scrollY: "265px"
    });
    $("#example5").DataTable({
        responsive: true,

        scrollY: "265px"
    });
    $("#example6").DataTable({
        responsive: true,

        scrollY: "265px"
    });
    $("#example7").DataTable({
        responsive: true,

        scrollY: "265px"
    });
    $(".table-responsive-style").DataTable({
        responsive: true,

        scrollY: "250px"
    });
    $('a[data-toggle="tab"]').on('shown.bs.tab', function(e){
               
        $($.fn.dataTable.tables(true)).DataTable()
          .columns.adjust()
          .responsive.recalc();  
        $("table.dataTable thead>tr>th:nth-child(1)").trigger('click');
        $("table.dataTable thead>tr>th:nth-child(1)").trigger('click');    
    });

});