class Room < ApplicationRecord
  belongs_to :user
  has_secure_token :code, length: 24

  validates :name, presence: true
  def to_param
    code
  end
end
