import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.config";
import { CategoriaEmpDTO } from "../../models/categoria.emp.dto";

@Injectable()
export class CategoriaEmpService {

    constructor(public http: HttpClient) {
    }

    findAll() : Observable<CategoriaEmpDTO[]> {
        return this.http.get<CategoriaEmpDTO[]>(`${API_CONFIG.baseUrl}/categoriasemp`);
    }

}