import React, { useContext } from 'react'
import { ActivityIndicator, Dimensions, View, ScrollView } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Carousel from 'react-native-new-snap-carousel';
import MoviePoster from '../components/MoviePoster';
import useMovies from '../hooks/useMovies'
import HorizontalSlider from '../components/HorizontalSlider';
import GradientBackground from '../components/GradientBackground';
import getImageColors from '../helpers/getColores';
import { GradientContext } from '../context/GradientContext';
import { useEffect } from 'react';

const { width: windowWidth } = Dimensions.get('window')
const HomeScreen = () => {

  const { nowPlaying, popular, topRated, upcoming, isLoading } = useMovies();
  const { top } = useSafeAreaInsets();
  const { setMainColors } = useContext(GradientContext);

  const getPosterColors = async (index: number) => {
    //console.log({index});
    const movie = nowPlaying[index];
    const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    //console.log(nowPlaying[index].title)
    const [primary = 'green', secondary = "orange"] = await getImageColors(uri);
    //console.log({primary,secondary})
    setMainColors({ primary: primary, secondary: secondary })
  }

  useEffect(() => {
    if (nowPlaying.length > 0) {
      getPosterColors(0)
    }
  }, [nowPlaying])

  if (isLoading) {// If the page is still loading, show a loading gif.
    return (
      <View style={{ flex: 1, justifyContent: "center", alignContent: "center" }}>
        <ActivityIndicator color="red" size={100}></ActivityIndicator>
      </View>
    )
  }

  return (
    <GradientBackground>
      <ScrollView>
        <View style={{ marginTop: top + 20 }}>
          <View style={{
            height: 440,//backgroundColor:'red'
          }}>
            <Carousel
              data={nowPlaying}
              renderItem={({ item }: any) => <MoviePoster movie={item} />} //movie={moviesInCinema[0]}
              sliderWidth={windowWidth}
              itemWidth={300}
              inactiveSlideOpacity={0.9}
              onSnapToItem={(index: number) => getPosterColors(index)}
            />
          </View>

          {/* Popular Movies */}
          <HorizontalSlider title='Populares' movies={popular}></HorizontalSlider>
          <HorizontalSlider title='Top Rated' movies={topRated}></HorizontalSlider>
          <HorizontalSlider title='Upcoming' movies={upcoming}></HorizontalSlider>
        </View >
      </ScrollView>
    </GradientBackground>
  )
}

export default HomeScreen
