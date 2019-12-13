import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/User.model';
import { take, map, tap, delay, switchMap, isEmpty } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

interface FetchedData {
  id: string,
  name: string,
  email: string,
  password: string,
  created_at: Date,
  updated_at: Date,
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  singleUser;

  constructor(private http: HttpClient) {
  }

  private _users = new BehaviorSubject<User[]>([]);


  showUsers() {

    const t = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiMWUxNGI4Nzg0NTBiOTlmZTlmMGFhOWJmNWM0ZjZiZTUyNzg5Njg4ZmUxNWQxN2FjMjM5YWE3MjBlZjVlMzc2MzJmZmQ4NDNjYmFmMWE4MTIiLCJpYXQiOjE1NzUyOTY4MDgsIm5iZiI6MTU3NTI5NjgwOCwiZXhwIjoxNjA2OTE5MjA4LCJzdWIiOiIiLCJzY29wZXMiOlsiKiJdfQ.IGqe1ISsExEVZs4X4FypcUe4735UUAHQ3F8K7G0PZQDrjShc4Y3lj4sl_AfrfLGpbwmgqW0KDbKE8HTZ8GGrj7jqGaqF0VejzISjJeJVioxm_vcgYBDYIgi0IkfCKs9zWZSNBS0pPkdaqGdAEWHPzMVX8xm7-CKzsXyjQV3e9vtP2w1fFWLq2MluIIF1jYITdXnT_STkyUIIeLbUqsbs5RbQ9zCPT9SzSYBSr1IC7V5ZVO4REjeOpm2uMBQnAq54Ett6LTYK3PMvxjsrQytpVVsn7g7H8uYVSJ4aEMRThMyLKi8kmTu40igWBdXDeIM6mkBUBZ8M8xZCKvIGDwOjzh0QX4PZJk91-JpO4Murw4JN0zzzBq--rKLoVI465D3JqqokBegitNFPIO1iDzZGVT4inbpbBlT2ljgpNYRkucyyUoEbtLyL0nrUGpznYKjvyOqkAG5f-IB-QpC1IMj1Tmaq7bGabGBFPWH-FVp3HKSZGhUsFMmNf_g434C1TaGmAHUPJ1un3poD3qflZ5DKgxim9cYgF_OLizWfsrFLpIglR4lIOaMM3EZQ9VhQYQMw6UTZaCambVTkMY-Jt7SpXqqcj8DT1zveJunaVS1_p-nrKEmR5Xljcwb8Y6KQo0WuiRXKTlATPlajX78EqRyQbZ-A1FvUUkihlDpHSsu06EY';

    let headers = new HttpHeaders();

    headers = headers.append('Authorization', 'Bearer ' + t);
    return this.http.get<{ [key: string]: User[]}>('http://localhost:8002/users', { headers: headers })
        .pipe(map(resData => {
          const users = [];

          for (const key in resData.data) {
            if (resData.data.hasOwnProperty(key)) {
              users.push(
                new User(
                  resData.data[key].id,
                  resData.data[key].name,
                  resData.data[key].email,
                  resData.data[key].password,
                  resData.data[key].password_confirmation,
                )
              );
            }
          }
          return users;
        }),
        tap(users => {
          this._users.next(users);
        })
        );
  }

