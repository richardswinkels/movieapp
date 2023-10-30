import React, { useState, useEffect } from 'react'
import {API_TOKEN} from "@env"
import { StyleSheet, View, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native'

const FilmOverview = (props) => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  // Haal films op als page onder 500 zit (maximaal aantal pagina's van de API) */ 
  const fetchMovies = async () => {
    if (page <= 500) {
      try {
        setIsLoading(true)
        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_TOKEN}&language=nl-NL&sort_by=popularity.desc&include_adult=false&page=${page}`);
        const json = await response.json();
        // Filter series zonder afbeeldingen eruit
        json.results = json.results.filter(serie => serie.poster_path != null)
        setMovies(prevData => [...prevData, ...json.results])
        setIsLoading(false)
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    fetchMovies()
  }, [page])

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.movie} onPress={() => props.navigation.navigate('FilmDetails', item.id)}>
        <Image resizeMode="cover" style={styles.image} source={{ uri: "https://image.tmdb.org/t/p/w500/" + item.poster_path }} />
      </TouchableOpacity>
    );
  };

  const loadIcon = () => {
    return (
      isLoading ? 
      <View>
        <ActivityIndicator size="large" color="#aaa"/>
      </View> : null
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={movies}
        renderItem={renderItem}
        columnWrapperStyle={styles.row}
        keyExtractor={(item) => item.id}
        numColumns={2}
        initialNumToRender={6}
        onEndReached={() => setPage(page + 1)}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loadIcon}
        style={{ margin: 5 }}
      />
    </View>
  )
}

export default FilmOverview

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  movie: {
    flex: 1 / 2,
  },
  row: {
    marginVertical: 5,
  },
  image: {
    aspectRatio: 2 / 3,
    borderRadius: 10,
    borderWidth: 1,
    marginHorizontal: 5,
  },
})