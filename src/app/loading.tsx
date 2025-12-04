export default function Loading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 bg-gradient-to-br from-accent via-teal-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-accent/20 animate-pulse">
          <span className="text-white font-black text-lg tracking-tighter">tx</span>
        </div>
        <div className="flex gap-1">
          <div className="w-2 h-2 bg-accent rounded-full animate-bounce [animation-delay:-0.3s]" />
          <div className="w-2 h-2 bg-accent rounded-full animate-bounce [animation-delay:-0.15s]" />
          <div className="w-2 h-2 bg-accent rounded-full animate-bounce" />
        </div>
      </div>
    </div>
  );
}
