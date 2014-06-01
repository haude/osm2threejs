require "httparty"

module OSMThreeJS
  class Util
    attr_accessor :location
    OSM2WORLD_PATH = "~/osm2world/osm2world.sh"
    DOOB_CONVERTER_PATH = "~/mrdoob/convert_obj_three.py"
    ROHIT_DAI_PATH = "./temp/main.sh"
    BBOX_MARGIN = 0.005

    def location=(query)
      @location = query.split(" ").join("_")
    end

    def get_map_from_location(loc = nil)
      @location ||= loc
      get_bounding_box
      run_scripts
    end

    def run_scripts
      download_osm
      generate_obj
      generate_json
      generate_json_data
    end

    def get_map_from_position(lat, lon)
      set_bounding_box(lat, lon)
      run_scripts
    end

    def get_bounding_box(loc = nil)
      @location ||= loc
      resp = HTTParty.get(geocode_url)
      lat = resp.parsed_response.first["lat"].to_f
      lon = resp.parsed_response.first["lon"].to_f
      set_bounding_box(lat, lon)
    end

    def set_bounding_box(lat, lon)
      left = lon - BBOX_MARGIN
      down = lat - BBOX_MARGIN
      right = lon + BBOX_MARGIN
      up = lat + BBOX_MARGIN
      @bounding_box = [left, down, right, up].map {|b| b.round(2)}
    end

    def download_osm(bbox = nil)
      @bounding_box ||= bbox
      `wget -c -O #{osm_file} #{osm_download_url}` unless File.exists?("#{osm_file}")
    end

    def generate_obj(loc = nil)
      @location ||= loc
      `#{OSM2WORLD_PATH} -i #{osm_file} -o #{obj_file}` unless File.exists?("#{obj_file}")
    end

    def generate_json(loc = nil)
      @location ||= loc
      `python #{DOOB_CONVERTER_PATH} -i #{obj_file} -o #{json_file}` unless File.exists?("#{json_file}")
    end

    def generate_json_data(loc = nil)
      @location ||= loc
      `cd temp && ./main.sh #{@location}.osm`
    end

    private

    def geocode_url
      "http://nominatim.openstreetmap.org/search.php?q=#{@location.split('_').join(',')}&format=json"
    end

    def osm_download_url
      "http://api.openstreetmap.org/api/0.6/map?bbox=#{@bounding_box.join(',')}"
    end

    def osm_file
      "temp/#{@location}.osm"
    end

    def obj_file
      "temp/#{@location}.obj"
    end

    def json_file
      "public/#{@location}.json"
    end
  end
end
