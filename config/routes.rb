Rails.application.routes.draw do
 
  get '/me', to: 'users#show'

  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  patch '/password-reset', to: 'users#password_reset'

  post '/users', to: 'users#create'
  patch '/users/:id', to: 'users#update' 

  resources :shifts, only: [:create, :destroy]
  resources :organisations, only: [:index, :create, :update]

  resources :organisations do
    resources :shifts, only: [:index]
  end

  resources :users do
    resources :shifts, only: [:destroy]
  end

end
