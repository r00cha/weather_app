class WeatherRecord < ApplicationRecord
  belongs_to :location


  validates :date_range, presence: true
  validates :hourly, presence: true

  
  # Find records based on location and date range

  def self.find_records(location_id, start_date, end_date)
    where(
      location_id: location_id,
      date_range: "#{start_date} to #{end_date}"
    ).first
  end


end
