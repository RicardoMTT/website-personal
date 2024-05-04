import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class RepoService {
  constructor(private http: HttpClient) {}

  getFirstSixRepo() {
    return this.http
      .get('https://api.github.com/users/RicardoMTT/repos?per_page=6')
      .pipe();
  }
}
