class Shift < ApplicationRecord
    belongs_to :user
    has_one :organasisation, through: :user
end
