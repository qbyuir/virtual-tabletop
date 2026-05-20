class CreateExtensions < ActiveRecord::Migration[8.1]
  def change
    create_table :extensions do |t|
      t.string :name
      t.string :identifier
      t.string :description

      t.timestamps
    end
  end
end
