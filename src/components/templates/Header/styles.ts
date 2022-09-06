import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#0369a1",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  currentSummaryContainer: {
    alignItems: "center",
    backgroundColor:"#1e293b",
    borderRadius:10,
    flex: 4/10,
    justifyContent: "center",
    paddingBottom: 4,
    paddingTop: 10,
  },
  currentSummaryDescription: {
    fontSize: 20,
  },
  currentSummaryIcon: {
    width: "90%",
    height: "90%",
  }
})
