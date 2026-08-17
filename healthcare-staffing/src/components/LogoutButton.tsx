"use client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  return (
    <button
      onClick={async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        router.push("/login");
        router.refresh();
      }}
      className="mt-3 w-full text-left text-xs text-slate-500 hover:text-rose-600"
    >
      Sign out →
    </button>
  );
}
