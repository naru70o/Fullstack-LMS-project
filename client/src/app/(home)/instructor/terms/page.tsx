import { ScrollArea } from "@/components/components/ui/scroll-area";
import { FileText } from "lucide-react";
import TermsButtons from "../_components/terms-buttons";
import { Navigation } from "@/components/components/navigation";
import MobileNavigation from "@/components/components/mobileNavigation";
import Footer from "@/components/components/footer";

export default function TermsOfServicePage() {
  // primary color
  const primaryColor = "#FB7A79";
  return (
    <>
      {/* Navigation -- the session will be added later */}
      <Navigation />
      <MobileNavigation />
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 mb-4">
              <FileText color={primaryColor} className="w-8 h-8" />
            </div>
            <h1 className="text-primary text-4xl font-bold mb-3 text-balance">
              Terms of Service
            </h1>
            <p className="text-foreground/70 text-lg">
              Please review our terms before continuing
            </p>
          </div>

          <div className="bg-muted border border-foreground/10 rounded-lg overflow-hidden">
            <ScrollArea className="h-[400px] p-8">
              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <section>
                  <h2 className="text-xl font-semibold text-foreground mb-3">
                    1. Acceptance of Terms
                  </h2>
                  <p>
                    By accessing and using this educational platform, you accept
                    and agree to be bound by the terms and provision of this
                    agreement. If you do not agree to abide by the above, please
                    do not use this service.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-foreground mb-3">
                    2. Use License
                  </h2>
                  <p>
                    Permission is granted to temporarily access the materials on
                    our platform for personal, non-commercial transitory viewing
                    only. This is the grant of a license, not a transfer of
                    title, and under this license you may not:
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                    <li>Modify or copy the materials</li>
                    <li>
                      Use the materials for any commercial purpose or public
                      display
                    </li>
                    <li>
                      Attempt to decompile or reverse engineer any software
                    </li>
                    <li>
                      Remove any copyright or proprietary notations from the
                      materials
                    </li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-foreground mb-3">
                    3. User Account
                  </h2>
                  <p>
                    You are responsible for maintaining the confidentiality of
                    your account and password. You agree to accept
                    responsibility for all activities that occur under your
                    account or password. We reserve the right to refuse service,
                    terminate accounts, or remove content at our sole
                    discretion.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-foreground mb-3">
                    4. Privacy Policy
                  </h2>
                  <p>
                    Your use of our platform is also governed by our Privacy
                    Policy. We collect and process personal information in
                    accordance with applicable data protection laws. By using
                    our service, you consent to such processing and warrant that
                    all data provided by you is accurate.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-foreground mb-3">
                    5. Content and Conduct
                  </h2>
                  <p>
                    You agree not to use the platform to upload, post, or
                    transmit any content that is unlawful, harmful, threatening,
                    abusive, harassing, defamatory, vulgar, obscene, or
                    otherwise objectionable. We reserve the right to remove any
                    content that violates these terms.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-foreground mb-3">
                    6. Limitation of Liability
                  </h2>
                  <p>
                    In no event shall our platform or its suppliers be liable
                    for any damages (including, without limitation, damages for
                    loss of data or profit, or due to business interruption)
                    arising out of the use or inability to use the materials on
                    our platform.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-foreground mb-3">
                    7. Modifications
                  </h2>
                  <p>
                    We may revise these terms of service at any time without
                    notice. By using this platform, you are agreeing to be bound
                    by the then current version of these terms of service.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-foreground mb-3">
                    8. Governing Law
                  </h2>
                  <p>
                    These terms and conditions are governed by and construed in
                    accordance with applicable laws, and you irrevocably submit
                    to the exclusive jurisdiction of the courts in that
                    location.
                  </p>
                </section>
              </div>
            </ScrollArea>

            <TermsButtons />
          </div>

          <p className="text-center text-foreground/40 text-sm mt-6">
            Last updated: October 13, 2025
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
