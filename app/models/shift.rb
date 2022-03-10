class Shift < ApplicationRecord
    belongs_to :user
    has_one :organasisation, through: :user
    validate :shift_end_after_start

    private

    def shift_end_after_start
        if self.end > self.start
            return
        end
        errors.add(:end, "Shift end must be after shift start.")
    end
end
