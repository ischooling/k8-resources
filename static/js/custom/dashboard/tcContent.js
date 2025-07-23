function TcContent(){
    var html = 
    `<div class="" style="background: url("${PATH_FOLDER_IMAGE2}bg-tc-form.png"); background-size: cover; background-repeat: no-repeat; padding-bottom: 200px;">
        <div class="d-flex justify-content-center justify-content-md-between align-items-center" style="gap: 25px;">
            <img src="${PATH_FOLDER_IMAGE2}left-unit-tc.png" class="sides-img" alt="" style="width: 10%">
            <img src="${PATH_FOLDER_IMAGE2}k8-logo-tc.png" class="logos" alt="" style="width: 25.2%">
            <img src="${PATH_FOLDER_IMAGE2}100-percent-tc.png" class="" alt="" style="width: 16.66%;">
            <img src="${PATH_FOLDER_IMAGE2}cognia-logo-tc.png" class="" alt="" style="width: 16.66%;">
            <img src="${PATH_FOLDER_IMAGE2}cognia-logo-round-tc.png" class="logos" alt="" style="width: 10%">
            <img src="${PATH_FOLDER_IMAGE2}right-unit-tc.png" class="sides-img" alt="" style="width: 10%">
        </div>

        <p class="border border-primary text-center font-weight-bold mx-auto p-2 mt-5 main-heading-text">TRANSFER CERTIFICATE APPLICATION FORM</p>

        <form onsubmit="handleSaveRequiredData(event)">
            <div class="mt-5 w-75 mx-auto">
                <p class="font-size-lg font-weight-bold">STUDENT DETAILS</p>
                    <div class="d-flex w-100 mb-3">
                        <p class="m-0">Full Name:</p>
                        <div class="px-2" style="flex: 1;">
                            <p id="student-name" class="m-0 px-2" style="font-weight: 600; color: #373635;">XXXXX</p>
                            <hr class="m-0" style="border: 1px solid #373635;">
                        </div>
                    </div>

                <div class="d-flex flex-lg-row flex-column w-100 mb-3" style="gap: 16px">
                    <div class="d-flex col-xl-6 col-lg-6 col-md-12 col-12 align-items-center px-0">
                        <p class="m-0">Current Class/Grade:</p>
                        <div class="px-2" style="flex: 1;">
                            <p id="student-grade" class="m-0 px-2" style="font-weight: 600; color: #373635;">Grade</p>
                            <hr class="m-0" style="border: 1px solid #373635;">
                        </div>
                    </div>

                    <div class="d-flex col-xl-6 col-lg-6 col-md-12 col-12 align-items-center px-0">
                        <p class="m-0">Date of Birth:</p>
                        <div class="px-2 d-flex font-weight-bold" style="flex: 1;">
                            <div class="d-flex mr-2">
                                <div id="day1" class="p-1" style="border: 1px solid #373635;">D</div>
                                <div id="day2" class="p-1" style="border: 1px solid #373635;">D</div>
                            </div>
                            <div class="d-flex mr-2">
                                <div id="month1" class="p-1" style="border: 1px solid #373635;">M</div>
                                <div id="month2" class="p-1" style="border: 1px solid #373635;">M</div>
                            </div>
                            <div class="d-flex">
                                <div id="year1" class="p-1" style="border: 1px solid #373635;"></div>
                                <div id="year2" class="p-1" style="border: 1px solid #373635;">Y</div>
                                <div id="year3" class="p-1" style="border: 1px solid #373635;">Y</div>
                                <div id="year4" class="p-1" style="border: 1px solid #373635;">Y</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="d-flex w-100 mb-5">
                    <p class="m-0">Admission Number:</p>
                    <div class="px-2" style="flex: 1;">
                        <p id="admission-number" class="m-0 px-2" style="font-weight: 600; color: #373635;">INDXXXXXX</p>
                        <hr class="m-0" style="border: 1px solid #373635;">
                    </div>
                </div>

                <div class="mb-4">
                    <p class="font-size-lg font-weight-bold">REASON FOR LEAVING</p>
                    <textarea name="reasonForLeaving" id="reasonForLeaving" rows="10" class="w-100 rounded p-2 bg-transparent" style="border: 2px solid #373635;"></textarea>
                    <p id="errorReason" class="mt-1 font-small text-right font-weight-bold text-danger"></p>
                </div>

                <div class="">
                    <p class="font-size-lg font-weight-bold m-0">Fill the Details of the school where student is going to shift or seek admission</p>
                    <p class="m-0"><i>(Please fill the exact & correct details for future VERIFICATION PURPOSE & K8 School record.)</i></p>

                    <div class="mt-4 w-100 d-flex align-items-center">
                        <label style="width: 120px;" for="schoolName" class="m-0">School Name:</label>
                        <input type="text" name="schoolName" id="schoolName" class="p-1 ml-2 rounded bg-transparent" style="flex: 1;">
                    </div>
                    <p id="errorSchoolName" class="mt-1 font-small text-right font-weight-bold text-danger"></p>

                    <div class="mt-3 w-100 d-flex align-items-center">
                        <label style="width: 120px;" for="schoolAddress" class="m-0">School Address:</label>
                        <input type="text" name="schoolAddress" id="schoolAddress" class="p-1 ml-2 rounded bg-transparent" style="flex: 1;">
                    </div>
                    <p id="errorSchoolAddress" class="mt-1 mb-5 font-small text-right font-weight-bold text-danger"></p>
                </div>
            </div>
            <hr style="border-top: 3px dashed #373635;">

            <div class="w-75 mx-auto">
                <p class="mb-5 font-size-lg font-weight-bold text-center">DECLARATION</p>
                <div class="">
                    <div class="d-flex font-size-lg">
                        <input type="checkbox" name="validation" id="validation" class="mr-3">
                        <p class="m-0"><i>I</i></p>
                        <div class="px-2" style="flex: 1;">
                            <p id="guardian-name" class="m-0 px-2" style="font-weight: 600; color: #373635;">Parent's Name</p>
                            <hr class="m-0" style="border: 1px solid #373635;">
                        </div>
                    </div>
                    <p class="mt-1 font-size-lg"><i>hereby declare that the above-mentioned details are true and correct to the best of my knowledge and belief.</i></p>
                    <p id="errorCheckbox" class="mt-1 font-small font-weight-bold text-danger"></p>

                    <div class="d-flex font-size-lg ml-auto mt-4 phone-div">
                        <p class="m-0">Phone Number</p>
                        <div class="px-2" style="flex: 1;">
                            <p id="phoneNo" class="m-0 px-2" style="font-weight: 600; color: #373635;">913242XXX</p>
                            <hr class="m-0" style="border: 1px solid #373635;">
                        </div>
                    </div>
                </div>
                <input id="submitTCForm" type="submit" value="Submit" class="btn btn-lg bg-primary ml-auto d-flex mt-5">
                <p id="info-msg" class="mt-5 text-danger text-center" style="font-size: 18px"></p>
            </div>
        </form>
        <div class="server-message">
            <span class="msg" id="msgTheme2"></span>
        </div>
    </div>`;
    return html;
}

function renderTcContent(){
    $('body').append(TcContent());
}

renderTcContent();

function hideMessageTheme2(id){
	$('#msgTheme2').html('');
	$('.server-message').removeClass('show');
	//$('.server-message').hide();
}
function showMessageTheme2(messageType, message, id, msgHide){
	hideMessageTheme2(id);
	$('#msgTheme2').removeClass('error');
	$('#msgTheme2').removeClass('success');
	$('#msgTheme2').removeClass('notification');
	if (messageType==0) {
		$('#msgTheme2').addClass('error')
		$('#msgTheme2').html('<i class="fa fa-times"></i>'+message);
	}else if (messageType==1) {
		$('#msgTheme2').addClass('success')
		$('#msgTheme2').html('<i class="fa fa-check"></i>'+message);
	}else if (messageType==2) {
		$('#msgTheme2').addClass('notification')
		$('#msgTheme2').html('<i class="fa fa-info"></i>'+message);
	}
	$('.server-message').addClass('show')
	setTimeout(function(){
		$('.server-message').removeClass('show');
	}, 5000);

	if(msgHide){
		setTimeout(function(){
			$('#msgTheme2').html('')
			$('.server-message').removeClass('show');
		}, 3000);
	}
}