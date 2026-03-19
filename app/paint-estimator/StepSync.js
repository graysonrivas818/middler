'use client';

import { changePaintEstimator } from '@/app/_redux/features/navigationSlice';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

// ⬅ This component only syncs ?step=X → redux; it renders nothing
export default function StepSync() {
  const params = useSearchParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const step = params.get('step');
    if (step) dispatch(changePaintEstimator(step));
  }, [params, dispatch]);

  return null;
}
