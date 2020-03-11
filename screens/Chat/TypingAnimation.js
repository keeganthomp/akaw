import React, { useState } from 'react';
import {
  Animated,
  View,
  Platform,
  Easing,
} from 'react-native';

const UpAndDown = ({
  easing = Easing.ease,
  delay,
  transformation,
  children,
}) => {
  const [base] = useState(new Animated.Value(0));
  React.useEffect(() => {
    const anim = Animated.sequence([
      Animated.delay(delay),
      Animated.loop(
        Animated.timing(base, {
          toValue: 1,
          duration: 987,
          easing,
          useNativeDriver: Platform.OS !== 'web',
        })
      ),
    ]);
    anim.start();
    return () => anim.stop();
  }, []);
  const translateY = base.interpolate({
    inputRange: [0, 0.45, 0.55, 1],
    outputRange: [5, -5, -5, 5],
  });
  const translateX = base.interpolate({
    inputRange: [0, 0.45, 0.55, 1],
    outputRange: [-3, 0, 0, -3],
  });
  const scale = base.interpolate({
    inputRange: [0, 0.45, 0.55, 1],
    outputRange: [1, 0.6, 0.6, 1],
  });
  const opacity = base.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.6, 1, 0.6],
  });
  const transform = [];
  let opacityAnim = false;
  const trsf = (Array.isArray(transformation)
    ? transformation
    : [transformation]
  ).forEach(trsf => {
    switch (trsf) {
      case 'translateY':
        transform.push({ translateY });
        break;
      case 'scale':
        transform.push({ scale });
        break;
      case 'translateX':
        transform.push({ translateX });
        break;
      case 'opacity':
        opacityAnim = true;
        break;
      default:
        transform.push({ translateY });
    }
  });
  return (
    <Animated.View
      style={[
        {
          justifyContent: 'center',
          alignItems: 'center',
          width: 12,
          transform,
        },
        opacityAnim ? { opacity } : undefined,
      ]}>
      {children}
    </Animated.View>
  );
};

const dotSize = 10;
const dotColor = 'rgba(0, 0, 0, 0.38)';
const Dot = ({ color, size }) => (
  <View
    style={{
      width: size,
      height: size,
      borderRadius: (size || 0) / 2,
      backgroundColor: color,
    }}
  />
);
Dot.defaultProps = {
  color: dotColor,
  size: dotSize,
};

const Container = (props) => (
  <View
    style={{
      width: 55,
      height: 28,
      alignItems: 'center',
      justifyContent: 'center',
						borderRadius: 13,
						margin: 4,
      backgroundColor: '#f0f0f0',
    }}
    {...props}
  />
);

const ContainerContent = (props) => (
  <View
    style={{
      flexDirection: 'row',
    }}
    {...props}
  />
);

const renderDot = (props) => <Dot {...props} />


const Typing = ({
  transformation,
  dotProps,
  containerContentProps,
  containerProps,
}) => (
  <Container {...containerProps}>
    <ContainerContent {...containerContentProps}>
      {[0, 329, 658].map((delay) => (
        <UpAndDown key={delay} {...{ transformation, delay }}>
          {renderDot(dotProps)}
        </UpAndDown>
      ))}
    </ContainerContent>
  </Container>
);

export default Typing
