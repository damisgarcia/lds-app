import React, { useEffect  } from 'react'
import { StyleSheet, BackHandler, Alert } from 'react-native'
import { ScreenOrientation } from 'expo'
import { WebView } from 'react-native-webview'

function WebViewComponent(props){
    async function changeScreenOrientation() {
        await ScreenOrientation.lockAsync(ScreenOrientation.Orientation.LANDSCAPE);
    }
    
    async function onLoadEnd() {
        await changeScreenOrientation()
        props.onLoadEnd()
    }

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', function () {
            Alert.alert('Sair', 'Você realmente deseja sair do aplicativo?', [
                {text: 'Não', style: "cancel" },
                {text: 'Sim', onPress: () => BackHandler.exitApp() }
            ])
            return true
        });
    }, [])


    return (
        <WebView 
            source={{ uri: 'https://reactnative.dev/' }} 
            onLoadEnd={onLoadEnd} 
        />
    )
}

const styles = StyleSheet.create({
    block: {
        flex: 1
    }
})

export default WebViewComponent;