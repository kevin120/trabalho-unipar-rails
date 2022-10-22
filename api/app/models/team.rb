class Team < ApplicationRecord
  has_many :players
  
  validates :name, presence: true
  validates :country, presence: true
end
