import React from "react";
import { StyleSheet, FlatList, Image } from "react-native";
import { Text, View } from "@/components/Themed";
import { CATEGORIES } from "@/data/dummy-data";
import { useColorScheme } from "react-native";
import Colors from "@/constants/Colors";
import { DidotText } from "./StyledText";

export const categoryImage = {
  Salad: require("@/assets/images/category/salad.png"),
  Bread: require("@/assets/images/category/bread.png"),
  Dessert: require("@/assets/images/category/dessert.png"),
  Fruit: require("@/assets/images/category/fruit.png"),
  Asian: require("@/assets/images/category/salad.png"),
  Exotic: require("@/assets/images/category/bread.png"),
  Breakfast: require("@/assets/images/category/dessert.png"),
  Italy: require("@/assets/images/category/fruit.png"),
  French: require("@/assets/images/category/salad.png"),
  Summer: require("@/assets/images/category/fruit.png"),
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
        <View style={[styles.recipeContainer, { backgroundColor: item.color }]}>
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
          {/* <ImageBackground
            source={{ uri: item.src }} // Background Image
            style={styles.categoryImage}
            resizeMode="cover"
          /> */}
        </View>
      </View>
    );
  }

  return (
    <FlatList
      data={CATEGORIES.slice(0, 4)}
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
  },
  recipeContainer: {
    backgroundColor: "#EFF7FE",
    borderRadius: 16,
    height: 120,
    flex: 1,
    margin: 8,
    padding: 8,
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
  },
  image: {
    width: "150%",
    height: "150%",
  },
});
