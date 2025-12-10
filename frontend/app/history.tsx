import { View, Text, Pressable, Switch, StyleSheet, TextInput } from "react-native";
import { router } from "expo-router";

export default function HistoryScreen() {
    return (
        <View>
            <Pressable onPress={() => router.back()}>
                <Text>Retour</Text>
            </Pressable>
            <Text>History</Text>
        </View>
    )
}