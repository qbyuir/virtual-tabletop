class RoomsController < ApplicationController
  before_action :authenticate_user!
  def index
    @room = current_user.rooms
  end

  def show
    # find_by(code:) é melhor por segurança
    # código gerado automaticamente é difícil de adivinhar
 
    @room = current_user.rooms.find_by(code: params[:code])
  end

  def new
    @room = current_user.rooms.build
  end

  def create
    @room = Room.new(rooms_params)
    @room.owner = current_user
    if @room.save
      redirect_to @room
    else
      puts @room.errors.full_messages
      render :new, status: :unprocessable_entity
    end
  end

  private

  def rooms_params
    params.require(:room).permit(:name)
  end
end
