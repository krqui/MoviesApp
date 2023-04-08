import ImageColors from 'react-native-image-colors';

const getImageColors = async (uri: string) => {
    //console.log({index});
    const colors = await ImageColors.getColors(uri, {});
    let primary;
    let secondary;

    switch (colors.platform) {
        case "android":
            primary = colors.dominant;
            secondary = colors.average;
            break

        case "ios":
            primary = colors.primary;
            secondary = colors.secondary
    }

    return [primary, secondary]
}

export default getImageColors