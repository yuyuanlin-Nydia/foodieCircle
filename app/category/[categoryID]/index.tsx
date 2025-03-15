import { useLocalSearchParams, useNavigation } from "expo-router";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Pressable,
} from "react-native";
import { useLayoutEffect } from "react";
import { Link } from "expo-router";

import { RECIPES, CATEGORIES } from "@/data/dummy-data";
import { DidotText } from "@/components/StyledText";
import { useThemeColor } from "@/components/Themed";

export default function category() {
  const { categoryID } = useLocalSearchParams();
  const navigation = useNavigation();

  const mealListByCategory = RECIPES.filter((recipe) =>
    recipe.categoryIds.includes(categoryID)
  );
  const categoryName = CATEGORIES.find(
    (category) => category.id === categoryID
  )?.title;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: categoryName,
    });
  }, [navigation]);

  function renderRecipe({ item, index }) {
    return (
      <Link
        style={{ flex: 1 }}
        href={{
          pathname: "/recipeDetail/[recipeID]",
          params: { recipeID: item.id, categoryID },
        }}
      >
        <Pressable
          style={[
            styles.recipeContainer,
            !(index === mealListByCategory.length - 1) && styles.borderStyle,
          ]}
        >
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
        </Pressable>
      </Link>
    );
  }

  return (
    <FlatList
      data={mealListByCategory}
      keyExtractor={(item) => item.id}
      renderItem={renderRecipe}
    />
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
  content: {
    color: useThemeColor({}, "lightText"),
    lineHeight: 22,
  },
  boldText: {
    fontWeight: 500,
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
  },
});
