parent_array = ['トップス','トップス(重ね着)','ジャケット/アウターパンツ','パンツ']
child_array=[['タンクトップ',1],['Tシャツ/カットソー',1],['シャツ/ブラウス',1],['ポロシャツ',1],['ニット/セーター',2],['ベスト',2],['パーカー',2],['スウェット',2],['カーディガン',2],['アンサンブル',2],['ジャージ',2],['ジャケット/アウターパンツ',3],['半ズボン',4],['長ズボン',4]]

parent_array.each do |name|
  Category.create!(
    { name: name, parent_id: 0 }
  )
end
child_array.each do |name, parent_id|
  Category.create!(
    { name: name, parent_id: parent_id }
  )
end
# grandchild_array.each do |name, parent_id|
#   Category.create!(
#     { name: name, parent_id: parent_id }
#   )
# end