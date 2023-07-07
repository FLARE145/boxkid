let userChapter = 'ch001';
let latestChapter = '';
let latestChapterUrl = '';
let userChapterUrl = '';


if (readCookie('userChapter') === undefined){
	userChapter = 'ch001';
	console.log('no userchapter');
	userChapterUrl = '/read/' + userChapter;
} else{
	userChapter = readCookie('userChapter');
	console.log(readCookie('userChapter'));
	userChapterUrl = '/read/' + userChapter;
};

document.getElementById("userChapter").href = userChapterUrl;

window.onload = function(){
  fetch("/chapterData/latestChapter.txt")
    .then(response => response.json())
    .then(result => {
      latestChapter = result;
      latestChapterUrl = '/read/' + latestChapter;
	  document.getElementById("latestChapter").href = latestChapterUrl;
    });
};