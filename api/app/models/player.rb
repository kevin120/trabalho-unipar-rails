class Player < ApplicationRecord
    belongs_to :team
    
    validates :name, presence: true
    validates :age, presence: true
    validates :height, presence: true
    validates :position, presence: true
    validates :foot, presence: true
    
end
