import React, {useEffect, useState, useRef} from 'react';
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

import axios from 'axios';

const FormEngine = ({formData, formName}) => {
  const [formState, setFormState] = useState({});
  const apiref = useRef('');
  const [successMessage, setSuccessMessage] = useState(''); // State for success message

  const handleInputChange = (fieldName, value = '#') => {
    if (value === '#') {
      setFormState({...formState, ...fieldName});
    } else {
      setFormState({...formState, [fieldName]: value});
    }
  };

  const handleSubmit = async () => {
    const missingFields = [];
    formData.forEach(form => {
      if (form.name === formName) {
        Object.keys(form.fields).forEach(fieldName => {
          const field = form.fields[fieldName];
          if (field.required && !formState[fieldName]) {
            missingFields.push(field.label);
          }
        });
      }
    });

    if (missingFields.length > 0) {
      Alert.alert(
        'Missing Fields',
        `Please fill the following fields: ${missingFields.join(', ')}`,
      );
      return;
    }

    const submitObject = [];
    Object.keys(formState).map(key => {
      submitObject.push({name: key, value: formState[key]});
    });
    console.log(submitObject);
    const formDataToSubmit = new FormData();
    formDataToSubmit.append('formData', JSON.stringify(submitObject)); // Convert to JSON string
    console.log(submitObject);
    if (apiref.current !== '') {
      try {
        const res = await axios
          .post(apiref.current, formDataToSubmit, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then(res => {
            console.log(res.data.message);
            
            setSuccessMessage('Form submitted successfully!');
          });
      } catch (error) {
        console.log(error);
        // Handle submission error
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
        dep.push(renderFeild(depitem, 'dep' + String(depindex)));
        dep = renderDependencies(depitem, dep); // recursion!
      } else {
        formState[depitem.name] = '';
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
              console.log(ext);
              ext.map((depitem, depindex) => {
                savedata[depitem] = '0';
              });
            }
          });

          console.log(savedata);
          setFormState(savedata);
        }
      });
    }
  });

  return (
    <View style={styles.container} behavior={'position'}>
      <KeyboardAvoidingView style={styles.FieldsContainer}>
        <ScrollView
          nestedScrollEnabled={true}
          bounces={true}
          style={{padding: 20, paddingBottom: 0}}>
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
                  }

                  return (
                    <React.Fragment key={fieldIndex}>
                      {RenderFeild}
                      {depFeilds.length !== 0 ? depFeilds : null}
                      {dep.length !== 0
                        ? dep.map(item => {
                            return item;
                          })
                        : null}
                    </React.Fragment>
                  );
                })
              : null,
          )}
          <View style={{width: '100%', height: 40}}></View>
        </ScrollView>
      </KeyboardAvoidingView>
      <View style={styles.SubmitButton}>
        <TouchableOpacity
          onPress={() => {
            handleSubmit();
          }}
          style={styles.SubmitButton.button}>
          <Text style={styles.SubmitButton.button.text}>SUBMIT</Text>
        </TouchableOpacity>
      </View>
      {successMessage ? (
        <View style={styles.successMessageContainer}>
          <Text style={styles.successMessageText}>{successMessage}</Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  FieldsContainer: {
    marginBottom: 0,
    flex: 12,
  },
  SubmitButton: {
    borderTopWidth: 1,
    borderColor: '#ccc',
    flex: 1,
    backgroundColor: '#2D96F8',
    button: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      text: {
        fontSize: 20,
        color: 'white',
      },
    },
  },
  successMessageContainer: {
    backgroundColor: '#00308F',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  successMessageText: {
    color: 'white',
    fontSize: 16,
  },
});

export default FormEngine;