  addUser(id: number, name: string, email: string, password: string, password_confirmation: string) {
    const newUser = new User(
      id = null,
      name,
      email,
      password,
      password_confirmation,
      );

    const t = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiMWUxNGI4Nzg0NTBiOTlmZTlmMGFhOWJmNWM0ZjZiZTUyNzg5Njg4ZmUxNWQxN2FjMjM5YWE3MjBlZjVlMzc2MzJmZmQ4NDNjYmFmMWE4MTIiLCJpYXQiOjE1NzUyOTY4MDgsIm5iZiI6MTU3NTI5NjgwOCwiZXhwIjoxNjA2OTE5MjA4LCJzdWIiOiIiLCJzY29wZXMiOlsiKiJdfQ.IGqe1ISsExEVZs4X4FypcUe4735UUAHQ3F8K7G0PZQDrjShc4Y3lj4sl_AfrfLGpbwmgqW0KDbKE8HTZ8GGrj7jqGaqF0VejzISjJeJVioxm_vcgYBDYIgi0IkfCKs9zWZSNBS0pPkdaqGdAEWHPzMVX8xm7-CKzsXyjQV3e9vtP2w1fFWLq2MluIIF1jYITdXnT_STkyUIIeLbUqsbs5RbQ9zCPT9SzSYBSr1IC7V5ZVO4REjeOpm2uMBQnAq54Ett6LTYK3PMvxjsrQytpVVsn7g7H8uYVSJ4aEMRThMyLKi8kmTu40igWBdXDeIM6mkBUBZ8M8xZCKvIGDwOjzh0QX4PZJk91-JpO4Murw4JN0zzzBq--rKLoVI465D3JqqokBegitNFPIO1iDzZGVT4inbpbBlT2ljgpNYRkucyyUoEbtLyL0nrUGpznYKjvyOqkAG5f-IB-QpC1IMj1Tmaq7bGabGBFPWH-FVp3HKSZGhUsFMmNf_g434C1TaGmAHUPJ1un3poD3qflZ5DKgxim9cYgF_OLizWfsrFLpIglR4lIOaMM3EZQ9VhQYQMw6UTZaCambVTkMY-Jt7SpXqqcj8DT1zveJunaVS1_p-nrKEmR5Xljcwb8Y6KQo0WuiRXKTlATPlajX78EqRyQbZ-A1FvUUkihlDpHSsu06EY';

    let headers = new HttpHeaders();

    headers = headers.append('Authorization', 'Bearer ' + t);
    console.log(headers);
    return this.http
      .post<{ name: string }>('http://localhost:8002/user/add',  {...newUser, id: null }, { headers: headers })
      .pipe(
        switchMap(() => {
          return this._users;
        }),
        take(1),
        tap(users => {
          this._users.next(users.concat(newUser));
        })
      );
    // return this._offers.pipe(take(1), delay(1000), tap(offers => {
    //   setTimeout(() => {
    //     this._offers.next(offers.concat(newOffer));
    //   }, 1000);
    // }));
  }

  showUser(id: number): Observable<any> {

    const t = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiMWUxNGI4Nzg0NTBiOTlmZTlmMGFhOWJmNWM0ZjZiZTUyNzg5Njg4ZmUxNWQxN2FjMjM5YWE3MjBlZjVlMzc2MzJmZmQ4NDNjYmFmMWE4MTIiLCJpYXQiOjE1NzUyOTY4MDgsIm5iZiI6MTU3NTI5NjgwOCwiZXhwIjoxNjA2OTE5MjA4LCJzdWIiOiIiLCJzY29wZXMiOlsiKiJdfQ.IGqe1ISsExEVZs4X4FypcUe4735UUAHQ3F8K7G0PZQDrjShc4Y3lj4sl_AfrfLGpbwmgqW0KDbKE8HTZ8GGrj7jqGaqF0VejzISjJeJVioxm_vcgYBDYIgi0IkfCKs9zWZSNBS0pPkdaqGdAEWHPzMVX8xm7-CKzsXyjQV3e9vtP2w1fFWLq2MluIIF1jYITdXnT_STkyUIIeLbUqsbs5RbQ9zCPT9SzSYBSr1IC7V5ZVO4REjeOpm2uMBQnAq54Ett6LTYK3PMvxjsrQytpVVsn7g7H8uYVSJ4aEMRThMyLKi8kmTu40igWBdXDeIM6mkBUBZ8M8xZCKvIGDwOjzh0QX4PZJk91-JpO4Murw4JN0zzzBq--rKLoVI465D3JqqokBegitNFPIO1iDzZGVT4inbpbBlT2ljgpNYRkucyyUoEbtLyL0nrUGpznYKjvyOqkAG5f-IB-QpC1IMj1Tmaq7bGabGBFPWH-FVp3HKSZGhUsFMmNf_g434C1TaGmAHUPJ1un3poD3qflZ5DKgxim9cYgF_OLizWfsrFLpIglR4lIOaMM3EZQ9VhQYQMw6UTZaCambVTkMY-Jt7SpXqqcj8DT1zveJunaVS1_p-nrKEmR5Xljcwb8Y6KQo0WuiRXKTlATPlajX78EqRyQbZ-A1FvUUkihlDpHSsu06EY';

    let headers = new HttpHeaders();

    headers = headers.append('Authorization', 'Bearer ' + t);
    return this.http.get(`http://localhost:8002/users/${id}` , { headers: headers });

  }

