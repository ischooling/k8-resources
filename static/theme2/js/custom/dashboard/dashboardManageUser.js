function showManageProfileParentContentListingWithQueries(elementId, argument){
	console.log('DEFAULT_SEARCH_STATE: '+DEFAULT_SEARCH_STATE);
	var isDataTable = $.fn.dataTable.isDataTable('#'+elementId);
	console.log(elementId+ ' = ' +isDataTable);
	if(isDataTable){
		$('#'+elementId).dataTable().fnDestroy();
	}
	$('#'+elementId).DataTable( {
		"stateSave": true,
		"searching": true,
        "processing": true,
        "serverSide": true,
        "searching": true,
        "pageLength": 10,
        "stateLoadParams": function (settings, data) {
        	if (!DEFAULT_SEARCH_STATE) {
	            return false;        		
        	}
          },
        "ajax": {
            "url": CONTEXT_PATH+UNIQUEUUID+"/"+"dashboard/manage-profile-content-1"+argument,
            "data": function ( data ) {
            	//console.log('data '+data)
            }
        },
        "fnRowCallback": function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
        	$(nRow).find('td:eq(3)').css('text-align','left');
        	$(nRow).find('td:eq(4)').css('text-align','left');
        	$(nRow).find('td:eq(5)').css('text-align','left');
        	$('tr').addClass('success');
        }, 
        "columns": [
	         { "data": "sno", "name" : "sno", "title" : "S.No"  },
	         { "data": "name", "name" : "name" , "title" : "Parent Name"},
	         { "data": "userName", "name" : "userName" , "title" : "User Name"},
	         { "data": "studentProfile", "name" : "studentProfile" , "title" : "Student Details", 'text-align':'center'},
	         { "data": "profileStatus", "name" : "profileStatus" , "title" : "Profile Status", 'text-align':'center'},
	         { "data": "action", "name" : "action" , "title" : "Action", 'text-align':'center'},
         ],
	});
	$('#'+elementId).dataTable().fnSetFilteringEnterPress();
	bindHover();
}

function bindHover(){
	console.log('bindHover  called')
//	setTimeout(function(){
//		$('div.dropdown.tooltip-content1').hover(function() {
//			$(this).find('div.dropdown-menu').stop(true, true).delay(200).fadeIn(200);
//		}, function() {
//			$(this).find('div.dropdown-menu').stop(true, true).delay(200).fadeOut(200);
//		});
//	}, 1500);
}

function showManageProfileSchoolContentListingWithQueries(elementId, argument){
	console.log('DEFAULT_SEARCH_STATE: '+DEFAULT_SEARCH_STATE);
	var isDataTable = $.fn.dataTable.isDataTable('#'+elementId);
	console.log(elementId+ ' = ' +isDataTable);
	if(isDataTable){
		$('#'+elementId).dataTable().fnDestroy();
	}
	$('#'+elementId).DataTable( {
		"stateSave": true,
        "processing": true,
        "serverSide": true,
        "searching": true,
        "pageLength": 10,
        "stateLoadParams": function (settings, data) {
        	if (!DEFAULT_SEARCH_STATE) {
	            return false;        		
        	}
          },
        "ajax": {
            "url": CONTEXT_PATH+UNIQUEUUID+"/"+"dashboard/manage-profile-content-1"+argument,
            "data": function ( data ) {
            	//console.log('data '+data)
            }
        },
        "fnRowCallback": function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
        	if (aData['viewProfile'] || aData['editProfile']){
        		$('td', nRow).css('text-align','left');
        	}
        	$('#'+elementId+' tr:first').addClass('success');
        }, 
        "columns": [
	         { "data": "sno", "name" : "sno", "title" : "S.No"  },
	         { "data": "schoolName", "name" : "schoolName" , "title" : "School Name"},
	         { "data": "userName", "name" : "userName" , "title" : "User Name"},
	         { "data": "profileStatus", "name" : "profileStatus" , "title" : "Profile Status"},
	         { "data": "action", "name" : "action" , "title" : "Action"},
         ],
         /* drawCallback: function() {
     	    this.api().state.clear();
     	  } */
	});
	$('#'+elementId).dataTable().fnSetFilteringEnterPress();
}

