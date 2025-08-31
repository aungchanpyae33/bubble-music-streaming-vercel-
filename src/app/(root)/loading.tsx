export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-950 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header/Navigation Skeleton */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-blue-500/30 rounded-full animate-pulse" />
            <div className="w-32 h-6 bg-gray-800 rounded animate-pulse" />
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-24 h-8 bg-gray-800 rounded-full animate-pulse" />
            <div className="w-8 h-8 bg-gray-800 rounded-full animate-pulse" />
          </div>
        </div>

        {/* Hero Section Skeleton */}
        <div className="flex items-center space-x-6 bg-gray-900 rounded-2xl p-8">
          <div className="w-48 h-48 bg-gray-800 rounded-xl animate-pulse" />
          <div className="space-y-4">
            <div className="w-16 h-4 bg-gray-800 rounded animate-pulse" />
            <div className="w-80 h-12 bg-gray-800 rounded animate-pulse" />
            <div className="w-64 h-6 bg-gray-800 rounded animate-pulse" />
            <div className="flex items-center space-x-4 mt-6">
              <div className="w-32 h-12 bg-blue-500/30 rounded-full animate-pulse" />
              <div className="w-10 h-10 bg-gray-800 rounded-full animate-pulse" />
              <div className="w-10 h-10 bg-gray-800 rounded-full animate-pulse" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* Recently Played Section */}
            <div className="space-y-4">
              <div className="w-48 h-8 bg-gray-800 rounded animate-pulse" />
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="bg-gray-900 rounded-lg p-4 space-y-3">
                    <div className="w-full aspect-square bg-gray-800 rounded-lg animate-pulse" />
                    <div className="w-3/4 h-4 bg-gray-800 rounded animate-pulse" />
                    <div className="w-1/2 h-3 bg-gray-700 rounded animate-pulse" />
                  </div>
                ))}
              </div>
            </div>

            {/* Track List Section */}
            <div className="space-y-4">
              <div className="w-40 h-8 bg-gray-800 rounded animate-pulse" />
              <div className="space-y-2">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center space-x-4 p-3 bg-gray-900/50 rounded-lg"
                  >
                    <div className="w-12 h-12 bg-gray-800 rounded animate-pulse" />
                    <div className="flex-1 space-y-2">
                      <div className="w-3/4 h-4 bg-gray-800 rounded animate-pulse" />
                      <div className="w-1/2 h-3 bg-gray-700 rounded animate-pulse" />
                    </div>
                    <div className="w-8 h-4 bg-gray-800 rounded animate-pulse" />
                    <div className="w-6 h-6 bg-gray-800 rounded-full animate-pulse" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Queue Section */}
            <div className="bg-gray-900 rounded-xl p-6 space-y-4">
              <div className="w-24 h-6 bg-gray-800 rounded animate-pulse" />
              <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-800 rounded animate-pulse" />
                    <div className="flex-1 space-y-1">
                      <div className="w-full h-3 bg-gray-800 rounded animate-pulse" />
                      <div className="w-2/3 h-3 bg-gray-700 rounded animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Friend Activity */}
            <div className="bg-gray-900 rounded-xl p-6 space-y-4">
              <div className="w-32 h-6 bg-gray-800 rounded animate-pulse" />
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gray-800 rounded-full animate-pulse" />
                    <div className="flex-1 space-y-2">
                      <div className="w-full h-3 bg-gray-800 rounded animate-pulse" />
                      <div className="w-3/4 h-3 bg-gray-700 rounded animate-pulse" />
                      <div className="w-1/2 h-2 bg-gray-700 rounded animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Player Skeleton */}
        <div className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-sm border-t border-gray-800 p-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-gray-800 rounded animate-pulse" />
              <div className="space-y-1">
                <div className="w-32 h-4 bg-gray-800 rounded animate-pulse" />
                <div className="w-24 h-3 bg-gray-700 rounded animate-pulse" />
              </div>
              <div className="w-6 h-6 bg-gray-800 rounded-full animate-pulse" />
            </div>

            <div className="flex-1 max-w-md mx-8 space-y-2">
              <div className="flex items-center justify-center space-x-4">
                <div className="w-6 h-6 bg-gray-800 rounded-full animate-pulse" />
                <div className="w-6 h-6 bg-gray-800 rounded-full animate-pulse" />
                <div className="w-8 h-8 bg-blue-500/30 rounded-full animate-pulse" />
                <div className="w-6 h-6 bg-gray-800 rounded-full animate-pulse" />
                <div className="w-6 h-6 bg-gray-800 rounded-full animate-pulse" />
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-3 bg-gray-800 rounded animate-pulse" />
                <div className="flex-1 h-1 bg-gray-800 rounded-full animate-pulse relative">
                  <div className="absolute left-0 top-0 w-1/3 h-full bg-blue-500/50 rounded-full animate-pulse" />
                </div>
                <div className="w-8 h-3 bg-gray-800 rounded animate-pulse" />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-6 h-6 bg-gray-800 rounded-full animate-pulse" />
              <div className="w-6 h-6 bg-gray-800 rounded-full animate-pulse" />
              <div className="w-20 h-1 bg-gray-800 rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
