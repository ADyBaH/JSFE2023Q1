import { environment } from '../../environments/environment'
import Loader from './loader'

class AppLoader extends Loader {
  constructor() {
    super(environment.BASE_URL, {
      apiKey: environment.API_KEY,
    })
  }
}

export default AppLoader
