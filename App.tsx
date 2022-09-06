import React, {useEffect} from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  BackHandler,
  Alert
} from "react-native";
import { Provider } from "react-redux"
import { storage } from "./src/redux/store"
import { Route, NativeRouter, Routes } from "react-router-native";
import HomePage from "./src/components/pages/HomePage";
import { useAppSelector } from "./src/redux/hooks";
import FutureDetails from "./src/components/pages/FutureDetails";

const AppWrapper = () => {
  return (
    <Provider store={storage}>
      <App />
    </Provider>
  )
}

const App = ()  => {
  const store = useAppSelector(state => state)
  useEffect(() => {
    const backAction = () => {
      if (store)
      Alert.alert("Espera!", "Estas seguro que quieres salir?", [
        {
          text: "No",
          onPress: () => null,
          style: "cancel"
        },
        { text: "Si", onPress: () => BackHandler.exitApp() }
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);
  return (
    <NativeRouter>
        <View style={styles.overAllContainer} >
          <ImageBackground 
            resizeMode="cover"
            source={{uri:"https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-cloud-background_41066-1919.jpg?w=2000"}}
            style={styles.overAllImage}
          >
            <Routes>
              <Route path="/" element={<HomePage/>} />
              <Route path="/5days:place" element={<FutureDetails/>} />
            </Routes>
          </ImageBackground>
        </View>
    </NativeRouter>
  );
};

const styles = StyleSheet.create({
  overAllContainer: {
    backgroundColor: "#fff",
    flex: 1,
    flexDirection: "column",
  },
  overAllImage: {
    flex: 1
  }
})

export default AppWrapper;
