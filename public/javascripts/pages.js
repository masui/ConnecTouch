$(function(){
  //以下のURLから使用履歴の束をJSONで取ってくる
  const currentURL = location.href
  console.log(currentURL)
  const currentID = '114b34d0316e228' //とりあえず決め打ち

  const namelist = [
                    ['増井Suica','0110041085168d11'],
                    ['増井SFCカード','01147302560fd305'],
                    ['早川Suica','011401147f10c10a'],
                    ['早川学生証','0114b34d2414b148'],
                    ['佐竹学生証','0114b34d0316e228'],
                    ['佐藤学生証','0114c302c014bf0f']
                  ];

  const placelist = [
                      ['秋葉原サイネージ','0023dfdfe588'],
                      ['湘南台サイネージ','f45c89bfd495'],
                      ['増井Mac','a45e60e40c05'],
                      ['緑水亭ポスタ','0022cf46f69b'],
                      ['鎌倉券売機','b827ebc26e60']
                    ];

 // 増井Suica      0110041085168d11
 // 増井SFCカード  01147302560fd305
 // 早川Suica      011401147f10c10a
 // 早川学生証     0114b34d2414b148
 // 佐竹学生証     0114b34d0316e228

  const linkURL = 'http://connectouch.org/links'

  $.getJSON(
    linkURL,  //第一引数にURL
    null,    //第二引数に送信するデータ(今回は受信だけなので'null'指定)
    function(data, status){  //第三引数に受信時の処理を記述
      if(status == 'success'&& data != undefined){  //通信が成功し中身も存在する場合処理を開始
        console.log(status);
        $("#test").html(status + '!');
        console.log(data)

        //リーダーのIDとカードのIDを控える
        //最新の使用履歴にあるIDが自分のIDと仮定する
        //取得した配列から最後の要素を取り出す
        const lastIndex = (data.length - 1) //要素数は0からカウントされるため
        console.log('lastCardID : ' + data[lastIndex].link[1])
        console.log('lastReaderID : ' + data[lastIndex].link[0])

        //今タッチされたカードIDを読み取った他のリーダーのIDを取得する
        //他のリーダーはポスターかもしれないしサイネージかもしれない
        // let otherReaders = []
        // for(let i=0; i < data.length ; i++){
        //   let otherReader = $.grep(data, function(elem, index){
        //     return (data[i].link[1 == lastCardID])
        //   })
        //   otherReaders.push(otherReader)
        // }

        // console.log(otherReaders)
        for(index in data){
          for(let i = 0; i < namelist.length; i++){
            if(namelist[i][1] == data[index].link[1]){
              data[index].link[1] = namelist[i][0];
              break;
            }
          }

          for(let k = 0; k < placelist.length; k++){
            if(placelist[k][1] == data[index].link[0]){
              data[index].link[0] = placelist[k][0];
              break;
            }
          }

          // switch (data[index].link[0]) {
          //   case '0110041085168d11':
          //         return '増井'
          //         break;
          //   case '01147302560fd305':
          //         return '増井'
          //         break;
          //   case '011401147f10c10a':
          //         return '早川'
          //         break;
          //   case '0114b34d2414b148':
          //         return '早川'
          //         break;
          //   case '0114b34d0316e228':
          //         return '佐竹'
          //         break;
          //   default:
          //         break;
          // }

          $('ul').append('<li>' + data[index].link + '</li>')
        }

      }else{
        console.log('error')
      }
    });



});
