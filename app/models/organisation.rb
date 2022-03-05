class Organisation < ApplicationRecord
    # assumption dependent destroy
    has_many :users, dependent: :destroy
    has_many :shifts, through: :users, dependent: :destroy
end
