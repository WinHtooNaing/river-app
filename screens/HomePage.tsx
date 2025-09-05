import React from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import ChartComponent from "../components/ChartComponent";
import StatusCard from "../components/StatusCard";

export default function HomePage() {
  return (
    <ScrollView style={{ flex: 1, padding: 10 }}>
      <Text style={styles.heading}>ယနေ့ မြစ်ရေ အခြေအနေ</Text>
      <ChartComponent />

      <View style={{ marginTop: 20, gap: 10 }}>
        <StatusCard status="danger" />
        <StatusCard status="warning" />
        <StatusCard status="safe" />
      </View>
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",

  },
});
