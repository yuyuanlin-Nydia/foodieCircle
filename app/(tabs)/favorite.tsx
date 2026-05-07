import { StyleSheet, Pressable, FlatList } from "react-native";
import { useFavorite } from '@/contexts/FavoriteContext';
import  React, { useEffect } from "react";
import { useNavigation } from "expo-router";
import { useThemeColor } from "@/components/Themed";
import { Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { RecipeCard } from '@/components/RecipeCard';
import { RECIPES } from "@/data/dummy-data";
import { router  } from "expo-router";

export default function FavoriteScreen() {
  const {favorites} = useFavorite()
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const mealListByFavorite = RECIPES.filter((recipe) =>
    favorites.includes(recipe.id)
  );

  function renderRecipe({ item, index }) {
    return (
      <Pressable
        style={[
             styles.recipeContainer,
          !(index === mealListByFavorite.length - 1) && styles.borderStyle,
        ]}
         onPress={() => router.push({
                  pathname: "/recipeDetail/[recipeID]",
                  params: { recipeID: item.id }}
                )}
      >
        <RecipeCard item={item} index={index} />
      </Pressable>
    );
  }

  useEffect(() => {
      navigation.setOptions({
        headerTitle: () => (
          <View>
            <Text 
              style={{
                color: Colors[colorScheme ?? "light"].tint,
                fontSize: 28,
                fontWeight: 600,
              }}>My Favorites
            </Text>
          </View>
        )
      });
    }, [navigation, useThemeColor]
  );

  return (
    <View>
      {!mealListByFavorite.length && (
        <View style={{marginTop: 32, alignItems: 'center', gap: 8}}>
          <Text style={{ fontSize: 18}}>No favorite recipes yet.</Text>
        </View>
      )}
      <FlatList
        data={mealListByFavorite}
        keyExtractor={(item) => item.id}
        renderItem={renderRecipe}
      />
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
})
