let chapters = {};
let imageArray = [];
let currentPage = 0;

window.onload = function(){
  fetch("../chapterData/imageKey.json")
    .then(response => response.json())
    .then(result => {
      chapters = result;
      getImages();
    });
};

function getChapter(){
	pageUrl = window.location.href
	chapterId = pageUrl.substring(pageUrl.search("ch"), pageUrl.search("ch") + 5);
	return chapterId;
};


function getImages(){
	//gets format setting from cookie
	setting = "page";
	if (readCookie('viewFormat') === 'page'){
		setting = "page";
		document.getElementById("comicScrollView").remove();
		imageArray = chapters[getChapter()][setting];
		setImage(currentPage);
	} else {
		setting = "scroll";
		document.getElementById("comicPageView").remove();
		imageArray = chapters[getChapter()][setting];
		viewer = document.getElementById("comicScrollView");
		//builds scroll version
		for (let i = 0; i < imageArray.length; i++) {
			currentImage = imageArray[i];
			newElement = document.createElement("img");
			newElement.src = imageArray[i];
			viewer.append(newElement);
		};
	};
};

//for page version

function setImage(pageNumber){
	let viewer = document.getElementById("comicPageView");
	viewer.innerHTML = '<img src="' + imageArray[pageNumber] + '" onlclick="toggleFullscreen()">';
	if (isDocumentFullscreen()){
		document.getElementsByClassName("fullscreenImg")[0].innerHTML = '<img src="' + imageArray[pageNumber] + '">';
	};
};

function nextPage(){
	if (currentPage >= imageArray.length - 1){
		return;
	};
	currentPage++;
	setImage(currentPage);
};

function previousPage(){
	if (currentPage <= 0){
		return;
	};
	currentPage--;
	setImage(currentPage);
};

//fullscreen stuff
function toggleFullscreen(){
	let width = screen.width;
	if (width > 1000){
		if (document.getElementsByClassName("fullscreenImg").length < 1){
			newElement = document.createElement("div");
			newElement.classList.add("fullscreenImg");
			//newElement.setAttribute("onclick","toggleFullscreen();");
			newElement.innerHTML = '<img src="' + imageArray[currentPage] + '">';
			
			// Enter fullscreen mode
			  const element = document.documentElement;
			  if (element.requestFullscreen) {
				element.requestFullscreen();
			  } else if (element.mozRequestFullScreen) {
				element.mozRequestFullScreen();
			  } else if (element.webkitRequestFullscreen) {
				element.webkitRequestFullscreen();
			  } else if (element.msRequestFullscreen) {
				element.msRequestFullscreen();
			  }
			
			document.getElementsByClassName("window")[0].append(newElement);
		} else{
			// Exit fullscreen mode
			  if (document.exitFullscreen) {
				document.exitFullscreen();
			  } else if (document.mozCancelFullScreen) {
				document.mozCancelFullScreen();
			  } else if (document.webkitExitFullscreen) {
				document.webkitExitFullscreen();
			  } else if (document.msExitFullscreen) {
				document.msExitFullscreen();
			  }
			
			document.getElementsByClassName("fullscreenImg")[0].remove();
		}
	}
	console.log(width);
};

//escape deletes elm

document.addEventListener('fullscreenchange', function(event) {
  if (!isDocumentFullscreen()) {
    toggleFullscreen();
  }
});

// Function to check if the document is in fullscreen mode
function isDocumentFullscreen() {
  return (
    document.fullscreenElement ||
    document.mozFullScreenElement ||
    document.webkitFullscreenElement ||
    document.msFullscreenElement
  );
};

//arrow controls
document.addEventListener('keydown', function(event) {
  if (event.key === 'ArrowRight') {
    nextPage();
  }
});

document.addEventListener('keydown', function(event) {
  if (event.key === 'ArrowLeft') {
    previousPage();
  }
});