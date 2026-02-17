import { getUserSession } from "@/components/actions/authentication";
import Footer from "@/components/components/footer";
import MobileNavigation from "@/components/components/mobileNavigation";
import { Navigation } from "@/components/components/navigation";
import { redirect } from "next/navigation";

export default async function InstructorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userSession = await getUserSession();

  // Check if user is already an instructor
  if (userSession && userSession.roles.includes("instructor")) {
    redirect("/dashboard");
  }

  return (
    <>
      <Navigation userSession={userSession} />
      <MobileNavigation />
      {children}
      <Footer />
    </>
  );
}
