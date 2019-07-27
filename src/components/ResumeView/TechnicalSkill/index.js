import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Row, Col } from "reactstrap";

import "./styles.css";

class TechnicalSkill extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  static propTypes = {
    title: PropTypes.string.isRequired,
    skills: PropTypes.array.isRequired
  };

  static defaultProps = {};

  componentWillMount() {
    this.getState(this.props);
  }

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {
    this.getState(nextProps);
  }

  getState = props => {
    this.setState({});
  };

  renderSkills = skills =>
    skills.map((e, i) => (
      <span key={i} className="Skill">
        {e}
      </span>
    ));

  render() {
    const { title, skills } = this.props;
    return (
      <Row className="TechnicalSkill">
        <Col md={{ span: 12, offset: 1 }} xs={12}>
          <ul>
            <li>
              <b>{`${title}: `}</b>
              {this.renderSkills(skills)}
            </li>
          </ul>
        </Col>
      </Row>
    );
  }
}
export default TechnicalSkill;
