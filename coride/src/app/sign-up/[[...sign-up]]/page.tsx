"use client"
import { SignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <SignUp afterSignUpUrl={"/onboarding"} />
    </div>
  );
}
