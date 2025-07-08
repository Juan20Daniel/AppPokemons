import 'react-native-gesture-handler';
import { StatusBar, useColorScheme } from 'react-native';
import { StackNavigator } from "./presentation/navigators/StackNavigator";
import { ThemeProviderCustom } from "./presentation/context/ThemeContext";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export const PokemonApp = () => {
  const colorSchema = useColorScheme();
  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar 
        barStyle={colorSchema === 'dark' ? 'light-content' : 'dark-content'} 
      />
      <ThemeProviderCustom>
        <StackNavigator />
      </ThemeProviderCustom>
    </QueryClientProvider>
  );
}