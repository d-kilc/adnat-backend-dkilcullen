class ShiftSerializer < ActiveModel::Serializer
  attributes :id, :start, :end, :break_length, :user_id, :username

  def username
    user = User.find self.object.user_id
    user.name
  end

end
