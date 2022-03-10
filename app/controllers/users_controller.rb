class UsersController < ApplicationController

skip_before_action :verify_authenticity_token

    def create
        user = User.create! user_params
        session[:user_id] ||= user.id
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

    def password_reset
        user = User.find_by! email: params[:email]
        user.update! user_params
        render json: user, status: 200
    end

    private

    def user_params
        params.permit :name, :email, :organisation_id, :password, :password_confirmation
    end
    
end
