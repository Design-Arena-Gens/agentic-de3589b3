'use client';

import { PropsWithChildren } from 'react';
import CustomCursor from './CustomCursor';
import Loader from './Loader';
import { LenisProvider } from './LenisProvider';

export default function Providers({ children }: PropsWithChildren) {
  return (
    <LenisProvider>
      <Loader />
      <CustomCursor />
      {children}
    </LenisProvider>
  );
}
