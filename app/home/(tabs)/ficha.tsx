import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, ScrollView, StyleSheet } from 'react-native';
import { GlobalSheet } from "../../../core/ui";
import { Button, Input, Typography } from '../../../core/ui/atoms';
import { Container } from "../../../core/ui/organisms";
import useStore from '../../../providers/store';
import { updateCharacter, removeCharacter, addCharacter } from '../../../services/User.service';
import { Characters } from '../../../common/types/Characters';

export default function CharacterSheet() {
    const { currentCharacter, data, setData, setCurrentCharacter, user } = useStore();
    const [title, setTitle] = useState('');
    const [value, setValue] = useState('');
    const [strength, setStrength] = useState('');
    const [agility, setAgility] = useState('');
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        if (currentCharacter) {
            setTitle(currentCharacter.title);
            setValue(currentCharacter.subtitle);
            setStrength(currentCharacter.stats.strength.toString());
            setAgility(currentCharacter.stats.agility.toString());
        }
    }, [currentCharacter]);

    const handleSave = async () => {
        if (currentCharacter && user?.uid) {
            const updatedCharacter: Characters = {
                ...currentCharacter,
                title,
                subtitle: value,
                stats: {
                    ...currentCharacter.stats,
                    strength: parseInt(strength) || 0,
                    agility: parseInt(agility) || 0,
                },
                userId: user.uid,
            };

            const updatedData = data.map(item =>
                item.id === currentCharacter.id ? updatedCharacter : item
            );
            setData(updatedData);

            try {
                await updateCharacter(user.uid, currentCharacter.id, updatedCharacter);
                alert('Character updated successfully');
                setEditing(false);
                setCurrentCharacter(null);
            } catch (error) {
                console.error('Error updating character:', error);
                alert('Failed to update character');
            }
        }
    };

    const handleDelete = async () => {
        if (currentCharacter && user?.uid) {
            const updatedData = data.filter(item => item.id !== currentCharacter.id);
            setData(updatedData);

            try {
                await removeCharacter(user.uid, currentCharacter.id);
                alert('Character removed successfully');
                setEditing(false);
                setCurrentCharacter(null);
            } catch (error) {
                console.error('Error removing character:', error);
                alert('Failed to remove character');
            }
        }
    };

    const handleAdd = async () => {
        if (user?.uid) {
            const newCharacter: Characters = {
                id: String(data.length + 1),
                userId: user.uid,
                title: `New Character ${data.length + 1}`,
                subtitle: 'New Subtitle',
                stats: {
                    strength: 0,
                    agility: 0,
                    intelligence: 0,
                },
            };
            setData([...data, newCharacter]);

            try {
                await addCharacter(user.uid, newCharacter);
                alert('New character added successfully');
            } catch (error) {
                console.error('Error adding character:', error);
                alert('Failed to add new character');
            }
        }
    };


    return (
        <Container>
            <ImageBackground style={GlobalSheet.image}>
                <ScrollView contentContainerStyle={GlobalSheet.ViewContent}>
                    <View style={GlobalSheet.card}>
                        {editing && currentCharacter ? (
                            <>
                                <Input
                                    value={title}
                                    onChangeText={setTitle}
                                    placeholder="Title"
                                />
                                <Input
                                    value={value}
                                    onChangeText={setValue}
                                    placeholder="Subtitle"
                                />
                                <Input
                                    value={strength}
                                    onChangeText={setStrength}
                                    placeholder="Strength"
                                    keyboardType="numeric"
                                />
                                <Input
                                    value={agility}
                                    onChangeText={setAgility}
                                    placeholder="Agility"
                                    keyboardType="numeric"
                                />
                            </>
                        ) : (
                            currentCharacter && (
                                <>
                                    <Typography size="h5" text={currentCharacter.title} />
                                    <Typography size="md" text={currentCharacter.subtitle} />
                                    <Typography size="sm" text={`Strength: ${currentCharacter.stats.strength}`} />
                                    <Typography size="sm" text={`Agility: ${currentCharacter.stats.agility}`} />
                                </>
                            )
                        )}

                        <Button
                            title={editing ? 'Save' : 'Edit'}
                            onPress={editing ? handleSave : () => setEditing(true)}
                        />
                        <Button
                            title="Delete"
                            onPress={handleDelete}
                            color="primary"
                        />
                    </View>
                </ScrollView>
            </ImageBackground>
        </Container>
    );
}
