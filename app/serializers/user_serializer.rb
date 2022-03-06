class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email
  belongs_to :organisation
  has_many :shifts
end
