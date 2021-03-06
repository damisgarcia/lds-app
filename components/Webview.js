import React, { useEffect } from 'react'
import { 
    StyleSheet, 
    BackHandler, 
    Alert, 
    Text, 
    KeyboardAvoidingView
} from 'react-native'

import { WebView } from 'react-native-webview'

import Constants from 'expo-constants';

function WebViewComponent(props){
    async function onLoadEnd() {
        props.onLoadEnd()
    }

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', function () {
            Alert.alert('Sair', 'Você realmente deseja sair do aplicativo?', [
                {text: 'Não', style: "cancel" },
                {text: 'Sim', onPress: () => BackHandler.exitApp() }
            ])
            return true
        })
    }, [])

    if (Constants.manifest.extra && Constants.manifest.extra.projectURL) {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.block}>
                <WebView 
                    source={{ uri: Constants.manifest.extra.projectURL }}
                    automaticallyAdjustContentInsets={true}
                    onLoadEnd={onLoadEnd}
                    javaScriptEnabled={true}
                />
            </KeyboardAvoidingView>
        )
    }
    return <Text>Não foi possível alcançar URL</Text>
}

const styles = StyleSheet.create({
    block: {
        flex: 1,
    }
})

export default WebViewComponent