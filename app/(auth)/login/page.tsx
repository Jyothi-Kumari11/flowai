"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Github, Zap, Loader2, Chrome } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleOAuth = async (provider: "google" | "github") => {
    setIsLoading(provider);
    try {
      await signIn(provider, { callbackUrl: "/dashboard" });
    } catch {
      toast({ title: "Error", description: "Authentication failed.", variant: "destructive" });
      setIsLoading(null);
    }
  };

  const handleCredentialsLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading("credentials");
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        toast({
          title: "Sign In Failed",
          description: "Invalid email or password.",
          variant: "destructive",
        });
        setIsLoading(null);
        return;
      }

      toast({
        title: "Welcome back!",
        description: "Redirecting to dashboard...",
      });

      router.push("/dashboard");
      router.refresh();
    } catch {
      toast({
        title: "Error",
        description: "Something went wrong during sign in.",
        variant: "destructive",
      });
      setIsLoading(null);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-700 p-12 flex-col justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-white">FlowAI</span>
        </div>
        <div>
          <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
            Manage projects with the power of AI
          </h2>
          <div className="space-y-4">
            {[
              "AI-powered task prioritization",
              "Real-time team collaboration",
              "Smart project insights & analytics",
              "Automated workflows & suggestions",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-white text-xs">✓</div>
                <span className="text-purple-100">{item}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="text-purple-300 text-sm">
          Trusted by 10,000+ teams worldwide
        </p>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <div className="mb-8 lg:hidden flex items-center gap-2 justify-center">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              FlowAI
            </span>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome back</h1>
          <p className="text-gray-500 mb-8">Sign in to your account to continue</p>

          {/* OAuth Buttons */}
          <div className="space-y-3 mb-6">
            <Button
              variant="outline"
              className="w-full h-11"
              onClick={() => handleOAuth("google")}
              disabled={!!isLoading}
            >
              {isLoading === "google" ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Chrome className="w-4 h-4 mr-2" />
              )}
              Continue with Google
            </Button>
            <Button
              variant="outline"
              className="w-full h-11"
              onClick={() => handleOAuth("github")}
              disabled={!!isLoading}
            >
              {isLoading === "github" ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Github className="w-4 h-4 mr-2" />
              )}
              Continue with GitHub
            </Button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-400">Or continue with email</span>
            </div>
          </div>

          {/* Email Form */}
          <form className="space-y-4" onSubmit={handleCredentialsLogin}>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="mt-1 h-11"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <Label htmlFor="password">Password</Label>
                <Link href="/forgot-password" className="text-xs text-purple-600 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="h-11"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button
              type="submit"
              disabled={!!isLoading}
              className="w-full h-11 bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:opacity-90"
            >
              {isLoading === "credentials" ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Don't have an account?{" "}
            <Link href="/register" className="text-purple-600 font-medium hover:underline">
              Sign up free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
