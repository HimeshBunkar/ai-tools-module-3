export const runtime = 'edge';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { Shell } from '@/components/ui/shell';

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/auth/signin');
  }

  return (
    <Shell 
      title="Dashboard" 
      description="Welcome back."
    >
      <div className="mt-4">
        {/* Blank canvas for your application integration */}
      </div>
    </Shell>
  );
}

