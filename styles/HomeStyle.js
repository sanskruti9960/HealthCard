import { StyleSheet } from 'react-native'
import React from 'react'


const HomeStyle = StyleSheet.create({

  main: {
    flex: 1,
    backgroundColor: "white",
    padding: 10
  },
  profile_icon: {
    position: "absolute",
    top: 1,
    right: 0,
    marginRight: 2
  },
  profile_name: {
    flex: 1,
  },
  Topbar: {
    flexDirection: "row",
    margin: 10

  },

  // health information
  info_blood: {
    backgroundColor: "#ffe0e0",
    marginRight: 10,
    marginTop: 10,
    borderRadius: 15,
    padding: 5
  },
  info_Allergies: {
    backgroundColor: "#fff3cd",
    marginRight: 10,
    marginTop: 10,
    borderRadius: 15,
    padding: 5
  },
  info_cond: {
    borderRadius: 15,
    marginTop: 10,
    backgroundColor: "#d1ecf1",
    width: "55%",


  },
  // icon in circle facility provided
  facility: {
    flexDirection: 'row',
    gap: 25,
    padding: 16,
    alignItems: 'center'
  },
  fac_iconCnt: {
    backgroundColor: "#d6f0fa",
    borderRadius: 16,
    alignItems: 'center',
    height: 60,
    width: 60,
    justifyContent: "center",
    marginBottom: 6,
    elevation: 2,

  },
  fac_iconCode: {
    backgroundColor: "#FFF1D6",
    borderRadius: 16,
    alignItems: 'center',
    height: 60,
    width: 60,
    justifyContent: "center",
    marginBottom: 6,
    elevation: 2,

  },
  fac_iconRep: {
    backgroundColor: "#D1F8FB",
    borderRadius: 16,
    alignItems: 'center',
    height: 60,
    width: 60,
    justifyContent: "center",
    marginBottom: 6,
    elevation: 2,

  },
  fac_iconId: {
    backgroundColor: "#F8E7EC",
    borderRadius: 16,
    alignItems: 'center',
    height: 60,
    width: 60,
    justifyContent: "center",
    marginBottom: 6,
    elevation: 2,

  },
  fac_singleIcon: {
    alignItems: 'center'
  }



})
export default HomeStyle