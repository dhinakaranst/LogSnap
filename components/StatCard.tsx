type StatCardProps = {
  title: string;
  value: string;
  subtitle: string;
};

export default function StatCard({ title, value, subtitle }: StatCardProps) {
  return (
    <div className="rounded-lg border border-white/10 p-4 bg-white/5">
      <p className="text-sm text-white/60">{title}</p>
      <p className="text-3xl font-bold mt-1">{value}</p>
      <p className="text-xs text-white/40 mt-1">{subtitle}</p>
    </div>
  );
}
