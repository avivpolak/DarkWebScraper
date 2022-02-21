import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import Pie from "./Pie";

export const Dashboard = () => {
    const [stats, setStats] = useState([]);

    const updateStats = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/stats`);
            if (response.data) {
                setStats(response.data.data);
            }
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        updateStats();
    }, []);

    return (
        <div>
            <Header />
            <div className="pie">
            <Pie data={stats} />
            </div>
           
        </div>
    );
};

export default Dashboard;
