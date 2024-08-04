
import dynamic from 'next/dynamic';

const LoadingComponent = dynamic(() => import('@/components/payment/Loading'), {ssr: false})
export default function LoadingPage() {
  return (
    <div>
      <LoadingComponent />
    </div>
  );
}
