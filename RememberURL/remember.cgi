#! /home/masui/.rbenv/shims/ruby
# -*- coding: utf-8 -*-
#
# API
#
#   remember.cgi?id=masui&url=http://example.com
#   remember.cgi?id=masui
#   remember.cgi?id=masui&limit=100
#

require 'cgi'
require 'json'
require 'uri'

cgi = CGI.new('html3')

url =   URI.decode(cgi.params['url'][0].to_s)
id =    (cgi.params['id'][0] || '_').to_s
limit = (cgi.params['limit'][0] || 10).to_i

logfile = "#{id}.log"

if url != '' then
  File.open(logfile,"a"){ |f|
    f.puts "#{Time.now.to_i}\t#{url}"
  }
end

data = []
if File.exist?(logfile)
  lines = File.read(logfile).split(/\n/)
  len = lines.length
  start = len - limit
  start = 0 if start < 0
  (start...len).each { |i|
    (time,url) = lines[i].split(/\t/)
    data.push ({ time:time, url:url })
  }
end

cgi.out({"Access-Control-Allow-Origin" => '*'}) { data.to_json }
