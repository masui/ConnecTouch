function readLinks(){
    const linkURL = 'http://connectouch.org/links';
    $.getJSON(
	linkURL,
	null,
	function(data, status){
	    console.log(status);
	    console.log(data);
	    const lastIndex = data.length - 1;
	    console.log(lastIndex);
	    const lastUserCardID = data[lastIndex].link[1];
	    const lastReaderID = data[lastIndex].link[0];
	    var samereader_ary = [];
	    for (i = 0; i < data.length; i = i +1){
		id = data[i].link[1];
		if (id == lastUserCardID && lastReaderID[i] != 秋葉原サイネージ){
		    samereader_ary.push(data[i].link[0]);
		}
	    }
	    console.log(lastUserCardID);
	    console.log(lastReaderID);
	    console.log(samereader_ary);
	    changeSrc(lastUserCardID, samereader_ary);
	});
}

function changeSrc(cid, sidAry){
    var urls = [
	'http://www.city.asahikawa.hokkaido.jp/asahiyamazoo/',
	'http://www.tsukiokaonsen.gr.jp/',
	'http://www.kurotetu.co.jp/',
	'https://www.koyasan.or.jp/',
	'http://towadako.or.jp/',
	'http://www.ryokusuitei.co.jp/',
	'http://www.tokyo-skytree.jp/',
	'http://www.fujisan-climb.jp/',
	'https://www.usj.co.jp/',
	'http://www.tokyodisneyresort.jp/tdl/'
    ];
    var sid = sidAry[Math.floor(Math.random() * sidAry.length)];
    console.log(sid);
    var src = urls[Math.floor(Math.random() * urls.length)];

    /*
    switch (sid) {
    case 増井Mac:
	src = 'http://www.tsukiokaonsen.gr.jp/'
	break;
    case 秋葉原サイネージ:
	src = 'http://www.kurotetu.co.jp/'
	break;
    case 湘南台サイネージ:
	src = 'https://www.koyasan.or.jp/'
	break;
    case 鎌倉券売機:
	src = 'http://towadako.or.jp/'
	break;
    case 緑水亭ポスタ:
	src = 'http://www.ryokusuitei.co.jp/'
	break;
     }
     */

    $('#page').attr('src',src);
}

function returnTop() {
    $('#page').attr('src',"http://jasf.org/rosenzu/map_tokyo.png");
}
