import ImageColors from "react-native-image-colors";

export const getColorFromImage = async (image: string) => {
    const defaultColor = 'grey';
    const colors = await ImageColors.getColors(image, {
        fallback: defaultColor,
    });
    switch (colors.platform) {
        case 'android':
            return colors.dominant??defaultColor;
        case 'ios':
            return colors.background??defaultColor;
        default:
            return defaultColor;
    }
}