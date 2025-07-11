import React from 'react';
import { ActivityIndicator, useColorScheme, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

export const FullScreenLoader = () => {
    const { colors } = useTheme();
    const theme = useColorScheme();
    return (
        <View style={{
            flex:1,
            justifyContent:'center',
            alignItems:'center',
            backgroundColor: colors.background,
            gap:10
        }}>
            <ActivityIndicator color={theme === 'dark' ? 'white' : 'black'} size={50} />
            <Text variant='bodyLarge'>Cargando...</Text>
        </View>
    );
}
