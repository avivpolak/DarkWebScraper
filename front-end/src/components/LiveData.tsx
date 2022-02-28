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
import ReactPaginate from "react-paginate";
import { config } from "../axois";
import { DebounceInput } from "react-debounce-input";

const LiveData = () => {
    const [searchWord, setSearchWord] = useState("");
    const [pageNumber, setPageNumber] = useState(3);
    const [pasetsPerPage, setPasetsPerPage] = useState(10);
    const store = useStore().getState();
    const [data, setData] = useState([]);
    const [count, setCount] = useState(0);

    const getCount = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8080/countAll`,
                config
            );

            setCount(response.data);
        } catch (err) {}
    };

    const updateData = async (searchWord: string) => {
        try {
            console.log(`updateData`);
            await getCount();
            const response = await axios.get(
                `http://localhost:8080/?page=${pageNumber}&pasetsPerPage=${pasetsPerPage}&searchWord=${searchWord}`,
                config
            );
            if (response.data.length > 0) {
                setData(response.data);
            } else {
                setData([]);
            }
        } catch (err) {}
    };

    useInterval(() => {
        updateData(searchWord);
    }, 10000);
    useEffect(() => {
        updateData(searchWord);
    }, [pageNumber]);

    const handlePageClick = ({ selected }: any) => {
        setPageNumber(selected);
    };

    return (
        <>
            <Header />
            <DebounceInput
                debounceTimeout={300}
                onChange={(event) => {
                    setSearchWord(event.target.value);
                    updateData(event.target.value);
                }}
            />

            <Container fluid>
                <Row>
                    <Col md="12">
                        <ReactPaginate
                            onPageChange={handlePageClick}
                            breakLabel="..."
                            nextLabel="next >"
                            pageRangeDisplayed={5}
                            pageCount={count / pasetsPerPage}
                            previousLabel="< previous"
                            breakClassName={"page-item"}
                            breakLinkClassName={"page-link"}
                            containerClassName={"pagination"}
                            pageClassName={"page-item"}
                            pageLinkClassName={"page-link"}
                            previousClassName={"page-item"}
                            previousLinkClassName={"page-link"}
                            nextClassName={"page-item"}
                            nextLinkClassName={"page-link"}
                            activeClassName={"active"}
                        />
                    </Col>
                </Row>
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
