import {PixelRatio, Dimensions} from 'react-native';

interface ScaledSizeOptions {
  size?: number;
  factor?: number;
  baseWidth?: number;
}

export function getScaledSize({
  size,
  factor = 1,
  baseWidth = 375,
}: ScaledSizeOptions = {}) {
  const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
  const baseSize = size || 16;
  const baseHeight = 660;

  const scaleWidth = screenWidth / baseWidth;
  const scaleHeight = screenHeight / baseHeight;
  const scaleBase = Math.min(scaleWidth, scaleHeight);

  let convert = scaleBase * baseSize;
  const diff = convert - baseSize;

  function calculate(s: number) {
    let result;
    if (factor) {
      result = s + diff * factor;
    } else if (factor === 0) {
      result = s;
    } else {
      result = s + diff;
    }
    return result;
  }

  return (inputSize: number = baseSize) => {
    const scaledSize = PixelRatio.roundToNearestPixel(calculate(inputSize));
    return scaledSize;
  };
}
