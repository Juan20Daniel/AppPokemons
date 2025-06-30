import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const HomeScreen = () => {
    const { top } = useSafeAreaInsets();
    return (
        <View style={{marginTop: top,}}>
            <Text>HomeScreen</Text>
        </View>
    );
}