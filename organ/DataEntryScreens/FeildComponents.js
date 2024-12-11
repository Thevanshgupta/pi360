import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Dimensions,
  Modal,
  TouchableOpacity,
  Pressable,
  Platform,
  Button,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import SelectBox from '../customComponents/slctbox/selectbox'
import DocumentPicker from 'react-native-document-picker';
import {xorBy} from 'lodash';
import axios from 'axios';

const DatePickerButton = ({
  dateState,
  setDateState,
  name,
  label,
  setformstate,
}) => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  return (
    <>
      <View style={FieldStyles.container}>
        <View style={FieldStyles.LabelContainer}>
          <Text style={FieldStyles.LabelContainer.LabelText}>{label}</Text>
        </View>
        <TouchableOpacity
          style={FieldStyles.ShortInput}
          onPress={() => setOpen(true)}>
          <Text>{date.toISOString().split('T')[0]}</Text>
          <DatePicker
            modal
            open={open}
            date={date}
            onConfirm={date => {
              setOpen(false);
              if (name.split(' + ').length === 2) {
                const year = date.getFullYear();
                const month = date.getMonth() + 1;
                const formattedMonth = month.toString().padStart(2, '0');

                const s = {
                  [name.split(' + ')[0]]: formattedMonth,
                  [name.split(' + ')[1]]: year,
                };
                setformstate(s);
              } else {
                setformstate(name, date);
              }

              setDate(date);
            }}
            mode="date"
            onCancel={() => {
              setOpen(false);
            }}></DatePicker>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
  },
  selectedDate: {
    fontSize: 16,
  },
  datePickerContainer: {
    width: '100%',
    height: Dimensions.get('window').height,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});

const LongInputField = ({
  label,
  placeholder,
  keyboardtype,
  disabled,
  formstate,
  name,
  setformstate,
}) => {
  useEffect(() => {});

  return (
    <View style={FieldStyles.container}>
      <View style={FieldStyles.LabelContainer}>
        <Text style={FieldStyles.LabelContainer.LabelText}>{label}</Text>
      </View>
      <TextInput
        editable={
          disabled !== undefined ? (disabled === 'true' ? false : true) : true
        }
        placeholder={placeholder}
        style={[FieldStyles.input]}
        value={formstate ? formstate[name] : ''}
        onChangeText={text => {
          setformstate(name, text);
        }}
      />
    </View>
  );
};

const ShortInputField = ({
  label1,
  placeholder1,
  label2,
  placeholder2,
  keyboardtype1 = 'default',
  setformstate,
  keyboardtype2 = 'default',
  name,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[FieldStyles.container, FieldStyles.FlexContainer]}>
      <View style={FieldStyles.ShortSection1}>
        <View style={FieldStyles.LabelContainer}>
          <Text style={FieldStyles.LabelContainer.LabelText}>{label1}</Text>
        </View>
        <TextInput
          placeholder={placeholder1}
          style={[FieldStyles.ShortInput]}
          onChangeText={text => {
            setformstate(label1.split(' ').join(''), text);
          }}
          keyboardType={keyboardtype1}
        />
      </View>
      <View style={FieldStyles.ShortSection2}>
        <View style={FieldStyles.LabelContainer}>
          <Text style={FieldStyles.LabelContainer.LabelText}>{label2}</Text>
        </View>
        <TextInput
          placeholder={placeholder2}
          onChangeText={text => {
            setformstate(label2.split(' ').join(''), text);
          }}
          style={[FieldStyles.ShortInput]}
        />
      </View>
    </View>
  );
};

