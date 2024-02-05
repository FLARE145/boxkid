//variables
let chapterArray = [];
let imageArray = [];
let setting = "";
let currentPage = 0;
let totalChapters = 0;
let totalPages = 0;

//runs on load
window.onload = function(){
  fetch("../chapterData/imageKey.json")
    .then(response => response.json())
    .then(result => {
	  //chapterArray becomes an array of objects with chapter info
      chapterArray = result;
      getImages();
    });
};


//gets chapter from url pathname
function getChapterName(){
	pagePath = window.location.pathname;
	chapterName = pagePath.slice(6, pagePath.length - 5);
	//sets cookie stuff
	deleteCookie('userChapter');
	writeCookie('userChapter', chapterName);
	return chapterName;
};

//gets chapter info object based on the name of the chapter
function getChapterObject(name){
	return chapterArray.find(chapter => chapter.name === name);
};

//gets chapter object index
function getChapterIndex(name){
	return chapterArray.findIndex(chapter => chapter.name === name);
};


//called in the onload function  does the important work
function getImages(){
	//gets format setting from cookie
	setting = "page";
	if (readCookie('viewFormat') === false && screen.width < 1000){
		writeCookie('viewFormat', 'scroll');
	}
	//scroll set up
	if (readCookie('viewFormat') === 'scroll'){
		setting = "scroll";
		//from next is not needed in scroll mode
		if (readCookie('fromNext') === 'true'){
			deleteCookie('fromNext');
		};
		document.getElementById("comicPageView").remove();
		imageArray = getChapterObject(getChapterName())[setting];
		viewer = document.getElementById("comicScrollView");
		//builds scroll version
		for (let i = 0; i < imageArray.length; i++) {
			currentImage = imageArray[i];
			newElement = document.createElement("img");
			newElement.src = imageArray[i];
			viewer.append(newElement);
		};
	} else {
		//page set up
		setting = "page";
		document.getElementById("comicScrollView").remove();
		imageArray = getChapterObject(getChapterName())[setting];
		totalPages = imageArray.length;
		document.getElementById("pageCount").innerHTML = totalPages;
		if (readCookie('fromNext') === 'true'){
			currentPage = imageArray.length - 1;
			setImage(currentPage);
			deleteCookie('fromNext');
			return;
		};
		setImage(currentPage);
	};
};

//for page version

function setImage(pageNumber){
	let viewer = document.getElementById("comicPageView");
	viewer.innerHTML = '<img src="' + imageArray[pageNumber] + '" onlclick="toggleFullscreen()">';
	if (isDocumentFullscreen()){
		document.getElementsByClassName("fullscreenImg")[0].innerHTML = '<img src="' + imageArray[pageNumber] + '">';
	};
	document.getElementById("pageNumber").innerHTML = currentPage + 1;
};

function nextPage(){
	if (setting === "scroll"){
		nextChapter();
		return;
	}
	if (currentPage >= imageArray.length - 1){
		nextChapter();
		return;
	};
	currentPage++;
	setImage(currentPage);
};

function previousPage(){
	if (currentPage <= 0){
		previousChapter();
		return;
	};
	currentPage--;
	setImage(currentPage);
};

//next and previous chapter stuff

function nextChapter(){
	let chapterIndex = getChapterIndex(getChapterName());
	if (chapterArray.length > chapterIndex +1){
		window.location.href = './' + chapterArray[chapterIndex + 1].name;
	} else {
		console.log('nothing next');
	}
};

function previousChapter(){
	let chapterIndex = getChapterIndex(getChapterName());
	if (chapterIndex > 0){
		writeCookie('fromNext', 'true');
		window.location.href = './' + chapterArray[chapterIndex - 1].name;
	} else {
		console.log('nothing previous');
	}
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