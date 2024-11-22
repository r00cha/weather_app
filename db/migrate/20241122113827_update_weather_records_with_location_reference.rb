class UpdateWeatherRecordsWithLocationReference < ActiveRecord::Migration[7.1]
  def change
    # Remove latitude and longitude from weather_records
    remove_column :weather_records, :latitude, :float
    remove_column :weather_records, :longitude, :float

    # Add location_id to weather_records
    add_reference :weather_records, :location, null: false, foreign_key: true
  end
end
