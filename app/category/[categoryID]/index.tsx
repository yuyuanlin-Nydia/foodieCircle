import { useLocalSearchParams, useNavigation } from "expo-router";
import {
  FlatList,
  StyleSheet,
  Pressable,
} from "react-native";
import { useEffect } from "react";
import { router } from "expo-router";
import { RECIPES, CATEGORIES } from "@/data/dummy-data";
import { RecipeCard } from '@/components/RecipeCard';
import { useThemeColor } from "@/components/Themed";
import { HeaderBackButton } from "@react-navigation/elements";

export default function category() {
  const { categoryID } = useLocalSearchParams();
  const navigation = useNavigation();

  const mealListByCategory = RECIPES.filter((recipe) =>
    recipe.categoryIds.includes(categoryID)
  );
  const categoryName = CATEGORIES.find(
    (category) => category.id === categoryID
  )?.title;

  useEffect(() => {
    navigation.setOptions({
      title: categoryName,
      headerLeft: () => <HeaderBackButton onPress={()=>router.push('/home')} />
    });
  }, [navigation]);

  function renderRecipe({ item, index }) {
    return (
      <Pressable
        style={[
          styles.recipeContainer,
          !(index === mealListByCategory.length - 1) && styles.borderStyle,
        ]}
        onPress={() => router.push({
          pathname: "/recipeDetail/[recipeID]",
          params: { recipeID: item.id, categoryID }}
        )}
      >
        <RecipeCard item={item} index={index} />
      </Pressable>
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
})
