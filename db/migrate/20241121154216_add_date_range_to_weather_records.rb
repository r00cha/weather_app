class AddDateRangeToWeatherRecords < ActiveRecord::Migration[7.1]
  def change
    add_column :weather_records, :date_range, :string
  end
end
