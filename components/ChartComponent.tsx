import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import RiverLevelIndicator from "./RiverLevelIndicator";

export default function ChartComponent() {
  const [level, setLevel] = useState(0); // cm
const [loading, setLoading] = useState(true);
useEffect(() => {
    async function fetchWaterLevel() {
      try {
        const response = await fetch(`https://smart-river-indicator-system-backend.onrender.com/distance/latest`);
        const data = await response.json();
        setLevel(data.distance);
      } catch (e) {
        setLevel(0);
      } finally {
        setLoading(false);
      }
    }

    fetchWaterLevel();

    const interval = setInterval(fetchWaterLevel, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, []);

  const labels = ["မြေပြင်",1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];

  return (
   <View style={styles.wrapper}>
      {loading ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color="#3b82f6" />
        </View>
      ) : (
        <View style={styles.chartRow}>
          <View style={{ flex: 1 }}>
            <RiverLevelIndicator value={level} />
          </View>
          <View style={styles.labels}>
            {labels.map((label) => (
              <Text key={label} style={styles.labelText}>
                {label} {label === "မြေပြင်" ? "" : "cm"}
              </Text>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#d1d5db",
    height: 300,
  },
  chartRow: {
    flexDirection: "row",
    flex: 1,
    gap: 10,
  },
  labels: {
    justifyContent: "space-between",
    paddingLeft: 5,
  },
  labelText: {
    fontSize: 12,
    color: "#374151",
  },
});
