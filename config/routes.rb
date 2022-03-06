Rails.application.routes.draw do
  resources :shifts
  resources :users
  resources :organisations, only: [:index, :create, :update, :destroy]
  resources :organisations do
    resources :shifts, only: [:index]
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  #signup
  post '/users', to: 'users#create'
  # user joining an organisation
  # user leaving an organisation
  patch '/users/:id', to: 'users#update' 

  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

  get '/me', to: 'users#show'
  # get '/users/:id', to: 'users#show'
end
