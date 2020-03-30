import React, { useState } from 'react'

import { 
    ActivityIndicator, 
    View, 
    StyleSheet,
    KeyboardAvoidingView
} from 'react-native'

import WebView from './Webview'
import Statusbar from './Statusbar'

export default function Browser() {
    const [isReady, setIsReady] = useState(false)

    function onLoadEnd(){
        setIsReady(true)
    }

    function RenderLoading(){
        if (!isReady) {
            return (
                <View style={styles.centered}>
                    <ActivityIndicator size={64} color="#999" />
                </View>
            )
        }
        return null
    }

    function RenderWebView() {
        return (
            <View style={isReady ? styles.browser : styles.invisible}>
                <WebView onLoadEnd={onLoadEnd} />
            </View>
        )
    }

    return (
        <View style={styles.block}>
            <Statusbar />
            <RenderLoading />
            <RenderWebView />
        </View>
    )
}

const styles = StyleSheet.create({
    block: {
        flex: 1
    },
    browser: {
        flex: 1
    },
    invisivle: {
        width: 0,
        height: 0,
    },
    centered: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
})