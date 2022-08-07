import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

import { Recipe } from './recipe.model';
import { DataStorageService } from './../shared/data-storage.service';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'any' })
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(private dataStorageService: DataStorageService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
    return this.dataStorageService.fetchData();
  }
}
