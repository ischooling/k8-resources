$(function(){
	function setActiveStep(steps){
		if(steps==0){
    		$('.steps ul li:first-child a img').attr('src',PATH_FOLDER_IMAGE2+'step-4-active.png');
            $('.steps ul li:nth-child(2) a img').attr('src',PATH_FOLDER_IMAGE2+'step-5.png');
            $('.steps ul li:nth-child(3) a img').attr('src',PATH_FOLDER_IMAGE2+'step-review.png');
            $('.actions > ul > li:first-child').attr('style', 'opacity:0');
    	}else if(steps==1){
    		$('.steps ul li:first-child a img').attr('src',PATH_FOLDER_IMAGE2+'step-4.png');
    		$('.steps ul li:nth-child(2) a img').attr('src',PATH_FOLDER_IMAGE2+'step-5-active.png');
			$('.steps ul li:nth-child(3) a img').attr('src',PATH_FOLDER_IMAGE2+'step-review.png');
			$('.actions > ul > li:first-child').attr('style', 'opacity:1');
			if(BATCH_BYPASS) {
				$('.actions > ul > li:first-child').attr('style', 'opacity:0');
			}

    	}else if(steps==2){
    		$('.steps ul li:first-child a img').attr('src',PATH_FOLDER_IMAGE2+'step-4.png');
			$('.steps ul li:nth-child(2) a img').attr('src',PATH_FOLDER_IMAGE2+'step-5.png');
			$('.steps ul li:nth-child(3) a img').attr('src',PATH_FOLDER_IMAGE2+'step-review-active.png');
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
					//VALIDATE FOR BATCH SELECTION
					var batchSelection=true
        			if (batchSelection) {
        				var serverCheck = callForSignupStudentBatchSelection('signupStage8');
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
            } else if(newIndex === 2 ){
            	if(isBackButtonClicked){
        			setActiveStep(2);
        			return true;
        		}else{
        			var serverCheck9 = callForSignupCourseDetails('signupStage9','3');
    				if(serverCheck9){
    					setActiveStep(2);
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

    // Custom Button Jquery Steps
    $('.forward').click(function(){
    	console.log('called forward');
    	$("#formSteps").steps('next');
    })
    $('.backward').click(function(){
    	console.log('called previous');
        $("#formSteps").steps('previous');
    })

    $('.steps ul li:first-child').append('<img src="'+PATH_FOLDER_IMAGE2+'step-arrow.png" alt="" class="step-arrow">').find('a').append('<img src="'+PATH_FOLDER_IMAGE2+'step-4.png" alt="">').append('<span class="step-order">Step 1</span>');
    $('.steps ul li:nth-child(2').append('<img src="'+PATH_FOLDER_IMAGE2+'step-arrow.png" alt="" class="step-arrow">').find('a').append('<img src="'+PATH_FOLDER_IMAGE2+'step-5.png" alt="">').append('<span class="step-order">Step 2</span>');
    $('.steps ul li:nth-child(3)').append('<img src="'+PATH_FOLDER_IMAGE2+'step-arrow.png" alt="" class="step-arrow">').find('a').append('<img src="'+PATH_FOLDER_IMAGE2+'step-review.png" alt=""> ').append('<span class="step-order">Step 3</span>');

    if(signupPage>=8){
    	tabActiveStatus(signupPage);
    }
});