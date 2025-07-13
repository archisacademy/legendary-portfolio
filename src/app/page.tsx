import Image from "next/image";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { SkillCloud } from "@/components/SkillCloud";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <Hero />

      {/* About Section */}
      <About />

      {/* Skills Section */}
      <SkillCloud />

      {/* Demo Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-foreground">
            Design System Demo
          </h2>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Color Tokens Demo */}
            <div className="p-6 rounded-xl bg-card border border-border shadow-soft hover:shadow-medium transition-shadow">
              <h3 className="text-xl font-semibold mb-4 text-card-foreground">Color Tokens</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded bg-primary-500"></div>
                  <span className="text-sm">Primary (#1a103d)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded bg-accent-500"></div>
                  <span className="text-sm">Accent (#ea0d44)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded bg-muted"></div>
                  <span className="text-sm">Muted</span>
                </div>
              </div>
            </div>

            {/* Typography Demo */}
            <div className="p-6 rounded-xl bg-card border border-border shadow-soft hover:shadow-medium transition-shadow">
              <h3 className="text-xl font-semibold mb-4 text-card-foreground">Fluid Typography</h3>
              <div className="space-y-2">
                <p className="text-xs">Extra Small Text</p>
                <p className="text-sm">Small Text</p>
                <p className="text-base">Base Text</p>
                <p className="text-lg">Large Text</p>
                <p className="text-xl">Extra Large Text</p>
              </div>
            </div>

            {/* Shadows Demo */}
            <div className="p-6 rounded-xl bg-card border border-border shadow-soft hover:shadow-medium transition-shadow">
              <h3 className="text-xl font-semibold mb-4 text-card-foreground">Multi-step Shadows</h3>
              <div className="space-y-3">
                <div className="p-3 rounded bg-background shadow-xs">Extra Small</div>
                <div className="p-3 rounded bg-background shadow-sm">Small</div>
                <div className="p-3 rounded bg-background shadow-md">Medium</div>
                <div className="p-3 rounded bg-background shadow-lg">Large</div>
              </div>
            </div>
          </div>

          {/* Glow Effects Demo */}
          <div className="mt-16 text-center">
            <h2 className="text-4xl font-bold mb-8">Glow Effects</h2>
            <div className="flex justify-center gap-8">
              <div className="p-6 rounded-xl bg-accent-500 text-accent-foreground shadow-glow hover:shadow-glow-lg transition-shadow">
                Accent Glow
              </div>
              <div className="p-6 rounded-xl bg-primary-500 text-primary-foreground shadow-soft hover:shadow-medium transition-shadow">
                Primary Card
              </div>
            </div>
          </div>

          {/* Original Next.js content */}
          <div className="mt-16 pt-16 border-t border-border">
            <div className="text-center">
              <Image
                className="dark:invert mx-auto mb-8"
                src="/next.svg"
                alt="Next.js logo"
                width={180}
                height={38}
                priority
              />
              <p className="text-muted-foreground">
                Get started by editing <code className="bg-muted px-2 py-1 rounded text-sm font-mono">src/app/page.tsx</code>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="container mx-auto px-4 py-8">
          <div className="flex gap-6 items-center justify-center flex-wrap">
            <a
              className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-muted-foreground hover:text-foreground transition-colors"
              href="https://nextjs.org/learn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                aria-hidden
                src="/file.svg"
                alt="File icon"
                width={16}
                height={16}
              />
              Learn
            </a>
            <a
              className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-muted-foreground hover:text-foreground transition-colors"
              href="https://vercel.com/templates"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                aria-hidden
                src="/window.svg"
                alt="Window icon"
                width={16}
                height={16}
              />
              Examples
            </a>
            <a
              className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-muted-foreground hover:text-foreground transition-colors"
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                aria-hidden
                src="/globe.svg"
                alt="Globe icon"
                width={16}
                height={16}
              />
              Go to nextjs.org →
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
