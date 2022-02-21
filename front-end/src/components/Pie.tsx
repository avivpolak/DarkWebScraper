import React, { useState, ComponentProps } from "react";
import { PieChart } from "react-minimal-pie-chart";

type Props = {
    data: ComponentProps<typeof PieChart>["data"];
};

function Pie(props: Props) {
    const [selected, setSelected] = useState<number | undefined>(undefined);
    const [hovered, setHovered] = useState<number | undefined>(undefined);

    const data = props.data.map((entry, i) => {
        if (hovered === i) {
            return {
                ...entry,
                color: "grey",
            };
        }
        return entry;
    });

    const lineWidth = 60;

    return (
        <PieChart
            style={{
                fontFamily:
                    '"Nunito Sans", -apple-system, Helvetica, Arial, sans-serif',
                fontSize: "2px",
            }}
            data={data}
            radius={PieChart.defaultProps.radius - 35}
            lineWidth={100}
            segmentsStyle={{ transition: "stroke .3s", cursor: "pointer" }}
            segmentsShift={(index) => (index === selected ? 6 : 1)}
            animate
            label={({ dataEntry }) =>
                `${dataEntry.title} ${Math.round(dataEntry.percentage)}%`
            }
            labelPosition={170 - lineWidth / 2}
            labelStyle={{
                fill: "#fff",
                opacity: 0.75,
                pointerEvents: "none",
            }}
            onClick={(_, index) => {
                setSelected(index === selected ? undefined : index);
            }}
            onMouseOver={(_, index) => {
                setHovered(index);
            }}
            onMouseOut={() => {
                setHovered(undefined);
            }}
        />
    );
}

export default Pie;
