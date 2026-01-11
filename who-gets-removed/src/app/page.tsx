"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [isDark, setIsDark] = useState(false);

  // Initialize theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set initial theme
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    }
  }, []);

  // Handle enabling dark mode
  const enableDarkMode = () => {
    setIsDark(true);
    document.documentElement.classList.add('dark');
    document.documentElement.style.setProperty('--background', '#0a0a0a');
    document.documentElement.style.setProperty('--foreground', '#ededed');
    localStorage.setItem('theme', 'dark');
  };

  // Handle enabling light mode
  const enableLightMode = () => {
    setIsDark(false);
    document.documentElement.classList.remove('dark');
    document.documentElement.style.setProperty('--background', '#ffffff');
    document.documentElement.style.setProperty('--foreground', '#171717');
    localStorage.setItem('theme', 'light');
  };

  // Toggle theme
  const toggleTheme = () => {
    if (isDark) {
      enableLightMode();
    } else {
      enableDarkMode();
    }
  };

  return (
    <article className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300">
      {/* Theme Toggle Floating Button */}
      <button
        onClick={toggleTheme}
        className="fixed top-4 right-4 z-50 p-3 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 shadow-lg transition-all duration-300 hover:scale-110"
        aria-label="Toggle theme"
      >
        {isDark ? (
          <span className="text-xl">☀️</span>
        ) : (
          <span className="text-xl">🌙</span>
        )}
      </button>

      {/* Demo Link Floating Button */}
      <Link
        href="/demo"
        className="fixed top-4 left-4 z-50 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-800 text-blue-700 dark:text-blue-300 text-sm font-medium shadow-lg transition-all duration-300 hover:scale-105"
      >
        Interactive Demo
      </Link>

      {/* Article Header */}
      <header className="max-w-3xl mx-auto px-6 py-16 pt-20">
        <div className="mb-8">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            AI Explainability • January 2026 • 12 min read
          </span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          How AI Decides Who to Remove from an Image
        </h1>
        
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          Understanding How AI Image Editors Resolve Ambiguous Prompts
        </p>

        <div className="flex items-center gap-4 pt-6 border-t border-gray-300 dark:border-gray-700">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white">
            AM
          </div>
          <div>
            <p className="font-medium">Abhinav Mehta</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Technical Analysis</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-6 pb-20">
        
        {/* Introduction */}
        <section className="mb-12">
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            If you've ever used an AI image editor and asked it to "remove the unnecessary person" from a group photo, 
            the result can feel strangely intentional.
          </p>
          
          <div className="pl-4 border-l-2 border-blue-500 dark:border-blue-400 my-8">
            <p className="text-gray-700 dark:text-gray-300 italic">
              One person disappears.
              <br />
              The edit looks clean.
              <br />
              The choice feels deliberate.
            </p>
          </div>
          
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            This leads many people to ask an important question:
          </p>
          
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
            How does AI decide who to remove from an image?
          </h2>
          
          <p className="text-lg text-gray-700 dark:text-gray-300">
            The answer is less human — and more technical — than it appears.
            <br />
            <br />
            AI image editors do not judge people or understand intent.
            They resolve ambiguity using probability.
          </p>
        </section>

        {/* What Is an AI Image Editor */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
            What Is an AI Image Editor, Really?
          </h2>
          
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            To understand AI image removal, we first need to clarify what an AI image editor actually is.
          </p>
          
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            An AI image editor is not a thinking system.
            It is a generative pattern-matching system trained on large datasets of images and text.
          </p>
          
          <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-6 my-8">
            <p className="text-gray-700 dark:text-gray-300 font-medium mb-4">
              Modern AI image editors typically combine:
            </p>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Computer vision models to analyze visual elements</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Language models to statistically interpret prompts</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Generative models to synthesize new pixels</span>
              </li>
            </ul>
          </div>
          
          <p className="text-gray-700 dark:text-gray-300">
            At no point does the system understand meaning in the human sense.
            Instead, it continuously answers one question:
          </p>
          
          <div className="mt-6 p-4 bg-blue-100 dark:bg-blue-900/30 border border-blue-300 dark:border-blue-700 rounded-lg">
            <p className="text-gray-700 dark:text-gray-300 font-medium">
              "Given my training data, what is the most likely output?"
            </p>
          </div>
        </section>

        {/* Step 1 */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-800 flex items-center justify-center text-sm font-medium">
              1
            </div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
              How AI Interprets an Image Before Editing
            </h2>
          </div>
          
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            When an image is uploaded, the AI does not see people as people.
          </p>
          
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Instead, it extracts structured visual information, including:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {[
              "Face detection and positioning",
              "Relative size and prominence",
              "Foreground vs background placement",
              "Lighting and contrast",
              "Spatial relationships between faces"
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-600 dark:text-gray-400">{item}</span>
              </div>
            ))}
          </div>
          
          <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-6 my-8">
            <p className="text-gray-700 dark:text-gray-300">
              At this stage:
              <br />
              <span className="ml-4">• No one is important or unimportant</span>
              <br />
              <span className="ml-4">• No context is inferred</span>
              <br />
              <span className="ml-4">• No value judgment exists</span>
              <br /><br />
              The image is simply converted into data.
            </p>
          </div>
        </section>

        {/* Step 2 */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-800 flex items-center justify-center text-sm font-medium">
              2
            </div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
              How AI Understands Ambiguous Prompts
            </h2>
          </div>
          
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Words like <em>unnecessary</em>, <em>irrelevant</em>, or <em>least important</em> have no fixed definition inside an AI system.
          </p>
          
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            AI image editors do not interpret language semantically. They interpret it statistically.
          </p>
          
          <div className="my-8 p-6 bg-purple-100 dark:bg-purple-900/30 border border-purple-300 dark:border-purple-700 rounded-lg">
            <p className="text-gray-700 dark:text-gray-300">
              During training, the model learned correlations between:
              <br /><br />
              <span className="ml-4">• Certain words</span>
              <br />
              <span className="ml-4">• Certain visual layouts</span>
              <br />
              <span className="ml-4">• Certain editing outcomes</span>
            </p>
          </div>
          
          <p className="text-gray-700 dark:text-gray-300">
            For example, across millions of images, phrases like "background person" or "extra person" often appear alongside 
            images where smaller, off-center faces are removed.
            <br /><br />
            The AI does not know why this happens.
            It only knows that the pattern exists.
          </p>
        </section>

        {/* Step 3 */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-800 flex items-center justify-center text-sm font-medium">
              3
            </div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
              Why AI Must Always Choose Someone
            </h2>
          </div>
          
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            A key limitation of AI image editors is that they cannot remain uncertain.
          </p>
          
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            When a prompt is ambiguous, the system cannot respond with:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {["It depends", "Please clarify", "I'm not sure"].map((text, index) => (
              <div key={index} className="p-4 bg-gray-100 dark:bg-gray-900 rounded-lg text-center">
                <p className="text-gray-600 dark:text-gray-400 italic">"{text}"</p>
              </div>
            ))}
          </div>
          
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Instead, it must produce one definitive output.
          </p>
          
          <p className="text-gray-700 dark:text-gray-300">
            This forces the system to rank all detected people and select one candidate.
            <br /><br />
            This is where the core decision occurs.
          </p>
        </section>

        {/* Step 4 - Probability Table */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-800 flex items-center justify-center text-sm font-medium">
              4
            </div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
              Probability Ranking — The Hidden Decision Layer
            </h2>
          </div>
          
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            To decide who to remove from an image, the AI assigns each detected person a probability score.
          </p>
          
          <p className="text-gray-700 dark:text-gray-300 mb-8">
            These scores represent how strongly each person matches the patterns activated by the prompt.
          </p>
          
          <div className="overflow-x-auto my-8">
            <table className="w-full text-sm text-gray-600 dark:text-gray-400">
              <thead className="border-b border-gray-400 dark:border-gray-700">
                <tr>
                  <th className="py-3 px-4 text-left font-medium">Person</th>
                  <th className="py-3 px-4 text-left font-medium">Likelihood Score</th>
                  <th className="py-3 px-4 text-left font-medium">Decision</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="py-3 px-4">Person A</td>
                  <td className="py-3 px-4">62%</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded text-xs">
                      Removed
                    </span>
                  </td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="py-3 px-4">Person B</td>
                  <td className="py-3 px-4">24%</td>
                  <td className="py-3 px-4 text-gray-500 dark:text-gray-400">Kept</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Person C</td>
                  <td className="py-3 px-4">14%</td>
                  <td className="py-3 px-4 text-gray-500 dark:text-gray-400">Kept</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="my-8 p-6 bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-300 dark:border-yellow-700 rounded-lg">
            <p className="text-gray-700 dark:text-gray-300">
              The AI removes Person A not because they are "wrong,"
              but because they are most statistically likely to be removed.
              <br /><br />
              <span className="font-medium">This process is known as probability collapse.</span>
            </p>
          </div>
        </section>

        {/* Step 5 */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-800 flex items-center justify-center text-sm font-medium">
              5
            </div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
              Image Generation Happens After the Decision
            </h2>
          </div>
          
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            One common misconception is that AI "decides while editing."
          </p>
          
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            In reality, the decision happens before any image generation occurs.
          </p>
          
          <div className="my-8 space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 text-sm mt-1 flex-shrink-0">
                1
              </div>
              <p className="text-gray-600 dark:text-gray-400">Generative models reconstruct the background</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 text-sm mt-1 flex-shrink-0">
                2
              </div>
              <p className="text-gray-600 dark:text-gray-400">Lighting and textures are blended</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 text-sm mt-1 flex-shrink-0">
                3
              </div>
              <p className="text-gray-600 dark:text-gray-400">Visual continuity is preserved</p>
            </div>
          </div>
          
          <p className="text-gray-700 dark:text-gray-300">
            This makes the result appear intentional and thoughtful.
            <br /><br />
            But the image generation process does not reconsider who to remove.
            It only executes the outcome already chosen by probability.
          </p>
        </section>

        {/* Why It Feels Meaningful */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
            Why AI Image Removal Feels Meaningful (But Isn't)
          </h2>
          
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Humans are wired to interpret clean visuals as intentional.
          </p>
          
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            When an AI image edit looks seamless, we instinctively assume:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {["Reasoning", "Understanding", "Judgment"].map((text, index) => (
              <div key={index} className="p-4 bg-gray-100 dark:bg-gray-900 rounded-lg text-center">
                <p className="text-gray-700 dark:text-gray-300">{text}</p>
              </div>
            ))}
          </div>
          
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            This is a cognitive illusion.
          </p>
          
          <div className="my-8 p-6 bg-blue-100 dark:bg-blue-900/30 border border-blue-300 dark:border-blue-700 rounded-lg">
            <p className="text-gray-700 dark:text-gray-300">
              The AI did not reason backward from meaning.
              <br />
              It completed a forward statistical pattern.
              <br /><br />
              <span className="font-medium">
                This is why AI outputs can feel confident even when they are misleading.
              </span>
            </p>
          </div>
        </section>

        {/* Training Data Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
            The Role of Training Data in AI Decisions
          </h2>
          
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            AI image editors learn from massive datasets that include:
          </p>
          
          <ul className="space-y-3 mb-8">
            {[
              "News images and captions",
              "Social media posts",
              "Stock photography",
              "Human-made edits and crops"
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-500 dark:bg-gray-400 rounded-full mt-2"></div>
                <span className="text-gray-600 dark:text-gray-400">{item}</span>
              </li>
            ))}
          </ul>
          
          <p className="text-gray-700 dark:text-gray-300">
            These datasets contain cultural patterns, repetition, and bias.
            <br /><br />
            When AI removes a person from an image, it reflects:
            <br /><br />
            <span className="ml-4">• What has happened frequently in the past</span>
            <br />
            <span className="ml-4">• Not what should happen</span>
            <br /><br />
            The decision originates in data, not intent.
          </p>
        </section>

        {/* Interactive Demo Section - Minimal */}
        <section className="my-16 py-8 border-t border-b border-gray-300 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
            See the Decision Process Visually
          </h2>
          
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            To make this process concrete, our interactive demo reconstructs the probability ranking step explicitly.
            It shows how ambiguous prompts turn into numerical likelihoods before any image is edited.
          </p>
          
          <Link
            href="/demo"
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            Explore the interactive AI decision demo
            <span>→</span>
          </Link>
        </section>

        {/* Conclusion */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
            Conclusion: Probability Is Not Judgment
          </h2>
          
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            When AI removes a person from an image, it is not making a statement.
          </p>
          
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            It is resolving ambiguity in the only way it knows how:
            by selecting the most statistically probable outcome.
          </p>
          
          <div className="my-8 p-6 bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg">
            <p className="text-gray-700 dark:text-gray-300 text-lg">
              The real risk is not that AI judges people.
              <br /><br />
              The risk is that probability can look like intention when rendered convincingly.
              <br /><br />
              Understanding this difference is essential for responsible AI use.
            </p>
          </div>
        </section>

        {/* Article Footer */}
        <footer className="pt-8 mt-12 border-t border-gray-300 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8">
            <div className="flex-1">
              <h3 className="font-semibold mb-4">About This Research</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                This technical analysis examines how AI systems process ambiguous prompts and make decisions 
                without human-like understanding. All examples are reconstructed for educational purposes to 
                demonstrate statistical pattern matching in multi-modal AI systems.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <Link href="/demo" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                Interactive Demo
              </Link>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Published: January 2026
              </span>
            </div>
          </div>
        </footer>
      </main>
    </article>
  );
}