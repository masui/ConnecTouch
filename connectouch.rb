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
require 'mongo'
require 'json'

# いろいろMongoの仕様が変わった?
# connection = Mongo::Connection.new('localhost', 27017)
# db = connection.db('connectouch')

client = Mongo::Client.new('mongodb://localhost:27017/connectouch')
db = client.database

get '/read/:id' do |id|
  data = db['node'].find(:id => id)
  data.to_a.to_json
end

get '/read' do
  id = params[:id]
  data = db['node'].find(:id => id)
  data.to_a.to_json
end

get '/write/:id' do |id| # /write/abc?url=xyz, etc.
  data = params.clone
  data.delete('splat')
  data.delete('captures')
  if data != {} then
    db['node'].delete_many(:id => id) # remove all items with id
    db['node'].insert_one(data)
  end
  data.to_json
end

get '/write' do # /write?id=abc&url=xyz, etc.
  data = params.clone
  data.delete('splat')
  data.delete('captures')
  if data['id'] then
    db['node'].delete_many(:id => data['id']) # remove all items with id
    db['node'].insert_one(data)
  end
  data.to_json
end

get '/nodes' do
  db['node'].find().to_a.to_json
end

get '/addlink/:id1/:id2' do |id1,id2|
  data = {}
  data['time'] = Time.now.to_i
  data['url'] = params[:url]
  data['link'] = [id1, id2]
  db['link'].insert_one(data)
  data.to_json
end

get '/addlink' do
  id1 = params['id1']
  id2 = params['id2']
  data = {}
  if id1 && id2 then
    data['time'] = Time.now.to_i
    data['url'] = params[:url]
    data['link'] = [id1, id2]
    db['link'].insert_one(data)
  end
  data.to_json
end

get '/removelink/:id1/:id2' do |id1,id2|
  db['link'].remove_many(:link => [id1, id2])
  db['link'].remove_many(:link => [id2, id1])
  'true'
end

get '/removelink' do
  id1 = params['id1']
  id2 = params['id2']
  if id1 && id2 then
    db['link'].remove_many(:ids => [id1, id2])
    db['link'].remove_many(:ids => [id2, id1])
  end
  'true'
end

get '/links' do
  id = params['id']
  limit = params['limit'].to_i
  limit = 100 if limit == 0
  if id.to_s == ''
    db['link'].find().sort({time:-1}).to_a[0...limit].to_json # 降順
  else
    db['link'].find().sort({time:-1}).find_all { |e|
      e['link'][0] == id || e['link'][1] == id
    }.to_a[0...limit].to_json
  end
end

get '/register' do
  @id = params['id'].to_s
  @email = params['email'].to_s
  @keywords = params['keywords'].to_s.split(/\s*,\s*/)
  @secrets = params['secrets'].to_s.split(/\s*,\s*/)

  if @email == '' && @keywords.length == 0 && @secrets.length == 0
    data = db['info'].find(:id => @id).first
    if data
      p data
      @email = data['email']
      @keywords = data['keywords']
      @secrets = data['secrets']
    end
  end

  if db['info'].find(:id => @id).to_a.length > 0
    db['info'].delete_many(:id => @id)
  end
  
  data = {
    id: @id,
    email: @email,
    keywords: @keywords,
    secrets: @secrets
  }
  db['info'].insert_one data
  
  erb :register
end

error do
  "Error!"
end

