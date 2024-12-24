import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigate } from "react-router-native";
import { safeGet } from "../src/utils";
import styles from "./styles";

const Patents = ({ userData, titles }) => {
  const navigate = useNavigate();

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Patents</Text>
      <View style={styles.card}>
        {userData.Patents && userData.Patents.length > 0 ? (
          userData.Patents.map((patent, index) => {
            const patentCode = safeGet(patent, "patentCode");
            const titleKey = `patent-${patentCode}`;
            return (
              <View key={index} style={styles.buttonContainer}>
                <Text style={styles.indexText}>{index + 1}.</Text>
                <TouchableOpacity
                  onPress={() =>
                    navigate(`/data/IntellectualPropertyDetail/${patentCode}`)
                  }
                  style={[
                    styles.button,
                    !titles[titleKey] && styles.disabledButton,
                  ]}
                  disabled={!titles[titleKey]}
                >
                  <Text style={styles.buttonText}>
                    {titles[titleKey] || "Loading..."}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })
        ) : (
          <Text style={styles.sectionContent}>No Patents available.</Text>
        )}
      </View>
    </View>
  );
};

export default Patents;