
function getGradesData(requiredGrades){
	var grades=[]
	for(var index=0;index<=requiredGrades.length;index++){
		var grade={};
		if(requiredGrades[index]=='N'){
			grade['key']=17;
			grade['value']='Nursery';
			grades.push(grade);
		}
		else if(requiredGrades[index]=='KG'){
			grade['key']=11; 
			grade['value']='KG';
			grades.push(grade);
		}
		else if(requiredGrades[index]=='1'){
			grade['key']=12;
			grade['value']='Grade 1';
			grades.push(grade);
		}else if(requiredGrades[index]=='2'){
			grade['key']=13;
			grade['value']='Grade 2';
			grades.push(grade);
		}else if(requiredGrades[index]=='3'){
			grade['key']=14;
			grade['value']='Grade 3';
			grades.push(grade);
		}else if(requiredGrades[index]=='4'){
			grade['key']=15;
			grade['value']='Grade 4';
			grades.push(grade);
		}else if(requiredGrades[index]=='5'){
			grade['key']=16;
			grade['value']='Grade 5';
			grades.push(grade);
		}else if(requiredGrades[index]=='6'){
			grade['key']=1;
			grade['value']='Grade 6';
			grades.push(grade);
		}else if(requiredGrades[index]=='7'){
			grade['key']=2;
			grade['value']='Grade 7';
			grades.push(grade);
		}else if(requiredGrades[index]=='8'){
			grade['key']=3;
			grade['value']='Grade 8';
			grades.push(grade);
		}else if(requiredGrades[index]=='9'){
			grade['key']=4;
			grade['value']='Grade 9';
			grades.push(grade);
		}else if(requiredGrades[index]=='10'){
			grade['key']=5;
			grade['value']='Grade 10';
			grades.push(grade);
		}else if(requiredGrades[index]=='11'){
			grade['key']=6;
			grade['value']='Grade 11';
			grades.push(grade);
		}else if(requiredGrades[index]=='12'){
			grade['key']=7;
			grade['value']='Grade 12';
			grades.push(grade);
		}
		// }else if(requiredGrades[index]=='13'){
		// 	grade['key']=19;
		// 	grade['value']='Flexy - Elementary School';
		// 	grades.push(grade);
		// }else if(requiredGrades[index]=='14'){
		// 	grade['key']=9;
		// 	grade['value']='Flexy - Middle School';
		// 	grades.push(grade);
		// }else if(requiredGrades[index]=='15'){
		// 	grade['key']=10;
		// 	grade['value']='Flexy - High School';
		// 	grades.push(grade);
		// }else if(requiredGrades[index]=='16'){
		// 	grade['key']=20;
		// 	grade['value']='Flexy - Credit Recovery';
		// 	grades.push(grade);
		// }else if(requiredGrades[index]=='17'){
		// 	grade['key']=21;
		// 	grade['value']='Flexy - Advanced Placement';
		// 	grades.push(grade);
		// }
	}
	return grades;
}
function getGrades(grades){
	var html1='<option value="">Select Grade</option>'
	$.each(grades, function(k, v) {
		html1+='<option value="'+v.key+'">'+v.value+'</option>';
	});
	return html1;
}

function getLearningProgramContent(schoolId){
	var html='<option value="">Select Learning Program</option>';
	html+='<option value="ONE_TO_ONE">One-to-One | Personalized Learning</option>';
	if(schoolId==3 || schoolId==4){
	}else if(schoolId==5){
		html+='<option value="BATCH">Group Learning</option>';
	}else{
		html+='<option value="BATCH">Group Learning</option>';
		html+='<option value="SCHOLARSHIP">Self-Paced | Accelerated Learning</option>';
		html+='<option value="ONE_TO_ONE_FLEX">Flexy Learning Program</option>';
	}
	return html;
}

function getStandardContent(schoolId){
	var actualGrades='';
	if(schoolId==1){
		actualGrades=['N','KG','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17'];
	}else{
		actualGrades=['1','2','3','4','5','6','7','8','9','10','11','12'];
	}
	return getGrades(getGradesData(actualGrades));
}

function getLmsPlateformContent(schoolId){
	var html='<option value="">Select LMS Platform</option>';
	html+='<option value="37">Entirets</option>';
	html+='<option value="33">BUZZ</option>';
	return html;
}

function getWaringContent1(){
	if(tt=='theme1'){
		$('body').append(getWaringContent1Theme1());
	}else{
		$('body').append(getWaringContent1Theme2());
	}
}

function getClassesContent(schoolId){
	var html=
	'<option value="batchName">Batch Name</option>'
	+'<option value="batchName">Batch Name</option>'
	+'<option value="batchName">Batch Name</option>'
	+'<option value="batchName">Batch Name</option>';
	return html;
}

function getWaringContent1Theme1(){
	html=
	'<div class="modal fade" id="remarksresetDelete1" tabindex="-1">'
		+'<div class="modal-dialog modal-md modal-notify modal-info" role="document">'
			+'<div class="modal-content text-center">'
				+'<div class="modal-header bg-info justify-content-center" style="top: 0 !important;width:100% !important;padding: 15px 10px;">'
					+'<p class="heading" style="color: #fff;" id="warningMessage1">Are you sure?</p>'
				+'</div>'
				+'<div id="statusMessage-1" class="modal-body delete-modal" style="padding-top:12px">'
					+'<i class="fa fa-refresh fa-4x" style="color:#337ab7 !important;"></i>'
				+'</div>'
				+'<div class="modal-footer text-center">'
					+'<div class="text-center" style="margin: 0 auto;">'
						+'<button id="resetDeleteErrorWarningYes1" type="button" class="btn" style="color:#59b2ff !important;border:1px solid #337ab7 !important;background:transparent !important">Yes</button>'
						+'<button id="resetDeleteErrorWarningNo1" type="button" class="btn" data-dismiss="modal" style="color:#59b2ff !important;border:1px solid #337ab7 !important;background:transparent !important">No</button>'
						+'<button id="resetDeleteErrorWarningCancel1" type="button" class="btn btn-default" data-dismiss="modal">Close</button>'
					+'</div>'
				+'</div>'
			+'</div>'
		+'</div>'
	+'</div>';
	return html;
}

function getWaringContent1Theme2(){
	html=
	'<div class="modal fade fade-scale" id="remarksresetDelete1" tabindex="-1">'
		+'<div class="modal-dialog modal-md modal-dialog-centered box-shadow-none" role="document">'
			+'<div class="modal-content">'
				+'<div class="modal-header pt-2 pb-2 bg-info justify-content-center">'
					+'<h5 class="heading text-white text-center" id="warningMessage1">Are you sure?</h5>'
				+'</div>'
				+'<div id="statusMessage-1" class="modal-body delete-modal text-center">'
					+'<i class="fas fa-sync fa-4x text-info"></i>'
				+'</div>'
				+'<div class="modal-footer">'
					+'<div class="m-auto">'
						+'<button id="resetDeleteErrorWarningYes1" type="button" class="btn btn-outline-info">Yes</button>'
						+'<button id="resetDeleteErrorWarningNo1" type="button" class="btn btn-info" data-dismiss="modal">No</button>'
						+'<button id="resetDeleteErrorWarningCancel1" type="button" class="btn btn-success" data-dismiss="modal">Close</button>'
					+'</div>'
				+'</div>'
			+'</div>'
		+'</div>'
	+'</div>';
	return html;
}

function getDomain(domain){
	var html='<option value="">Select Domain</option>'
	$.each(grades, function(k, v) {
		html+='<option value="'+v.key+'">'+v.value+'</option>';
	});
	return html;
}