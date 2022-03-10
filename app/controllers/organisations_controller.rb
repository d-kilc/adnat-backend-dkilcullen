class OrganisationsController < ApplicationController

skip_before_action :verify_authenticity_token

    def index
        orgs = Organisation.all
        render json: orgs, status: 200
    end

    def create
        org = Organisation.create! organisation_params
        render json: org, status: 201
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

    private

    def organisation_params
        params.permit :name, :hourly_rate
    end

end
