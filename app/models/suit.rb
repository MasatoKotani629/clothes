class Suit < ApplicationRecord
  mount_uploader :image, ImageUploader
  belongs_to :user 

  enum status:{natunaldrying: 0, heatedairdrying: 1}
  enum maxtemperature:{'10': 0, '15': 1, '20': 2, '25': 3, '30': 4, '35': 5, '40': 6}
  enum minitemperature:{'0': 0, '10': 1, '15': 2, '20': 3, '25': 4}, _suffix: true
end
