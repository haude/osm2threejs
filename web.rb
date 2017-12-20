require "sinatra/base"
require "sinatra"
require "sinatra/reloader"
require "json"
require "pry"
load "./lib/util.rb"

set :bind, '0.0.0.0'
set :port, 4567

module OSMThreeJS
  class Web < Sinatra::Base
    get "/" do
      erb :index
    end

    get '/hello' do
      puts 'hello there'
    end

    get "/get_map" do
      @util = OSMThreeJS::Util.new
      @util.location = params[:query]
      unless File.exists?(@util.send :json_file)
        @util.get_map_from_location
      end
    end
  end
end

OSMThreeJS::Web.run!
