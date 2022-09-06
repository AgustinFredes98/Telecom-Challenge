import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  actualCityInfoContainer: {
    backgroundColor: "rgba(0,0,30,0.4)",
    borderBottomWidth: 2,
    borderColor: "black",
    borderStyle: "solid",
    marginVertical: 4,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  actualCityInfoText: {
    color: "#f8fafc",
    fontSize: 16,
    padding: 20,
    flex: 4,
  },
  cityRemoveButton: {
    alignItems:"center",
    backgroundColor:"rgba(0,0,30,0.5)",
    borderTopRightRadius: 10,
    flex: 5/6,
    justifyContent:"center",
  }
})