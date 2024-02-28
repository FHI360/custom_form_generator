import { useDataQuery } from '@dhis2/app-runtime'
import {useState, useEffect } from 'react';
import React from 'react'
import classes from './App.module.css'
import { SingleSelect, SingleSelectOption, SingleSelectField  } from '@dhis2-ui/select'

const dataSets = {
    targetedEntity: {
      resource: 'dataSets',
      params: ({dataSet})=>({
        fields: 'id,name,dataSetElements(dataElement(id,displayName))',
        filter: `id:eq:${dataSet}`,
      }),

    },
  }

  const catComboQuery = {
    dataElement: {
      resource: 'dataElements',
      id: ({id})=>(id),
      params: {
        fields: 'id,dataSetElements,categoryCombo[name,id,categories[id,name, categoryOptions[id,name]]]',
      },
    },
  }



const AppGetDEList = props => {

    const [disabled, setDisable] = useState(false)
    const [dataElemntID, setDataElement] = useState('xxxxx')
    const {loading: loading, error: error, data: data, refetch: refetch } = useDataQuery(dataSets, {variables: {dataSet: props.selectedDataSet}})
    const {loading: catLoading, error: cateEerror, data: catData, refetch: catRefetch } = useDataQuery(catComboQuery, {variables: {id: dataElemntID}})

    useEffect(() => {
        setDataElement(props.selectedDataElementId)
        refetch({dataSet: props.selectedDataSet})
        catRefetch({id: dataElemntID})
        if (props.editMode){
          setDisable(!!props.selectedDataElementId);
        }        
    }, [props.selectedDataSet, props.selectedDataElementId,props.isHorizontalCategoryExpanded0]);

    useEffect(() => {
      if (catData){
        for (const dataSetElement of catData.dataElement.dataSetElements) {
          if (dataSetElement.dataSet.id === props.selectedDataSet && dataSetElement.categoryCombo) {
            props.setOveridingCategory(dataSetElement.categoryCombo.id)
            console.log('catData: DataElement =>',catData)
            break; // Stop the loop since we found the desired dataSetElement
          }else{
            props.setOveridingCategory('xxxxx')

          }
        }        
      }
     
    }, [catData,props.isHorizontalCategoryExpanded0]);


    const handleDataElementChange = (selected) => {
        props.setSelectedDataElementId(selected);
        setDataElement(selected)
        console.log('props.setSelectedDataElementId updated: ', selected)

        // Find the record with the matching id
        const selectedDataElement = dataElements.find(dataElement => dataElement.dataElement.id === selected);
          
        //Selected data element
        // Check if selectedDataElement has a value, and set disabled accordingly

        if (props.editMode){
          setDisable(!!selectedDataElement);
        }
        
        if (selectedDataElement) {         
          props.setSelectedDataElement(selectedDataElement.dataElement.displayName);

        } else {

          props.setSelectedDataElement('');
        }
      

      };

    if (error) {
        return <span>ERROR: {error.message}</span>
    }

    if (loading) {
        return <span>Loading...</span>
    }
    // if (cateEerror){
    //   return <span>ERROR: {cateEerror.message}</span>
    // }
    if(catLoading)
    {
      return <span>Loading...</span>
    }
 

    const dataElements = data.targetedEntity.dataSets[0]?.dataSetElements || [];

    return (
      
        <div className={classes.baseMargin}>
                    <SingleSelect
                            className="select"
                            filterable
                            noMatchText="No match found"
                            placeholder="Select DataElement"
                            selected={props.selectedDataElementId}
                            value={props.selectedDataElementId}
                            // onChange={handleDataElementChange}
                            onChange={({ selected }) => handleDataElementChange(selected)}
                            disabled={disabled}
                        >
                            {dataElements.map(({ dataElement }) => (
                            <SingleSelectOption
                                label={dataElement.displayName}
                                key={dataElement.id}
                                value={dataElement.id}
                            />
                            ))}
                        </SingleSelect>



       </div>
      
    )
}

export default AppGetDEList