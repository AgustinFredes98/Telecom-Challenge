import React, { useEffect, useReducer, useState } from "react";

import { useAppSelector } from "../../../redux/hooks";
import CityListWrapper from "../../templates/PlaceListWrapper"
import Header from "../../templates/Header"
import Loader from "../../molecules/Loader"

import { useBackExit, useGetCurrentinformationByIP } from "../../../customHooks";

const HomePage = () => {
  useBackExit()
  useGetCurrentinformationByIP()
  const store = useAppSelector(state => state)
  return (
    <>
      {
        store?.placeSlice?.localCurrentPlace ? (
          <>
            <Header currentIconURL={store?.placeSlice?.current[store?.placeSlice?.localCurrentPlace]?.weather[0]?.icon ?? ""}/>
            <CityListWrapper/>
          </>
        ) : <Loader/>
      }
    </>
  )
}

HomePage.displayName = "HomePage"

export default HomePage;