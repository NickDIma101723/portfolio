export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 dark:text-white mb-4">
          Hello World!
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          Welcome to my portfolio
        </p>
        <div className="space-x-4">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-300">
            Get Started
          </button>
          <button className="border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white font-semibold py-2 px-6 rounded-lg transition duration-300">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}
