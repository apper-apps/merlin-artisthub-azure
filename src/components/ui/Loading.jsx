import React from 'react';

const Loading = () => {
  return (
    <div className="max-w-md mx-auto px-4 py-6">
      <div className="space-y-4">
        {/* Header skeleton */}
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded-lg w-48 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded-lg w-64"></div>
        </div>

        {/* Search bar skeleton */}
        <div className="animate-pulse">
          <div className="h-12 bg-gray-200 rounded-lg w-full"></div>
        </div>

        {/* Cards skeleton */}
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-white rounded-xl border border-gray-100 p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="h-4 bg-gray-200 rounded w-24"></div>
                      <div className="h-5 bg-gray-200 rounded-full w-16"></div>
                    </div>
                    <div className="h-3 bg-gray-200 rounded w-32"></div>
                    <div className="h-3 bg-gray-200 rounded w-full"></div>
                    <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                    <div className="flex justify-between items-center">
                      <div className="h-3 bg-gray-200 rounded w-20"></div>
                      <div className="w-4 h-4 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loading;