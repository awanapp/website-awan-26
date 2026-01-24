import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withPreloading, PreloadAllModules, withRouterConfig } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withNoHttpTransferCache } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HttpClient, provideHttpClient, withXsrfConfiguration, withFetch } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CommonService } from './core/services/common.service';

function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '/i18n/', '.json');
}

export const provideTranslation = () => ({
  loader: {
    provide: TranslateLoader,
    useFactory: HttpLoaderFactory,
    deps: [HttpClient],
  },
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withPreloading(PreloadAllModules),
      withRouterConfig({
        urlUpdateStrategy: 'deferred',
        onSameUrlNavigation: 'reload'
      })
    ),
    provideClientHydration(
      withNoHttpTransferCache()
    ),
    provideAnimations(),
    importProvidersFrom([TranslateModule.forRoot(provideTranslation())]),
    provideHttpClient(
      withFetch(),
      withXsrfConfiguration({
        cookieName: 'X-CSRF-TOKEN',
        headerName: 'X-CSRF-TOKEN'
      })
    ),
  ]
};
