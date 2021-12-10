"use strict";

function Crystal() {
  const [tableData, setTableData] = React.useState([]);
  const [initialTableData, setInitialTableData] = React.useState([]);
  const [features, setFeatures] = React.useState([]);
  const [initialFeatures, setInitialFeatures] = React.useState([]);
  const [heights, setHeights] = React.useState([]);
  const [initialHeights, setInitialHeights] = React.useState([]); // fetch all products

  async function fetchInitialTableData() {
    const res = await fetch('http://localhost:7000/api/quartz-crystals', {
      mode: 'cors'
    });
    const data = await res.json();
    setInitialTableData(data.tableData);
    setTableData(data.tableData);
    setFeatures(data.features);
    setInitialFeatures(data.features);
    setHeights(data.heights);
    setInitialHeights(data.heights);
  } // fetch all products on page load


  React.useEffect(() => {
    fetchInitialTableData();
  }, []);
  return /*#__PURE__*/React.createElement("section", {
    className: "table__block crystals"
  }, /*#__PURE__*/React.createElement("div", {
    className: "table"
  }, /*#__PURE__*/React.createElement(CrystalFilters, {
    tableData: tableData,
    setTableData: setTableData,
    initialTableData: initialTableData,
    features: features,
    setFeatures: setFeatures,
    initialFeatures: initialFeatures,
    heights: heights,
    setHeights: heights,
    initialHeights: initialHeights
  }), /*#__PURE__*/React.createElement("div", {
    className: "header"
  }, /*#__PURE__*/React.createElement("div", {
    className: ""
  }, "Stock"), /*#__PURE__*/React.createElement("div", {
    className: ""
  }, "Model"), /*#__PURE__*/React.createElement("div", {
    className: ""
  }, "Product Features"), /*#__PURE__*/React.createElement("div", {
    className: ""
  }, "Holder"), /*#__PURE__*/React.createElement("div", {
    className: ""
  }, "Frequency"), /*#__PURE__*/React.createElement("div", {
    className: ""
  }, "ESR"), /*#__PURE__*/React.createElement("div", {
    className: ""
  }, "Cut"), /*#__PURE__*/React.createElement("div", {
    className: ""
  }, "Mode"), /*#__PURE__*/React.createElement("div", {
    className: ""
  }, "Q Factor"), /*#__PURE__*/React.createElement("div", {
    className: ""
  }, "Freq Tol"), /*#__PURE__*/React.createElement("div", {
    className: ""
  }, "Height"), /*#__PURE__*/React.createElement("div", {
    className: ""
  }, "Temp Range"), /*#__PURE__*/React.createElement("div", {
    className: ""
  }, "Freq Stability"), /*#__PURE__*/React.createElement("div", {
    className: ""
  }, "Lower Turn Point"), /*#__PURE__*/React.createElement("div", {
    className: ""
  }, "Upper Turn Point"), /*#__PURE__*/React.createElement("div", {
    className: ""
  }, "Mounting"), /*#__PURE__*/React.createElement("div", {
    className: ""
  }, "Image")), tableData.map(item => /*#__PURE__*/React.createElement(CrystalTableItem, {
    key: item.id,
    item: item
  }))));
}

