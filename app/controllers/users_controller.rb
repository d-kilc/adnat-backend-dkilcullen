class UsersController < ApplicationController
rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
rescue_from ActiveRecord::RecordInvalid, with: :record_invalid
skip_before_action :verify_authenticity_token

    def create
        user = User.create! user_params
        render json: user, status: 201
    end

    def show
        user_id = session[:user_id]
        user = User.find user_id
        render json: user, status: 200
    end

    def update
        user_id = params[:id]
        user = User.find user_id
        user.update! user_params
        if ( user_params.key? :organisation_id ) && ( user_params[:organisation_id] == nil )
            Shift.delete user.shifts
        end
        render json: user, status: 200
    end

    private

    def user_params
        params.permit :name, :email, :organisation_id, :password, :password_confirmation
    end

    def record_not_found
        render json: {}, status: 404
    end

    def record_invalid invalid
        render json: {}, status: 422
    end
    
end
