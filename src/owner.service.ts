import { MessageService } from './app/message.service';
import { Owner } from './app/owner';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';



@Injectable({ providedIn: 'root' })

export class OwnerService {

  private ownersUrl = 'api/owners';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-type': 'application/json' })
  }

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }
  
  getOwners(): Observable<Owner[]> {
    return this.http.get<Owner[]>(this.ownersUrl)
      .pipe(
        tap(_ => this.log('fetch owners')),
        catchError(this.handleError<Owner[]>('getOwners', []))
      );
  }

  getOwnerById(id: number): Observable<Owner> {
    const url = `${this.ownersUrl}/${id}`;
    return this.http.get<Owner>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Owner>(`getOwnerById id=${id}`))
    );
  }

  updateOwner(owner: Owner): Observable<any> {
    return this.http.put(this.ownersUrl, owner, this.httpOptions).pipe(
      tap(_ => this.log(`updated owner id=${owner.id}`)),
      catchError(this.handleError<any>('updateOwner'))
    );
  }
  
  addOwner(owner: Owner): Observable<Owner> {
    return this.http.post<Owner>(this.ownersUrl, owner, this.httpOptions)
      .pipe(map((response) => {
        return {
          ...owner,
          id: response.id,
        }
      }));
  }

  deleteOwner(id: number): Observable<Owner> {
    const url = `${this.ownersUrl}/${id}`;
    return this.http.delete<Owner>(url, this.httpOptions)
  };

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  };

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  };
};