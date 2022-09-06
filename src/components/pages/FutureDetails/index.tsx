import React from "react"
import { useBackHome, useGetinformationByQueryParams } from "../../../customHooks"
import { Text, View, SafeAreaView, ScrollView } from "react-native"
import { useAppSelector } from "../../../redux/hooks"
import Loader from "../../molecules/Loader"
import { getInformationParams } from "../../../types"
import { FutureDetailEntry } from "../../organisms/FutureDetailEntry"
import { styles } from "./styles"


const FutureDetails = () => {
  useBackHome()
  const informationParams:getInformationParams = {
    type: "5days"
  }
  const selectedName = useGetinformationByQueryParams(informationParams)
  const store = useAppSelector(state => state)
  return (
    <>
      {
        selectedName ? (
        <SafeAreaView>
          <ScrollView>
            <View style={styles.futureDetailsListContainer}>
              <View style={{ marginHorizontal: -10, marginBottom: 5, backgroundColor: "red",flex:1, justifyContent:"center", alignItems:"center", paddingVertical: 20, borderRadius: 10}}>
                <Text style={{textAlign:"center", fontSize: 20}}>
                  {selectedName.split("-").join(" ")}
                </Text>
              </View>
              {
                store?.placeSlice?.future[selectedName].map((day) => {
                  return <FutureDetailEntry key={`${selectedName}-${day.dt_txt}`} day={day}/>
                })
              }
            </View>
          </ScrollView>
        </SafeAreaView>
        ) : <Loader/>
      }
    </>
  )
}



export default FutureDetails