import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { CryptoCurrency, CryptoPrice, Pair } from "../types";
import { fetchCurrentCryptoPrice, getCryptos } from "../services/CryptoService";

type CryptoState = {
  cryptoCurrencies: CryptoCurrency[];
  result: CryptoPrice;
  loading: boolean;
  fetchCryptos: () => Promise<void>;
  fetchData: (pair: Pair) => Promise<void>;
};

export const useCryptoStore = create<CryptoState>()(
  devtools((set) => ({
    cryptoCurrencies: [],
    result: {} as CryptoPrice,
    loading: false,
    fetchCryptos: async () => {
      const cryptoCurrencies = await getCryptos();

      set(() => ({
        cryptoCurrencies: cryptoCurrencies,
      }));
    },
    fetchData: async (pair) => {
      set(() => ({
        loading: true,
      }));

      const result = await fetchCurrentCryptoPrice(pair);

      set(() => ({
        result,
        loading: false,
      }));
    },
  })),
);

/*
2) Esa es la lista del top list
https://developers.coindesk.com/documentation/data-api/asset_v1_top_list

3) Para obtener las más importantes:
En assets, top list
https://data-api.coindesk.com/asset/v1/top/list?page_size=10&sort_by=CIRCULATING_MKT_CAP_USD&sort_direction=DESC&groups=ID,BASIC&toplist_quote_asset=USD&api_key=MiApiKey

4) Para la cotización entre dos monedas, el endpoint que sale en esta dirección
https://developers.coindesk.com/documentation/data-api/index_cc_v1_latest_tick
Donde el endpoint es:
https://data-api.coindesk.com/index/cc/v1/latest/tick?market=cadli&instruments=BTC-ARS&apply_mapping=true&api_key=MiApiKey
*/
