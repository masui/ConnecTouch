const namelist = [
                  ['増井Suica','0110041085168d11'],
                  ['増井SFCカード','01147302560fd305'],
                  ['早川Suica','011401147f10c10a'],
                  ['早川学生証','0114b34d2414b148'],
                  ['佐竹学生証','0114b34d0316e228'],
                  ['佐藤学生証','0114c302c014bf0f'],
                  ['及川SFCカード','0114c302c014bf0f'],
                  ['伊藤iPhoneX','0139001cb197e6f5']
                ];

const placelist = [
                    ['秋葉原サイネージ','0023dfdfe588'],
                    ['湘南台サイネージ','f45c89bfd495'],
                    ['増井Mac','a45e60e40c05'],
                    ['緑水亭ポスタ','0022cf46f69b'],
                    ['鎌倉券売機','b827ebc26e60']
                  ];


$(function(){
  for (var i = 0; i < namelist.length; i++) {
    $('#namelist').append('<li class="name"><a href="pages/mobile_content.html?'+ namelist[i][1] +'">' + namelist[i][0] + '</a></li>');
  }
  $('.name').hide();
  for (var i = 0; i < placelist.length; i++) {
    $('#placelist').append('<li class="place"><a href="pages/mobile_content.html?'+ placelist[i][1] +'">' + placelist[i][0] + '</a></li>');
  }
  $('.place').hide();
})

function menulist(menu) {
  console.log(menu);
  if ($('.'+menu).css('display') != 'none') {
    $('.'+menu).hide();
  }else {
    $('.'+menu).css('display','');
  }
}
