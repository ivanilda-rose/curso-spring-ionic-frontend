import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CredenciaisDTO } from '../models/credenciais.dto';
import { API_CONFIG } from '../config/api.config'
import { StorageService } from '../services/storage.service';
import { LocalUser } from '../models/local_user';
import { JwtHelper } from 'angular2-jwt';


@Injectable()
export class AuthService{
	
	jwtHelper: JwtHelper = new JwtHelper();
	
	constructor(public http: HttpClient, public storage: StorageService){
		
	}
	
	refreshToken(){
		return this.http.post(
			`${API_CONFIG.baseUrl}/auth/refresh_token`,
			{},
			{
				'observe': 'response',
				'responseType': 'text'
			});
	}

	autenticate(creds: CredenciaisDTO){
		return this.http.post(
			`${API_CONFIG.baseUrl}/login`, 
			creds,
			{
				observe: 'response',
				responseType: 'text'
			});
	}
	
	sucessfullLogin(authorizationValue: string) {	
		let tok = authorizationValue.substring(7);	
		console.log(tok);
		let usr : LocalUser = {
			token: tok,
			email: this.jwtHelper.decodeToken(tok).sub
		};
		this.storage.setLocalUser(usr);
	}
	
	logout() {
		this.storage.setLocalUser(null);
	}
	
}
