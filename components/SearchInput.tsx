import React from "react";
import { StyleSheet } from "react-native";
import EvilIcons from "@expo/vector-icons/EvilIcons";

import { Text, View } from "@/components/Themed";
import { useThemeColor } from "@/components/Themed";

export default function SearchInput({ hint }: { hint: string }) {
  return (
    <View style={styles.searchInputContainer}>
      <EvilIcons size={20} style={{ marginRight: 3 }} name="search" />
      <Text>{hint}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: useThemeColor({}, "inputBg"),
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
    marginBottom: 4,
  },
});
