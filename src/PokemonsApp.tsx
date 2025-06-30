import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { StackNavigator } from "./presentation/navigators/StackNavigator";

export const PokemonApp = () => {
  return (
    <>
      <StatusBar barStyle='dark-content' />
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </>
  );
}