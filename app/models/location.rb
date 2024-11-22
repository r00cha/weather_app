class Location < ApplicationRecord
  has_many :weather_records, dependent: :destroy

  validates :name, presence: true
  validates :latitude, presence: true, numericality: true
  validates :longitude, presence: true, numericality: true
end
