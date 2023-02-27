import "./styles/passAnalysis.css";
import CompanySelector from "./CompanySelector";
import { useState, useEffect } from "react";
import {
    BarChart,
    Bar,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    LabelList,
    Label,
} from "recharts";
import companies from './datasets/companies.json'

const months = ["Jan","Feb", "Mar", "Apr", "May","Jun", "Jul", "Aug", "Sep", "Oct", "Nov","Dec" ];
// { date: "Dec", uv: 250 },


function PassAnalysis() {
    const [selectedStationComp, setSelectedStationComp] = useState(
        companies[0]
    );
    const [selectedTagComp, setSelectedTagComp] = useState(companies[1]);
    const [chartData, setChartData] = useState(null);

    const formatChartData = (obj) => {
        obj.forEach((pass, index) => {
            obj[index] = { date: months[index], uv: obj[index] };
        })
        return obj;
    };

    // get passes per month for last year between selectedStationComp and selectedTagComp
    const fetchMonthlyPasses = () => {
        setChartData(null);

        fetch(
            `http://localhost:9103/interoperability/api/YearlyPassesCount/${selectedStationComp.title}/${selectedTagComp.title}/20210101/20220101?format=json`
        )
            .then((res) => res.json())
            .then((response) => setChartData(formatChartData(response.PassesPerMonth)))
            .catch((err) => {
                alert("Something went wrong.");
            });
    };

    useEffect(fetchMonthlyPasses, [selectedStationComp, selectedTagComp]);

    return (
        <div className="companyBalanceContainer">
            <p style={{ top: 0, textAlign: "center", color: "black" }}>
                Plot last year's pass analysis between two operators
            </p>
            <div
                style={{
                    flex: 1,
                    width: "100%",
                    // backgroundColor: "red",
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "nowrap",
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                <div className="titleBox">
                    <p className="titleText">Station operator:</p>
                    <CompanySelector
                        companies={companies}
                        setSelectedComp={setSelectedStationComp}
                        selectedComp={selectedStationComp}
                    />
                </div>
                <div style={{ width: 30 }}></div>
                <div className="titleBox">
                    <p className="titleText">Tag operator:</p>
                    <CompanySelector
                        companies={companies}
                        setSelectedComp={setSelectedTagComp}
                        selectedComp={selectedTagComp}
                    />
                </div>
            </div>
            <div
                style={{
                    flex: 5,
                    padding: 20,
                    marginTop: 20,
                    display: "flex",
                    backgroundColor: "white",
                    flexDirection: "column",
                    borderRadius: "1vw",
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                <p
                    style={{
                        color: "black",
                        fontFamily: "Roboto",
                        fontWeight: 700,
                    }}>
                    2021
                </p>
                <BarChart width={900} height={250} margin={{ top: 35, right: 5, bottom: 5, left: 5 }} data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Bar dataKey="uv" fill="black">
                        <LabelList dataKey="uv" position="top" />
                    </Bar>
                </BarChart>
            </div>
        </div>
    );
}

export default PassAnalysis;
