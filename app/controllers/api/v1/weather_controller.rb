class Api::V1::WeatherController < ApplicationController
  def index
    #extracting the parameters from the request
    location = { latitude: params[:latitude], longitude: params[:longitude] }
    start_date = params[:start_date]
    end_date = params[:end_date]

    #callin the weather service to fetch the data
    @weather_data = WeatherService.fetch_weather(location, start_date, end_date)

    #returns the data as json to the react app
    render json: @weather_data
  end
end
