import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { FormGroup, Label } from "reactstrap";
import { connect as reduxConnect } from "react-redux";

import AsyncSelect from "react-select/async";
import { selectStyles } from "../../styles/selectStyles";
import { ChangeUser } from "../../actions/User";
import "./styles.css";

const { REACT_APP_API_URL } = process.env;

const mapStateToProps = ({ User: { university } }) => ({ university });

const mapDispatchToProps = { ChangeUser };

class UniversityNameSearch extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { universityNameSearch: { label: "", value: "" }, defaultUniversityNames: [] };
  }

  static propTypes = {
    universityNameSearch: PropTypes.object,
    defaultUniversityNames: PropTypes.array,
    User: PropTypes.object,
    ChangeUser: PropTypes.func.isRequired
  };

  static defaultProps = {};

  componentWillMount() {
    this.getState(this.props);
  }

  componentDidMount() {
    const { university } = this.props;

    this.filterUniversityNames(university || " ");
  }

  componentWillReceiveProps(nextProps) {
    this.getState(nextProps);
  }

  getState = props => {
    this.setState({});
  };

  filterUniversityNames = async universityNameSearch => {
    const response = await fetch(`${REACT_APP_API_URL}universities/${universityNameSearch}/search/`);
    const json = await response.json();
    const UniversityNames = await json.map(e => (e = { value: e.id, label: e.name }));
    this.setState({ defaultUniversityNames: UniversityNames });

    return await UniversityNames;
  };

  loadOptions = universityNameSearch =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve(this.filterUniversityNames(universityNameSearch));
      }, 1000);
    });

  handleInputChange = newValue => {
    const universityNameSearch = newValue;
    // .replace(/\W/g, "");
    universityNameSearch && this.setState({ universityNameSearch });
    return universityNameSearch;
  };

  handleUniversitySelected = (university, { action, removedValue }) => {
    const { ChangeUser } = this.props;
    ChangeUser({ university: !university ? null : university.value });
    this.setState({ universityNameSearch: university });
  };

  render() {
    const { universityNameSearch, defaultUniversityNames } = this.state;
    const foundUniversity = defaultUniversityNames.length > 0;
    return (
      <FormGroup className="UniversityNameSearch">
        <Label>University Name</Label>
        <AsyncSelect
          value={
            universityNameSearch.value
              ? universityNameSearch
              : foundUniversity
              ? defaultUniversityNames[0]
              : null
          }
          styles={selectStyles()}
          onBlur={e => e.preventDefault()}
          blurInputOnSelect={false}
          escapeClearsValue={true}
          placeholder="University Name"
          classNamePrefix="select"
          cacheOptions
          loadOptions={this.loadOptions}
          defaultOptions={defaultUniversityNames}
          onInputChange={this.handleInputChange}
          onChange={this.handleUniversitySelected}
        />
      </FormGroup>
    );
  }
}
export default reduxConnect(mapStateToProps, mapDispatchToProps)(UniversityNameSearch);
