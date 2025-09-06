/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';

// Un generador de números pseudoaleatorios determinista simple
const mulberry32 = (a: number) => {
    return () => {
      let t = a += 0x6D2B79F5;
      t = Math.imul(t ^ t >>> 15, t | 1);
      t ^= t + Math.imul(t ^ t >>> 7, t | 61);
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }
}

const generateDailyNumbers = (): number[] => {
    const today = new Date();
    // Crea una semilla única para cada día
    const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    
    const random = mulberry32(seed);
    const numbers = new Set<number>();
    
    // Genera 25 números únicos entre 1 y 100
    while (numbers.size < 25) {
        const randomNumber = Math.floor(random() * 100) + 1;
        numbers.add(randomNumber);
    }
    
    return Array.from(numbers).sort((a, b) => a - b);
};

const App: React.FC = () => {
    const [numbers, setNumbers] = useState<number[]>([]);
    const [copied, setCopied] = useState<boolean>(false);

    useEffect(() => {
        setNumbers(generateDailyNumbers());
    }, []);
    
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = today.toLocaleDateString('es-DO', options);

    const handleCopy = () => {
        const numbersString = numbers.join(', ');
        navigator.clipboard.writeText(numbersString);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-4 font-sans text-slate-800">
            <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-10 text-center">
                
                <header className="mb-6">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-red-600">
                        Números de la Suerte
                    </h1>
                    <p className="text-slate-500 mt-2 text-lg">Lotería Dominicana</p>
                </header>
                
                <div className="mb-8">
                    <p className="font-semibold text-slate-600">Para el día: <span className="text-blue-700">{formattedDate}</span></p>
                </div>

                <main>
                    <div className="grid grid-cols-5 gap-3 md:gap-4 mb-8">
                        {numbers.map((num, index) => (
                            <div 
                                key={index} 
                                className="aspect-square flex items-center justify-center rounded-full bg-gradient-to-br from-slate-50 to-slate-200 border-2 border-slate-300 shadow-md animate-pop-in"
                                style={{ animationDelay: `${index * 30}ms` }}
                                aria-label={`Número ${num}`}
                            >
                                <span className="text-2xl md:text-3xl font-bold text-slate-700">{num}</span>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={handleCopy}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-lg"
                    >
                        {copied ? '¡Copiado!' : 'Copiar Números'}
                    </button>
                </main>

                <footer className="mt-10 border-t pt-4">
                    <p className="text-xs text-slate-400">Para fines de entretenimiento. Juega con responsabilidad.</p>
                </footer>

            </div>
        </div>
    );
};

export default App;