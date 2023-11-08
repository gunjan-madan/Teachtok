import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  Image,
  ImageBackground,
} from "react-native";
import CountDown from "react-native-countdown-component";
import search from "../assets/search-grey.png";
import heart from "../assets/heart.png";
import share from "../assets/share.png";
import comment from "../assets/comment.png";
import activity from "../assets/activity.png";
import bookmark from "../assets/bookmarks.png";
import playlist from "../assets/playlist.png";
import up from "../assets/up.png";
import down from "../assets/down.png";
import arrow from "../assets/arrow.png";
const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;
const HomeScreen = () => {
  const [mcq, setMcq] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [activityCount, setActivityCount] = useState(0);
  const [heartCount, setHeartCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [shareCount, setShareCount] = useState(0);
  const [quesId, setQuesId] = useState("");
  const [rtAnsId, setRtAnsId] = useState("");
  const [choseAnsId, setChoseAnsId] = useState("");
  const [isCheckAnswer, setIsCheckAnswer] = useState(false);
  //   const [bgColor, setBgColor] = useState("rgba(82, 82, 82, 0.8)");

  useEffect(() => {
    LoadQuestion();
  }, []);

  const LoadQuestion = async () => {
    try {
      const response = await fetch(
        "https://cross-platform.rp.devfactory.com/for_you"
      );
      const data = await response.json();
      setIsCheckAnswer(false);
      setMcq(data);
      setQuesId(data["id"]);
      setAnswers(data["options"]);
    } catch (error) {
      console.log("Error " + error);
    }
  };

  const checkAnswer = async (answer) => {
    console.log(answer);
    setRtAnsId("");
    try {
      const response = await fetch(
        "https://cross-platform.rp.devfactory.com/reveal?id=" + quesId
      );
      const data = await response.json();
      const rightAnswer = answers.filter((item) => {
        return item.id == data["correct_options"][0]["id"];
      });
      setIsCheckAnswer(true);
      setChoseAnsId(answer);
      setRtAnsId(rightAnswer[0]["id"]);
      setTimeout(() => {
        LoadQuestion();
      }, 1000);
    } catch (error) {
      console.log("Error " + error);
    }
  };

  return (
    <>
      {mcq && answers && (
        <View style={{ display: "flex", flex: 1 }}>
          <ImageBackground
            resizeMode="stretch"
            style={[styles.image]}
            source={{
              uri: "https://cross-platform-rwa.rp.devfactory.com/images/2979%20-%20german%20and%20irish%20immigrant%20groups.png",
            }}
          >
            <View style={[styles.container]}>
              <View style={[styles.countDown]}>
                <CountDown
                  timeToShow={["M"]}
                  timeLabels={{ m: "m" }}
                  digitStyle={{
                    color: "white",
                  }}
                ></CountDown>
              </View>
              <View style={[styles.text]}>
                <Text style={{ color: "white" }}>For you</Text>
              </View>
              <View style={{ width: 20 }}>
                <Image
                  source={search}
                  style={{ width: 30, height: 30 }}
                ></Image>
              </View>
            </View>
            <View>
              <Text style={[styles.question]}>{mcq["question"]}</Text>
            </View>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                flex: 1,
                padding: 10,
                width: 360,
              }}
            >
              <View style={{ width: 80, flex: 1 }}>
                {answers &&
                  answers.map((item, id) => {
                    return (
                      <Text
                        style={[
                          !isCheckAnswer
                            ? styles.answer
                            : item?.id == rtAnsId
                            ? styles.rightanswer
                            : item?.id == choseAnsId
                            ? styles.wronganswer
                            : styles.answer,
                        ]}
                        onPress={() => {
                          !isCheckAnswer && checkAnswer(item?.["id"]);
                        }}
                        key={id}
                      >
                        {answers && item?.answer}
                        {item?.id == choseAnsId &&
                          rtAnsId == choseAnsId &&
                          isCheckAnswer && (
                            <Image
                              source={up}
                              style={{ width: 30, height: 30 }}
                            ></Image>
                          )}
                        {item?.id == choseAnsId &&
                          item?.id !== rtAnsId &&
                          isCheckAnswer && (
                            <Image
                              source={down}
                              style={{ width: 30, height: 30 }}
                            ></Image>
                          )}
                      </Text>
                    );
                  })}
              </View>

              <View style={{ width: 80, paddingLeft: 30 }}>
                <View>
                  <Image
                    source={activity}
                    style={{ width: 30, height: 30 }}
                  ></Image>
                  <View style={{ paddingLeft: "30" }}>
                    <Text style={{ color: "white" }}>{activityCount}</Text>
                  </View>
                </View>
                <View>
                  <Image
                    source={heart}
                    style={{ width: 30, height: 30 }}
                  ></Image>
                  <View style={{ paddingLeft: "30" }}>
                    <Text style={{ color: "white" }}>{heartCount}</Text>
                  </View>
                </View>

                <View>
                  <Image
                    source={comment}
                    style={{ width: 30, height: 30 }}
                  ></Image>
                  <View style={{ paddingLeft: "30" }}>
                    <Text style={{ color: "white" }}>{commentCount}</Text>
                  </View>
                </View>
                <View>
                  <Image
                    source={bookmark}
                    style={{ width: 30, height: 30 }}
                  ></Image>
                  <View style={{ paddingLeft: "30" }}>
                    <Text style={{ color: "white" }}>{shareCount}</Text>
                  </View>
                </View>
                <View>
                  <Image
                    source={share}
                    style={{ width: 30, height: 30 }}
                  ></Image>
                  <View style={{ paddingLeft: "30" }}>
                    <Text style={{ color: "white" }}>{commentCount}</Text>
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                position: "absolute",
                bottom: 40,
                padding: 10,
                width: 360,
              }}
            >
              <Text style={{ color: "white", textAlign: "left", width: 300 }}>
                {mcq["user"] && mcq["user"].name}
              </Text>
              <Text style={{ color: "white", textAlign: "left", width: 300 }}>
                {mcq["description"]}
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
                bottom: 0,
                padding: 10,
                backgroundColor: "rgba(0, 0 , 0, 0.8)",
                width: 420,
              }}
            >
              <Image
                source={playlist}
                style={{ width: 30, height: 30 }}
              ></Image>
              <Text style={[styles.playlist]}>
                Playlist Unit 5:{mcq["playlist"]}
              </Text>
              <Image source={arrow} style={{ width: 20, height: 20 }}></Image>
            </View>
          </ImageBackground>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingLeft: 10,
    width: 400,
    display: "flex",
    flexDirection: "row",
  },
  question: {
    color: "white",
    fontWeight: "bold",
    fontSize: 26,
    padding: 20,
    width: 400,
    zIndex: 1,
    textAlign: "left",
    minHeight: 50,
  },
  answer: {
    color: "white",
    textAlign: "left",
    backgroundColor: "rgba(82, 82, 82, 0.8)",
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    width: 280,
    minHeight: 50,
    fontSize: 18,
  },
  rightanswer: {
    color: "white",
    textAlign: "left",
    backgroundColor: "rgba(0, 82, 0, 0.8)",
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    width: 280,
    minHeight: 50,
    fontSize: 18,
  },
  wronganswer: {
    color: "white",
    textAlign: "left",
    backgroundColor: "rgba(82, 0, 0, 0.8)",
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    width: 280,
    minHeight: 50,
    fontSize: 18,
  },
  image: {
    flex: 1,
    height: screenHeight,
    width: screenWidth,
    justifyContent: "center",
    alignItems: "center",
    zIndex: -1,
  },
  countDown: {
    width: 50,
  },
  playlist: { color: "white", width: 330 },
  text: {
    width: 300,
    paddingLeft: 130,
    paddingTop: 10,
    color: "white",
  },
});

export default HomeScreen;
