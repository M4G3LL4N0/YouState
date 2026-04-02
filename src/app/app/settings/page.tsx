import { AppShell } from '@/components/app-shell';

export default function SettingsPage() {
  return (
    <AppShell>
      <div className="max-w-3xl mx-auto space-y-8">
        <header className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-zinc-400">
            Manage your Pulse preferences and integrations
          </p>
        </header>

        <section className="space-y-6">
          <SettingsSection title="Notifications">
            <SettingsToggle label="Email notifications" name="email" />
            <SettingsToggle label="Push notifications" name="push" />
            <SettingsToggle label="SMS alerts" name="sms" />
          </SettingsSection>

          <SettingsSection title="Integrations">
            <SettingsToggle label="Apple Health" name="appleHealth" />
            <SettingsToggle label="Google Fit" name="googleFit" />
            <SettingsToggle label="Wearables" name="wearables" />
          </SettingsSection>
        </section>
      </div>
    </AppShell>
  );
}

function SettingsSection({ title, children }: { 
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="glass p-6 rounded-xl border border-zinc-800">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="space-y-3">
        {children}
      </div>
    </div>
  );
}

function SettingsToggle({ label, name }: { 
  label: string;
  name: string;
}) {
  return (
    <label className="flex items-center justify-between">
      <span>{label}</span>
      <input 
        type="checkbox"
        name={name}
        className="sr-only peer"
      />
      <div className="w-10 h-6 bg-zinc-800 rounded-full p-1 peer-checked:bg-blue-600 transition-colors">
        <div className="w-4 h-4 bg-zinc-50 rounded-full translate-x-0 peer-checked:translate-x-4 transition-transform" />
      </div>
    </label>
  );
}
