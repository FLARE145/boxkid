let userChapter = '';
let latestChapter = '';
let latestChapterUrl = '';
let userChapterUrl = '';

if (readCookie('userChapter')){
	userChapter = readCookie('userChapter');
	console.log(readCookie('userChapter'));
	userChapterUrl = './' + userChapter;
} else{
	userChapter = 'ch001';
	writeCookie('userChapter', 'ch001');
};

document.getElementById("userChapter").href = userChapterUrl;

window.onload = function(){
  fetch("/chapterData/latestChapter.txt")
    .then(response => response.json())
    .then(result => {
      latestChapter = result;
      latestChapterUrl = './' + latestChapter;
	  document.getElementById("latestChapter").href = latestChapterUrl;
    });
};