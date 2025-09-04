import React from "react";
import { View, StyleSheet } from "react-native";

export default function RiverLevelIndicator({ value }: { value: number }) {


  let color = "red";
  if (value > 6) color = "green";
  else if (value > 3) color = "yellow";

   let latestValue;
  if(value >15){
    latestValue = 1;
  }else{
     latestValue = 15 - value;
  }
  // value ကို % ပြောင်းဖို့ (max 18cm ဆိုပါစို့)
  const percent = Math.min((latestValue / 15) * 100, 100);

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.fill,
          { height: `${percent}%`, backgroundColor: color },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#e5e7eb",
    borderRadius: 8,
    overflow: "hidden",
    justifyContent: "flex-end",
  },
  fill: {
    width: "100%",
  },
});
