import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import PropTypes from "prop-types";

export default function Places({ setCenter }) {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (val) => {
    setValue(val, false);
    clearSuggestions();

    const results = await getGeocode({ address: val });
    const { lat, lng } = await getLatLng(results[0]);
    setCenter({ lat, lng });
  };

  return (
    <Combobox
      onSelect={handleSelect}
      style={{
        width: "300px",
        position: "absolute",
        top: "5px",
        left: "5px",
        zIndex: "1",
      }}
    >
      <ComboboxInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        className="combobox-input"
        placeholder="Search office address"
        style={{ width: "100%" }}
      />
      <ComboboxPopover>
        <ComboboxList>
          {status === "OK" &&
            data.map(({ placeId, description }) => (
              <ComboboxOption key={placeId} value={description} />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
}

Places.propTypes = {
  setCenter: PropTypes.func.isRequired,
};
