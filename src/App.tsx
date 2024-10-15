/*global chrome*/
import { useState, useEffect } from "react";
import "./App.css";
import { CircularProgress } from "./components/CircularProgress/CircularProgress";
import { Card } from "./components/Card/Card";
import { Button } from "./components/Button/Button";
import { Header } from "./components/Header/Header";
import { FaGear } from "react-icons/fa6";


function App() {
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionCount, setConnectionCount] = useState(0);

  useEffect(() => {
    // Listener to receive messages from content.js
    chrome.runtime.onMessage.addListener((message) => {
      if (message.type === "updateCount") {
        setConnectionCount(prevCount => prevCount + 1);
      }
    });

    // Clean up the listener when the component unmounts
    return () => {
      chrome.runtime.onMessage.removeListener(() => {});
    };
  }, []);

  const handleStart = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        if (!isConnecting) {
          // Start connecting
          chrome.scripting.executeScript({
            target: { tabId: tabs[0].id! },
            files: ["content.js"],
          });

          setIsConnecting(true);
        } else {
          // Stop connecting
          chrome.scripting.executeScript({
            target: { tabId: tabs[0].id! },
            func: stopConnecting,
          });

          setIsConnecting(false);
        }
      }
    });
  };

  // Stop function for content script
  const stopConnecting = () => {
    chrome.runtime.sendMessage({ type: "stopConnecting" });
  };

  return (
    <div className="App">
      <Card>
        <div className="content-wrapper">
          <Header title="LinkedIn AutoConnect" icon={<FaGear />} />
          <div>
            <p className="title">Invitations Sent</p>{" "}
          </div>
          <CircularProgress value={connectionCount} />
          <Button
            title={isConnecting ? "Stop Connecting" : "Start Connecting"}
            onClick={handleStart}
            className={isConnecting ? "button-stop" : "button-start"}
          />
        </div>
      </Card>
    </div>
  );
}

export default App;
