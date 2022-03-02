import React, { useEffect, useRef, useState } from "react";

// react-bootstrap components
import {
    Badge,
    Button,
    Card,
    Form,
    Navbar,
    Nav,
    Container,
    Row,
    Col,
    Table,
} from "react-bootstrap";
import axios from "axios";
import Header from "./Header";
import MyLoader from "./StyledLoader";

const defaultConfig = {
    name: "Stronghold",
    url: "http://strongerw2ise74v3duebgsvug4mehyhlpa7f6kfwnas7zofs3kov7yd.onion/all",
    useTor: true,
    maxUrls: 50,
    allPostsSelector: ".col-sm-12",
    param1Name: "title",
    param1Selector: "h4",
    param1REGEX: "",
    param2Name: "content",
    param2Selector: "ol",
    param2REGEX: "",
    param3Name: "author",
    param3Selector: ".col-sm-6",
    param3REGEX: "(?<=(\\w+\\s){2})(\\w+)",
    param4Name: "date",
    param4Selector: ".col-sm-6",
    param4REGEX: "\\d+\\s[a-zA-Z]+\\s\\d+,\\s\\d+:\\d+:\\d+\\s[a-zA-Z]+",
    save: false,
};
interface Item {
    [key: string]: string;
}
const CustomScrape = () => {
    const selectConfig = useRef<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [config, setConfig] = useState(defaultConfig);
    const [configs, setConfigs] = useState([]);
    const [data, setData] = useState([
        { param1: "" } as Item,
        { param1: "" } as Item,
    ]);
    const getConfigs = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/configs`);
            if (response.data) {
                setConfigs(response.data);
                console.log(response.data);
            }
        } catch (err) {}
    };
    useEffect(() => {
        getConfigs();
    }, []);
    const getScrapeResults = async (config: any) => {
        try {
            setIsLoading(true);
            const response = await axios.post(
                `http://localhost:8080/custom`,
                config
            );
            setIsLoading(false);
            getConfigs();
            if (response.data.data.length > 0) {
                setData(response.data.data);
            } else {
                setData([{ param1: "" } as Item, { param1: "" } as Item]);
            }
        } catch (error: unknown) {
            setIsLoading(false);
            setData([{ param1: "" } as Item, { param1: "" } as Item]);
            if (typeof error === "string") {
                throw new Error(error);
            }
        }
    };
    const handleChange = (event: any) => {
        let value = event.currentTarget.value;
        const key = event.currentTarget.id;
        if (key === "useTor" || key === "save")
            value = event.currentTarget.checked;
        setConfig({ ...config, [key]: value });
    };
    return (
        <>
            <MyLoader active={isLoading}>
                <Header />
                <Container fluid>

                    <Row>
                        <Col md="12">
                            <div className="form margin"></div>
                            <select
                            ref={selectConfig}
                            onChange={() => {
                                console.log(configs[Number(selectConfig?.current?.value)]);
                                setConfig(
                                    configs[Number(selectConfig?.current?.value)]
                                );
                            }}
                        >
                            {configs.map((config: any, index) => (
                                <option key={config.id} value={index}>
                                    {config.name}
                                </option>
                            ))}
                        </select>
                            <Card>
                                <Card.Header>
                                    <Card.Title as="h4">
                                        Custom Scrape
                                    </Card.Title>
                                </Card.Header>
                                <Card.Body>
                                    <Form
                                        onSubmit={(event) => {
                                            event.preventDefault();
                                            getScrapeResults(config);
                                        }}
                                    >
                                        <Row>
                                            <Col className="pr-1" md="5">
                                                <Form.Group>
                                                    <label>URL</label>
                                                    <Form.Control
                                                        value={
                                                            config.url
                                                        }
                                    
                                                        placeholder="URL"
                                                        type="text"
                                                        required
                                                        onChange={handleChange}
                                                        id="url"
                                                    ></Form.Control>
                                                </Form.Group>
                                            </Col>

                                            <Col className="px-1" md="3">
                                                <Form.Group>
                                                    <label>site name</label>
                                                    <Form.Control
                                                        value={
                                                            config.name
                                                        }
                                                        placeholder="site name"
                                                        type="text"
                                                        required
                                                        onChange={handleChange}
                                                        id="name"
                                                    ></Form.Control>
                                                </Form.Group>
                                            </Col>
                                            <Col className="pl-1" md="4">
                                                <Form.Check
                                                    defaultChecked={
                                                        config.useTor
                                                    }
                                                    onChange={handleChange}
                                                    label={`use Tor`}
                                                    id={`useTor`}
                                                />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="pr-1" md="6">
                                                <Form.Group>
                                                    <label>maxUrls</label>
                                                    <Form.Control
                                                        value={
                                                            config.maxUrls
                                                        }
                                                        placeholder="Company"
                                                        type="number"
                                                        required
                                                        onChange={handleChange}
                                                        id="maxUrls"
                                                        max={250}
                                                    ></Form.Control>
                                                </Form.Group>
                                            </Col>
                                            <Col className="pl-1" md="6">
                                                <Form.Group>
                                                    <label>
                                                        all Posts css Selector
                                                    </label>
                                                    <Form.Control
                                                        value={
                                                            config.allPostsSelector
                                                        }
                                                        placeholder="css Selector"
                                                        type="text"
                                                        required
                                                        onChange={handleChange}
                                                        id="allPostsSelector"
                                                    ></Form.Control>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        params:
                                        <Row>
                                            <Col className="pr-1" md="4">
                                                <Form.Group>
                                                    <label>Name</label>
                                                    <Form.Control
                                                        value={
                                                            config.param1Name
                                                        }
                                                        type="text"
                                                        required
                                                        onChange={handleChange}
                                                        id="param1Name"
                                                    ></Form.Control>
                                                </Form.Group>
                                            </Col>
                                            <Col className="px-1" md="4">
                                                <Form.Group>
                                                    <label>Selector</label>
                                                    <Form.Control
                                                        value={
                                                            config.param1Selector
                                                        }
                                                        placeholder=""
                                                        type="text"
                                                        required
                                                        onChange={handleChange}
                                                        id="param1Selector"
                                                    ></Form.Control>
                                                </Form.Group>
                                            </Col>
                                            <Col className="pl-1" md="4">
                                                <Form.Group>
                                                    <label>REGEX</label>
                                                    <Form.Control
                                                        value={
                                                            config.param1REGEX
                                                        }
                                                        type="text"
                                                        onChange={handleChange}
                                                        id="param1REGEX"
                                                    ></Form.Control>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="pr-1" md="4">
                                                <Form.Group>
                                                    <label>Name</label>
                                                    <Form.Control
                                                        value={
                                                            config.param2Name
                                                        }
                                                        type="text"
                                                        required
                                                        onChange={handleChange}
                                                        id="param2Name"
                                                    ></Form.Control>
                                                </Form.Group>
                                            </Col>
                                            <Col className="px-1" md="4">
                                                <Form.Group>
                                                    <label>Selector</label>
                                                    <Form.Control
                                                        value={
                                                            config.param2Selector
                                                        }
                                                        placeholder=""
                                                        type="text"
                                                        required
                                                        onChange={handleChange}
                                                        id="param2Selector"
                                                    ></Form.Control>
                                                </Form.Group>
                                            </Col>
                                            <Col className="pl-1" md="4">
                                                <Form.Group>
                                                    <label>REGEX</label>
                                                    <Form.Control
                                                        value={
                                                            config.param2REGEX
                                                        }
                                                        type="text"
                                                        onChange={handleChange}
                                                        id="param2REGEX"
                                                    ></Form.Control>
                                                </Form.Group>
                                            </Col>
                                        </Row>{" "}
                                        <Row>
                                            <Col className="pr-1" md="4">
                                                <Form.Group>
                                                    <label>Name</label>
                                                    <Form.Control
                                                        value={
                                                            config.param3Name
                                                        }
                                                        type="text"
                                                        required
                                                        onChange={handleChange}
                                                        id="param3Name"
                                                    ></Form.Control>
                                                </Form.Group>
                                            </Col>
                                            <Col className="px-1" md="4">
                                                <Form.Group>
                                                    <label>Selector</label>
                                                    <Form.Control
                                                        value={
                                                            config.param3Selector
                                                        }
                                                        placeholder=""
                                                        type="text"
                                                        required
                                                        onChange={handleChange}
                                                        id="param3Selector"
                                                    ></Form.Control>
                                                </Form.Group>
                                            </Col>
                                            <Col className="pl-1" md="4">
                                                <Form.Group>
                                                    <label>REGEX</label>
                                                    <Form.Control
                                                        value={
                                                            config.param3REGEX
                                                        }
                                                        type="text"
                                                        onChange={handleChange}
                                                        id="param3REGEX"
                                                    ></Form.Control>
                                                </Form.Group>
                                            </Col>
                                        </Row>{" "}
                                        <Row>
                                            <Col className="pr-1" md="4">
                                                <Form.Group>
                                                    <label>Name</label>
                                                    <Form.Control
                                                        value={
                                                            config.param4Name
                                                        }
                                                        type="text"
                                                        required
                                                        onChange={handleChange}
                                                        id="param4Name"
                                                    ></Form.Control>
                                                </Form.Group>
                                            </Col>
                                            <Col className="px-1" md="4">
                                                <Form.Group>
                                                    <label>Selector</label>
                                                    <Form.Control
                                                        value={
                                                            config.param4Selector
                                                        }
                                                        placeholder=""
                                                        type="text"
                                                        required
                                                        id="param4Selector"
                                                        onChange={handleChange}
                                                    ></Form.Control>
                                                </Form.Group>
                                            </Col>
                                            <Col className="pl-1" md="4">
                                                <Form.Group>
                                                    <label>REGEX</label>
                                                    <Form.Control
                                                        value={
                                                            config.param4REGEX
                                                        }
                                                        type="text"
                                                        onChange={handleChange}
                                                        id="param4REGEX"
                                                    ></Form.Control>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Button
                                                className="btn-fill pull-right"
                                                type="submit"
                                                variant="info"
                                            >
                                                Scrape
                                            </Button>
                                            <Col className="pl-1" md="4">
                                                <Form.Check
                                                    defaultChecked={
                                                        config.save
                                                    }
                                                    onChange={handleChange}
                                                    label={`save to server configurations`}
                                                    id={`save`}
                                                />
                                            </Col>
                                        </Row>
                                        <div className="clearfix"></div>
                                    </Form>
                                </Card.Body>
                            </Card>

                            <Card
                                className={
                                    data.length > 4
                                        ? "strpied-tabled-with-hover margin"
                                        : "hidden"
                                }
                            >
                                <Card.Header>
                                    <Card.Title as="h4">Results</Card.Title>
                                </Card.Header>
                                <Card.Body className="table-full-width table-responsive px-0">
                                    <Table className="table-hover table-striped">
                                        <thead>
                                            <tr>
                                                {Object.keys(data[1]).map(
                                                    (key: string, i) => (
                                                        <th key={i}>{key}</th>
                                                    )
                                                )}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.map((item, i) => (
                                                <tr key={i}>
                                                    {Object.keys(data[1]).map(
                                                        (key: string, i) => (
                                                            <td>{item[key]}</td>
                                                        )
                                                    )}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </MyLoader>
        </>
    );
};
export default CustomScrape;
