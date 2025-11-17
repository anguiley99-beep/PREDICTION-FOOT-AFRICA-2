
import React, { useState, useEffect } from 'react';
import type { Rule, Info } from '../../types';

interface ContentManagementProps {
    rules: Rule[];
    setRules: React.Dispatch<React.SetStateAction<Rule[]>>;
    info: Info[];
    setInfo: React.Dispatch<React.SetStateAction<Info[]>>;
}

export const ContentManagement: React.FC<ContentManagementProps> = ({ rules, setRules, info, setInfo }) => {
    const [editedRulesContent, setEditedRulesContent] = useState('');
    const [editedInfoText, setEditedInfoText] = useState('');
    const [editedInfoImageUrl, setEditedInfoImageUrl] = useState<string | undefined>('');

    useEffect(() => {
        setEditedRulesContent(rules[0]?.content || '');
    }, [rules]);

    useEffect(() => {
        setEditedInfoText(info[0]?.text || '');
        setEditedInfoImageUrl(info[0]?.imageUrl);
    }, [info]);


    const handleInfoImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setEditedInfoImageUrl(event.target?.result as string);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const handleSaveRules = () => {
        setRules([{ ...rules[0], content: editedRulesContent }]);
        alert('Règlement sauvegardé !');
    };

    const handleSaveInfo = () => {
        setInfo([{ ...info[0], text: editedInfoText, imageUrl: editedInfoImageUrl }]);
        alert('Informations sauvegardées !');
    };
    
    return (
        <div className="space-y-8">
            <div>
                <h3 className="text-xl font-bold mb-4">Gestion du Règlement</h3>
                <div className="bg-gray-800 p-4 rounded-lg">
                    <textarea 
                        value={editedRulesContent}
                        onChange={(e) => setEditedRulesContent(e.target.value)}
                        rows={10}
                        className="w-full p-2 bg-gray-700 rounded-md text-white"
                        placeholder="Entrez le règlement ici..."
                    />
                    <button onClick={handleSaveRules} className="mt-2 px-4 py-2 bg-green-500 rounded-lg hover:bg-green-600 transition-colors">Sauvegarder Règlement</button>
                </div>
            </div>
            <div>
                <h3 className="text-xl font-bold mb-4">Gestion de la Page Informations</h3>
                <div className="bg-gray-800 p-4 rounded-lg space-y-4">
                     <textarea 
                        value={editedInfoText}
                        onChange={(e) => setEditedInfoText(e.target.value)}
                        rows={6}
                        className="w-full p-2 bg-gray-700 rounded-md text-white"
                        placeholder="Entrez le texte d'information ici..."
                    />
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-300">Image d'information</label>
                        {editedInfoImageUrl && <img src={editedInfoImageUrl} alt="Info preview" className="max-h-40 rounded-lg mb-2" />}
                        <input type="file" onChange={handleInfoImageChange} className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100"/>
                    </div>
                    <button onClick={handleSaveInfo} className="mt-2 px-4 py-2 bg-green-500 rounded-lg hover:bg-green-600 transition-colors">Sauvegarder Informations</button>
                </div>
            </div>
        </div>
    );
};