import { useEffect } from "react";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/navigation"; // Import from next/navigation
import { app } from "../../../Firebase"; // Ensure the correct import path

export default function Header() {
  const router = useRouter();
  const auth = getAuth(app);
  const user = auth.currentUser?.displayName;

  
  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user, router]);

  return (
    <div className="flex w-full px-12 bg-black text-white">
      <span className="md:pt-6 pt-24 pb-6 font-mono font-bold text-xl">
        Welcome, {user}!
      </span>
    </div>
  );
}
