if (readCookie('scrollFormat') != 'true'){
		document.getElementById("comicScrollView");
	} else {

function toggleScrollMode(){
			if (readCookie('scrollFormat') != 'true'){
				writeCookie('scrollFormat', 'true');
			} else {
				deleteCookie('scrollFormat');
			};
		};