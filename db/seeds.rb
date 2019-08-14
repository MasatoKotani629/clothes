parent_array = ['レディース','メンズ']
child_array=[['トップス',2],['ジャケット/アウターパンツ',2],['パンツ',2]]
grandchild_array=[['Tシャツ/カットソー',3],['シャツ/ブラウス',3],['ポロシャツ',3],['ニット/セーター',3],['ベスト',3],['パーカー',3],['スウェット',3],['カーディガン',3],['アンサンブル',3],['ジャージ',3],['タンクトップ',3]]

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
grandchild_array.each do |name, parent_id|
  Category.create!(
    { name: name, parent_id: parent_id }
  )
end