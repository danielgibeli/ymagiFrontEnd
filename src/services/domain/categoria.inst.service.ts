import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { CategoriaInstDTO } from "../../models/categoria.inst.dto";
import { API_CONFIG } from "../../config/api.config";

@Injectable()
export class CategoriaInstService {

    constructor(public http: HttpClient) {
    }

    findAll() : Observable<CategoriaInstDTO[]> {
        return this.http.get<CategoriaInstDTO[]>(`${API_CONFIG.baseUrl}/categoriasinst`);
    }

}