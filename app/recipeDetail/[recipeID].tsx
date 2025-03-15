import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { useLayoutEffect } from "react";
import { HeaderBackButton } from "@react-navigation/elements";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { View as CustomView } from "@/components/Themed";
import { DidotText } from "@/components/StyledText";
import { useThemeColor } from "@/components/Themed";
import { RECIPES } from "@/data/dummy-data";

export default function recipeDetail() {
  const navigation = useNavigation();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const { recipeID, categoryID }: { recipeID: string; categoryID: string } =
    useLocalSearchParams();
  const recipeItem = RECIPES.find((recipe) => recipe.id === recipeID);

  function toggleFavorite() {
    console.log("toggle");
  }

  function goBack() {
    if (categoryID) {
      router.replace({
        pathname: "/category/[categoryID]",
        params: { categoryID },
      });
    } else {
      router.push("/home");
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: Colors[colorScheme ?? "light"].primary200,
      },
      title: "",
      headerTintColor: Colors[colorScheme ?? "light"].tint,
      headerRight: () => {
        return (
          <View style={{ gap: 8, flexDirection: "row", marginRight: 12 }}>
            <Pressable style={styles.iconWrapper}>
              <FontAwesome
                size={16}
                name="share-alt"
                color={useThemeColor({}, "iconColor")}
              />
            </Pressable>
            <Pressable style={styles.iconWrapper} onPress={toggleFavorite}>
              <FontAwesome
                size={16}
                name="heart-o"
                color={useThemeColor({}, "iconColor")}
              />
            </Pressable>
          </View>
        );
      },
      headerLeft: () => <HeaderBackButton onPress={goBack} />,
    });
  }, [navigation, useThemeColor, colorScheme, Colors, toggleFavorite]);
  return (
    <CustomView
      style={{ flex: 1, backgroundColor: useThemeColor({}, "primary200") }}
    >
      <View style={styles.recipeImageContainer}>
        <Image source={recipeItem?.imageUrl} style={styles.recipeImage} />
      </View>
      <ScrollView style={styles.infoContainer}>
        <Text style={styles.authorName}>{recipeItem?.author}</Text>
        <DidotText style={styles.dishName}>{recipeItem?.title}</DidotText>

        <Text style={styles.description}>
          In a large bowl, XXXIn a large bowl, XXXIn a large bowl, XXXIn a large
          bowl, XXXIn a large bowl, XXXIn a large bowl, XXXIn a large bowl,
          XXXIn a large bowl, XXXIn a large bowl, XXXIn a large bowl, XXXIn a
          large bowl, XXX
        </Text>
        <View style={styles.pointContainer}>
          <View style={styles.point}>
            <Text style={styles.pointFirstLine}>{recipeItem?.duration}min</Text>
            <Text style={styles.pointSecondLine}>Time</Text>
          </View>
          <View style={styles.point}>
            <Text style={styles.pointFirstLine}>{recipeItem?.calories}cal</Text>
            <Text style={styles.pointSecondLine}>Calorie</Text>
          </View>
          <View style={styles.point}>
            <Text style={styles.pointFirstLine}>{recipeItem?.complexity}</Text>
            <Text style={styles.pointSecondLine}>Difficulty</Text>
          </View>
        </View>
        <View>
          <DidotText style={styles.ingredientTitle}>Ingredient</DidotText>
          {recipeItem?.ingredients.map((ingredient) => {
            return (
              <View style={styles.ingredientDetailContainer} key={ingredient}>
                <Text style={styles.ingredientName}>{ingredient}</Text>
              </View>
            );
          })}
        </View>
        <View>
          <DidotText style={styles.ingredientTitle}>Steps</DidotText>
          {recipeItem?.steps.map((step, index) => {
            return (
              <View key={step} style={styles.ingredientDetailContainer}>
                <Text style={styles.ingredientName}>
                  {index + 1}. {step}
                </Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </CustomView>
  );
}

const styles = StyleSheet.create({
  recipeImageContainer: {
    padding: 16,
    paddingTop: 0,
    position: "relative",
    overflow: "hidden",
    width: "100%",
    height: 200,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  recipeImage: {
    position: "absolute",
    top: 0,
    left: "50%",
    transform: [{ translateX: "-50%" }, { translateY: 0 }], // Adjust to center
    width: 250,
    height: 200,
  },
  iconContainer: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  iconWrapper: {
    backgroundColor: useThemeColor({}, "background"),
    borderRadius: 100,
    padding: 8,
  },
  infoContainer: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    backgroundColor: useThemeColor({}, "background"),
    flex: 1,
  },
  authorName: {
    marginBottom: 4,
    color: "#ABBB92",
    fontWeight: 500,
  },
  dishName: {
    fontSize: 20,
    marginBottom: 12,
    fontWeight: 800,
  },
  description: {
    color: useThemeColor({}, "lightText"),
    lineHeight: 24,
    marginBottom: 12,
  },
  pointContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 12,
    alignItems: "flex-start",
  },
  point: {
    paddingVertical: 12,
    backgroundColor: "#F5F8F3",
    borderRadius: 8,
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  pointFirstLine: {
    fontWeight: 500,
    textAlign: "center",
  },
  pointSecondLine: {
    textAlign: "center",
    color: useThemeColor({}, "lightText"),
    fontSize: 12,
  },
  ingredientTitle: {
    fontSize: 18,
    fontWeight: 600,
    marginVertical: 16,
  },
  ingredientDetailContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 8,
  },
  ingredientName: {
    color: useThemeColor({}, "lightText"),
    fontWeight: 600,
    lineHeight: 12,
  },
});
