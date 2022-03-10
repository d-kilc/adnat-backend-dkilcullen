class SessionsController < ApplicationController

skip_before_action :verify_authenticity_token

    def create
        user = User.find_by! email: params[:email]
        if user&.authenticate params[:password]
            session[:user_id] ||= user.id
            return render json: user, status: 200, serializer: UserSerializer
        end
        render json: {}, status: 404
    end

    def destroy
        session.delete :user_id
        render json: {name: "Unauthorized"}, status: 200
    end

end
