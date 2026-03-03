import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function NotFoundScreen() {
    return (
        <View>
            <Text>NotFoundScreen</Text>
            <Link href="/">
                <Text>Go to home</Text>
            </Link>
        </View>
    );
}