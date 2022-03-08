class OrganisationsController < ApplicationController
rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
rescue_from ActiveRecord::RecordInvalid, with: :record_invalid
skip_before_action :verify_authenticity_token

    def index
        orgs = Organisation.all
        render json: orgs, status: 200
    end

    def create
        org = Organisation.create! organisation_params
        render json: org, status: 201

        # and join?
    end

    def show
        org_id = params[:id]
        org = Organisation.find org_id
        render json: org, status: 200
    end

    def update
        org_id = params[:id]
        org = Organisation.find org_id
        org.update! organisation_params
        render json: org, status: 200
    end

    def destroy
        org_id = params[:id]
        org = Organisation.find org_id
        org.destroy!
        head :no_content
    end

    private

    def organisation_params
        params.permit :name, :hourly_rate
    end

    def record_not_found
        render json: {error: "Not found"}, status: 404
    end

    def record_invalid invalid
        render json: { errors: invalid.record.errors.to_a }, status: 422
    end
end
