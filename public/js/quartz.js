// function Crystal() {
//   const [tableData, setTableData] = React.useState([]);
//   const [initialTableData, setInitialTableData] = React.useState([]);

//   const [features, setFeatures] = React.useState([]);
//   const [initialFeatures, setInitialFeatures] = React.useState([]);

//   const [heights, setHeights] = React.useState([]);
//   const [initialHeights, setInitialHeights] = React.useState([]);

//   // fetch all products
//   async function fetchInitialTableData() {
//     const res = await fetch('/api/quartz-crystals', {
//       mode: 'cors',
//     });

//     const data = await res.json();

//     console.log(data);

//     setInitialTableData(data.tableData);
//     setTableData(data.tableData);

//     setFeatures(data.features);
//     setInitialFeatures(data.features);

//     setHeights(data.heights);
//     setInitialHeights(data.heights);
//   }

//   // fetch all products on page load
//   React.useEffect(() => {
//     fetchInitialTableData();
//   }, []);

//   return (
//     <section className='table__block crystals'>
//       <div className='table'>
//         <CrystalFilters
//           tableData={tableData}
//           setTableData={setTableData}
//           initialTableData={initialTableData}
//           features={features}
//           setFeatures={setFeatures}
//           initialFeatures={initialFeatures}
//           heights={heights}
//           setHeights={setHeights}
//           initialHeights={initialHeights}
//         />
//         <div className='header'>
//           <div className=''>Stock</div>
//           <div className=''>Model</div>
//           <div className=''>Product Features</div>
//           <div className=''>Holder</div>
//           <div className=''>Frequency</div>
//           <div className=''>ESR</div>
//           <div className=''>Cut</div>
//           <div className=''>Mode</div>
//           <div className=''>Q Factor</div>
//           <div className=''>Freq Tol</div>
//           <div className=''>Height</div>
//           <div className=''>Temp Range</div>
//           <div className=''>Freq Stability</div>
//           <div className=''>Lower Turn Point</div>
//           <div className=''>Upper Turn Point</div>
//           <div className=''>Mounting</div>
//           <div className=''>Image</div>
//         </div>
//         {tableData.map((item) => (
//           <CrystalTableItem key={item.id} item={item} tableData={tableData} />
//         ))}
//       </div>
//     </section>
//   );
// }

// function CrystalFilters({
//   tableData,
//   setTableData,
//   initialTableData,
//   features,
//   setFeatures,
//   initialFeatures,
//   heights,
//   setHeights,
//   initialHeights,
// }) {
//   // get unique items from array
//   const getUnique = (arr) => {
//     return [...new Set(arr)];
//   };

//   const getUniqueTemps = (arr) => {
//     let tmps = [];
//     let temps = [];

//     arr.forEach((item) => {
//       if (!(item.temp_lower === 0 && item.temp_upper === 0)) {
//         let t = {
//           range: item.temp_range,
//           lower: item.temp_lower,
//           upper: item.temp_upper,
//           id: item.id,
//         };

//         if (!tmps.includes(t.range)) {
//           tmps.push(t.range);
//           temps.push(t);
//         }
//       }
//     });

//     return temps;
//   };

//   const getUniqueLowerTurnPoints = (arr) => {
//     let lwrs = [];
//     let lowers = [];

//     arr.forEach((item) => {
//       if (
//         !(
//           item.lower_lower_turn_point === 0 && item.lower_upper_turn_point === 0
//         )
//       ) {
//         let l = {
//           range: item.lower_range,
//           lower: item.lower_lower_turn_point,
//           upper: item.lower_upper_turn_point,
//           id: item.id,
//         };

//         if (!lwrs.includes(l.range)) {
//           lwrs.push(l.range);
//           lowers.push(l);
//         }
//       }
//     });

//     return lowers;
//   };

//   const getUniqueUpperTurnPoints = (arr) => {
//     let upprs = [];
//     let uppers = [];

//     arr.forEach((item) => {
//       if (
//         !(
//           item.upper_lower_turn_point === 0 && item.upper_upper_turn_point === 0
//         )
//       ) {
//         let u = {
//           range: item.upper_range,
//           lower: item.upper_lower_turn_point,
//           upper: item.upper_upper_turn_point,
//           id: item.id,
//         };

//         if (!upprs.includes(u.range)) {
//           upprs.push(u.range);
//           uppers.push(u);
//         }
//       }
//     });

//     return uppers;
//   };

//   const form = React.useRef(null);

//   const handleFormReset = () => {
//     setTableData(initialTableData);
//     setFeatures(initialFeatures);
//     setHeights(initialHeights);

//     const inputs = form.current.querySelectorAll('input');

//     inputs.forEach((input) => {
//       if (input.type === 'checkbox' && input.checked) {
//         input.checked = false;
//       }

//       if (input.type === 'number' && input.value !== '') {
//         input.value = '';
//       }
//     });
//   };

//   // filter data based on selected inputs
//   const filterInputs = (inputs, filtered) => {
//     inputs.forEach(({ name, value, dataset }) => {
//       if (name === 'model') {
//         filtered = filtered.filter((item) => item.model === value);
//       }
//       if (name === 'features') {
//         filtered = filtered.filter((item) => item.features.includes(value));
//       }
//       if (name === 'holder') {
//         filtered = filtered.filter((item) => item.holder === value);
//       }
//       if (name === 'frequency') {
//         filtered = filtered.filter(
//           (item) => item.freq_lower <= parseFloat(value)
//         );
//         filtered = filtered.filter(
//           (item) => item.freq_upper >= parseFloat(value)
//         );
//       }
//       if (name === 'esr') {
//         filtered = filtered.filter(
//           (item) => item.esr_lower <= parseFloat(value)
//         );
//         filtered = filtered.filter(
//           (item) => item.esr_upper >= parseFloat(value)
//         );
//       }
//       if (name === 'cut') {
//         filtered = filtered.filter((item) => item.cut === value);
//       }
//       if (name === 'mode') {
//         filtered = filtered.filter((item) => item.mode === value);
//       }
//       if (name === 'q_factor') {
//         filtered = filtered.filter(
//           (item) => item.q_factor_lower <= parseFloat(value)
//         );
//         filtered = filtered.filter(
//           (item) => item.q_factor_upper >= parseFloat(value)
//         );
//       }
//       if (name === 'tolerance') {
//         filtered = filtered.filter(
//           (item) => item.freq_tol <= parseFloat(value)
//         );
//       }
//       if (name === 'height') {
//         filtered = filtered.filter((item) => item.height.includes(value));
//       }
//       if (name === 'temp_range') {
//         filtered = filtered.filter((item) => item.temp_lower <= dataset.lower);
//         filtered = filtered.filter((item) => item.temp_upper >= dataset.upper);
//       }
//       if (name === 'stability') {
//         filtered = filtered.filter((item) => item.freq_stability <= value);
//       }
//       if (name === 'lower_turn') {
//         filtered = filtered.filter(
//           (item) => item.lower_lower_turn_point <= dataset.lower
//         );
//         filtered = filtered.filter(
//           (item) => item.lower_upper_turn_point >= dataset.upper
//         );
//       }
//       if (name === 'upper_turn') {
//         filtered = filtered.filter(
//           (item) => item.upper_lower_turn_point <= dataset.lower
//         );
//         filtered = filtered.filter(
//           (item) => item.upper_upper_turn_point >= dataset.upper
//         );
//       }
//       if (name === 'mounting') {
//         filtered = filtered.filter((item) => item.mounting === value);
//       }
//     });

