import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { Image, View, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Movie } from '../interfaces/movieInterface'

interface Props {
    movie: Movie;
    height?: number;
    width?: number;
}
// Remember that MoviePoster components is called from two father components: HomeScreen.tsx and HorizontalSlider.tsx
const MoviePoster = ({ movie, height = 420, width = 300 }: Props) => {
    const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    const navigation = useNavigation();
    // The name of the stack screen. Not necessarily the component file. ↓
    return (
        <TouchableOpacity
            onPress={() => navigation.navigate("DetailScreen", movie)}
            activeOpacity={0.8}
            style={{
                width,
                height,
                marginHorizontal: 8,
                paddingBottom: 20,
                paddingHorizontal: 7
            }}>
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri }}
                    style={styles.image} />
                {/*<Text>{movie.title}</Text>*/}
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        borderRadius: 18
    },
    imageContainer: {
        flex: 1,
        borderRadius: 18,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.24,
        shadowRadius: 7,
        elevation: 9,
    }
});

export default MoviePoster
