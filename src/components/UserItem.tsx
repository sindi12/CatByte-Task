import { memo, useState } from 'react'
import { Text, StyleSheet, TouchableOpacity, Image } from 'react-native'

import { colors, images } from '../themes'

function Item({
    id,
    username,
    age,
    image,
    width,
    onPress,
    onRemove
}: any) {

    return (
        <TouchableOpacity
            testID={`flower-${id}`}
            onPress={onPress}
            activeOpacity={0.6}
            style={{ ...styles.container, width }}
        >
            <Image
                source={{ uri: image }}
                style={StyleSheet.absoluteFill}
            />
            <Text style={styles.name}>Username: {username}</Text>
            <Text style={styles.age}>Age: {age}</Text>
            <TouchableOpacity onPress={onRemove} activeOpacity={0.6} style={styles.removeButton}>
                <Image source={images.remove} style={styles.removeIcon} />
            </TouchableOpacity>
        </TouchableOpacity>
    )
}

export default memo(Item)

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        backgroundColor: colors.white,
        aspectRatio: 0.79,
        margin: 7,
        borderRadius: 8,
        paddingVertical: 16,
        paddingHorizontal: 5,
        justifyContent: 'flex-end',
        alignItems: 'center',
        overflow: 'hidden',
    },
    name: {
        fontSize: 16,
        color: colors.white,
        marginVertical: 10,
        backgroundColor: colors.blackRGBA(0.7),
        padding: 5,
        borderRadius: 5,
        overflow: 'hidden'
    },
    age: {
        fontSize: 10,
        color: colors.white,
        backgroundColor: colors.blackRGBA(0.7),
        padding: 5,
        borderRadius: 5,
        overflow: 'hidden'
    },
    removeIcon: {
        width: 20,
        height: 20,
        tintColor: colors.redLight,
    },
    removeButton: {
        position: 'absolute',
        right: 0,
        top: 0,
        padding: 10,
    },
})
