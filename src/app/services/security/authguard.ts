import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { StorageService } from '../storage/storage.service';

export const canActivate: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const storageService = inject(StorageService);
  const router = inject(Router);
  let currentUser = storageService.getUser();

  if (
    route.data['roles'] &&
    route.data['roles'].indexOf(currentUser.roles[0]) === -1
  ) {
    console.log(currentUser.role);
    router.navigate(['/tasks']);
    return false;
  }

  if (!storageService.isLoggedIn()) {
    router.navigateByUrl('/login').then();
    return false;
  } else {
    return true;
  }
};
