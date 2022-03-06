import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import CustomScrape from "./components/CustomScrape";
import LiveData from "./components/LiveData";
import Home from "./components/Home";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useStore } from "react-redux";
import { useInterval } from "./hooks/useInterval";
import { add, Paste } from "./features/paste/pasteSlice";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import Alerts from "./components/Alerts";
import KeyWords from "./components/KeyWords";
import { objectTraps } from "immer/dist/internal";
import { addAlert } from "./features/alerts/alertsSlice";
import { config } from "./axois";

function App() {
    const notyf = new Notyf({
        types: [
            {
                type: "error",
                background: "indianred",
                duration: 4000,
                dismissible: true,
                position: { x: "right", y: "top" },
            },
            {
                type: "success",
                background: "green",
                duration: 4000,
                dismissible: true,
                position: { x: "right", y: "top" },
            },
            {
                type: "alert",
                background: "yellow",
                duration: 4000,
                dismissible: true,
                position: { x: "right", y: "top" },
            },
        ],
    });
    const [pageNumber, setPageNumber] = useState(0);
    const store = useStore().getState();
    const pastes = store.pasteReducer;
    const dispatch = useDispatch();
    const [lastUpdate, setLastUpdate] = useState(
        new Date().toLocaleDateString()
    );
    const searchForAlert = (data: Paste[]) => {
        const keyWords = store.KeyWordsReducer;
        for (let paste of data) {
            for (let value of Object.values(paste)) {
                for (let keyword of keyWords) {
                    if (Array.isArray(value)) {
                    } else {
                        if (
                            value.toLowerCase().includes(keyword.toLowerCase())
                        ) {
                            dispatch(
                                addAlert({ isFullMatch: true, paste, keyword })
                            );
                        }
                    }
                }
            }
        }
    };
    const [pasteCounter, setPasteCounter] = useState(0);

    // useInterval(() => {
    //     updateData();
    // }, 10000);
    // const updateData = async () => {
    //     try {
    //         // const response = await axios.post(
    //         //     `http://localhost:8080/`,
    //         //     { pageNumber },
    //         //     config
    //         // );
    //         // setPasteCounter(response.data.data.length);
    //         // dispatch(add(response.data.data));
    //         // setLastUpdate(new Date().toLocaleTimeString());
    //         // searchForAlert(response.data.data);
    //     } catch (err) {}
    // };

    // useEffect(() => {
    //     updateData();
    // }, []);
    useEffect(() => {
        const newPastesCount = pasteCounter - pastes.length;
        if (newPastesCount) {
            notyf.success(`I just found ${newPastesCount} new pastes`);
        }
    }, [pasteCounter]);

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/CustomScrape" element={<CustomScrape />} />
                    <Route path="/LiveData" element={<LiveData />} />
                    <Route path="/Alerts" element={<Alerts />} />
                    <Route path="/KeyWords" element={<KeyWords />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
