'use client';

import LoadingAnimations from '@/components/LoadingAnimations';

export default function DemoLoadingPage() {
  return (
    <div className="min-h-screen">
      <LoadingAnimations onComplete={() => {}} />
    </div>
  );
}
