import React from 'react'

const LoadingSkeleton = ({ iteration }: any) => {
  return (
    <div className="animate-pulse mt-1">
       {[...Array(iteration)].map((x, i) =>
            <div key={i} className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-2"></div>
        )}
    </div>
  )
}

export default LoadingSkeleton
