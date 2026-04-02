import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { SignUpButton, SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Link2, BarChart2, Zap, Lock } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Shorten Instantly",
    description:
      "Paste any long URL and get a clean, shareable short link in seconds — no sign-up required to try it.",
  },
  {
    icon: BarChart2,
    title: "Track Every Click",
    description:
      "See how many times your link was clicked and when. Real-time analytics right in your dashboard.",
  },
  {
    icon: Link2,
    title: "Manage All Your Links",
    description:
      "View, edit, and delete all your shortened links from one place. Stay organized and in control.",
  },
  {
    icon: Lock,
    title: "Secure & Private",
    description:
      "Your links belong to you. Each account keeps its links private and accessible only to you.",
  },
];

export default async function Home() {
  const { userId } = await auth();
  if (userId) redirect("/dashboard");

  return (
    <div className="flex flex-col flex-1">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center gap-8 px-6 py-24 text-center">
        <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
          Short links, big impact
        </h1>
        <p className="max-w-xl text-lg text-muted-foreground">
          LinkShort turns unwieldy URLs into clean, memorable links you can share
          anywhere — and tracks every click along the way.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <SignUpButton mode="modal">
            <Button size="lg">Get started free</Button>
          </SignUpButton>
          <SignInButton mode="modal">
            <Button size="lg" variant="outline">Sign in</Button>
          </SignInButton>
        </div>
      </section>

      {/* Features */}
      <section className="flex flex-col items-center gap-10 px-6 py-16">
        <h2 className="text-2xl font-semibold tracking-tight">
          Everything you need
        </h2>
        <div className="grid w-full max-w-4xl gap-6 sm:grid-cols-2">
          {features.map(({ icon: Icon, title, description }) => (
            <Card key={title}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Icon className="h-5 w-5 text-muted-foreground" />
                  <CardTitle>{title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>{description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="flex flex-col items-center gap-6 px-6 py-20 text-center">
        <h2 className="text-2xl font-semibold tracking-tight">
          Ready to shorten your first link?
        </h2>
        <SignUpButton mode="modal">
          <Button size="lg">Create a free account</Button>
        </SignUpButton>
      </section>
    </div>
  );
}
