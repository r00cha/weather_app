class WeatherController < ApplicationController
  def index
    location = { latitude: params[:latitude], longitude: params[:longitude] }
    start_date = params[:start_date]
    end_date = params[:end_date]

    @weather_data = WeatherService.fetch_weather(location, start_date, end_date)

    render json: @weather_data
  end
end
