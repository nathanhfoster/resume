import React, { Component } from "react";
import PropTypes from "prop-types";
import { FormGroup, Label, Input } from "reactstrap";
import { connect as reduxConnect } from "react-redux";
import { withRouter } from "react-router-dom";
import ReactGoogleMapLoader from "react-google-maps-loader";
import ReactGooglePlacesSuggest from "react-google-places-suggest";
import AsyncSelect from "react-select/async";
import { selectStyles } from "../../styles/selectStyles";
import { isSubset } from "../../helpers";
import { joinStrings, splitStrings, RemoveArrayDuplicates } from "../../helpers";
import "./styles.css";

const { REACT_APP_GOOGLE_LOCATION_API } = process.env;

const mapStateToProps = ({}) => ({});

const mapDispatchToProps = {};

class GoogleSuggest extends Component {
  constructor(props) {
    super(props);

    this.state = { search: "", value: "", locations: [], defaultLocations: [] };
  }

  static propTypes = {
    search: PropTypes.string,
    value: PropTypes.string,
    locations: PropTypes.array,
    defaultLocations: PropTypes.array,
    Action: PropTypes.func.isRequired,
    ActionPayload: PropTypes.string.isRequired,
    LabelValue: PropTypes.string,
    PlaceholderValue: PropTypes.string
  };

  static defaultProps = {};

  componentWillMount() {
    this.getState(this.props);
  }

  componentDidMount() {}

  shouldComponentUpdate(nextProps, nextState) {
    const { search, value, locations } = nextState;
    const currentSearch = this.state.search;
    const currentValue = this.state.value;
    const currentLocations = this.state.locations;
    const searchChanged = search != currentSearch;
    const valueChanged = value != currentValue;
    const locationChanged = !isSubset(locations.map(e => e.id), currentLocations.map(e => e.id));

    return searchChanged || valueChanged || locationChanged;
  }

  componentWillReceiveProps(nextProps) {
    this.getState(nextProps);
  }

  getState = props => {
    const { LocationValue } = props;
    this.setState({ value: splitStrings(LocationValue) });
  };

  handleInputChange = search => this.setState({ search });

  handleSelectSuggest = (selectedLocation, { action, name, option }) => {
    const { Action } = this.props;
    Action({ [name]: joinStrings(selectedLocation) });
  };

  handleNoResult = () => {
    console.log("No results for ", this.state.search);
  };

  handleStatusUpdate = status => {
    console.log("handleStatusUpdate: ", status);
  };

  loadLocations = async locationSearch => {
    const { locations, defaultLocations } = await this.state;
    const Locations = await locations;
    return Locations;
  };

  loadOptions = locationSearch =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve(this.loadLocations(locationSearch));
      }, 750);
    });

  render() {
    const { LabelValue, PlaceholderValue, ActionPayload, isMulti } = this.props;
    const { search, value, locations, defaultLocations } = this.state;
    return (
      <ReactGoogleMapLoader
        params={{
          key: REACT_APP_GOOGLE_LOCATION_API,
          libraries: "places,geocode"
        }}
        render={googleMaps =>
          googleMaps && (
            <ReactGooglePlacesSuggest
              googleMaps={googleMaps}
              autocompletionRequest={{
                input: search
                // Optional options
                // https://developers.google.com/maps/documentation/javascript/reference?hl=fr#AutocompletionRequest
              }}
              // Optional props
              displayPoweredByGoogle={false}
              onNoResult={this.handleNoResult}
              onSelectSuggest={this.handleSelectSuggest}
              onStatusUpdate={this.handleStatusUpdate}
              textNoResults="No results" // null or "" if you want to disable the no results item
              customContainerRender={locations => {
                this.setState(prevState => {
                  const mappedLocations = locations.map(e => e.description);
                  const { defaultLocations } = prevState;
                  const newLocations = RemoveArrayDuplicates(
                    [...mappedLocations, ...defaultLocations].map(e => e.value || e)
                  )
                    .map(e => (e = { value: e, label: e }))
                    .slice(0, 100);
                  return { locations: newLocations, defaultLocations: newLocations };
                });
                return null;
              }}
            >
              <FormGroup>
                <Label>{LabelValue}</Label>
                <AsyncSelect
                  name={ActionPayload}
                  isMulti={isMulti}
                  value={value}
                  styles={selectStyles()}
                  onBlur={e => e.preventDefault()}
                  blurInputOnSelect={false}
                  escapeClearsValue={true}
                  isClearable
                  placeholder={PlaceholderValue || "Search a location"}
                  classNamePrefix="select"
                  cacheOptions
                  loadOptions={this.loadOptions}
                  defaultOptions={defaultLocations}
                  onInputChange={this.handleInputChange}
                  onChange={this.handleSelectSuggest}
                />
              </FormGroup>
            </ReactGooglePlacesSuggest>
          )
        }
      />
    );
  }
}
export default withRouter(reduxConnect(mapStateToProps, mapDispatchToProps)(GoogleSuggest));
