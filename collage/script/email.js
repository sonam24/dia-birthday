$(document).ready(function(){
	$("#sendmail").click(function(){
		var isSubjectFilled;
		var isMessageFilled;
								  
		var mail = $("#mail").val();
		var subject = $("#subject").val();
		var text = $("#text").val();

		if (!mail.match(/^([a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,}$)/i))
		{
			focusEmail(); //function from footer.js
			hideAllEmailStatusText(); //function from footer.js
			setTimeout("showTextValidEmailDiv()",200);//function from footer.js, setTimeout for ie since its focus is late
		}
		else
		{
			if (text.length < 1)
			{
				isMessageFilled = false;
				focusMessage();
			}
			
			if (text.length >= 1)
			{
				isMessageFilled = true;
			}
			
			if (subject.length < 1)
			{
				isSubjectFilled = false;
				focusSubject();
			}
			
			if (subject.length >= 1)
			{
				isSubjectFilled = true;
			}
		
			if ((isSubjectFilled == true) && (isMessageFilled == true))
			{
				var dataObj = {
					"mail" : mail,
					"subject" : subject,
					"text" : text
				};

				hideAllEmailStatusText(); //function from footer.js
				setTimeout("showTextSendingMessageDiv()",200);//function from footer.js, setTimeout for ie since its focus is late
				
				setTimeout(function(){send(dataObj)},2000);
			}
			else
			{
				hideAllEmailStatusText(); //function from footer.js
				setTimeout("showTextPleaseFillDiv()",200);//function from footer.js, setTimeout for ie since its focus is late
				
			}
		}
		
		return false;
	});
});

function send(dataObj){
	$.ajax({	
		type: "POST",
		url: "email.php",
		data: dataObj,
		cache: false,
	})
	.done(function(){
		hideAllEmailStatusText(); //function from footer.js
		showTextMessageSentDiv(); //function from footer.js
		showSpeakBubbleMonkey(); //function from footer.js
		clearAllInputField(); //function from footer.js	
	})
	.fail(function(){
			
	})
}