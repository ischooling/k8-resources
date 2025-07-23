$(function(){
   var form_validation = $("#formvalidation");
   var back_button = $("[href='#previous']");
    $.validator.addMethod("letterRegex", function(value, element) {
        return this.optional(element) || /^[A-Z-a-z\s]+$/.test(value);
    }, "Field must contain only letters");

    $.validator.addMethod("numberRegex", function(value, element) {
        return this.optional(element) || /^[0-9-]+$/.test(value);
    }, "Field must contain only Numerical and without space");

    $.validator.addMethod("mobileRegex", function(phone_number, element) {
        phone_number = phone_number.replace(/\s+/g, "");
            return this.optional(element) || phone_number.length > 0 &&
                phone_number.match(/^(1-?)?(\([0-9]\d{2}\)|[0-9]\d{0})-?[0-9]\d{1}-?\d{0,12}$/);
    }, "Please enter a valid mobile number");

    $.validator.addMethod("dateFormat", function (value, element) {
        var year = value.split('/');
        if ( value.match(/^\d\d?\/\d\d?\/\d\d\d\d$/) && parseInt(year[2]) <= 2002 &&  parseInt(year[2]) >= 1970 && parseInt(year[1]) <= 12)
            return true;
        else
            return false;

    },"Please enter a date in the format dd/mm/yyyy" );

    $.validator.addMethod("scholarshipCodeRule", function(value, element) {
    	if($('#registrationNumberSelectionYes').is(':checked')){
    		if($('#registrationNumber').val().trim()==''){
    			return false
    		}
    	}
    	return true
    }, "Scholarship Code is required");
	function setActiveStep(steps){
    	if(steps==0){
    		$('.steps ul li:first-child a img').attr('src',PATH_FOLDER_IMAGE2+'step-1-active.png');
            $('.steps ul li:nth-child(2) a img').attr('src',PATH_FOLDER_IMAGE2+'step-2.png');
            $('.steps ul li:nth-child(3) a img').attr('src',PATH_FOLDER_IMAGE2+'step-4.png');
            $('.steps ul li:nth-child(4) a img').attr('src',PATH_FOLDER_IMAGE2+'step-6.png');
            $('.actions > ul > li:first-child').attr('style', 'opacity:0');
    	}else if(steps==1){
    		$('.steps ul li:first-child a img').attr('src',PATH_FOLDER_IMAGE2+'step-1.png');
    		$('.steps ul li:nth-child(2) a img').attr('src',PATH_FOLDER_IMAGE2+'step-2-active.png');
			$('.steps ul li:nth-child(3) a img').attr('src',PATH_FOLDER_IMAGE2+'step-4.png');
			$('.steps ul li:nth-child(4) a img').attr('src',PATH_FOLDER_IMAGE2+'step-6.png');
			$('.actions > ul > li:first-child').attr('style', 'opacity:1');
    	}else if(steps==2){
    		$('.steps ul li:first-child a img').attr('src',PATH_FOLDER_IMAGE2+'step-1.png');
			$('.steps ul li:nth-child(2) a img').attr('src',PATH_FOLDER_IMAGE2+'step-2.png');
			$('.steps ul li:nth-child(3) a img').attr('src',PATH_FOLDER_IMAGE2+'step-4-active.png');
			$('.steps ul li:nth-child(4) a img').attr('src',PATH_FOLDER_IMAGE2+'step-6.png');
			$('.actions > ul > li:first-child').attr('style', 'opacity:1');
    	}else if(steps==3){
    		$('.steps ul li:first-child a img').attr('src',PATH_FOLDER_IMAGE2+'step-1.png');
			$('.steps ul li:nth-child(2) a img').attr('src',PATH_FOLDER_IMAGE2+'step-2.png');
			$('.steps ul li:nth-child(3) a img').attr('src',PATH_FOLDER_IMAGE2+'step-4.png');
			$('.steps ul li:nth-child(4) a img').attr('src',PATH_FOLDER_IMAGE2+'step-6-active.png');
			$('.actions ul li:nth-child(2)').show();
			$('.actions ul li:nth-child(3) a').attr({'onclick':"showPaymentTermCondMode();"})
			$('.actions > ul > li:first-child').attr('style', 'opacity:1');
    	}
    }
    $('#formSteps').children("div").steps({
        headerTag: "h4",
        bodyTag: "section",
        transitionEffect: "fade",
        enableAllSteps: true,
        transitionEffectSpeed: 300,
        labels: {
            next: "Next Step",
            previous: "Back",
            finish: 'Confirm & pay',
        },
        onInit: function (event, currentIndex, newIndex) {
            $('.actions > ul > li:first-child').attr('style', 'opacity:0');
        },
        onStepChanging: function (event, currentIndex, newIndex) {
        	var isBackButtonClicked=false;
        	if(currentIndex>newIndex){
        		hideMessage('');
        		isBackButtonClicked=true;
        	}
        	if(isReload){
        		if(currentIndex>newIndex){
        			isBackButtonClicked=true;
        		}
        		if(currentIndex==0 && newIndex==3 ){
        			isBackButtonClicked=true;
        		}
        		isReload=false;
        	}
        	if(newIndex === 0){
        		setActiveStep(0);
        	}else if(newIndex === 1){
        		if(isBackButtonClicked){
        			setActiveStep(1);
        			return true;
        		}else{
        			if (signupStage1Form.valid()) {
        				var serverCheck = callForSignupStudentDetails('signupStage1');
        				console.log('Step 1 serverCheck : '+serverCheck);
        				if(serverCheck){
        					setActiveStep(1);
        					return true;
        				}else{
        					return false;
        				}
        			}else{
        				return false;
        			}
        		}
            }else if(newIndex === 2){
            	if(isBackButtonClicked){
        			setActiveStep(2);
        			return true;
        		}else{
        			if (signupStage2Form.valid()) {
        				var serverCheck2 = callForSignUpParents('signupStage2');
        				if(serverCheck2){
        					setActiveStep(2);
        					return true;
        				} else {
        					return false;
        				}
        			}else{
        				return false;
        			}
        		}
            } else if(newIndex === 3 ){
            	if(isBackButtonClicked){
        			setActiveStep(3);
        			return true;
        		}else{
        			var serverCheck3 = callForSignupCourseDetails('signupStage3','3');
    				if(serverCheck3){
                        $('#studentPaymentModal').modal('hide');
    					$('#studentPaymentBookSeatModal').modal('hide');
    					setActiveStep(3);
    					return true;
    				}else{
    					return false;
    				}
        		}
            } else {
            	return false;
            }
        	if (currentIndex > newIndex){
        		return true;
        	}
        },
        onFinished: function (event, currentIndex){
            //alert("Submitted!");
        }
    });

    var signupStage1Form = $('#signupStage1');
    signupStage1Form.validate({
    	rules: {
    		scholarshipCode:{
    			scholarshipCodeRule: true,
    		},
    		firstName: {
                required: true,
                letterRegex:true
            },
            middleName: {
                letterRegex:true,
            },
            lastName: {
                required: true,
                letterRegex:true,
            },
            dob:{
                required:true
//                dateFormat:true
            },
            gender:{
                required:true,
            },
            countryId:{
                required:true,
            },
            stateId:{
                required:true,
            },
            cityId:{
                required:true,
            },
            emailId:{
                required:true,
                email:true
            },
            contactNumber:{
                required:true,
                mobileRegex:true,
                maxlength:15
            }
    	},
    	messages:{
    		scholarshipCode:{
    			scholarshipCodeRule: "Scholarship Code is required",
            },
            firstName:{
                required: "Please enter first name",
                letterRegex: "This field must only contain alphabets",
            },
            lastName:{
                required: "Please enter last name",
                letterRegex: "This field must only contain alphabets",
            },
            dob:{
                required:"Please enter Date of Birth"
            },
            gender:{
                required:"Please select gender"
            },
            countryId:{
                required:"Please select country"
            },
            stateId:{
                required:"Please select state"
            },
            cityId:{
                required:"Please select city"
            },
            emailId:{
                required:"Please enter email id"
            },
            contactNumber:{
                required:"Please enter mobile number"
            }
    	}
    });

    var signupStage2Form = $('#signupStage2');
    signupStage2Form.validate({
    	rules: {
    		parentFirstName:{
                required:true,
                letterRegex:true

            },
            parentMiddletName:{
                letterRegex:true
            },
            parentlastName:{
               required:false,
               letterRegex:true
            },
            parentGender:"required",
            relation:{
            	required:true,
             },
            otherName:{
            	required:true
            },
            parentEmailId:{
                required:true,
                email:true
            },
            parentPhoneNumber:{
                required:true,
                mobileRegex:true,
                maxlength:10
            },
            wishSameParent:"required",
    	},
    	messages:{
            parentFirstName:{
                required: "Please enter first name",
                letterRegex: "This field must only contain alphabets",
            },
            // parentlastName:{
            //     required: "Please enter last name",
            //     letterRegex: "This field must only contain alphabets",
            // },
            parentGender:{
                required:"Please select gender",
            },
            relation:{
            	required:"Please select relation",
             },
            otherName:{
            	required: "Please enter other relation"
            },
            parentEmailId:{
                required:"Please enter email id"
            },
            parentPhoneNumber:{
            	required:"Please enter mobile number"
             },
    	}
    });
//    var signupStage3Form = $('#signupStage3');
//    var signupStage4Form = $('#signupStage4');

    // $("[href='#previous']").click(function(){
    //     alert('safddsa')
    //     $(this).disableValidation = true;
    // });

    // don't want to create a separate user for my Parent/Guardian. script


    // Custom Button Jquery Steps
    $('.forward').click(function(){
    	console.log('called forward');
    	$("#formSteps").steps('next');
    })
    $('.backward').click(function(){
    	console.log('called previous');
        $("#formSteps").steps('previous');
    })
    // Click to see password
    /*$('.password i').click(function(){
        if ( $('.password input').attr('type') === 'password' ) {
            $(this).next().attr('type', 'text');
        } else {
            $('.password input').attr('type', 'password');
        }
    })*/
    // Create Steps Image
    $('.steps ul li:first-child')
    	.append('<img src="'+PATH_FOLDER_IMAGE2+'step-arrow.png" alt="" class="step-arrow">')
    	.find('a').append('<img src="'+PATH_FOLDER_IMAGE2+'step-1-active.png" alt=""> ')
    	.append('<span class="step-order">Step 1</span>');
    $('.steps ul li:nth-child(2)')
    	.append('<img src="'+PATH_FOLDER_IMAGE2+'step-arrow.png" alt="" class="step-arrow">')
    	.find('a').append('<img src="'+PATH_FOLDER_IMAGE2+'step-2.png" alt="">')
    	.append('<span class="step-order">Step 2</span>');
    // $('.steps ul li:nth-child(3)').append('<img src="'+PATH_FOLDER_IMAGE2+'step-arrow.png" alt="" class="step-arrow">').find('a').append('<img src="'+PATH_FOLDER_IMAGE2+'step-3.png" alt="">').append('<span class="step-order">Step 03</span>');
    $('.steps ul li:nth-child(3)')
    	.append('<img src="'+PATH_FOLDER_IMAGE2+'step-arrow.png" alt="" class="step-arrow">')
    	.find('a').append('<img src="'+PATH_FOLDER_IMAGE2+'step-4.png" alt="">')
    	.append('<span class="step-order">Step 3</span>');
     $('.steps ul li:nth-child(4)')
    	.append('<img src="'+PATH_FOLDER_IMAGE2+'step-arrow.png" alt="" class="step-arrow">')
    	.find('a').append('<img src="'+PATH_FOLDER_IMAGE2+'step-6.png" alt="">')
    	.append('<span class="step-order">Step 4</span>');
    //  $('.steps ul li:last-child a')
    // 	.append('<img src="'+PATH_FOLDER_IMAGE2+'step-6.png" alt="">')
    // 	.append('<span class="step-order">Step 5</span>');
    // Count input
   /* $(".quantity span").on("click", function() {
        var $button = $(this);
        var oldValue = $button.parent().find("input").val();

        if ($button.hasClass('plus')) {
          var newVal = parseFloat(oldValue) + 1;
        } else {
           // Don't allow decrementing below zero
          if (oldValue > 0) {
            var newVal = parseFloat(oldValue) - 1;
            } else {
            newVal = 0;
          }
        }
        $button.parent().find("input").val(newVal);
    });
	*/
    if(signupPage>=0){
    	tabActiveStatus(signupPage);
    }
});