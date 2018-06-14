import { RefDTO } from "./ref.dto";
import { PagamentoDTO } from "./pagamento.dto";
import { DonativoPKDTO } from "./donativo-pk.dto";

export interface DonativoDTO {
    usuario : RefDTO;
    enderecoDeEntrega : RefDTO;
    pagamento : PagamentoDTO;
    itens : DonativoPKDTO[];
}