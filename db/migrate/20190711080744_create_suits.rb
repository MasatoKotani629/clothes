class CreateSuits < ActiveRecord::Migration[5.2]
  def change
    create_table :suits do |t|
      t.string  :name
      t.text :image
      t.integer :count
      t.references :category
      t.integer :status
      t.integer :maxtemperature
      t.integer :minitemperature
      t.references :user
      t.timestamps
    end
  end
end
