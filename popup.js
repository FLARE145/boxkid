//borrowed from flare145 website

function openPopup(image) {
	console.log('bruh');
	let newpage = document.getElementsByClassName("window")[0];
	let cover = document.createElement("div");
	let screenWidth = window.screen.width;
	//opens link if on mobile
	if (screenWidth <= 1000) {
		location.href = image;
	} else {
		//rest of stuff for pc
		cover.classList.add("popup-background");
		cover.setAttribute("onclick","closePopup();");
		newpage.appendChild(cover);
		let preview = document.createElement("div");
		preview.classList.add("popup");
		preview.innerHTML = '<a href="' + image + '"> <img src="' + image + '">';
		newpage.appendChild(preview);;
	}
}

function closePopup() {
	let newpage = document.getElementsByClassName("window")[0];
	newpage.innerHTML = '';
}