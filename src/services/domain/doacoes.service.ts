import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../../config/api.config';
import { Observable } from 'rxjs/Rx';
import { DoacoesDTO } from '../../models/doacoes.dto';

@Injectable()
export class DoacoesService {

  constructor(public http: HttpClient) {
  }

  findById(doacoes_id : string) {
    return this.http.get<DoacoesDTO>(`${API_CONFIG.baseUrl}/doacoes/${doacoes_id}`);
  }

  findByCategoria(categoriasdoa_id : string, page : number = 0, linesPerPage : number = 24) {
    return this.http.get(`${API_CONFIG.baseUrl}/doacoes/?categoriasdoa=${categoriasdoa_id}&page=${page}&linesPerPage=${linesPerPage}`);
  }

  findByAnuncio(page : number = 0, linesPerPage : number = 24) {
    return this.http.get(`${API_CONFIG.baseUrl}/doacoes/?categoriasdoa=1,2,3,4,5,6,7,8,9,10,11&page=${page}&linesPerPage=${linesPerPage}`);
  }

  getSmallImageFromBucket(id : string) : Observable<any> {
    let url = `${API_CONFIG.bucketBaseUrl}/doa${id}.jpg`
    return this.http.get(url, {responseType : 'blob'});
  } 

  getImageFromBucket(id : string) : Observable<any> {
    let url = `${API_CONFIG.bucketBaseUrl}/doa${id}.jpg`
    return this.http.get(url, {responseType : 'blob'});
  } 
}