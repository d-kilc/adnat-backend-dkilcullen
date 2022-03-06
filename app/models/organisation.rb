class Organisation < ApplicationRecord
    # assumption: dependent destroy
    has_many :users
    has_many :shifts, through: :users
end
