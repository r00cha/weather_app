Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'weather', to: 'weather#index'
    end
  end

end
