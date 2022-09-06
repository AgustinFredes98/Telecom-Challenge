import React, { useState } from "react"
import { View, Alert, SafeAreaView, ScrollView } from "react-native"
import Prompt from "../../molecules/Prompt";
import PlaceEntry from "../../organisms/PlaceEntry"
import AddPlaceButton from "../../atoms/AddPlaceButton";
import { styles } from "./styles"
import { useLocalStorage } from "../../../customHooks";

const api_key = "6c5dcdad7c41b67f6b171ea0ea2bbfc9"

const CityListWrapper = () => {
  const [promptType, setPromptType] = useState(false)
  const {listOfPlaces, removeStoreData, addStoreData} = useLocalStorage()

  return (
    <SafeAreaView style={styles.cityListContainer}>
      <ScrollView style={{flex:1}}>
        {
          
          listOfPlaces.map((entry) => {
            return <PlaceEntry key={entry} removeStoreData={removeStoreData} place={entry}/>
          })
        }
      </ScrollView>
      <Prompt
          visible={promptType}
          title="Cual es el nombre de la ciudad?"
          onCancel={() =>
            {
              setPromptType(false)
            }
          }
          onSubmit={text =>
            {
              fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${text}&appid=${api_key}&lang=es`)
              .then((res) => res.json())
              .then((data) => {
                if(data.length !== 0) {
                  if (listOfPlaces.indexOf(`${data[0].name}, ${data[0].state}, ${data[0].country}`) === -1) {
                    addStoreData(`${data[0]?.name ?? "Desconocido"}, ${data[0]?.state ?? data[0]?.name ?? "Desconocido"}, ${data[0]?.country ?? "Desconocido"}`)
                  } else {
                    Alert.alert("Lugar repetido", "El lugar ya existe en la lista")
                  }
                } else {
                  Alert.alert("Lugar inexistente", "El no fue encontrado en al base de datos")
                }
                setPromptType(false)
              })
              .catch((err) => console.error(err))
            }
          }
          submitText="Aceptar"
          cancelText="Cancelar"
        />
        <AddPlaceButton onClickCallback={() => {
              setPromptType(true)
            }} />
    </SafeAreaView>
  )
}



export default CityListWrapper;