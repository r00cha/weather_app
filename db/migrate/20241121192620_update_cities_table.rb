class UpdateCitiesTable < ActiveRecord::Migration[7.1]
  def change
    # Rename the table
    rename_table :cities, :locations

    # Remove the timestamps columns
    remove_column :locations, :created_at, :datetime
    remove_column :locations, :updated_at, :datetime
  end
end
