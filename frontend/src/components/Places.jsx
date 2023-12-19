import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import PropTypes from "prop-types";
import { MDBAutocomplete } from "mdb-react-ui-kit";

export default function Places({ setCenter }) {
  const {
    value,
    setValue,
    suggestions: { data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (val) => {
    setValue(val, false);
    clearSuggestions();

    const results = await getGeocode({ address: val });
    const { lat, lng } = await getLatLng(results[0]);
    setCenter({ lat, lng });
  };

  const onSearch = (value1) => setValue(value1);

  return (
    <MDBAutocomplete
      data={data.map((e) => e.description)}
      value={value}
      onSearch={onSearch}
      onSelect={handleSelect}
    />
  );
}

Places.propTypes = {
  setCenter: PropTypes.func.isRequired,
};
