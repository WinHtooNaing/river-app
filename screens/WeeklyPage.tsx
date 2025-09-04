import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Dimensions, ActivityIndicator } from "react-native";
import { LineChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

type Level = {
  _id: number;
  maxDistance: number;
};

export default function WeeklyPage() {
  const [levels, setLevels] = useState<Level[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWaterLevels() {
      try {
        const response = await fetch(
          "https://smart-river-indicator-system-backend.onrender.com/distance/weekly"
        );
        const data = await response.json();
        setLevels(data);
      } catch (e) {
        setLevels([]);
      } finally {
        setLoading(false);
      }
    }

    fetchWaterLevels();
    const interval = setInterval(fetchWaterLevels, 300000); // 5 mins
    return () => clearInterval(interval);
  }, []);

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const todayIdx = new Date().getDay();
  const days = Array.from({ length: 7 }, (_, i) => weekDays[(todayIdx + i) % 7]);

  // Map API data to days
  const data =
    levels.length === 7
      ? levels.map((item, idx) => ({
          day: days[idx],
          cm: 16 - item.maxDistance,
        }))
      : days.map((day) => ({
          day,
          cm: 0,
        }));

  // Y axis fixed ticks
  const fixedTicks = [2, 4, 6, 8, 10, 12, 14, 16];

  const chartData = {
    labels: data.map((item) => item.day),
    datasets: [
      {
        data: data.map((item) => item.cm),
        color: (opacity = 1) => `rgba(59,130,246,${opacity})`,
        strokeWidth: 3,
      },
    ],
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 16 }}>
          တစ်ပတ်တာ မြစ်ရေအခြေအနေ
        </Text>
        {loading ? (
          <ActivityIndicator size="large" color="#3b82f6" />
        ) : (
          <LineChart
            data={chartData}
            width={screenWidth - 32}
            height={300}
            yAxisSuffix=" cm"
            withVerticalLabels
            yAxisInterval={1}
            segments={8} 
            chartConfig={{
              backgroundColor: "#ffffff",
              backgroundGradientFrom: "#f9fafb",
              backgroundGradientTo: "#f9fafb",
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "5",
                strokeWidth: "2",
                stroke: "#3b82f6",
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
            fromZero
            yLabelsOffset={10}
          />
        )}
      </View>
      <Text style={{textAlign : "center",fontSize:16,fontWeight : 700,color : "red",paddingBottom:10}}>သတိပြုရန်</Text>
      <Text style={{textAlign : "center",fontSize:14,fontWeight : 500}}>မြစ်ရေအခြေအနေသည် အမြင့်ဆုံး 16 cm အထိရှိသည်။</Text>
    </ScrollView>
  );
}
