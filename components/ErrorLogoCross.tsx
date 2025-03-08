import React from 'react';
import { View, Text, StyleSheet, Animated, Easing, TouchableOpacity } from 'react-native';
import { Svg, Path, Circle } from 'react-native-svg';

const ErrorLogoCross = ({ 
  message = "Error while creating bet\nTry again later",
  onRetry = () => {}
}) => {
  // Create animated values for the cross animation
  const crossAnimation = React.useRef(new Animated.Value(0)).current;
  const crossAnimation2 = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    // Animate the first line of the cross
    Animated.timing(crossAnimation, {
      toValue: 1,
      duration: 600,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
    
    // Animate the second line of the cross with a slight delay
    Animated.sequence([
      Animated.delay(200),
      Animated.timing(crossAnimation2, {
        toValue: 1,
        duration: 600,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  // Interpolate for scaling animation
  const scale = crossAnimation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.8, 1.1, 1],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.iconContainer, { transform: [{ scale }] }]}>
        {/* Red circle background */}
        <Svg width="120" height="120" viewBox="0 0 120 120">
          <Circle cx="60" cy="60" r="55" fill="#F44336" />
          
          {/* White cross - first line (top-left to bottom-right) */}
          <AnimatedPath
            d="M35 35 L85 85"
            strokeWidth="8"
            stroke="white"
            strokeLinecap="round"
            fill="none"
            strokeDasharray="100"
            strokeDashoffset={crossAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [100, 0],
            })}
          />
          
          {/* White cross - second line (top-right to bottom-left) */}
          <AnimatedPath
            d="M85 35 L35 85"
            strokeWidth="8"
            stroke="white"
            strokeLinecap="round"
            fill="none"
            strokeDasharray="100"
            strokeDashoffset={crossAnimation2.interpolate({
              inputRange: [0, 1],
              outputRange: [100, 0],
            })}
          />
        </Svg>
      </Animated.View>
      
      <Text style={styles.message}>{message}</Text>
      
      <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
        <Text style={styles.retryText}>Try Again Later</Text>
      </TouchableOpacity>
    </View>
  );
};

// Create an animated SVG path component
const AnimatedPath = Animated.createAnimatedComponent(Path);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  iconContainer: {
    marginBottom: 30,
  },
  message: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
  },
  retryButton: {
    backgroundColor: '#F44336',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  retryText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  }
});

export default ErrorLogoCross;