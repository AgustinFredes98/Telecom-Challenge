import { StyleSheet, Platform, Dimensions } from "react-native";

export default StyleSheet.create({
	screenOverlay: {
		height: Dimensions.get("window").height,
		backgroundColor: "black",
		opacity: 0.8
	},
	dialogPrompt: {
		borderRadius: 5,
		backgroundColor: "white",
		marginTop: Dimensions.get("window").height/4,
		padding: 10,
		flexDirection: "column",
		justifyContent: "space-between",
		alignItems: "center"
	},
	title: {
		fontWeight: "bold",
		fontSize: 26,
		color: "black"
	},
	textInput: {
		width: "100%",
		textAlignVertical: "bottom",
		justifyContent: "center",
		alignItems: "center",
		marginTop: 20,
		padding: 10,
		backgroundColor: "rgba(0, 0, 0, 0.9)",
		borderRadius: 10
	},
	buttonsOuterView: {
		justifyContent: "center",
		alignContent: "space-between",
		flexDirection: "row",
		width: "100%"
	},
	buttonsInnerView: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignContent: "space-between",
		margin: 8
	},
	buttonsDivider: {
		width: Dimensions.get("window").width/3
	},
	button: {
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0,0,0,0.2)",
		margin: 5,
		padding: 10
	},
	cancelButtonText: {
		fontSize: 20,
		fontWeight: "600",
		color: "black"
	},
	submitButtonText: {
		color: "rgb(0, 129, 251)",
		fontWeight: "600",
		fontSize: 20
	}
});
