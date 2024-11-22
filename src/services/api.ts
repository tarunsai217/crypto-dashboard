import axios from 'axios';
import { Coin, CoinDetail } from '../types/crypto';
import { mockCoins, mockCoinDetail } from './mockData';

const BASE_URL = 'https://api.coingecko.com/api/v3';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export const getCoins = async (page = 1, perPage = 20): Promise<Coin[]> => {
  try {
    const { data } = await api.get<Coin[]>(
      `/coins/markets`,
      {
        params: {
          vs_currency: 'usd',
          order: 'market_cap_desc',
          per_page: perPage,
          page: page,
          sparkline: false
        }
      }
    );
    return data;
  } catch (error) {
    console.warn('Using mock data due to API error:', error);
    return mockCoins;
  }
};

export const getCoinDetail = async (id: string): Promise<CoinDetail | null> => {
  try {
    const { data } = await api.get<CoinDetail>(
      `/coins/${id}`,
      {
        params: {
          localization: false,
          tickers: false,
          market_data: true,
          community_data: false,
          developer_data: false,
          sparkline: false
        }
      }
    );
    return data;
  } catch (error) {
    console.warn('Using mock data due to API error:', error);
    return mockCoinDetail;
  }
};