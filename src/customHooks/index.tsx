import { useEffect, useState } from "react";
import { BackHandler, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigate, useParams } from "react-router-native";
import { useAppDispatch } from "../redux/hooks";
import publicIP from "react-native-public-ip";
import { WEATHER_MAP_API_KEY }  from "react-native-dotenv"
import { setCurrentInformation, setFutureInformation, setlocalPlace } from "../redux/placeSlice"
import { getInformationParams } from "../types"

const api_key = WEATHER_MAP_API_KEY // dotenv is not working as expected so this line fixes that

export const useBackHome = () => {
  const navigate = useNavigate()
  useEffect(() => {
    const backAction = () => {
      navigate("/")
      return true;
    };
    BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
  }, [])
}

export const useBackExit = () => {
  useEffect(() => {
    const backAction = () => {
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
}

export const useFetchIcon = (currentIconURL) => {
  const [currentIcon, setCurrentIcon] = useState("")
  useEffect(() => {
      fetch(`http://openweathermap.org/img/wn/${currentIconURL}@2x.png`)
      .then((res) => setCurrentIcon(res.url))
      .catch((err) => console.error(err))
    }, [])
  return currentIcon
}


export const useGetCurrentinformationByIP = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    publicIP()
      .then(ip => {    
        fetch(`http://ip-api.com/json/${ip}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.lat && data.lon) {
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${data.lat}&lon=${data.lon}&appid=${api_key}&lang=es`)
            .then((response) => response.json())
            .then((data) => {
              if (data.name) {
                dispatch(setCurrentInformation({[`${data?.name}-${data?.sys?.country ?? data?.name}`]: data}));
                dispatch(setlocalPlace(`${data?.name}-${data?.sys?.country ?? data?.name}`))
              } else if (data.cod === 401) {
                throw new Error("Invalid API key");
              } else {
                throw new Error("Something happend with the backEnd");
              }
            })
            .catch((error) => {
              console.error(error);
            });
          }
          else {
            throw new Error("Api is not responding with latitude");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    })
  }, [])
}

export const useGetinformationByQueryParams = (params:getInformationParams) => {
  const { place } = useParams();
  const dispatch = useAppDispatch()
  const [currentName, setCurrentName] = useState("")
  useEffect(() => {    
      if (place) {
        fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${place.split(":")[1].split(",")[0]}&appid=${api_key}`) // for some case the params comes with a : at the start
        .then((response) => response.json())
        .then((data) => {
          if (params.type === "current" && data[0] !== undefined) {
            fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${data[0].lat}&lon=${data[0].lon}&appid=${api_key}&lang=es`)
            .then((response) => response.json())
            .then((data) => {
              if (data.city) {
                dispatch(setFutureInformation({[`${data?.city?.name}-${data?.city?.country ?? data?.city?.name}`]: data.list}));
                setCurrentName(`${data?.city?.name}-${data?.city?.country ?? data?.city?.name}`)
              } else if (data.cod === 401) {
                throw new Error("Invalid API key");
              } else {
                throw new Error("Something happend with the backEnd");
              }
            })
            .catch((error) => {
              console.error(error);
            });
          } else if (params.type === "5days" && data[0] !== undefined) {
            fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${data[0].lat}&lon=${data[0].lon}&appid=${api_key}&lang=es`)
            .then((response) => response.json())
            .then((data) => {
              if (data.list) {
                const listSplittedBy24Hs = data.list.filter((item) => {
                  return data.list[0].dt_txt?.split(" ")[1] === item?.dt_txt?.split(" ")[1]
                })
                dispatch(setFutureInformation({[`${data?.city?.name}-${data?.city?.country ?? data?.city?.name}`]: listSplittedBy24Hs}));
                setCurrentName(`${data?.city?.name}-${data?.city?.country ?? data?.city?.name}`)
              } else if (data.cod === 401) {
                throw new Error("Invalid API key");
              } else {
                throw new Error("Something happend with the backEnd");
              }
            })
            .catch((error) => {
              console.error(error);
            });
          } else {
            throw new Error("Api is not responding with latitude nor longitude");
          }
        })
        .catch((error) => {
          console.error(error);
        });
      }
  }, [])
  return currentName
}

export const useLocalStorage = () => {
  const [listOfPlaces, setListOfPlaces] = useState(new Array())
  const addStoreData = async (value:string) => {
    try {
        const newListOfPlaces = [...listOfPlaces, value].join("-/-")
        await AsyncStorage.setItem('Test', newListOfPlaces)
        getData()
    } catch (err) {
      console.error(err)
    }
  }

  const removeStoreData = async (value:string) => {
    try {
        AsyncStorage.setItem('Test', listOfPlaces.filter((item) => item !== value).join("-/-"))
        getData()
    } catch (err) {
      console.error(err)
    }
  }

  const getData = async () => {
    try {
        const value = await AsyncStorage?.getItem('Test')
        if (listOfPlaces.join("-/-") !== value) {
          const arrayValue = value?.split("-/-") || []
          setListOfPlaces(arrayValue)
        }
      } catch (err) {
        console.error(err)
      }
    }
  useEffect(() => {
    getData()
  }, [])
  return { listOfPlaces, addStoreData, removeStoreData }
}