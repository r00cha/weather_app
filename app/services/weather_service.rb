require 'net/http'
require 'json'

class WeatherService
  def self.fetch_weather(location, start_date, end_date)
    # Construct the API URL with the provided parameters
    url = URI("https://api.open-meteo.com/v1/forecast?latitude=#{location[:latitude]}&longitude=#{location[:longitude]}&start=#{start_date}&end=#{end_date}&hourly=temperature_2m")

    # Make the HTTP request
    response = Net::HTTP.get(url)

    # Parse the JSON response
    JSON.parse(response)
  end
end
