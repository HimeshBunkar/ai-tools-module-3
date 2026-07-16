import { Shell } from '@/components/ui/shell';
import { AuthGuard } from '@/components/auth-guard';
import { HistoryClient } from '@/components/history-client';

export default function HistoryPage() {
  return (
    <AuthGuard>
      <Shell title="History" description="A timeline of your recent activity." actions={null}>
        <HistoryClient />
      </Shell>
    </AuthGuard>
  );
}
