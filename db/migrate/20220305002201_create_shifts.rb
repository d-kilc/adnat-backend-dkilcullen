class CreateShifts < ActiveRecord::Migration[7.0]
  def change
    create_table :shifts do |t|
      t.datetime :start
      t.datetime :end
      t.integer :break_length
      t.references :user, foreign_key: true, null: false

      t.timestamps
    end
  end
end
