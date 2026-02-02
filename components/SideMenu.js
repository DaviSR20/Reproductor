import React, { useRef, useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Animated,
    Dimensions,
    Pressable
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SCREEN_WIDTH = Dimensions.get("window").width;
const MENU_WIDTH = SCREEN_WIDTH * 0.7;

export default function SideMenu({ navigation, children }) {
    const translateX = useRef(new Animated.Value(-MENU_WIDTH)).current;
    const [open, setOpen] = useState(false);

    const toggleMenu = () => {
        Animated.timing(translateX, {
            toValue: open ? -MENU_WIDTH : 0,
            duration: 250,
            useNativeDriver: true
        }).start();
        setOpen(!open);
    };

    const goTo = (screen) => {
        toggleMenu();
        navigation.navigate(screen);
    };

    return (
        <View style={{ flex: 1 }}>
            {/* OVERLAY */}
            {open && (
                <Pressable style={styles.overlay} onPress={toggleMenu} />
            )}

            {/* MENU */}
            <Animated.View
                style={[
                    styles.menu,
                    { transform: [{ translateX }] }
                ]}
            >
                <Text style={styles.menuTitle}>MENU</Text>
                <MenuItem icon="home-outline" label="Feed" onPress={() => goTo("Home")} />
                <MenuItem icon="list-outline" label="List" onPress={() => goTo("Lists")} />
                <MenuItem icon="heart-outline" label="Favorites" onPress={() => goTo("Favorites")} />
                <MenuItem icon="person-outline" label="Profile" onPress={() => goTo("Profile")} />
                <MenuItem icon="log-out-outline" label="Log Out" onPress={() => goTo("Login")} />
            </Animated.View>

            {/* HEADER / SEARCH BAR APPEARANCE */}
            <View style={styles.header}>
                <TouchableOpacity onPress={toggleMenu}>
                    <Ionicons name="menu" size={24} color="#4b0082" />
                </TouchableOpacity>

                <View style={styles.inputContainer}>
                    <Text style={styles.placeholder}>Hinted search text</Text>
                </View>

                <TouchableOpacity>
                    <Ionicons name="search" size={22} color="#4b0082" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.avatar}>
                    <Text style={styles.avatarText}>A</Text>
                </TouchableOpacity>
            </View>

            {/* CONTENT */}
            <View style={{ flex: 1 }}>{children}</View>
        </View>
    );
}

function MenuItem({ icon, label, onPress }) {
    return (
        <TouchableOpacity style={styles.item} onPress={onPress}>
            <Ionicons name={icon} size={22} color="#fff" />
            <Text style={styles.itemText}>{label}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    menu: {
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        width: MENU_WIDTH,
        backgroundColor: "#c084fc", // color morado del SearchBar
        paddingTop: 70,
        paddingHorizontal: 25,
        zIndex: 50,
        borderTopRightRadius: 30,
        borderBottomRightRadius: 30
    },

    menuTitle: {
        color: "#fff",
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 40
    },

    item: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 25
    },

    itemText: {
        color: "#fff",
        fontSize: 17,
        marginLeft: 15
    },

    overlay: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "rgba(0,0,0,0.3)",
        zIndex: 40
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#c084fc",
        borderRadius: 50,
        paddingHorizontal: 15,
        paddingVertical: 8,
        marginTop: 50,
        marginLeft: 10,
        marginRight: 10,
    },

    inputContainer: {
        flex: 1,
        marginHorizontal: 10,
        justifyContent: "center"
    },

    placeholder: {
        color: "#6b5b95",
        fontSize: 16
    },

    avatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: "#7c3aed",
        alignItems: "center",
        justifyContent: "center"
    },

    avatarText: {
        color: "#fff",
        fontWeight: "bold"
    }
});
