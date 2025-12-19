function LoadingAudioPlayer() {
  return (
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
  );
}

export default LoadingAudioPlayer;
