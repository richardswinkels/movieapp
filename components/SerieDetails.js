import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import {API_TOKEN} from "@env"
import React, {useState, useEffect} from 'react'

const SerieDetails = ({route}) => {
  const [serie, setSerie] = useState({});

  const fetchSerie = async () => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/tv/${route.params}?api_key=${API_TOKEN}&language=nl-NL`)
      const json = await response.json();
      setSerie(json)    
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSerie()
  }, [])

  return (
    <View style={styles.container}>
      <ScrollView>
      <Image style={{ aspectRatio: 16/9 }} source={{uri: "https://image.tmdb.org/t/p/w780/" + serie.backdrop_path}}/>
      <View style={{margin: 10}}>
        <Text style={[styles.title, styles.text]}>{serie.name}</Text>
        <Text style={styles.text}>Releasedatum: {serie.first_air_date}</Text>
        <Text style={styles.text}>Waardering: {serie.vote_average}/10</Text>
        <Text style={[styles.subtitle, styles.text]}>Beschrijving</Text>
        <Text style={styles.text}>{serie.overview ? serie.overview : "Geen beschrijving beschikbaar"}</Text>
      </View>
      </ScrollView>
    </View>
  )
}

export default SerieDetails

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  title: {
    fontSize: 38,
    fontWeight: 'bold',
  },
  subtitle: {
    marginTop: 17,
    fontSize: 22,
    fontWeight: 'bold',
  },
  text: {
    color: 'white',
  }
})