//     return filtered;
//   };

//   const handleFormSubmit = (e) => {
//     e.preventDefault();

//     let filtered = [...initialTableData];

//     const inputs = form.current.querySelectorAll('input');
//     const inpts = [];

//     inputs.forEach((input) => {
//       if (input.type === 'checkbox' && input.checked) {
//         inpts.push(input);
//       }

//       if (input.type === 'number' && input.value !== '') {
//         inpts.push(input);
//       }
//     });

//     // no inputs selected reset
//     if (inpts.length < 1) {
//       setFeatures(initialFeatures);
//       setTableData(initialTableData);
//       return;
//     }

//     const filt = filterInputs(inpts, filtered);

//     setTableData(filt);

//     // let feats = [];
//     // filt.forEach((item) => {
//     //   initialFeatures.forEach((feat) => {
//     //     if (item.features.includes(feat.feature)) {
//     //       feats.push(feat);
//     //     }
//     //   });
//     // });

//     // setFeatures([...new Set(feats)]);

//     return;
//   };

//   const handleFormChange = (e) => {
//     let filtered = [...initialTableData];

//     if (e.target.type === 'number') {
//       return;
//     }

//     const inputs = form.current.querySelectorAll('input');
//     const inpts = [];

//     inputs.forEach((input) => {
//       if (input.type === 'checkbox' && input.checked) {
//         inpts.push(input);
//       }

//       if (input.type === 'number' && input.value !== '') {
//         inpts.push(input);
//       }
//     });

//     // no inputs selected reset
//     if (inpts.length < 1) {
//       setFeatures(initialFeatures);
//       setTableData(initialTableData);
//       return;
//     }

//     const filt = filterInputs(inpts, filtered);

//     setTableData(filt);

//     // let feats = [];
//     // filt.forEach((item) => {
//     //   initialFeatures.forEach((feat) => {
//     //     if (item.features.includes(feat.feature)) {
//     //       feats.push(feat);
//     //     }
//     //   });
//     // });

//     // setFeatures([...new Set(feats)]);

//     return;
//   };

//   return (
//     <>
//       <button onClick={() => handleFormReset()}>Reset Filters</button>
//       <form
//         className='filters header'
//         ref={form}
//         onSubmit={(e) => handleFormSubmit(e)}
//         onChange={(e) => handleFormChange(e)}
//       >
//         <div className=''>
//           {/* {selectedFilters &&
//           selectedFilters.map((filter) => (
//             <p key={filter.value}>{filter.value}</p>
//           ))} */}
//         </div>
//         <div className='model'>
//           {initialTableData.map((item) => (
//             <fieldset key={item.model}>
//               <label htmlFor={item.model}>
//                 {item.model}
//                 <input
//                   type='checkbox'
//                   name='model'
//                   id={item.model}
//                   value={item.model}
//                 />
//               </label>
//             </fieldset>
//           ))}
//         </div>
//         <div className='features'>
//           {features.map((item) => (
//             <fieldset key={item.feature}>
//               <label htmlFor={item.id}>
//                 {item.feature}
//                 <input
//                   type='checkbox'
//                   name='features'
//                   id={item.id}
//                   value={item.feature}
//                 />
//               </label>
//             </fieldset>
//           ))}
//         </div>
//         <div className='holder'>
//           {getUnique(initialTableData.map((item) => item.holder)).map(
//             (item) => (
//               <fieldset key={item}>
//                 <label htmlFor={item}>
//                   {item}
//                   <input type='checkbox' name='holder' id={item} value={item} />
//                 </label>
//               </fieldset>
//             )
//           )}
//         </div>
//         <div className='frequency'>
//           <input type='number' name='frequency' id='frequency' />
//           <button type='submit'>Search</button>
//         </div>
//         <div className='esr'>
//           <input type='number' name='esr' id='esr' />
//           <button type='submit'>Search</button>
//         </div>
//         <div className='cut'>
//           {getUnique(initialTableData.map((item) => item.cut)).map((item) => (
//             <fieldset key={item}>
//               <label htmlFor={item}>
//                 {item}
//                 <input type='checkbox' name='cut' id={item} value={item} />
//               </label>
//             </fieldset>
//           ))}
//         </div>
//         <div className='mode'>
//           {getUnique(initialTableData.map((item) => item.mode)).map((item) => (
//             <fieldset key={item}>
//               <label htmlFor={item}>
//                 {item}
//                 <input type='checkbox' name='mode' id={item} value={item} />
//               </label>
//             </fieldset>
//           ))}
//         </div>
//         <div className='q_factor'>
//           <input type='number' name='q_factor' id='q_factor' />
//           <button type='submit'>Search</button>
//         </div>
//         <div className='tolerance'>
//           {getUnique(initialTableData.map((item) => item.freq_tol)).map(
//             (item) => (
//               <fieldset key={item}>
//                 <label htmlFor={item}>
//                   {item}
//                   <input
//                     type='checkbox'
//                     name='tolerance'
//                     id={item}
//                     value={item}
//                   />
//                 </label>
//               </fieldset>
//             )
//           )}
//         </div>
//         <div>
//           {heights.map((item) => (
//             <fieldset key={item.id}>
//               <label htmlFor={item.id}>
//                 {item.height}
//                 <input
//                   type='checkbox'
//                   name='height'
//                   id={item.id}
//                   value={item.height}
//                 />
//               </label>
//             </fieldset>
//           ))}
//         </div>
//         <div className='temp_range'>
//           {getUniqueTemps(initialTableData).map((item) => (
//             <fieldset key={item.id}>
//               <label htmlFor={`${item.id}${item.range}`}>
//                 {item.range}
//                 <input
//                   type='checkbox'
//                   name='temp_range'
//                   id={`${item.id}${item.range}`}
//                   value={item.range}
//                   data-lower={item.lower}
//                   data-upper={item.upper}
//                 />
//               </label>
//             </fieldset>
//           ))}
//         </div>
//         <div className='stability'>
//           {getUnique(initialTableData.map((item) => item.freq_stability)).map(
//             (item) => (
//               <fieldset key={item}>
//                 <label htmlFor={item}>
//                   {item}
//                   <input
//                     type='checkbox'
//                     name='stability'
//                     id={item}
//                     value={item}
//                   />
//                 </label>
//               </fieldset>
//             )
//           )}
//         </div>
//         <div className='lower_turn'>
//           {getUniqueLowerTurnPoints(initialTableData).map((item) => (
//             <fieldset key={item.id}>
//               <label htmlFor={`${item.id}${item.range}`}>
//                 {item.range}
//                 <input
//                   type='checkbox'
//                   name='lower_turn'
//                   id={`${item.id}${item.range}`}
//                   value={item.range}
//                   data-lower={item.lower}
//                   data-upper={item.upper}
//                 />
//               </label>
//             </fieldset>
//           ))}
//         </div>
//         <div className='upper_turn'>
//           {getUniqueUpperTurnPoints(initialTableData).map((item) => (
//             <fieldset key={item.id}>
//               <label htmlFor={`${item.id}${item.range}`}>
//                 {item.range}
//                 <input
//                   type='checkbox'
//                   name='upper_turn'
//                   id={`${item.id}${item.range}`}
//                   value={item.range}
//                   data-lower={item.lower}
//                   data-upper={item.upper}
//                 />
//               </label>
//             </fieldset>
//           ))}
//         </div>
//         <div className='mounting'>
//           {getUnique(initialTableData.map((item) => item.mounting)).map(
//             (item) => (
//               <fieldset key={item}>
//                 <label htmlFor={item}>
//                   {item}
//                   <input
//                     type='checkbox'
//                     name='mounting'
//                     id={item}
//                     value={item}
//                   />
//                 </label>
//               </fieldset>
//             )
//           )}
//         </div>
//         <div></div>
//       </form>
//     </>
//   );
// }

