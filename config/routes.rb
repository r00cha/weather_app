Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'locations', to: 'locations#index'
      get 'weather', to: 'weather#index'
    end
  end
end
