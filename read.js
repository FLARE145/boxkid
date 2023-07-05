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
	} else {
		setting = "scroll";
	};
	//prints list of image urls
	imageArray = chapters[getChapter()][setting];
	for (let i = 0; i < imageArray.length; i++) {
		currentImage = imageArray[i];
		console.log(currentImage);
	};
	setImage(currentPage);
	return console.log("done");
};

function setImage(pageNumber){
	let viewer = document.getElementById("comicPageView");
	viewer.innerHTML = '<img src="../' + imageArray[pageNumber] + '">';
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