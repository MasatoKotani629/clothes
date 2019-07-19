class SuitsController < ApplicationController
  def new
    @suit = Suit.new
  end

  def index
  end

  def create
    @suit= Suit.new(name: suit_params[:name], image: suit_params[:image], user_id: current_user.id)
    @suit.count = 0
    @suit.category_id = 1
    @suit.save
  end

  private

  def suit_params
    params.require(:suit).permit(:image, :name)
  end
end
