import { Link } from "expo-router";
import { View, Text, Image, StyleSheet } from "react-native";
import { DidotText } from "@/components/StyledText";
import { useThemeColor } from "@/components/Themed";

export function RecipeCard({ item, index }) {
  return (
    <View style={{ flexDirection: "row" }}>
      <Image source={item.imageUrl} key={index} style={styles.image} />
      <View style={{ flex: 1 }}>
        <DidotText style={styles.recipeTitle}>{item.title}</DidotText>
        <Text style={styles.content}>
          Time: <Text style={styles.boldText}> {item.duration}min</Text>
        </Text>
        <Text style={styles.content}>
          Calories: <Text style={styles.boldText}> {item.calories}</Text>
        </Text>
        <Text style={styles.content}>
          Difficulty:<Text style={styles.boldText}> {item.complexity}</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  recipeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    margin: 16,
    marginBottom: 0,
    paddingBottom: 16,
    display: "flex",
    flex: 1,
  },
  borderStyle: {
    borderBottomWidth: 1,
    borderBottomColor: useThemeColor({}, "lightText"),
  },
  boldText: {
    fontWeight: 500,
  },
  content: {
    color: useThemeColor({}, "lightText"),
    lineHeight: 22,
  },
  recipeTitle: {
    flexShrink: 1,
    fontWeight: 500,
    fontSize: 18,
    marginBottom: 4,
    color: useThemeColor({}, "primary500"),
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 12,
  },
});
