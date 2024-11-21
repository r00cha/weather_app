require 'net/http'
require 'json'

class WeatherService
  def self.fetch_weather(latitude, longitude, start_date, end_date)

    #LOG - "WEATCHER SERVICE PARAMS"
    Rails.logger.info("WEATHER SERVICE PARAMS")
    Rails.logger.info(latitude)
    Rails.logger.info(longitude)
    Rails.logger.info(start_date)
    Rails.logger.info(end_date)

    Rails.logger.info("CHECKING IF DATA EXISTS IN DATABASE")
      
    # Check if data for the date range already exists in the database
    existing_records = WeatherRecord.find_records(
      latitude,
      longitude,
      start_date,
      end_date
    )

    if existing_records

      Rails.logger.info("DATA ALREADY EXISTS IN DATABASE")
    
      return {
        "latitude" => existing_records.latitude,
        "longitude" => existing_records.longitude,
        "date_range" => existing_records.date_range,
        "hourly" => existing_records.hourly
      }
    end
    
    
    # Otherwise, fetch data from the API

    Rails.logger.info "NO DATABASE RECORDS. FETCHING DATA FROM API"


    # Construct the API URL with the provided parameters
    url = URI("https://historical-forecast-api.open-meteo.com/v1/forecast?latitude=#{latitude}&longitude=#{longitude}&start_date=#{start_date}&end_date=#{end_date}&hourly=temperature_2m")
    
    Rails.logger.info("MAKING HTTP REQUEST TO API")
    Rails.logger.info(url)

    # Make the HTTP request
    response = Net::HTTP.get(url)

    # Parse the JSON response
    data = JSON.parse(response)

    Rails.logger.info("API RESPONSE")
    Rails.logger.info(data)

    #for some reason, if i make a request with latitude = 38.71667
    #, ele retorna na response latitude = 38.625, mas mesmo se escrever 38.625, ele retorna 38.625 manual
    

    Rails.logger.info("SAVING DATA TO DATABASE")

    # Save the hourly data as JSON
    WeatherRecord.create!(
      latitude: latitude,
      longitude: longitude,
      date_range: "#{start_date} to #{end_date}", # e.g., "2024-11-06 to 2024-11-07"
      hourly: data["hourly"]
    )

    data
  end
end
