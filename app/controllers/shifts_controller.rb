class ShiftsController < ApplicationController
rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
rescue_from ActiveRecord::RecordInvalid, with: :record_invalid
skip_before_action :verify_authenticity_token

    def index
        shifts = Shift.all
        render json: shifts, status: 200
    end

    def create
        shift = Shift.create! shift_params
        render json: shift, status: 201
    end

    private

    def shift_params
        params.permit :user_id, :start, :end, :break_length
    end

    def record_not_found
        render json: { error: "Not found"}, status: 404
    end

    def record_invalid invalid
        render json: { errors: invalid.record.errors.to_a }, status: 422
    end
end
