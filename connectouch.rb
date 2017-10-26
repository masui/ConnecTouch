# -*- coding: utf-8 -*-
# -*- ruby -*-
#
# ConnecTouch
#

require 'sinatra'

get '/:id' do |id|
  erb :draw
end

get '/' do |id|
  "Hello!"
end
