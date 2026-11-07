import { Home, Search } from 'lucide-react';
import { PillButton } from '../components/ui/PillButton';
import { Backpacker } from '../components/illustrations/Characters';

export default function NotFound() {
  return (
    <div className="container-x flex min-h-[80vh] flex-col items-center justify-center pb-20 pt-[calc(var(--nav-h)+3rem)] text-center">
      <Backpacker className="w-44" />
      <h1 className="mt-6 text-display-sm font-semibold">This trail goes nowhere.</h1>
      <p className="mt-4 max-w-md text-lg text-ink/75">The page you were looking for does not exist. Head back to the start or go straight to the listings.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <PillButton to="/" icon={Home}>
          Back home
        </PillButton>
        <PillButton to="/scholarships" variant="white" icon={Search}>
          Browse scholarships
        </PillButton>
      </div>
    </div>
  );
}
