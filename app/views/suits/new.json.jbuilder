json.array! @all_categories do |category|
  json.id category.id
  json.parent_id category.parent_id
  json.name category.name
end

