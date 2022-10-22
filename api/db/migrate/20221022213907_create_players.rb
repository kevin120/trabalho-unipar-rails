class CreatePlayers < ActiveRecord::Migration[7.0]
  def change
    create_table :players do |t|
      t.string :name
      t.integer :age
      t.integer :height
      t.string :position
      t.string :foot

      t.timestamps
    end
  end
end
