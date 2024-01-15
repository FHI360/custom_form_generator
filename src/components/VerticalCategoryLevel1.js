import React, { useState, useEffect } from 'react';
import { SingleSelect, SingleSelectOption } from '@dhis2-ui/select';
import classes from '../App.module.css'

const VerticalCategoryLevel1 = (props) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [horizontalCategories, setHorizontalCategories] = useState([]);
  const filteredCategories = props.fileredVerticalCatComboLevel1 || [];

  useEffect(() => {
    // Filter out the selected vertical category

    setHorizontalCategories(filteredCategories);

   // Reset selected category when data changes
    setSelectedCategory(null);
  }, [props.fileredVerticalCatComboLevel1]);

  const handleHorizontalCategoryChange = (selected) => {
    setSelectedCategory(selected)
    props.setSelectedVerticalCategoryIDLevel1(selected)
    const notSelectedCategories = filteredCategories.filter(category => category.id !== selected);
    props.setfileredVerticalCatComboLevel2(notSelectedCategories)
    const SelectedCategories = filteredCategories.filter(category => category.id === selected);
    props.setSelectedVerticalCategoryNameLevel1(SelectedCategories[0].name)
    props.setVerticalCategoryOptionsLevel1([])
    props.setdictfileredVerticalCatComboLevel2([])
  }

  return (
    <div className={classes.baseMargin}>
      <SingleSelect
        filterable
        noMatchText="No categories found"
        placeholder="Select category"
        selected={selectedCategory}
        value={selectedCategory}
        onChange={({ selected }) => handleHorizontalCategoryChange(selected)}
      >
        {horizontalCategories.map(category => (
          <SingleSelectOption key={category.id} label={category.name} value={category.id} />
        ))}
      </SingleSelect>
    </div>
  );
};

export default VerticalCategoryLevel1;
