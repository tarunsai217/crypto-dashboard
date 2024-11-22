import React from 'react';
import { ArrowDown, ArrowUp, Search, ArrowUpDown } from 'lucide-react';
import { Coin } from '../types/crypto';
import Skeleton from './Skeleton';

interface CoinListProps {
  coins: Coin[];
  loading: boolean;
  onCoinSelect: (id: string) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  sortConfig: {
    key: keyof Coin | null;
    direction: 'asc' | 'desc';
  };
  onSort: (key: keyof Coin) => void;
}

export default function CoinList({
  coins,
  loading,
  onCoinSelect,
  searchTerm,
  onSearchChange,
  sortConfig,
  onSort,
}: CoinListProps) {
  const getSortIcon = (key: keyof Coin) => {
    if (sortConfig.key !== key) return <ArrowUpDown size={16} className="ml-1 text-gray-400" />;
    return sortConfig.direction === 'asc' ? (
      <ArrowUp size={16} className="ml-1 text-blue-500" />
    ) : (
      <ArrowDown size={16} className="ml-1 text-blue-500" />
    );
  };

  if (loading) return <Skeleton />;

  return (
    <div className="w-full">
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
          <input
            type="text"
            placeholder="Search cryptocurrencies..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Coin
              </th>
              <th 
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                onClick={() => onSort('current_price')}
              >
                <span className="flex items-center justify-end">
                  Price {getSortIcon('current_price')}
                </span>
              </th>
              <th 
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                onClick={() => onSort('price_change_percentage_24h')}
              >
                <span className="flex items-center justify-end">
                  24h Change {getSortIcon('price_change_percentage_24h')}
                </span>
              </th>
              <th 
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                onClick={() => onSort('market_cap')}
              >
                <span className="flex items-center justify-end">
                  Market Cap {getSortIcon('market_cap')}
                </span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {coins.map((coin) => (
              <tr
                key={coin.id}
                onClick={() => onCoinSelect(coin.id)}
                className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img src={coin.image} alt={coin.name} className="w-8 h-8 rounded-full" />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{coin.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{coin.symbol.toUpperCase()}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900 dark:text-white">
                  ${coin.current_price.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                  <span
                    className={`inline-flex items-center ${
                      coin.price_change_percentage_24h > 0 ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {coin.price_change_percentage_24h > 0 ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                    {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900 dark:text-white">
                  ${coin.market_cap.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}