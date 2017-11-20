const namelist = [
  ['増井Suica', '0110041085168d11'],
  ['増井SFCカード', '01147302560fd305'],
  ['早川Suica', '011401147f10c10a'],
  ['早川学生証', '0114b34d2414b148'],
  ['佐竹学生証', '0114b34d0316e228'],
  ['佐藤学生証', '0114c302c014bf0f'],
  ['及川SFCカード', '0114c302c014bf0f'],
  ['伊藤iPhoneX', '0139001cb197e6f5']
];

const placelist = [
  ['秋葉原サイネージ', '0023dfdfe588'],
  ['湘南台サイネージ', 'f45c89bfd495'],
  ['増井Mac', 'a45e60e40c05'],
  ['緑水亭ポスタ', '0022cf46f69b'],
  ['鎌倉券売機', 'b827ebc26e60']
];


$(function() {
  for (var i = 0; i < namelist.length; i++) {
    $('#namelist').append('<div class="name" data-param="'+namelist[i][1]+'"><spam class="test">'+ '　>　　' +namelist[i][0] +'</span></div>');
  }
  //$('.name').hide();
  for (var i = 0; i < placelist.length; i++) {
    $('#placelist').append('<div class="place" data-param="'+placelist[i][1]+'"><spam class="test">'+ '　>　　' +placelist[i][0] +'</span></div>');
  }
  //$('.place').hide();
  $('#nameTitle').on("click", function() {
    $('.name').slideToggle(200);
  });
  $('#placeTitle').on("click", function() {
    $('.place').slideToggle(200);
  });

  $('.name').on("click", function() {
    $(this).css("background-color","#bebebe");
    let param = $(this).data('param');
    let url = "pages/mobile_content.html?n" +param;
    window.location.href = url;
  })
  $('.place').on("click", function() {
    let param = $(this).data('param');
    $(this).css("background-color","#bebebe");
    let url = "pages/mobile_content.html?p" +param;
    window.location.href = url;
  })
})