function CrystalFilters({
  tableData,
  setTableData,
  initialTableData,
  features,
  setFeatures,
  initialFeatures,
  heights,
  setHeights,
  initialHeights
}) {
  // get unique items from array
  function getUnique(arr) {
    return [...new Set(arr)];
  }

  const form = React.useRef(null);

  const handleFormReset = () => {
    setTableData(initialTableData);
    setFeatures(initialFeatures);
    setHeights(initialHeights);
    const inputs = form.current.querySelectorAll('input');
    inputs.forEach(input => {
      if (input.type === 'checkbox' && input.checked) {
        input.checked = false;
      }

      if (input.type === 'number' && input.value !== '') {
        input.value = '';
      }
    });
  }; // filter data based on selected inputs


  const filterInputs = (inputs, filtered) => {
    inputs.forEach(({
      name,
      value
    }) => {
      if (name === 'model') {
        filtered = filtered.filter(item => item.model === value);
      }

      if (name === 'features') {
        filtered = filtered.filter(item => item.features.includes(value));
      }

      if (name === 'holder') {
        filtered = filtered.filter(item => item.holder === value);
      }

      if (name === 'frequency') {
        filtered = filtered.filter(item => item.freq_lower <= parseFloat(value));
        filtered = filtered.filter(item => item.freq_upper >= parseFloat(value));
      }

      if (name === 'esr') {
        filtered = filtered.filter(item => item.esr_lower <= parseFloat(value));
        filtered = filtered.filter(item => item.esr_upper >= parseFloat(value));
      }

      if (name === 'cut') {
        filtered = filtered.filter(item => item.cut === value);
      }

      if (name === 'mode') {
        filtered = filtered.filter(item => item.mode === value);
      }

      if (name === 'q_factor') {
        filtered = filtered.filter(item => item.q_factor_lower <= parseFloat(value));
        filtered = filtered.filter(item => item.q_factor_upper >= parseFloat(value));
      }

      if (name === 'tolerance') {
        filtered = filtered.filter(item => item.freq_tol <= parseFloat(value));
      }

      if (name === 'height') {
        filtered = filtered.filter(item => item.height.includes(value));
      }

      if (name === 'stability') {
        filtered = filtered.filter(item => item.freq_stability <= value);
      }

      if (name === 'mounting') {
        filtered = filtered.filter(item => item.mounting === value);
      }
    });
    return filtered;
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    let filtered = [...initialTableData];
    const inputs = form.current.querySelectorAll('input');
    const inpts = [];
    inputs.forEach(input => {
      if (input.type === 'checkbox' && input.checked) {
        inpts.push(input);
      }

      if (input.type === 'number' && input.value !== '') {
        inpts.push(input);
      }
    }); // no inputs selected reset

    if (inpts.length < 1) {
      setFeatures(initialFeatures);
      setTableData(initialTableData);
      return;
    }

    const filt = filterInputs(inpts, filtered);
    setTableData(filt);
    let feats = [];
    filt.forEach(item => {
      initialFeatures.forEach(feat => {
        if (item.features.includes(feat.feature)) {
          feats.push(feat);
        }
      });
    });
    setFeatures([...new Set(feats)]);
    return;
  };

  const handleFormChange = e => {
    let filtered = [...initialTableData];

    if (e.target.type === 'number') {
      return;
    }

    const inputs = form.current.querySelectorAll('input');
    const inpts = [];
    inputs.forEach(input => {
      if (input.type === 'checkbox' && input.checked) {
        inpts.push(input);
      }

      if (input.type === 'number' && input.value !== '') {
        inpts.push(input);
      }
    }); // no inputs selected reset

    if (inpts.length < 1) {
      setFeatures(initialFeatures);
      setTableData(initialTableData);
      return;
    }

    const filt = filterInputs(inpts, filtered);
    setTableData(filt);
    let feats = [];
    filt.forEach(item => {
      initialFeatures.forEach(feat => {
        if (item.features.includes(feat.feature)) {
          feats.push(feat);
        }
      });
    });
    setFeatures([...new Set(feats)]);
    return;
  };

  return /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("button", {
    onClick: () => handleFormReset()
  }, "Reset Filters"), /*#__PURE__*/React.createElement("form", {
    className: "filters header",
    ref: form // onChange={(e) => handleFormChange(e)}
    ,
    onSubmit: e => handleFormSubmit(e),
    onChange: e => handleFormChange(e)
  }, /*#__PURE__*/React.createElement("div", {
    className: ""
  }), /*#__PURE__*/React.createElement("div", {
    className: "model"
  }, tableData.map(item => /*#__PURE__*/React.createElement("fieldset", {
    key: item.model
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: item.model
  }, item.model, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    name: "model",
    id: item.model,
    value: item.model
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "features"
  }, features.map(item => /*#__PURE__*/React.createElement("fieldset", {
    key: item.feature
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: item.id
  }, item.feature, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    name: "features",
    id: item.id,
    value: item.feature
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "holder"
  }, getUnique(tableData.map(item => item.holder)).map(item => /*#__PURE__*/React.createElement("fieldset", {
    key: item
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: item
  }, item, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    name: "holder",
    id: item,
    value: item
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "frequency"
  }, /*#__PURE__*/React.createElement("input", {
    type: "number",
    name: "frequency",
    id: "frequency"
  }), /*#__PURE__*/React.createElement("button", {
    type: "submit"
  }, "Search")), /*#__PURE__*/React.createElement("div", {
    className: "esr"
  }, /*#__PURE__*/React.createElement("input", {
    type: "number",
    name: "esr",
    id: "esr"
  }), /*#__PURE__*/React.createElement("button", {
    type: "submit"
  }, "Search")), /*#__PURE__*/React.createElement("div", {
    className: "cut"
  }, getUnique(tableData.map(item => item.cut)).map(item => /*#__PURE__*/React.createElement("fieldset", {
    key: item
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: item
  }, item, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    name: "cut",
    id: item,
    value: item
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "mode"
  }, getUnique(tableData.map(item => item.mode)).map(item => /*#__PURE__*/React.createElement("fieldset", {
    key: item
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: item
  }, item, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    name: "mode",
    id: item,
    value: item
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "q_factor"
  }, /*#__PURE__*/React.createElement("input", {
    type: "number",
    name: "q_factor",
    id: "q_factor"
  }), /*#__PURE__*/React.createElement("button", {
    type: "submit"
  }, "Search")), /*#__PURE__*/React.createElement("div", {
    className: "tolerance"
  }, getUnique(tableData.map(item => item.freq_tol)).map(item => /*#__PURE__*/React.createElement("fieldset", {
    key: item
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: item
  }, item, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    name: "tolerance",
    id: item,
    value: item
  }))))), /*#__PURE__*/React.createElement("div", null, heights.map(item => /*#__PURE__*/React.createElement("fieldset", {
    key: item.id
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: item.id
  }, item.height, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    name: "height",
    id: item.id,
    value: item.height
  }))))), /*#__PURE__*/React.createElement("div", null), /*#__PURE__*/React.createElement("div", {
    className: "stability"
  }, getUnique(tableData.map(item => item.freq_stability)).map(item => /*#__PURE__*/React.createElement("fieldset", {
    key: item
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: item
  }, item, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    name: "stability",
    id: item,
    value: item
  }))))), /*#__PURE__*/React.createElement("div", null), /*#__PURE__*/React.createElement("div", null), /*#__PURE__*/React.createElement("div", {
    className: "mounting"
  }, getUnique(tableData.map(item => item.mounting)).map(item => /*#__PURE__*/React.createElement("fieldset", {
    key: item
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: item
  }, item, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    name: "mounting",
    id: item,
    value: item
  }))))), /*#__PURE__*/React.createElement("div", null)));
}

