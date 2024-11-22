require 'net/http'
require 'json'

class WeatherService
  def self.fetch_weather(location_obj, start_date, end_date)

    Rails.logger.info("CHECKING IF DATA EXISTS IN DATABASE")
      
    # Check if data for the date range already exists in the database
    existing_record = WeatherRecord.find_records(
      location_obj.id,
      start_date,
      end_date
    )

    if existing_record

      Rails.logger.info("DATA ALREADY EXISTS IN DATABASE")
    
      return {
        "latitude" => location_obj.latitude,
        "longitude" => location_obj.longitude,
        "hourly" => existing_record.hourly
      }
    end
    
    
    # Otherwise, fetch data from the API

    Rails.logger.info "NO DATABASE RECORDS. FETCHING DATA FROM API"


    # Construct the API URL with the provided parameters
    url = URI("https://historical-forecast-api.open-meteo.com/v1/forecast?latitude=#{location_obj.latitude}&longitude=#{location_obj.longitude}&start_date=#{start_date}&end_date=#{end_date}&hourly=temperature_2m,precipitation")


    # Make the HTTP request
    response = Net::HTTP.get(url)

    # Parse the JSON response
    data = JSON.parse(response)



    #for some reason, if i make a request with latitude = 38.71667
    # ele retorna na response latitude = 38.625, mas mesmo se escrever 38.625, ele retorna 38.71667 manualmente
    # então, eu vou forçar a latitude e longitude que eu tenho na db
    data["latitude"] = location_obj.latitude
    data["longitude"] = location_obj.longitude


    Rails.logger.info("SAVING DATA TO DATABASE")

    # Save the hourly data as JSON
    WeatherRecord.create!(
      location_id: location_obj.id,
      date_range: "#{start_date} to #{end_date}", # e.g., "2024-11-06 to 2024-11-07"
      hourly: data["hourly"]
    )

    data
  end
end
