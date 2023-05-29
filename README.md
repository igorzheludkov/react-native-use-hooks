# React Native Use Hooks

...and some utility functions.

> This library is under development, use with caution. More useful hooks coming soon

## Import

    import { useOrientation } from  'react-native-use-hooks';

## useOrientation

It allows you to dynamically retrieve the current orientation of the device screen in a React Native application. Hook returns the string "**portrait**" or "**landscape**"

    const orientation = useOrientation();

**Example**

    <View>
      {orientation === 'landscape' ? (
    	<Text>This content is displayed only in landscape orientation.</Text>
      ) : (
        <Text>This content is displayed in portrait orientation.</Text>
      )}
    </View>

## getScaledSize function

The `getScaledSize` function is a utility function that calculates and returns a scaled size for a given input size in a React Native application. It takes into account the screen dimensions and pixel density of the device to ensure consistent sizing across different screens.

**Basic usage**

    const scale = getScaledSize();

**And then use it in code or stylesheets**

    <Text style={{ fontSize: scale(20) }}>
      This text will have a scaled font size of 20 units.
    </Text>

**Advanced usage**

    const scale = getScaledSize({size: 20, factor: 0.5, baseWidth: 400});

In this example, the `getScaledSize` function is called with specific options provided as an argument. However, if the options parameter is not provided, the function will still work and use the default values for size, factor, and baseWidth.

- `size: 20`: This option sets the base font size to 20 units. It represents the size that will be scaled based on the device's screen dimensions and pixel density.
- `factor: 0.5`: This option determines the scaling factor that will be applied to the base size. In this case, a factor of 0.5 is provided, indicating that the scaled size will be reduced by 50% of the difference between the base size and the calculated size based on the screen dimensions.
- `baseWidth: 400`: This option specifies the base width against which the screen dimensions will be compared. It determines the reference width for the scaling calculation.

## useTriggerTimer hook

This hook allows you to set a timer and trigger its execution. It returns a tuple containing a boolean value representing the current status of the timer and a function to trigger the timer.

If no time value is provided, the timer functionality will not be triggered. Instead, the `status` value will always be `false`, indicating that the timer is inactive.

This hook can be very suitable for displaying tooltips and toasts

**Usage**

	const [status, trigger] = useTriggerTimer(5000);

	return (
	 <>
	   <button onClick={trigger}>Trigger Timer</button>
	   {status ? <p>Timer is active.</p> : <p>Timer is inactive.</p>}
	 </>
	)