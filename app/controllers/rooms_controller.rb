class RoomsController < ApplicationController
  before_action :authenticate_user!
  def index
    @rooms = current_user.rooms
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
    @room = current_user.rooms.build(rooms_params)
    if @room.save
      redirect_to @room
    else
      render :new, status: :unprocessable_entity
    end
  end

  private

  def rooms_params
    params.require(:room).permit(:name)
  end
end
