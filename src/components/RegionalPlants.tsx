import { useEffect, useState } from 'react';
import { MapPin, ExternalLink } from 'lucide-react';
import { fetchRegionalPlants } from '../lib/inaturalist';
import type { RegionalPlant } from '../lib/inaturalist';
import { useAuthStore } from '../store/authStore';
import { Link } from 'react-router-dom';

interface RegionalPlantsProps {
  /** iNaturalist taxon ID to filter results (e.g. 311249 for Bryophyta). Falls back to Plantae. */
  taxonId?: number;
  limit?: number;
}

export function RegionalPlants({ taxonId, limit = 8 }: RegionalPlantsProps) {
  const profile = useAuthStore((s) => s.profile);
  const [plants, setPlants] = useState<RegionalPlant[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const lat = profile?.locationLat;
  const lng = profile?.locationLng;
  const locationLabel = profile?.locationLabel;

  useEffect(() => {
    if (lat == null || lng == null) return;

    let cancelled = false;
    setLoading(true);
    setError(false);

    fetchRegionalPlants(lat, lng, { limit, taxonId })
      .then((results) => {
        if (cancelled) return;
        setPlants(results.slice(0, limit));
        setLoading(false);
      })
      .catch(() => {
        if (!cancelled) {
          setError(true);
          setLoading(false);
        }
      });

    return () => { cancelled = true; };
  }, [lat, lng, taxonId, limit]);

  if (lat == null || lng == null) {
    return (
      <div className="rounded-2xl border border-bark-100 bg-white p-5 shadow-sm">
        <h3 className="font-display text-lg font-semibold text-bark-900 flex items-center gap-2">
          <MapPin className="h-5 w-5 text-leaf-600" />
          Plants Near You
        </h3>
        <p className="mt-2 text-sm text-bark-500">
          Set your location in your{' '}
          <Link to="/profile" className="text-leaf-700 font-medium hover:underline">
            profile
          </Link>{' '}
          to see plants from your region.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-bark-100 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-2 mb-4">
        <h3 className="font-display text-lg font-semibold text-bark-900 flex items-center gap-2">
          <MapPin className="h-5 w-5 text-leaf-600" />
          Plants Near You
        </h3>
        {locationLabel && (
          <span className="text-xs text-bark-400 truncate max-w-[180px]">{locationLabel}</span>
        )}
      </div>

      {loading && (
        <div className="py-6 text-center text-sm text-bark-400">
          Loading plants from your area...
        </div>
      )}

      {error && (
        <p className="text-sm text-petal-600">
          Could not load regional plants. Try again later.
        </p>
      )}

      {!loading && !error && plants.length === 0 && (
        <p className="text-sm text-bark-500">No plant observations found near your location.</p>
      )}

      {!loading && !error && plants.length > 0 && (
        <div className="grid grid-cols-2 gap-3">
          {plants.map((plant) => (
            <a
              key={plant.taxonId}
              href={`https://www.inaturalist.org/taxa/${plant.taxonId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-xl border border-bark-50 overflow-hidden hover:border-leaf-200 transition-colors"
            >
              {plant.photoUrl ? (
                <div className="aspect-[4/3] overflow-hidden bg-bark-100">
                  <img
                    src={plant.photoUrl}
                    alt={plant.commonName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    loading="lazy"
                  />
                </div>
              ) : (
                <div className="aspect-[4/3] bg-bark-50 flex items-center justify-center text-3xl">
                  🌿
                </div>
              )}
              <div className="p-2">
                <p className="text-sm font-medium text-bark-800 truncate group-hover:text-leaf-700 transition-colors">
                  {plant.commonName}
                </p>
                <p className="text-xs text-bark-400 italic truncate">{plant.scientificName}</p>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-xs text-bark-400">{plant.observationCount.toLocaleString()} obs</span>
                  <ExternalLink className="h-3 w-3 text-bark-300 ml-auto" />
                </div>
              </div>
            </a>
          ))}
        </div>
      )}

      <p className="mt-3 text-xs text-bark-400">
        Data from{' '}
        <a
          href="https://www.inaturalist.org"
          target="_blank"
          rel="noopener noreferrer"
          className="text-leaf-600 hover:underline"
        >
          iNaturalist
        </a>
      </p>
    </div>
  );
}
