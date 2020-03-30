import React from 'react'
import { StatusBar, View, StyleSheet } from 'react-native'

import Constants from 'expo-constants'

export default function () {
    return (
        <View style={[styles.statusBar, {backgroundColor: "black"}]}>
            <StatusBar style={styles.statusBar} barStyle="light-content" />
        </View>
    )
}

const styles = StyleSheet.create({
    statusBar: {
        height: Constants.statusBarHeight
    }
})