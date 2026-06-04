import { useMemo } from "react";
import { useCryptoStore } from "../store/crypto"
import Spinner from "./Spinner";

export default function CryptoPriceDisplay() {
  const { result } = useCryptoStore();
  const { loading } = useCryptoStore();
  const hasResult = useMemo(() => {
    const val = Object.values(result);

    return (val.length !== 0 && !val.includes(''))
  }, [result]);

  return (
    <div className="result-wrapper">{
      loading ? (
        <Spinner />
      ) : hasResult && (
      <>
        <h2>Cotizacion</h2>
        <div className="result">
          <img src={`https://cryptocompare.com/${result.IMAGEURL}`} alt="Imagen de Criptomoneda" />
          <div>
            <p>El precio es de: <span>
              {result.PRICE}
            </span>
            </p>
            <p>Precio mas alto del dia: <span>
              {result.HIGHDAY}
            </span>
            </p>
            <p>Precio mas bajo del dia: <span>
              {result.LOWDAY}
            </span>
            </p>
            <p>Variacion en las ultimas 24H: <span>
              {result.CHANGEPCT24HOUR}
            </span>
            </p>
            <p>Ultima actualizacion: <span>
              {result.LASTUPDATE}
            </span>
            </p>
          </div>
        </div>
      </>
    )}
    </div>
  )
}
