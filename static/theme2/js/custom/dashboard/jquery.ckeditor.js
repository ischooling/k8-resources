$(document).ready(function() {

});
function initEditor(index, elementId, placeholder, needToFlush, wordlimit, numbersofwordslimits){
	console.log(elementId+' = '+placeholder)
	if(index==1 && editor1){
		editor1.destroy();
	}
	if(index==2 && editor2){
		editor2.destroy();
	}
	if(index==3 && editor3){
		editor3.destroy();
	}
	if(index==4 && editor4){
		editor4.destroy();
	}
	if(needToFlush){
		$('#'+elementId).html('');
	}
	ClassicEditor
		.create( document.querySelector( '#'+elementId ), {
			 placeholder: placeholder,
			
			// toolbar: [ 'heading', '|', 'bold', 'italic', 'link' ]
		} )
		.then( editor => {
			window.editor = editor;
			var previousContent = editor.getData();
			//editor.isReadOnly = true; 
		    if(index==1){
		    	editor1=editor;
			}else if(index==2){
		    	editor2=editor;
			}else if(index==3){
				editor3=editor;
			}else if(index==4){
		    	editor4=editor;
			}
			if(wordlimit){
				editor.model.document.on('change:data', () => {
					checkWordLimit(editor, previousContent, numbersofwordslimits);
				});
			}
			// Handle the backspace key separately
			// editor.editing.view.document.getRoot().addEventListener('keydown', (event) => {
			// 	if (event.key === 'Backspace') {
			// 		// Update the previous content for backspace handling
			// 		previousContent = editor.getData();
			// 	}
			// });

		} )
		.catch( err => {
			console.error( err.stack );
		} );

}

function checkWordLimit(editor, previousContent, numbersofwordslimits) {
	var currentContent = editor.getData();
	// Calculate the word count based on a simple split
	var wordCount = currentContent.length;
    if (wordCount > numbersofwordslimits) {
       // If the word limit is exceeded, set the previous content back to the editor
	   editor.setData(currentContent.substring(0, wordCount - 1));
	   showMessageTheme2(2, "You have reached the word limit of " + numbersofwordslimits + " words.'");
	   
	   // Disable the editor to prevent further typing
		//editor.isReadOnly = true;
	}
}