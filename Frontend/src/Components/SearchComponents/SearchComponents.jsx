import React, { useEffect, useState } from 'react'
import './SearchComponents.css';
import SearchUserCard from './SearchUserCard';
import { searchUsers } from '../../api/userApi';
import { normalizeUser } from '../../api/normalize';

const SearchComponents = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const q = query.trim();
    if (!q) {
      setResults([]);
      return;
    }
    let cancelled = false;
    setLoading(true);
    const timer = setTimeout(() => {
      searchUsers(q)
        .then((users) => {
          if (cancelled) return;
          setResults((users || []).map(normalizeUser));
        })
        .catch(() => { if (!cancelled) setResults([]); })
        .finally(() => { if (!cancelled) setLoading(false); });
    }, 250);
    return () => { cancelled = true; clearTimeout(timer); };
  }, [query]);

  return (
    <div className='searchContainer'>
      <div className='px-4 pb-4'>
        <h1 className='text-2xl font-semibold pb-6'>Search</h1>
        <input
          className='searchInput'
          type='text'
          placeholder='Search'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <hr/>
      <div className='px-3 pt-4'>
        <div className='flex justify-between items-center px-2 mb-2'>
          <p className='font-semibold text-sm'>{query.trim() ? 'Results' : 'Recent'}</p>
        </div>
        {loading && <p className='text-xs opacity-60 px-2'>Searching...</p>}
        {!loading && query.trim() && results.length === 0 && (
          <p className='text-sm opacity-60 px-2 py-4 text-center'>No users found.</p>
        )}
        {results.map(u => <SearchUserCard key={u.id} user={u} />)}
      </div>
    </div>
  )
}

export default SearchComponents
