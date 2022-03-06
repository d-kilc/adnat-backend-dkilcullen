class ShiftsController < ApplicationController
    def index
        shifts = Shift.all
        render json: shifts, status: 200
    end
end
