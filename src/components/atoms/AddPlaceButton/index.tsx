import React from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { styles } from "./styles"

/**
 * @name AddPlaceButton
 * @param {object} props
 * @param {function} props.onClickCallback callback called when the button is pressed
 * @description A button that takes a callback but is configured just for add a place
 * @returns Node
 */
const AddPlaceButton = ({onClickCallback}) => {
  return (
    <View style={styles.addButtonContainer}>
      <TouchableOpacity onPress={onClickCallback} style={styles.addButton}>
        <Text style={styles.addButtonText}>
          Añadir Lugar
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default AddPlaceButton