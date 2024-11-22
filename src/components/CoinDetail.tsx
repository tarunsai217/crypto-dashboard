import React from 'react';
import { ArrowLeft, Globe, Twitter } from 'lucide-react';
import { CoinDetail as ICoinDetail } from '../types/crypto';

interface CoinDetailProps {
  coin: ICoinDetail;
  onBack: () => void;
}

export default function CoinDetail({ coin, onBack }: CoinDetailProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
      <button
        onClick={onBack}
        className="mb-6 flex items-center text-blue-500 hover:text-blue-600 transition-colors"
      >
        <ArrowLeft size={20} className="mr-2" />
        Back to list
      </button>

      <div className="flex items-center mb-6">
        <img src={coin.image} alt={coin.name} className="w-16 h-16 rounded-full" />
        <div className="ml-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{coin.name}</h1>
          <p className="text-gray-500 dark:text-gray-400">{coin.symbol.toUpperCase()}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Market Data</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Market Cap</span>
              <span className="text-gray-900 dark:text-white">${coin.market_data.market_cap.usd.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">24h Volume</span>
              <span className="text-gray-900 dark:text-white">${coin.market_data.total_volume.usd.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Circulating Supply</span>
              <span className="text-gray-900 dark:text-white">{coin.market_data.circulating_supply.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Price Changes</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">24h Change</span>
              <span className={coin.market_data.price_change_percentage_24h > 0 ? 'text-green-600' : 'text-red-600'}>
                {coin.market_data.price_change_percentage_24h.toFixed(2)}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">7d Change</span>
              <span className={coin.market_data.price_change_percentage_7d > 0 ? 'text-green-600' : 'text-red-600'}>
                {coin.market_data.price_change_percentage_7d.toFixed(2)}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">30d Change</span>
              <span className={coin.market_data.price_change_percentage_30d > 0 ? 'text-green-600' : 'text-red-600'}>
                {coin.market_data.price_change_percentage_30d.toFixed(2)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Description</h2>
        <p className="text-gray-600 dark:text-gray-300" dangerouslySetInnerHTML={{ __html: coin.description.en }} />
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Links</h2>
        <div className="flex space-x-4">
          {coin.links.homepage[0] && (
            <a
              href={coin.links.homepage[0]}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-blue-500 hover:text-blue-600"
            >
              <Globe size={20} className="mr-2" />
              Website
            </a>
          )}
          {coin.links.twitter_screen_name && (
            <a
              href={`https://twitter.com/${coin.links.twitter_screen_name}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-blue-500 hover:text-blue-600"
            >
              <Twitter size={20} className="mr-2" />
              Twitter
            </a>
          )}
        </div>
      </div>
    </div>
  );
}