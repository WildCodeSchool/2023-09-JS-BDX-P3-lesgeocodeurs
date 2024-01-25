import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import PropTypes from "prop-types";
import { MDBAutocomplete } from "mdb-react-ui-kit";

// Barre de recherche de lieux
export default function Places({ setFocus }) {
  const {
    value,
    setValue,
    suggestions: { data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  // Quand je sélectionne un lieu, récupère ses coordonnées et zoom dessus
  const handleSelect = async (val) => {
    setValue(val, false);
    clearSuggestions();
    const results = await getGeocode({ address: val });
    const { lat, lng } = await getLatLng(results[0]);
    setFocus({ lat, lng }, 13);
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
  setFocus: PropTypes.func.isRequired,
};
