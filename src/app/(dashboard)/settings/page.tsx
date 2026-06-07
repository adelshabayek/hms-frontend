"use client";

import { useState } from "react";
import { User, Bell, Shield, Palette, Globe, Save, Moon, Sun } from "lucide-react";

const sections = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "system", label: "System", icon: Globe },
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("profile");
  const [darkMode, setDarkMode] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Settings</h2>
          <p className="text-muted-foreground text-sm mt-0.5">Manage your account and system preferences</p>
        </div>
        <button
          id="settings-save-btn"
          onClick={handleSave}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            saved
              ? "bg-accent text-white shadow-lg shadow-accent/25"
              : "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25"
          } active:scale-95`}
        >
          <Save className="w-4 h-4" />
          {saved ? "Saved!" : "Save Changes"}
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar Nav */}
        <div className="md:w-52 flex-shrink-0">
          <nav className="bg-card border border-border rounded-2xl p-2 space-y-1">
            {sections.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                id={`settings-tab-${id}`}
                onClick={() => setActiveSection(id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  activeSection === id
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                {label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 bg-card border border-border rounded-2xl p-6">
          {activeSection === "profile" && (
            <div className="space-y-5 animate-fade-in">
              <h3 className="text-base font-semibold text-foreground border-b border-border pb-3">Profile Information</h3>

              {/* Avatar */}
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-2xl bg-primary/20 flex items-center justify-center text-2xl font-bold text-primary">
                  AD
                </div>
                <div>
                  <button className="px-3 py-1.5 bg-primary/10 text-primary rounded-xl text-xs font-medium hover:bg-primary/20 transition-colors">
                    Change Photo
                  </button>
                  <p className="text-xs text-muted-foreground mt-1">JPG, GIF or PNG. 1MB max.</p>
                </div>
              </div>

              {/* Form */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "First Name", placeholder: "Admin", id: "profile-firstname" },
                  { label: "Last Name", placeholder: "User", id: "profile-lastname" },
                  { label: "Email", placeholder: "admin@hospital.com", id: "profile-email" },
                  { label: "Phone", placeholder: "+1 (555) 000-0000", id: "profile-phone" },
                ].map(({ label, placeholder, id }) => (
                  <div key={id}>
                    <label className="block text-xs font-medium text-muted-foreground mb-1">{label}</label>
                    <input
                      id={id}
                      type="text"
                      defaultValue={placeholder}
                      className="w-full px-3 py-2 bg-secondary border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                  </div>
                ))}
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">Role</label>
                <input
                  id="profile-role"
                  type="text"
                  defaultValue="System Administrator"
                  className="w-full px-3 py-2 bg-secondary border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>
            </div>
          )}

          {activeSection === "notifications" && (
            <div className="space-y-5 animate-fade-in">
              <h3 className="text-base font-semibold text-foreground border-b border-border pb-3">Notification Preferences</h3>
              <div className="space-y-3">
                {[
                  { label: "New Patient Admitted", desc: "Get notified when a new patient is added", id: "notif-patient" },
                  { label: "Appointment Reminders", desc: "Receive reminders 30 minutes before appointments", id: "notif-appt" },
                  { label: "Critical Patient Alerts", desc: "Urgent alerts for critical status changes", id: "notif-critical" },
                  { label: "Doctor Availability", desc: "Notify when doctors change availability", id: "notif-doctor" },
                  { label: "System Updates", desc: "Maintenance windows and system news", id: "notif-system" },
                ].map(({ label, desc, id }, i) => (
                  <div key={id} className="flex items-center justify-between p-4 bg-secondary/40 rounded-xl">
                    <div>
                      <p className="text-sm font-medium text-foreground">{label}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        id={id}
                        type="checkbox"
                        defaultChecked={i < 3}
                        className="sr-only peer"
                      />
                      <div className="w-10 h-5 bg-border peer-checked:bg-primary rounded-full transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5" />
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === "security" && (
            <div className="space-y-5 animate-fade-in">
              <h3 className="text-base font-semibold text-foreground border-b border-border pb-3">Security Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">Current Password</label>
                  <input id="sec-current-pw" type="password" placeholder="••••••••" className="w-full px-3 py-2 bg-secondary border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">New Password</label>
                  <input id="sec-new-pw" type="password" placeholder="••••••••" className="w-full px-3 py-2 bg-secondary border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">Confirm Password</label>
                  <input id="sec-confirm-pw" type="password" placeholder="••••••••" className="w-full px-3 py-2 bg-secondary border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" />
                </div>

                <div className="p-4 bg-destructive/5 border border-destructive/20 rounded-xl">
                  <p className="text-sm font-semibold text-destructive mb-1">Two-Factor Authentication</p>
                  <p className="text-xs text-muted-foreground mb-3">Add an extra layer of security to your account.</p>
                  <button id="sec-2fa-btn" className="px-3 py-1.5 bg-destructive/10 text-destructive rounded-lg text-xs font-medium hover:bg-destructive/20 transition-colors">
                    Enable 2FA
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeSection === "appearance" && (
            <div className="space-y-5 animate-fade-in">
              <h3 className="text-base font-semibold text-foreground border-b border-border pb-3">Appearance</h3>
              {/* Dark mode toggle */}
              <div className="p-4 bg-secondary/40 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {darkMode ? <Moon className="w-5 h-5 text-primary" /> : <Sun className="w-5 h-5 text-yellow-500" />}
                  <div>
                    <p className="text-sm font-medium text-foreground">Dark Mode</p>
                    <p className="text-xs text-muted-foreground">Currently {darkMode ? "enabled" : "disabled"}</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input id="appearance-darkmode" type="checkbox" checked={darkMode} onChange={(e) => setDarkMode(e.target.checked)} className="sr-only peer" />
                  <div className="w-10 h-5 bg-border peer-checked:bg-primary rounded-full transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5" />
                </label>
              </div>

              <div>
                <p className="text-sm font-medium text-foreground mb-3">Accent Color</p>
                <div className="flex gap-3">
                  {[
                    { name: "Blue", color: "hsl(210,100%,40%)" },
                    { name: "Green", color: "hsl(155,70%,45%)" },
                    { name: "Purple", color: "hsl(270,70%,60%)" },
                    { name: "Red", color: "hsl(0,84%,60%)" },
                    { name: "Orange", color: "hsl(38,95%,55%)" },
                  ].map(({ name, color }) => (
                    <button
                      key={name}
                      id={`appearance-color-${name.toLowerCase()}`}
                      title={name}
                      className="w-9 h-9 rounded-xl hover:scale-110 transition-transform shadow-sm border-2 border-transparent hover:border-white"
                      style={{ background: color }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSection === "system" && (
            <div className="space-y-5 animate-fade-in">
              <h3 className="text-base font-semibold text-foreground border-b border-border pb-3">System Information</h3>
              <div className="space-y-3">
                {[
                  { label: "Hospital Name", value: "City General Hospital" },
                  { label: "System Version", value: "HMS v2.4.1" },
                  { label: "Database Status", value: "✅ Connected" },
                  { label: "Cache Status", value: "✅ Redis Active" },
                  { label: "Last Backup", value: "2024-06-06 02:00 AM" },
                  { label: "Environment", value: "Production" },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between p-3 bg-secondary/40 rounded-xl">
                    <p className="text-sm text-muted-foreground">{label}</p>
                    <p className="text-sm font-medium text-foreground">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
