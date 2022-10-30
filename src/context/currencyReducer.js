export const initialState = {
  rate: [],
  currency: JSON.parse(localStorage.getItem("currency")) || "INR",
  submit: JSON.parse(localStorage.getItem("submit")) || false,
  formData: JSON.parse(localStorage.getItem("formData")) || {},
  seconds: JSON.parse(localStorage.getItem("seconds")) || 0,
  minutes: JSON.parse(localStorage.getItem("minutes")) || 0,
};

export const currencyReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_DATA":
      return {
        ...state,
        rate: action.payload,
      };
    case "SUBMIT":
      return {
        ...state,
        submit: action.payload,
      };
    case "CURRENCY_UPDATE":
      return {
        ...state,
        currency: action.payload,
      };
    case "FORMDATA_UPDATE":
      return {
        ...state,
        formData: action.payload,
      };
    case "SET_SECONDS":
      return {
        ...state,
        seconds: state.seconds + 1,
      };
    case "SET_MINUTES":
      return {
        ...state,
        minutes: state.minutes + 1,
      };
    case "SECONDS_RESET":
      return {
        ...state,
        seconds: 0,
      };
    case "MINUTES_RESET":
      return {
        ...state,
        minutes: 0,
      };

    default:
      return {
        ...state,
      };
  }
};
