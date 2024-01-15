import React, { useState, useEffect } from 'react';
import { Transfer } from '@dhis2-ui/transfer';

const HorizontalTransferLevel1 = (props) => {
  // State to hold the category options
  const [categoryOptions, setCategoryOptions] = useState([]);
  // state for whether the next page's options are being loaded
  const [loading, setLoading] = useState(false)
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [filerteredCategoryOptionsSelected, setfilerteredCategoryOptionsSelected] = useState([]);
  
  // Function to handle the change of the selected category
  const handleHorizontalTransferChange = (selected) => {

    setSelectedKeys(selected);
        // Create a new array with only necessary properties for the remaining records
    const filteredOptionsSelected = filerteredCategoryOptionsSelected
        .filter(category => selected.includes(category.value))
        .map(({ value, label }) => ({ id:value, name:label }));
    props.setdictfileredVerticalCatComboLevel1(filteredOptionsSelected)

  }


  useEffect(() => {
    setLoading(true)
    const filteredCategories = props.fileredVerticalCatComboLevel1 || [];

    // Extract horizontal category selected
    const selectCategory = filteredCategories.filter(category => category.id === props.selectedVerticalCategoryIDLevel1) || [];

    // Extract categoryOptions from each object
    const categoryOptionsArray = selectCategory.map(category => category.categoryOptions) || [];
    
    // Flatten the array of arrays into a single array
    const allCategoryOptions = [].concat(...categoryOptionsArray);


   if (props.selectedVerticalCategoryIDLevel1 !== undefined 
    && props.selectedVerticalCategoryIDLevel1 !== null 
    && props.selectedVerticalCategoryIDLevel1 !== '') {

        const options = allCategoryOptions?.map(option => ({
            value: option.id,
            label: option.name,
          })) || [];

                            // Now, allCategoryOptions contains all the category options
        const options_init = allCategoryOptions?.map(option => ({
          id: option.id,
          name: option.name,

        })) || [];
        
        props.setVerticalCategoryOptionsLevel1(options)
        setfilerteredCategoryOptionsSelected(options);
        props.setdictfileredVerticalCatComboLevel1(options_init); 
        setSelectedKeys(options.map(option => option.value)); // Set all options to the right by default
    } else {
        props.setVerticalCategoryOptionsLevel1([]);
    }
    console.log(selectedKeys)
    // setCategoryOptions(options);
    setLoading(false)
  }, [props.fileredVerticalCatComboLevel1, props.selectedVerticalCategoryIDLevel1]);

  return (
    <div>
      {/* Render the Transfer component with category options */}
      <Transfer
        filterable
        filterablePicked
        loading={loading}        
        enableOrderChange
        options={props.verticalCategoryOptionsLevel1}
        selected={selectedKeys}
        onChange={({ selected }) => {
          handleHorizontalTransferChange(selected);
          }}
        // selectedEmptyComponent={<p style={{textAlign: 'center'}}>You have not selected anything yet<br /></p>}
      />
    </div>
  );
};

export default HorizontalTransferLevel1;