import { StyleSheet, Pressable, Image } from "react-native";
import { useNavigation } from "expo-router";
import { useLayoutEffect } from "react";

import Colors from "@/constants/Colors";
import { Text, View } from "@/components/Themed";
import SearchInput from "@/components/SearchInput";
import RecipeListCategory from "@/components/RecipeListCategory";
import { DidotText } from "@/components/StyledText";
import { useThemeColor } from "@/components/Themed";
import { useColorScheme } from "@/components/useColorScheme";

export default function HomeScreen() {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();

  function goToRecipePage() {
    navigation.navigate("recipeDetail");
  }

  function LogoTitle() {
    return (
      <DidotText
        style={{
          color: Colors[colorScheme ?? "light"].tint,
          fontSize: 28,
          fontWeight: 600,
        }}
      >
        Foodie Circle
      </DidotText>
    );
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => {
        return <LogoTitle />;
      },
    });
  }, [navigation, useThemeColor]);

  return (
    <View style={styles.pageContainer}>
      <SearchInput hint="Find a recipe..." />
      <View>
        <View style={styles.todayTextContainer}>
          <DidotText style={styles.title}>Today</DidotText>
          <Text>1/3</Text>
        </View>
        <View>
          <Pressable
            android_ripple={{ color: "#ccc" }}
            style={({ pressed }) => (pressed ? styles.buttonPressed : null)}
            onPress={goToRecipePage}
          >
            <View style={styles.todayImageContainer}>
              <Image
                source={require("@/assets/images/today_cover1.png")}
                style={styles.todayImage}
              />
            </View>
          </Pressable>
        </View>
      </View>
      <View style={styles.recipeListContainer}>
        <DidotText style={styles.title}>Recipe List</DidotText>
        <RecipeListCategory />
      </View>
      <View>
        <Pressable style={styles.viewMoreBtn}>
          <Text style={styles.viewMoreBtnText}>View more</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    padding: 16,
  },
  sectionContainer: {
    marginVertical: 4,
  },
  recipeListContainer: {
    marginTop: 30,
    height: 330,
  },
  title: {
    fontWeight: 700,
    fontSize: 24,
    marginBottom: 8,
  },
  viewMoreBtn: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#c2c2c244",
    borderRadius: 100,
    paddingVertical: 8,
    marginVertical: 8,
  },
  viewMoreBtnText: {
    textAlign: "center",
    color: useThemeColor({}, "lightText"),
    fontWeight: 500,
  },
  todayTextContainer: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  todayImageContainer: {
    position: "relative",
    backgroundColor: useThemeColor({}, "primary200"),
    overflow: "hidden",
    width: "100%",
    height: 200,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  todayImage: {
    position: "absolute",
    top: 0,
    left: "50%",
    transform: [{ translateX: "-50%" }, { translateY: 0 }], // Adjust to center
    width: "100%",
  },
  buttonPressed: {
    opacity: 0.5,
  },
});
