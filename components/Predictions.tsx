
import React, { useState } from 'react';
import type { User, Match, Prediction, PredictionValue } from '../types';
import { Page } from '../App';
import { Header } from './common/Header';
import { AdBanner } from './common/AdBanner';
import { CheckIcon, XMarkIcon, ClockIcon } from '@heroicons/react/24/solid';

interface PredictionsProps {
  navigate: (page: Page) => void;
  currentUser: User;
  matches: Match[];
  predictions: Prediction[];
  setPredictions: React.Dispatch<React.SetStateAction<Prediction[]>>;
}

const getPointsForPrediction = (prediction: PredictionValue, match: Match): number | null => {
    if (!match.result) return null;
    const { homeScore, awayScore } = match.result;
    
    let actualResult: '1' | 'X' | '2';
    if (homeScore > awayScore) actualResult = '1';
    else if (homeScore < awayScore) actualResult = '2';
    else actualResult = 'X';

    switch (prediction) {
        case '1': return actualResult === '1' ? 3 : 0;
        case '2': return actualResult === '2' ? 3 : 0;
        case 'X': return actualResult === 'X' ? 2 : 0;
        case '1X': return actualResult === '1' || actualResult === 'X' ? 1 : 0;
        case 'X2': return actualResult === 'X' || actualResult === '2' ? 1 : 0;
        default: return 0;
    }
}

export const Predictions: React.FC<PredictionsProps> = ({ navigate, currentUser, matches, predictions, setPredictions }) => {
  const [localPredictions, setLocalPredictions] = useState<Record<string, PredictionValue>>(() => {
    const userPredictions = predictions.filter(p => p.userId === currentUser.id);
    return userPredictions.reduce((acc, p) => ({ ...acc, [p.matchId]: p.prediction }), {});
  });

  const handlePredictionChange = (matchId: string, value: PredictionValue) => {
    setLocalPredictions(prev => ({ ...prev, [matchId]: value }));
  };

  const handleSubmit = () => {
    // FIX: Explicitly cast `prediction` to `PredictionValue` to fix a type mismatch where it was inferred as `unknown`.
    const newPredictions: Prediction[] = Object.entries(localPredictions).map(([matchId, prediction]) => ({
      userId: currentUser.id,
      matchId,
      prediction: prediction as PredictionValue,
    }));
    
    // In a real app, this would be an API call. Here we simulate it.
    const otherUsersPredictions = predictions.filter(p => p.userId !== currentUser.id);
    setPredictions([...otherUsersPredictions, ...newPredictions]);

    alert('Pronostics envoyés avec succès !');
  };
  
  const PredictionSelector: React.FC<{ match: Match }> = ({ match }) => {
    const options: PredictionValue[] = ['1', 'X', '2', '1X', 'X2'];
    const isDisabled = !!match.result;
    const currentPrediction = localPredictions[match.id];

    return (
      <div className="flex justify-center space-x-1 sm:space-x-2 bg-gray-900 p-1 rounded-full">
        {options.map(opt => (
          <button
            key={opt}
            onClick={() => !isDisabled && handlePredictionChange(match.id, opt)}
            disabled={isDisabled}
            className={`w-10 h-10 sm:w-12 sm:h-10 text-xs sm:text-sm font-bold rounded-full transition-all duration-200 ${
              currentPrediction === opt 
                ? 'bg-green-500 text-white shadow-lg' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            } ${isDisabled ? 'cursor-not-allowed opacity-60' : ''}`}
          >
            {opt}
          </button>
        ))}
      </div>
    );
  };
  
  const ResultIndicator: React.FC<{ match: Match }> = ({ match }) => {
    const userPrediction = localPredictions[match.id];
    if (!match.result || !userPrediction) return <div className="w-8 h-8 flex items-center justify-center"><ClockIcon className="w-5 h-5 text-gray-500" /></div>;

    const points = getPointsForPrediction(userPrediction, match);
    if(points === null) return <div className="w-8 h-8 flex items-center justify-center"><ClockIcon className="w-5 h-5 text-gray-500" /></div>;
    
    const isWin = points > 0;
    
    return (
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isWin ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
            {isWin ? <CheckIcon className="w-6 h-6 text-green-400" /> : <XMarkIcon className="w-6 h-6 text-red-400" />}
        </div>
    );
  };


  return (
    <div className="min-h-screen flex flex-col">
      <Header title="Prédictions" currentUser={currentUser} navigate={navigate} backPage={Page.DASHBOARD} />
      <main className="flex-grow container mx-auto p-4 space-y-4">
        {matches.map(match => (
          <div key={match.id} className="bg-gray-800 rounded-2xl shadow-lg p-4 transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-bold bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded-full">Pari N°{match.betNumber}</span>
                <div className="flex items-center">
                    <span className="text-gray-400 text-sm">{new Date(match.date).toLocaleString('fr-FR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit'})}</span>
                    <ResultIndicator match={match} />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <div className="flex items-center justify-between text-center col-span-1 md:col-span-1">
                    <div className="flex-1 flex flex-col items-center">
                        <img src={match.homeTeam.flagUrl} alt={match.homeTeam.name} className="w-12 h-8 object-cover rounded-sm mb-1" />
                        <span className="font-semibold text-white">{match.homeTeam.name}</span>
                    </div>
                    <span className="text-2xl font-bold text-gray-400 mx-4">VS</span>
                    <div className="flex-1 flex flex-col items-center">
                        <img src={match.awayTeam.flagUrl} alt={match.awayTeam.name} className="w-12 h-8 object-cover rounded-sm mb-1" />
                        <span className="font-semibold text-white">{match.awayTeam.name}</span>
                    </div>
                </div>

                <div className="col-span-1 md:col-span-2 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="text-center md:text-left">
                        <p className="text-sm text-gray-300">{match.competition}</p>
                        <p className="text-xs text-gray-500">{match.country}</p>
                    </div>
                    <PredictionSelector match={match} />
                </div>
            </div>
          </div>
        ))}
        <AdBanner pageName="Prédictions" />
      </main>
      <footer className="sticky bottom-0 bg-gray-800/80 backdrop-blur-sm p-4 border-t border-gray-700">
        <div className="container mx-auto">
            <button
              onClick={handleSubmit}
              className="w-full py-3 bg-gradient-to-r from-green-500 to-yellow-500 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-yellow-600 transition duration-300"
            >
              Envoyer mes pronostics
            </button>
        </div>
      </footer>
    </div>
  );
};