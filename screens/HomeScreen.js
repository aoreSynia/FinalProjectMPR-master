import React, { useState, useLayoutEffect, useContext, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    TextInput,
    StyleSheet
} from 'react-native';
import { UnifiedContext } from "../components/context/Context";
import Icon from 'react-native-vector-icons/Ionicons';
import NoteCard from '../components/ui/NoteCard'; // Import NoteCard

const HomeScreen = ({ navigation }) => {
    const { notes, labels } = useContext(UnifiedContext);
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [filteredNotes, setFilteredNotes] = useState(notes);

    useEffect(() => {
        setFilteredNotes(notes);
    }, [notes]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => isSearchVisible
                ? (<TextInput
                    style={styles.searchInput}
                    placeholder="Search notes..."
                    value={searchQuery}
                    onChangeText={handleSearch}
                    autoFocus/>)
                : (
                    <Text style={{
                        fontSize: 18,
                        fontWeight: 'bold'
                    }}>Home</Text>
                ),

            headerRight: () => (
                <TouchableOpacity onPress={() => setIsSearchVisible(!isSearchVisible)}>
                    <Icon
                        name={isSearchVisible
                        ? "close-outline"
                        : "search"}
                        size={25}
                        color="black"
                        style={{
                        marginRight: 15
                    }}/>
                </TouchableOpacity>
            )
        });
    }, [navigation, isSearchVisible, searchQuery]);

    const handleSearch = (query) => {
        setSearchQuery(query);
        if (query === '') {
            setFilteredNotes(notes);
        } else {
            const filtered = notes.filter((note) => note.content.toLowerCase().includes(query.toLowerCase()));
            setFilteredNotes(filtered);
        }
    };

    const handleNotePress = (id) => {
        navigation.navigate('EditNote', { noteId: id });
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
        <View style={styles.screen}>
            {filteredNotes.length > 0
                ? (<FlatList
                    data={filteredNotes}
                    keyExtractor={(item) => item.id}
                    renderItem={renderNoteItem}
                    contentContainerStyle={styles.flatListContent}
                />)
                : (
                    <View style={styles.notFoundContainer}>
                        <Text style={styles.notFoundText}>Not found!</Text>
                    </View>
                )}
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('NewNote')}>
                <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10
    },
    searchInput: {
        flex: 1,
        borderColor: '#ccc',
        padding: 5,
        backgroundColor: '#fff'
    },
    notFoundContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    notFoundText: {
        fontSize: 18,
        color: '#666'
    },
    addButton: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#f00',
        justifyContent: 'center',
        alignItems: 'center'
    },
    addButtonText: {
        color: '#fff',
        fontSize: 24
    },
    flatListContent: {
        paddingHorizontal: 10,
    },
});

export default HomeScreen;
