"use client";

import { Activity } from "lucide-react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Panel — Branding */}
      <div className="hidden lg:flex flex-col justify-between w-[480px] bg-primary p-10 relative overflow-hidden flex-shrink-0">
        {/* Background circles */}
        <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-white/5" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-white/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-white/5" />

        {/* Logo */}
        <div className="relative flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-white font-bold text-lg leading-tight">HMS Portal</p>
            <p className="text-blue-200 text-xs">Smart Hospital System</p>
          </div>
        </div>

        {/* Center content */}
        <div className="relative space-y-6">
          <h2 className="text-4xl font-bold text-white leading-tight">
            Modern Healthcare
            <br />
            Management
          </h2>
          <p className="text-blue-200 text-base leading-relaxed">
            Streamline your hospital operations, manage patients, track appointments and empower your medical team — all from one place.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: "1,248", label: "Active Patients" },
              { value: "86", label: "Doctors" },
              { value: "324", label: "Appointments/mo" },
              { value: "99.9%", label: "System Uptime" },
            ].map((s) => (
              <div key={s.label} className="bg-white/10 rounded-2xl p-4">
                <p className="text-2xl font-bold text-white">{s.value}</p>
                <p className="text-blue-200 text-xs mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <p className="relative text-blue-300 text-xs">
          © 2024 HMS Portal. All rights reserved.
        </p>
      </div>

      {/* Right Panel — Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-md animate-fade-in text-center">
          {/* Mobile logo */}
          <div className="flex items-center justify-center gap-3 mb-8 lg:hidden">
            <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <p className="text-foreground font-bold text-lg">HMS Portal</p>
          </div>

          <h1 className="text-3xl font-bold text-foreground mb-3">Welcome back</h1>
          <p className="text-muted-foreground text-sm mb-10">Sign in to your account to continue</p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              signIn("credentials", {
                username: formData.get("username"),
                password: formData.get("password"),
                callbackUrl: "/dashboard",
              });
            }}
            className="space-y-4"
          >
            <div>
              <input
                name="username"
                type="text"
                placeholder="Username"
                required
                className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>
            <div>
              <input
                name="password"
                type="password"
                placeholder="Password"
                required
                className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>

            <button
              id="login-btn"
              type="submit"
              className="w-full h-14 mt-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl text-base font-semibold transition-all duration-200 flex items-center justify-center gap-3 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0"
            >
              Sign In
            </button>
          </form>

          <div className="mt-8 flex flex-col items-center gap-2 text-xs text-muted-foreground">
            <p>Test Accounts:</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <span className="bg-secondary px-3 py-1.5 rounded-lg border border-border">admin / Admin123!</span>
              <span className="bg-secondary px-3 py-1.5 rounded-lg border border-border">dr.chen / Doctor123!</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
