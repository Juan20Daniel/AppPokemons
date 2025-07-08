import { useContext } from 'react';
import { StyleProp, Image, ImageStyle } from 'react-native';
import { ThemeContext } from '../../context/ThemeContext';

interface Props {
    customStyle?:StyleProp<ImageStyle>;
}

export const PokeballBg = ({customStyle}:Props) => {
    const { isDark } = useContext(ThemeContext);
    const pokeballImag = isDark 
        ? require('../../../assets/pokeball-light.png')
        : require('../../../assets/pokeball-dark.png')
    
    return (
        <Image 
            source={pokeballImag}
            style={[
                customStyle,
                {
                    width: 300, 
                    height: 300,
                    opacity: 0.3
                }
            ]}
        />
    );
}