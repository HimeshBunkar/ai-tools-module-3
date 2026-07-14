import { Shell } from '@/components/ui/shell';
import { AuthGuard } from '@/components/auth-guard';
import { SavedToolsClient } from '@/components/saved-tools-client';

export default function SavedToolsPage() {
  return (
    <AuthGuard>
      <Shell title="Saved Tools" description="Keep your favorite tools and workflows close at hand.">
        <SavedToolsClient />
      </Shell>
    </AuthGuard>
  );
}
