import React, { useState } from "react";
import "./index.css";
import {
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
  Button,
  Card,
  Spinner,
  Image,
} from "react-bootstrap";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import appleLogo from "./apple.png";
import teslaLogo from "./tesla.png";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [dataList, setDataList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [companyImage, setCompanyImage] = useState(null);

  const fetchData = async (query) => {
    if (!query) {
      alert("Please enter a search query.");
      return;
    }

    setIsLoading(true);

    const response = await fetch(
      `http://127.0.0.1:5000/net-incomes?search_input=${query}`
    );
    const result = await response.json();
    setDataList((prevDataList) => [result, ...prevDataList]);
    setIsLoading(false);

    // Set company image based on the search input
    const appleRegex = /apple/i;
    const teslaRegex = /tesla/i;
    if (appleRegex.test(query)) {
      setCompanyImage(appleLogo);
    } else if (teslaRegex.test(query)) {
      setCompanyImage(teslaLogo);
    } else {
      setCompanyImage(null);
    }
  };

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleButtonClick = (text) => {
    setSearchInput(text);
    fetchData(text);
  };

  const handleCardClose = (index) => {
    setDataList((prevDataList) => prevDataList.filter((_, i) => i !== index));
  };

  return (
    <div className="app-background">
      <Container>
        <Row className="justify-content-md-center">
          <Col md="auto" style={{ maxWidth: "800px" }}>
            <h1>Investies</h1>
            <p>Empowering smarter investment decisions with AI</p>
            <InputGroup>
              <FormControl
                type="search"
                placeholder="Search..."
                aria-label="Search"
                value={searchInput}
                onChange={handleSearchInputChange}
              />
              <Button
                variant="outline-light"
                type="submit"
                onClick={() => fetchData(searchInput)}
              >
                Submit
              </Button>
            </InputGroup>
            <Row className="mt-3 justify-content-around">
              <Col xs={12} sm={6} className="mb-2">
                <Button
                  variant="outline-light"
                  className="w-100"
                  onClick={() => handleButtonClick("Make a report on Apple")}
                >
                  Make a report on Apple
                </Button>
              </Col>
              <Col xs={12} sm={6} className="mb-2">
                <Button
                  variant="outline-light"
                  className="w-100"
                  onClick={() => handleButtonClick("What are Apple sales")}
                >
                  What is Tesla sales
                </Button>
              </Col>
              <Col xs={12} sm={6} className="mb-2">
                <Button
                  variant="outline-light"
                  className="w-100"
                  onClick={() =>
                    handleButtonClick(
                      "Compare Apple gross margin to the industry"
                    )
                  }
                >
                  Compare Apple and Tesla gross margin
                </Button>
              </Col>
              <Col xs={12} sm={6} className="mb-2">
                <Button
                  variant="outline-light"
                  className="w-100"
                  onClick={() =>
                    handleButtonClick("What are the risks at Apple")
                  }
                >
                  What are the risks at Tesla
                </Button>
              </Col>
            </Row>
            {companyImage && (
              <Image
                src={companyImage}
                alt="Company logo"
                fluid
                className="mt-3"
                style={{ maxWidth: "775px" }}
              />
            )}
            {isLoading && (
              <div className="mt-3">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            )}
            {!isLoading &&
              dataList.map((data, index) => (
                <Card key={index} className="mt-3">
                  <Card.Body>
                    <div className="d-flex justify-content-between">
                      {/* Display user's question */}
                      <Card.Title>{data.search_input}</Card.Title>

                      {/* Close button */}
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleCardClose(index)}
                      >
                        X
                      </Button>
                    </div>

                    {/* Display AI's answer */}
                    <Card.Text
                      style={{ fontSize: "1rem", whiteSpace: "pre-wrap" }}
                    >
                      {data.answer}
                    </Card.Text>

                    {/* Display graph if available */}
                    {data.chart && (
                      <Bar
                        data={data.chart.data}
                        options={{
                          scales: {
                            y: {
                              beginAtZero: true,
                            },
                          },
                          plugins: {
                            legend: {
                              labels: {
                                color: "rgba(103, 173, 91, 0.6)", // Set the legend text color to match the background
                              },
                            },
                          },
                          elements: {
                            bar: {
                              backgroundColor: "rgba(103, 173, 91, 0.6)", // Set the bar color to match the background
                            },
                          },
                        }}
                      />
                    )}

                    {/* Display sources */}
                    <Card.Text className="mt-3">Sources:</Card.Text>
                    {Object.keys(data.sources).map((key, index) => {
                      const yearMatch = data.sources[key].Source.match(/\d{4}/);
                      const year = yearMatch ? yearMatch[0] : "";
                      return (
                        <Button
                          key={key}
                          className="mr-2 mb-2"
                          variant="outline-success"
                          title={`Source: ${data.sources[key].Source}\nPage: ${data.sources[key].Page}`}
                        >
                          {year} - Page {data.sources[key].Page}
                        </Button>
                      );
                    })}
                  </Card.Body>
                </Card>
              ))}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
