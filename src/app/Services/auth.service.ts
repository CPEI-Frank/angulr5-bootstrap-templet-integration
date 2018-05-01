
export class AuthService {
public getToken() {
    // create authorization header with jwt token
    const currentUser = JSON.parse(String(localStorage.getItem('currentUser')));
    if (currentUser && currentUser.tokenString) {
        console.log(currentUser.tokenString);
       return currentUser.tokenString;
    }
}
}
