import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import AuthContainer from "@/utils/container/auth-container";
import { windowHeight } from "@/themes/app.constant";
import SignInText from "@/components/login/signin.text";
import { external } from "@/styles/external.style";
import styles from "./styles";
import Images from "@/utils/images";
import PhoneNumberInput from "@/components/login/phone-number.input";
import Button from "@/components/common/button";
import { router } from "expo-router";
import { useToast } from "react-native-toast-notifications";
import axios from "axios";
import path from "path";

export default function LoginScreen() {
  const [phone_number, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const toast = useToast();

  const handleSubmit = async () => {
    if (phone_number === "" || countryCode === "") {
      return;
      toast.show("Please enter phone number and country code", {
        placement: "bottom",
      });

    } else {
      console.log(
        "Sending phone number:",
        phone_number,
        "with country code:",
        countryCode
      );

      const phoneNumber = `${countryCode} ${phone_number}`;

      await axios
        .post(`${process.env.EXPO_PUBLIC_SERVER_URI}registration`, {
          phone_number: phoneNumber,
        })
        .then((res) => {
          router.push({pathname : "/(routes)/otp-verification", params : {phoneNumber}});
        })
        .catch((err) => {
          toast.show('Re-Check Your Phone/OTP Number'),
          {
            type: "danger",
            placement: "bottom",
          }
        });
    }
  };

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
                <PhoneNumberInput
                  phone_number={phone_number}
                  setPhoneNumber={setPhoneNumber}
                  countryCode={countryCode}
                  setCountryCode={setCountryCode}
                  width={styles.phoneNumberInput.width}
                />
              </View>
              <View style={[external.mt_25, external.Pb_15]}>
                <Button title="Get OTP" onPress={() => handleSubmit()} />
              </View>
            </View>
          </View>
        </View>
      }
    />
  );
}
