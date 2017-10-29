#!/usr/bin/env ruby
# -*- coding: utf-8 -*-
#

require 'cgi'

cgi = CGI.new('html3')

url = cgi.params['url'][0].to_s

File.open("rememberurl.log","a"){ |f|
  f.puts "#{Time.now.to_i}\t#{url}"
}

cgi.out { '' }

#cgi.out({"Access-Control-Allow-Origin" => '*'}){ # クロスドメインアクセス可能にするため
#  ''
#}
