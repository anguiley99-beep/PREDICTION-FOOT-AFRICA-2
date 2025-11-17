
import React, { useState } from 'react';
import type { Match } from '../../types';
import { PlusIcon, PencilIcon, TrashIcon, CheckCircleIcon } from '@heroicons/react/24/solid';

interface MatchManagementProps {
    matches: Match[];
    setMatches: React.Dispatch<React.SetStateAction<Match[]>>;
}

const emptyMatch: Omit<Match, 'id'> = {
    betNumber: 1,
    homeTeam: { name: '', flagUrl: '' },
    awayTeam: { name: '', flagUrl: '' },
    date: '',
    competition: '',
    country: '',
    result: { homeScore: 0, awayScore: 0 }
};

export const MatchManagement: React.FC<MatchManagementProps> = ({ matches, setMatches }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingMatch, setEditingMatch] = useState<Match | Omit<Match, 'id'> | null>(null);

    const handleOpenModal = (match: Match | null = null) => {
        setEditingMatch(match ? { ...match } : { ...emptyMatch, betNumber: matches.length + 1 });
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingMatch(null);
    };

    const handleSaveMatch = () => {
        if (!editingMatch) return;
        
        if ('id' in editingMatch) {
            // Editing existing match
            setMatches(prev => prev.map(m => m.id === (editingMatch as Match).id ? (editingMatch as Match) : m));
        } else {
            // Adding new match
            const newMatch: Match = { ...editingMatch, id: `match${Date.now()}` };
            setMatches(prev => [...prev, newMatch]);
        }
        handleCloseModal();
    };
    
    const handleDeleteMatch = (matchId: string) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer ce match ?")) {
            setMatches(prev => prev.filter(m => m.id !== matchId));
        }
    };
    
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">Gestion des Matchs</h3>
                <button onClick={() => handleOpenModal()} className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
                    <PlusIcon className="w-5 h-5 mr-2" />
                    Ajouter un Match
                </button>
            </div>

            <div className="bg-gray-800 rounded-lg overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-700">
                        <tr>
                            <th className="p-3">N°</th>
                            <th className="p-3">Match</th>
                            <th className="p-3">Date</th>
                            <th className="p-3">Compétition</th>
                            <th className="p-3">Score</th>
                            <th className="p-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {matches.map(match => (
                            <tr key={match.id} className="border-b border-gray-700 hover:bg-gray-700/50">
                                <td className="p-3">{match.betNumber}</td>
                                <td className="p-3">{match.homeTeam.name} vs {match.awayTeam.name}</td>
                                <td className="p-3">{new Date(match.date).toLocaleDateString('fr-FR')}</td>
                                <td className="p-3">{match.competition}</td>
                                <td className="p-3">{match.result ? `${match.result.homeScore} - ${match.result.awayScore}` : 'À venir'}</td>
                                <td className="p-3 flex space-x-2">
                                    <button onClick={() => handleOpenModal(match)} className="p-2 bg-blue-500/20 text-blue-400 rounded-md hover:bg-blue-500/40"><PencilIcon className="w-4 h-4" /></button>
                                    <button onClick={() => handleDeleteMatch(match.id)} className="p-2 bg-red-500/20 text-red-400 rounded-md hover:bg-red-500/40"><TrashIcon className="w-4 h-4" /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && editingMatch && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                    <div className="bg-gray-800 rounded-lg p-6 w-full max-w-lg">
                        <h4 className="text-lg font-bold mb-4">{'id' in editingMatch ? 'Modifier' : 'Ajouter'} un Match</h4>
                        <div className="space-y-4">
                            {/* Form fields here */}
                            <input type="number" placeholder="Numéro du pari" value={editingMatch.betNumber} onChange={(e) => setEditingMatch({...editingMatch, betNumber: parseInt(e.target.value)})} className="w-full p-2 bg-gray-700 rounded"/>
                            <input type="text" placeholder="Équipe Domicile" value={editingMatch.homeTeam.name} onChange={(e) => setEditingMatch({...editingMatch, homeTeam: {...editingMatch.homeTeam, name: e.target.value}})} className="w-full p-2 bg-gray-700 rounded"/>
                            <input type="text" placeholder="Équipe Extérieure" value={editingMatch.awayTeam.name} onChange={(e) => setEditingMatch({...editingMatch, awayTeam: {...editingMatch.awayTeam, name: e.target.value}})} className="w-full p-2 bg-gray-700 rounded"/>
                            <input type="datetime-local" value={editingMatch.date.substring(0, 16)} onChange={(e) => setEditingMatch({...editingMatch, date: new Date(e.target.value).toISOString()})} className="w-full p-2 bg-gray-700 rounded"/>
                            <input type="text" placeholder="Compétition" value={editingMatch.competition} onChange={(e) => setEditingMatch({...editingMatch, competition: e.target.value})} className="w-full p-2 bg-gray-700 rounded"/>
                            <div className="flex items-center space-x-2">
                                <input type="number" placeholder="Score Domicile" value={editingMatch.result?.homeScore ?? ''} onChange={(e) => setEditingMatch({...editingMatch, result: {...editingMatch.result!, homeScore: parseInt(e.target.value)}})} className="w-full p-2 bg-gray-700 rounded"/>
                                <span>-</span>
                                <input type="number" placeholder="Score Extérieur" value={editingMatch.result?.awayScore ?? ''} onChange={(e) => setEditingMatch({...editingMatch, result: {...editingMatch.result!, awayScore: parseInt(e.target.value)}})} className="w-full p-2 bg-gray-700 rounded"/>
                            </div>
                        </div>
                        <div className="flex justify-end space-x-4 mt-6">
                            <button onClick={handleCloseModal} className="px-4 py-2 bg-gray-600 rounded-lg">Annuler</button>
                            <button onClick={handleSaveMatch} className="px-4 py-2 bg-green-500 rounded-lg">Sauvegarder</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};