const SelectBoxButton = ({
  label,
  name,
  placeholder,
  options,
  setformstate,
  formstate,
  get_value_from_api,
  is_multi,
  list_empty_text,
  autofill,
  default_value,
}) => {
  const [isFocused, setIsFocused] = useState(new Date());
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState({});
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [apiInfo, setApiInfo] = useState('404');
  const [apiOptions, setApiOptions] = useState([]);
  const [getinputvalue, setGetinputvalue] = useState();
  const [rawoptions, setRawoptions] = useState();
  function onMultiChange() {
    return item =>
      setSelectedTeams(prevSelectedTeams =>
        xorBy(prevSelectedTeams, [item], 'id'),
      );
  }

  function onChange() {
    return val => {
      let value = {};
      if (autofill && rawoptions) {
        rawoptions.map(item => {
          if (item['JournalID'] === val.id) {
            Object.keys(autofill).map(key => {
              if (typeof item[key] === 'object') {
                value[autofill[key][0]] = String(item[key]);
              } else {
                value[autofill[key][0]] = item[key];
              }
            });
          }
        });
      }
      if (Object.keys(value).length === 0) {
        setformstate(name, val.id);
      } else {
        value[name] = val.id;
        setformstate(value);
      }
      setSelectedTeam(val);
      setModalVisible(false);
    };
  }

  function handelApiOptions() {
    if (apiInfo === '404') return;
    if (getinputvalue && getinputvalue.length <= 3) return;
    axios.get(apiInfo.api + getinputvalue).then(res => {
      let api_options = [];
      if (res.data.content === undefined) {
        return;
      }
      setRawoptions(res.data.content);
      res.data.content.map((item, index) => {
        crnt_option = {};
        let splt_keys = apiInfo.value_structure['item'].split('+');
        if (splt_keys) {
          let itm = '';
          splt_keys.map((k, x) => {
            itm += item[k.trim()] + (splt_keys.length - 1 === x ? '' : ' | ');
          });
          crnt_option['item'] = itm;
        } else {
          crnt_option['item'] = item[apiInfo.value_structure['item']];
        }
        crnt_option['id'] = item[apiInfo.value_structure['id']];
        api_options.push(crnt_option);
      });
      selectedTeams.map(item => {
        let flag = false;
        api_options.map(it => {
          if (it.id === item.id) {
            flag = true;
          }
        });
        if (!flag) {
          api_options.push(item);
        }
      });
      setApiOptions(api_options);
    });
  }

  useEffect(() => {
    if (Object.keys(formstate).includes(name) && options) {
      if (is_multi ? true : false) {
        console.log(name);

        options.map(item => {
          if (formstate[name].includes(item.id)) {
            setSelectedTeams([...selectedTeams, item]);
          }
        });
      }
    }

    if (selectedTeams.length !== 0) {
      let selections = [];
      selectedTeams.map((item, index) => {
        selections.push(item['id']);
      });
      setformstate(name, selections);
    }

    if (get_value_from_api !== '404') {
      setApiInfo(get_value_from_api);
      handelApiOptions();
    }
  }, [getinputvalue, selectedTeams]);

  return (
    <View style={FieldStyles.container}>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}></TouchableOpacity>
      <Modal
        animationType="fade"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={FieldStyles.button}>
          <Text style={FieldStyles.LabelContainer.LabelText}>{label}</Text>
          <Text onPress={() => setModalVisible(false)} style={FieldStyles.text}>
            Close
          </Text>
        </View>
        <View>
          <View style={FieldStyles.selectBox}>
            <SelectBox
              inputPlaceholder={'search'}
              listEmptyText={list_empty_text}
              containerStyle={FieldStyles.selectContainer}
              label={false}
              arrowIconColor="#000"
              getInputValue={setGetinputvalue}
              searchIconColor="#000"
              optionContainerStyle={FieldStyles.selectContainer.optionContainer}
              selectedValues={is_multi ? selectedTeams : null}
              onMultiSelect={is_multi ? onMultiChange() : null}
              inputFilterContainerStyle={
                FieldStyles.selectContainer.optionContainer
              }
              isMulti={is_multi ? true : false}
              options={
                apiInfo !== '404'
                  ? apiOptions.length !== 0
                    ? apiOptions
                    : []
                  : options
              }
              value={
                Object.keys(selectedTeam).length === 0 && default_value
                  ? options !== undefined
                    ? options.map((item, index) => {
                        if (item['id'] === default_value) {
                          setSelectedTeam(item);
                        }
                      })
                    : selectedTeam
                  : selectedTeam
              }
              onChange={onChange()}
              listOptionProps={{
                style: {
                  height: Dimensions.get('window').height - 110,
                },
              }}
              hideInputFilter={false}
            />
          </View>
        </View>
      </Modal>

      <View style={FieldStyles.LabelContainer}>
        <Text style={FieldStyles.LabelContainer.LabelText}>{label}</Text>
      </View>
      <Pressable
        style={[FieldStyles.input]}
        onPress={() => {
          setModalVisible(true);
        }}>
        <Text>
          {is_multi
            ? selectedTeams.length !== 0
              ? selectedTeams.map((item, index) => {
                  return '[' + item['item'] + '] ';
                })
              : 'Select'
            : Object.keys(selectedTeam).length !== 0
            ? selectedTeam['item']
            : 'Select'}
        </Text>
      </Pressable>
    </View>
  );
};

