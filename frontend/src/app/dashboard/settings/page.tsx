import { Shell } from '@/components/ui/shell';
import { AuthGuard } from '@/components/auth-guard';
import { SettingsClient } from '@/components/settings-client';

export default function SettingsPage() {
  return (
    <AuthGuard>
      <Shell 
        title="Settings" 
        description="Manage your account profile and preferences."
      >
        <div className="mt-4">
          <SettingsClient />
        </div>
      </Shell>
    </AuthGuard>
  );
}
