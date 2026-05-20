# tabela intermediária entre Room e Extension
# vê se a extensão está ativa ou não em cada sala
class RoomExtension < ApplicationRecord
  belongs_to :room
  belongs_to :extension
end
