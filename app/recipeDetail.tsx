import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useNavigation } from "expo-router";
import { useLayoutEffect } from "react";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { View as CustomView } from "@/components/Themed";
import { DidotText } from "@/components/StyledText";
import { useThemeColor } from "@/components/Themed";

export default function recipe() {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();

  function toggleFavorite() {
    console.log("toggle");
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
    });
  }, [navigation, useThemeColor, colorScheme, Colors, toggleFavorite]);
  return (
    <CustomView
      style={{ flex: 1, backgroundColor: useThemeColor({}, "primary200") }}
    >
      <View style={styles.recipeImageContainer}>
        <Image
          source={require("@/assets/images/today_cover1.png")}
          style={styles.recipeImage}
        />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.authorName}>Joeman</Text>
        <DidotText style={styles.dishName}>Fruit salad with pudding</DidotText>

        <Text style={styles.description}>
          In a large bowl, XXXIn a large bowl, XXXIn a large bowl, XXXIn a large
          bowl, XXXIn a large bowl, XXXIn a large bowl, XXXIn a large bowl,
          XXXIn a large bowl, XXXIn a large bowl, XXXIn a large bowl, XXXIn a
          large bowl, XXX
        </Text>
        <View style={styles.pointContainer}>
          <View style={styles.point}>
            <Text style={styles.pointFirstLine}>30min</Text>
            <Text style={styles.pointSecondLine}>Time</Text>
          </View>
          <View style={styles.point}>
            <Text style={styles.pointFirstLine}>780cal</Text>
            <Text style={styles.pointSecondLine}>Calorie</Text>
          </View>
          <View style={styles.point}>
            <Text style={styles.pointFirstLine}>Easy</Text>
            <Text style={styles.pointSecondLine}>Difficulty</Text>
          </View>
        </View>
        <View>
          <DidotText style={styles.ingredientTitle}>Ingredient</DidotText>
          <View style={styles.ingredientDetailContainer}>
            <Text style={styles.ingredientName}>Peach slice</Text>
            <DidotText style={styles.ingredientWeight}>400g</DidotText>
          </View>
          <View style={styles.ingredientDetailContainer}>
            <Text style={styles.ingredientName}>Peach slice</Text>
            <DidotText style={styles.ingredientWeight}>400g</DidotText>
          </View>
        </View>
      </View>
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
    width: "100%",
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
  },
  ingredientWeight: {
    fontWeight: 600,
  },
});
