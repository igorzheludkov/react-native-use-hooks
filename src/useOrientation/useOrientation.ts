import { useEffect, useState } from 'react';
import { Dimensions, ScaledSize } from 'react-native';

type Orientation = 'portrait' | 'landscape';

const getOrientation = (window: ScaledSize): Orientation => {
  return window.width > window.height ? 'landscape' : 'portrait';
};

const useOrientation = (): Orientation => {
  const [orientation, setOrientation] = useState<Orientation>(getOrientation(Dimensions.get('window')));

  useEffect(() => {
    const handleOrientationChange = ({ window, screen }: { window: ScaledSize; screen: ScaledSize }) => {
      setOrientation(getOrientation(window));
    };

    const subscription = Dimensions.addEventListener('change', handleOrientationChange);

    return () => {
      subscription.remove();
    };
  }, []);

  return orientation;
};

export default useOrientation;
