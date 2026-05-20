class CreateRoomExtensions < ActiveRecord::Migration[8.1]
  def change
    create_table :room_extensions do |t|
      t.references :room, null: false, foreign_key: true
      t.references :extension, null: false, foreign_key: true
      t.boolean :active

      t.timestamps
    end
  end
end
