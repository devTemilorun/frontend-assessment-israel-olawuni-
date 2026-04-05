export default function PokemonDetailLoading() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb skeleton */}
        <div className="mb-6">
          <div className="h-6 w-32 bg-white/10 rounded-lg animate-pulse" />
        </div>

        {/* Main card skeleton */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 md:p-8 border border-white/20">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            {/* Image skeleton */}
            <div className="relative w-64 h-64 md:w-80 md:h-80 shrink-0">
              <div className="w-full h-full bg-white/20 rounded-2xl animate-pulse" />
            </div>

            {/* Content skeleton */}
            <div className="flex-1 space-y-6">
              {/* Title skeleton */}
              <div>
                <div className="h-10 w-48 bg-white/20 rounded-lg animate-pulse mb-2" />
                <div className="h-5 w-24 bg-white/20 rounded-lg animate-pulse" />
              </div>

              {/* Types skeleton */}
              <div className="flex gap-2">
                <div className="h-8 w-20 bg-white/20 rounded-full animate-pulse" />
                <div className="h-8 w-20 bg-white/20 rounded-full animate-pulse" />
              </div>

              {/* Measurements skeleton */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-black/20 rounded-xl p-3">
                  <div className="h-8 w-16 bg-white/20 rounded animate-pulse mx-auto mb-2" />
                  <div className="h-4 w-12 bg-white/20 rounded animate-pulse mx-auto" />
                </div>
                <div className="bg-black/20 rounded-xl p-3">
                  <div className="h-8 w-16 bg-white/20 rounded animate-pulse mx-auto mb-2" />
                  <div className="h-4 w-12 bg-white/20 rounded animate-pulse mx-auto" />
                </div>
              </div>

              {/* Stats skeleton */}
              <div className="space-y-3">
                <div className="h-7 w-32 bg-white/20 rounded-lg animate-pulse" />
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between">
                      <div className="h-4 w-20 bg-white/20 rounded animate-pulse" />
                      <div className="h-4 w-8 bg-white/20 rounded animate-pulse" />
                    </div>
                    <div className="w-full bg-black/30 rounded-full h-2">
                      <div className="bg-yellow-400 h-2 rounded-full w-3/4 animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}