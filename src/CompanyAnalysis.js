import {
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
  Card,
  ProgressBar,
} from "react-bootstrap";
import "./CompanyAnalysis.css";

function CompanyAnalysis() {
  const sections = [
    {
      title: "Revenue Growth",
      chart: "Graph Data Placeholder",
      explanation:
        "Revenue is growing rapidly, indicating a strong business performance.",
    },
    {
      title: "Profit Margin",
      chart: "Graph Data Placeholder",
      explanation:
        "Profit margin is low, which may signify operational inefficiencies.",
    },
  ];

  return (
    <Container className="company-analysis">
      <Row>
        <Col>
          <h1>APPLE.INC</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <InputGroup>
            <FormControl
              type="search"
              placeholder="Search financial document..."
              aria-label="Search"
            />
          </InputGroup>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col sm={4} md={3} className="text-center">
          <div className="confidence-score">
            <h4>Investment Confidence</h4>
            <ProgressBar variant="success" now={75} label="75" srOnly />
          </div>
        </Col>
      </Row>
      <Row>
        {sections.map((section, index) => (
          <Col key={index} md={6}>
            <Card className="section">
              <Card.Header>{section.title}</Card.Header>
              <Card.Body>
                <Card.Text>{section.chart}</Card.Text>
                <Card.Text>{section.explanation}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default CompanyAnalysis;
