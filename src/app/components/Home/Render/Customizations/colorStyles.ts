export const colorStyles = {
  control: (styles) => ({ ...styles, backgroundColor: 'white' }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: isDisabled ? undefined : isSelected ? data.color : isFocused ? 'white' : undefined,
      color: isDisabled ? '#ccc' : isSelected ? ('gray' ? 'white' : 'black') : data.color,
      cursor: isDisabled ? 'not-allowed' : 'default',

      ':active': {
        ...styles[':active'],
        backgroundColor: !isDisabled ? (isSelected ? data.color : 'gray') : undefined,
      },
    };
  },
  dropdownIndicator: (styles, { data }) => {
    return {
      ...styles,
    };
  },
  clearIndicator: (styles, { data }) => {
    return {
      ...styles,
      display: 'none',
      width: '0px',
      padding: '0px',
    };
  },
  placeholder: (styles, { data }) => {
    // change placeholder text

    return {
      ...styles,
      fontSize: '12px',
      color: 'rgb(193 193 193)',
      fontWeight: '300',
    };
  },
  menu: (styles, { data }) => {
    return {
      ...styles,
      zIndex: 9999,
      maxHeight: 'fit-content',
    };
  },
  menuList: (styles, { data }) => {
    return {
      ...styles,
      fontSize: '12px',
      fontWeight: '400',
      overflowY: 'scroll',
      maxHeight: '10rem',
    };
  },
  menuPortal: (styles, { data }) => {
    return {
      ...styles,
    };
  },
  indicatorSeparator: (styles, { data }) => {
    return {
      ...styles,
      display: 'none',
    };
  },
  indicatorContainer: (styles, { data }) => {
    return {
      ...styles,
      display: 'none',
    };
  },
  ValueContainer: (styles, { data }) => {
    return {
      ...styles,
      padding: '8px !important',
      gap: '3px',
    };
  },
  multiValue: (styles, { data }) => {
    return {
      ...styles,
      backgroundColor: '#EDEDED',
      borderRadius: '4px',
      color: '#5A5A5A',
      fontWeight: '300',
      fontSize: '13px',
      padding: '0.22rem',
    };
  },
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: data.color,
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: data.color,
    ':hover': {
      backgroundColor: data.color,
      color: 'green',
    },
  }),
};
