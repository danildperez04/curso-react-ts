import { useState } from "react";
import { currencies } from "../data"
import { useCryptoStore } from "../store/crypto"
import type { Pair } from "../types";
import { PairSchema } from "../schemas/crypto-schema";
import Alert from "./Alert";

export default function CryptoSearchForm() {
  const { cryptoCurrencies, fetchData } = useCryptoStore();
  const [pair, setPair] = useState<Pair>({ currency: '', cryptocurrency: '' });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;

    setPair({
      ...pair,
      [name]: value
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (Object.values(pair).includes('')) {
      setError('Todos los campos son obligatorios')
      return;
    }

    const result = PairSchema.safeParse(pair);

    if (!result.success) {
      setError('Datos invalidos')
      return;
    }

    setError('');

    fetchData(pair);
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="currency">Moneda:</label>
        <select
          name="currency"
          id="currency"
          onChange={handleChange}
          value={pair.currency}
        >
          <option value="">-- Seleccione --</option>
          {currencies.map(currency => (
            <option key={currency.code} value={currency.code}>{currency.name}</option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="cryptocurrency">Criptomoneda:</label>
        <select
          name="cryptocurrency"
          id="cryptocurrency"
          onChange={handleChange}
          value={pair.cryptocurrency}
        >
          <option value="">-- Seleccione --</option>
          {cryptoCurrencies.map(({ CoinInfo: crypto }) => (
            <option
              key={crypto.Name}
              value={crypto.Name}>{crypto.FullName}</option>
          ))}
        </select>
      </div>
      <button>Cotizar</button>
      {error && <Alert type="error">{error}</Alert>}
    </form>
  )
}
