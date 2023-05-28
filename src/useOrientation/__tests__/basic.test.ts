import { renderHook } from '@testing-library/react-hooks';
import { Dimensions, ScaledSize } from 'react-native';
import { useOrientation } from './../';

jest.mock('react-native', () => ({
  Dimensions: {
    get: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  },
}));

describe('useOrientation', () => {
  let eventListenerSubscription: { remove: jest.Mock<any, any> };

  beforeEach(() => {
    jest.clearAllMocks();
    eventListenerSubscription = { remove: jest.fn() };
    (Dimensions.addEventListener as jest.MockedFunction<any>).mockReturnValue(eventListenerSubscription);
  });

  afterEach(() => {
    expect(eventListenerSubscription.remove).toHaveBeenCalled();
  });

  test('should return correct initial orientation', () => {
    const initialScreen: ScaledSize = {
      width: 500,
      height: 800,
      scale: 2,
      fontScale: 2,
    };
    (Dimensions.get as jest.MockedFunction<any>).mockReturnValue({ screen: initialScreen });

    const { result, unmount } = renderHook(() => useOrientation());

    expect(result.current).toBe('portrait');
    unmount();
  });

  test('should update orientation on screen dimension change', () => {
    const initialScreen: ScaledSize = {
      width: 500,
      height: 800,
      scale: 2,
      fontScale: 2,
    };
    (Dimensions.get as jest.MockedFunction<any>).mockReturnValue({ screen: initialScreen });

    const { result, unmount } = renderHook(() => useOrientation());

    expect(result.current).toBe('portrait');

    const updatedScreen: ScaledSize = {
      width: 1000,
      height: 800,
      scale: 2,
      fontScale: 2,
    };
    const handleOrientationChange = (Dimensions.addEventListener as jest.MockedFunction<any>).mock.calls[0][1];

    (Dimensions.get as jest.MockedFunction<any>).mockReturnValue({ screen: updatedScreen });
    handleOrientationChange({ window: updatedScreen, screen: updatedScreen });

    expect(result.current).toBe('landscape');
    unmount();
  });

  test('should remove event listener on unmount', () => {
    const { unmount } = renderHook(() => useOrientation());

    expect(eventListenerSubscription.remove).not.toHaveBeenCalled();

    unmount();

    expect(eventListenerSubscription.remove).toHaveBeenCalled();
  });
});
