class RoomsController < ApplicationController
  before_action :authenticate_user!
  def index
    @rooms = current_user.rooms
  end

  def show
    @rooms = current_user.rooms.find_by(code: params[:code])
  end

  def new
    @rooms = current_user.rooms.build
  end

  def create
    @rooms = current_user.rooms.build(rooms_params)
    if @rooms.save
      redirect_to @rooms
    else
      render :new, status: :unprocessable_entity
    end
  end

  private

  def rooms_params
    params.require(:room).permit(:name)
  end
end
