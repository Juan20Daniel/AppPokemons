import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "../screens/home/HomeScreen";
import { PokemonScreen } from "../screens/pokemon/PokemonScreen";
import { SearchScreen } from "../screens/search/SearchScreen";

type RootStackParamList = {
    Home:undefined;
    Pokemon:{pokemonId:number};
    Search:undefined;
}

const Stack = createStackNavigator<RootStackParamList>();

export const StackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown:false,
        }}>
            <Stack.Screen name='Home' component={HomeScreen} />
            <Stack.Screen name='Pokemon' component={PokemonScreen} />
            <Stack.Screen name='Search' component={SearchScreen} />
        </Stack.Navigator>
    )
}