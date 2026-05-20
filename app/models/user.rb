class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  
  # salas criadas pelo usuário
  has_many :owned_rooms, dependent: :destroy

  # salas que o usuário participa
  has_many :user_roles
  has_many :rooms, through: :user_roles 
end
