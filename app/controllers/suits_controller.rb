class SuitsController < ApplicationController
  def new
    @suit = Suit.new
  end

  def index
  end

  def create
    @suit= Suit.new(name: suit_params[:name], image: suit_params[:image], status: suit_params[:status], minitemperature: suit_params[:minitemperature], maxtemperature: suit_params[:maxtemperature], user_id: current_user.id)
    @suit.count = 0
    @suit.save 
    redirect_to root_path, notice: 'グループを作成しました'
  end


  private

  def suit_params
    params.require(:suit).permit(:image, :name, :status, :minitemperature, :maxtemperature)
  end
end
