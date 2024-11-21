class AddHourlyDataToWeatherRecords < ActiveRecord::Migration[7.1]
  def change
    add_column :weather_records, :hourly_data, :json
  end
end
