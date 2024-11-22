export interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  price_change_percentage_24h: number;
}

export interface CoinDetail extends Coin {
  description: { en: string };
  market_data: {
    price_change_percentage_24h: number;
    price_change_percentage_7d: number;
    price_change_percentage_30d: number;
    market_cap: { usd: number };
    total_volume: { usd: number };
    circulating_supply: number;
  };
  links: {
    homepage: string[];
    blockchain_site: string[];
    official_forum_url: string[];
    twitter_screen_name: string;
    telegram_channel_identifier: string;
  };
}