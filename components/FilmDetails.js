import { StyleSheet, Text, View, ScrollView, Image } from 'react-native'
import {API_TOKEN} from "@env"
import React, {useState, useEffect} from 'react'

const FilmDetails = ({route}) => {
  const [movie, setMovie] = useState({});

  const fetchMovie = async () => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${route.params}?api_key=${API_TOKEN}&language=nl-NL`)
      const json = await response.json();
      setMovie(json)    
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMovie()
  }, [])

  return (
    <View style={styles.container}>
        <ScrollView>
        <Image style={{ aspectRatio: 16/9 }} source={{uri: "https://image.tmdb.org/t/p/w780/" + movie.backdrop_path}}/>
          <View style={{margin: 10}}>
            <Text style={[styles.title, styles.text]}>{movie.title}</Text>
            <Text style={styles.text}>Releasedatum: {movie.release_date}</Text>
            <Text style={styles.text}>Waardering: {movie.vote_average}/10</Text>
            <Text style={[styles.subtitle, styles.text]}>Beschrijving</Text>
            <Text style={styles.text}>{movie.overview ? movie.overview : "Geen beschrijving beschikbaar"}</Text>
          </View>
        </ScrollView>
    </View>
  )
}

export default FilmDetails

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