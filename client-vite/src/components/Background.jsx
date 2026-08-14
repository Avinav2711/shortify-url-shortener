export default function Background() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-slate-950">

      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/20 blur-[160px] rounded-full" />

      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-blue-500/20 blur-[160px] rounded-full" />

      <div className="absolute top-1/2 left-1/2 w-[350px] h-[350px] bg-purple-500/10 blur-[140px] rounded-full -translate-x-1/2 -translate-y-1/2" />

    </div>
  );
}