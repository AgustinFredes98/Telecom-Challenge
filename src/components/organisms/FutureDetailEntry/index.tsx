import React from "react"
import { View, Text, Image } from "react-native"
import { useFetchIcon } from "../../../customHooks"
import { styles } from "./styles"

/**
 * @name FutureDetailEntry
 * @param {object} props entire props object 
 * @param {object} props.day entire day weather data 
 * @description Individual day entry on futureDetails page
 * @returns Node
 */
export const FutureDetailEntry = ({day}) => {
  const currentIcon = useFetchIcon(day?.weather[0]?.icon ?? "")
  const currenthumidity = `Humedad ${Math.round(day?.main?.humidity)}%`
  const currentDescription = `${day?.weather[0]?.description?.charAt(0).toUpperCase() + day?.weather[0]?.description.slice(1)}`
  const currentTemperature = `Temperatura: ${Math.round(day?.main?.temp -273.15)}°`

  return (
    <View style={styles.futureDetailContainer}>
      <Text>
        {day.dt_txt.split(" ")[0]}
      </Text>
      <Text>
        {currentDescription}
      </Text>
      <Text>
        {currenthumidity}
      </Text>
      <Text>
        {currentTemperature}
      </Text>
      {
        currentIcon && <Image style={styles.currentSummaryIcon} source={{ uri: currentIcon }}/>
      }
    </View>
  )
}

FutureDetailEntry.displayName = "FutureDetailsEntry"