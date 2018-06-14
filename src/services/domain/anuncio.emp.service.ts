import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../../config/api.config';
import { Observable } from 'rxjs/Rx';
import { AnuncioEmpDTO } from '../../models/anuncioemp.dto';

@Injectable()
export class AnuncioEmpService {

  constructor(public http: HttpClient) {
  }

  findById(anuncioEmp_id : string) {
    return this.http.get<AnuncioEmpDTO>(`${API_CONFIG.baseUrl}/anuncioempresas/${anuncioEmp_id}`);
  }

  findByCategoria(categoriasemp_id : string,page : number = 0, linesPerPage : number = 24) {
    return this.http.get(`${API_CONFIG.baseUrl}/anuncioempresas/?categoriasemp=${categoriasemp_id}&page=${page}&linesPerPage=${linesPerPage}`);
  }

  findByAnuncio(page : number = 0, linesPerPage : number = 24) {
    return this.http.get(`${API_CONFIG.baseUrl}/anuncioempresas/?categoriasemp=1,2,3&page=${page}&linesPerPage=${linesPerPage}`);
  }

  getSmallImageFromBucket(id : string) : Observable<any> {
    let url = `${API_CONFIG.bucketBaseUrl}/aEmp${id}.jpg`
    return this.http.get(url, {responseType : 'blob'});
  } 

  getImageFromBucket(id : string) : Observable<any> {
    let url = `${API_CONFIG.bucketBaseUrl}/aEmp${id}.jpg`
    return this.http.get(url, {responseType : 'blob'});
  } 
}