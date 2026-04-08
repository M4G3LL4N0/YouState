export default function Loading() {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-pulse flex space-x-4">
        <div className="rounded-full bg-white/10 h-12 w-12"></div>
      </div>
    </div>
  );
}
