class ShiftsController < ApplicationController

skip_before_action :verify_authenticity_token

    def index
        shifts = Shift.all
        render json: shifts, status: 200
    end

    def create
        shift = Shift.create! shift_params
        render json: shift, status: 201
    end

    def destroy
        shift = Shift.find params[:id]
        shift.destroy!
        render json: {}, status: 200
    end

    private

    def shift_params
        params.permit :user_id, :start, :end, :break_length
    end

end
