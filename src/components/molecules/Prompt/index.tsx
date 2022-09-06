import React, { Component, useState } from "react";
import {
	View,
	Text,
	TextInput,
	Modal,
	TouchableOpacity
} from "react-native";
import styles from "./styles";

/**
 * @name Prompt
 * @param {object} props entire props object 
 * @param {function} props.onSubmit callback called on submit
 * @param {function} props.onCancel callback called on cancel
 * @param {boolean} props.visible boolean to show or not the prompt
 * @param {string} props.title prompt title
 * @param {string} props.placeholder text input placeholder
 * @param {string} props.submitText text description on submit button
 * @param {string} props.cancelText text description on cancel button
 * @description A button that takes a callback but is configured just for add a place
 * @returns Node
 */
const Prompt = (props) => {
  const [value,setValue] = useState("")
	const onChangeText = (value) => {
		setValue(value)
	}

	const onSubmit = () => {
		props.onSubmit(value);
		setValue("")
	}

	const onCancel = () => {
		props.onCancel();
		setValue("")
	}
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={props.visible}
      onRequestClose={onCancel}>
      <View style={styles.screenOverlay}>
        <View style={styles.dialogPrompt}>
          <Text style={styles.title}>
            {props.title}
          </Text>
          <TextInput
            placeholder={props.placeholder}
            style={styles.textInput}
            onChangeText={onChangeText}
            onSubmitEditing={onSubmit}
            autoFocus={true}
          />
          <View style={styles.buttonsOuterView}>
            <View style={styles.buttonsInnerView}>
              <TouchableOpacity
                style={styles.button}
                onPress={onCancel}>
                <Text
                  style={styles.cancelButtonText}>
                  {props.cancelText}
                </Text>
              </TouchableOpacity>
              <View style={styles.buttonsDivider} />
              <TouchableOpacity
                style={styles.button}
                onPress={onSubmit}>
                <Text
                  style={styles.submitButtonText}>
                  {props.submitText}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default Prompt