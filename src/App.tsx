import React, { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import CoinList from './components/CoinList';
import CoinDetail from './components/CoinDetail';
import { getCoins, getCoinDetail } from './services/api';
import { Coin, CoinDetail as ICoinDetail } from './types/crypto';

function App() {
  console.log("hiii")
  const [darkMode, setDarkMode] = useState(false); // Default to light mode
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCoin, setSelectedCoin] = useState<ICoinDetail | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Coin | null;
    direction: 'asc' | 'desc';
  }>({
    key: null,
    direction: 'desc',
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  useEffect(() => {
    fetchCoins();
  }, [page]);

  const fetchCoins = async () => {
    setLoading(true);
    try {
      const data = await getCoins(page);
      setCoins(data);
    } catch (error) {
      console.error('Error fetching coins:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCoinSelect = async (id: string) => {
    setLoading(true);
    try {
      const detail = await getCoinDetail(id);
      if (detail) {
        setSelectedCoin(detail);
      }
    } catch (error) {
      console.error('Error fetching coin details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (key: keyof Coin) => {
    setSortConfig((prevConfig) => ({
      key,
      direction:
        prevConfig.key === key && prevConfig.direction === 'desc' ? 'asc' : 'desc',
    }));
  };

  const sortedCoins = [...coins].sort((a, b) => {
    if (!sortConfig.key) return 0;

    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortConfig.direction === 'asc'
        ? aValue - bValue
        : bValue - aValue;
    }
    return 0;
  });

  const filteredCoins = sortedCoins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = 50;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Crypto Dashboard</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? <Sun className="text-yellow-500" /> : <Moon className="text-gray-700" />}
          </button>
        </div>

        {selectedCoin ? (
          <CoinDetail coin={selectedCoin} onBack={() => setSelectedCoin(null)} />
        ) : (
          <>
            <CoinList
              coins={filteredCoins}
              loading={loading}
              onCoinSelect={handleCoinSelect}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              sortConfig={sortConfig}
              onSort={handleSort}
            />
            <div className="mt-6 flex justify-center items-center space-x-4">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
              >
                Previous
              </button>
              <div className="flex items-center space-x-2">
                {page > 1 && (
                  <button
                    onClick={() => setPage(page - 1)}
                    className="px-3 py-1 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    {page - 1}
                  </button>
                )}
                <button className="px-3 py-1 rounded-lg bg-blue-500 text-white">
                  {page}
                </button>
                {page < totalPages && (
                  <button
                    onClick={() => setPage(page + 1)}
                    className="px-3 py-1 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    {page + 1}
                  </button>
                )}
              </div>
              <button
                onClick={() => setPage((p) => p + 1)}
                disabled={page === totalPages}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
