json.array! @suits do |suit|
  json.id suit.id
  json.user_id suit.user_id
  json.image suit.image
  json.count suit.count
  json.category_id suit.category_id
  json.maxtemperature suit.maxtemperature
  json.minitemperature suit.minitemperature
end

