import { SpineStory } from '../components/home/SpineStory';
import { Stats } from '../components/home/Stats';
import { PhotoTrust } from '../components/home/PhotoTrust';
import { Resources } from '../components/home/Resources';

export default function Home() {
  return (
    <>
      <SpineStory />
      <Stats />
      <PhotoTrust />
      <Resources />
    </>
  );
}
