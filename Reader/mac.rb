#! /usr/bin/ruby
# -*- coding: utf-8 -*-
#
# MACアドレスを読む (Ruby)
#
# 以下を参照
# https://stackoverflow.com/questions/8761878/how-to-get-my-mac-address-programmatically-with-ruby
#

def mac_address
  platform = RUBY_PLATFORM.downcase
  output = `#{(platform =~ /win32/) ? 'ipconfig /all' : 'ifconfig'}`
  case platform
  when /darwin/
    # $1 if output =~ /en1.*?(([A-F0-9]{2}:){5}[A-F0-9]{2})/im
    $1 if output =~ /en0.*?(([A-F0-9]{2}:){5}[A-F0-9]{2})/im
  when /win32/
    $1 if output =~ /Physical Address.*?(([A-F0-9]{2}-){5}[A-F0-9]{2})/im
    # Cases for other platforms...
  else
    ''
  end
end

puts mac_address.gsub(/:/,'')


