import { environment } from '../../environments/environment';

export class ConfigService {
  getApiUrl(): string {
    return environment.apiUrl;
  }

  isProduction(): boolean {
    return environment.production;
  }
}
