class WeatherRecord < ApplicationRecord

  validates :location, presence: true
  validates :date, presence: true
  validates :temperature, numericality: true, allow_nil: true
  validates :precipitation, numericality: true, allow_nil: true

  
  # Find records based on location and date range
  def self.find_records(location, start_date, end_date)
    where(
      location: location,
      date: start_date..end_date
    )
  end

  # Format the date for display
  def formatted_date
    date.strftime('%B %d, %Y')
  end
end
