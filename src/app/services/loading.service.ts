import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor(private router: Router) { }

  loadRouter(route: string) {
    this.router.navigate(["loading"])
    setTimeout(() => {
      this.router.navigate([route]);
    }, 2000)
  }

}
