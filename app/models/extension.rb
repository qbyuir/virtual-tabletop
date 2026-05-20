class Extension < ApplicationRecord
  has_many :room_extensions
  has_many :rooms, through: :room_extensions
end
