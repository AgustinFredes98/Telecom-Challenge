import React, { useEffect } from "react";
import { useRef } from "react";
import { Animated, StyleSheet, Text } from "react-native";

/**
 * @name Loader
 * @description A component that renders when the page has no data to show yet
 * @returns Node
 */
const Loader = () => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;
  const animation = {
    scale: Animated.loop(
      Animated.timing(
        scaleAnim, {
          toValue: 1.5,
          duration: 2000,
          useNativeDriver: true,
        }
      )),
    opacity: Animated.loop(
      Animated.timing(
        opacityAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }
      ))
    }
  useEffect(() => {
    animation.opacity.start();
    animation.scale.start();
  }, [])
  return (
    <Animated.View style={[styles.loaderContainer, {transform: [ { scale: scaleAnim } ], opacity: opacityAnim}]}>
      <Text style={styles.loaderText}>
        Cargando...
      </Text>
    </Animated.View>
  )
}

export const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  loaderText: {
    fontSize: 40,
    color: "black"
  },
})

Loader.displayName = "loader"

export default Loader