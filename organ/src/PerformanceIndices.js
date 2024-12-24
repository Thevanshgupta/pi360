import React from "react";
import { View, Text, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { safeGet } from "../src/utils";
import styles from "./styles";

const PerformanceIndices = ({ userData }) => {
  const chartWidth = Dimensions.get("window").width - 40;

  // Get the current year
  const currentYear = new Date().getFullYear();

  // Create an array of the last 5 years in reverse order
  const years = [];
  for (let i = 4; i >= 0; i--) {
    years.push((currentYear - i).toString());
  }

  // Dynamically create performanceData from userData
  const performanceData = {};
  const categories = [
    "Academics",
    "Achievements",
    "Research",
    "StaffDevelopment",
  ];

  // Initialize performanceData with categories and years
  categories.forEach((category) => {
    performanceData[category] = {};
    years.forEach((year) => {
      performanceData[category][year] = 0; // Initialize with 0
    });
  });

  // Fetch data for the current year from userData
  categories.forEach((category) => {
    const path = `Performance${category}.average_index`;
    const value = parseFloat(safeGet(userData, path, "0"));
    performanceData[category][currentYear.toString()] = value;
  });

  const chartColors = {
    Academics: "#FFA726", // Orange
    Achievements: "#66BB6A", // Green
    Research: "#42A5F5", // Blue
    "StaffDevelopment": "#7E57C2", // Purple
  };

  // Function to create chart configuration
  const createChartConfig = (yAxisInterval) => ({
    backgroundColor: "#F0F0F0",
    backgroundGradientFrom: "#FAFAFA",
    backgroundGradientTo: "#FFFFFF",
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: "5",
      strokeWidth: "2",
      stroke: "#000",
    },
    propsForBackgroundLines: {
      strokeWidth: 0.5,
      stroke: "#C0C0C0",
      strokeDasharray: "",
    },
    propsForLabels: {
      fontSize: 10,
      fontWeight: "bold",
    },
    yAxis: {
      min: 0,
      max: 5,
      fromZero: true,
      segments: 5,
      interval: yAxisInterval,
      labelCount: 6,
      labelStyle: {
        color: "#000",
        fontSize: 10,
        fontWeight: "bold",
      },
    },
    xAxis: {
      labelStyle: {
        color: "#000",
        fontSize: 10,
        fontWeight: "bold",
      },
    },
  });

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Performance Indices</Text>
      <View style={styles.card}>
        {/* Combined Line Chart */}
        <View style={{ marginBottom: 20 }}>
          <Text style={[styles.sectionContent, { fontWeight: "bold", textAlign: 'center' }]}>
            Overall Performance
          </Text>
          {/* Legend for Combined Chart */}
          <View style={{ flexDirection: "row", justifyContent: "center", flexWrap: 'wrap' }}>
            {Object.keys(chartColors).map((category) => (
              <View key={category} style={{ flexDirection: "row", alignItems: "center", marginRight: 10 }}>
                <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: chartColors[category], marginRight: 5 }} />
                <Text style={{ fontSize: 12 }}>{category}</Text>
              </View>
            ))}
          </View>
          <LineChart
            data={{
              labels: years,
              datasets: Object.keys(performanceData).map((category) => ({
                data: years.map((year) => performanceData[category][year]),
                color: (opacity = 1) => chartColors[category],
                strokeWidth: 2,
              })),
            }}
            width={chartWidth}
            height={300}
            yAxisInterval={1}
            fromZero={true}
            segments={5}
            chartConfig={createChartConfig(1)}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </View>

        {/* Individual Line Charts */}
        {Object.keys(performanceData).map((category) => (
          <View key={category} style={{ marginTop: 20 }}>
            <Text
              style={[styles.sectionContent, { color: chartColors[category] }]}
            >
              {category} 
            </Text>
            <LineChart
              data={{
                labels: years,
                datasets: [
                  {
                    data: years.map((year) => performanceData[category][year]),
                    color: (opacity = 1) => chartColors[category],
                    strokeWidth: 2,
                  },
                ],
              }}
              width={chartWidth}
              height={220}
              yAxisInterval={1}
              fromZero={true}
              segments={5}
              chartConfig={createChartConfig(1)}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

export default PerformanceIndices;