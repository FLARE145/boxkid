let userChapter = 'ch001';
let latestChapter = '';
let latestChapterUrl = '';
let userChapterUrl = '';
let chapters = {};


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
  fetch("/chapterData/imageKey.json")
    .then(response => response.json())
    .then(result => {
      chapters = result;
      latestChapterUrl = '/read/' + Object.keys(chapters)[Object.keys(chapters).length - 1];
	  document.getElementById("latestChapter").href = latestChapterUrl;
    });
};