require 'net/http'
require 'json'

class WeatherService
  def self.fetch_weather(location, start_date, end_date)

    Rails.logger.info("CHECKING IF DATA EXISTS IN DATABASE")

    start_date = Date.parse(start_date) if start_date.is_a?(String)
    end_date = Date.parse(end_date) if end_date.is_a?(String)
      
    # Check if data for the date range already exists in the database
    existing_records = WeatherRecord.where(
      location: location[:latitude].to_s + "," + location[:longitude].to_s,
      date: start_date..end_date
     )

    if existing_records.any?
      Rails.logger.info("DATA ALREADY EXISTS IN DATABASE")

      # Return stored data if available
      return existing_records.map { |record| { date: record.date, temperature: record.temperature, precipitation: record.precipitation } }
    end
    
    # Otherwise, fetch data from the API

    Rails.logger.info "NO DATABASE RECORDS. FETCHING DATA FROM API"


    # Construct the API URL with the provided parameters
    url = URI("https://historical-forecast-api.open-meteo.com/v1/forecast?latitude=#{location[:latitude]}&longitude=#{location[:longitude]}&start=#{start_date}&end=#{end_date}&hourly=temperature_2m")

    # Make the HTTP request
    response = Net::HTTP.get(url)

    # Parse the JSON response
    data = JSON.parse(response)

    # Save the data to the database for future use
    hourly_data = data["hourly"]
    hourly_data['time'].each_with_index do |time, index|
      WeatherRecord.create(
        location: location[:latitude].to_s + "," + location[:longitude].to_s,
        date: time.to_date,
        temperature: hourly_data['temperature_2m'][index],
        #precipitation: hourly_data['precipitation'][index]
        precipitation: nil
      )
    end

    data
  end
end
