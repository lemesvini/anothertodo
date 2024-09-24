"use client"
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useRouter } from "next/navigation";
import { app } from "../../Firebase"

export default function Login() {
  const router = useRouter();
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  // Function to handle Google sign-in
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // You can access the Google user information here
        const user = result.user;
        console.log("User info:", user);

        // Redirect to dashboard after successful login
        router.push("/dashboard");
      })
      .catch((error) => {
        console.error("Error during sign-in:", error.message);
      });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <button
        onClick={handleGoogleSignIn}
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
      >
        Sign in with Google
      </button>
    </div>
  );
}
