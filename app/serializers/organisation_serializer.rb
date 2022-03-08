class OrganisationSerializer < ActiveModel::Serializer
  attributes :id, :name, :hourly_rate
  has_many :shifts, serializer: ShiftSerializer
end
