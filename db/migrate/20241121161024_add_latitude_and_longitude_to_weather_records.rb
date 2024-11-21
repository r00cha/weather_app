class AddLatitudeAndLongitudeToWeatherRecords < ActiveRecord::Migration[7.1]
  def change
    add_column :weather_records, :latitude, :float
    add_column :weather_records, :longitude, :float
    #remove the column location
    remove_column :weather_records, :location
  end
end
