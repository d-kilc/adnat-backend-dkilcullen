Rails.application.routes.draw do
  
  # TO DO: remove unneccessary routes
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  get '/me', to: 'users#show'

  resources :shifts
  resources :organisations, only: [:index, :create, :update, :destroy]
  resources :organisations do
    resources :shifts, only: [:index]
  end

  resources :users do
    resources :shifts, only: [:destroy]
  end

  #signup
  post '/users', to: 'users#create'
  # user joining an organisation
  # user leaving an organisation
  patch '/users/:id', to: 'users#update' 

end
