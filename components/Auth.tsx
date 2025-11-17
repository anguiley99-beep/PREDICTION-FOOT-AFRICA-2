
import React, { useState } from 'react';
import type { User } from '../types';
import { CameraIcon, PhotoIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { countries } from '../data/countries';


interface AuthViewProps {
  onLogin: (user: User) => void;
  adminUser?: User;
  regularUser?: User;
}

function getFlagEmoji(countryCode: string): string {
  if (!countryCode || countryCode.length !== 2) return '';
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char =>  127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

export const AuthView: React.FC<AuthViewProps> = ({ onLogin, adminUser, regularUser }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4 bg-gradient-to-br from-gray-900 via-green-900/50 to-gray-900">
      <div className="w-full max-w-md mx-auto bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-yellow-400/20">
        <div className="p-8">
          <div className="flex flex-col items-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-24 h-24 text-yellow-400">
              <path fill="currentColor" d="M493.1 319.4c-4.2-1.4-8.6.2-11.4 3.7L405 419.4V84.3c0-3.3-1.8-6.3-4.6-7.9c-2.8-1.6-6.2-1.5-8.9.2L249.3 154.4l-31-38.9c-3.4-4.3-9.5-5.2-13.9-1.8L120.5 174c-4.3 3.4-5.2 9.5-1.8 13.9l43.2 54.2L41.3 222c-4.3-3-10.1-2.2-13.4 2.1l-25.2 32.5c-3.3 4.3-2.5 10.2 1.8 13.6L129.2 355c4.3 3.3 10.1 2.5 13.4-1.8l16.1-20.2l82.6 62.8c4.3 3.3 10.1 2.5 13.4-1.8l1.8-2.2l132.8-173.8c3.4-4.3 2.5-10.2-1.8-13.6zm-193.4 53.2L182.8 285.2l-32.1 40.2l128.2-97.1l-22.9 28.7c-3.4 4.3-2.5 10.2 1.8 13.6l42.6 33.1z"/>
            </svg>
            <h1 className="text-3xl font-bold text-white mt-4 tracking-wider">PREDICTION FOOT AFRICA</h1>
            <p className="text-yellow-300 mt-1">C'est l'Afrique qui gagne</p>
          </div>
          
          {isLogin ? <LoginForm onLogin={onLogin} adminUser={adminUser} regularUser={regularUser} showPassword={showPassword} setShowPassword={setShowPassword} /> : <SignUpForm onLogin={onLogin} showPassword={showPassword} setShowPassword={setShowPassword} />}

          <p className="text-center text-gray-400 mt-6">
            {isLogin ? "Vous n'avez pas de compte ?" : "Vous avez déjà un compte ?"}
            <button onClick={() => setIsLogin(!isLogin)} className="font-semibold text-yellow-400 hover:text-yellow-300 ml-1">
              {isLogin ? "S'inscrire" : "Se connecter"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

const LoginForm: React.FC<any> = ({ onLogin, adminUser, regularUser, showPassword, setShowPassword }) => {
  return (
    <>
      <h2 className="text-2xl font-semibold text-center text-white mb-6">Connexion</h2>
      <form className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-300">Email</label>
          <input type="email" placeholder="admin@example.com" className="w-full px-4 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400" />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-300">Mot de passe</label>
          <div className="relative">
            <input type={showPassword ? "text" : "password"} placeholder="••••••••" className="w-full px-4 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400" />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400">
              {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
            </button>
          </div>
        </div>
        <div className="text-sm text-center text-gray-500 pt-2">
            <p>Utilisateur de test: jean.dupont@example.com / pass</p>
            <p>Admin de test: admin@example.com / pass</p>
        </div>
        <button type="button" onClick={() => onLogin(regularUser)} className="w-full py-3 mt-4 bg-gradient-to-r from-green-500 to-yellow-500 text-white font-semibold rounded-lg hover:from-green-600 hover:to-yellow-600 transition duration-300 shadow-lg">Se connecter (Utilisateur)</button>
        <button type="button" onClick={() => onLogin(adminUser)} className="w-full py-3 mt-2 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition duration-300">Se connecter (Admin)</button>
      </form>
    </>
  );
};

const SignUpForm: React.FC<{
    onLogin: (user: User) => void;
    showPassword;
    setShowPassword;
}> = ({ onLogin, showPassword, setShowPassword }) => {
    const [fullName, setFullName] = useState('');
    const [gender, setGender] = useState('');
    const [phoneDialCode, setPhoneDialCode] = useState('+33');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [countryCode, setCountryCode] = useState('');
    const [postalCode, setPostalCode] = useState('');

    const handleSignUp = () => {
        if (!fullName || !email || !password || !countryCode || !gender || !postalCode) {
            alert("Veuillez remplir tous les champs.");
            return;
        }

        const selectedCountry = countries.find(c => c.code === countryCode);
        if (!selectedCountry) {
            alert("Veuillez sélectionner un pays valide.");
            return;
        }
        
        const validGender = gender as 'Male' | 'Female' | 'Other';
        if (!['Male', 'Female', 'Other'].includes(validGender)) {
            alert("Veuillez sélectionner un sexe valide.");
            return;
        }

        const newUser: User = {
            id: `user_${Date.now()}`,
            name: fullName,
            email: email,
            profilePictureUrl: `https://picsum.photos/seed/${email}/200`,
            country: {
                name: selectedCountry.name,
                code: selectedCountry.code,
            },
            gender: validGender,
            phone: `${phoneDialCode}${phoneNumber}`,
            isAdmin: false,
        };

        onLogin(newUser);
    };

    return (
    <>
      <h2 className="text-2xl font-semibold text-center text-white mb-6">Inscription</h2>
      <form className="space-y-3">
        <div className="flex justify-center">
            <div className="relative">
                <img src="https://picsum.photos/seed/newuser/100" alt="Profile" className="w-24 h-24 rounded-full object-cover border-2 border-gray-600"/>
                <div className="absolute bottom-0 right-0 flex space-x-1">
                    <button type="button" className="p-1.5 bg-green-500 rounded-full text-white hover:bg-green-600">
                        <CameraIcon className="w-4 h-4" />
                    </button>
                    <button type="button" className="p-1.5 bg-yellow-500 rounded-full text-white hover:bg-yellow-600">
                        <PhotoIcon className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
        <input type="text" placeholder="Nom complet" value={fullName} onChange={e => setFullName(e.target.value)} className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400" />
        <select className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400" value={gender} onChange={e => setGender(e.target.value)}>
            <option value="">Sexe</option>
            <option value="Male">Homme</option>
            <option value="Female">Femme</option>
            <option value="Other">Autre</option>
        </select>
        <div className="flex">
            <select className="px-2 bg-gray-700 border border-gray-600 rounded-l-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400" value={phoneDialCode} onChange={e => setPhoneDialCode(e.target.value)}>
                {countries.map(country => (
                    <option key={country.code} value={country.dial_code}>
                        {getFlagEmoji(country.code)} {country.dial_code}
                    </option>
                ))}
            </select>
            <input type="tel" placeholder="Numéro de téléphone" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} className="flex-1 px-4 py-2 bg-gray-700 border-t border-b border-r border-gray-600 rounded-r-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400" />
        </div>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400" />
        <div className="relative">
            <input type={showPassword ? "text" : "password"} placeholder="Mot de passe" value={password} onChange={e => setPassword(e.target.value)} className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400" />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400">
              {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
            </button>
        </div>
        <select className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400" value={countryCode} onChange={e => setCountryCode(e.target.value)}>
            <option value="">Sélectionnez votre pays</option>
            {countries.map(country => (
                <option key={country.code} value={country.code}>
                    {getFlagEmoji(country.code)} {country.name}
                </option>
            ))}
        </select>
        <input type="text" placeholder="Code Postal" value={postalCode} onChange={e => setPostalCode(e.target.value)} className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400" />
        <button type="button" onClick={handleSignUp} className="w-full py-3 mt-2 bg-gradient-to-r from-green-500 to-yellow-500 text-white font-semibold rounded-lg hover:from-green-600 hover:to-yellow-600 transition duration-300">S'inscrire</button>
      </form>
    </>
  );
}