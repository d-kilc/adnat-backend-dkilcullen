class ApplicationController < ActionController::Base
    include ActionController::Cookies
    rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
    rescue_from ActiveRecord::RecordInvalid, with: :record_invalid

    private

    def record_not_found
        render json: {errors: "Record not found"}, status: 404
    end

    def record_invalid invalid
        render json: {errors: invalid.record.errors.to_a}, status: 422
    end
end
