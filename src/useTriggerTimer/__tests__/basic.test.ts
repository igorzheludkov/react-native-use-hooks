import { renderHook, act } from '@testing-library/react-hooks';
import { useTriggerTimer } from './..';

jest.useFakeTimers();

describe('useTriggerTimer', () => {
  beforeEach(() => {
    jest.clearAllTimers();
  });

  test('initial status should be false', () => {
    const { result } = renderHook(() => useTriggerTimer());
    const [status] = result.current;

    expect(status).toBe(false);
  });

  test('trigger should set status to true', () => {
    const { result } = renderHook(() => useTriggerTimer(1000));
    const [, trigger] = result.current;

    act(() => {
      trigger();
    });

    const [status] = result.current;
    expect(status).toBe(true);
  });

  test('status should be false after the specified time', () => {
    const { result } = renderHook(() => useTriggerTimer(1000));
    const [, trigger] = result.current;

    act(() => {
      trigger();
    });

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    const [status] = result.current;
    expect(status).toBe(false);
  });

  test('status should remain false if time is not specified', () => {
    const { result } = renderHook(() => useTriggerTimer());
    const [, trigger] = result.current;

    act(() => {
      trigger();
    });

    const [status] = result.current;
    expect(status).toBe(false);
  });
});