// function CrystalTableItem({ item, tableData }) {
//   const [rowOpen, setRowOpen] = React.useState(false);

//   function handleRowClick() {
//     setRowOpen(!rowOpen);
//   }

//   return (
//     <div className='row'>
//       <div className='view' onClick={() => handleRowClick()}>
//         <svg
//           xmlns='http://www.w3.org/2000/svg'
//           width='16'
//           height='16'
//           fill='currentColor'
//           className='bi bi-chevron-down'
//           viewBox='0 0 16 16'
//         >
//           <path d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z' />
//         </svg>
//         <p>View</p>
//       </div>
//       <div className='model'>
//         <p>{item.model}</p>
//       </div>
//       <div className='features'>
//         {item.features.map((feat) => (
//           <p key={feat}>{feat}</p>
//         ))}
//       </div>
//       <div className='holder'>
//         <p>{item.holder}</p>
//       </div>
//       <div className='frequency'>
//         <p>
//           {item.freq_lower} to {item.freq_upper}MHz
//         </p>
//       </div>
//       <div className='esr'>
//         <p>
//           {item.esr_lower} to {item.esr_upper}Ω
//         </p>
//       </div>
//       <div className='cut'>
//         <p>{item.cut}</p>
//       </div>
//       <div className='mode'>
//         <p>{item.mode}</p>
//       </div>
//       <div className='q_factor'>
//         <p>
//           {item.q_factor_lower} to {item.q_factor_upper}K
//         </p>
//       </div>
//       <div className='freq_tol'>
//         <p>±{item.freq_tol}ppm</p>
//       </div>
//       <div className='height'>
//         {item.height.map((height) => (
//           <p key={height}>{height}</p>
//         ))}
//       </div>
//       <div className='temp_range'>
//         <p>
//           {item.temp_lower === 0 && item.temp_upper === 0
//             ? 'n/a'
//             : `${item.temp_range}˚C`}
//         </p>
//       </div>
//       <div className='freq_stability'>
//         <p>±{item.freq_stability}ppm</p>
//       </div>
//       <div className='lower_turn_point'>
//         <p>{item.lower_range === ' to ' ? 'n/a' : `${item.lower_range}˚C`}</p>
//       </div>
//       <div className='upper_turn_point'>
//         <p>{item.upper_range === ' to ' ? 'n/a' : `${item.upper_range}˚C`}</p>
//       </div>
//       <div className='mounting'>
//         <p>{item.mounting}</p>
//       </div>
//       <div className='image'>
//         <img src={item.image} alt={item.model} />
//       </div>
//       <CrystalTablePartWrapper
//         item={item}
//         tableData={tableData}
//         rowOpen={rowOpen}
//       />
//     </div>
//   );
// }

// function CrystalTablePartWrapper({ item, tableData, rowOpen }) {
//   const [partTableData, setPartTableData] = React.useState(item.parts);
//   const [initialPartTableData, setInitialPartTableData] = React.useState(
//     item.parts
//   );

//   return (
//     <section
//       className='expanded__row'
//       style={{ display: rowOpen ? 'block' : 'none' }}
//     >
//       <section className='inner__header'>
//         {item.parts.length > 1 ? (
//           <CrystalPartFilters
//             partTableData={partTableData}
//             setPartTableData={setPartTableData}
//             initialPartTableData={initialPartTableData}
//             id={item.id}
//           />
//         ) : (
//           ''
//         )}
//       </section>
//       <section className='part__header'>
//         <div className='model'>Model</div>
//         <div className='standard_parts'>Standard Parts</div>
//         <div className='stock'>Stock</div>
//         <div className='frequency'>Frequency</div>
//         <div className='esr'>ESR</div>
//         <div className='cut'>Cut</div>
//         <div className='mode'>Mode</div>
//         <div className='q_factor'>Q Factor</div>
//         <div className='freq_tol'>Freq Tol</div>
//         <div className='height'>Height</div>
//         <div className='temp_range'>Temp Range</div>
//         <div className='stability'>Stability</div>
//         <div className='lower_turn_point'>Lower Turn Point</div>
//         <div className='upper_turn_point'>Upper Turn Point</div>
//         <div className='mounting'>Mounting</div>
//       </section>
//       {partTableData.map((part) => (
//         <CrystalTablePart key={part.id} part={part} />
//       ))}
//     </section>
//   );
// }

