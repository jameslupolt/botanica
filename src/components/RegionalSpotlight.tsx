import { useEffect, useState, useCallback } from 'react';
import { MapPin, ExternalLink, RefreshCw } from 'lucide-react';
import { fetchRegionalPlants } from '../lib/inaturalist';
import type { RegionalPlant } from '../lib/inaturalist';
import { useAuthStore } from '../store/authStore';
import { Link } from 'react-router-dom';

const CYCLE_MS = 8_000;

interface RegionalSpotlightProps {
  taxonId?: number;
}

export function RegionalSpotlight({ taxonId }: RegionalSpotlightProps) {
  const profile = useAuthStore((s) => s.profile);
  const [plants, setPlants] = useState<RegionalPlant[]>([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [fade, setFade] = useState(true);
  const [error, setError] = useState(false);

  const lat = profile?.locationLat;
  const lng = profile?.locationLng;

  useEffect(() => {
    if (lat == null || lng == null) return;

    let cancelled = false;
    setLoading(true);
    setError(false);

    fetchRegionalPlants(lat, lng, { limit: 20, taxonId })
      .then((results) => {
        if (cancelled) return;
        // Shuffle so each visit feels fresh
        const shuffled = results.sort(() => Math.random() - 0.5);
        setPlants(shuffled);
        setIndex(0);
        setFade(true);
        setLoading(false);
      })
      .catch(() => {
        if (!cancelled) {
          setError(true);
          setLoading(false);
        }
      });

    return () => { cancelled = true; };
  }, [lat, lng, taxonId]);

  // Auto-cycle
  useEffect(() => {
    if (plants.length < 2) return;

    const timer = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % plants.length);
        setFade(true);
      }, 300);
    }, CYCLE_MS);

    return () => clearInterval(timer);
  }, [plants.length]);

  const advance = useCallback(() => {
    if (plants.length < 2) return;
    setFade(false);
    setTimeout(() => {
      setIndex((prev) => (prev + 1) % plants.length);
      setFade(true);
    }, 300);
  }, [plants.length]);

  if (lat == null || lng == null) {
    return (
      <div className="rounded-2xl border border-bark-100 bg-white p-4 shadow-sm">
        <div className="flex items-center gap-2 text-sm text-leaf-700 font-medium">
          <MapPin className="h-4 w-4" />
          Near You
        </div>
        <p className="mt-1.5 text-xs text-bark-500">
          Set your location in your{' '}
          <Link to="/profile" className="text-leaf-700 font-medium hover:underline">
            profile
          </Link>{' '}
          to see local species.
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="rounded-2xl border border-bark-100 bg-white shadow-sm overflow-hidden">
        <div className="aspect-[4/3] bg-bark-50 animate-pulse" />
        <div className="p-3">
          <div className="h-4 bg-bark-100 rounded w-3/4 animate-pulse" />
          <div className="h-3 bg-bark-50 rounded w-1/2 mt-1.5 animate-pulse" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-bark-100 bg-white p-4 shadow-sm">
        <div className="flex items-center gap-2 text-sm text-leaf-700 font-medium">
          <MapPin className="h-4 w-4" />
          Near You
        </div>
        <p className="mt-1.5 text-xs text-petal-700">
          Unable to load local species right now.
        </p>
      </div>
    );
  }

  if (plants.length === 0) return null;

  const plant = plants[index];

  return (
    <div className="rounded-2xl border border-bark-100 bg-white shadow-sm overflow-hidden">
      <a
        href={`https://www.inaturalist.org/taxa/${plant.taxonId}`}
        target="_blank"
        rel="noopener noreferrer"
        className="block group"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-bark-100">
          {plant.photoUrl ? (
            <img
              src={plant.photoUrl}
              alt={plant.commonName}
              className={`w-full h-full object-cover group-hover:scale-105 transition-all duration-500 ${
                fade ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-4xl bg-bark-50">
              🌿
            </div>
          )}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3 pt-8">
            <p className={`text-white font-semibold text-sm leading-tight transition-opacity duration-300 ${
              fade ? 'opacity-100' : 'opacity-0'
            }`}>
              {plant.commonName}
            </p>
            <p className={`text-white/70 text-xs italic transition-opacity duration-300 ${
              fade ? 'opacity-100' : 'opacity-0'
            }`}>
              {plant.scientificName}
            </p>
          </div>
        </div>
      </a>

      <div className="px-3 py-2 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-bark-400 min-w-0">
          <MapPin className="h-3 w-3 shrink-0 text-leaf-500" />
          <span className="truncate">Near you</span>
          <span className="text-bark-300">·</span>
          <a
            href={`https://www.inaturalist.org/taxa/${plant.taxonId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-leaf-600 hover:underline flex items-center gap-0.5 shrink-0"
          >
            iNaturalist
            <ExternalLink className="h-2.5 w-2.5" />
          </a>
        </div>
        <button
          onClick={advance}
          className="p-1 rounded-md hover:bg-bark-50 text-bark-400 hover:text-leaf-600 transition-colors"
          aria-label="Next species"
        >
          <RefreshCw className="h-3.5 w-3.5" />
        </button>
      </div>

      {plants.length > 1 && (
        <div className="px-3 pb-2 flex gap-1">
          {plants.map((_, i) => (
            <div
              key={i}
              className={`h-0.5 flex-1 rounded-full transition-colors duration-300 ${
                i === index ? 'bg-leaf-500' : 'bg-bark-100'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
