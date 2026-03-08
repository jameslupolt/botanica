import { useState, useRef } from 'react';
import { MapPin, Search, X } from 'lucide-react';
import { geocodeLocation } from '../lib/geocode';
import type { GeocodingResult } from '../lib/geocode';

interface LocationPickerProps {
  value: string;
  onSelect: (result: { label: string; lat: number; lng: number }) => void;
  onClear: () => void;
}

export function LocationPicker({ value, onSelect, onClear }: LocationPickerProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<GeocodingResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleInput = (input: string) => {
    setQuery(input);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!input.trim()) {
      setResults([]);
      setShowResults(false);
      setSearchError(null);
      return;
    }
    debounceRef.current = setTimeout(async () => {
      setSearching(true);
      setSearchError(null);
      try {
        const found = await geocodeLocation(input);
        setResults(found);
        setShowResults(true);
      } catch {
        setResults([]);
        setShowResults(true);
        setSearchError('Unable to search locations right now.');
      } finally {
        setSearching(false);
      }
    }, 600);
  };

  const handleSelect = (result: GeocodingResult) => {
    onSelect({ label: result.label, lat: result.lat, lng: result.lng });
    setQuery('');
    setResults([]);
    setShowResults(false);
    setSearchError(null);
  };

  if (value) {
    return (
      <div className="flex items-center gap-2 rounded-xl border border-leaf-200 bg-leaf-50 px-3 py-2.5">
        <MapPin className="h-4 w-4 text-leaf-600 shrink-0" />
        <span className="text-sm text-bark-700 flex-1 truncate">{value}</span>
        <button
          type="button"
          onClick={onClear}
          className="text-bark-400 hover:text-bark-600"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-bark-400" />
        <input
          type="text"
          placeholder="Search for a city or region..."
          value={query}
          onChange={(e) => handleInput(e.target.value)}
          className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-bark-200 text-sm focus:outline-none focus:ring-2 focus:ring-leaf-300"
        />
        {searching && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-bark-400">
            Searching...
          </span>
        )}
      </div>

      {showResults && results.length > 0 && (
        <div className="absolute z-10 mt-1 w-full rounded-xl border border-bark-100 bg-white shadow-lg max-h-48 overflow-y-auto">
          {results.map((result, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleSelect(result)}
              className="w-full text-left px-3 py-2.5 text-sm text-bark-700 hover:bg-leaf-50 transition-colors border-b border-bark-50 last:border-b-0"
            >
              <MapPin className="inline h-3.5 w-3.5 text-bark-400 mr-1.5" />
              {result.label}
            </button>
          ))}
        </div>
      )}

      {showResults && results.length === 0 && !searching && query.trim() && (
        <div className="absolute z-10 mt-1 w-full rounded-xl border border-bark-100 bg-white shadow-lg px-3 py-3 text-sm text-bark-500">
          {searchError ?? 'No locations found'}
        </div>
      )}
    </div>
  );
}
