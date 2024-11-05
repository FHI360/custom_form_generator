import copy from './Icons/copy.png'
import delete_ from './Icons/red_delete.png'
// import delete_ from './Icons/delete_btn.png'
import edit from './Icons/edit.png'
import rename from './Icons/rename.png'
import sync from './Icons/sync.png'
import cleaning from './Icons/cleaning.png'
import arrowdown from './Icons/arrowdowncustom.png'
import arrowup from './Icons/arrowupcustom.png'
import post_to_dhis2 from './Icons/post_to_dhis2.png'
import guide_icon from './Icons/guide_icon.png'
import swap from './Icons/swap.png'
import { Chip } from '@dhis2-ui/chip'
import classes from './App.module.css'
import { useDataQuery } from '@dhis2/app-runtime';

export const customImage = (source, size='small') => {
      // Check the source and set iconClass accordingly
  let iconClass = '';

  iconClass = size === 'small' ? classes.smallIcon : size === 'large' ? classes.largeIcon : classes.smallIcon;

  if (source.toLowerCase()  === 'copy'){
    return <img src={copy} className={iconClass}/>
  }
  if (source.toLowerCase()  === 'delete'){
    return <img src={delete_} className={iconClass}/>
    // return <Chip icon={<img src={delete_} className={iconClass}/>} 
    //             className={
    //               `${classes.smallIconDestructive}`
    //               }>
    //             <img src={delete_} className={iconClass} />
    //         </Chip>
   
    // return <img src={delete_} className={iconClass}/>
  }
  if (source.toLowerCase()  === 'rename'){
    return <img src={rename} className={iconClass}/>
  }
  if (source.toLowerCase()  === 'edit'){
    return <img src={edit} className={iconClass}/>
  }
  if (source.toLowerCase() === 'sync'){
    return <img src={sync} className={iconClass}/>
  }
  if (source.toLowerCase()  === 'cleaning'){
    return <img src={cleaning} className={iconClass}/>
  }
  if (source.toLowerCase()  === 'arrowup'){
    return <img src={arrowup} className={iconClass}/>
  }
  if (source.toLowerCase()  === 'arrowdown'){
    return <img src={arrowdown} className={iconClass}/>
  }

  if (source.toLowerCase()  === 'post_to_dhis2'){
    return <img src={post_to_dhis2} className={iconClass}/>
  }

  if (source.toLowerCase()  === 'guide_icon'){
    return <img src={guide_icon} className={iconClass}/>
  }
}

export const generateRandomId = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const idLength = 11;
    let randomId = '';
  
    for (let i = 0; i < idLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomId += characters.charAt(randomIndex);
    }
  
    return randomId;
  };

  
export const modifiedDate = () => {
  const now = new Date();

  return now.toISOString();
};

export const alignLevels = (Level) => {
  if (Level === "Horizontal Level 1") {
      return 'HorizontalLevel0';
  } else if (Level === "Horizontal Level 2") {
      return 'HorizontalLevel1';
  } else if (Level === "Vertical Level 1") {
      return 'verticalLevel1';
  } else if (Level === "Vertical Level 2") {
      return 'verticalLevel2';
  } else if (Level === "Vertical Level 3") {
      return 'verticalLevel3';
  } else {
      return '';
  }
}


export const trimNameToMax50Chars = (name) => {

  const maxNameLength = 50;
  return name.trim().slice(0, maxNameLength);
}


export const alignLevelsReverse = (Level) => {
  if (Level === "HorizontalLevel0") {
      return "Horizontal Level 1";
  } else if (Level === "HorizontalLevel1") {
      return "Horizontal Level 2";
  } else if (Level === "verticalLevel1") {
      return "Vertical Level 1";
  } else if (Level === "verticalLevel2") {
      return "Vertical Level 2";
  } else if (Level ===  "verticalLevel3") {
      return "Vertical Level 3";
  } else {
      return '';
  }
}