// function CrystalPartFilters({
//   initialPartTableData,
//   partTableData,
//   setPartTableData,
//   id,
// }) {
//   // get unique items from array
//   const getUnique = (arr) => {
//     return [...new Set(arr)];
//   };

//   const getUniqueTemps = (arr) => {
//     let tmps = [];
//     let temps = [];

//     arr.forEach((item) => {
//       if (!(item.temp_lower === 0 && item.temp_upper === 0)) {
//         let t = {
//           range: item.temp_range,
//           lower: item.temp_lower,
//           upper: item.temp_upper,
//           id: item.id,
//         };

//         if (!tmps.includes(t.range)) {
//           tmps.push(t.range);
//           temps.push(t);
//         }
//       }
//     });

//     return temps;
//   };

//   const getUniqueLowerTurnPoints = (arr) => {
//     let lwrs = [];
//     let lowers = [];

//     arr.forEach((item) => {
//       if (
//         !(
//           item.lower_lower_turn_point === 0 && item.lower_upper_turn_point === 0
//         )
//       ) {
//         let l = {
//           range: item.lower_range,
//           lower: item.lower_lower_turn_point,
//           upper: item.lower_upper_turn_point,
//           id: item.id,
//         };

//         if (!lwrs.includes(l.range)) {
//           lwrs.push(l.range);
//           lowers.push(l);
//         }
//       }
//     });

//     return lowers;
//   };

//   const getUniqueUpperTurnPoints = (arr) => {
//     let upprs = [];
//     let uppers = [];

//     arr.forEach((item) => {
//       if (
//         !(
//           item.upper_lower_turn_point === 0 && item.upper_upper_turn_point === 0
//         )
//       ) {
//         let u = {
//           range: item.upper_range,
//           lower: item.upper_lower_turn_point,
//           upper: item.upper_upper_turn_point,
//           id: item.id,
//         };

//         if (!upprs.includes(u.range)) {
//           upprs.push(u.range);
//           uppers.push(u);
//         }
//       }
//     });

//     return uppers;
//   };

//   const form = React.useRef(null);

//   const handleFormReset = () => {
//     setPartTableData(initialPartTableData);

//     const inputs = form.current.querySelectorAll('input');

//     inputs.forEach((input) => {
//       if (input.type === 'checkbox' && input.checked) {
//         input.checked = false;
//       }

//       if (input.type === 'number' && input.value !== '') {
//         input.value = '';
//       }
//     });
//   };

//   const filterInputs = (inputs, filtered) => {
//     inputs.forEach(({ name, value, dataset }) => {
//       if (name === 'standard_parts') {
//         filtered = filtered.filter((item) => item.standard_parts === value);
//       }
//       if (name === 'stock') {
//         filtered = filtered.filter((item) => item.stock > 0);
//       }
//       if (name === 'frequency') {
//         filtered = filtered.filter(
//           (item) => item.frequency === parseFloat(value)
//         );
//       }
//       if (name === 'esr') {
//         filtered = filtered.filter((item) => item.esr === parseFloat(value));
//       }
//       if (name === 'cut') {
//         filtered = filtered.filter((item) => item.cut === value);
//       }
//       if (name === 'mode') {
//         filtered = filtered.filter((item) => item.mode === value);
//       }
//       if (name === 'q_factor') {
//         filtered = filtered.filter(
//           (item) => item.q_factor === parseFloat(value)
//         );
//       }
//       if (name === 'freq_tol') {
//         filtered = filtered.filter(
//           (item) => item.freq_tol === parseFloat(value)
//         );
//       }
//       if (name === 'height') {
//         filtered = filtered.filter((item) => item.height === parseFloat(value));
//       }
//       if (name === 'freq_stability') {
//         filtered = filtered.filter(
//           (item) => item.freq_stability === parseFloat(value)
//         );
//       }
//     });

//     return filtered;
//   };

//   const handleFormSubmit = (e) => {
//     e.preventDefault();

//     let filtered = [...initialPartTableData];

//     const inputs = form.current.querySelectorAll('input');
//     const inpts = [];

//     inputs.forEach((input) => {
//       if (input.type === 'checkbox' && input.checked) {
//         inpts.push(input);
//       }

//       if (input.type === 'number' && input.value !== '') {
//         inpts.push(input);
//       }
//     });

//     // no inputs selected reset
//     if (inpts.length < 1) {
//       setPartTableData(initialPartTableData);
//       return;
//     }

//     const filt = filterInputs(inpts, filtered);

//     setPartTableData(filt);

//     return;
//   };

//   const handleFormChange = (e) => {
//     let filtered = [...initialPartTableData];

//     if (e.target.type === 'number') {
//       return;
//     }

//     const inputs = form.current.querySelectorAll('input');
//     const inpts = [];

//     inputs.forEach((input) => {
//       if (input.type === 'checkbox' && input.checked) {
//         inpts.push(input);
//       }

//       if (input.type === 'number' && input.value !== '') {
//         inpts.push(input);
//       }
//     });

//     // no inputs selected reset
//     if (inpts.length < 1) {
//       setPartTableData(initialPartTableData);
//       return;
//     }

//     const filt = filterInputs(inpts, filtered);

//     setPartTableData(filt);

//     return;
//   };

