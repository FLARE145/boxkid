//cookie functions borrowed from flare website

function writeCookie(name, property) {
    document.cookie = name + '=' + property + ';expires=Thu, 01 Jan 2030 00:00:00 GMT;path=/';
}
//thank gpt for improving this from older version
function readCookie(name) {
	if (document.cookie !== '') {
	    let allCookies = document.cookie.split('; ');
		let cookie = allCookies.find(row => row.startsWith(name + '='));
		if (cookie) {
			let cookieValue = cookie.split('=')[1];
			return cookieValue;
		} else {
			return false;
		}
	}
}

function deleteCookie(name) {
	document.cookie = name + '=' + ';expires=Thu, 01 Jan 1970 00:00:00 GMT '; 
}
function clearCookies() {
	let allCookies = document.cookie.split('; ');
	for (var i = 0; i < allCookies.length; i++) {
		deleteCookie(allCookies[i]);
	}
}