const BigUploadField = ({label, name, module, setformstate, submitApi}) => {
  const [file, setFile] = useState('');
  const [isfileuploaded, setIsfileuploaded] = useState(false);
  useEffect(() => {}, [file]);

  const handleFilePick = async () => {
    try {
      const res = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
        copyTo: 'cachesDirectory',
        type: [DocumentPicker.types.allFiles],
      }).then(resp => {
        setIsfileuploaded(false);
        setFile(resp[0]);
      });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled the file picker');
      } else {
        console.log('Error while picking the file:', err);
      }
    }
  };

  const handelSubmit = async () => {
    var formData = new FormData();
    const uri = file.fileCopyUri || file.uri;
    formData.append('fileName', 'proof1');
    formData.append(module, '1');
    formData.append('proof1', {
      uri: file.uri,
      type: file.type,
      name: file.name,
    });
    const res = await axios
      .post(submitApi, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(r => {
        setIsfileuploaded(true);
        console.log(r.data.message);
        setformstate(name, r.data.message);
      })
      .catch(e => {
        setIsfileuploaded(false);
        console.log(e);
      });
  };

  return (
    <View style={[FieldStyles.container]}>
      <View style={FieldStyles.LabelContainer}>
        <Text style={FieldStyles.LabelContainer.LabelText}>{label}</Text>
      </View>
      <TouchableOpacity
        onPress={handleFilePick}
        style={[FieldStyles.input, FieldStyles.upload]}>
        <Text style={FieldStyles.uploadButtonText}>
          {file === '' ? 'Upload File' : file['name']}
        </Text>
        {file && !isfileuploaded ? (
          <TouchableOpacity
            style={FieldStyles.uploadButtonUploader}
            onPress={handelSubmit}>
            <Text>Upload</Text>
          </TouchableOpacity>
        ) : (
          ''
        )}
      </TouchableOpacity>
    </View>
  );
};

const BigInputField = ({
  label,
  placeholder,
  name,
  keyboardtype,
  setformstate,
}) => {
  const [isFocused, setIsFocused] = useState(new Date());

  return (
    <View style={[FieldStyles.container, {height: 120}]}>
      <View style={FieldStyles.LabelContainer}>
        <Text style={FieldStyles.LabelContainer.LabelText}>{label}</Text>
      </View>
      <TextInput
        numberOfLines={10}
        onChangeText={text => {
          setformstate(name, text);
        }}
        multiline={true}
        placeholder={placeholder}
        style={[FieldStyles.textArea]}
      />
    </View>
  );
};
const FieldStyles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width - 40,
    justifyContent: 'center',
    overflow: 'hidden',
    alignItems: 'center',
    marginBottom: 5,
  },
  FlexContainer: {
    flexDirection: 'row',
  },
  textArea: {
    justifyContent: 'flex-start',
    textAlignVertical: 'top',
    alignItems: 'flex-start',
    width: '100%',
    height: 80,
    paddingLeft: 10,
    paddingRight: 10,
    borderColor: '#BBBBBB',
    borderRadius: 4,
    marginTop: 5,
    borderWidth: 1,
  },
  input: {
    width: '100%',
    height: 45,
    paddingLeft: 10,
    borderColor: '#BBBBBB',
    marginTop: 5,
    color: '#000',
    borderRadius: 4,
    justifyContent: 'center',
    borderWidth: 1,
  },
  ShortInput: {
    width: '100%',
    height: 45,
    borderRadius: 5,
    paddingLeft: 10,
    borderColor: '#BBBBBB',
    marginTop: 5,
    borderRadius: 4,
    borderWidth: 1,

    justifyContent: 'center',
  },
  LabelContainer: {
    width: '100%',
    justifyContent: 'flex-start',
    LabelText: {
      fontSize: 16,
      textTransform: 'capitalize',
      fontWeight: '600',
      color: 'black',
    },
  },
  ShortSection1: {flex: 1},
  ShortSection2: {flex: 1, marginLeft: 10},

  button: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
    paddingLeft: 10,
    padding: 15,
  },

  text: {
    fontSize: 18,

    letterSpacing: 0.25,
    color: '#3897f1',
  },

  selectBox: {
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 0.5,
  },
  selectContainer: {
    paddingLeft: 10,
    height: 40,
    optionContainer: {
      paddingLeft: 10,
    },
  },
  uploadButtonText: {
    color: 'white',
  },
  uploadButtonUploader: {
    backgroundColor: 'white',
    width: 50,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },

  upload: {
    backgroundColor: '#2D96F8',
    border: 'none',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 10,
    flexDirection: 'row',
  },
});

export {
  LongInputField,
  ShortInputField,
  DatePickerButton,
  SelectBoxButton,
  BigInputField,
  BigUploadField,
};
