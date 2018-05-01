

import { Injectable} from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { User } from '../models/index';
import { Location  } from '@angular/common';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class UserService {
    apiUrl = 'http://localhost:92/api';

    constructor(private http: HttpClient) { }
    create(user: User) {
        console.log(user);
        const headers = new Headers({ 'Access-Control-Allow-Origin': '*', 'Content-Type' : 'application/json'});
        return this.http.post(this.apiUrl + '/User/Register', user);
    }
    login(user: User) {
        const headers = new Headers({'Content-Type' : 'application/json'});
        return this.http.post(this.apiUrl + '/User/Login/' , user);
    }

    // logout() {
    //     // remove user from local storage to log user out
    //     this.http.post('/account/Logout',);
    //     localStorage.removeItem('currentUser');
    // }
    isLogin() {
        return this.http.get(this.apiUrl).map(res => {
            if (res) {
                return res;
            } else {
                return false;
            }
        });
     }
     getUser() {
        return this.http.get(this.apiUrl + '/User/getUsers').map((response: Response) => response);
     }
}
