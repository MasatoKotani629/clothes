json.array! @suits do |suit|
  json.id suit.id
  json.image suit.image
  json.maxtemperature suit.maxtemperature
  json.minitemperature suit.minitemperature
end