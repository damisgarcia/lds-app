import React, { useState, useEffect } from 'react'

import { 
    ActivityIndicator, 
    View, 
    StyleSheet
} from 'react-native'

import { ScreenOrientation } from 'expo'

import WebView from './Webview'
import Statusbar from './Statusbar'

export default function Browser() {
    const [isReady, setIsReady] = useState(false)
    const [isResize, setResize] = useState(false)

    function onLoadEnd(){
        setIsReady(true)
    }

    function RenderLoading(){
        if (!isReady) {
            return (
                <View style={styles.loading}>
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

    useEffect(() => {
        async function changeScreenOrientation() {
            await ScreenOrientation.lockAsync(ScreenOrientation.Orientation.LANDSCAPE)
            setResize(true)
        }
        
        changeScreenOrientation()
    }, [])

    if (isResize) {
        return (
            <View style={styles.block}>
                <Statusbar />
                <RenderWebView />
                <RenderLoading />
            </View>
        )
    }

    return null
}

const styles = StyleSheet.create({
    block: {
        flex: 1,
        position: "relative"
    },
    browser: {
        flex: 1
    },
    invisible: {
        flex: 0
    },
    loading: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
})