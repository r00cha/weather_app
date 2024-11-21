class WeatherRecord < ApplicationRecord
  validates :latitude, presence: true, numericality: true
  validates :longitude, presence: true, numericality: true
  validates :date_range, presence: true
  validates :hourly, presence: true

  
  # Find records based on location and date range

  def self.find_records(latitude, longitude, start_date, end_date)
    where(
      latitude: latitude,
      longitude: longitude,
      date_range: "#{start_date} to #{end_date}"
    ).first
  end


  # Format the date for display
  def formatted_date
    date.strftime('%B %d, %Y')
  end
end
