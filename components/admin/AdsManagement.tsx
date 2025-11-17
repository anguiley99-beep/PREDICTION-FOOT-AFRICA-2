
import React, { useState } from 'react';
import type { Ad } from '../../types';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/solid';

interface AdsManagementProps {
    ads: Ad[];
    setAds: React.Dispatch<React.SetStateAction<Ad[]>>;
}

const emptyAd: Omit<Ad, 'id'> = {
    imageUrl: '',
    name: '',
    price: '',
    url: ''
};

export const AdsManagement: React.FC<AdsManagementProps> = ({ ads, setAds }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingAd, setEditingAd] = useState<Ad | Omit<Ad, 'id'> | null>(null);

    const handleOpenModal = (ad: Ad | null = null) => {
        setEditingAd(ad ? { ...ad } : { ...emptyAd });
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingAd(null);
    };

    const handleSaveAd = () => {
        if (!editingAd) return;
        
        if ('id' in editingAd) {
            setAds(prev => prev.map(a => a.id === (editingAd as Ad).id ? (editingAd as Ad) : a));
        } else {
            const newAd: Ad = { ...editingAd, id: `ad${Date.now()}` };
            setAds(prev => [...prev, newAd]);
        }
        handleCloseModal();
    };
    
    const handleDeleteAd = (adId: string) => {
        setAds(prev => prev.filter(a => a.id !== adId));
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setEditingAd(prevAd => {
                    if (!prevAd) return null;
                    return { ...prevAd, imageUrl: reader.result as string };
                });
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">Gestion Carrousel Publicitaire</h3>
                <button onClick={() => handleOpenModal()} className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
                    <PlusIcon className="w-5 h-5 mr-2" />
                    Ajouter une Pub
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {ads.map(ad => (
                    <div key={ad.id} className="bg-gray-800 rounded-lg overflow-hidden relative">
                        <img src={ad.imageUrl} alt={ad.name} className="w-full h-32 object-cover"/>
                        <div className="p-3">
                            <h4 className="font-bold">{ad.name}</h4>
                            <p className="text-yellow-400">{ad.price}</p>
                            <a href={ad.url} target="_blank" rel="noopener noreferrer" className="text-xs text-cyan-400 truncate block">{ad.url}</a>
                        </div>
                         <div className="absolute top-2 right-2 flex space-x-1">
                            <button onClick={() => handleOpenModal(ad)} className="p-2 bg-blue-500/50 rounded-full hover:bg-blue-500/80"><PencilIcon className="w-4 h-4" /></button>
                            <button onClick={() => handleDeleteAd(ad.id)} className="p-2 bg-red-500/50 rounded-full hover:bg-red-500/80"><TrashIcon className="w-4 h-4" /></button>
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && editingAd && (
                 <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                    <div className="bg-gray-800 rounded-lg p-6 w-full max-w-lg">
                        <h4 className="text-lg font-bold mb-4">{'id' in editingAd ? 'Modifier' : 'Ajouter'} une Publicité</h4>
                        <div className="space-y-4">
                            <input type="text" placeholder="Nom du produit" value={editingAd.name} onChange={(e) => setEditingAd({...editingAd, name: e.target.value})} className="w-full p-2 bg-gray-700 rounded"/>
                            <input type="text" placeholder="Prix" value={editingAd.price} onChange={(e) => setEditingAd({...editingAd, price: e.target.value})} className="w-full p-2 bg-gray-700 rounded"/>
                             <div>
                                <label className="block mb-2 text-sm font-medium text-gray-300">Image</label>
                                {editingAd.imageUrl && <img src={editingAd.imageUrl} alt="Aperçu" className="max-h-40 rounded-lg mb-2" />}
                                <input 
                                    type="file" 
                                    accept="image/*"
                                    onChange={handleImageUpload} 
                                    className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100"
                                />
                            </div>
                            <input type="text" placeholder="URL du lien" value={editingAd.url} onChange={(e) => setEditingAd({...editingAd, url: e.target.value})} className="w-full p-2 bg-gray-700 rounded"/>
                        </div>
                        <div className="flex justify-end space-x-4 mt-6">
                            <button onClick={handleCloseModal} className="px-4 py-2 bg-gray-600 rounded-lg">Annuler</button>
                            <button onClick={handleSaveAd} className="px-4 py-2 bg-green-500 rounded-lg">Sauvegarder</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};