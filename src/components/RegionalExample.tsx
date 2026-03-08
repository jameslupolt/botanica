import { useEffect, useState } from 'react';
import { MapPin, ExternalLink } from 'lucide-react';
import { fetchRegionalPlants } from '../lib/inaturalist';
import type { RegionalPlant } from '../lib/inaturalist';
import { useAuthStore } from '../store/authStore';

interface RegionalExampleProps {
  prompt: string;
  taxonId?: number;
}

export function RegionalExample({ prompt, taxonId }: RegionalExampleProps) {
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

    fetchRegionalPlants(lat, lng, { limit: 4, taxonId })
      .then((results) => {
        if (cancelled) return;
        setPlants(results.slice(0, 3));
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

  if (lat == null || lng == null) {
    return (
      <div className="my-5 rounded-xl border border-leaf-200 bg-leaf-50 p-4">
        <div className="flex items-center gap-2 text-sm text-leaf-700">
          <MapPin className="h-4 w-4" />
          <span className="font-medium">Local Examples</span>
        </div>
        <p className="mt-1 text-sm text-bark-600">{prompt}</p>
        <p className="mt-2 text-xs text-bark-400">
          Set your location in your profile to see plants from your area.
        </p>
      </div>
    );
  }

  return (
    <div className="my-5 rounded-xl border border-leaf-200 bg-leaf-50 p-4">
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-2 text-sm text-leaf-700">
          <MapPin className="h-4 w-4" />
          <span className="font-medium">From Your Area</span>
        </div>
        {locationLabel && (
          <span className="text-xs text-bark-400 truncate max-w-[160px]">{locationLabel}</span>
        )}
      </div>
      <p className="text-sm text-bark-600 mb-3">{prompt}</p>

      {loading && <p className="text-xs text-bark-400">Loading local examples...</p>}
      {error && <p className="text-xs text-petal-700">Unable to load local examples right now.</p>}

      {!loading && !error && plants.length > 0 && (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {plants.map((plant) => (
            <a
              key={plant.taxonId}
              href={`https://www.inaturalist.org/taxa/${plant.taxonId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 w-28 group"
            >
              {plant.photoUrl ? (
                <div className="w-28 h-20 rounded-lg overflow-hidden bg-bark-100">
                  <img
                    src={plant.photoUrl}
                    alt={plant.commonName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    loading="lazy"
                  />
                </div>
              ) : (
                <div className="w-28 h-20 rounded-lg bg-bark-100 flex items-center justify-center text-2xl">
                  🌿
                </div>
              )}
              <p className="mt-1 text-xs font-medium text-bark-700 truncate group-hover:text-leaf-700">
                {plant.commonName}
              </p>
              <div className="flex items-center gap-0.5">
                <p className="text-xs text-bark-400 italic truncate">{plant.scientificName}</p>
                <ExternalLink className="h-2.5 w-2.5 text-bark-300 shrink-0" />
              </div>
            </a>
          ))}
        </div>
      )}

      <p className="mt-2 text-xs text-bark-400">
        via <a href="https://www.inaturalist.org" target="_blank" rel="noopener noreferrer" className="text-leaf-600 hover:underline">iNaturalist</a>
      </p>
    </div>
  );
}
