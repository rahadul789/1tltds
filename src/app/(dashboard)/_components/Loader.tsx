"use client";

export default function Loader() {
  return (
    <div className="flex items-center gap-1 mt-5 ">
      <div
        className="w-4 h-4 rounded-full border-1 border-transparent 
                      animate-spin 
                      bg-gradient-to-r from-blue-500 via-purple-500 to-brand-teal p-1"
      >
        <div className="animate-pulse-slow"></div>
        <div className="w-full h-full bg-white dark:bg-neutral-900 rounded-full"></div>
      </div>
      <p className=" text-gray-600 tracking-wide  animate-fade-in text-sm">
        please wait...
      </p>
    </div>
  );
}
