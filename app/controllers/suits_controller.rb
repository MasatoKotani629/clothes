class SuitsController < ApplicationController
  def new
    @suit = Suit.new
  end

  def index
    mini_temp = params[:mini_temp]
    max_temp = params[:max_temp]
    mini_temp = mini_temp.to_s
    max_temp = max_temp.to_s
    if params[:status] == "1"
      @suits = Suit.where('minitemperature <=?', mini_temp).where('maxtemperature >=?', max_temp)
    end
    respond_to do |format|
      format.html
      format.json
    end
  end

  def create
    @suit= Suit.new(name: suit_params[:name], image: suit_params[:image], status: suit_params[:status], minitemperature: suit_params[:minitemperature], maxtemperature: suit_params[:maxtemperature], user_id: current_user.id)
    @suit.count = 0
    @suit.save 
    redirect_to root_path, notice: 'グループを作成しました'
  end

  # def search
  #   @suits = Suits.where("status: #{params[:status]}")
  #   respond_to do |format|
  #     format.html
  #     format.json
  #   end
  # end


  private

  def suit_params
    params.require(:suit).permit(:image, :name, :status, :minitemperature, :maxtemperature)
  end
end