//   return (
//     <>
//       <button onClick={() => handleFormReset()}>Reset Filters</button>
//       <form
//         className='inner__filters header'
//         ref={form}
//         onSubmit={(e) => handleFormSubmit(e)}
//         onChange={(e) => handleFormChange(e)}
//         style={{ gridTemplateColumns: 'repeat(15, 1fr)' }}
//       >
//         <div className='model'></div>
//         <div className='standard_parts'>
//           {getUnique(partTableData.map((item) => item.standard_parts)).map(
//             (item) => (
//               <fieldset key={item}>
//                 <label htmlFor={`${id}${item}`}>
//                   {item}
//                   <input
//                     type='checkbox'
//                     name='standard_parts'
//                     id={`${id}${item}`}
//                     value={item}
//                   />
//                 </label>
//               </fieldset>
//             )
//           )}
//         </div>
//         <div className='stock'>
//           <fieldset>
//             <label htmlFor={`${id}stock`}>
//               In Stock
//               <input
//                 type='checkbox'
//                 name='stock'
//                 id={`${id}stock`}
//                 value='in'
//               />
//             </label>
//           </fieldset>
//         </div>
//         <div className='frequency'>
//           {getUnique(partTableData.map((item) => item.frequency)).map(
//             (item) => (
//               <fieldset key={item}>
//                 <label htmlFor={`${id}${item}`}>
//                   {item}
//                   <input
//                     type='checkbox'
//                     name='frequency'
//                     id={`${id}${item}`}
//                     value={item}
//                   />
//                 </label>
//               </fieldset>
//             )
//           )}
//         </div>
//         <div className='esr'>
//           {getUnique(partTableData.map((item) => item.esr)).map((item) => (
//             <fieldset key={item}>
//               <label htmlFor={`${id}${item}`}>
//                 {item}
//                 <input
//                   type='checkbox'
//                   name='esr'
//                   id={`${id}${item}`}
//                   value={item}
//                 />
//               </label>
//             </fieldset>
//           ))}
//         </div>
//         <div className='cut'>
//           {getUnique(partTableData.map((item) => item.cut)).map((item) => (
//             <fieldset key={item}>
//               <label htmlFor={`${id}${item}`}>
//                 {item}
//                 <input
//                   type='checkbox'
//                   name='cut'
//                   id={`${id}${item}`}
//                   value={item}
//                 />
//               </label>
//             </fieldset>
//           ))}
//         </div>
//         <div className='mode'>
//           {getUnique(partTableData.map((item) => item.mode)).map((item) => (
//             <fieldset key={item}>
//               <label htmlFor={`${id}${item}`}>
//                 {item}
//                 <input
//                   type='checkbox'
//                   name='mode'
//                   id={`${id}${item}`}
//                   value={item}
//                 />
//               </label>
//             </fieldset>
//           ))}
//         </div>
//         <div className='q_factor'>
//           {getUnique(partTableData.map((item) => item.q_factor)).map((item) => (
//             <fieldset key={item}>
//               <label htmlFor={`${id}${item}`}>
//                 {item}
//                 <input
//                   type='checkbox'
//                   name='q_factor'
//                   id={`${id}${item}`}
//                   value={item}
//                 />
//               </label>
//             </fieldset>
//           ))}
//         </div>
//         <div className='freq_tol'>
//           {getUnique(partTableData.map((item) => item.freq_tol)).map((item) => (
//             <fieldset key={item}>
//               <label htmlFor={`${id}${item}`}>
//                 {item}
//                 <input
//                   type='checkbox'
//                   name='freq_tol'
//                   id={`${id}${item}`}
//                   value={item}
//                 />
//               </label>
//             </fieldset>
//           ))}
//         </div>
//         <div className='height'>
//           {getUnique(partTableData.map((item) => item.height)).map((item) => (
//             <fieldset key={item}>
//               <label htmlFor={`${id}${item}`}>
//                 {item}
//                 <input
//                   type='checkbox'
//                   name='height'
//                   id={`${id}${item}`}
//                   value={item}
//                 />
//               </label>
//             </fieldset>
//           ))}
//         </div>
//         <div className='temp_range'>
//           {getUniqueTemps(partTableData).map((item) => (
//             <fieldset key={item.id}>
//               <label htmlFor={item.id}>
//                 {item.range}
//                 <input
//                   type='checkbox'
//                   name='temp_range'
//                   id={item.id}
//                   value={item.range}
//                   data-lower={item.lower}
//                   data-upper={item.upper}
//                 />
//               </label>
//             </fieldset>
//           ))}
//         </div>
//         <div className='freq_stability'>
//           {getUnique(partTableData.map((item) => item.freq_stability)).map(
//             (item) => (
//               <fieldset key={item}>
//                 <label htmlFor={`${id}${item}`}>
//                   {item}
//                   <input
//                     type='checkbox'
//                     name='freq_stability'
//                     id={`${id}${item}`}
//                     value={item}
//                   />
//                 </label>
//               </fieldset>
//             )
//           )}
//         </div>
//         <div className='lower_turn_point'>
//           {getUniqueLowerTurnPoints(initialPartTableData).map((item) => (
//             <fieldset key={item.id}>
//               <label htmlFor={`${item.id}${item.range}`}>
//                 {item.range}
//                 <input
//                   type='checkbox'
//                   name='lower_turn'
//                   id={`${item.id}${item.range}`}
//                   value={item.range}
//                   data-lower={item.lower}
//                   data-upper={item.upper}
//                 />
//               </label>
//             </fieldset>
//           ))}
//         </div>
//         <div className='upper_turn_point'>
//           {getUniqueUpperTurnPoints(initialPartTableData).map((item) => (
//             <fieldset key={item.id}>
//               <label htmlFor={`${item.id}${item.range}`}>
//                 {item.range}
//                 <input
//                   type='checkbox'
//                   name='upper_turn'
//                   id={`${item.id}${item.range}`}
//                   value={item.range}
//                   data-lower={item.lower}
//                   data-upper={item.upper}
//                 />
//               </label>
//             </fieldset>
//           ))}
//         </div>
//         <div className='mounting'>
//           {getUnique(partTableData.map((item) => item.mounting)).map((item) => (
//             <fieldset key={item}>
//               <label htmlFor={`${id}${item}`}>
//                 {item}
//                 <input
//                   type='checkbox'
//                   name='mounting'
//                   id={`${id}${item}`}
//                   value={item}
//                 />
//               </label>
//             </fieldset>
//           ))}
//         </div>
//       </form>
//     </>
//   );
// }

// function CrystalTablePart({ part }) {
//   return (
//     <div className='part__row'>
//       <div>{part.model}</div>
//       <div>{part.standard_parts}</div>
//       <div>{part.stock}</div>
//       <div>{part.frequency}MHz</div>
//       <div>{part.esr}Ω</div>
//       <div>{part.cut}</div>
//       <div>{part.mode}</div>
//       <div>{part.q_factor}K</div>
//       <div>±{part.freq_tol}ppm</div>
//       <div>{part.height}mm</div>
//       <div>
//         {part.temp_lower} to {part.temp_upper}˚C
//       </div>
//       <div>±{part.freq_stability}ppm</div>
//       <div>{part.lower_turn_point}˚C</div>
//       <div>{part.upper_turn_point}˚C</div>
//       <div>{part.mounting}</div>
//     </div>
//   );
// }

// ReactDOM.render(
//   <React.StrictMode>
//     <Crystal />
//   </React.StrictMode>,
//   document.getElementById('insertTable')
// );

"use strict";

