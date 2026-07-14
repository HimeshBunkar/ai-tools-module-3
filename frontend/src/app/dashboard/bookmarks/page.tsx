import { Shell } from '@/components/ui/shell';
import { AuthGuard } from '@/components/auth-guard';
import { BookmarksClient } from '@/components/bookmarks-client';

export default function BookmarksPage() {
  return (
    <AuthGuard>
      <Shell title="Bookmarks" description="Organize important links in one place.">
        <BookmarksClient />
      </Shell>
    </AuthGuard>
  );
}
