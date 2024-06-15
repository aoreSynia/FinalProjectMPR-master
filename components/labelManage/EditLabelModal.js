import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal'; // Import react-native-modal

function EditLabelModal({ visible, onClose, label, onSave, onDelete }) {
    const [labelText, setLabelText] = useState(label.label);

    const handleSave = () => {
        onSave(label.id, labelText);
        onClose();
    };

    const handleDelete = () => {
        onDelete(label.id);
        onClose();
    };

    return (
        <Modal
            isVisible={visible}
            onBackdropPress={onClose} // Close modal when the backdrop is pressed
            onBackButtonPress={onClose} // Close modal when the back button is pressed on Android
            style={styles.modal}
        >
            <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Edit Label</Text>
                <TextInput
                    style={styles.input}
                    value={labelText}
                    onChangeText={setLabelText}
                    placeholder="Label name"
                />
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={handleSave} style={[styles.button, styles.saveButton]}>
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleDelete} style={[styles.button, styles.deleteButton]}>
                        <Text style={styles.buttonText}>Delete</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onClose} style={[styles.button, styles.cancelButton]}>
                        <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

export default EditLabelModal;

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'center',
        margin: 20,
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        marginBottom: 15,
        fontWeight: 'bold',
    },
    input: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        width: '100%',
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    button: {
        flex: 1,
        padding: 10,
        marginHorizontal: 5,
        borderRadius: 5,
        alignItems: 'center',
    },
    saveButton: {
        backgroundColor: '#4CAF50', // Green color
    },
    deleteButton: {
        backgroundColor: '#F44336', // Red color
    },
    cancelButton: {
        backgroundColor: '#9E9E9E', // Grey color
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});
