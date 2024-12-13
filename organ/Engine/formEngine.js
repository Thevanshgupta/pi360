import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  LongInputField,
  ShortInputField,
  SelectBoxButton,
  DatePickerButton,
  BigInputField,
  BigUploadField,
} from '../DataEntryScreens/FeildComponents';
import Toast from 'react-native-simple-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-native';

const FormEngine = ({ formData, formName, setTitle }) => {
  setTitle(formName);
  const [formState, setFormState] = useState({});
  const navigate = useNavigate();

  const apiref = useRef('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (fieldName, value = '#') => {
    if (value === '#') {
      setFormState({ ...formState, ...fieldName });
    } else {
      setFormState({ ...formState, [fieldName]: value });
    }
  };

  const handleSubmit = async () => {
    const missingFields = [];
    function checkValue(feild){
      console.log(feild.name)
      console.log(formState[feild.name]=== "")
      if (feild.required && (Object.keys(formState).includes(feild.name)?formState[feild.name]=== "":false)){
        missingFields.push(feild.label)
      }else{
        let index = missingFields.indexOf(feild.label)
        if (index > -1) {
          missingFields.splice(index);
        }
      }
      if (feild.dependencies){
        feild.dependencies.map(dep=>{
          checkValue(dep)
        })
        return
      }
    }
    
    formData.forEach(form => {
      if (form.name === formName) {
        Object.keys(form.fields).forEach(fieldName => {
          const field = form.fields[fieldName];
          checkValue(field)
        });
      }
    });
    console.log(formState)
    if (missingFields.length > 0) {
      Alert.alert(
        'Missing Fields',
        `Please fill the following fields: ${missingFields.join(', ')}`,
      );
      return;
    }
    const submitObject = [];
    Object.keys(formState).map(key => {
      submitObject.push({ name: key, value: formState[key] });
    });
    console.log(submitObject);

    const formDataToSubmit = new FormData();
    formDataToSubmit.append('formData', JSON.stringify(submitObject));

    if (apiref.current !== '') {
      try {
        const res = await axios.post(apiref.current, formDataToSubmit, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(res.data);
        Toast.show('Form submitted successfully!');
        navigate(-1)
      } catch (error) {
        console.log(error);
        setSuccessMessage('Failed to submit form. Please try again.');
      }
    }
  };

  function renderFeild(currentFeild, fieldIndex) {
    switch (currentFeild.type) {
      case 'text':
        return (
          <LongInputField
            setformstate={handleInputChange}
            formstate={formState}
            key={fieldIndex}
            required={currentFeild.required}
            disabled={currentFeild.disabled}
            label={currentFeild.label}
            name={currentFeild.name}
            placeholder={currentFeild.placeholder}
          />
        );
      case 'selectbox':
        return (
          <SelectBoxButton
            default_value={currentFeild.default_value}
            formstate={formState}
            label={currentFeild.label}
            autofill={currentFeild.autofill ? currentFeild.autofill : ''}
            name={currentFeild.name}
            setformstate={handleInputChange}
            list_empty_text={currentFeild.list_empty_text}
            get_value_from_api={
              currentFeild.get_values_from_api
                ? currentFeild.get_values_from_api
                : '404'
            }
            is_multi={currentFeild.is_multi}
            key={fieldIndex}
            options={currentFeild.options}
          />
        );
      case 'number':
        return (
          <LongInputField
            setformstate={handleInputChange}
            key={fieldIndex}
            required={currentFeild.required}
            keyboardtype="number-pad"
            label={currentFeild.label}
            name={currentFeild.name}
            placeholder={currentFeild.placeholder}
          />
        );
      case 'date':
        return (
          <DatePickerButton
            label={currentFeild.label}
            name={currentFeild.name}
            setformstate={handleInputChange}
            key={fieldIndex}
          />
        );
      case 'textarea':
        return (
          <BigInputField
            label={currentFeild.label}
            name={currentFeild.name}
            placeholder={currentFeild.placeholder}
            setformstate={handleInputChange}
            key={fieldIndex}
          />
        );
      case 'upload':
        return (
          <BigUploadField
            label={currentFeild.label}
            submitApi={currentFeild.submitApi}
            name={currentFeild.name}
            module={currentFeild.module}
            setformstate={handleInputChange}
            key={fieldIndex}
          />
        );
      default:
        return null;
    }
  }

  function renderDependencies(currentFeild, dep) {
    if (!currentFeild.dependencies) {
      return dep;
    }

    let val = '';
    if (formState) {
      if (formState[currentFeild.name]) val = formState[currentFeild.name];
    }
    

    currentFeild.dependencies.map((depitem, depindex) => {
      
      if (
        typeof depitem.value === 'object'
          ? depitem.value.includes(val)
          : val === depitem.value
      ) {
        console.log(`${depitem.name}-${val}`)
        if (!Object.keys(formState).includes(depitem.name)) formState[depitem.name] = ''
        dep.push(renderFeild(depitem, 'dep' + String(depindex)));
        dep = renderDependencies(depitem, dep);
      } else {
       delete formState[depitem.name]
      }
    });
    return dep;
  }

  const extractDepKeys = (currentFeild, depname) => {
    if (!currentFeild.dependencies) {
      return depname;
    }

    currentFeild.dependencies.map((depitem, depindex) => {
      depname.push(depitem.name);
      depname = renderDependencies(depitem, depname);
    });
    return depname;
  };

  useEffect(() => {
    if (Object.keys(formState).length === 0) {
      let savedata = {};
      formData.map((form, index) => {
        if (form.name === formName) {
          Object.keys(form.fields).map((fieldName, fieldIndex) => {
            let currentFeild = form.fields[fieldName];
            if (currentFeild.type === 'number') {
              savedata[currentFeild.name] = 0;
            } else {
              savedata[currentFeild.name] = '';
            }

            if (currentFeild.dependencies) {
              let depname = [];
              const ext = extractDepKeys(currentFeild, depname);
              ext.map((depitem, depindex) => {
                savedata[depitem] = '';
              });
            }
          });

          setFormState(savedata);
        }
      });
    }
  }, [formState, formData, formName]);

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView style={styles.FieldsContainer}>
        <ScrollView
          nestedScrollEnabled={true}
          bounces={true}
          style={{ paddingHorizontal: 10 }}>
          <Text style={styles.formTitle}>{formName}</Text>
          {formData.map((form, index) =>
            form.name === formName
              ? Object.keys(form.fields).map((fieldName, fieldIndex) => {
                  apiref.current = form.api;
                  let currentFeild = form.fields[fieldName];
                  let dep = [];
                  let depFeilds = [];
                  let RenderFeild = renderFeild(
                    currentFeild,
                    currentFeild.label + String(fieldIndex),
                  );
                  if (currentFeild.dependent ? true : false) {
                    if (
                      formState[currentFeild.dependentName]
                        ? formState[currentFeild.dependentName] ===
                          currentFeild.dependentValue
                        : false
                    ) {
                      depFeilds.push(
                        renderFeild(
                          currentFeild,
                          currentFeild.label + String(fieldIndex),
                        ),
                      );
                    } else {
                      formState[currentFeild.name] = '';
                    }
                  }
                  if (currentFeild.dependencies) {
                    renderDependencies(currentFeild, dep);
                    console.log(dep)
                  }

                  return (
                    <React.Fragment key={fieldIndex}>
                      {RenderFeild}
                      {dep.length !== 0
                        ? dep.map(item => {
                          console.log(dep.length)
                            return item;
                          })
                        : null}
                    </React.Fragment>
                  );
                })
              : null,
          )}
          <View style={{ width: '100%', height: 40 }}></View>
        </ScrollView>
      </KeyboardAvoidingView>
      <View style={styles.SubmitButton}>
        <TouchableOpacity
          onPress={() => {
            handleSubmit();
          }}
          style={styles.submitButtonStyle}>
          <Text style={styles.submitButtonText}>SUBMIT</Text>
        </TouchableOpacity>
      </View>
      {successMessage && (
        <View style={styles.successMessage}>
          <Text style={styles.successText}>{successMessage}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 10,
  },
  FieldsContainer: {
    flex: 1,
    overflow: 'visible',
  },
  formTitle: {
    fontSize: 28,
    fontWeight: '600',
    color: '#444',
    marginBottom: 20,
    textAlign: 'center',
    paddingVertical: 8,
    borderBottomWidth: 2,
    borderBottomColor: '#007BFF',
    backgroundColor: 'transparent',
  },
  submitButtonStyle: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
  successMessage: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#d4edda',
    borderColor: '#c3e6cb',
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
  },
  successText: {
    color: '#155724',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default FormEngine;
