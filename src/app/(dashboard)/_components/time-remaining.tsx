import React, { useEffect, useState } from "react";

export function TimeRemaining({
  expiresAt,
}: {
  expiresAt?: string | number | Date | null;
}) {
  const [remaining, setRemaining] = useState<React.ReactNode>("");

  useEffect(() => {
    if (!expiresAt) return;

    const updateRemaining = () => {
      const formatted = formatRemainingTime(new Date(expiresAt));
      setRemaining(formatted);
    };

    updateRemaining(); // run immediately

    const interval = setInterval(updateRemaining, 1000);

    return () => clearInterval(interval);
  }, [expiresAt]);

  return (
    <div>
      <div className="text-brand-teal font-semibold text-xs">{remaining}</div>
    </div>
  );
}

function formatRemainingTime(targetDate: Date): React.ReactNode {
  const now = new Date();
  const diff = targetDate.getTime() - now.getTime();

  if (diff <= 0)
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-red-100 text-red-700 border border-red-300">
        Expired
      </span>
    );

  const sec = Math.floor(diff / 1000);
  const min = Math.floor(sec / 60);
  const hr = Math.floor(min / 60);
  const day = Math.floor(hr / 24);

  const days = day;
  const hours = hr % 24;
  const minutes = min % 60;
  const seconds = sec % 60;

  const parts: string[] = [];

  if (days > 0) parts.push(`${days}d`);
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);

  // if all are zero or seconds remain, show seconds
  if (parts.length === 0 || seconds > 0) parts.push(`${seconds}s`);

  return parts.join(" ") + " left";
}
