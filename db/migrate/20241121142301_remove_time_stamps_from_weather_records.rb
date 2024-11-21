class RemoveTimeStampsFromWeatherRecords < ActiveRecord::Migration[7.1]
  def change
    remove_column :weather_records, :created_at, :datetime
    remove_column :weather_records, :updated_at, :datetime
  end
end
