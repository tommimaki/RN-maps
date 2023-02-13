import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location'

import { API_KEY } from "@env";


export default function App() {
  const [osoite, setOsoite] = useState('')

  const initial = {
    latitude: 60.200692,
    longitude: 24.934302,
    latitudeDelta: 0.0322,
    longitudeDelta: 0.0221
  };

  const [region, setRegion] = useState(initial);


  const [coordinates, setCoordinates] = useState({
    latitude: 60.201373,
    longitude: 24.934041
  });
  
  useEffect(() => {
    setRegion({
      ...coordinates,
      latitudeDelta: initial.latitudeDelta,
      longitudeDelta: initial.longitudeDelta
    });
  }, [coordinates]);


  const geocode = ()=>{
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(osoite)}&key=${API_KEY}`)
      .then(response => response.json())
      .then(data => {
      const location = data.results[0].geometry.location;
      const newCoordinates = {
        latitude: location.lat,
        longitude: location.lng
      };
      setCoordinates(newCoordinates);
    })
      .catch(error => console.error(error));
  }

  return (
    <View style={styles.container}>
          <MapView
        style={styles.map}
        initialRegion={initial}
        region={region}
      >
        <Marker
          coordinate={coordinates}
          title={osoite}
        />
      </MapView>


      <TextInput style={styles.TextInput}  value={osoite}  onChangeText={setOsoite} placeholder='osoite' ></TextInput>
    <View style={styles.Button} >
      <Button onPress={geocode} title='hae'></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
    map: {
    flex: 1,
    width: "100%",
    height: "60%",
    marginBottom: 100, 
    borderWidth:1
  },
  TextInput:{
    borderWidth: 1,
    marginBottom:20,
    width: 300,
  },
  Button:{
    borderWidth: 2,
    marginBottom: 100,
  }

});
