import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CredenciaisDTO } from '../models/credenciais.dto';
import { API_CONFIG } from '../config/api.config'
import { StorageService } from '../services/storage.service';
import { LocalUser } from '../models/local_user';

@Injectable()
export class AuthService{
	
	constructor(public http: HttpClient, public storage: StorageService){
		
	}

	autenticate(creds: CredenciaisDTO){
		return this.http.post(
			`${API_CONFIG.baseUrl}/login`, 
			creds,
			{
				observe: 'response',
				responseType: 'Text'
			});
	}
	
	sucessfullLogin(authorizationValue: string) {	
		let tok = authorizationValue.substring(7);	
		let usr : LocalUser = {
			token : tok			
		};
		this.storage.setLocalUser(usr);
	}
	
	logout() {
		this.storage.setLocalUser(null);
	}
	
}
