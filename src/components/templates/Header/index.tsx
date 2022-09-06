import React, { useEffect, useState } from "react"
import { Text, View, StyleSheet, Image } from "react-native"
import { useFetchIcon } from "../../../customHooks"
import { useAppSelector } from "../../../redux/hooks"
import { header_props } from "../../../types"
import { Link } from "react-router-native"
import { styles } from "./styles"

/**
 * @name Header
 * @description Header that renders current location summary
 * @param {currentIconURL} String
 * @returns Node
 */
const Header = ({currentIconURL}:header_props) => {
  const currentIcon = useFetchIcon(currentIconURL)
  const store = useAppSelector(state => state)
  const currentPlace = `${store?.placeSlice?.current[store?.placeSlice?.localCurrentPlace]?.name}, ${store?.placeSlice?.current[store?.placeSlice?.localCurrentPlace]?.sys?.country}`
  const currentDescription = `${store?.placeSlice?.current[store?.placeSlice?.localCurrentPlace]?.weather[0].description.charAt(0).toUpperCase() + store?.placeSlice?.current[store?.placeSlice?.localCurrentPlace]?.weather[0].description.slice(1)}`
  const currentTemperature = `${Math.round(store?.placeSlice?.current[store?.placeSlice?.localCurrentPlace]?.main?.temp -273.15)}`
  return (
    <View style={styles.container}>
        <View>
          <Text style={styles.currentSummaryDescription}>
            {currentPlace}
          </Text>
          <Text style={styles.currentSummaryDescription}>
            {currentDescription}
          </Text>
          <Link to={`/5days:${currentPlace}`}>
            <Text>Ver más detalles locales</Text>
          </Link>
        </View>
        {currentIcon !== "" ? (
          <View style={styles.currentSummaryContainer}>
            <Image style={styles.currentSummaryIcon} source={{uri: "http://openweathermap.org/img/wn/01n@2x.png"}}/>
            <Text>{currentTemperature}°</Text>
          </View>
        ) : null}
    </View>
  )
}

Header.displayName = "Header"

export default Header