function showManageProfileStudentContentListingWithQueries(elementId, argument){
	console.log('DEFAULT_SEARCH_STATE: '+DEFAULT_SEARCH_STATE);
	var isDataTable = $.fn.dataTable.isDataTable('#'+elementId);
	console.log(elementId+ ' = ' +isDataTable);
	if(isDataTable){
		$('#'+elementId).dataTable().fnDestroy();
	}
	console.log("referral");
	$('#'+elementId).DataTable( {
		"stateSave": true,
        "processing": true,
        "serverSide": true,
        "pagingType":"full",
        "searching": true,
        "pageLength": 10,
        "stateLoadParams": function (settings, data) {
        	if (!DEFAULT_SEARCH_STATE) {
	            return false;        		
        	}
          },
        "ajax": {
            "url": CONTEXT_PATH+UNIQUEUUID+"/"+"dashboard/manage-profile-content-1"+argument,
            "data": function ( data ) {
            	//console.log('data '+data)
            }
        },
        "fnRowCallback": function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
        	if (aData['paymentTypeApplicationFee'] || aData['parentProfile'] || aData['viewProfile']){
        		$('td', nRow).css('text-align','left');
        	}
        		if(aData['referralCode'].indexOf("N/A") != -1){}
        		else{
        			$(nRow).addClass('rowForCounselor');
        		}
        	$('#'+elementId+' tr:first').addClass('success');
        },
        "columns": [
	         { "data": "sno", "name" : "sno", "title" : "S.No"  },
	         { "data": "name", "name" : "name" , "title" : "Student Name"},
	         { "data": "userName", "name" : "userName" , "title" : "User Name"},
	         { "data": "standard", "name" : "standard" , "title" : "Grade"},
	         { "data": "profileStatus", "name" : "profileStatus" , "title" : "Profile Status"},
	         { "data": "referralCode", "name" : "referralCode" , "title" : "Counselor Name/Referral Code"},
	         { "data": "courseProviderName", "name" : "courseProviderName" , "title" : "LMS Platform"},
	         { "data": "action", "name" : "action" , "title" : "Action"},
         ],
        /*  drawCallback: function() {
        	    this.api().state.clear();
    	  } */
	});
	$('#'+elementId).dataTable().fnSetFilteringEnterPress();
}

function showManageProfileTeacherContentListingWithQueries(elementId, argument){
	console.log('DEFAULT_SEARCH_STATE: '+DEFAULT_SEARCH_STATE);
	var isDataTable = $.fn.dataTable.isDataTable('#'+elementId);
	console.log(elementId+ ' = ' +isDataTable);
	if(isDataTable){
		$('#'+elementId).dataTable().fnDestroy();
	}
	$('#'+elementId).DataTable( {
		"stateSave": true,
        "processing": true,
        "serverSide": true,
        "searching": true,
        "pageLength": 10,
        "stateLoadParams": function (settings, data) {
        	if (!DEFAULT_SEARCH_STATE) {
	            return false;        		
        	}
          },
        "ajax": {
            "url": CONTEXT_PATH+UNIQUEUUID+"/"+"dashboard/manage-profile-content-1"+argument,
            "data": function ( data ) {
            	//console.log('data '+data)
            }
        },
        "fnRowCallback": function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
        	$(nRow).find('td:eq(3)').css('text-align','left');
        	$(nRow).find('td:eq(4)').css('text-align','left');
        	$(nRow).find('td:eq(5)').css('text-align','left');
        	$(nRow).find('td:eq(6)').css('text-align','left');
        	$(nRow).find('td:eq(7)').css('text-align','left');
        	$('tr').addClass('success');
        }, 
        "columns": [
	         { data: "sno", title : "S.No"  },
	         { data: "name", title : "Teacher Name"},
	         { data: "userName", "name" : "userName" , "title" : "User Name"},
	         { data: "profileDescription", title : "Assigned Courses", 'text-align':'center'},
	         { data: "specialization", title : "Specialization", 'text-align':'center'},
	         { data: "profileStatus", title : "Profile Status", 'text-align':'center'},
	         { data: "downloadAgreement", title : "Agreement", 'text-align':'center'},
	         { data: "action", title : "Action", 'text-align':'center'},
         ],
	});
	$('#'+elementId).dataTable().fnSetFilteringEnterPress();
	bindHover();
}


