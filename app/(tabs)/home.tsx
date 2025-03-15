import { StyleSheet, Pressable, Image, Dimensions } from "react-native";
import { useNavigation, useRouter } from "expo-router";
import { useLayoutEffect, useRef, useState } from "react";
import { useSharedValue } from "react-native-reanimated";
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";

import Colors from "@/constants/Colors";
import { Text, View } from "@/components/Themed";
import SearchInput from "@/components/SearchInput";
import RecipeListCategory from "@/components/RecipeListCategory";
import { DidotText } from "@/components/StyledText";
import { useThemeColor } from "@/components/Themed";
import { useColorScheme } from "@/components/useColorScheme";
import { RECIPES } from "@/data/dummy-data";

export default function HomeScreen() {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const router = useRouter();
  const { width: viewportWidth } = Dimensions.get("window");
  const sliderWidth = viewportWidth;
  const [carouselIndex, setCarouselIndex] = useState<number | null>(1);
  const carouselRef = useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);

  const newList = RECIPES.sort((a, b) => {
    return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime();
  }).slice(0, 4);

  const onPressPagination = (index: number) => {
    setCarouselIndex(index + 1);
    carouselRef.current?.scrollTo({
      /**
       * Calculate the difference between the current index and the target index
       * to ensure that the carousel scrolls to the nearest index
       */
      count: index - progress.value,
      animated: true,
    });
  };
  function goToRecipePage(recipeID: string) {
    router.replace(`/recipeDetail/${recipeID}`);
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

  function carouselItem({ item }) {
    return (
      <Pressable
        key={item.id}
        android_ripple={{ color: "#ccc" }}
        style={({ pressed }) => (pressed ? styles.buttonPressed : null)}
        onPress={() => goToRecipePage(item.id)}
      >
        <View style={styles.newImageContainer}>
          <Image source={item.imageUrl} style={styles.newImage} />
        </View>
      </Pressable>
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
          <DidotText style={styles.title}>New</DidotText>
          <Text>
            {carouselIndex}/{newList.length}
          </Text>
        </View>
        <View style={styles.carouselContainer}>
          <Carousel
            ref={carouselRef}
            width={sliderWidth}
            height={200}
            data={newList}
            onProgressChange={progress}
            renderItem={carouselItem}
          />

          <Pagination.Basic
            progress={progress}
            data={newList}
            dotStyle={{ backgroundColor: "rgba(0,0,0,0.2)", borderRadius: 50 }}
            containerStyle={{ gap: 5, marginTop: 10 }}
            onPress={onPressPagination}
          />
        </View>
      </View>
      <View style={styles.recipeListContainer}>
        <DidotText style={styles.title}>Recipe List</DidotText>
        <RecipeListCategory />
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
    height: 380,
  },
  title: {
    fontWeight: 700,
    fontSize: 24,
    marginBottom: 8,
  },
  todayTextContainer: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  carouselContainer: {
    overflow: "hidden",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  newImageContainer: {
    position: "relative",
    width: "100%",
    height: 200,
  },
  newImage: {
    width: "100%",
    height: "100%",
  },
  buttonPressed: {
    opacity: 0.7,
  },
});
