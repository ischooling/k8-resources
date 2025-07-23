//EXTRA ACTIVITY COUNTER SCRIPT START HERE//
function makeTimer(myActId, myEndDate, currentDate) {
	var endTime = new Date(myEndDate+" GMT+0530");
	endTime = (Date.parse(endTime) / 1000);

	var now = currentDate;
	now = (Date.parse(now) / 1000);

	var timeLeft = endTime - now;

	var days = Math.floor(timeLeft / 86400);
	var hours = Math.floor((timeLeft - (days * 86400)) / 3600);
	var minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600 )) / 60);
	var seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));

	if (hours < "10") { hours = "0" + hours; }
	if (minutes < "10") { minutes = "0" + minutes; }
	if (seconds < "10") { seconds = "0" + seconds; }

	$("#days"+myActId).html(days + "<span class='count-span'>Days</span>");
	$("#hours"+myActId).html(hours + "<span class='count-span'>Hours</span>");
	$("#minutes"+myActId).html(minutes + "<span class='count-span'>Minutes</span>");
	$("#seconds"+myActId).html(seconds + "<span class='count-span'>Seconds</span>");
}

setInterval(function() {
	$('.myActivityLoop').each(function() {
		var timerId = $(this).attr('data-timeid');
		var startDate = $(this).attr('data-timedate');
		var dateString = $(this).attr('data-curDate');
		var timeString = new Date().toString();
		dateString = dateString.split(' ').slice(0, 5).join(' ');
		presentTimeString = timeString.split(' ').slice(0, 5).join(' ');
		var newDateArray = dateString.split(' ');
		var presentTimeStringArray = presentTimeString.split(' ');
		var newDate = newDateArray[0] + ' ' + newDateArray[1] + ' ' + newDateArray[2] + ' ' + presentTimeStringArray[4];newDate;
		if(startDate < newDate){
			$(this).find('.counter-div').hide();
			$(this).find('.counter-div-wrapper').hide();
			$(this).find('.join-div').show();
			$(this).find('.activity-btn').hide();
			$('#displayJoinLinkDiv'+timerId).show();
		}
		makeTimer(timerId, startDate, newDate);
	});
}, 1000);
//EXTRA ACTIVITY COUNTER SCRIPT END HERE//