import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.config";
import { CategoriaDoaDTO } from "../../models/categoria.doa.dto";

@Injectable()
export class CategoriaDoaService {

    constructor(public http: HttpClient) {
    }

    findAll() : Observable<CategoriaDoaDTO[]> {
        return this.http.get<CategoriaDoaDTO[]>(`${API_CONFIG.baseUrl}/categoriasdoa`);
    }
}