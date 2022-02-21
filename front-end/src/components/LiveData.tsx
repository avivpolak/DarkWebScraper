import React, { useRef } from "react";

// react-bootstrap components
import {
    Badge,
    Button,
    Card,
    Navbar,
    Nav,
    Table,
    Container,
    Row,
    Col,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { useInterval } from "../hooks/useInterval";
import { useStore } from "react-redux";
import { Paste } from "../features/paste/pasteSlice";
import Header from "./Header";
import SearchBar from "./SearchBar";

const LiveData = () => {
    const [searchWord, setSearchWord] = useState("");
    const store = useStore().getState();
    const [data, setData] = useState(store.pasteReducer);
    console.log(data)
    useEffect(() => {
        console.log(searchWord)
        setData(
            store.pasteReducer.filter((paste: Paste) => filterByQuery(paste, searchWord))
        );
    }, [searchWord]);

    return (
        <>
            <Header />
            <SearchBar setSearchWord={setSearchWord} />
            <Container fluid>
                <Row>
                    <Col md="12">
                        <Card className="strpied-tabled-with-hover">
                            <Card.Header>
                                <Card.Title as="h4">Live Data </Card.Title>
                                <p className="card-category">
                                    {/* lastUpdated: {lastUpdate} */}
                                </p>
                            </Card.Header>
                            <Card.Body className="table-full-width table-responsive px-0">
                                <Table className="table-hover table-striped">
                                    <thead>
                                        <tr>
                                            <th className="border-0">title</th>
                                            <th className="border-0">labels</th>
                                            <th className="border-0">author</th>
                                            <th className="border-0">date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((item: Paste, i: number) => (
                                            <tr key={i}>
                                                <td>{item.title}</td>
                                                <td>{item.labels}</td>
                                                <td>{item.author}</td>
                                                <td>{item.date}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default LiveData;

const filterByQuery = (paste: Paste, query: string) => {
    query = query.toLowerCase();
    if (
        paste.author.toLowerCase().includes(query) ||
        paste.title.toLowerCase().includes(query) ||
        filterByLabels(paste.labels, query) ||
        paste.date.toLowerCase().includes(query)
    ) {
        return true;
    }
    return false;
};
const filterByLabels = (labels: string[], query: string) => {
    return labels.length > 0 && labels[0].toLowerCase().includes(query);
};
