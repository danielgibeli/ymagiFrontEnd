import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../../config/api.config';
import { Observable } from 'rxjs/Rx';
import { AnuncioInstDTO } from '../../models/anuncioinst.dto';

@Injectable()
export class AnuncioInstService {

  constructor(public http: HttpClient) {
  }

  findById(anuncioInst_id : string) {
    return this.http.get<AnuncioInstDTO>(`${API_CONFIG.baseUrl}/anuncioinstituicao/${anuncioInst_id}`);
  }

  findByCategoria(categoriainst_id : string, page : number = 0, linesPerPage : number = 24) {
    return this.http.get(`${API_CONFIG.baseUrl}/anuncioinstituicao/?categoriasinst=${categoriainst_id}&page=${page}&linesPerPage=${linesPerPage}`);
  }

  findByAnuncio(page : number = 0, linesPerPage : number = 24) {
    return this.http.get(`${API_CONFIG.baseUrl}/anuncioinstituicao/?categoriasinst=1,2,3&page=${page}&linesPerPage=${linesPerPage}`);
  }

  getSmallImageFromBucket(id : string) : Observable<any> {
    let url = `${API_CONFIG.bucketBaseUrl}/aInst${id}.jpg`
    return this.http.get(url, {responseType : 'blob'});
  }

  getImageFromBucket(id : string) : Observable<any> {
    let url = `${API_CONFIG.bucketBaseUrl}/aInst${id}.jpg`
    return this.http.get(url, {responseType : 'blob'});
  } 
}