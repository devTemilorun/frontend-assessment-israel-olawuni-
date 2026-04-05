export default function Loading() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="h-12 w-64 bg-white/10 rounded-lg animate-pulse mx-auto mb-4" />
          <div className="h-6 w-48 bg-white/10 rounded-lg animate-pulse mx-auto" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 animate-pulse">
              <div className="aspect-square bg-white/20 rounded-xl mb-3" />
              <div className="h-6 bg-white/20 rounded w-3/4 mx-auto mb-2" />
              <div className="h-4 bg-white/20 rounded w-1/2 mx-auto" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}