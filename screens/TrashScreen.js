import React, { useContext } from 'react';
import { View, Alert, StyleSheet, Text, FlatList } from "react-native";
import Button from "../components/ui/Button";
import { UnifiedContext } from "../components/context/Context";
import NoteCard from '../components/ui/NoteCard'; // Import NoteCard

function TrashScreen({ navigation }) {
    const { trash, restoreAllNotes, deleteAllNotes, restoreNote, deleteNote, labels } = useContext(UnifiedContext);

    const restoreAllNotesHandler = () => {
        Alert.alert(
            "Restore All Notes",
            "Are you sure you want to restore all notes from trash?",
            [
                { text: "Cancel", onPress: () => navigation.navigate("Trash"), style: "cancel" },
                { text: "Restore", onPress: restoreAllNotes },
            ]
        );
    };

    const deleteAllNotesHandler = () => {
        Alert.alert(
            "Delete All Notes Permanently",
            "This action cannot be undone. Are you sure you want to permanently delete all notes from trash?",
            [
                { text: "Cancel", onPress: () => navigation.navigate("Trash"), style: "cancel" },
                { text: "Delete", onPress: deleteAllNotes },
            ]
        );
    };

    const handleNotePress = (id) => {
        Alert.alert(
            "Note Action",
            "What do you want to do with this note?",
            [
                { text: "Cancel", onPress: () => navigation.navigate("Trash"), style: "cancel" },
                { text: "Restore", style: "default", onPress: () => restoreNote(id) },
                { text: "Delete Permanently", style: "destructive", onPress: () => deleteNote(id) },
            ]
        );
    };

    const renderNoteItem = ({ item }) => {
        return (
            <NoteCard
                {...item}
                labels={labels}
                onPress={handleNotePress}
            />
        );
    };

    return (
        <View>
            <View style={styles.buttonContainer}>
                <Button onPress={restoreAllNotesHandler} children="Restore All" style={{ margin: 4, backgroundColor: '#00CCFF', borderRadius: 6, }} disabled={trash.length === 0} />
                <Button onPress={deleteAllNotesHandler} children="Delete All" style={{ margin: 4, backgroundColor: '#FF0033', borderRadius: 6, }} disabled={trash.length === 0} />
            </View>

            {trash.length === 0 ? (
                <View style={{ alignItems: 'center', marginTop: 50 }}>
                    <Text style={{ fontSize: 18, color: '#666' }}>Trash is empty</Text>
                </View>
            ) : (
                <FlatList
                    data={trash}
                    renderItem={renderNoteItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.flatListContent}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: "row-reverse",
        padding: 10,
    },
    flatListContent: {
        paddingHorizontal: 15, // Add padding to the FlatList container
    },
});

export default TrashScreen;
