class SuitsController < ApplicationController

  def index
    @all_categories = Category.all
    mini_temp = params[:mini_temp]
    max_temp = params[:max_temp]
    mini_temp = mini_temp.to_s
    max_temp = max_temp.to_s
    if params[:status] == "2"
      @suits = Suit.where('minitemperature <=?', mini_temp).where('maxtemperature >=?', max_temp)
    else
      @suits = Suit.where('minitemperature <=?', mini_temp).where('maxtemperature >=?', max_temp).where("(status = ?) OR (status = ?)", 1, 3)
    end
    respond_to do |format|
      format.html
      format.json
    end
  end

  def new
    @suit = Suit.new
    @categories = Category.order("id ASC").limit(4)
    @all_categories = Category.all
  end

  def create
    @suit= Suit.new( image: suit_params[:image], status: suit_params[:status], minitemperature: suit_params[:minitemperature], maxtemperature: suit_params[:maxtemperature], category_id: suit_params[:category_id], user_id: current_user.id)
    num = suit_params[:category_id]


    num = num.to_i
    chidlren_category = Category.find(num)
    id = chidlren_category.parent_id
    suit_category = Category.find(id)

    tops = {num:1, name:"tops"}
    thick_tops = {num:2, name:"thick_tops"}
    outer = {num:3, name:"outer"}
    pants = {num:4, name:"pants"}

    category_array = [tops,thick_tops,outer,pants]
    category_array.each do |category|
      case suit_category.id
      when category[:num]
      @suit.name = category[:name]
      end
    end


    @outers = Category.where(parent_id: 3)
    @outers.each do |outer|
      if outer.id == num.to_i
        @suit.status = 3
      end
    end
    
    @suit.save 
    redirect_to root_path, notice: 'グループを作成しました'
  end

  private

  def suit_params
    params.require(:suit).permit(:image, :status, :minitemperature, :maxtemperature, :category_id)
  end
end
