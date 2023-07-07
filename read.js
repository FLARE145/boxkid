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
	if (readCookie('scrollFormat') != 'true'){
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
	viewer.innerHTML = '<img src="' + imageArray[pageNumber] + '">';
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