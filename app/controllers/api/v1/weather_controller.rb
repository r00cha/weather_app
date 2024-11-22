class Api::V1::WeatherController < ApplicationController
  def index
    #extracting the parameters from the request
    location_name = params[:location]
    start_date = params[:start_date]
    end_date = params[:end_date]

    #find the location in the database
    location_obj = Location.find_by(name: location_name)

    unless location_obj
      render json: { error: "Location not found" }, status: 404
      return
    end

    #callin the weather service to fetch the data
    @weather_data = WeatherService.fetch_weather(location_obj, start_date, end_date)

    #returns the data as json to the react app
    render json: @weather_data
  end
end
