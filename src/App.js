import React, { useState, useEffect } from "react";

import Sidebar from "./Sidebar";
import axios from "axios";
import sendIcon from "./images/send.svg";
import user from "./images/user.png";
import bot from "./images/chatBot.png";
import loadingSvg from "./images/loader.svg";

const App = () => {
  const [userInput, setuserInput] = useState("");
  const [aipost, setaipost] = useState([]);
  const [lightmode, setlightmode] = useState({
    background: "#1c1c25",
  });
  const [lightmodeinInpu, setlightmodeinInpu] = useState({
    background: "#2b2b36",
    color: "#ffff",
  });

  // save all chat in locolstoreg
  useEffect(() => {
    const data = window.localStorage.getItem("MY_CHAT_DATA");
    if (data !== null) setaipost(JSON.parse(data));
  }, []);

  useEffect(() => {
    window.localStorage.setItem("MY_CHAT_DATA", JSON.stringify(aipost));
  }, [aipost]);

  // remove all chat in locolstoreg as well as on display
  const daletData = () => {
    localStorage.clear("MY_CHAT_DATA");
    if (localStorage.length === 0) {
      setaipost([]);
    }
  };

  // handle scroll of apper-loyout class
  useEffect(() => {
    document.querySelector(".apper-loyout").scrollTop =
      document.querySelector(".apper-loyout").scrollHeight;
  }, [aipost]);

  // play api with axios , this api coming form my own server
  const fetchBotResponse = async () => {
    const { data } = await axios.post(
      "https://chat-gpt-server-henna.vercel.app",
      { userInput },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return data;
  };

  const sumbitHandler = () => {
    if (userInput.trim() === "") return;
    updataInputPost(userInput);
    updataInputPost("loading...", false, true);
    setuserInput("");
    fetchBotResponse()
      .then((res) => {
        updataInputPost(res.bot.trim(), true);
      })
  };

  const autuBotResponseInText = (text) => {
    let index = 0;
    let interval = setInterval(() => {
      if (index < text.length) {
        setaipost((preState) => {
          let lastItem = preState.pop();
          if (lastItem.type !== "bot") {
            preState.push({
              type: "bot",
              post: text.charAt(index - 1),
            });
          } else {
            preState.push({
              type: "bot",
              post: lastItem.post + text.charAt(index - 1),
            });
          }
          return [...preState];
        });
        index++;
      } else {
        clearInterval(interval);
      }
    }, 15);
  };

  const updataInputPost = (post, isBot, isLoading) => {
    if (isBot) {
      autuBotResponseInText(post);
    } else {
      setaipost((preState) => {
        return [...preState, { type: isLoading ? "loading" : "user", post }];
      });
    }
  };

  const onKeyUp = (e) => {
    if (e.key === "Enter" || e.which === 13) {
      sumbitHandler();
    }
  };

  return (
    <>
      <main style={lightmode}>
        <Sidebar
          setlightmode={setlightmode}
          setlightmodeinInpu={setlightmodeinInpu}
          daletData={daletData}
        />
        <div className="chatG-app">
          <section className="chatContainer">
            <div className="apper-loyout">
              {aipost.map((postItems, index) => {
                return (
                  <div
                    key={index}
                    className={`chat-input ${
                      postItems.type === "bot" || postItems.type === "loading"
                        ? "bot"
                        : ""
                    }`}
                  >
                    <div className="avatar">
                      <img
                        src={
                          postItems.type === "bot" ||
                          postItems.type === "loading"
                            ? bot
                            : user
                        }
                        alt=""
                      />
                    </div>
                    {postItems.type === "loading" ? (
                      <div className="loader" style={lightmodeinInpu}>
                        <img src={loadingSvg} alt="" />
                      </div>
                    ) : (
                      <div className="post" style={lightmodeinInpu}>
                        {postItems.post}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
          <footer style={lightmodeinInpu}>
            <input
              type="text"
              autoFocus
              placeholder="Ask me anything..."
              className="input-Bar"
              onChange={(e) => {
                setuserInput(e.target.value);
              }}
              value={userInput}
              onKeyUp={onKeyUp}
              style={lightmodeinInpu}
            />
            <button className="sendButton" onClick={sumbitHandler}>
              <img src={sendIcon} alt="" />
            </button>
          </footer>
        </div>
      </main>
    </>
  );
};

export default App;
