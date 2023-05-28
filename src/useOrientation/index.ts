import { useEffect, useState } from 'react';
import { Dimensions, ScaledSize } from 'react-native';

export type Orientation = 'portrait' | 'landscape';

const getOrientation = (screen: ScaledSize): Orientation => {
  return screen.width > screen.height ? 'landscape' : 'portrait';
};

export function useOrientation(): Orientation {
  const [orientation, setOrientation] = useState<Orientation>(getOrientation(Dimensions.get('screen')));

  useEffect(() => {
    const handleOrientationChange = ({ screen }: { window: ScaledSize; screen: ScaledSize }) => {
      setOrientation(getOrientation(screen));
    };

    const subscription = Dimensions.addEventListener('change', handleOrientationChange);

    return () => {
      subscription.remove();
    };
  }, []);

  return orientation;
}
