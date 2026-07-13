'use client';

import { useEffect } from 'react';
import { trackBlogRead } from '@/lib/analytics';

interface BlogTrackerProps {
  title: string;
}

export default function BlogTracker({ title }: BlogTrackerProps) {
  useEffect(() => {
    trackBlogRead(title);
  }, [title]);

  return null;
}
