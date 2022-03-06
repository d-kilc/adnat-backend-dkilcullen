class ShiftSerializer < ActiveModel::Serializer
  attributes :id, :start, :end, :break_length
  belongs_to :user
  has_one :organisation, through: :user
end
