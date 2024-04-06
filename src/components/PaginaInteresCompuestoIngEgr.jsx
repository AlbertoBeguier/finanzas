import { TasaDeInteresNominal } from "./TasaDeInteresNominal";
import { InteresCompuestoIngEgr } from "./InteresCompuestoIngEgr";

export function PaginaInteresCompuestoIngEgr() {
  return (
    <>
      <TasaDeInteresNominal />

      <div className="p-3 border bg-light rounded ">
        <div className="row justify-content-center">
          <div className="col-8">
            <InteresCompuestoIngEgr />
          </div>
        </div>
      </div>
    </>
  );
}
