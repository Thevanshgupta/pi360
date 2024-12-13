import React, { useState, memo, useMemo } from 'react'
import { isEmpty, find } from 'lodash'
import { View, FlatList, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import Colors from './constants/Colors'
import Icon from './components/Icon'
import Toggle from './components/Toggle'

const hitSlop = { top: 14, bottom: 14, left: 14, right: 14 }

const kOptionsHeight = { width: '100%', maxHeight: 180 }

const kOptionListViewStyle = {
  width: '100%',
  alignItems: 'center',
  paddingVertical: 4,
}

const renderItemStyle = { flexShrink: 1 }

function SelectBox({
  labelStyle,
  containerStyle,
  inputFilterContainerStyle,
  inputFilterStyle,
  optionsLabelStyle,
  optionContainerStyle,
  multiOptionContainerStyle,
  multiOptionsLabelStyle,
  multiListEmptyLabelStyle,
  listEmptyLabelStyle,
  getInputValue,
  selectedItemStyle,
  listEmptyText = 'No results found',
  ...props
}) {
  const [inputValue, setInputValue] = useState('')
  const [showOptions, setShowOptions] = useState(false)

  function renderLabel(item) {
    const kOptionsLabelStyle = {
      fontSize: 16,
      color: '#333',
      fontFamily: 'Arial, sans-serif', // Modern font for better readability
      ...optionsLabelStyle,
    }
    return <Text style={kOptionsLabelStyle}>{item}</Text>
  }

  function renderItem({ item }) {
    const { isMulti, onChange, onMultiSelect, selectedValues } = props
    const kOptionContainerStyle = {
      borderColor: '#ddd',
      borderBottomWidth: 1,
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#fff',
      paddingVertical: 14,
      paddingRight: 15,
      justifyContent: 'space-between',
      borderRadius: 8, // Rounded corners for cleaner look
      marginVertical: 6, // Add spacing between options
      ...optionContainerStyle,
    }

    return (
      <View style={kOptionContainerStyle}>
        {isMulti ? (
          <>
            <TouchableOpacity hitSlop={hitSlop} style={renderItemStyle} onPress={onPressMultiItem()}>
              {renderLabel(item.item)}
            </TouchableOpacity>
            <Toggle
              iconColor={toggleIconColor}
              checked={selectedValues.some(i => item.id === i.id)}
              onTouch={onPressMultiItem()}
            />
          </>
        ) : (
          <TouchableOpacity hitSlop={hitSlop} style={renderItemStyle} onPress={onPressItem()}>
            {renderLabel(item.item)}
            <View />
          </TouchableOpacity>
        )}
      </View>
    )

    function onPressMultiItem() {
      return (e) => (onMultiSelect ? onMultiSelect(item) : null)
    }

    function onPressItem() {
      return (e) => {
        setShowOptions(false)
        return onChange ? onChange(item) : null
      }
    }
  }

  function renderGroupItem({ item }) {
    const { onTapClose, options } = props
    const label = find(options, (o) => o.id === item.id)
    const kMultiOptionContainerStyle = {
      flexDirection: 'row',
      borderRadius: 20,
      paddingVertical: 6,
      paddingHorizontal: 12,
      marginRight: 6,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Colors.primary,
      flexGrow: 1,
      ...multiOptionContainerStyle,
    }

    const kMultiOptionsLabelStyle = {
      fontSize: 12,
      color: '#fff',
      ...multiOptionsLabelStyle,
    }

    return (
      <View style={kMultiOptionContainerStyle}>
        <Text style={kMultiOptionsLabelStyle}>{label.item}</Text>
        <TouchableOpacity style={{ marginLeft: 10 }} hitSlop={hitSlop} onPress={onPressItem()}>
          <Icon name="closeCircle" fill="#fff" width={20} height={20} />
        </TouchableOpacity>
      </View>
    )

    function onPressItem() {
      return (e) => (onTapClose ? onTapClose(item) : null)
    }
  }

  const {
    selectIcon,
    label,
    inputPlaceholder = 'Select',
    hideInputFilter,
    width = '100%',
    isMulti,
    options,
    value,
    selectedValues,
    arrowIconColor = Colors.primary,
    searchIconColor = Colors.primary,
    toggleIconColor = Colors.primary,
    searchInputProps,
    multiSelectInputFieldProps,
    listOptionProps = {},
  } = props

  const filteredSuggestions = useMemo(
    () => options.filter((suggestion) => suggestion.item.toLowerCase().indexOf(inputValue.toLowerCase()) > -1),
    [inputValue, options]
  )

  function multiListEmptyComponent() {
    const kMultiListEmptyLabelStyle = {
      fontSize: 16,
      color: '#999',
      ...multiListEmptyLabelStyle,
    }
    return (
      <TouchableOpacity
        width="100%"
        style={{ flexGrow: 1, width: '100%' }}
        hitSlop={hitSlop}
        onPress={onPressShowOptions()}
      >
        <Text style={kMultiListEmptyLabelStyle}>{inputPlaceholder}</Text>
      </TouchableOpacity>
    )
  }

  function optionListEmpty() {
    const kListEmptyLabelStyle = {
      fontSize: 16,
      color: '#999',
      ...listEmptyLabelStyle,
    }
    return (
      <View style={kOptionListViewStyle}>
        <Text style={kListEmptyLabelStyle}>{listEmptyText}</Text>
      </View>
    )
  }

  const kLabelStyle = {
    fontSize: 14,
    color: '#666',
    paddingBottom: 6,
    fontFamily: 'Arial, sans-serif', // Consistent font family
    ...labelStyle,
  }

  const kContainerStyle = {
    flexDirection: 'row',
    width: '100%',
    borderColor: '#ddd',
    borderBottomWidth: 1,
    paddingTop: 8,
    paddingRight: 20,
    paddingBottom: 8,
    borderRadius: 8, // Rounded corners for container
    alignItems: 'center',
    ...containerStyle,
  }

  return (
    <>
      <View style={{ width }}>
        <Text style={kLabelStyle}>{label}</Text>
        <View style={kContainerStyle}>
          <View style={{ paddingRight: 20, flexGrow: 1 }}>
            {isMulti ? (
              <FlatList
                data={selectedValues}
                extraData={{ inputValue, showOptions }}
                keyExtractor={keyExtractor()}
                renderItem={renderGroupItem}
                horizontal={true}
                ListEmptyComponent={multiListEmptyComponent}
                {...multiSelectInputFieldProps}
              />
            ) : (
              <TouchableOpacity hitSlop={hitSlop} onPress={onPressShowOptions()}>
                <Text style={kSelectedItemStyle()}>{value.item || inputPlaceholder || label}</Text>
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity onPress={onPressShowOptions()} hitSlop={hitSlop}>
            {selectIcon ? selectIcon : <Icon name={showOptions ? 'upArrow' : 'downArrow'} fill={arrowIconColor} />}
          </TouchableOpacity>
        </View>
        {/* Options wrapper */}
        {showOptions && (
          <FlatList
            data={filteredSuggestions || options}
            extraData={options}
            keyExtractor={keyExtractor()}
            renderItem={renderItem}
            numColumns={1}
            horizontal={false}
            initialNumToRender={5}
            maxToRenderPerBatch={20}
            windowSize={10}
            ListEmptyComponent={optionListEmpty}
            style={[kOptionsHeight, listOptionProps.style]}
            ListHeaderComponent={HeaderComponent()}
            {...listOptionProps}
          />
        )}
      </View>
    </>
  )

  function keyExtractor() {
    return (o) => `${o.id}-${Math.random()}`
  }

  function kSelectedItemStyle() {
    return {
      fontSize: 16,
      color: isEmpty(value.item) ? '#aaa' : '#333',
      fontFamily: 'Arial, sans-serif',
      ...selectedItemStyle,
    }
  }

  function HeaderComponent() {
    const kInputFilterContainerStyle = {
      width: '100%',
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
      flexDirection: 'row',
      alignItems: 'center',
      paddingRight: 18,
      justifyContent: 'space-between',
      ...inputFilterContainerStyle,
    }

    const kInputFilterStyle = {
      paddingVertical: 12,
      paddingRight: 8,
      color: '#333',
      fontSize: 14,
      flexGrow: 1,
      fontFamily: 'Arial, sans-serif',
      ...inputFilterStyle,
    }

    return (
      <>
        {!hideInputFilter && (
          <View style={kInputFilterContainerStyle}>
            <TextInput
              value={inputValue}
              placeholder={inputPlaceholder}
              onChangeText={onChangeText()}
              style={kInputFilterStyle}
              placeholderTextColor="#aaa"
              {...searchInputProps}
            />
            <Icon name="searchBoxIcon" fill={searchIconColor} />
          </View>
        )}
        <ScrollView keyboardShouldPersistTaps="always" />
      </>
    )

    function onChangeText() {
      return (value) => {
        getInputValue(value)
        setInputValue(value)
      }
    }
  }

  function onPressShowOptions() {
    return () => setShowOptions(!showOptions)
  }
}

SelectBox.defaultProps = {
  label: 'Label',
}

export default memo(SelectBox)
