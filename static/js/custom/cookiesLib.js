
function urlParam(name){
	if(name==undefined || name==''){
		return false;
	}
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null) {
       return null;
    }
    return decodeURI(results[1]) || 0;
}

function setCookie(key, value) {
	if(value==undefined || value==''){
		return false;
	}
    var expires = new Date();
    expires.setTime(expires.getTime() + (31 * 24 * 60 * 60 * 1000));
    var cname=key + '=' + value + ';expires=' + expires.toUTCString()+ ";domain=."+document.location.hostname+";path=/";
    console.log('setCookie cname:: '+cname);
    document.cookie = cname;
}

function getCookie(key) {
	if(key==undefined || key==''){
		return false;
	}
    var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
    console.log('getCookie keyValue:: '+keyValue);
    return keyValue ? keyValue[2] : 'Test';
}

setCookie('us', urlParam('utm_source'));
setCookie('um', urlParam('utm_medium'));
setCookie('uc', urlParam('utm_content'));
setCookie('gclid', urlParam('gclid'));
setCookie('ucam', urlParam('utm_campaign'));
setCookie('ut', urlParam('utm_term'));
setCookie('cu', window.location.href);