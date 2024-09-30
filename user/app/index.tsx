import { View, Text } from "react-native";
import React, { useState } from "react";
import { Redirect } from "expo-router";

export default function index() {
  const [isLogedin, setIsLogedin] = useState(false);
  return (
    <Redirect href={!isLogedin ? "/(routes)/onboarding" : "/(tabs)/home"} />
  );
}
