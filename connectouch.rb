# -*- coding: utf-8 -*-
# -*- ruby -*-
#
# ConnecTouch
#
# % mongo
# > use connectouch
# > db.createCollection('link')
# > db.link.find()

require 'sinatra'
require 'sinatra/cross_origin'
require 'mongo'
require 'json'

enable :cross_origin

connection = Mongo::Connection.new('localhost', 27017)
db = connection.db('connectouch')

get '/read/:id' do |id|
  cross_origin
  data = db['node'].find_one(:id => id)
  data.to_json # can be "null"
end

get '/read' do
  cross_origin
  id = params[:id]
  data = db['node'].find_one(:id => id)
  data.to_json
end

get '/write/:id' do |id| # /write/abc?url=xyz, etc.
  cross_origin
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
  cross_origin
  data = params.clone
  data.delete('splat')
  data.delete('captures')
  if data['id'] then
    db['node'].remove(:id => data['id']) # remove all items with id
    db['node'].insert(data)
  end
  data.to_json
end

get '/nodes' do
  cross_origin
  db['node'].find().to_a.to_json
end

get '/addlink/:id1/:id2' do |id1,id2|
  cross_origin
  data = {}
  data['time'] = Time.now.to_i
  data['url'] = params[:url]
  data['link'] = [id1, id2]
  db['link'].insert(data)
  data.to_json
end

get '/addlink' do
  cross_origin
  id1 = params['id1']
  id2 = params['id2']
  data = {}
  if id1 && id2 then
    data['time'] = Time.now.to_i
    data['url'] = params[:url]
    data['link'] = [id1, id2]
    db['link'].insert(data)
  end
  data.to_json
end

get '/removelink/:id1/:id2' do |id1,id2|
  cross_origin
  db['link'].remove(:link => [id1, id2])
  db['link'].remove(:link => [id2, id1])
  'true'
end

get '/removelink' do
  cross_origin
  id1 = params['id1']
  id2 = params['id2']
  if id1 && id2 then
    db['link'].remove(:ids => [id1, id2])
    db['link'].remove(:ids => [id2, id1])
  end
  'true'
end

get '/links' do
  cross_origin
  db['link'].find().to_a.to_json
end



get '/' do
  "Hello!"
end

error do
  "Error!"
end
