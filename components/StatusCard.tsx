import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function StatusCard({ status }: { status: "danger" | "warning" | "safe" }) {
  const colorMap = {
    danger: { border: "red", bg: "#fee2e2", text: "red" },
    warning: { border: "orange", bg: "#fef3c7", text: "orange" },
    safe: { border: "green", bg: "#d1fae5", text: "green" },
  };

  const labelMap = {
    danger: "အရေးပေါ် အခြေအနေ",
    warning: "သတိပြုရန် အခြေအနေ",
    safe: "ပုံမှန် အခြေအနေ",
  };

  const colors = colorMap[status];

  return (
    <>
    <View style={[styles.card, { borderColor: colors.border, backgroundColor: colors.bg }]}>
      <Text style={{ color: colors.text, fontWeight: "bold" }}>
        {labelMap[status]}
      </Text>
    </View>
    
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 2,
    padding: 10,
    borderRadius: 8,
  },
});
