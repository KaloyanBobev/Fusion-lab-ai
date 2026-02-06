import { Progress } from '@/components/ui/progress';
import React from 'react'

function UsageCreditProgress() {
  return (
    <div className='p-3 border rounded-2xl mb-5 flex flex-col gap-2'>
      <h2 className='font-bold tex-xl'>free Plan</h2>
      <p className='text-gray-400'>0/5 message Used</p>
      <Progress value={0} />
    </div>
  );
}

export default UsageCreditProgress