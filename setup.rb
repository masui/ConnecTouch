#
# アプリ自動起動設定ファイルをすべてのRasPiにコピー
#
tmpfile = "/tmp/autostart"
(1..20).each { |n|
  template = <<EOF
@lxpanel --profile LXDE-pi
@pcmanfm --desktop --profile LXDE-pi
@xscreensaver -no-splash
@point-rpi
@chromium-browser http://192.168.0.200/index#{n}.html
EOF

  File.open(tmpfile,"w"){ |f|
    f.print template
  }
  cmd = "scp #{tmpfile} pi#{n}:/home/pi/.config/lxsession/LXDE-pi/"
  puts cmd
  system cmd
}

#
# public/index(1..20).html を生成
#
tmpfile = "/tmp/index"
(1..20).each { |n|
  template = <<EOF
<html>
  <head>
  </head>
  <body>
    Web page for RasPi#{n}
  </body>
</html>
EOF

  File.open(tmpfile,"w"){ |f|
    f.print template
  }
  cmd = "cp #{tmpfile} public/index#{n}.html"
  puts cmd
  system cmd
}

