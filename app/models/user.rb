class User < ApplicationRecord
    has_secure_password
    has_many :shifts
    belongs_to :organisation, optional: true
    validates :email, format: {with: /@/, message: "malformed"}
    validates :password, length: {minimum: 6}, on: :create
end
