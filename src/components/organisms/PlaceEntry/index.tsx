import React, { useReducer } from "react"
import { View, Text, TouchableOpacity, StyleSheet, AsyncStorage } from "react-native"
import { Link } from "react-router-native"
import { styles } from "./styles"

/**
 * @name FutureDetailEntry
 * @param {object} props entire props object 
 * @param {object} props.place entire day weather data 
 * @param {object} props.removeStoreData callback called when remove Button is pressed
 * @description Individual day entry on futureDetails page
 * @returns Node
 */
const PlaceEntry = ({place, removeStoreData}) => {
  const placeFormattedName = place.split(" ").map((item) => {
    return item.charAt(0).toUpperCase() + item.slice(1)
  }).join(" ")
  const removePlace = async () => {
    removeStoreData(place)
  }
  return (
    <Link style={styles.actualCityInfoContainer} to={`/5days:${place}`}>
      <View style={{flexDirection: "row", justifyContent:"space-between"}}>
        <Text style={styles.actualCityInfoText}>
            Pronostico a 5 dias en {placeFormattedName}
        </Text>
        <TouchableOpacity onPress={removePlace} style={styles.cityRemoveButton} >
          <Text style={{fontSize: 25}}>
            X
          </Text>
        </TouchableOpacity>
      </View>
    </Link>
  )
}

PlaceEntry.displayName = "PlaceEntry"

export default PlaceEntry