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
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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
    setData(result);
    setIsLoading(false);
  };

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleButtonClick = (text) => {
    setSearchInput(text);
    fetchData(text);
  };

  return (
    <div className="app-background">
      <Container>
        <Row className="justify-content-md-center">
          <Col md="auto">
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
                  onClick={() => handleButtonClick("What is Tesla sales")}
                >
                  What is Tesla sales
                </Button>
              </Col>
              <Col xs={12} sm={6} className="mb-2">
                <Button
                  variant="outline-light"
                  className="w-100"
                  onClick={() =>
                    handleButtonClick("Compare Apple and Tesla gross margin")
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
                    handleButtonClick("What are the risks at Tesla")
                  }
                >
                  What are the risks at Tesla
                </Button>
              </Col>
            </Row>
            {isLoading && (
              <div className="mt-3">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            )}
            {!isLoading && data && (
              <Card className="mt-3">
                <Card.Body>
                  {/* Display user's question */}
                  <Card.Title>{data.search_input}</Card.Title>

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
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
