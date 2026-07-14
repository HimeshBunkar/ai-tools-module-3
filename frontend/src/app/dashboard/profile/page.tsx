import { Shell } from '@/components/ui/shell';
import { AuthGuard } from '@/components/auth-guard';
import { ProfileClient } from '@/components/profile-client';

export default function ProfilePage() {
  return (
    <AuthGuard>
      <Shell 
        title="Profile" 
        description="Manage your display name and public identity."
      >
        <div className="mt-4">
          <ProfileClient />
        </div>
      </Shell>
    </AuthGuard>
  );
}
