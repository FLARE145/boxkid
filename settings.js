function toggleScrollMode(){
			if (readCookie('scrollFormat') != 'true'){
				writeCookie('scrollFormat', 'true');
			} else {
				deleteCookie('scrollFormat');
			};
		};