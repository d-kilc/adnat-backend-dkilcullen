class SessionsController < ApplicationController
    # protect_from_forgery with: :null_session, if: Proc.new { |c| c.request.format == 'application/json' }
    skip_before_action :verify_authenticity_token


    def create
        user = User.find_by email: params[:email]
        if user&.authenticate params[:password]
            session[:user_id] ||= user.id
            return render json: user, status: 200, serializer: UserSerializer
        end
        head :no_content
    end

    def destroy
        session.delete :user_id
        head :no_content
    end

end
