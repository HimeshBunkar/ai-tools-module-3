import { Shell } from '@/components/ui/shell';
import { AuthGuard } from '@/components/auth-guard';

export default function DashboardPage() {
  return (
    <AuthGuard>
      <Shell 
        title="Dashboard" 
        description="Welcome back."
      >
        <div className="mt-4">
          {/* Blank canvas for your application integration */}
        </div>
      </Shell>
    </AuthGuard>
  );
}
