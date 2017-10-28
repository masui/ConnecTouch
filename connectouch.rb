# -*- coding: utf-8 -*-
# -*- ruby -*-
#
# ConnecTouch
#

require 'sinatra'

#require 'sinatra/base'
#require 'sinatra/reloader'

require 'mongo'

require 'json'

connection = Mongo::Connection.new('localhost', 27017)
db = connection.db('connectouch')


#class App < Sinatra::Base
#  configure :development do
#    register Sinatra::Reloader
#  end
#  configure :production do
#    register Sinatra::Reloader
#  end
#end
#App.run!

get '/read/:id' do |id|
  data = db['node'].find_one(:id => id)
  data.to_json # can be "null"
end

get '/read' do
  id = params[:id]
  data = db['node'].find_one(:id => id)
  data.to_json
end

get '/write/:id' do |id| # /write/abc?url=xyz, etc.
  data = params.clone
  data.delete('splat')
  data.delete('captures')
  if data != {} then
    db['node'].remove(:id => id) # remove all items with id
    db['node'].insert(data)
  end
  data.to_json
end

get '/write' do # /write/abc?id=abc&url=xyz, etc.
  data = params.clone
  data.delete('splat')
  data.delete('captures')
  if data['id'] then
    db['node'].remove(:id => data['id']) # remove all items with id
    db['node'].insert(data)
  end
  data.to_json
end

get '/:id' do |id|
  "abcdefg"
end

get '/' do
  "Hello!"
end

error do
  "Y U NO WORK?"
end
