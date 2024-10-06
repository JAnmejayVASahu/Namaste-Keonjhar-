import { View, Text, Image } from "react-native";
import React from "react";
import AuthContainer from "@/utils/container/auth-container";
import { windowHeight } from "@/themes/app.constant";
import SignInText from "@/components/login/signin.text";
import { external } from "@/styles/external.style";
import styles from "./styles";
import Images from "@/utils/images";
import PhoneNumberInput from "@/components/login/phone-number.input";
import Button from "@/components/common/button";
import { router } from "expo-router";

export default function LoginScreen() {
  return (
      <AuthContainer
        topSpace={windowHeight(150)}
        imageShow={true}
        container={
          <View>
            <View>
              <View>
                <Image style={styles.transformLine} source={Images.line} />
                <SignInText />
                <View style={[external.mt_25, external.Pb_10]}>
                  <PhoneNumberInput />
                </View>
                <View style={[external.mt_25, external.Pb_15]}>
                  <Button
                    title="Get OTP"
                    onPress={() => router.push("/(routes)/otp-verification")}
                  />
                </View>
              </View>
            </View>
          </View>
        }
      />
  );
}
