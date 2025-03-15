import React from "react";
import { StyleSheet, FlatList, Image, Pressable } from "react-native";
import { View } from "@/components/Themed";
import { CATEGORIES } from "@/data/dummy-data";
import { useColorScheme } from "react-native";
import Colors from "@/constants/Colors";
import { DidotText } from "./StyledText";
import { Link } from "expo-router";

export const categoryImage = {
  Italian: require("@/assets/images/category/salad.png"),
  Quick: require("@/assets/images/category/bread.png"),
  Hamburgers: require("@/assets/images/category/dessert.png"),
  German: require("@/assets/images/category/fruit.png"),
  Light: require("@/assets/images/category/salad.png"),
  Exotic: require("@/assets/images/category/bread.png"),
  Breakfast: require("@/assets/images/category/dessert.png"),
  Asian: require("@/assets/images/category/fruit.png"),
  French: require("@/assets/images/category/salad.png"),
  Summer: require("@/assets/images/category/dessert.png"),
};

type categoryType = {
  id: string;
  title: string;
  color: string;
  src: string;
};

export default function RecipeListCategory() {
  const colorScheme = useColorScheme();

  function renderCategory({ item }: { item: categoryType }) {
    return (
      <View style={styles.recipeListWrapper}>
        <Link
          style={{ flex: 1 }}
          href={{
            pathname: "/category/[categoryID]",
            params: { categoryID: item.id },
          }}
        >
          <Pressable
            android_ripple={{ color: "#ccc" }}
            style={({ pressed }) => [
              styles.recipeContainer,
              { backgroundColor: item.color },
              pressed ? styles.buttonPressed : null,
            ]}
          >
            <DidotText
              style={[
                styles.categoryTitle,
                { color: Colors[colorScheme ?? "light"].lightText },
              ]}
            >
              {item.title}
            </DidotText>
            <View style={styles.categoryImage}>
              <Image source={categoryImage[item.title]} style={styles.image} />
            </View>
          </Pressable>
        </Link>
      </View>
    );
  }

  return (
    <FlatList
      data={CATEGORIES}
      keyExtractor={(item) => item.id}
      renderItem={renderCategory}
      numColumns={2}
    />
  );
}

const styles = StyleSheet.create({
  recipeListWrapper: {
    flexDirection: "row",
    flex: 1,
    margin: 4,
  },
  recipeContainer: {
    backgroundColor: "#EFF7FE",
    borderRadius: 16,
    height: 120,
    flex: 1,
    padding: 8,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  categoryTitle: {
    fontWeight: "500",
    fontSize: 14,
    position: "absolute",
    top: 12,
    left: 12,
  },
  categoryImage: {
    position: "absolute",
    right: 0,
    bottom: 0,
    height: 100,
    width: 100,
    zIndex: 2,
    backgroundColor: "transparent",
    overflow: "hidden",
    borderBottomRightRadius: 16,
  },
  image: {
    width: "150%",
    height: "150%",
  },
  buttonPressed: {
    opacity: 0.7,
  },
});
