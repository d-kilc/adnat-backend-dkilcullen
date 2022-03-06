class User < ApplicationRecord
    # assuming dependent destroy
    has_secure_password
    has_many :shifts, dependent: :destroy
    belongs_to :organisation, optional: true
end