function CrystalTableItem({
  item
}) {
  const expand = React.useRef(null);

  function handleRowClick() {
    expand.current.style.display = expand.current.style.display === 'grid' ? 'none' : 'grid';
  }

  return /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "view",
    onClick: () => handleRowClick()
  }, /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "16",
    height: "16",
    fill: "currentColor",
    className: "bi bi-chevron-down",
    viewBox: "0 0 16 16"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
  })), /*#__PURE__*/React.createElement("p", null, "View")), /*#__PURE__*/React.createElement("div", {
    className: "model"
  }, /*#__PURE__*/React.createElement("p", null, item.model)), /*#__PURE__*/React.createElement("div", {
    className: "features"
  }, item.features.map(feat => /*#__PURE__*/React.createElement("p", {
    key: feat
  }, feat))), /*#__PURE__*/React.createElement("div", {
    className: "holder"
  }, /*#__PURE__*/React.createElement("p", null, item.holder)), /*#__PURE__*/React.createElement("div", {
    className: "frequency"
  }, /*#__PURE__*/React.createElement("p", null, item.freq_lower, " to ", item.freq_upper, "MHz")), /*#__PURE__*/React.createElement("div", {
    className: "esr"
  }, /*#__PURE__*/React.createElement("p", null, item.esr_lower, " to ", item.esr_upper, "\u03A9")), /*#__PURE__*/React.createElement("div", {
    className: "cut"
  }, /*#__PURE__*/React.createElement("p", null, item.cut)), /*#__PURE__*/React.createElement("div", {
    className: "mode"
  }, /*#__PURE__*/React.createElement("p", null, item.mode)), /*#__PURE__*/React.createElement("div", {
    className: "q_factor"
  }, /*#__PURE__*/React.createElement("p", null, item.q_factor_lower, " to ", item.q_factor_upper, "K")), /*#__PURE__*/React.createElement("div", {
    className: "freq_tol"
  }, /*#__PURE__*/React.createElement("p", null, "\xB1", item.freq_tol, "ppm")), /*#__PURE__*/React.createElement("div", {
    className: "height"
  }, item.height.map(height => /*#__PURE__*/React.createElement("p", {
    key: height
  }, height))), /*#__PURE__*/React.createElement("div", {
    className: "temp_range"
  }, /*#__PURE__*/React.createElement("p", null, item.temp_lower, " to ", item.temp_upper, "\u02DAC")), /*#__PURE__*/React.createElement("div", {
    className: "freq_stability"
  }, /*#__PURE__*/React.createElement("p", null, "\xB1", item.freq_stability, "ppm")), /*#__PURE__*/React.createElement("div", {
    className: "lower_turn_point"
  }, /*#__PURE__*/React.createElement("p", null, item.lower_turn_point, "\u02DAC")), /*#__PURE__*/React.createElement("div", {
    className: "upper_turn_point"
  }, /*#__PURE__*/React.createElement("p", null, item.upper_turn_point, "\u02DAC")), /*#__PURE__*/React.createElement("div", {
    className: "mounting"
  }, /*#__PURE__*/React.createElement("p", null, item.mounting)), /*#__PURE__*/React.createElement("div", {
    className: "image"
  }, /*#__PURE__*/React.createElement("img", {
    src: item.image,
    alt: item.model
  })), /*#__PURE__*/React.createElement("section", {
    className: "expanded__row",
    ref: expand
  }, item.parts.map(part => /*#__PURE__*/React.createElement(CrystalTablePart, {
    key: part.id,
    part: part
  }))));
}

function CrystalTablePart({
  part
}) {
  return /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("div", null, part.model), /*#__PURE__*/React.createElement("div", null, part.standard_parts), /*#__PURE__*/React.createElement("div", null, part.stock), /*#__PURE__*/React.createElement("div", null, part.frequency), /*#__PURE__*/React.createElement("div", null, part.esr), /*#__PURE__*/React.createElement("div", null, part.cut), /*#__PURE__*/React.createElement("div", null, part.mode), /*#__PURE__*/React.createElement("div", null, part.q), /*#__PURE__*/React.createElement("div", null, part.freq_tol), /*#__PURE__*/React.createElement("div", null, part.temp_lower, " to ", part.temp_upper), /*#__PURE__*/React.createElement("div", null, part.freq_stability), /*#__PURE__*/React.createElement("div", null, part.lower_turn_point), /*#__PURE__*/React.createElement("div", null, part.upper_turn_point), /*#__PURE__*/React.createElement("div", null, part.mounting));
}

ReactDOM.render( /*#__PURE__*/React.createElement(React.StrictMode, null, /*#__PURE__*/React.createElement(Crystal, null)), document.getElementById('insertTable'));