class Suit < ApplicationRecord
  mount_uploader :image, ImageUploader
  belongs_to :user 

  # enum maxtemperature:{'--': 0,'10': 1, '15': 2, '20': 3, '25': 4, '30': 5, '35': 6, '40': 7}
  # enum minitemperature:{'--': 0,'0': 1, '10': 2, '15': 3, '20': 4, '25': 5}, _suffix: true
end
