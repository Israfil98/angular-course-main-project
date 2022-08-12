import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { RecipeService } from './recipes/recipe.service';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { AuthService } from './auth/auth.service';
import { DataStorageService } from './shared/data-storage.service';

@NgModule({
  providers: [
    ShoppingListService,
    RecipeService,
    DataStorageService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
})
export class CoreModule {}
