import React, { useState } from "react";
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    Animated
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../styles/theme";

export default function FloatingAddButton({
    onAddVideo,
    onCreateList
}) {
    const [open, setOpen] = useState(false);
    const animation = useState(new Animated.Value(0))[0];

    const toggleMenu = () => {
        Animated.spring(animation, {
            toValue: open ? 0 : 1,
            useNativeDriver: true
        }).start();
        setOpen(!open);
    };

    const addVideoStyle = {
        transform: [
            {
                translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -60]
                })
            }
        ],
        opacity: animation
    };

    const createListStyle = {
        transform: [
            {
                translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -120]
                })
            }
        ],
        opacity: animation
    };

    return (
        <View style={styles.container}>
            {/* Add Video */}
            <Animated.View style={[styles.option, addVideoStyle]}>
                <TouchableOpacity onPress={onAddVideo} style={styles.optionBtn}>
                    <Ionicons name="videocam" size={20} color="#fff" />
                    <Text style={styles.optionText}>Add video</Text>
                </TouchableOpacity>
            </Animated.View>

            {/* Create List */}
            <Animated.View style={[styles.option, createListStyle]}>
                <TouchableOpacity onPress={onCreateList} style={styles.optionBtn}>
                    <Ionicons name="folder" size={20} color="#fff" />
                    <Text style={styles.optionText}>Create list</Text>
                </TouchableOpacity>
            </Animated.View>

            {/* Main Button */}
            <TouchableOpacity style={styles.fab} onPress={toggleMenu}>
                <Ionicons
                    name={open ? "close" : "add"}
                    size={30}
                    color="#fff"
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: 35,
        right: 25,
        alignItems: "center"
    },
    fab: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: colors.primary || "#7c3aed",
        justifyContent: "center",
        alignItems: "center",
        elevation: 6
    },
    option: {
        position: "absolute",
        right: 0
    },
    optionBtn: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#7c3aed",
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: 20,
        marginBottom: 10,
        width: 110,
    },
    optionText: {
        color: "#fff",
        marginLeft: 8,
        fontSize: 12
    }
});