  updateUser(id: number, name: string, email: string, password: string, password_confirmation: string) {
    const updatedUser = new User(
      id = id,
      name = name,
      email = email,
      password = password,
      password_confirmation = password_confirmation,
      );

    const t = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiMWUxNGI4Nzg0NTBiOTlmZTlmMGFhOWJmNWM0ZjZiZTUyNzg5Njg4ZmUxNWQxN2FjMjM5YWE3MjBlZjVlMzc2MzJmZmQ4NDNjYmFmMWE4MTIiLCJpYXQiOjE1NzUyOTY4MDgsIm5iZiI6MTU3NTI5NjgwOCwiZXhwIjoxNjA2OTE5MjA4LCJzdWIiOiIiLCJzY29wZXMiOlsiKiJdfQ.IGqe1ISsExEVZs4X4FypcUe4735UUAHQ3F8K7G0PZQDrjShc4Y3lj4sl_AfrfLGpbwmgqW0KDbKE8HTZ8GGrj7jqGaqF0VejzISjJeJVioxm_vcgYBDYIgi0IkfCKs9zWZSNBS0pPkdaqGdAEWHPzMVX8xm7-CKzsXyjQV3e9vtP2w1fFWLq2MluIIF1jYITdXnT_STkyUIIeLbUqsbs5RbQ9zCPT9SzSYBSr1IC7V5ZVO4REjeOpm2uMBQnAq54Ett6LTYK3PMvxjsrQytpVVsn7g7H8uYVSJ4aEMRThMyLKi8kmTu40igWBdXDeIM6mkBUBZ8M8xZCKvIGDwOjzh0QX4PZJk91-JpO4Murw4JN0zzzBq--rKLoVI465D3JqqokBegitNFPIO1iDzZGVT4inbpbBlT2ljgpNYRkucyyUoEbtLyL0nrUGpznYKjvyOqkAG5f-IB-QpC1IMj1Tmaq7bGabGBFPWH-FVp3HKSZGhUsFMmNf_g434C1TaGmAHUPJ1un3poD3qflZ5DKgxim9cYgF_OLizWfsrFLpIglR4lIOaMM3EZQ9VhQYQMw6UTZaCambVTkMY-Jt7SpXqqcj8DT1zveJunaVS1_p-nrKEmR5Xljcwb8Y6KQo0WuiRXKTlATPlajX78EqRyQbZ-A1FvUUkihlDpHSsu06EY';

    let headers = new HttpHeaders();

    headers = headers.append('Authorization', 'Bearer ' + t);
    return this.http.put(`http://localhost:8002/users/update/${id}` , {...updatedUser}, { headers: headers });
  }

  deleteUser(id: number) {

    const t = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiMWUxNGI4Nzg0NTBiOTlmZTlmMGFhOWJmNWM0ZjZiZTUyNzg5Njg4ZmUxNWQxN2FjMjM5YWE3MjBlZjVlMzc2MzJmZmQ4NDNjYmFmMWE4MTIiLCJpYXQiOjE1NzUyOTY4MDgsIm5iZiI6MTU3NTI5NjgwOCwiZXhwIjoxNjA2OTE5MjA4LCJzdWIiOiIiLCJzY29wZXMiOlsiKiJdfQ.IGqe1ISsExEVZs4X4FypcUe4735UUAHQ3F8K7G0PZQDrjShc4Y3lj4sl_AfrfLGpbwmgqW0KDbKE8HTZ8GGrj7jqGaqF0VejzISjJeJVioxm_vcgYBDYIgi0IkfCKs9zWZSNBS0pPkdaqGdAEWHPzMVX8xm7-CKzsXyjQV3e9vtP2w1fFWLq2MluIIF1jYITdXnT_STkyUIIeLbUqsbs5RbQ9zCPT9SzSYBSr1IC7V5ZVO4REjeOpm2uMBQnAq54Ett6LTYK3PMvxjsrQytpVVsn7g7H8uYVSJ4aEMRThMyLKi8kmTu40igWBdXDeIM6mkBUBZ8M8xZCKvIGDwOjzh0QX4PZJk91-JpO4Murw4JN0zzzBq--rKLoVI465D3JqqokBegitNFPIO1iDzZGVT4inbpbBlT2ljgpNYRkucyyUoEbtLyL0nrUGpznYKjvyOqkAG5f-IB-QpC1IMj1Tmaq7bGabGBFPWH-FVp3HKSZGhUsFMmNf_g434C1TaGmAHUPJ1un3poD3qflZ5DKgxim9cYgF_OLizWfsrFLpIglR4lIOaMM3EZQ9VhQYQMw6UTZaCambVTkMY-Jt7SpXqqcj8DT1zveJunaVS1_p-nrKEmR5Xljcwb8Y6KQo0WuiRXKTlATPlajX78EqRyQbZ-A1FvUUkihlDpHSsu06EY';

    let headers = new HttpHeaders();

    headers = headers.append('Authorization', 'Bearer ' + t);
    console.log('deleted user with id of ' + id);
    return this.http.delete(`http://localhost:8002/users/delete/${id}` , { headers: headers });
  }
}
