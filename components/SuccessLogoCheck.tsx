import React from 'react';
import { View, Text, StyleSheet, Animated, Easing, TouchableOpacity } from 'react-native';
import { Svg, Path, Circle } from 'react-native-svg';

const SuccessLogoCheck = ({ message = "Successfully Created Bet" ,   replaceScreen = () => {} }) => {
  // Create an animated value for the check mark animation
  const checkmarkAnimation = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    // Start the animation when the component mounts
    Animated.timing(checkmarkAnimation, {
      toValue: 1,
      duration: 800,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, []);

  // Interpolate the animation value for the path drawing effect
  const checkmarkPath = checkmarkAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  // Interpolate for scaling animation
  const scale = checkmarkAnimation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.8, 1.1, 1],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.iconContainer, { transform: [{ scale }] }]}>
        {/* Green circle background */}
        <Svg width="120" height="120" viewBox="0 0 120 120">
          <Circle cx="60" cy="60" r="55" fill="#4CAF50" />
          
          {/* White checkmark */}
          <AnimatedPath
            d="M30 60 L50 80 L90 40"
            strokeWidth="8"
            stroke="white"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            strokeDasharray="120"
            strokeDashoffset={checkmarkPath.interpolate({
              inputRange: [0, 1],
              outputRange: [120, 0],
            })}
          />
        </Svg>
      </Animated.View>
      
      <Text style={styles.message}>{message}</Text>


            <TouchableOpacity style={styles.homeScreenButton} onPress={replaceScreen}>
              <Text style={styles.homeScreenText}>Go to HomeScreen</Text>
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
    fontSize: 20,
    color: '#333',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  homeScreenButton: {
    backgroundColor: '#F44336',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  homeScreenText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  }
});

export default SuccessLogoCheck;