function showManageProfileCommonContentListingWithQueries(elementId, argument){
	console.log('DEFAULT_SEARCH_STATE: '+DEFAULT_SEARCH_STATE);
	var isDataTable = $.fn.dataTable.isDataTable('#'+elementId);
	console.log(elementId+ ' = ' +isDataTable);
	if(isDataTable){
		$('#'+elementId).dataTable().fnDestroy();
	}
	console.log("referral");
	$('#'+elementId).DataTable( {
		"stateSave": true,
        "processing": true,
        "serverSide": true,
        "searching": true,
        "pageLength": 10,
        "stateLoadParams": function (settings, data) {
        	if (!DEFAULT_SEARCH_STATE) {
	            return false;        		
        	}
          },
        "ajax": {
            "url": CONTEXT_PATH+UNIQUEUUID+"/"+"dashboard/user-list-content-1"+argument,
            "data": function ( data ) {
            	//console.log('data '+data)
            }
        },
        "fnRowCallback": function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
        	if (aData['paymentTypeApplicationFee'] || aData['parentProfile'] || aData['viewProfile']){
        		$('td', nRow).css('text-align','left');
        	}
        	$('#'+elementId+' tr:first').addClass('success');
        },
        "columns": [
	         { "data": "sno", "name" : "sno", "title" : "S.No"  },
	         { "data": "name", "name" : "name" , "title" : "Name"},
	         { "data": "userName", "name" : "userName" , "title" : "User Name"},
	         { "data": "roleName", "name" : "roleName" , "title" : "Role"},
	         { "data": "profileStatus", "name" : "profileStatus" , "title" : "Profile Status"},
	         { "data": "addedDate", "name" : "addedDate" , "title" : "Added Date"},
	         { "data": "action", "name" : "action" , "title" : "Action"},
         ],
        /*  drawCallback: function() {
        	    this.api().state.clear();
    	  } */
	});
	$('#'+elementId).dataTable().fnSetFilteringEnterPress();
}

function showManageProfileOtpMobileListingWithQueries(elementId, argument){
	console.log('DEFAULT_SEARCH_STATE: '+DEFAULT_SEARCH_STATE);
	var isDataTable = $.fn.dataTable.isDataTable('#'+elementId);
	console.log(elementId+ ' = ' +isDataTable);
	if(isDataTable){
		$('#'+elementId).dataTable().fnDestroy();
	}
	console.log("referral");
	$('#'+elementId).DataTable( {
		"stateSave": true,
        "processing": true,
        "serverSide": true,
        "searching": true,
        "pageLength": 10,
        "stateLoadParams": function (settings, data) {
        	if (!DEFAULT_SEARCH_STATE) {
	            return false;        		
        	}
          },
        "ajax": {
            "url": CONTEXT_PATH+UNIQUEUUID+"/dashboard/otp-mobile-list-content-1"+argument,
            "data": function ( data ) {
            	//console.log('data '+data)
            }
        },
        "fnRowCallback": function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
        	if (aData['paymentTypeApplicationFee'] || aData['parentProfile'] || aData['viewProfile']){
        		$('td', nRow).css('text-align','left');
        	}
        	$('#'+elementId+' tr:first').addClass('success');
        },
        "columns": [
	         { "data": "sno", "name" : "sno", "title" : "S.No"  },
	         { "data": "entityName", "name" : "entityName" , "title" : "Entity Name"},
	         { "data": "mobileNumber", "name" : "mobileNumber" , "title" : "Mobile Number"},
	         { "data": "otpVerified", "name" : "otpVerified" , "title" : "OTP Verified"},
	         { "data": "otpSendDate", "name" : "otpSendDate" , "title" : "OTP SendDate"},
	         { "data": "verifyDate", "name" : "verifyDate" , "title" : "Verify Date"},
	         { "data": "otpSendCount", "name" : "otpSendCount" , "title" : "OTP SendCount"},
	         { "data": "createdDate", "name" : "createdDate" , "title" : "Added Date"},
         ],
        /*  drawCallback: function() {
        	    this.api().state.clear();
    	  } */
	});
	$('#'+elementId).dataTable().fnSetFilteringEnterPress();
}