export const updateDataStore = async (engine, postObject, store, key) =>{

  if (!postObject.hasOwnProperty('modifiedDate')) {
      // If it doesn't exist, add it to the object
      postObject.modifiedDate = modifiedDate();
  } else {
      // If it exists, update its value
      postObject.modifiedDate = modifiedDate();
  }
  try {
      await engine.mutate({
        resource: `dataStore/${store}/${key}`,
        type: 'update',
        data: postObject,
      });

      return true

    } catch (error) {
      // Handle error (log, show alert, etc.)
      console.error('Error updating object:', error);
      return false
    }
}


// const updateDataStore = async (postObject, store, key) =>{

//   try {
//       await props.engine.mutate({
//         resource: `dataStore/${store}/${key}`,
//         type: 'update',
//         data: postObject,
//       });

//     } catch (error) {
//       // Handle error (log, show alert, etc.)
//       console.error('Error updating object:', error);
//     }
// }


export const createDataStore = async (engine, postObject, store, key) =>{

  if (!postObject.hasOwnProperty('modifiedDate')) {
      // If it doesn't exist, add it to the object
      postObject.modifiedDate = modifiedDate();
  } else {
      // If it exists, update its value
      postObject.modifiedDate = modifiedDate();
  }
  try {
    await engine.mutate({
      resource: `dataStore/${store}/${key}`,
      type: 'create',
      data: postObject,
    });

  } catch (error) {
    // Handle error (log, show alert, etc.)
    console.error('Error creating object:', error);
    return false
  }
  return true
}

export const createOrUpdateDataStore = async (engine, postObject, store, key, mode='') =>{

  if (!postObject.hasOwnProperty('modifiedDate')) {
      // If it doesn't exist, add it to the object
      postObject.modifiedDate = modifiedDate();
  } else {
      // If it exists, update its value
      postObject.modifiedDate = modifiedDate();
  }
  let modeType=''

  if (mode === 'create'){
        if (!postObject.hasOwnProperty('createdDate')) {
            // If it doesn't exist, add it to the object
            postObject.createdDate = modifiedDate();
        } else {
            // If it exists, update its value
            postObject.createdDate = modifiedDate();
        }
          modeType=true
  }else if (mode === 'update'){
        modeType=false
  }

  try {
    await engine.mutate({
      resource: `dataStore/${store}/${key}`,
      type: modeType ? 'create' : 'update',
      data: postObject,
    });
  } catch (error) {
      console.error('Error creating or updating object:', error);
  }
}


export const queryCatCombo = async (catCombo) =>{


    // Query to fetch data elements and their category information
    const query = {
      categoryCombo: {
        resource: 'categoryCombos',
        params: {
          fields: 'id,name,categories[id,name,categoryOptions[id,name]]',
          filter: `id:eq:${catCombo}`,
        }
      }
    };

    const { data } = useDataQuery(query);
    return data


}


export const deleteObjects = async (engine, store, key, obj) =>{

  try {
    await engine.mutate({
      resource: `dataStore/${store}/${key}`,
      type: 'delete',
    });
    console.log(`${obj} ${key} deleted`);
    return true
  } catch (error) {
    console.error(`Error deleting ${key}`, error);
    return false
  }
}


export const updateDataEntryForm = {
  type: 'update',
  partial: true,
  resource: 'dataEntryForms',
  id: ({ id }) => id,
  data: ({ htmlCode }) => ({ htmlCode }),
}

//   id: 'kdUSL5XHBPo',

// data: {
//   htmlCode: htmlContent,
// },
const updateMutation = {
  type: 'update',
  partial: true,
  resource: 'datasets',
  id: 'xyz123',
  data: {
      name: 'MyNewName',
  },
}


export const addCodeMutation = {
  type: 'update',
  resource: 'dataElements',
  id: ({ id }) => id,
  partial: true,
  data: ({ code }) => (code),
}


export const transformData = (nestedArray) => {
  return nestedArray.map(([, project]) => project);
};