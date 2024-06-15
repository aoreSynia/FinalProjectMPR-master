import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

function NoteCard({ id, color, updateAt, isBookmarked, labelIds, content, labels, onPress }) {
    const getLabelContent = (labelId) => {
        const foundLabel = labels.find((label) => label.id === labelId);
        return foundLabel?.label || "";
    };

    return (
        <View style={styles.container}>
            <Pressable onPress={onPress ? () => onPress(id) : null} style={({ pressed }) => [styles.noteItem, { backgroundColor: color || '#ccc' }, pressed && styles.pressed]}>
                <View style={[styles.noteHeader, { backgroundColor: color || '#ccc' }]} />
                <View style={styles.noteContentContainer}>
                    <Text style={styles.noteDate}>{new Date(updateAt).toLocaleString()}</Text>
                    <View style={styles.labelsContainer}>
                        {labelIds && labelIds.map((labelId) => (
                            <View key={labelId} style={styles.labelTag}>
                                <Text style={styles.labelText}>{getLabelContent(labelId)}</Text>
                            </View>
                        ))}
                    </View>
                    <Text style={styles.noteContent}>{content}</Text>
                    {isBookmarked && <Icon style={styles.bookmarked} name="bookmark"></Icon>}
                </View>
            </Pressable>
        </View>
    );
}

export default NoteCard;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: -5,
    },
    noteItem: {
        marginVertical: 10,
        borderRadius: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        overflow: 'hidden',
    },
    noteHeader: {
        height: 10, // Height of the color bar
    },
    noteContentContainer: {
        padding: 15,
        backgroundColor: '#fff',
    },
    noteDate: {
        fontSize: 12,
        color: '#666',
        marginBottom: 5,
    },
    labelsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 10
    },
    labelTag: {
        backgroundColor: '#e0e0e0',
        borderRadius: 10,
        paddingHorizontal: 8,
        paddingVertical: 3,
        marginRight: 5,
        marginBottom: 5
    },
    labelText: {
        fontSize: 12,
        color: '#333'
    },
    noteContent: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    bookmarked: {
        fontSize: 18,
        color: '#FFD700', 
        marginTop: 10,
        position: 'absolute',
        right: 15,
    },
    pressed: {
        opacity: 0.75,
    },
});
