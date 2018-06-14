import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { DonativoDTO } from "../../models/donativo.dto";

@Injectable()
export class DonativoService {

    constructor(public http: HttpClient) {
    }

    insert(obj: DonativoDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/donativos`,
            obj,
            {
                observe : 'response',
                responseType: 'text'
            }
        );
    }
}