// ■ MACアドレス
// 
//  増井 MacBookPro   a45e60e40c05
//  デルタ MacPro     0023dfdfe588
//  早川 MacBookAir   f45c89bfd495
//  SatakePi          b827ebc26e60   masuilab@192.168.1.150 wakaruland
//  DeltaPi           0022cf46f69b   RasPi2 2011/12
//  SajikiPi          1b96fcdca562
// 
// ■ NFCカードID
// 
//  増井Suica      0110041085168d11
//  増井SFCカード  01147302560fd305
//  早川Suica      011401147f10c10a
//  早川学生証     0114b34d2414b148
//  佐竹学生証     0114b34d0316e228
//  及川SFCカード  0114c302c014bf0f
//

const 秋葉原サイネージ = '0023dfdfe588'; // Delta MacPro
const 湘南台サイネージ = 'f45c89bfd495'; // 早川Mac
const 増井Mac =          'a45e60e40c05'; // 増井MBP
const 緑水亭ポスタ =     '0022cf46f69b'; // DeltaPi
const 鎌倉券売機 =       'b827ebc26e60'; // SatakePi
const ORFサイネージ = 'b827ebc26e60'; // 鎌倉券売機Piを代用
      
const 増井SFCカード =    '01147302560fd305';
const 佐竹学生証 =       '0114b34d0316e228';
const 早川学生証 =       '0114b34d2414b148';
const 及川SFCカード =    '0114c302c014bf0f';
const 伊藤iPhoneX =      '0139001cb197e6f5';

// サイネージ用データ（差し当たり）
const signage      = 増井Mac;
const akibaSight   = 秋葉原サイネージ;
const fujisawaFood = 湘南台サイネージ; 
const sendaiRelax  = 緑水亭ポスタ;
const niigataAmuse = 鎌倉券売機;

// ORF用
var data = [
  { 
    name : "緑水亭",
    id : "0022cf46f69b", // DeltaPi（緑水亭ポスタ）
    url : "http://www.ryokusuitei.co.jp/",
    location : {lat: 38.220972,	lng: 140.728089}
  },
  { 
    name : "湘南なぎさパーク", // SajikiPi（江ノ島関係）
    id : "1b96fcdca562",
    url : "http://www.s-n-p.jp/enoshima/",
    location : {lat: 35.301279, lng:	139.481001}
  },
  { 
    name : "秋葉原UDX",
    id : "0023dfdfe588", //秋葉原サイネージ
    url : "http://udx.jp/",
    location : {lat: 35.700243, lng: 139.772507}
  }
];