import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import { UnifiedContext } from "../components/context/Context";
import IconButton from "../components/ui/IconButton";
import { SCREEN_WIDTH } from "@gorhom/bottom-sheet";

const ManageLabelsScreen = ({ navigation, route }) => {
  const { labels, notes, editNote } = useContext(UnifiedContext);
  const noteIndex = route.params.noteIndex;
  const chosenLabels = route.params.labelArray;
  const allLabelsArray = labels.map((label) => label.label);
  const [highlightedLabels, setHighlightedLabels] = useState(chosenLabels);

  const highlightedLabelIDs = labels.reduce((acc, label) => {
    if (highlightedLabels.includes(label.label)) {
      acc.push(label.id);
    }
    return acc;
  }, []);

  // function to toggle labels
  function toggleLabel(label) {
    if (highlightedLabels.includes(label)) {
      setHighlightedLabels((prev) => prev.filter((l) => l !== label));
    } else {
      setHighlightedLabels((prev) => [...prev, label]);
    }
  }

  // function to render labels
  const renderLabel = ({ item }) => (
    <Pressable
      style={[
        styles.labelTag,
        highlightedLabels.includes(item) && styles.highlightedLabelTag,
      ]}
      onPress={() => toggleLabel(item)}
    >
      <Text style={highlightedLabels.includes(item) ? styles.highlightedLabelText : styles.labelText}>
        {item}
      </Text>
    </Pressable>
  );

  // function to handle submit
  function submitHandler() {
    const updatedNote = {
      ...notes[noteIndex],
      labelIds: highlightedLabelIDs,
    };

    editNote(noteIndex, updatedNote);
    alert("Note updated successfully!");
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      {/* FlatList to render labels */}
      <FlatList
        data={allLabelsArray}
        renderItem={renderLabel}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        contentContainerStyle={styles.labelsContainer}
      />
      {/* IconButton to submit the labels */}
      <View style={styles.submitButtonContainer}>
        <IconButton
          icon="checkmark"
          size={24}
          color="white"
          onPress={submitHandler}
          style={styles.submitButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f8f8f8",
  },
  labelsContainer: {
    paddingBottom: 100, // Ensure space for the submit button
  },
  labelTag: {
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 8,
    margin: 5,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    maxWidth: SCREEN_WIDTH / 2 - 20, // Adjust width for better spacing
  },
  highlightedLabelTag: {
    backgroundColor: "skyblue",
  },
  labelText: {
    fontSize: 16,
    color: "#333",
  },
  highlightedLabelText: {
    fontSize: 16,
    color: "white",
  },
  submitButtonContainer: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#657ADD",
    borderRadius: 30,
    padding: 10,
  },
  submitButton: {
    backgroundColor: "transparent",
  },
});

export default ManageLabelsScreen;