function Crystal() {
  const [tableData, setTableData] = React.useState([]);
  const [initialTableData, setInitialTableData] = React.useState([]);
  const [features, setFeatures] = React.useState([]);
  const [initialFeatures, setInitialFeatures] = React.useState([]);
  const [heights, setHeights] = React.useState([]);
  const [initialHeights, setInitialHeights] = React.useState([]); // fetch all products

  async function fetchInitialTableData() {
    const res = await fetch('/api/quartz-crystals', {
      mode: 'cors'
    });
    const data = await res.json();
    console.log(data);
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
    setHeights: setHeights,
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
    item: item,
    tableData: tableData
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
  const getUnique = arr => {
    return [...new Set(arr)];
  };

  const getUniqueTemps = arr => {
    let tmps = [];
    let temps = [];
    arr.forEach(item => {
      if (!(item.temp_lower === 0 && item.temp_upper === 0)) {
        let t = {
          range: item.temp_range,
          lower: item.temp_lower,
          upper: item.temp_upper,
          id: item.id
        };

        if (!tmps.includes(t.range)) {
          tmps.push(t.range);
          temps.push(t);
        }
      }
    });
    return temps;
  };

  const getUniqueLowerTurnPoints = arr => {
    let lwrs = [];
    let lowers = [];
    arr.forEach(item => {
      if (!(item.lower_lower_turn_point === 0 && item.lower_upper_turn_point === 0)) {
        let l = {
          range: item.lower_range,
          lower: item.lower_lower_turn_point,
          upper: item.lower_upper_turn_point,
          id: item.id
        };

        if (!lwrs.includes(l.range)) {
          lwrs.push(l.range);
          lowers.push(l);
        }
      }
    });
    return lowers;
  };

  const getUniqueUpperTurnPoints = arr => {
    let upprs = [];
    let uppers = [];
    arr.forEach(item => {
      if (!(item.upper_lower_turn_point === 0 && item.upper_upper_turn_point === 0)) {
        let u = {
          range: item.upper_range,
          lower: item.upper_lower_turn_point,
          upper: item.upper_upper_turn_point,
          id: item.id
        };

        if (!upprs.includes(u.range)) {
          upprs.push(u.range);
          uppers.push(u);
        }
      }
    });
    return uppers;
  };

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
      value,
      dataset
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

      if (name === 'temp_range') {
        filtered = filtered.filter(item => item.temp_lower <= dataset.lower);
        filtered = filtered.filter(item => item.temp_upper >= dataset.upper);
      }

      if (name === 'stability') {
        filtered = filtered.filter(item => item.freq_stability <= value);
      }

      if (name === 'lower_turn') {
        filtered = filtered.filter(item => item.lower_lower_turn_point <= dataset.lower);
        filtered = filtered.filter(item => item.lower_upper_turn_point >= dataset.upper);
      }

      if (name === 'upper_turn') {
        filtered = filtered.filter(item => item.upper_lower_turn_point <= dataset.lower);
        filtered = filtered.filter(item => item.upper_upper_turn_point >= dataset.upper);
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
    setTableData(filt); // let feats = [];
    // filt.forEach((item) => {
    //   initialFeatures.forEach((feat) => {
    //     if (item.features.includes(feat.feature)) {
    //       feats.push(feat);
    //     }
    //   });
    // });
    // setFeatures([...new Set(feats)]);

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
    setTableData(filt); // let feats = [];
    // filt.forEach((item) => {
    //   initialFeatures.forEach((feat) => {
    //     if (item.features.includes(feat.feature)) {
    //       feats.push(feat);
    //     }
    //   });
    // });
    // setFeatures([...new Set(feats)]);

    return;
  };

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
    onClick: () => handleFormReset()
  }, "Reset Filters"), /*#__PURE__*/React.createElement("form", {
    className: "filters header",
    ref: form,
    onSubmit: e => handleFormSubmit(e),
    onChange: e => handleFormChange(e)
  }, /*#__PURE__*/React.createElement("div", {
    className: ""
  }), /*#__PURE__*/React.createElement("div", {
    className: "model"
  }, initialTableData.map(item => /*#__PURE__*/React.createElement("fieldset", {
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
  }, getUnique(initialTableData.map(item => item.holder)).map(item => /*#__PURE__*/React.createElement("fieldset", {
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
  }, getUnique(initialTableData.map(item => item.cut)).map(item => /*#__PURE__*/React.createElement("fieldset", {
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
  }, getUnique(initialTableData.map(item => item.mode)).map(item => /*#__PURE__*/React.createElement("fieldset", {
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
  }, getUnique(initialTableData.map(item => item.freq_tol)).map(item => /*#__PURE__*/React.createElement("fieldset", {
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
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "temp_range"
  }, getUniqueTemps(initialTableData).map(item => /*#__PURE__*/React.createElement("fieldset", {
    key: item.id
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: `${item.id}${item.range}`
  }, item.range, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    name: "temp_range",
    id: `${item.id}${item.range}`,
    value: item.range,
    "data-lower": item.lower,
    "data-upper": item.upper
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "stability"
  }, getUnique(initialTableData.map(item => item.freq_stability)).map(item => /*#__PURE__*/React.createElement("fieldset", {
    key: item
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: item
  }, item, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    name: "stability",
    id: item,
    value: item
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "lower_turn"
  }, getUniqueLowerTurnPoints(initialTableData).map(item => /*#__PURE__*/React.createElement("fieldset", {
    key: item.id
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: `${item.id}${item.range}`
  }, item.range, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    name: "lower_turn",
    id: `${item.id}${item.range}`,
    value: item.range,
    "data-lower": item.lower,
    "data-upper": item.upper
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "upper_turn"
  }, getUniqueUpperTurnPoints(initialTableData).map(item => /*#__PURE__*/React.createElement("fieldset", {
    key: item.id
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: `${item.id}${item.range}`
  }, item.range, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    name: "upper_turn",
    id: `${item.id}${item.range}`,
    value: item.range,
    "data-lower": item.lower,
    "data-upper": item.upper
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "mounting"
  }, getUnique(initialTableData.map(item => item.mounting)).map(item => /*#__PURE__*/React.createElement("fieldset", {
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
  item,
  tableData
}) {
  const [rowOpen, setRowOpen] = React.useState(false);

  function handleRowClick() {
    setRowOpen(!rowOpen);
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
  }, /*#__PURE__*/React.createElement("p", null, item.temp_lower === 0 && item.temp_upper === 0 ? 'n/a' : `${item.temp_range}˚C`)), /*#__PURE__*/React.createElement("div", {
    className: "freq_stability"
  }, /*#__PURE__*/React.createElement("p", null, "\xB1", item.freq_stability, "ppm")), /*#__PURE__*/React.createElement("div", {
    className: "lower_turn_point"
  }, /*#__PURE__*/React.createElement("p", null, item.lower_range === ' to ' ? 'n/a' : `${item.lower_range}˚C`)), /*#__PURE__*/React.createElement("div", {
    className: "upper_turn_point"
  }, /*#__PURE__*/React.createElement("p", null, item.upper_range === ' to ' ? 'n/a' : `${item.upper_range}˚C`)), /*#__PURE__*/React.createElement("div", {
    className: "mounting"
  }, /*#__PURE__*/React.createElement("p", null, item.mounting)), /*#__PURE__*/React.createElement("div", {
    className: "image"
  }, /*#__PURE__*/React.createElement("img", {
    src: item.image,
    alt: item.model
  })), /*#__PURE__*/React.createElement(CrystalTablePartWrapper, {
    item: item,
    tableData: tableData,
    rowOpen: rowOpen
  }));
}

function CrystalTablePartWrapper({
  item,
  tableData,
  rowOpen
}) {
  const [partTableData, setPartTableData] = React.useState(item.parts);
  const [initialPartTableData, setInitialPartTableData] = React.useState(item.parts);
  return /*#__PURE__*/React.createElement("section", {
    className: "expanded__row",
    style: {
      display: rowOpen ? 'block' : 'none'
    }
  }, /*#__PURE__*/React.createElement("section", {
    className: "inner__header"
  }, item.parts.length > 1 ? /*#__PURE__*/React.createElement(CrystalPartFilters, {
    partTableData: partTableData,
    setPartTableData: setPartTableData,
    initialPartTableData: initialPartTableData,
    id: item.id
  }) : ''), /*#__PURE__*/React.createElement("section", {
    className: "part__header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "model"
  }, "Model"), /*#__PURE__*/React.createElement("div", {
    className: "standard_parts"
  }, "Standard Parts"), /*#__PURE__*/React.createElement("div", {
    className: "stock"
  }, "Stock"), /*#__PURE__*/React.createElement("div", {
    className: "frequency"
  }, "Frequency"), /*#__PURE__*/React.createElement("div", {
    className: "esr"
  }, "ESR"), /*#__PURE__*/React.createElement("div", {
    className: "cut"
  }, "Cut"), /*#__PURE__*/React.createElement("div", {
    className: "mode"
  }, "Mode"), /*#__PURE__*/React.createElement("div", {
    className: "q_factor"
  }, "Q Factor"), /*#__PURE__*/React.createElement("div", {
    className: "freq_tol"
  }, "Freq Tol"), /*#__PURE__*/React.createElement("div", {
    className: "height"
  }, "Height"), /*#__PURE__*/React.createElement("div", {
    className: "temp_range"
  }, "Temp Range"), /*#__PURE__*/React.createElement("div", {
    className: "stability"
  }, "Stability"), /*#__PURE__*/React.createElement("div", {
    className: "lower_turn_point"
  }, "Lower Turn Point"), /*#__PURE__*/React.createElement("div", {
    className: "upper_turn_point"
  }, "Upper Turn Point"), /*#__PURE__*/React.createElement("div", {
    className: "mounting"
  }, "Mounting")), partTableData.map(part => /*#__PURE__*/React.createElement(CrystalTablePart, {
    key: part.id,
    part: part
  })));
}

function CrystalPartFilters({
  initialPartTableData,
  partTableData,
  setPartTableData,
  id
}) {
  // get unique items from array
  const getUnique = arr => {
    return [...new Set(arr)];
  };

  const getUniqueTemps = arr => {
    let tmps = [];
    let temps = [];
    arr.forEach(item => {
      if (!(item.temp_lower === 0 && item.temp_upper === 0)) {
        let t = {
          range: item.temp_range,
          lower: item.temp_lower,
          upper: item.temp_upper,
          id: item.id
        };

        if (!tmps.includes(t.range)) {
          tmps.push(t.range);
          temps.push(t);
        }
      }
    });
    return temps;
  };

  const getUniqueLowerTurnPoints = arr => {
    let lwrs = [];
    let lowers = [];
    arr.forEach(item => {
      if (!(item.lower_lower_turn_point === 0 && item.lower_upper_turn_point === 0)) {
        let l = {
          range: item.lower_range,
          lower: item.lower_lower_turn_point,
          upper: item.lower_upper_turn_point,
          id: item.id
        };

        if (!lwrs.includes(l.range)) {
          lwrs.push(l.range);
          lowers.push(l);
        }
      }
    });
    return lowers;
  };

  const getUniqueUpperTurnPoints = arr => {
    let upprs = [];
    let uppers = [];
    arr.forEach(item => {
      if (!(item.upper_lower_turn_point === 0 && item.upper_upper_turn_point === 0)) {
        let u = {
          range: item.upper_range,
          lower: item.upper_lower_turn_point,
          upper: item.upper_upper_turn_point,
          id: item.id
        };

        if (!upprs.includes(u.range)) {
          upprs.push(u.range);
          uppers.push(u);
        }
      }
    });
    return uppers;
  };

  const form = React.useRef(null);

  const handleFormReset = () => {
    setPartTableData(initialPartTableData);
    const inputs = form.current.querySelectorAll('input');
    inputs.forEach(input => {
      if (input.type === 'checkbox' && input.checked) {
        input.checked = false;
      }

      if (input.type === 'number' && input.value !== '') {
        input.value = '';
      }
    });
  };

  const filterInputs = (inputs, filtered) => {
    inputs.forEach(({
      name,
      value,
      dataset
    }) => {
      if (name === 'standard_parts') {
        filtered = filtered.filter(item => item.standard_parts === value);
      }

      if (name === 'stock') {
        filtered = filtered.filter(item => item.stock > 0);
      }

      if (name === 'frequency') {
        filtered = filtered.filter(item => item.frequency === parseFloat(value));
      }

      if (name === 'esr') {
        filtered = filtered.filter(item => item.esr === parseFloat(value));
      }

      if (name === 'cut') {
        filtered = filtered.filter(item => item.cut === value);
      }

      if (name === 'mode') {
        filtered = filtered.filter(item => item.mode === value);
      }

      if (name === 'q_factor') {
        filtered = filtered.filter(item => item.q_factor === parseFloat(value));
      }

      if (name === 'freq_tol') {
        filtered = filtered.filter(item => item.freq_tol === parseFloat(value));
      }

      if (name === 'height') {
        filtered = filtered.filter(item => item.height === parseFloat(value));
      }

      if (name === 'freq_stability') {
        filtered = filtered.filter(item => item.freq_stability === parseFloat(value));
      }
    });
    return filtered;
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    let filtered = [...initialPartTableData];
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
      setPartTableData(initialPartTableData);
      return;
    }

    const filt = filterInputs(inpts, filtered);
    setPartTableData(filt);
    return;
  };

  const handleFormChange = e => {
    let filtered = [...initialPartTableData];

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
      setPartTableData(initialPartTableData);
      return;
    }

    const filt = filterInputs(inpts, filtered);
    setPartTableData(filt);
    return;
  };

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
    onClick: () => handleFormReset()
  }, "Reset Filters"), /*#__PURE__*/React.createElement("form", {
    className: "inner__filters header",
    ref: form,
    onSubmit: e => handleFormSubmit(e),
    onChange: e => handleFormChange(e),
    style: {
      gridTemplateColumns: 'repeat(15, 1fr)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "model"
  }), /*#__PURE__*/React.createElement("div", {
    className: "standard_parts"
  }, getUnique(partTableData.map(item => item.standard_parts)).map(item => /*#__PURE__*/React.createElement("fieldset", {
    key: item
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: `${id}${item}`
  }, item, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    name: "standard_parts",
    id: `${id}${item}`,
    value: item
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "stock"
  }, /*#__PURE__*/React.createElement("fieldset", null, /*#__PURE__*/React.createElement("label", {
    htmlFor: `${id}stock`
  }, "In Stock", /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    name: "stock",
    id: `${id}stock`,
    value: "in"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "frequency"
  }, getUnique(partTableData.map(item => item.frequency)).map(item => /*#__PURE__*/React.createElement("fieldset", {
    key: item
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: `${id}${item}`
  }, item, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    name: "frequency",
    id: `${id}${item}`,
    value: item
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "esr"
  }, getUnique(partTableData.map(item => item.esr)).map(item => /*#__PURE__*/React.createElement("fieldset", {
    key: item
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: `${id}${item}`
  }, item, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    name: "esr",
    id: `${id}${item}`,
    value: item
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "cut"
  }, getUnique(partTableData.map(item => item.cut)).map(item => /*#__PURE__*/React.createElement("fieldset", {
    key: item
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: `${id}${item}`
  }, item, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    name: "cut",
    id: `${id}${item}`,
    value: item
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "mode"
  }, getUnique(partTableData.map(item => item.mode)).map(item => /*#__PURE__*/React.createElement("fieldset", {
    key: item
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: `${id}${item}`
  }, item, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    name: "mode",
    id: `${id}${item}`,
    value: item
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "q_factor"
  }, getUnique(partTableData.map(item => item.q_factor)).map(item => /*#__PURE__*/React.createElement("fieldset", {
    key: item
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: `${id}${item}`
  }, item, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    name: "q_factor",
    id: `${id}${item}`,
    value: item
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "freq_tol"
  }, getUnique(partTableData.map(item => item.freq_tol)).map(item => /*#__PURE__*/React.createElement("fieldset", {
    key: item
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: `${id}${item}`
  }, item, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    name: "freq_tol",
    id: `${id}${item}`,
    value: item
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "height"
  }, getUnique(partTableData.map(item => item.height)).map(item => /*#__PURE__*/React.createElement("fieldset", {
    key: item
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: `${id}${item}`
  }, item, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    name: "height",
    id: `${id}${item}`,
    value: item
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "temp_range"
  }, getUniqueTemps(partTableData).map(item => /*#__PURE__*/React.createElement("fieldset", {
    key: item.id
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: item.id
  }, item.range, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    name: "temp_range",
    id: item.id,
    value: item.range,
    "data-lower": item.lower,
    "data-upper": item.upper
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "freq_stability"
  }, getUnique(partTableData.map(item => item.freq_stability)).map(item => /*#__PURE__*/React.createElement("fieldset", {
    key: item
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: `${id}${item}`
  }, item, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    name: "freq_stability",
    id: `${id}${item}`,
    value: item
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "lower_turn_point"
  }, getUniqueLowerTurnPoints(initialPartTableData).map(item => /*#__PURE__*/React.createElement("fieldset", {
    key: item.id
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: `${item.id}${item.range}`
  }, item.range, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    name: "lower_turn",
    id: `${item.id}${item.range}`,
    value: item.range,
    "data-lower": item.lower,
    "data-upper": item.upper
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "upper_turn_point"
  }, getUniqueUpperTurnPoints(initialPartTableData).map(item => /*#__PURE__*/React.createElement("fieldset", {
    key: item.id
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: `${item.id}${item.range}`
  }, item.range, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    name: "upper_turn",
    id: `${item.id}${item.range}`,
    value: item.range,
    "data-lower": item.lower,
    "data-upper": item.upper
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "mounting"
  }, getUnique(partTableData.map(item => item.mounting)).map(item => /*#__PURE__*/React.createElement("fieldset", {
    key: item
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: `${id}${item}`
  }, item, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    name: "mounting",
    id: `${id}${item}`,
    value: item
  })))))));
}

function CrystalTablePart({
  part
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "part__row"
  }, /*#__PURE__*/React.createElement("div", null, part.model), /*#__PURE__*/React.createElement("div", null, part.standard_parts), /*#__PURE__*/React.createElement("div", null, part.stock), /*#__PURE__*/React.createElement("div", null, part.frequency, "MHz"), /*#__PURE__*/React.createElement("div", null, part.esr, "\u03A9"), /*#__PURE__*/React.createElement("div", null, part.cut), /*#__PURE__*/React.createElement("div", null, part.mode), /*#__PURE__*/React.createElement("div", null, part.q_factor, "K"), /*#__PURE__*/React.createElement("div", null, "\xB1", part.freq_tol, "ppm"), /*#__PURE__*/React.createElement("div", null, part.height, "mm"), /*#__PURE__*/React.createElement("div", null, part.temp_lower, " to ", part.temp_upper, "\u02DAC"), /*#__PURE__*/React.createElement("div", null, "\xB1", part.freq_stability, "ppm"), /*#__PURE__*/React.createElement("div", null, part.lower_turn_point, "\u02DAC"), /*#__PURE__*/React.createElement("div", null, part.upper_turn_point, "\u02DAC"), /*#__PURE__*/React.createElement("div", null, part.mounting));
}

ReactDOM.render( /*#__PURE__*/React.createElement(React.StrictMode, null, /*#__PURE__*/React.createElement(Crystal, null)), document.getElementById('insertTable'));