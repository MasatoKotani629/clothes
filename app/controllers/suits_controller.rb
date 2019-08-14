class SuitsController < ApplicationController
  def new
    @suit = Suit.new
    @categories = Category.order("id ASC").limit(2)
    @all_categories = Category.all
    # parent_id = params[:parent_id]
    # parent_id = parent_id.to_s
    # @children_categories = Category.where(parent_id: parent_id )
    # @grandchildren_categories = Category.where('id >= ?', 6 )
    respond_to do |format|
      format.html
      format.json
    end
  end

  def index
    mini_temp = params[:mini_temp]
    max_temp = params[:max_temp]
    mini_temp = mini_temp.to_s
    max_temp = max_temp.to_s
    if params[:status] == "1"
      @suits = Suit.where('minitemperature <=?', mini_temp).where('maxtemperature >=?', max_temp)
    else
      @suits = Suit.where('minitemperature <=?', mini_temp).where('maxtemperature >=?', max_temp).where(status: 1)
    end
    respond_to do |format|
      format.html
      format.json
    end
  end

  def create
    @suit= Suit.new(name: suit_params[:name], image: suit_params[:image], status: suit_params[:status], minitemperature: suit_params[:minitemperature], maxtemperature: suit_params[:maxtemperature],category_id: suit_params[:category_id], user_id: current_user.id)
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
    params.require(:suit).permit(:image, :name, :status, :minitemperature, :maxtemperature, :category_id)
  end
end
